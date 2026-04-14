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
var SheetsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SheetsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
let SheetsService = SheetsService_1 = class SheetsService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(SheetsService_1.name);
    }
    getSheetsClient() {
        const auth = new googleapis_1.google.auth.JWT({
            email: this.config.get('google.serviceAccountEmail'),
            key: this.config.get('google.privateKey'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        return googleapis_1.google.sheets({ version: 'v4', auth });
    }
    async appendOrder(orderId, dto, total, slipUrl) {
        const sheets = this.getSheetsClient();
        const spreadsheetId = this.config.get('google.sheetId');
        const ordersTab = this.config.get('google.ordersSheet');
        const itemsTab = this.config.get('google.itemsSheet');
        const { customer, items, paymentDateTime, note } = dto;
        const orderRow = [
            orderId,
            new Date().toISOString(),
            customer.fullName,
            customer.email,
            customer.phone,
            customer.instagram ?? '',
            customer.addressLine1,
            customer.subdistrict,
            customer.district,
            customer.city,
            customer.province,
            customer.postalCode,
            total,
            items.length,
            paymentDateTime,
            slipUrl,
            note ?? '',
        ];
        const itemRows = items.map((item) => [
            orderId,
            item.model,
            item.color,
            item.size,
            item.qty,
            item.unitPrice,
            item.qty * item.unitPrice,
            item.screeningData ? JSON.stringify(item.screeningData) : '',
        ]);
        try {
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: `${ordersTab}!A:Q`,
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                requestBody: { values: [orderRow] },
            });
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: `${itemsTab}!A:H`,
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                requestBody: { values: itemRows },
            });
        }
        catch (err) {
            this.logger.error('Google Sheets error:', err?.message);
            throw new common_1.InternalServerErrorException('Failed to write to Google Sheets.');
        }
    }
};
exports.SheetsService = SheetsService;
exports.SheetsService = SheetsService = SheetsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SheetsService);
//# sourceMappingURL=sheets.service.js.map