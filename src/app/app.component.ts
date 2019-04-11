import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private authService: AuthService) {}

  get token() {
    return this.authService.getToken();
  }

  logout() {
    this.authService.removeToken();
  }
}
