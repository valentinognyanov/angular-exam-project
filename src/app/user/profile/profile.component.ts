import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { NewsService } from 'src/app/news/news.service';

import { News } from 'src/app/types/news.model';

import { USER_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  news!: News[];
  currentUser = JSON.parse(localStorage.getItem(USER_KEY) as any);
  routeUser: any;
  users!: any;

  constructor(
    public newsService: NewsService,
    public angularFirestore: AngularFirestore,
    private route: ActivatedRoute
  ) {
    
    this.newsService.getAllNews().subscribe((res) => {
      this.news = res.map((n) => {
        return {
          id: n.payload.doc.id,
          ...(n.payload.doc.data() as {}),
        } as News;
      });
    });

    this.angularFirestore
      .collection('users')
      .valueChanges()
      .subscribe((users) => {
        this.users = users;
      });

    const userId: any = this.route.snapshot.paramMap.get('id');

    this.angularFirestore
      .collection('users')
      .doc(userId)
      .valueChanges()
      .subscribe((user) => (this.routeUser = user));
    console.log(this.routeUser);

  }
}
