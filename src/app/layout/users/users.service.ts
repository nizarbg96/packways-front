import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = environment.serverUrl + '/user/';
  public urlAdmin = environment.serverUrl + '/admin/';
  public urlTrip = environment.serverUrl + '/trip/';
  result: any;
  jsonObj: any;
  items: any;
  tripsByUserAndDate: any;
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });

  constructor(public http: Http) { }


  getUsersFromServe(key1,key2) {
    return this.http.get(`${this.url}/bykey?keyExp=`+key1+'&keyDes='+key2, {headers: this.headerOptions});
  }


  deleteUser(idUser,userdata) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    this.http.put(this.url + 'update/' + idUser, userdata, {headers: this.headerOptions}).subscribe(data => {
      console.log('User deleted');
    }, error => {
    });

  }

  BlockUser(idUser,userdata) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    this.http.put(this.url + 'update/' + idUser, userdata, {headers: this.headerOptions}).subscribe(data => {
      console.log('User Blocked');
    }, error => {
    });

  }

  gettripLivree(id){

    this.http.get(this.urlTrip+"byuser?id="+id+"&statustrip=Livree",{headers: this.headerOptions}).subscribe(data => {
      this.result = data['_body']
     // console.log(data['_body'])
      let jo = JSON.parse(this.result);
      let obj = Array.of(jo.data);
    })
  }

  getTripsByUserAndDate(idUser, sDate, eDate) {
    return this.http.get(`${this.urlTrip}bydate/` + idUser + `?d1=`  + sDate + `&d2=` + eDate, {headers: this.headerOptions});
  }

  updateUser(userdata, id) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/update/' + id, userdata, {headers: this.headerOptions});
    console.log('updated suscess');
  }
  updateAdmin(adminData, idAdmin) {
    return this.http.put(this.urlAdmin + 'update/' + idAdmin, adminData, {headers: this.headerOptions});
  }
  getAdminById(idAdmin: string ){
    return this.http.get(this.urlAdmin + 'oneAdmin/' + idAdmin, {headers: this.headerOptions});

  }
  getUserById(idUser: string ){
    return this.http.get(this.url + 'userId/' + idUser, {headers: this.headerOptions});

  }
  getActiveUsers(){
    return this.http.get(this.url + 'actives/', {headers: this.headerOptions});
  }

}
