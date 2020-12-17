import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRunsheet } from 'src/app/model/runsheet.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
import {RunsheetInfo} from './runsheet.component';

type EntityResponseType = HttpResponse<IRunsheet>;
type EntityArrayResponseType = HttpResponse<IRunsheet[]>;

@Injectable({
  providedIn: 'root'
})
export class RunsheetService {
  affectedDriverSubject = new Subject<any>();
  public resourceUrl = environment.serverUrl + '/api/runsheets';
  runsheetInfo: RunsheetInfo;
  runsheetConfirmed: boolean;

  constructor(protected http: HttpClient) {}

  create(runsheet: IRunsheet): Observable<EntityResponseType> {
    return this.http
      .post<IRunsheet>(this.resourceUrl, runsheet, { observe: 'response' });
  }

  update(runsheet: IRunsheet): Observable<EntityResponseType> {
    return this.http
      .put<IRunsheet>(this.resourceUrl, runsheet, { observe: 'response' });
  }
  updateDriver(runsheet: IRunsheet, idDriver: string): Observable<EntityResponseType> {
    return this.http
      .put<IRunsheet>(`${this.resourceUrl}/updateDriver/${idDriver}`, runsheet, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IRunsheet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findAllByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IRunsheet[]>(`${this.resourceUrl}/status/${status}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRunsheet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
