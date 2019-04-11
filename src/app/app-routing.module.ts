import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondPageComponent } from './second-page/second-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';

const routes: Routes = [
  {path: '', component : FirstPageComponent},
  {path: 'page2', component : SecondPageComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'facebook', component: FacebookLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
