import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecondPageComponent } from './second-page/second-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { AuthService } from './auth/services/auth.service';
import { InterceptorService } from './auth/services/interceptor.service';
import { ErrorInterceptorService } from './auth/services/error-interceptor.service';
import { FileUploadModule } from "ng2-file-upload";
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          // DemoApp
          provider: new FacebookLoginProvider("305060300170232")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          // MusicHub //AZ8gfFVdWo_YF82R-NuPaLU4
          provider: new GoogleLoginProvider("450820008233-1h0r6rg0vmagmh2inj31h8o8p8qff9hr.apps.googleusercontent.com")
        },
      ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SecondPageComponent,
    FirstPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    FacebookLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    SocialLoginModule
  ],
  providers: [HttpClientModule, AuthGuardService, AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
  },
  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }
],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
