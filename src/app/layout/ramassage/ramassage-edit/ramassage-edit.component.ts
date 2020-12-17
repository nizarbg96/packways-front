import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TripService} from '../../trips/trips.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {RamassageService} from '../ramassage.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {DriversService} from '../../drivers/drivers.service';
import {PickUp} from '../../../model/pickup.model';
import {Subscription} from 'rxjs';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {Entrepot} from '../../../model/entrepot.model';
import {FormControl, Validators} from '@angular/forms';
import {EntrepotService} from '../../entrepot/entrepot.service';
import {MuInfo} from '../../moveable-unit/moveable-unit.component';

@Component({
  selector: 'app-ramassage-edit',
  templateUrl: './ramassage-edit.component.html',
  styleUrls: ['./ramassage-edit.component.scss']
})
export class RamassageEditComponent implements OnInit, OnDestroy {


  constructor(private tservice: TripService, private snackBar: MatSnackBar, private ramassageService: RamassageService,
              private activatedRoute: ActivatedRoute, private driverService: DriversService, private router: Router,
              public dialog: MatDialog) { }

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
  private affectedMatricule: string;
  private affectedEntrepot: Entrepot;


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    // get Driver
    const idPickUp = this.activatedRoute.snapshot.paramMap.get('idPickUp') + '';
    if (!!idPickUp)  {
      this.ramassageService.find(idPickUp).subscribe((res) => {
        this.pickUp = res.body;
        if (this.pickUp.status === 'confirmed') {
          this.confirmed = true;
        }
        this.affectedEntrepot = this.pickUp.entrepot;
        this.affectedMatricule = this.pickUp.matricule;
        this.driver = this.pickUp.driver;
        this.ramassageService.pickUpInfo = {driver: this.driver, entrepot: this.affectedEntrepot, matricule: this.affectedMatricule};
        this.ramassageService.pickUpConfirmed = (this.pickUp.status === 'confirmed');
        const listOfIds: string[] = this.pickUp.listColis.slice()
          .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined))
          .map((colis) => colis.idTrip) ;
        this.tservice.getListOfTips(listOfIds).subscribe((resTrip) => {
          this.ListScan = resTrip.body;
        });
      });
    }
    this.routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          this.ramassageService.update(this.pickUp).subscribe();
        }
    });

  }
  // select driver to add in pickUp
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToEditPickUpComponent, {
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
        this.pickUp.matricule = this.affectedMatricule;
        this.pickUp.driver = this.driver;
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
      this.tservice.getTripscanList(this.searchTermscan).subscribe(data => {
        const obj = Array.of(JSON.parse(data['_body']).data);
        let verif = false;
        // vérif
        for (let index = 0; index < this.ListScan.length; index++) {
          if (obj[0].idTrip === this.ListScan[index].idTrip ||  obj[0].refTip === this.ListScan[index].refTrip) {
            verif = true;
          }
        }
        if (verif === false) {
          if ((obj[0].currentPickUpId !== null) && (obj[0].currentPickUpId !== 'null') ) {
            console.log('currentPickUpId ' + obj[0].currentPickUpId + '--');
            this.ramassageService.find(obj[0].currentPickUpId).subscribe((res) => {
              this.snackBar.open('impossible de scanner le colis! ce colis existe dans le Pick Up ' +
                'de Réference: ' + res.body.ref + ', Etat: ' + res.body.status , 'Fermer', {
                duration: 8000,
              });
            });
          } else {
            if (obj[0].statusTrip === 'cherche un livreur') {
              this.ListScan.push(obj[0]);
              // code to add colisRunsheet to listColis of pickup
              this.pickUp.listColis.push(new ColisRunsheet(obj[0].idTrip, false, this.user.idAdmin,
                new Date(), false));
              this.tservice.updatePickUp(obj[0].idTrip, this.pickUp.id).subscribe(() => {
                this.ramassageService.update(this.pickUp).subscribe();
              });
            } else {
              this.snackBar.open('Le statut de colis doit être "cherche un livreur" ! . Statut de colis scanné : ' + obj[0].statusTrip, 'Fermer', {
                duration: 8000,
              });
            }
          }

        } else {
          this.snackBar.open('Ce colis a été scanné', 'Fermer', {
            duration: 8000,
          });
        }
      });
    } else {
      this.snackBar.open('Ce colis a été scanné', 'Fermer', {
        duration: 8000,
      });
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
    this.tservice.updatePickUp(trip.idTrip, null).subscribe(() => {
      this.ramassageService.update(this.pickUp).subscribe();
    });
  }
  createNewDraftPickUp() {
    const draftPickUp = new PickUp(null, null, 'draft', this.user.idAdmin, new Date());
    this.ramassageService.create(draftPickUp).subscribe((res) => {
      this.pickUp = res.body;
    });
  }
  confirmPickUp() {
    this.pickUp.status = 'confirmed';
    this.pickUp.confirmedDate = new Date();
    this.pickUp.confirmedBy = this.user.idAdmin;
    this.ramassageService.updateDriver(this.pickUp, this.driver.idDriver).subscribe(() => {
      this.confirmed = true;
      this.ramassageService.pickUpConfirmed = true; ///////////////////////////////////
      this.router.navigate(['/ramassage']);
    });
  }
  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;
  }

  ngOnDestroy(): void {
    if (!this.confirmed) {
        this.ramassageService.update(this.pickUp).subscribe();
    }
    this.routeSub.unsubscribe();
  }

}
@Component({
  selector: 'add-driver-to-edit-pickup-dialog',
  templateUrl: 'add-driver-to-edit-pickup-dialog.html',
})
export class DialogAddDriverToEditPickUpComponent implements OnInit {
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
    public dialogRef: MatDialogRef<DialogAddDriverToEditPickUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private entrepotService: EntrepotService,
    private driverService: DriversService, private ramassageService: RamassageService) {}

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

