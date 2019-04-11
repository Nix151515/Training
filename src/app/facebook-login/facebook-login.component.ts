import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';


@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css']
})
export class FacebookLoginComponent implements OnInit {

  constructor(public socialAuthService : SocialAuthService, private authService: AuthService) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else {
      if(socialPlatform == "google"){
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);

        let username = userData.name.trim();
        let email = userData.email;
        let password = 'parola1234';

        console.log(username, email, password)
        this.authService.registerFacebook(username, email, password).subscribe((resp:any) => {
          this.authService.setToken(resp.token);
          console.log(this.authService.getToken());
        });
        
        // Now sign-in with userData
        // ...
            
      }
    );
  }

}
