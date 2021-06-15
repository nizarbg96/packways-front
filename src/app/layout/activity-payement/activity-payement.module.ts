import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ActivityPayementComponent, DialogClientToActivityPayementComponent} from './activity-payement.component';
import {ActivityPayementRoutingModule} from './activity.payement.routing.module';
import {TripService} from '../trips/trips.service';
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
import {
  CreateActivityPayementComponent, NgbdModalActivityPayementConfirmed, NgbdModalConfirmActivityPayement
} from './create-activity-payement/create-activity-payement.component';
import {UserPayementsComponent} from './user-payements/user-payements.component';

@NgModule({
  declarations: [ActivityPayementComponent, CreateActivityPayementComponent, DialogClientToActivityPayementComponent,
    NgbdModalConfirmActivityPayement, NgbdModalActivityPayementConfirmed, UserPayementsComponent],
  entryComponents: [DialogClientToActivityPayementComponent, NgbdModalConfirmActivityPayement, NgbdModalActivityPayementConfirmed,
    UserPayementsComponent],
  imports: [
    CommonModule,
    ActivityPayementRoutingModule, ReactiveFormsModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule
  ],
  providers: [TripService, DatePipe]
})
export class ActivityPayementModule { }
