import { Component, OnInit } from '@angular/core';
import {Entrepot, IEntrepot} from '../../../model/entrepot.model';
import {EntrepotService} from '../entrepot.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entrepot-delete',
  templateUrl: './entrepot-delete.component.html',
  styleUrls: ['./entrepot-delete.component.scss']
})
export class EntrepotDeleteComponent implements OnInit{

  entropot?: IEntrepot;
   user: any;

  constructor(protected entropotService: EntrepotService, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(entrepot: Entrepot): void {
    entrepot.deleted = true;
    entrepot.deletedDate = new Date();
    entrepot.deletedBy = this.user.idAdmin;
    this.entropotService.update(entrepot).subscribe(() => {
      this.entropotService.entrepotSubject.next();
      this.activeModal.close();
    });
  }
}
