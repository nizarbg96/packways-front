import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogAddDriverToReconcilePickUpComponent, ReconcilePickUpComponent} from './reconcile-pick-up.component';
import {
  CreateActivityPickUpComponent,
  NgbdModalActivityPickUpConfirmed,
  NgbdModalConfirmActivityPickUp
} from './create-activity-pick-up/create-activity-pick-up.component';
import {ReconcilePickUpRoutingModule} from './reconcile-pickUp.routing.module';
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

import {PopUpDeleteModule} from '../shared/pop-up-delete/pop-up-delete.module';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';

@NgModule({
  declarations: [ReconcilePickUpComponent, CreateActivityPickUpComponent, DialogAddDriverToReconcilePickUpComponent, NgbdModalConfirmActivityPickUp, NgbdModalActivityPickUpConfirmed],
  entryComponents: [DialogAddDriverToReconcilePickUpComponent, NgbdModalConfirmActivityPickUp, NgbdModalActivityPickUpConfirmed,
  PopUpDeleteComponent],
  imports: [
    CommonModule,
    ReconcilePickUpRoutingModule, ReactiveFormsModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule, PopUpDeleteModule
  ],
  providers: [TripService, DriversService]
})
export class ReconcilePickUpModule { }
