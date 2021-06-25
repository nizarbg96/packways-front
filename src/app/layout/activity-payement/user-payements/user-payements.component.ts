import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivityPayement, IActivityPayement} from '../../../model/activity-payement.model';
import {MatDialog, MatListOption, MatSelectionList, MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {TripService} from '../../trips/trips.service';
import {UserService} from '../../users/users.service';
import {ActivityPayementService} from '../activity-payement.service';
import {TripExcelService} from '../../trips/excel-trip.service';
import {DatePipe} from '@angular/common';
import {CaisseService} from '../../caisse-state/caisse.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivityPayementInfo} from '../activity-payement.component';
import {PaiementsClient} from '../../../model/PaiementClient.model';

@Component({
  selector: 'app-user-payements',
  templateUrl: './user-payements.component.html',
  styleUrls: ['./user-payements.component.scss']
})
export class UserPayementsComponent implements OnInit {


  date = new Date();
  private driver: any;
  spinner = false;
  activityPayementInfo: ActivityPayementInfo  = {client: null, recoltedTrips: null};
  activitiesPayement: PaiementsClient[] = [];
  @ViewChild(MatSelectionList)
  selectionList: MatSelectionList;
  selectedActivityPayement: ActivityPayement;
  checkedActivityStatus: string;
  user: any;
   client: any;
   keyFiltredTrip1: any;
   keyFiltredTrip4: string;
   jsonObj: any;
  listCheckedActivities: ActivityPayement[] = [];
   moreDayCounter = 1;
  url = environment.serverUrl;
   closeResult: string;
  pageIndex = 0;
  pageSize = 1;
  showNonClosed = false;



  constructor(public dialog: MatDialog, private router: Router, private tripService: TripService, private userService: UserService,
              private activityPayementService: ActivityPayementService, private snackBar: MatSnackBar, private tripExcelService: TripExcelService,
              private datePipe: DatePipe, private caisseService: CaisseService, private modalService: NgbModal, private spinner2: NgxSpinnerService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityPayementService.activityToEdit = null;
    this.getActivities();
  }

  getActivities() {
    this.spinner = true;
    if (this.user.role === 'superAdmin' ) {
      this.activityPayementService.getClientsPayements().subscribe((resActivity) => {
        this.activitiesPayement = resActivity.body;
        this.spinner = false;
      });
    }
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


  calculateDiff(data) {
    const date = new Date(data);
    const currentDate = new Date();
    const days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
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
    this.pageIndex++;
    this.getActivities();
  }

}
