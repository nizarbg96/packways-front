import {AfterViewChecked, AfterViewInit, Component, OnInit, Type, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PickUp} from '../../../model/pickup.model';
import {InProgressPickUp} from '../../ramassage-in-progress/ramassage-in-progress.component';
import {Trip} from '../../trips/Trip';
import {MatSnackBar, MatStepper} from '@angular/material';
import {TripService} from '../../trips/trips.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {RamassageService} from '../../ramassage/ramassage.service';
import {UserService} from '../../users/users.service';
import {ActivityRunsheetService} from '../../reconcile-runsheet/activity-runsheet.service';
import {pluck} from 'rxjs/operators';
import {ColisSuccessRunsheet} from '../../../model/colis-success-runsheet.model';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {DepenseActivity} from '../../../model/depense-activity.model';
import {Inventaire} from '../../../model/inventaire.model';
import {InventaireService} from '../inventaire.service';
import {HistoriqueScan} from '../../../model/historique-scan.model';
import {RunsheetService} from '../../runsheet/runsheet.service';
import {MoveableUnitService} from '../../moveable-unit/moveable-unit.service';
import {ConflitService} from '../../conflict-trips/conflit.service';
import {Conflit} from '../../../model/conflit.model';
import {
  NgbdModalConfirmLivree,
  NgbdModalConfirmNonLivree, NgbdModalConfirmReturned
} from '../../reconcile-runsheet/create-activity-runsheet/create-activity-runsheet.component';

@Component({
  selector: 'app-create-inventaire',
  templateUrl: './create-inventaire.component.html',
  styleUrls: ['./create-inventaire.component.scss']
})
export class CreateInventaireComponent implements OnInit, AfterViewInit {


  date = new Date();
  inventaire: Inventaire;
  searchtermInventaire: any;
  spinner = false;
  closeResult: string;
  selectedInProgressTrips: Trip[] = [];
  @ViewChild('stepper') private myStepper: MatStepper;
  user: any;
  driver: any;
  listColisNonTreated: Trip[] = [];
  ListScanInventaire: Trip[] = [];
  allTrips: Trip[] = [];
  selectedTrip: Trip = null;
  firstStep = true;
  finalStep = false;
  panelOpenState = false;
  gasoileEspeceFormControl: any;
  carteGasoilValues: number[] = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  valeurDepense = 0;
  valeurColis = 0;
  depenseForme = this.fb.group(
    {
      gasoilCarteNumber: [null, Validators.required],
      gasoilCarteValue: [null, Validators.required],
      gasoilEspece: [null, Validators.required],
      carteTel: [null, Validators.required],
      avance: [null, Validators.required],
      autreDesc: [null, Validators.required],
      autreValue: [null, Validators.required],
    }
  );
   trips: Trip[] = [];
   ListScanInventaireNB: any;
   inventaireStepper = true;


  constructor(private inventaireService: InventaireService, private _formBuilder: FormBuilder, private tripService: TripService,
              private modalService: NgbModal, private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder,
              public ramassageService: RamassageService, private userService: UserService, private runsheetService: RunsheetService,
              public moveableUnitService: MoveableUnitService, private conflictService: ConflitService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    if (!!this.inventaireService.inventaireToEdit) {
      // IF EDIT
      this.getEditInventaire(this.inventaireService.inventaireToEdit);
     // this.getEntrepotTrips();
    } else {
      // IF CREATE
      this.createDraftInventaire();
    }
    // setTimeout(()=>{
    // },5000)

  }

  ngAfterViewInit() {
    this.myStepper.selectionChange
      .pipe(pluck('selectedIndex'))
      .subscribe((res: number) => {
        if (res === 0) {
          this.inventaireStepper = true;
          this.firstStep = true;
          this.finalStep = false;
        } else if (res === 1) {
          this.inventaireStepper = false;
          this.firstStep = false;
          this.finalStep = false;
        } else if (res === 2) {
          //
          this.firstStep = false;
          this.inventaireStepper = false;
          this.finalStep = true;
        }
      });
  }

