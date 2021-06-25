import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PopUpDeleteService} from '../../shared/pop-up-delete/pop-up-delete.service';
import {DepensesService} from '../depenses.service';
import {Depenses} from '../../../model/depenses.model';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-depense-details',
  templateUrl: './depense-details.component.html',
  styleUrls: ['./depense-details.component.scss']
})
export class DepenseDetailsComponent implements OnInit {
   depense: Depenses;
  url = environment.serverUrl;


  constructor(private modal: NgbActiveModal, private depensesService: DepensesService) {
  }
  ngOnInit() {
    this.depense = this.depensesService.depenseDeatil;
  }

}
