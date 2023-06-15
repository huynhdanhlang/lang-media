import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafContext } from './tele.interface';
@Injectable()
export class TeleClientService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private configService: ConfigService
  ) {}

  async getMe() {
    return await this.bot.telegram.getMe();
  }

  getBotInstance() {
    return this.bot;
  }

  // [
  //   {
  //     media:{
  //       source: file,
  //       filename
  //     },
  //     type:'audio'
  //   }
  // ]
  async uploadFile(file: NodeJS.ReadableStream, filename: string) {
    const sentFile = await this.bot.telegram.sendVideo(
      this.configService.get('TELE_PRIVATE_CHAT_ID'),
      {
        source: file,
        filename,
      },
      {}
    );
    return sentFile.message_id;
  }

  async deleteFile(messageId: number) {
    return await this.bot.telegram.deleteMessage(
      this.configService.get('TELE_PRIVATE_CHAT_ID'),
      messageId
    );
  }
}
