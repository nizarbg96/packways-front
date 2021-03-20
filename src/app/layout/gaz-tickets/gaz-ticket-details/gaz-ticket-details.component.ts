import { Component, OnInit } from '@angular/core';
import {GasTicketService} from '../../depenses/gas-ticket.service';
import {GasTicket} from '../../../model/gas-ticket.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gaz-ticket-details',
  templateUrl: './gaz-ticket-details.component.html',
  styleUrls: ['./gaz-ticket-details.component.scss']
})
export class GazTicketDetailsComponent implements OnInit {
  private gasTicket = new GasTicket();

  constructor(private gasTicketService: GasTicketService, private modal: NgbActiveModal) { }

  ngOnInit() {
    this.gasTicket = this.gasTicketService.selectedGasTicket;
  }

}
