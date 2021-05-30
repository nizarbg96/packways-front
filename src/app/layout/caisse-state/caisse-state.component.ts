import {Component, Inject, OnInit, Type} from '@angular/core';
import {GasTicket, IGasTicket} from '../../model/gas-ticket.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSnackBar} from '@angular/material';
import {GasTicketService} from '../depenses/gas-ticket.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogAffecterBordereauComponent} from '../gaz-tickets/gaz-tickets.component';
import {CaisseService} from './caisse.service';
import {Caisse} from '../../model/caisse.model';

import {TripService} from '../trips/trips.service';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {RunsheetService} from '../runsheet/runsheet.service';
import {DriversService} from '../drivers/drivers.service';
import {CarService} from '../car/car.service';
import {EmployeeService} from '../employee/employee.service';
import {CaisseDetailComponent} from './caisse-detail/caisse-detail.component';
import {FormBuilder} from '@angular/forms';
import {FLOAT} from 'html2canvas/dist/types/css/property-descriptors/float';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-caisse-state',
  templateUrl: './caisse-state.component.html',
  styleUrls: ['./caisse-state.component.scss']
})
export class CaisseStateComponent implements OnInit {

  date = new Date();
  private isLoadingResults = false;
  filtredTickets: GasTicket[] = [];
  filtredCaissses: Caisse[] = [];
  lastCoffre;
  pageIndex = 0;
  pageSize = 1 ;
  private loadingNextPage = false;
  private newCoffreCreated = false;

  constructor(public dialog: MatDialog, private gasTicketService: GasTicketService, private modalService: NgbModal,
              private snackBar: MatSnackBar, private caisseService: CaisseService, private spinner2: NgxSpinnerService) {
  }

  ngOnInit() {
    // this.getCaisses();
    this.getNextCoffre();
    this.caisseService.dialogExit.subscribe((reason) => {
      this.dialog.closeAll();
      this.isLoadingResults = true;
      this.getCaisses(reason);
    });
  }

  getCaisses(reason: string) {
    this.spinner2.show();
    if(reason === 'update'){
      this.pageSize = this.filtredCaissses.length;
    }
    else {
      this.pageSize = this.filtredCaissses.length + 1;
    }
    this.pageIndex = 0;
    this.caisseService.getNextCoffres(this.pageIndex, this.pageSize).subscribe((res) => {
      this.newCoffreCreated = true;
      this.spinner2.hide()
      this.filtredCaissses = res.body;
      if(this.filtredCaissses.length > 0) {
        this.lastCoffre = this.filtredCaissses[0];
        console.log(this.lastCoffre);
      }
    });
  }
  getNextCoffre() {
    this.spinner2.show();
    this.pageSize = 1;
    this.caisseService.getNextCoffres(this.pageIndex, this.pageSize).subscribe((res) => {
      this.spinner2.hide();
      res.body.forEach(value => this.filtredCaissses.push(value));
      if(this.filtredCaissses.length > 0) {
        this.lastCoffre = this.filtredCaissses[0];
        console.log(this.lastCoffre);
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogOpenFundComponent, {
      data: null,
      width: '60vw',
      maxHeight: '60vh',
    });
  }

  onAreaListControlChanged(caisse_option: MatListOption, caisse: Caisse) {

  }
  returnDiffState(value: number): string{
    const diff = Math.abs(value)
    if ( diff >= 0 && diff <= 1 ){
      return 'success';
    } else if (diff > 1 && diff <= 3){
      return 'warning';
    } else {
      return  'danger';
    }
  }

  viewDetails(element: Caisse) {
    this.caisseService.selectedCaisse = element;
    this.modalService.open(MODALS['caisseDetail']).result.then(
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

  fermerCaisse(caisse: Caisse) {
    this.dialog.open(DialogCloseFundComponent, {
      data: caisse,
      width: '60vw',
      maxHeight: '60vh',
    });
  }

  showMore() {
    this.loadingNextPage = true;
    if(this.newCoffreCreated){
      this.pageIndex = this.filtredCaissses.length - 1;
      this.newCoffreCreated = false;
    }
    this.pageIndex++;
    this.getNextCoffre();


  }
}

@Component({
  selector: 'open-fund-dialog',
  templateUrl: 'open-fund.html',
})
export class DialogOpenFundComponent implements OnInit {
  private user: any;


  constructor(
    public dialogRef: MatDialogRef<DialogOpenFundComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar, private fb: FormBuilder, private caisseService: CaisseService,  private spinner2: NgxSpinnerService) {
  }

  editForm = this.fb.group({
    montant: []
  });

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createCaisseOuverte(): Caisse {
    const montant =
      !!this.editForm.get(['montant']) ? this.editForm.get(['montant'])!.value + '' : '0';
    return {
      ...new Caisse(),
      montantOuverture: parseFloat(montant),
      openedDate: new Date(),
      openedById: this.user.idAdmin,
      openedByName: this.user.name,
      montantsFermeture: [],
      closedDates: []
    };
  }


  save() {
    console.log('saving..');
    const caisse = this.createCaisseOuverte();
    this.spinner2.show();
    this.caisseService.create(caisse).subscribe(() => {
      this.spinner2.hide();
      this.dialogRef.close();
      this.caisseService.dialogExit.next('create');
    });

  }
}

@Component({
  selector: 'close-fund-dialog',
  templateUrl: 'close-fund.html',
})
export class DialogCloseFundComponent implements OnInit {
  private user: any;


  constructor(
    public dialogRef: MatDialogRef<DialogCloseFundComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Caisse,
    private snackBar: MatSnackBar, private fb: FormBuilder, private caisseService: CaisseService, private spinner2: NgxSpinnerService) {
  }

  editForm = this.fb.group({
    montant: []
  });

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createCaisseFermee(): Caisse {
    const montant =
      !!this.editForm.get(['montant']) ? this.editForm.get(['montant'])!.value + '' : '0';
    this.data.closed = true;
    this.data.montantsFermeture.push(parseFloat(montant));
    this.data.closedDates.push(new Date());
    return this.data;
  }


  save() {
    console.log('saving..');
    this.spinner2.show();
    const caisse = this.createCaisseFermee();
    this.caisseService.closeCoffre(caisse).subscribe(() => {
      this.spinner2.hide();
      this.dialogRef.close();
      this.caisseService.dialogExit.next('update');
    });

  }

}

const MODALS: { [name: string]: Type<any> } = {
  caisseDetail: CaisseDetailComponent
};
