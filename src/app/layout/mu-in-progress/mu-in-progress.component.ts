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
import {InProgressRunsheet} from '../runsheet-in-progress/runsheet-in-progress.component';
import {MoveableUnit} from '../../model/moveable-unit.model';
import {MoveableUnitService} from '../moveable-unit/moveable-unit.service';
import {environment} from '../../../environments/environment';
import {RunsheetService} from '../runsheet/runsheet.service';

export interface InProgressMoveableUnit {
  moveableUnitObject: MoveableUnit;
  nbTreatedTrips: number;
}

@Component({
  selector: 'app-mu-in-progress',
  templateUrl: './mu-in-progress.component.html',
  styleUrls: ['./mu-in-progress.component.scss']
})
export class MuInProgressComponent implements OnInit {
  date: Date;
  dateMelliseconds: number;
  nbSelectedMoveableUnit = 0;
  affectedDriver: any = null;
  moveableUnits: MoveableUnit[] = [];
  inProgressMoveableUnits: InProgressMoveableUnit[] = [];
  filtredInProgressMoveableUnits: InProgressMoveableUnit[] = [];
  spinner = false;
  user: any;
  private checkedMoveableUnitStatus: string;
  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;
  private selectedMoveableUnit: MoveableUnit;
  // for modal
  closeResult: string;
  private selectedInProgressTrips: Trip[] = [];






  constructor(public dialog: MatDialog, private moveableUnitService: MoveableUnitService, private router: Router, private tripService: TripService,
              private modalService: NgbModal, private runsheetService: RunsheetService) { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.date = new Date();
    this.dateMelliseconds = this.date.getMilliseconds();
    this.getMoveableUnits();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToRunsheetComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.affectedDriver = result;
      this.moveableUnitService.affectedDriverSubject.next(this.affectedDriver);
      if (!!this.affectedDriver) {
        this.router.navigate(['/mu', 'create', this.affectedDriver.idDriver]);
      } else {
        this.router.navigate(['/mu', 'create', 0]);
      }
    });
  }
  getMoveableUnits() {
    this.spinner = true;
    this.moveableUnitService.query().subscribe((res) => {
      this.moveableUnits = res.body;
      this.moveableUnits = this.moveableUnits.filter((moveableUnit: MoveableUnit) =>
        ((moveableUnit.status === 'dispached') && moveableUnit.deleted === false) );
      if(this.user.role !== 'superAdmin'){
        this.moveableUnits = this.moveableUnits.filter((mu: MoveableUnit) => mu.entrepotSrc.id === this.user.entrepot.id ||
          mu.entrepotDest.id === this.user.entrepot.id || mu.createdBy === this.user.idAdmin);
      }
      this.moveableUnits = this.moveableUnits.sort((a, b) => (new Date(a.dispachedDate).getTime() - new Date(b.dispachedDate).getTime()));
      this.moveableUnits.forEach((moveableUnit) =>{
        const list = moveableUnit.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
          .map((colis) => colis.idTrip) ;
        this.tripService.getListOfTips(list).subscribe((resTrips) => {
          const trips = resTrips.body;
          const nbColisLivree = trips.filter((trip) => trip.statusTrip === 'Livree' || trip.statusTrip === 'Retour' || trip.statusTrip === 'En cours de retour'
            || trip.statusTrip === 'Retournee').length;
          this.inProgressMoveableUnits.push({moveableUnitObject: moveableUnit, nbTreatedTrips: nbColisLivree});
        });
      })
      this.spinner = false;
      this.filtredInProgressMoveableUnits = this.inProgressMoveableUnits;
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

  onAreaListControlChanged(moveableUnit_option: MatListOption, moveableUnit: MoveableUnit) {
    if (moveableUnit_option.selected){
      this.checkedMoveableUnitStatus = moveableUnit.status;
      this.selectedMoveableUnit = moveableUnit;
    } else {
      this.selectedMoveableUnit = null;
    }
  }

  dispatchMoveableUnit() {
    this.selectedMoveableUnit.status = 'dispached';
    this.selectedMoveableUnit.dispachedBy = this.user.idAdmin;
    this.selectedMoveableUnit.dispachedDate = new Date();
    this.moveableUnitService.update(this.selectedMoveableUnit).subscribe(() =>{
      const listTrips: string[] = this.selectedMoveableUnit.listColis
        .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map((colis) => colis.idTrip);
      console.log(this.user);
      this.tripService.updateTripsDriver(this.selectedMoveableUnit.driver.idDriver, listTrips, this.user.name).subscribe(() =>{
        this.tripService.updateTripsStatus('livraison en cours', listTrips,  this.user.name, '').subscribe();
      });
    });

  }

  deleteselectedMoveableUnit() {
    const index = this.moveableUnits.indexOf(this.selectedMoveableUnit);
    this.selectedMoveableUnit.deleted = true;
    this.selectedMoveableUnit.deletedDate = new Date();
    this.selectedMoveableUnit.deletedBy = this.user.idAdmin;
    this.moveableUnitService.update(this.selectedMoveableUnit).subscribe();
    const listTripsToUpdate = this.selectedMoveableUnit.listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).map(colis => colis.idTrip);
    this.tripService.updateTripsWhenDeleteMU(listTripsToUpdate).subscribe();
  }
  showInProgressTrips(item: InProgressMoveableUnit, content: any) {
    console.log('hiii');
    const list = item.moveableUnitObject.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
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
      this.filtredInProgressMoveableUnits = this.inProgressMoveableUnits;
    }
    else {
      this.filtredInProgressMoveableUnits = this.inProgressMoveableUnits.slice().filter((item) => item.moveableUnitObject.ref.includes(filterValueUpper));
    }
  }

  inNonTreatedList(trp: Trip) {
    if(trp.statusTrip === 'transit livraison' || trp.statusTrip === 'transit retour'){
      return true;
    } else {
      return false;
    }
  }
  BSFromServer(mu: MoveableUnit) {
    const listIdTrips = mu.listColis.filter(colis => (colis.removed === false)).map((colis => colis.idTrip ));
    this.tripService.getMU(mu.driver.idDriver, listIdTrips,mu.entrepotSrc.nom,mu.entrepotDest.nom,mu.ref).subscribe(data => {
      const path = data['_body'];
      this.downloadBS(path);
    });
  }
  downloadBS(path: string) {
    const index: number = path.indexOf('MU') - 1;
    path = path.substring(index);
    this.runsheetService.downloadPDF(environment.serverUrl + '/trip/downloadMU/' + path).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open( fileURL, '_blank');
    });
  }

  imprimerMu(selectedMu: MoveableUnit) {
    this.BSFromServer(selectedMu);
  }
}

