import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IEmployee} from '../../model/employee.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-employee-detail',
  templateUrl: './employee-detail.component.html',
})
export class EmployeeDetailComponent implements OnInit {
  employee?: IEmployee;

  constructor(protected activatedRoute: ActivatedRoute, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }
  cancel(): void {
    this.activeModal.dismiss();
  }
  previousState(): void {
  }
}
