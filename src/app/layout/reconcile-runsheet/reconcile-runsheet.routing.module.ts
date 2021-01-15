import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReconcileRunsheetComponent} from './reconcile-runsheet.component';
import {CreateActivityRunsheetComponent} from './create-activity-runsheet/create-activity-runsheet.component';
const routes: Routes = [
  {
    path: '', component: ReconcileRunsheetComponent
  },
  {
    path: 'create', component: CreateActivityRunsheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconcileRunsheetRoutingModule {
}
