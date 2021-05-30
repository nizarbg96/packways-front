import {AfterViewInit, Component, Inject, OnInit, Type, ViewChild} from '@angular/core';
import {DepensesService} from '../depenses/depenses.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSnackBar, MatStepper, MatTableDataSource} from '@angular/material';
import {PopUpDeleteService} from '../shared/pop-up-delete/pop-up-delete.service';
import {EmployeeService} from '../employee/employee.service';
import {GasTicketService} from '../depenses/gas-ticket.service';
import {Depenses, IDepenses} from '../../model/depenses.model';
import {IEmployee} from '../../model/employee.model';
import {Car, ICar} from '../../model/car.model';
import {TripService} from '../trips/trips.service';
import {DriversService} from '../drivers/drivers.service';
import {CarService} from '../car/car.service';
import {pluck} from 'rxjs/operators';
import {GasTicket} from '../../model/gas-ticket.model';
import {DepenseActivity} from '../../model/depense-activity.model';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {PopUpDeleteComponent} from '../shared/pop-up-delete/pop-up-delete.component';
import {DepenseDetailsComponent} from '../depenses/depense-details/depense-details.component';
import {InjectionFondService} from './injection-fond.service';
import {IInjectionFond, InjectionFond} from '../../model/injection-fond.model';
import {InjectionFonDetailsComponent} from './injection-fon-details/injection-fon-details.component';
import {CaisseService} from '../caisse-state/caisse.service';

@Component({
  selector: 'app-injection-fond',
  templateUrl: './injection-fond.component.html',
  styleUrls: ['./injection-fond.component.scss']
})
export class InjectionFondComponent implements OnInit, AfterViewInit {

  date = new Date();
  private closeResult: string;
  isLoadingResults = false;
  private user: any;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private injectionFondService: InjectionFondService,
              public dialog: MatDialog, private popUpDeleteService: PopUpDeleteService,  private snackBar: MatSnackBar,
              private caisseService: CaisseService
              ) {
  }

  displayedColumns: string[] = ['createdDate', 'createdBy', 'type', 'montant','description', 'action'];
  dataSource = new MatTableDataSource<IInjectionFond>([]);


  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.isLoadingResults = true;
    this.getInjections();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.injectionFondService.depenseDialogExit.subscribe((res) => {
      if (res) {
        this.dialog.closeAll();
        this.isLoadingResults = true;
        this.getInjections();
        this.injectionFondService.depenseDialogExit.next(false);
      }
    });
  }
  getInjections() {
    this.injectionFondService.query().subscribe(res => {
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource<IInjectionFond>(res.body);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog() {
    let d = new Date();
    d.setHours(0,0,0,0);
    this.caisseService.findLastCoffre().subscribe((res) => {
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
            this.dialog.open(AddFondComponent, {
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


  deleteInjection(element: IInjectionFond) {
    this.popUpDeleteService.activityName = 'injection';
    this.modalService.open(MODALS['deletePopUp']).result.then(
      (result) => {
        element.deleted = true;
        element.deletedBy = this.user.idAdmin;
        element.deletedDate = new Date();
        element.deletedByName = this.user.name;
        this.injectionFondService.update(element).subscribe(() => {
          this.isLoadingResults = true;
          this.getInjections();
        });
      }, (reason) => {

      }
    );
  }

  viewDetails(element: IInjectionFond) {
    this.injectionFondService.injectionDetails = element;
    this.modalService.open(MODALS['injectionDetail']).result.then(
      (result) => {

      }, (reason) => {

      }
    );
  }
}

@Component({
  selector: 'add-fond',
  templateUrl: './add-fond.html',
})
export class AddFondComponent implements OnInit {
  private user: any;
  @ViewChild('stepper')  myStepper: MatStepper;
  private affectedType: any;
  private listEmployee: IEmployee[] = [];
  private listEmployeeAuto: string[] = [];
  private affectedEmployee: IEmployee;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private snackBar: MatSnackBar,
              protected injectionFondService: InjectionFondService, private fb: FormBuilder, private employeeService: EmployeeService) {
  }

  isSaving = false;

  editForm = this.fb.group({
    id: [],
    montant: [],
    createdDay: [],
    createdBy: [],
    createdByName: [],
    type: [],
    description: [],
    deleted: [],
    deletedBy: [],
    deletedByName: [],
    deletedDate: [],
  });
  injectionTypes = ['Injection fond espèce', 'Injection fond cheque'];


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.getAllEmployes()

  }
  private getAllEmployes() {
    this.employeeService.query().subscribe((res) => {
      this.listEmployee =  res.body.filter(value => value.deleted === false);
      this.listEmployeeAuto = this.listEmployee.map(value => value.firstName + ' ' + value.lastName);
    });
  }
  getSelectedEmployee(employee: any) {
    if (employee != null) {
      const ind = this.listEmployeeAuto.indexOf(employee.title);
      this.affectedEmployee = this.listEmployee[ind];
    } else {
      this.affectedEmployee = null;
    }
  }


  save(): void {
    const injectionFond = this.createFromForm();
    console.log(injectionFond)
    if (injectionFond.id !== undefined) {
      this.subscribeToSaveResponse(this.injectionFondService.update(injectionFond));
    } else {
      this.subscribeToSaveResponse(this.injectionFondService.create(injectionFond));
    }
  }

  private createFromForm(): IInjectionFond {
    return {
      ...new InjectionFond(),
      montant: this.editForm.get(['montant'])!.value,
      createdDate: new Date(),
      createdBy: this.user.idAdmin,
      createdByName: this.user.name,
      type: this.affectedType,
      description: this.editForm.get(['description'])!.value,
      injectedBy: this.affectedEmployee
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInjectionFond>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.injectionFondService.depenseDialogExit.next(true);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }


  affectInjectionType(value: any) {
    this.affectedType = value;
  }

  resetStepper() {
    this.editForm.reset();
  }
}
const MODALS: { [name: string]: Type<any> } = {
  deletePopUp: PopUpDeleteComponent,
  injectionDetail: InjectionFonDetailsComponent
};
