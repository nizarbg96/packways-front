import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TripService} from '../../trips/trips.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {DriversService} from '../../drivers/drivers.service';
import {Subscription} from 'rxjs';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {RamassageService} from '../ramassage.service';
import {PickUp} from '../../../model/pickup.model';
import {Entrepot} from '../../../model/entrepot.model';
import {FormControl, Validators} from '@angular/forms';
import {EntrepotService} from '../../entrepot/entrepot.service';
import {MuInfo} from '../../moveable-unit/moveable-unit.component';
import {PickUpHistory} from '../../../model/pickUp-history.model';
import {HistoriqueScan} from '../../../model/historique-scan.model';
import {RunsheetService} from '../../runsheet/runsheet.service';
import {MoveableUnitService} from '../../moveable-unit/moveable-unit.service';
import {Conflit} from '../../../model/conflit.model';
import {UserService} from '../../users/users.service';
import {ConflitService} from '../../conflict-trips/conflit.service';

@Component({
  selector: 'app-ramassage-create',
  templateUrl: './ramassage-create.component.html',
  styleUrls: ['./ramassage-create.component.scss']
})
export class RamassageCreateComponent implements OnInit, OnDestroy {

  constructor(private tservice: TripService, private snackBar: MatSnackBar, public ramassageService: RamassageService,
              private activatedRoute: ActivatedRoute, private driverService: DriversService, private router: Router,
              public dialog: MatDialog, private runsheetService: RunsheetService, public moveableUnitService: MoveableUnitService,
              private userService: UserService, private conflitService: ConflitService) { }

