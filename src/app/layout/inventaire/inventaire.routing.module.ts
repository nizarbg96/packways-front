import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {InventaireComponent} from './inventaire.component';
import {CreateInventaireComponent} from './create-inventaire/create-inventaire.component';

const routes: Routes = [
  {
    path: '', component: InventaireComponent
  },
  {
    path: 'create', component: CreateInventaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaireRoutingModule {
}
