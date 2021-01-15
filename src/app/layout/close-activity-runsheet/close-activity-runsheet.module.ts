import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseActivityRunsheetComponent } from './close-activity-runsheet.component';
import {CloseActivityRunsheetRoutingModule} from './close-activity-runsheet.routing.module';
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
  CreateCloseActivityRunsheetComponent,
  NgbdModalActivityClosed, NgbdModalCloseActivity
} from './create-close-activity-runsheet/create-close-activity-runsheet.component';

@NgModule({
  declarations: [CloseActivityRunsheetComponent, CreateCloseActivityRunsheetComponent, NgbdModalActivityClosed, NgbdModalCloseActivity],
  entryComponents: [NgbdModalActivityClosed, NgbdModalCloseActivity],
  imports: [
    CommonModule,
    CloseActivityRunsheetRoutingModule, ReactiveFormsModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule
  ],
  providers: [TripService, DriversService]
})
export class CloseActivityRunsheetModule { }
