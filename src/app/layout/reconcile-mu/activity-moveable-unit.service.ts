import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Activity, IActivity} from '../../model/activity.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Trip} from '../trips/Trip';
import {ActivityMu, IActivityMu} from '../../model/activity-mu.model';
import {ActivityMoveableUnitInfo} from './reconcile-mu.component';
import {Headers, Http, ResponseContentType} from '@angular/http';
import {map} from 'rxjs/operators';
type EntityResponseType = HttpResponse<IActivityMu>;
type EntityArrayResponseType = HttpResponse<IActivityMu[]>;

@Injectable({
  providedIn: 'root'
})
export class ActivityMuService {

  public resourceUrl = environment.serverUrl + '/api/activities-mu';
  activityToEdit: Activity;
  sacannedTrip: Trip;
  newStatus: string;
  activityMoveableUnitInfo: ActivityMoveableUnitInfo;
  constructor(protected http: HttpClient, protected httpOld: Http) {}
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });

  create(activity: IActivityMu): Observable<EntityResponseType> {
    return this.http
      .post<IActivity>(this.resourceUrl, activity, { observe: 'response' });
  }

  update(activity: IActivityMu): Observable<EntityResponseType> {
    return this.http
      .put<IActivityMu>(this.resourceUrl, activity, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IActivityMu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivityMu[]>(this.resourceUrl, {observe: 'response' });
  }
  findByCreatedDateGreaterThan(fromDate: Date): Observable<EntityArrayResponseType> {
    return this.http
      .post<IActivityMu[]>(`${this.resourceUrl}/afterDate/`, fromDate, {observe: 'response' });
  }

  findByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivityMu[]>(`${this.resourceUrl}/status/${status}`, {observe: 'response' });
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
