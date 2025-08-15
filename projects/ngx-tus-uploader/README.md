# ngx-tus-uploader

An **Angular service** for resumable file uploads using the [tus protocol 1.0.0](https://tus.io/) via [`tus-js-client`](https://github.com/tus/tus-js-client).  
Supports progress tracking, authentication headers, retry policies, and additional metadata.

---

## Features

- 📦 Resumable uploads with chunked transfer (default: 5 MB chunks)
- 🔄 Automatic retries with configurable backoff
- 📊 Progress reporting (`bytesUploaded`, `bytesTotal`, `percentage`)
- 🔑 Authentication via custom headers (e.g. `Authorization: Bearer …`)
- 📝 Custom upload metadata (`guid`, `member`, `filepath`)
- ⏸ Cancel or pause an ongoing upload

---

## Installation

```bash
npm install ngx-tus-uploader tus-js-client
```

> Requires Angular 13+ (service is `providedIn: 'root'`).

---

## Usage

### 1. Inject the service and start an upload

```ts
import { Component } from '@angular/core';
import { NgxTusUploaderService, UploadProgress } from 'ngx-tus-uploader';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  selectedFile: File | null = null;
  progress: UploadProgress | null = null;
  isUploading = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private tus: NgxTusUploaderService) {}

  onFileSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  startUpload() {
    if (!this.selectedFile) return;
    this.isUploading = true;

    const endpoint = 'https://your-server/upload';
    const token = '<JWT>';

    this.tus.startUpload(
      this.selectedFile,
      endpoint,
      { scheme: 'Bearer', token }, // The TUS server used the token in headers
      { guid: 'abc123', member: 1 },// (optional header if you server use extra header)
      (p: UploadProgress) => (this.progress = p),
      () => {
        this.message = 'Upload completed!';
        this.messageType = 'success';
        this.isUploading = false;
      },
      (err: Error) => {
        this.message = err.message;
        this.messageType = 'error';
        this.isUploading = false;
      }
    );
  }

  cancelUpload() {
    this.tus.abortUpload();
    this.isUploading = false;
    this.message = 'Upload canceled';
    this.messageType = 'error';
  }
}
```

### 2. Example template

```html
<input type="file" (change)="onFileSelected($event)" />

<button (click)="startUpload()" [disabled]="!selectedFile || isUploading">
  {{ isUploading ? 'Uploading…' : 'Upload' }}
</button>

<button *ngIf="isUploading" (click)="cancelUpload()">
  Cancel
</button>

<div *ngIf="progress">
  {{ progress.percentage | number: '1.0-0' }}%
</div>

<div *ngIf="message" [class]="messageType">
  {{ message }}
</div>
```

---

## API

### `startUpload(file, endpoint, auth, extra, onProgress, onSuccess, onError)`

- **file**: `File` object from `<input type="file">`.
- **endpoint**: TUS upload endpoint URL.
- **auth** *(optional)*: Authorization header config:
  - `{ raw: 'Bearer eyJ…' }` or `{ scheme: 'Bearer', token: 'eyJ…' }`
- **extra**: Additional metadata sent as `Upload-Metadata`:
  - `guid: string`
  - `member?: string|number`
  - `filePath?: string` (sent as `filepath`)
- **onProgress**: `(progress: { bytesUploaded, bytesTotal, percentage }) => void`
- **onSuccess**: `() => void`
- **onError**: `(error: Error) => void`

### `abortUpload()`
Cancels or pauses the current upload.

---

## Server Requirements

Your TUS server must:

- Support `POST`, `HEAD`, `PATCH`, `OPTIONS` (and optionally `DELETE`)
- Return `Tus-Resumable: 1.0.0` in all responses
- Return `Upload-Offset`, `Upload-Length`, and `Upload-Metadata` in `HEAD` responses
- Correctly handle chunked uploads (`PATCH` requests)
- Allow CORS for:
  - Methods: `POST, HEAD, PATCH, OPTIONS, DELETE`
  - Headers: `Authorization, Tus-Resumable, Upload-Offset, Upload-Length, Upload-Metadata, Content-Type`
  - Exposed headers: `Location, Tus-Resumable, Upload-Offset, Upload-Length, Upload-Metadata`

---

## Best Practices

- Ensure your server persists upload state until completion
- Test CORS preflight (`OPTIONS`) before expecting uploads to work in browsers

---

## License

MIT
