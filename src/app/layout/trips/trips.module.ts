
import { AdresseService } from './../adresses/adresses.service';
import { LoginService } from './../../login/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TripsRoutingModule } from './trips-routing.module';
import { DialogOverviewExampleDialog, TripsComponent } from './trips.component';
import { PageHeaderModule } from '../../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TripService } from './trips.service';
import {DataTableModule} from 'angular-6-datatable';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule } from '@angular/material';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material';
import { Ng2CompleterModule } from 'ng2-completer';

import {NgxImageCompressService} from 'ngx-image-compress';
import { MaterialLibModule } from '../material/material.module';

/* import * as bootstrap from 'bootstrap';
import * as $ from 'jquery'; */


@NgModule({
    imports: [CommonModule, TripsRoutingModule, PageHeaderModule, NgbModule, HttpModule,
         HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
          MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
           NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule],
    declarations: [TripsComponent, DialogOverviewExampleDialog],
    providers: [TripService, LoginService, AdresseService,  NgxImageCompressService ],
    entryComponents: [DialogOverviewExampleDialog]
})
export class TripsModule {}

