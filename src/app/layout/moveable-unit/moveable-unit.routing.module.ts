import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoveableUnitComponent} from './moveable-unit.component';
import {MoveableUnitCreateComponent} from './moveable-unit-create/moveable-unit-create.component';
import {RunsheetEditComponent} from '../runsheet/runsheet-edit/runsheet-edit.component';
import {MoveableUnitEditComponent} from './moveable-unit-edit/moveable-unit-edit.component';


const routes: Routes = [
  {
    path: '', component: MoveableUnitComponent
  },
  {
    path: 'create', component: MoveableUnitCreateComponent
  },
  {
    path: 'edit/:idMoveableUnit', component: MoveableUnitEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoveableUnitRoutingModule {
}
