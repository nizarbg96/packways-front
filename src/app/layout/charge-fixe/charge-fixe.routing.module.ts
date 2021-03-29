import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChargeFixeComponent} from './charge-fixe.component';

const routes: Routes = [
  {
    path: '', component: ChargeFixeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeFixeRoutingModule {
}
