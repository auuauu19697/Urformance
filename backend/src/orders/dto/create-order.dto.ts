import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// ─── Customer ─────────────────────────────────────────────────────────────────
export class CustomerDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() phone: string;

  @IsString() @IsOptional() instagram?: string;

  // Thai structured address
  @IsString() @IsNotEmpty() addressLine1: string;   // house no, road, village
  @IsString() @IsNotEmpty() subdistrict: string;    // ตำบล / แขวง
  @IsString() @IsNotEmpty() district: string;       // อำเภอ / เขต
  @IsString() @IsNotEmpty() city: string;           // เมือง
  @IsString() @IsNotEmpty() province: string;       // จังหวัด
  @IsString() @IsNotEmpty() postalCode: string;     // รหัสไปรษณีย์
}

// ─── Order Item ───────────────────────────────────────────────────────────────
export class OrderItemDto {
  @IsString() @IsNotEmpty() sku: string;
  @IsString() @IsNotEmpty() model: string;
  @IsString() @IsNotEmpty() color: string;
  @IsString() @IsNotEmpty() size: string;

  @Type(() => Number) @IsNumber() @Min(1) qty: number;
  @Type(() => Number) @IsNumber() @IsPositive() unitPrice: number;

  /** Extra printing/screening fields, e.g. { jerseyNumber: '10', printName: 'SOMCHAI' } */
  @IsObject() @IsOptional() screeningData?: Record<string, string>;
}

// ─── Root DTO ─────────────────────────────────────────────────────────────────
export class CreateOrderDto {
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  /** When the customer made the payment — user-provided datetime string */
  @IsString() @IsNotEmpty() paymentDateTime: string;

  @IsString() @IsOptional() note?: string;
}
