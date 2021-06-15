import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {IRunsheet, Runsheet} from 'src/app/model/runsheet.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
import {RunsheetInfo} from './runsheet.component';
import {Trip} from '../trips/Trip';
import {Headers, Http, ResponseContentType} from '@angular/http';
import {map} from 'rxjs/operators';

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
  sacannedTrip: Trip;
  scannedRunsheet: Runsheet;
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });

  constructor(protected http: HttpClient, private httpOld: Http) {}

  create(runsheet: IRunsheet): Observable<EntityResponseType> {
    return this.http
      .post<IRunsheet>(this.resourceUrl, runsheet, { observe: 'response' });
  }

  update(runsheet: IRunsheet): Observable<EntityResponseType> {
    return this.http
      .put<IRunsheet>(this.resourceUrl, runsheet, { observe: 'response' });
  }
  updateList(runsheets: IRunsheet[]): Observable<EntityArrayResponseType> {
    return this.http
      .put<IRunsheet[]>(this.resourceUrl + '/updateList', runsheets, { observe: 'response' });
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

  getList(runsheetsIds: string[]){
    return this.http
      .post<IRunsheet[]>(`${this.resourceUrl}/getRunsheetsList`, runsheetsIds, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRunsheet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getDraftAndConfirmedRunsheets(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IRunsheet[]>(this.resourceUrl + '/draft-confirmed', {observe: 'response' });
  }

  getDispachedRunsheets(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IRunsheet[]>(this.resourceUrl + '/dispached', {observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  downloadPDF(url): any {
    const options = { responseType: ResponseContentType.Blob, headers: this.headerOptions};
    return this.httpOld.get(url, options).pipe(
      map(
        (res) => {
          return new Blob([res.blob()], { type: 'application/pdf' });
        })
    );
  }

  addTrip(tripToAddInRunsheet: any){
    return this.http
      .post<IRunsheet>(this.resourceUrl + '/addTrip', tripToAddInRunsheet, { observe: 'response' });
  }

  deleteRunsheet(runsheetToDelete: any): Observable<EntityResponseType> {
    return this.http
      .post<IRunsheet>(this.resourceUrl + '/delete', runsheetToDelete, { observe: 'response' });
  }

  dispachRunsheet(dispachRunseet: any): Observable<EntityResponseType> {
    return this.http
      .post<IRunsheet>(this.resourceUrl + '/dispach', dispachRunseet, { observe: 'response' });
  }

}
