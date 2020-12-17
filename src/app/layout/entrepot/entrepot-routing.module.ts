import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntrepotComponent} from './entrepot.component';
import {EntrepotCreateComponent} from './entrepot-create/entrepot-create.component';
import {EntrepotDetailComponent} from './entrepot-detail/entrepot-detail.component';
import {EntrepotResolve} from './entrepot.resolve.service';

const routes: Routes = [
  {
    path: '', component: EntrepotComponent
  },
  {
    path: ':id/view',
    component: EntrepotDetailComponent,
    resolve: {
      entrepot: EntrepotResolve,
    },
  },
  {
    path: 'create',
    component: EntrepotCreateComponent,
    resolve: {
      entropot: EntrepotResolve,
    },
  },
  {
    path: ':id/edit',
    component: EntrepotCreateComponent,
    resolve: {
      entropot: EntrepotResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepotRoutingModule {
}
