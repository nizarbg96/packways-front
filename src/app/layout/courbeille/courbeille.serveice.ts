import { Trip } from './../trips/Trip';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../../environments/environment';


@Injectable()
export class CourbeilleService {

    constructor(public http: Http){}

    url = environment.serverUrl + '/trip';
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });



    getTrips(): Observable<any> {
        return this.http.get(`${this.url}/deleted`,{headers: this.headerOptions});
      }

      deleteTrip(idtrip, status) {
        const auth = localStorage.getItem('auth');
        console.log('suscéés', auth);

        const date = new Date();
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        let tripdata: any;
          tripdata = {
            deleted: false
          };

        this.http.put(this.url+'/update/' + idtrip, tripdata, {headers: this.headerOptions}).subscribe(data => {
        }, error => {
        });

    }
}
