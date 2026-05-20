import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { SheetsService } from '../sheets/sheets.service';
import { DriveService } from '../drive/drive.service';
import { MailService } from '../mail/mail.service';
import { calculateShippingFee } from './shipping.util';

@Injectable()
export class OrdersService {
  constructor(
    private readonly sheets: SheetsService,
    private readonly drive: DriveService,
    private readonly mail: MailService,
  ) {}

  async createOrder(
    dto: CreateOrderDto,
    slipFile: Express.Multer.File | undefined,
  ): Promise<{ orderId: string; subtotal: number; shippingFee: number; total: number }> {
    // ── Validate slip ────────────────────────────────────────────────────────
    if (!slipFile) {
      throw new BadRequestException('Payment slip image is required.');
    }

    // ── Compute totals server-side ────────────────────────────────────────────
    const subtotal = dto.items.reduce(
      (sum, item) => sum + item.qty * item.unitPrice,
      0,
    );
    const totalQty = dto.items.reduce((sum, item) => sum + item.qty, 0);
    const shippingFee = calculateShippingFee(totalQty);
    const total = subtotal + shippingFee;

    // ── Generate order ID ─────────────────────────────────────────────────────
    const orderId = `ORD-${Date.now()}`;

    // ── Upload slip to Google Drive ────────────────────────────────────────────
    const slipUrl = await this.drive.uploadSlip(slipFile, orderId);

    // ── Persist to Google Sheets ──────────────────────────────────────────────
    await this.sheets.appendOrder(orderId, dto, subtotal, shippingFee, total, slipUrl);

    // ── Send confirmation email (fire-and-forget) ─────────────────────────────
    this.mail
      .sendOrderConfirmation(orderId, dto, subtotal, shippingFee, total)
      .catch(() => {}); // errors already logged inside MailService

    return { orderId, subtotal, shippingFee, total };
  }
}
