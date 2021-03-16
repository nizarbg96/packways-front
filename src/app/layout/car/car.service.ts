import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ICar} from '../../model/car.model';
import {createRequestOption} from '../../shared/util/request-util';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

type EntityResponseType = HttpResponse<ICar>;
type EntityArrayResponseType = HttpResponse<ICar[]>;

@Injectable({ providedIn: 'root' })
export class CarService {
  public resourceUrl = environment.serverUrl + '/api/cars';
  carSubject = new Subject<boolean>();

  constructor(protected http: HttpClient) {}

  create(car: ICar): Observable<EntityResponseType> {
    return this.http
      .post<ICar>(this.resourceUrl, car, { observe: 'response' });
  }

  update(car: ICar): Observable<EntityResponseType> {
    return this.http
      .put<ICar>(this.resourceUrl, car, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ICar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICar[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
