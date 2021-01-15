import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PopUpDeleteService} from './pop-up-delete.service';

@Component({
  selector: 'app-pop-up-delete',
  templateUrl: './pop-up-delete.component.html',
  styleUrls: ['./pop-up-delete.component.scss']
})
export class PopUpDeleteComponent implements OnInit {
  activity: any;
  activityName: string;

  constructor(private modal: NgbActiveModal, private popUpDeleteService: PopUpDeleteService) {
  }

  ngOnInit() {
    this.activity = this.popUpDeleteService.activity;
    this.activityName = this.popUpDeleteService.activityName;
  }

}
