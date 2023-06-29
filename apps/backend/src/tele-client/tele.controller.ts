import {
  Controller,
  Get,
  Injectable,
  Post,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { TeleClientService } from './tele-client.service';

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
