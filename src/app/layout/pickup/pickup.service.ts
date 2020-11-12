import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable()
export class PickUpService {

    constructor(public http: Http, public httpc: HttpClient) { }

    public url = environment.serverUrl + '/trip/';
    result: any;
    jsonObj: any;
    items: any;
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });

    getNbTripsByUserAndDate(sDate, eDate){
        return this.http.get(`${this.url}bydateanduser/` + `?d1=`  + sDate + `&d2=` + eDate, {headers: this.headerOptions});
    }

    getAllTrips(){
        return this.http.get(`${this.url}all`, {headers: this.headerOptions});
    }

    generatePackwaysReport(date){
        return this.http.get(`${this.url}statbyday/` + `?date=`  + date, {headers: this.headerOptions});
    }

    getCaisseService(){
        return this.httpc.get(`${this.url}caisse`);

    }

}
