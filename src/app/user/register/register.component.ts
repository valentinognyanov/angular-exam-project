import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { appEmailValidator } from 'src/app/shared/validators/app-email.validator';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords.validator';

import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    fullName: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    phone: ['', [Validators.required, Validators.minLength(9)]],
    address: ['', [Validators.required, Validators.minLength(6)]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  register() {
    console.log('Form Data: ', this.form.value);
  }
}
