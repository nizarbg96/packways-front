import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Trip} from '../trips/Trip';
import {ActivityPayement, IActivityPayement} from '../../model/activity-payement.model';
import {ActivityPayementInfo} from './activity-payement.component';
type EntityResponseType = HttpResponse<IActivityPayement>;
type EntityArrayResponseType = HttpResponse<IActivityPayement[]>;

@Injectable({
  providedIn: 'root'
})
export class ActivityPayementService {

  public resourceUrl = environment.serverUrl + '/api/activities-payement';
  activityPayementInfo: ActivityPayementInfo;
  activityToEdit: ActivityPayement;
  typeConfirm: string;
  newStatus: string;
  constructor(protected http: HttpClient) {}

  create(activityPayement: IActivityPayement): Observable<EntityResponseType> {
    return this.http
      .post<IActivityPayement>(this.resourceUrl, activityPayement, { observe: 'response' });
  }

  update(activityPayement: IActivityPayement): Observable<EntityResponseType> {
    return this.http
      .put<IActivityPayement>(this.resourceUrl, activityPayement, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IActivityPayement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivityPayement[]>(this.resourceUrl, {observe: 'response' });
  }

  findByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IActivityPayement[]>(`${this.resourceUrl}/status/${status}`, {observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}