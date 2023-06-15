import { Injectable } from '@nestjs/common';
import {
  Hears,
  Help,
  Command,
  On,
  Start,
  Update,
  Message,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { TelegrafContext } from './tele.interface';
import { TeleClientService } from './tele-client.service';

@Update()
@Injectable()
export class BotProvider {
  constructor(private readonly bot: TeleClientService) {}
  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.getBotInstance().telegram.getMe();
    return `Hey, I'm ${me.first_name}`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @Command('admin')
  onAdminCommand(): string {
    return 'Welcome judge';
  }

  // @On('text')
  // onMessage(@Message('text') reversedText: string) {
  //   return this.bot.getBotInstance().telegram.sendMessage(669039393, {
  //     text: 'dsd',
  //   });
  // }
}
