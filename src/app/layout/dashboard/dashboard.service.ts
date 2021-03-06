import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(public http: Http, public httpc: HttpClient) { }

  url = environment.serverUrl + '/trip';
  urlD = environment.serverUrl + '/driver';
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });

  getTripsEncours(id) {
    return this.httpc.get(`${this.url}/encours?id=` + id);
  }

  getTripsLivree(id) {
    return this.httpc.get(`${this.url}/livree?id=` + id);
  }

  getTripsAnnulee(id) {
    return this.httpc.get(`${this.url}/annulee?id=` + id);
  }

  getDriverActive() {
    return this.httpc.get(`${this.urlD}/activelast`);
  }
  getTripRetournee(id) {
    return this.httpc.get(`${this.url}/Retournee?id=` + id);
  }
  getTripRetour(id) {
    console.log('envoie de requéte');
    return this.httpc.get(`${this.url}/enretour?id=` + id);
  }
  getTripChezlivreur(id) {
    return this.httpc.get(`${this.url}/chezlivreur?id=` + id);
  }
  getTripEncoursdeLivraison(id) {
    return this.httpc.get(`${this.url}/encourslivraison?id=` + id);
  }
  getTripEnchemin(id) {
    return this.httpc.get(`${this.url}/enchemin?id=` + id);
  }
  getTripChercheLivreur(id) {
    return this.httpc.get(`${this.url}/cherchelivreur?id=` + id);
  }
  getTripParClient() {
    return this.httpc.get(`${this.url}/statusparclient`);
      }



}
