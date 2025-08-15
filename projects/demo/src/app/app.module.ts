import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxTusUploaderModule} from "projects/ngx-tus-uploader/src/lib/ngx-tus-uploader.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxTusUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
