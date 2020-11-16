
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Trip } from './Trip';
import {environment} from '../../../environments/environment';
Trip;


@Injectable()
export class TripService {
  constructor(public http: Http, private httpc: HttpClient , private snackBar: MatSnackBar, private spinner: NgxSpinnerService) { }
  // url = 'http://147.135.136.78:8052/trip/alls';
  url = environment.serverUrl + '/trip';
  urlAdd = environment.serverUrl + '/trip/add';
  urlAddList = environment.serverUrl + '/trip/excelAddAll';
  // urltrip = 'http://147.135.136.78:8052/trip/bydate20?date=01/05/2019 2:47:21';
  urlUp = environment.serverUrl + '/trip/update/';

  urlD = environment.serverUrl + '/driver';
  urlU = environment.serverUrl + '/user';
  urlA = environment.serverUrl + '/admin';
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });


  /* getTrips() {
    return this.httpc.get<Trip[]>(this.url);
  } */

  getFiltredTrips(id, date, size, key, btn): Observable<any> {
    // http://147.135.136.78:8052/trip/bykey?id=admin&date=&size=&key=Liv&BTN=
    return this.http.get(`${this.url}/bykey?id=` + id + `&date=` + date + `&size=` + size + `&key=` + key + `&BTN=` + btn, {headers: this.headerOptions});
  }

  getFiltredTrips1(id, size, d1, d2, key, key1, key2, key3, key4, key5, btn, key6): Observable<any> {
    // http://147.135.136.78:8052/trip/bykey?id=admin&date=&size=&key=Liv&BTN=
    return this.http.get(`${this.url}/byCriterea?id=` +
      id + `&size=` + size + `&DD=` + d1 + `&DF=` + d2 +
      `&key=` + key + `&key1=` + key1 + `&key2=` +
      key2 + `&key3=` + key3 + `&key4=` + key4  + `&key5=` + key5 +
      `&BTN=` + btn  + `&key6=` + key6, {headers: this.headerOptions});
  }

  getTrips(id, size): Observable<any> {
    return this.http.get(`${this.url}/sansdate2?id=` + id + `&size=` + size, {headers: this.headerOptions});
  }

  getBS(id, data): Observable<any> {
    return this.http.post(`${this.url}/exportpdf/` + id, data, {headers: this.headerOptions});
  }

  getBRetour(id, data): Observable<any> {
    return this.http.post(`${this.url}/exportpdfBretour/` + id, data, {headers: this.headerOptions});
  }

  getRC(data): Observable<any> {
    return this.http.post(`${this.url}/exportpdfreciept/`, data, {headers: this.headerOptions});
  }
  getRapport(data): Observable<any> {
    return this.http.post(`${this.url}/exportpdfrapport/`, data, {headers: this.headerOptions});
  }

  getBL(data): Observable<any> {
    return this.http.post(`${this.url}/exportpdfBL/`, data, {headers: this.headerOptions});
  }
  getNoDeletedTripsFromServer(): Observable<any> {
    return this.http.get(`${this.url}/notdeleted`, {headers: this.headerOptions});
  }

  getTripsFromServerOnNext(id, nextDate): Observable<any> {
    return this.http.get(`${this.url}/bydate20?id=` + id + `&date=` + nextDate, {headers: this.headerOptions});
  }

  getTripsFromServerOnPrevious(id, previousDate): Observable<any> {
    return this.http.get(`${this.url}/bydate20prec?id=` + id + `&date=` + previousDate, {headers: this.headerOptions});
  }

  // Changement de web service ===> Ajout de flag deletedByUser
  getTripsFromServerOnInit(id): Observable<any> {
    return this.http.get(`${this.url}/sansdate?id=` + id, {headers: this.headerOptions});
    // return this.http.get(`${this.urls}/all`);
  }

  AskOfBonLiv(id, auth): Observable<any> {
    return this.http.get(`${this.url}/generatepdf?id=` + id + `&auth=` + auth, {headers: this.headerOptions});
  }

  getTripscanList(id) {
    return this.http.get(`${this.url}/one/` + id, {headers: this.headerOptions} );
  }

  updateTrip(tripdata, id) {
    return this.http.put(this.url + '/update/' + id, tripdata, {headers: this.headerOptions});
  }

  getDrivers() {
    return this.http.get(`${this.urlD}/alls`, {headers: this.headerOptions});
  }

  getUsers() {
    return this.http.get(`${this.urlU}/actives`, {headers: this.headerOptions});
  }

  getAdmins() {
    return this.http.get(`${this.urlA}/all`, {headers: this.headerOptions});
  }

  deleteTrip(idtrip, status) {
    const auth = localStorage.getItem('auth');
    console.log('suscéés', auth);

    const date = new Date();
    let tripdata: any;
    if (auth === 'admin') {
      tripdata = {
        deleted: true
      };
    } else {
        tripdata = {
          deletedbyUser: true,
          datecanceledUser: date
        };
    }
    this.http.put(this.urlUp + idtrip, tripdata, {headers: this.headerOptions}).subscribe(data => {
    }, error => {
    });

}

