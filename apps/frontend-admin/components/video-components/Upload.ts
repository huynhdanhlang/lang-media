import {
  MapProcessingMultiPart,
  MultiPartFinal,
} from '@training-project/data-access';
interface IOnProcess {
  sent: number;
  total: number;
  percentage: number;
}
interface IUploaderOptions {
  file: File;
  fileName: string;
  chunkSize?: number;
  threadsQuantity?: number;
  videoId: number;
  fieldType: string;
  initializeMultipartUpload: (options) => any;
  getMultipartPreSignedUrl: (options) => any;
  finalizeMultipartUpload: (options) => any;
}
// original source: https://github.com/pilovm/multithreaded-uploader/blob/master/frontend/uploader.js
export class Uploader {
  chunkSize: number;
  threadsQuantity: number;
  file: File;
  fileName: string;
  aborted: boolean;
  uploadedSize: number;
  progressCache: {};
  activeConnections: {};
  parts: MapProcessingMultiPart[];
  uploadedParts: MultiPartFinal[];
  fileId: string;
  fileKey: string;
  videoId: number;
  fieldType: string;
  onProgressFn: (onProgress: IOnProcess) => void;
  onErrorFn: (error) => void;
  initializeMultipartUpload: (options) => any;
  getMultipartPreSignedUrl: (options) => any;
  finalizeMultipartUpload: (options) => any;
  constructor(options: IUploaderOptions) {
    // this must be bigger than or equal to 5MB,
    // otherwise AWS will respond with:
    // "Your proposed upload is smaller than the minimum allowed size"
    this.chunkSize = options.chunkSize || 1024 * 1024 * 5;
    // number of parallel uploads
    this.threadsQuantity = Math.min(options.threadsQuantity || 5, 15);
    this.file = options.file;
    this.fileName = options.fileName;
    this.aborted = false;
    this.uploadedSize = 0;
    this.progressCache = {};
    this.activeConnections = {};
    this.parts = [];
    this.uploadedParts = [];
    this.fileId = '';
    this.fileKey = '';
    this.videoId = options.videoId;
    this.fieldType = options.fieldType;
    this.onProgressFn = () => {};
    this.onErrorFn = () => {};
    this.initializeMultipartUpload = options.initializeMultipartUpload;
    this.getMultipartPreSignedUrl = options.getMultipartPreSignedUrl;
    this.finalizeMultipartUpload = options.finalizeMultipartUpload;
  }

  // starting the multipart upload request
  start() {
    this.initialize();
  }

  async initialize() {
    try {
      // adding the the file extension (if present) to fileName
      let fileName = this.fileName;
      const ext = this.file.name.split('.').pop();
      if (ext) {
        fileName += `.${ext}`;
      }

      // initializing the multipart request
      const videoInitializationUploadInput = {
        filename: fileName,
        fileExt: ext,
      };

      const { data: multiPartData } = await this.initializeMultipartUpload({
        variables: {
          initMultiPartDto: {
            ...videoInitializationUploadInput,
          },
        },
      });

      const AWSFileDataOutput = multiPartData;

      this.fileId = AWSFileDataOutput.initializeMultipartUpload.fileId;
      this.fileKey = AWSFileDataOutput.initializeMultipartUpload.fileKey;

      // retrieving the pre-signed URLs
      const numberOfparts = Math.ceil(this.file.size / this.chunkSize);

      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfparts,
      };

      const { data: multiPartDataSigned } = await this.getMultipartPreSignedUrl(
        {
          variables: {
            multiPartPreSignedUrlDto: {
              ...AWSMultipartFileDataInput,
            },
          },
        }
      );

      const newParts = multiPartDataSigned.getMultipartPreSignedUrls.parts;
      this.parts.push(...newParts);
      this.sendNext();
    } catch (error) {
      await this.complete(error);
    }
  }

  sendNext() {
    const activeConnections = Object.keys(this.activeConnections).length;

    if (activeConnections >= this.threadsQuantity) {
      return;
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete();
      }

      return;
    }

    const part = this.parts.pop();
    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);

      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch((error) => {
          this.parts.push(part);

          this.complete(error);
        });
    }
  }

  // terminating the multipart upload request on success or failure
  async complete(error?: Error) {
    if (error && !this.aborted) {
      this.onErrorFn(error);
      return;
    }

    if (error) {
      this.onErrorFn(error);
      return;
    }

    try {
      await this.sendCompleteRequest();
    } catch (error) {
      this.onErrorFn(error);
    }
  }

  // finalizing the multipart upload request on success by calling
  // the finalization API
  async sendCompleteRequest() {
    if (this.fileId && this.fileKey) {
      const videoFinalizationMultiPartInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: this.uploadedParts,
        fieldType: this.fieldType,
        videoId: this.videoId,
      };
      await this.finalizeMultipartUpload({
        variables: {
          mapMultiPartFinalDto: {
            ...videoFinalizationMultiPartInput,
          },
        },
      });
    }
  }

  sendChunk(
    chunk: XMLHttpRequestBodyInit,
    part: MapProcessingMultiPart,
    sendChunkStarted: () => void
  ) {
    return new Promise((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then((status) => {
          if (status !== 200) {
            reject(new Error('Failed chunk upload'));
            return;
          }

          resolve(null);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // calculating the current progress of the multipart upload request
  handleProgress(part, event) {
    if (this.file) {
      if (
        event.type === 'progress' ||
        event.type === 'error' ||
        event.type === 'abort'
      ) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === 'uploaded') {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => (memo += this.progressCache[id]), 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);

      const total = this.file.size;

      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent: sent,
        total: total,
        percentage: percentage,
      });
    }
  }

  // uploading a part through its pre-signed URL
  upload(
    file: XMLHttpRequestBodyInit,
    part: MapProcessingMultiPart,
    sendChunkStarted: () => void
  ) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      if (this.fileId && this.fileKey) {
        // - 1 because PartNumber is an index starting from 1 and not 0
        const xhr = (this.activeConnections[part.PartNumber - 1] =
          new XMLHttpRequest());

        sendChunkStarted();

        const progressListener = this.handleProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener('progress', progressListener);

        xhr.addEventListener('error', progressListener);
        xhr.addEventListener('abort', progressListener);
        xhr.addEventListener('loadend', progressListener);

        xhr.open('PUT', part.signedUrl);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // retrieving the ETag parameter from the HTTP headers
            const ETag = xhr.getResponseHeader('ETag');

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                // removing the " enclosing carachters from
                // the raw ETag
                ETag: ETag.replaceAll('"', ''),
              };

              this.uploadedParts.push(uploadedPart);

              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
            }
          }
        };

        xhr.onerror = (error) => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.onabort = () => {
          reject(new Error('Upload canceled by user'));
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.send(file);
      }
    });
  }

  onProgress(onProgress) {
    this.onProgressFn = onProgress;
    return this;
  }

  onError(onError) {
    this.onErrorFn = onError;
    return this;
  }

  abort() {
    Object.keys(this.activeConnections)
      .map(Number)
      .forEach((id) => {
        this.activeConnections[id].abort();
      });

    this.aborted = true;
  }
}
