(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["statlivreur-statlivreur-module"],{

/***/ "./src/app/layout/statlivreur/statlivreur-routing.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/layout/statlivreur/statlivreur-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: StatlivreurRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatlivreurRoutingModule", function() { return StatlivreurRoutingModule; });
/* harmony import */ var _statlivreur_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statlivreur.component */ "./src/app/layout/statlivreur/statlivreur.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _statlivreur_component__WEBPACK_IMPORTED_MODULE_0__["StatlivreurComponent"]
    }
];
var StatlivreurRoutingModule = /** @class */ (function () {
    function StatlivreurRoutingModule() {
    }
    StatlivreurRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], StatlivreurRoutingModule);
    return StatlivreurRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/statlivreur/statlivreur.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/statlivreur/statlivreur.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n        <div class=\"col-xl-3 col-lg-3\" *ngFor=\"let obj of jsonObj\">\n           <!-- <app-stat [bgClass]=\"'warning'\" [icon]=\"'fa-plus-square'\" [count]=\"postes\" [label]=\"'Colis postés.'\" ></app-stat> -->\n            <app-statdriver [bgClass]=\"'info'\" [icon]=\"'fa fa-car'\" [count]=\"obj\"  ></app-statdriver> <br>\n        </div>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/statlivreur/statlivreur.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/layout/statlivreur/statlivreur.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zdGF0bGl2cmV1ci9zdGF0bGl2cmV1ci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/statlivreur/statlivreur.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/statlivreur/statlivreur.component.ts ***!
  \*************************************************************/
/*! exports provided: StatlivreurComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatlivreurComponent", function() { return StatlivreurComponent; });
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StatlivreurComponent = /** @class */ (function () {
    function StatlivreurComponent(http) {
        this.http = http;
        this.url = 'http://147.135.136.78:8052/trip/statbydriver';
    }
    StatlivreurComponent.prototype.ngOnInit = function () {
        this.getStatLivreur();
    };
    StatlivreurComponent.prototype.getStatLivreur = function () {
        var _this = this;
        return this.http.get(this.url).subscribe(function (data) {
            var result = data['_body'];
            var jo = JSON.parse(result);
            var obj = Array.of(jo.data);
            _this.jsonObj = obj[0];
            console.log(_this.jsonObj);
        });
    };
    StatlivreurComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-statlivreur',
            template: __webpack_require__(/*! ./statlivreur.component.html */ "./src/app/layout/statlivreur/statlivreur.component.html"),
            styles: [__webpack_require__(/*! ./statlivreur.component.scss */ "./src/app/layout/statlivreur/statlivreur.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_0__["Http"]])
    ], StatlivreurComponent);
    return StatlivreurComponent;
}());



/***/ }),

/***/ "./src/app/layout/statlivreur/statlivreur.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/layout/statlivreur/statlivreur.module.ts ***!
  \**********************************************************/
/*! exports provided: StatlivreurModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatlivreurModule", function() { return StatlivreurModule; });
/* harmony import */ var _statlivreur_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statlivreur-routing.module */ "./src/app/layout/statlivreur/statlivreur-routing.module.ts");
/* harmony import */ var _statlivreur_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statlivreur.component */ "./src/app/layout/statlivreur/statlivreur.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-6-datatable */ "./node_modules/angular-6-datatable/index.js");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(angular_6_datatable__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_qrcode2__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-qrcode2 */ "./node_modules/ngx-qrcode2/index.js");
/* harmony import */ var ngx_toggle_switch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-toggle-switch */ "./node_modules/ngx-toggle-switch/ui-switch.es5.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ng2_completer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng2-completer */ "./node_modules/ng2-completer/esm5/ng2-completer.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var StatlivreurModule = /** @class */ (function () {
    function StatlivreurModule() {
    }
    StatlivreurModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_statlivreur_component__WEBPACK_IMPORTED_MODULE_1__["StatlivreurComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _statlivreur_routing_module__WEBPACK_IMPORTED_MODULE_0__["StatlivreurRoutingModule"], _shared__WEBPACK_IMPORTED_MODULE_4__["PageHeaderModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"], _angular_http__WEBPACK_IMPORTED_MODULE_6__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], angular_6_datatable__WEBPACK_IMPORTED_MODULE_8__["DataTableModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"], ngx_qrcode2__WEBPACK_IMPORTED_MODULE_11__["NgxQRCodeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatFormFieldModule"], ngx_toggle_switch__WEBPACK_IMPORTED_MODULE_12__["UiSwitchModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_13__["NgxSpinnerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"], ng2_completer__WEBPACK_IMPORTED_MODULE_14__["Ng2CompleterModule"], _shared__WEBPACK_IMPORTED_MODULE_4__["StatDriverModule"]
            ]
        })
    ], StatlivreurModule);
    return StatlivreurModule;
}());



/***/ })

}]);
//# sourceMappingURL=statlivreur-statlivreur-module.js.map