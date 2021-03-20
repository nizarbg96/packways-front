import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {GasTicket, IGasTicket} from '../../model/gas-ticket.model';
import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IGasTicket>;
type EntityArrayResponseType = HttpResponse<IGasTicket[]>;

@Injectable({ providedIn: 'root' })
export class GasTicketService {
  public resourceUrl = environment.serverUrl + '/api/gas-tickets';
  dialogExit = new Subject<Boolean>();
  selectedGasTicket: GasTicket;

  constructor(protected http: HttpClient) {}

  create(gasTicket: IGasTicket): Observable<EntityResponseType> {
    return this.http
      .post<IGasTicket>(this.resourceUrl, gasTicket, { observe: 'response' });
  }
  createList(gasTickets: IGasTicket[]): Observable<EntityArrayResponseType> {
    return this.http
      .post<IGasTicket[]>(this.resourceUrl + '-list', gasTickets, { observe: 'response' });
  }

  update(gasTicket: IGasTicket): Observable<EntityResponseType> {
    return this.http
      .put<IGasTicket>(this.resourceUrl, gasTicket, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IGasTicket>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IGasTicket[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
