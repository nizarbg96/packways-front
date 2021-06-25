import {Component, Inject, OnInit, Type, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatListOption, MatSelectionList, MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { Runsheet } from 'src/app/model/runsheet.model';
import { ColisRunsheet } from 'src/app/model/colis-runsheet.model';
import { TripService } from '../trips/trips.service';
import { RunsheetService } from './runsheet.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Entrepot} from '../../model/entrepot.model';
import {FormControl, Validators} from '@angular/forms';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {MuInfo} from '../moveable-unit/moveable-unit.component';
import {DriversService} from '../drivers/drivers.service';
import {Trip} from '../trips/Trip';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivityRunsheetService} from '../reconcile-runsheet/activity-runsheet.service';
import {
  NgbdModalActivityConfirmed,
  NgbdModalConfirmActivity,
  NgbdModalConfirmLivree,
  NgbdModalConfirmNonLivree, NgbdModalConfirmReturned
} from '../reconcile-runsheet/create-activity-runsheet/create-activity-runsheet.component';
import {ColisFailureRunsheet} from '../../model/colis-failure-runsheet.model';
import {CarService} from '../car/car.service';
import {Car, ICar} from '../../model/car.model';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-runsheet',
  templateUrl: './runsheet.component.html',
  styleUrls: ['./runsheet.component.scss']
})
export class RunsheetComponent implements OnInit {
  date: Date;
  dateMelliseconds: number;
  nbSelectedRunsheet = 0;
  affectedDriver: any = null;
  runsheets: Runsheet[] = [];
  filtredRunsheets: Runsheet[] = [];
  spinner = false;
  user: any;
   checkedRunsheetStatus: string;
  @ViewChild(MatSelectionList)
   selectionList: MatSelectionList;
   selectedRunsheet: Runsheet;
   affectedMatricule: string;
   closeResult: string;
   cout: number;
   cars: ICar[] = [];
   car: null;


