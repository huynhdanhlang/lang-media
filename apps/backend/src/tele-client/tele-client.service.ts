import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { IMediaGroupFile, TelegrafContext } from './tele.interface';
import { MediaGroup } from 'telegraf/typings/telegram-types';
import { fromStream } from 'file-type';
import { FileUploadDto } from '../shared/grahql.input';
import { compressImage, streamToBuffer } from '../helper/grapql-upload.helper';
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

  buildMediGroupType(files: FileUploadDto[]): IMediaGroupFile[] {
    return files.map((file) => ({
      file: file.createReadStream(),
      filename: file.filename,
      mimetype: file.mimetype,
    }));
  }

  mapMediaGroupFile(medias: IMediaGroupFile[]): MediaGroup {
    return medias.map((media) => {
      console.log(media.mimetype);
      const type = media.mimetype.split('/')[1] == 'mp4' ? 'video' : 'photo';
      return {
        media: {
          source: media.file,
          filename: media.filename,
        },
        type,
      };
    });
  }
  async uploadFile(medias: IMediaGroupFile[]) {
    const mediaFiles = this.mapMediaGroupFile(medias);
    const sentFile = await this.bot.telegram.sendMediaGroup(
      this.configService.get('TELE_PRIVATE_CHAT_ID'),
      mediaFiles,
      {}
    );
    return sentFile;
  }

  async deleteFile(messageId: number) {
    return await this.bot.telegram.deleteMessage(
      this.configService.get('TELE_PRIVATE_CHAT_ID'),
      messageId
    );
  }
}
