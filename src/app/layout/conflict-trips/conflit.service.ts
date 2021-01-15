import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createRequestOption } from 'src/app/shared/util/request-util';
import {IConflit} from '../../model/conflit.model';


type EntityResponseType = HttpResponse<IConflit>;
type EntityArrayResponseType = HttpResponse<IConflit[]>;

@Injectable({
  providedIn: 'root'
})
export class ConflitService {
  public resourceUrl = environment.serverUrl + '/api/conflits';


  constructor(protected http: HttpClient) {}

  create(conflit: IConflit): Observable<EntityResponseType> {
    return this.http
      .post<IConflit>(this.resourceUrl, conflit, { observe: 'response' });
  }
  createList(conflits: IConflit[]): Observable<EntityArrayResponseType> {
    return this.http
      .post<IConflit[]>(this.resourceUrl+'/saveListConflits', conflits, { observe: 'response' });
  }

  update(conflit: IConflit): Observable<EntityResponseType> {
    return this.http
      .put<IConflit>(this.resourceUrl, conflit, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IConflit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConflit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
