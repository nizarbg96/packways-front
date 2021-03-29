import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DriversTableComponent} from './drivers-table.component';

const routes: Routes = [
  {
    path: '', component: DriversTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversTableRoutingModule {
}
