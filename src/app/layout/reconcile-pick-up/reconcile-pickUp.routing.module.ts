import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReconcilePickUpComponent} from './reconcile-pick-up.component';
import {CreateActivityPickUpComponent} from './create-activity-pick-up/create-activity-pick-up.component';
const routes: Routes = [
  {
    path: '', component: ReconcilePickUpComponent
  },
  {
    path: 'create', component: CreateActivityPickUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconcilePickUpRoutingModule {
}
