import {HttpClient, HttpResponse} from '@angular/common/http';
import {IMoveableUnit} from '../../model/moveable-unit.model';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {createRequestOption} from '../../shared/util/request-util';
import {IRunsheet} from '../../model/runsheet.model';
import {MuInfo} from './moveable-unit.component';

type EntityResponseType = HttpResponse<IMoveableUnit>;
type EntityArrayResponseType = HttpResponse<IMoveableUnit[]>;

@Injectable({ providedIn: 'root' })
export class MoveableUnitService {
  public resourceUrl = environment.serverUrl + '/api/moveable-units';
  public muInfo: MuInfo;
  public muConfirmed: boolean;
  affectedDriverSubject = new Subject<any>();

  constructor(protected http: HttpClient) {}

  create(moveableUnit: IMoveableUnit): Observable<EntityResponseType> {
    return this.http
      .post<IMoveableUnit>(this.resourceUrl, moveableUnit, { observe: 'response' });
  }

  update(moveableUnit: IMoveableUnit): Observable<EntityResponseType> {
    return this.http
      .put<IMoveableUnit>(this.resourceUrl, moveableUnit, { observe: 'response' });
  }

  updateDriver(moveableUnit: IMoveableUnit, idDriver: string): Observable<EntityResponseType> {
    return this.http
      .put<IMoveableUnit>(`${this.resourceUrl}/updateDriver/${idDriver}`, moveableUnit, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IMoveableUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IMoveableUnit[]>(`${this.resourceUrl}/status/${status}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMoveableUnit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
