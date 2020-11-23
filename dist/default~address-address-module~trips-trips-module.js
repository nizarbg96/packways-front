(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~address-address-module~trips-trips-module"],{

/***/ "./src/app/layout/trips/Trip.ts":
/*!**************************************!*\
  !*** ./src/app/layout/trips/Trip.ts ***!
  \**************************************/
/*! exports provided: Trip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Trip", function() { return Trip; });
var Trip = /** @class */ (function () {
    function Trip() {
    }
    return Trip;
}());



/***/ }),

/***/ "./src/app/layout/trips/trips.service.ts":
/*!***********************************************!*\
  !*** ./src/app/layout/trips/trips.service.ts ***!
  \***********************************************/
/*! exports provided: TripService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TripService", function() { return TripService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _Trip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Trip */ "./src/app/layout/trips/Trip.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







_Trip__WEBPACK_IMPORTED_MODULE_5__["Trip"];
var TripService = /** @class */ (function () {
    function TripService(http, httpc, snackBar, spinner) {
        this.http = http;
        this.httpc = httpc;
        this.snackBar = snackBar;
        this.spinner = spinner;
        // url = 'http://147.135.136.78:8052/trip/alls';
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].serverUrl + '/trip';
        this.urlAdd = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].serverUrl + '/trip/add';
        this.urlAddList = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].serverUrl + '/trip/excelAddAll';
        // urltrip = 'http://147.135.136.78:8052/trip/bydate20?date=01/05/2019 2:47:21';
        this.urlUp = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].serverUrl + '/trip/update/';
        this.urlD = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].serverUrl + '/driver';
        this.urlU = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].serverUrl + '/user';
        this.urlA = _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].serverUrl + '/admin';
        this.jwt = JSON.parse(localStorage.getItem('currentUser')).token;
        this.headerOptions = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Authorization': "Bearer " + this.jwt
        });
    }
    /* getTrips() {
      return this.httpc.get<Trip[]>(this.url);
    } */
    TripService.prototype.getFiltredTrips = function (id, date, size, key, btn) {
        // http://147.135.136.78:8052/trip/bykey?id=admin&date=&size=&key=Liv&BTN=
        return this.http.get(this.url + "/bykey?id=" + id + "&date=" + date + "&size=" + size + "&key=" + key + "&BTN=" + btn, { headers: this.headerOptions });
    };
    TripService.prototype.getFiltredTrips1 = function (id, size, d1, d2, key, key1, key2, key3, key4, key5, btn, key6) {
        // http://147.135.136.78:8052/trip/bykey?id=admin&date=&size=&key=Liv&BTN=
        return this.http.get(this.url + "/byCriterea?id=" +
            id + "&size=" + size + "&DD=" + d1 + "&DF=" + d2 +
            "&key=" + key + "&key1=" + key1 + "&key2=" +
            key2 + "&key3=" + key3 + "&key4=" + key4 + "&key5=" + key5 +
            "&BTN=" + btn + "&key6=" + key6, { headers: this.headerOptions });
    };
    TripService.prototype.getTrips = function (id, size) {
        return this.http.get(this.url + "/sansdate2?id=" + id + "&size=" + size, { headers: this.headerOptions });
    };
    TripService.prototype.getBS = function (id, data) {
        return this.http.post(this.url + "/exportpdf/" + id, data, { headers: this.headerOptions });
    };
    TripService.prototype.getBRetour = function (id, data) {
        return this.http.post(this.url + "/exportpdfBretour/" + id, data, { headers: this.headerOptions });
    };
    TripService.prototype.getRC = function (data) {
        return this.http.post(this.url + "/exportpdfreciept/", data, { headers: this.headerOptions });
    };
    TripService.prototype.getRapport = function (data) {
        return this.http.post(this.url + "/exportpdfrapport/", data, { headers: this.headerOptions });
    };
    TripService.prototype.getBL = function (data) {
        return this.http.post(this.url + "/exportpdfBL/", data, { headers: this.headerOptions });
    };
    TripService.prototype.getNoDeletedTripsFromServer = function () {
        return this.http.get(this.url + "/notdeleted", { headers: this.headerOptions });
    };
    TripService.prototype.getTripsFromServerOnNext = function (id, nextDate) {
        return this.http.get(this.url + "/bydate20?id=" + id + "&date=" + nextDate, { headers: this.headerOptions });
    };
    TripService.prototype.getTripsFromServerOnPrevious = function (id, previousDate) {
        return this.http.get(this.url + "/bydate20prec?id=" + id + "&date=" + previousDate, { headers: this.headerOptions });
    };
    // Changement de web service ===> Ajout de flag deletedByUser
    TripService.prototype.getTripsFromServerOnInit = function (id) {
        return this.http.get(this.url + "/sansdate?id=" + id, { headers: this.headerOptions });
        // return this.http.get(`${this.urls}/all`);
    };
    TripService.prototype.AskOfBonLiv = function (id, auth) {
        return this.http.get(this.url + "/generatepdf?id=" + id + "&auth=" + auth, { headers: this.headerOptions });
    };
    TripService.prototype.getTripscanList = function (id) {
        return this.http.get(this.url + "/one/" + id, { headers: this.headerOptions });
    };
    TripService.prototype.updateTrip = function (tripdata, id) {
        return this.http.put(this.url + '/update/' + id, tripdata, { headers: this.headerOptions });
    };
    TripService.prototype.getDrivers = function () {
        return this.http.get(this.urlD + "/alls", { headers: this.headerOptions });
    };
    TripService.prototype.getUsers = function () {
        return this.http.get(this.urlU + "/actives", { headers: this.headerOptions });
    };
    TripService.prototype.getAdmins = function () {
        return this.http.get(this.urlA + "/all", { headers: this.headerOptions });
    };
    TripService.prototype.deleteTrip = function (idtrip, status) {
        var auth = localStorage.getItem('auth');
        console.log('suscéés', auth);
        var date = new Date();
        var tripdata;
        if (auth === 'admin') {
            tripdata = {
                deleted: true
            };
        }
        else {
            tripdata = {
                deletedbyUser: true,
                datecanceledUser: date
            };
        }
        this.http.put(this.urlUp + idtrip, tripdata, { headers: this.headerOptions }).subscribe(function (data) {
        }, function (error) {
        });
    };
    TripService.prototype.addTrip = function (nameUser, emailUser, rateUser, idUser, nbrateUser, nbrdeliveryUser, mobileUser, surnameUser, latsrc, lngsrc, contactAdrsrc, mobileAdrsrc, contactAdrdes, mobileAdrdes, mobileAdrdes2, updateday, createdby, updateby, createdday, latdes, lngdes, timingTrip, costTrip, typePackage, valPackage, weightPackage, sizePackage, modeTrip, refTrip, statusTrip, cityAdrS, cityAdrD, imgPack, descPack, selectedDriver, labelAdrS, labelAdrD, gouvernorat, delegation, zipCode, adresse) {
        var _this = this;
        var codeTrip = Math.floor((Math.random() * 100000) + 1);
        if (codeTrip < 10000) {
            codeTrip = codeTrip + 10000;
        }
        console.log('finaldest----', cityAdrD);
        var deliverydata = {
            codeTrip: codeTrip,
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
                adresse: adresse,
                zipCode: zipCode,
                ville: delegation
            },
            timingTrip: timingTrip,
            updateday: updateday,
            packageTrip: {
                typePackage: typePackage,
                valPackage: valPackage,
                weightPackage: weightPackage,
                sizePackage: sizePackage,
                imgPackage: imgPack
            },
            createdby: createdby,
            updateby: updateby,
            createdday: createdday,
            refTrip: refTrip,
            costTrip: costTrip,
            statusTrip: statusTrip,
            deletedbyUser: false,
            deletedbyDriver: false,
            noticeTrip: [],
            modeTrip: modeTrip,
            descriptionTrip: descPack,
            msgTrip: [],
            selectedDriverTrip: selectedDriver
        };
        this.spinner.show();
        this.http.post(this.urlAdd, deliverydata, { headers: this.headerOptions }).subscribe(function (data) {
            console.log('Ok', data['_body']);
            _this.spinner.hide();
            window.location.reload();
            _this.snackBar.open('votre colis a été ajouté avec succés', 'Fermer', {
                duration: 12000,
            });
        }, function (error) {
            _this.snackBar.open('Erreur de postulation', 'Fermer', {
                duration: 12000,
            });
        });
    };
    TripService.prototype.addTripFromExcel = function (nameUser, emailUser, rateUser, idUser, nbrateUser, nbrdeliveryUser, mobileUser, surnameUser, latsrc, lngsrc, contactAdrsrc, mobileAdrsrc, contactAdrdes, mobileAdrdes, mobileAdrdes2, updateday, createdby, updateby, createdday, latdes, lngdes, timingTrip, costTrip, typePackage, valPackage, weightPackage, sizePackage, modeTrip, refTrip, statusTrip, cityAdrS, cityAdrD, imgPack, descPack, selectedDriver, labelAdrS, labelAdrD) {
        var codeTrip = Math.floor((Math.random() * 100000) + 1);
        if (codeTrip < 10000) {
            codeTrip = codeTrip + 10000;
        }
        // console.log(codeTrip)
        var deliverydata = {
            codeTrip: codeTrip,
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
                imgPackage: imgPack
            },
            createdby: createdby,
            updateby: updateby,
            createdday: createdday,
            refTrip: refTrip,
            costTrip: costTrip,
            statusTrip: statusTrip,
            deletedbyUser: false,
            deletedbyDriver: false,
            noticeTrip: [],
            modeTrip: modeTrip,
            descriptionTrip: descPack,
            msgTrip: [],
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
    };
    TripService.prototype.addListTripsFromExel = function (listTrip) {
        var _this = this;
        this.spinner.show();
        this.http.post(this.urlAddList, listTrip, { headers: this.headerOptions }).subscribe(function (data) {
            console.log('Ok', data['_body']);
            _this.spinner.hide();
            // window.location.reload();
            _this.snackBar.open('vos colis ont été ajouté avec succés', 'Fermer', {
                duration: 12000,
            });
            window.location.reload();
        }, function (error) {
            _this.snackBar.open('Erreur de postulation', 'Fermer', {
                duration: 12000,
            });
        });
    };
    TripService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]])
    ], TripService);
    return TripService;
}());



/***/ })

}]);
//# sourceMappingURL=default~address-address-module~trips-trips-module.js.map