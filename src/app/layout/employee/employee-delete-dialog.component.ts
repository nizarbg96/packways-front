import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from './employee.service';
import {IEmployee} from '../../model/employee.model';

@Component({
  templateUrl: './employee-delete-dialog.component.html',
})
export class EmployeeDeleteDialogComponent {
  employee?: IEmployee;
   user: any;

  constructor(protected employeeService: EmployeeService, public activeModal: NgbActiveModal) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {this.employee.deleted = true;
  this.employee.deletedDate = new Date();
  this.employee.deletedByName = this.user.name;
  this.employee.deletedBy = this.user.idAdmin;
    this.employeeService.update(this.employee).subscribe(() => {
      this.employeeService.employeeSubject.next(true);
      this.activeModal.close();
    });
  }
}
