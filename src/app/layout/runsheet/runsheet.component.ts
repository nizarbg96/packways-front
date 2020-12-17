import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatListOption, MatSelectionList} from '@angular/material';
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
  spinner = false;
  user: any;
  private checkedRunsheetStatus: string;
  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;
  private selectedRunsheet: Runsheet;
  private affectedMatricule: string;






  constructor(public dialog: MatDialog, private runsheetService: RunsheetService, private router: Router, private tripService: TripService) { }

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
        this.runsheetService.runsheetInfo = result;
        this.router.navigate(['/runsheet/create']);
      } else {
      this.runsheetService.runsheetInfo = null;
      }
    });
  }
  getRunsheets() {
    this.spinner = true;
    this.runsheetService.query().subscribe((res) => {
      this.runsheets = res.body;
      this.runsheets = this.runsheets.filter((runsheet: Runsheet) =>
      ((runsheet.status === 'draft' || runsheet.status === 'confirmed') && runsheet.deleted === false) );
      this.runsheets = this.runsheets.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : 0);
      this.spinner = false;
    });
  }
  deleteRunsheet(runsheet: Runsheet) {
    const index = this.runsheets.indexOf(runsheet);
    runsheet.deleted = true;
    runsheet.deletedDate = new Date();
    runsheet.deletedBy = this.user.idAdmin;
    this.runsheetService.update(runsheet).subscribe();
    this.runsheets[index] = runsheet;
    const listTripsToUpdate = runsheet.listColis.slice()
    .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
    this.tripService.updateTripsWhenDeleteRunsheet(listTripsToUpdate).subscribe();
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
    } else {
      this.selectedRunsheet = null;
    }
  }

  dispatchRunsheet() {
    this.selectedRunsheet.status = 'dispached';
    this.selectedRunsheet.dispachedBy = this.user.idAdmin;
    this.selectedRunsheet.dispachedDate = new Date();
    this.runsheetService.update(this.selectedRunsheet).subscribe(() => {
      const listTrips: string[] = this.selectedRunsheet.listColis
        .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map((colis) => colis.idTrip);
      console.log(this.user);
      this.tripService.updateTripsDriver(this.selectedRunsheet.driver.idDriver, listTrips, this.user.name).subscribe(() => {
        this.tripService.updateTripsStatus('livraison en cours', listTrips,  this.user.name, '').subscribe();
      });
    });

  }
  deleteSelectedRunsheet() {
    const index = this.runsheets.indexOf(this.selectedRunsheet);
    this.selectedRunsheet.deleted = true;
    this.selectedRunsheet.deletedDate = new Date();
    this.selectedRunsheet.deletedBy = this.user.idAdmin;
    this.runsheetService.update(this.selectedRunsheet).subscribe();
    const listTripsToUpdate = this.selectedRunsheet.listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
    this.tripService.updateTripsWhenDeleteRunsheet(listTripsToUpdate).subscribe();
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
  runsheetInfo: RunsheetInfo = {driver: null, matricule: null};


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToRunsheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private muService: MoveableUnitService,
    private entrepotService: EntrepotService, private driverService: DriversService) {}

  ngOnInit(): void {
    this.getAllDrivers();
    this.getEntrepots();
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
  getSelectedDriver(driver: any) {
    if (driver != null) {
      const ind = this.Listdriverauto.indexOf(driver.title);
      this.affectedDriver = this.Listdriver[ind];
      this.driverService.getOneDriver(this.affectedDriver.idDriver).subscribe((oneDriver) => {
        this.runsheetInfo.driver =  oneDriver.json();
      });
    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }






}
export interface RunsheetInfo {
  driver: any;
  matricule: string;

}
