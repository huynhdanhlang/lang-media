import { Readable as ReadableStream } from 'stream';
import { Scenes } from 'telegraf';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TelegrafContext extends Scenes.SceneContext {}

export interface IMediaGroupFile {
  file: ReadableStream;
  filename: string;
  mimetype: string;
}
