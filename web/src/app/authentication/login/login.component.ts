import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Icons
  faEnvelope = faEnvelope;
  faKey = faKey;
  //

  loginFormGroup: FormGroup;
  emailIsInvalid = false;
  passwordIsInvalid = false;
  loginFailed = false;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginFormGroup = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      emailAddress: this.fb.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  async submit() {
    if (this.loginFormGroup.get('emailAddress').invalid)
      this.emailIsInvalid = true;
    if (this.loginFormGroup.get('password').invalid)
      this.passwordIsInvalid = true;
    if (this.loginFormGroup.valid) {
      this.loginService.authenticate(this.loginFormGroup.value).catch((err) => {
        this.loginFailed = true;
        this.loginFormGroup = this.buildForm();
      });
    }
  }
}
