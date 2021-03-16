import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from './car.service';
import {ICar} from '../../model/car.model';

@Component({
  templateUrl: './car-delete-dialog.component.html',
})
export class CarDeleteDialogComponent {
  car?: ICar;
  private user: any;

  constructor(protected carService: CarService, public activeModal: NgbActiveModal) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];

  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.car.deleted = true;
    this.car.deletedDate = new Date();
    this.car.deletedBy = this.user.idAdmin;
    this.car.deletedByName = this.user.name;
    this.carService.update(this.car).subscribe(() => {
      this.carService.carSubject.next(true);
      this.activeModal.close();
    });
  }
}
