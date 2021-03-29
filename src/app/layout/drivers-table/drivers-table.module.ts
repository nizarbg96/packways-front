import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversTableComponent } from './drivers-table.component';
import {DriversTableRoutingModule} from './drivers-table.routing.module';
import {PageHeaderModule} from '../../shared/modules';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DataTableModule} from 'angular-6-datatable';
import {HttpModule} from '@angular/http';
import {MatCardModule, MatFormFieldModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {MaterialLibModule} from '../material/material.module';
import {DriversService} from '../drivers/drivers.service';
import {TripService} from '../trips/trips.service';
import {Ng2CompleterModule} from 'ng2-completer';
import {DriverTableContentComponent} from './driver-table-content/driver-table-content.component';

@NgModule({
  declarations: [DriversTableComponent, DriverTableContentComponent],
  imports: [
    CommonModule,
    DriversTableRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    NgxSpinnerModule,
    DataTableModule,
    HttpModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MaterialLibModule,
    ReactiveFormsModule,
    Ng2CompleterModule
  ],
  providers:[DriversService, TripService]
})
export class DriversTableModule { }
