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
    await this.loginService.authenticate(this.loginFormGroup.value);
    console.log('DONE');
  }
}
