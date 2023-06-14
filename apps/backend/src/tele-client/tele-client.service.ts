import { Inject, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafContext } from './tele.interface';
import axios from 'axios';
@Injectable()
export class TeleClientService {
  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}

  async getMe() {
    return await this.bot.telegram.getMe();
  }

  getBotInstance() {
    return this.bot;
  }
}
