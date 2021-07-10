import {AfterViewChecked, AfterViewInit, Component, OnInit, TemplateRef, Type, ViewChild} from '@angular/core';
import {ActivityRunsheetInfo} from '../reconcile-runsheet.component';
import {ActivityRunsheetService} from '../activity-runsheet.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripService} from '../../trips/trips.service';
import {Trip} from '../../trips/Trip';
import {Runsheet} from '../../../model/runsheet.model';
import {InProgressRunsheet} from '../../runsheet-in-progress/runsheet-in-progress.component';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar, MatStepper} from '@angular/material';
import {Route, Router} from '@angular/router';
import {RunsheetService} from '../../runsheet/runsheet.service';
import {map, pluck} from 'rxjs/operators';
import {Activity} from '../../../model/activity.model';
import {ColisFailureRunsheet} from '../../../model/colis-failure-runsheet.model';
import {ColisSuccessRunsheet} from '../../../model/colis-success-runsheet.model';

declare var checkSuccess: any;
import '../../../../assets/check-success-animation.js';
import {DepenseActivity} from '../../../model/depense-activity.model';
import {RamassageService} from '../../ramassage/ramassage.service';
import {UserService} from '../../users/users.service';
import {HistoriqueScan} from '../../../model/historique-scan.model';
import {Headers, Http, RequestOptions, ResponseContentType} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {Conflit} from '../../../model/conflit.model';
import {ConflitService} from '../../conflict-trips/conflit.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Depenses} from '../../../model/depenses.model';
import {DepensesService} from '../../depenses/depenses.service';
import {EmployeeService} from '../../employee/employee.service';
import {Employee} from '../../../model/employee.model';
import {Car} from '../../../model/car.model';

