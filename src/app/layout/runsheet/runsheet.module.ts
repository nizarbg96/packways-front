import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunsheetRoutingModule } from './runsheet-routing.module';
import {DialogAddDriverToRunsheetComponent, NgbdModalDeleteRunsheet, RunsheetComponent} from './runsheet.component';
import { PageHeaderModule } from 'src/app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular-6-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatPaginatorModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2CompleterModule } from 'ng2-completer';
import { MaterialLibModule } from '../material/material.module';
import { HttpModule } from '@angular/http';
import { TripService } from '../trips/trips.service';
import {
  DialogAddDriverToCreateRunsheetComponent,
  NgbdModalCreateForceRetour,
  RunsheetCreateComponent
} from './runsheet-create/runsheet-create.component';
import { DriversService } from '../drivers/drivers.service';
import {
  DialogAddDriverToEditRunsheetComponent,
  NgbdModalEditForceRetour,
  RunsheetEditComponent
} from './runsheet-edit/runsheet-edit.component';

@NgModule({
  declarations: [
    RunsheetComponent,
    DialogAddDriverToRunsheetComponent,
    RunsheetCreateComponent,
    DialogAddDriverToCreateRunsheetComponent,
    RunsheetEditComponent,
    DialogAddDriverToEditRunsheetComponent,
    NgbdModalCreateForceRetour,
    NgbdModalEditForceRetour,
    NgbdModalDeleteRunsheet

  ],
  entryComponents: [DialogAddDriverToRunsheetComponent, DialogAddDriverToCreateRunsheetComponent,
    DialogAddDriverToEditRunsheetComponent, NgbdModalCreateForceRetour, NgbdModalEditForceRetour, NgbdModalDeleteRunsheet],
  imports: [
    CommonModule,
    RunsheetRoutingModule,
    ReactiveFormsModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
         HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
          MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
           NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule
  ],
  providers: [TripService, DriversService]
})
export class RunsheetModule { }
