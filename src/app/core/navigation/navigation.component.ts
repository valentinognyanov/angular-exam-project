import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { UserService } from 'src/app/user/user.service';

import { User } from 'src/app/types/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  userId: string;
  constructor(public userService: UserService) {
    this.userId = JSON.parse(userService.getUser).uid;
  }
}
