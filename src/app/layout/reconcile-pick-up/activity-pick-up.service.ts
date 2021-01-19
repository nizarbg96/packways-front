import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Activity} from '../../model/activity.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Trip} from '../trips/Trip';
import {IActivityPickUp} from '../../model/activity-pickUp.model';
import {ActivityPickUpInfo} from './reconcile-pick-up.component';
import {ActivityMu} from '../../model/activity-mu.model';
import {Headers, Http, ResponseContentType} from '@angular/http';
import {map} from 'rxjs/operators';
type EntityResponseType = HttpResponse<IActivityPickUp>;
type EntityArrayResponseType = HttpResponse<IActivityPickUp[]>;

@Injectable({
  providedIn: 'root'
})
export class ActivityPickUpService {

  public resourceUrl = environment.serverUrl + '/api/activities-pickUp';
  activityPickUpInfo: ActivityPickUpInfo;
  activityToEdit: Activity;
  sacannedTrip: Trip;
  newStatus: string;
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });
  constructor(protected http: HttpClient, protected httpOld: Http) {}

  create(activity: IActivityPickUp): Observable<EntityResponseType> {
    return this.http
      .post<IActivityPickUp>(this.resourceUrl, activity, { observe: 'response' });
  }

  update(activity: IActivityPickUp): Observable<EntityResponseType> {
    return this.http
      .put<IActivityPickUp>(this.resourceUrl, activity, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IActivityPickUp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivityPickUp[]>(this.resourceUrl, {observe: 'response' });
  }

  findByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivityPickUp[]>(`${this.resourceUrl}/status/${status}`, {observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  exportPdf(activity: ActivityMu): Observable<any>{
    return this.httpOld
      .post(this.resourceUrl + '/exportpdf', activity,{headers: this.headerOptions});
  }
  downloadPDF(url): any {
    const options = { responseType: ResponseContentType.Blob, headers: this.headerOptions};
    return this.httpOld.get(url, options).pipe(
      map(
        (res) => {
          return new Blob([res.blob()], { type: 'application/pdf' });
        })
    );
  }

}
