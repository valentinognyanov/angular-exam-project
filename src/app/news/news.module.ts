import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

import { NewsComponent } from './news/news.component';
import { UploadNewsComponent } from './upload-news/upload-news.component';
import { DetailsNewsComponent } from './details-news/details-news.component';
import { UpdateNewsComponent } from './update-news/update-news.component';

@NgModule({
  declarations: [NewsComponent, UploadNewsComponent, DetailsNewsComponent, UpdateNewsComponent],
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
