import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { appEmailValidator } from 'src/app/shared/validators/app-email.validator';

import { DEFAULT_EMAIL_DOMAINS, USER_KEY } from 'src/app/shared/constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  form = this.fb.group({
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    password: ['', [Validators.required]],
  });

  async login() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    await this.userService.login(email!, password!);

    if (localStorage.getItem(USER_KEY)) this.router.navigate(['/']);

    // this.userService.login(email!, password!).subscribe(() => {
    //   this.router.navigate(['/']);
    // });
  }
}
