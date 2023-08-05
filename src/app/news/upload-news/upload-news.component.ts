import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { UserService } from 'src/app/user/user.service';

import { User } from 'src/app/types/user';
import { News } from 'src/app/types/news';

import { USER_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-upload-news',
  templateUrl: './upload-news.component.html',
  styleUrls: ['./upload-news.component.css'],
})
export class UploadNewsComponent {
  getUser: string = this.userService.getUser;
  email: string = JSON.parse(this.getUser).email;
  userId: string = JSON.parse(this.getUser).uid;
  upvotes: string[] = [];
  downvotes: string[] = [];
  users: any;
  currentUserEmail!: string;
  newsId!: string;
  uid!: string;
  public uploadNewsForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public router: Router,
    public angularFirestore: AngularFirestore
  ) {
    if (userService.isLogged) {
      this.currentUserEmail = JSON.parse(
        localStorage.getItem(USER_KEY) as any
      ).email;
    }

    this.uploadNewsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      imageUrl: ['', [Validators.required]],
      author: this.email,
      authorId: this.userId,
      upvotes: this.upvotes,
      downvotes: this.downvotes,
      published: new Date(),
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

  uploadNews(sNews: News, userId: string) {
    if (userId !== undefined) this.uid = userId;

    return new Promise<any>((res, rej) => {
      this.angularFirestore
        .collection('news')
        .add(sNews)
        .then(
          (response) => {
            this.addNewsToCollection(this.uid, response.id);
          },
          (error) => rej(error)
        );
    });
  }

  addNewsToCollection(userId: string, newsId: string) {
    if (userId !== undefined) this.uid = userId;

    const userRef = this.angularFirestore.collection('users').doc(this.uid);

    userRef.get().subscribe((u) => {
      if (!u.get('news')) {
        userRef.set(
          {
            news: [newsId],
          },
          {
            merge: true,
          }
        );
      } else {
        let newsArr = Array.from(u.get('news'));

        if (!newsArr.includes(newsId)) {
          newsArr.push(newsId);
          userRef.update({
            news: newsArr,
          });
        }
      }
    });
  }

  onSubmit() {
    this.uploadNews(this.uploadNewsForm.value, this.uid);
    this.router.navigate(['']);
  }
}
