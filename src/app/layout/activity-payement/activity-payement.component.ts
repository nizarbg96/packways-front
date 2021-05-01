import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatListOption, MatSelectionList, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {ActivityPayement, IActivityPayement} from '../../model/activity-payement.model';
import {ActivityPayementService} from './activity-payement.service';
import {Trip} from '../trips/Trip';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../entrepot/entrepot.service';
import {UserService} from '../users/users.service';
import {TripExcelService} from '../trips/excel-trip.service';
import {PickUp} from '../../model/pickup.model';
import {DatePipe} from '@angular/common';
import {CaisseService} from '../caisse-state/caisse.service';
import {environment} from '../../../environments/environment';
import {IStatActivityJour} from '../../model/stat-activity-jour.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-activity-payement',
  templateUrl: './activity-payement.component.html',
  styleUrls: ['./activity-payement.component.scss']
})
export class ActivityPayementComponent implements OnInit {

  date = new Date();
  private driver: any;
  spinner = false;
  activityPayementInfo: ActivityPayementInfo  = {client: null, recoltedTrips: null};
  activitiesPayement: ActivityPayement[] = [];
  @ViewChild(MatSelectionList)
  selectionList: MatSelectionList;
  selectedActivityPayement: ActivityPayement;
  checkedActivityStatus: string;
  user: any;
  private client: any;
  private keyFiltredTrip1: any;
  private keyFiltredTrip4: string;
  private jsonObj: any;
  listCheckedActivities: ActivityPayement[] = [];
  private moreDayCounter = 1;
  url = environment.serverUrl;
  private closeResult: string;




