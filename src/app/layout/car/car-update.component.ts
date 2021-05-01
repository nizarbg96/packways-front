import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CarService } from './car.service';
import {Car, ICar} from '../../model/car.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-car-update',
  templateUrl: './car-update.component.html',
})
export class CarUpdateComponent implements OnInit {
  isSaving = false;
  deletedDateDp: any;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    marqueVehicle: [],
    modelVehicle: [],
    matVehicle: [],
    typeVehicle: []
  });
  private user: any;

  constructor(protected carService: CarService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    if(!!this.carService.carToUpdate){
      this.updateForm(this.carService.carToUpdate);
    }
  }

  updateForm(car: ICar): void {
    this.editForm.patchValue({
      id: car.id,
      marqueVehicle: car.marqueVehicle,
      modelVehicle: car.modelVehicle,
      matVehicle: car.matVehicle,
      typeVehicle: car.typeVehicle
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const car = this.createFromForm();
    if(!!this.carService.carToUpdate){
      this.subscribeToSaveResponse(this.carService.update(car));
    } else {
      this.subscribeToSaveResponse(this.carService.create(car));

    }
  }

  private createFromForm(): ICar {
    return {
      ...new Car(),
      id: this.editForm.get(['id'])!.value,
      marqueVehicle: this.editForm.get(['marqueVehicle'])!.value,
      modelVehicle: this.editForm.get(['modelVehicle'])!.value,
      matVehicle: this.editForm.get(['matVehicle'])!.value,
      typeVehicle: this.editForm.get(['typeVehicle'])!.value,
      deleted: false,
      deletedBy: null,
      deletedByName: null,
      deletedDate: null,
      createdBy: this.user.idAdmin,
      createdByName: this.user.name,
      createdDate: new Date(),
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.carService.carToUpdate = null;
    this.isSaving = false;
    this.carService.carSubject.next(true);
    this.activeModal.close();
  }

  protected onSaveError(): void {
    this.carService.carToUpdate = null;
    this.isSaving = false;
  }
  cancel(): void {
    this.activeModal.dismiss();
  }
}
