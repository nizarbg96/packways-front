import { Component, OnInit } from '@angular/core';

import { routerTransition } from '../router.animations';
import { RequestOptions, Http, Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-verifpage',
  templateUrl: './verifpage.component.html',
  styleUrls: ['./verifpage.component.scss'],
  animations: [routerTransition()]
})
export class VerifpageComponent implements OnInit {

  public url = environment.serverUrl + '/user/';
  codeVerif : any;
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });
  constructor(private http : Http, private snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
  }


  testvalid(){
    let id = localStorage.getItem('idUser');
    let code = localStorage.getItem('code');

    if(this.codeVerif === code){
      const userdata = {
        accountActive : true
      };
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json' );
      const options = new RequestOptions({ headers: headers });
      this.http.put(this.url + 'update/' + id, userdata, {headers: this.headerOptions}).subscribe(data => {
        console.log('User Blocked');
      }, error => {
      });
      this.router.navigate(['login']);
  }else{
    this.snackBar.open('Le code de validation est incorrect', 'Fermer', {
      duration: 5000,
  });
  }

  }

}
