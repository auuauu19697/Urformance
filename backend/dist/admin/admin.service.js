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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const sheets_service_1 = require("../sheets/sheets.service");
let AdminService = class AdminService {
    constructor(sheetsService) {
        this.sheetsService = sheetsService;
    }
    async searchByOrderId(orderId) {
        const [orders, items] = await Promise.all([
            this.sheetsService.readOrders(),
            this.sheetsService.readOrderItems(),
        ]);
        const order = orders.find((o) => o.orderId === orderId);
        if (!order)
            return null;
        const orderItems = items.filter((i) => i.orderId === orderId);
        return { ...order, items: orderItems };
    }
    async searchByScreening(query) {
        if (!query)
            return [];
        const [orders, items] = await Promise.all([
            this.sheetsService.readOrders(),
            this.sheetsService.readOrderItems(),
        ]);
        const q = query.toLowerCase();
        const matchedItems = items.filter((item) => {
            if (!item.screeningData)
                return false;
            const values = Object.values(item.screeningData).map((v) => String(v).toLowerCase());
            return values.some((val) => val.includes(q));
        });
        if (matchedItems.length === 0)
            return [];
        const matchedOrderIds = [...new Set(matchedItems.map((i) => i.orderId))];
        const results = matchedOrderIds.map((id) => {
            const order = orders.find((o) => o.orderId === id);
            const oItems = items.filter((i) => i.orderId === id);
            return { ...order, items: oItems };
        });
        return results.filter(r => r.orderId);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sheets_service_1.SheetsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map