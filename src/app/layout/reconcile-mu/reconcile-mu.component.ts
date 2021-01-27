import {Component, Inject, OnInit, Type, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSelectionList, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {DriversService} from '../drivers/drivers.service';
import {MoveableUnit} from '../../model/moveable-unit.model';
import {ActivityMu} from '../../model/activity-mu.model';
import {ActivityMuService} from './activity-moveable-unit.service';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {Runsheet} from '../../model/runsheet.model';
import {PopUpDeleteService} from '../shared/pop-up-delete/pop-up-delete.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';
import {Activity} from '../../model/activity.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-reconcile-mu',
  templateUrl: './reconcile-mu.component.html',
  styleUrls: ['./reconcile-mu.component.scss']
})
export class ReconcileMuComponent implements OnInit {

  date = new Date();
  private driver: any;
  spinner = false;
  activityMoveableUnitInfo: ActivityMoveableUnitInfo  = {driver: null, moveableUnits: null};
  activitiesMoveableUnit: ActivityMu[] = [];
  filtredActivitiesMoveableUnit: ActivityMu[] = [];
  @ViewChild(MatSelectionList)
  selectionList: MatSelectionList;
  selectedActivityMu: ActivityMu;
  checkedActivityMuStatus: string;
  user: any;
  moreDayCounter = 1;



  constructor(public dialog: MatDialog, private moveableUnitService: MoveableUnitService, private router: Router, private tripService: TripService,
              private activityMoveableUnitService: ActivityMuService, private snackBar: MatSnackBar, private popUpDeleteService: PopUpDeleteService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityMoveableUnitService.activityToEdit = null;
    this.getActivities();
  }