  constructor(public dialog: MatDialog, public runsheetService: RunsheetService, private modalService: NgbModal,
              private router: Router, private tripService: TripService, private snackBar: MatSnackBar, private carService: CarService,
              private spinner2: NgxSpinnerService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.date = new Date();
    this.dateMelliseconds = this.date.getMilliseconds();
    this.getRunsheets();
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToRunsheetComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if ( !!result ) {
        this.affectedDriver = result.driver;
        this.affectedMatricule = result.matricule;
        this.cout = result.cout;
        this.car = result.car;
        this.runsheetService.runsheetInfo = result;
        this.router.navigate(['/runsheet/create']);
      } else {
      this.runsheetService.runsheetInfo = null;
      }
    });
  }
  getRunsheets() {
    this.spinner = true;
    this.runsheetService.getDraftAndConfirmedRunsheets().subscribe((res) => {
      this.runsheets = res.body;
      this.runsheets = this.runsheets.filter((runsheet: Runsheet) =>
      ((runsheet.status === 'draft' || runsheet.status === 'confirmed') && runsheet.deleted === false) );
      if (this.user.role !== 'superAdmin') {
        this.runsheets = this.runsheets.filter((runsheet: Runsheet) => runsheet.entrepot.id === this.user.entrepot.id ||
        runsheet.createdBy === this.user.idAdmin);
      }
      this.runsheets = this.runsheets.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : 0);
      this.spinner = false;
      this.filtredRunsheets = this.runsheets;
    });
  }
  getCars() {
    this.carService.query().subscribe((res) => {
      this.cars = res.body.filter(value => value.deleted === false);
    });
  }
  deleteRunsheet(runsheet: Runsheet) {
    this.runsheetService.scannedRunsheet = runsheet;
    this.modalService.open(MODALS['deleteRunsheet']).result.then(
      (result) => {
        //
        this.closeResult = `Closed with: ${result}`;
        const listTripsToUpdate = runsheet.listColis.slice()
          .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
        const index = this.runsheets.indexOf(runsheet);
        const runsheetToDelete = {listTripsToUpdate: listTripsToUpdate, runsheet: runsheet, idAdmin: this.user.idAdmin };
        this.runsheetService.deleteRunsheet(runsheetToDelete).subscribe((res) => {
          this.runsheets[index] = res.body;
          this.snackBar.open('Runsheet ' + runsheet.ref + ' has been successfuly deleted', 'Fermer', {
            duration: 8000,
          });
        });

      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }

  calculateDiff(data) {
    const date = new Date(data);
    const currentDate = new Date();
    const days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
    .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;
  }

  printRunsheet() {

  }

  onAreaListControlChanged(runsheet_option: MatListOption, runsheet: Runsheet) {
    if (runsheet_option.selected) {
      this.checkedRunsheetStatus = runsheet.status;
      this.selectedRunsheet = runsheet;
      this.runsheetService.scannedRunsheet = runsheet;
    } else {
      this.selectedRunsheet = null;
      this.runsheetService.scannedRunsheet =  null;
    }
  }

  dispatchRunsheet() {
    this.spinner2.show();
    const index = this.runsheets.indexOf(this.selectedRunsheet);
    const listTrips: string[] = this.selectedRunsheet.listColis
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map((colis) => colis.idTrip);
    const dispachRunsheet = {runsheet: this.selectedRunsheet, listTrips: listTrips, userName: this.user.name, userId: this.user.idAdmin};
    this.runsheetService.dispachRunsheet(dispachRunsheet).subscribe((res) => {
      this.selectedRunsheet = res.body;
      this.runsheets[index] = this.selectedRunsheet;
      this.spinner2.hide();
      const options = {
        title: 'succès',
        text: 'Runsheet Expédiée avec succès',
        type: 'success',
      } as SweetAlertOptions;

      Swal.fire(options);

    }, () => {
      this.spinner2.hide();
      const options = {
        title: 'Erreur',
        text: 'Un erreur a été survenu',
        type: 'error',
      } as SweetAlertOptions;
      Swal.fire(options);

    });

    ///
    /*this.selectedRunsheet.status = 'dispached';
    this.selectedRunsheet.dispachedBy = this.user.idAdmin;
    this.selectedRunsheet.dispachedDate = new Date();
    this.runsheetService.update(this.selectedRunsheet).subscribe(() => {
      const listTrips: string[] = this.selectedRunsheet.listColis
        .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map((colis) => colis.idTrip);
      console.log(this.user);
      this.tripService.updateTripsDriver(this.selectedRunsheet.driver.idDriver, listTrips, this.user.name).subscribe(() => {
        if (this.selectedRunsheet.type === 'livraison') {
          this.tripService.updateTripsStatus('livraison en cours', listTrips,  this.user.name, '').subscribe(() => {
            this.tripService.getListOfTips(listTrips).subscribe((resTrips) => {
              const trips = resTrips.body;
              for (let i = 0; i < trips.length; i++) {
                trips[i].fraisSoutraitant = this.selectedRunsheet.cout;
              }
              this.tripService.updateListOfTips(trips).subscribe();
            });
          });
        } else if (this.selectedRunsheet.type === 'retour') {
          this.tripService.updateTripsStatus('En cours de retour', listTrips,  this.user.name, '').subscribe(() => {
            this.tripService.getListOfTips(listTrips).subscribe((resTrips) => {
              const trips = resTrips.body;
              for (let i = 0; i < trips.length; i++) {
                trips[i].fraisSoutraitant = this.selectedRunsheet.cout;
              }
              this.tripService.updateListOfTips(trips).subscribe();
            });
          });
        }
      });
    });*/
  }
  deleteSelectedRunsheet() {
    this.modalService.open(MODALS['deleteRunsheet']).result.then(
      (result) => {
        //
        this.closeResult = `Closed with: ${result}`;
        const listTripsToUpdate = this.selectedRunsheet.listColis.slice()
          .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
        const index = this.runsheets.indexOf(this.selectedRunsheet);
        const runsheetToDelete = {listTripsToUpdate: listTripsToUpdate, runsheet: this.selectedRunsheet, idAdmin: this.user.idAdmin };
        this.spinner2.show();
        this.runsheetService.deleteRunsheet(runsheetToDelete).subscribe((res) => {
          this.spinner2.hide();
          this.runsheets[index] = res.body;
          this.snackBar.open('Runsheet ' + this.selectedRunsheet.ref + ' has been successfuly deleted', 'Fermer', {
            duration: 8000,
          });
        });
        //
       /*
        this.closeResult = `Closed with: ${result}`;
        const index = this.runsheets.indexOf(this.selectedRunsheet);
        this.selectedRunsheet.deleted = true;
        this.selectedRunsheet.deletedDate = new Date();
        this.selectedRunsheet.deletedBy = this.user.idAdmin;
        this.runsheetService.update(this.selectedRunsheet).subscribe();
        this.runsheets[index] = this.selectedRunsheet;
        const listTripsToUpdate = this.selectedRunsheet.listColis.slice()
          .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
        this.tripService.updateTripsWhenDeleteRunsheet(listTripsToUpdate).subscribe(() => {
          this.snackBar.open('Runsheet ' + this.selectedRunsheet.ref + ' has been successfuly deleted', 'Fermer', {
            duration: 5000,
          });
        });*/
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
    applyFilter(filterValue: any) {
      const filterValueUpper = filterValue.toUpperCase();
      if (filterValue === '' ) {
        this.filtredRunsheets = this.runsheets;
      } else {
        this.filtredRunsheets = this.runsheets.slice().filter((item) => item.ref.includes(filterValueUpper));
      }
    }

}
@Component({
  selector: 'add-driver-to-runsheet-dialog',
  templateUrl: 'add-driver-to-runsheet-dialog.html',
})
export class DialogAddDriverToRunsheetComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  entrepots: Entrepot[] = [];
  matricule: string;
  runsheetInfo: RunsheetInfo = {driver: null, matricule: null, type: null, cout: null, car: null};
  typeRunsheet = new FormControl('draft', Validators.required);
  typeRunsheetValue: string = null;
  cars: ICar[] = [];
  private entrepotValue: Car;
  private carValue: Car;


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToRunsheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, public muService: MoveableUnitService,
    public entrepotService: EntrepotService, public driverService: DriversService, private carService: CarService) {}

  ngOnInit(): void {
    this.getAllDrivers();
    this.getEntrepots();
    this.getCars();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllDrivers() {
    this.tservice.getDrivers().subscribe(data => {
      const obj = Array.of(JSON.parse(data['_body']).data);
      const jsonObj = obj[0];
      for (let i = 0; i < jsonObj.length; i++) {
        if ((jsonObj[i].accountActive === true) && (jsonObj[i].idDriver !== '5ca28097e4970623916b53e7')) {
          this.Listdriver.push(jsonObj[i]);
          this.Listdriverauto.push(jsonObj[i].nameDriver + ' ' + jsonObj[i].surnameDriver);
        }
      }
    }, error => {
    });
  }
  getCars() {
    this.carService.query().subscribe((res) => {
      this.cars = res.body.filter(value => !value.deleted);
    });
  }
  getSelectedDriver(driver: any) {
    if (driver != null) {
      const ind = this.Listdriverauto.indexOf(driver.title);
      this.affectedDriver = this.Listdriver[ind];
      this.driverService.getOneDriver(this.affectedDriver.idDriver).subscribe((oneDriver) => {
        this.runsheetInfo.driver =  oneDriver.json();
        this.cars = this.affectedDriver.affectedCars;
        if (oneDriver.json().soutraitant) {
          this.runsheetInfo.cout = oneDriver.json().fraisSoutraitance;
        }
      });
    } else {
      this.affectedDriver = null;
      this.runsheetInfo.driver = null;
      this.cars = [];
    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }


  affectTypeRunsheet(value: any) {
    this.typeRunsheetValue = value;
    this.runsheetInfo.type = this.typeRunsheetValue;
  }

  affectCar(car: Car) {
    this.carService.find(car.id).subscribe((res) => {
      this.carValue = res.body;
      this.runsheetInfo.car = this.carValue;
      this.runsheetInfo.matricule = this.carValue.matVehicle;
    });
  }

}
@Component({
  selector: 'delete-runsheet-modal',
  templateUrl: './delete-runsheet-modal.html',
  styleUrls: ['./runsheet.component.scss']

})
export class NgbdModalDeleteRunsheet implements OnInit {
  runsheet: Runsheet = null;
  newStatus: string;

    constructor(public modal: NgbActiveModal, public runsheetService: RunsheetService) {
    }

  ngOnInit() {
    this.runsheet = this.runsheetService.scannedRunsheet;
  }

}

const MODALS: { [name: string]: Type<any> } = {
  deleteRunsheet: NgbdModalDeleteRunsheet
};

export interface RunsheetInfo {
  driver: any;
  matricule: string;
  cout: number;
  type: string;
  car: Car;
}
