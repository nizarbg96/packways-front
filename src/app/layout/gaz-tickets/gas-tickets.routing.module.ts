import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GazTicketsComponent} from './gaz-tickets.component';

const routes: Routes = [
  {
    path: '', component: GazTicketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasTicketsRoutingModule {
}
