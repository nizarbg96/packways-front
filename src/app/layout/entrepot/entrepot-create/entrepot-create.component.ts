import { Component, OnInit } from '@angular/core';
import {EntrepotService} from '../entrepot.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Entrepot, IEntrepot} from '../../../model/entrepot.model';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-entrepot-create',
  templateUrl: './entrepot-create.component.html',
  styleUrls: ['./entrepot-create.component.scss']
})
export class EntrepotCreateComponent implements OnInit {

  isSaving = false;
  createdDateDp: any;
  updatedDateDp: any;
  deletedDateDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    address: [],
    contact: [],
    mobileNumber: [],
    // createdBy: [],
    // createdDate: [],
    // updatedBy: [],
    // updatedDate: [],
    // deleted: [],
    // deletedBy: [],
    // deletedDate: [],
  });
   user: any;

  constructor(public entrepotService: EntrepotService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entropot }) => {
      this.updateForm(entropot);
    });
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
  }

  updateForm(entropot: IEntrepot): void {
    this.editForm.patchValue({
      id: entropot.id,
      nom: entropot.nom,
      address: entropot.address,
      contact: entropot.contact,
      mobileNumber: entropot.mobileNumber,
      createdBy: entropot.createdBy,
      createdDate: entropot.createdDate,
      updatedBy: entropot.updatedBy,
      updatedDate: entropot.updatedDate,
      deleted: entropot.deleted,
      deletedBy: entropot.deletedBy,
      deletedDate: entropot.deletedDate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entropot = this.createFromForm();
    if (entropot.id !== undefined) {
      this.subscribeToSaveResponse(this.entrepotService.update(entropot));
    } else {
      this.subscribeToSaveResponse(this.entrepotService.create(entropot));
    }
  }

  public createFromForm(): IEntrepot {
    return {
      ...new Entrepot(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      address: this.editForm.get(['address'])!.value,
      contact: this.editForm.get(['contact'])!.value,
      mobileNumber: this.editForm.get(['mobileNumber'])!.value,
      createdBy: this.user.idAdmin,
      createdDate: new Date(),
      // updatedBy: this.editForm.get(['updatedBy'])!.value,
      // updatedDate: this.editForm.get(['updatedDate'])!.value,
      // deleted: this.editForm.get(['deleted'])!.value,
      // deletedBy: this.editForm.get(['deletedBy'])!.value,
      // deletedDate: this.editForm.get(['deletedDate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntrepot>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
