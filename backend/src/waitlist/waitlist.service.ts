import { Injectable } from '@nestjs/common';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { SheetsService } from '../sheets/sheets.service';

@Injectable()
export class WaitlistService {
  constructor(private readonly sheets: SheetsService) {}

  async createWaitlist(dto: CreateWaitlistDto): Promise<{ success: boolean; message: string }> {
    await this.sheets.appendWaitlist(dto);
    return { success: true, message: 'Waitlist joined successfully.' };
  }
}
