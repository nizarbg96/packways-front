import { Component, OnInit } from '@angular/core';
import {Headers, Http} from '@angular/http';
import { routerTransition } from '../../router.animations';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-parainage',
  templateUrl: './parainage.component.html',
  styleUrls: ['./parainage.component.scss'],
  animations: [routerTransition()]
})
export class ParainageComponent implements OnInit {

  url = environment.serverUrl + '/trip/parainage';
  items: any[];
  jsonObj: any[];
  id: any;
  currentUser: any;
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });

  constructor(private http : Http) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = this.currentUser.data[0].idUser;
    console.log(this.id)
    this.getClientParainee(this.id);
  }

  getClientParainee(id){
    this.jsonObj=[];
    this.items=[];
    return this.http.get(this.url+'?id='+id, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);
      this.jsonObj = obj[0];
      console.log('data: ',this.jsonObj);
     for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
      }
      console.log('data: ',this.items);
    })
  }

}
