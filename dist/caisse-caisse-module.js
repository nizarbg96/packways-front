(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["caisse-caisse-module"],{

/***/ "./src/app/layout/caisse/caisse-routing.module.ts":
/*!********************************************************!*\
  !*** ./src/app/layout/caisse/caisse-routing.module.ts ***!
  \********************************************************/
/*! exports provided: CaisseRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaisseRoutingModule", function() { return CaisseRoutingModule; });
/* harmony import */ var _caisse_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caisse.component */ "./src/app/layout/caisse/caisse.component.ts");
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
        path: '', component: _caisse_component__WEBPACK_IMPORTED_MODULE_0__["CaisseComponent"]
    }
];
var CaisseRoutingModule = /** @class */ (function () {
    function CaisseRoutingModule() {
    }
    CaisseRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], CaisseRoutingModule);
    return CaisseRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/caisse/caisse.component.html":
/*!*****************************************************!*\
  !*** ./src/app/layout/caisse/caisse.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@routerTransition]>\n  <app-page-header [heading]=\"'Gestion de caisse'\" [icon]=\"'fa-table'\"></app-page-header>\n \n  <div class=\"row\">\n      <div class=\"col-xl-12 text-xs-center\">\n        <div class=\"row\">\n            <div class=\"col-xl-4 text-xs-center\">\n                <fieldset class=\"scheduler-border-1\">\n                    <legend class=\"scheduler-border-1\"><h2><b>Caisse Totale:</b></h2></legend>\n                    <h4><b>{{sommeVal}}</b></h4>\n                </fieldset>\n            </div>\n            <div class=\"col-xl-4 text-xs-center\">\n                <fieldset class=\"scheduler-border-1\">\n                    <legend class=\"scheduler-border-1\"><h2><b>Caisse des Clients:</b></h2></legend>\n                    <h4><b>{{somme}}</b></h4>\n                </fieldset>\n            </div>\n            <div class=\"col-xl-4 text-xs-center\">\n                <fieldset class=\"scheduler-border-1\">\n                    <legend class=\"scheduler-border-1\"><h2><b>Caisse Packways:</b></h2></legend>\n                    <h4><b>{{sommeCout}}</b></h4>\n                </fieldset>\n            </div>\n      </div>\n    </div>\n        <div class=\"col col-xl-12 col-lg-12\">\n          <div class=\"card mb-3\">\n            <div class=\"card-header\">\n              <div class=\"row\"> \n                    <div class=\"col-xl-9 text-xs-center\">\n                        <form class=\"form-inline my-2 my-lg-0\">\n                            <input class=\"form-control mr-sm-4\" type=\"text\" id=\"myInput\" placeholder=\"Chercher\" [(ngModel)]=\"searchTerm\" [ngModelOptions]=\"{standalone: true}\" (input)=\"setFilteredItems()\">\n                        </form>\n                    </div>\n                    <div align=\"right\" class=\"col-xl-3 text-xs-center\">\n                        <button align=\"right\" type=\"button\" class=\"btn btn-info\" (click)=\"open(content)\">Détails par client</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n      <div class=\"card-body table-responsive\">                                                     \n          <table class=\"table\" [mfData]=\"items\" #mf=\"mfDataTable\"  id=\"myTable\">\n                  <thead>\n                          <tr>\n                                  \n                                  <th style=\"width:2%\">REF</th>\n                                  <th style=\"width:10%\">Source</th>\n                                  <th style=\"width:10%\">Déstination</th>\n                                  <th style=\"width:10%\"><mfDefaultSorter by=\"statusTrip\">Status</mfDefaultSorter></th>\n                                  <th style=\"width:6%\"><mfDefaultSorter by=\"userTrip.nameUser\">Expéditeur</mfDefaultSorter></th>\n                                  <th style=\"width:10%\">Date d'encaissement</th>\n                                  <th style=\"width:2%\">Frais</th>\n                                  <th style=\"width:3%\">Prix</th>\n                                  <th style=\"width:4%\">E.financier</th>\n                                  <th style=\"width:3%\">Tentatives</th>\n                                  \n                          </tr>\n                  </thead>\n                  \n                  <tbody>\n                          <tr *ngFor=\"let trip of items\" >\n                                  <td >{{trip.refTrip}}</td>\n                                  <td>{{trip.sourceTrip.cityAdr}}</td>\n                                  <td>{{trip.destTrip.cityAdr}}</td>\n                                  <td>{{trip.statusTrip}}</td>\n                                  <td>{{ trip.userTrip.nameUser }}</td>\n                                  <td>{{changeDateFormat(trip.recoltdate)}}</td>\n                                  <td>{{ trip.costTrip }}</td>\n                                  <td>{{ trip.packageTrip.valPackage }}</td>\n                                  <td>{{ showFinancialStatus(trip) }}</td>\n                                  <td >{{ trip.nbTentative }}</td>\n                                  \n                          </tr>\n                  </tbody>\n          </table>\n  </div>\n</div>\n\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n        <div class=\"modal-body\">\n                <div class=\"row justify-content-center\">\n                        <h2 style=\"color:rgb(23, 6, 175)\"><b><u>Caisse par Client</u></b></h2>\n                </div> \n        </div>\n        <div class=\"card-body table-responsive\">                                                     \n                <table class=\"table\" [mfData]=\"items1\" #mf=\"mfDataTable\"  id=\"myTable\">\n                        <thead>\n                                <tr>\n                                        <th style=\"width:3%\">Client</th>\n                                        <th style=\"width:4%\">Nombre des colis récoltés</th>\n                                        <th style=\"width:3%\">Somme Totale</th>\n                                        <th style=\"width:3%\">Caisse Client</th>\n                                        <th style=\"width:3%\">Caisse Packways</th>\n                                        \n                                </tr>\n                        </thead>\n                        <tbody>\n                                <tr *ngFor=\"let colis of items1\" >\n                                        <td>{{ colis[0] }}</td>\n                                        <td>{{ colis[1]}}</td>\n                                        <td >{{ colis[2] }}</td>\n                                        <td >{{ colis[3] }}</td>\n                                        <td >{{ colis[4] }}</td>\n                                        \n                                </tr>\n                        </tbody>\n                </table>\n            </div>\n        <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-danger\" (click)=\"(c('Close click'))\">Fermer</button> \n        </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/layout/caisse/caisse.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/layout/caisse/caisse.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".html2canvas-container {\n  width: 3000px !important;\n  height: 3000px !important; }\n\nfieldset.scheduler-border {\n  border: 1px groove #ddd !important;\n  padding: 0 1.4em 1.4em 1.4em !important;\n  margin: 0 0 1.5em 0 !important;\n  box-shadow: 0px 0px 0px 0px #000; }\n\nlegend.scheduler-border {\n  font-size: 1.2em !important;\n  font-weight: bold !important;\n  text-align: left !important;\n  width: auto;\n  padding: 0 10px;\n  border-bottom: none; }\n\nfieldset.scheduler-border-1 {\n  border: 1px groove #ddd !important;\n  padding: 0 0.3em 0.3em 0.3em !important;\n  margin: 0 0 0.2em 0 !important;\n  box-shadow: 0px 0px 0px 0px #000; }\n\nlegend.scheduler-border-1 {\n  font-size: 1.0em !important;\n  font-weight: bold !important;\n  text-align: left !important;\n  width: auto;\n  padding: 0 1px;\n  border-bottom: none; }\n\na {\n  text-decoration: none;\n  display: inline-block;\n  padding: 8px 16px; }\n\na:hover {\n  background-color: #ddd;\n  color: black; }\n\n.previous {\n  background-color: #f1f1f1;\n  color: black; }\n\n.next {\n  background-color: #4CAF50;\n  color: white; }\n\n.round {\n  border-radius: 50%; }\n\n.example-container {\n  display: flex;\n  flex-direction: column;\n  min-width: 300px; }\n\n.example-header {\n  min-height: 64px;\n  padding: 8px 24px 0; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.mat-table {\n  overflow: auto;\n  max-height: 500px; }\n\n.spinner {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n\n.table-borderless-cus > tbody > tr > td,\n.table-borderless-cus > tbody > tr > th,\n.table-borderless-cus > tfoot > tr > td,\n.table-borderless-cus > tfoot > tr > th,\n.table-borderless-cus > thead > tr > td,\n.table-borderless-cus > thead > tr > th {\n  border: none; }\n\ninput[type=\"file\"] {\n  display: none; }\n\n.custom-file-upload {\n  border: 1px solid black;\n  display: inline-block;\n  padding: 6px 12px;\n  cursor: pointer; }\n\n.custom-sub-menu {\n  padding: 0;\n  border: 1px solid black;\n  max-height: 4.5em;\n  overflow-y: auto; }\n\n.custom-sub-menu li {\n  font-size: 1em;\n  padding: .25em 1em;\n  line-height: 1em; }\n\n.custom-sub-menu li:hover {\n  background: #f1f1f1; }\n\n.form-control:focus {\n  outline: 0 !important;\n  border-color: initial;\n  box-shadow: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NhaXNzZS9EOlxcTmV3UGFja3dheXNXZWJcXGRvdHdheXMvc3JjXFxhcHBcXGxheW91dFxcY2Fpc3NlXFxjYWlzc2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFBeUIseUJBQXdCO0VBQUUsMEJBQXlCLEVBQUk7O0FBRWxGO0VBQ0ksbUNBQWtDO0VBQ2xDLHdDQUF1QztFQUN2QywrQkFBOEI7RUFFdEIsaUNBQWlDLEVBQzVDOztBQUVEO0VBQ0ksNEJBQTJCO0VBQzNCLDZCQUE0QjtFQUM1Qiw0QkFBMkI7RUFDM0IsWUFBVTtFQUNWLGdCQUFjO0VBQ2Qsb0JBQWtCLEVBQ3JCOztBQUVEO0VBQ0UsbUNBQWtDO0VBQ2xDLHdDQUF1QztFQUN2QywrQkFBOEI7RUFFdEIsaUNBQWlDLEVBQzFDOztBQUVEO0VBQ0UsNEJBQTJCO0VBQzNCLDZCQUE0QjtFQUM1Qiw0QkFBMkI7RUFDM0IsWUFBVTtFQUNWLGVBQWE7RUFDYixvQkFBa0IsRUFDbkI7O0FBRUQ7RUFDSSxzQkFBcUI7RUFDckIsc0JBQXFCO0VBQ3JCLGtCQUFpQixFQUNsQjs7QUFFRDtFQUNFLHVCQUFzQjtFQUN0QixhQUFZLEVBQ2I7O0FBRUQ7RUFDRSwwQkFBeUI7RUFDekIsYUFBWSxFQUNiOztBQUVEO0VBQ0UsMEJBQXlCO0VBQ3pCLGFBQVksRUFDYjs7QUFFRDtFQUNFLG1CQUFrQixFQUNuQjs7QUFFRDtFQUNFLGNBQWE7RUFDYix1QkFBc0I7RUFDdEIsaUJBQWdCLEVBQ2pCOztBQUVEO0VBQ0UsaUJBQWdCO0VBQ2hCLG9CQUFtQixFQUNwQjs7QUFFRDtFQUNFLGdCQUFlO0VBQ2YsWUFBVyxFQUNaOztBQUVEO0VBQ0UsZUFBYztFQUNkLGtCQUFpQixFQUNsQjs7QUFFRDtFQUNBLGdCQUFlO0VBQ2YsT0FBTTtFQUNOLFVBQVM7RUFDVCxRQUFPO0VBQ1AsU0FBUTtFQUNSLGVBQWMsRUFDZjs7QUFFRDs7Ozs7O0VBTUksYUFBWSxFQUNmOztBQUVEO0VBQ0UsY0FBYSxFQUNkOztBQUNEO0VBQ0Usd0JBQThCO0VBQzlCLHNCQUFxQjtFQUNyQixrQkFBaUI7RUFDakIsZ0JBQWUsRUFDaEI7O0FBRUQ7RUFDRSxXQUFVO0VBQ1Ysd0JBQXVCO0VBQ3ZCLGtCQUFpQjtFQUNqQixpQkFBZ0IsRUFDakI7O0FBRUQ7RUFDRSxlQUFjO0VBQ2QsbUJBQWtCO0VBQ2xCLGlCQUFnQixFQUNqQjs7QUFFRDtFQUNFLG9CQUFtQixFQUNwQjs7QUFFRDtFQUNFLHNCQUFxQjtFQUNyQixzQkFBcUI7RUFDckIsaUJBQWdCLEVBQ2pCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2NhaXNzZS9jYWlzc2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAuaHRtbDJjYW52YXMtY29udGFpbmVyIHsgd2lkdGg6IDMwMDBweCAhaW1wb3J0YW50OyBoZWlnaHQ6IDMwMDBweCAhaW1wb3J0YW50OyB9XHJcblxyXG5maWVsZHNldC5zY2hlZHVsZXItYm9yZGVyIHtcclxuICAgIGJvcmRlcjogMXB4IGdyb292ZSAjZGRkICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAwIDEuNGVtIDEuNGVtIDEuNGVtICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW46IDAgMCAxLjVlbSAwICFpbXBvcnRhbnQ7XHJcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6ICAwcHggMHB4IDBweCAwcHggIzAwMDtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzogIDBweCAwcHggMHB4IDBweCAjMDAwO1xyXG59XHJcblxyXG5sZWdlbmQuc2NoZWR1bGVyLWJvcmRlciB7XHJcbiAgICBmb250LXNpemU6IDEuMmVtICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50O1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6YXV0bztcclxuICAgIHBhZGRpbmc6MCAxMHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTpub25lO1xyXG59XHJcblxyXG5maWVsZHNldC5zY2hlZHVsZXItYm9yZGVyLTEge1xyXG4gIGJvcmRlcjogMXB4IGdyb292ZSAjZGRkICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogMCAwLjNlbSAwLjNlbSAwLjNlbSAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbjogMCAwIDAuMmVtIDAgIWltcG9ydGFudDtcclxuICAtd2Via2l0LWJveC1zaGFkb3c6ICAwcHggMHB4IDBweCAwcHggIzAwMDtcclxuICAgICAgICAgIGJveC1zaGFkb3c6ICAwcHggMHB4IDBweCAwcHggIzAwMDtcclxufVxyXG5cclxubGVnZW5kLnNjaGVkdWxlci1ib3JkZXItMSB7XHJcbiAgZm9udC1zaXplOiAxLjBlbSAhaW1wb3J0YW50O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkICFpbXBvcnRhbnQ7XHJcbiAgdGV4dC1hbGlnbjogbGVmdCAhaW1wb3J0YW50O1xyXG4gIHdpZHRoOmF1dG87XHJcbiAgcGFkZGluZzowIDFweDtcclxuICBib3JkZXItYm90dG9tOm5vbmU7XHJcbn1cclxuXHJcbmEge1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcGFkZGluZzogOHB4IDE2cHg7XHJcbiAgfVxyXG4gIFxyXG4gIGE6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICB9XHJcbiAgXHJcbiAgLnByZXZpb3VzIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgfVxyXG4gIFxyXG4gIC5uZXh0IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgfVxyXG4gIFxyXG4gIC5yb3VuZCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgfVxyXG5cclxuICAuZXhhbXBsZS1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBtaW4td2lkdGg6IDMwMHB4O1xyXG4gIH1cclxuICBcclxuICAuZXhhbXBsZS1oZWFkZXIge1xyXG4gICAgbWluLWhlaWdodDogNjRweDtcclxuICAgIHBhZGRpbmc6IDhweCAyNHB4IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgXHJcbiAgLm1hdC10YWJsZSB7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuICAgIG1heC1oZWlnaHQ6IDUwMHB4O1xyXG4gIH1cclxuXHJcbiAgLnNwaW5uZXIge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi50YWJsZS1ib3JkZXJsZXNzLWN1cyA+IHRib2R5ID4gdHIgPiB0ZCxcclxuLnRhYmxlLWJvcmRlcmxlc3MtY3VzID4gdGJvZHkgPiB0ciA+IHRoLFxyXG4udGFibGUtYm9yZGVybGVzcy1jdXMgPiB0Zm9vdCA+IHRyID4gdGQsXHJcbi50YWJsZS1ib3JkZXJsZXNzLWN1cyA+IHRmb290ID4gdHIgPiB0aCxcclxuLnRhYmxlLWJvcmRlcmxlc3MtY3VzID4gdGhlYWQgPiB0ciA+IHRkLFxyXG4udGFibGUtYm9yZGVybGVzcy1jdXMgPiB0aGVhZCA+IHRyID4gdGgge1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiZmlsZVwiXSB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uY3VzdG9tLWZpbGUtdXBsb2FkIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCk7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHBhZGRpbmc6IDZweCAxMnB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmN1c3RvbS1zdWItbWVudSB7XHJcbiAgcGFkZGluZzogMDtcclxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICBtYXgtaGVpZ2h0OiA0LjVlbTtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcblxyXG4uY3VzdG9tLXN1Yi1tZW51IGxpIHtcclxuICBmb250LXNpemU6IDFlbTtcclxuICBwYWRkaW5nOiAuMjVlbSAxZW07XHJcbiAgbGluZS1oZWlnaHQ6IDFlbTtcclxufVxyXG5cclxuLmN1c3RvbS1zdWItbWVudSBsaTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZDogI2YxZjFmMTtcclxufVxyXG5cclxuLmZvcm0tY29udHJvbDpmb2N1cyB7XHJcbiAgb3V0bGluZTogMCAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1jb2xvcjogaW5pdGlhbDtcclxuICBib3gtc2hhZG93OiBub25lO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/layout/caisse/caisse.component.ts":
/*!***************************************************!*\
  !*** ./src/app/layout/caisse/caisse.component.ts ***!
  \***************************************************/
