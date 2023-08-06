import { Component } from '@angular/core';

import { NewsService } from '../news.service';

import { News } from 'src/app/types/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  news!: News[];

  constructor(private newsService: NewsService) {
    this.newsService.getAllNews().subscribe((res) => {
      this.news = res.map((n) => {
        return {
          id: n.payload.doc.id,
          ...(n.payload.doc.data() as {}),
        } as News;
      });
    });
  }
}
