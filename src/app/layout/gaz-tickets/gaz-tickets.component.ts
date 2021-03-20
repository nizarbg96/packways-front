import {Component, Inject, OnInit, Type} from '@angular/core';
import {Entrepot} from '../../model/entrepot.model';
import {RunsheetInfo} from '../runsheet/runsheet.component';
import {Car, ICar} from '../../model/car.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSelectChange} from '@angular/material';
import {TripService} from '../trips/trips.service';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {RunsheetService} from '../runsheet/runsheet.service';
import {DriversService} from '../drivers/drivers.service';
import {CarService} from '../car/car.service';
import {EmployeeService} from '../employee/employee.service';
import {IEmployee} from '../../model/employee.model';
import {AddDepenseComponent} from '../depenses/depenses.component';
import {GasTicket, IGasTicket} from '../../model/gas-ticket.model';
import {GasTicketService} from '../depenses/gas-ticket.service';
import {Depenses} from '../../model/depenses.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';
import {DepenseDetailsComponent} from '../depenses/depense-details/depense-details.component';
import {GazTicketDetailsComponent} from './gaz-ticket-details/gaz-ticket-details.component';

@Component({
  selector: 'app-gaz-tickets',
  templateUrl: './gaz-tickets.component.html',
  styleUrls: ['./gaz-tickets.component.scss']
})
export class GazTicketsComponent implements OnInit {

  date = new Date();
  private isLoadingResults = false;
  filtredTickets: GasTicket[] = [];

  constructor(public dialog: MatDialog, private gasTicketService: GasTicketService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getTickets();
    this.gasTicketService.dialogExit.subscribe(() => {
      this.dialog.closeAll();
      this.isLoadingResults = true;
      this.getTickets();
    });
  }

  getTickets() {
    this.isLoadingResults = true;
    this.gasTicketService.query().subscribe((res) => {
      this.isLoadingResults = false;
      this.filtredTickets = res.body.filter(value => !value.deleted && value.consumed);
    });
  }

  openDialog() {
    this.dialog.open(DialogAffecterBordereauComponent, {
      data: null,
      width: '60vw',
      maxHeight: '60vh',
    });
  }

  onAreaListControlChanged(ticket_option: MatListOption, ticket: GasTicket) {

  }

  viewDetails(element: GasTicket) {
    this.gasTicketService.selectedGasTicket = element;
    this.modalService.open(MODALS['gasTicketDetail']).result.then(
      (result) => {

      }, (reason) => {

      }
    );
  }

  calculateDiff(data) {
    const date = new Date(data);
    const currentDate = new Date();
    const days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }
}

@Component({
  selector: 'affecter-bordereau-dialog',
  templateUrl: 'affecter-bordereau.html',
})
export class DialogAffecterBordereauComponent implements OnInit {
  cars: ICar[] = [];
  carValue: ICar;
  listEmployee: IEmployee[] = [];
  affectedEmployee: IEmployee;
  listEmployeeAuto = [];
  affectedTicket: GasTicket;
  tickets: IGasTicket[] = [];
  private user: any;
  items = [];
  private affectedTickets: GasTicket[] = [];
  private affectedTicketsTest: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<DialogAffecterBordereauComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private muService: MoveableUnitService,
    private entrepotService: EntrepotService, private runsheetService: RunsheetService, private driverService: DriversService,
    private carService: CarService, private employeeService: EmployeeService, private gasTicketService: GasTicketService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.getTickets();
    this.getCars();
    this.getAllEmployes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getAllEmployes() {
    this.employeeService.query().subscribe((res) => {
      this.listEmployee = res.body.filter(value => value.deleted === false);
      this.listEmployeeAuto = this.listEmployee.map(value => value.firstName + ' ' + value.lastName);
    });
  }

  getSelectedEmployee(employee: any) {
    if (employee != null) {
      const ind = this.listEmployeeAuto.indexOf(employee.title);
      this.affectedEmployee = this.listEmployee[ind];
      this.cars = this.affectedEmployee.affectedCars;

      console.log(this.affectedEmployee);
    } else {
      this.affectedEmployee = null;
      this.cars = [];
    }
  }

  getCars() {
    this.carService.query().subscribe((res) => {
      this.cars = res.body.filter(value => !value.deleted);
    });
  }

  getTickets() {
    this.gasTicketService.query().subscribe((res) => {
      this.tickets = res.body.filter(value => !value.deleted && !value.consumed);
    });
  }

  affectCar(car: Car) {
    this.carService.find(car.id).subscribe((res) => {
      this.carValue = res.body;

    });
  }


  consumeTicket() {
    this.affectedTicket.consumed = true;
    this.affectedTicket.affectedBy = this.user.idAdmin;
    this.affectedTicket.affectedByName = this.user.name;
    this.affectedTicket.affectedByDate = new Date;
    this.affectedTicket.affectedFrom = 'caisse';
    this.affectedTicket.consumedBy = this.affectedEmployee.id;
    this.affectedTicket.consumedByName = this.affectedEmployee.firstName + ' ' + this.affectedEmployee.lastName;
    this.affectedTicket.consumedDate = new Date();
    this.affectedTicket.affectedCar = this.carValue;
    this.gasTicketService.update(this.affectedTicket).subscribe(() => {
      this.gasTicketService.dialogExit.next(true);
    });
  }

  createItem() {
    this.items.push({typeBordereau: null, numBordereau: null});
    this.affectedTickets.push(new GasTicket());
    this.affectedTicketsTest.push('');

  }

  affectBordereau($event: any, i: number) {
    console.log($event);

    const ticket = $event.source.value;

    if (!!ticket) {
      this.affectedTicketsTest[i] = ticket.id;
      this.gasTicketService.find(ticket.id).subscribe((res) => {
        this.affectedTicket = res.body;
        this.affectedTickets[i] = this.affectedTicket;
      });
    } else {
      this.affectedTicketsTest.splice(i, 1);
      this.affectedTickets.splice(i, 1);
    }
    console.log('affectedTickets : ' + this.affectedTickets);
    console.log('affectedTicketsIds : ' + this.affectedTicketsTest);
    if (!$event.isUserInput) {    // ignore on deselection of the previous option
      return;
    }
  }

}

const MODALS: { [name: string]: Type<any> } = {
  gasTicketDetail: GazTicketDetailsComponent
};
