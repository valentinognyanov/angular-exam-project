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
    return !!this.currentUser$;
  }

  constructor(private auth: Auth) {}

  register(fullName: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: fullName }))
    );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  getUser() {
    const auth = getAuth();
    const currUser = auth.currentUser;
    console.log(currUser);

    return currUser;
  }
}
