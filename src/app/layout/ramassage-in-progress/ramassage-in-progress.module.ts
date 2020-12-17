import { NgModule } from '@angular/core';
import {CommonModule, DeprecatedI18NPipesModule} from '@angular/common';
import { RamassageInProgressComponent } from './ramassage-in-progress.component';
import {PageHeaderModule} from '../../shared/modules';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {DataTableModule} from 'angular-6-datatable';
import {FormsModule} from '@angular/forms';
import {MatCardModule, MatFormFieldModule, MatPaginatorModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {NgxSpinnerModule} from 'ngx-spinner';
import {Ng2CompleterModule} from 'ng2-completer';
import {MaterialLibModule} from '../material/material.module';
import {TripService} from '../trips/trips.service';
import {DriversService} from '../drivers/drivers.service';
import {RamassageInProgressRoutingModule} from './ramassage-in-progress.routing.module';

@NgModule({
  declarations: [RamassageInProgressComponent],
  imports: [
    CommonModule,
    RamassageInProgressRoutingModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule, DeprecatedI18NPipesModule
  ],
  providers: [TripService, DriversService]
})
export class RamassageInProgressModule { }
