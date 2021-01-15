import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConflictTripsComponent } from './conflict-trips.component';
import {ConflitRoutingModule} from './conflit.routing.module';
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

@NgModule({
  declarations: [ConflictTripsComponent],
  imports: [
    CommonModule,
    ConflitRoutingModule, ReactiveFormsModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule
  ],
  providers: [TripService]
})
export class ConflictTripsModule { }
