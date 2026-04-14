export declare class CustomerDto {
    fullName: string;
    email: string;
    phone: string;
    instagram?: string;
    addressLine1: string;
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
}
export declare class OrderItemDto {
    sku: string;
    model: string;
    color: string;
    size: string;
    qty: number;
    unitPrice: number;
    screeningData?: Record<string, string>;
}
export declare class CreateOrderDto {
    customer: CustomerDto;
    items: OrderItemDto[];
    paymentDateTime: string;
    note?: string;
}
