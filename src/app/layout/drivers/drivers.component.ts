import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { DriversService } from './drivers.service';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/app/layout/drivers/excel.service';
import { Driver } from 'src/app/layout/drivers/Driver';
import {Car} from '../../model/car.model';
import {CarService} from '../car/car.service';
import {MatListOption, MatSelectionList} from '@angular/material';
import {HttpResponse} from '@angular/common/http';
import {IRunsheet} from '../../model/runsheet.model';
type EntityResponseType = HttpResponse<Driver>;
type EntityArrayResponseType = HttpResponse<IRunsheet[]>;

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  animations: [routerTransition()]

})
export class DriversComponent implements OnInit {

  endDate: any;
  startDate: any;
  obj: any;
  tripsByDriverAndDate = [];
  idDriverTr: string;
  searchTerm: string = '';
  eDate: any;
  sDate: any;
  closeResult: string;
  objDriver = new Driver;
  itemsSearch: any[];
  jsonObj: any;
  result: any;
  items: any[];
  fraixTotal: any;
  valeurTotal: any;
  totalTripGetted: any;
  cars: Car[] = [];
  affectedCars = [];
  @ViewChild(MatSelectionList)
  selectionList: MatSelectionList;
  affectedCarsIds = [];

  constructor(public driverService:DriversService,private modalService: NgbModal,private excelService: ExcelService, private carServices: CarService) { }

  ngOnInit() {
    this.getDrivers();
    this.getCars();
  }

  getDrivers() {
    this.items = [];
    this.driverService.getDriversFromServe().subscribe(data => {
        this.result = data['_body'];

        const jo = JSON.parse(this.result);
        const obj = Array.of(jo.data);
        this.jsonObj = obj[0];
        for (let index = 0; index < this.jsonObj.length; index++) {
            this.items.push(this.jsonObj[index]);
        }
        this.itemsSearch = this.items;
        console.log("test",this.items);
    });
  }
  getCars(){
    this.carServices.query().subscribe((res)=>{
      this.cars = res.body.filter(value => !value.deleted)
    });
  }


  editDriver(driver) {
    this.obj = driver;
    this.objDriver.idDriver= this.obj.idDriver;
    this.objDriver.nameDriver = this.obj.nameDriver;
    this.objDriver.surnameDriver = this.obj.surnameDriver;
    this.objDriver.mobileDriver = this.obj.mobileDriver;
    this.objDriver.emailDriver = this.obj.emailDriver;
    this.objDriver.adressDriver = this.obj.adressDriver;
    this.objDriver.deleted = this.obj.deleted;
    this.objDriver.createdday = this.obj.createdday;
    this.objDriver.createdby = this.obj.createdby;
    this.objDriver.updateby = this.obj.updateby;
    this.objDriver.createdday = this.obj.createdday;
    this.objDriver.login = this.obj.login;
    this.objDriver.password = this.obj.password;
    this.objDriver.imgDriver = this.obj.imgDriver;
    this.objDriver.rateDriver = this.obj.rateDriver;
    this.objDriver.nbrateDriver = this.obj.nbrateDriver;
}

deleteDriver(driver) {
    let driverData = {
        deleted:true
    }
   this.driverService.deleteDriver(driver.idDriver,driverData);
  $('#driver-row-' + driver.idDriver).hide('slow', function() {
      $(this).remove();
  });
}

OnBlock(driver) {
    const driverData = {
        accountActive : false
      };
    this.driverService.BlockDriver(driver.idDriver,driverData);
    // $('#user-tdactif-' + driver.idDriver).val("Inactif");
    window.location.reload();

 }

