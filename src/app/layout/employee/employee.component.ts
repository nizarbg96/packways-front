import {Component, OnInit, TemplateRef} from '@angular/core';
import {EmployeeService} from './employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {Employee, IEmployee} from '../../model/employee.model';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {EmployeeDeleteDialogComponent} from './employee-delete-dialog.component';
import {CarUpdateComponent} from '../car/car-update.component';
import {EmployeeUpdateComponent} from './employee-update.component';
import {EmployeeDetailComponent} from './employee-detail.component';
import {Car} from '../../model/car.model';
import {MatListOption, MatSelectionList} from '@angular/material';
import {Driver} from '../drivers/Driver';
import {CarService} from '../car/car.service';

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
  cars: Car[] = [];
  affectedCars = [];
  affectedCarsIds = [];
  selectedEmployee: Employee;
   closeResult: string;

  constructor(
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private carService: CarService
  ) {
  }

  loadPage(): void {
    this.spinner = true;

    this.employeeService
      .query().subscribe(
      (res: HttpResponse<IEmployee[]>) => {
        this.employees = res.body.filter(value => value.deleted === false);
        this.spinner = false;
      },
      () => this.onError()
    );
  }

  ngOnInit(): void {
    this.loadPage();
    this.employeeService.employeeSubject.subscribe(() => this.loadPage());
    this.getCars();

  }

  getCars() {
    this.carService.query().subscribe((res) => {
      this.cars = res.body.filter(value => !value.deleted);
    });
  }

  addEmployee() {
    const modalRef = this.modalService.open(EmployeeUpdateComponent, {size: 'lg', backdrop: 'static'});
  }

  updateEmployee(employee: Employee) {
    this.employeeService.employeeToUpdate = employee;
    this.employeeService.updateType = 'update';
    const modalRef = this.modalService.open(EmployeeUpdateComponent, {size: 'lg', backdrop: 'static'});
  }

  viewDetails(employee: Employee) {
    const modalRef = this.modalService.open(EmployeeDetailComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.employee = employee;
  }

  ngOnDestroy(): void {

  }

  openAffectCar(affectCar: TemplateRef<any>, employee: Employee) {
    this.affectedCars = employee.affectedCars;
    this.affectedCarsIds = this.affectedCars.map(value => value.id);
    this.selectedEmployee = employee;
    this.modalService.open(affectCar, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveCars(employee: Employee, carsSelection: MatSelectionList) {
    employee.affectedCars = this.cars.slice().filter((car) => this.affectedCarsIds.indexOf(car.id) >= 0);
    this.employeeService.update(employee).subscribe(() => {
      this.employeeService.employeeSubject.next(true);
    });
  }

  onAreaListControlChanged(car_option: MatListOption, car: Car) {
    if (car_option.selected) {
      this.affectedCars.push(car);
      this.affectedCarsIds = this.affectedCars.map(value => value.id);
    } else {
      this.affectedCars.splice(this.affectedCars.indexOf(car), 1);
      this.affectedCarsIds = this.affectedCars.map(value => value.id);
    }
    console.log(this.affectedCars);
  }

  delete(employee: IEmployee): void {
    const modalRef = this.modalService.open(EmployeeDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
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
