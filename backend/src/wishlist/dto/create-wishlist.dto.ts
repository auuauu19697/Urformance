import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWishlistDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  instagram: string;

  @IsString()
  @IsOptional()
  note?: string;
}
