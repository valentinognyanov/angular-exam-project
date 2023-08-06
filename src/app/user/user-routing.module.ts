import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from '../home/home.component';

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
    path: 'user/:id',
    component: ProfileComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'logout',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
