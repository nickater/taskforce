import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import IUser from '../../../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authService: AuthService, private router: Router) {}

  async authenticate(user: IUser) {
    const credentials = await this.authService.login(user).toPromise();
    if (credentials) {
      this.router.navigate(['customers']);
    } else {
      console.error('ERROR');
    }
  }
}
