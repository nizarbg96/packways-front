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
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].serverUrl + '/adress';
        this.jwt = JSON.parse(localStorage.getItem('currentUser')).token;
        this.headerOptions = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Authorization': "Bearer " + this.jwt
        });
    }
    AdresseService.prototype.getAdressByUser = function (id) {
        return this.http.get(this.url + "/byuser?id=" + id, { headers: this.headerOptions });
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
        this.http.post(this.url + '/add', adressdata, { headers: this.headerOptions }).subscribe(function (data) {
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
        this.http.put(this.url + '/update/' + idAdr, adrdata, { headers: this.headerOptions }).subscribe(function (data) {
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

/***/ "./src/app/layout/users/users.service.ts":
/*!***********************************************!*\
  !*** ./src/app/layout/users/users.service.ts ***!
  \***********************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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


var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].serverUrl + '/user/';
        this.urlTrip = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].serverUrl + '/trip/';
        this.jwt = JSON.parse(localStorage.getItem('currentUser')).token;
        this.headerOptions = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Authorization': "Bearer " + this.jwt
        });
    }
    UserService.prototype.getUsersFromServe = function (key1, key2) {
        return this.http.get(this.url + "/bykey?keyExp=" + key1 + '&keyDes=' + key2, { headers: this.headerOptions });
    };
    UserService.prototype.deleteUser = function (idUser, userdata) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        this.http.put(this.url + 'update/' + idUser, userdata, { headers: this.headerOptions }).subscribe(function (data) {
            console.log('User deleted');
        }, function (error) {
        });
    };
    UserService.prototype.BlockUser = function (idUser, userdata) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        this.http.put(this.url + 'update/' + idUser, userdata, { headers: this.headerOptions }).subscribe(function (data) {
            console.log('User Blocked');
        }, function (error) {
        });
    };
    UserService.prototype.gettripLivree = function (id) {
        var _this = this;
        this.http.get(this.urlTrip + "byuser?id=" + id + "&statustrip=Livree", { headers: this.headerOptions }).subscribe(function (data) {
            _this.result = data['_body'];
            // console.log(data['_body'])
            var jo = JSON.parse(_this.result);
            var obj = Array.of(jo.data);
        });
    };
    UserService.prototype.getTripsByUserAndDate = function (idUser, sDate, eDate) {
        return this.http.get(this.urlTrip + "bydate/" + idUser + "?d1=" + sDate + "&d2=" + eDate, { headers: this.headerOptions });
    };
    UserService.prototype.updateUser = function (userdata, id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + '/update/' + id, userdata, { headers: this.headerOptions });
        console.log('updated suscess');
    };
    UserService.prototype.getActiveUsers = function () {
        return this.http.get(this.url + 'actives/', { headers: this.headerOptions });
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], UserService);
    return UserService;
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
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
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
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].serverUrl + '/user/signin';
        this.urlA = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].serverUrl + '/admin/signin';
    }
    LoginService.prototype.loginUser = function (login, password) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('cache-control', 'no-cache');
        return this.http.post(this.url, { login: login, password: password }, { headers: headers });
    };
    LoginService.prototype.loginAdmin = function (email, password) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('cache-control', 'no-cache');
        return this.http.post(this.urlA, { login: email, password: password }, { headers: headers });
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