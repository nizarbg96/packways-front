import {AfterViewInit, Component, Inject, OnInit, TemplateRef, Type, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDatepickerInputEvent,
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatStepper,
  MatTableDataSource
} from '@angular/material';
import {Depenses, IDepenses} from '../../model/depenses.model';
import {DepensesService} from './depenses.service';
import {IStatActivityJour, StatActivityJour} from '../../model/stat-activity-jour.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {DialogStatActivityComponent} from '../dashboard/dashboard.component';
import {TripService} from '../trips/trips.service';
import {DriversService} from '../drivers/drivers.service';
import {DepenseActivity} from '../../model/depense-activity.model';
import {User} from '../users/User';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';
import {PopUpDeleteService} from '../shared/pop-up-delete/pop-up-delete.service';
import {DepenseDetailsComponent} from './depense-details/depense-details.component';
import {EmployeeService} from '../employee/employee.service';
import {Employee, IEmployee} from '../../model/employee.model';
import {Car, ICar} from '../../model/car.model';
import {CarService} from '../car/car.service';
import {GasTicket} from '../../model/gas-ticket.model';
import {GasTicketService} from './gas-ticket.service';
import {pluck} from 'rxjs/operators';
import {CaisseService} from '../caisse-state/caisse.service';
import {FileUploadService} from '../activity-payement/create-activity-payement/file-upload.service';
import {environment} from '../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {DatePipe} from '@angular/common';
import {TripExcelService} from '../trips/excel-trip.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
export class DepensesComponent implements OnInit, AfterViewInit {
  date = new Date();
   closeResult: string;
  isLoadingResults = false;
   user: any;
   imgURL: any;
   selectedFile: any;
   dateDebut: any;
   dateFin: any;


  constructor(private depensesService: DepensesService, private modalService: NgbModal, private fb: FormBuilder,
              public dialog: MatDialog, private popUpDeleteService: PopUpDeleteService,  private fileUploadService: FileUploadService,
              private snackBar: MatSnackBar, private caisseService: CaisseService,
              private spinner2: NgxSpinnerService, public datepipe: DatePipe, private tripExcelService: TripExcelService) {
  }

  displayedColumns: string[] = ['createdDate', 'createdBy', 'type', 'montant', 'depenseFrom', 'depenseTo', 'action'];
  dataSource = new MatTableDataSource<Depenses>([]);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  url = environment.serverUrl;


  ngAfterViewInit() {
    this.isLoadingResults = true;
    this.getDepenses();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.depensesService.depenseDialogExit.subscribe((res) => {
      if (res) {
        this.dialog.closeAll();
        this.isLoadingResults = true;
        this.getDepenses();
        this.depensesService.depenseDialogExit.next(false);
      }
    });
  }
  getDepenses() {
    this.depensesService.query().subscribe(res => {
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource<Depenses>(res.body.reverse());
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog() {
    let d = new Date();
    d.setHours(0,0,0,0);
    this.spinner2.show();
    this.caisseService.findLastCoffre().subscribe((res) => {
      this.spinner2.hide();
      if(!res.body){
        this.snackBar.open('Veuillez ouvrir la caisse d\'abords!', 'Fermer', {duration: 8000});
      } else {
        const caisse = res.body;
        if(caisse.closed){
          this.snackBar.open('Veuillez ouvrir la caisse d\'abords!', 'Fermer', {duration: 8000});
        }else {
          if(caisse.openedDate < d){
            this.snackBar.open('une anicenne caisse a été ouverte et n\'est pas encore fermée ', 'Fermer', {duration: 8000});
          }
          else{
            this.dialog.open(AddDepenseComponent, {
              data: null,
              width: '60vw',
              maxHeight: '60vh',
            });
          }
        }
      }
    },() => {
      this.snackBar.open('Erreur Serveur', 'Fermer', {duration: 8000});
    })

  }


  deleteDepense(element: IDepenses) {
    this.popUpDeleteService.activityName = 'dépense';
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        element.deleted = true;
        element.deletedBy = this.user.idAdmin;
        element.deletedDate = new Date();
        element.deletedByName = this.user.name;
        this.depensesService.update(element).subscribe(() => {
          this.isLoadingResults = true;
          this.getDepenses();
        });
      }, (reason) => {

      }
    );
  }

  viewDetails(element: Depenses) {
    this.depensesService.depenseDeatil = element;
    this.modalService.open(MODALS['depenseDetail']).result.then(
      (result) => {

      }, (reason) => {

      }
    );
  }
  onFileChanged($event: any) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.imgURL = this.selectedFile.name;
  }

