import { SheetsService } from '../sheets/sheets.service';
export declare class AdminService {
    private readonly sheetsService;
    constructor(sheetsService: SheetsService);
    searchByOrderId(orderId: string): Promise<any>;
    searchByScreening(query: string): Promise<any[]>;
}
