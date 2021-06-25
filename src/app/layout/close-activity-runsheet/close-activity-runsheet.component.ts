import {Component, OnInit, ViewChild} from '@angular/core';
import {Runsheet} from '../../model/runsheet.model';
import {Activity} from '../../model/activity.model';
import {MatDialog, MatListOption, MatSelectionList, MatSnackBar} from '@angular/material';
import {RunsheetService} from '../runsheet/runsheet.service';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {ActivityRunsheetService} from '../reconcile-runsheet/activity-runsheet.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {ActivityRunsheetInfo, DialogAddDriverToReconcileRunsheetComponent} from '../reconcile-runsheet/reconcile-runsheet.component';
import {MoveableUnit} from '../../model/moveable-unit.model';
import {environment} from '../../../environments/environment';
import {CaisseService} from '../caisse-state/caisse.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DriversService} from '../drivers/drivers.service';
import get = Reflect.get;

@Component({
  selector: 'app-close-activity-runsheet',
  templateUrl: './close-activity-runsheet.component.html',
  styleUrls: ['./close-activity-runsheet.component.scss']
})
export class CloseActivityRunsheetComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  date = new Date();
   driver: any;
   runsheets: Runsheet[] = [];
  spinner = false;
  activityRunsheetInfo: ActivityRunsheetInfo = {driver: null, runsheets: null};
  activitiesRunsheet: Activity[] = [];
  @ViewChild(MatSelectionList)
  selectionList: MatSelectionList;
  selectedActivity: Activity;
  checkedActivityStatus: string;
  user: any;
  moreDayCounter = 1;
  pageIndex = 0;
  pageSize = 1;
  showNonRecolted = false;


  constructor(public dialog: MatDialog, private runsheetService: RunsheetService, private router: Router, private tripService: TripService,
              private activityRunsheetService: ActivityRunsheetService, private snackBar: MatSnackBar, private caisseService: CaisseService,
              private spinner2: NgxSpinnerService, private driverService: DriversService) {
  }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityRunsheetService.activityToEdit = null;
    this.getActivities();
    this.getAllDrivers();
  }

  getAllDrivers() {
    this.tripService.getDrivers().subscribe(data => {
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
        // this.runsheetInfo.driver =  oneDriver.json();
        // this.cars = this.affectedDriver.affectedCars;
        /*if(oneDriver.json().soutraitant){
          this.runsheetInfo.cout = oneDriver.json().fraisSoutraitance;
        }*/
        this.activityRunsheetService.findAllByDriver(oneDriver.json().refEmployee).subscribe((res) => {
          this.activitiesRunsheet = res.body;
        });
      });
    } else {
    }
  }


  getActivities() {
    this.spinner2.show();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - this.moreDayCounter);
    fromDate.setHours(0);
    fromDate.setMinutes(0);
    fromDate.setSeconds(0);
    const toDate = new Date();
    this.activityRunsheetService.getNextActivities(this.pageIndex, this.pageSize).subscribe((resActivity) => {
      resActivity.body.forEach(value => this.activitiesRunsheet.push(value));
      this.spinner2.hide();
      if (this.user.role !== 'superAdmin') {
        this.activitiesRunsheet = this.activitiesRunsheet.filter((activity) => activity.entrepot.id === this.user.entrepot.id ||
          activity.closedBy === this.user.idAdmin);
      }
      this.spinner = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToReconcileRunsheetComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!!result) {
        this.driver = result;
        console.log(this.driver.idDriver);
        const driverActivity = this.activitiesRunsheet.filter((activity) => (activity.driver.idDriver === this.driver.idDriver) && activity.deleted === false && activity.status === 'draft');
        if (driverActivity.length > 0) {
          this.snackBar.open('Le livreur a déja une activité-runsheet à l\'état " draft ": ', 'Fermer', {
            duration: 8000,
          });
          return;
        }
        this.runsheetService.findAllByStatus('dispached').subscribe((res) => {
          // !!!!! FILTER BY ENTREPOT TOO
          const runsheetsToReconcile = res.body
            .filter((runsheet) => (runsheet.deleted === false && runsheet.driver.idDriver === this.driver.idDriver));
          if (runsheetsToReconcile.length === 0) {
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
    const index = this.activitiesRunsheet.indexOf(activity);
    activity.deleted = true;
    activity.deletedDate = new Date();
    activity.deletedBy = this.user.idAdmin;
    this.activityRunsheetService.update(activity).subscribe();
    this.activitiesRunsheet[index] = activity;

  }

  calculateDiff(data) {
    const date = new Date(data);
    const currentDate = new Date();
    const days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length;
  }

  printRunsheet(activityRunsheet: Activity) {
    this.activityRunsheetService.exportPdf(activityRunsheet).subscribe((res) => {
      const path: string = res['_body'];
      this.downloadRapport(path);
    });
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

  onAreaListControlChanged(activityRunsheet_option: MatListOption, activityRunsheet: Activity) {
    if (activityRunsheet_option.selected) {
      this.checkedActivityStatus = activityRunsheet.status;
      this.selectedActivity = activityRunsheet;
    } else {
      this.selectedActivity = null;
    }
  }

  deleteSelectedActivity() {
    const index = this.activitiesRunsheet.indexOf(this.selectedActivity);
    this.selectedActivity.deleted = true;
    this.selectedActivity.deletedDate = new Date();
    this.selectedActivity.deletedBy = this.user.idAdmin;
    this.activitiesRunsheet[index] = this.selectedActivity;
    this.activityRunsheetService.update(this.selectedActivity).subscribe();
  }

  editActivity(activityRunsheet: Activity) {
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    this.spinner2.show();
    this.caisseService.findLastCoffre().subscribe((res) => {
      this.spinner2.hide();

      if (!res.body) {
        this.snackBar.open('Veuillez ouvrir la caisse d\'abords!', 'Fermer', {duration: 8000});
      } else {
        const caisse = res.body;
        if (caisse.closed) {
          this.snackBar.open('Veuillez ouvrir la caisse d\'abords!', 'Fermer', {duration: 8000});
        } else {
          if (caisse.openedDate < d) {
            this.snackBar.open('une anicenne caisse a été ouverte et n\'est pas encore fermée ', 'Fermer', {duration: 8000});
          } else {
            this.activityRunsheetService.activityRunsheetInfo = {
              runsheets: activityRunsheet.listRunsheets,
              driver: activityRunsheet.driver
            };
            this.activityRunsheetService.activityToEdit = activityRunsheet;
            this.router.navigate(['/close-activity-runsheet/create']);
          }
        }
      }
    }, () => {
      this.snackBar.open('Erreur Serveur', 'Fermer', {duration: 8000});
    });

  }

  showMore() {
    this.pageIndex++;
    this.getActivities();
  }

  onToggleChange() {
    if (!this.showNonRecolted) {
      this.spinner2.show();
      this.activityRunsheetService.getNonRecoltedActivvities().subscribe((res) => {
        this.activitiesRunsheet = res.body;
        this.spinner2.hide();
      });

    } else {
      this.pageSize = this.pageIndex + 1;
        this.pageIndex = 0;
      this.spinner2.show();
      this.activityRunsheetService.getNextActivities(this.pageIndex, this.pageSize).subscribe((resActivity) => {
        this.activitiesRunsheet = resActivity.body;
        if (this.user.role !== 'superAdmin') {
          this.activitiesRunsheet = this.activitiesRunsheet.filter((activity) => activity.entrepot.id === this.user.entrepot.id ||
            activity.closedBy === this.user.idAdmin);
        }
        this.spinner2.hide();
        this.pageIndex = this.pageSize - 1;
        this.pageSize = 1;
      });
    }

  }
}
