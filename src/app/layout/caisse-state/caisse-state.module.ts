import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CaisseStateComponent, DialogCloseFundComponent, DialogOpenFundComponent} from './caisse-state.component';
import {CaisseRoutingModule} from './caisse.routing.module';
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
import {CaisseDetailComponent} from './caisse-detail/caisse-detail.component';

@NgModule({
  declarations: [CaisseStateComponent, CaisseDetailComponent, DialogOpenFundComponent, DialogCloseFundComponent],
  entryComponents: [CaisseDetailComponent, DialogOpenFundComponent, DialogCloseFundComponent],
  imports: [
    CommonModule,
    CaisseRoutingModule, PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule,
    ReactiveFormsModule
  ]
})
export class CaisseStateModule { }
