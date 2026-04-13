import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * POST /api/orders
   *
   * multipart/form-data:
   *   - slip  (File)        — payment slip image, max 5 MB
   *   - order (JSON string) — serialised CreateOrderDto
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
          return cb(new BadRequestException('Only image files are accepted for the payment slip.'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createOrder(
    @UploadedFile() slip: Express.Multer.File,
    @Body('order') orderJson: string,
  ) {
    // ── Parse & validate order JSON ──────────────────────────────────────────
    let parsed: object;
    try {
      parsed = JSON.parse(orderJson);
    } catch {
      throw new BadRequestException('Invalid JSON in the "order" field.');
    }

    const dto = plainToInstance(CreateOrderDto, parsed);
    const errors = await validate(dto, { whitelist: true });
    if (errors.length) {
      const messages = errors.flatMap((e) => Object.values(e.constraints ?? {}));
      throw new BadRequestException(messages);
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
