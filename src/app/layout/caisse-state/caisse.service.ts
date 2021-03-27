import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Caisse, ICaisse} from '../../model/caisse.model';


type EntityResponseType = HttpResponse<ICaisse>;
type EntityArrayResponseType = HttpResponse<ICaisse[]>;

@Injectable({ providedIn: 'root' })
export class CaisseService {
  public resourceUrl = environment.serverUrl + '/api/caisses';
  dialogExit = new Subject<boolean>();
  selectedCaisse: Caisse;

  constructor(protected http: HttpClient) {}

  create(caisse: ICaisse): Observable<EntityResponseType> {
    return this.http
      .post<ICaisse>(this.resourceUrl, caisse, { observe: 'response' });
  }

  update(caisse: ICaisse): Observable<EntityResponseType> {
    return this.http
      .put<ICaisse>(this.resourceUrl, caisse, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ICaisse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<ICaisse[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  openCoffre(caisse: ICaisse): Observable<EntityResponseType> {
    return this.http
      .put<ICaisse>(this.resourceUrl + '/openCoffre', caisse, { observe: 'response' });
  }
  closeCoffre(caisse: ICaisse): Observable<EntityResponseType> {
    return this.http
      .put<ICaisse>(this.resourceUrl + '/closeCoffre', caisse, { observe: 'response' });
  }


}
