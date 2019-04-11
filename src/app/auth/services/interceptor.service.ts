import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private authService : AuthService) { }

  intercept(req : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    let token = this.authService.getToken();
    if(token){
      req = req.clone({
        headers: req.headers.set('x-auth', token)
      });
    }
    return next.handle(req);
  }
}
