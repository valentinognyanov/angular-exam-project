import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { NewsService } from '../news.service';

import { USER_KEY } from 'src/app/shared/constants';
import { User } from 'src/app/types/user.model';

@Component({
  selector: 'app-details-news',
  templateUrl: './details-news.component.html',
  styleUrls: ['./details-news.component.css'],
})
export class DetailsNewsComponent {
  userId: any;
  currUserEmail: any;
  users: any;
  news = this.readNews();
  likedByUser!: boolean;
  dislikedByUser!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public newsService: NewsService,
    public angularFirestore: AngularFirestore
  ) {
    if (this.isLogged) {
      this.currUserEmail = JSON.parse(
        localStorage.getItem(USER_KEY) as any
      ).email;
    }

    const newsId: any = this.route.snapshot.paramMap.get('id');
    const newsRef = this.angularFirestore.collection('news').doc(newsId);

    newsRef.get().subscribe((n) => {
      if (n.get('upvotes')) {
        let upvotesArr = Array.from(n.get('upvotes'));

        if (upvotesArr.includes(this.currUserEmail)) {
          this.likedByUser = true;
          this.dislikedByUser = false;
        }
      }

      if (n.get('downvotes')) {
        let downvotesArr = Array.from(n.get('downvotes'));

        if (downvotesArr.includes(this.currUserEmail)) {
          this.likedByUser = false;
          this.dislikedByUser = true;
        }
      }
    });

    this.angularFirestore
      .collection('users')
      .snapshotChanges()
      .subscribe((res) => {
        this.users = res.map((u) => {
          return {
            id: u.payload.doc.id,
            ...(u.payload.doc.data() as {}),
          } as User;
        });
      });
  }

  get isLogged(): boolean {
    return !!localStorage.getItem(USER_KEY);
  }

  readNews(): any {
    const newsId: any = this.route.snapshot.paramMap.get('id');
    return this.newsService
      .getSingleNews(newsId!)
      .subscribe((data) => (this.news = data));
  }

  updateNews(): any {
    const newsId: any = this.route.snapshot.paramMap.get('id');

    this.router.navigate([`news/${newsId}/update`]);
  }

  deleteNews(uid: any): any {
    if (confirm('Are you sure you want to delete this news?')) {
      if (uid !== undefined) this.userId = uid;

      const userRef = this.angularFirestore
        .collection('users')
        .doc(this.userId);
      const newsId: any = this.route.snapshot.paramMap.get('id');

      userRef.get().subscribe((u) => {
        if (u.get('news')) {
          let newsArr = Array.from(u.get('news'));

          if (newsArr.includes(newsId)) {
            let indexOfThisNews = newsArr.indexOf(newsId);
            newsArr.splice(indexOfThisNews, 1);
            userRef.update({
              news: newsArr,
            });
          }
        }
      });
      this.router.navigate(['']);

      return this.newsService.deleteNews(newsId);
    }
  }

  upvoteNews(uid: any) {
    if (uid !== undefined) this.userId = uid;

    this.likedByUser = true;
    this.dislikedByUser = false;

    const userRef = this.angularFirestore.collection('users').doc(this.userId);
    const newsId: any = this.route.snapshot.paramMap.get('id');
    const newsRef = this.angularFirestore.collection('news').doc(newsId);

    userRef.get().subscribe((u) => {
      if (!u.get('upvotes')) {
        userRef.set(
          {
            upvotes: [newsId],
          },
          {
            merge: true,
          }
        );
      } else {
        let upvotesArr = Array.from(u.get('upvotes'));

        if (!upvotesArr.includes(newsId)) {
          upvotesArr.push(newsId);

          userRef.update({
            upvotes: upvotesArr,
          });
        }
      }

      if (u.get('downvotes')) {
        let downvotesArr = Array.from(u.get('downvotes'));

        if (downvotesArr.includes(newsId)) {
          let indexOfThisNews = downvotesArr.indexOf(newsId);
          downvotesArr.splice(indexOfThisNews, 1);
          userRef.update({
            downvotes: downvotesArr,
          });
        }
      }
    });

    newsRef.get().subscribe((n) => {
      if (!n.get('upvotes')) {
        newsRef.set(
          {
            upvotes: [this.currUserEmail],
          },
          {
            merge: true,
          }
        );
      } else {
        let upvotesArr = Array.from(n.get('upvotes'));

        if (!upvotesArr.includes(this.currUserEmail)) {
          upvotesArr.push(this.currUserEmail);
          newsRef.update({
            upvotes: upvotesArr,
          });
        }
      }

      if (n.get('downvotes')) {
        let downvotesArr = Array.from(n.get('downvotes'));

        if (downvotesArr.includes(this.currUserEmail)) {
          let indexOfThisUser = downvotesArr.indexOf(this.currUserEmail);
          downvotesArr.splice(indexOfThisUser, 1);
          newsRef.update({
            downvotes: downvotesArr,
          });
        }
      }
    });
  }

  downvoteNews(uid: any) {
    if (uid !== undefined) this.userId = uid;

    this.likedByUser = false;
    this.dislikedByUser = true;

    const newsId: any = this.route.snapshot.paramMap.get('id');
    const newsRef = this.angularFirestore.collection('news').doc(newsId);
    const userRef = this.angularFirestore.collection('users').doc(this.userId);

    userRef.get().subscribe((u) => {
      if (!u.get('downvotes')) {
        userRef.set(
          {
            downvotes: [newsId],
          },
          {
            merge: true,
          }
        );
      } else {
        let downvotesArr = Array.from(u.get('downvotes'));

        if (!downvotesArr.includes(newsId)) {
          downvotesArr.push(newsId);
          userRef.update({
            downvotes: downvotesArr,
          });
        }
      }

      if (u.get('upvotes')) {
        let upvotesArr = Array.from(u.get('upvotes'));

        if (upvotesArr.includes(newsId)) {
          let indexOfThisNews = upvotesArr.indexOf(newsId);
          upvotesArr.splice(indexOfThisNews, 1);
          userRef.update({
            upvotes: upvotesArr,
          });
        }
      }
    });

    newsRef.get().subscribe((n) => {
      if (!n.get('downvotes')) {
        newsRef.set(
          {
            downvotes: [this.currUserEmail],
          },
          {
            merge: true,
          }
        );
      } else {
        let downvotesArr = Array.from(n.get('downvotes'));

        if (!downvotesArr.includes(this.currUserEmail)) {
          downvotesArr.push(this.currUserEmail);
          newsRef.update({
            downvotes: downvotesArr,
          });
        }
      }

      if (n.get('upvotes')) {
        let upvotesArr = Array.from(n.get('upvotes'));

        if (upvotesArr.includes(this.currUserEmail)) {
          let indexOfThisUser = upvotesArr.indexOf(this.currUserEmail);
          upvotesArr.splice(indexOfThisUser, 1);
          newsRef.update({
            upvotes: upvotesArr,
          });
        }
      }
    });
  }
}
