import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
// https://stackoverflow.com/questions/50970446/http-error-handling-in-angular-6
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(public authService: AuthService, private router: Router) { }

  intercept(req, next) {

    return next.handle(req)
    .pipe(
        catchError(
            (error: any, caught: Observable<HttpEvent<any>>) => {
              if (error.status === 401) {
                this.handleAuthError();
                return of(error);
              }
              throw error;
            }
        ),
    );
  }

  private handleAuthError() {
    this.authService.authErrorHandler();
  }

}
