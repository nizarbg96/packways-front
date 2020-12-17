import { Component, OnInit } from '@angular/core';
import {IEntrepot} from '../../../model/entrepot.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-entrepot-detail',
  templateUrl: './entrepot-detail.component.html',
  styleUrls: ['./entrepot-detail.component.scss']
})
export class EntrepotDetailComponent implements OnInit {

  entrepot: IEntrepot | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entrepot }) => (this.entrepot = entrepot));
  }

  previousState(): void {
    window.history.back();
  }
}
