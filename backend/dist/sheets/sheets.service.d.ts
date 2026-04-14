import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
export declare class SheetsService {
    private readonly config;
    private readonly logger;
    constructor(config: ConfigService);
    private getSheetsClient;
    appendOrder(orderId: string, dto: CreateOrderDto, total: number, slipUrl: string): Promise<void>;
}
