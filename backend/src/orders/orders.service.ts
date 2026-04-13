import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { SheetsService } from '../sheets/sheets.service';

@Injectable()
export class OrdersService {
  constructor(private readonly sheets: SheetsService) {}

  async createOrder(
    dto: CreateOrderDto,
    slipFile: Express.Multer.File | undefined,
  ): Promise<{ orderId: string; total: number }> {
    // ── Validate slip ────────────────────────────────────────────────────────
    if (!slipFile) {
      throw new BadRequestException('Payment slip image is required.');
    }

    // ── Compute total server-side ─────────────────────────────────────────────
    const total = dto.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

    // ── Generate order ID ─────────────────────────────────────────────────────
    const orderId = `ORD-${Date.now()}`;

    // ── Persist to Google Sheets ──────────────────────────────────────────────
    await this.sheets.appendOrder(orderId, dto, total, slipFile.originalname);

    return { orderId, total };
  }
}
