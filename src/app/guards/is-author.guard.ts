import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { USER_KEY } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class isAuthorGuard implements CanActivate {
  isAuthor!: boolean;

  constructor(
    private router: Router,
    public angularFirestore: AngularFirestore
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const newsId: any = route.paramMap.get('id');
    const newsRef = this.angularFirestore.collection('news').doc(newsId);

    if (!!localStorage.getItem(USER_KEY)) {
      newsRef.get().subscribe((n) => {
        if (
          n.get('author') ==
          JSON.parse(localStorage.getItem(USER_KEY) as any).email
        ) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      });
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
