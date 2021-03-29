import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IDriversTable} from '../../model/drivers-table.model';
import {environment} from '../../../environments/environment';


type EntityResponseType = HttpResponse<IDriversTable>;
type EntityArrayResponseType = HttpResponse<IDriversTable[]>;

@Injectable({ providedIn: 'root' })
export class DriversTableService {
  public resourceUrl = environment.serverUrl + '/api/drivers-tables';

  constructor(protected http: HttpClient) {}

  create(driversTable: IDriversTable): Observable<EntityResponseType> {
    return this.http
      .post<IDriversTable>(this.resourceUrl, driversTable, { observe: 'response' });
  }

  update(driversTable: IDriversTable): Observable<EntityResponseType> {
    return this.http
      .put<IDriversTable>(this.resourceUrl, driversTable, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IDriversTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IDriversTable[]>(this.resourceUrl, { observe: 'response' });
  }
  getDriversTabele(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IDriversTable[]>(this.resourceUrl + '/drivers', { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
