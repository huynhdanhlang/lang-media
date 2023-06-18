import { Module, forwardRef } from '@nestjs/common';
import { R2ClientService } from './r2-client.service';
import { S3Module } from 'nestjs-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { R2ClientResolver } from './r2-client.resolver';
import { VideoModule } from '../video/video.module';

@Module({
  controllers: [],
  providers: [R2ClientService, R2ClientResolver],
  exports: [R2ClientService],
  imports: [
    forwardRef(() => VideoModule),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get('R2_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('R2_SECRECT_ACCESS_KEY'),
          },
          region: 'auto',
          endpoint: configService.get('R2_BUCKET_ENDPOINT'),
          forcePathStyle: true,
        },
      }),
    }),
  ],
})
export class R2ClientModule {}
