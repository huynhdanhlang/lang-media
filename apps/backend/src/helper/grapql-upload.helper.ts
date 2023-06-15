import { Readable } from 'stream';
import sharp from 'sharp';
import {
  IMAGE_SIZE,
  MAX_WIDTH,
  QUALITY_ARRAY,
} from '../constant/graphql.const';

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const buffer: Uint8Array[] = [];

  return new Promise((resolve, reject) =>
    stream
      .on('error', (error) => reject(error))
      .on('data', (data) => buffer.push(data))
      .on('end', () => resolve(Buffer.concat(buffer)))
  );
}

function validateImage(mimetype: string): string | false {
  const val = mimetype.split('/');
  if (val[0] !== 'image') return false;

  return val[1] ?? false;
}

async function compressImage(buffer: Buffer, ratio?: number): Promise<Buffer> {
  let compressBuffer: sharp.Sharp | Buffer = sharp(buffer).jpeg({
    mozjpeg: true,
    chromaSubsampling: '4:4:4',
  });

  if (ratio) {
    compressBuffer.resize({
      width: MAX_WIDTH,
      height: Math.round(MAX_WIDTH * ratio),
      fit: 'cover',
    });
  }

  compressBuffer = await compressBuffer.toBuffer();

  if (compressBuffer.length > IMAGE_SIZE) {
    for (let i = 0; i < QUALITY_ARRAY.length; i++) {
      const quality = QUALITY_ARRAY[i];
      const smallerBuffer = await sharp(compressBuffer)
        .jpeg({
          quality,
          chromaSubsampling: '4:4:4',
        })
        .toBuffer();

      if (smallerBuffer.length <= IMAGE_SIZE || quality === 10) {
        compressBuffer = smallerBuffer;
        break;
      }
    }
  }

  return compressBuffer;
}

export { streamToBuffer, validateImage, compressImage };
