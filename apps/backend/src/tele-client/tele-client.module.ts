import { Module } from '@nestjs/common';
import { TeleClientService } from './tele-client.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TeleControlelr } from './tele.controller';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get('TELE_APP_API_BOT_TOKEN'),
        options: {
          telegram: {
            apiRoot: configService.get('TELE_OWN_API_URL'),
          },
          handlerTimeout: 60,
        },
        launchOptions: {
          allowedUpdates: ['message', 'channel_post'],
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
