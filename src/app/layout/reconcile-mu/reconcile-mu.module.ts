import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogAddDriverToReconcileMuComponent, ReconcileMuComponent} from './reconcile-mu.component';
import {
  CreateActivityMuComponent,
  NgbdModalActivityMuConfirmed,
  NgbdModalConfirmActivityMu
} from './create-activity-mu/create-activity-mu.component';
import {ReconcileMuRoutingModule} from './reconcile-mu.routing.module';
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
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';
import {PopUpDeleteModule} from '../shared/pop-up-delete/pop-up-delete.module';

@NgModule({
  declarations: [ReconcileMuComponent, CreateActivityMuComponent, DialogAddDriverToReconcileMuComponent, NgbdModalConfirmActivityMu, NgbdModalActivityMuConfirmed],
  entryComponents: [DialogAddDriverToReconcileMuComponent, NgbdModalConfirmActivityMu, NgbdModalActivityMuConfirmed, PopUpDeleteComponent],
  imports: [
    CommonModule,
    ReconcileMuRoutingModule, ReactiveFormsModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule, PopUpDeleteModule
  ],
  providers: [TripService, DriversService]
})
export class ReconcileMuModule { }
