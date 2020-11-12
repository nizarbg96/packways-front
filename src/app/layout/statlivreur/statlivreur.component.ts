import {Headers, Http} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-statlivreur',
  templateUrl: './statlivreur.component.html',
  styleUrls: ['./statlivreur.component.scss']
})
export class StatlivreurComponent implements OnInit {

  url = environment.serverUrl + '/trip/statbydriver';
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });


  jsonObj: any;
  constructor(private http : Http) { }

  ngOnInit() {
    this.getStatLivreur();
  }


  getStatLivreur(){
    return this.http.get(this.url, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);
      this.jsonObj = obj[0];
      console.log(this.jsonObj);
    })
  }

}
