import { IsMimeType, IsString } from 'class-validator';
import {Readable as ReadableStream} from 'stream';

abstract class FileUploadDto {
  @IsString()
  public filename!: string;
  
  @IsString()
  @IsMimeType()
  public mimetype!: string;

  @IsString()
  public encoding!: string;

  public createReadStream: () => ReadableStream;
}

interface IUploaderMiddlewareOptions {
  maxFieldSize?: number;
  maxFileSize?: number;
  maxFiles?: number;
}

export { FileUploadDto, IUploaderMiddlewareOptions };

