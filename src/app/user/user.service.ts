import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../types/user';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  private USER_KEY = 'user';
  private apiUrl = environment.apiUrl;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

  register(
    username: string,
    fullName: string,
    email: string,
    phone: string,
    address: string,
    password: string
  ): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/users/register`, {
      username,
      fullName,
      email,
      phone,
      address,
      password,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, {
      email,
      password,
    });
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }

  getUser() {
    return this.user;
  }
}
