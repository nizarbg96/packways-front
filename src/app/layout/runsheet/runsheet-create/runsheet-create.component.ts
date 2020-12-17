import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import {Entrepot} from '../../../model/entrepot.model';
import {MoveableUnitService} from '../../moveable-unit/moveable-unit.service';
import {EntrepotService} from '../../entrepot/entrepot.service';
import {RunsheetInfo} from '../runsheet.component';
import {MuInfo} from '../../moveable-unit/moveable-unit.component';

@Component({
  selector: 'app-runsheet-create',
  templateUrl: './runsheet-create.component.html',
  styleUrls: ['./runsheet-create.component.scss']
})
export class RunsheetCreateComponent implements OnInit, OnDestroy {

  constructor(private tservice: TripService, private snackBar: MatSnackBar, private runsheetService: RunsheetService,
    private activatedRoute: ActivatedRoute, private driverService: DriversService, private router: Router,
    public dialog: MatDialog) { }

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


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.runsheetInfo = this.runsheetService.runsheetInfo;
    this.createNewDraftRunsheet();
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
        console.log(this.driver + ' ' + this.affectedMatricule);
        this.runsheet.driver = this.driver;
        this.runsheet.matricule = this.affectedMatricule;
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
                if ((obj[0].currentRunsheetId !== null) && (obj[0].currentRunsheetId !== 'null') ) {
                    console.log('idRunsheet' + obj[0].currentRunsheetId + '--');
                    this.runsheetService.find(obj[0].currentRunsheetId).subscribe((res) => {
                        this.snackBar.open('impossible de scanner le colis! ce colis existe dans la runsheet' +
                        'de Réference: ' + res.body.ref + ', Etat: ' + res.body.status , 'Fermer', {
                            duration: 8000,
                        });
                    });
                } else {
                    if (obj[0].statusTrip === 'Chez Livreur') {
                        this.ListScan.push(obj[0]);
                        // code to add colisRunsheet to listColis of runsheet
                        this.runsheet.listColis.push(new ColisRunsheet(obj[0].idTrip, false, this.user.idAdmin,
                            new Date(), false));
                        this.tservice.updateRunsheet(obj[0].idTrip, this.runsheet.id).subscribe(() => {
                            this.runsheetService.update(this.runsheet).subscribe();
                        });
                    } else {
                        this.snackBar.open('Le colis doit être chez livrer ! . Statut de colis scanné : ' + obj[0].statusTrip, 'Fermer', {
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
  const colisToDelete = this.runsheet.listColis.slice()
  .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
  const index = this.runsheet.listColis.indexOf(colisToDelete);
  this.runsheet.listColis[index].removed = true;
  this.runsheet.listColis[index].removedBy =  this.user.idAdmin;
  this.runsheet.listColis[index].removedDate =  new Date() ;
  this.tservice.updateRunsheet(trip.idTrip, null).subscribe(() => {
    this.runsheetService.update(this.runsheet).subscribe();
  });
  }
createNewDraftRunsheet() {
    const draftRunsheet = new Runsheet(null, null, null, 'draft', this.user.idAdmin, new Date());
  if (!!this.runsheetInfo) {
    this.affectedMatricule = this.runsheetInfo.matricule;
    this.driver = this.runsheetInfo.driver;
    draftRunsheet.matricule = this.affectedMatricule;
    draftRunsheet.driver = this.driver;
  }
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
        this.router.navigate(['/runsheet']);
    });
}
  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;
  }

ngOnDestroy(): void {
    if (!this.confirmed) {
            this.runsheetService.update(this.runsheet).subscribe();
        }
    this.routeSub.unsubscribe();



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
  runsheetInfo: RunsheetInfo = {driver: null, matricule: null};


  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverToCreateRunsheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private muService: MoveableUnitService,
    private entrepotService: EntrepotService, private runsheetService: RunsheetService, private driverService: DriversService) {}

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
      });    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }


  }
