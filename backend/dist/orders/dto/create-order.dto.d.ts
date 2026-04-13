export declare class CustomerDto {
    name: string;
    phone: string;
    address: string;
}
export declare class OrderItemDto {
    sku: string;
    model: string;
    color: string;
    size: string;
    qty: number;
    unitPrice: number;
}
export declare class CreateOrderDto {
    customer: CustomerDto;
    items: OrderItemDto[];
    note?: string;
}
