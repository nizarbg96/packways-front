import {Component, Inject, OnDestroy, OnInit, Type} from '@angular/core';
import {Runsheet} from '../../../model/runsheet.model';
import {Subscription} from 'rxjs';
import {TripService} from '../../trips/trips.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {RunsheetService} from '../../runsheet/runsheet.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {DriversService} from '../../drivers/drivers.service';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {MoveableUnit} from '../../../model/moveable-unit.model';
import {MoveableUnitService} from '../moveable-unit.service';
import {Entrepot} from '../../../model/entrepot.model';
import {FormControl, Validators} from '@angular/forms';
import {MuInfo} from '../moveable-unit.component';
import {EntrepotService} from '../../entrepot/entrepot.service';
import {MoveableUnitHistory} from '../../../model/moveableUnit-history.model';
import {HistoriqueScan} from '../../../model/historique-scan.model';
import {Trip} from '../../trips/Trip';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RamassageService} from '../../ramassage/ramassage.service';
import {Conflit} from '../../../model/conflit.model';
import {UserService} from '../../users/users.service';
import {ConflitService} from '../../conflict-trips/conflit.service';

@Component({
  selector: 'app-moveable-unit-edit',
  templateUrl: './moveable-unit-edit.component.html',
  styleUrls: ['./moveable-unit-edit.component.scss']
})

export class MoveableUnitEditComponent implements OnInit, OnDestroy {

  date: Date;
  nbSelectedMU = 0;
  affectedDriver: any = null;
  checked = true;
  // vars of scanQR
  searchTermscan: any;
  ListScan = [];
  ListScanNB = 0;
  //
  driver: any = null ;
  user: any;
  moveableUnit: MoveableUnit = null ;
  routeSub: Subscription;
  confirmed = false;
  muInfo: MuInfo;
  private affectedMatricule: string;
  private affectedEntrepotSrc: Entrepot;
  private affectedEntrepotDest: Entrepot;
  private closeResult: string;

