import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { EmployeeService } from './employee.service';
import {Employee, IEmployee} from '../../model/employee.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EntrepotService} from '../entrepot/entrepot.service';
import {Entrepot, IEntrepot} from '../../model/entrepot.model';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {
  isSaving = false;
  deletedDateDp: any;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    cin: [],
    phoneNumber: [],
    role: [],
    deleted: [],
    login: [],
    password: []
  });
  private user: any;
  roleAppUser = false;
  roleAppDriver =  false;
   entrepots: IEntrepot[] = [];
   employee: Employee;
   selectedEntrepot: Entrepot;
   roles: any[] = [];


  constructor(protected employeeService: EmployeeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder,
              public activeModal: NgbActiveModal, private entrepotService: EntrepotService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.employee = this.employeeService.employeeToUpdate;
    if(this.employeeService.updateType === 'update'){
      this.updateForm(this.employeeService.employeeToUpdate);
    }
    this.getEntrepots();

  }
  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      if (!!this.employeeService.employeeToUpdate.entrepot) {
        console.log('entrepot existe in user')
        this.entrepots = res.body.filter((entrepot) => (entrepot.deleted === false && entrepot !== this.employeeService.employeeToUpdate.entrepot));
        this.employee = this.employeeService.employeeToUpdate;
      } else {
        this.entrepots = res.body.filter((entrepot) => (entrepot.deleted === false));
        this.employee = this.employeeService.employeeToUpdate;
      }
    });
  }

  updateForm(employee: IEmployee): void {
    console.log(employee);
    this.editForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      cin: employee.cin,
      phoneNumber: employee.phoneNumber,
      roles: employee.roles,
      deleted: employee.deleted,
      entrepot: employee.entrepot,
      
    });
    if(employee.roles.indexOf('ROLE_USER') >= 0){
      this.roleAppUser = true;
      console.log(this.roleAppUser)
      this.roles.push('ROLE_USER');
    }
    if(employee.roles.indexOf('ROLE_DRIVER') >= 0){
      this.roleAppDriver = true;
      this.roles.push('ROLE_DRIVER');

    }
  }

  previousState(): void {
    this.activeModal.close();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== null) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployee {
     this.roles = [];
    if(this.roleAppUser){
      if(this.roles.indexOf('ROLE_USER') < 0){
        this.roles.push('ROLE_USER');
      }
    } else {
      if(this.roles.indexOf('ROLE_USER') >= 0){
        this.roles.splice(this.roles.indexOf('ROLE_USER'), 1);
      }
    }
    if(this.roleAppDriver){
      if(this.roles.indexOf('ROLE_DRIVER') < 0) {
        this.roles.push('ROLE_DRIVER');
      }else {
        if(this.roles.indexOf('ROLE_DRIVER') >= 0){
          this.roles.splice(this.roles.indexOf('ROLE_DRIVER'), 1);
        }
      }
    }
    console.log(this.employee.entrepot);

    return {
      ...new Employee(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      cin: this.editForm.get(['cin'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      login: this.editForm.get(['login'])!.value,
      password: this.editForm.get(['password'])!.value,
      roles: this.roles,
      deleted: false,
      deletedBy: null,
      deletedByName: null,
      deletedDate: null,
      createdBy: this.user.idAdmin,
      createdByName: this.user.name,
      createdDate: new Date(),
      entrepot: this.selectedEntrepot
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.employeeService.updateType ='create';
    this.isSaving = false;
    this.previousState();
    this.employeeService.employeeSubject.next(true);

  }

  protected onSaveError(): void {
    this.employeeService.updateType ='create';
    this.isSaving = false;
  }


  cancel(): void {
    this.employeeService.updateType ='create';
    this.activeModal.dismiss();
  }

  onOptionsSelected(value) {
    this.selectedEntrepot = this.entrepots[+value[0]];
    console.log(this.selectedEntrepot);
  }
}
