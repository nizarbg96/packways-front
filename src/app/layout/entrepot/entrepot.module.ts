import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntrepotComponent} from './entrepot.component';
import {EntrepotRoutingModule} from './entrepot-routing.module';
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
import { EntrepotCreateComponent } from './entrepot-create/entrepot-create.component';
import { EntrepotDetailComponent } from './entrepot-detail/entrepot-detail.component';
import { EntrepotDeleteComponent } from './entrepot-delete/entrepot-delete.component';

@NgModule({
  declarations: [EntrepotComponent, EntrepotCreateComponent, EntrepotDetailComponent, EntrepotDeleteComponent],
  entryComponents: [EntrepotDeleteComponent],
  imports: [
    CommonModule,
    EntrepotRoutingModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule,
    ReactiveFormsModule
  ]
})
export class EntrepotModule { }
