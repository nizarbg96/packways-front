import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReconcileMuComponent} from './reconcile-mu.component';
import {CreateActivityMuComponent} from './create-activity-mu/create-activity-mu.component';
const routes: Routes = [
  {
    path: '', component: ReconcileMuComponent
  },
  {
    path: 'create', component: CreateActivityMuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconcileMuRoutingModule {
}
