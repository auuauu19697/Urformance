import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { SheetsService } from '../sheets/sheets.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class WaitlistService {
  constructor(
    private readonly sheets: SheetsService,
    private readonly mail: MailService,
  ) {}

  async createWaitlist(dto: CreateWaitlistDto): Promise<{ success: boolean; message: string }> {
    if (dto.consentGiven !== true) {
      throw new BadRequestException('Consent to data usage is required to join the waitlist.');
    }

    await this.sheets.appendWaitlist(dto);

    // Send confirmation email asynchronously (non-blocking)
    this.mail.sendWaitlistConfirmation(dto).catch(() => {});

    return { success: true, message: 'Waitlist joined successfully.' };
  }
}
