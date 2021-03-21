import {Component, Inject, OnInit, Type} from '@angular/core';
import {Entrepot} from '../../model/entrepot.model';
import {RunsheetInfo} from '../runsheet/runsheet.component';
import {Car, ICar} from '../../model/car.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSelectChange, MatSnackBar} from '@angular/material';
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

  constructor(public dialog: MatDialog, private gasTicketService: GasTicketService, private modalService: NgbModal,
              private snackBar: MatSnackBar) {
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
    private carService: CarService, private employeeService: EmployeeService, private gasTicketService: GasTicketService,
    private snackBar: MatSnackBar) {
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

    this.affectedTickets = this.affectedTickets.filter(value => value !== null)
    const lookup = this.affectedTickets.reduce((a, e) => {
      a[e.id] = ++a[e.id] || 0;
      return a;
    }, {});
    const filtredTickets = this.affectedTickets.slice().filter(e => lookup[e.id]);
    console.log(this.affectedTickets);
    console.log(filtredTickets);
    if (filtredTickets.length > 0){
      this.snackBar.open('Vous avez sélectionné un bordereau plus qu\'une fois, veuillez vérifier votre sélection', 'Fermer', {duration: 8000});
    } else {
      this.affectedTickets.forEach((ticket, index) => {
        this.affectedTickets[index].consumed = true;
        this.affectedTickets[index].affectedBy = this.user.idAdmin;
        this.affectedTickets[index].affectedByName = this.user.name;
        this.affectedTickets[index].affectedByDate = new Date;
        this.affectedTickets[index].affectedFrom = 'caisse';
        this.affectedTickets[index].consumedBy = this.affectedEmployee.id;
        this.affectedTickets[index].consumedByName = this.affectedEmployee.firstName + ' ' + this.affectedEmployee.lastName;
        this.affectedTickets[index].consumedDate = new Date();
        this.affectedTickets[index].affectedCar = this.carValue;
      });
      this.gasTicketService.updateList(this.affectedTickets).subscribe(() => {
        this.gasTicketService.dialogExit.next(true);
      });
    }
  }

  createItem() {
    this.items.push({typeBordereau: null, numBordereau: null});
    this.affectedTickets.push(new GasTicket());
    this.affectedTicketsTest.push('');

  }

  affectBordereau($event: any, i: number) {
    console.log($event);
    const ticket = $event.value;
    if (!!ticket) {
      this.affectedTicketsTest[i] = ticket.id;
      this.gasTicketService.find(ticket.id).subscribe((res) => {
        this.affectedTicket = res.body;
        this.affectedTickets[i] = this.affectedTicket;
        console.log(this.affectedTickets);
        console.log('affectedTicketsIds : ' + this.affectedTicketsTest);
      });
    } else {
      this.affectedTicketsTest[i] = null;
      this.affectedTickets[i] = null;
      console.log(this.affectedTickets);
      console.log('affectedTicketsIds : ' + this.affectedTicketsTest);
    }
  }

}

const MODALS: { [name: string]: Type<any> } = {
  gasTicketDetail: GazTicketDetailsComponent
};
