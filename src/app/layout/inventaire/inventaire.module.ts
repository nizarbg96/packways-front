import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventaireComponent } from './inventaire.component';
import {InventaireRoutingModule} from './inventaire.routing.module';
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
  CreateInventaireComponent,
  NgbdModalConfirmInventaire,
  NgbdModalInventaireConfirmed
} from './create-inventaire/create-inventaire.component';
import {TripService} from '../trips/trips.service';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';
import {PopUpDeleteModule} from '../shared/pop-up-delete/pop-up-delete.module';

@NgModule({
  declarations: [InventaireComponent, CreateInventaireComponent, NgbdModalConfirmInventaire, NgbdModalInventaireConfirmed],
  entryComponents: [NgbdModalConfirmInventaire, NgbdModalInventaireConfirmed, PopUpDeleteComponent],
  imports: [
    CommonModule,
    InventaireRoutingModule,
    ReactiveFormsModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule, PopUpDeleteModule
  ],
  providers: [TripService]
})
export class InventaireModule { }