  onFileChanged2($event: any, depense: Depenses) {
    this.spinner2.show();
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.imgURL = this.selectedFile.name;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('activity', JSON.stringify(depense));

    this.fileUploadService.postFileDepense(uploadImageData).subscribe((response) => {
      this.spinner2.hide();
      this.depensesService.depenseDialogExit.next(true);
    });
  }



  addEventDateDebutDepenses(input: string, $event: MatDatepickerInputEvent<unknown>) {
    this.dateDebut = $event.value;
  }

  addEventDateFinDepenses(input: string, $event: MatDatepickerInputEvent<unknown>) {
    this.dateFin = $event.value;
  }

  applyFilterGlobalDepenses() {
    this.depensesService.getDepensesBetween({fromDate: this.dateDebut, toDate: this.dateFin}).subscribe((res) => {
      this.dataSource = new MatTableDataSource<Depenses>(res.body);
      this.dataSource.paginator = this.paginator;
      this.dateDebut = null; this.dateFin = null;});
  }

  generateExcelReportDepenses(data: Depenses[]) {
    if (data.length === 0) {
      this.snackBar.open('il n y a pas des depenses à générer.', 'Fermer', {
        duration: 10000,
      });
      return;
    }
    let tab = [];
    const tripsByUser = [];
    for (let i = 0; i < data.length; i++) {
      tab = [];
      const jTemp = data[i];
      tab.push(this.splitDateFormatMDY2(this.datepipe.transform(jTemp.createdDate, 'yyyy-MM-dd')), jTemp.type, jTemp.description, jTemp.montant + ' TND',
        !!jTemp.affectedTo?jTemp.affectedTo.firstName + ' ' + jTemp.affectedTo.lastName :'none', jTemp.depenseFrom, jTemp.createdByName,
        !!jTemp.affectedCar?jTemp.affectedCar.modelVehicle + ' ' +jTemp.affectedCar.marqueVehicle:'',
        !!jTemp.depenseActivity?jTemp.depenseActivity.avance+ ' TND':'', !!jTemp.depenseActivity?jTemp.depenseActivity.avanceMois:'', !!jTemp.depenseActivity?jTemp.depenseActivity.autreDesc: '',
        !!jTemp.depenseActivity?jTemp.depenseActivity.autreValue + ' TND':'', !!jTemp.depenseActivity?jTemp.depenseActivity.desktopCharge+ ' TND':'',
      !!jTemp.depenseActivity?jTemp.depenseActivity.carteTel+ ' TND':'',
        !!jTemp.depenseActivity?jTemp.depenseActivity.gasoilEspece+ ' TND':'', !!jTemp.depenseActivity?jTemp.depenseActivity.carMaintaining+ ' TND':'');
      tripsByUser.push(tab);
    }
    this.tripExcelService.generateExcelDepenses(tripsByUser, '', '', '', '');

  }

  splitDateFormatMDY2(dd) {
    let dformat = '';
    if (dd != null) {
      const d = '' + dd;
      const arr = d.split('-');
      dformat = arr[1] + '/' + arr[0] + '/' + arr[2];
    }
    return dformat;
  }
}

@Component({
  selector: 'dialog-depense',
  templateUrl: './add-depense.html',
})
export class AddDepenseComponent implements OnInit, AfterViewInit {
   user: any;
  @ViewChild('stepper')  myStepper: MatStepper;

