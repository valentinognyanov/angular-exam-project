import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { UserService } from 'src/app/user/user.service';

import { User } from 'src/app/types/user.model';

import { USER_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  users: any;
  
  get isLogged(): boolean {
    return !!localStorage.getItem(USER_KEY);
  }

  get userEmail() {
    return JSON.parse(localStorage.getItem(USER_KEY) as any).email;
  }
  constructor(
    public angularFirestore: AngularFirestore,
    public userService: UserService
  ) {
    this.angularFirestore
      .collection('users')
      .snapshotChanges()
      .subscribe((res) => {
        this.users = res.map((n) => {
          return {
            id: n.payload.doc.id,
            ...(n.payload.doc.data() as {}),
          } as User;
        });
      });
  }
}
