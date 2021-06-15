import {DashboardService} from './dashboard.service';
import {AfterViewInit, Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {StatestiquesService} from '../statestics/statestiques.service';
import {IStatClient, StatClient} from '../../model/stat-client.model';
import '../../../assets/statistics_assets/vendors/base/vendor.bundle.base.js';
import '../../../assets/statistics_assets/vendors/chart.js/Chart.min.js';
import '../../../assets/statistics_assets/js/off-canvas.js';
import '../../../assets/statistics_assets/js/hoverable-collapse.js';
import '../../../assets/statistics_assets/js/template.js';
import '../../../assets/statistics_assets/js/todolist.js';
import '../../../assets/statistics_assets/js/dashboard.js';
import '../../../assets/statistics_assets/js/dashboard_sticksChart.js';
import {Trip} from '../trips/Trip';
import {MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {IStatActivityJour, StatActivityJour} from '../../model/stat-activity-jour.model';
import {DialogData} from '../trips/trips.component';
import {IStatActivityDriver, StatActivityDriver} from '../../model/stat-activity-driver.model';
import {IStatActivityJourClient, StatActivityJourClient} from '../../model/stat-activity-jour-client.model';
import {ClassementDrivers} from '../../model/classement-drivers.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {Entrepot} from '../../model/entrepot.model';
import {FormControl, Validators} from '@angular/forms';
import {EntrepotService} from '../entrepot/entrepot.service';
import {TripService} from '../trips/trips.service';
import {DriversService} from '../drivers/drivers.service';
import {ActivityPayement} from '../../model/activity-payement.model';
import {TripExcelService} from '../trips/excel-trip.service';
import * as XLSX from 'xlsx';
import {User} from '../users/User';
import {JumiaTrip} from '../../model/jumia.trip.model';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal, {SweetAlertOptions} from 'sweetalert2';

type AOA = any[][];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]})
export class DashboardComponent implements OnInit, AfterViewInit {

