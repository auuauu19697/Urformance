import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  /**
   * POST /api/wishlist
   * Headers: X-API-Key
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createWishlist(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.createWishlist(createWishlistDto);
  }
}
