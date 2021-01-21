import {AfterViewInit, Component, OnInit, Type, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Trip} from '../../trips/Trip';
import {MatSnackBar, MatStepper} from '@angular/material';
import {ActivityRunsheetService} from '../../reconcile-runsheet/activity-runsheet.service';
import {TripService} from '../../trips/trips.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {RamassageService} from '../../ramassage/ramassage.service';
import {UserService} from '../../users/users.service';
import {pluck} from 'rxjs/operators';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {ColisSuccessRunsheet} from '../../../model/colis-success-runsheet.model';
import {DepenseActivity} from '../../../model/depense-activity.model';
import {ActivityPickUpInfo} from '../reconcile-pick-up.component';
import {InProgressPickUp} from '../../ramassage-in-progress/ramassage-in-progress.component';
import {ActivityPickUpService} from '../activity-pick-up.service';
import {PickUp} from '../../../model/pickup.model';
import {ActivityPickUp} from '../../../model/activity-pickUp.model';
import {
  NgbdModalConfirmLivree,
  NgbdModalConfirmNonLivree, NgbdModalConfirmReturned
} from '../../reconcile-runsheet/create-activity-runsheet/create-activity-runsheet.component';
import {HistoriqueScan} from '../../../model/historique-scan.model';
import {Conflit} from '../../../model/conflit.model';
import {ConflitService} from '../../conflict-trips/conflit.service';

@Component({
  selector: 'app-create-activity-pick-up',
  templateUrl: './create-activity-pick-up.component.html',
  styleUrls: ['./create-activity-pick-up.component.scss']
})
export class CreateActivityPickUpComponent implements OnInit, AfterViewInit {

  date = new Date();
  activityPickUp: ActivityPickUp;
  activityPickUpInfo: ActivityPickUpInfo;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  searchTermScanPickUp: any;
  spinner = false;
  pickUps: PickUp[] = [];
  inProgressPickUps: InProgressPickUp[] = [];
  closedPickUps: InProgressPickUp[] = [];
  closeResult: string;
  selectedInProgressTrips: Trip[] = [];
  @ViewChild('stepper') private myStepper: MatStepper;
  user: any;
  driver: any;
  listColisNonTreated: Trip[] = [];
  ListScanPickUp: Trip[] = [];
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
  ListScanPickUpNB: any;
  pickUpStepper = false;
  listConflit: Conflit[] = [];
  actions = ['lost', 'non expédié', 'damaged'];


  constructor(private activityPickUpService: ActivityPickUpService, private _formBuilder: FormBuilder, private tripService: TripService,
              private modalService: NgbModal, private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder,
              private ramassageService: RamassageService, private userService: UserService, private activityRunsheetService: ActivityRunsheetService,
              private conflitService: ConflitService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityPickUpInfo = this.activityPickUpService.activityPickUpInfo;
    if (!this.activityPickUpInfo) {
      this.router.navigate(['/reconcile-pickUp']);
      return;
    }
    if (!!this.activityPickUpService.activityToEdit) {
      // IF EDIT
      this.getEditActivities(this.activityPickUpService.activityToEdit);
      this.getPickUps();
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
          this.pickUpStepper = false;
          this.firstStep = true;
          this.finalStep = false;
        } else if (res === 1) {
          this.pickUpStepper = true;
          this.firstStep = false;
          this.finalStep = false;
        } else if (res === 3) {
          //
          this.firstStep = false;
          this.pickUpStepper = false;
          this.finalStep = false;
          if (this.activityPickUp.status === 'confirmed') {
            this.firstStep = false;
            this.pickUpStepper = false;
            this.finalStep = true;
            this.valeurDepense = parseFloat(this.activityPickUp.depenses.autreValue) + parseFloat(this.activityPickUp.depenses.avance) + parseFloat(this.activityPickUp.depenses.carteTel) + parseFloat(this.activityPickUp.depenses.gasoilCarteValue) + parseFloat(this.activityPickUp.depenses.gasoilEspece);
            this.valeurColis = this.activityPickUp.sommeColis;
          }
          this.activityPickUp.argentRecolte = this.valeurColis - this.valeurDepense;
        } else if (res === 4) {
          this.firstStep = false;
          this.pickUpStepper = false;
          this.finalStep = true;
          this.calculeDepenses();
          this.calculeValeurColis();
        } else {
          this.firstStep = false;
          this.pickUpStepper = false;
          this.finalStep = false;
        }
      });
  }

  getPickUps() {
    this.spinner = true;
    this.activityPickUp.listPickUps.forEach((pickUp) => {
      if (pickUp.status === 'closed') {
        const list = pickUp.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) && colis.treated === false)
          .map((colis) => colis.idTrip);
        this.tripService.getListOfTips(list).subscribe((resTrips) => {
          const trips = resTrips.body;
          this.closedPickUps.push({pickUpObject: pickUp, nbTreatedTrips: trips.length});
        });
      }
    });
    if (!!this.activityPickUpInfo) {
      if (!!this.activityPickUpInfo.pickUps) {
        this.pickUps = this.activityPickUpInfo.pickUps;
        if (this.pickUps.length === 0) {
          this.spinner = false;
          return;
        }
        this.pickUps.forEach((pickUp) => {
          const list = pickUp.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) )
            .map((colis) => colis.idTrip);
          this.tripService.getListOfTips(list).subscribe((resTrips) => {
            const trips = resTrips.body;
            trips.forEach((trip) => {
              this.trips.push(trip);
            });
          });
        });
        this.pickUps.forEach((pickUp) => {
          const list = pickUp.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) && colis.treated === false)
            .map((colis) => colis.idTrip);
          this.tripService.getListOfTips(list).subscribe((resTrips) => {
            const trips = resTrips.body;
            if (!this.activityPickUpService.activityToEdit) {
              // IF CREATE
              trips.forEach((trip) => {
                this.listColisNonTreated.push(trip);
                this.allTrips.push(trip);
              });
              this.activityPickUp.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityPickUpService.update(this.activityPickUp).subscribe();
            } else {
              // IF EDIT
              trips.forEach((trip) => {
                this.allTrips.push(trip);
              });
            }
            this.inProgressPickUps.push({pickUpObject: pickUp, nbTreatedTrips: trips.length});
            this.spinner = false;
          });
        });
      } else {
        this.spinner = false;
      }
    }
  }



  scanListPickUp() {
    // console.log("sanc: ",this.searchTermscan)
    // vérif
    let verif = false;
    for (let index = 0; index < this.ListScanPickUp.length; index++) {
      if (this.searchTermScanPickUp === this.ListScanPickUp[index].idTrip || this.searchTermScanPickUp === this.ListScanPickUp[index].refTrip) {
        verif = true;
      }
    }
    //
    if (verif === false) {
      this.tripService.getTripscanListById(this.searchTermScanPickUp).subscribe(data => {
        const obj = data.body;
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScanPickUp.length; index++) {
          if (obj.idTrip === this.ListScanPickUp[index].idTrip || obj.refTrip === this.ListScanPickUp[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if ((obj.currentPickUpId !== null) && (obj.currentPickUpId !== 'null')) {
            if(!obj.driverTrip){
              this.ramassageService.find(obj.currentPickUpId).subscribe((resPickUP) => {
                const msg = 'le colis n\'appartient pas au livreur. colis scanné dans le pickUp de REF: ' +
                  resPickUP.body.ref;
                this.snackBar.open(msg, 'Fermer', {
                  duration: 8000,
                });
                this.playFailureAudio();
                this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                  const admin = resUser.json();
                  const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Pick Up',  this.activityPickUp.ref);
                  this.conflitService.create(conflit).subscribe();
                });
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Pick Up: ' + this.activityPickUp.ref,
                  'Exception : ' + msg));
                this.tripService.updateOneTrip(obj).subscribe();
              });
              return;
            }
            if (obj.driverTrip.idDriver !== 'DT' + this.activityPickUp.driver.idDriver) {
              const msg = 'le colis n\'appartient pas au livreur. Livreur de colis scanné: ' +
                obj.driverTrip.nameDriver + ' ' + obj.driverTrip.surnameDriver;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Pick Up',  this.activityPickUp.ref);
                this.conflitService.create(conflit).subscribe();
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Pick Up: ' + this.activityPickUp.ref,
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              return;
            }
            if (obj.statusTrip === 'ramassage en cours') {
              this.ListScanPickUp.push(obj);
              this.playSuccessAudio();
              const index = this.listColisNonTreated.indexOf(obj);
              this.listColisNonTreated = this.listColisNonTreated.filter((trip) => trip.idTrip !== obj.idTrip);
              this.activityPickUp.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityPickUp.listColisSuccess.push(new ColisSuccessRunsheet(obj.idTrip, this.user.idAdmin, new Date(), false));
              this.activityPickUpService.update(this.activityPickUp).subscribe((res) => {
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Pick Up: ' + this.activityPickUp.ref,
                'Success'));
              this.tripService.updateOneTrip(obj).subscribe();
            }
            else {
              const msg = 'L\'état de colis doit être " ramassage en cours " ! Etat de colis scanné : ' + obj.statusTrip;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Pick Up: ' + this.activityPickUp.ref,
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Pick Up',  this.activityPickUp.ref);
                this.conflitService.create(conflit).subscribe();
              });
            }
          } else {
            // Force pick up
            const msg = 'impossible de scanner le colis! Ce colis n\'existe pas dans une pickUp en cours. Etat de colis scanné : ' + obj.statusTrip;
            this.snackBar.open(msg, 'Fermer', {
              duration: 8000,
            });
            this.playFailureAudio();
            this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
              const admin = resUser.json();
              const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Pick Up',  this.activityPickUp.ref);
              this.conflitService.create(conflit).subscribe();
            });
            obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Pick Up: ' + this.activityPickUp.ref,
              'Exception : ' + msg));
            this.tripService.updateOneTrip(obj).subscribe();
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
    this.searchTermScanPickUp = '';
    this.ListScanPickUpNB = this.ListScanPickUp.length + 1;
  }

  deleteScanListPickUp(trip) {
    for (let i = 0; i < this.ListScanPickUp.length; i++) {
      if (trip.idTrip === this.ListScanPickUp[i].idTrip) {
        this.ListScanPickUp.splice(i, 1);
      }
    }
    this.listColisNonTreated.push(trip);
    this.activityPickUp.listColisNonTreated.push(trip.idTrip);
    this.ListScanPickUpNB = this.ListScanPickUp.length;
    const colisToDelete = this.activityPickUp.listColisSuccess.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.activityPickUp.listColisSuccess.indexOf(colisToDelete);
    this.activityPickUp.listColisSuccess[index].removed = true;
    this.activityPickUp.listColisSuccess[index].removedBy =  this.user.idAdmin;
    this.activityPickUp.listColisSuccess[index].removedDate =  new Date() ;
    this.activityPickUpService.update(this.activityPickUp).subscribe();
  }



  createDraftActivity() {
    const draftActivity: ActivityPickUp = {
      ...new ActivityPickUp(), status: 'draft', createdDate: new Date(), createdBy: this.user.idAdmin, driver: this.activityPickUpInfo.driver,
      listPickUps: this.activityPickUpInfo.pickUps, listColisSuccess: [], listColisNonTreated: []};
    this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
      const admin = resUser.json();
      draftActivity.entrepot = admin.entrepot;
      this.activityPickUpService.create(draftActivity).subscribe((res) => {
        this.activityPickUp = res.body;
        this.getPickUps();
      });
    });
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length;

  }

  calculeValeurColis() {
    if (this.activityPickUp.status === 'draft') {
      let somme = 0;
      this.ListScanPickUp.forEach((trip) => {
        if (trip.statusTrip === 'livree') {
          somme = somme + parseFloat(trip.packageTrip.valPackage);
        }
      });
      this.valeurColis = somme;
      this.activityPickUp.sommeColis = this.valeurColis;
    } else {
      this.valeurColis = this.activityPickUp.sommeColis;
    }

  }

  calculeDepenses() {
    if (this.activityPickUp.status === 'draft') {
      const gasoilEspece = (!!this.depenseForme.get(['gasoilEspece'])!.value) ? this.depenseForme.get(['gasoilEspece'])!.value : 0;
      const gasoilCarteValue = (!!this.depenseForme.get(['gasoilCarteValue'])!.value) ? this.depenseForme.get(['gasoilCarteValue'])!.value : 0;
      const carteTel = (!!this.depenseForme.get(['carteTel'])!.value) ? this.depenseForme.get(['carteTel'])!.value : 0;
      const avance = (!!this.depenseForme.get(['avance'])!.value) ? this.depenseForme.get(['avance'])!.value : 0;
      const autreValue = (!!this.depenseForme.get(['autreValue'])!.value) ? this.depenseForme.get(['autreValue'])!.value : 0;
      const gasoilCarteNumber = (!!this.depenseForme.get(['gasoilCarteNumber'])!.value) ? this.depenseForme.get(['gasoilCarteNumber'])!.value : null;
      const autreDesc = (!!this.depenseForme.get(['autreDesc'])!.value) ? this.depenseForme.get(['autreDesc'])!.value : null;
      const activityDepenses = new DepenseActivity(gasoilEspece + '', gasoilCarteNumber + '', gasoilCarteValue + '', carteTel + '', avance + '', autreDesc + '', autreValue + '');
      this.valeurDepense = gasoilEspece + gasoilCarteValue + carteTel + avance + autreValue;
      this.activityPickUp.depenses = activityDepenses;
    } else {
      this.valeurDepense = parseFloat(this.activityPickUp.depenses.autreValue) + parseFloat(this.activityPickUp.depenses.avance) + parseFloat(this.activityPickUp.depenses.carteTel) + parseFloat(this.activityPickUp.depenses.gasoilCarteValue) + parseFloat(this.activityPickUp.depenses.gasoilEspece);
    }


  }

  showInProgressTrips(item: InProgressPickUp, content: any) {
    const list = item.pickUpObject.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
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

  private getEditActivities(activityToEdit: ActivityPickUp) {
    this.activityPickUp = activityToEdit;
    this.activityPickUpInfo = {pickUps: activityToEdit.listPickUps, driver: activityToEdit.driver};

    const listOfIdsPickUp: string[] = this.activityPickUp.listColisSuccess.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
    this.tripService.getListOfTips(listOfIdsPickUp).subscribe((resTrip) => {
      this.ListScanPickUp = resTrip.body;
    });
    this.tripService.getListOfTips(this.activityPickUp.listColisNonTreated).subscribe((resTrip) => {
      this.listColisNonTreated = resTrip.body;
    });
  }



  conirmeActivite(name: string) {
    this.activityRunsheetService.activityRunsheetInfo = {driver: this.activityPickUp.driver, runsheets : []}
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      let listToUpdateChezLivreur = this.ListScanPickUp.map((trp) => trp.idTrip);
      const listConflitTripsIds = this.listConflit.map((conflit) => conflit.colisId);
      const listTreatedTripsIds = this.ListScanPickUp.map((trp) => trp.idTrip);
      this.tripService.getListOfTips(listConflitTripsIds).subscribe((resTripsConflit) =>{
        const surveyTrips: Trip[] =  [];
        resTripsConflit.body.forEach((trip) => {
          trip.survey = true;
          surveyTrips.push(trip);
        });
        this.tripService.updateListOfTips(surveyTrips).subscribe();
      });
      const pickUpsToUpdate = this.activityPickUp.listPickUps;
      const newPickUps: PickUp[] = [];
      pickUpsToUpdate.forEach((pickUp) => {
        const pickUpToPush = pickUp;
        pickUpToPush.listColis = pickUp.listColis.map((colis) => {
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
        newPickUps.push(pickUpToPush);
      });
      newPickUps.forEach((pickUp, index) => {
        const treatedNumber = pickUp.listColis.filter((colis) => colis.treated === true && colis.removed === false).length;
        if (treatedNumber === pickUp.listColis.filter((colis) => colis.removed === false).length) {
          pickUp.status = 'closed';
          pickUp.closedBy = this.user.idAdmin;
          pickUp.closedDate = new Date();
          newPickUps[index] = pickUp;
        }
      });
      this.ramassageService.updateList(newPickUps).subscribe((res) => {
        this.activityPickUp.listPickUps = res.body;
        this.activityPickUp.status = 'confirmed';
        this.activityPickUp.confirmedBy = this.user.idAdmin;
        this.activityPickUp.confirmedDate = new Date();
        this.activityPickUpService.update(this.activityPickUp).subscribe(() => {
          this.tripService.updateTripsWhenDeletePickUp(listTreatedTripsIds).subscribe(() => {
              this.tripService.getListOfTips(listToUpdateChezLivreur).subscribe((resTrips) => {
                let trips = resTrips.body;
                trips = trips.map((trip) => {
                  trip.entrepot = this.activityPickUp.entrepot;
                  return trip;
                });
                this.tripService.updateListOfTips(trips).subscribe((resUpdatedTrips) => {
                  listToUpdateChezLivreur = resUpdatedTrips.body.map((trip) => trip.idTrip);
                  this.tripService.updateTripsStatus('Chez Livreur', listToUpdateChezLivreur, this.user.name, 'EntrepotGafsa').subscribe(() => {
                    this.conflitService.createList(this.listConflit).subscribe(() => {
                      this.spinner = false;
                      this.openCheckSuccess('activityConfirmed');
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
      this.router.navigate(['/reconcile-pickUp/']);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  inNonTreatedList(trip: Trip) {
    const listNontreated = [];
    this.activityPickUp.listPickUps.forEach((pickUp) => {
      pickUp.listColis.forEach((colis) => {
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

  autoConfirmPickUp() {
    this.listColisNonTreated = [];
    this.ListScanPickUp = [] ;
    this.pickUps.forEach((pickUp, index) => {
      const list = pickUp.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) && colis.treated === false)
        .map((colis) => colis.idTrip);
      this.tripService.getListOfTips(list).subscribe((resTrips) => {
        const trips = resTrips.body;
          trips.forEach((trip) => {
            this.listColisNonTreated.push(trip);
          });
          if (index === this.pickUps.length - 1){
            this.ListScanPickUp = this.listColisNonTreated;
            this.listColisNonTreated = [];
            this.ListScanPickUp.forEach((trip) => {
              this.activityPickUp.listColisSuccess.push(new ColisSuccessRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
            });
            this.activityPickUp.listColisNonTreated = [];
            this.conirmeActivite('confirmActivity');
          }
      });
    });
  }

  affectActionToConflictTrip(value: any, trp: Trip) {
    if (value === null || value === undefined) {
      this.listConflit = this.listConflit.filter((conflit) => conflit.colisId !== trp.idTrip);
    } else if (value === 'non expédié') {
      this.listConflit = this.listConflit.filter((item) => item.colisId !== trp.idTrip);
      const conflit = new Conflit(null, trp.idTrip, new Date, this.user.idAdmin, trp.entrepot, value, 'pick up',  this.activityPickUp.ref);
      this.listConflit.push(conflit);
    } else if (value === 'lost') {
      this.listConflit = this.listConflit.filter((item) => item.colisId !== trp.idTrip);
      const conflit = new Conflit(null, trp.idTrip, new Date, this.user.idAdmin, this.activityPickUp.entrepot, value, 'pick up', this.activityPickUp.ref, false, null, null);
      this.listConflit.push(conflit);
    } else if (value === 'damaged') {
      this.listConflit = this.listConflit.filter((item) => item.colisId !== trp.idTrip);
      const conflit = new Conflit(null, trp.idTrip, new Date, this.user.idAdmin, this.activityPickUp.entrepot, value, 'pick up', this.activityPickUp.ref, false, null, null);
      this.listConflit.push(conflit);
    }
  }
}
@Component({
  selector: 'confirm-activity-pickup-modal',
  templateUrl: './confirm-activity-pickup-modal.html',
  styleUrls: ['./create-activity-pick-up.component.scss']

})
export class NgbdModalConfirmActivityPickUp implements OnInit {

  checked = false;
  driver: any;

  constructor(private modal: NgbActiveModal, private activityRunsheetService: ActivityRunsheetService) {
  }

  ngOnInit() {
    this.driver = this.activityRunsheetService.activityRunsheetInfo.driver;
  }

  closeModal() {
    this.modal.close('Ok click');
  }
}

@Component({
  selector: 'activity-pickup-confirmed-modal',
  templateUrl: './activity-pickup-confirmed-modal.html',
  styleUrls: ['./create-activity-pick-up.component.scss']

})
export class NgbdModalActivityPickUpConfirmed implements OnInit {

  checked = true;
  driver: any;

  constructor(private modal: NgbActiveModal, private activityRunsheetService: ActivityRunsheetService) {
  }

  ngOnInit() {
    this.driver = this.activityRunsheetService.activityRunsheetInfo.driver;
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
  confirmActivity: NgbdModalConfirmActivityPickUp,
  activityConfirmed: NgbdModalActivityPickUpConfirmed,
  forceReturned: NgbdModalConfirmReturned
};
