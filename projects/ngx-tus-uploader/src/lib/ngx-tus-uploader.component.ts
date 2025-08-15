import {Component} from '@angular/core';
import {NgxTusUploaderService, UploadProgress} from './ngx-tus-uploader.service';

@Component({
  selector: 'ngx-tus-uploader',
  templateUrl: './ngx-tus-uploader.component.html',
  styleUrls: ['./ngx-tus-uploader.component.scss']
})
export class NgxTusUploaderComponent {
  selectedFile: File | null = null
  progress: UploadProgress | null = null
  message = ''
  messageType = ''
  isUploading = false


  constructor(private ngxTusUploaderService: NgxTusUploaderService) {
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]
      this.progress = null
      this.message = ''
      this.messageType = ''
    }
  }

  startUpload(): void {
    if (!this.selectedFile) return

    this.isUploading = true
    const endpoint = 'https://your-server/upload';
    const token = '<JWT>';

    this.ngxTusUploaderService.startUpload(
      this.selectedFile,
      endpoint,
      {scheme: 'Bearer', token},
      {guid: 'abc123-xyz7905', member: 2},
      (progress) => {
        this.progress = progress
      },
      () => {
        this.message = 'Upload completed successfully!'
        this.messageType = 'success'
        this.isUploading = false
      },
      (error: Error) => {
        this.message = error.message
        this.messageType = 'error'
        this.isUploading = false
      },
    )
  }

  cancelUpload(): void {
    this.ngxTusUploaderService.abortUpload();
    this.isUploading = false;
    this.progress = null;
    this.message = 'Upload canceled';
    this.messageType = 'error';
  }
}
