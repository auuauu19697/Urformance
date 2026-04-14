import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { CreateOrderDto } from '../orders/dto/create-order.dto';

@Injectable()
export class SheetsService {
  private readonly logger = new Logger(SheetsService.name);

  constructor(private readonly config: ConfigService) { }

  private getSheetsClient() {
    const auth = new google.auth.JWT({
      email: this.config.get<string>('google.serviceAccountEmail'),
      key: this.config.get<string>('google.privateKey'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return google.sheets({ version: 'v4', auth });
  }

  /**
   * Writes to two tabs:
   *
   * Orders (A–Q):
   *   OrderID | Timestamp | Full Name | Email | Phone | Instagram |
   *   Address Line 1 | Subdistrict | District | City | Province | Postal Code |
   *   Total (THB) | Items Count | Payment DateTime | Slip URL | Note
   *
   * OrderItems (A–H):
   *   OrderID | Product Name | Color | Size | Qty | Unit Price | Subtotal | Screening Data
   */
  async appendOrder(
    orderId: string,
    dto: CreateOrderDto,
    total: number,
    slipUrl: string,
  ): Promise<void> {
    const sheets = this.getSheetsClient();
    const spreadsheetId = this.config.get<string>('google.sheetId');
    const ordersTab = this.config.get<string>('google.ordersSheet');
    const itemsTab = this.config.get<string>('google.itemsSheet');
    const { customer, items, paymentDateTime, note } = dto;

    // ── Orders row ────────────────────────────────────────────────────────────
    const orderRow = [
      orderId,
      new Date().toISOString(),
      customer.fullName,
      customer.email,
      customer.phone,
      customer.instagram ?? '',
      customer.addressLine1,
      customer.subdistrict,
      customer.district,
      customer.city,
      customer.province,
      customer.postalCode,
      total ?? 'amount',
      paymentDateTime,
      slipUrl,
      note ?? '',
    ];

    // ── OrderItems rows ───────────────────────────────────────────────────────
    const itemRows = items.map((item) => [
      orderId,
      item.model,
      item.color,
      item.size,
      item.qty,
      item.unitPrice,
      item.qty * item.unitPrice,
      item.screeningData ? JSON.stringify(item.screeningData) : 'No Screen',
    ]);

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${ordersTab}!A:P`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [orderRow] },
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${itemsTab}!A:H`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: itemRows },
      });
    } catch (err: any) {
      this.logger.error('Google Sheets error:', err?.message);
      throw new InternalServerErrorException('Failed to write to Google Sheets.');
    }
  }
}
