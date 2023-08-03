import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState,
  updateProfile,
} from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$ = authState(this.auth);

  get isLogged(): boolean {
    const user = getAuth();
    const currUser = user.currentUser;
    return !!currUser;
  }

  constructor(public auth: Auth) {}

  register(fullName: string, email: string, password: string): Observable<any> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: fullName }))
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  async logout() {
    return this.auth.signOut().then(() => {
      window.alert('Logged Out !');
    });
  }

  getUser() {
    const auth = getAuth();
    const currUser = auth.currentUser;
    // console.log(currUser);

    return currUser;
  }
}
