import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { USER_KEY } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem(USER_KEY)) {
      return true;
    } else {
      this.router.navigate(['login']);

      return false;
    }
  }
}
