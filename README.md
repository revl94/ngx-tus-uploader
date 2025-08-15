# ngx-tus-uploader

An Angular library and demo project for resumable file uploads using the [tus.io](https://tus.io) protocol via [`tus-js-client`](https://github.com/tus/tus-js-client).

This repository contains:
- **`projects/ngx-tus-uploader`** — the reusable Angular library.
- **`projects/demo`** — an Angular demo app showing how to use the library.

---

## Features

- 📂 **Resumable uploads** using the tus protocol.
- ⏯ **Pause and resume** uploads without losing progress.
- 📡 Automatic retry on network issues.
- 🔒 Authentication header support.
- ⚡ Chunked uploads for better performance.

---

## Built With

- [Angular](https://angular.io/)
- [tus-js-client](https://github.com/tus/tus-js-client)
- [TypeScript](https://www.typescriptlang.org/)

---

## Installation

Install the library in your Angular project:

```sh
npm install ngx-tus-uploader tus-js-client
```

Ensure you have Angular 14+ in your project, as it is required.

---

## Usage

### Import and Inject

```ts
import { Component } from '@angular/core';
import { NgxTusUploaderService, UploadProgress } from 'ngx-tus-uploader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  progress: UploadProgress | null = null;

  constructor(private uploader: NgxTusUploaderService) {}

  startUpload(file: File) {
    this.uploader.startUpload(
      file,
      'https://your-tus-server/files/',
      { scheme: 'Bearer', token: 'YOUR_TOKEN' },
      { guid: 'abc123', member: 1 },
      (progress) => this.progress = progress,
      () => console.log('Upload complete!'),
      (err) => console.error(err)
    );
  }
}
```

### HTML Example

```html
<input type="file" (change)="startUpload($event.target.files[0])" />
<div *ngIf="progress">
  Uploaded: {{ progress.percentage | number: '1.0-0' }}%
</div>
```

---

## Running the Demo

Clone this repository:

```sh
git clone https://github.com/revl94/ngx-tus-uploader.git
cd ngx-tus-uploader
```

Install dependencies:

```sh
npm install
```

Run the demo app:

```sh
ng serve demo
```

Open [http://localhost:4200](http://localhost:4200) to see the demo in action.

---

## Repository Structure

```
projects/
├── demo/                  # Demo Angular application
└── ngx-tus-uploader/      # Library source code
```

---

## Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.
