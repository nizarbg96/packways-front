import {Component, Inject, OnDestroy, OnInit, Type} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';
import {Runsheet} from 'src/app/model/runsheet.model';
import {TripService} from '../../trips/trips.service';
import {RunsheetService} from '../runsheet.service';
import {Moment} from 'moment';
import * as moment from 'moment';
import {MapTripsComponent} from '../../map-trips/map-trips.component';
import {ActivatedRoute, NavigationStart, Params, Router} from '@angular/router';
import {DriversService} from '../../drivers/drivers.service';
import {ColisRunsheet} from 'src/app/model/colis-runsheet.model';
import {Subscription} from 'rxjs';
import {Entrepot} from '../../../model/entrepot.model';
import {MoveableUnitService} from '../../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../../entrepot/entrepot.service';
import {RunsheetInfo} from '../runsheet.component';
import {MuInfo} from '../../moveable-unit/moveable-unit.component';
import {UserService} from '../../users/users.service';
import {Trip} from '../../trips/Trip';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ColisFailureRunsheet} from '../../../model/colis-failure-runsheet.model';
import {IRunsheetHistory, RunsheetHistory} from '../../../model/runsheet-history.model';
import {HistoriqueScan} from '../../../model/historique-scan.model';
import {ConflitService} from '../../conflict-trips/conflit.service';
import {Conflit} from '../../../model/conflit.model';
import {RamassageService} from '../../ramassage/ramassage.service';
import {Car, ICar} from '../../../model/car.model';
import {CarService} from '../../car/car.service';

@Component({
  selector: 'app-runsheet-create',
  templateUrl: './runsheet-create.component.html',
  styleUrls: ['./runsheet-create.component.scss']
})
export class RunsheetCreateComponent implements OnInit, OnDestroy {
   closeResult: string;
   car: Car;

  constructor(private tservice: TripService, private snackBar: MatSnackBar, private runsheetService: RunsheetService,
              private activatedRoute: ActivatedRoute, private driverService: DriversService, private router: Router,
              public dialog: MatDialog, private userService: UserService, private modalService: NgbModal,
              private conflitService: ConflitService, public ramassageService: RamassageService, public moveableUnitService: MoveableUnitService,
              private carService: CarService) {
  }

