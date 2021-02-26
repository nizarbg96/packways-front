import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StatesticsComponent} from './statestics.component';

const routes: Routes = [
  {
    path: '', component: StatesticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesticsRoutingModule {
}
