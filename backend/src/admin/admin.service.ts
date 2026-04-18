import { Injectable } from '@nestjs/common';
import { SheetsService } from '../sheets/sheets.service';

@Injectable()
export class AdminService {
  constructor(private readonly sheetsService: SheetsService) { }

  async searchByOrderId(orderId: string) {
    const [orders, items] = await Promise.all([
      this.sheetsService.readOrders(),
      this.sheetsService.readOrderItems(),
    ]);

    const order = orders.find((o) => o.orderId === orderId);
    if (!order) return null;

    const orderItems = items.filter((i) => i.orderId === orderId);
    return { ...order, items: orderItems };
  }

  async searchByScreening(query: string) {
    if (!query) return [];

    const [orders, items] = await Promise.all([
      this.sheetsService.readOrders(),
      this.sheetsService.readOrderItems(),
    ]);

    const q = query.toLowerCase();

    // Find items that have screeningData matching the query
    const matchedItems = items.filter((item) => {
      if (!item.screeningData) return false;
      const values = Object.values(item.screeningData).map((v: any) => String(v).toLowerCase());
      return values.some((val) => val.includes(q));
    });

    if (matchedItems.length === 0) return [];

    // Map matched items back to their parent orders securely
    const matchedOrderIds = [...new Set(matchedItems.map((i) => i.orderId))];
    const results = matchedOrderIds.map((id) => {
      const order = orders.find((o) => o.orderId === id);
      const oItems = items.filter((i) => i.orderId === id);
      return { ...order, items: oItems };
    });

    // Remove any null orders if data is inconsistent
    return results.filter(r => r.orderId);
  }
}
