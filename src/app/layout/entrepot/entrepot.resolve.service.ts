import { Injectable } from '@angular/core';
import {EntrepotService} from './entrepot.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {Entrepot, IEntrepot} from '../../model/entrepot.model';
import {flatMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntrepotResolve {

  constructor(private service: EntrepotService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntrepot> | Observable<never> {
    const id = route.params['id'];
  if (id) {
    return this.service.find(id).pipe(
      flatMap((entrepot: HttpResponse<Entrepot>) => {
        if (entrepot.body) {
          return of(entrepot.body);
        } else {
          this.router.navigate(['/acceuil']);
          return EMPTY;
        }
      })
    );
  }
  return of(new Entrepot());
}
}
