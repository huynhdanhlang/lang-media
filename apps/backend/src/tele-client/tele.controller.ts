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
import { Request } from 'express';

@Injectable()
@Controller('telegram')
export class TeleControlelr {
  constructor(private teleService: TeleClientService) {}

  @Get()
  async getMe() {
    return this.teleService.getMe();
  }

  @Post('/webhook')
  async getWebhookInfo(@Req() req: Request) {
    console.log(req.body);
  }
}