  getEntrepotTrips() {
    this.spinner = true;
    this.tripService.getTripsByEntrepot(this.inventaire.entrepot).subscribe((resTrips) => {
      const trips = resTrips.body;
      this.listColisNonTreated = trips.filter(trip => (trip.statusTrip === 'Chez Livreur' || trip.statusTrip === 'Retour') &&
        (trip.deleted === false || trip.deleted === undefined || trip.deleted === null) && (trip.currentRunsheetId === null ||
        trip.currentRunsheetId === undefined));
      this.inventaire.listColisNonTreated = this.listColisNonTreated.map(trip => trip.idTrip);
      this.inventaireService.update(this.inventaire).subscribe((resInventaire) => {
        this.inventaire = resInventaire.body;
        this.spinner = false;
      });
    });
  }



  scanListInventaire() {
    // console.log("sanc: ",this.searchTermscan)
    // vérif
    let verif = false;
    for (let index = 0; index < this.ListScanInventaire.length; index++) {
      if (this.searchtermInventaire === this.ListScanInventaire[index].idTrip || this.searchtermInventaire === this.ListScanInventaire[index].refTrip) {
        verif = true;
      }
    }
    //
    if (verif === false) {
      this.tripService.getTripscanListById(this.searchtermInventaire).subscribe(data => {
        const obj = data.body;
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScanInventaire.length; index++) {
          if (obj.idTrip === this.ListScanInventaire[index].idTrip || obj.refTrip === this.ListScanInventaire[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if(!!obj.entrepot){
            if (obj.entrepot.id === this.inventaire.entrepot.id) {
              if ((obj.currentRunsheetId !== null) && (obj.currentRunsheetId !== 'null') && (obj.currentRunsheetId !== undefined) ) {
                this.runsheetService.find(obj.currentRunsheetId).subscribe((res) => {
                  const msg = 'impossible de scanner le colis! ce colis existe dans la runsheet' +
                    ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
                  this.snackBar.open( msg, 'Fermer', {duration: 8000, });
                  this.playFailureAudio();
                  obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin, new Date(), 'Ajout dans l\'inventaire: ' + this.inventaire.ref,
                    'Exception : ' + msg));
                  this.tripService.updateOneTrip(obj).subscribe();
                  this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                    const admin = resUser.json();
                    this.conflictService.create(new Conflit(null,obj.idTrip,new Date(),this.user.name,admin.entrepot,msg,'Inventaire',
                      this.inventaire.ref)).subscribe();
                  });
                });
              } else if ((obj.currentMUId !== null) && (obj.currentMUId !== 'null') && (obj.currentMUId !== undefined) ) {
                this.moveableUnitService.find(obj.currentMUId).subscribe((res) => {
                  const msg = 'impossible de scanner le colis! ce colis existe dans la moveable unit' +
                    ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
                  this.snackBar.open( msg, 'Fermer', {duration: 8000, });
                  this.playFailureAudio();
                  obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin, new Date(), 'Ajout dans l\'inventaire: ' + this.inventaire.ref,
                    'Exception : ' + msg));
                  this.tripService.updateOneTrip(obj).subscribe();
                  this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                    const admin = resUser.json();
                    this.conflictService.create(new Conflit(null,obj.idTrip,new Date(),this.user.name,admin.entrepot,msg,'Inventaire',
                      this.inventaire.ref)).subscribe();
                  });
                });
              } else if ((obj.currentPickUpId !== null) && (obj.currentPickUpId !== 'null') && (obj.currentPickUpId !== undefined) ) {
                this.ramassageService.find(obj.currentPickUpId).subscribe((res) => {
                  const msg = 'impossible de scanner le colis! ce colis existe dans le pick up' +
                    ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
                  this.snackBar.open( msg, 'Fermer', {duration: 8000, });
                  this.playFailureAudio();
                  obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin, new Date(), 'Ajout dans l\'inventaire: ' + this.inventaire.ref,
                    'Exception : ' + msg));
                  this.tripService.updateOneTrip(obj).subscribe();
                  this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                    const admin = resUser.json();
                    this.conflictService.create(new Conflit(null,obj.idTrip,new Date(),this.user.name,admin.entrepot,msg,'Inventaire',
                      this.inventaire.ref)).subscribe();
                  });
                });
              } else {
                if (obj.statusTrip === 'Chez Livreur' || obj.statusTrip === 'Retour' ) {
                  this.ListScanInventaire.push(obj);
                  obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin, new Date(), 'Ajout dans l\'inventaire: ' + this.inventaire.ref,
                    'Success'));
                  this.playSuccessAudio();
                  this.tripService.updateOneTrip(obj).subscribe();
                  const index = this.listColisNonTreated.indexOf(obj);
                  this.listColisNonTreated = this.listColisNonTreated.filter((trip) => trip.idTrip !== obj.idTrip);
                  this.inventaire.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
                  this.inventaire.listColisSuccess.push(new ColisSuccessRunsheet(obj.idTrip, this.user.idAdmin, new Date(), false));
                  this.inventaireService.update(this.inventaire).subscribe((res) => {
                    this.inventaire = res.body;
                  });
                } else {
                  const msg = 'Le colis scanné doit être dans l\'entrepot ! Etat de colis scanné : ' + obj.statusTrip;
                  this.snackBar.open(msg, 'Fermer', {
                    duration: 8000,
                  });
                  this.playFailureAudio();
                  obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin, new Date(), 'Ajout dans l\'inventaire: ' + this.inventaire.ref,
                    'Exception : ' + msg));
                  this.tripService.updateOneTrip(obj).subscribe();
                  this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                    const admin = resUser.json();
                    this.conflictService.create(new Conflit(null,obj.idTrip,new Date(),this.user.name,admin.entrepot,msg,'Inventaire',
                      this.inventaire.ref)).subscribe();
                  });
                }
              }
            }
            else {
              const msg = 'Entrepot invalide ! Entrepot de colis scanné : ' + obj.entrepot.nom;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin, new Date(), 'Ajout dans l\'inventaire: ' + this.inventaire.ref,
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                this.conflictService.create(new Conflit(null,obj.idTrip,new Date(),this.user.name,admin.entrepot,msg,'Inventaire',
                  this.inventaire.ref)).subscribe();
              });
            }
          }else {
            const msg = 'Le colis scanné n\'a pas d\'entrepot, état de colis scanné: ' + obj.statusTrip;
            this.snackBar.open(msg, 'Fermer', {
              duration: 8000,});
            this.playFailureAudio();
            obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin, new Date(), 'Ajout dans l\'inventaire: ' + this.inventaire.ref,
              'Exception : ' + msg));
            this.tripService.updateOneTrip(obj).subscribe();
            this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
              const admin = resUser.json();
              this.conflictService.create(new Conflit(null,obj.idTrip,new Date(),this.user.name,admin.entrepot,msg,'Inventaire',
                this.inventaire.ref)).subscribe();
            });
          }
        } else {
          this.snackBar.open('Ce colis a été scanné', 'Fermer', {
            duration: 8000,
          });
          this.playFailureAudio();
        }
      });
    } else {
      this.snackBar.open('Ce colis a été scanné', 'Fermer', {
        duration: 8000,
      });
      this.playFailureAudio();
    }
    this.searchtermInventaire = '';
    this.ListScanInventaireNB = this.ListScanInventaire.length + 1;
  }

  deleteScanListInventaire(trip) {
    for (let i = 0; i < this.ListScanInventaire.length; i++) {
      if (trip.idTrip === this.ListScanInventaire[i].idTrip) {
        this.ListScanInventaire.splice(i, 1);
      }
    }
    this.listColisNonTreated.push(trip);
    this.inventaire.listColisNonTreated.push(trip.idTrip);
    this.ListScanInventaireNB = this.ListScanInventaire.length;
    const colisToDelete = this.inventaire.listColisSuccess.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.inventaire.listColisSuccess.indexOf(colisToDelete);
    this.inventaire.listColisSuccess[index].removed = true;
    this.inventaire.listColisSuccess[index].removedBy =  this.user.idAdmin;
    this.inventaire.listColisSuccess[index].removedDate =  new Date() ;
    this.inventaireService.update(this.inventaire).subscribe((resInventaire) => {
      this.inventaire = resInventaire.body;
    });
  }



  createDraftInventaire() {
    const draftInventaire: Inventaire = {
      ...new Inventaire(), status: 'draft', createdDate: new Date(), createdBy: this.user.idAdmin,
      listColisSuccess: [], listColisNonTreated: [], createdByName: this.user.name};
    this.inventaireService.query().subscribe((resInventaire) => {
      const inventaires = resInventaire.body.filter((inventaire) => ((inventaire.deleted === false) && (inventaire.status === 'draft' || inventaire.status === 'confirmed')));
      const userInventaire = inventaires.filter((inventaire) => (inventaire.createdBy === this.user.idAdmin) && inventaire.deleted === false && inventaire.status === 'draft')
      if (userInventaire.length > 0){
        this.snackBar.open('Vous avez  déja un inventaire à l\'état " draft ": ', 'Fermer', {
          duration: 8000,
        });
        this.router.navigate(['/inventaire']);
        return;
      }else{
        this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
          const admin = resUser.json();
          draftInventaire.entrepot = admin.entrepot;
          this.inventaireService.create(draftInventaire).subscribe((res) => {
            this.inventaire = res.body;
            this.getEntrepotTrips();
          });
        });
      }
    });
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length;

  }



  calculateDiff(data) {
    const date = new Date(data);
    const currentDate = new Date();
    const days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  open(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }
  playSuccessAudio(){
    const audio = new Audio();
    audio.src = '../../../../assets/audio/zapsplat_public_places_supermarket_checkout_beep_002_44357.wav';
    audio.load();
    audio.play();
  }
  playFailureAudio(){
    const audio = new Audio();
    audio.src = '../../../../assets/audio/zapsplat_multimedia_game_sound_error_incorrect_001_30721.wav';
    audio.load();
    audio.play();
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  private getEditInventaire(inventaireToEdit: Inventaire) {
    this.inventaire = inventaireToEdit;
    const listOfTripsSuccessId: string[] = this.inventaire.listColisSuccess.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
    this.tripService.getListOfTips(listOfTripsSuccessId).subscribe((resTrip) => {
      this.ListScanInventaire = resTrip.body;
    });
    this.tripService.getListOfTips(this.inventaire.listColisNonTreated).subscribe((resTrip) => {
      this.listColisNonTreated = resTrip.body;
    });
  }



  conirmeActivite(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
          const listConflits: Conflit[] = [];
          this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
            const admin = resUser.json();
            this.listColisNonTreated.forEach((trip) => {
              listConflits.push(new Conflit(null,trip.idTrip,new Date(),this.user.name,admin.entrepot,
                'colis non traité dans l\'inventaire','Inventaire - Non Treated', this.inventaire.ref));
            });
            if (listConflits.length > 0){
              this.conflictService.createList(listConflits).subscribe(() => {
                this.inventaire.status = 'confirmed';
                this.inventaire.confirmedBy = this.user.idAdmin;
                this.inventaire.confirmedDate = new Date();
                this.inventaireService.update(this.inventaire).subscribe(() => {
                  this.openCheckSuccess('inventaireConfirmed');
                });
                });
            } else {
              this.inventaire.status = 'confirmed';
              this.inventaire.confirmedBy = this.user.idAdmin;
              this.inventaire.confirmedDate = new Date();
              this.inventaireService.update(this.inventaire).subscribe(() => {
                this.openCheckSuccess('inventaireConfirmed');
              });
            }
        });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  openCheckSuccess(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.router.navigate(['/inventaire/']);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }



}
@Component({
  selector: 'confirm-inventaire-modal',
  templateUrl: './confirm-inventaire-modal.html',
  styleUrls: ['./create-inventaire.component.scss']

})
export class NgbdModalConfirmInventaire implements OnInit {

  checked = false;
  driver: any;

  constructor(public modal: NgbActiveModal, public activityRunsheetService: ActivityRunsheetService) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modal.close('Ok click');
  }
}

@Component({
  selector: 'inventaire-confirmed-modal',
  templateUrl: './inventaire-confirmed-modal.html',
  styleUrls: ['./create-inventaire.component.scss']

})
export class NgbdModalInventaireConfirmed implements OnInit {

  checked = true;
  driver: any;

  constructor(public modal: NgbActiveModal, public activityRunsheetService: ActivityRunsheetService) {
  }

  ngOnInit() {
    this.closeModal();
    setTimeout(() => {
      new checkSuccess();
    }, 1000);
  }


  closeModal() {
    setTimeout(() => {
      this.modal.close('Ok click');
    }, 1000);

  }
}
const MODALS: { [name: string]: Type<any> } = {
  confirmInventaire: NgbdModalConfirmInventaire,
  inventaireConfirmed: NgbdModalInventaireConfirmed,
};
