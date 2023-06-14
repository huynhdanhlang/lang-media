import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { TeleClientService } from './tele-client.service';
import { Context, Ctx, On, Update } from 'nestjs-telegraf';
import { TelegrafContext } from './tele.interface';

@Injectable()
@Update()
@Controller('telegram')
export class TeleControlelr {
  constructor(private teleService: TeleClientService) {}

  @Get()
  async getMe() {
    return this.teleService.getMe();
  }

  @Post('/webhook')
  @On('text')
  async getWebhookInfo(@Context() cxt: TelegrafContext) {
    console.log(cxt);

    return await cxt.reply('helllo');
  }
}
