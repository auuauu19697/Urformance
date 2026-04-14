import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(slip: Express.Multer.File, orderString: string): Promise<{
        success: boolean;
        orderId: string;
        total: number;
        message: string;
    }>;
}
