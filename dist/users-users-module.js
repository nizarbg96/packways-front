(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-users-module"],{

/***/ "./src/app/layout/users/User.ts":
/*!**************************************!*\
  !*** ./src/app/layout/users/User.ts ***!
  \**************************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());



/***/ }),

/***/ "./src/app/layout/users/excel.service.ts":
/*!***********************************************!*\
  !*** ./src/app/layout/users/excel.service.ts ***!
  \***********************************************/
/*! exports provided: ExcelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelService", function() { return ExcelService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! exceljs */ "./node_modules/exceljs/dist/exceljs.min.js");
/* harmony import */ var exceljs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(exceljs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _packwayslogo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./packwayslogo.js */ "./src/app/layout/users/packwayslogo.js");
/* harmony import */ var _revomonlogo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./revomonlogo.js */ "./src/app/layout/users/revomonlogo.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import * as Excel from 'exceljs/dist/exceljs.min.js';
// import * as ExcelProper from 'exceljs';
var ExcelService = /** @class */ (function () {
    function ExcelService() {
        this.dataclient = [];
    }
    ExcelService.prototype.generateExcel = function (tripsData, nameuser, startDate, endDate, montantNet) {
        // Excel Title, Header, Data
        var title = 'Rapport de livraison de client: ' + nameuser;
        var header = ['REF', 'Status', 'Frais', 'Ville de destination', 'Postulation', 'Livraison', 'Montant'];
        this.data = tripsData;
        // Create workbook and worksheet
        // const workbook: ExcelProper.Workbook = new Excel.Workbook();
        var workbook = new exceljs__WEBPACK_IMPORTED_MODULE_1__["Workbook"]();
        var worksheet = workbook.addWorksheet('Rapport de livraison');
        // Add Image
        var logo = workbook.addImage({
            base64: _packwayslogo_js__WEBPACK_IMPORTED_MODULE_3__["logoBase64"],
            extension: 'png',
        });
        var logoRevomon = workbook.addImage({
            base64: _revomonlogo_js__WEBPACK_IMPORTED_MODULE_4__["logoRevomonBase64"],
            extension: 'png',
        });
        worksheet.mergeCells('B1:B3');
        worksheet.addImage(logo, 'B1:B3');
        // worksheet.addRow([]);
        // Add Row and formatting
        var titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
        // worksheet.addRow([]);
        worksheet.addRow(['Du: ' + startDate + ' Au: ' + endDate]);
        var subTitleRow = worksheet.addRow(['Date de génération: ' + Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(new Date(), 'd MMM yyyy HH:mm', 'en')]);
        //worksheet.mergeCells('G1:G3');
        //worksheet.addImage(logoRevomon, 'G1:G3');
        // worksheet.mergeCells('A4:G4');
        worksheet.mergeCells('A4:I4');
        worksheet.mergeCells('A5:I5');
        // Blank Row
        worksheet.addRow([]);
        // Add Header Row
        var headerRow = worksheet.addRow(header);
        // Cell Style : Fill and Border
        headerRow.eachCell(function (cell, number) {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFF00' },
                bgColor: { argb: 'FF0000FF' }
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        this.data.forEach(function (d) {
            var row = worksheet.addRow(d);
            row.alignment = { vertical: 'middle', horizontal: 'center' };
            var qty = row.getCell(2);
            var color = 'FF99FF99';
            if (qty.value !== 'Livree') {
                color = 'FF9999';
            }
            if (qty.value === '') {
                color = 'FFFFFF';
                row.font = { name: 'Comic Sans MS', family: 4, size: 11, underline: 'none', bold: true };
            }
            qty.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: color }
            };
        });
        worksheet.getColumn(2).width = 17;
        worksheet.getColumn(3).width = 6;
        worksheet.getColumn(4).width = 47;
        worksheet.getColumn(5).width = 15;
        worksheet.getColumn(6).width = 15;
        worksheet.getColumn(7).width = 15;
        worksheet.getColumn(4).alignment = { vertical: 'middle', horizontal: 'left' };
        worksheet.getRow(4).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center' };
        // worksheet.addRow([]);
        // worksheet.addRow([]);
        // worksheet.addRow([]);
        // Footer Row
        var footerRow = worksheet.addRow(['Montant net: ' + montantNet]);
        footerRow.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'none', bold: true };
        footerRow.alignment = { vertical: 'middle', horizontal: 'right' };
        footerRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFCCFFE5' }
        };
        footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // Merge Cells
        worksheet.mergeCells("A" + footerRow.number + ":I" + footerRow.number);
        var nameReport = 'RapportDeLivraisonDe_' + nameuser + '.xlsx'; // .xlsx
        // tslint:disable-next-line:no-shadowed-variable
        workbook.xlsx.writeBuffer().then(function (buff) {
            // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"](blob, nameReport);
        });
    };
    ExcelService.prototype.generatePackwaysExcelReport = function (users) {
        // Excel Title, Header, Data
        var title = 'Listes des clients de PACKWAYS';
        var header = ['Nom et Prenom', 'Tél', 'Email', 'Adresse'];
        for (var i = 0; i < users.length; i++) {
            var tab = [];
            tab.push(users[i].nameUser + users[i].surnameUser, users[i].mobileUser, users[i].emailUser, users[i].adressUser);
            this.dataclient.push(tab);
        }
        // Create workbook and worksheet
        // const workbook: ExcelProper.Workbook = new Excel.Workbook();
        var workbook = new exceljs__WEBPACK_IMPORTED_MODULE_1__["Workbook"]();
        var worksheet = workbook.addWorksheet('');
        // Add Header Row
        var headerRow = worksheet.addRow(header);
        worksheet.getColumn(1).width = 30;
        worksheet.getColumn(3).width = 50;
        worksheet.getColumn(4).width = 30;
        // Cell Style : Fill and Border
        headerRow.eachCell(function (cell, number) {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFF00' },
                bgColor: { argb: 'FF0000FF' }
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        this.dataclient.forEach(function (d) {
            var row = worksheet.addRow(d);
            row.alignment = { vertical: 'middle', horizontal: 'center' };
        });
        var d = new Date();
        //worksheet.getColumn(5).alignment = {vertical: 'middle', horizontal: 'left'};
        worksheet.getRow(4).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center' };
        var nameReport = 'Repport-Listesclients' + '' + '.xlsx'; // .xlsx
        // tslint:disable-next-line:no-shadowed-variable
        workbook.xlsx.writeBuffer().then(function (buff) {
            // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"](blob, nameReport);
        });
    };
    ExcelService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ExcelService);
    return ExcelService;
}());



/***/ }),

/***/ "./src/app/layout/users/packwayslogo.js":
/*!**********************************************!*\
  !*** ./src/app/layout/users/packwayslogo.js ***!
  \**********************************************/
/*! exports provided: logoBase64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logoBase64", function() { return logoBase64; });
var logoBase64 = "data:image/png;base64,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";
//# sourceMappingURL=packwayslogo.js.map

/***/ }),

/***/ "./src/app/layout/users/revomonlogo.js":
/*!*********************************************!*\
  !*** ./src/app/layout/users/revomonlogo.js ***!
  \*********************************************/
/*! exports provided: logoRevomonBase64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logoRevomonBase64", function() { return logoRevomonBase64; });
var logoRevomonBase64 = "data:image/png;base64,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";
//# sourceMappingURL=revomonlogo.js.map

/***/ }),

