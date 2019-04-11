import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
// import { auth } from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient
    // , public afAuth: AngularFireAuth
  ) { }



  /* This is how you do it using Firebase (all the commented stuff in this page) */

  /*
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }  

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {

        console.log('You have been successfully logged in!')
        console.log(result);
    }).catch((error) => {
        console.log(error)
    })
  }
*/









  registerUser(username: string, email: string, password: string) {
    return this.http.post("http://localhost:3000/register", {username, email, password});
  }

  registerFacebook(username: string, email: string, password: string) {
    return this.http.post("http://localhost:3000/register/facebook", {username, email, password});
  }

  loginUser(username: string, password: string) {
    return this.http.post("http://localhost:3000/login", {username, password});
  }

  setToken(token : string) {
    localStorage.setItem('token', token);
    return token;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    let token = this.getToken();
    if(token &&  !this.isTokenExpired(token))
      return true;
    else
      return false;
  }

  getUsername() {
    console.log(jwt_decode(this.getToken()));
    return jwt_decode(this.getToken()).username;
  }

  // TODO
  isTokenExpired(token) {
    return false;
  }

  authErrorHandler() {
    alert("You have to log in first");
  }

}
