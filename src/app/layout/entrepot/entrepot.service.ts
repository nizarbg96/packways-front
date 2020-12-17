import { Injectable } from '@angular/core';
import {IEntrepot} from '../../model/entrepot.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';

type EntityResponseType = HttpResponse<IEntrepot>;
type EntityArrayResponseType = HttpResponse<IEntrepot[]>;

@Injectable({ providedIn: 'root' })
export class EntrepotService {
  public resourceUrl = environment.serverUrl + '/api/entrepots';

  public entrepotSubject = new Subject<void>();

  constructor(protected http: HttpClient) {}

  create(entrepot: IEntrepot): Observable<EntityResponseType> {
    return this.http
      .post<IEntrepot>(this.resourceUrl, entrepot, { observe: 'response' });
  }

  update(entrepot: IEntrepot): Observable<EntityResponseType> {
    return this.http
      .put<IEntrepot>(this.resourceUrl, entrepot, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEntrepot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IEntrepot[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
