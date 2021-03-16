import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICar} from '../../model/car.model';
import {combineLatest, Subscription} from 'rxjs';
import {CarService} from './car.service';
import {ActivatedRoute, Data, ParamMap, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {CarDeleteDialogComponent} from './car-delete-dialog.component';
import {CarUpdateComponent} from './car-update.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnDestroy {

  date = new Date();
  spinner = true;

  cars?: ICar[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = 20;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected carService: CarService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(): void {
    this.spinner = true;
    this.carService
      .query().subscribe(
        (res: HttpResponse<ICar[]>) => {this.cars = res.body.filter(value => value.deleted === false);
        this.spinner = false},
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.loadPage();
    this.carService.carSubject.subscribe(() => this.loadPage());
  }


  ngOnDestroy(): void {

  }
  trackId(index: number, item: ICar): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(car: ICar): void {
    const modalRef = this.modalService.open(CarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.car = car;
  }


  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  addCar() {
    const modalRef = this.modalService.open(CarUpdateComponent, { size: 'lg', backdrop: 'static' });
  }
}
