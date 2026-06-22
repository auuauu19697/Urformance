import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';
import { SheetsModule } from '../sheets/sheets.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [SheetsModule, MailModule],
  controllers: [WaitlistController],
  providers: [WaitlistService],
})
export class WaitlistModule {}
