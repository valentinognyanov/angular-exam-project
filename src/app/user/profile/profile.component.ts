import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from 'src/app/types/user.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: any = undefined;

  ngOnInit(): void {
    this.user = this.userService.getUser();
    // console.log(this.user);
  }
}
