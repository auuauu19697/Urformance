import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  /**
   * GET /api/admin/orders/search?screening=SOMCHAI
   */
  @Get('orders/search')
  async searchOrders(@Query('screening') screeningParam?: string) {
    if (!screeningParam) {
      return { success: true, results: [] };
    }
    const results = await this.adminService.searchByScreening(screeningParam);
    return { success: true, count: results.length, results };
  }

  /**
   * GET /api/admin/orders/:id
   */
  @Get('orders/:id')
  async getOrderById(@Param('id') id: string) {
    const order = await this.adminService.searchByOrderId(id);
    if (!order) {
      throw new NotFoundException(`Order ${id} not found.`);
    }
    return { success: true, order };
  }
}