/***/ "./src/app/layout/users/users-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/users/users-routing.module.ts ***!
  \******************************************************/
/*! exports provided: UsersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersRoutingModule", function() { return UsersRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.component */ "./src/app/layout/users/users.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _users_component__WEBPACK_IMPORTED_MODULE_2__["UsersComponent"]
    }
];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/users/users.component.html":
/*!***************************************************!*\
  !*** ./src/app/layout/users/users.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@routerTransition]>\n        <app-page-header [heading]=\"'Gestion des utilisateurs'\" [icon]=\"'fa-users'\"></app-page-header>\n        <div class=\"row\">\n            <!-- &nbsp;&nbsp;&nbsp;&nbsp;\n            <h3>Gestion des utilisateurs</h3> -->\n            <div class=\"col col-xl-12 col-lg-12\">\n                <div class=\"card mb-3\">\n                    <div class=\"card-header\">\n                        <div class=\"row\">\n                            <div class=\"col-xl-3 text-xs-center\">\n                                <form class=\"form-inline my-2 my-lg-0\">\n                                    <input class=\"form-control mr-sm-2\" type=\"text\" id=\"myInput\" placeholder=\"Chercher\" [(ngModel)]=\"searchTerm\" [ngModelOptions]=\"{standalone: true}\" (input)=\"setFilteredItems()\">\n                                </form>\n                            </div>\n                            <div class=\"col-xl-3 text-xs-center\">\n                                <form>\n                                    <input type=\"checkbox\" name=\"Expéditeur\" [(ngModel)]=\"keyExp\" (change)=\"test()\" > Expéditeur\n                                    <input type=\"checkbox\" name=\"Déstinataire\" [(ngModel)]=\"keyDes\" (change)=\"test()\"> Déstinataire \n                                </form>\n                            </div>\n                            <div class=\"col-xl-3 text-xs-center\">\n                                    <div class=\"row\">\n                                        <div class=\"col-xl-6 text-xs-center\">\n                                        </div>\n                                        <div class=\"col-xl-6 text-xs-center\">\n                                            <button align=\"right\" type=\"button\" class=\"btn btn-info\" style=\"width: 100%;\" (click)=\"generateRapportClient()\">Exporter</button>\n                                        </div>\n                                    </div>\n        \n                            </div>\n                            <div class=\"col-xl-3 text-xs-center\">\n                                <div class=\"row\">\n                                    <div class=\"col-xl-6 text-xs-center\">\n                                    </div>\n                                    <div class=\"col-xl-6 text-xs-center\" hidden>\n                                        <button align=\"right\" type=\"button\" class=\"btn btn-info\" style=\"width: 50%;\" (click)=\"open(content3)\">Ajout</button>\n                                    </div>\n                                </div>\n    \n                            </div>\n                        </div>\n    \n                    </div>\n    \n                    <div class=\"card-body table-responsive\">\n                        <table class=\"table\" [mfData]=\"items.reverse()\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"10\">\n                            <thead>\n                                <tr>\n                                    <!-- <th style=\"width:1%\">#</th> -->\n                                    <th style=\"width:10%\">Nom et prènom</th>\n                                    <th style=\"width:10%\">Email</th>\n                                    <th style=\"width:10%\">Etat du compte</th>\n                                    <th style=\"width:10%\" hidden>Evaluation</th>\n                                    <th style=\"width:10%\">Date de création</th>\n                                    <th style=\"width:10%\">Non Sté</th>\n                                    <th style=\"width:10%\">MF</th>\n                                    <th style=\"width:10%\">Code Parenage</th>\n                                    <th style=\"width:10%\">Actions</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr *ngFor=\"let user of mf.data\"  id=\"user-row-{{user.idUser}}\" >\n                                    <!-- <td scope=\"row\"><input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\"></td> -->\n                                    <td>{{user.nameUser}} {{user.surnameUser}}</td>\n                                    <td>{{user.emailUser}}</td>\n                                    <td *ngIf=\"user.accountActive==true\" id=\"user-tdactif-{{user.idUser}}\">Actif</td>\n                                    <td *ngIf=\"user.accountActive==false\" id=\"user-tdinactif-{{user.idUser}}\">Inactif</td>\n                                    <td hidden>{{user.rateUser / user.nbrateUser}}</td>\n                                    <td>{{changeDateFormat(user.createdday)}}</td>\n                                    <td>{{user.steUser}}</td>\n                                    <td>{{user.mfUser}}</td>\n                                    <td>{{user.codeParenage}}</td>\n                                    <td>\n                                        <button type=\"button\" class=\"mat-mini-fab\" (click)=\"open(content)\">\n                                                <i class=\"material-icons\" (click)=\"editUser(user)\"> create </i>\n                                        </button>\n                                        <button type=\"button\" class=\"mat-mini-fab\">\n                                                <i class=\"material-icons\" (click)=\"openRl(contentdelete, user)\"> delete </i>\n                                        </button>\n                                        <button type=\"button\" class=\"mat-mini-fab\" (click)=\"open(content2)\" hidden>\n                                                <i class=\"material-icons\" (click)=\"editUser(user)\"> open_in_new </i>\n                                        </button>\n                                        <button type=\"button\" class=\"mat-mini-fab\" title=\"Rapport de livraison\" (click)=\"openRl(content5, user)\">\n                                                <i class=\"material-icons\"> chrome_reader_mode </i>\n                                        </button>\n                                        <button mat-icon-button=\"\" type=\"button\" class=\"mat-icon-button\" *ngIf=\"user.accountActive==true\" (click)=\"openRl(contentBlock, user)\">\n                                            <i class=\"material-icons\" style=\"color:green\"> block </i>\n                                        </button>\n                                        <button mat-icon-button=\"\" type=\"button\" class=\"mat-icon-button\" *ngIf=\"user.accountActive==false\" (click)=\"openRl(contentBlock, user)\" >\n                                            <i class=\"material-icons\" style=\"color:red\"> block </i>\n                                        </button>\n                                    </td>\n    \n                                </tr>\n                            </tbody>\n                            <tfoot>\n                                <tr>\n                                    <td colspan=\"4\">\n                                        <mfBootstrapPaginator [rowsOnPageSet]=\"[]\"></mfBootstrapPaginator>\n                                    </td>\n                                </tr>\n                            </tfoot>\n                        </table>\n                        <ngx-spinner bdColor = \"rgba(255,255,255,0.8)\" size = \"large\" color = \"#000000\" type = \"ball-square-clockwise-spin\"></ngx-spinner>\n\n                        <div class=\"row\" hidden>\n                            <div class=\"col-md-12\">\n                                <div class=\"text-center\">\n                                    <div>\n                                        <div id=\"gmap\" #gmap>\n                                        </div>\n                                        <div id=\"locator1\"></div>\n                                    </div>\n                                </div>\n                            </div>\n                            <br>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n</div>\n    \n    <ng-template #content let-c=\"close\" let-d=\"dismiss\">\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title\">Edit de l'utilisateur:&nbsp; {{objUser.nameUser}} {{objUser.surnameUser}}</h4>\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n                  <span aria-hidden=\"true\">&times;</span>\n              </button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <div class=\"col-xl-6 text-xs-center\">\n                    <div class=\"form-group\">\n                        <label for=\"inputNomUser\">Nom</label>\n                        <input type=\"text\" class=\"form-control\" id=\"inputNomUser\" [(ngModel)]=\"objUser.nameUser\" name=\"inputNomUser\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"inputCityUser\">Prènom</label>\n                        <input type=\"text\" class=\"form-control\" id=\"inputPrenomUser\" [(ngModel)]=\"objUser.surnameUser\" name=\"inputPrernomUser\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"inputContactUser\">Telephone</label>\n                        <input type=\"tel\" class=\"form-control\" id=\"inputTeltUser\" [(ngModel)]=\"objUser.mobileUser\" name=\"inputTeltUser\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"inputTelUser\">Email</label>\n                        <input type=\"email\" class=\"form-control\" id=\"inputEmailUser\" [(ngModel)]=\"objUser.emailUser\" name=\"inputEmailUser\">\n                    </div>\n                    <div class=\"form-group\">\n                            <label for=\"inputAdressUser\">Adresse</label>\n                            <input type=\"text\" class=\"form-control\" id=\"inputAdressUser\" [(ngModel)]=\"objUser.adressUser\" name=\"inputAdressUser\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"inputnomSte\">Nom Sté</label>\n                        <input type=\"text\" class=\"form-control\" id=\"inputnomSte\" [(ngModel)]=\"objUser.steUser\" name=\"inputnomSte\">\n                    </div>\n                    <div class=\"form-group\">\n                            <label for=\"inputAdressUser\">MF</label>\n                            <input type=\"text\" class=\"form-control\" id=\"inputmf\" [(ngModel)]=\"objUser.mfUser\" name=\"inputmf\">\n                    </div>\n                    <div class=\"form-group\">\n                            <label for=\"inputparenage\">Code Parrainage</label>\n                            <input type=\"text\" class=\"form-control\" id=\"inputParenage\" [(ngModel)]=\"objUser.codeParenage\" name=\"inputcodeParenage\" *ngIf=\"disable\" disabled>\n                            <input type=\"text\" class=\"form-control\" id=\"inputParenage\" [(ngModel)]=\"objUser.codeParenage\" name=\"inputcodeParenage\" *ngIf=\"! disable\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"inputcout\">Coût Livraison</label>\n                        <input type=\"text\" class=\"form-control\" id=\"inputcout\" [(ngModel)]=\"objUser.cout\" name=\"inputcout\">\n                    </div>\n                </div>\n                <div class=\"col-xl-6 text-xs-center\">\n                    <div class=\"form-group\">\n                        <label for=\"inputTypeUser\">Login</label>\n                        <input type=\"text\" class=\"form-control\" id=\"inputLoginUser\" [(ngModel)]=\"objUser.login\" name=\"inputLoginUser\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"inputSharedUser\">Mot de passe</label>\n                        <input type=\"password\" class=\"form-control\" id=\"inputPassUser\" [(ngModel)]=\"objUser.password\" name=\"inputPassUser\">\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"c('Close click')\">Fermer</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"Update()\">Sauvegarder</button>\n        </div>\n    </ng-template>\n    \n    \n    <ng-template #content3 let-c=\"close\" let-d=\"dismiss\">\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title\">Ajout d'un nouveau utilisateur</h4>\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n                      <span aria-hidden=\"true\">&times;</span>\n                  </button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <div class=\"col-xl-6 text-xs-center\">\n                    <div class=\"form-group\">\n                        <label for=\"inputTypeUser\">Login</label>\n                        <input type=\"text\" class=\"form-control\" id=\"inputNewlogin\" [(ngModel)]=\"login\" name=\"inputNewLoginUser\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"inputSharedUser\">Mot de passe</label>\n                        <input type=\"password\" class=\"form-control\" id=\"inputNewPassUser\" [(ngModel)]=\"password\" name=\"inputNewPassUser\">\n                    </div>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" id=\"inputNewNomUser\" name=\"inputNewNomUser\" placeholder=\"nameUser\">\n                    </div>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" id=\"inputNewPrenomUser\" name=\"inputNewPrenomUser\" [(ngModel)]=\"surnameUser\" placeholder=\"Prenom\">\n                    </div>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" id=\"inputNewEmailUser\" name=\"inputNewEmailUser\" [(ngModel)]=\"emailUser\" placeholder=\"Email\">\n                    </div>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" id=\"inputNewTelUser\" name=\"inputNewTelUser\" [(ngModel)]=\"mobileUser\" placeholder=\"Téléphone\">\n                    </div>\n                </div>\n                <!-- <div class=\"col-xl-6 text-xs-center\">\n                    <div class=\"form-group\">\n                        <select id=\"inputNewTypeUser\" class=\"form-control\" [(ngModel)]=\"typeUser\">\n                                                  <option value=\"publique\">Publique</option>\n                                                  <option value=\"privee\">Privé</option>\n                                          </select>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"InputImageUser\">Image de l'utilisateur</label>\n                        <input type=\"file\" (change)=\"onUploadChange($event)\" accept=\".png, .jpg, .jpeg, .pdf\" id=\"InputImageUser\" class=\"form-control-file\" [(ngModel)]=\"imgUser\" aria-describedby=\"fileHelp\" />\n                        <img *ngFor=\"let ite of base64textString\" src={{ite}} alt=\"\" id=\"img\" style=\"width: 10%; height: 10%;\">\n                        <small id=\"fileHelp\" class=\"form-text text-muted\">Taille maximale d'image est 2Mo.</small>\n    \n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"row\">\n                            <div class=\"col-xl-8 text-xs-center\">\n                                <input type=\"text\" class=\"form-control\" id=\"inputNewSharedUser\" name=\"inputNewSharedUser\" [(ngModel)]=\"numTel\" placeholder=\"Partager avec\">\n                            </div>\n                            <div class=\"col-xl-4 text-xs-center\">\n                                <span class=\"btn-group-sm\">\n                                                                  <button type=\"button\" class=\"btn btn-secondary bmd-btn-fab bmd-btn-fab-sm\" (click)=\"addNumToList()\">\n                                                                          <i class=\"material-icons\">control_point</i>\n                                                                  </button>\n                                                          </span>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <ul *ngIf=\"list\">\n                                <li *ngFor=\"let item of list\">{{item}}</li>\n                            </ul>\n                        </div>\n                    </div>\n                </div> -->\n            </div>\n    \n    \n        </div>\n    \n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"c('Close click')\">Fermer</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"addUser()\">Ajouter</button>\n        </div>\n    </ng-template>\n    \n    <ng-template #content2 let-c=\"close\" let-d=\"dismiss\">\n        <div class=\"modal-header\">\n            <h4 class=\"modal-title\">Détails de l'utilisateur:&nbsp; {{objUser.nameUser}} {{objUser.surnameUser}} </h4>\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n                          <span aria-hidden=\"true\">&times;</span>\n                  </button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <div class=\"col-xl-6 text-xs-center\">\n                    <div class=\"form-group\">\n                        <div class=\"row\">\n                            <div class=\"col-xl-6 text-xs-center\">\n                                <label class=\"font-weight-bold\">Telephone:</label>\n                            </div>\n                            <div class=\"col-xl-6 text-xs-center\">\n                                <label class=\"font-weight-light\">{{objUser.mobileUser}}</label>\n                            </div>\n                            <div class=\"col-xl-6 text-xs-center\">\n                                <label class=\"font-weight-bold\">Nombre De Colis Livrées:</label>\n                            </div>\n                            <div class=\"col-xl-6 text-xs-center\">\n                                <label class=\"font-weight-light\">{{objUser.mobileUser}}</label>\n                            </div>\n                            <div class=\"col-xl-6 text-xs-center\">\n                                <label class=\"font-weight-bold\">Nombre de Colis Annulées:</label>\n                            </div>\n                            <div class=\"col-xl-6 text-xs-center\">\n                                <label class=\"font-weight-light\">{{objUser.mobileUser}}</label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"objUser.imgUser\">\n                        <img [src]=\"objUser.imgUser\" />\n                    </div>\n    \n                </div>\n            </div>\n    \n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"c('Close click')\">Close</button>\n        </div>\n    </ng-template>\n    \n    \n    <ng-template #content4 let-c=\"close\" let-d=\"dismiss\">\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <h5>Etes-vous sur de bien vouloir supprimer cet élément ?</h5>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"('Close click')\">Annuler</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"('Close click')\">Ok</button>\n        </div>\n    </ng-template>\n\n<ng-template #content5 let-modal id=\"content5\">\n        <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Génération de rapport de livraison de client &nbsp; {{objUser.nameUser}} {{objUser.surnameUser}}.</h4>\n                <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.close('Save click')\">\n                <span aria-hidden=\"true\">&times;</span>\n                </button>\n        </div>  \n        <div class=\"modal-body\">\n                <div class=\"row\">\n                        <div class=\"col-xl-6 text-xs-center\">\n                                <fieldset class=\"scheduler-border\">\n                                        <legend class=\"scheduler-border\">Date début</legend>\n                                        <div class=\"control-group\">\n                                                <input id=\"startDate\" type=\"date\" class=\"form-control\" name=\"startDate\" [(ngModel)]=\"startDate\">                                                                                                                             \n                                        </div>\n                                </fieldset>\n                        </div>\n                        <div class=\"col-xl-6 text-xs-center\">\n                                <fieldset class=\"scheduler-border\">\n                                        <legend class=\"scheduler-border\">Date fin</legend>\n                                        <div class=\"control-group\">\n                                                <input id=\"endDate\" type=\"date\" class=\"form-control\" name=\"endDate\" [(ngModel)]=\"endDate\">                                                                                                                             \n                                        </div>\n                                </fieldset>\n                        </div>\n                </div>\n                <div class=\"row\">\n                        <div class=\"col-xl-12 text-xs-center\">\n                                <fieldset class=\"scheduler-border\">\n                                        <legend class=\"scheduler-border\">Status de colis</legend>\n                                        <div class=\"control-group\">\n                                                <select id=\"tripStatus\" class=\"form-control\" [(ngModel)]=\"tripStatus\">                                                        \n                                                        <option value=\"Livree\" selected>Livree</option>\n                                                        <option value=\"Retour\">Retour</option>\n                                                        <option value=\"Livree et retour\">Livree et retour</option>\n                                                        <option value=\"Tous\">Tous</option>\n                                                </select>                                                                                                                             \n                                        </div>\n                                </fieldset>\n\n                                <label class=\"container2\" hidden> \n                                    <input type=\"checkbox\" [(ngModel)]=\"theCheckboxPayement\"  data-md-icheck (change)=\"inPayementTripCheckbox($event)\"/>\n                                        Mettre les colis en cours de paiement.\n                                    <span class=\"checkmark\"></span>\n                                </label>\n                        </div>                        \n                </div>\n                                \n\n        </div>      \n        \n        <div class=\"modal-footer\">                                                \n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modal.close('Save click')\">Fermer</button>\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"generateExcel();modal.close('Save click')\">Générer</button>\n        </div>\n</ng-template>\n\n<ng-template #contentBlock let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-body\">\n            <div class=\"row\">\n                    <h5 *ngIf=\"objUser.accountActive===true\" >Etes-vous sur de bien vouloir désactiver ce compte ?</h5>\n                    <h5 *ngIf=\"objUser.accountActive===false\">Etes-vous sur de bien vouloir activer ce compte ?</h5>\n            </div> \n    </div>\n    <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"(c('Close click'))\">Annuler</button>                \n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"OnBlock(objUser);(c('Close click'))\" *ngIf=\"objUser.accountActive===true\" >Bloquer</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"OnDeBlock(objUser);(c('Close click'))\" *ngIf=\"objUser.accountActive===false\">Débloquer</button>\n\n    </div>\n</ng-template>\n\n<ng-template #contentdelete let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-body\">\n            <div class=\"row\">\n                    <h5>Etes-vous sur de bien vouloir supprimer ce compte ?</h5>\n            </div> \n    </div>\n    <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"(c('Close click'))\">Annuler</button>                \n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"deleteUser(objUser);(c('Close click'))\">Supprimer</button>\n    </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/layout/users/users.component.scss":
/*!***************************************************!*\
  !*** ./src/app/layout/users/users.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#gmap {\n  position: relative;\n  height: 500px;\n  margin: 0; }\n\n#locator1 {\n  pointer-events: none;\n  background-image: url('person_pin.png');\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 70px;\n  height: 70px;\n  margin-left: -35px;\n  margin-top: -70px; }\n\n#alert {\n  margin-top: 30px; }\n\n.html2canvas-container {\n  width: 3000px !important;\n  height: 3000px !important; }\n\nfieldset.scheduler-border {\n  border: 1px groove #ddd !important;\n  padding: 0 1.4em 1.4em 1.4em !important;\n  margin: 0 0 1.5em 0 !important;\n  box-shadow: 0px 0px 0px 0px #000; }\n\nlegend.scheduler-border {\n  font-size: 1.2em !important;\n  font-weight: bold !important;\n  text-align: left !important;\n  width: auto;\n  padding: 0 10px;\n  border-bottom: none; }\n\na {\n  text-decoration: none;\n  display: inline-block;\n  padding: 8px 16px; }\n\na:hover {\n  background-color: #ddd;\n  color: black; }\n\n.previous {\n  background-color: #f1f1f1;\n  color: black; }\n\n.next {\n  background-color: #4CAF50;\n  color: white; }\n\n.round {\n  border-radius: 50%; }\n\n.example-container {\n  display: flex;\n  flex-direction: column;\n  min-width: 300px; }\n\n.example-header {\n  min-height: 64px;\n  padding: 8px 24px 0; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.mat-table {\n  overflow: auto;\n  max-height: 500px; }\n\n.spinner {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: 0 auto; }\n\n/* The container2 */\n\n.container2 {\n  display: block;\n  position: relative;\n  padding-left: 35px;\n  margin-bottom: 12px;\n  cursor: pointer;\n  font-size: 15px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n/* Hide the browser's default checkbox */\n\n.container2 input {\n  position: absolute;\n  opacity: 0;\n  cursor: pointer; }\n\n/* Create a custom checkbox */\n\n.checkmark {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 22px;\n  width: 22px;\n  background-color: #eee; }\n\n/* On mouse-over, add a grey background color */\n\n.container2:hover input ~ .checkmark {\n  background-color: #ccc; }\n\n/* When the checkbox is checked, add a blue background */\n\n.container2 input:checked ~ .checkmark {\n  background-color: #2196F3; }\n\n/* Create the checkmark/indicator (hidden when not checked) */\n\n.checkmark:after {\n  content: \"\";\n  position: absolute;\n  display: none; }\n\n/* Show the checkmark when checked */\n\n.container2 input:checked ~ .checkmark:after {\n  display: block; }\n\n/* Style the checkmark/indicator */\n\n.container2 .checkmark:after {\n  left: 9px;\n  top: 5px;\n  width: 5px;\n  height: 10px;\n  border: solid white;\n  border-width: 0 3px 3px 0;\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3VzZXJzL0Q6XFxOZXdQYWNrd2F5c1dlYlxcZG90d2F5cy9zcmNcXGFwcFxcbGF5b3V0XFx1c2Vyc1xcdXNlcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBa0I7RUFDbEIsY0FBYTtFQUNiLFVBQVMsRUFDWjs7QUFFRDtFQUNJLHFCQUFvQjtFQUNwQix3Q0FBdUQ7RUFDdkQsbUJBQWtCO0VBQ2xCLFVBQVM7RUFDVCxTQUFRO0VBQ1IsWUFBVztFQUNYLGFBQVk7RUFDWixtQkFBa0I7RUFDbEIsa0JBQWlCLEVBQ3BCOztBQUVEO0VBQ0ksaUJBQWdCLEVBQ25COztBQUVEO0VBQXlCLHlCQUF3QjtFQUFFLDBCQUF5QixFQUFJOztBQUVoRjtFQUNJLG1DQUFrQztFQUNsQyx3Q0FBdUM7RUFDdkMsK0JBQThCO0VBRXRCLGlDQUFpQyxFQUM1Qzs7QUFFRDtFQUNJLDRCQUEyQjtFQUMzQiw2QkFBNEI7RUFDNUIsNEJBQTJCO0VBQzNCLFlBQVU7RUFDVixnQkFBYztFQUNkLG9CQUFrQixFQUNyQjs7QUFFRDtFQUNJLHNCQUFxQjtFQUNyQixzQkFBcUI7RUFDckIsa0JBQWlCLEVBQ2xCOztBQUVEO0VBQ0UsdUJBQXNCO0VBQ3RCLGFBQVksRUFDYjs7QUFFRDtFQUNFLDBCQUF5QjtFQUN6QixhQUFZLEVBQ2I7O0FBRUQ7RUFDRSwwQkFBeUI7RUFDekIsYUFBWSxFQUNiOztBQUVEO0VBQ0UsbUJBQWtCLEVBQ25COztBQUVEO0VBQ0UsY0FBYTtFQUNiLHVCQUFzQjtFQUN0QixpQkFBZ0IsRUFDakI7O0FBRUQ7RUFDRSxpQkFBZ0I7RUFDaEIsb0JBQW1CLEVBQ3BCOztBQUVEO0VBQ0UsZ0JBQWU7RUFDZixZQUFXLEVBQ1o7O0FBRUQ7RUFDRSxlQUFjO0VBQ2Qsa0JBQWlCLEVBQ2xCOztBQUVEO0VBQ0EsZ0JBQWU7RUFDZixPQUFNO0VBQ04sVUFBUztFQUNULFFBQU87RUFDUCxTQUFRO0VBQ1IsZUFBYyxFQUNmOztBQUVELG9CQUFvQjs7QUFDcEI7RUFDRSxlQUFjO0VBQ2QsbUJBQWtCO0VBQ2xCLG1CQUFrQjtFQUNsQixvQkFBbUI7RUFDbkIsZ0JBQWU7RUFDZixnQkFBZTtFQUNmLDBCQUF5QjtFQUN6Qix1QkFBc0I7RUFDdEIsc0JBQXFCO0VBQ3JCLGtCQUFpQixFQUNsQjs7QUFFRCx5Q0FBeUM7O0FBQ3pDO0VBQ0UsbUJBQWtCO0VBQ2xCLFdBQVU7RUFDVixnQkFBZSxFQUNoQjs7QUFFRCw4QkFBOEI7O0FBQzlCO0VBQ0UsbUJBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsYUFBWTtFQUNaLFlBQVc7RUFDWCx1QkFBc0IsRUFDdkI7O0FBRUQsZ0RBQWdEOztBQUNoRDtFQUNFLHVCQUFzQixFQUN2Qjs7QUFFRCx5REFBeUQ7O0FBQ3pEO0VBQ0UsMEJBQXlCLEVBQzFCOztBQUVELDhEQUE4RDs7QUFDOUQ7RUFDRSxZQUFXO0VBQ1gsbUJBQWtCO0VBQ2xCLGNBQWEsRUFDZDs7QUFFRCxxQ0FBcUM7O0FBQ3JDO0VBQ0UsZUFBYyxFQUNmOztBQUVELG1DQUFtQzs7QUFDbkM7RUFDRSxVQUFTO0VBQ1QsU0FBUTtFQUNSLFdBQVU7RUFDVixhQUFZO0VBQ1osb0JBQW1CO0VBQ25CLDBCQUF5QjtFQUN6QixpQ0FBZ0M7RUFFaEMseUJBQXdCLEVBQ3pCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3VzZXJzL3VzZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2dtYXAge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgaGVpZ2h0OiA1MDBweDtcclxuICAgIG1hcmdpbjogMDtcclxufVxyXG5cclxuI2xvY2F0b3IxIHtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwic3JjL2Fzc2V0cy9pbWdzL3BlcnNvbl9waW4ucG5nXCIpO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdG9wOiA1MCU7XHJcbiAgICB3aWR0aDogNzBweDtcclxuICAgIGhlaWdodDogNzBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAtMzVweDtcclxuICAgIG1hcmdpbi10b3A6IC03MHB4O1xyXG59XHJcblxyXG4jYWxlcnQge1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG5cclxuLmh0bWwyY2FudmFzLWNvbnRhaW5lciB7IHdpZHRoOiAzMDAwcHggIWltcG9ydGFudDsgaGVpZ2h0OiAzMDAwcHggIWltcG9ydGFudDsgfVxyXG5cclxuZmllbGRzZXQuc2NoZWR1bGVyLWJvcmRlciB7XHJcbiAgICBib3JkZXI6IDFweCBncm9vdmUgI2RkZCAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMCAxLjRlbSAxLjRlbSAxLjRlbSAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luOiAwIDAgMS41ZW0gMCAhaW1wb3J0YW50O1xyXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAgMHB4IDBweCAwcHggMHB4ICMwMDA7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6ICAwcHggMHB4IDBweCAwcHggIzAwMDtcclxufVxyXG5cclxubGVnZW5kLnNjaGVkdWxlci1ib3JkZXIge1xyXG4gICAgZm9udC1zaXplOiAxLjJlbSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQgIWltcG9ydGFudDtcclxuICAgIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOmF1dG87XHJcbiAgICBwYWRkaW5nOjAgMTBweDtcclxuICAgIGJvcmRlci1ib3R0b206bm9uZTtcclxufVxyXG5cclxuYSB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBwYWRkaW5nOiA4cHggMTZweDtcclxuICB9XHJcbiAgXHJcbiAgYTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gIH1cclxuICBcclxuICAucHJldmlvdXMge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjFmMTtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICB9XHJcbiAgXHJcbiAgLm5leHQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRDQUY1MDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICB9XHJcbiAgXHJcbiAgLnJvdW5kIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB9XHJcblxyXG4gIC5leGFtcGxlLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIG1pbi13aWR0aDogMzAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5leGFtcGxlLWhlYWRlciB7XHJcbiAgICBtaW4taGVpZ2h0OiA2NHB4O1xyXG4gICAgcGFkZGluZzogOHB4IDI0cHggMDtcclxuICB9XHJcbiAgXHJcbiAgLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICBcclxuICAubWF0LXRhYmxlIHtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgbWF4LWhlaWdodDogNTAwcHg7XHJcbiAgfVxyXG5cclxuICAuc3Bpbm5lciB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBtYXJnaW46IDAgYXV0bztcclxufVxyXG4gIFxyXG4vKiBUaGUgY29udGFpbmVyMiAqL1xyXG4uY29udGFpbmVyMiB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHBhZGRpbmctbGVmdDogMzVweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcclxuICB1c2VyLXNlbGVjdDogbm9uZTtcclxufVxyXG5cclxuLyogSGlkZSB0aGUgYnJvd3NlcidzIGRlZmF1bHQgY2hlY2tib3ggKi9cclxuLmNvbnRhaW5lcjIgaW5wdXQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBvcGFjaXR5OiAwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLyogQ3JlYXRlIGEgY3VzdG9tIGNoZWNrYm94ICovXHJcbi5jaGVja21hcmsge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICBoZWlnaHQ6IDIycHg7XHJcbiAgd2lkdGg6IDIycHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcclxufVxyXG5cclxuLyogT24gbW91c2Utb3ZlciwgYWRkIGEgZ3JleSBiYWNrZ3JvdW5kIGNvbG9yICovXHJcbi5jb250YWluZXIyOmhvdmVyIGlucHV0IH4gLmNoZWNrbWFyayB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcclxufVxyXG5cclxuLyogV2hlbiB0aGUgY2hlY2tib3ggaXMgY2hlY2tlZCwgYWRkIGEgYmx1ZSBiYWNrZ3JvdW5kICovXHJcbi5jb250YWluZXIyIGlucHV0OmNoZWNrZWQgfiAuY2hlY2ttYXJrIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE5NkYzO1xyXG59XHJcblxyXG4vKiBDcmVhdGUgdGhlIGNoZWNrbWFyay9pbmRpY2F0b3IgKGhpZGRlbiB3aGVuIG5vdCBjaGVja2VkKSAqL1xyXG4uY2hlY2ttYXJrOmFmdGVyIHtcclxuICBjb250ZW50OiBcIlwiO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4vKiBTaG93IHRoZSBjaGVja21hcmsgd2hlbiBjaGVja2VkICovXHJcbi5jb250YWluZXIyIGlucHV0OmNoZWNrZWQgfiAuY2hlY2ttYXJrOmFmdGVyIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLyogU3R5bGUgdGhlIGNoZWNrbWFyay9pbmRpY2F0b3IgKi9cclxuLmNvbnRhaW5lcjIgLmNoZWNrbWFyazphZnRlciB7XHJcbiAgbGVmdDogOXB4O1xyXG4gIHRvcDogNXB4O1xyXG4gIHdpZHRoOiA1cHg7XHJcbiAgaGVpZ2h0OiAxMHB4O1xyXG4gIGJvcmRlcjogc29saWQgd2hpdGU7XHJcbiAgYm9yZGVyLXdpZHRoOiAwIDNweCAzcHggMDtcclxuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcclxuICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xyXG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/users/users.component.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/users/users.component.ts ***!
  \*************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./users.service */ "./src/app/layout/users/users.service.ts");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./User */ "./src/app/layout/users/User.ts");
