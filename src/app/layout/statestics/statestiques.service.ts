import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {createRequestOption} from '../../shared/util/request-util';
import {IStatActivityJour} from '../../model/stat-activity-jour.model';
import {IStatClient} from '../../model/stat-client.model';
import {Trip} from '../trips/Trip';
import {IStatActivityDriver} from '../../model/stat-activity-driver.model';
import {IStatActivityJourClient} from '../../model/stat-activity-jour-client.model';
import {IClassementDrivers} from '../../model/classement-drivers.model';
import {JumiaTrip} from '../../model/jumia.trip.model';
import {IHealthStats} from '../../model/health-stats.model';

type EntityResponseType = HttpResponse<IStatActivityJour>;
type EntityArrayResponseType = HttpResponse<IStatActivityJour[]>;

@Injectable({
  providedIn: 'root'
})
export class StatestiquesService {
  public resourceUrl = environment.serverUrl + '/api/stat-activity-jour';

  constructor(protected http: HttpClient) {}

  create(statActivityJour: IStatActivityJour): Observable<EntityResponseType> {
    return this.http
      .post<IStatActivityJour>(this.resourceUrl, statActivityJour, { observe: 'response' });
  }

  update(statActivityJour: IStatActivityJour): Observable<EntityResponseType> {
    return this.http
      .put<IStatActivityJour>(this.resourceUrl, statActivityJour, { observe: 'response' });
  }

  updateDriver(pickup: IStatActivityJour, idDriver: string): Observable<EntityResponseType> {
    return this.http
      .put<IStatActivityJour>(`${this.resourceUrl}/updateDriver/${idDriver}`, pickup, { observe: 'response' });
  }
  updateList(pickUps: IStatActivityJour[]): Observable<EntityArrayResponseType> {
    return this.http
      .put<IStatActivityJour[]>(this.resourceUrl + '/updateList', pickUps, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IStatActivityJour>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findAllByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IStatActivityJour[]>(`${this.resourceUrl}/status/${status}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStatActivityJour[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  queryByDate(from: Date): Observable<EntityArrayResponseType> {
    return this.http
      .post<IStatActivityJour[]>(this.resourceUrl+ '/afterDate/', from, { observe: 'response' });
  }
  queryByDateBetwwen(from: Date, to: Date): Observable<EntityArrayResponseType> {
    return this.http
      .post<IStatActivityJour[]>(this.resourceUrl + '/betweenDates/', {fromDate: from, toDate: to},  { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  getDriversStats(req?: any): Observable<HttpResponse<IStatActivityDriver[]>> {
    const options = createRequestOption(req);
    return this.http.get<IStatActivityDriver[]>(environment.serverUrl + `/api/stat-activity-jour-driver`, {params: options, observe: 'response'});
  }
  getClientsActvityStats(req?: any): Observable<HttpResponse<IStatActivityJourClient[]>> {
    const options = createRequestOption(req);
    return this.http.get<IStatActivityJourClient[]>(environment.serverUrl + `/api/stat-activity-jour-client`, {params: options, observe: 'response'});
  }
  getClientsLastPickUpsDate(): Observable<HttpResponse<IStatActivityJourClient[]>> {
    return this.http.get<IStatActivityJourClient[]>(environment.serverUrl + `/api/stat-activity-jour-client/colis-postulee`, {observe: 'response'});
  }
  getDriversRanking(): Observable<HttpResponse<IClassementDrivers[]>> {
    return this.http.get<IClassementDrivers[]>(environment.serverUrl + `/api/classement-drivers/currentWeek/`, {observe: 'response'});
  }
  getClientStats(clientId: string): Observable<HttpResponse<IStatClient>> {
    return this.http.get<IStatClient>(`${this.resourceUrl}/client/${clientId}`, {observe: 'response'});
}
  getClientStatsLivree(clientId: string, fromDate: Date): Observable<HttpResponse<Trip[]>> {
    return this.http.post<Trip[]>(`${this.resourceUrl}/client/${clientId}/livree`, fromDate, {observe: 'response'});
  }
  getClientStatsRetour(clientId: string, fromDate: Date): Observable<HttpResponse<Trip[]>> {
    return this.http.post<Trip[]>(`${this.resourceUrl}/client/${clientId}/retour`, fromDate, {observe: 'response'});
  }
  postJumiaTrips(trips: JumiaTrip[]): Observable<HttpResponse<Trip[]>> {
    return this.http.post<Trip[]>(`${this.resourceUrl}/external-trips/`, trips, {observe: 'response'});

  }
  getHealthStats(fromDate: Date): Observable<HttpResponse<IHealthStats>> {
    return this.http.post<IHealthStats>(`${this.resourceUrl}/healthStats/`, fromDate, {observe: 'response'});

  }

}
