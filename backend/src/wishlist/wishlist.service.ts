import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { SheetsService } from '../sheets/sheets.service';

@Injectable()
export class WishlistService {
  constructor(private readonly sheets: SheetsService) {}

  async createWishlist(dto: CreateWishlistDto): Promise<{ success: boolean; message: string }> {
    await this.sheets.appendWishlist(dto);
    return { success: true, message: 'Wishlist joined successfully.' };
  }
}
