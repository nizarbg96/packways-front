import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConflictTripsComponent} from './conflict-trips.component';

const routes: Routes = [
  {
    path: '', component: ConflictTripsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConflitRoutingModule {
}
