import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    searchOrders(screeningParam?: string): Promise<{
        success: boolean;
        results: any[];
        count?: undefined;
    } | {
        success: boolean;
        count: number;
        results: any[];
    }>;
    getOrderById(id: string): Promise<{
        success: boolean;
        order: any;
    }>;
}
