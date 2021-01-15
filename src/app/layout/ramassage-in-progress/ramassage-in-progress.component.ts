import {Component, OnInit, ViewChild} from '@angular/core';
import {Runsheet} from '../../model/runsheet.model';
import {MatDialog, MatListOption, MatSelectionList} from '@angular/material';
import {Trip} from '../trips/Trip';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogAddDriverToRunsheetComponent} from '../runsheet/runsheet.component';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {PickUp} from '../../model/pickup.model';
import {RamassageService} from '../ramassage/ramassage.service';

export interface InProgressPickUp {
  pickUpObject: PickUp;
  nbTreatedTrips: number;
}

@Component({
  selector: 'app-ramassage-in-progress',
  templateUrl: './ramassage-in-progress.component.html',
  styleUrls: ['./ramassage-in-progress.component.scss']
})
export class RamassageInProgressComponent implements OnInit {

  date: Date;
  dateMelliseconds: number;
  nbSelectedPickUps = 0;
  affectedDriver: any = null;
  pickUps: PickUp[] = [];
  inProgressPickUps: InProgressPickUp[] = [];
  filtredInProgressPickUps: InProgressPickUp[] = [];
  spinner = false;
  user: any;
  private checkedPickUpsStatus: string;
  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;
  private selectedPickUp: PickUp;
  // for modal
  closeResult: string;
  private selectedInProgressTrips: Trip[] = [];






  constructor(public dialog: MatDialog, private ramassageService: RamassageService, private router: Router, private tripService: TripService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.date = new Date();
    this.dateMelliseconds = this.date.getMilliseconds();
    this.getPickUps();
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToRunsheetComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.affectedDriver = result;
      this.ramassageService.affectedDriverSubject.next(this.affectedDriver);
      if (!!this.affectedDriver) {
        this.router.navigate(['/runsheet', 'create', this.affectedDriver.idDriver]);
      } else {
        this.router.navigate(['/runsheet', 'create', 0]);
      }
    });
  }
  getPickUps() {
    this.spinner = true;
    this.ramassageService.query().subscribe((res) => {
      this.pickUps = res.body;
      this.pickUps = this.pickUps.filter((runsheet: Runsheet) =>
        ((runsheet.status === 'dispached') && runsheet.deleted === false) );
      if(this.user.role !== 'superAdmin'){
        this.pickUps = this.pickUps.filter((pickup: PickUp) => {
          if(!!pickup.entrepot){
            return (pickup.entrepot.id === this.user.entrepot.id ||
              pickup.createdBy === this.user.idAdmin)
          } else {
            return false;
          }
        });
      }
      this.pickUps = this.pickUps.sort((a, b) => (a.dispachedDate > b.dispachedDate) ? 1 : 0);
      this.pickUps.forEach((pickUp) =>{
        const list = pickUp.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
          .map((colis) => colis.idTrip) ;
        this.tripService.getListOfTips(list).subscribe((resTrips) => {
          const trips = resTrips.body;
          const nbColisLivree = trips.filter((trip) => trip.statusTrip === 'Livree' || trip.statusTrip === 'Retour' || trip.statusTrip === 'En cours de retour'
            || trip.statusTrip === 'Retournee').length;
          this.inProgressPickUps.push({pickUpObject: pickUp, nbTreatedTrips: nbColisLivree});
        });
      })
      this.spinner = false;
      this.filtredInProgressPickUps = this.inProgressPickUps;
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


  printRunsheet() {}

  onAreaListControlChanged(pickUp_option: MatListOption, pickUp: PickUp) {
    if (pickUp_option.selected){
      this.checkedPickUpsStatus = pickUp.status;
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
        this.tripService.updateTripsStatus('livraison en cours', listTrips,  this.user.name, '').subscribe();
      });
    });

  }

  deleteSelectedPickUp() {
    const index = this.pickUps.indexOf(this.selectedPickUp);
    this.selectedPickUp.deleted = true;
    this.selectedPickUp.deletedDate = new Date();
    this.selectedPickUp.deletedBy = this.user.idAdmin;
    this.ramassageService.update(this.selectedPickUp).subscribe();
    const listTripsToUpdate = this.selectedPickUp.listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
    this.tripService.updateTripsWhenDeletePickUp(listTripsToUpdate).subscribe();
  }
  showInProgressTrips(item: InProgressPickUp, content: any) {
    const list = item.pickUpObject.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
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
      this.filtredInProgressPickUps = this.inProgressPickUps;
    }
    else {
      this.filtredInProgressPickUps = this.inProgressPickUps.slice().filter((item) => item.pickUpObject.ref.includes(filterValueUpper));
    }
  }
}