/*! exports provided: CaisseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaisseComponent", function() { return CaisseComponent; });
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CaisseComponent = /** @class */ (function () {
    function CaisseComponent(http, modalService) {
        this.http = http;
        this.modalService = modalService;
        this.items1 = [];
        this.items = [];
        this.url = 'http://147.135.136.78:8052/trip/bykey1?id=admin&size=300&DD=&DF=&key=&key1=&key2=&key3=&key4=Récolté&key5=&BTN=';
        this.url2 = 'http://147.135.136.78:8052/trip/recolterparclient';
    }
    CaisseComponent.prototype.ngOnInit = function () {
        this.GetCaisse();
        this.getTripsRecolterParClient();
    };
    CaisseComponent.prototype.GetCaisse = function () {
        var _this = this;
        this.items = [];
        this.sommeVal = 0;
        this.sommeCout = 0;
        this.somme = 0;
        return this.http.get(this.url).subscribe(function (data) {
            var result = data['_body'];
            var jo = JSON.parse(result);
            var obj = Array.of(jo.data);
            _this.jsonObj = obj[0];
            for (var index = 0; index < _this.jsonObj.length; index++) {
                _this.items.push(_this.jsonObj[index]);
                if (_this.jsonObj[index].statusTrip === 'Livree') {
                    _this.sommeVal += _this.jsonObj[index].packageTrip.valPackage;
                    _this.sommeCout += _this.jsonObj[index].costTrip;
                }
                else {
                    if (_this.jsonObj[index].isBilled === true) {
                        _this.sommeCout += _this.jsonObj[index].costTrip;
                    }
                }
            }
            _this.somme = _this.sommeVal - _this.sommeCout;
            _this.itemsSearch = _this.items;
            console.log("test", _this.items);
            console.log('cout : ', _this.sommeCout);
            console.log('Valeur : ', _this.somme);
            console.log('somme : ', _this.sommeVal);
        });
    };
    CaisseComponent.prototype.changeDateFormat = function (dd) {
        var d = new Date(dd);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var hour = d.getHours();
        var min = d.getMinutes();
        // var sec = d.getSeconds();
        var dformat = [day, month, year].join('/') + ' ' + [hour, min].join(':');
        return dformat;
    };
    CaisseComponent.prototype.showFinancialStatus = function (trip) {
        var financialStatus = '';
        if (trip.paymentStatus) {
            if (trip.paymentStatus === 'Payee') {
                financialStatus = 'Payé';
            }
            else if (trip.paymentStatus === 'En cours de payement') {
                financialStatus = 'En cours de paiement';
            }
            else if (trip.paymentStatus === 'En cours de retour') {
                financialStatus = 'En cours de retour';
            }
            else if (trip.paymentStatus === 'Retournee') {
                financialStatus = 'Retournee';
            }
        }
        else if (trip.argentRecolte) {
            financialStatus = 'Récolté';
        }
        return financialStatus;
    };
    CaisseComponent.prototype.filterItems = function (searchTerm) {
        var _this = this;
        return this.items.filter(function (item) {
            var ref;
            var nomuser;
            var nomdriver;
            var status;
            var recolteDate;
            if (item != null && item.refTrip != null) {
                ref = item.refTrip.toString();
            }
            else {
                ref = ' ';
            }
            if (item != null && item.userTrip.nameUser != null) {
                nomuser = item.userTrip.nameUser.toString();
            }
            else {
                nomuser = ' ';
            } /*
            if (item != null && item.driverTrip.nameDriver != null) {
              nomdriver = item.driverTrip.nameDriver.toString();
            } else {
              nomdriver = ' ';
            }*/
            if (item != null && item.statusTrip != null) {
                status = item.statusTrip.toString();
            }
            else {
                status = ' ';
            }
            if (item != null && item.recoltdate != null) {
                recolteDate = _this.changeDateFormat(item.recoltdate).toString();
            }
            else {
                recolteDate = ' ';
            }
            //console.log("recoooot",this.changeDateFormat(item.recoltdate))
            return ref.indexOf(searchTerm) > -1
                || nomuser.indexOf(searchTerm) > -1
                || recolteDate.indexOf(searchTerm) > -1
                || status.indexOf(searchTerm) > -1;
        });
    };
    CaisseComponent.prototype.setFilteredItems = function () {
        console.log('okiii');
        this.items = [];
        if (this.items !== undefined) {
            this.items = this.itemsSearch;
            this.items = this.filterItems(this.searchTerm);
        }
    };
    CaisseComponent.prototype.getTripsRecolterParClient = function () {
        var _this = this;
        return this.http.get(this.url2).subscribe(function (data) {
            var result = data['_body'];
            var jo = JSON.parse(result);
            var obj = Array.of(jo.data);
            _this.Obj = obj[0];
            for (var index = 0; index < _this.Obj.length; index++) {
                _this.items1.push(_this.Obj[index]);
            }
        });
    };
    CaisseComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    CaisseComponent.prototype.getDismissReason = function (reason) {
        if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    CaisseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-caisse',
            template: __webpack_require__(/*! ./caisse.component.html */ "./src/app/layout/caisse/caisse.component.html"),
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
            styles: [__webpack_require__(/*! ./caisse.component.scss */ "./src/app/layout/caisse/caisse.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_0__["Http"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"]])
    ], CaisseComponent);
    return CaisseComponent;
}());