/* harmony import */ var _excel_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./excel.service */ "./src/app/layout/users/excel.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_10__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var UsersComponent = /** @class */ (function () {
    function UsersComponent(userService, modalService, excelService, spinner, http) {
        this.userService = userService;
        this.modalService = modalService;
        this.excelService = excelService;
        this.spinner = spinner;
        this.http = http;
        this.searchTerm = '';
        this.itemsSearch = [];
        this.objUser = new _User__WEBPACK_IMPORTED_MODULE_5__["User"];
        this.listTripTopayed = [];
        this.theCheckboxPayement = false;
        this.markedCheckbox = false;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers(true, false);
    };
    UsersComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    UsersComponent.prototype.openRl = function (content, user) {
        var _this = this;
        this.modalService.open(content, { size: 'lg' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        this.objUser = user;
    };
    UsersComponent.prototype.getDismissReason = function (reason) {
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
    UsersComponent.prototype.changeDateFormat = function (dd) {
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
    UsersComponent.prototype.test = function () {
        if (this.keyExp === undefined) {
            this.keyExp = false;
        }
        if (this.keyDes === undefined) {
            this.keyDes = false;
        }
        if ((this.keyExp === false) && (this.keyDes === false)) {
            this.keyExp = true;
        }
        console.log("keyExp : ", this.keyExp);
        console.log("keyDSe : ", this.keyDes);
        this.getUsers(this.keyExp, this.keyDes);
    };
    UsersComponent.prototype.getUsers = function (key1, key2) {
        var _this = this;
        this.items = [];
        this.userService.getUsersFromServe(key1, key2).subscribe(function (data) {
            _this.result = data['_body'];
            var jo = JSON.parse(_this.result);
            var obj = Array.of(jo.data);
            _this.jsonObj = obj[0];
            for (var index = 0; index < _this.jsonObj.length; index++) {
                _this.items.push(_this.jsonObj[index]);
            }
            _this.itemsSearch = _this.items;
        });
    };
    UsersComponent.prototype.editUser = function (user) {
        this.obj = user;
        this.objUser.idUser = this.obj.idUser;
        this.objUser.nameUser = this.obj.nameUser;
        this.objUser.surnameUser = this.obj.surnameUser;
        this.objUser.mobileUser = this.obj.mobileUser;
        this.objUser.emailUser = this.obj.emailUser;
        this.objUser.adressUser = this.obj.adressUser;
        this.objUser.deleted = this.obj.deleted;
        this.objUser.createdday = this.obj.createdday;
        this.objUser.createdby = this.obj.createdby;
        this.objUser.updateby = this.obj.updateby;
        this.objUser.createdday = this.obj.createdday;
        this.objUser.login = this.obj.login;
        this.objUser.password = this.obj.password;
        this.objUser.imgUser = this.obj.imgUser;
        this.objUser.rateUser = this.obj.rateUser;
        this.objUser.nbrateUser = this.obj.nbrateUser;
        this.objUser.mfUser = this.obj.mfUser;
        this.objUser.steUser = this.obj.steUser;
        this.objUser.cout = this.obj.cout;
        this.objUser.codeParenage = this.obj.codeParenage;
        console.log(this.objUser);
        if (this.objUser.codeParenage === 0) {
            this.disable = false;
        }
        else {
            this.disable = true;
        }
    };
    UsersComponent.prototype.deleteUser = function (user) {
        var Userdata = {
            deleted: true
        };
        this.userService.deleteUser(user.idUser, Userdata);
        jquery__WEBPACK_IMPORTED_MODULE_10__('#user-row-' + user.idUser).hide('slow', function () {
            jquery__WEBPACK_IMPORTED_MODULE_10__(this).remove();
        });
    };
    UsersComponent.prototype.Update = function () {
        this.updateUser(this.objUser.idUser, this.objUser.login, this.objUser.password, this.objUser.nameUser, this.objUser.surnameUser, this.objUser.emailUser, this.objUser.mobileUser, this.objUser.adressUser, this.objUser.mfUser, this.objUser.steUser, this.objUser.cout, this.objUser.codeParenage);
        window.location.reload();
    };
    UsersComponent.prototype.updateUser = function (idUser, login, password, nameUser, surnameUser, emailUser, mobileUser, adress, mfUser, steUser, cout, codeParenage) {
        var Userdata = {
            login: login,
            password: password,
            nameUser: nameUser,
            surnameUser: surnameUser,
            emailUser: emailUser,
            mobileUser: mobileUser,
            adressUser: adress,
            updateday: new Date,
            updateby: idUser,
            mfUser: mfUser,
            steUser: steUser,
            cout: cout,
            codeParenage: codeParenage
        };
        console.log("data", Userdata);
        this.userService.updateUser(Userdata, idUser).subscribe(function (data) {
            var result = data['_body'];
        }, function (error) {
            console.log(error); // Error getting the data
        });
    };
    UsersComponent.prototype.filterItems = function (searchTerm) {
        return this.items.filter(function (item) {
            var nomUser;
            var loginUser;
            var mobUser;
            var snomUser;
            var mailUser;
            var adrUser;
            var createdDate;
            var accountStatus;
            if (item != null && item.nameUser != null) {
                nomUser = item.nameUser.toString();
            }
            else {
                nomUser = ' ';
            }
            if (item != null && item.login != null) {
                loginUser = item.login.toString();
            }
            else {
                loginUser = ' ';
            }
            if (item != null && item.mobileUser != null) {
                mobUser = item.mobileUser.toString();
            }
            else {
                mobUser = ' ';
            }
            if (item != null && item.surnameUser != null) {
                snomUser = item.surnameUser.toString();
            }
            else {
                snomUser = ' ';
            }
            if (item != null && item.emailUser != null) {
                mailUser = item.emailUser.toString();
            }
            else {
                mailUser = ' ';
            }
            if (item != null && item.adressUser != null) {
                adrUser = item.adressUser.toString();
            }
            else {
                adrUser = ' ';
            }
            if (item != null && item.createdday != null) {
                createdDate = item.createdday.toString();
            }
            else {
                createdDate = ' ';
            }
            if (item != null && item.accountActive != null) {
                accountStatus = item.accountActive.toString();
            }
            else {
                accountStatus = ' ';
            }
            return nomUser.indexOf(searchTerm) > -1
                || loginUser.indexOf(searchTerm) > -1
                || mobUser.indexOf(searchTerm) > -1
                || snomUser.indexOf(searchTerm) > -1
                || mailUser.indexOf(searchTerm) > -1
                || adrUser.indexOf(searchTerm) > -1
                || createdDate.indexOf(searchTerm) > -1
                || accountStatus.indexOf(searchTerm) > -1;
        });
    };
    UsersComponent.prototype.setFilteredItems = function () {
        this.items = [];
        if (this.items !== undefined) {
            this.items = this.itemsSearch;
            this.items = this.filterItems(this.searchTerm);
        }
    };
    UsersComponent.prototype.changeDateTimeFormat = function (dd) {
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
    UsersComponent.prototype.changeDateFormatMDY = function (dd) {
        var d = new Date(dd);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var dformat = [month, day, year].join('/');
        return dformat;
    };
    UsersComponent.prototype.generateExcel = function () {
        var _this = this;
        //this.spinner.show();
        this.idUserTr = 'UT' + this.objUser.idUser;
        this.sDate = this.changeDateFormatMDY(this.startDate);
        this.eDate = this.changeDateFormatMDY(this.endDate);
        this.tripsByUserAndDate = [];
        this.userService.getTripsByUserAndDate(this.idUserTr, this.sDate, this.eDate).subscribe(function (data) {
            _this.result = data['_body'];
            var jo = JSON.parse(_this.result);
            var obj = Array.of(jo.data);
            _this.jsonObj = obj[0];
            var cloture = '';
            _this.costtrip = 0;
            _this.valpack = 0;
            for (var index = 0; index < _this.jsonObj.length; index++) {
                var jTemp = _this.jsonObj[index];
                if (_this.tripStatus === 'Tous' || _this.tripStatus === '') {
                    if (jTemp.isClosed === true) {
                        cloture = 'Oui';
                    }
                    else {
                        cloture = 'Non';
                    }
                    if (jTemp.statusTrip === 'Retour') {
                        if (jTemp.isBilled === true) {
                            jTemp.packageTrip.valPackage = 0;
                            jTemp.statusTrip = 'Retour avec frais';
                        }
                        else {
                            jTemp.costTrip = 0;
                            jTemp.packageTrip.valPackage = 0;
                            jTemp.statusTrip = 'Retour sans frais';
                        }
                    }
                    _this.costtrip = _this.costtrip + jTemp.costTrip;
                    _this.valpack = _this.valpack + jTemp.packageTrip.valPackage;
                    var tab = [];
                    tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, _this.splitDateFormatMDY(jTemp.createdday), _this.splitDateFormatMDY(jTemp.livredday), jTemp.packageTrip.valPackage);
                    _this.tripsByUserAndDate.push(tab);
                }
                else if (_this.tripStatus === 'Livree et retour') {
                    if (jTemp.argentRecolte === true || jTemp.statusTrip === 'Retour') {
                        _this.listTripTopayed.push(jTemp.idTrip);
                        if (jTemp.isClosed === true) {
                            cloture = 'Oui';
                        }
                        else {
                            cloture = 'Non';
                        }
                        if (jTemp.statusTrip === 'Retour') {
                            if (jTemp.isBilled === true) {
                                jTemp.packageTrip.valPackage = 0;
                                jTemp.statusTrip = 'Retour avec frais';
                            }
                            else {
                                jTemp.costTrip = 0;
                                jTemp.packageTrip.valPackage = 0;
                                jTemp.statusTrip = 'Retour sans frais';
                            }
                        }
                        _this.costtrip = _this.costtrip + jTemp.costTrip;
                        _this.valpack = _this.valpack + jTemp.packageTrip.valPackage;
                        var tab = [];
                        tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, _this.splitDateFormatMDY(jTemp.createdday), _this.splitDateFormatMDY(jTemp.livredday), jTemp.packageTrip.valPackage);
                        _this.tripsByUserAndDate.push(tab);
                    }
                }
                else if (_this.tripStatus === 'Livree') {
                    if (jTemp.argentRecolte === true) {
                        _this.listTripTopayed.push(jTemp.idTrip);
                        if (jTemp.isClosed === true) {
                            cloture = 'Oui';
                        }
                        else {
                            cloture = 'Non';
                        }
                        _this.costtrip = _this.costtrip + jTemp.costTrip;
                        _this.valpack = _this.valpack + jTemp.packageTrip.valPackage;
                        var tab = [];
                        tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, _this.splitDateFormatMDY(jTemp.createdday), _this.splitDateFormatMDY(jTemp.livredday), jTemp.packageTrip.valPackage);
                        _this.tripsByUserAndDate.push(tab);
                    }
                }
                else if (_this.tripStatus === 'Retour') {
                    if (jTemp.statusTrip === 'Retour') {
                        _this.listTripTopayed.push(jTemp.idTrip);
                        if (jTemp.isClosed === true) {
                            cloture = 'Oui';
                        }
                        else {
                            cloture = 'Non';
                        }
                        if (jTemp.statusTrip === 'Retour') {
                            if (jTemp.isBilled === true) {
                                jTemp.packageTrip.valPackage = 0;
                                jTemp.statusTrip = 'Retour avec frais';
                            }
                            else {
                                jTemp.costTrip = 0;
                                jTemp.packageTrip.valPackage = 0;
                                jTemp.statusTrip = 'Retour sans frais';
                            }
                        }
                        _this.costtrip = _this.costtrip + jTemp.costTrip;
                        _this.valpack = _this.valpack + jTemp.packageTrip.valPackage;
                        var tab = [];
                        tab.push(jTemp.refTrip, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, _this.splitDateFormatMDY(jTemp.createdday), _this.splitDateFormatMDY(jTemp.livredday), jTemp.packageTrip.valPackage);
                        _this.tripsByUserAndDate.push(tab);
                    }
                }
            }
            var tab1 = [];
            /* tab1.push('', '', '', '', '', '', '', '', '');
            this.tripsByUserAndDate.push(tab1);
            tab1 = []; */
            tab1.push('', '', _this.costtrip, '', '', '', '', '', _this.valpack);
            _this.tripsByUserAndDate.push(tab1);
            console.log(_this.tripsByUserAndDate);
        }, function (err) {
            console.log(err);
        }, function () {
            if (_this.markedCheckbox === true) {
                _this.inPayementTrip(_this.listTripTopayed);
            }
            var nameuser = '' + _this.objUser.nameUser + ' ' + _this.objUser.surnameUser;
            var montantNet = _this.valpack - _this.costtrip;
            _this.excelService.generateExcel(_this.tripsByUserAndDate, nameuser, _this.changeDateFormatDMY2(_this.startDate), _this.changeDateFormatDMY2(_this.endDate), montantNet);
            // this.spinner.hide();
        });
    };
    UsersComponent.prototype.inPayementTrip = function (listTripTopayed) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({ headers: headers });
        var urlInPayementTrip = 'http://147.135.136.78:8052/trip/updatepayed';
        this.http.post(urlInPayementTrip, listTripTopayed, options).subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log('error');
        });
    };
    UsersComponent.prototype.inPayementTripCheckbox = function (e) {
        this.markedCheckbox = e.target.checked;
        console.log(this.markedCheckbox);
    };
    UsersComponent.prototype.changeDateFormatDMY = function (dd) {
        var d = new Date(dd);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var dformat = [day, month, year].join('/');
        return dformat;
    };
    UsersComponent.prototype.splitDateFormatMDY = function (dd) {
        var dformat = '';
        if (dd != null) {
            var d = '' + dd;
            var arr = d.split(" ");
            dformat = arr[1] + ' ' + arr[0] + ' ' + arr[2];
        }
        return dformat;
    };
    UsersComponent.prototype.changeDateFormatDMY2 = function (dd) {
        var arr = dd.split('-');
        var dformat = arr[1] + '/' + arr[2] + '/' + arr[0];
        return dformat;
    };
    UsersComponent.prototype.OnBlock = function (user) {
        var userdata = {
            accountActive: false
        };
        this.userService.BlockUser(user.idUser, userdata);
        //$('#user-tdactif-' + user.idUser).val("Inactif");
        window.location.reload();
    };
    UsersComponent.prototype.OnDeBlock = function (user) {
        var userdata = {
            accountActive: true
        };
        this.userService.BlockUser(user.idUser, userdata);
        //$('#user-tdinactif-' +user.idUser).val("Actif");
        window.location.reload();
    };
    UsersComponent.prototype.generateRapportClient = function () {
        this.excelService.generatePackwaysExcelReport(this.items);
    };
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/layout/users/users.component.html"),
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_1__["routerTransition"])()],
            styles: [__webpack_require__(/*! ./users.component.scss */ "./src/app/layout/users/users.component.scss")]
        }),
        __metadata("design:paramtypes", [_users_service__WEBPACK_IMPORTED_MODULE_4__["UserService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"],
            _excel_service__WEBPACK_IMPORTED_MODULE_6__["ExcelService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"], _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/layout/users/users.module.ts":
/*!**********************************************!*\
  !*** ./src/app/layout/users/users.module.ts ***!
  \**********************************************/
/*! exports provided: UsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _users_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users-routing.module */ "./src/app/layout/users/users-routing.module.ts");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users.component */ "./src/app/layout/users/users.component.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./users.service */ "./src/app/layout/users/users.service.ts");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-6-datatable */ "./node_modules/angular-6-datatable/index.js");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(angular_6_datatable__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_google_places_autocomplete__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-google-places-autocomplete */ "./node_modules/ngx-google-places-autocomplete/bundles/ngx-google-places-autocomplete.umd.js");
/* harmony import */ var ngx_google_places_autocomplete__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ngx_google_places_autocomplete__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var ng_auto_complete__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-auto-complete */ "./node_modules/ng-auto-complete/fesm5/ng-auto-complete.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _users_routing_module__WEBPACK_IMPORTED_MODULE_2__["UsersRoutingModule"],
                _shared__WEBPACK_IMPORTED_MODULE_4__["PageHeaderModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_7__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                angular_6_datatable__WEBPACK_IMPORTED_MODULE_9__["DataTableModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                ngx_google_places_autocomplete__WEBPACK_IMPORTED_MODULE_11__["GooglePlaceModule"],
                ng_auto_complete__WEBPACK_IMPORTED_MODULE_12__["NgAutoCompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatFormFieldModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_14__["NgxSpinnerModule"]
            ],
            declarations: [_users_component__WEBPACK_IMPORTED_MODULE_3__["UsersComponent"]],
            providers: [_users_service__WEBPACK_IMPORTED_MODULE_8__["UserService"]]
        })
    ], UsersModule);
    return UsersModule;
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
        this.url = 'http://147.135.136.78:8052/user/';
        this.urlTrip = 'http://147.135.136.78:8052/trip/';
    }
    UserService.prototype.getUsersFromServe = function (key1, key2) {
        return this.http.get(this.url + "/bykey?keyExp=" + key1 + '&keyDes=' + key2);
    };
    UserService.prototype.deleteUser = function (idUser, userdata) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        this.http.put(this.url + 'update/' + idUser, userdata, options).subscribe(function (data) {
            console.log('User deleted');
        }, function (error) {
        });
    };
    UserService.prototype.BlockUser = function (idUser, userdata) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        this.http.put(this.url + 'update/' + idUser, userdata, options).subscribe(function (data) {
            console.log('User Blocked');
        }, function (error) {
        });
    };
    UserService.prototype.gettripLivree = function (id) {
        var _this = this;
        this.http.get(this.urlTrip + "byuser?id=" + id + "&statustrip=Livree").subscribe(function (data) {
            _this.result = data['_body'];
            // console.log(data['_body'])
            var jo = JSON.parse(_this.result);
            var obj = Array.of(jo.data);
        });
    };
    UserService.prototype.getTripsByUserAndDate = function (idUser, sDate, eDate) {
        return this.http.get(this.urlTrip + "bydate/" + idUser + "?d1=" + sDate + "&d2=" + eDate);
    };
    UserService.prototype.updateUser = function (userdata, id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this.http.put(this.url + '/update/' + id, userdata, options);
        console.log("updated suscess");
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], UserService);
    return UserService;
}());



/***/ })

}]);
//# sourceMappingURL=users-users-module.js.map