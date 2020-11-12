import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams, HttpHeaders
} from '@angular/common/http';
import {Headers} from '@angular/http';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('isLoggedin') && localStorage.getItem('currentUser')) {
      console.log('cloning request');
      const jwt = JSON.parse(localStorage.getItem('currentUser')).token;
      console.log('after cloning jwt = ' + jwt);
      const modifiedReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Credentials' : 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Authorization': `Bearer ${jwt}`
        })
      });
      return next.handle(modifiedReq);

    } else {
      return next.handle(req);
    }

    /*return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );*/
  }
}