/***/ }),

/***/ "./src/app/layout/caisse/caisse.module.ts":
/*!************************************************!*\
  !*** ./src/app/layout/caisse/caisse.module.ts ***!
  \************************************************/
/*! exports provided: CaisseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaisseModule", function() { return CaisseModule; });
/* harmony import */ var _caisse_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caisse.component */ "./src/app/layout/caisse/caisse.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _caisse_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./caisse-routing.module */ "./src/app/layout/caisse/caisse-routing.module.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ngx_qrcode2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-qrcode2 */ "./node_modules/ngx-qrcode2/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular-6-datatable */ "./node_modules/angular-6-datatable/index.js");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(angular_6_datatable__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toggle_switch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-toggle-switch */ "./node_modules/ngx-toggle-switch/ui-switch.es5.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ng2_completer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng2-completer */ "./node_modules/ng2-completer/esm5/ng2-completer.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var CaisseModule = /** @class */ (function () {
    function CaisseModule() {
    }
    CaisseModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_caisse_component__WEBPACK_IMPORTED_MODULE_0__["CaisseComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _caisse_routing_module__WEBPACK_IMPORTED_MODULE_3__["CaisseRoutingModule"], _shared__WEBPACK_IMPORTED_MODULE_4__["PageHeaderModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"], _angular_http__WEBPACK_IMPORTED_MODULE_6__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"], angular_6_datatable__WEBPACK_IMPORTED_MODULE_10__["DataTableModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatCardModule"], ngx_qrcode2__WEBPACK_IMPORTED_MODULE_7__["NgxQRCodeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatFormFieldModule"], ngx_toggle_switch__WEBPACK_IMPORTED_MODULE_12__["UiSwitchModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_13__["NgxSpinnerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatSnackBarModule"], ng2_completer__WEBPACK_IMPORTED_MODULE_14__["Ng2CompleterModule"]
            ]
        })
    ], CaisseModule);
    return CaisseModule;
}());



/***/ }),

/***/ "./src/app/router.animations.ts":
/*!**************************************!*\
  !*** ./src/app/router.animations.ts ***!
  \**************************************/
/*! exports provided: routerTransition, noTransition, slideToRight, slideToLeft, slideToBottom, slideToTop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routerTransition", function() { return routerTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noTransition", function() { return noTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToRight", function() { return slideToRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToLeft", function() { return slideToLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToBottom", function() { return slideToBottom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToTop", function() { return slideToTop; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");

function routerTransition() {
    return noTransition();
}
function noTransition() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', []);
}
function slideToRight() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(100%)' }))
        ])
    ]);
}
function slideToLeft() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(100%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }))
        ])
    ]);
}
function slideToBottom() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(-100%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(0%)' }))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(0%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(100%)' }))
        ])
    ]);
}
function slideToTop() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(100%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(0%)' }))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(0%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(-100%)' }))
        ])
    ]);
}


/***/ })

}]);
//# sourceMappingURL=caisse-caisse-module.js.map