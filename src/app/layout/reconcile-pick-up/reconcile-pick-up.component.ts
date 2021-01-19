import {Component, Inject, OnInit, Type, ViewChild} from '@angular/core';
import {Runsheet} from '../../model/runsheet.model';
import {Activity} from '../../model/activity.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSelectionList, MatSnackBar} from '@angular/material';
import {RunsheetService} from '../runsheet/runsheet.service';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {ActivityRunsheetService} from '../reconcile-runsheet/activity-runsheet.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {DriversService} from '../drivers/drivers.service';
import {ActivityPickUpService} from './activity-pick-up.service';
import {ActivityPickUp} from '../../model/activity-pickUp.model';
import {PickUp} from '../../model/pickup.model';
import {RamassageService} from '../ramassage/ramassage.service';
import {PopUpDeleteService} from '../shared/pop-up-delete/pop-up-delete.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-reconcile-pick-up',
  templateUrl: './reconcile-pick-up.component.html',
  styleUrls: ['./reconcile-pick-up.component.scss']
})
export class ReconcilePickUpComponent implements OnInit {
  date = new Date();
  private driver: any;
  private pickUps: PickUp[] = [];
  spinner = false;
  activityPickUpInfo: ActivityPickUpInfo  = {driver: null, pickUps: null};
  activitiesPickUp: ActivityPickUp[] = [];
  filtredActivitiesPickUp: ActivityPickUp[] = [];
  @ViewChild(MatSelectionList)
  selectionList: MatSelectionList;
  selectedActivity: Activity;
  checkedActivityStatus: string;
  user: any;



  constructor(public dialog: MatDialog, private ramassageService: RamassageService, private router: Router, private tripService: TripService,
              private activityPickUpService: ActivityPickUpService, private snackBar: MatSnackBar, private popUpDeleteService: PopUpDeleteService,
              private modalService: NgbModal, private driverService: DriversService) { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityPickUpService.activityToEdit = null;
    this.getActivities();
  }

  getActivities() {
    this.spinner = true;
    this.activityPickUpService.query().subscribe((resActivity) => {
      this.activitiesPickUp = resActivity.body.filter((activity) => ((activity.deleted === false) && (activity.status === 'draft' || activity.status === 'confirmed')));
      if(this.user.role !== 'superAdmin') {
        this.activitiesPickUp = this.activitiesPickUp.filter((activity) => activity.entrepot.id === this.user.entrepot.id || activity.createdBy === this.user.idAdmin );
      }
      this.spinner = false;
      this.filtredActivitiesPickUp = this.activitiesPickUp;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToReconcilePickUpComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if ( !!result ) {
        this.driver = result;
        console.log(this.driver.idDriver);
        const driverActivity = this.activitiesPickUp.filter((activity) => (activity.driver.idDriver === this.driver.idDriver) && activity.deleted === false && activity.status === 'draft')
        if (driverActivity.length > 0){
          this.snackBar.open('Le livreur a déja une activité-pickUp à l\'état " draft ": ', 'Fermer', {
            duration: 8000,
          });
          return;
        }
        this.ramassageService.findAllByStatus('dispached').subscribe((res) => {
          // !!!!! FILTER BY ENTREPOT TOO
          let pickUpsToReconcile = res.body
            .filter((runsheet) => (runsheet.deleted === false && runsheet.driver.idDriver === this.driver.idDriver));
          if(this.user.role !== 'superAdmin'){
            pickUpsToReconcile = pickUpsToReconcile.filter((pickup: PickUp) => pickup.entrepot.id === this.user.entrepot.id ||
              pickup.createdBy === this.user.idAdmin);
          }
          if(pickUpsToReconcile.length === 0) {
            this.snackBar.open('Le livreur n\'a pas des pickups en cours ', 'Fermer', {
              duration: 8000,
            });
            return;
          }
          this.driverService.getOneDriver(this.driver.idDriver).subscribe((resDriver) => {
            this.activityPickUpInfo.driver = resDriver.json();
            this.activityPickUpInfo.pickUps = pickUpsToReconcile;
            this.activityPickUpService.activityPickUpInfo = this.activityPickUpInfo;
            // !!! BEFORE REDIRECTING CHECK IF DRIVER GOT DRAFT ACTIVITY
            this.router.navigate(['/reconcile-pickUp/create']);
          });
        });
      } else {
        // do nothing
      }
    });
  }

  deleteActivity(activity: Activity) {
    this.popUpDeleteService.activityName = 'Activity Pick Up';
    this.popUpDeleteService.activity = activity;
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        const index = this.activitiesPickUp.indexOf(activity);
        activity.deleted = true;
        activity.deletedDate = new Date();
        activity.deletedBy = this.user.idAdmin;
        this.activityPickUpService.update(activity).subscribe();
        this.activitiesPickUp[index] = activity;
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
  printRunsheet(activityPickUp: ActivityPickUp) {
    this.activityPickUpService.exportPdf(activityPickUp).subscribe((res) => {
      const path: string = res['_body'];
      this.downloadRapport(path);
    } );
  }
  downloadRapport(path: string) {
    const index: number = path.indexOf('PDF/ActivityPickUp') + 18;
    path = path.substring(index);
    console.log(path);
    this.activityPickUpService.downloadPDF(environment.serverUrl + '/api/activities-pickUp/downloadPDF' + path).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });
  }

  onAreaListControlChanged(activityRunsheet_option: MatListOption, activityRunsheet: Activity) {
    if (activityRunsheet_option.selected) {
      this.checkedActivityStatus = activityRunsheet.status;
      this.selectedActivity = activityRunsheet;
    } else {
      this.selectedActivity = null;
    }
  }
  deleteSelectedActivity() {
    this.popUpDeleteService.activityName = 'Activity Runsheet';
    this.popUpDeleteService.activity = this.selectedActivity;
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        const index = this.activitiesPickUp.indexOf(this.selectedActivity);
        this.selectedActivity.deleted = true;
        this.selectedActivity.deletedDate = new Date();
        this.selectedActivity.deletedBy = this.user.idAdmin;
        this.activitiesPickUp[index] = this.selectedActivity;
        this.activityPickUpService.update(this.selectedActivity).subscribe();
      }, (reason) => {
      }
    );
  }

  editActivity(activityPickUp: ActivityPickUp) {
    this.activityPickUpService.activityPickUpInfo = {pickUps: activityPickUp.listPickUps, driver: activityPickUp.driver};
    this.activityPickUpService.activityToEdit = activityPickUp;
    this.router.navigate(['/reconcile-pickUp/create']);
  }
  applyFilter(filterValue: any) {
    const filterValueUpper = filterValue.toUpperCase();
    if(filterValue === '' ) {
      this.filtredActivitiesPickUp = this.activitiesPickUp;
    }
    else {
      this.filtredActivitiesPickUp = this.activitiesPickUp.slice().filter((item) => item.ref.includes(filterValueUpper));
    }
  }
}





@Component({
  selector: 'add-driver-to-reconcile-pickup-dialog',
  templateUrl: 'add-driver-to-reconcile-pickup-dialog.html',
})
export class DialogAddDriverToReconcilePickUpComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToReconcilePickUpComponent>,
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
export interface ActivityPickUpInfo {
  driver: any;
  pickUps: PickUp[];
}
const MODALS: { [name: string]: Type<any> } = {
  deletePopUp: PopUpDeleteComponent
};
