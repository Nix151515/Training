import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  registerForm: FormGroup;

  constructor(private authService: AuthService) {
      this.registerForm = new FormGroup({
        'username' : new FormControl(null, [Validators.required]),
        'email' : new FormControl(null, [Validators.required, Validators.email]),
        'password' : new FormControl(null, [Validators.required])
      });
  }

  onSubmit(){
    // console.log("Username: " + this.registerForm.get('username').value);
    // console.log("Email: " + this.registerForm.get('email').value);
    // console.log("Password: " + this.registerForm.get('password').value);

    this.authService.registerUser(
      this.registerForm.get('username').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value
    ).subscribe((resp) => {
      console.log(resp);
    });
  }
}
