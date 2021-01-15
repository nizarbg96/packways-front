import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CloseActivityRunsheetComponent} from './close-activity-runsheet.component';
import {CreateCloseActivityRunsheetComponent} from './create-close-activity-runsheet/create-close-activity-runsheet.component';

const routes: Routes = [
  {
    path: '', component: CloseActivityRunsheetComponent
  },
  {
    path: 'create', component: CreateCloseActivityRunsheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloseActivityRunsheetRoutingModule {
}
