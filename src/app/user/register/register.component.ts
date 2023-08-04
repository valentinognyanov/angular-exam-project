import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { UserService } from '../user.service';

import { appEmailValidator } from 'src/app/shared/validators/app-email.validator';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords.validator';

import { DEFAULT_EMAIL_DOMAINS, USER_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private angularFirestore: AngularFirestore
  ) {}

  form = this.fb.group({
    // username: ['', [Validators.required, Validators.minLength(5)]],
    fullName: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    // phone: ['', [Validators.required, Validators.minLength(9)]],
    // address: ['', [Validators.required, Validators.minLength(6)]],
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

  async register() {
    if (this.form.invalid) return;

    const { fullName, email, passGroup: { password } = {} } = this.form.value;

    await this.userService.register(fullName!, email!, password!);

    if (localStorage.getItem(USER_KEY)) this.router.navigate(['/']);

    this.angularFirestore
      .collection('users')
      .add({ fullName, email, password });

    // this.userService
    //   .register(username!, fullName!, email!, phone!, address!, password!)
    //   .subscribe(
    //     (res) => {
    //       console.log({ res });
    //       this.form.reset();

    //       localStorage.setItem(this.USER_KEY, JSON.stringify(res));
    //       this.router.navigate(['/']);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }
}
