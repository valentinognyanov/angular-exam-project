import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private userService: UserService) {}
  isLogged: Boolean = this.userService.isLogged;
  username: string | undefined = this.userService.user?.username;
}
