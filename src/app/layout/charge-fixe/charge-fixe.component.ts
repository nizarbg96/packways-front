import {Component, Inject, OnInit, Type} from '@angular/core';
import {GasTicket, IGasTicket} from '../../model/gas-ticket.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSnackBar} from '@angular/material';
import {GasTicketService} from '../depenses/gas-ticket.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Car, ICar} from '../../model/car.model';
import {IEmployee} from '../../model/employee.model';
import {TripService} from '../trips/trips.service';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {RunsheetService} from '../runsheet/runsheet.service';
import {DriversService} from '../drivers/drivers.service';
import {CarService} from '../car/car.service';
import {EmployeeService} from '../employee/employee.service';
import {GazTicketDetailsComponent} from '../gaz-tickets/gaz-ticket-details/gaz-ticket-details.component';
import {ChargeFixeService} from './charge-fixe.service';
import {ChargeFixe, IChargeFixe} from '../../model/charge-fixe.model';
import {Caisse} from '../../model/caisse.model';
import {FormBuilder} from '@angular/forms';
import {CaisseService} from '../caisse-state/caisse.service';

@Component({
  selector: 'app-charge-fixe',
  templateUrl: './charge-fixe.component.html',
  styleUrls: ['./charge-fixe.component.scss']
})
export class ChargeFixeComponent implements OnInit {

  date = new Date();
   isLoadingResults = false;
  filtredCharges: ChargeFixe[] = [];

  constructor(public dialog: MatDialog, private chargeFixeService: ChargeFixeService, private modalService: NgbModal,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getCharges();
    this.chargeFixeService.dialogExit.subscribe(() => {
      this.dialog.closeAll();
      this.isLoadingResults = true;
      this.getCharges();
    });
  }

  getCharges() {
    this.isLoadingResults = true;
    this.chargeFixeService.query().subscribe((res) => {
      this.isLoadingResults = false;
      this.filtredCharges = res.body.reverse();
    });
  }

  openDialog() {
    this.dialog.open(DialogAffecterChargeFixeComponent, {
      data: null,
      width: '60vw',
      maxHeight: '60vh',
    });
  }

  onAreaListControlChanged(ticket_option: MatListOption, ticket: GasTicket) {

  }

  viewDetails(element: ChargeFixe) {
    this.chargeFixeService.selectedChargeFixe = element;
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

  editCharge(charge: ChargeFixe) {
    this.dialog.open(DialogAffecterChargeFixeComponent, {
      data: charge,
      width: '60vw',
      maxHeight: '60vh',
    });
  }
}

@Component({
  selector: 'affecter-charge-fixe-dialog',
  templateUrl: 'affecter-charge-fixe.html',
})
export class DialogAffecterChargeFixeComponent implements OnInit {
  private user: any;
  private listEmployeeAuto = [];
  private affectedEmployee: any;
  private listEmployee: IEmployee[] = [];
  private filtredCharges: IChargeFixe[] = [];


  constructor(
    public dialogRef: MatDialogRef<DialogAffecterChargeFixeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChargeFixe,
    private snackBar: MatSnackBar, private fb: FormBuilder, private chargeFixeService: ChargeFixeService, private employeeService: EmployeeService) {
  }

  editForm = this.fb.group({
    id: [],
    valeur: [],
    description: []
  });

  ngOnInit(): void {
    this.getCharges();
    if(!!this.data){
      this.affectedEmployee = this.data.employee;
      this.updateForm(this.data);
    }
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
  }

  getCharges() {
    this.chargeFixeService.query().subscribe((res) => {
      this.filtredCharges = res.body.reverse();
      this.getAllEmployes();
    });
  }

  updateForm(chargeFixe: IChargeFixe): void {
    this.editForm.patchValue({
      id: chargeFixe.id,
      valeur: chargeFixe.valeur,
      description: chargeFixe.description,
    });
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
      console.log(this.affectedEmployee);
    } else {
      this.affectedEmployee = null;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private createFromFormToPost(): IChargeFixe {
    return {
      ...new ChargeFixe(),
      id: this.editForm.get(['id'])!.value,
      employee: this.affectedEmployee,
      valeur: this.editForm.get(['valeur'])!.value,
      description: this.editForm.get(['description'])!.value,
      createdBy: this.user.idAdmin,
      createdByName: this.user.name,
      createdDate: new Date()
    };
  }
  private createFromFormToPut(): IChargeFixe {
    return {
      ...this.data,
      id: this.editForm.get(['id'])!.value,
      employee: this.affectedEmployee,
      valeur: this.editForm.get(['valeur'])!.value,
      description: this.editForm.get(['description'])!.value,
      lastUpdate : new Date()
    };
  }


  save() {

    console.log('saving..');
    if (this.filtredCharges.map(value => value.employee.id).filter(value => value === this.affectedEmployee.id).length > 0){
      this.snackBar.open('Cet employé a déja une charge fixe! vous pouvez l\'editer', 'Fermer', {duration: 8000});
    }else{
      if (!!this.data){
        const chargeFixe = this.createFromFormToPost();
        this.chargeFixeService.update(chargeFixe).subscribe(() => {
          this.dialogRef.close();
          this.chargeFixeService.dialogExit.next(true);
        });
      }else{
        const chargeFixe = this.createFromFormToPut();
        this.chargeFixeService.create(chargeFixe).subscribe(() => {
          this.dialogRef.close();
          this.chargeFixeService.dialogExit.next(true);
        });
      }
    }
  }

}

const MODALS: { [name: string]: Type<any> } = {
  gasTicketDetail: GazTicketDetailsComponent
};