  constructor(private tservice: TripService, private snackBar: MatSnackBar, private moveableUnitService: MoveableUnitService,
              private activatedRoute: ActivatedRoute, private driverService: DriversService, private router: Router,
              public dialog: MatDialog, private modalService: NgbModal, private runsheetService: RunsheetService, private ramassageService: RamassageService,
              private userService: UserService, private conflitService: ConflitService) { }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    // get Driver
    const idMoveableUnit = this.activatedRoute.snapshot.paramMap.get('idMoveableUnit') + '';
    if (!!idMoveableUnit)  {
      this.moveableUnitService.find(idMoveableUnit).subscribe((res) => {
        this.moveableUnit = res.body;
        if (this.moveableUnit.status === 'confirmed') {
          this.confirmed = true;
        }
        this.affectedEntrepotDest = this.moveableUnit.entrepotDest;
        this.affectedEntrepotSrc = this.moveableUnit.entrepotSrc;
        this.affectedMatricule = this.moveableUnit.matricule;
        this.driver = this.moveableUnit.driver;
        this.moveableUnitService.muInfo = {driver: this.driver, entrepotSrc: this.affectedEntrepotSrc, entrepotDest: this.affectedEntrepotDest, matricule: this.affectedMatricule};
        this.moveableUnitService.muConfirmed = (this.moveableUnit.status === 'confirmed');
        const listOfIds: string[] = this.moveableUnit.listColis.slice()
          .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)  )
          .map((colis) => colis.idTrip) ;
        this.tservice.getListOfTips(listOfIds).subscribe((resTrips) => {
          this.ListScan = resTrips.body;
        });
      });
    }
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          this.moveableUnitService.update(this.moveableUnit).subscribe();
        }
    });

  }
  // select driver to add in mu
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToEditMUComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.muInfo = result;
      if (!!this.muInfo) {
        this.moveableUnitService.muInfo = this.muInfo;
        this.affectedEntrepotDest = this.muInfo.entrepotDest;
        this.affectedMatricule = this.muInfo.matricule;
        this.driver = this.muInfo.driver;
        this.moveableUnit.entrepotDest = this.affectedEntrepotDest;
        this.moveableUnit.matricule = this.affectedMatricule;
        this.moveableUnit.driver = this.driver;
        this.moveableUnitService.update(this.moveableUnit).subscribe((res) => {
          this.moveableUnit = res.body;
        });
      }
    });
  }

  scanList() {
    // console.log("scan: ",this.searchTermscan)
    // vérif
    let verif = false;
    for (let index = 0; index < this.ListScan.length; index++) {
      if (this.searchTermscan === this.ListScan[index].idTrip || this.searchTermscan === this.ListScan[index].refTrip) {
        verif = true;
      }
    }
    //
    if (verif === false) {
      this.tservice.getTripscanListById(this.searchTermscan).subscribe(data => {
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
              if (obj.entrepot.id !== this.moveableUnit.entrepotSrc.id) {
                const msg = 'impossible de scanner le colis! colis n\'appartient pas à ce Hub';
                this.snackBar.open(msg, 'Fermer', {duration: 8000,});
                this.playFailureAudio();
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  moveable unit: ' + this.moveableUnit.ref,
                  'Exception : ' + msg));
                this.tservice.updateOneTrip(obj).subscribe();
                this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                  const admin = resUser.json();
                  const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'M.U creation', this.moveableUnit.ref);
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
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  moveable unit: ' + this.moveableUnit.ref,
                  'Exception : ' + msg));
                this.tservice.updateOneTrip(obj).subscribe();
                this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                  const admin = resUser.json();
                  const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'M.U creation', this.moveableUnit.ref);
                  this.conflitService.create(conflit).subscribe();
                });
              });
            } else if ((obj.currentMUId !== null) && (obj.currentMUId !== 'null') && (obj.currentMUId !== undefined)) {
              this.moveableUnitService.find(obj.currentMUId).subscribe((res) => {
                const msg = 'impossible de scanner le colis! ce colis existe dans la moveable unit' +
                  ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
                this.snackBar.open(msg, 'Fermer', {duration: 8000,});
                this.playFailureAudio();
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  moveable unit: ' + this.moveableUnit.ref,
                  'Exception : ' + msg));
                this.tservice.updateOneTrip(obj).subscribe();
                this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                  const admin = resUser.json();
                  const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'M.U creation', this.moveableUnit.ref);
                  this.conflitService.create(conflit).subscribe();
                });
              });
            } else if ((obj.currentPickUpId !== null) && (obj.currentPickUpId !== 'null') && (obj.currentPickUpId !== undefined)) {
              this.ramassageService.find(obj.currentPickUpId).subscribe((res) => {
                const msg = 'impossible de scanner le colis! ce colis existe dans le pick up' +
                  ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
                this.snackBar.open(msg, 'Fermer', {duration: 8000,});
                this.playFailureAudio();
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  moveable unit: ' + this.moveableUnit.ref,
                  'Exception : ' + msg));
                this.tservice.updateOneTrip(obj).subscribe();
                this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                  const admin = resUser.json();
                  const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'M.U creation', this.moveableUnit.ref);
                  this.conflitService.create(conflit).subscribe();
                });
              });
            } else {
              if (obj.statusTrip === 'Chez Livreur' || obj.statusTrip === 'Retour') {
                this.ListScan.push(obj);
                this.playSuccessAudio();
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la moveable unit: ' + this.moveableUnit.ref,
                  'Success'));
                this.tservice.updateOneTrip(obj).subscribe((resTrip) => {
                  const trip = resTrip.body;
                  // code to add colisRunsheet to listColis of mu
                  this.moveableUnit.listColis.push(new ColisRunsheet(obj.idTrip, false, this.user.idAdmin,
                    new Date(), false));
                  this.tservice.updateMoveableUnit(obj.idTrip, new MoveableUnitHistory(this.moveableUnit.id, this.user.idAdmin, new Date())).subscribe(() => {
                    this.moveableUnitService.update(this.moveableUnit).subscribe();
                  });
                });
              } else {
                const msg = 'Le colis doit être chez livrer ! . Statut de colis scanné : ' + obj.statusTrip;
                this.snackBar.open(msg, 'Fermer', {
                  duration: 8000,
                });
                this.playFailureAudio();
                obj.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la moveable unit: ' + this.moveableUnit.ref,
                  'Exception : ' + msg));
                this.tservice.updateOneTrip(obj).subscribe((res) => {
                  this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
                    const admin = resUser.json();
                    const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'M.U creation', this.moveableUnit.ref);
                    this.conflitService.create(conflit).subscribe();
                  });
                });
              }
            }
          }
          else
          {
            const msg = 'Ce colis a été scanné';
            this.snackBar.open(msg, 'Fermer', {
              duration: 8000,
            });
            this.playFailureAudio();
          }
        }
      );
    } else {
      this.snackBar.open('Ce colis a été scanné', 'Fermer', {
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
    const colisToDelete = this.moveableUnit.listColis.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.moveableUnit.listColis.indexOf(colisToDelete);
    this.moveableUnit.listColis[index].removed = true;
    this.moveableUnit.listColis[index].removedBy =  this.user.idAdmin;
    this.moveableUnit.listColis[index].removedDate =  new Date() ;
    this.tservice.updateMoveableUnit(trip.idTrip, new MoveableUnitHistory(null, this.user.idAdmin, new Date())).subscribe(() => {
      this.moveableUnitService.update(this.moveableUnit).subscribe();
    });
  }
  createNewDraftMoveableUnit() {
    const draftMoveableUnit = new MoveableUnit(null, null, 'draft', this.user.idAdmin, new Date());
    this.moveableUnitService.create(draftMoveableUnit).subscribe((res) => {
      this.moveableUnit = res.body;
    });
  }

  confirmMoveableUnit() {
    this.moveableUnit.status = 'confirmed';
    this.moveableUnit.confirmedDate = new Date();
    this.moveableUnit.confirmedBy = this.user.idAdmin;
    this.moveableUnitService.updateDriver(this.moveableUnit, this.driver.idDriver).subscribe(() => {
      this.confirmed = true;
      this.moveableUnitService.muConfirmed = true;
      this.router.navigate(['/mu']);
    });
  }
  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;
  }
  openForceStatusRetour(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const trip = this.moveableUnitService.scannedTrip;
      this.moveableUnit.listColis.push(new ColisRunsheet(trip.idTrip, false, this.user.idAdmin,
        new Date(), false));
      const listTrips = [trip.refTrip];
      this.tservice.updateTripsStatus('Chez Livreur', listTrips, this.user.name, '').subscribe(() => {
          this.tservice.getTripscanListById(trip.idTrip).subscribe((resTrip) => {
            const trip2  = resTrip.body;
            this.ListScan.push(trip2);
            this.playSuccessAudio();
            this.tservice.updateMoveableUnit(trip2.idTrip, new MoveableUnitHistory(this.moveableUnit.id, this.user.idAdmin, new Date)).subscribe(() => {
              this.tservice.getTripscanListById(trip2.idTrip).subscribe((resTrp) => {
                const trip3  = resTrp.body;
                this.moveableUnitService.update(this.moveableUnit).subscribe(() => {
                  trip3.historiqueScans.push(new HistoriqueScan(this.user.name, new Date(), 'Ajout dans la  moveable unit: ' + this.moveableUnit.ref, 'Success : forced status'));
                  this.tservice.updateOneTrip(trip3).subscribe();
                });
              });
            });
          });
        }
      );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
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

  ngOnDestroy(): void {
    if (!this.confirmed) {
        this.moveableUnitService.update(this.moveableUnit).subscribe();
      }
    if (!!this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}

@Component({
  selector: 'add-driver-to-edit-mu-dialog',
  templateUrl: 'add-driver-to-edit-mu-dialog.html',
})
export class DialogAddDriverToEditMUComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  entrepots: Entrepot[] = [];
  entrepotSrc = new FormControl('', Validators.required);
  entrepotDest = new FormControl('', Validators.required );
  entrepotSrcValue: Entrepot =  null;
  entrepotDestValue: Entrepot =  null;
  matricule: string;
  muInfo: MuInfo = {matricule: null, driver: null, entrepotDest: null, entrepotSrc: null};


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToEditMUComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private moveableUnitService: MoveableUnitService,
    private entrepotService: EntrepotService, private driverService: DriversService) {}

  ngOnInit(): void {
    this.getAllDrivers();
    this.getEntrepots();
    if(!!this.moveableUnitService.muInfo){
      if ( !!this.moveableUnitService.muInfo.driver){
        this.affectedDriverNgModel = this.moveableUnitService.muInfo.driver.nameDriver + ' ' + this.moveableUnitService.muInfo.driver.surnameDriver;
      }
      if (!!this.moveableUnitService.muInfo.driver){
        this.muInfo.driver = this.moveableUnitService.muInfo.driver;
      }
      if(!!this.moveableUnitService.muInfo.matricule){
        this.muInfo.matricule = this.moveableUnitService.muInfo.matricule;
      }
      if(this.moveableUnitService.muInfo.entrepotSrc){
        this.entrepotSrcValue = this.moveableUnitService.muInfo.entrepotSrc;
      }
      if(this.moveableUnitService.muInfo.entrepotDest){
        this.entrepotDestValue = this.moveableUnitService.muInfo.entrepotDest;
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
  getSelectedDriver(driver: any) {
    if (driver != null) {
      const ind = this.Listdriverauto.indexOf(driver.title);
      this.affectedDriver = this.Listdriver[ind];
      this.driverService.getOneDriver(this.affectedDriver.idDriver).subscribe((oneDriver) => {
        this.muInfo.driver =  oneDriver.json();
      });    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }


  affectEntrepotSrc(entrepot: Entrepot) {
    this.entrepotSrcValue = entrepot;
    this.muInfo.entrepotSrc = this.entrepotSrcValue ;
  }
  affectEntrepotDest(entrepot: Entrepot) {
    this.entrepotDestValue = entrepot;
    this.muInfo.entrepotDest = this.entrepotDestValue;
  }


}
@Component({
  selector: 'edit-force-etat-retour-mu',
  templateUrl: './edit-force-etat-retour.html',
  styleUrls: ['./moveable-unit-edit.component.scss']

})
export class NgbdModalEditForceRetourMu implements OnInit {
  trip: Trip = null;

  constructor(public modal: NgbActiveModal, private moveableUnitService: MoveableUnitService) {
  }

  ngOnInit() {
    this.trip = this.moveableUnitService.scannedTrip;
  }

}

const MODALS: { [name: string]: Type<any> } = {
  forceRetour: NgbdModalEditForceRetourMu
};
