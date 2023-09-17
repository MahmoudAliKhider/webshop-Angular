import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { User } from '../modules/user';
import { UserForLogin } from '../modules/userForLogin';
import { UserForRegister } from '../modules/userForRegister';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  apiUrl = 'http://localhost:8000/api/v1/auth';

  currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {}

  login(userForLogin: UserForLogin) {
    return this.http
      .post<User>(`${this.apiUrl}/login`, userForLogin)
      .pipe(map((user) => this.setUserToLocalStorage(user)));
  }

  register(userFormRegister: UserForRegister) {
    return this.http
      .post<User>(`${this.apiUrl}/signup`, userFormRegister)
      .pipe(map((user) => this.setUserToLocalStorage(user)));
  }

  setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser$.next(user);
  }

  getLoggedInUserId(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.fullName;
  }
}