addTrip (nameUser, emailUser, rateUser, idUser, nbrateUser, nbrdeliveryUser, mobileUser,
   surnameUser, latsrc, lngsrc, contactAdrsrc, mobileAdrsrc, contactAdrdes,
   mobileAdrdes, mobileAdrdes2, updateday, createdby, updateby, createdday, latdes, lngdes,
    timingTrip, costTrip, typePackage, valPackage, weightPackage, sizePackage, modeTrip,
    refTrip, statusTrip, cityAdrS, cityAdrD, imgPack, descPack, selectedDriver, labelAdrS, labelAdrD,
    gouvernorat, delegation, zipCode, adresse) {

  let codeTrip =  Math.floor((Math.random() * 100000) + 1);
  if (codeTrip < 10000) {
    codeTrip = codeTrip + 10000;
  }
   console.log('finaldest----', cityAdrD);


    const deliverydata = {
        codeTrip : codeTrip,
        userTrip: {
          nameUser: nameUser,
          emailUser: emailUser,
          rateUser: rateUser,
          idUser: idUser,
          nbrateUser: nbrateUser,
          nbrdeliveryUser: nbrdeliveryUser,
          mobileUser: mobileUser,
          surnameUser: surnameUser
        },
        sourceTrip: {
          geolocAdr: {
          lat: latsrc,
          lng: lngsrc
          },
          contactAdr: contactAdrsrc,
          mobileAdr: mobileAdrsrc,
          cityAdr: cityAdrS,
          labelAdr: labelAdrS,
        },
        destTrip: {
          geolocAdr: {
          lat: latdes,
          lng: lngdes,
          },
          contactAdr: contactAdrdes,
          mobileAdr: mobileAdrdes,
          cityAdr: cityAdrD,
          labelAdr: labelAdrD,
          mobileAdr2: mobileAdrdes2,
          gouvernorat: gouvernorat,
          adresse : adresse,
          zipCode : zipCode,
          ville : delegation
        },
        timingTrip: timingTrip,
        updateday: updateday,
        packageTrip: {
          typePackage: typePackage,
          valPackage: valPackage,
          weightPackage: weightPackage,
          sizePackage: sizePackage,
          imgPackage: imgPack},
        createdby: createdby,
        updateby: updateby,
        createdday: createdday,
        refTrip: refTrip,
        costTrip: costTrip,
        statusTrip: statusTrip,
        deletedbyUser: false,
        deletedbyDriver: false,
        noticeTrip: [],
        modeTrip : modeTrip,
        descriptionTrip : descPack,
        msgTrip : [],
        selectedDriverTrip: selectedDriver
      };

      this.spinner.show();
      this.http.post(this.urlAdd, deliverydata , {headers: this.headerOptions}).subscribe(data => {
       console.log('Ok', data['_body']);
       this.spinner.hide();
        window.location.reload();
        this.snackBar.open('votre colis a été ajouté avec succés', 'Fermer', {
          duration: 12000,
        });



     }, error => {
      this.snackBar.open('Erreur de postulation', 'Fermer', {
        duration: 12000,
        });
     });
}

