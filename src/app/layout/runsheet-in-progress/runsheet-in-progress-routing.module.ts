import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RunsheetInProgressComponent} from './runsheet-in-progress.component';
const routes: Routes = [
  {
    path: '', component: RunsheetInProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunsheetInProgressRoutingModule {
}
