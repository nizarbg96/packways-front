import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../../environments/environment';


@Injectable()
export class DriversService {

    constructor(public http: Http, private httpc: HttpClient) { }
    public url = environment.serverUrl + '/driver/';
    public urlTrip = environment.serverUrl + '/trip/';
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


  getDriversFromServe() {
        return this.http.get(`${this.url}/alls`, {headers: this.headerOptions});
      }

      getTripsByDriverAndDate(idDriver, sDate, eDate) {
        return this.http.get(`${this.urlTrip}bydatedriver?id=` + idDriver + `&d1=`  + sDate + `&d2=` + eDate, {headers: this.headerOptions});
      }

      deleteDriver(idDriver, driverData) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        this.http.put(this.url + 'update/' + idDriver, driverData, {headers: this.headerOptions}).subscribe(data => {
          console.log('Driver deleted');
        }, error => {
        });
      }

      updateDriver(driverData, id) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.url + '/update/' + id, driverData, {headers: this.headerOptions});
        console.log('updated suscess');
      }


      BlockDriver(idDriver, driverData) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        const options = new RequestOptions({ headers: headers });
        this.http.put(this.url + 'update/' + idDriver, driverData, {headers: this.headerOptions}).subscribe(data => {
          console.log('User Blocked');
        }, error => {
        });

      }
      getDriver(idDriver: string) {
        return this.http.get(this.url + 'one/' + idDriver, {headers: this.headerOptions});
      }
    getOneDriver(idDriver: string) {
      return this.http.get(this.url + 'oneDriver/' + idDriver, {headers: this.headerOptions});
    }

}
