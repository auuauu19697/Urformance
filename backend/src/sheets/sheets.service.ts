import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { CreateOrderDto } from '../orders/dto/create-order.dto';

@Injectable()
export class SheetsService {
  constructor(private readonly config: ConfigService) {}

  // ── Auth client ────────────────────────────────────────────────────────────
  private getSheetsClient() {
    const auth = new google.auth.JWT({
      email: this.config.get<string>('google.serviceAccountEmail'),
      key: this.config.get<string>('google.privateKey'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return google.sheets({ version: 'v4', auth });
  }

  /**
   * Writes one row to the Orders tab and one row per item to the OrderItems tab.
   *
   * Orders tab columns (A–H):
   *   OrderID | Timestamp | Name | Phone | Address | Total (THB) | Items Count | Slip
   *
   * OrderItems tab columns (A–H):
   *   OrderID | SKU | Model | Color | Size | Qty | Unit Price | Subtotal
   */
  async appendOrder(
    orderId: string,
    dto: CreateOrderDto,
    total: number,
    slipFilename: string,
  ): Promise<void> {
    const sheets = this.getSheetsClient();
    const spreadsheetId = this.config.get<string>('google.sheetId');
    const ordersTab = this.config.get<string>('google.ordersSheet');
    const itemsTab = this.config.get<string>('google.itemsSheet');
    const now = new Date().toISOString();

    // ── Orders row ─────────────────────────────────────────────────────────
    const orderRow = [
      orderId,
      now,
      dto.customer.name,
      dto.customer.phone,
      dto.customer.address,
      total,
      dto.items.length,
      slipFilename,
      dto.note ?? '',
    ];

    // ── OrderItems rows (one per line item) ────────────────────────────────
    const itemRows = dto.items.map((item) => [
      orderId,
      item.sku,
      item.model,
      item.color,
      item.size,
      item.qty,
      item.unitPrice,
      item.qty * item.unitPrice, // subtotal
    ]);

    try {
      // Write order header
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${ordersTab}!A:I`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [orderRow] },
      });

      // Write item lines
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${itemsTab}!A:H`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: itemRows },
      });
    } catch (err: any) {
      console.error('Google Sheets error:', err?.message);
      throw new InternalServerErrorException('Failed to write to Google Sheets.');
    }
  }
}
