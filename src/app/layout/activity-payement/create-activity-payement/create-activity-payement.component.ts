import {AfterViewInit, Component, OnInit, TemplateRef, Type, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PickUp} from '../../../model/pickup.model';
import {InProgressPickUp} from '../../ramassage-in-progress/ramassage-in-progress.component';
import {Trip} from '../../trips/Trip';
import {MatSnackBar, MatStepper} from '@angular/material';
import {TripService} from '../../trips/trips.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {RamassageService} from '../../ramassage/ramassage.service';
import {UserService} from '../../users/users.service';
import {ActivityRunsheetService} from '../../reconcile-runsheet/activity-runsheet.service';
import {pluck} from 'rxjs/operators';
import {ColisSuccessRunsheet} from '../../../model/colis-success-runsheet.model';
import {ColisRunsheet} from '../../../model/colis-runsheet.model';
import {DepenseActivity} from '../../../model/depense-activity.model';
import {ActivityPayement} from '../../../model/activity-payement.model';
import {ActivityPayementInfo} from '../activity-payement.component';
import {ActivityPayementService} from '../activity-payement.service';
import {EntrepotService} from '../../entrepot/entrepot.service';
import {Entrepot, IEntrepot} from '../../../model/entrepot.model';
import {
  NgbdModalConfirmLivree,
  NgbdModalConfirmNonLivree, NgbdModalConfirmReturned
} from '../../reconcile-runsheet/create-activity-runsheet/create-activity-runsheet.component';
import {FileUploadService} from './file-upload.service';
import {TripExcelService} from '../../trips/excel-trip.service';

@Component({
  selector: 'app-create-activity-payement',
  templateUrl: './create-activity-payement.component.html',
  styleUrls: ['./create-activity-payement.component.scss']
})
export class CreateActivityPayementComponent implements OnInit, AfterViewInit {

  date = new Date();
  activityPayement: ActivityPayement;
  activityPayementInfo: ActivityPayementInfo;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  spinner = false;
  recoltedTrips: any[] = [];
  filtredRecoltedTrips: any[] = [];
  closeResult: string;
  @ViewChild('stepper') private myStepper: MatStepper;
  user: any;
  client: any;
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
  pickUpStepper = false;
  listColisToPay: Trip[] = [];
  selectedAll: any;
  checkedTrips: any[] = [];
  NBchecked: number;
  isVisible = true;
  changeColorByStatusTrip: boolean;
  dnow: number;
  totalAmount = 0;
  shippingCosts = 0;
  amountToPay = 0;
  entrepots: IEntrepot[] = [];
  entrepotSrcValue: Entrepot;
  fileToUpload: File = null;
  inputLivreePerso: any;
  @ViewChild('colisLivreePersonnalisee') contentLivreePerso: TemplateRef<any>;
  returnedCost = 3;
  billedIsChecked = false;
  listRapportTrips: Trip[] = [];
  listPayed: Trip[] = [];
  listEnCoursDePayement: Trip[] = [];

