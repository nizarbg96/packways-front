import {AfterViewInit, Component, Inject, OnInit, TemplateRef, Type, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
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

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
export class DepensesComponent implements OnInit, AfterViewInit {
  date = new Date();
  private closeResult: string;
  isLoadingResults = false;
  private user: any;


  constructor(private depensesService: DepensesService, private modalService: NgbModal, private fb: FormBuilder,
              public dialog: MatDialog, private popUpDeleteService: PopUpDeleteService,
              private employeeService: EmployeeService, private gasTicketService: GasTicketService) {
  }

  displayedColumns: string[] = ['createdDate', 'createdBy', 'type', 'montant', 'depenseFrom', 'depenseTo', 'action'];
  dataSource = new MatTableDataSource<Depenses>([]);


  @ViewChild(MatPaginator) paginator: MatPaginator;


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
      this.dataSource = new MatTableDataSource<Depenses>(res.body);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog() {
    this.dialog.open(AddDepenseComponent, {
      data: null,
      width: '60vw',
      maxHeight: '60vh',
    });
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
}

@Component({
  selector: 'dialog-depense',
  templateUrl: './add-depense.html',
})
export class AddDepenseComponent implements OnInit {
  private user: any;
   idBorderau = 0;
  private listEmployee: IEmployee[] = [];
  private listEmployeeAuto: string[] = [];
  private affectedEmployee: any;
  private carValue: ICar;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private depensesService: DepensesService, private fb: FormBuilder,
              private tservice: TripService, private driverService: DriversService, private snackBar: MatSnackBar,
              private employeeService: EmployeeService, private carService: CarService, private gasTicketService: GasTicketService) {
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

  ngOnInit() {
    this.getAllDrivers();
    this.getAllEmployes();
    this.getCars();
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];

  }

  save(): void {

    const depenses = this.createFromForm();
    if(depenses.type === 'Carnet gasoil'){
      const gasTickets: GasTicket[] = [];
      this.items.forEach(item => {
        for(let i = item.value.premierBorderau; i <= item.value.dernierBordereau; i++){
          gasTickets.push({...new GasTicket(), value: item.value.typeBorderau, numero: 'n°: ' + i, createdByName: this.user.name,
          createdBy: this.user.idAdmin, createdByDate: new Date()});
        }
      });
      this.gasTicketService.createList(gasTickets).subscribe(() => {
        console.log(this.items);
        this.subscribeToSaveResponse(this.depensesService.create(depenses));
      })
    }else{
      console.log(this.items);
      this.subscribeToSaveResponse(this.depensesService.create(depenses));
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
      + parseFloat(carnetGasoil);
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
    this.editForm.controls['gasoilEspece'].setValue(null);
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
}
const MODALS: { [name: string]: Type<any> } = {
  deletePopUp: PopUpDeleteComponent,
  depenseDetail: DepenseDetailsComponent
};
