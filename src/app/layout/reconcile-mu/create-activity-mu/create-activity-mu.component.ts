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
import {
  NgbdModalConfirmLivree,
  NgbdModalConfirmNonLivree, NgbdModalConfirmReturned
} from '../../reconcile-runsheet/create-activity-runsheet/create-activity-runsheet.component';
import {MoveableUnit} from '../../../model/moveable-unit.model';
import {ActivityMu} from '../../../model/activity-mu.model';
import {ActivityMoveableUnitInfo} from '../reconcile-mu.component';
import {InProgressMoveableUnit} from '../../mu-in-progress/mu-in-progress.component';
import {ActivityMuService} from '../activity-moveable-unit.service';
import {ConflitService} from '../../conflict-trips/conflit.service';
import {Conflit} from '../../../model/conflit.model';
import {MoveableUnitService} from '../../moveable-unit/moveable-unit.service';
import {HistoriqueScan} from '../../../model/historique-scan.model';

@Component({
  selector: 'app-create-activity-mu',
  templateUrl: './create-activity-mu.component.html',
  styleUrls: ['./create-activity-mu.component.scss']
})
export class CreateActivityMuComponent implements OnInit, AfterViewInit {


  date = new Date();
  activityMoveableUnit: ActivityMu;
  activityMoveableUnitInfo: ActivityMoveableUnitInfo;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  searchTermScanMu: any;
  spinner = false;
  moveableUnits: MoveableUnit[] = [];
  inProgressMoveableUnits: InProgressMoveableUnit[] = [];
  closedMoveableUnits: InProgressMoveableUnit[] = [];
  closeResult: string;
  selectedInProgressTrips: Trip[] = [];
  @ViewChild('stepper') private myStepper: MatStepper;
  user: any;
  driver: any;
  listColisNonTreated: Trip[] = [];
  ListScanMoveableUnit: Trip[] = [];
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
  private trips: Trip[] = [];
  listConflit: Conflit[] = [];
  private ListScanMoveableUnitNB: any;
  private muStepper = false;
  actions = ['lost', 'non expédié', 'damaged'];
   listSurvey: Trip[] = [];


  constructor(private activityMoveableUnitService: ActivityMuService, private _formBuilder: FormBuilder, private tripService: TripService,
              private modalService: NgbModal, private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder,
              private ramassageService: RamassageService, private userService: UserService, private conflitService: ConflitService, private moveableUnitService: MoveableUnitService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityMoveableUnitInfo = this.activityMoveableUnitService.activityMoveableUnitInfo;
    if (!this.activityMoveableUnitInfo) {
      this.router.navigate(['/reconcile-mu']);
      return;
    }
    if (!!this.activityMoveableUnitService.activityToEdit) {
      // IF EDIT
      this.getEditActivities(this.activityMoveableUnitService.activityToEdit);
      this.getMoveableUnits();
    } else {
      // IF CREATE
      this.createDraftActivity();
    }
    // setTimeout(()=>{
    // },5000)

  }

  ngAfterViewInit() {
    this.myStepper.selectionChange
      .pipe(pluck('selectedIndex'))
      .subscribe((res: number) => {
        if (res === 0) {
          this.muStepper = false;
          this.firstStep = true;
          this.finalStep = false;
        } else if (res === 1) {
          this.muStepper = true;
          this.firstStep = false;
          this.finalStep = false;
        } else if (res === 3) {
          //
          this.firstStep = false;
          this.muStepper = false;
          this.finalStep = false;
          if (this.activityMoveableUnit.status === 'confirmed') {
            this.firstStep = false;
            this.muStepper = false;
            this.finalStep = true;
            this.valeurDepense = parseFloat(this.activityMoveableUnit.depenses.autreValue) + parseFloat(this.activityMoveableUnit.depenses.avance) + parseFloat(this.activityMoveableUnit.depenses.carteTel) + parseFloat(this.activityMoveableUnit.depenses.gasoilCarteValue) + parseFloat(this.activityMoveableUnit.depenses.gasoilEspece);
            this.valeurColis = this.activityMoveableUnit.sommeColis;
          }
          this.activityMoveableUnit.argentRecolte = this.valeurColis - this.valeurDepense;
        } else if (res === 4) {
          this.firstStep = false;
          this.muStepper = false;
          this.finalStep = true;
          this.calculeDepenses();
          this.calculeValeurColis();
        } else {
          this.firstStep = false;
          this.muStepper = false;
          this.finalStep = false;
        }
      });
  }

