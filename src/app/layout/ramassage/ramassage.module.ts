import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogAddDriverToPickUpComponent, RamassageComponent} from './ramassage.component';
import {DialogAddDriverToCreatePickUpComponent, RamassageCreateComponent} from './ramassage-create/ramassage-create.component';
import {DialogAddDriverToEditPickUpComponent, RamassageEditComponent} from './ramassage-edit/ramassage-edit.component';
import {RamassageRoutingModule} from './ramassage.routing.module';
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
import {PopUpDeleteModule} from '../shared/pop-up-delete/pop-up-delete.module';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';

@NgModule({
  declarations: [
    RamassageComponent,
    RamassageCreateComponent,
    RamassageEditComponent,
    DialogAddDriverToPickUpComponent,
    DialogAddDriverToCreatePickUpComponent,
    DialogAddDriverToEditPickUpComponent
  ],
  entryComponents: [DialogAddDriverToPickUpComponent, DialogAddDriverToCreatePickUpComponent, DialogAddDriverToEditPickUpComponent,
  PopUpDeleteComponent],
  imports: [
    CommonModule,
    RamassageRoutingModule,
    ReactiveFormsModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule,
    PopUpDeleteModule
  ],
  providers: [TripService, DriversService]
})
export class RamassageModule { }
