import {Component, Inject, OnInit, Type, ViewChild} from '@angular/core';
import {RunsheetService} from '../runsheet/runsheet.service';
import {Entrepot} from '../../model/entrepot.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSelectionList, MatSnackBar} from '@angular/material';
import {TripService} from '../trips/trips.service';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {DriversService} from '../drivers/drivers.service';
import {DialogAddDriverToRunsheetComponent, RunsheetInfo} from '../runsheet/runsheet.component';
import {Router} from '@angular/router';
import {Runsheet} from '../../model/runsheet.model';
import {ActivityRunsheetService} from './activity-runsheet.service';
import {Activity} from '../../model/activity.model';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Http, ResponseContentType} from '@angular/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PickUp} from '../../model/pickup.model';
import {PopUpDeleteService} from '../shared/pop-up-delete/pop-up-delete.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';

@Component({
  selector: 'app-reconcile-runsheet',
  templateUrl: './reconcile-runsheet.component.html',
  styleUrls: ['./reconcile-runsheet.component.scss']
})
export class ReconcileRunsheetComponent implements OnInit {
  date = new Date();
   driver: any;
   runsheets: Runsheet[] = [];
  spinner = false;
  activityRunsheetInfo: ActivityRunsheetInfo  = {driver: null, runsheets: null};
  activitiesRunsheet: Activity[] = [];
  filtredActivitiesRunsheet: Activity[] = [];
  @ViewChild(MatSelectionList)
   selectionList: MatSelectionList;
   selectedActivity: Activity;
   checkedActivityStatus: string;
   user: any;



  constructor(public dialog: MatDialog, private runsheetService: RunsheetService, private router: Router, private tripService: TripService,
              private activityRunsheetService: ActivityRunsheetService, private snackBar: MatSnackBar, private http: Http,
              private popUpDeleteService: PopUpDeleteService, private modalService: NgbModal) { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityRunsheetService.activityToEdit = null;
    this.getActivities();
  }

  getActivities() {
    this.spinner = true;
    this.activityRunsheetService.getDraftActivities().subscribe((resActivity) => {
      this.activitiesRunsheet = resActivity.body.filter((activity) => ((activity.deleted === false) && (activity.status === 'draft' || activity.status === 'confirmed')));
      if(this.user.role !== 'superAdmin'){
        this.activitiesRunsheet = this.activitiesRunsheet.filter((activity) => activity.entrepot.id === this.user.entrepot.id || activity.createdBy === this.user.idAdmin );
      }
      this.spinner = false;
      this.filtredActivitiesRunsheet = this.activitiesRunsheet;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToReconcileRunsheetComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if ( !!result ) {
        this.driver = result;
        console.log(this.driver.idDriver);
        const driverActivity = this.activitiesRunsheet.filter((activity) => (activity.driver.idDriver === this.driver.idDriver) && activity.deleted === false && activity.status === 'draft')
        if (driverActivity.length > 0){
          this.snackBar.open('Le livreur a déja une activité-runsheet à l\'état " draft ": ', 'Fermer', {
            duration: 8000,
          });
          return;
        }
        this.runsheetService.findAllByStatus('dispached').subscribe((res) => {
          // !!!!! FILTER BY ENTREPOT TOO
          let runsheetsToReconcile = res.body
            .filter((runsheet) => (runsheet.deleted === false && runsheet.driver.idDriver === this.driver.idDriver));
          if(this.user.role !== 'superAdmin'){
            runsheetsToReconcile = runsheetsToReconcile.filter((runsheet: Runsheet) => runsheet.entrepot.id === this.user.entrepot.id ||
              runsheet.createdBy === this.user.idAdmin);
          }
          if(runsheetsToReconcile.length === 0) {
            this.snackBar.open('Le livreur n\'a pas des runsheets en cours ', 'Fermer', {
              duration: 8000,
            });
            return;
          }
          this.activityRunsheetInfo.driver = this.driver;
          this.activityRunsheetInfo.runsheets = runsheetsToReconcile;
          this.activityRunsheetService.activityRunsheetInfo = this.activityRunsheetInfo;
          // !!! BEFORE REDIRECTING CHECK IF DRIVER GOT DRAFT ACTIVITY
          this.router.navigate(['/reconcile-runsheet/create']);
        });
      } else {
       // do nothing
      }
    });
  }

  deleteActivity(activity: Activity) {
    this.popUpDeleteService.activityName = 'Activity Runsheet';
    this.popUpDeleteService.activity = activity;
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        const index = this.activitiesRunsheet.indexOf(activity);
        activity.deleted = true;
        activity.deletedDate = new Date();
        activity.deletedBy = this.user.idAdmin;
        this.activityRunsheetService.update(activity).subscribe();
        this.activitiesRunsheet[index] = activity;
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
  printRunsheet(activityRunsheet: Activity) {
    this.activityRunsheetService.exportPdf(activityRunsheet).subscribe((res) => {
      const path: string = res['_body'];
      this.downloadRapport(path);
    } );
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
        const index = this.activitiesRunsheet.indexOf(this.selectedActivity);
        this.selectedActivity.deleted = true;
        this.selectedActivity.deletedDate = new Date();
        this.selectedActivity.deletedBy = this.user.idAdmin;
        this.activitiesRunsheet[index] = this.selectedActivity;
        this.activityRunsheetService.update(this.selectedActivity).subscribe();
      }, (reason) => {
      }
    );

  }

  editActivity(activityRunsheet: Activity) {
    this.activityRunsheetService.activityRunsheetInfo = {runsheets: activityRunsheet.listRunsheets, driver: activityRunsheet.driver};
    this.activityRunsheetService.activityToEdit = activityRunsheet;
    this.router.navigate(['/reconcile-runsheet/create']);
  }


  downloadRapport(path: string) {
    const index: number = path.indexOf('PDF/ActivityRunsheet') + 20;
    path = path.substring(index);
    console.log(path);
    this.activityRunsheetService.downloadPDF(environment.serverUrl + '/api/activities/downloadPDF' + path).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });
  }

  applyFilter(filterValue: any) {
    const filterValueUpper = filterValue.toUpperCase();
    if(filterValue === '' ) {
      this.filtredActivitiesRunsheet = this.activitiesRunsheet;
    }
    else {
      this.filtredActivitiesRunsheet = this.activitiesRunsheet.slice().filter((item) => item.ref.includes(filterValueUpper));
    }
  }

}





@Component({
  selector: 'add-driver-to-reconcile-runsheet-dialog',
  templateUrl: 'add-driver-to-reconcile-runsheet-dialog.html',
})
export class DialogAddDriverToReconcileRunsheetComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToReconcileRunsheetComponent>,
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
export interface ActivityRunsheetInfo {
  driver: any;
  runsheets: Runsheet[];
}
const MODALS: { [name: string]: Type<any> } = {
  deletePopUp: PopUpDeleteComponent
};
