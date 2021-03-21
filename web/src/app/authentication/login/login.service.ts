import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UserFrontend from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  async authenticate(user: UserFrontend) {
    const credentials = await this.authService.login(user).toPromise();
    if (credentials) {
      console.log(credentials);
      this.router.navigate(['customers']);
    } else {
      console.error('ERROR');
    }
  }
}
