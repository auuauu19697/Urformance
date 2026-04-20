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

  async readOrders(): Promise<any[]> {
    const sheets = this.getSheetsClient();
    const spreadsheetId = this.config.get<string>('google.sheetId');
    const ordersTab = this.config.get<string>('google.ordersSheet');

    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${ordersTab}!A:P`,
      });
      const rows = res.data.values || [];
      if (rows.length <= 1) return []; // Only header or empty
      
      const dataRows = rows.slice(1);
      return dataRows.map(r => ({
        orderId: r[0],
        timestamp: r[1],
        customer: {
          fullName: r[2],
          email: r[3],
          phone: r[4],
          instagram: r[5],
          addressLine1: r[6],
          subdistrict: r[7],
          district: r[8],
          city: r[9],
          province: r[10],
          postalCode: r[11],
        },
        total: r[12],
        paymentDateTime: r[13],
        slipUrl: r[14],
        note: r[15],
      }));
    } catch (err: any) {
      this.logger.error('Failed to read Orders:', err?.message);
      return [];
    }
  }

  async readOrderItems(): Promise<any[]> {
    const sheets = this.getSheetsClient();
    const spreadsheetId = this.config.get<string>('google.sheetId');
    const itemsTab = this.config.get<string>('google.itemsSheet');

    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${itemsTab}!A:H`,
      });
      const rows = res.data.values || [];
      if (rows.length <= 1) return []; // Only header or empty

      const dataRows = rows.slice(1);
      return dataRows.map(r => {
        let screeningData = undefined;
        try {
          if (r[7] && r[7] !== 'No Screen') {
            screeningData = JSON.parse(r[7]);
          }
        } catch { }

        return {
          orderId: r[0],
          model: r[1],
          color: r[2],
          size: r[3],
          qty: Number(r[4] || 0),
          unitPrice: Number(r[5] || 0),
          subtotal: Number(r[6] || 0),
          screeningData,
        };
      });
    } catch (err: any) {
      this.logger.error('Failed to read OrderItems:', err?.message);
      return [];
    }
  }
}
