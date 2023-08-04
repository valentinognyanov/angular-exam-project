import { Injectable } from '@angular/core';
import {
  Auth,
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  authState,
  // updateProfile,
} from '@angular/fire/auth';
// import { getAuth } from 'firebase/auth';
// import { Observable, from, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { USER_KEY } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$ = authState(this.auth);

  get isLogged(): boolean {
    return !!localStorage.getItem(USER_KEY);
  }

  constructor(public auth: Auth, private angularFireAuth: AngularFireAuth) {}

  // register(fullName: string, email: string, password: string): Observable<any> {
  //   return from(
  //     createUserWithEmailAndPassword(this.auth, email, password)
  //   ).pipe(
  //     switchMap(({ user }) => updateProfile(user, { displayName: fullName }))
  //   );
  // }
  async register(fullName: string, email: string, password: string) {
    if (!localStorage.getItem(USER_KEY)) {
      await this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        })
        .catch((error) => {
          alert(error.code.split('auth/')[1].split('-').join(' '));
        });
    }
  }

  // login(email: string, password: string): Observable<any> {
  //   return from(signInWithEmailAndPassword(this.auth, email, password));
  // }
  async login(email: string, password: string) {
    if (!localStorage.getItem(USER_KEY)) {
      await this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        })
        .catch((error) => {
          alert(error.code.split('auth/')[1].split('-').join(' '));
        });
    }
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      window.alert('Logged Out !');
    });
    localStorage.removeItem(USER_KEY);
  }

  // getUser() {
  //   const auth = getAuth();
  //   const currUser = auth.currentUser;
  //   // console.log(currUser);

  //   return currUser;
  // }
  getUser() {}
}
