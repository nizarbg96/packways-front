import { Component, OnInit } from '@angular/core';
import {Depenses} from '../../../model/depenses.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DepensesService} from '../../depenses/depenses.service';
import {InjectionFond} from '../../../model/injection-fond.model';
import {InjectionFondService} from '../injection-fond.service';

@Component({
  selector: 'app-injection-fon-details',
  templateUrl: './injection-fon-details.component.html',
  styleUrls: ['./injection-fon-details.component.scss']
})
export class InjectionFonDetailsComponent implements OnInit {

   injection: InjectionFond;

  constructor(public modal: NgbActiveModal, private injectionFondService: InjectionFondService) {
  }
  ngOnInit() {
    this.injection = this.injectionFondService.injectionDetails;
  }


}
