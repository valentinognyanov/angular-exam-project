import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { UploadNewsComponent } from './upload-news/upload-news.component';
import { DetailsNewsComponent } from './details-news/details-news.component';
import { UpdateNewsComponent } from './update-news/update-news.component';

import { IsLoggedInGuard } from '../guards/is-logged-in.guard';
import { isAuthorGuard } from '../guards/is-author.guard';

const routes: Routes = [
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'upload-news',
    component: UploadNewsComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'news/:id',
    component: DetailsNewsComponent,
  },
  {
    path: 'news/:id/update',
    component: UpdateNewsComponent,
    canActivate: [isAuthorGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
