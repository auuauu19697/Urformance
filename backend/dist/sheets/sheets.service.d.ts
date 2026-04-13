import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
export declare class SheetsService {
    private readonly config;
    constructor(config: ConfigService);
    private getSheetsClient;
    appendOrder(orderId: string, dto: CreateOrderDto, total: number, slipFilename: string): Promise<void>;
}
