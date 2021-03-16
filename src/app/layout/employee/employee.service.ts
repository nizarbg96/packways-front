import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Employee, IEmployee} from '../../model/employee.model';

type EntityResponseType = HttpResponse<IEmployee>;
type EntityArrayResponseType = HttpResponse<IEmployee[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  public resourceUrl = environment.serverUrl + '/api/employees';
  updateType = 'create';
  employeeSubject = new Subject<boolean>();
  employeeToUpdate = new Employee();
  constructor(protected http: HttpClient) {}

  create(employee: IEmployee): Observable<EntityResponseType> {
    return this.http
      .post<IEmployee>(this.resourceUrl, employee, { observe: 'response' });
  }

  update(employee: IEmployee): Observable<EntityResponseType> {
    return this.http
      .put<IEmployee>(this.resourceUrl, employee, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IEmployee[]>(this.resourceUrl, {observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