@Component({
  selector: 'app-create-activity-runsheet',
  templateUrl: './create-activity-runsheet.component.html',
  styleUrls: ['./create-activity-runsheet.component.scss']
})
export class CreateActivityRunsheetComponent implements OnInit, AfterViewInit {
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
  @ViewChild('stepper')  myStepper: MatStepper;
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
   trips: Trip[] = [];
   ListScanPickUpNB: any;
   pickUpStepper = false;
  PreMessagesAction = ['Numéro incorrect !', 'Client non joignable par téléphone !',
    'Colis non conforme à l\'attente du client', 'Client absent au RDV !', 'Client contacté, livraison reportée', 'Reportée, faute de temps'
    , 'Annulée'];
  inputPreMessageToClient: any;
  inputCusMessageToClient: any;
  @ViewChild('contentMsg') contentMsgAction: TemplateRef<any>;
  scannedTrip: Trip = null;
  listConflit: Conflit[] = [];
  actions = ['lost', 'non expédié', 'damaged'];
   scanForceLivree = false;
   scanForceRetour = false;
   scanForceRetournee = false;
  nbStop = 0;
  employee: Employee;
   depensesGasoileEspece: { affectedCar: Car, createdByName: any; depenseFrom: string; affectedTo: any; description: string; montant: any; type: string; deletedBy?: string; createdDate: Date; deleted?: boolean; deletedByName?: string; createdBy: string; deletedDate?: Date; carnetGasoil?: string; id?: string; depenseActivity: { gasoilEspece: any; autreValue: null; avanceMois: null; avance: null; autreDesc: null; carMaintaining: null; gasoilCarteValue?: string; carteTel: null; gasoilCarteNumber?: string; desktopCharge: null } };
   depensesCarteTel: {affectedCar: Car, createdByName: any; depenseFrom: string; affectedTo: any; description: string; montant: any; type: string; deletedBy?: string; createdDate: Date; deleted?: boolean; deletedByName?: string; createdBy: string; deletedDate?: Date; carnetGasoil?: string; id?: string; depenseActivity: { gasoilEspece: null; autreValue: null; avanceMois: null; avance: null; autreDesc: null; carMaintaining: null; gasoilCarteValue?: string; carteTel: any; gasoilCarteNumber?: string; desktopCharge: null } };
   depensesAvance: { affectedCar: Car, createdByName: any; depenseFrom: string; affectedTo: any; description: string; montant: any; type: string; deletedBy?: string; createdDate: Date; deleted?: boolean; deletedByName?: string; createdBy: string; deletedDate?: Date; carnetGasoil?: string; id?: string; depenseActivity: { gasoilEspece: null; autreValue: null; avanceMois: null; avance: any; autreDesc: null; carMaintaining: null; gasoilCarteValue?: string; carteTel: null; gasoilCarteNumber?: string; desktopCharge: null } };
   depensesAutre: {affectedCar: Car,  createdByName: any; depenseFrom: string; affectedTo: any; description: string; montant: any; type: string; deletedBy?: string; createdDate: Date; deleted?: boolean; deletedByName?: string; createdBy: string; deletedDate?: Date; carnetGasoil?: string; id?: string; depenseActivity: { gasoilEspece: null; autreValue: any; avanceMois: null; avance: null; autreDesc: any; carMaintaining: null; gasoilCarteValue?: string; carteTel: null; gasoilCarteNumber?: string; desktopCharge: null } };
   listRelatedTrips: Trip[] = [];
  constructor(public activityRunsheetService: ActivityRunsheetService, private _formBuilder: FormBuilder, private tripService: TripService,
              private modalService: NgbModal, private router: Router, private snackBar: MatSnackBar, public runsheetService: RunsheetService,
              private fb: FormBuilder, public ramassageService: RamassageService, private userService: UserService, private http: Http,
              private conflitService: ConflitService, private depensesService: DepensesService, private employeeService: EmployeeService,
              private spinner2: NgxSpinnerService) {
  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityRunsheetInfo = this.activityRunsheetService.activityRunsheetInfo;
    if (!this.activityRunsheetInfo) {
      this.router.navigate(['/reconcile-runsheet']);
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
          if (this.activityRunsheet.status === 'confirmed') {
            this.firstStep = false;
            this.failureStepper = false;
            this.successStepper = false;
            this.pickUpStepper = false;
            this.finalStep = true;
            this.calculateNbStops();
            this.valeurDepense = parseFloat(this.activityRunsheet.depenses.autreValue) + parseFloat(this.activityRunsheet.depenses.avance) + parseFloat(this.activityRunsheet.depenses.carteTel) + parseFloat(this.activityRunsheet.depenses.gasoilCarteValue) + parseFloat(this.activityRunsheet.depenses.gasoilEspece);
            this.valeurColis = this.activityRunsheet.sommeColis;
            console.log(this.valeurColis);
            console.log(this.valeurDepense);
            this.activityRunsheet.argentRecolte = this.valeurColis - this.valeurDepense;
            console.log(this.activityRunsheet.argentRecolte);
          }
        } else if (res === 4) {
          this.firstStep = false;
          this.failureStepper = false;
          this.successStepper = false;
          this.pickUpStepper = true;
          this.finalStep = false;
        } else if (res === 6) {
          this.firstStep = false;
          this.failureStepper = false;
          this.successStepper = false;
          this.pickUpStepper = false;
          this.finalStep = true;
          this.calculeDepenses();
          this.calculeValeurColis();
          this.calculateNbStops();
          console.log(this.valeurColis);
          console.log(this.valeurDepense);
          this.activityRunsheet.argentRecolte = this.valeurColis - this.valeurDepense;
          console.log(this.activityRunsheet.argentRecolte);
        } else {
          this.firstStep = false;
          this.failureStepper = false;
          this.successStepper = false;
          this.pickUpStepper = false;
          this.finalStep = false;
        }

      });
  }
  saveDepenses() {
    this.employeeService.find(this.activityRunsheet.driver.refEmployee).subscribe((res) => {
      this.depensesAvance.affectedTo = res.body;
      this.depensesAutre.affectedTo = res.body;
      this.depensesCarteTel.affectedTo = res.body;
      this.depensesGasoileEspece.affectedTo = res.body;
      if (this.depensesAvance.montant > 0) {
        this.depensesService.create(this.depensesAvance).subscribe();
      }
      if (this.depensesAutre.montant > 0) {
        this.depensesService.create(this.depensesAutre).subscribe();
      }
      if (this.depensesCarteTel.montant > 0) {
        this.depensesService.create(this.depensesCarteTel).subscribe();
      }
      if (this.depensesGasoileEspece.montant > 0) {
        this.depensesService.create(this.depensesGasoileEspece).subscribe();
      }
    } );
  }

  getRunsheets() {
    this.spinner = true;
    console.log(this.activityRunsheetInfo);
    this.activityRunsheet.listRunsheets.forEach((runsheet) => {
      if (runsheet.status === 'closed') {
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
          const list = runsheet.listColis.slice().filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
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
            this.inProgressRunsheets.push({runsheetObject: runsheet, nbTreatedTrips: trips.length, nbColisLivree: null, nbColisRetour: null, nbColisEnCours: null});
            this.spinner = false;
          });
        });
        this.spinner = true;
        this.employeeService.find(this.activityRunsheet.driver.refEmployee).subscribe((res) => {
          this.employee =  res.body;
          this.spinner = false ;
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
      this.tripService.getTripscanListById(this.searchTermscanFailure, this.user).subscribe(data => {
        let obj;
        if(this.user.role === 'superAdmin'){
           obj = Array.of(JSON.parse(data['_body']).data);
        } else {
          obj = data.body;
        }
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScanFailure.length; index++) {
          if (obj.idTrip === this.ListScanFailure[index].idTrip || obj.refTrip === this.ListScanFailure[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if (!!obj.entrepot) {
            if (obj.entrepot.id !== this.activityRunsheet.entrepot.id) {
              const msg = 'impossible de scanner le colis! colis n\'appartient pas à ce Hub';
              this.snackBar.open(msg, 'Fermer', {duration: 8000, });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet: - Liste des colis (non Livrés / non Retournés):' + this.activityRunsheet.ref,
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet - Liste des colis (non Livrés / non Retournés):', this.activityRunsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
              return;
            }
          }
          if ((obj.currentRunsheetId !== null) && (obj.currentRunsheetId !== 'null') && (obj.currentRunsheetId !== undefined)) {
            if (obj.driverTrip.idDriver !== ('DT' + this.activityRunsheet.driver.idDriver)) {
              const msg = 'le colis n\'appartient pas au livreur. Livreur de colis scanné: ' + obj.driverTrip.nameDriver + ' ' + obj.driverTrip.surnameDriver;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste (non livré / non retourné) ',
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet',  this.activityRunsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
              return;
            }

            if (obj.statusTrip === 'Retour' || obj.statusTrip === 'livraison en cours' || obj.statusTrip === 'En cours de retour') {
              const deliveryDate = new Date();
              deliveryDate.setHours(0);
              deliveryDate.setMinutes(0);
              deliveryDate.setSeconds(0);
              if (!obj.refJumia) {
                if (obj.msgTrip.length === 0) {
                  this.scannedTrip = obj;
                  this.openSms(obj);
                  return;
                }  else if (obj.msgTrip[obj.msgTrip.length - 1].dateMsg < deliveryDate) {
                  this.scannedTrip = obj;
                  this.openSms(obj);
                  return;
                }
              }
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste (non livré / non retourné) ',
                'Success'));
              this.tripService.updateOneTrip(obj).subscribe();
              this.ListScanFailure.push(obj);
              this.playSuccessAudio();
              const index = this.listColisNonTreated.indexOf(obj);
              this.listColisNonTreated = this.listColisNonTreated.filter((trip) => trip.idTrip !== obj.idTrip);
              this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityRunsheet.listColisFailure.push(new ColisFailureRunsheet(obj.idTrip, this.user.idAdmin, new Date(), false));
              this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
              });
            } else {
              const msg = 'L\'état de colis doit être "Retour" , "Livaison en cours" ou "En cours de retour"! Etat de colis scanné: ' + obj.statusTrip;
              this.snackBar.open(msg + obj.statusTrip, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              if (!this.scanForceRetour) {
                this.scanForceRetour = true;
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste (non livré / non retourné) ',
                  'Exception : ' + msg));
                this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                  const admin = resUser.json();
                  const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet',  this.activityRunsheet.ref);
                  this.conflitService.create(conflit).subscribe();
                });
                this.tripService.updateOneTrip(obj).subscribe((res) => {
                  this.activityRunsheetService.sacannedTrip = res.body;
                  this.openForceStatusFailure('forceFailure');
                });
              }

            }
          } else {
            const msg = 'impossible de scanner le colis! Ce colis n\'existe pas dans une runsheet en cours. Etat de colis scanné : ' + obj.statusTrip;
            this.snackBar.open(msg, 'Fermer', {
              duration: 8000,
            });
            this.playFailureAudio();
            this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
              const admin = resUser.json();
              const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet',  this.activityRunsheet.ref);
              this.conflitService.create(conflit).subscribe();
            });
            obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste (non livré / non retourné) ',
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
          if ((obj.currentPickUpId !== null) && (obj.currentPickUpId !== 'null') && (obj.currentPickUpId !== undefined)) {
            this.ramassageService.find(obj.currentPickUpId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans le Pick Up ' +
                'de réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet',  this.activityRunsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste de colis ramassage',
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
            });
          } else {
            if (obj.statusTrip === 'cherche un livreur') {
              this.ListScanPickUp.push(obj);
              this.playSuccessAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste de colis ramassage',
                'Success'));
              this.tripService.updateOneTrip(obj).subscribe(() => {
                this.activityRunsheet.listColisPickUp.push(new ColisRunsheet(obj.idTrip, false, this.user.idAdmin,
                  new Date(), false));
                this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
                });
              });
            } else {
              const msg = 'Le statut de colis doit être "cherche un livreur" ! . Statut de colis scanné : ' + obj.statusTrip;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste de colis ramassage',
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet',  this.activityRunsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
            }
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
    this.ListScanPickUpNB = this.ListScanPickUp.length;
    const colisToDelete = this.activityRunsheet.listColisPickUp.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.activityRunsheet.listColisPickUp.indexOf(colisToDelete);
    this.activityRunsheet.listColisPickUp[index].removed = true;
    this.activityRunsheet.listColisPickUp[index].removedBy = this.user.idAdmin;
    this.activityRunsheet.listColisPickUp[index].removedDate = new Date();
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
          if (!!obj.entrepot) {
            if (obj.entrepot.id !== this.activityRunsheet.entrepot.id) {
              const msg = 'impossible de scanner le colis! colis n\'appartient pas à ce Hub';
              this.snackBar.open(msg, 'Fermer', {duration: 8000, });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet - Liste des colis (Livrés / Retournés): ' + this.activityRunsheet.ref,
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet - Liste des colis (Livrés / Retournés):', this.activityRunsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
              return;
            }
          }
          if ((obj.currentRunsheetId !== null) && (obj.currentRunsheetId !== 'null') && (obj.currentRunsheetId !== undefined)) {
            if (obj.driverTrip.idDriver !== 'DT' + this.activityRunsheet.driver.idDriver) {
              const msg = 'le colis n\'appartient pas au livreur. Livreur de colis scanné: ' +
                obj.driverTrip.nameDriver + ' ' + obj.driverTrip.surnameDriver;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste des colis (Livrés / Retournés)',
                'Exception : ' + msg));
              this.tripService.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet',  this.activityRunsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
              return;
            }
            if (obj.statusTrip === 'Livree' || obj.statusTrip === 'Retournee') {
              this.ListScanSuccess.push(obj);
              this.playSuccessAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste des colis (Livrés / Retournés)',
                'Success'));
              this.tripService.updateOneTrip(obj).subscribe();
              const index = this.listColisNonTreated.indexOf(obj);
              this.listColisNonTreated = this.listColisNonTreated.filter((trip) => trip.idTrip !== obj.idTrip);
              this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
              this.activityRunsheet.listColisSuccess.push(new ColisSuccessRunsheet(obj.idTrip, this.user.idAdmin, new Date(), false));
              this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
              });

            } else if (obj.statusTrip === 'En cours de retour') {
              const msg = 'L\'état de colis doit être " Retourné " ! Etat de colis scanné : ' + obj.statusTrip;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              if (!this.scanForceRetournee) {
                this.scanForceRetournee = true;
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste des colis (Livrés / Retournés)',
                  'Exception : ' + msg));
                this.tripService.updateOneTrip(obj).subscribe((res) => {
                  this.activityRunsheetService.sacannedTrip = res.body;
                  this.openForceStatusReturned('forceReturned');
                });
              }

            } else {
              if (!!obj.refJumia) {
                this.activityRunsheetService.sacannedTrip = obj;
                obj.statusTrip = 'Livree';
                this.ListScanSuccess.push(obj);
                this.successJumia(obj);
              } else {
                const msg = 'L\'état de colis doit être " Livré " ! Etat de colis scanné : ' + obj.statusTrip;
                this.snackBar.open(msg, 'Fermer', {
                  duration: 8000,
                });
                this.playFailureAudio();
                if (!this.scanForceLivree) {
                  this.scanForceLivree = true;
                  obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste des colis (Livrés / Retournés)',
                    'Exception : ' + msg));
                  this.tripService.updateOneTrip(obj).subscribe((resTrip) => {
                    this.activityRunsheetService.sacannedTrip = resTrip.body;
                    this.openForceStatusSuccess('forceSuccess');
                  });
                }
              }

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
            this.playFailureAudio();
            obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste des colis (Livrés / Retournés)',
              'Exception : ' + msg));
            this.tripService.updateOneTrip(obj).subscribe();
            this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
              const admin = resUser.json();
              const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Reconcile Activity Runsheet',  this.activityRunsheet.ref);
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
    });
  }

  createDraftActivity() {
    const draftActivity: Activity = {
      ...new Activity(),
      status: 'draft',
      createdDate: new Date(),
      createdBy: this.user.idAdmin,
      driver: this.activityRunsheetInfo.driver,
      listRunsheets: this.activityRunsheetInfo.runsheets,
      listColisSuccess: [],
      listColisFailure: [],
      listColisNonTreated: [],
      listColisPickUp: []
    };
    this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
      const admin = resUser.json();
      draftActivity.entrepot = admin.entrepot;
      this.activityRunsheetService.create(draftActivity).subscribe((res) => {
        this.activityRunsheet = res.body;
        this.getRunsheets();
      });
    });
  }
  successJumia(obj: Trip) {
    this.tripService.updateTripsStatus('Livree',
      [this.activityRunsheetService.sacannedTrip.idTrip], this.user.name, '').subscribe((res) => {
      const trip: Trip = Array.of(JSON.parse(res['_body']).trips)[0][0];
      trip.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste des colis (Livrés / Retournés)',
        'Success'));
      this.tripService.updateOneTrip(obj).subscribe();
      this.scanForceLivree = false;
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
      this.ListScanSuccess[this.ListScanSuccess.indexOf(obj)] = trip;
      this.playSuccessAudio();
      this.activityRunsheet.listColisSuccess.push(new ColisFailureRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
      this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
      });
    });
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length;

  }

  calculeValeurColis() {
      let somme = 0;
      this.ListScanSuccess.forEach((trip) => {
        console.log('--');
        console.log(trip);
        if (trip.statusTrip === 'Livree') {
          somme = somme + parseFloat(trip.packageTrip.valPackage);
        }
      });
      this.valeurColis = somme;
      this.activityRunsheet.sommeColis = this.valeurColis;


  }

  calculeDepenses() {
    if (this.activityRunsheet.status === 'draft') {
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
      this.depensesGasoileEspece = {
      ...new Depenses(),
        createdDate: new Date(),
        createdBy: this.user.idAdmin,
        createdByName: this.user.name,
        type: 'Espèces gasoil',
        depenseActivity: {
          ...new DepenseActivity(),
          avance: null,
          avanceMois: null,
          gasoilEspece: gasoilEspece,
          carteTel: null,
          carMaintaining: null,
          desktopCharge: null,
          autreDesc: null,
          autreValue: null
        },
        affectedTo: this.employee,
        depenseFrom: 'activity runsheet ' + this.activityRunsheet.ref,
        description: '',
        affectedCar: this.activityRunsheet.listRunsheets[this.activityRunsheet.listRunsheets.length - 1].car,
        montant: gasoilEspece
      };
      this.depensesCarteTel = {
        ...new Depenses(),
        createdDate: new Date(),
        createdBy: this.user.idAdmin,
        createdByName: this.user.name,
        type: 'Recharge Carte Téléphonique',
        depenseActivity: {
          ...new DepenseActivity(),
          avance: null,
          avanceMois: null,
          gasoilEspece: null,
          carteTel: carteTel,
          carMaintaining: null,
          desktopCharge: null,
          autreDesc: null,
          autreValue: null
        },
        affectedTo: this.employee,
        depenseFrom: 'activity runsheet ' + this.activityRunsheet.ref,
        description: '',
        montant: carteTel,
        affectedCar: null
      };
      this.depensesAvance = {
        ...new Depenses(),
        createdDate: new Date(),
        createdBy: this.user.idAdmin,
        createdByName: this.user.name,
        type: 'Avance',
        depenseActivity: {
          ...new DepenseActivity(),
          avance: avance,
          avanceMois: null,
          gasoilEspece: null,
          carteTel: null,
          carMaintaining: null,
          desktopCharge: null,
          autreDesc: null,
          autreValue: null
        },
        affectedTo: this.employee,
        depenseFrom: 'activity runsheet ' + this.activityRunsheet.ref,
        description: '',
        montant: avance,
        affectedCar: null
      };
      this.depensesAutre = {
        ...new Depenses(),
        createdDate: new Date(),
        createdBy: this.user.idAdmin,
        createdByName: this.user.name,
        type: 'Autre',
        depenseActivity: {
          ...new DepenseActivity(),
          avance: null,
          avanceMois: null,
          gasoilEspece: null,
          carteTel: null,
          carMaintaining: null,
          desktopCharge: null,
          autreDesc: autreDesc,
          autreValue: autreValue
        },
        affectedTo: this.employee,
        depenseFrom: 'activity runsheet ' + this.activityRunsheet.ref,
        description: '',
        montant: autreValue,
        affectedCar: null
      };
      console.log(this.depensesAvance);
      console.log(this.depensesGasoileEspece);
      console.log(this.depensesAutre);
      console.log(this.depensesCarteTel);
    } else {
      this.valeurDepense = parseFloat(this.activityRunsheet.depenses.autreValue) + parseFloat(this.activityRunsheet.depenses.avance) + parseFloat(this.activityRunsheet.depenses.carteTel) + parseFloat(this.activityRunsheet.depenses.gasoilCarteValue) + parseFloat(this.activityRunsheet.depenses.gasoilEspece);
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
    /*this.tripService.getListOfTips(listOfIdsSuccess).subscribe((resTrip) => {
      this.ListScanSuccess = resTrip.body;
    });*/
    const listOfIdsFailure: string[] = this.activityRunsheet.listColisFailure.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
    /*this.tripService.getListOfTips(listOfIdsFailure).subscribe((resTrip) => {
      this.ListScanFailure = resTrip.body;
    });*/
    const listOfIdsPickUp: string[] = this.activityRunsheet.listColisPickUp.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
      .map((colis) => colis.idTrip);
  /*  this.tripService.getListOfTips(listOfIdsPickUp).subscribe((resTrip) => {
      this.ListScanPickUp = resTrip.body;
    });*/
   /* this.tripService.getListOfTips(this.activityRunsheet.listColisNonTreated).subscribe((resTrip) => {
      this.listColisNonTreated = resTrip.body;
    });*/

    const editActivityTrips = {listColisSuccess: listOfIdsSuccess, listColisFailure: listOfIdsFailure, listColisPickUp: listOfIdsPickUp,
      listColisNonTreated: this.activityRunsheet.listColisNonTreated };
    this.activityRunsheetService.getEditActivityTrips(editActivityTrips).subscribe((res) => {
      this.ListScanSuccess = res.body.listColisSuccess;
      this.ListScanFailure = res.body.listColisFailure;
      this.ListScanPickUp = res.body.listColisPickUp;
      this.listColisNonTreated = res.body.listColisNonTreated;
    });
  }


  openForceStatusFailure(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.tripService.updateTripsStatus(this.activityRunsheetService.newStatus,
        [this.activityRunsheetService.sacannedTrip.idTrip], this.user.name, '').subscribe((res) => {
          const trip: Trip = Array.of(JSON.parse(res['_body']).trips)[0][0];
          trip.statusTrip = this.activityRunsheetService.newStatus;
          trip.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste (non livré / non retourné) ',
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
          this.scanForceRetour = false;
          this.activityRunsheet.listColisFailure.push(new ColisFailureRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
          this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
          });
      });

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.scanForceRetour = false;
    });
  }

  openForceStatusSuccess(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.tripService.updateTripsStatus('Livree',
        [this.activityRunsheetService.sacannedTrip.idTrip], this.user.name, '').subscribe((res) => {
          const trip: Trip = Array.of(JSON.parse(res['_body']).trips)[0][0];
        this.scanForceLivree = false;
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
            this.ListScanSuccess.push(trip);
            this.playSuccessAudio();
            this.activityRunsheet.listColisSuccess.push(new ColisFailureRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
            this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
            });
      });

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.scanForceLivree = false;
      console.log(this.closeResult);
    });
  }

  openForceStatusReturned(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.tripService.updateTripsStatus('Retournee',
        [this.activityRunsheetService.sacannedTrip.idTrip], this.user.name, '').subscribe((res) => {
        const trip: Trip = Array.of(JSON.parse(res['_body']).trips)[0][0];
          trip.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste des colis (Livrés / Retournés)',
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
          this.ListScanSuccess.push(trip);
          this.playSuccessAudio();
          this.scanForceRetournee = false;
          this.activityRunsheet.listColisSuccess.push(new ColisFailureRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
          this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
          });
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.scanForceRetournee = false;
    });
  }
  confirmActivity(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.spinner2.show();
      this.closeResult = `Closed with: ${result}`;
      const listConflitTripsIds = this.listConflit.map((conflit) => conflit.colisId);
      const listLivraisonEnCoursIds = this.ListScanFailure.filter((trp) => trp.statusTrip === 'livraison en cours').map((trp) => trp.idTrip);
      const listToUpdateChezLivreur = this.ListScanPickUp.map((trp) => trp.idTrip).concat(listLivraisonEnCoursIds);
      const listChercheUnLivreur = this.ListScanPickUp.map((trp) => trp.idTrip);
      const listEnCoursDeRetourIds = this.ListScanFailure.filter((trp) => trp.statusTrip === 'En cours de retour').map((trp) => trp.idTrip);
      const listSuccessTripsIds = this.ListScanSuccess.map((trp) => trp.idTrip);
      const listSuccessTripsRetourneeIds = this.ListScanSuccess.filter((trp) => trp.statusTrip === 'Retournee').map((trp) => trp.idTrip);
      const listTreatedTripsIds = this.ListScanSuccess.map((trp) => trp.idTrip).concat(this.ListScanFailure.map((trp) => trp.idTrip));
      const runsheetsToUpdate = this.activityRunsheet.listRunsheets;
      const newRunsheets: Runsheet[] = [];
      runsheetsToUpdate.forEach((runsheet) => {
        const runsheetToPush = runsheet;
        runsheetToPush.listColis = runsheet.listColis.map((colis) => {
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
      this.activityRunsheet.nbColisNonLivree = this.ListScanFailure.length;
      this.activityRunsheet.nbColisNLALivree = listLivraisonEnCoursIds.length;
      this.activityRunsheet.nbColisNLRetour = this.ListScanFailure.length - listLivraisonEnCoursIds.length;
      this.activityRunsheet.nbColisLivree = listSuccessTripsIds.length - listSuccessTripsRetourneeIds.length;
      this.activityRunsheet.nbColisEncours = this.listColisNonTreated.length;
      const activityConfirm = {listConflitTripsIds: listConflitTripsIds, listLivraisonEnCoursIds: listLivraisonEnCoursIds, listToUpdateChezLivreur: listToUpdateChezLivreur,
        listChercheUnLivreur: listChercheUnLivreur, listEnCoursDeRetourIds: listEnCoursDeRetourIds, listSuccessTripsIds: listSuccessTripsIds,
        listSuccessTripsRetourneeIds: listSuccessTripsRetourneeIds, listTreatedTripsIds: listTreatedTripsIds, listRelatedTrips: this.listRelatedTrips,
        newRunsheets: newRunsheets, idAdmin: this.user.idAdmin, activityRunsheet: this.activityRunsheet, listConflit: this.listConflit,
        depensesAvance: this.depensesAvance, depensesAutre: this.depensesAutre, depensesCarteTel: this.depensesCarteTel,
        depensesGasoileEspece: this.depensesGasoileEspece};

      this.activityRunsheetService.confirmActivity(activityConfirm).subscribe(() => {
        this.openCheckSuccess('activityConfirmed');
        this.spinner2.hide();
      });


    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }


    conirmeActivite(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const listConflitTripsIds = this.listConflit.map((conflit) => conflit.colisId);
      const listLivraisonEnCoursIds = this.ListScanFailure.filter((trp) => trp.statusTrip === 'livraison en cours').map((trp) => trp.idTrip);
      const listToUpdateChezLivreur = this.ListScanPickUp.map((trp) => trp.idTrip).concat(listLivraisonEnCoursIds);
      const listChercheUnLivreur = this.ListScanPickUp.map((trp) => trp.idTrip);
      const listEnCoursDeRetourIds = this.ListScanFailure.filter((trp) => trp.statusTrip === 'En cours de retour').map((trp) => trp.idTrip);
      const listSuccessTripsIds = this.ListScanSuccess.map((trp) => trp.idTrip);
      const listSuccessTripsRetourneeIds = this.ListScanSuccess.filter((trp) => trp.statusTrip === 'Retournee').map((trp) => trp.idTrip);
      const listTreatedTripsIds = this.ListScanSuccess.map((trp) => trp.idTrip).concat(this.ListScanFailure.map((trp) => trp.idTrip));
      const runsheetsToUpdate = this.activityRunsheet.listRunsheets;
      const newRunsheets: Runsheet[] = [];
      this.tripService.getListOfTips(listConflitTripsIds).subscribe((resTripsConflit) => {
        const surveyTrips: Trip[] =  [];
        resTripsConflit.body.forEach((trip) => {
          trip.survey = true;
          surveyTrips.push(trip);
        });
        this.tripService.updateListOfTips(surveyTrips).subscribe();
      });
      runsheetsToUpdate.forEach((runsheet) => {
        const runsheetToPush = runsheet;
        runsheetToPush.listColis = runsheet.listColis.map((colis) => {
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
        this.activityRunsheet.confirmedByName = this.user.name;
        this.activityRunsheet.confirmedDate = new Date();
        this.activityRunsheet.nbColisNonLivree = this.ListScanFailure.length;
        this.activityRunsheet.nbColisNLALivree = listLivraisonEnCoursIds.length;
        this.activityRunsheet.nbColisNLRetour = this.ListScanFailure.length - listLivraisonEnCoursIds.length;
        this.activityRunsheet.nbColisLivree = listSuccessTripsIds.length - listSuccessTripsRetourneeIds.length;
        this.activityRunsheet.nbColisEncours = this.listColisNonTreated.length;
        this.tripService.updateListOfTips(this.listRelatedTrips).subscribe(() => {
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
                        if (listSuccessTripsRetourneeIds.length > 0) {
                          this.tripService.updateTripsStatus('Retournee', listSuccessTripsRetourneeIds, this.user.name, '').subscribe(() => {
                            this.activityRunsheetService.update(this.activityRunsheet).subscribe(() => {
                              this.conflitService.createList(this.listConflit).subscribe(() => {
                                this.openCheckSuccess('activityConfirmed');
                                this.saveDepenses();
                              });
                            });
                          });
                        } else {
                          this.activityRunsheetService.update(this.activityRunsheet).subscribe(() => {
                            this.conflitService.createList(this.listConflit).subscribe(() => {
                              this.openCheckSuccess('activityConfirmed');
                              this.saveDepenses();
                            });
                          });
                        }
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
      this.router.navigate(['/reconcile-runsheet/']);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  inNonTreatedList(trip: Trip) {
    const listNontreated = [];
    this.activityRunsheet.listRunsheets.forEach((runsheet) => {
      runsheet.listColis.forEach((colis) => {
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

  openSms(obj: Trip) {
    this.modalService.open(this.contentMsgAction, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.scannedTrip = obj;
      this.actionSendSms(obj);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  actionSendSms(obj: Trip) {

    let msg = '';
    if (!this.inputPreMessageToClient && !this.inputCusMessageToClient) {
      this.snackBar.open('Veuillez entrer un message!', 'Fermer', {
        duration: 12000,
      });
      return;
    }
    if (this.inputCusMessageToClient) {
      msg = this.inputCusMessageToClient;
    } else {
      msg = this.inputPreMessageToClient;
    }

    const date = new Date();
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers: headers});
    const msgdata = {
      msgTrip: [{
        ownerMsg: localStorage.getItem('auth'),
        contentMsg: msg,
        dateMsg: date
      }]
    };
    obj.msgTrip = msgdata.msgTrip;
    this.ListScanFailure.push(obj);
    this.playSuccessAudio();
    const jwt = JSON.parse(localStorage.getItem('currentUser')).token;
    const headerOptions = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Authorization': `Bearer ${jwt}`
    });
    this.http.put(environment.serverUrl + '/trip/update/' + obj.idTrip, msgdata, {headers: headerOptions}).subscribe(data => {
      this.snackBar.open('Message envoyé avec succès.', 'Fermer', {
        duration: 5000,
      });
        this.tripService.getTripscanListById(obj.idTrip).subscribe((res) => {
          obj = res.body;
          obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste (non livré / non retourné) ',
            'Success'));
          this.tripService.updateOneTrip(obj).subscribe();
          const index = this.listColisNonTreated.indexOf(obj);
          this.listColisNonTreated = this.listColisNonTreated.filter((trip) => trip.idTrip !== obj.idTrip);
          this.activityRunsheet.listColisNonTreated = this.listColisNonTreated.map((trip) => trip.idTrip);
          this.activityRunsheet.listColisFailure.push(new ColisFailureRunsheet(obj.idTrip, this.user.idAdmin, new Date(), false));
          this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
          });
        });
    }, error => {
      console.log(error); // Error getting the data
    });
  }

  affectActionToConflictTrip(value: any, trp: Trip) {
    if (value === null || value === undefined) {
      this.listConflit = this.listConflit.filter((conflit) => conflit.colisId !== trp.idTrip);
    } else if (value === 'lost') {
      this.listConflit = this.listConflit.filter((item) => item.colisId !== trp.idTrip);
      const conflit = new Conflit(null, trp.idTrip, new Date, this.user.idAdmin, this.activityRunsheet.entrepot, value, 'Reconcile Activity Runsheet - Lost', this.activityRunsheet.ref, false, null, null);
      this.listConflit.push(conflit);
    } else if (value === 'damaged') {
      this.listConflit = this.listConflit.filter((item) => item.colisId !== trp.idTrip);
      const conflit = new Conflit(null, trp.idTrip, new Date, this.user.idAdmin, this.activityRunsheet.entrepot, value, 'Reconcile Activity Runsheet - Damaged', this.activityRunsheet.ref, false, null, null);
      this.listConflit.push(conflit);
    }
  }

  forceRetour(trp: Trip) {
    this.activityRunsheetService.forcedRetour = true;
    this.modalService.open(MODALS['forceFailure']).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      for (let i = 0; i < this.ListScanFailure.length; i++) {
        if (trp.idTrip === this.ListScanFailure[i].idTrip) {
          this.ListScanFailure.splice(i, 1);
        }
      }
      this.ListScanNBFailure = this.ListScanFailure.length;
      this.listColisNonTreated.push(trp);
      this.activityRunsheet.listColisNonTreated.push(trp.idTrip);
      const colisToDelete = this.activityRunsheet.listColisFailure.slice()
        .filter((colis) => ((colis.idTrip === trp.idTrip) && (colis.removed === false)))[0];
      const index = this.activityRunsheet.listColisFailure.indexOf(colisToDelete);
      this.activityRunsheet.listColisFailure[index].removed = true;
      this.activityRunsheet.listColisFailure[index].removedBy = this.user.idAdmin;
      this.activityRunsheet.listColisFailure[index].removedDate = new Date();
       this.tripService.updateTripsStatus('Retour',
        [trp.idTrip], this.user.name, '').subscribe(() => {
        this.tripService.getTripscanListById(trp.idTrip).subscribe((res) => {
          const trip = res.body;
          trip.statusTrip = 'Retour';
          trip.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Reconcile Activity Runsheet : ' + this.activityRunsheet.ref + ' - Liste (non livré / non retourné) ',
            'Success : forced Retour status'));
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
          trip.statusTrip = 'Retour';
          this.ListScanFailure.push(trip);
          this.activityRunsheet.listColisFailure.push(new ColisFailureRunsheet(trip.idTrip, this.user.idAdmin, new Date(), false));
          this.activityRunsheetService.update(this.activityRunsheet).subscribe((res) => {
            this.activityRunsheetService.forcedRetour = false;
          });
        });
      });

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
      this.activityRunsheetService.forcedRetour = false;
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

  private calculateNbStops() {
    this.listRelatedTrips = [];
    this.activityRunsheet.nbStop = 0;
    this.nbStop = 0;
    const trips: Trip[] = this.ListScanSuccess;
    const listClientsJumia = [];
    const listRefTrips = [];
    trips.forEach(trip => {
      if (!!trip.refJumia) {
         if (listClientsJumia.indexOf(trip.destTrip.contactAdr) < 0) {
           listClientsJumia.push(trip.destTrip.contactAdr);
           listRefTrips.push(trip.refJumia);
           this.activityRunsheet.nbStop++;
           this.nbStop = this.nbStop + 1;
           this.activityRunsheet.fraisSoutraitant = this.activityRunsheet.fraisSoutraitant + trip.fraisSoutraitant;
           trip.parentStop = true;
           this.listRelatedTrips.push(trip);
         } else {
           const relatedTrip = trip;
           relatedTrip.relatedRefStop = listRefTrips[listClientsJumia.indexOf(trip.destTrip.contactAdr)];
           relatedTrip.costTrip = 0;
           this.listRelatedTrips.push(relatedTrip);
         }
      } else {
        this.activityRunsheet.nbStop++;
        this.nbStop = this.nbStop + 1;
        this.activityRunsheet.fraisSoutraitant = this.activityRunsheet.fraisSoutraitant + trip.fraisSoutraitant;
      }
    });
  }


}

@Component({
  selector: 'force-etat-non-livree',
  templateUrl: './force-etat-non-livree.html',
  styleUrls: ['./create-activity-runsheet.component.scss']

})
export class NgbdModalConfirmNonLivree implements OnInit {
  trip: Trip = null;
  newStatus: string;

  constructor(public modal: NgbActiveModal, public activityRunsheetService: ActivityRunsheetService) {
  }

  ngOnInit() {
    this.trip = this.activityRunsheetService.sacannedTrip;
  }

  updateNewStatus(newStatus: string) {
    this.activityRunsheetService.newStatus = newStatus;
  }
}

@Component({
  selector: 'force-etat-livree',
  templateUrl: './force-etat-livree.html',
  styleUrls: ['./create-activity-runsheet.component.scss']

})
export class NgbdModalConfirmLivree implements OnInit {
  trip: Trip = null;
  newStatus: string;

  constructor(public modal: NgbActiveModal, public activityRunsheetService: ActivityRunsheetService) {
  }

  ngOnInit() {
    this.trip = this.activityRunsheetService.sacannedTrip;
  }

  updateNewStatus(newStatus: string) {
    this.activityRunsheetService.newStatus = newStatus;
  }
}

@Component({
  selector: 'confirm-activity-modal',
  templateUrl: './confirm-activity-modal.html',
  styleUrls: ['./create-activity-runsheet.component.scss']

})
export class NgbdModalConfirmActivity implements OnInit {

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
  selector: 'activity-confirmed-modal',
  templateUrl: './activity-confirmed-modal.html',
  styleUrls: ['./create-activity-runsheet.component.scss']

})
export class NgbdModalActivityConfirmed implements OnInit {

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

@Component({
  selector: 'force-etat-retournee',
  templateUrl: './force-etat-retournee.html',
  styleUrls: ['./create-activity-runsheet.component.scss']

})
export class NgbdModalConfirmReturned implements OnInit {
  trip: Trip = null;
  newStatus: string;

  constructor(public modal: NgbActiveModal, public activityRunsheetService: ActivityRunsheetService) {
  }

  ngOnInit() {
    this.trip = this.activityRunsheetService.sacannedTrip;
  }

  updateNewStatus(newStatus: string) {
    this.activityRunsheetService.newStatus = newStatus;
  }
}


const MODALS: { [name: string]: Type<any> } = {
  forceFailure: NgbdModalConfirmNonLivree,
  forceSuccess: NgbdModalConfirmLivree,
  confirmActivity: NgbdModalConfirmActivity,
  activityConfirmed: NgbdModalActivityConfirmed,
  forceReturned: NgbdModalConfirmReturned
};