  date: Date;
  nbSelectedPickUp = 0;
  affectedDriver: any = null;
  checked = true;
  // vars of scanQR
  searchTermscan: any;
  ListScan = [];
  ListScanNB = 0;
  //
  driver: any = null ;
  user: any;
  pickUp: PickUp = null ;
  routeSub: Subscription;
  confirmed = false;
  pickUpInfo: PickUpInfo;
   affectedMatricule: string;
   affectedEntrepot: Entrepot;



  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.pickUpInfo = this.ramassageService.pickUpInfo;
    this.createNewDraftPickUp();
    // saving draft when leaving component
    this.routeSub = this.router.events.subscribe((event) => {
      if ((event instanceof NavigationStart) && !this.confirmed) {
          this.ramassageService.update(this.pickUp).subscribe();
      }
    });

  }
  // select driver to add in pickUp
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToCreatePickUpComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.pickUpInfo = result;
      if (!!this.pickUpInfo) {
        this.ramassageService.pickUpInfo = this.pickUpInfo;
        this.affectedEntrepot = this.pickUpInfo.entrepot;
        this.affectedMatricule = this.pickUpInfo.matricule;
        this.driver = this.pickUpInfo.driver;
        this.pickUp.entrepot = this.affectedEntrepot;
        this.pickUp.driver = this.driver;
        this.pickUp.matricule = this.affectedMatricule;
        this.ramassageService.update(this.pickUp).subscribe((res) => {
          this.pickUp = res.body;
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
      this.tservice.getTripscanListById(this.searchTermscan).subscribe(data => {
        const obj = data.body;
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScan.length; index++) {
          if (obj.idTrip === this.ListScan[index].idTrip ||  obj.refTrip === this.ListScan[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if ((obj.currentRunsheetId !== null) && (obj.currentRunsheetId !== 'null') && (obj.currentRunsheetId !== undefined) ) {
            this.runsheetService.find(obj.currentRunsheetId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans la runsheet' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open( msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans le pick up: '+this.pickUp.ref,
                'Exception : ' +msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Pick Up creation',  this.pickUp.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else if ((obj.currentMUId !== null) && (obj.currentMUId !== 'null') && (obj.currentMUId !== undefined) ) {
            this.moveableUnitService.find(obj.currentMUId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans la moveable unit' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open( msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  pick up: '+this.pickUp.ref,
                'Exception : '+msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Pick Up creation',  this.pickUp.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else if ((obj.currentPickUpId !== null) && (obj.currentPickUpId !== 'null') && (obj.currentPickUpId !== undefined) ) {
            this.ramassageService.find(obj.currentPickUpId).subscribe((res) => {
              const msg = 'impossible de scanner le colis! ce colis existe dans le pick up' +
                ' de Réference: ' + res.body.ref + ', Etat: ' + res.body.status;
              this.snackBar.open( msg, 'Fermer', {duration: 8000,});
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans la  pick up: '+this.pickUp.ref,
                'Exception : '+msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Pick Up creation',  this.pickUp.ref);
                this.conflitService.create(conflit).subscribe();
              });
            });
          } else {
            if (obj.statusTrip === 'cherche un livreur') {
              this.ListScan.push(obj);
              this.playSuccessAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans le pick up: '+this.pickUp.ref,
                'Success'));
              this.tservice.updateOneTrip(obj).subscribe((res) => {
                this.pickUp.listColis.push(new ColisRunsheet(obj.idTrip, false, this.user.idAdmin,
                  new Date(), false));
                this.tservice.updatePickUp(obj.idTrip, new PickUpHistory(this.pickUp.id, this.user.idAdmin, new Date())).subscribe(() => {
                  this.ramassageService.update(this.pickUp).subscribe();
                });
              });

            } else {
              const msg = 'Le statut de colis doit être "cherche un livreur" ! . Statut de colis scanné : ' + obj.statusTrip;
              this.snackBar.open(msg, 'Fermer', {
                duration: 8000,
              });
              this.playFailureAudio();
              obj.historiqueScans.push(new HistoriqueScan(this.user.name,new Date(),'Ajout dans le pick up: '+this.pickUp.ref,
                'Exception : '+ msg));
              this.tservice.updateOneTrip(obj).subscribe();
              this.userService.getAdminById(this.user.idAdmin).subscribe((resUser)=>{
                const admin = resUser.json();
                const conflit = new Conflit(null, obj.idTrip, new Date, this.user.name, admin.entrepot, msg, 'Pick Up creation',  this.pickUp.ref);
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
    const colisToDelete = this.pickUp.listColis.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.pickUp.listColis.indexOf(colisToDelete);
    this.pickUp.listColis[index].removed = true;
    this.pickUp.listColis[index].removedBy =  this.user.idAdmin;
    this.pickUp.listColis[index].removedDate =  new Date() ;
    this.tservice.updatePickUp(trip.idTrip, new PickUpHistory(null, this.user.idAdmin, new Date())).subscribe(() => {
      this.ramassageService.update(this.pickUp).subscribe();
    });
  }
  createNewDraftPickUp() {
    const draftPickUp = new PickUp(null, null, 'draft', this.user.idAdmin, new Date());
    if (!!this.pickUpInfo) {
      this.affectedEntrepot = this.pickUpInfo.entrepot;
      this.affectedMatricule = this.pickUpInfo.matricule;
      this.driver = this.pickUpInfo.driver;
      draftPickUp.entrepot = this.affectedEntrepot;
      draftPickUp.matricule = this.affectedMatricule;
      draftPickUp.driver = this.driver;
    }
    this.ramassageService.create(draftPickUp).subscribe((res) => {
      this.pickUp = res.body;
    });
  }

  confirmPickUp() {
    this.pickUp.status = 'confirmed';
    this.pickUp.confirmedDate = new Date();
    this.pickUp.confirmedBy = this.user.idAdmin;
    this.ramassageService.update(this.pickUp).subscribe(() => {
      this.confirmed = true;
      this.router.navigate(['/ramassage']);
    });
  }
  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;
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
    this.ramassageService.update(this.pickUp).subscribe();
    this.routeSub.unsubscribe();



  }


}
@Component({
  selector: 'add-driver-to-create-pickup-dialog',
  templateUrl: 'add-driver-to-create-pickup-dialog.html',
})
export class DialogAddDriverToCreatePickUpComponent implements OnInit {
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  entrepots: Entrepot[] = [];
  entrepot = new FormControl('', Validators.required);
  entrepotValue: Entrepot =  null;
  matricule: string;
  pickUpInfo: PickUpInfo = {matricule: null, driver: null, entrepot: null};


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToCreatePickUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private entrepotService: EntrepotService,
    private driverService: DriversService, public ramassageService: RamassageService) {}

  ngOnInit(): void {
    this.getAllDrivers();
    this.getEntrepots();
    if(!!this.ramassageService.pickUpInfo){
      if ( !!this.ramassageService.pickUpInfo.driver){
        this.affectedDriverNgModel = this.ramassageService.pickUpInfo.driver.nameDriver + ' ' + this.ramassageService.pickUpInfo.driver.surnameDriver;
      }
      if (!!this.ramassageService.pickUpInfo.driver){
        this.pickUpInfo.driver = this.ramassageService.pickUpInfo.driver;
      }
      if(!!this.ramassageService.pickUpInfo.matricule){
        this.pickUpInfo.matricule = this.ramassageService.pickUpInfo.matricule;
      }
      if(this.ramassageService.pickUpInfo.entrepot){
        this.entrepotValue = this.ramassageService.pickUpInfo.entrepot;
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
        this.pickUpInfo.driver =  oneDriver.json();
      });
    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }


  affectEntrepot(entrepot: Entrepot) {
    this.entrepotValue = entrepot;
    this.pickUpInfo.entrepot = this.entrepotValue ;
  }

}
export interface PickUpInfo {
  driver: any;
  matricule: string;
  entrepot: Entrepot;
}
