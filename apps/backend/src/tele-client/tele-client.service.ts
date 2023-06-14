import { Inject, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafContext } from './tele.interface';
import axios from 'axios';
@Injectable()
export class TeleClientService {
  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}

  async getMe() {
    return await this.bot.telegram.getUpdates(0, 100, 10, ['channel_post', 'message']);
    // const data = await axios.post(
    //   'http://35.208.177.98:8081/bot***REMOVED***/getUpdates',
    //   {}
    // );
    // return data.data;
  }
}