  constructor(private activityPayementService: ActivityPayementService, private _formBuilder: FormBuilder, private tripService: TripService,
              private modalService: NgbModal, private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder,
              private ramassageService: RamassageService, private userService: UserService, private activityRunsheetService: ActivityRunsheetService,
              private entrepotService: EntrepotService, private fileUploadService: FileUploadService, private  tripExcelService: TripExcelService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.activityPayementInfo = this.activityPayementService.activityPayementInfo;
    this.getEntrepots();
    if (!this.activityPayementInfo) {
      this.router.navigate(['/payements']);
      return;
    }
    if (!!this.activityPayementService.activityToEdit) {
      // IF EDIT
      this.getEditActivities(this.activityPayementService.activityToEdit);
      this.getRecoltedTrips();
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
          this.finalStep = true;
        }
      });
  }

  getRecoltedTrips() {
    this.spinner = true;
    if (this.activityPayement.status === 'draft') {
      if (!!this.activityPayementInfo) {
        if (!!this.activityPayementInfo.recoltedTrips) {
          this.recoltedTrips = this.activityPayementInfo.recoltedTrips;
          this.filtredRecoltedTrips = this.recoltedTrips;
          if (this.recoltedTrips.length === 0) {
            this.spinner = false;
            return;
          }
          if (!this.activityPayementService.activityToEdit) {
            this.listColisToPay = [];
          }
        } else {
          this.spinner = false;
        }
      }
    }
  }

  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
  }

  affectEntrepotSrc(entrepot: Entrepot) {
    this.entrepotSrcValue = entrepot;
    if (!!entrepot) {
      this.filtredRecoltedTrips = this.recoltedTrips.slice().filter((item) => item.entrepot.nom === entrepot.nom);
    }
  }

  deleteScanListPickUp(trip) {
    // for (let i = 0; i < this.ListScanPickUp.length; i++) {
    //   if (trip.idTrip === this.ListScanPickUp[i].idTrip) {
    //     this.ListScanPickUp.splice(i, 1);
    //   }
    // }
    // this.listColisNonTreated.push(trip);
    // this.activityPayement.listColisNonTreated.push(trip.idTrip);
    // this.ListScanPickUpNB = this.ListScanPickUp.length;
    // const colisToDelete = this.activityPayement.listColisSuccess.slice()
    //   .filter((colis) => ((colis.idTrip === trip.idTrip) && (colis.removed === false)))[0];
    // const index = this.activityPayement.listColisSuccess.indexOf(colisToDelete);
    // this.activityPayement.listColisSuccess[index].removed = true;
    // this.activityPayement.listColisSuccess[index].removedBy =  this.user.idAdmin;
    // this.activityPayement.listColisSuccess[index].removedDate =  new Date() ;
    // this.activityPayementService.update(this.activityPayement).subscribe();
  }


    createDraftActivity() {
    const draftActivity: ActivityPayement = {
      ...new ActivityPayement(),
      status: 'draft',
      createdDate: new Date(),
      createdBy: this.user.idAdmin,
      clientId: this.activityPayementInfo.client.idUser,
      listColisRecolted: this.activityPayementInfo.recoltedTrips.map(trip => trip.idTrip),
      listColisToPay: [],
      amountToPay: 0,
      shippingCosts: 0,
      totalAmount: 0,
      userName: this.user.name,
      clientName: this.activityPayementInfo.client.nameUser + ' ' + this.activityPayementInfo.client.surnameUser
    };
    this.userService.getAdminById(this.user.idAdmin).subscribe((resUser) => {
      const admin = resUser.json();
      draftActivity.entrepot = admin.entrepot;
      this.activityPayementService.create(draftActivity).subscribe((res) => {
        this.activityPayement = res.body;
        this.getRecoltedTrips();
      });
    });
  }

  getListColisLength(listColis: ColisRunsheet[]): number {
    return listColis.slice()
      .filter((colis) => (colis.removed === false || colis.removed == null || colis.removed === undefined)).length;

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

  private getEditActivities(activityToEdit: ActivityPayement) {
    this.spinner = true;
    this.activityPayement = activityToEdit;
    this.client = this.activityPayementInfo.client;
    if(activityToEdit.status === 'draft'){
      this.tripService.getListOfTips(this.activityPayement.listColisRecolted).subscribe((res) => {
        this.recoltedTrips = res.body;
        this.filtredRecoltedTrips = this.recoltedTrips;
        this.tripService.getListOfTips(this.activityPayement.listColisToPay).subscribe((resTrips) => {
          this.tripService.getListOfTips(this.activityPayement.listColisToPay).subscribe((resTripsRapport) => {
            this.listRapportTrips = resTripsRapport.body;
            this.listColisToPay = resTrips.body;
            this.userService.getUserById(activityToEdit.clientId).subscribe((resUser) => {
              const client = resUser.json();
              this.amountToPay = this.activityPayement.amountToPay;
              this.shippingCosts = this.activityPayement.shippingCosts;
              this.totalAmount = this.activityPayement.totalAmount;
              this.activityPayementInfo = {recoltedTrips: this.listColisToPay, client: client};
              this.spinner = false;
            });
          });
        });
      });
    } else if (activityToEdit.status === 'confirmed'){
      this.tripService.getListOfTips(this.activityPayement.listEnCoursDePayementTrips).subscribe((res) => {
        this.recoltedTrips = res.body;
        this.filtredRecoltedTrips = this.recoltedTrips;
        this.tripService.getListOfTips(this.activityPayement.listColisToPay).subscribe((resTrips) => {
          this.tripService.getListOfTips(this.activityPayement.listColisToPay).subscribe((resTripsRapport) => {
            this.listRapportTrips = resTripsRapport.body;
            this.listColisToPay = resTrips.body;
            this.userService.getUserById(activityToEdit.clientId).subscribe((resUser) => {
              const client = resUser.json();
              this.amountToPay = this.activityPayement.amountToPay;
              this.shippingCosts = this.activityPayement.shippingCosts;
              this.totalAmount = this.activityPayement.totalAmount;
              this.activityPayementInfo = {recoltedTrips: this.listColisToPay, client: client};
              this.spinner = false;
            });
          });
        });
      });
    } else if (activityToEdit.status === 'closed'){
      this.tripService.getListOfTips(this.activityPayement.listPayedTrips).subscribe((res) => {
        this.recoltedTrips = res.body;
        this.filtredRecoltedTrips = this.recoltedTrips;
        this.tripService.getListOfTips(this.activityPayement.listColisToPay).subscribe((resTrips) => {
          this.tripService.getListOfTips(this.activityPayement.listColisToPay).subscribe((resTripsRapport) => {
            this.listRapportTrips = resTripsRapport.body;
            this.listColisToPay = resTrips.body;
            this.userService.getUserById(activityToEdit.clientId).subscribe((resUser) => {
              const client = resUser.json();
              this.amountToPay = this.activityPayement.amountToPay;
              this.shippingCosts = this.activityPayement.shippingCosts;
              this.totalAmount = this.activityPayement.totalAmount;
              this.activityPayementInfo = {recoltedTrips: this.listColisToPay, client: client};
              this.spinner = false;
            });
          });
        });
      });
    }

  }


  conirmeActivite(name: string) {
    this.activityPayementService.typeConfirm = 'confirm';
    this.activityPayementService.activityPayementInfo = {client: this.activityPayement.clientName, recoltedTrips: this.recoltedTrips};
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.tripService.updateEncoursDePayement(this.listColisToPay.map((trip) => trip.idTrip), this.user.idAdmin).subscribe(() => {
        this.activityPayement.listColisToPay = this.listColisToPay.map((trip) => trip.idTrip);
        this.activityPayement.totalAmount = this.totalAmount;
        this.activityPayement.shippingCosts = this.shippingCosts;
        this.activityPayement.amountToPay = this.amountToPay;
        this.activityPayement.status = 'confirmed';
        this.activityPayement.listEnCoursDePayementTrips = this.listColisToPay.map((trip) => trip.idTrip);
        this.activityPayement.listRapportTrips = this.listRapportTrips.map(trip => trip.idTrip);
        this.activityPayementService.update(this.activityPayement).subscribe(() => {
          this.openCheckSuccess('activityConfirmed');
        });
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  closeActivite(name: string) {
    this.activityPayementService.typeConfirm = 'close';
    this.activityPayementService.activityPayementInfo = {client: this.activityPayement.clientName, recoltedTrips: this.recoltedTrips};
    this.modalService.open(MODALS[name]).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.tripService.updatePayed(this.listColisToPay.map((trip) => trip.idTrip), this.user.idAdmin).subscribe(() => {
        this.activityPayement.listPayedTrips = this.listColisToPay.map((trip) => trip.idTrip);
        this.activityPayement.status = 'closed';
        this.activityPayementService.update(this.activityPayement).subscribe(() => {
          this.openCheckSuccess('activityConfirmed');
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
      this.router.navigate(['/payements/']);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
  }

  selectAll(event) {
    this.checkedTrips = [];
    if (event.target.checked) {
      for (let i = 0; i < this.recoltedTrips.length; i++) {
        this.recoltedTrips[i].selected = true;
        this.checkedTrips.push(this.recoltedTrips[i]);
      }
    } else {
      for (let i = 0; i < this.recoltedTrips.length; i++) {
        this.recoltedTrips[i].selected = false;
      }
      this.checkedTrips = [];
    }
    this.NBchecked = this.checkedTrips.length;
    this.listColisToPay = this.checkedTrips;
    this.listRapportTrips = this.checkedTrips;
    this.calculateAmounts();

  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.checkedTrips.push(option);
    } else {
      for (let i = 0; i < this.recoltedTrips.length; i++) {
        if (this.checkedTrips[i] === option) {
          this.checkedTrips.splice(i, 1);
        }
      }
    }
    this.NBchecked = this.checkedTrips.length;
    this.listColisToPay = this.checkedTrips;
    this.listRapportTrips = this.checkedTrips;
    this.calculateAmounts();
  }

  private calculateAmounts() {
    this.listRapportTrips = [];
    this.totalAmount = 0;
    this.shippingCosts = 0;
    this.amountToPay = 0;
    this.listColisToPay.forEach((trip) => {
      this.totalAmount = this.totalAmount + parseFloat(trip.packageTrip.valPackage);
      if (trip.statusTrip === 'Livree') {
        this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
        this.listRapportTrips.push(trip);
      } else if (trip.statusTrip === 'Retournee') {
        if (trip.isBilled) {
          this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
          trip.packageTrip.valPackage = 0;
          this.listRapportTrips.push(trip);
        } else {
          this.shippingCosts = this.shippingCosts + this.returnedCost;
          trip.packageTrip.valPackage = 0;
          trip.costTrip = this.returnedCost;
          this.listRapportTrips.push(trip);
        }
      }
    });
    this.amountToPay = this.totalAmount - this.shippingCosts;
  }

  changeDateFormat(dd) {
    const d = new Date(dd);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hour = d.getHours();
    const min = d.getMinutes();
    // var sec = d.getSeconds();
    const dformat = [day, month, year].join('/') + ' ' + [hour, min].join(':');

    return dformat;
  }

  showFinancialStatus(trip) {
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

  showStatusTrip(trip) {
    this.changeColorByStatusTrip = false;
    this.dnow = new Date().getTime();
    const dif = Number('172800000');
    let d1;

    /* if (trip.getedday != null) {
      const dramassage = new Date(trip.getedday).getTime();
      const diff = this.dnow - dramassage;
      if ((diff >=  dif) && (trip.nbTentative === 0) && (trip.statusTrip !== 'Livree')) {
          this.changeColorByStatusTrip = true;
       } else {
          this.changeColorByStatusTrip = false;
       }
    } else {
      this.changeColorByStatusTrip = true;
    }
    return this.changeColorByStatusTrip; */
    if (trip.statusTrip === 'cherche un livreur') {
      d1 = new Date(trip.createdday).getTime();
    } else if (trip.statusTrip === 'Livreur en chemin') {
      d1 = new Date(trip.affectedday).getTime();
    } else if (trip.statusTrip === 'Chez Livreur') {
      d1 = new Date(trip.getedday).getTime();
    } else if (trip.statusTrip === 'livraison en cours') {
      d1 = new Date(trip.startdelday).getTime();
    } else if (trip.statusTrip === 'Livree') {
      d1 = new Date(trip.livredday).getTime();
    } else if (trip.statusTrip === 'Retour') {
      d1 = new Date(trip.returnedday).getTime();
    }
    const diff = this.dnow - d1;
    if ((diff >= dif) && (trip.nbTentative === 0)) {
      this.changeColorByStatusTrip = true;
    } else {
      this.changeColorByStatusTrip = false;

    }

    return this.changeColorByStatusTrip;
  }


  applyFilter(filterValue: any) {
    const filterValueUpper = filterValue.toUpperCase();
    if (filterValue === '') {
      this.filtredRecoltedTrips = this.recoltedTrips;
    } else {
      this.filtredRecoltedTrips = this.recoltedTrips.slice().filter((item) => item.refTrip.includes(filterValueUpper));
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }

  getColisLivree(recoltedTrips: any[]) {
    return recoltedTrips.filter((trip) => trip.statusTrip === 'Livree').length;
  }

  getColisLivreeAPayer(listColisToPay: Trip[]) {
    return listColisToPay.filter((trip) => trip.statusTrip === 'Livree').length;
  }

  getColisRetournee(recoltedTrips: any[]) {
    return recoltedTrips.filter((trip) => trip.statusTrip === 'Retournee').length;
  }

  getColisRetourneeAPayer(listColisToPay: Trip[]) {
    return listColisToPay.filter((trip) => trip.statusTrip === 'Retournee').length;
  }

  fraisColisLivree(value: any) {
    this.listRapportTrips = [];
    if (value === 'gratuit') {
      this.returnedCost = 3;
      this.totalAmount = 0;
      this.shippingCosts = 0;
      this.amountToPay = 0;
      this.listColisToPay.forEach((trip) => {
        if (trip.statusTrip === 'Livree') {
          this.totalAmount = this.totalAmount + parseFloat(trip.packageTrip.valPackage);
          trip.costTrip = 0;
          this.listRapportTrips.push(trip);
        } else if (trip.statusTrip === 'Retournee') {
          if (trip.isBilled === true) {
            this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
            trip.packageTrip.valPackage = 0;
            this.listRapportTrips.push(trip);
          } else {
            this.shippingCosts = this.shippingCosts + this.returnedCost;
            trip.packageTrip.valPackage = 0;
            trip.costTrip = this.returnedCost;
            this.listRapportTrips.push(trip);
          }
        }
      });
      this.amountToPay = this.totalAmount - this.shippingCosts;
    } else if (value === 'standard') {
      this.totalAmount = 0;
      this.shippingCosts = 0;
      this.amountToPay = 0;
      this.listColisToPay.forEach((trip) => {
        if (trip.statusTrip === 'Livree') {
          this.totalAmount = this.totalAmount + parseFloat(trip.packageTrip.valPackage);
          this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
          this.listRapportTrips.push(trip);
        } else if (trip.statusTrip === 'Retournee') {
          if (trip.isBilled === true) {
            trip.packageTrip.valPackage = 0;
            this.listRapportTrips.push(trip);
            this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
          } else {
            this.shippingCosts = this.shippingCosts + this.returnedCost;
            trip.packageTrip.valPackage = 0;
            trip.costTrip = this.returnedCost;
            this.listRapportTrips.push(trip);
          }
        }
      });
      this.amountToPay = this.totalAmount - this.shippingCosts;
    } else if (value === 'personnalisé') {
      this.modalService.open(this.contentLivreePerso, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.totalAmount = 0;
        this.shippingCosts = 0;
        this.amountToPay = 0;
        this.listColisToPay.forEach((trip) => {
          if (trip.statusTrip === 'Livree') {
            this.totalAmount = this.totalAmount + parseFloat(trip.packageTrip.valPackage);
            this.shippingCosts = this.shippingCosts + this.inputLivreePerso;
            trip.costTrip = this.inputLivreePerso;
            this.listRapportTrips.push(trip);
          } else if (trip.statusTrip === 'Retournee') {
            if (trip.isBilled === true) {
              this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
              trip.packageTrip.valPackage = 0;
              this.listRapportTrips.push(trip);
            } else {
              this.shippingCosts = this.shippingCosts + this.returnedCost;
              trip.packageTrip.valPackage = 0;
              trip.costTrip = this.returnedCost;
              this.listRapportTrips.push(trip);
            }
          }
        });
        this.amountToPay = this.totalAmount - this.shippingCosts;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  fraisColisRetournee(value: any) {
    this.listRapportTrips = [];
    if (value === 'standard') {
      this.returnedCost = 3;
      this.totalAmount = 0;
      this.shippingCosts = 0;
      this.amountToPay = 0;
      this.listColisToPay.forEach((trip) => {
        if (trip.statusTrip === 'Livree') {
          this.totalAmount = this.totalAmount + parseFloat(trip.packageTrip.valPackage);
          this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
          this.listRapportTrips.push(trip);
        } else if (trip.statusTrip === 'Retournee') {
          if (trip.isBilled === true) {
            this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
            trip.packageTrip.valPackage = 0;
            this.listRapportTrips.push(trip);
          } else {
            this.shippingCosts = this.shippingCosts + this.returnedCost;
            trip.packageTrip.packageVal = 0;
            trip.costTrip = this.returnedCost;
            this.listRapportTrips.push(trip);
          }
        }
      });
      this.amountToPay = this.totalAmount - this.shippingCosts;
    } else if ([1, 2, 3, 5, 6, 7, 8].indexOf(value) >= 0) {
      this.returnedCost = value;
      this.totalAmount = 0;
      this.shippingCosts = 0;
      this.amountToPay = 0;
      this.listColisToPay.forEach((trip) => {
        if (trip.statusTrip === 'Livree') {
          this.totalAmount = this.totalAmount + parseFloat(trip.packageTrip.valPackage);
          this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
          this.listRapportTrips.push(trip);
        } else if (trip.statusTrip === 'Retournee') {
          this.shippingCosts = this.shippingCosts + this.returnedCost;
          trip.packageTrip.valPackage = 0;
          trip.costTrip = this.returnedCost;
          this.listRapportTrips.push(trip);
        }
      });
      this.amountToPay = this.totalAmount - this.shippingCosts;
    }

  }

  billdeChanged() {
    this.listRapportTrips = [];
    if (this.billedIsChecked) {
      this.totalAmount = 0;
      this.shippingCosts = 0;
      this.amountToPay = 0;
      this.listColisToPay.forEach((trip) => {
        this.totalAmount = this.totalAmount + parseFloat(trip.packageTrip.valPackage);
        this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
        this.listRapportTrips.push(trip);
      });
      this.amountToPay = this.totalAmount - this.shippingCosts;
    } else {
      this.totalAmount = 0;
      this.shippingCosts = 0;
      this.amountToPay = 0;
      this.listColisToPay.forEach((trip) => {
        if (trip.statusTrip === 'Livree') {
          this.totalAmount = this.totalAmount + parseFloat(trip.packageTrip.valPackage);
          this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
          this.listRapportTrips.push(trip);
        } else if (trip.statusTrip === 'Retournee') {
          if (trip.isBilled === true) {
            this.shippingCosts = this.shippingCosts + parseFloat(trip.costTrip);
            trip.packageTrip.valPackage = 0;
            this.listRapportTrips.push(trip);

          } else {
            this.shippingCosts = this.shippingCosts + this.returnedCost;
            trip.packageTrip.valPackage = 0;
            trip.costTrip = this.returnedCost;
            this.listRapportTrips.push(trip);
          }
        }
      });
      this.amountToPay = this.totalAmount - this.shippingCosts;
    }
  }

  generateExcelReportForClient() {

    const tripsByUser = [];
    let costTrip = 0;
    let valpack = 0;
    const nameuser = this.activityPayement.clientName;
    console.log('nameuser', nameuser);

    if (this.listRapportTrips.length === 0) {
      this.snackBar.open('Veuillez sélectionner au moins un colis.', 'Fermer', {
        duration: 10000,
      });
      return;
    }

    for (let i = 0; i < this.listRapportTrips.length; i++) {
      const jTemp = this.listRapportTrips[i];

      costTrip = costTrip + jTemp.costTrip;
      valpack = valpack + jTemp.packageTrip.valPackage;
      const tab: any = [];
      tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY2(jTemp.createdday),
        this.splitDateFormatMDY2(jTemp.livredday), jTemp.descriptionTrip, jTemp.packageTrip.valPackage);
      tripsByUser.push(tab);
    }

    const tab1: any = [];
    tab1.push('', '', costTrip, '', '', '', '', valpack);
    tripsByUser.push(tab1);

    const montantNet = valpack - costTrip;
    this.tripExcelService.generateExcel(tripsByUser, nameuser, montantNet, this.client.mobileUser, this.client.adressUser);

  }

  splitDateFormatMDY2(dd) {
    let dformat = '';
    if (dd != null) {
      const d = '' + dd;
      const arr = d.split(' ');
      dformat = arr[1] + ' ' + arr[0] + ' ' + arr[2];
    }
    return dformat;
  }
}

@Component({
  selector: 'confirm-activity-payements-modal',
  templateUrl: './confirm-activity-payements-modal.html',
  styleUrls: ['./create-activity-payement.component.scss']

})
export class NgbdModalConfirmActivityPayement implements OnInit {

  checked = false;
  client: any;
  typeConfirm: string;

  constructor(private modal: NgbActiveModal, private activityPayementService: ActivityPayementService) {
  }

  ngOnInit() {
    this.client = this.activityPayementService.activityPayementInfo.client;
    this.typeConfirm = this.activityPayementService.typeConfirm;
  }

  closeModal() {
    this.modal.close('Ok click');
  }
}

@Component({
  selector: 'activity-payements-confirmed-modal',
  templateUrl: './activity-payements-confirmed-modal.html',
  styleUrls: ['./create-activity-payement.component.scss']

})
export class NgbdModalActivityPayementConfirmed implements OnInit {

  checked = true;
  driver: any;
  typeConfirm: string;

  constructor(private modal: NgbActiveModal, private activityPayementService: ActivityPayementService) {
  }

  ngOnInit() {
    this.typeConfirm = this.activityPayementService.typeConfirm;
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
  confirmActivity: NgbdModalConfirmActivityPayement,
  activityConfirmed: NgbdModalActivityPayementConfirmed,
};
