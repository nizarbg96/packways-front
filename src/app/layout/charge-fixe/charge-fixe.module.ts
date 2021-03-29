import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChargeFixeComponent, DialogAffecterChargeFixeComponent} from './charge-fixe.component';
import {ChargeFixeRoutingModule} from './charge-fixe.routing.module';
import {PageHeaderModule} from '../../shared/modules';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DataTableModule} from 'angular-6-datatable';
import {HttpModule} from '@angular/http';
import {MatCardModule, MatFormFieldModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {MaterialLibModule} from '../material/material.module';
import {Ng2CompleterModule} from 'ng2-completer';

@NgModule({
  declarations: [ChargeFixeComponent, DialogAffecterChargeFixeComponent],
  entryComponents: [DialogAffecterChargeFixeComponent],
  imports: [
    CommonModule,
    ChargeFixeRoutingModule,
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
  ]
})
export class ChargeFixeModule { }