  constructor(public dialog: MatDialog, private router: Router, private tripService: TripService, private userService: UserService,
              private activityPayementService: ActivityPayementService, private snackBar: MatSnackBar, private tripExcelService: TripExcelService,
              private datePipe: DatePipe, private caisseService: CaisseService, private modalService: NgbModal, private spinner2: NgxSpinnerService,) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityPayementService.activityToEdit = null;
    this.getActivities();
  }

  getActivities() {
    const  fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - this.moreDayCounter);
    fromDate.setHours(0); fromDate.setMinutes(0); fromDate.setSeconds(0);
    this.spinner = true;
    this.activityPayementService.findByCreatedDateGreaterThan(fromDate).subscribe((resActivity) => {
      this.activitiesPayement = resActivity.body.filter((activity) => ((activity.deleted === false) &&
        (activity.status === 'draft' || activity.status === 'confirmed' || activity.status === 'closed'))).reverse();
      this.spinner = false;
    });
  }

  openDialog(): void { let d = new Date();
    d.setHours(0,0,0,0);
    this.spinner2.show();
    this.caisseService.query().subscribe((res) => {
      this.spinner2.hide();
      const caisses = res.body.reverse();
      if(caisses.length === 0){
        this.snackBar.open('Veuillez ouvrir la caisse d\'abords!', 'Fermer', {duration: 8000});
      } else {
        const caisse = caisses[0];
        if(caisse.closed){
          this.snackBar.open('Veuillez ouvrir la caisse d\'abords!', 'Fermer', {duration: 8000});
        }else {
          if(caisse.openedDate < d){
            this.snackBar.open('une anicenne caisse a été ouverte et n\'est pas encore fermée ', 'Fermer', {duration: 8000});
          }
          else{
            const dialogRef = this.dialog.open(DialogClientToActivityPayementComponent, {
              width: '60%',
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              if ( !!result ) {
                this.client = result;
                console.log(this.client.idUser);
                let clientActivity = this.activitiesPayement.filter((activity) => (activity.clientId === this.client.idUser) && activity.deleted === false && activity.status === 'draft');
                if(this.user.role !== 'superAdmin'){
                  clientActivity = clientActivity.filter((activity: ActivityPayement) => activity.entrepot.id === this.user.entrepot.id ||
                    activity.createdBy === this.user.idAdmin);
                }
                if (clientActivity.length > 0) {
                  this.snackBar.open('Le client a déja une activité-payement à l\'état " draft ": ', 'Fermer', {
                    duration: 8000,
                  });
                  return;
                }
                this.getFiltredTrips1(null, null, null, this.client.idUser,
                  null, null, 'Récolté', null, null, null);
              } else {
                // do nothing
              }
            });
          }
        }
      }
    },() => {
      this.snackBar.open('Erreur Serveur', 'Fermer', {duration: 8000});
    })
  }
  openModalJustificatif(contentActivityJour: TemplateRef<any>, element: IActivityPayement) {
    this.selectedActivityPayement = element;
    this.open(contentActivityJour);
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  deleteActivity(activity: ActivityPayement) {
    const index = this.activitiesPayement.indexOf(activity);
    activity.deleted = true;
    activity.deletedDate = new Date();
    activity.deletedBy = this.user.idAdmin;
    this.activityPayementService.update(activity).subscribe();
    this.activitiesPayement[index] = activity;

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

  onAreaListControlChanged(activityPayement_option: MatListOption, activityPayement: ActivityPayement) {
    if (activityPayement_option.selected) {
      this.checkedActivityStatus = activityPayement.status;
      this.selectedActivityPayement = activityPayement;
      this.listCheckedActivities.push(this.selectedActivityPayement);
    } else {
      this.selectedActivityPayement = null;
      this.listCheckedActivities = this.listCheckedActivities.filter(activity => activity.ref !== activityPayement.ref);
    }
  }
  deleteSelectedActivity() {
    const index = this.activitiesPayement.indexOf(this.selectedActivityPayement);
    this.selectedActivityPayement.deleted = true;
    this.selectedActivityPayement.deletedDate = new Date();
    this.selectedActivityPayement.deletedBy = this.user.idAdmin;
    this.activitiesPayement[index] = this.selectedActivityPayement;
    this.activityPayementService.update(this.selectedActivityPayement).subscribe();
  }

  editActivity(activityPayement: ActivityPayement) {
    this.tripService.getListOfTips(activityPayement.listColisRecolted).subscribe((resTrips) => {
      this.activityPayementService.activityPayementInfo = {client: activityPayement.clientId, recoltedTrips: resTrips.body};
      this.activityPayementService.activityToEdit = activityPayement;
      this.router.navigate(['/payements/create']);
    });
  }
  getFiltredTrips1(dateTp, dateTp2, keyTp, keyTp1, keyTp2, keyTp3, keyTp4, keyTp5, btnTp, keyTp6) {
    this.spinner = true;
    if ((keyTp1 != null) && (keyTp1 !== 'tous')) {
      this.keyFiltredTrip1 = keyTp1;
    } else {
      this.keyFiltredTrip1 = '';
    }
    if (keyTp4 != null) {
      if (keyTp4 === 'tous') {
        this.keyFiltredTrip4 = '';
      } else {
        this.keyFiltredTrip4 = keyTp4;
      }
    } else {
      this.keyFiltredTrip4 = '';
    }
    this.spinner2.show();
    this.tripService.getFiltredTrips1('admin', 999, '', '',
      '', this.keyFiltredTrip1, '', '', this.keyFiltredTrip4,
      '', '', '').subscribe(data => {
      const obj = Array.of(JSON.parse(data['_body']).data);
      this.jsonObj = obj[0];
      this.tripService.getListOfTips(this.jsonObj.map(trip => trip.idTrip)).subscribe((resTrips) => {
        this.activityPayementInfo = {client: this.client, recoltedTrips: resTrips.body};
        this.activityPayementService.activityPayementInfo = this.activityPayementInfo;
        this.spinner = false;
        this.spinner2.hide();
        this.router.navigate(['/payements/create']);
      });
    });
  }

  showStatus(status: string) {
    if (status === 'confirmed') {
      return 'En cours de payement';
    } else if (status === 'closed') {
      return 'payé';
         } else if (status === 'draft') {
      return 'draft';
         }
  }
  generateExcelReportForClient(activityPayement: ActivityPayement) {
    this.spinner2.show();
      this.userService.getUserById(activityPayement.clientId).subscribe((resUser) => {
        this.spinner2.hide();
        const client = resUser.json();
        const listTripsRapport = activityPayement.listRapportTrips;
        const tripsByUser = [];
        let costTrip = 0;
        let valpack = 0;
        const nameuser = activityPayement.clientName;
        console.log('nameuser', nameuser);

        if (listTripsRapport.length === 0) {
          this.snackBar.open('Veuillez sélectionner au moins un colis.', 'Fermer', {
            duration: 10000,
          });
          return;
        }

        for (let i = 0; i < listTripsRapport.length; i++) {
          const jTemp = listTripsRapport[i];
          costTrip = costTrip + jTemp.costTrip;
          valpack = valpack + jTemp.packageTrip.valPackage;
          const tab: any = [];
          const livreeDay = this.datePipe.transform(jTemp.livredday, 'yyyy-MM-dd')  ;
          const createdDay = this.datePipe.transform(jTemp.createdday, 'yyyy-MM-dd')
          tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY2(createdDay),
            this.splitDateFormatMDY2(livreeDay), jTemp.descriptionTrip, jTemp.packageTrip.valPackage);
          tripsByUser.push(tab);
        }

        const tab1: any = [];
        tab1.push('', '', costTrip, '', '', '', '', valpack);
        tripsByUser.push(tab1);

        const montantNet = valpack - costTrip;
        this.tripExcelService.generateExcel(tripsByUser, nameuser, montantNet, client.mobileUser, client.adressUser);
      });

  }
  splitDateFormatMDY2(dd) {
    let dformat = '';
    if (dd != null) {
      const d = '' + dd;
      const arr = d.split('-');
      dformat = arr[1] + '/' + arr[0] + '/' + arr[2];
    }
    return dformat;
  }
  showMore() {
    this.moreDayCounter = this.moreDayCounter  + 1;
    this.getActivities();
  }
}
@Component({
  selector: 'add-client-to-activity-payement-dialog',
  templateUrl: 'add-client-to-activity-payement-dialog.html',
})
export class DialogClientToActivityPayementComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  //
  Listuserauto = [];
  clientFilter: any;
  Listuser = [];
  affectedUser: any;


  constructor(
    public dialogRef: MatDialogRef<DialogClientToActivityPayementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private muService: MoveableUnitService,
    private entrepotService: EntrepotService, private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllUsers() {
    this.tservice.getUsers().subscribe(data => {
      const obj = Array.of(JSON.parse(data['_body']).data);
      const jsonObj = obj[0];
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].accountActive === true) {
          this.Listuser.push(jsonObj[i]);
          this.Listuserauto.push(jsonObj[i].nameUser + ' ' + jsonObj[i].surnameUser);
        }
      }
      // console.log('listuser!::', this.Listuserauto);
    }, error => {
      // console.log(error);
    });
  }
  getSelectedUser(user: any) {
    if (user != null) {
      const ind = this.Listuserauto.indexOf(user.title);
      this.affectedUser = this.Listuser[ind];
    }
  }

}
export interface ActivityPayementInfo {
  client: any;
  recoltedTrips: Trip[];
}