  date: Date;
  nbSelectedRunsheet = 0;
  affectedDriver: any = null;
  checked = true;
  // vars of scanQR
  searchTermscan: any;
  ListScan = [];
  ListScanNB = 0;
  //
  driver: any = null;
  cout: number = null;
  user: any;
  runsheet: Runsheet = null;
  routeSub: Subscription;
  confirmed = false;
  runsheetInfo: RunsheetInfo;
   affectedMatricule: string;


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.runsheetInfo = this.runsheetService.runsheetInfo;
    if (!this.runsheetInfo) {
      this.router.navigate(['/runsheet']);
      return;
    }
    this.createNewDraftRunsheet(); // !!!!!!!! ADD ENTREPOT TO RUNSHEET
    // saving draft when leaving component
    this.routeSub = this.router.events.subscribe((event) => {
      if ((event instanceof NavigationStart) && !this.confirmed) {
        this.runsheetService.update(this.runsheet).subscribe();
      }
    });
  }

  // select driver to add in runsheet
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToCreateRunsheetComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result ' + result);
      this.runsheetInfo = result;
      if (!!this.runsheetInfo) {
        this.runsheetService.runsheetInfo = this.runsheetInfo;
        this.affectedMatricule = this.runsheetInfo.matricule;
        this.driver = this.runsheetInfo.driver;
        this.cout = this.runsheetInfo.cout;
        this.car = this.runsheetInfo.car;
        console.log(this.driver + ' ' + this.affectedMatricule);
        this.runsheet.driver = this.driver;
        this.runsheet.matricule = this.affectedMatricule;
        this.runsheet.cout = this.cout;
        this.runsheet.car = this.car;
        this.runsheetService.update(this.runsheet).subscribe((res) => {
          this.runsheet = res.body;
        });
      }
    });
  }

  scanList() {
    // console.log("sanc: ",this.searchTermscan)
    // vérif
    let verif = false;
    for (let index = 0; index < this.ListScan.length; index++) {
      if (this.searchTermscan === this.ListScan[index].idTrip || this.searchTermscan === this.ListScan[index].refTrip) {
        verif = true;
      }
    }
    //
    if (verif === false) {
      this.tservice.getTripscanListById(this.searchTermscan).subscribe((data) => {
        const obj = data.body;
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScan.length; index++) {
          if (obj.idTrip === this.ListScan[index].idTrip || obj.refTrip === this.ListScan[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if (!!obj.entrepot) {
            if (obj.entrepot.id !== this.runsheet.entrepot.id) {
              const msg = 'impossible de scanner le colis! colis n\'appartient pas à ce Hub';
              this.snackBar.open(msg, 'Fermer', {duration: 8000});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  runsheet: ' + this.runsheet.ref,
                'Exception : ' + msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheet creation', this.runsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
              return;
            }
          }
          if ((obj.currentRunsheetId !== null) && (obj.currentRunsheetId !== 'null') && (obj.currentRunsheetId !== undefined)) {
            this.runsheetService.find(obj.currentRunsheetId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans la runsheet' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open(msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.ref,
                'Exception : ' + msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation', this.runsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else if ((obj.currentMUId !== null) && (obj.currentMUId !== 'null') && (obj.currentMUId !== undefined)) {
            this.moveableUnitService.find(obj.currentMUId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans la moveable unit' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open(msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.ref,
                'Exception : ' + msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation', this.runsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else if ((obj.currentPickUpId !== null) && (obj.currentPickUpId !== 'null') && (obj.currentPickUpId !== undefined)) {
            this.ramassageService.find(obj.currentPickUpId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans le pick up' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open(msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.ref,
                'Exception : ' + msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation', this.runsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else {
            if (this.runsheet.type === 'livraison') {
              if (obj.statusTrip === 'Chez Livreur') {
                this.ListScan.push(obj);
                this.runsheet.listColis.push(new ColisRunsheet(obj.idTrip, false, this.user.idAdmin, new Date(), false));
                const tripToAddInRunsheet = {idTrip: obj.idTrip, runsheetHistory: new RunsheetHistory(this.runsheet.id, this.user.name, new Date),
                  historiqueScan: new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.ref, 'Success'),
                  runsheet: this.runsheet };
                this.runsheetService.addTrip(tripToAddInRunsheet).subscribe(() => {
                  this.playSuccessAudio();
                });

              } else {
                const msg = 'Le colis doit être chez livrer ! . Statut de colis scanné : ' + obj.statusTrip;
                this.snackBar.open(msg, 'Fermer', {
                  duration: 8000,
                });
                this.playFailureAudio();
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.ref, 'Exception : ' + msg));
                this.tservice.updateOneTrip(obj).subscribe();
                if (obj.statusTrip === 'Retour') {
                  this.runsheetService.sacannedTrip = obj;
                  this.openForceStatusRetour('forceRetour');
                } else {
                  this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                    const admin = resUser.json();
                    const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation', this.runsheet.ref);
                    this.conflitService.create(conflit).subscribe();
                  });
                }
              }
            } else if (this.runsheet.type === 'retour') {
              if (obj.statusTrip === 'Retour') {
                this.ListScan.push(obj);
                this.runsheet.listColis.push(new ColisRunsheet(obj.idTrip, false, this.user.idAdmin, new Date(), false));
                const tripToAddInRunsheet = {idTrip: obj.idTrip, runsheetHistory: new RunsheetHistory(this.runsheet.id, this.user.name, new Date),
                  historiqueScan: new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.ref, 'Success'),
                  runsheet: this.runsheet };
                this.runsheetService.addTrip(tripToAddInRunsheet).subscribe(() => {
                  this.playSuccessAudio();
                });

              } else {
                this.playFailureAudio();
                const msg = 'L\'état de colis doit être " Retour " ! . Statut de colis scanné : ' + obj.statusTrip;
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.ref, 'Exception : ' + msg));
                this.tservice.updateOneTrip(obj).subscribe((resTrip) => {
                  const tripRes = resTrip.body;
                  this.snackBar.open(msg, 'Fermer', {
                    duration: 8000,
                  });
                  if (tripRes.statusTrip === 'Chez Livreur') {
                    this.runsheetService.sacannedTrip = tripRes;
                    this.openForceStatusRetour('forceRetour');
                  } else {
                    this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                      const admin = resUser.json();
                      const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation', this.runsheet.ref);
                      this.conflitService.create(conflit).subscribe();
                    });
                  }
                });
              }
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
      this.snackBar.open('Ce colis a été scanné !', 'Fermer', {
        duration: 8000,
      });
      this.playFailureAudio();
    }
    this.searchTermscan = '';
    this.ListScanNB = this.ListScan.length + 1;
  }

  deleteScanList(trip) {
    for (let i = 0; i < this.ListScan.length; i++) {
      if (trip.idTrip === this.ListScan[i].idTrip) {
        this.ListScan.splice(i, 1);
      }
    }
    this.ListScanNB = this.ListScan.length;
    const colisToDelete = this.runsheet.listColis.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.runsheet.listColis.indexOf(colisToDelete);
    this.runsheet.listColis[index].removed = true;
    this.runsheet.listColis[index].removedBy = this.user.idAdmin;
    this.runsheet.listColis[index].removedDate = new Date();
    this.tservice.updateRunsheet(trip.idTrip, new RunsheetHistory(null, this.user.idAdmin, new Date)).subscribe(() => {
      this.runsheetService.update(this.runsheet).subscribe();
    });
  }

  createNewDraftRunsheet() {
    this.userService.getAdminById(this.user.idAdmin).subscribe((res) => {
      const admin = res.json();
      const draftRunsheet = new Runsheet(null, null, null, 'draft', this.user.idAdmin, new Date());
      draftRunsheet.entrepot = admin.entrepot;
      if (!!this.runsheetInfo) {
        this.affectedMatricule = this.runsheetInfo.matricule;
        this.driver = this.runsheetInfo.driver;
        this.cout = this.runsheetInfo.cout;
        this.car = this.runsheetInfo.car
        draftRunsheet.matricule = this.affectedMatricule;
        draftRunsheet.driver = this.driver;
        draftRunsheet.cout = this.cout;
        draftRunsheet.type = this.runsheetInfo.type;
        draftRunsheet.car = this.runsheetInfo.car;
      }

      this.runsheetService.create(draftRunsheet).subscribe((resRunsheet) => {
        this.runsheet = resRunsheet.body;
      });
    });
  }

  confirmRunsheet() {
    this.runsheet.status = 'confirmed';
    this.runsheet.confirmedDate = new Date();
    this.runsheet.confirmedBy = this.user.idAdmin;
    this.runsheetService.updateDriver(this.runsheet, this.driver.idDriver).subscribe(() => {
      this.confirmed = true;
      this.router.navigate(['/runsheet']);
    });
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length;
  }

  openForceStatusRetour(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const listTrips = [this.runsheetService.sacannedTrip.idTrip];
      if (this.runsheetService.sacannedTrip.statusTrip === 'Retour') {
        const obj = this.runsheetService.sacannedTrip;
        obj.statusTrip = 'Chez Livreur';
        this.ListScan.push(obj);
        this.tservice.updateTripsStatus('Chez Livreur', listTrips, this.user.name, '').subscribe(() => {
          this.tservice.getTripscanListById(this.runsheetService.sacannedTrip.idTrip).subscribe((resT) => {
            const trip = resT.body;
            this.runsheet.listColis.push(new ColisRunsheet(trip.idTrip, false, this.user.idAdmin,
              new Date(), false));
            this.playSuccessAudio();
            this.tservice.updateRunsheet(trip.idTrip, new RunsheetHistory(this.runsheet.id, this.user.name, new Date)).subscribe(() => {
              this.tservice.getTripscanListById(trip.idTrip).subscribe((resT2) => {
                const trip2 = resT2.body;
                this.runsheetService.update(this.runsheet).subscribe(() => {
                  trip2.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.id, 'Success : forced status'));
                  this.tservice.updateOneTrip(trip2).subscribe();
                });
              });
            });
          });
        });
      } else if (this.runsheetService.sacannedTrip.statusTrip === 'Chez Livreur') {
        const obj = this.runsheetService.sacannedTrip;
        obj.statusTrip = 'Retour';
        this.ListScan.push(obj);
        this.tservice.updateTripsStatus('Retour', listTrips, this.user.name, '').subscribe(() => {
            this.tservice.getTripscanListById(this.runsheetService.sacannedTrip.idTrip).subscribe((resT) => {
              const trip = resT.body;
              this.runsheet.listColis.push(new ColisRunsheet(trip.idTrip, false, this.user.idAdmin,
                new Date(), false));
              this.playSuccessAudio();
              this.tservice.updateRunsheet(trip.idTrip, new RunsheetHistory(this.runsheet.id, this.user.name, new Date)).subscribe(() => {
                this.tservice.getTripscanListById(trip.idTrip).subscribe((resT2) => {
                  const trip2 = resT2.body;
                  this.runsheetService.update(this.runsheet).subscribe(() => {
                    trip2.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.id, 'Success : forced status'));
                    this.tservice.updateOneTrip(trip2).subscribe();
                  });
                });
              });
            });
          }
        ); }
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
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

  ngOnDestroy(): void {
    if (!this.confirmed) {
      this.runsheetService.update(this.runsheet).subscribe();
    }
    if (!!this.runsheetInfo) {
      this.routeSub.unsubscribe();
    }
  }
}