  getMoveableUnits() {
    this.spinner = true;
    this.activityMoveableUnit.listMoveableUnits.forEach((moveableUnit) => {
      if (moveableUnit.status === 'closed') {
        const list = moveableUnit.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) && colis.treated === false)
          .map((colis) => colis.idTrip);
        this.tripService.getListOfTips(list).subscribe((resTrips) => {
          const trips = resTrips.body;
          this.closedMoveableUnits.push({moveableUnitObject: moveableUnit, nbTreatedTrips: trips.length});
        });
      }
    });
    if (!!this.activityMoveableUnitInfo) {
      if (!!this.activityMoveableUnitInfo.moveableUnits) {
        this.moveableUnits = this.activityMoveableUnitInfo.moveableUnits;
        if (this.moveableUnits.length === 0) {
          this.spinner = false;
          return;
        }
        this.moveableUnits.forEach((moveableUnit) => {
          const list = moveableUnit.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) )
            .map((colis) => colis.idTrip);
          this.tripService.getListOfTips(list).subscribe((resTrips) => {
            const trips = resTrips.body;
            trips.forEach((trip) => {
              this.trips.push(trip);
            });
          });
        });
        this.moveableUnits.forEach((moveableUnit) => {
          const list = moveableUnit.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) && colis.treated === false)
            .map((colis) => colis.idTrip);
          this.tripService.getListOfTips(list).subscribe((resTrips) => {
            const trips = resTrips.body;
            if (!this.activityMoveableUnitService.activityToEdit) {
              // IF CREATE
              trips.forEach((trip) => {
                this.listColisNonTreated.push(trip);
                this.allTrips.push(trip);
              });
              this.activityMoveableUnit.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityMoveableUnitService.update(this.activityMoveableUnit).subscribe();
            } else {
              // IF EDIT
              trips.forEach((trip) => {
                this.allTrips.push(trip);
              });
            }
            this.inProgressMoveableUnits.push({moveableUnitObject: moveableUnit, nbTreatedTrips: trips.length});
            this.spinner = false;
          });
        });
      } else {
        this.spinner = false;
      }
    }
  }



  scanListMu() {
    // console.log("sanc: ",this.searchTermscan)
    // vérif
    let verif = false;
    for (let index = 0; index < this.ListScanMoveableUnit.length; index++) {
      if (this.searchTermScanMu === this.ListScanMoveableUnit[index].idTrip || this.searchTermScanMu === this.ListScanMoveableUnit[index].refTrip) {
        verif = true;
      }
    }
    //
    if (verif === false) {
      this.tripService.getTripscanListById(this.searchTermScanMu).subscribe(data => {
        const obj = data.body;
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScanMoveableUnit.length; index++) {
          if (obj.idTrip === this.ListScanMoveableUnit[index].idTrip || obj.refTrip === this.ListScanMoveableUnit[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if ((obj.currentMUId !== null) && (obj.currentMUId !== 'null')) {
            if (obj.driverTrip.idDriver !== 'DT' + this.activityMoveableUnit.driver.idDriver) {
              const msg = 'le colis n\'appartient pas au livreur. Livreur de colis scanné: ' +
                obj.driverTrip.nameDriver + ' ' + obj.driverTrip.surnameDriver;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity M.U: ' + this.activityMoveableUnit.ref,
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity M.U',  this.activityMoveableUnit.ref);
                this.conflitService.create(conflit).subscribe();
              });
              return;
            }
            if(!!obj.survey){
              const msg = 'une enquête est en cours conçernant ce colis !';
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity M.U: ' + this.activityMoveableUnit.ref,
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity M.U',  this.activityMoveableUnit.ref);
                this.conflitService.create(conflit).subscribe();
              });
              return;
            }
            if (obj.statusTrip === 'transit livraison' || 'transit retour') {
              this.playSuccessAudio();
              this.ListScanMoveableUnit.push(obj);
              const index = this.listColisNonTreated.indexOf(obj);
              this.listColisNonTreated = this.listColisNonTreated.filter((trip) => trip.idTrip !== obj.idTrip);
              this.activityMoveableUnit.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityMoveableUnit.listColisSuccess.push(new ColisSuccessRunsheet(obj.idTrip, this.user.idAdmin, new Date(), false));
              this.activityMoveableUnitService.update(this.activityMoveableUnit).subscribe((res) => {
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity M.U: ' + this.activityMoveableUnit.ref,
                'Success'));
              this.tripService.updateOneTrip(obj).subscribe();
            } else {
              const msg = 'L\'état de colis doit être " transit " ! Etat de colis scanné : ' + obj.statusTrip;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity M.U: ' + this.activityMoveableUnit.ref,
                'Exception : ' + msg));
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity M.U',  this.activityMoveableUnit.ref);
                this.conflitService.create(conflit).subscribe();
              });
            }
          } else {
            // Force pick up
            const msg = 'impossible de scanner le colis! Ce colis n\'existe pas dans un M.U en cours. Etat de colis scanné : ' + obj.statusTrip;
            this.snackBar.open(msg, 'Fermer', {
              duration: 8000,
            });
            this.playFailureAudio();
            obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity M.U: ' + this.activityMoveableUnit.ref,
              'Exception : ' + msg));
            this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
              const admin = resUser.json();
              const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity M.U',  this.activityMoveableUnit.ref);
              this.conflitService.create(conflit).subscribe();
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
    this.searchTermScanMu = '';
    this.ListScanMoveableUnitNB = this.ListScanMoveableUnit.length + 1;
  }

  deleteScanListPickUp(trip) {
    for (let i = 0; i < this.ListScanMoveableUnit.length; i++) {
      if (trip.idTrip === this.ListScanMoveableUnit[i].idTrip) {
        this.ListScanMoveableUnit.splice(i, 1);
      }
    }
    this.listColisNonTreated.push(trip);
    this.activityMoveableUnit.listColisNonTreated.push(trip.idTrip);
    this.ListScanMoveableUnitNB = this.ListScanMoveableUnit.length;
    const colisToDelete = this.activityMoveableUnit.listColisSuccess.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.activityMoveableUnit.listColisSuccess.indexOf(colisToDelete);
    this.activityMoveableUnit.listColisSuccess[index].removed = true;
    this.activityMoveableUnit.listColisSuccess[index].removedBy =  this.user.idAdmin;
    this.activityMoveableUnit.listColisSuccess[index].removedDate =  new Date() ;
    this.activityMoveableUnitService.update(this.activityMoveableUnit).subscribe();
  }



  createDraftActivity() {
    const draftActivity: ActivityMu = {
      ...new ActivityMu(), status: 'draft', createdDate: new Date(), createdBy: this.user.idAdmin, driver: this.activityMoveableUnitInfo.driver,
      listMoveableUnits: this.activityMoveableUnitInfo.moveableUnits, listColisSuccess: [], listColisNonTreated: []};
    this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
      const admin = resUser.json();
      draftActivity.entrepot = admin.entrepot;
      this.activityMoveableUnitService.create(draftActivity).subscribe((res) => {
        this.activityMoveableUnit = res.body;
        this.getMoveableUnits();
      });
    });
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length;

  }

  calculeValeurColis() {
    if (this.activityMoveableUnit.status === 'draft') {
      let somme = 0;
      this.ListScanMoveableUnit.forEach((trip) => {
        if (trip.statusTrip === 'livree') {
          somme = somme + parseFloat(trip.packageTrip.valPackage);
        }
      });
      this.valeurColis = somme;
      this.activityMoveableUnit.sommeColis = this.valeurColis;
    } else {
      this.valeurColis = this.activityMoveableUnit.sommeColis;
    }

  }

  calculeDepenses() {
    if (this.activityMoveableUnit.status === 'draft') {
      const gasoilEspece = (!!this.depenseForme.get(['gasoilEspece'])!.value) ? this.depenseForme.get(['gasoilEspece'])!.value : 0;
      const gasoilCarteValue = (!!this.depenseForme.get(['gasoilCarteValue'])!.value) ? this.depenseForme.get(['gasoilCarteValue'])!.value : 0;
      const carteTel = (!!this.depenseForme.get(['carteTel'])!.value) ? this.depenseForme.get(['carteTel'])!.value : 0;
      const avance = (!!this.depenseForme.get(['avance'])!.value) ? this.depenseForme.get(['avance'])!.value : 0;
      const autreValue = (!!this.depenseForme.get(['autreValue'])!.value) ? this.depenseForme.get(['autreValue'])!.value : 0;
      const gasoilCarteNumber = (!!this.depenseForme.get(['gasoilCarteNumber'])!.value) ? this.depenseForme.get(['gasoilCarteNumber'])!.value : null;
      const autreDesc = (!!this.depenseForme.get(['autreDesc'])!.value) ? this.depenseForme.get(['autreDesc'])!.value : null;
      const activityDepenses = new DepenseActivity(gasoilEspece + '', gasoilCarteNumber + '', gasoilCarteValue + '', carteTel + '', avance + '', autreDesc + '', autreValue + '');
      this.valeurDepense = gasoilEspece + gasoilCarteValue + carteTel + avance + autreValue;
      this.activityMoveableUnit.depenses = activityDepenses;
    } else {
      this.valeurDepense = parseFloat(this.activityMoveableUnit.depenses.autreValue) + parseFloat(this.activityMoveableUnit.depenses.avance) + parseFloat(this.activityMoveableUnit.depenses.carteTel) + parseFloat(this.activityMoveableUnit.depenses.gasoilCarteValue) + parseFloat(this.activityMoveableUnit.depenses.gasoilEspece);
    }


  }

  showInProgressTrips(item: InProgressMoveableUnit, content: any) {
    const list = item.moveableUnitObject.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
    this.tripService.getListOfTips(list).subscribe((resTrips) => {
      this.selectedInProgressTrips = resTrips.body;
      this.open(content);
    });
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

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  private getEditActivities(activityToEdit: ActivityMu) {
    this.activityMoveableUnit = activityToEdit;
    this.activityMoveableUnitInfo = {moveableUnits: activityToEdit.listMoveableUnits, driver: activityToEdit.driver};

    const listOfIdsPickUp: string[] = this.activityMoveableUnit.listColisSuccess.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
    this.tripService.getListOfTips(listOfIdsPickUp).subscribe((resTrip) => {
      this.ListScanMoveableUnit = resTrip.body;
    });
    this.tripService.getListOfTips(this.activityMoveableUnit.listColisNonTreated).subscribe((resTrip) => {
      this.listColisNonTreated = resTrip.body;
    });
  }



  conirmeActivite(name: string) {
    this.activityMoveableUnitService.activityMoveableUnitInfo = {driver: this.activityMoveableUnit.driver, moveableUnits : []};
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      let listToUpdateChezLivreur = this.ListScanMoveableUnit.map((trp) => trp.idTrip);
      const listTreatedTripsIds = this.ListScanMoveableUnit.map((trp) => trp.idTrip);
      const listConflitTripsIds = this.listConflit.map((conflit) => conflit.colisId);
      this.tripService.getListOfTips(listConflitTripsIds).subscribe((resTripsConflit) =>{
        const surveyTrips: Trip[] =  [];
        resTripsConflit.body.forEach((trip) => {
          trip.survey = true;
          surveyTrips.push(trip);
        });
        this.tripService.updateListOfTips(surveyTrips).subscribe();
      });
      const moveableUnitsToUpdate = this.activityMoveableUnit.listMoveableUnits;
      const newMoveableUnits: MoveableUnit[] = [];
      moveableUnitsToUpdate.forEach((moveableUnit) => {
        const MoveableUnitToPush = moveableUnit;
        MoveableUnitToPush.listColis = moveableUnit.listColis.map((colis) => {
          if (listTreatedTripsIds.indexOf(colis.idTrip) >= 0 && colis.removed === false) {
            colis.treated = true;
            return colis;
          } else {
            if (listConflitTripsIds.indexOf(colis.idTrip) >= 0 && colis.removed === false) {
              colis.survey = true;
              return colis;
            } else {
              return colis;
            }
          }
        });
        newMoveableUnits.push(MoveableUnitToPush);
      });
      newMoveableUnits.forEach((moveableUnit, index) => {
        const treatedNumber = moveableUnit.listColis.filter((colis) => colis.treated === true && colis.removed === false).length;
        if (treatedNumber === moveableUnit.listColis.filter((colis) => colis.removed === false).length) {
          moveableUnit.status = 'closed';
          moveableUnit.closedBy = this.user.idAdmin;
          moveableUnit.closedDate = new Date();
          newMoveableUnits[index] = moveableUnit;
        }
      });
      this.moveableUnitService.updateList(newMoveableUnits).subscribe((res) => {
        this.activityMoveableUnit.listMoveableUnits = res.body;
        this.activityMoveableUnit.status = 'confirmed';
        this.activityMoveableUnit.confirmedBy = this.user.idAdmin;
        this.activityMoveableUnit.confirmedDate = new Date();
          this.tripService.updateTripsWhenDeleteMU(listTreatedTripsIds).subscribe(() => {
            this.tripService.getListOfTips(listToUpdateChezLivreur).subscribe((resTrips) => {
              let trips = resTrips.body;
              trips = trips.map((trip) => {
                trip.entrepot = this.activityMoveableUnit.entrepot;
                return trip;
              });
              this.tripService.updateListOfTips(trips).subscribe((resUpdatedTrips) => {
                listToUpdateChezLivreur = resUpdatedTrips.body.map((trip) => trip.idTrip);
                const transitLivraison =  resUpdatedTrips.body.filter( trip => trip.statusTrip === 'transit livraison').map((trip) => trip.idTrip);
                const transitRetour =  resUpdatedTrips.body.filter( trip => trip.statusTrip === 'transit retour').map((trip) => trip.idTrip);
                this.activityMoveableUnit.nbColisAlivree = transitLivraison.length;
                this.activityMoveableUnit.nbColisRetour = transitRetour.length;
                this.tripService.updateTripsStatus('Chez Livreur', transitLivraison, this.user.name, 'EntrepotGafsa').subscribe(() => {
                  this.tripService.updateTripsStatus('Retour', transitRetour, this.user.name, 'EntrepotGafsa').subscribe(() => {
                    this.conflitService.createList(this.listConflit).subscribe(() => {
                      // make conflict trips treated
                      this.activityMoveableUnitService.update(this.activityMoveableUnit).subscribe(() => {
                        this.openCheckSuccess('activityConfirmed'); });
                    });
                  });
                });
              });
            });
        });
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  openCheckSuccess(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.router.navigate(['/reconcile-mu/']);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  inNonTreatedList(trip: Trip) {
    const listNontreated = [];
    this.activityMoveableUnit.listMoveableUnits.forEach((moveableUnit) => {
      moveableUnit.listColis.forEach((colis) => {
        if (colis.treated === false && colis.removed === false) {
          listNontreated.push(colis.idTrip);
        }
      });
    });
    if (listNontreated.indexOf(trip.idTrip) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  affectActionToConflictTrip(value: any, trp: Trip) {
    if (value === null || value === undefined) {
      this.listConflit = this.listConflit.filter((conflit) => conflit.colisId !== trp.idTrip);
    } else if (value === 'non expédié') {
      this.listConflit = this.listConflit.filter((item) => item.colisId !== trp.idTrip);
      const conflit = new Conflit(null, trp.idTrip, new Date, this.user.idAdmin, trp.entrepot, value, 'Reconcile M.U - Non Expédié',  this.activityMoveableUnit.ref);
      this.listConflit.push(conflit);
    } else if (value === 'lost') {
      this.listConflit = this.listConflit.filter((item) => item.colisId !== trp.idTrip);
      const conflit = new Conflit(null, trp.idTrip, new Date, this.user.idAdmin, this.activityMoveableUnit.entrepot, value, 'Reconcile M.U - Lost', this.activityMoveableUnit.ref, false, null, null);
      this.listConflit.push(conflit);
    } else if (value === 'damaged') {
      this.listConflit = this.listConflit.filter((item) => item.colisId !== trp.idTrip);
      const conflit = new Conflit(null, trp.idTrip, new Date, this.user.idAdmin, this.activityMoveableUnit.entrepot, value, 'Reconcile M.U - Damaged', this.activityMoveableUnit.ref, false, null, null);
      this.listConflit.push(conflit);
    }
  }
  playSuccessAudio() {
    const audio = new Audio();
    audio.src = '../../../../assets/audio/zapsplat_public_places_supermarket_checkout_beep_002_44357.wav';
    audio.load();
    audio.play();
  }
  playFailureAudio() {
    const audio = new Audio();
    audio.src = '../../../../assets/audio/zapsplat_multimedia_game_sound_error_incorrect_001_30721.wav';
    audio.load();
    audio.play();
  }
  addToSurveyList(trip: Trip){
    const index = this.listColisNonTreated.indexOf(trip);
    if (index >= 0 ){
      this.listColisNonTreated = this.listColisNonTreated.filter((tripMap) => tripMap.idTrip !== tripMap.idTrip);
      this.listSurvey.push(trip);
    }

  }
  removeFromSurveyList(trip: Trip){
    const index = this.listSurvey.indexOf(trip);
    if (index >= 0 ){
      this.listSurvey = this.listSurvey.filter((tripMap) => tripMap.idTrip !== tripMap.idTrip);
      this.listColisNonTreated.push(trip);
    }
  }
}
@Component({
  selector: 'confirm-activity-mu-modal',
  templateUrl: './confirm-activity-mu-modal.html',
  styleUrls: ['./create-activity-mu.component.scss']

})
  export class NgbdModalConfirmActivityMu implements OnInit {

  checked = false;
  driver: any;

  constructor(private modal: NgbActiveModal, private activityMoveableUnitService: ActivityMuService) {
  }

  ngOnInit() {
    this.driver = this.activityMoveableUnitService.activityMoveableUnitInfo.driver;
  }

  closeModal() {
    this.modal.close('Ok click');
  }
}

@Component({
  selector: 'activity-mu-confirmed-modal',
  templateUrl: './activity-mu-confirmed-modal.html',
  styleUrls: ['./create-activity-mu.component.scss']

})
export class NgbdModalActivityMuConfirmed implements OnInit {

  checked = true;
  driver: any;

  constructor(private modal: NgbActiveModal, private activityMoveableUnitService: ActivityMuService) {
  }

  ngOnInit() {
    this.driver = this.activityMoveableUnitService.activityMoveableUnitInfo.driver;
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
  forceFailure: NgbdModalConfirmNonLivree,
  forceSuccess: NgbdModalConfirmLivree,
  confirmActivity: NgbdModalConfirmActivityMu,
  activityConfirmed: NgbdModalActivityMuConfirmed,
  forceReturned: NgbdModalConfirmReturned
};
