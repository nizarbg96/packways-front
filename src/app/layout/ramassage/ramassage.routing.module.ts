import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RamassageComponent} from './ramassage.component';
import {RamassageCreateComponent} from './ramassage-create/ramassage-create.component';
import {RamassageEditComponent} from './ramassage-edit/ramassage-edit.component';

const routes: Routes = [
  {
    path: '', component: RamassageComponent
  },
  {
    path: 'create', component: RamassageCreateComponent
  },
  {
    path: 'edit/:idPickUp', component: RamassageEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RamassageRoutingModule {
}
