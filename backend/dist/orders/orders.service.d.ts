import { CreateOrderDto } from './dto/create-order.dto';
import { SheetsService } from '../sheets/sheets.service';
import { DriveService } from '../drive/drive.service';
export declare class OrdersService {
    private readonly sheets;
    private readonly drive;
    constructor(sheets: SheetsService, drive: DriveService);
    createOrder(dto: CreateOrderDto, slipFile: Express.Multer.File | undefined): Promise<{
        orderId: string;
        total: number;
    }>;
}
