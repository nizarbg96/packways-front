import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogAddDriverToReconcileRunsheetComponent, ReconcileRunsheetComponent} from './reconcile-runsheet.component';
import {ReconcileRunsheetRoutingModule} from './reconcile-runsheet.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageHeaderModule} from '../../shared/modules';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {DataTableModule} from 'angular-6-datatable';
import {MatCardModule, MatFormFieldModule, MatPaginatorModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {NgxSpinnerModule} from 'ngx-spinner';
import {Ng2CompleterModule} from 'ng2-completer';
import {MaterialLibModule} from '../material/material.module';
import {TripService} from '../trips/trips.service';
import {DriversService} from '../drivers/drivers.service';
import {
  CreateActivityRunsheetComponent, NgbdModalActivityConfirmed, NgbdModalConfirmActivity,
  NgbdModalConfirmLivree,
  NgbdModalConfirmNonLivree, NgbdModalConfirmReturned
} from './create-activity-runsheet/create-activity-runsheet.component';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';
import {PopUpDeleteModule} from '../shared/pop-up-delete/pop-up-delete.module';

@NgModule({
  declarations: [ReconcileRunsheetComponent,
    DialogAddDriverToReconcileRunsheetComponent,
  CreateActivityRunsheetComponent,
    NgbdModalConfirmNonLivree,
    NgbdModalConfirmLivree,
    NgbdModalConfirmActivity, NgbdModalActivityConfirmed, NgbdModalConfirmReturned],
  entryComponents:[DialogAddDriverToReconcileRunsheetComponent,
    NgbdModalConfirmNonLivree, NgbdModalConfirmLivree, NgbdModalConfirmActivity, NgbdModalActivityConfirmed, NgbdModalConfirmReturned,
  PopUpDeleteComponent],
  imports: [
    CommonModule,
    ReconcileRunsheetRoutingModule,
    ReactiveFormsModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule, PopUpDeleteModule
  ],
  providers: [TripService, DriversService],
  exports: [NgbdModalConfirmNonLivree],
  bootstrap: [NgbdModalConfirmNonLivree],
})
export class ReconcileRunsheetModule { }
