import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IPickUp, PickUp} from '../../model/pickup.model';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {createRequestOption} from '../../shared/util/request-util';
import {PickUpInfo} from './ramassage.component';
import {IRunsheet} from '../../model/runsheet.model';

type EntityResponseType = HttpResponse<IPickUp>;
type EntityArrayResponseType = HttpResponse<IPickUp[]>;

@Injectable({
  providedIn: 'root'
})
export class RamassageService {
  affectedDriverSubject = new Subject<any>();
  public resourceUrl = environment.serverUrl + '/api/pick-ups';
  pickUpInfo: PickUpInfo;
  pickUpConfirmed: boolean;

  constructor(protected http: HttpClient) {}

  create(pickUp: IPickUp): Observable<EntityResponseType> {
    return this.http
      .post<IPickUp>(this.resourceUrl, pickUp, { observe: 'response' });
  }

  update(pickUp: IPickUp): Observable<EntityResponseType> {
    return this.http
      .put<IPickUp>(this.resourceUrl, pickUp, { observe: 'response' });
  }

  updateDriver(pickup: IPickUp, idDriver: string): Observable<EntityResponseType> {
    return this.http
      .put<IPickUp>(`${this.resourceUrl}/updateDriver/${idDriver}`, pickup, { observe: 'response' });
  }
  updateList(pickUps: IPickUp[]): Observable<EntityArrayResponseType> {
    return this.http
      .put<IPickUp[]>(this.resourceUrl + '/updateList', pickUps, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IPickUp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findAllByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IPickUp[]>(`${this.resourceUrl}/status/${status}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPickUp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