addTripFromExcel (nameUser, emailUser, rateUser, idUser, nbrateUser, nbrdeliveryUser, mobileUser,
  surnameUser, latsrc, lngsrc, contactAdrsrc, mobileAdrsrc, contactAdrdes,
  mobileAdrdes, mobileAdrdes2, updateday, createdby, updateby, createdday, latdes, lngdes,
   timingTrip, costTrip, typePackage, valPackage, weightPackage, sizePackage, modeTrip,
   refTrip, statusTrip, cityAdrS, cityAdrD, imgPack, descPack, selectedDriver, labelAdrS, labelAdrD) {

 let codeTrip =  Math.floor((Math.random() * 100000) + 1);
 if (codeTrip < 10000) {
   codeTrip = codeTrip + 10000;
 }
 // console.log(codeTrip)


   const deliverydata = {
       codeTrip : codeTrip,
       userTrip: {
         nameUser: nameUser,
         emailUser: emailUser,
         rateUser: rateUser,
         idUser: idUser,
         nbrateUser: nbrateUser,
         nbrdeliveryUser: nbrdeliveryUser,
         mobileUser: mobileUser,
         surnameUser: surnameUser
       },
       sourceTrip: {
         geolocAdr: {
         lat: latsrc,
         lng: lngsrc
         },
         contactAdr: contactAdrsrc,
         mobileAdr: mobileAdrsrc,
         cityAdr: cityAdrS,
         labelAdr: labelAdrS,
       },
       destTrip: {
         geolocAdr: {
         lat: latdes,
         lng: lngdes,
         },
         contactAdr: contactAdrdes,
         mobileAdr: mobileAdrdes,
         cityAdr: cityAdrD,
         labelAdr: labelAdrD,
         mobileAdr2: mobileAdrdes2
       },
       timingTrip: timingTrip,
       updateday: updateday,
       packageTrip: {
         typePackage: typePackage,
         valPackage: valPackage,
         weightPackage: weightPackage,
         sizePackage: sizePackage,
         imgPackage: imgPack},
       createdby: createdby,
       updateby: updateby,
       createdday: createdday,
       refTrip: refTrip,
       costTrip: costTrip,
       statusTrip: statusTrip,
       deletedbyUser: false,
       deletedbyDriver: false,
       noticeTrip: [],
       modeTrip : modeTrip,
       descriptionTrip : descPack,
       msgTrip : [],
       selectedDriverTrip: selectedDriver
     };

     /*
   this.spinner.show();
    this.http.post(this.urlAdd, deliverydata , {headers: this.headerOptions}).subscribe(data => {
      console.log('Ok', data['_body']);
      this.spinner.hide();
     // window.location.reload();
       this.snackBar.open('votre colis a été ajouté avec succés', 'Fermer', {
         duration: 12000,
         });



    }, error => {
     this.snackBar.open('Erreur de postulation', 'Fermer', {
       duration: 12000,
       });
    });*/
    return deliverydata;
}

  addListTripsFromExel(listTrip) {

    this.spinner.show();

    this.http.post(this.urlAddList, listTrip , {headers: this.headerOptions}).subscribe(data => {
      console.log('Ok', data['_body']);
      this.spinner.hide();
     // window.location.reload();
       this.snackBar.open('vos colis ont été ajouté avec succés', 'Fermer', {
         duration: 12000,
         });

         window.location.reload();
    }, error => {
     this.snackBar.open('Erreur de postulation', 'Fermer', {
       duration: 12000,
       });
    });
  }

}
