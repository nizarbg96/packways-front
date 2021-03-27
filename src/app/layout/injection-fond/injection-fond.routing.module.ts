import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {InjectionFondComponent} from './injection-fond.component';

const routes: Routes = [
  {
    path: '', component: InjectionFondComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InjectionFondRoutingModule {
}
