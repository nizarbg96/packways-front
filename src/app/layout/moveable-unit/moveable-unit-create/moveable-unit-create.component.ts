import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TripService} from '../../trips/trips.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {DriversService} from '../../drivers/drivers.service';
import {Subscription} from 'rxjs';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {MoveableUnit} from '../../../model/moveable-unit.model';
import {MoveableUnitService} from '../moveable-unit.service';
import {MuInfo} from '../moveable-unit.component';
import {Entrepot} from '../../../model/entrepot.model';
import {FormControl, Validators} from '@angular/forms';
import {EntrepotService} from '../../entrepot/entrepot.service';

@Component({
  selector: 'app-moveable-unit-create',
  templateUrl: './moveable-unit-create.component.html',
  styleUrls: ['./moveable-unit-create.component.scss']
})
export class MoveableUnitCreateComponent implements OnInit, OnDestroy {

  constructor(private tservice: TripService, private snackBar: MatSnackBar, private moveableUnitService: MoveableUnitService,
              private activatedRoute: ActivatedRoute, private driverService: DriversService, private router: Router,
              public dialog: MatDialog) { }

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

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.muInfo = this.moveableUnitService.muInfo;
    this.createNewDraftMoveableUnit();
    // saving draft when leaving component
    this.routeSub = this.router.events.subscribe((event) => {
      if ((event instanceof NavigationStart) && !this.confirmed) {
          this.moveableUnitService.update(this.moveableUnit).subscribe();
        }
    });
  }
  // select driver to add in mu
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddDriverToCreateMUComponent, {
      width: '60%',
      // data: {name: 'this.name', animal: 'this.animal'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.muInfo = result;
      if (!!this.muInfo) {
        this.moveableUnitService.muInfo = this.muInfo;
        this.affectedEntrepotDest = this.muInfo.entrepotDest;
        this.affectedEntrepotSrc = this.muInfo.entrepotSrc;
        this.affectedMatricule = this.muInfo.matricule;
        this.driver = this.muInfo.driver;
        this.moveableUnit.entrepotSrc = this.affectedEntrepotSrc;
        this.moveableUnit.entrepotDest = this.affectedEntrepotDest;
        this.moveableUnit.driver = this.driver;
        this.moveableUnit.matricule = this.affectedMatricule;
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
          if ((obj[0].currentMUId !== null) && (obj[0].currentMUId !== 'null') ) {
            console.log('idMU' + obj[0].currentMUId + '--');
            this.moveableUnitService.find(obj[0].currentMUId).subscribe((res) => {
              this.snackBar.open('impossible de scanner le colis! ce colis existe dans la MU avec ' +
                'la Réference: ' + res.body.ref + ', Etat: ' + res.body.status , 'Fermer', {
                duration: 8000,
              });
            });
          } else {
            if (obj[0].statusTrip === 'Chez Livreur') {
              this.ListScan.push(obj[0]);
              // code to add colisRunsheet to listColis of mu
              this.moveableUnit.listColis.push(new ColisRunsheet(obj[0].idTrip, false, this.user.idAdmin,
                new Date(), false));
              this.tservice.updateMoveableUnit(obj[0].idTrip, this.moveableUnit.id).subscribe(() => {
                this.moveableUnitService.update(this.moveableUnit).subscribe();
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
    const colisToDelete = this.moveableUnit.listColis.slice()
      .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    const index = this.moveableUnit.listColis.indexOf(colisToDelete);
    this.moveableUnit.listColis[index].removed = true;
    this.moveableUnit.listColis[index].removedBy =  this.user.idAdmin;
    this.moveableUnit.listColis[index].removedDate =  new Date() ;
    this.tservice.updateMoveableUnit(trip.idTrip, null).subscribe(() => {
      this.moveableUnitService.update(this.moveableUnit).subscribe();
    });
  }
  createNewDraftMoveableUnit() {
    const draftMoveableUnit = new MoveableUnit(null, null, 'draft', this.user.idAdmin, new Date());
    if (!!this.muInfo) {
      this.affectedEntrepotSrc = this.muInfo.entrepotSrc;
      this.affectedEntrepotDest = this.muInfo.entrepotDest;
      this.affectedMatricule = this.muInfo.matricule;
      this.driver = this.muInfo.driver;
      draftMoveableUnit.entrepotSrc = this.affectedEntrepotSrc;
      draftMoveableUnit.entrepotDest = this.affectedEntrepotDest;
      draftMoveableUnit.matricule = this.affectedMatricule;
      draftMoveableUnit.driver = this.driver;
    }
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
      this.router.navigate(['/mu']);
    });
  }
  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length ;
  }

  ngOnDestroy(): void {
    if (!this.confirmed) {
        this.moveableUnitService.update(this.moveableUnit).subscribe();
      }
    this.routeSub.unsubscribe();

  }


}

@Component({
  selector: 'add-driver-to-create-mu-dialog',
  templateUrl: 'add-driver-to-create-mu-dialog.html',
})
export class DialogAddDriverToCreateMUComponent implements OnInit {
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
    public dialogRef: MatDialogRef<DialogAddDriverToCreateMUComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private tservice: TripService, private muService: MoveableUnitService, private entrepotService: EntrepotService,
    private moveableUnitService: MoveableUnitService, private driverService: DriversService) {}

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
