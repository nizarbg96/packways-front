import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunsheetCreateComponent } from './runsheet-create/runsheet-create.component';
import { RunsheetEditComponent } from './runsheet-edit/runsheet-edit.component';
import { RunsheetComponent } from './runsheet.component';

const routes: Routes = [
    {
        path: '', component: RunsheetComponent
    },
    {
        path: 'create', component: RunsheetCreateComponent
    },
    {
        path: 'edit/:idRunsheet', component: RunsheetEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RunsheetRoutingModule {
}
