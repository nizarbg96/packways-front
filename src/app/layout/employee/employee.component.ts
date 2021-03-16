import { Component, OnInit } from '@angular/core';
import {EmployeeService} from './employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {Employee, IEmployee} from '../../model/employee.model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {EmployeeDeleteDialogComponent} from './employee-delete-dialog.component';
import {CarUpdateComponent} from '../car/car-update.component';
import {EmployeeUpdateComponent} from './employee-update.component';
import {EmployeeDetailComponent} from './employee-detail.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees?: IEmployee[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = 20;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  spinner = false;

  constructor(
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(): void {
    this.spinner = true;

    this.employeeService
      .query().subscribe(
        (res: HttpResponse<IEmployee[]>) =>{
          this.employees = res.body.filter(value => value.deleted === false);
          this.spinner = false;
        },
        () => this.onError()
      );
  }

  ngOnInit(): void {
this.loadPage();
    this.employeeService.employeeSubject.subscribe(() => this.loadPage());

  }
  addEmployee(){
    const modalRef = this.modalService.open(EmployeeUpdateComponent, { size: 'lg', backdrop: 'static' });
  }

  updateEmployee(employee: Employee){
    this.employeeService.employeeToUpdate = employee;
    this.employeeService.updateType = 'update';
    const modalRef = this.modalService.open(EmployeeUpdateComponent, { size: 'lg', backdrop: 'static' });
  }
  viewDetails(employee: Employee){
    const modalRef = this.modalService.open(EmployeeDetailComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employee = employee;
  }

  ngOnDestroy(): void {

  }

  delete(employee: IEmployee): void {
    const modalRef = this.modalService.open(EmployeeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employee = employee;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IEmployee[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {

  }

  protected onError(): void {
  }

}
