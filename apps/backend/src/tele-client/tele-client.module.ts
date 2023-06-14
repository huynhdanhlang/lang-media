import { Module } from '@nestjs/common';
import { TeleClientService } from './tele-client.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeleControlelr } from './tele.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get('TELE_APP_API_BOT_TOKEN'),
        launchOptions: {
          webhook: {
            domain: configService.get('TELE_WEBHOOK_DOMAIN_URL'),
            hookPath: configService.get('TELE_WEBHOOK_PATH'),
          },
        },
        options: {
          telegram: {
            apiRoot: configService.get('TELE_OWN_API_URL'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TeleClientService],
  exports: [TeleClientService],
  controllers: [TeleControlelr],
})
export class TeleClientModule {}
