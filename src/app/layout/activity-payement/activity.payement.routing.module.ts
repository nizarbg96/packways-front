import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ActivityPayementComponent} from './activity-payement.component';
import {CreateActivityPayementComponent} from './create-activity-payement/create-activity-payement.component';

const routes: Routes = [
  {
    path: '', component: ActivityPayementComponent
  },
  {
    path: 'create', component: CreateActivityPayementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityPayementRoutingModule {
}