 OnDeBlock(driver) {
    const driverData = {
        accountActive : true
      };
    this.driverService.BlockDriver(driver.idDriver, driverData);
    // $('#user-tdinactif-' +driver.idDriver).val("Actif");
    window.location.reload();

 }

Update(){
    this.updateDriver(this.objDriver.idDriver,this.objDriver.login,this.objDriver.password,this.objDriver.nameDriver,
                    this.objDriver.surnameDriver,this.objDriver.emailDriver,this.objDriver.mobileDriver,this.objDriver.adressDriver );
                    window.location.reload();

   }
   updateDriver(idDriver,login,password,nameDriver,surnameDriver,emailDriver,mobileDriver,adress){
    let driverData = {
        login:login,
        password:password,
        nameDriver: nameDriver,
        surnameDriver:surnameDriver,
        emailDriver:emailDriver,
        mobileDriver:mobileDriver,
        adressDriver:adress,
        updateday:new Date,
        updateby:idDriver
      }
      console.log("data",driverData)
      this.driverService.updateDriver(driverData,idDriver).subscribe(data => {
        const result = data['_body'];
       }, error => {
        console.log(error); // Error getting the data
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

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openRl(content, driver) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.objDriver = driver;
  }

  changeDateFormatMDY(dd){
    let d = new Date(dd);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let dformat = [month, day, year].join('/');

    return dformat;
  }

  changeDateFormatDMY(dd){
    let d = new Date(dd);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let dformat = [day, month, year].join('/');

    return dformat;
  }

  splitDateFormatMDY(dd) {
    let dformat = '';
    if (dd != null) {
        const d = '' + dd;
        const arr = d.split(" ");
        dformat = arr[1] + ' ' + arr[0] + ' ' + arr[2];
    }
    return dformat;
  }



  generateExcel() {
    // this.spinner.show();
    // this.idDriverTr = 'DT' + this.objDriver.idDriver;
    this.idDriverTr = 'UT5bc8b74fe49706348f84de36'
    this.sDate = this.changeDateFormatMDY(this.startDate);
    this.eDate = this.changeDateFormatMDY(this.endDate);
    this.tripsByDriverAndDate = [];

    this.driverService.getTripsByDriverAndDate(this.idDriverTr, this.sDate, this.eDate).subscribe(data => {
        this.result = data['_body'];

        const jo = JSON.parse(this.result);
        const obj = Array.of(jo.data);
        this.jsonObj = obj[0];
        for (let index = 0; index < this.jsonObj.length; index++) {
            const jTemp = this.jsonObj[index];
            const tab: any = [];
            tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, this.splitDateFormatMDY(jTemp.affectedday),
             this.splitDateFormatMDY(jTemp.livredday), jTemp.packageTrip.valPackage);
            this.tripsByDriverAndDate.push(tab);
        }
    },
    err => {
        console.log(err);
    },
    () => {
        this.excelService.generateExcel(this.tripsByDriverAndDate);
        // this.spinner.hide();
    });

  }

  getListTripByDriverAndDate(content) {
    this.idDriverTr = this.objDriver.idDriver;
    this.sDate = this.changeDateFormatMDY(this.startDate);
    this.eDate = this.changeDateFormatMDY(this.endDate);
    this.tripsByDriverAndDate = [];

    this.driverService.getTripsByDriverAndDate(this.idDriverTr, this.sDate, this.eDate).subscribe(data => {
        this.result = data['_body'];

        const jo = JSON.parse(this.result);
        const obj = Array.of(jo.data);
        this.jsonObj = obj[0];
        for (let index = 0; index < this.jsonObj.length; index++) {
            const jTemp = this.jsonObj[index];
            this.tripsByDriverAndDate.push(jTemp);
        }

        console.log('okiii 111');
        console.log('this.tripsByDriverAndDate', this.tripsByDriverAndDate);
    },
    err => {
        console.log(err);
    },
    () => {
        // this.excelService.generateExcel(this.tripsByDriverAndDate);
        console.log('okiii 222');
        console.log('this.tripsByDriverAndDate2', this.tripsByDriverAndDate);
        this.openGettedListTripModal(content) ;
        console.log('okiii 333');
    });

  }

  openGettedListTripModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    if (this.tripsByDriverAndDate != null) {
        this.fraixTotal = 0;
        this.valeurTotal = 0;
        this.totalTripGetted = this.tripsByDriverAndDate.length;
        for (let i = 0; i < this.tripsByDriverAndDate.length; i++) {
            this.fraixTotal = this.fraixTotal + this.tripsByDriverAndDate[i].costTrip;
            this.valeurTotal = this.valeurTotal + this.tripsByDriverAndDate[i].packageTrip.valPackage;
        }
    }

   }


  filterItems(searchTerm) {

    return this.items.filter((item) => {
        let nomDrier: any; let loginDriver: any; let mobDriver: any; let snomDriver: any; let mailDriver: any; let adrDriver: any; let createdDate: any; let accountStatus: any;

        if (item != null && item.nameDriver != null) {
            nomDrier = item.nameDriver.toString();
        } else {
            nomDrier = ' ';
        }
        if (item != null && item.login != null) {
            loginDriver = item.login.toString();
        } else {
            loginDriver = ' ';
        }
        if (item != null && item.mobileDriver != null) {
            mobDriver = item.mobileDriver.toString();
        } else {
            mobDriver = ' ';
        }
        if (item != null && item.surnameDriver != null) {
            snomDriver = item.surnameDriver.toString();
        } else {
            snomDriver = ' ';
        }
        if (item != null && item.emailDriver != null) {
            mailDriver = item.emailDriver.toString();
        } else {
            mailDriver = ' ';
        }
        if (item != null && item.adressDriver != null) {
            adrDriver = item.adressDriver.toString();
        } else {
            adrDriver = ' ';
        }
        if (item != null && item.createdday != null) {
            createdDate = item.createdday.toString();
        } else {
            createdDate = ' ';
        }
        if (item != null && item.accountActive != null) {
            accountStatus = item.accountActive.toString();
        } else {
            accountStatus = ' ';
        }

        return nomDrier.indexOf(searchTerm) > -1
                || loginDriver.indexOf(searchTerm) > -1
                || mobDriver.indexOf(searchTerm) > -1
                || snomDriver.indexOf(searchTerm) > -1
                || mailDriver.indexOf(searchTerm) > -1
                || adrDriver.indexOf(searchTerm) > -1
                || createdDate.indexOf(searchTerm) > -1
                || accountStatus.indexOf(searchTerm) > -1
                ;

    });

  }

  setFilteredItems() {
      console.log('okiii');

    this.items = [];
    if (this.items !== undefined) {
      this.items = this.itemsSearch;
      this.items = this.filterItems(this.searchTerm);
    }

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


  openAffectCar(affectCar: TemplateRef<any>, driver: any) {
     this.affectedCars = driver.affectedCars;
     this.affectedCarsIds = this.affectedCars.map(value => value.id)
     this.objDriver = driver;
    this.modalService.open(affectCar, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }


  saveCars(objDriver: Driver, carsSelection: MatSelectionList) {
    this.driverService.getOneDriver(objDriver.idDriver).subscribe((res) => {
      objDriver = res.json();
      objDriver.affectedCars = this.cars.slice().filter((car) => this.affectedCarsIds.indexOf(car.id) >= 0);
      this.driverService.updateOneDriver(objDriver).subscribe(() => {
        this.getDrivers();
      });
    });
  }

  onAreaListControlChanged(car_option: MatListOption, car: Car) {
    if(car_option.selected){
      this.affectedCars.push(car);
      this.affectedCarsIds = this.affectedCars.map(value => value.id);
    } else {
      this.affectedCars.splice(this.affectedCars.indexOf(car),1);
      this.affectedCarsIds = this.affectedCars.map(value => value.id);
    }
    console.log(this.affectedCars);
  }
}
