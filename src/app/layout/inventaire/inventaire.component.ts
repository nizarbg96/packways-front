import {Component, OnInit, Type, ViewChild} from '@angular/core';
import {Inventaire} from '../../model/inventaire.model';
import {MatDialog, MatListOption, MatSelectionList, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {TripService} from '../trips/trips.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ColisRunsheet} from '../../model/colis-runsheet.model';
import {RamassageService} from '../ramassage/ramassage.service';
import {InventaireService} from './inventaire.service';
import {Entrepot} from '../../model/entrepot.model';
import {PopUpDeleteService} from '../shared/pop-up-delete/pop-up-delete.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent implements OnInit {

  date = new Date();
  spinner = false;
  inventaires: Inventaire[] = [];
  @ViewChild(MatSelectionList)
  selectionList: MatSelectionList;
  selectedInventaire: Inventaire;
  checkedInventaireStatus: string;
  user: any;
   moreDayCounter = 1;



  constructor(public dialog: MatDialog, public ramassageService: RamassageService, private router: Router, private tripService: TripService,
              private inventaireService: InventaireService, private snackBar: MatSnackBar, private popUpDeleteService: PopUpDeleteService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.inventaireService.inventaireToEdit = null;
    this.getInventaires();
  }

  getInventaires() {
    const  fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - this.moreDayCounter);
    fromDate.setHours(0); fromDate.setMinutes(0); fromDate.setSeconds(0);
    this.spinner = true;
    this.inventaireService.findByCreatedDateGreaterThan(fromDate).subscribe((resInventaire) => {
      this.inventaires = resInventaire.body.filter((inventaire) => ((inventaire.deleted === false) &&
        (inventaire.status === 'draft' || inventaire.status === 'confirmed'))).reverse();
      if(this.user.role !== 'superAdmin'){
        this.inventaires = this.inventaires.filter((inventaire) => inventaire.entrepot.id === this.user.entrepot.id ||
          inventaire.createdBy === this.user.idAdmin);
      }
      this.spinner = false;
    });
  }


  deleteActivity(inventaire: Inventaire) {
    this.popUpDeleteService.activityName = 'Inventaire';
    this.popUpDeleteService.activity = inventaire;
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        const index = this.inventaires.indexOf(inventaire);
        inventaire.deleted = true;
        inventaire.deletedDate = new Date();
        inventaire.deletedBy = this.user.idAdmin;
        this.inventaireService.update(inventaire).subscribe();
        this.inventaires[index] = inventaire;
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
  printRunsheet() {

  }
  onAreaListControlChanged(activityRunsheet_option: MatListOption, inventaire: Inventaire) {
    if (activityRunsheet_option.selected) {
      this.checkedInventaireStatus = inventaire.status;
      this.selectedInventaire = inventaire;
    } else {
      this.selectedInventaire = null;
    }
  }
  deleteSelectedActivity() {
    this.popUpDeleteService.activityName = 'Inventaire';
    this.popUpDeleteService.activity = this.selectedInventaire;
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        const index = this.inventaires.indexOf(this.selectedInventaire);
        this.selectedInventaire.deleted = true;
        this.selectedInventaire.deletedDate = new Date();
        this.selectedInventaire.deletedBy = this.user.idAdmin;
        this.inventaires[index] = this.selectedInventaire;
        this.inventaireService.update(this.selectedInventaire).subscribe();
      }, (reason) => {
      }
    );
  }

  editActivity(inventaire: Inventaire) {
    this.inventaireService.inventaireToEdit = inventaire;
    this.router.navigate(['/inventaire/create']);
  }

  createInventaire() {
    const userInventaire = this.inventaires.filter((inventaire) => (inventaire.createdBy === this.user.idAdmin) && inventaire.deleted === false && inventaire.status === 'draft')
    if (userInventaire.length > 0){
      this.snackBar.open('Vous avez  déja un inventaire à l\'état " draft ": ', 'Fermer', {
        duration: 8000,
      });
      return;
    }
    this.router.navigate(['/inventaire/create']);
  }
  showMore() {
    this.moreDayCounter = this.moreDayCounter  + 1;
    this.getInventaires();
  }
}
const MODALS: { [name: string]: Type<any> } = {
  deletePopUp: PopUpDeleteComponent
}
