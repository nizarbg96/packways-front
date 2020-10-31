(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/layout/adresses/adresses.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/layout/adresses/adresses.service.ts ***!
  \*****************************************************/
/*! exports provided: AdresseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdresseService", function() { return AdresseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { HttpClient } from '@angular/common/http';

var AdresseService = /** @class */ (function () {
    function AdresseService(http) {
        this.http = http;
        this.url = 'http://147.135.136.78:8052/adress';
    }
    AdresseService.prototype.getAdressByUser = function (id) {
        return this.http.get(this.url + "/byuser?id=" + id);
    };
    AdresseService.prototype.addadress = function (latpos, lngpos, createdby, updateby, labelAdr, contactAdr, mobileAdr, typeAdr, sharedtoAdr, userAdr, cityAdr, imgAdr) {
        var date = new Date();
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        var adressdata = {
            geolocAdr: {
                lat: latpos,
                lng: lngpos
            },
            updateday: date,
            createdby: createdby,
            updateby: updateby,
            createdday: date,
            contactAdr: contactAdr,
            labelAdr: labelAdr,
            mobileAdr: mobileAdr,
            typeAdr: typeAdr,
            sharedtoAdr: sharedtoAdr,
            userAdr: userAdr,
            cityAdr: cityAdr,
            imgAdr: imgAdr,
            deletedbyUser: false
        };
        this.http.post(this.url + '/add', adressdata, options).subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error); // Error getting the data
        });
    };
    AdresseService.prototype.getAdresses = function () {
        var jsonObjAdr = null;
        var itemsAdr = [];
        var result;
        this.auth = localStorage.getItem('auth');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.auth === 'admin') {
            this.id = 'Admin';
        }
        else {
            this.id = this.currentUser.data[0].idUser;
        }
        this.getAdressByUser(this.id).subscribe(function (data) {
            result = data['_body'];
            var jo = JSON.parse(result);
            var obj = Array.of(jo.data);
            jsonObjAdr = obj[0];
            for (var index = 0; index < jsonObjAdr.length; index++) {
                itemsAdr.push(jsonObjAdr[index]);
            }
        });
        return itemsAdr;
    };
    AdresseService.prototype.getAdressesForUser = function (id) {
        var jsonObjAdr = null;
        var itemsAdr = [];
        var result;
        this.getAdressByUser(id).subscribe(function (data) {
            result = data['_body'];
            var jo = JSON.parse(result);
            var obj = Array.of(jo.data);
            jsonObjAdr = obj[0];
            for (var index = 0; index < jsonObjAdr.length; index++) {
                itemsAdr.push(jsonObjAdr[index]);
            }
        });
        return itemsAdr;
    };
    AdresseService.prototype.deleteAdr = function (idAdr) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        var adrdata = {
            deletedbyUser: true
        };
        this.http.put(this.url + '/update/' + idAdr, adrdata, options).subscribe(function (data) {
            console.log('Adresse deleted');
        }, function (error) {
        });
    };
    AdresseService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], AdresseService);
    return AdresseService;
}());



/***/ }),

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

/***/ "./src/app/login/login.service.ts":
/*!****************************************!*\
  !*** ./src/app/login/login.service.ts ***!
  \****************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { HttpClient } from '@angular/common/http';

var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
        this.url = 'http://147.135.136.78:8052/user/';
        this.urlA = 'http://147.135.136.78:8052/admin/';
    }
    LoginService.prototype.loginUser = function (login, password) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('cache-control', 'no-cache');
        return this.http.post(this.url + 'signin?login=' + login + '&password=' + password, { headers: headers });
    };
    LoginService.prototype.loginAdmin = function (email, password) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('cache-control', 'no-cache');
        return this.http.post(this.urlA + 'signin?email=' + email + '&password=' + password, { headers: headers });
    };
    LoginService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], LoginService);
    return LoginService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map