  sommeLC: number;
  somm: any;
  sommeCH: any;
  items: any = [];
  jsonObj: any;
  ChercheL: Array<any> = [];
  Enchemin: Array<any> = [];
  Encours: Array<any> = [];
  Chezlivreur: Array<any> = [];
  Retour: Array<any> = [];
  Retournee: Array<any> = [];
  driver: Array<any> = [];
  postes: Array<any> = [];
  livree: Array<any> = [];
  annulee: Array<any> = [];
  result: any;
  id: any;
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];
  date = new Date();


  isVisible: boolean;
  PreMessagesAction = ['Numéro incorrect !', 'Client non joignable par téléphone !',
    'Client absent au RDV !', 'Client contacté, livraison reportée', 'Reportée, faute de temps'
    , 'Autre'];
  messageSelectionee = '-';
  listColisMessage: Trip[] = [];
  displayedColumns: string[] = ['jour', 'entrepot', 'nbColisLivree', 'nbColisRetournee', 'nbColisNLRetour', 'nbColisNLALivree', 'nbColisEncours', 'action'];
  displayedColumns2: string[] = ['jour', 'entrepot', 'driver', 'nbColisLivree', 'nbColisRetournee', 'nbColisNLRetour', 'nbColisNLALivree', 'nbColisEncours', 'tauxLivraison', 'action'];
  displayedColumns3: string[] = ['jour', 'client', 'nbColisPickUp', 'nbColisLivree', 'nbColisRetournee',
    'nbColisEnCoursDePayement', 'nbColisPayee', 'action'];
  entrepot = new FormControl('', Validators.required);
  entrepotValue: Entrepot = null;
  dataSourceFiltred = new MatTableDataSource<StatActivityJour>([]);
  dataSourceDriversFiltred = new  MatTableDataSource<StatActivityDriver>([]);
  dataSourceClientsFiltred = new  MatTableDataSource<StatActivityJourClient>([]);
  dataSourceClients: StatActivityJourClient[] = [];
  dataSourceDrivers: StatActivityDriver[] = [];
  dataSource: StatActivityJour[] = [];
  dataSourceRanking: ClassementDrivers[] = [];
  dataSourceLastPickUps: IStatActivityJourClient[] = [];
  dataSourceNbPickUps: IStatActivityJourClient[] = [];
  entrepots: Entrepot[] = [];


  @ViewChild('pag1') paginator1: MatPaginator;
  @ViewChild('pag2') paginator2: MatPaginator;
  @ViewChild('pag3') paginator3: MatPaginator;
  nbColisLivree = 0;
  nbStopslivree = 0;
  nbColisRetournee = 0;
  valDepenses = 0;
  valMontantRecoltee = 0;
  benefice = 0;
  nbColisLivreeLastMonth = 0;
  nbStopsLivreeLastMonth = 0;
  nbColisRetourneeLastMonth = 0;
  valDepensesLastMonth = 0;
  valMontantRecolteeLastMonth = 0;
  beneficeLastMonth = 0;
  selectedActivityJour: IStatActivityJour;
  selectedActivityDriver: IStatActivityDriver;
  selectedActivityClient: IStatActivityJourClient;
  private closeResult: string;

  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  //
  Listuserauto = [];
  clientFilter: any;
  Listuser = [];
  affectedUser: any;
  dateDebut: Date;
  dateFin: Date;
  @ViewChild('button1') button1: ElementRef<HTMLElement>;
  private tripsFromExcelTemp: AOA;
  private tripsFromExcel: AOA;
  loadData1 = true;
  loadData2 = true;
  loadData3 = true;
  loadData4 = true;
  loadData5 = true;
  user: any;





  constructor(public dservice: DashboardService, private statestiquesService: StatestiquesService, public dialog: MatDialog,  private modalService: NgbModal,
              public datepipe: DatePipe, private entrepotService: EntrepotService, private tservice: TripService, private snackBar: MatSnackBar,
              private driverService: DriversService, private tripExcelService: TripExcelService, private spinner: NgxSpinnerService) {

    if (localStorage.getItem('auth') === 'admin') {
      this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }
  ngAfterViewInit() {

    const firstDayCurrentMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    let firstDayLastMonth: Date;
    if (this.date.getMonth() === 0) {
      firstDayLastMonth = new Date(this.date.getFullYear(), 11, 1);
    } else {
      firstDayLastMonth = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
    }
    const lastDayLastMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    console.log(firstDayLastMonth);
    console.log(lastDayLastMonth);

    if (localStorage.getItem('auth') === 'admin') {
      this.statestiquesService.queryByDateBetwwen(firstDayLastMonth, lastDayLastMonth).subscribe((res) => {
        res.body.forEach(value => {
          this.nbStopsLivreeLastMonth = this.nbStopsLivreeLastMonth + value.nbStopLivree;
          this.nbColisLivreeLastMonth = this.nbColisLivreeLastMonth + value.nbColisLivree;
          this.nbColisRetourneeLastMonth = this.nbColisRetourneeLastMonth + value.nbColisRetournee;
          this.valDepensesLastMonth = this.valDepensesLastMonth + value.valDepenses;
          this.beneficeLastMonth =  (this.nbColisLivreeLastMonth * 6) + (this.nbColisRetourneeLastMonth * 3) - this.valDepensesLastMonth;
        });
      });

      this.statestiquesService.queryByDate(firstDayCurrentMonth).subscribe((res) => {
        this.loadData1 = false;
        const stats = res.body.reverse();
        this.dataSource = stats;
        this.dataSourceFiltred =  new MatTableDataSource<StatActivityJour>(stats);
        this.dataSourceFiltred.paginator = this.paginator1;
        res.body.filter((value) => value.entrepot.nom === this.user.entrepot.nom).forEach(value => {
          this.nbColisLivree = this.nbColisLivree + value.nbColisLivree;
          this.nbStopslivree = this.nbStopslivree  + value.nbStopLivree;
          this.nbColisRetournee = this.nbColisRetournee + value.nbColisRetournee;
          this.valDepenses = this.valDepenses + value.valDepenses;
          this.benefice =  (this.nbColisLivree * 6) + (this.nbColisRetournee * 3) - this.valDepenses;
        });
      });
      this.statestiquesService.getDriversStatsBetween({fromDate: firstDayCurrentMonth }).subscribe((res) => {
        this.loadData2 = false;
        const stats = res.body.reverse();
        this.dataSourceDrivers = stats;
        this.dataSourceDriversFiltred =  new MatTableDataSource<StatActivityDriver>(stats);
        this.dataSourceDriversFiltred.paginator = this.paginator2;
      });
      this.statestiquesService.getClientsStatsBetween({fromDate: firstDayCurrentMonth }).subscribe((res) => {
        this.loadData3 = false;

        const stats = res.body.reverse();
        this.dataSourceClients = res.body.reverse();
        this.dataSourceClientsFiltred =  new MatTableDataSource<StatActivityJourClient>(this.dataSourceClients);
        this.dataSourceClientsFiltred.paginator = this.paginator3;
      });
      this.statestiquesService.getDriversRanking().subscribe((res) => {
        this.loadData4 = false;

        this.dataSourceRanking = res.body;
        this.dataSourceRanking = this.dataSourceRanking.sort((a, b) => b.successRate - a.successRate);
      });
      this.statestiquesService.getClientsLastPickUpsDate().subscribe((res) => {
        this.loadData5 = false;
        this.dataSourceNbPickUps = res.body.slice().sort((a, b) => b.nbColisPickUp - a.nbColisPickUp);
        console.log(this.dataSourceNbPickUps);
        this.dataSourceLastPickUps = res.body.slice().sort((a, b) => new Date(b.lasPickUpDate).getTime() - new Date(a.lasPickUpDate).getTime());
      });
    }

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    if (localStorage.getItem('auth') === 'admin') {
      this.getEntrepots();
      this.getAllDrivers();
      this.getAllUsers();
    }
    if (localStorage.getItem('auth') === 'admin') {
      console.log('user is Admin---');
      this.id = 'admin';
    } else {
      console.log('user is Client---');
      this.id = 'UT' + JSON.parse(localStorage.getItem('currentUser')).data[0].idUser;
    }
    // this.getTripPostées();
    // this.getTripLivree();
    // this.getTripAnnulee();
    // this.getDriverAcrives();
    // this.getTripRetournee();
    // this.getTripChezlivreur();
    // this.getTripEncourLivraison();
    // this.getTripRetour();
    // this.getTripEnchemin();
    // this.getTripChercheLivreur();
    // this.getTrips();
  }
  getEntrepots() {
    this.entrepotService.query().subscribe((res) => {
      this.entrepots = res.body.filter((entrepot) => entrepot.deleted === false);
    });
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
        this.dataSourceDriversFiltred = new MatTableDataSource<StatActivityDriver>(this.dataSourceDrivers.filter(value => value.driver.idDriver === oneDriver.json().idDriver));
        this.dataSourceDriversFiltred.paginator = this.paginator2;
      });
    } else {
      this.dataSourceDriversFiltred = new MatTableDataSource<StatActivityDriver>(this.dataSourceDrivers);
      this.dataSourceDriversFiltred.paginator = this.paginator2;
    }
  }
  getAllUsers() {
    this.tservice.getUsers().subscribe(data => {
      const obj = Array.of(JSON.parse(data['_body']).data);
      const jsonObj = obj[0];
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].accountActive === true) {
          this.Listuser.push(jsonObj[i]);
          this.Listuserauto.push(jsonObj[i].nameUser + ' ' + jsonObj[i].surnameUser);
        }
      }
      // console.log('listuser!::', this.Listuserauto);
    }, error => {
      // console.log(error);
    });
  }
  getSelectedUser(user: any) {
    if (user != null) {
      const ind = this.Listuserauto.indexOf(user.title);
      this.affectedUser = this.Listuser[ind];
      this.dataSourceClientsFiltred =  new MatTableDataSource<StatActivityJourClient>(this.dataSourceClients.filter(value => value.user.idUser === this.affectedUser.idUser));
      this.dataSourceClientsFiltred.paginator = this.paginator3;
    } else {
      this.dataSourceClientsFiltred =  new MatTableDataSource<StatActivityJourClient>(this.dataSourceClients);
      this.dataSourceClientsFiltred.paginator = this.paginator3;
    }
  }
  addEventDateDebutActivityJour(input: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateDebut = $event.value;

  }

  addEventDateFinActivityJour(change: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateFin = $event.value;

  }
  addEventDateDebutActivityDriver(input: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateDebut = $event.value;

  }

  addEventDateFinActivityDriver(change: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateFin = $event.value;

  }
  addEventDateDebutActivityClient(input: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateDebut = $event.value;

  }

  addEventDateFinActivityClient(change: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateFin = $event.value;

  }
  affectEntrepotActivityGlobale(entrepot: Entrepot) {
    this.entrepotValue = entrepot;

  }
  affectEntrepotActivityDriver(entrepot: Entrepot) {
    this.entrepotValue = entrepot;

  }


  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public getIntValuue(value: number) {
    return Math.round(value);
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }
  convertTime(date: Date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }




  getTripPostées() {
    this.dservice.getTripsEncours(this.id).subscribe((data: any) => {
      this.postes = data;
    });
  }

  getTripLivree() {
    this.dservice.getTripsLivree(this.id).subscribe((data: any) => {
      this.livree = data;
    });
  }

  getTripAnnulee() {
    this.dservice.getTripsAnnulee(this.id).subscribe((data: any) => {
      this.annulee = data;
    });
  }

  getTripRetournee() {
    this.dservice.getTripRetournee(this.id).subscribe((data: any) => {
      this.Retournee = data;
      console.log('Retournee', this.Retournee);
    });
  }

  getTripRetour() {
    this.dservice.getTripRetour(this.id).subscribe((data: any) => {
      this.Retour = data;
      console.log('Retour', this.Retour);
    });
  }

  getTripChezlivreur() {
    this.dservice.getTripChezlivreur(this.id).subscribe((data: any) => {
      this.Chezlivreur = data;
      console.log('Chez livreur', this.Chezlivreur);
    });
  }

  getTripEncourLivraison() {
    this.dservice.getTripEncoursdeLivraison(this.id).subscribe((data: any) => {
      this.Encours = data;
      console.log('EN cours', this.Encours);
    });
  }

  getTripEnchemin() {
    this.dservice.getTripEnchemin(this.id).subscribe((data: any) => {
      this.Enchemin = data;
      console.log('En chemein', this.Enchemin);
    });
  }

  getTripChercheLivreur() {
    this.dservice.getTripChercheLivreur(this.id).subscribe((data: any) => {
      this.ChercheL = data;
      console.log('Cherche Livreur::', this.ChercheL);
    });
  }


  getDriverAcrives() {
    this.dservice.getDriverActive().subscribe((data: any) => {
      this.driver = data;
    });
  }


  getTrips() {
    this.sommeCH = 0;
    this.sommeLC = 0;
    this.dservice.getTripParClient().subscribe((data: any) => {
      /*const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);*/
      this.jsonObj = data.data;
      console.log('cleint: ', this.jsonObj);
      for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
        this.somm = this.jsonObj[index];
        this.sommeCH += Number(this.somm[1]);
        this.sommeLC += Number(this.somm[2]);
      }

      console.log('cleint2222: ', this.items);
      console.log('somme222: ', this.sommeCH);
      console.log('somme222: ', this.sommeLC);
    });
  }
  openDialog(element: StatActivityJour) {
    this.dialog.open(DialogStatActivityComponent, {
      data: element
    });
  }


  openModalActivityJour(contentActivityJour: TemplateRef<any>, element: IStatActivityJour) {
    this.selectedActivityJour = element;
    this.open(contentActivityJour);
  }
  openModalActivityDriver(contentActivityJour: TemplateRef<any>, element: IStatActivityDriver) {
    this.selectedActivityDriver = element;
    this.open(contentActivityJour);
  }
  openModalActivityClient(contentActivityJour: TemplateRef<any>, element: IStatActivityJourClient) {
    this.selectedActivityClient = element;
    this.open(contentActivityJour);
  }


  generateExcelReportActivityGlobale(listRapport: StatActivityJour[]) {

      if (listRapport.length === 0) {
        this.snackBar.open('il n y a pas des statestiques à générer.', 'Fermer', {
          duration: 10000,
        });
        return;
      }
      let tab = [];
      const tripsByUser = [];
      for (let i = 0; i < listRapport.length; i++) {
        tab = [];
        const jTemp = listRapport[i];
        tab.push(this.splitDateFormatMDY2(this.datepipe.transform(jTemp.jour, 'yyyy-MM-dd')), jTemp.entrepot.nom, jTemp.nbColisNonLivree, jTemp.nbColisNLALivree, jTemp.nbColisNLRetour, jTemp.nbColisLivree, jTemp.nbStopLivree,
          jTemp.nbColisRetournee, jTemp.nbColisEncours, jTemp.nbColisEntrepot,jTemp.nbColisEntrepotChezLivreur, jTemp.nbColisEntrepotRetour,
          jTemp.nbColisPickUp, jTemp.nbColisPUNonTreated, jTemp.nbColisMUInALivree, jTemp.nbColisMUInRetour, jTemp.nbColisMUOutALivree, jTemp.nbColisMUOutRetour, jTemp.valColisLivree + ' TND',
          jTemp.valDepenses+' TND', jTemp.valMontantRecoltee+' TND');
        tripsByUser.push(tab);
      }
      this.tripExcelService.generateExcelActivityJour(tripsByUser, '', '', '', '');


  }
  generateExcelReportActivityDriver(listRapport: StatActivityDriver[]) {

    if (listRapport.length === 0) {
      this.snackBar.open('il n y a pas des statestiques à générer.', 'Fermer', {
        duration: 10000,
      });
      return;
    }
    let tab = [];
    const tripsByUser = [];
    for (let i = 0; i < listRapport.length; i++) {
      tab = [];
      const jTemp = listRapport[i];
      tab.push(this.splitDateFormatMDY2(this.datepipe.transform(jTemp.jour, 'yyyy-MM-dd')), jTemp.driver.nameDriver + ' ' + jTemp.driver.surnameDriver,
        jTemp.entrepot.nom, jTemp.nbColisNonLivree, jTemp.nbColisNLALivree, jTemp.nbColisNLRetour, jTemp.nbColisLivree,
        jTemp.nbStopLivree, jTemp.nbColisRetournee, jTemp.nbColisEncours, jTemp.nbColisEntrepot, jTemp.nbColisEntrepotChezLivreur, jTemp.nbColisEntrepotRetour,
        jTemp.nbColisPickUp, jTemp.nbColisPUNonTreated, jTemp.nbColisMUInALivree, jTemp.nbColisMUInRetour, jTemp.nbColisMUOutALivree, jTemp.nbColisMUOutRetour, jTemp.valColisLivree + ' TND',
        jTemp.valDepenses+' TND', jTemp.valMontantRecoltee+' TND');
      tripsByUser.push(tab);
    }
    this.tripExcelService.generateExcelActivityDriver(tripsByUser, '', '', '', '');


  }
  generateExcelReportActivityClient(listRapport: StatActivityJourClient[]) {

    if (listRapport.length === 0) {
      this.snackBar.open('il n y a pas des statestiques à générer.', 'Fermer', {
        duration: 10000,
      });
      return;
    }
    let tab = [];
    const tripsByUser = [];
    for (let i = 0; i < listRapport.length; i++) {
      tab = [];
      const jTemp = listRapport[i];
      tab.push(this.splitDateFormatMDY2(this.datepipe.transform(jTemp.jour, 'yyyy-MM-dd')), jTemp.user.nameUser + ' ' + jTemp.user.surnameUser, jTemp.nbColisNonLivree, jTemp.nbColisNLALivree, jTemp.nbColisNLRetour, jTemp.nbColisLivree,
        jTemp.nbColisRetournee, jTemp.nbColisEncoursLivraison, jTemp.nbColisEntrepot,jTemp.nbColisEntrepotChezLivreur, jTemp.nbColisEntrepotRetour,
        jTemp.nbColisPickUp, jTemp.nbColisPUNonTreated, jTemp.nbColisMUInALivree, jTemp.nbColisMUInRetour, jTemp.nbColisMUOutALivree, jTemp.nbColisMUOutRetour, jTemp.valColisLivree + ' TND',
        jTemp.valDepenses+' TND', jTemp.valMontantRecoltee+' TND');
      tripsByUser.push(tab);
    }
    this.tripExcelService.generateExcelActivityClient(tripsByUser, '', '', '', '');


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
  onFileChange(evt: any, contentImport) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
        console.log('type', target.files[0].type);
        const typeFile = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
       /* if (target.files[0].type !== typeFile) {
           /* this.snackBar.open('Échec, le fichier est invalide, les extensions autorisées sont: .xlsx et xls.', 'Fermer', {
                duration: 5000,
            });
            return;
        } else {*/
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                /* read workbook */
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                this.tripsFromExcelTemp = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
                this.tripsFromExcel = this.tripsFromExcelTemp;
                this.tripsFromExcel.shift();
                console.log(this.tripsFromExcel);
              this.addTripsFromExcelFile();
            };
            reader.readAsBinaryString(target.files[0]);
    //         // }
    }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

    addTripsFromExcelFile() {
    const trips: Trip[] = [];
    this.tripsFromExcel.forEach(value => {
      const trip = new JumiaTrip();
      trip.ref = value[0];
      trip.clientName = value[6];
      trip.clientSurname = value[7];
      trip.numMobile = value[8];
      trip.street = value[9];
      trip.city = value[10];
      trip.region = value[11];
      if(!!value[15]){
        trip.valColis = value[15];
      }else{
        trip.valColis = '0';
      }
      trip.statusTrip = value[21];
      trip.nomLivreur = value[23];
      trip.collectedDate = value[29];
      trip.deliveredDate = value[31];
      trips.push(trip);
    });
    this.spinner.show();
    this.statestiquesService.postJumiaTrips(trips).subscribe(() => {
      this.spinner.hide();
      const options = {
        title: "succès",
        text: "Colis ajoutés avec succès",
        type: "success",
      } as SweetAlertOptions;

      Swal.fire(options);
    },() => {
      this.spinner.hide();
      const options2 = {
        title: "Ereur",
        text: "Un Erreur a été survenu",
        type: "error",
      } as SweetAlertOptions;
      Swal.fire(options2);
    });

      const that = this;
      console.log('Test2');
      const nowd = new Date();
  const tripType = 'pack';
      const sizePack = null;
      const poidsTrip = 0;
  const modeLiv = '24H';
      const labelAdrD = '';
  const pricePack = 6;
      const typePaiement = 'Contre remboursement';
      // const regex = /^[0-9]+$/;
      const regex = /^-?(?:\d+|\d{0,9}(?:,\d{9})+)(?:(\.|,)\d+)?$/;
      let checkValidFile = true;
      if (this.tripsFromExcel !== null && this.tripsFromExcel.length > 0) {

          console.log('aaaaaaa111111111aa', this.tripsFromExcel);
          for (let i = 0; i < this.tripsFromExcel.length; i++) {
              // let valueTrip: any; let telContAdresseDest: any;
              const contactAdresseDest = this.tripsFromExcel[i][0];
              const telContAdresseDest = this.tripsFromExcel[i][1];
              const descriptionTrip = this.tripsFromExcel[i][6];
              const valueTrip = this.tripsFromExcel[i][7];
              const cityGlobalDest = this.tripsFromExcel[i][8];
              const latGlobalDest = this.tripsFromExcel[i][9];
              // const latGlobalDest = 36.81897;
              const lngGlobalDest = this.tripsFromExcel[i][10];
              // const lngGlobalDest = 10.16579;

              console.log('aaaaaaaaa');
              if ((descriptionTrip === undefined) || (valueTrip === undefined) || (telContAdresseDest === undefined)
              || (contactAdresseDest === undefined) || (cityGlobalDest === undefined)) {
                  checkValidFile = false;
                  /*this.snackBar.open('Échec de l\'importation, veuillez réessayer. Assurez-vous d\'importer un fichier valide.', 'Fermer', {
                      duration: 5000,
                  });*/
                  // this.openDialog();

                  return;
              } else if ((descriptionTrip === null || descriptionTrip === '') || (valueTrip === null || valueTrip === '')
              || (telContAdresseDest === null || telContAdresseDest === '')
              || (contactAdresseDest === null || contactAdresseDest === '') || (cityGlobalDest === null || cityGlobalDest === '')) {
                  checkValidFile = false;
                  /*this.snackBar.open('Échec de l\'importation, veuillez réessayer. Assurez-vous d\'importer un fichier valide.', 'Fermer', {
                      duration: 5000,
                  });*/
                 // this.openDialog();
                  return;
              }

              // valueTrip = valueTrip.replace(/,/g, '.');
              /*this.tripDataFromExcel = this.tservice.addTripFromExcel(
                  this.dataUser.nameUser, this.dataUser.emailUser, this.dataUser.rateUser, this.dataUser.idUser,
                  this.dataUser.nbrateUser, this.dataUser.nbrdeliveryUser, this.dataUser.mobileUser, this.dataUser.surnameUser,
                  this.selectedAdresseExpExcel.geolocAdr.lat, this.selectedAdresseExpExcel.geolocAdr.lng, this.selectedAdresseExpExcel.contactAdr,
                  this.selectedAdresseExpExcel.mobileAdr, contactAdresseDest,
                  telContAdresseDest, null, nowd, 'UT' + this.dataUser.idUser, this.dataUser.idUser,
                  nowd, latGlobalDest, lngGlobalDest, modeLiv,
                  this.dataUser.cout, tripType, valueTrip, poidsTrip,
                  sizePack, typePaiement, 'REF', 'cherche un livreur',
                  this.selectedAdresseExpExcel.cityAdr, cityGlobalDest, null, descriptionTrip,
                  null, this.selectedAdresseExpExcel.labelAdr, labelAdrD);
                this.listTripDataFromExcel.push(this.tripDataFromExcel);*/
          }
          // this.spinner.hide();
          // window.location.reload();
          /*this.tservice.addListTripsFromExel(this.listTripDataFromExcel);*/

      } else {
        /*  this.snackBar.open('Échec de l\'importation, veuillez réessayer. Assurez-vous d\'importer un fichier valide.', 'Fermer', {
              duration: 5000,
          });*/
      }
/*
      this.out = this.tripsFromExcel.length * 1000;
*/
      /*
      setTimeout(function() {
          /* that.getFiltredTrips1(this.startDateFilter, this.endDateFilter, this.searchTerm, this.clientFilter2,
              this.stateFilter, this.enRetardFilter, this.payementStatusFilter, null);
              window.location.reload();
     }, this.out);
     */

  }


  applyFilterGlobalActivity() {
    this.statestiquesService.getGlobalStatsBetween({fromDate: this.dateDebut, toDate: this.dateFin, entrepot: this.entrepotValue}).subscribe((res) => {
      this.dataSourceFiltred = new MatTableDataSource<StatActivityJour>(res.body);
      this.dataSourceFiltred.paginator = this.paginator1;
      this.dateDebut = null; this.dateFin = null; this.entrepotValue = null;});
  }

  applyFilterActivityDriver() {
    this.statestiquesService.getDriversStatsBetween({fromDate: this.dateDebut, toDate: this.dateFin, driver: this.affectedDriver }).subscribe((res) => {
      this.dataSourceDriversFiltred = new MatTableDataSource<StatActivityDriver>(res.body);
      this.dataSourceDriversFiltred.paginator = this.paginator2;
      this.dateDebut = null;
      this.dateFin = null;
      this.affectedDriver = null;
      this.entrepotValue = null;
      this.affectedUser = null;
    });
  }

  applyFilterClientActivity() {
    this.statestiquesService.getClientsActvityStats({fromDate: this.dateDebut, toDate: this.dateFin, client: this.affectedUser }).subscribe((res) => {
      this.dataSourceClientsFiltred = new MatTableDataSource<StatActivityDriver>(res.body);
      this.dataSourceClientsFiltred.paginator = this.paginator3;
    });
  }
}
@Component({
  selector: 'dialog-stat-acivity-dialog',
  templateUrl: './dialog-stat-activity.html',
})
export class DialogStatActivityComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
