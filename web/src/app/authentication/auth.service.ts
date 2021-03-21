import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServerService } from '../services/server.service';
import UserFrontend from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private idToken: string;

  constructor(private server: ServerService) {
    console.log('Auth Service');
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('Logged in from memory');
      const user = JSON.parse(userData);
      this.idToken = user.token;
      this.server.setLoggedIn(true, this.idToken);
      this.loggedIn.next(true);
    }
  }

  login(user: UserFrontend) {
    if (user.emailAddress && user.password) {
      return this.server
        .request('POST', '/auth/login', {
          emailAddress: user.emailAddress,
          password: user.password,
        })
        .pipe(
          tap((response: Credentials) => {
            this.idToken = response.idToken;
            this.server.setLoggedIn(true, this.idToken);
            this.loggedIn.next(true);
            const userData = {
              token: this.idToken,
            };
            localStorage.setItem('user', JSON.stringify(userData));
          })
        );
    }
  }

  register(user: UserFrontend) {
    if (user.emailAddress && user.password) {
      return this.server
        .request('POST', '/auth/register', {
          emailAddress: user.emailAddress,
          password: user.password,
        })
        .pipe(
          tap((response: Credentials) => {
            this.idToken = response.idToken;
            this.server.setLoggedIn(true, this.idToken);
            this.loggedIn.next(true);
            const userData = {
              token: this.idToken,
            };
            localStorage.setItem('user', JSON.stringify(userData));
          })
        );
    }
  }

  logout() {
    this.server.setLoggedIn(false);
    this.idToken = undefined;

    this.loggedIn.next(false);
    localStorage.clear();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}

export interface Credentials {
  auth: boolean;
  idToken: string;
}
