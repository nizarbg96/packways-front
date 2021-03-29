import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {environment} from '../../../environments/environment';
import {ChargeFixe, IChargeFixe} from '../../model/charge-fixe.model';

type EntityResponseType = HttpResponse<IChargeFixe>;
type EntityArrayResponseType = HttpResponse<IChargeFixe[]>;

@Injectable({ providedIn: 'root' })
export class ChargeFixeService {
  public resourceUrl = environment.serverUrl + '/api/charge-fixes';
  selectedChargeFixe: ChargeFixe;
  dialogExit = new Subject<boolean>();

  constructor(protected http: HttpClient) {}

  create(chargeFixe: IChargeFixe): Observable<EntityResponseType> {
    return this.http.post<IChargeFixe>(this.resourceUrl, chargeFixe, { observe: 'response' });
  }

  update(chargeFixe: IChargeFixe): Observable<EntityResponseType> {
    return this.http.put<IChargeFixe>(this.resourceUrl, chargeFixe, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IChargeFixe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<IChargeFixe[]>(this.resourceUrl, {observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
