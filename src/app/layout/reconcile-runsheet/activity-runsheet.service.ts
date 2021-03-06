import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Activity, IActivity} from '../../model/activity.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ActivityRunsheetInfo} from './reconcile-runsheet.component';
import {Trip} from '../trips/Trip';
import {Headers, Http, ResponseContentType} from '@angular/http';
import {map} from 'rxjs/operators';
import {IRunsheet} from '../../model/runsheet.model';
import {IActivityPayement} from '../../model/activity-payement.model';
type EntityResponseType = HttpResponse<IActivity>;
type EntityArrayResponseType = HttpResponse<IActivity[]>;

@Injectable({
  providedIn: 'root'
})
export class ActivityRunsheetService {

  public resourceUrl = environment.serverUrl + '/api/activities';
  activityRunsheetInfo: ActivityRunsheetInfo;
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
  headerOptionsBlop = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });
  forcedRetour = false;
  constructor(protected http: HttpClient, protected httpOld: Http) {}

  create(activity: IActivity): Observable<EntityResponseType> {
    return this.http
      .post<IActivity>(this.resourceUrl, activity, { observe: 'response' });
  }

  update(activity: IActivity): Observable<EntityResponseType> {
    return this.http
      .put<IActivity>(this.resourceUrl, activity, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IActivity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivity[]>(this.resourceUrl, {observe: 'response' });
  }

  getDraftActivities(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivity[]>(this.resourceUrl + '/draft', {observe: 'response' });
  }

  findAllByDriver(idDriver: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivity[]>(`${this.resourceUrl}/byDriver/${idDriver}`, { observe: 'response' });
  }
  findByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivity[]>(`${this.resourceUrl}/status/${status}`, {observe: 'response' });
  }
  findByCreatedDateBetween(fromDate: Date, toDate: Date): Observable<EntityArrayResponseType> {
    return this.http
      .post<IActivity[]>(`${this.resourceUrl}/betweenDate/`, {fromDate: fromDate, toDate: toDate}, {observe: 'response' });
  }
  findByCreatedDateGreaterThan(fromDate: Date): Observable<EntityArrayResponseType> {
    return this.http
      .post<IActivity[]>(`${this.resourceUrl}/afterDate/`, fromDate, {observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  exportPdf(activity: Activity): Observable<any>{
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

  confirmActivity(activityConfirm: any): Observable<EntityResponseType> {
    return this.http
      .post<IActivity>(this.resourceUrl + '/confirm/', activityConfirm, { observe: 'response' });
  }
  getEditActivityTrips(activityTripsIds: any): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(this.resourceUrl + '/edit-activity-trips/', activityTripsIds, { observe: 'response' });
  }

  getNextActivities(pageIndex, pageSize): Observable<EntityArrayResponseType> {
    let params = new HttpParams();
    params = params.append('page', pageIndex);
    params = params.append('size', pageSize);
    return this.http
      .get<IActivity[]>(`${this.resourceUrl}/listPageable`, { observe: 'response', params: params });
  }

  getNonRecoltedActivvities(): Observable<EntityArrayResponseType>{
    return this.http
      .get<IActivity[]>(`${this.resourceUrl}/nonRecolted`, { observe: 'response'});
  }
}
