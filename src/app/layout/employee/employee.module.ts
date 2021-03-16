import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import {PageHeaderModule} from '../../shared/modules';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DataTableModule} from 'angular-6-datatable';
import {HttpModule} from '@angular/http';
import {MatCardModule, MatFormFieldModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {MaterialLibModule} from '../material/material.module';
import {EmployeeRoutingModule} from './employee.routing.module';
import {EmployeeDeleteDialogComponent} from './employee-delete-dialog.component';
import {EmployeeUpdateComponent} from './employee-update.component';
import {EmployeeDetailComponent} from './employee-detail.component';

@NgModule({
  declarations: [EmployeeComponent, EmployeeDeleteDialogComponent, EmployeeUpdateComponent, EmployeeDetailComponent],
  entryComponents: [EmployeeDeleteDialogComponent, EmployeeUpdateComponent, EmployeeDetailComponent ],
  imports: [
    EmployeeRoutingModule,
    CommonModule,
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
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
