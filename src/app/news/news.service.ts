import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { News } from '../types/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private angularFirestore: AngularFirestore) {}

  getAllNews() {
    return this.angularFirestore
      .collection('news', (ref) => ref.orderBy('published', 'desc'))
      .snapshotChanges();
  }

  getSingleNews(id: string) {
    return this.angularFirestore.collection('news').doc(id).valueChanges();
  }

  updateNews(news: News, id: string) {
    return this.angularFirestore.collection('news').doc(id).update({
      title: news.title,
      imageUrl: news.imageUrl,
      content: news.content,
    });
  }

  deleteNews(id: string) {
    return this.angularFirestore.collection('news').doc(id).delete();
  }
}
