import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CaisseStateComponent} from './caisse-state.component';

const routes: Routes = [
  {
    path: '', component: CaisseStateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaisseRoutingModule {
}
