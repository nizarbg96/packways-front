import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Inventaire} from '../../model/inventaire.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Trip} from '../trips/Trip';
import {IInventaire} from '../../model/inventaire.model';
type EntityResponseType = HttpResponse<IInventaire>;
type EntityArrayResponseType = HttpResponse<IInventaire[]>;

@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  public resourceUrl = environment.serverUrl + '/api/inventaires';
  //inventaireInfo: InventaireInfo;
  inventaireToEdit: Inventaire;
  sacannedTrip: Trip;
  newStatus: string;
  constructor(protected http: HttpClient) {}

  create(inventaire: IInventaire): Observable<EntityResponseType> {
    return this.http
      .post<IInventaire>(this.resourceUrl, inventaire, { observe: 'response' });
  }

  update(inventaire: IInventaire): Observable<EntityResponseType> {
    return this.http
      .put<IInventaire>(this.resourceUrl, inventaire, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IInventaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IInventaire[]>(this.resourceUrl, {observe: 'response' });
  }

  findByStatus(status: string): Observable<EntityArrayResponseType> {
    return this.http
      .get<IInventaire[]>(`${this.resourceUrl}/status/${status}`, {observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

}
