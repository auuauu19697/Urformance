import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ParseJsonPipe } from '../common/pipes/parse-json.pipe';

// ─────────────────────────────────────────────────────────────
// Controller
// ─────────────────────────────────────────────────────────────
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  /**
   * POST /api/orders
   *
   * multipart/form-data:
   *   - slip  (File)        — payment slip image, max 5 MB
   *   - order (JSON string) — serialized CreateOrderDto
   *
   * Headers:
   *   X-API-Key: <api-key>
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('slip', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException(
              'Only image files are accepted for the payment slip.',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async createOrder(
    @UploadedFile() slip: Express.Multer.File,
    @Body('order') orderString: string,
  ) {
    if (!slip) {
      throw new BadRequestException('Payment slip is required');
    }

    // 1. Parse JSON
    let parsed: any;
    try {
      parsed = JSON.parse(orderString);
    } catch {
      throw new BadRequestException('Invalid JSON format in "order" field');
    }

    // 2. Transform into DTO
    const dto = plainToInstance(CreateOrderDto, parsed, {
      enableImplicitConversion: true,
    });

    // 3. Validate
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      // Flatten deeply nested errors for clear logging
      const flattenErrors = (errs: any[], parent = ''): string[] => {
        let res: string[] = [];
        for (const err of errs) {
          const propertyPath = parent ? `${parent}.${err.property}` : err.property;
          if (err.constraints) {
            res.push(...Object.values(err.constraints).map(msg => `${propertyPath}: ${msg}`));
          }
          if (err.children?.length) {
            res.push(...flattenErrors(err.children, propertyPath));
          }
        }
        return res;
      };

      const formattedErrors = flattenErrors(errors);
      console.error('Validation Errors:', JSON.stringify(formattedErrors, null, 2));
      throw new BadRequestException(formattedErrors);
    }

    const result = await this.ordersService.createOrder(dto, slip);

    return {
      success: true,
      orderId: result.orderId,
      total: result.total,
      message: 'Order saved successfully.',
    };
  }
}