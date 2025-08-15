import {Injectable} from '@angular/core';
import {Upload, UploadOptions, PreviousUpload} from 'tus-js-client';
import {Auth, buildAuthHeader} from './utils/auth-utils';

export interface UploadProgress {
  bytesUploaded: number;
  bytesTotal: number;
  percentage: number;
}

export interface ExtraMetadata {
  guid: string;
  member?: string | number;
  filePath?: string;
}

@Injectable({providedIn: 'root'})
export class NgxTusUploaderService {

  private upload: Upload | null = null;

  startUpload(
    file: File,
    endpoint: string,
    auth: Auth | undefined,
    extra: ExtraMetadata,
    onProgress: (progress: UploadProgress) => void,
    onSuccess: () => void,
    onError: (error: Error) => void,
  ): void {

    const options: UploadOptions = {
      endpoint,
      retryDelays: [0, 1000, 3000, 5000],
      chunkSize: 5 * 1024 * 1024, // 5MB chunks for optimal performance
      metadata: {
        filename: file.name,
        filetype: file.type || 'application/octet-stream',
        guid: String(extra.guid),
        ...(extra.member != null ? {member: String(extra.member)} : {}),
        ...(extra.filePath ? {filepath: extra.filePath} : {}),
      },
      headers: {...buildAuthHeader(auth)},
      onError: (error) => {
        if (error.name === 'AbortError') {
          onError(new Error('Upload was aborted'))
        } else if (error.name === 'NetworkError') {
          onError(new Error('Network connection lost - upload will resume automatically'))
        } else {
          onError(error)
        }
      },
      removeFingerprintOnSuccess: true,
      onShouldRetry: function (err, retryAttempt, options) {
        const status = err.originalResponse ? err.originalResponse.getStatus() : 0;
        // If the status is a 403, we do not want to retry.
        if (status === 403 || status === 401) {
          return false
        }
        // For any other status code, tus-js-client should retry.
        return true
      },
      onProgress: (bytesUploaded: number, bytesTotal: number) => {
        onProgress({
          bytesUploaded,
          bytesTotal,
          percentage: (bytesUploaded / bytesTotal) * 100,
        })
      },
      onSuccess: () => {
        console.log('Download %s from %s', file.name, this.upload?.url)
        onSuccess()
      },
    }

    this.upload = new Upload(file, options)

    // this.upload.findPreviousUploads().then(previousUploads => {
    //   if (previousUploads.length) {
    //     console.log(previousUploads)
    //     this.upload?.resumeFromPreviousUpload(previousUploads[0])
    //   }
    // })

    this.upload.start()
  }

  abortUpload(): void {
    if (this.upload) {
      this.upload.abort()
    }
  }
}
