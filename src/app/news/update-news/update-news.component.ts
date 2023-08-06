import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsService } from '../news.service';

import { News } from 'src/app/types/news.model';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css'],
})
export class UpdateNewsComponent {
  sNews = this.getSingleNews();
  newsRef: any;
  public updateNewsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {
    this.updateNewsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      imageUrl: ['', [Validators.required]],
    });

    const newsId: any = this.route.snapshot.paramMap.get('id');

    this.newsService.getSingleNews(newsId).subscribe((res) => {
      this.newsRef = res;
      this.updateNewsForm = this.fb.group({
        title: [this.newsRef.title],
        imageUrl: [this.newsRef.imageUrl],
        content: [this.newsRef.content],
      });
    });
  }

  getSingleNews(): any {
    const id: any = this.route.snapshot.paramMap.get('id');
    return this.newsService
      .getSingleNews(id!)
      .subscribe((data) => (this.sNews = data));
  }

  onSubmit() {
    const id: any = this.route.snapshot.paramMap.get('id');

    this.newsService.updateNews(this.updateNewsForm.value, id);
    this.router.navigate([`/news/${id}`]);
  }

  cancelSubmit() {
    const id: any = this.route.snapshot.paramMap.get('id');

    this.router.navigate([`/news/${id}`]);
  }
}
