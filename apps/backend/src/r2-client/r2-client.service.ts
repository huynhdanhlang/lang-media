import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import { v4 as uuidV4 } from 'uuid';
import {
  MapMultiPartFinalDto,
  MultiPartPreSignedUrlDto,
} from './dto/multipart.input';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UploadPartCommand } from '@aws-sdk/client-s3';
import { orderBy } from 'lodash';

@Injectable()
export class R2ClientService {
  private readonly logger: LoggerService;
  constructor(
    @InjectS3() private readonly s3: S3,
    private configService: ConfigService
  ) {
    this.logger = new Logger(R2ClientService.name);
  }

  async initializeMultipartUpload(filename: string, fileExt: string) {
    const key = fileExt + '/' + uuidV4() + filename;
    const multipartUpload = await this.s3.createMultipartUpload(
      {
        Bucket: this.configService.get('R2_BUCKET_NAME'),
        Key: key,
        ACL: 'public-read',
      },
      {}
    );
    return {
      fileId: multipartUpload.UploadId,
      fileKey: multipartUpload.Key,
    };
  }

  async getMultipartPreSignedUrls(
    multiPartPreSignedUrlDto: MultiPartPreSignedUrlDto
  ) {
    const { fileKey, fileId, parts } = multiPartPreSignedUrlDto;
    const multipartParams = {
      Bucket: this.configService.get('R2_BUCKET_NAME'),
      Key: fileKey,
      UploadId: fileId,
    };
    try {
      const promises = [];
      for (let index = 0; index < parts; index++) {
        promises.push(
          getSignedUrl(
            this.s3,
            new UploadPartCommand({
              ...multipartParams,
              PartNumber: index + 1,
            })
          )
        );
      }
      const signedUrls = await Promise.all<string[]>(promises);
      // assign to each URL the index of the part to which it corresponds
      const partSignedUrlList = signedUrls.map((signedUrl, index) => {
        return {
          signedUrl: signedUrl,
          PartNumber: index + 1,
        };
      });
      return {
        parts: partSignedUrlList,
      };
    } catch (error) {
      this.logger.error(error);

      if (fileId) {
        await this.s3.abortMultipartUpload(multipartParams);
      }
    }
  }

  async finalizeMultipartUpload(mapMultiPartFinalDto: MapMultiPartFinalDto) {
    const { fileId, fileKey, parts } = mapMultiPartFinalDto;
    const multipartParams = {
      Bucket: this.configService.get('R2_BUCKET_NAME'),
      Key: fileKey,
      UploadId: fileId,
      MultipartUpload: {
        // ordering the parts to make sure they are in the right order
        Parts: orderBy(parts, ['PartNumber'], ['asc']),
      },
    };
    try {
      const completeMultipartUploadOutput =
        await this.s3.completeMultipartUpload(multipartParams);
      // completeMultipartUploadOutput.Location represents the
      // URL to the resource just uploaded to the cloud storage
      return completeMultipartUploadOutput;
    } catch (error) {
      this.logger.error(error);

      if (fileId) {
        await this.s3.abortMultipartUpload(multipartParams);
      }
    }
  }
}
