"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DriveService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriveService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
let DriveService = DriveService_1 = class DriveService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(DriveService_1.name);
    }
    getDriveClient() {
        const clientId = this.config.get('google.clientId');
        const clientSecret = this.config.get('google.clientSecret');
        const refreshToken = this.config.get('google.refreshToken');
        if (!clientId || !clientSecret || !refreshToken) {
            throw new common_1.InternalServerErrorException('Missing OAuth2 credentials for Google Drive. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in your .env.');
        }
        const oauth2Client = new googleapis_1.google.auth.OAuth2(clientId, clientSecret, 'https://developers.google.com/oauthplayground');
        oauth2Client.setCredentials({
            refresh_token: refreshToken,
        });
        return googleapis_1.google.drive({ version: 'v3', auth: oauth2Client });
    }
    async uploadSlip(file, orderId) {
        const drive = this.getDriveClient();
        const folderId = this.config.get('google.driveFolderId');
        const ext = file.originalname.split('.').pop() ?? 'jpg';
        const filename = `slip_${orderId}.${ext}`;
        try {
            const uploaded = await drive.files.create({
                requestBody: {
                    name: filename,
                    parents: folderId ? [folderId] : undefined,
                },
                supportsAllDrives: true,
                media: {
                    mimeType: file.mimetype,
                    body: stream_1.Readable.from(file.buffer),
                },
                fields: 'id',
            });
            const fileId = uploaded.data.id;
            await drive.permissions.create({
                fileId,
                supportsAllDrives: true,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                },
            });
            return `https://drive.google.com/file/d/${fileId}/view`;
        }
        catch (err) {
            this.logger.error('Drive upload failed:', err);
            if (err?.response?.data?.error?.message) {
                this.logger.error('Google API Error:', err.response.data.error.message);
            }
            throw new common_1.InternalServerErrorException('Failed to upload payment slip to Google Drive.');
        }
    }
};
exports.DriveService = DriveService;
exports.DriveService = DriveService = DriveService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DriveService);
//# sourceMappingURL=drive.service.js.map