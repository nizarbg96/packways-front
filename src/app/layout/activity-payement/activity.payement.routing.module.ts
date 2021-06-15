import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ActivityPayementComponent} from './activity-payement.component';
import {CreateActivityPayementComponent} from './create-activity-payement/create-activity-payement.component';
import {PaiementsClient} from '../../model/PaiementClient.model';
import {UserPayementsComponent} from './user-payements/user-payements.component';

const routes: Routes = [
  {
    path: '', component: ActivityPayementComponent
  },
  {
    path: 'create', component: CreateActivityPayementComponent
  },
  {
    path: 'clients', component: UserPayementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityPayementRoutingModule {
}
