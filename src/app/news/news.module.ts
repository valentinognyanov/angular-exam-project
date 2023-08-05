import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

import { UploadNewsComponent } from './upload-news/upload-news.component';

@NgModule({
  declarations: [UploadNewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UserModule,
  ],
})
export class NewsModule {}
