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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async createOrder(slip, orderString) {
        if (!slip) {
            throw new common_1.BadRequestException('Payment slip is required');
        }
        let parsed;
        try {
            parsed = JSON.parse(orderString);
        }
        catch {
            throw new common_1.BadRequestException('Invalid JSON format in "order" field');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_order_dto_1.CreateOrderDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = await (0, class_validator_1.validate)(dto, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (errors.length > 0) {
            const flattenErrors = (errs, parent = '') => {
                let res = [];
                for (const err of errs) {
                    const propertyPath = parent ? `${parent}.${err.property}` : err.property;
                    if (err.constraints) {
                        res.push(...Object.values(err.constraints).map(msg => `${propertyPath}: ${msg}`));
                    }
                    if (err.children?.length) {
                        res.push(...flattenErrors(err.children, propertyPath));
                    }
                }
                return res;
            };
            const formattedErrors = flattenErrors(errors);
            console.error('Validation Errors:', JSON.stringify(formattedErrors, null, 2));
            throw new common_1.BadRequestException(formattedErrors);
        }
        const result = await this.ordersService.createOrder(dto, slip);
        return {
            success: true,
            orderId: result.orderId,
            total: result.total,
            message: 'Order saved successfully.',
        };
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('slip', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            if (!file.mimetype.startsWith('image/')) {
                return cb(new common_1.BadRequestException('Only image files are accepted for the payment slip.'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map