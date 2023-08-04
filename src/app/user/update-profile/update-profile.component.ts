import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../user.service';

import { appEmailValidator } from 'src/app/shared/validators/app-email.validator';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent {
  constructor(private fb: FormBuilder, private userService: UserService) {}

  form = this.fb.group({
    fullName: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
  });

  updateProfile() {
    //
  }
}
