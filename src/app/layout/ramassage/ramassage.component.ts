import {Component, Inject, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {Runsheet} from '../../model/runsheet.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSelectionList} from '@angular/material';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {PickUp} from '../../model/pickup.model';
import {RamassageService} from './ramassage.service';
import {Entrepot} from '../../model/entrepot.model';
import {FormControl, Validators} from '@angular/forms';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {DriversService} from '../drivers/drivers.service';
import {MoveableUnit} from '../../model/moveable-unit.model';
import {PopUpDeleteService} from '../shared/pop-up-delete/pop-up-delete.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalDeleteRunsheet} from '../runsheet/runsheet.component';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';

@Component({
  selector: 'app-ramassage',
  templateUrl: './ramassage.component.html',
  styleUrls: ['./ramassage.component.scss']
})
export class RamassageComponent implements OnInit {

  date: Date;
  dateMelliseconds: number;
  nbSelectedPickUp = 0;
  affectedDriver: any = null;
  pickUps: PickUp[] = [];
  filtredPickUps: PickUp[] = [];
  spinner = false;
  user: any;
  private checkedPickUpStatus: string;
  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;
  private selectedPickUp: PickUp;
  private affectedMatricule: string;
  private affectedEntrepot: Entrepot;

  constructor(public dialog: MatDialog, private ramassageService: RamassageService, private router: Router, private tripService: TripService,
              private popUpDeleteService: PopUpDeleteService, private modalService: NgbModal) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.date = new Date();
    this.dateMelliseconds = this.date.getMilliseconds();
    this.getPickUps();
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToPickUpComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!!result) {
        this.affectedDriver = result.driver;
        this.affectedMatricule = result.matricule;
        this.affectedEntrepot = result.entrepot;
        this.ramassageService.pickUpInfo = result;
        this.router.navigate(['/ramassage/create']);
      } else {
        this.ramassageService.pickUpInfo = null;
      }
    });
  }
  getPickUps() {
    this.spinner = true;
    this.ramassageService.query().subscribe((res) => {
      this.pickUps = res.body;
      this.pickUps = this.pickUps.filter((pickup: PickUp) =>
        ((pickup.status === 'draft' || pickup.status === 'confirmed') && pickup.deleted === false) );
      if(this.user.role !== 'superAdmin'){
        this.pickUps = this.pickUps.filter((pickup: PickUp) => {
          if(!!pickup.entrepot){
            return (pickup.entrepot.id === this.user.entrepot.id ||
              pickup.createdBy === this.user.idAdmin)
          }else{
            return (pickup.createdBy === this.user.idAdmin)}
        }) ;
      }
      this.pickUps = this.pickUps.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : 0);
      this.filtredPickUps = this.pickUps;
      this.spinner = false;
    });
  }
  deletePickUp(pickUp: PickUp) {
    this.popUpDeleteService.activityName = 'Pick Up';
    this.popUpDeleteService.activity = pickUp;
    this.modalService.open(MODALS['deletePickUp']).result.then(
      (result) => {
        const index = this.pickUps.indexOf(pickUp);
        pickUp.deleted = true;
        pickUp.deletedDate = new Date();
        pickUp.deletedBy = this.user.idAdmin;
        this.ramassageService.update(pickUp).subscribe();
        this.pickUps[index] = pickUp;
        const listTripsToUpdate = pickUp.listColis.slice()
          .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
        this.tripService.updateTripsWhenDeleteRunsheet(listTripsToUpdate).subscribe();
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

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;
  }

  printPickUp() {}

  onAreaListControlChanged(pickUp_option: MatListOption, pickUp: PickUp) {
    if(pickUp_option.selected) {
      this.checkedPickUpStatus = pickUp.status;
      this.selectedPickUp = pickUp;
    } else {
      this.selectedPickUp = null;
    }
  }

  dispatchPickUp() {
    this.selectedPickUp.status = 'dispached';
    this.selectedPickUp.dispachedBy = this.user.idAdmin;
    this.selectedPickUp.dispachedDate = new Date();
    this.ramassageService.update(this.selectedPickUp).subscribe(() =>{
      const listTrips: string[] = this.selectedPickUp.listColis
        .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map((colis) => colis.idTrip);
      console.log(this.user);
      this.tripService.updateTripsDriver(this.selectedPickUp.driver.idDriver, listTrips, this.user.name).subscribe(() =>{
      this.tripService.updateTripsStatus('ramassage en cours', listTrips,  this.user.name, '').subscribe();
      });
    });

  }

  deleteSelectedPickUp() {
      this.popUpDeleteService.activityName = 'Pick Up';
      this.popUpDeleteService.activity = this.selectedPickUp;
    this.modalService.open(MODALS['deletePickUp']).result.then(
      (result) => {
        const index = this.pickUps.indexOf(this.selectedPickUp);
        this.selectedPickUp.deleted = true;
        this.selectedPickUp.deletedDate = new Date();
        this.selectedPickUp.deletedBy = this.user.idAdmin;
        this.pickUps[index] = this.selectedPickUp;
        this.ramassageService.update(this.selectedPickUp).subscribe();
        const listTripsToUpdate = this.selectedPickUp.listColis.slice()
          .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
        this.tripService.updateTripsWhenDeletePickUp(listTripsToUpdate).subscribe();
      }, (reason) => {
      }
    );

  }
  applyFilter(filterValue: any) {
    const filterValueUpper = filterValue.toUpperCase();
    if(filterValue === '' ) {
      this.filtredPickUps = this.pickUps;
    }
    else {
      this.filtredPickUps = this.pickUps.slice().filter((item) => item.ref.includes(filterValueUpper));
    }
  }
}
@Component({
  selector: 'add-driver-to-pickup-dialog',
  templateUrl: 'add-driver-to-pickup-dialog.html',
})
export class DialogAddDriverToPickUpComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  entrepots: Entrepot[] = [];
  entrepot = new FormControl('', Validators.required);
  entrepotValue: Entrepot =  null;
  matricule: string;
  pickUpInfo: PickUpInfo = {matricule: null, driver: null, entrepot: null};


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToPickUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private entrepotService: EntrepotService, private driverService: DriversService) {}

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
        this.pickUpInfo.driver =  oneDriver.json();
      });
    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }


  affectEntrepot(entrepot: Entrepot) {
    this.entrepotValue = entrepot;
    this.pickUpInfo.entrepot = this.entrepotValue ;
  }

}
export interface PickUpInfo {
  driver: any;
  matricule: string;
  entrepot: Entrepot;
}
const MODALS: { [name: string]: Type<any> } = {
  deletePickUp: PopUpDeleteComponent
};
