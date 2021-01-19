import {Component, Inject, OnDestroy, OnInit, Type} from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Runsheet } from 'src/app/model/runsheet.model';
import { TripService } from '../../trips/trips.service';
import { RunsheetService } from '../runsheet.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MapTripsComponent } from '../../map-trips/map-trips.component';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { DriversService } from '../../drivers/drivers.service';
import { ColisRunsheet } from 'src/app/model/colis-runsheet.model';
import { Subscription } from 'rxjs';
import { Trip } from '../../trips/Trip';
import {Entrepot} from '../../../model/entrepot.model';
import {RunsheetInfo} from '../runsheet.component';
import {MoveableUnitService} from '../../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../../entrepot/entrepot.service';
import {MuInfo} from '../../moveable-unit/moveable-unit.component';
import {FormControl, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RunsheetHistory} from '../../../model/runsheet-history.model';
import {HistoriqueScan} from '../../../model/historique-scan.model';
import {Conflit} from '../../../model/conflit.model';
import {UserService} from '../../users/users.service';
import {ConflitService} from '../../conflict-trips/conflit.service';
import {RamassageService} from '../../ramassage/ramassage.service';


@Component({
  selector: 'app-runsheet-edit',
  templateUrl: './runsheet-edit.component.html',
  styleUrls: ['./runsheet-edit.component.scss']
})
export class RunsheetEditComponent implements OnInit, OnDestroy {

  date: Date;
  nbSelectedRunsheet = 0;
  affectedDriver: any = null;
  checked = true;
  // vars of scanQR
  searchTermscan: any;
  ListScan = [];
  ListScanNB = 0;
  //
  driver: any = null ;
  user: any;
  runsheet: Runsheet = null ;
  routeSub: Subscription;
  confirmed = false;
  runsheetInfo: RunsheetInfo;
  private affectedMatricule: string;
  private closeResult: string;

