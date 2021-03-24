import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // Icons
  faEnvelope = faEnvelope;
  faKey = faKey;
  //
  registerFormGroup: FormGroup;
  emailIsInvalid = false;
  passwordIsInvalid = false;
  registrationFailed = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      emailAddress: this.fb.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.control('', Validators.required),
    });
  }

  async submit() {
    if (this.registerFormGroup.get('emailAddress').invalid)
      this.emailIsInvalid = true;
    if (this.registerFormGroup.get('password').invalid)
      this.passwordIsInvalid = true;
    if (this.registerFormGroup.valid) {
      this.registerService
        .register(this.registerFormGroup.value)
        .catch((err) => {
          this.registrationFailed = true;
          this.registerFormGroup = this.buildForm();
        });
    }
  }
}
