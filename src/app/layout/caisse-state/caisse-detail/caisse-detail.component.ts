import { Component, OnInit } from '@angular/core';
import {CaisseService} from '../caisse.service';
import {Caisse} from '../../../model/caisse.model';
import {DepensesService} from '../../depenses/depenses.service';

@Component({
  selector: 'app-caisse-detail',
  templateUrl: './caisse-detail.component.html',
  styleUrls: ['./caisse-detail.component.scss']
})
export class CaisseDetailComponent implements OnInit {
  caisse = new Caisse();

  constructor(private caisseService: CaisseService, private depensesService: DepensesService) {}

  ngOnInit() {
    this.caisse = this.caisseService.selectedCaisse;
  }

}