  constructor(private tservice: TripService, private snackBar: MatSnackBar, private runsheetService: RunsheetService,
    private activatedRoute: ActivatedRoute, private driverService: DriversService, private router: Router,
    public dialog: MatDialog, private modalService: NgbModal, private userService: UserService,
              private conflitService: ConflitService, private ramassageService: RamassageService, private moveableUnitService: MoveableUnitService){ }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.runsheetInfo = this.runsheetService.runsheetInfo;
    const idRunsheet = this.activatedRoute.snapshot.paramMap.get('idRunsheet') + '';
    if (!!idRunsheet)  {
      this.runsheetService.find(idRunsheet).subscribe((res) => {
        this.runsheet = res.body;
        if (this.runsheet.status === 'confirmed') {
          this.confirmed = true;
        }
        this.affectedMatricule = this.runsheet.matricule;
        this.driver = this.runsheet.driver;
        this.runsheetService.runsheetInfo = {driver: this.driver, matricule: this.affectedMatricule, type: this.runsheet.type};
        this.runsheetService.runsheetConfirmed = (this.runsheet.status === 'confirmed')
        const listOfIds: string[] = this.runsheet.listColis.slice()
          .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)  )
          .map((colis) => colis.idTrip) ;
        this.tservice.getListOfTips(listOfIds).subscribe((resTrip) => {
          this.ListScan = resTrip.body;
        });
      });

    }
    this.routeSub = this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
                this.runsheetService.update(this.runsheet).subscribe();
           }
      });
      // get Driver

  }
    // select driver to add in runsheet
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToEditRunsheetComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.runsheetInfo = result;
      if (!!this.runsheetInfo) {
        this.runsheetService.runsheetInfo = this.runsheetInfo;
        this.affectedMatricule = this.runsheetInfo.matricule;
        this.driver = this.runsheetInfo.driver;
        this.runsheet.matricule = this.affectedMatricule;
        this.runsheet.driver = this.driver;
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
          if (obj.idTrip === this.ListScan[index].idTrip ||  obj.refTrip === this.ListScan[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if (!!obj.entrepot) {
            if (obj.entrepot.id !== this.runsheet.entrepot.id) {
              const msg = 'impossible de scanner le colis! colis n\'appartient pas à ce Hub';
              this.snackBar.open(msg, 'Fermer', {duration: 8000,});
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
          if ((obj.currentRunsheetId !== null) && (obj.currentRunsheetId !== 'null') && (obj.currentRunsheetId !== undefined) ) {
            this.runsheetService.find(obj.currentRunsheetId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans la runsheet' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open( msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  Runsheet: '+this.runsheet.ref,
                'Exception : '+msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation',  this.runsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else if ((obj.currentMUId !== null) && (obj.currentMUId !== 'null') && (obj.currentMUId !== undefined) ) {
            this.moveableUnitService.find(obj.currentMUId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans la moveable unit' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open( msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  Runsheet: '+this.runsheet.ref,
                'Exception : '+msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation',  this.runsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else if ((obj.currentPickUpId !== null) && (obj.currentPickUpId !== 'null') && (obj.currentPickUpId !== undefined) ) {
            this.ramassageService.find(obj.currentPickUpId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans le pick up' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open( msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio()
              obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  Runsheet: '+this.runsheet.ref,
                'Exception : '+msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation',  this.runsheet.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else {
            if (this.runsheet.type === 'livraison' ){
              if (obj.statusTrip === 'Chez Livreur') {
                this.ListScan.push(obj);
                this.tservice.updateRunsheet(obj.idTrip, new RunsheetHistory(this.runsheet.id,this.user.idAdmin,new Date)).subscribe(() => {
                  this.tservice.getTripscanListById(obj.idTrip).subscribe((resT) => {
                    const trip = resT.body;
                    this.playSuccessAudio();
                    trip.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  Runsheet: '+this.runsheet.ref, 'Success'));
                    this.tservice.updateOneTrip(trip).subscribe(() => {
                      this.runsheet.listColis.push(new ColisRunsheet(trip.idTrip, false, this.user.idAdmin,
                        new Date(), false));
                      this.runsheetService.update(this.runsheet).subscribe();

                    });
                  });
                });

              } else {
                const msg = 'Le colis doit être chez livrer ! . Statut de colis scanné : ' + obj.statusTrip;
                this.snackBar.open(msg, 'Fermer', {
                  duration: 8000,
                });
                this.playFailureAudio();
                obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  Runsheet: '+this.runsheet.ref, 'Exception : '+msg));
                this.tservice.updateOneTrip(obj).subscribe();
                if (obj.statusTrip === 'Retour'){
                  this.runsheetService.sacannedTrip = obj;
                  this.openForceStatusRetour('forceRetour');
                } else {
                  this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                    const admin = resUser.json();
                    const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation',  this.runsheet.ref);
                    this.conflitService.create(conflit).subscribe();
                  });
                }
              }
            }else if (this.runsheet.type === 'retour'){
              if (obj.statusTrip === 'Retour') {
                this.ListScan.push(obj);
                this.playSuccessAudio();
                obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  Runsheet: '+this.runsheet.ref, 'Success'));
                this.tservice.updateOneTrip(obj).subscribe((resTrip) => {
                  const tripRes = resTrip.body;
                  this.runsheet.listColis.push(new ColisRunsheet(tripRes.idTrip, false, this.user.idAdmin,
                    new Date(), false));
                  this.tservice.updateRunsheet(tripRes.idTrip, new RunsheetHistory(this.runsheet.id,this.user.idAdmin,new Date)).subscribe(() => {
                    this.runsheetService.update(this.runsheet).subscribe();
                  });
                });

              } else {
                this.playFailureAudio();
                const msg = 'L\'état de colis doit être " Retour " ! . Statut de colis scanné : ' + obj.statusTrip;
                obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  Runsheet: '+this.runsheet.ref, 'Exception : '+msg));
                this.tservice.updateOneTrip(obj).subscribe((resTrip) => {
                  const tripRes = resTrip.body;
                  this.snackBar.open(msg, 'Fermer', {
                    duration: 8000,
                  });
                  if (tripRes.statusTrip === 'Chez Livreur'){
                    this.runsheetService.sacannedTrip = tripRes;
                    this.openForceStatusRetour('forceRetour');
                  }
                  else {
                    this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                      const admin = resUser.json();
                      const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'runsheeet creation',  this.runsheet.ref);
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
  this.runsheet.listColis[index].removedBy =  this.user.idAdmin;
  this.runsheet.listColis[index].removedDate =  new Date() ;
  this.tservice.updateRunsheet(trip.idTrip, new RunsheetHistory(null,this.user.idAdmin,new Date)).subscribe(() => {
    this.runsheetService.update(this.runsheet).subscribe();
  });
  }
createNewDraftRunsheet() {
    const draftRunsheet = new Runsheet(null, null, null, 'draft', this.user.idAdmin, new Date());
    this.runsheetService.create(draftRunsheet).subscribe((res) => {
        this.runsheet = res.body;
    });
}

confirmRunsheet() {
  this.runsheet.status = 'confirmed';
  this.runsheet.confirmedDate = new Date();
  this.runsheet.confirmedBy = this.user.idAdmin;
    this.runsheetService.updateDriver(this.runsheet, this.driver.idDriver).subscribe(() => {
        this.confirmed = true;
        this.runsheetService.runsheetConfirmed = true;
        this.router.navigate(['/runsheet']);
    });
}
  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;
  }

  openForceStatusRetour(name: string) {
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const listTrips = [this.runsheetService.sacannedTrip.idTrip];
      this.tservice.updateTripsStatus('Chez Livreur', listTrips, this.user.name, '').subscribe(() => {
          this.tservice.getTripscanListById(this.runsheetService.sacannedTrip.idTrip).subscribe((resT) => {
            const trip = resT.body;
            this.runsheet.listColis.push(new ColisRunsheet(trip.idTrip, false, this.user.idAdmin,
              new Date(), false));
            this.ListScan.push(trip);
            this.playSuccessAudio();
            this.tservice.updateRunsheet(trip.idTrip, new RunsheetHistory(this.runsheet.id, this.user.idAdmin, new Date)).subscribe(() => {
              this.tservice.getTripscanListById(trip.idTrip).subscribe((resT2) => {
                const trip2 = resT2.body;
                this.runsheetService.update(this.runsheet).subscribe(() => {
                  trip2.historiqueScans.push(new HistoriqueScan(this.user.idAdmin, new Date(), 'Ajout dans la  Runsheet: ' + this.runsheet.id, 'Success : forced status'));
                  this.tservice.updateOneTrip(trip2).subscribe();
                });
              })
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
            this.runsheetService.update(this.runsheet).subscribe();
}
     this.routeSub.unsubscribe();
}


}
@Component({
    selector: 'add-driver-to-edit-runsheet-dialog',
    templateUrl: 'add-driver-to-edit-runsheet-dialog.html',
  })
  export class DialogAddDriverToEditRunsheetComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  entrepots: Entrepot[] = [];
  matricule: string;
  runsheetInfo: RunsheetInfo = {driver: null, matricule: null, type: null};


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToEditRunsheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private muService: MoveableUnitService,
    private entrepotService: EntrepotService, private runsheetService: RunsheetService, private  driverService: DriversService) {}

  ngOnInit(): void {
    this.getAllDrivers();
    this.getEntrepots();
    if(!!this.runsheetService.runsheetInfo){
      if ( !!this.runsheetService.runsheetInfo.driver){
        this.affectedDriverNgModel = this.runsheetService.runsheetInfo.driver.nameDriver + ' ' + this.runsheetService.runsheetInfo.driver.surnameDriver;
      }
      if (!!this.runsheetService.runsheetInfo.driver){
        this.runsheetInfo.driver = this.runsheetService.runsheetInfo.driver;
      }
      if(!!this.runsheetService.runsheetInfo.matricule){
        this.runsheetInfo.matricule = this.runsheetService.runsheetInfo.matricule;
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
        this.runsheetInfo.driver =  oneDriver.json();
      });
    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }


}
@Component({
  selector: 'edit-force-etat-retour',
  templateUrl: './edit-force-etat-retour.html',
  styleUrls: ['./runsheet-edit.component.scss']

})
export class NgbdModalEditForceRetour implements OnInit {
  trip: Trip = null;
  newStatus: string;

  constructor(private modal: NgbActiveModal, private runsheetService: RunsheetService) {
  }

  ngOnInit() {
    this.trip = this.runsheetService.sacannedTrip;
  }

}

const MODALS: { [name: string]: Type<any> } = {
  forceRetour: NgbdModalEditForceRetour
};