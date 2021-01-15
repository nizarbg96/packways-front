import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Activity, IActivity} from '../../model/activity.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Trip} from '../trips/Trip';
import {IActivityMu} from '../../model/activity-mu.model';
import {ActivityMoveableUnitInfo} from './reconcile-mu.component';
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
  constructor(protected http: HttpClient) {}

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

  findByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivityMu[]>(`${this.resourceUrl}/status/${status}`, {observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
