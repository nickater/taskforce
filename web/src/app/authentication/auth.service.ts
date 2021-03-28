import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServerService } from '../services/server.service';
import IUser from '../../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private idToken: string;

  constructor(private server: ServerService) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.idToken = user.token;

      this.server.setLoggedIn(true, this.idToken);
      this.loggedIn.next(true);
    }
  }

  login(user: IUser) {
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

  register(user: IUser) {
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

  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }
}

export interface Credentials {
  auth: boolean;
  idToken: string;
}
