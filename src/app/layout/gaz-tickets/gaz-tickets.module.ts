import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {DialogAffecterBordereauComponent, GazTicketsComponent} from './gaz-tickets.component';
import {GasTicketsRoutingModule} from './gas-tickets.routing.module';
import {PageHeaderModule} from '../../shared/modules';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {DataTableModule} from 'angular-6-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatFormFieldModule, MatPaginatorModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {NgxSpinnerModule} from 'ngx-spinner';
import {Ng2CompleterModule} from 'ng2-completer';
import {MaterialLibModule} from '../material/material.module';
import {TripService} from '../trips/trips.service';
import {DriversService} from '../drivers/drivers.service';
import {GazTicketDetailsComponent} from './gaz-ticket-details/gaz-ticket-details.component';

@NgModule({
  declarations: [GazTicketsComponent, DialogAffecterBordereauComponent, GazTicketDetailsComponent],
  entryComponents: [DialogAffecterBordereauComponent, GazTicketDetailsComponent],
  imports: [
    CommonModule,
    GasTicketsRoutingModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe, TripService, DriversService]

})
export class GazTicketsModule { }
