import { NgModule } from '@angular/core';
import { NgxTusUploaderComponent } from './ngx-tus-uploader.component';
import {NgxTusUploaderService} from "./ngx-tus-uploader.service";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    NgxTusUploaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxTusUploaderComponent
  ],
  providers: [NgxTusUploaderService]
})
export class NgxTusUploaderModule { }
