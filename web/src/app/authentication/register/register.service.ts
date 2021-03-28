import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import IUser from '../../../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private authService: AuthService, private router: Router) {}

  async register(user: IUser) {
    const credentials = await this.authService.register(user).toPromise();
    if (credentials) {
      this.router.navigate(['customers']);
    } else {
      console.error('ERROR');
    }
  }
}
