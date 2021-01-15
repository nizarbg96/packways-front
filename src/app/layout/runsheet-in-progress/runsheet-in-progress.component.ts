import {Component, OnInit, ViewChild} from '@angular/core';
import {Runsheet} from '../../model/runsheet.model';
import {MatDialog, MatListOption, MatSelectionList} from '@angular/material';
import {RunsheetService} from '../runsheet/runsheet.service';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {DialogAddDriverToRunsheetComponent} from '../runsheet/runsheet.component';
import {Trip} from '../trips/Trip';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';
import {ResponseContentType} from '@angular/http';
import {map} from 'rxjs/operators';
export interface InProgressRunsheet {
   runsheetObject: Runsheet;
   nbTreatedTrips: number;
   nbColisLivree: number;
   nbColisRetour: number;
   nbColisEnCours: number;
}

@Component({
  selector: 'app-runsheet-in-progress',
  templateUrl: './runsheet-in-progress.component.html',
  styleUrls: ['./runsheet-in-progress.component.scss']
})
export class RunsheetInProgressComponent implements OnInit {

  date: Date;
  dateMelliseconds: number;
  nbSelectedRunsheet = 0;
  affectedDriver: any = null;
  runsheets: Runsheet[] = [];
  inProgressRunsheets: InProgressRunsheet[] = [];
  spinner = false;
  user: any;
  private checkedRunsheetStatus: string;
  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;
  private selectedRunsheet: Runsheet;
  //for modal
  closeResult: string;
  private selectedInProgressTrips: Trip[] = [];
  private filtredInProgressRunsheet: InProgressRunsheet[] = [];






  constructor(public dialog: MatDialog, private runsheetService: RunsheetService, private router: Router, private tripService: TripService,
              private modalService: NgbModal) { }

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
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.affectedDriver = result;
      this.runsheetService.affectedDriverSubject.next(this.affectedDriver);
      if (!!this.affectedDriver) {
        this.router.navigate(['/runsheet', 'create', this.affectedDriver.idDriver]);
      } else {
        this.router.navigate(['/runsheet', 'create', 0]);
      }
    });
  }
  getRunsheets() {
    this.spinner = true;
    this.runsheetService.query().subscribe((res) => {
      this.runsheets = res.body;
      this.runsheets = this.runsheets.filter((runsheet: Runsheet) =>
        ((runsheet.status === 'dispached') && runsheet.deleted === false) );
      if(this.user.role !== 'superAdmin'){
        this.runsheets = this.runsheets.filter((runsheet: Runsheet) => runsheet.entrepot.id === this.user.entrepot.id ||
          runsheet.createdBy === this.user.idAdmin);
      }
      this.runsheets = this.runsheets.sort((a, b) => (a.dispachedDate > b.dispachedDate) ? 1 : 0);
      this.runsheets.forEach((runsheet) =>{
        const list = runsheet.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || false))
          .map((colis) => colis.idTrip) ;
        this.tripService.getListOfTips(list).subscribe((resTrips) => {
          const trips = resTrips.body;
          const nbTreatedColis = runsheet.listColis.slice().filter(colis => (colis.treated === true) && (colis.removed === false)).length;
          const nbColisLivree = trips.filter((trip) => trip.statusTrip === 'Livree').length;
          const nbColisRetour = trips.filter((trip) => trip.statusTrip === 'Retour').length;
          const nbColisEnCours = trips.filter((trip) => trip.statusTrip === 'livraison en cours' || trip.statusTrip === 'En cours de retour').length;
          this.inProgressRunsheets.push({runsheetObject: runsheet, nbTreatedTrips: nbTreatedColis, nbColisLivree: nbColisLivree, nbColisRetour: nbColisRetour,
          nbColisEnCours: nbColisEnCours});
        });
      });
      this.filtredInProgressRunsheet = this.inProgressRunsheets;
      this.spinner = false;
    });
  }
  calculateDiff(data) {
    const date = new Date(data);
    const currentDate = new Date();
    const days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    console.log(listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length);
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;

  }


  printRunsheet() {

  }

  onAreaListControlChanged(runsheet_option: MatListOption, runsheet: Runsheet) {
    if(runsheet_option.selected){
      this.checkedRunsheetStatus = runsheet.status;
      this.selectedRunsheet = runsheet;
    }else {
      this.selectedRunsheet = null;
    }
  }

  dispatchRunsheet() {
    this.selectedRunsheet.status = 'dispached';
    this.selectedRunsheet.dispachedBy = this.user.idAdmin;
    this.selectedRunsheet.dispachedDate = new Date();
    this.runsheetService.update(this.selectedRunsheet).subscribe(() =>{
      const listTrips: string[] = this.selectedRunsheet.listColis
        .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map((colis) => colis.idTrip);
      console.log(this.user);
      this.tripService.updateTripsDriver(this.selectedRunsheet.driver.idDriver, listTrips, this.user.name).subscribe(() =>{
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
  showInProgressTrips(item: InProgressRunsheet, content: any) {
    const list = item.runsheetObject.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip) ;
    this.tripService.getListOfTips(list).subscribe((resTrips) => {
      this.selectedInProgressTrips = resTrips.body;
      this.open(content);
    });
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

  applyFilter(filterValue: any) {
    const filterValueUpper = filterValue.toUpperCase();
    if(filterValue === '' ) {
      this.filtredInProgressRunsheet = this.inProgressRunsheets;
    }
    else {
      this.filtredInProgressRunsheet = this.inProgressRunsheets.slice().filter((item) => item.runsheetObject.ref.includes(filterValueUpper));
    }
  }
  BSFromServer(runsheet: Runsheet) {
    const listIdTrips = runsheet.listColis.filter(colis => (colis.removed === false)).map((colis => colis.idTrip ));
    this.tripService.getBS(runsheet.driver.idDriver, listIdTrips).subscribe(data => {
      const path = data['_body'];
      this.downloadBS(path);
    });
  }
  downloadBS(path: string) {
    const index: number = path.indexOf('Bon') - 1;
    path = path.substring(index);
    this.runsheetService.downloadPDF(environment.serverUrl + '/trip/downloadBS/' + path).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open( fileURL, '_blank');
    });
  }

  imprimerRunsheet(selectedRunsheet: Runsheet) {
    this.BSFromServer(selectedRunsheet);
  }
}