  getActivities() {
    const  fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - this.moreDayCounter);
    fromDate.setHours(0); fromDate.setMinutes(0); fromDate.setSeconds(0);
    this.spinner = true;
    this.activityMoveableUnitService.findByCreatedDateGreaterThan(fromDate).subscribe((resActivityMu) => {
      this.activitiesMoveableUnit = resActivityMu.body.filter((activity) => ((activity.deleted === false) &&
        (activity.status === 'draft' || activity.status === 'confirmed'))).reverse();
      if(this.user.role !== 'superAdmin') {
        this.activitiesMoveableUnit = this.activitiesMoveableUnit.filter((activity) => activity.entrepot.id === this.user.entrepot.id || activity.createdBy === this.user.idAdmin );
      }
      this.spinner = false;
      this.filtredActivitiesMoveableUnit = this.activitiesMoveableUnit;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToReconcileMuComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if ( !!result ) {
        this.driver = result;
        console.log(this.driver.idDriver);
        let driverActivityMu = this.activitiesMoveableUnit.filter((activity) => (activity.driver.idDriver === this.driver.idDriver) && activity.deleted === false && activity.status === 'draft')
        if(this.user.role !== 'superAdmin'){
          driverActivityMu = driverActivityMu.filter((mu: MoveableUnit) => mu.entrepotDest.id === this.user.entrepot.id ||
            mu.createdBy === this.user.idAdmin);
        }
        if (driverActivityMu.length > 0){
          this.snackBar.open('Le livreur a déja une activité-mu à l\'état " draft ": ', 'Fermer', {
            duration: 8000,
          });
          return;
        }
        this.moveableUnitService.findAllByStatus('dispached').subscribe((res) => {
          // !!!!! FILTER BY ENTREPOT TOO
          const moveableUnitsToReconcile = res.body
            .filter((moveableUnit) => (moveableUnit.deleted === false && moveableUnit.driver.idDriver === this.driver.idDriver && moveableUnit.entrepotDest.id === this.user.entrepot.id));
          if(moveableUnitsToReconcile.length === 0) {
            this.snackBar.open('Le livreur n\'a pas des moveableUnits en cours ', 'Fermer', {
              duration: 8000,
            });
            return;
          }
          this.activityMoveableUnitInfo.driver = this.driver;
          this.activityMoveableUnitInfo.moveableUnits = moveableUnitsToReconcile;
          this.activityMoveableUnitService.activityMoveableUnitInfo = this.activityMoveableUnitInfo;
          // !!! BEFORE REDIRECTING CHECK IF DRIVER GOT DRAFT ACTIVITY
          this.router.navigate(['/reconcile-mu/create']);
        });
      } else {
        // do nothing
      }
    });
  }

  deleteActivityMu(activity: ActivityMu) {
    this.popUpDeleteService.activityName = 'Activity Moveable Unit';
    this.popUpDeleteService.activity = activity;
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        const index = this.activitiesMoveableUnit.indexOf(activity);
        activity.deleted = true;
        activity.deletedDate = new Date();
        activity.deletedBy = this.user.idAdmin;
        this.activityMoveableUnitService.update(activity).subscribe();
        this.activitiesMoveableUnit[index] = activity;
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
  printRunsheet(activityMoveableUnit: Activity) {
    this.activityMoveableUnitService.exportPdf(activityMoveableUnit).subscribe((res) => {
      const path: string = res['_body'];
      this.downloadRapport(path);
    } );
  }
  downloadRapport(path: string) {
    const index: number = path.indexOf('PDF/ActivityMoveableUnit') + 24;
    path = path.substring(index);
    console.log(path);
    this.activityMoveableUnitService.downloadPDF(environment.serverUrl + '/api/activities-mu/downloadPDF' + path).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });
  }
  onAreaListControlChanged(activityMoveableUnit_option: MatListOption, activityMoveableUnit: ActivityMu) {
    if (activityMoveableUnit_option.selected) {
      this.checkedActivityMuStatus = activityMoveableUnit.status;
      this.selectedActivityMu = activityMoveableUnit;
    } else {
      this.selectedActivityMu = null;
    }
  }
  deleteSelectedActivityMu() {
    this.popUpDeleteService.activityName = 'Activity Moveable Unit';
    this.popUpDeleteService.activity = this.selectedActivityMu;
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        const index = this.activitiesMoveableUnit.indexOf(this.selectedActivityMu);
        this.selectedActivityMu.deleted = true;
        this.selectedActivityMu.deletedDate = new Date();
        this.selectedActivityMu.deletedBy = this.user.idAdmin;
        this.activitiesMoveableUnit[index] = this.selectedActivityMu;
        this.activityMoveableUnitService.update(this.selectedActivityMu).subscribe();
      }, (reason) => {
      }
    );
  }

  editActivityMu(activityMoveableUnit: ActivityMu) {
    this.activityMoveableUnitService.activityMoveableUnitInfo = {moveableUnits: activityMoveableUnit.listMoveableUnits, driver: activityMoveableUnit.driver};
    this.activityMoveableUnitService.activityToEdit = activityMoveableUnit;
    this.router.navigate(['/reconcile-mu/create']);
  }

  applyFilter(filterValue: any) {
    const filterValueUpper = filterValue.toUpperCase();
    if(filterValue === '' ) {
      this.filtredActivitiesMoveableUnit = this.activitiesMoveableUnit;
    }
    else {
      this.filtredActivitiesMoveableUnit = this.activitiesMoveableUnit.slice().filter((item) => item.ref.includes(filterValueUpper));
    }
  }

  showMore() {
    this.moreDayCounter = this.moreDayCounter  + 1;
    this.getActivities();
  }
}





@Component({
  selector: 'add-driver-to-reconcile-mu-dialog',
  templateUrl: 'add-driver-to-reconcile-mu-dialog.html',
})
export class DialogAddDriverToReconcileMuComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToReconcileMuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private muService: MoveableUnitService,
    private entrepotService: EntrepotService, private driverService: DriversService) {}

  ngOnInit(): void {
    this.getAllDrivers();
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
        this.affectedDriver =  oneDriver.json();
      });
    }
  }

}
export interface ActivityMoveableUnitInfo {
  driver: any;
  moveableUnits: MoveableUnit[];
}
const MODALS: { [name: string]: Type<any> } = {
  deletePopUp: PopUpDeleteComponent
}
