import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SheetsModule } from 'src/sheets/sheets.module';
import { DriveModule } from 'src/drive/drive.module';
import { MailModule } from 'src/mail/mail.module';


@Module({
  imports: [SheetsModule, DriveModule, MailModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
