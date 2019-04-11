import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  username: string;
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  getUsers() {
    return this.http.get('http://localhost:3000/users').subscribe((users) => {
      console.log(users);
    });
  }
}