@Component({
  selector: 'add-driver-to-create-runsheet-dialog',
  templateUrl: 'add-driver-to-create-runsheet-dialog.html',
})
export class DialogAddDriverToCreateRunsheetComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  entrepots: Entrepot[] = [];
  matricule: string;
  runsheetInfo: RunsheetInfo = {driver: null, matricule: null, type: null, cout: null, car: null};
  carValue: Car;
  cars: ICar[] = [];


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToCreateRunsheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private muService: MoveableUnitService,
    private entrepotService: EntrepotService, private runsheetService: RunsheetService, private driverService: DriversService,
    private carService: CarService) {
  }

  ngOnInit(): void {
    this.getAllDrivers();
    this.getCars();
    this.getEntrepots();
    if (!!this.runsheetService.runsheetInfo) {
      if (!!this.runsheetService.runsheetInfo.driver) {
        this.affectedDriverNgModel = this.runsheetService.runsheetInfo.driver.nameDriver + ' ' + this.runsheetService.runsheetInfo.driver.surnameDriver;
      }
      if (!!this.runsheetService.runsheetInfo.driver) {
        this.runsheetInfo.driver = this.runsheetService.runsheetInfo.driver;
      }
      if (!!this.runsheetService.runsheetInfo.matricule) {
        this.runsheetInfo.matricule = this.runsheetService.runsheetInfo.matricule;
      }
      if (!!this.runsheetService.runsheetInfo.cout) {
        this.runsheetInfo.cout = this.runsheetService.runsheetInfo.cout;
      }
      if (!!this.runsheetService.runsheetInfo.car) {
        this.runsheetInfo.car = this.runsheetService.runsheetInfo.car;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllDrivers() {
    this.tservice.getDrivers().subscribe(data => {
      const obj = Array.of(JSON.parse(data['_body']).data);
      const jsonObj = obj[0];
      for (let i = 0; i < jsonObj.length; i++) {
        if ((jsonObj[i].accountActive === true) && (jsonObj[i].idDriver !== '5ca28097e4970623916b53e7')) {
          this.Listdriver.push(jsonObj[i]);
          this.Listdriverauto.push(jsonObj[i].nameDriver + ' ' + jsonObj[i].surnameDriver);
        }
      }
    }, error => {
    });
  }

  getCars() {
    this.carService.query().subscribe((res) => {
      this.cars = res.body.filter(value => !value.deleted);
    });
  }
  affectCar(car: Car) {
    this.carService.find(car.id).subscribe((res) => {
      this.carValue = res.body;
      this.runsheetInfo.car = this.carValue;
      this.runsheetInfo.matricule = this.carValue.matVehicle;
    });
  }

  getSelectedDriver(driver: any) {

    if (driver != null) {
      const ind = this.Listdriverauto.indexOf(driver.title);
      this.affectedDriver = this.Listdriver[ind];
      this.driverService.getOneDriver(this.affectedDriver.idDriver).subscribe((oneDriver) => {
        this.runsheetInfo.driver =  oneDriver.json();
        this.cars = this.affectedDriver.affectedCars;
        if(oneDriver.json().soutraitant){
          this.runsheetInfo.cout = oneDriver.json().fraisSoutraitance;
        }
      });
    }else{
      this.affectedDriver = null;
      this.runsheetInfo.driver = null;
      this.cars = [];
    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }
}

@Component({
  selector: 'create-force-etat-retour',
  templateUrl: './create-force-etat-retour.html',
  styleUrls: ['./runsheet-create.component.scss']

})
export class NgbdModalCreateForceRetour implements OnInit {
  trip: Trip = null;
  newStatus: string;

  constructor(public modal: NgbActiveModal, private runsheetService: RunsheetService) {
  }

  ngOnInit() {
    this.trip = this.runsheetService.sacannedTrip;
  }

}

const MODALS: { [name: string]: Type<any> } = {
  forceRetour: NgbdModalCreateForceRetour
};
