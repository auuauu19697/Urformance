import { ConfigService } from '@nestjs/config';
export declare class DriveService {
    private readonly config;
    private readonly logger;
    constructor(config: ConfigService);
    private getDriveClient;
    uploadSlip(file: Express.Multer.File, orderId: string): Promise<string>;
}
