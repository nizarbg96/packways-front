
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';



@Injectable()
export class LoginService {
    public userData: any;

  constructor(public http: Http) { }
  url = environment.serverUrl + '/user/signin';
  urlA = environment.serverUrl + '/admin/signin';

  loginUser(login, password) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('cache-control', 'no-cache');
    return this.http.post(this.url, {login: login, password: password} , {headers: headers});
  }
  loginAdmin(email, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('cache-control', 'no-cache');
    return this.http.post(this.urlA, {login: email, password: password} , {headers: headers});  }

}
