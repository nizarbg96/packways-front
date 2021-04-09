import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Headers, Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  savedSearch = new Subject<any[]>();
  headerOptions = new  Headers({
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });

  constructor(private httpClient: Http) { }
  postFile(fileToUpload: any): Observable<any> {
    const endpoint = environment.serverUrl + '/api/image/upload';
    return this.httpClient.post(endpoint, fileToUpload, { headers: this.headerOptions });
  }
  postFileDepense(fileToUpload: any): Observable<any> {
    const endpoint = environment.serverUrl + '/api/image/upload/imageDepenses';
    return this.httpClient.post(endpoint, fileToUpload, { headers: this.headerOptions });
  }
  getImage(imageName: string){
    const endpoint = environment.serverUrl + '/api/image/get/';
    return this.httpClient.get(endpoint + imageName, { headers: this.headerOptions });

  }

}
