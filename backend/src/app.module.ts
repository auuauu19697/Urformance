import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import configuration from './config/configuration';
import { OrdersModule } from './orders/orders.module';
import { SheetsModule } from './sheets/sheets.module';

@Module({
  imports: [
    // Load .env and make ConfigService available everywhere
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SheetsModule,
    OrdersModule,
  ],
  providers: [
    // Apply API key guard globally to every route
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule { }
