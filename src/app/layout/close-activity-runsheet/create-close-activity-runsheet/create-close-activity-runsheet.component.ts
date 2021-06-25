import {Component, OnInit, Type, ViewChild} from '@angular/core';
import {Activity} from '../../../model/activity.model';
import {ActivityRunsheetInfo} from '../../reconcile-runsheet/reconcile-runsheet.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Runsheet} from '../../../model/runsheet.model';
import {InProgressRunsheet} from '../../runsheet-in-progress/runsheet-in-progress.component';
import {Trip} from '../../trips/Trip';
import {MatSnackBar, MatStepper} from '@angular/material';
import {ActivityRunsheetService} from '../../reconcile-runsheet/activity-runsheet.service';
import {TripService} from '../../trips/trips.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {RunsheetService} from '../../runsheet/runsheet.service';
import {RamassageService} from '../../ramassage/ramassage.service';
import {UserService} from '../../users/users.service';
import {pluck} from 'rxjs/operators';
import {HistoriqueScan} from '../../../model/historique-scan.model';
import {ColisFailureRunsheet} from '../../../model/colis-failure-runsheet.model';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {ColisSuccessRunsheet} from '../../../model/colis-success-runsheet.model';
import {DepenseActivity} from '../../../model/depense-activity.model';
import {
  NgbdModalActivityConfirmed,
  NgbdModalConfirmActivity,
  NgbdModalConfirmLivree,
  NgbdModalConfirmNonLivree, NgbdModalConfirmReturned
} from '../../reconcile-runsheet/create-activity-runsheet/create-activity-runsheet.component';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-create-close-activity-runsheet',
  templateUrl: './create-close-activity-runsheet.component.html',
  styleUrls: ['./create-close-activity-runsheet.component.scss']
})
export class CreateCloseActivityRunsheetComponent implements OnInit {

  date = new Date();
  activityRunsheet: Activity;
  activityRunsheetInfo: ActivityRunsheetInfo;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // vars of scanQR Failure
  searchTermscanFailure: any;
  ListScanFailure = [];
  ListScanNBFailure = 0;
  //
  // vars of scanQR Failure
  searchTermScanSuccess: any;
  ListScanSuccess = [];
  ListScanNBSuccess = 0;
  //
  searchTermScanPickUp: any;
  spinner = false;
  runsheets: Runsheet[] = [];
  inProgressRunsheets: InProgressRunsheet[] = [];
  closedRunsheets: InProgressRunsheet[] = [];
  closeResult: string;
  selectedInProgressTrips: Trip[] = [];
  @ViewChild('stepper') private myStepper: MatStepper;
  failureStepper = false;
  successStepper = false;
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
  private trips: Trip[] = [];
  private ListScanPickUpNB: any;
  private pickUpStepper = false;


  constructor(public activityRunsheetService: ActivityRunsheetService, private _formBuilder: FormBuilder, private tripService: TripService,
              private modalService: NgbModal, private router: Router, private snackBar: MatSnackBar, private runsheetService: RunsheetService,
              private fb: FormBuilder, public ramassageService: RamassageService, private userService: UserService,
              private spinner2: NgxSpinnerService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityRunsheetInfo = this.activityRunsheetService.activityRunsheetInfo;
    if (!this.activityRunsheetInfo) {
      this.router.navigate(['/close-activity-runsheet']);
      return;
    }
    if (!!this.activityRunsheetService.activityToEdit) {
      // IF EDIT
      this.getEditActivities(this.activityRunsheetService.activityToEdit);
      this.getRunsheets();
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
        if (res === 1) {
          this.failureStepper = true;
          this.successStepper = false;
          this.pickUpStepper = false;
          this.firstStep = false;
          this.finalStep = false;
        } else if (res === 2) {
          this.failureStepper = false;
          this.successStepper = true;
          this.pickUpStepper = false;
          this.firstStep = false;
          this.finalStep = false;
        } else if (res === 0) {
          this.firstStep = true;
          this.failureStepper = false;
          this.successStepper = false;
          this.pickUpStepper = false;
          this.finalStep = false;
        } else if (res === 5) {
          //
          this.firstStep = false;
          this.failureStepper = false;
          this.successStepper = false;
          this.pickUpStepper = false;
          this.finalStep = false;
          if (this.activityRunsheet.status === 'confirmed' || this.activityRunsheet.status === 'closed'){
            this.firstStep = false;
            this.failureStepper = false;
            this.successStepper = false;
            this.pickUpStepper = false;
            this.finalStep = true;
            this.valeurDepense = parseFloat(this.activityRunsheet.depenses.autreValue)+parseFloat(this.activityRunsheet.depenses.avance)+parseFloat(this.activityRunsheet.depenses.carteTel)+parseFloat(this.activityRunsheet.depenses.gasoilCarteValue)+parseFloat(this.activityRunsheet.depenses.gasoilEspece)
            this.valeurColis = this.activityRunsheet.sommeColis;
          }
          this.activityRunsheet.argentRecolte = this.valeurColis - this.valeurDepense;
        } else if(res === 4){
          this.firstStep = false;
          this.failureStepper = false;
          this.successStepper = false;
          this.pickUpStepper = true;
          this.finalStep = false;
        }
        else if (res === 6){
          this.firstStep = false;
          this.failureStepper = false;
          this.successStepper = false;
          this.pickUpStepper = false;
          this.finalStep = true;
          this.calculeDepenses();
          this.calculeValeurColis();
        }
        else {
          this.firstStep = false;
          this.failureStepper = false;
          this.successStepper = false;
          this.pickUpStepper = false;
          this.finalStep = false;
        }
      });
  }

  getRunsheets() {
    this.spinner = true;
    console.log(this.activityRunsheetInfo);
    this.activityRunsheet.listRunsheets.forEach((runsheet) => {
      if (runsheet.status === 'closed'){
        const list = runsheet.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) && colis.treated === false)
          .map((colis) => colis.idTrip);
        this.tripService.getListOfTips(list).subscribe((resTrips) => {
          const trips = resTrips.body;
          this.closedRunsheets.push({runsheetObject: runsheet, nbTreatedTrips: trips.length, nbColisEnCours: null, nbColisRetour: null, nbColisLivree: null});
        });
      }
    });
    if (!!this.activityRunsheetInfo) {
      if (!!this.activityRunsheetInfo.runsheets) {
        this.runsheets = this.activityRunsheetInfo.runsheets;
        if (this.runsheets.length === 0) {
          this.spinner = false;
          return;
        }
        this.runsheets.forEach((runsheet) => {
          const list = runsheet.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) )
            .map((colis) => colis.idTrip);
          this.tripService.getListOfTips(list).subscribe((resTrips) => {
            const trips = resTrips.body;
            trips.forEach((trip) => {
              this.trips.push(trip);
            });
          });
        });
        this.runsheets.forEach((runsheet) => {
          const list = runsheet.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined) && colis.treated === false)
            .map((colis) => colis.idTrip);
          this.tripService.getListOfTips(list).subscribe((resTrips) => {
            const trips = resTrips.body;
            if (!this.activityRunsheetService.activityToEdit) {
              // IF CREATE
              trips.forEach((trip) => {
                this.listColisNonTreated.push(trip);
                this.allTrips.push(trip);
              });
              this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityRunsheetService.update(this.activityRunsheet).subscribe();
            } else {
              // IF EDIT
              trips.forEach((trip) => {
                this.allTrips.push(trip);
              });
            }
            this.inProgressRunsheets.push({runsheetObject: runsheet, nbTreatedTrips: trips.length, nbColisEnCours: null, nbColisRetour: null, nbColisLivree: null});
            this.spinner = false;
          });
        });
      } else {
        this.spinner = false;
      }
    }
  }

  scanListFailure() {
    // console.log("sanc: ",this.searchTermscan)
    // vérif
    let verif = false;
    for (let index = 0; index < this.ListScanFailure.length; index++) {
      if (this.searchTermscanFailure === this.ListScanFailure[index].idTrip || this.searchTermscanFailure === this.ListScanFailure[index].refTrip) {
        verif = true;
      }
    }
    //
    if (verif === false) {
      this.tripService.getTripscanListByRef(this.searchTermscanFailure).subscribe(data => {
        const obj = data.body;
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScanFailure.length; index++) {
          if (obj.idTrip === this.ListScanFailure[index].idTrip || obj.refTrip === this.ListScanFailure[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if ((obj.currentRunsheetId !== null) && (obj.currentRunsheetId !== 'null') && (obj.currentRunsheetId !== undefined)) {
            if (obj.driverTrip.idDriver !== ('DT' + this.activityRunsheet.driver.idDriver)) {
              const msg = 'le colis n\'appartient pas au livreur. Livreur de colis scanné: ' + obj.driverTrip.nameDriver + ' ' + obj.driverTrip.surnameDriver;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste (non livré / non retourné) ',
                'Exception : '+ msg));
              this.tripService.updateOneTrip(obj).subscribe();
              return;
            }

            if (obj.statusTrip === 'Retour' || obj.statusTrip === 'livraison en cours' || obj.statusTrip === 'En cours de retour' ) {
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste (non livré / non retourné) ',
                'Success'));
              this.tripService.updateOneTrip(obj).subscribe();
              this.ListScanFailure.push(obj);
              const index = this.listColisNonTreated.indexOf(obj);
              this.listColisNonTreated = this.listColisNonTreated.filter((trip) => trip.idTrip !== obj.idTrip);
              this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityRunsheet.listColisFailure.push(new ColisFailureRunsheet(obj.idTrip, this.user.idAdmin, new Date(), false));
              this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
                this.activityRunsheet = res.body;
              });
            } else {
              this.activityRunsheetService.sacannedTrip = obj;
              const msg = 'L\'état de colis doit être "Retour" , "Livaison en cours" ou "En cours de retour"! Etat de colis scanné: ' + obj.statusTrip;
              this.snackBar.open(msg + obj.statusTrip, 'Fermer', {
                duration: 8000,
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste (non livré / non retourné) ',
                'Exception : '+ msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.openForceStatusFailure('forceFailure');

            }
          } else {
            const msg = 'impossible de scanner le colis! Ce colis n\'existe pas dans une runsheet en cours. Etat de colis scanné : ' + obj.statusTrip;
            this.snackBar.open(msg, 'Fermer', {
              duration: 8000,
            });
            obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste (non livré / non retourné) ',
              'Exception : '+ msg));
            this.tripService.updateOneTrip(obj).subscribe();

          }

        } else {
          this.snackBar.open('Ce colis a été scanné', 'Fermer', {
            duration: 8000,
          });
          obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste (non livré / non retourné) ',
            'Exception : Ce colis a été scanné'));
          this.tripService.updateOneTrip(obj).subscribe();
        }
      });
    } else {
      this.snackBar.open('Ce colis a été scanné', 'Fermer', {
        duration: 8000,
      });
    }
    this.searchTermscanFailure = '';
    this.ListScanNBFailure = this.ListScanFailure.length + 1;
  }

  deleteScanListFailure(trip) {
    for (let i = 0; i < this.ListScanFailure.length; i++) {
      if (trip.idTrip === this.ListScanFailure[i].idTrip) {
        this.ListScanFailure.splice(i, 1);
      }
    }
    this.ListScanNBFailure = this.ListScanFailure.length;
    this.listColisNonTreated.push(trip);
    this.activityRunsheet.listColisNonTreated.push(trip.idTrip);
    const colisToDelete = this.activityRunsheet.listColisFailure.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.activityRunsheet.listColisFailure.indexOf(colisToDelete);
    this.activityRunsheet.listColisFailure[index].removed = true;
    this.activityRunsheet.listColisFailure[index].removedBy = this.user.idAdmin;
    this.activityRunsheet.listColisFailure[index].removedDate = new Date();
    this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
      this.activityRunsheet = res.body;
    });
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
      this.tripService.getTripscanListByRef(this.searchTermScanPickUp).subscribe(data => {
        const obj = data.body;
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScanPickUp.length; index++) {
          if (obj.idTrip === this.ListScanPickUp[index].idTrip ||  obj.refTrip === this.ListScanPickUp[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if ((obj.currentPickUpId !== null) && (obj.currentPickUpId !== 'null') && (obj.currentPickUpId !== undefined) ) {
            this.ramassageService.find(obj.currentPickUpId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans le Pick Up ' +
                'de réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open( msg , 'Fermer', {
                duration: 8000,
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste de colis ramassage',
                'Exception : '+ msg));
              this.tripService.updateOneTrip(obj).subscribe();
            });
          } else {
            if (obj.statusTrip === 'cherche un livreur') {
              this.ListScanPickUp.push(obj);
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste de colis ramassage',
                'Success'));
              this.tripService.updateOneTrip(obj).subscribe();
              // code to add colisRunsheet to listColis of pickup
              this.activityRunsheet.listColisPickUp.push(new ColisRunsheet(obj.idTrip, false, this.user.idAdmin,
                new Date(), false));
              this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
                this.activityRunsheet = res.body;
              });
            } else {
              const msg = 'Le statut de colis doit être "cherche un livreur" ! . Statut de colis scanné : ' + obj.statusTrip;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste de colis ramassage',
                'Exception : '+ msg));
              this.tripService.updateOneTrip(obj).subscribe();
            }
          }

        } else {
          this.snackBar.open('Ce colis a été scanné', 'Fermer', {
            duration: 8000,
          });
          obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste de colis ramassage',
            'Exception : Ce colis a été scanné'));
          this.tripService.updateOneTrip(obj).subscribe();
        }
      });
    } else {
      this.snackBar.open('Ce colis a été scanné', 'Fermer', {
        duration: 8000,
      });
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
    this.ListScanPickUpNB = this.ListScanPickUp.length;
    const colisToDelete = this.activityRunsheet.listColisPickUp.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.activityRunsheet.listColisPickUp.indexOf(colisToDelete);
    this.activityRunsheet.listColisPickUp[index].removed = true;
    this.activityRunsheet.listColisPickUp[index].removedBy =  this.user.idAdmin;
    this.activityRunsheet.listColisPickUp[index].removedDate =  new Date() ;
    this.activityRunsheetService.update(this.activityRunsheet).subscribe();
  }

  scanListSuccess() {
    // console.log("sanc: ",this.searchTermscan)
    // vérif
    let verif = false;
    for (let index = 0; index < this.ListScanSuccess.length; index++) {
      if (this.searchTermScanSuccess === this.ListScanSuccess[index].idTrip || this.searchTermScanSuccess === this.ListScanSuccess[index].refTrip) {
        verif = true;
      }
    }
    //
    if (verif === false) {
      this.tripService.getTripscanListByRef(this.searchTermScanSuccess).subscribe(data => {
        const obj = data.body;
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScanSuccess.length; index++) {
          if (obj.idTrip === this.ListScanSuccess[index].idTrip || obj.refTrip === this.ListScanSuccess[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if ((obj.currentRunsheetId !== null) && (obj.currentRunsheetId !== 'null') && (obj.currentRunsheetId !== undefined)) {
            if (obj.driverTrip.idDriver !== 'DT' + this.activityRunsheet.driver.idDriver) {
              const msg = 'le colis n\'appartient pas au livreur. Livreur de colis scanné: ' +
                obj.driverTrip.nameDriver + ' ' + obj.driverTrip.surnameDriver;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste des colis (Livrés / Retournés)',
                'Exception : '+ msg));
              this.tripService.updateOneTrip(obj).subscribe();
              return;
            }
            if (obj.statusTrip === 'Livree') {
              this.ListScanSuccess.push(obj);
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste des colis (Livrés / Retournés)',
                'Success'));
              this.tripService.updateOneTrip(obj).subscribe();
              const index = this.listColisNonTreated.indexOf(obj);
              this.listColisNonTreated = this.listColisNonTreated.filter((trip) => trip.idTrip !== obj.idTrip);
              this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityRunsheet.listColisSuccess.push(new ColisSuccessRunsheet(obj.idTrip, this.user.idAdmin, new Date(), false));
              this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
                this.activityRunsheet = res.body;
              });

            } else if (obj.statusTrip === 'En cours de retour') {
              this.activityRunsheetService.sacannedTrip = obj;
              const msg = 'L\'état de colis doit être " Livré " ! Etat de colis scanné : ' + obj.statusTrip;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste des colis (Livrés / Retournés)',
                'Exception : '+ msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.openForceStatusReturned('forceReturned');
            }
            else {
              const msg = 'L\'état de colis doit être " Livré " ! Etat de colis scanné : ' + obj.statusTrip;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste des colis (Livrés / Retournés)',
                'Exception : '+ msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.activityRunsheetService.sacannedTrip = obj;
              this.openForceStatusSuccess('forceSuccess');
            }
            // this.runsheetService.find(obj.currentRunsheetId).subscribe((res) => {
            //   this.snackBar.open('impossible de scanner le colis! ce colis existe dans la runsheet' +
            //     'de Réference: ' + res.body.ref + ', Etat: ' + res.body.status , 'Fermer', {
            //     duration: 8000,
            //   });
            // });
          } else {
            const msg = 'impossible de scanner le colis! Ce colis n\'existe pas dans une runsheet en cours. Etat de colis scanné : ' + obj.statusTrip;
            this.snackBar.open(msg, 'Fermer', {
              duration: 8000,
            });
            obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste des colis (Livrés / Retournés)',
              'Exception : '+ msg));
            this.tripService.updateOneTrip(obj).subscribe();
          }

        } else {
          this.snackBar.open('Ce colis a été scanné', 'Fermer', {
            duration: 8000,
          });
          obj.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste des colis (Livrés / Retournés)',
            'Exception : Ce colis a été scanné'));
          this.tripService.updateOneTrip(obj).subscribe();
        }
      });
    } else {
      this.snackBar.open('Ce colis a été scanné', 'Fermer', {
        duration: 8000,
      });
    }
    this.searchTermScanSuccess = '';
    this.ListScanNBSuccess = this.ListScanSuccess.length + 1;
  }

  deleteScanListSuccess(trip) {
    for (let i = 0; i < this.ListScanSuccess.length; i++) {
      if (trip.idTrip === this.ListScanSuccess[i].idTrip) {
        this.ListScanSuccess.splice(i, 1);
      }
    }
    this.listColisNonTreated.push(trip);
    this.activityRunsheet.listColisNonTreated.push(trip.idTrip);
    this.ListScanNBSuccess = this.ListScanSuccess.length;
    const colisToDelete = this.activityRunsheet.listColisSuccess.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.activityRunsheet.listColisSuccess.indexOf(colisToDelete);
    this.activityRunsheet.listColisSuccess[index].removed = true;
    this.activityRunsheet.listColisSuccess[index].removedBy = this.user.idAdmin;
    this.activityRunsheet.listColisSuccess[index].removedDate = new Date();
    this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
      this.activityRunsheet = res.body;
    });
  }

  createDraftActivity() {
    const draftActivity: Activity = {
      ...new Activity(), status: 'draft', createdDate: new Date(), createdBy: this.user.idAdmin, driver: this.activityRunsheetInfo.driver,
      listRunsheets: this.activityRunsheetInfo.runsheets, listColisSuccess: [], listColisFailure: [], listColisNonTreated: [], listColisPickUp: []
    };
    this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
      const admin = resUser.json();
      draftActivity.entrepot =admin.entrepot;
      this.activityRunsheetService.create(draftActivity).subscribe((res) => {
        this.activityRunsheet = res.body;
        this.getRunsheets();
      });
    })
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length;

  }

  calculeValeurColis() {
    if(this.activityRunsheet.status === 'draft'){
      let somme = 0;
      this.ListScanSuccess.forEach((trip) => {
        if (trip.statustrip === 'livree'){
          somme = somme + parseFloat(trip.packageTrip.valPackage);
        }
      });
      this.valeurColis = somme;
      this.activityRunsheet.sommeColis = this.valeurColis;
    }
    else {
      this.valeurColis = this.activityRunsheet.sommeColis;
    }

  }

  calculeDepenses() {
    if(this.activityRunsheet.status === 'draft'){
      const gasoilEspece = (!!this.depenseForme.get(['gasoilEspece'])!.value) ? this.depenseForme.get(['gasoilEspece'])!.value : 0;
      const gasoilCarteValue = (!!this.depenseForme.get(['gasoilCarteValue'])!.value) ? this.depenseForme.get(['gasoilCarteValue'])!.value : 0;
      const carteTel = (!!this.depenseForme.get(['carteTel'])!.value) ? this.depenseForme.get(['carteTel'])!.value : 0;
      const avance = (!!this.depenseForme.get(['avance'])!.value) ? this.depenseForme.get(['avance'])!.value : 0;
      const autreValue = (!!this.depenseForme.get(['autreValue'])!.value) ? this.depenseForme.get(['autreValue'])!.value : 0;
      const gasoilCarteNumber = (!!this.depenseForme.get(['gasoilCarteNumber'])!.value) ? this.depenseForme.get(['gasoilCarteNumber'])!.value : null;
      const autreDesc = (!!this.depenseForme.get(['autreDesc'])!.value) ? this.depenseForme.get(['autreDesc'])!.value : null;
      const activityDepenses = new DepenseActivity(gasoilEspece + '', gasoilCarteNumber + '', gasoilCarteValue + '', carteTel + '', avance + '', autreDesc + '', autreValue + '');
      this.valeurDepense = gasoilEspece + gasoilCarteValue + carteTel + avance + autreValue;
      this.activityRunsheet.depenses = activityDepenses;
    }
    else {
      this.valeurDepense = parseFloat(this.activityRunsheet.depenses.autreValue)+parseFloat(this.activityRunsheet.depenses.avance)+parseFloat(this.activityRunsheet.depenses.carteTel)+parseFloat(this.activityRunsheet.depenses.gasoilCarteValue)+parseFloat(this.activityRunsheet.depenses.gasoilEspece)
    }


  }

  showInProgressTrips(item: InProgressRunsheet, content: any) {
    const list = item.runsheetObject.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
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

  private getEditActivities(activityToEdit: Activity) {
    this.activityRunsheet = activityToEdit;
    this.activityRunsheetInfo = {runsheets: activityToEdit.listRunsheets, driver: activityToEdit.driver};
    const listOfIdsSuccess: string[] = this.activityRunsheet.listColisSuccess.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
    this.tripService.getListOfTips(listOfIdsSuccess).subscribe((resTrip) => {
      this.ListScanSuccess = resTrip.body;
    });
    const listOfIdsFailure: string[] = this.activityRunsheet.listColisFailure.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
    this.tripService.getListOfTips(listOfIdsFailure).subscribe((resTrip) => {
      this.ListScanFailure = resTrip.body;
    });
    const listOfIdsPickUp: string[] = this.activityRunsheet.listColisPickUp.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
    this.tripService.getListOfTips(listOfIdsPickUp).subscribe((resTrip) => {
      this.ListScanPickUp = resTrip.body;
    });
    this.tripService.getListOfTips(this.activityRunsheet.listColisNonTreated).subscribe((resTrip) => {
      this.listColisNonTreated = resTrip.body;
    });
  }


  openForceStatusFailure(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.tripService.updateTripsStatus(this.activityRunsheetService.newStatus,
        [this.activityRunsheetService.sacannedTrip.idTrip], this.user.name, '').subscribe(() => {
        const trip = this.activityRunsheetService.sacannedTrip;
        trip.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste (non livré / non retourné) ',
          'Success : forced status'));
        this.tripService.updateOneTrip(trip).subscribe();
        const indexNonTreated = this.listColisNonTreated.map((trp) => trp.idTrip).indexOf(trip.idTrip);
        const indexSuccess = this.ListScanSuccess.map((trp) => trp.idTrip).indexOf(trip.idTrip);
        if (indexNonTreated >= 0) {
          this.listColisNonTreated = this.listColisNonTreated.filter((nonTreatedTrip) => nonTreatedTrip.idTrip !== trip.idTrip);
          this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((resTrip) => resTrip.idTrip);
        }
        if (indexSuccess >= 0) {
          this.ListScanSuccess = this.ListScanSuccess.filter((sucessTrip) => sucessTrip.idTrip !== trip.idTrip);
          this.activityRunsheet.listColisSuccess = this.activityRunsheet.listColisSuccess.filter((colis) => colis.idTrip !== trip.idTrip);
        }
        trip.statusTrip = this.activityRunsheetService.newStatus;
        this.ListScanFailure.push(trip);
        this.activityRunsheet.listColisFailure.push(new ColisFailureRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
        this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
          this.activityRunsheet = res.body;
        });
      });

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  openForceStatusSuccess(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.tripService.updateTripsStatus('Livree',
        [this.activityRunsheetService.sacannedTrip.idTrip], this.user.name, '').subscribe(() => {
        const trip = this.activityRunsheetService.sacannedTrip;
        const indexNonTreated = this.listColisNonTreated.map((trp) => trp.idTrip).indexOf(trip.idTrip);
        const indexFailure = this.ListScanFailure.map((trp) => trp.idTrip).indexOf(trip.idTrip);
        if (indexNonTreated >= 0) {
          this.listColisNonTreated = this.listColisNonTreated.filter((nonTreatedTrip) => nonTreatedTrip.idTrip !== trip.idTrip);
          this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((resTrip) => resTrip.idTrip);
        }
        if (indexFailure >= 0) {
          this.ListScanFailure = this.ListScanFailure.filter((sucessTrip) => sucessTrip.idTrip !== trip.idTrip);
          this.activityRunsheet.listColisFailure = this.activityRunsheet.listColisFailure.filter((colis) => colis.idTrip !== trip.idTrip);
        }
        trip.statusTrip = 'Livree';
        this.ListScanSuccess.push(trip);
        this.activityRunsheet.listColisSuccess.push(new ColisFailureRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
        this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
          this.activityRunsheet = res.body;
        });
      });

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }
  openForceStatusReturned(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.tripService.updateTripsStatus('Retournee',
        [this.activityRunsheetService.sacannedTrip.idTrip], this.user.name, '').subscribe(() => {
        const trip = this.activityRunsheetService.sacannedTrip;
        trip.historiqueScans.push(new HistoriqueScan(this.user.idAdmin,new Date(),'Reconcile Activity Runsheet : '+ this.activityRunsheet.ref+ ' - Liste des colis (Livrés / Retournés)',
          'Success: forced status'));
        this.tripService.updateOneTrip(trip).subscribe();
        const indexNonTreated = this.listColisNonTreated.map((trp) => trp.idTrip).indexOf(trip.idTrip);
        const indexFailure = this.ListScanFailure.map((trp) => trp.idTrip).indexOf(trip.idTrip);
        if (indexNonTreated >= 0) {
          this.listColisNonTreated = this.listColisNonTreated.filter((nonTreatedTrip) => nonTreatedTrip.idTrip !== trip.idTrip);
          this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((resTrip) => resTrip.idTrip);
        }
        if (indexFailure >= 0) {
          this.ListScanFailure = this.ListScanFailure.filter((sucessTrip) => sucessTrip.idTrip !== trip.idTrip);
          this.activityRunsheet.listColisFailure = this.activityRunsheet.listColisFailure.filter((colis) => colis.idTrip !== trip.idTrip);
        }
        trip.statusTrip = 'Retournee';
        this.ListScanSuccess.push(trip);
        this.activityRunsheet.listColisSuccess.push(new ColisFailureRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
        this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
          this.activityRunsheet = res.body;
        });
      });

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }


  conirmeActivite(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const listLivraisonEnCoursIds = this.ListScanFailure.filter((trp) => trp.statusTrip === 'livraison en cours').map((trp) => trp.idTrip);
      const listToUpdateChezLivreur = this.ListScanPickUp.map((trp) => trp.idTrip).concat(listLivraisonEnCoursIds);
      const listChercheUnLivreur = this.ListScanPickUp.map((trp) => trp.idTrip);
      const listEnCoursDeRetourIds = this.ListScanFailure.filter((trp) => trp.statusTrip === 'En cours de retour').map((trp) => trp.idTrip);
      const listSuccessTripsIds = this.ListScanSuccess.map((trp) => trp.idTrip);
      const listTreatedTripsIds = this.ListScanSuccess.map((trp) => trp.idTrip)
        .concat(this.ListScanFailure.map((trp) => trp.idTrip));
      const runsheetsToUpdate = this.activityRunsheet.listRunsheets;
      const newRunsheets: Runsheet[] = [];
      runsheetsToUpdate.forEach((runsheet) => {
        const runsheetToPush = runsheet;
        runsheetToPush.listColis = runsheet.listColis.map((colis) => {
          if (listTreatedTripsIds.indexOf(colis.idTrip) >= 0 && colis.removed === false) {
            colis.treated = true;
            return colis;
          } else {
            return colis;
          }
        });
        newRunsheets.push(runsheetToPush);
      });
      newRunsheets.forEach((runsheet, index) => {
        const treatedNumber = runsheet.listColis.filter((colis) => colis.treated === true && colis.removed === false).length;
        if (treatedNumber === runsheet.listColis.filter((colis) => colis.removed === false).length) {
          runsheet.status = 'closed';
          runsheet.closedBy = this.user.idAdmin;
          runsheet.closedDate = new Date();
          newRunsheets[index] = runsheet;
        }
      });
      this.runsheetService.updateList(newRunsheets).subscribe((res) => {
        this.activityRunsheet.listRunsheets = res.body;
        this.activityRunsheet.status = 'confirmed';
        this.activityRunsheet.confirmedBy = this.user.idAdmin;
        this.activityRunsheet.confirmedDate = new Date();
        this.activityRunsheetService.update(this.activityRunsheet).subscribe(() => {
          this.tripService.updateTripsWhenDeleteRunsheet(listTreatedTripsIds).subscribe(() => {
            this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
              this.tripService.getListOfTips(listChercheUnLivreur).subscribe((resTrips) => {
                let trips = resTrips.body;
                trips = trips.map((trip) => {
                  trip.entrepot = resUser.json().entrepot;
                  return trip;
                });
                this.tripService.updateListOfTips(trips).subscribe((resUpdatedTrips) => {
                  this.tripService.updateTripsStatus('Chez Livreur', listToUpdateChezLivreur, this.user.name, 'EntrepotGafsa').subscribe(() => {
                    this.tripService.updateTripsStatus('Retour', listEnCoursDeRetourIds, this.user.name, '').subscribe(() => {
                      this.tripService.updateTripsPreRecolte(listSuccessTripsIds, this.user.idAdmin).subscribe(() => {
                        this.openCheckSuccess('activityConfirmed');
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
      console.log(newRunsheets);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  openCheckSuccess(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.router.navigate(['/close-activity-runsheet/']);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  inNonTreatedList(trip: Trip) {
    const listNontreated = [];
    this.activityRunsheet.listRunsheets.forEach((runsheet) => {
      runsheet.listColis.forEach((colis) => {
        if (colis.treated === false && colis.removed === false){
          listNontreated.push(colis.idTrip);
        }
      });
    })
    if (listNontreated.indexOf(trip.idTrip) >= 0) {
      return true;
    } else {
      return false;
    }
  }


  closeActicity(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const listSuccessTripsIds = this.ListScanSuccess.map((trp) => trp.idTrip);
        this.activityRunsheet.status = 'closed';
        this.activityRunsheet.closedBy = this.user.idAdmin;
      this.activityRunsheet.closedByName = this.user.name;
      this.activityRunsheet.closedDate = new Date();
      this.spinner2.show();
        this.activityRunsheetService.update(this.activityRunsheet).subscribe(() => {
          this.spinner2.hide()
          this.tripService.updateTripsRecolted(listSuccessTripsIds, this.user.idAdmin).subscribe(() => {
            this.openCheckSuccess('activityClosed');
          });
        });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  showFinancialStatus(trip: Trip) {
    let financialStatus = '';
    if (trip.paymentStatus) {
      if (trip.paymentStatus === 'Payee') {
        financialStatus = 'Payé';
      } else if (trip.paymentStatus === 'En cours de payement') {
        financialStatus = 'En cours de paiement';
      } else if (trip.paymentStatus === 'En cours de retour') {
        financialStatus = 'En cours de retour';
      } else if (trip.paymentStatus === 'Retournee') {
        financialStatus = 'Retournee';
      }
    } else if (trip.argentRecolte) {
      financialStatus = 'Récolté';
    } else if (((!trip.argentRecolte) || (trip.argentRecolte === null)) && (trip.preRecolte === true)) {
      financialStatus = 'Prés-Recolté';
    }


    return financialStatus;
  }
}
@Component({
  selector: 'close-activity-modal',
  templateUrl: './close-activity-modal.html',
  styleUrls: ['./create-close-activity-runsheet.component.scss']

})
export class NgbdModalCloseActivity implements OnInit {

  checked = false;
  driver: any;

  constructor(public modal: NgbActiveModal, public activityRunsheetService: ActivityRunsheetService) {
  }

  ngOnInit() {
    this.driver = this.activityRunsheetService.activityRunsheetInfo.driver;
  }

  closeModal() {
    this.modal.close('Ok click');
  }
}

@Component({
  selector: 'activity-closed-modal',
  templateUrl: './activity-closed-modal.html',
  styleUrls: ['./create-close-activity-runsheet.component.scss']

})
export class NgbdModalActivityClosed implements OnInit {

  checked = true;
  driver: any;

  constructor(public modal: NgbActiveModal, public activityRunsheetService: ActivityRunsheetService) {
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
  closeActivity: NgbdModalCloseActivity,
  activityClosed: NgbdModalActivityClosed,
};
