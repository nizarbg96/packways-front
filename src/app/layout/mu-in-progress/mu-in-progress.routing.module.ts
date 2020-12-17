import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MuInProgressComponent} from './mu-in-progress.component';

const routes: Routes = [
  {
    path: '', component: MuInProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuInProgressRoutingModule {
}
