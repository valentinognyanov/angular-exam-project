import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { appEmailValidator } from 'src/app/shared/validators/app-email.validator';

import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    password: ['', [Validators.required]],
  });

  login() {
    console.log(this.form.value);
  }
}
