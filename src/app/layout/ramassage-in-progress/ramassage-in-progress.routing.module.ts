import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RamassageInProgressComponent} from './ramassage-in-progress.component';

const routes: Routes = [
  {
    path: '', component: RamassageInProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RamassageInProgressRoutingModule {
}
