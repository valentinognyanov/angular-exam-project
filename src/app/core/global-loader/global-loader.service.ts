import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService {
  isHidden: boolean = true;

  showLoader(): void {
    this.isHidden = false;
  }

  hideLoader(): void {
    this.isHidden = true;
  }
}
