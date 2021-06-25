import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDatepickerInputEvent, MatPaginator, MatTableDataSource} from '@angular/material';
import {DriversTable} from '../../../model/drivers-table.model';
import {DriversTableService} from '../drivers-table.service';
import {DriversService} from '../../drivers/drivers.service';
import {TripService} from '../../trips/trips.service';
import {StatActivityDriver} from '../../../model/stat-activity-driver.model';
type AOA = any[][];


@Component({
  selector: 'app-driver-table-content',
  templateUrl: './driver-table-content.component.html',
  styleUrls: ['./driver-table-content.component.scss']
})
export class DriverTableContentComponent implements OnInit, AfterViewInit {

   user: any;
   isLoadingResults = true;
  displayedColumns1: string[] = ['mois', 'driver', 'nbColisLivree', 'nbClientsLivree', 'coutPrestation', 'avance', 'gasoil', 'chargesFixe', 'reste', 'action'];
  displayedColumns2: string[] = ['mois', 'driver', 'nbColisLivree', 'nbClientsLivree', 'coutPrestation', 'avance', 'gasoil', 'chargesFixe', 'reste', 'action'];
  @ViewChild('pag1') paginator1: MatPaginator;
  @ViewChild('pag2') paginator2: MatPaginator;
  dataSourceFiltred = new MatTableDataSource<DriversTable>([]);
  dataSource: DriversTable[] = [];
  dataSourceFiltred2 = new MatTableDataSource<DriversTable>([]);
  dataSource2: DriversTable[] = [];
  Listdriverauto = [];
  Listdriver = [];
  affectedDriver: any;
  affectedDriverNgModel = '';
  dateDebut: Date;
  dateFin: Date;
  @ViewChild('button1') button1: ElementRef<HTMLElement>;
   tripsFromExcelTemp: AOA;
   tripsFromExcel: AOA;
  constructor(private driversTableService: DriversTableService, private driverService: DriversService, private tservice: TripService) { }
  ngAfterViewInit() {
    this.isLoadingResults = true;
    this.getDriversTable();
  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')).data[0];
    this.getAllDrivers();
  }
  getDriversTable() {
    this.driversTableService.getDriversTabele().subscribe(res => {
      this.isLoadingResults = false;
      this.dataSourceFiltred = new MatTableDataSource<DriversTable>(res.body.filter(value => !!value.driver.soutraitant && value.driver.soutraitant ));
      this.dataSourceFiltred.paginator = this.paginator1;
      this.dataSourceFiltred2 = new MatTableDataSource<DriversTable>(res.body.filter(value => !value.driver.soutraitant));
      this.dataSourceFiltred2.paginator = this.paginator1;
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
  getSelectedDriver1(driver: any) {
    if (driver != null) {
      const ind = this.Listdriverauto.indexOf(driver.title);
      this.affectedDriver = this.Listdriver[ind];
      this.driverService.getOneDriver(this.affectedDriver.idDriver).subscribe((oneDriver) => {
        this.dataSourceFiltred = new MatTableDataSource<DriversTable>(this.dataSource.filter(value => value.driver.idDriver === oneDriver.json().idDriver));
        this.dataSourceFiltred.paginator = this.paginator1;
      });
    } else {
      this.dataSourceFiltred = new MatTableDataSource<DriversTable>(this.dataSource);
      this.dataSourceFiltred.paginator = this.paginator1;
    }
  }
  getSelectedDriver2(driver: any) {
    if (driver != null) {
      const ind = this.Listdriverauto.indexOf(driver.title);
      this.affectedDriver = this.Listdriver[ind];
      this.driverService.getOneDriver(this.affectedDriver.idDriver).subscribe((oneDriver) => {
        this.dataSourceFiltred2 = new MatTableDataSource<DriversTable>(this.dataSource2.filter(value => value.driver.idDriver === oneDriver.json().idDriver));
        this.dataSourceFiltred2.paginator = this.paginator2;
      });
    } else {
      this.dataSourceFiltred2 = new MatTableDataSource<DriversTable>(this.dataSource2);
      this.dataSourceFiltred2.paginator = this.paginator2;
    }
  }
  addEventDateDebutActivityDriver1(input: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateDebut = $event.value;
    if (!$event.value) {
      this.dataSourceFiltred = new MatTableDataSource<DriversTable>(this.dataSource);
      this.dataSourceFiltred.paginator = this.paginator1;
    } else {
      this.dataSourceFiltred = new MatTableDataSource<DriversTable>(this.dataSource.slice().filter((item) => {
        if (!!this.dateFin){
          if (item.mois >= this.dateDebut && item.mois <= this.dateFin) {
            return true;
          } else {
            return false;
          }
        } else {
          if (item.mois >= this.dateDebut) {
            return true;
          } else {
            return false;
          }
        }
      } ));
      this.dataSourceFiltred.paginator = this.paginator1;
    }
  }

  addEventDateDebutActivityDriver2(input: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateDebut = $event.value;
    if (!$event.value) {
      this.dataSourceFiltred2 = new MatTableDataSource<DriversTable>(this.dataSource2);
      this.dataSourceFiltred2.paginator = this.paginator2;
    } else {
      this.dataSourceFiltred2 = new MatTableDataSource<DriversTable>(this.dataSource2.slice().filter((item) => {
        if (!!this.dateFin){
          if (item.mois >= this.dateDebut && item.mois <= this.dateFin) {
            return true;
          } else {
            return false;
          }
        } else {
          if (item.mois >= this.dateDebut) {
            return true;
          } else {
            return false;
          }
        }
      } ));
      this.dataSourceFiltred.paginator = this.paginator2;
    }
  }
  addEventDateFinActivityDriver1(change: string, $event: MatDatepickerInputEvent<Date>) {
    this.dateFin = $event.value;
    if (!$event.value) {
      this.dataSourceFiltred = new MatTableDataSource<StatActivityDriver>(this.dataSource);
      this.dataSourceFiltred.paginator = this.paginator1;
    } else {
      this.dataSourceFiltred = new MatTableDataSource<StatActivityDriver>(this.dataSource.slice().filter((item) => {
        if (!!this.dateDebut){
          if (item.mois >= this.dateDebut && item.mois <= this.dateFin) {
            return true;
          } else {
            return false;
          }
        } else {
          if (item.mois <= this.dateFin) {
            return true;
          } else {
            return false;
          }
        }
      } ));
      this.dataSourceFiltred.paginator = this.paginator1;
    }
  }
  addEventDateFinActivityDriver2(change: string, $event: MatDatepickerInputEvent<Date>) {

    this.dateFin = $event.value;
    if (!$event.value) {
      this.dataSourceFiltred2 = new MatTableDataSource<StatActivityDriver>(this.dataSource2);
      this.dataSourceFiltred2.paginator = this.paginator2;
    } else {
      this.dataSourceFiltred2 = new MatTableDataSource<StatActivityDriver>(this.dataSource2.slice().filter((item) => {
        if (!!this.dateDebut){
          if (item.mois >= this.dateDebut && item.mois <= this.dateFin) {
            return true;
          } else {
            return false;
          }
        } else {
          if (item.mois <= this.dateFin) {
            return true;
          } else {
            return false;
          }
        }
      } ));
      this.dataSourceFiltred2.paginator = this.paginator2;
    }
  }

  generateExcelReportActivityDriver(listRapport: DriversTable[]) {

  }

  applyFilter() {
    this.driversTableService.getDriversTabeleByDate({fromDate: this.dateDebut, toDate: this.dateFin}).subscribe(res => {
      this.isLoadingResults = false;
      this.dataSourceFiltred = new MatTableDataSource<DriversTable>(res.body.filter(value => !!value.driver.soutraitant && value.driver.soutraitant ));
      this.dataSourceFiltred.paginator = this.paginator1;
      this.dataSourceFiltred2 = new MatTableDataSource<DriversTable>(res.body.filter(value => !value.driver.soutraitant));
      this.dataSourceFiltred2.paginator = this.paginator1;
    });
  }

  openDialog(element: any) {

  }
}
