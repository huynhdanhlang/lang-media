import { Controller, Get, Injectable } from '@nestjs/common';
import { TeleClientService } from './tele-client.service';

@Injectable()
@Controller('tele')
export class TeleControlelr {
  constructor(private teleService: TeleClientService) {}

  @Get()
  async getMe() {
    return this.teleService.getMe();
  }
}
