import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  /**
   * POST /api/waitlist
   * Headers: X-API-Key
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createWaitlist(@Body() createWaitlistDto: CreateWaitlistDto) {
    return this.waitlistService.createWaitlist(createWaitlistDto);
  }
}
