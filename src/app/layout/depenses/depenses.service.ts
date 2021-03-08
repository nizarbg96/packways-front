import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';


import {environment} from '../../../environments/environment';
import {Depenses, IDepenses} from '../../model/depenses.model';
import {createRequestOption} from '../../shared/util/request-util';

type EntityResponseType = HttpResponse<IDepenses>;
type EntityArrayResponseType = HttpResponse<IDepenses[]>;

@Injectable({ providedIn: 'root' })
export class DepensesService {
  depenseDialogExit = new BehaviorSubject<boolean>(false);
  depenseDeatil: Depenses = null;

    public resourceUrl = environment.serverUrl + '/api/depenses';

  constructor(protected http: HttpClient) {}

  create(depenses: IDepenses): Observable<EntityResponseType> {
    return this.http
      .post<IDepenses>(this.resourceUrl, depenses, { observe: 'response' });
  }

  update(depenses: IDepenses): Observable<EntityResponseType> {
    const copy = depenses;
    return this.http
      .put<IDepenses>(this.resourceUrl, copy, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IDepenses>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IDepenses[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }


}
