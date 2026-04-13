import { CreateOrderDto } from './dto/create-order.dto';
import { SheetsService } from '../sheets/sheets.service';
export declare class OrdersService {
    private readonly sheets;
    constructor(sheets: SheetsService);
    createOrder(dto: CreateOrderDto, slipFile: Express.Multer.File | undefined): Promise<{
        orderId: string;
        total: number;
    }>;
}