  idBorderau = 0;
   listEmployee: IEmployee[] = [];
   listEmployeeAuto: string[] = [];
   affectedEmployee: any;
   carValue: ICar;
   selectedFile: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private depensesService: DepensesService, private fb: FormBuilder,
              private tservice: TripService, private driverService: DriversService, private snackBar: MatSnackBar,
              private employeeService: EmployeeService, private carService: CarService, private gasTicketService: GasTicketService,
              private fileUploadService: FileUploadService, private spinner2: NgxSpinnerService) {
  }

  isSaving = false;
  createdDateDp: any;
  deletedDateDp: any;
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  affectedEmployeeNgModel = '';
  affectedType = null;

  editForm = this.fb.group({
    id: [],
    createdDate: [],
    createdBy: [],
    value: [],
    deleted: [],
    month: [],
    deletedByName: [],
    deletedDate: [],
    type: [],
    depenseActivity: [],
    affectedTo: [],
    depenseFrom: [],
    description: [],
    gasoilEspece: [],
    carteTel: [],
    carMaintaining: [],
    desktopCharge: [],
    autreDesc: [],
    autreValue: [],
    carnetGasoil: []

  });
  depensesTypes = ['Avance', 'Espèces gasoil', 'Carnet gasoil', 'Maintenance Véhicule', 'Recharge Carte Téléphonique', 'Dépense Bureau', 'Autre'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  items = [];
  cars: ICar[] = [] ;
  imgURL: any;


  ngOnInit() {
    this.getAllDrivers();
    this.getAllEmployes();
    this.getCars();
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];

  }
  ngAfterViewInit() {
    this.myStepper.selectionChange
      .pipe(pluck('selectedIndex'))
      .subscribe((res: number) => {
        if (res === 0) {
          this.affectedEmployee = null;
          this.editForm.reset()
        }
      });
  }


  save(): void {

    const depenses = this.createFromForm();
    this.spinner2.show();
    if(depenses.type === 'Carnet gasoil'){
      const gasTickets: GasTicket[] = [];
      this.items.forEach(item => {
        for(let i = item.value.premierBorderau; i <= item.value.dernierBordereau; i++){
          gasTickets.push({...new GasTicket(), value: item.value.typeBorderau, numero: 'n°: ' + i, createdByName: this.user.name,
          createdBy: this.user.idAdmin, createdByDate: new Date()});
        }
      });
      this.gasTicketService.createList(gasTickets).subscribe(() => {
        this.depensesService.create(depenses).subscribe((res) => {
          this.spinner2.hide();
          this.depensesService.depenseDialogExit.next(true);
          /* const savedDepenses = res.body;
           const uploadImageData = new FormData();
           uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
           uploadImageData.append('activity', JSON.stringify(savedDepenses));
           this.fileUploadService.postFileDepense(uploadImageData).subscribe((response) => {
             this.depensesService.depenseDialogExit.next(true);
           }, () => {
             this.depensesService.depenseDialogExit.next(true);
           });*/
        });
      });
    }else{
      this.depensesService.create(depenses).subscribe((res) => {
        const savedDepenses = res.body;
        const uploadImageData = new FormData();
        this.spinner2.hide();
        this.depensesService.depenseDialogExit.next(true);
        /* uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
         uploadImageData.append('activity', JSON.stringify(savedDepenses));
         this.fileUploadService.postFileDepense(uploadImageData).subscribe((response) => {
           this.depensesService.depenseDialogExit.next(true);
         }, () => {
           this.depensesService.depenseDialogExit.next(true);
         });*/
      });
    }
  }

  private createFromForm(): IDepenses {
    let avance =
    !!this.editForm.get(['value']) ? this.editForm.get(['value'])!.value + '' : '0';
    const avanceMois =
    !!this.editForm.get(['month']) ? this.editForm.get(['month'])!.value + '' : null;
    let gasoilEspece =
    !!this.editForm.get(['gasoilEspece']) ? this.editForm.get(['gasoilEspece'])!.value + '' : '0';
    let carteTel =
    !!this.editForm.get(['carteTel']) ? this.editForm.get(['carteTel'])!.value + '' : '0';
    let carMaintaining =
    !!this.editForm.get(['carMaintaining']) ? this.editForm.get(['carMaintaining'])!.value + '' : '0';
    let desktopCharge =
    !!this.editForm.get(['desktopCharge']) ? this.editForm.get(['desktopCharge'])!.value + '' : '0';
    const autreDesc =
    !!this.editForm.get(['autreDesc']) ? this.editForm.get(['autreDesc'])!.value + '' : '0';
    let autreValue =
    !!this.editForm.get(['autreValue']) ? this.editForm.get(['autreValue'])!.value + '' : '0';
    let carnetGasoil = !!this.editForm.get(['carnetGasoil']) ? this.editForm.get(['carnetGasoil'])!.value + '' : '0';
    avance = (avance !== 'null') ? avance : '0';
    gasoilEspece = (gasoilEspece !== 'null') ? gasoilEspece : '0';
    carteTel = (carteTel !== 'null') ? carteTel : '0';
    carMaintaining = (carMaintaining !== 'null') ? carMaintaining : '0';
    desktopCharge = (desktopCharge !== 'null') ? desktopCharge : '0';
    autreValue = (autreValue !== 'null') ? autreValue : '0';
    carnetGasoil = (carnetGasoil !== 'null') ? carnetGasoil : '0';


    let montant = parseFloat(avance) + parseFloat(gasoilEspece) + parseFloat(carMaintaining) + parseFloat(desktopCharge) + parseFloat(autreValue)
      + parseFloat(carnetGasoil) + parseFloat(carteTel);
    if (this.affectedType === this.depensesTypes[2]) {
      montant = 0;
      this.items.forEach((item, i) => {
        const premierBorderau = parseFloat((<HTMLInputElement>document.getElementById('premierBorderau' + item.id)).value);
        const dernierBordereau = parseFloat((<HTMLInputElement>document.getElementById('dernierBordereau' + item.id)).value);
        this.items[i].value.premierBorderau = premierBorderau;
        this.items[i].value.dernierBordereau = dernierBordereau;
        if(this.items[i].value.typeBorderau === 15){
          montant = montant + parseFloat('356.40');
        }
        if(this.items[i].value.typeBorderau === 30){
          montant = montant + parseFloat('712.80');
        }
        if(this.items[i].value.typeBorderau === 50){
          montant = montant + parseFloat('1188');
        }
      });
    }
    const activityDepense = {
      ...new DepenseActivity(),
      avance: avance,
      avanceMois: avanceMois,
      gasoilEspece: gasoilEspece,
      carteTel: carteTel,
      carMaintaining: carMaintaining,
      desktopCharge: desktopCharge,
      autreDesc: autreDesc,
      autreValue: autreValue
    };
    return {
      ...new Depenses(),
      id: this.editForm.get(['id'])!.value,
      createdDate: new Date(),
      createdBy: this.user.idAdmin,
      createdByName: this.user.name,
      type: this.editForm.get(['type'])!.value,
      depenseActivity: activityDepense,
      affectedTo: this.affectedEmployee,
      depenseFrom: 'caisse',
      description: this.editForm.get(['description'])!.value,
      montant: montant + '',
      affectedCar: this.carValue
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepenses>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.depensesService.depenseDialogExit.next(true);

  }

  protected onSaveError(): void {
    this.isSaving = false;
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
        this.affectedDriver = oneDriver.json();
      });
    } else {
      this.affectedDriver = null;
    }
  }
  getSelectedEmployee(employee: any) {
    if (employee != null) {
      const ind = this.listEmployeeAuto.indexOf(employee.title);
      this.affectedEmployee = this.listEmployee[ind];
      this.cars = this.affectedEmployee.affectedCars;
      console.log(this.affectedEmployee);
    } else {
      this.affectedEmployee = null;
      this.cars = [];
    }
  }

  affectDepenseType(value: any) {
    this.affectedType = value;
  }

  createItem() {
    let valid = true;
    this.items.forEach((item, i) => {
      const premierBorderau = parseFloat((<HTMLInputElement>document.getElementById('premierBorderau' + item.id)).value);
      const dernierBordereau = parseFloat((<HTMLInputElement>document.getElementById('dernierBordereau' + item.id)).value);
      this.items[i].value.premierBorderau = premierBorderau;
      this.items[i].value.dernierBordereau = dernierBordereau;
      if (isNaN(premierBorderau) || isNaN(dernierBordereau) || this.affectedType === null){
        valid = false;
      }
    });
    console.log(this.items)
    if (valid){
      this.items.push({id: this.idBorderau, value: {typeBorderau: null, premierBorderau: null, dernierBordereau: null}});
      this.idBorderau++;
    }else {
      this.snackBar.open('veuillez remplir les champs de carnet.', 'Fermer', {
        duration: 10000,
      });
    }
  }

  deleteItem(id: any, i: number) {
    this.items.splice(i, 1);
  }

  affectCarnetType(value: any, i: number) {
    this.items[i].value.typeBorderau = value;
  }

  resetStepper() {
    this.editForm.reset();
    this.affectedEmployee = null;
  }

  private getAllEmployes() {
    this.employeeService.query().subscribe((res) => {
      this.listEmployee =  res.body.filter(value => value.deleted === false);
      this.listEmployeeAuto = this.listEmployee.map(value => value.firstName + ' ' + value.lastName);
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
    });
  }

  onKeyPress($event: KeyboardEvent, id: any) {
    let value = (<HTMLInputElement>event.target).value;
    console.log(value);

  }

  onFileChanged($event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.imgURL = this.selectedFile.name;
  }

  formIsValid() {
    let avance =
      !!this.editForm.get(['value']) ? this.editForm.get(['value'])!.value + '' : '0';
    const avanceMois =
      !!this.editForm.get(['month']) ? this.editForm.get(['month'])!.value + '' : null;
    let gasoilEspece =
      !!this.editForm.get(['gasoilEspece']) ? this.editForm.get(['gasoilEspece'])!.value + '' : '0';
    let carteTel =
      !!this.editForm.get(['carteTel']) ? this.editForm.get(['carteTel'])!.value + '' : '0';
    let carMaintaining =
      !!this.editForm.get(['carMaintaining']) ? this.editForm.get(['carMaintaining'])!.value + '' : '0';
    let desktopCharge =
      !!this.editForm.get(['desktopCharge']) ? this.editForm.get(['desktopCharge'])!.value + '' : '0';
    const autreDesc =
      !!this.editForm.get(['autreDesc']) ? this.editForm.get(['autreDesc'])!.value + '' : '0';
    let autreValue =
      !!this.editForm.get(['autreValue']) ? this.editForm.get(['autreValue'])!.value + '' : '0';
    let carnetGasoil = !!this.editForm.get(['carnetGasoil']) ? this.editForm.get(['carnetGasoil'])!.value + '' : '0';
    switch(this.affectedType) {
      case this.depensesTypes[0]: {
        if(!this.affectedEmployee || !avance || !avanceMois){
          return false;
        }else{
          return true;
        }

        break;
      }
      case this.depensesTypes[1]: {
        if(!this.affectedEmployee || !gasoilEspece || !this.carValue){
          return false;
        }else{
          return true;
        }
        break;
      }
      case this.depensesTypes[2]: {
        return true;
        break;
      }
      case this.depensesTypes[3]: {
        if( !carMaintaining || !this.carValue){
          return false;
        }else{
          return true;
        }
        break;
      }
      case this.depensesTypes[4]: {
        if(!this.affectedEmployee || !carteTel){
          return false;
        }else{
          return true;
        }
        break;
      }
      case this.depensesTypes[5]: {
        if(!desktopCharge){
          return false;
        }else{
          return true;
        }
        break;
      }
      case this.depensesTypes[6]: {
        if(!autreDesc || !autreValue){
          return false;
        }else{
          return true;
        }
        break;
      }
      default: {
        return false;
        break;
      }
    }
  }
}
const MODALS: { [name: string]: Type<any> } = {
  deletePopUp: PopUpDeleteComponent,
  depenseDetail: DepenseDetailsComponent
};
