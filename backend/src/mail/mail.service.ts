import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { buildOrderConfirmationHtml } from './templates/order-confirmation';
import { CreateWaitlistDto } from '../waitlist/dto/create-waitlist.dto';
import { buildWaitlistConfirmationHtml } from './templates/waitlist-confirmation';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private fromAddress: string;
  private brandName: string;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const host = this.config.get<string>('mail.host');
    const port = this.config.get<number>('mail.port');
    const user = this.config.get<string>('mail.user');
    const pass = this.config.get<string>('mail.pass');

    this.fromAddress = this.config.get<string>('mail.from') ?? user ?? '';
    this.brandName = this.config.get<string>('mail.brandName') ?? 'URFORMANCE';

    if (!user || !pass) {
      this.logger.warn(
        'SMTP credentials not configured — order confirmation emails will be skipped.',
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    this.logger.log(`Mail transporter ready (${host}:${port})`);
  }

  /**
   * Send an order confirmation email to the customer.
   * Returns silently on failure — email must never block the order flow.
   */
  async sendOrderConfirmation(
    orderId: string,
    dto: CreateOrderDto,
    subtotal: number,
    shippingFee: number,
    total: number,
  ): Promise<void> {
    if (!this.transporter) {
      this.logger.debug('No mail transporter — skipping confirmation email.');
      return;
    }

    const html = buildOrderConfirmationHtml(orderId, dto, subtotal, shippingFee, total, this.brandName);

    try {
      const info = await this.transporter.sendMail({
        from: `"${this.brandName}" <${this.fromAddress}>`,
        to: dto.customer.email,
        subject: `${this.brandName} — Order ${orderId} Confirmed`,
        html,
      });
      this.logger.log(`Confirmation email sent to ${dto.customer.email} (${info.messageId})`);
    } catch (err) {
      this.logger.error(`Failed to send confirmation email to ${dto.customer.email}:`, err);
    }
  }

  /**
   * Send a waitlist confirmation email to the user.
   * Returns silently on failure — must never block the waitlist join flow.
   */
  async sendWaitlistConfirmation(dto: CreateWaitlistDto): Promise<void> {
    if (!this.transporter) {
      this.logger.debug('No mail transporter — skipping waitlist confirmation email.');
      return;
    }

    const html = buildWaitlistConfirmationHtml(dto, this.brandName);

    try {
      const info = await this.transporter.sendMail({
        from: `"${this.brandName}" <${this.fromAddress}>`,
        to: dto.email,
        subject: `${this.brandName} — Waitlist Confirmed`,
        html,
      });
      this.logger.log(`Waitlist confirmation email sent to ${dto.email} (${info.messageId})`);
    } catch (err) {
      this.logger.error(`Failed to send waitlist confirmation email to ${dto.email}:`, err);
    }
  }
}
