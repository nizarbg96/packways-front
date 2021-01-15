import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Activity} from '../../model/activity.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Trip} from '../trips/Trip';
import {IActivityPickUp} from '../../model/activity-pickUp.model';
import {ActivityPickUpInfo} from './reconcile-pick-up.component';
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
  constructor(protected http: HttpClient) {}

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

}
