import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddFondComponent, InjectionFondComponent} from './injection-fond.component';
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
import {InjectionFonDetailsComponent} from './injection-fon-details/injection-fon-details.component';
import {InjectionFondRoutingModule} from './injection-fond.routing.module';

@NgModule({
  declarations: [InjectionFondComponent, InjectionFonDetailsComponent, AddFondComponent],
  entryComponents: [InjectionFonDetailsComponent, AddFondComponent],
  imports: [
    InjectionFondRoutingModule,
    CommonModule,
    PageHeaderModule,
    PageHeaderModule, NgbModule, HttpModule,
    HttpClientModule, DataTableModule, FormsModule, MatCardModule, NgxQRCodeModule,
    MatTableModule, MatPaginatorModule, MatFormFieldModule, UiSwitchModule,
    NgxSpinnerModule, MatSnackBarModule, Ng2CompleterModule, MaterialLibModule,
    ReactiveFormsModule
  ]
})
export class InjectionFondModule { }
