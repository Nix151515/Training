import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm: FormGroup;

  constructor(private authService : AuthService) {
      this.loginForm = new FormGroup({
        'username' : new FormControl(null, [Validators.required]),
        'password' : new FormControl(null, [Validators.required])
      });
  }

  onSubmit(){
    this.authService.loginUser(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
    ).subscribe((resp: any) => {
      this.authService.setToken(resp.token);
      console.log(this.authService.getToken());
    });
  }

 



}
