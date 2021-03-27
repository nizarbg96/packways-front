import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import {IInjectionFond} from '../../model/injection-fond.model';
import {environment} from '../../../environments/environment';



type EntityResponseType = HttpResponse<IInjectionFond>;
type EntityArrayResponseType = HttpResponse<IInjectionFond[]>;

@Injectable({ providedIn: 'root' })
export class InjectionFondService {
  public resourceUrl = environment.serverUrl + '/api/injection-fonds';
  depenseDialogExit = new Subject<boolean>();
  injectionDetails: IInjectionFond;

  constructor(protected http: HttpClient) {}

  create(injectionFond: IInjectionFond): Observable<EntityResponseType> {
    return this.http
      .post<IInjectionFond>(this.resourceUrl, injectionFond, { observe: 'response' });
  }

  update(injectionFond: IInjectionFond): Observable<EntityResponseType> {
    return this.http
      .put<IInjectionFond>(this.resourceUrl, injectionFond, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IInjectionFond>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IInjectionFond[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
