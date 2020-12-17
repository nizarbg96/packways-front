import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSelectionList} from '@angular/material';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MoveableUnitService} from './moveable-unit.service';
import {MoveableUnit} from '../../model/moveable-unit.model';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {Entrepot} from '../../model/entrepot.model';
import {FormControl, Validators} from '@angular/forms';
import {EntrepotService} from '../entrepot/entrepot.service';
import {DriversService} from '../drivers/drivers.service';
@Component({
  selector: 'app-moveable-unit',
  templateUrl: './moveable-unit.component.html',
  styleUrls: ['./moveable-unit.component.scss']
})
export class MoveableUnitComponent implements OnInit {

  date: Date;
  dateMelliseconds: number;
  nbSelectedMU = 0;
  affectedDriver: any = null;
  moveableUnits: MoveableUnit[] = [];
  spinner = false;
  user: any;
  private checkedMUStatus: string;
  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;
  private selectedMU: MoveableUnit;
  private affectedMatricule: string;
  private affectedEntrepotSrc: Entrepot;
  private affectedEntrepotDest: Entrepot;

  constructor(public dialog: MatDialog, private muService: MoveableUnitService, private router: Router, private tripService: TripService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.date = new Date();
    this.dateMelliseconds = this.date.getMilliseconds();
    this.getMUs();
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToMUComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe((result: MuInfo) => {
      console.log('The dialog was closed');
      if( !!result ){
        this.affectedDriver = result.driver;
        this.affectedMatricule = result.matricule;
        this.affectedEntrepotSrc = result.entrepotSrc;
        this.affectedEntrepotDest = result.entrepotDest;
        this.muService.muInfo = result;
        this.router.navigate(['/mu/create']);
      } else {
        this.muService.muInfo = null;
      }
    });
  }
  getMUs() {
    this.spinner = true;
    this.muService.query().subscribe((res) => {
      this.moveableUnits = res.body;
      this.moveableUnits = this.moveableUnits.filter((mu: MoveableUnit) =>
        ((mu.status === 'draft' || mu.status === 'confirmed') && mu.deleted === false) );
      this.moveableUnits = this.moveableUnits.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : 0);
      this.spinner = false;
    });
  }
  deleteMU(mu: MoveableUnit) {
    const index = this.moveableUnits.indexOf(mu);
    mu.deleted = true;
    mu.deletedDate = new Date();
    mu.deletedBy = this.user.idAdmin;
    this.muService.update(mu).subscribe();
    this.moveableUnits[index] = mu;
    const listTripsToUpdate = mu.listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
    this.tripService.updateTripsWhenDeleteMU(listTripsToUpdate).subscribe();
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

  printmu() {

  }

  onAreaListControlChanged(mu_option: MatListOption, mu: MoveableUnit) {
    if (mu_option.selected) {
      this.checkedMUStatus = mu.status;
      this.selectedMU = mu;
    } else {
      this.selectedMU = null;
    }
  }

  dispatchMU() {
    this.selectedMU.status = 'dispached';
    this.selectedMU.dispachedBy = this.user.idAdmin;
    this.selectedMU.dispachedDate = new Date();
    this.muService.update(this.selectedMU).subscribe(() => {
      const listTrips: string[] = this.selectedMU.listColis
        .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map((colis) => colis.idTrip);
      console.log(this.user);
      this.tripService.updateTripsDriver(this.selectedMU.driver.idDriver, listTrips, this.user.name).subscribe(() => {
        // this.tripService.updateTripsStatus('livraison en cours', listTrips,  this.user.name, '').subscribe();
      });
    });

  }

  deleteselectedMU() {
    const index = this.moveableUnits.indexOf(this.selectedMU);
    this.selectedMU.deleted = true;
    this.selectedMU.deletedDate = new Date();
    this.selectedMU.deletedBy = this.user.idAdmin;
    this.muService.update(this.selectedMU).subscribe();
    const listTripsToUpdate = this.selectedMU.listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
    this.tripService.updateTripsWhenDeleteMU(listTripsToUpdate).subscribe();
  }
}
@Component({
  selector: 'add-driver-to-mu-dialog',
  templateUrl: 'add-driver-to-mu-dialog.html',
})
export class DialogAddDriverToMUComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  entrepots: Entrepot[] = [];
  entrepotSrc = new FormControl('', Validators.required);
  entrepotDest = new FormControl('', Validators.required );
  entrepotSrcValue: Entrepot =  null;
  entrepotDestValue: Entrepot =  null;
  matricule: string;
  muInfo: MuInfo = {matricule: null, driver: null, entrepotDest: null, entrepotSrc: null};


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToMUComponent>,
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
        this.muInfo.driver =  oneDriver.json();
      });    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }


  affectEntrepotSrc(entrepot: Entrepot) {
    this.entrepotSrcValue = entrepot;
    this.muInfo.entrepotSrc = this.entrepotSrcValue ;
  }
  affectEntrepotDest(entrepot: Entrepot) {
    this.entrepotDestValue = entrepot;
    this.muInfo.entrepotDest = this.entrepotDestValue;
  }
}
export interface MuInfo {
  driver: any;
  matricule: string;
  entrepotSrc: Entrepot;
  entrepotDest: Entrepot;
}
