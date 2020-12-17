import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams, HttpHeaders
} from '@angular/common/http';
import {Headers} from '@angular/http';
import { timeout } from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('isLoggedin') && localStorage.getItem('currentUser')) {
      const jwt = JSON.parse(localStorage.getItem('currentUser')).token;
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
      return next.handle(modifiedReq).pipe(timeout(360000));

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
