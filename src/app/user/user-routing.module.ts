import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from '../home/home.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

import { IsLoggedOutGuard } from '../guards/is-logged-out.guard';
import { IsLoggedInGuard } from '../guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'logout',
    component: HomeComponent,
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
    canActivate: [IsLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
