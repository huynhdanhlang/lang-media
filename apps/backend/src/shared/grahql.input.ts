import { IsMimeType, IsString } from 'class-validator';

abstract class FileUploadDto {
  @IsString()
  public filename!: string;
  
  @IsString()
  @IsMimeType()
  public mimetype!: string;

  @IsString()
  public encoding!: string;

  public createReadStream: () => NodeJS.ReadStream;
}

interface IUploaderMiddlewareOptions {
  maxFieldSize?: number;
  maxFileSize?: number;
  maxFiles?: number;
}

export { FileUploadDto, IUploaderMiddlewareOptions };

