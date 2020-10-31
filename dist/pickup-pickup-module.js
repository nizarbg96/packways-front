(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pickup-pickup-module"],{

/***/ "./src/app/layout/pickup/excel.service.ts":
/*!************************************************!*\
  !*** ./src/app/layout/pickup/excel.service.ts ***!
  \************************************************/
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
/* harmony import */ var _packwayslogo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./packwayslogo.js */ "./src/app/layout/pickup/packwayslogo.js");
/* harmony import */ var _revomonlogo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./revomonlogo.js */ "./src/app/layout/pickup/revomonlogo.js");
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
    }
    ExcelService.prototype.generateExcel = function (tripsData) {
        // Excel Title, Header, Data
        var title = 'Rapport de livraison de tous les clients';
        var header = ['REF', 'Client', 'Status', 'Frais', 'Ville de destination', 'Postulation',
            'Ramassage', 'Livraison', 'Supp', 'Montant', 'Type de paiement'];
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
        //worksheet.addRow(['Du: ' + startDate + ' Au: ' + endDate]);
        var subTitleRow = worksheet.addRow(['Date de génération: ' + Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(new Date(), 'd MMM yyyy HH:mm', 'en')]);
        worksheet.mergeCells('G1:G3');
        worksheet.addImage(logoRevomon, 'G1:G3');
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
            var qty = row.getCell(3);
            var del = row.getCell(9);
            var colorDel = 'FFFFFF';
            var color = 'FF99FF99';
            if (del.value === 'Oui') {
                colorDel = '1320d2';
            }
            if (qty.value !== 'Livree') {
                color = 'FF9999';
            }
            if (qty.value === '') {
                color = 'FFFFFF';
                row.font = { name: 'Comic Sans MS', family: 4, size: 11, underline: 'none', bold: true };
            }
            del.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: colorDel }
            };
            qty.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: color }
            };
        });
        worksheet.getColumn(3).width = 17;
        worksheet.getColumn(4).width = 6;
        worksheet.getColumn(5).width = 47;
        worksheet.getColumn(6).width = 15;
        worksheet.getColumn(7).width = 15;
        worksheet.getColumn(8).width = 15;
        worksheet.getColumn(11).width = 25;
        worksheet.getColumn(5).alignment = { vertical: 'middle', horizontal: 'left' };
        worksheet.getRow(4).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center' };
        // worksheet.addRow([]);
        // worksheet.addRow([]);
        // worksheet.addRow([]);
        // Footer Row
        var footerRow = worksheet.addRow(['']);
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
        var nameReport = 'RapportDeLivraison_Generale' + '' + '.xlsx'; // .xlsx
        // tslint:disable-next-line:no-shadowed-variable
        workbook.xlsx.writeBuffer().then(function (buff) {
            // const blob = new Blob([buff as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            var blob = new Blob([buff], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"](blob, nameReport);
        });
    };
    ExcelService.prototype.generatePackwaysExcelReport = function (tripsData, costByMonth, monthDate) {
        // Excel Title, Header, Data
        var title = 'Rapport financière de PACKWAYS';
        var header = ['Date', 'Colis livrés (<=10kg)', 'Coût', 'Colis livrés (>10kg)', 'Coût', 'Colis RF (<=10kg)',
            'Coût', 'Colis RF (>10kg)', 'Coût', 'Nb total facturé', 'Coût total facturé'];
        this.data = tripsData;
        // Create workbook and worksheet
        // const workbook: ExcelProper.Workbook = new Excel.Workbook();
        var workbook = new exceljs__WEBPACK_IMPORTED_MODULE_1__["Workbook"]();
        var worksheet = workbook.addWorksheet('Rapport financière de PACKWAYS');
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
        //worksheet.addRow([]);
        worksheet.addRow(['Mois: ' + monthDate]);
        var subTitleRow = worksheet.addRow(['Date de génération: ' + Object(_angular_common__WEBPACK_IMPORTED_MODULE_5__["formatDate"])(new Date(), 'd MMM yyyy HH:mm', 'en')]);
        worksheet.mergeCells('G1:G3');
        worksheet.addImage(logoRevomon, 'G1:G3');
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
            /* const qty = row.getCell(3);
            const del = row.getCell(9);
            let colorDel = 'FFFFFF';
            let color = 'FF99FF99';
            if (del.value === 'Oui') {
              colorDel = '1320d2';
            }
            if (qty.value !== 'Livree') {
              color = 'FF9999';
            }
            if (qty.value === '') {
              color = 'FFFFFF';
              row.font = { name: 'Comic Sans MS', family: 4, size: 11, underline: 'none', bold: true };
            }
      
            del.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: colorDel }
            };
      
            qty.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: color }
            }; */
        });
        worksheet.getColumn(2).width = 15;
        worksheet.getColumn(3).width = 15;
        worksheet.getColumn(4).width = 15;
        worksheet.getColumn(5).width = 15;
        worksheet.getColumn(6).width = 15;
        worksheet.getColumn(7).width = 15;
        worksheet.getColumn(8).width = 15;
        worksheet.getColumn(9).width = 15;
        //worksheet.getColumn(5).alignment = {vertical: 'middle', horizontal: 'left'};
        worksheet.getRow(4).alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center' };
        // worksheet.addRow([]);
        // worksheet.addRow([]);
        // worksheet.addRow([]);
        // Footer Row
        var footerRow = worksheet.addRow(['Montant net: ' + costByMonth]);
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
        var nameReport = 'PACKWAYS-repport' + '' + '.xlsx'; // .xlsx
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

/***/ "./src/app/layout/pickup/packwayslogo.js":
/*!***********************************************!*\
  !*** ./src/app/layout/pickup/packwayslogo.js ***!
  \***********************************************/
/*! exports provided: logoBase64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logoBase64", function() { return logoBase64; });
var logoBase64 = "data:image/png;base64,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";
//# sourceMappingURL=packwayslogo.js.map

/***/ }),

/***/ "./src/app/layout/pickup/pickup-routing.module.ts":
/*!********************************************************!*\
  !*** ./src/app/layout/pickup/pickup-routing.module.ts ***!
  \********************************************************/
/*! exports provided: PickUpRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickUpRoutingModule", function() { return PickUpRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pickup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pickup.component */ "./src/app/layout/pickup/pickup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _pickup_component__WEBPACK_IMPORTED_MODULE_2__["PickUpComponent"]
    }
];
var PickUpRoutingModule = /** @class */ (function () {
    function PickUpRoutingModule() {
    }
    PickUpRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], PickUpRoutingModule);
    return PickUpRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/pickup/pickup.component.html":
/*!*****************************************************!*\
  !*** ./src/app/layout/pickup/pickup.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@routerTransition]>\r\n    <app-page-header [heading]=\"'PickUp'\" [icon]=\"'fa-users'\"></app-page-header>\r\n    <div class=\"row\">\r\n        <!-- &nbsp;&nbsp;&nbsp;&nbsp;\r\n        <h3>Gestion des utilisateurs</h3> -->\r\n        <div class=\"col col-xl-12 col-lg-12\">\r\n            <div class=\"card mb-3\">\r\n                <div class=\"card-header\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-xl-12 text-xs-center\">\r\n                            <div class=\"row\">\r\n                                <div class=\"col-xl-2 text-xs-center\">\r\n                                    <fieldset class=\"scheduler-border-1\">\r\n                                            <legend class=\"scheduler-border-1\">Date début</legend>\r\n                                            <input id=\"startDate\" type=\"date\" class=\"form-control\" name=\"startDate\" [(ngModel)]=\"startDate\">\r\n                                    </fieldset>\r\n                                </div>                                \r\n                                <div class=\"col-xl-2 text-xs-center\"> \r\n                                    <fieldset class=\"scheduler-border-1\">\r\n                                            <legend class=\"scheduler-border-1\">Date fin</legend>\r\n                                            <input id=\"endDate\" type=\"date\" class=\"form-control\" name=\"endDate\" [(ngModel)]=\"endDate\">\r\n                                    </fieldset>                                   \r\n                                </div>\r\n                                <div class=\"col-xl-2 text-xs-center\">\r\n                                    <button align=\"right\" type=\"button\" class=\"btn btn-info\" style=\"margin-top: 20px;\" (click)=\"getNbTripsByUserAndDate()\">Actualiser</button>\r\n                                </div>  \r\n                                <div class=\"col-xl-4 text-xs-center\">\r\n                                    <button align=\"right\" type=\"button\" class=\"btn btn-danger\" style=\"margin-top: 20px;\" (click)=\"generateExcel()\">Rapport général</button>\r\n                                </div>\r\n                                <div class=\"col-xl-2 text-xs-center\">\r\n                                    <button align=\"right\" type=\"button\" class=\"btn btn-warning\" style=\"margin-top: 20px;\" (click)=\"generatePackwaysReport()\">Rapport financier</button>\r\n                                </div>                          \r\n                            </div>                            \r\n                        </div>\r\n                        \r\n                    </div>\r\n  \r\n                </div>\r\n  \r\n                <div class=\"row\">\r\n                        <div class=\"col-xl-12 text-xs-center\">\r\n                                <div class=\"card-body table-responsive\">\r\n                                    <table class=\"table table-hover table-bordered\" [mfData]=\"items\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"30\">\r\n                                        <thead>\r\n                                            <tr>\r\n                                                <th style=\"width:20%\">Nom et prènom</th>\r\n                                                <th style=\"width:7%\">Nombre de colis postés</th>                                \r\n                                            </tr>\r\n                                        </thead>\r\n                                        <tbody>\r\n                                            <tr *ngFor=\"let tripsUser of mf.data\">                                \r\n                                                <td>{{tripsUser[0]}}</td>\r\n                                                <td>{{tripsUser[1]}}</td>                                                                \r\n                                            </tr>\r\n                                        </tbody>\r\n                                        <tfoot>\r\n                                            <tr>\r\n                                                <td colspan=\"4\">\r\n                                                    <mfBootstrapPaginator [rowsOnPageSet]=\"[]\"></mfBootstrapPaginator>\r\n                                                </td>\r\n                                            </tr>\r\n                                        </tfoot>\r\n                                    </table>                    \r\n                                </div>\r\n                        </div>\r\n                </div>\r\n                \r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col col-xl-12 col-lg-12\">\r\n            <div align=\"rigth\">\r\n                <fieldset class=\"scheduler-border-1\">\r\n                    <legend class=\"scheduler-border-1\"><h2><b>Caisse</b></h2></legend>\r\n                    <h4><b>Totale : </b></h4>&nbsp;&nbsp;&nbsp;<h4><b>{{caissse}}</b></h4>\r\n                </fieldset>\r\n            </div>\r\n        </div>\r\n    </div>\r\n  </div>\r\n\r\n"

/***/ }),

/***/ "./src/app/layout/pickup/pickup.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/layout/pickup/pickup.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "fieldset.scheduler-border-1 {\n  border: 1px groove #ddd !important;\n  padding: 0 0.3em 0.3em 0.3em !important;\n  margin: 0 0 0.2em 0 !important;\n  box-shadow: 0px 0px 0px 0px #000; }\n\nlegend.scheduler-border-1 {\n  font-size: 0.8em !important;\n  font-weight: bold !important;\n  text-align: left !important;\n  width: auto;\n  padding: 0 1px;\n  border-bottom: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3BpY2t1cC9EOlxcTmV3UGFja3dheXNXZWJcXGRvdHdheXMvc3JjXFxhcHBcXGxheW91dFxccGlja3VwXFxwaWNrdXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQ0FBa0M7RUFDbEMsd0NBQXVDO0VBQ3ZDLCtCQUE4QjtFQUV0QixpQ0FBaUMsRUFDMUM7O0FBRUQ7RUFDRSw0QkFBMkI7RUFDM0IsNkJBQTRCO0VBQzVCLDRCQUEyQjtFQUMzQixZQUFVO0VBQ1YsZUFBYTtFQUNiLG9CQUFrQixFQUNuQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9waWNrdXAvcGlja3VwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiZmllbGRzZXQuc2NoZWR1bGVyLWJvcmRlci0xIHtcclxuICAgIGJvcmRlcjogMXB4IGdyb292ZSAjZGRkICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAwIDAuM2VtIDAuM2VtIDAuM2VtICFpbXBvcnRhbnQ7XHJcbiAgICBtYXJnaW46IDAgMCAwLjJlbSAwICFpbXBvcnRhbnQ7XHJcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6ICAwcHggMHB4IDBweCAwcHggIzAwMDtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzogIDBweCAwcHggMHB4IDBweCAjMDAwO1xyXG4gIH1cclxuICBcclxuICBsZWdlbmQuc2NoZWR1bGVyLWJvcmRlci0xIHtcclxuICAgIGZvbnQtc2l6ZTogMC44ZW0gIWltcG9ydGFudDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkICFpbXBvcnRhbnQ7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDphdXRvO1xyXG4gICAgcGFkZGluZzowIDFweDtcclxuICAgIGJvcmRlci1ib3R0b206bm9uZTtcclxuICB9Il19 */"

/***/ }),

/***/ "./src/app/layout/pickup/pickup.component.ts":
/*!***************************************************!*\
  !*** ./src/app/layout/pickup/pickup.component.ts ***!
  \***************************************************/
/*! exports provided: PickUpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickUpComponent", function() { return PickUpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pickup_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pickup.service */ "./src/app/layout/pickup/pickup.service.ts");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");
/* harmony import */ var _excel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./excel.service */ "./src/app/layout/pickup/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PickUpComponent = /** @class */ (function () {
    function PickUpComponent(pickUpService, excelService) {
        this.pickUpService = pickUpService;
        this.excelService = excelService;
    }
    PickUpComponent.prototype.ngOnInit = function () {
        this.getNbTripsByUserAndDate();
        this.getCaisse();
    };
    PickUpComponent.prototype.getNbTripsByUserAndDate = function () {
        var _this = this;
        this.sDate = '';
        this.eDate = '';
        // console.log('this.startDate', this.startDate);
        if ((this.startDate !== null || this.startDate !== '' || this.startDate !== undefined) &&
            (this.endDate !== null || this.endDate !== '' || this.endDate !== undefined)) {
            this.sDate = this.splitDateFormatMDY(this.startDate);
            this.eDate = this.splitDateFormatMDY(this.endDate);
        }
        this.items = [];
        this.items2 = [];
        // console.log('this.sDate', this.sDate);
        // console.log('this.startDate2', this.splitDateFormatMDY(this.startDate));
        this.pickUpService.getNbTripsByUserAndDate(this.sDate, this.eDate).subscribe(function (data) {
            _this.result = data['_body'];
            var jo = JSON.parse(_this.result);
            var obj = Array.of(jo.data);
            _this.jsonObj = obj[0];
            _this.jsonObj.sort(function (a, b) {
                return b[1] - a[1];
            });
            for (var index = 0; index < _this.jsonObj.length; index++) {
                var jTemp = _this.jsonObj[index];
                var zero = '' + 0;
                if ((jTemp[1]).toString() !== zero) {
                    _this.items.push(jTemp);
                }
            }
        }, function (err) {
            console.log(err);
        }, function () {
            // this.excelService.generateExcel(this.tripsByUserAndDate);
            // this.spinner.hide();
        });
    };
    PickUpComponent.prototype.splitDateFormatMDY = function (dd) {
        var dformat = '';
        if (dd != null) {
            var d = '' + dd;
            var arr = d.split('-');
            dformat = arr[1] + '/' + arr[2] + '/' + arr[0];
        }
        return dformat;
    };
    PickUpComponent.prototype.splitDateFormatMDY2 = function (dd) {
        var dformat = '';
        if (dd != null) {
            var d = '' + dd;
            var arr = d.split(" ");
            dformat = arr[1] + ' ' + arr[0] + ' ' + arr[2];
        }
        return dformat;
    };
    PickUpComponent.prototype.generateExcel = function () {
        var _this = this;
        this.tripsAll = [];
        this.pickUpService.getAllTrips().subscribe(function (data) {
            _this.result = data['_body'];
            var jo = JSON.parse(_this.result);
            var obj = Array.of(jo.data);
            _this.jsonObj = obj[0];
            var deletedTp = '';
            for (var index = 0; index < _this.jsonObj.length; index++) {
                var jTemp = _this.jsonObj[index];
                if (jTemp.deleted === true) {
                    deletedTp = 'Oui';
                }
                else {
                    deletedTp = 'Non';
                }
                var userName = jTemp.userTrip.nameUser;
                var tab = [];
                tab.push(jTemp.refTrip, userName, jTemp.statusTrip, jTemp.costTrip, jTemp.destTrip.cityAdr, _this.splitDateFormatMDY2(jTemp.createdday), _this.splitDateFormatMDY2(jTemp.getedday), _this.splitDateFormatMDY2(jTemp.livredday), deletedTp, jTemp.packageTrip.valPackage, jTemp.modeTrip);
                _this.tripsAll.push(tab);
            }
        }, function (err) {
            console.log(err);
        }, function () {
            _this.excelService.generateExcel(_this.tripsAll);
        });
    };
    PickUpComponent.prototype.generatePackwaysReport = function () {
        var _this = this;
        this.tripsAll = [];
        var dt = new Date();
        var monthDate = dt.getMonth() + 1 + '-' + dt.getFullYear();
        var costByMonth = 0;
        this.pickUpService.generatePackwaysReport(monthDate).subscribe(function (data) {
            _this.result = data['_body'];
            var jo = JSON.parse(_this.result);
            var obj = Array.of(jo.data);
            _this.jsonObj = obj[0];
            for (var index = 0; index < _this.jsonObj.length; index++) {
                var jTemp = _this.jsonObj[index];
                var ctf = Number(jTemp[2]) + Number(jTemp[4]) + Number(jTemp[6]) + Number(jTemp[8]);
                costByMonth = costByMonth + ctf;
                var tab = [];
                tab.push(jTemp[0], jTemp[1], jTemp[2], jTemp[3], jTemp[4], jTemp[5], jTemp[6], jTemp[7], jTemp[8], jTemp[9], jTemp[10]);
                _this.tripsAll.push(tab);
            }
        }, function (err) {
            console.log(err);
        }, function () {
            _this.excelService.generatePackwaysExcelReport(_this.tripsAll, costByMonth, monthDate);
        });
    };
    PickUpComponent.prototype.getCaisse = function () {
        var _this = this;
        this.pickUpService.getCaisseService().subscribe(function (data) {
            _this.caissse = data;
        });
        setTimeout(function () {
            console.log("thiscasse", _this.caissse);
        }, 2000);
    };
    PickUpComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pickup',
            template: __webpack_require__(/*! ./pickup.component.html */ "./src/app/layout/pickup/pickup.component.html"),
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
            styles: [__webpack_require__(/*! ./pickup.component.scss */ "./src/app/layout/pickup/pickup.component.scss")]
        }),
        __metadata("design:paramtypes", [_pickup_service__WEBPACK_IMPORTED_MODULE_1__["PickUpService"], _excel_service__WEBPACK_IMPORTED_MODULE_3__["ExcelService"]])
    ], PickUpComponent);
    return PickUpComponent;
}());



/***/ }),

/***/ "./src/app/layout/pickup/pickup.module.ts":
/*!************************************************!*\
  !*** ./src/app/layout/pickup/pickup.module.ts ***!
  \************************************************/
/*! exports provided: PickUpModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickUpModule", function() { return PickUpModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pickup_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pickup.service */ "./src/app/layout/pickup/pickup.service.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _pickup_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pickup-routing.module */ "./src/app/layout/pickup/pickup-routing.module.ts");
/* harmony import */ var _pickup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pickup.component */ "./src/app/layout/pickup/pickup.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-6-datatable */ "./node_modules/angular-6-datatable/index.js");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(angular_6_datatable__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var PickUpModule = /** @class */ (function () {
    function PickUpModule() {
    }
    PickUpModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _pickup_routing_module__WEBPACK_IMPORTED_MODULE_5__["PickUpRoutingModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _shared__WEBPACK_IMPORTED_MODULE_4__["PageHeaderModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_10__["NgxSpinnerModule"],
                angular_6_datatable__WEBPACK_IMPORTED_MODULE_9__["DataTableModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"],
            ],
            declarations: [_pickup_component__WEBPACK_IMPORTED_MODULE_6__["PickUpComponent"]],
            providers: [_pickup_service__WEBPACK_IMPORTED_MODULE_2__["PickUpService"]]
        })
    ], PickUpModule);
    return PickUpModule;
}());



/***/ }),

/***/ "./src/app/layout/pickup/pickup.service.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/pickup/pickup.service.ts ***!
  \*************************************************/
/*! exports provided: PickUpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickUpService", function() { return PickUpService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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


var PickUpService = /** @class */ (function () {
    function PickUpService(http, httpc) {
        this.http = http;
        this.httpc = httpc;
        this.url = 'http://147.135.136.78:8052/trip/';
    }
    PickUpService.prototype.getNbTripsByUserAndDate = function (sDate, eDate) {
        return this.http.get(this.url + "bydateanduser/" + "?d1=" + sDate + "&d2=" + eDate);
    };
    PickUpService.prototype.getAllTrips = function () {
        return this.http.get(this.url + "all");
    };
    PickUpService.prototype.generatePackwaysReport = function (date) {
        return this.http.get(this.url + "statbyday/" + "?date=" + date);
    };
    PickUpService.prototype.getCaisseService = function () {
        return this.httpc.get(this.url + "caisse");
    };
    PickUpService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], PickUpService);
    return PickUpService;
}());



/***/ }),

/***/ "./src/app/layout/pickup/revomonlogo.js":
/*!**********************************************!*\
  !*** ./src/app/layout/pickup/revomonlogo.js ***!
  \**********************************************/
/*! exports provided: logoRevomonBase64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logoRevomonBase64", function() { return logoRevomonBase64; });
var logoRevomonBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARsAAABQCAYAAAApxdE6AAAKOWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAEjHnZZ3VFTXFofPvXd6oc0w0hl6ky4wgPQuIB0EURhmBhjKAMMMTWyIqEBEEREBRZCggAGjoUisiGIhKKhgD0gQUGIwiqioZEbWSnx5ee/l5ffHvd/aZ+9z99l7n7UuACRPHy4vBZYCIJkn4Ad6ONNXhUfQsf0ABniAAaYAMFnpqb5B7sFAJC83F3q6yAn8i94MAUj8vmXo6U+ng/9P0qxUvgAAyF/E5mxOOkvE+SJOyhSkiu0zIqbGJIoZRomZL0pQxHJijlvkpZ99FtlRzOxkHlvE4pxT2clsMfeIeHuGkCNixEfEBRlcTqaIb4tYM0mYzBXxW3FsMoeZDgCKJLYLOKx4EZuImMQPDnQR8XIAcKS4LzjmCxZwsgTiQ7mkpGbzuXHxArouS49uam3NoHtyMpM4AoGhP5OVyOSz6S4pyalMXjYAi2f+LBlxbemiIluaWltaGpoZmX5RqP+6+Dcl7u0ivQr43DOI1veH7a/8UuoAYMyKarPrD1vMfgA6tgIgd/8Pm+YhACRFfWu/8cV5aOJ5iRcIUm2MjTMzM424HJaRuKC/6386/A198T0j8Xa/l4fuyollCpMEdHHdWClJKUI+PT2VyeLQDf88xP848K/zWBrIieXwOTxRRKhoyri8OFG7eWyugJvCo3N5/6mJ/zDsT1qca5Eo9Z8ANcoISN2gAuTnPoCiEAESeVDc9d/75oMPBeKbF6Y6sTj3nwX9+65wifiRzo37HOcSGExnCfkZi2viawnQgAAkARXIAxWgAXSBITADVsAWOAI3sAL4gWAQDtYCFogHyYAPMkEu2AwKQBHYBfaCSlAD6kEjaAEnQAc4DS6Ay+A6uAnugAdgBIyD52AGvAHzEARhITJEgeQhVUgLMoDMIAZkD7lBPlAgFA5FQ3EQDxJCudAWqAgqhSqhWqgR+hY6BV2ArkID0D1oFJqCfoXewwhMgqmwMqwNG8MM2An2hoPhNXAcnAbnwPnwTrgCroOPwe3wBfg6fAcegZ/DswhAiAgNUUMMEQbigvghEUgswkc2IIVIOVKHtCBdSC9yCxlBppF3KAyKgqKjDFG2KE9UCIqFSkNtQBWjKlFHUe2oHtQt1ChqBvUJTUYroQ3QNmgv9Cp0HDoTXYAuRzeg29CX0HfQ4+g3GAyGhtHBWGE8MeGYBMw6TDHmAKYVcx4zgBnDzGKxWHmsAdYO64dlYgXYAux+7DHsOewgdhz7FkfEqeLMcO64CBwPl4crxzXhzuIGcRO4ebwUXgtvg/fDs/HZ+BJ8Pb4LfwM/jp8nSBN0CHaEYEICYTOhgtBCuER4SHhFJBLVidbEACKXuIlYQTxOvEIcJb4jyZD0SS6kSJKQtJN0hHSedI/0ikwma5MdyRFkAXknuZF8kfyY/FaCImEk4SXBltgoUSXRLjEo8UISL6kl6SS5VjJHslzypOQNyWkpvJS2lIsUU2qDVJXUKalhqVlpirSptJ90snSxdJP0VelJGayMtoybDFsmX+awzEWZMQpC0aC4UFiULZR6yiXKOBVD1aF6UROoRdRvqP3UGVkZ2WWyobJZslWyZ2RHaAhNm+ZFS6KV0E7QhmjvlygvcVrCWbJjScuSwSVzcopyjnIcuUK5Vrk7cu/l6fJu8onyu+U75B8poBT0FQIUMhUOKlxSmFakKtoqshQLFU8o3leClfSVApXWKR1W6lOaVVZR9lBOVd6vfFF5WoWm4qiSoFKmclZlSpWiaq/KVS1TPaf6jC5Ld6In0SvoPfQZNSU1TzWhWq1av9q8uo56iHqeeqv6Iw2CBkMjVqNMo1tjRlNV01czV7NZ874WXouhFa+1T6tXa05bRztMe5t2h/akjpyOl06OTrPOQ12yroNumm6d7m09jB5DL1HvgN5NfVjfQj9ev0r/hgFsYGnANThgMLAUvdR6KW9p3dJhQ5Khk2GGYbPhqBHNyMcoz6jD6IWxpnGE8W7jXuNPJhYmSSb1Jg9MZUxXmOaZdpn+aqZvxjKrMrttTjZ3N99o3mn+cpnBMs6yg8vuWlAsfC22WXRbfLS0suRbtlhOWWlaRVtVWw0zqAx/RjHjijXa2tl6o/Vp63c2ljYCmxM2v9ga2ibaNtlOLtdZzllev3zMTt2OaVdrN2JPt4+2P2Q/4qDmwHSoc3jiqOHIdmxwnHDSc0pwOub0wtnEme/c5jznYuOy3uW8K+Lq4Vro2u8m4xbiVun22F3dPc692X3Gw8Jjncd5T7Snt+duz2EvZS+WV6PXzAqrFetX9HiTvIO8K72f+Oj78H26fGHfFb57fB+u1FrJW9nhB/y8/Pb4PfLX8U/z/z4AE+AfUBXwNNA0MDewN4gSFBXUFPQm2Dm4JPhBiG6IMKQ7VDI0MrQxdC7MNaw0bGSV8ar1q66HK4RzwzsjsBGhEQ0Rs6vdVu9dPR5pEVkQObRGZ03WmqtrFdYmrT0TJRnFjDoZjY4Oi26K/sD0Y9YxZ2O8YqpjZlgurH2s52xHdhl7imPHKeVMxNrFlsZOxtnF7YmbineIL4+f5rpwK7kvEzwTahLmEv0SjyQuJIUltSbjkqOTT/FkeIm8nhSVlKyUgVSD1ILUkTSbtL1pM3xvfkM6lL4mvVNAFf1M9Ql1hVuFoxn2GVUZbzNDM09mSWfxsvqy9bN3ZE/kuOd8vQ61jrWuO1ctd3Pu6Hqn9bUboA0xG7o3amzM3zi+yWPT0c2EzYmbf8gzySvNe70lbEtXvnL+pvyxrR5bmwskCvgFw9tst9VsR23nbu/fYb5j/45PhezCa0UmReVFH4pZxde+Mv2q4quFnbE7+0ssSw7uwuzi7Rra7bD7aKl0aU7p2B7fPe1l9LLCstd7o/ZeLV9WXrOPsE+4b6TCp6Jzv+b+Xfs/VMZX3qlyrmqtVqreUT13gH1g8KDjwZYa5ZqimveHuIfu1nrUttdp15UfxhzOOPy0PrS+92vG140NCg1FDR+P8I6MHA082tNo1djYpNRU0gw3C5unjkUeu/mN6zedLYYtta201qLj4Ljw+LNvo78dOuF9ovsk42TLd1rfVbdR2grbofbs9pmO+I6RzvDOgVMrTnV32Xa1fW/0/ZHTaqerzsieKTlLOJt/duFczrnZ86nnpy/EXRjrjup+cHHVxds9AT39l7wvXbnsfvlir1PvuSt2V05ftbl66hrjWsd1y+vtfRZ9bT9Y/NDWb9nffsPqRudN65tdA8sHzg46DF645Xrr8m2v29fvrLwzMBQydHc4cnjkLvvu5L2key/vZ9yff7DpIfph4SOpR+WPlR7X/aj3Y+uI5ciZUdfRvidBTx6Mscae/5T+04fx/Kfkp+UTqhONk2aTp6fcp24+W/1s/Hnq8/npgp+lf65+ofviu18cf+mbWTUz/pL/cuHX4lfyr468Xva6e9Z/9vGb5Dfzc4Vv5d8efcd41/s+7P3EfOYH7IeKj3ofuz55f3q4kLyw8Bv3hPP74uYdwgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB94MCgwYB1vILgQAACAASURBVHja7Z15nFTFufe/1QMIAoPihrujcUVFQ/dAVFQ0GhOXa4zRae0oxywkJJ57E71vzBuNuffNzapZjlFDEnPA2zpjXBKjJkajxjVCHxVcoqI4GlxRQAcREKbr/ePUmamurrP0zLCI83w+85nu0+fUqfVXz/Orp54SDMqgDMqgGFJwZ7Ga1Qxj2GbAicCxQA64E/hD4DnvN5qmGKzWQRmUQYmTvOu/CmwvAKkAQ8IqYFzgOe80klZusDoHZVAGxQIyIu/6DwnYHgU02v/hwO/VfYOazaAMyqD0C2xGAm8pYKkDDQU6QwPPWTuo2QzKoAxKf6RJBxqhaSay93Nh0IwalA+NTJhx6WAlrBvpBnpIYFkLMtHnxwfBZlA2WTlIgcuEGZfuddCMS8+bf8V5g5WybmSlgGdN80mThyues6IRzmYQbAZl49RYvnJJ7qAZlwpdezloxqVD5l1xHgfOuLRJwHygNFhT60YCz6lKmES48oSu4Sg5I+/6BJ6TOc0hg9U6KBuhWbQlMHveFeedBDD/ivOYMOPSHwB3A3cKOFDxCWMHa2zdiAKSlXnX3wb4InC2DJWbduBXgee8PVhLg7IpAM4NE75y6cEAE772s+ianPDlS7ec0GtGyQkzLr1+sLbWPegMlAwufQ/KxgY044DXBAyRUnbPv/J8Jsy49GLgu8DZwLXAOAGLpJST5195/pzBWvtgyCbJ2RQsaDyQCD0QM0O+gTxuqLyvd6D5yiUAZwlYNe+K87rnX3k+B8649AABF6ul16uATgELJSyYf+X5cyZ8+SeqzWeRd33xYa6//kjX9N2M7y0D/g6xoQZgI8RSQjqnAD8RsLuEN4CTAs+ZO9H1N88hfiORZ6hbrwM+J2BNZQDe24d8/pCQzOxWdf488Gnd3VsNiLHAT4Cj1EQggDmB53z2w9LpD5pxaQdwuoTHgDcEHAc1xGTkVDZZwJx5xmpU3vWXAO+qr6uBHwWec5U+EVU8h7zrfx74OjBam3gPCTxn0YcDXFpontmpfz8EOJrQd2YFcHPzzM4O877+yJANBTSqsR8KPOfpPqZzMnCjhpbbAXMAIeBhkAdono6nA1dVPOfO9a9lzRIS+XFgR+3yzsDNwJHRBVUn9xCSn7r87MM0w0pYo7SYg7Vrf6Ra/Qq53F8ELK7CmY9fcd5bFo32GBkCtk4c/yLv+tcHntMFREDzDcDmoPPKplqvy6e3MFqBRteZ2wCM6Zre0gKcD5xpeaSta3rLoc0zO88dqDwM2UBAcw7wW+B44Ok+JnehOeOpd3wOOEDW37/1hhk8MidgW0tem418f8wCNAA3fYi0GqpwkYCSqqtuoG3+FefdoG45WL/X1GpkuDvZ1ICEhS74ouX18wPPqW6qdTt6ZicrpreM6YZvAI4C5JEpj32ta3rLncCfBkK7ya0vkFGyd971bweuUrNX0I9kdxD1NuE/CMlDm504r+DO2iB8jYTtLOD3R+P7KZYkVgJvfVg4h3lXnMfjV5z34rwrzhPANvOvOG+IBjR191o4gakG+ACsyMF7Rj/cx5LkdZuwyXR21/SWZ7rhbeA7SrMemfHxzw6UGbVOwUYjakflXf8HwDPAJ1RHWFjxnMX9SP4BYwAvlnBEDv4q6zvcbwPPebriTVuvjax4qT2BYZafbzS+H2+5Z5lAvB9sAJ5pQ8t8i5mUAuzDJGxlmWTenKtiryitekK0z0fU3nfDJgo0XwFmAXv3MYlDIo5nowWbfC8Rd5aAJcAFopaP/s9+agxtwMWE2tEFwC6B56yZ6zmPAwcQBvm5DcgHnvPFDagdFG3WVeA5T2m8zmYxZt7SijdtDYOSpT8MI3QGxDBZbzFn6mifj3bPauDFTVSDvKCfq0C7d01vGbnRmlEaNzMbmC3VzC57m7cLuK2vjatm+mrgOf8deE4h8JwfqQ4TvfvJwHOODTznhMBzHtGeWe8i4DSLWfeMXlcSuTkwyvLs3xo12T6My7yB5yAQ41C7lIVW1wJhmqufsZhab6j+tClWzy6y/2n8x0ZlRum+LQpofipCnwmbHBx4Tr/Mg+jZ6L3R96Q0swzE/g5WvR7y7tVNwD4Ws+5poxxbACPq1J/6WTmxPvKufxKwY971R7W6fkPkf1y5W93ZQ1tdf3irO3t43vVHrAtOK0kOdGdmffbTEcDogZ4q3rSHtbbZjNpVwQiYXickozdFWT0AaUwfiIz0pUN+ltC5KvIZWZCDQ6uwRrvvCODrsn6mBvh2xXNeGAhfG81U+45C3wjb5gFHBZ4jLQPyI8CfgB0AKWBzCRMDz3lSu2cc8BeghfoFr5oOrV1aDBwtQfPT6G6JmVXm2fgaM93Ac+5usEpuJlw6XlOF7rzrR6srUiCERNqyUwV+rLRDUzO9vEp1WnhPNRq/zeqeM4FzgH2BEcJWUYkKH9dH5m1SP3jcm07e9Zfp+RXwjYrnzK4FZnkq9Xl4Vi+PhDEChlnA/+FNmBe7B+WrlCJrE/Bgq67pLVs0z+x8e72BjeqAE+l1hAIoVOG+wHM+pl073db5JMwWiOvzrn+gOTsZMU5reIvAc162dcomyBVc/y6p+asoedkEGvW+owTiLt2gk2G5ngTIf9WHJg4BHsQOlLEDSsAYCfcHnrNbpOFI2DXm9rnG91Msab+oD5SM8iywt4Sh9VqSTCrPD/Ou/2TgObdp7fxLYIaRzN/yrv9RAX+Rajnf5EgaAJ0v5F1/SeA5F6RMKOOU5qelLWblXf+ZwHP0rQqt5rsFYr6h7W4BbGZ5ze2bIsooUrcI3Eu9W8UC4HrgbhD3gvweIfdpk82BcYSrWevVjLJF5zrI+L5vzLNnS+QCYL4KEdDzJ43/oveeRXnX/4k54A5xr6E79Bw+XBh2OnBHrWkzK/r4U6mGnWbe/bMHTC93AC6yZVxSF4fVJj3gojyVD7Ld1BQu0esy1QSBCJAamXEF/DSrWiHry7Fz9GGi6w8Dvmp59B3gEWDbWh5K1NRTjOuB1UrLoEnvZAKaAs6PaPftgXVyk6YGeYRN225i+B2bItgoUved5pmdExTo/Br4FrBF88zOvZtndl4Ygo3sBu5KSe7s9cbZaFrIR3vJtx651bh9r7T0ZIbftdnyS3nXryFQH/LOjAZzzgIENTOVtuQ9wfL+24zytWYcKFk0lqNsA3aO8mZV7901pl4qjZqUQ0JHyS5SBrs0AAKDRxJweMxrPoMFqEytSWZv59sz8HJxfelhrd32sQGqgMcMbudkS128Nscrdre6s9lEAUeq/x3NMzunN8/s/GHzzM53oqXs5pmdESilRd07d72BjVKtRwFbWEwK08t1B5kys6YNZFHbIdYqm9KUE6nRagTAqsBz3jQJRGX+2aTHdJjo+jUxUqQln/XfhV4XdxvANdXy7F8MAD8gJl9PNkJWB57DP0IP2B0It20kDnZZ/8vjWp4mE6OhZGm7rO0qEH/I8MjHY8q7UAOk/W0aloTHDM3wU5akHgSY653Nh0nMpezmmZ2LqeEb62Rk1/SWndanGXUSdhX8b70mi78jMQPSprUk3afJksBzVlmun2BRr++1mR8CcYzl+W7gX/lz/WggnGSZ+STwAvAc8JwM/7+mD1ot1w9F7y64ft0Kk8rnLcbMfWBMmZ/qC2kZeM6KwHMmExL5DxAusz+n/hagxZXVZFXgOcu0PB1k42EM82sVsFBpRHV/ovfzU/RujKxp94o37bkMGsUxor5n3G8A2McsAFoNPOcNDdh3iEn/gU0RTNrKtUp2sVzZpViuTCqWK0e2lSuFYrkyDuA75bf1e3+ckuyI9QY20WA0+JHlwMpowFY85xWgM24WFYkmirQQjqJH+9Blknv1SOyR2u6zmRgSOdVy7xpgaXBZz6A+2ZKvFcp03Fsg9ib0xPxpjNnwYsQPSThW2Av4mJk928zf193HedePSOUbgCnAfirPewees3cM2Jgaxt628mnm15VIRgN7CcR4AeMx/iSMFzA+8Jz9gWWWdz4CUKWaVBYB7NTLs/XU6B26BikV2Bj1eHNSPeugHvXdTQlkOkqttJXnNreV5/6gWK4sV2PyYeAeEWq+rxXLlb/9d2kLOko9zMFVSZZv88zO5/qTtyENdGIhFZ9h8CPLgVXRgNVMg0nAGDtfUF8iAVKGjPeVtSSmtA0GuumOIxfnTXKvZo53lnl9J8t7V0VhHia5V4tuulstNf0u8J6+upV3/Y/GvPtfGj90jKzXCtYIxJKonpQWkbcM7D7vTte1IfW5J9+t7uytqlRHWR67wcjTvvFcmpwSeM4DDfSbzYCdLaZ3YNNATULX0hd6JpTAczjY9YeiCGuj7Uxnvjgz+jltsvlAgosGFgjEWcVy5VSlne6cYs0eXSxXlgATm2T3izxQXAVcHUMGH9nfvDay9D3cBh6Ey8xrjQ6+IuIvGpGC659r40kCz7nPnL0VmNWo+Upe0IGm4M6iSlUIxA6WmCh3aOC1WUz5FgWeY24ZsG3kWx4BV/5cHwEHWojrbkl1iT7IBOxsAbh1Eu6ySvXf4kwJzbemhfDMoJp6VZ+nNgI0Sg4wzSfVvo/lv+YT/NI+0JW2cZS1GPBq9KWpZ0+ZQNS6NNw71b2Be7xTo1sPtJWp4jkvfZDApXhNhfYzCxHQ5ARin2K5MonQ5+mwOHshgWcbC8x7V6wc+88tJ1Qn//CP07qmtzwNfI7QxeUN4DvNMzvv1cNUrGszajjQbLiCQ7262meRcJqF0+mMmb0PiiFBX6CWFyBHbiTKV8N4Rh/UcWDzJ8s126a262rUtJCorSNhA++cbg00j4nRWf+8jvrqiRYzdjmwUtMw2mw+RRJmB57z9z68c7ywdH4JT8QBDYDSNvIxY+d17fvxprEuECuBd+/xTtXJ+gmWMj240YNLuVKjxbSfWaB4TWXPYrlyjUCsVZzY70ygkdmAJpIxwxl12eQf/jEyl37UPLNz/+aZnbs2z+xsRa0aju7n/qhGwGYfYIhlyXMg463YkDluSW4/y7UXArXD11D9P2PjiUStebYnMFSYZLWsBdO8629H6ORk1Uby5/aYIjtSP7DNncUnWdJ5D3h3oPc4tbqzc2hktNaO76rBGeX1NIsW8h7wpb68V8DBMYD6RIbHWywDZXHgOe9qnE6hHkTkKhGCqG6mtcSZjxub5F2/h3tpLxU4o1wZWyxXLhCIB4vlyhIpWQCcEYcjMpUbtbbTcSa4aVzNgJRLNFABPyGM6lU3c1HrUWwotPEvNu7YBsteIAGzZMjj6HldCQQChhpptAu4xPCgXQNcImCqcW8XcGTovi7WgPyygC9acr0/vZskqwogLrQU6VDC1a0qsAfhkRc1lSxht0BT2wuu/zTG3imltu5iA82YdjkYewgLs46HCfiTNDQ8whWjs9XEk1ObPzc3AOd5qc5oElhDdBLT/qsV6fhRI1/vVDxni6TBpky696hfAbkF+C9FATQpPm9bk7cLPOdgLb3DMFawlOwaeM6/1iVo6JyUmqh2AbZXfWQ3Qp5yLOGWj5ESvMBz/DPKwXCJPEvC+SKcCNe5CBhxbamwal2l3whnc2LM9acsmkSqe39W93YJ0wj/6u61kMxFaYR0SEi/GXhUainF3PdkWj5VWR9MKeuqwHNe0gbSZlILiaDJm1mBRr370bQ6TqpzAftKzRlR2tP5CMqJzkzDfr+05FP0/CJTNApVP1uZQKNA7EQsEfmMvN9k/H6KtGuQiwd6QBXcWboTaU5tt/iWgC/JmElBq+frFNCMqVJ9WSBGieym0EDQGF/FHi51/YFNPnRf37tWFRJ13SoODJJmP9lYZWQBkZrOJ+OBydxHk5ibFEC0Ov8ZzzyvDSSUNjLGMihva2Dm3Ff2rVNlKldSPcvsYGiuJGU1vZ0sIBbTtjcYv59gKccS7I6i/dJkKt40TnL/Kl7l1SsVn5TVEe7NwHPaVDkXCsQoc6SJAYAcPR1Lv/3GugSbXJYKRHmU1hJPsgZMGtFW4me/xjpw0mCSDQy4pI6cNV8yHYAW6jO3CAO0D7fUy40NtN9ROr8kMuY7bl9TiraQqV4yvFMCczNwUl/ra6eueM7Tk1T6raFX+NaWciwezZZrBwpkIlM17/oXvMqrVcKwDDslAKIpruJMbkOLOJjUThn26hGXToy2tG1bee5WxXKlh5M0nQPXGdhoNueJ2FVwa8Zl6swjMgOIaGD493eLhJk30YfGTMjPn3XnMal2eht5Whl4TqUBcnhf3WyVmcqXvK/JppWKBupbpg+IJcCKOP8a5ZS4QzRQ+zCXPwAwR2mQ1ZBv29xSD/97j3fygPEyedcfQ3g6ww+y9FZZ/9tDbeW5O2NsqZAZNHjRB801pl6bBGIXidymrVzpKpYre0qkGCjQyWWwnYejiGGRqL2ITB1dxFaByGyiJHkkx/2XxLP0IoFvSlJdG9gndFngOb82nMeKlpo4ocH2+1kjAz+mk6fOgHGA1IgmqsnhgeesTOpzwL+jfH0afN8qJKcV3F/raW2NCiuhPX9NxXN+MRCztRojewGvCyO0q2hswL8iEHvG9bHGtJc+a+UCOKWj1PpS6GPLghy5yunlOTsqj+R1x9nkw2hvT1oKu1Z1iFXCAIDwXjsUJXEbtQAiamZrmcgFpM+oIgXxZeLMIGM1rzRNSv3+z8BzHrbEpbmC3uhwawTcVPGcFdogydLRFyoC8lNm1catGtnqNKxvDKc4O8krjS0lAhH7hFHvq4EbA89ZZYvRE10ruH5Jwv8xtWYJv5eh/1FTTPrLA8+xOUO+D3xBIKTK4bOB5zw4UMHbCL10nzXyGqvRG/UXEK7+3Rp4Tvee5Upzf0z5BPOokfunAxcJxPGEYScm5si9XCxXfgz8N7DC9FruCwjWLNXlXX8nVYmbWzrxRYHnfI9BGZT+miHn+gSXObS6s3NVqhcI+B8LSK4EthOI5ev7hIw0Kbj+3RKmZnH30CbquwlPRH1PH3fFcuU4tKgAfQWQvpj7Rvq7tpcK/zq9PGdsjtwiDQPel8jJHaXWx/ptRmlAUyb0xN3ckrEfBZ7zvQ9qYO3Bc583orb4Wgg0edc/pEp1EQbQqP62nNDvaKMDmrzrHyZ7wohkIhX+CuwceM4nAs95L2/EzwZeStMIGtGu+6RxhPLptvJcritNWkq4nSaKYzxMIB4tlit/6QuPkzMq7/PKkepMNG9aJcuBswPPuWCgzupeTx3i5ILrP5d3fZl3/QWsJwepQcnU+7bLu/6NhNsGdrB0/NuaQse7tzbSEnyvARD4euA5x6FttTDHUHup8DTavq8swJCi8WTajmHJ+zGRmdReKizNhQ63S7RbjiuWKy8JxMRGQCenBuRmedd/EPit0BypZOgN+w7w/cBzmgPPuboRTmEjAJpTgT/I3hCSe1If4mFQNoBmmXf9Y9TAO8Xo6CsJtzLsE3jOCVXEso20HEOA3eMGvLEQ8dnAc35ecGdlGTsT+2ENdQGPSmSxvVQQ7aXCYWr8xrBqsQCWBzijHB5Ye22psJww5K3ubLoLELSVK5/qKLVatznUgY2qtAWok+9Udl4mXIHaBdg28Jxvj3f9mmNKPiDyX5Zrm7UO8JEkg5Jd1OrNKRhxogkd/aYAOwaec2DgOc9GTnIbqTSh/KSSVv0kfDPwnBsMz2KrFMsV2kuF16UlfGlC+l3AhRK5u4Qd2kuFiR2l1g69yntBJDPzs90Z5crO15byer5WSORRlkWA24rlyhXtpUIq4Ii8639XwMUgHpDIduCWKHBTQR2V8gGeRd+k/qTJOSqS3aBsGK1mjIC3FRfzv8BNgefcpd/zQdCcVZyef1G/L0uXJYTOm91Zy9RWrtARDtwDCL15zQiTqwl3Yd8p4faOUmFhfFpzEYiLCFeRGlWTvI5S4d8tgPhV4JeWR/7UXir8mwKmWLB5RMLJj/QxMtxG3iHuR9tJLmCJgK3nfgjPzt6I2uQMwqiBF3+QwMVSjibCUKstcaaJhMsDz+mTJ7Q+aNvKc48RiK2AJ9pLhacaTGc/LPsXbZqSofd0tZcKY8w8ifCAgWewc58PtpcKh0Uajgk6OSD/iOcs2tRWaVR5jib0Z5kPXFRF7jS3d2/SoGwYaY+AJjKrPqDmYDfKB83GfShz47I+V1KpQJsatB2l1jvbS4WO9lLhqSzciJHOP2UYzC6VtzF+GV4sV7Yz83RtqVDFfpwTwKHFcuWeWM1mU1fb9c6cxW4elEFpoH9NjDgR2/7AiudsFOOrWK549O0olkPaS4V/2DSuYrnyG+ALtdpRzybPG9tLhVNNkyq3KXcGc9YcBJpBGeCJ7BHgKZtXtty4snttXx6SyHNsGlexXKFK9ZJ6zaUHWz9TLFdmhNrZ3A0PNrops67MGhXJbb3lZ12UQzvNs1/vMsu3MZuSljO/+pTOxIzPNdJPLBPZhTI+3e03Aq0GwqOcG97hLhBfiDPxritNepb6Qxl1ubxYrhzapG1xEymNMJTQk3jH5Exlj4siYJEizn5svGse8WcoNfo+ATwReM6BedfPEnHit4HnfMnIj08YtEsmvE8I2B1EZ8WbRt71jwT+n0AcLJGbR2ifZidb0heEO4h/F3jOdywR36Il5NVYzvW2SCXwnElG+cYSrpZkmYSfEJKDKpfVn5/e6vrbV+FXhMvWW/RzbCwTiD9VvGlOL9iGK6J5118DNKW0vQCODTznTvVsTob7z5LK+FbgOdv2Exz/RsgPmvKNwHN+tpGYUkuwH32UKFWqO1xXmvRaTJonYImuqZlUS9tLha1SNRs1mwwhjCYn1MAS+ufoT2rXqblH9HyWvf93AX6Ud33zrJ8JxKRjvlsm3KcB6G15158sejth0t/rxsyfAz4ZdWAZkw8BrIGXFNAcQngmz2EgR/amLevqzFIntvzvCFyUd/0jTXNQAc2nCQNwJdaX+m9r50u0AVqTL8vf+1JY+0hLNfR4PUnvJ43+ae8eK5HT8q5fjtqjEm7O3EP1RSEt/dCot72iUB6yN051Ut8M+qd5+ohwI+w7lp+/knd9MZBaZN71h+Zdf1ze9XcsuP6WWbU/iZzZl/flyNkOAYjMo8fiNCZlUo0tlivl6P5cipq4mYCRuh1qMu5JIQv0qGC9Ld1z58laRe1qSyMuHESSy7YWsPxWoDXj9v7XjQHdjBFX2WaLS3hmnudUW93ZY4C/k2K721SsDOEALqax6zXvVf+HGR12OEY4ixT1ZrWw31JuXDVP11JF6GCa0/J2ok0bxN7/9tBCeYyPDynSE0qk0p/BL0NAfB/l+WuUb3dgiwHaXU7e9S8jPMfsX8CLMpwkO/Ouv2eGd/y4gfbWxbpfS21neA/7oYc1uNRWnju0o9SaytkcHReNL2uITqnF99VDSRid98isFWAbsNI6yOTcOBPDkl9TTdwFtQk1BQzOVarmPkK9S/Shs4qeCL2ZO9+YLCZngsfoToT7XTKbN5X6kBBborzOM9nkMZ1cZrvtRBuIxrxvV+3zvtICSrK2Hz3RH80jCvOqzh4/wchXE5Zd3H3grg7Mu/7rhNELh6l+PUR93k3AgrzrXx6n4aiQEG+jzvJuYBf5U+2lwsqEtlxDb5iUOGmKznTPpcxCn0pDwqx8jaUzVkywSZqdZcrsaMgDNvUuIZiRCTZfigMy7V1dQmkzQF5mqCcSATn2jrss1z4iMtS5xhWZgbb/hwbyKcC2EfIoSN6R3FetR8JSI7nDs4F2z0QRyTZJIKzufzG7d2+gk651ZHHgObehjkTRyjQp7/ptkcnVByAbRXhU8XYiGcBn5F3fC2MCzbJpIaBO/GggNs6XMrRXluSObytXxuVSXvaptM6YVRux3NuZd30mur4QlllaNDA7Wu7/jH5cLjHamCavGmlNz9CpF8heQDu8kXoS1gEm44DUdmDdiTKlkY3gWD3tPNH1Rwt1GGCWulWTie0UgsPS2l9k/M2i2T0RtZ8isoc0oCXpYDParhnXnKbxYgN0aa5YrhwRtw9IaTh/lbC/MbG1T3L9kY1u/VGrZHdG5c8w1r6Sd/0tbS4ebeW5tJcK3yT0/s0iD3SUCg+l7OgeTsZDEwRMSiKIhxKeaZPZBm/AhJAyPGyMXOj+vBV9ALEY0+qHgecsTifM7JpN3vX3kDBEJM+8AJdqM+IRjYBwUmB4Q8fplvCcZUb8aiMDXCKbosEg4NPZYhXXBHB903LLhAwaSqb6t5yyoR+3vF2DQLatwb2laQ+Zw1d0lFqrwNNt5cpv1iCGakSpaVI9JcNtDD2nu3WraH5Zl+MLro8MB/JHGyj/ELSwF6Z2c0YIkBMl8p6Uvuq3lwpTDK3IAK/OqH43y1h9/5ak2eyecTZ5SZkt0V93RtXrjYI7CxmacltlyOxzhAeNPWD7E+H/fwA/jdtvI+I73BrbjJ0AIDLwHH1n7XYZYvu+3ptXcR+wPMN5T13A2krtsvfuaJtLRYa9vELNPqpOStkAvCZ3Ns1m+zhT2cj/vVo7LcoCkrnwGet7smi3edffJU6zMeSeRk09CW/m4KKhyFeK5crJ0WCMQEfrdy8GnrM7vcdT75h3/eeiEC5pk2ElPIHjIN0EFtmoi8/H/XBtqYBEvtdRaj1K9YMAeFWEZusi4D4Jh7eXCue0pWyL6Ci1IMPzxbPqGFOSwKYlSYPRvv9H4DlTBEypwrEiXLlIm9FeCDxnjVL3htN74mQSOBQDzzlcIKYAUwRiSvQZmCLD/4cEnvOm1uBDMmgby4x3HpEhL7+LOkze9Qvpg0AA/DzKc8WbdoRN/bTU2ztobL/qoGeSoBUkhTtQS/rHNGryxGg242wamXlCaeA5RwrElMBzphDG27W+U39urufo570e3Afy+dAIbFKOoW34TPWOUkFeWyq8Thh7+PJiufL06eU5I8yYLhqPc3LEbxHGVVpggFKS7JGBjjCBaLMU7SzacnCNRBYIFwu2lrCrRB7RUSrcX1Q7z5P5q7kC5LcbF9o0swAAEZVJREFUsEj2SLK39oxXezWqmabbIyTOu/4WMpsN92ctsU9k6ElrgZf7EN9khE21NwbFQs3eRsLHI4BICLp+/cdcn3+EZW5NMkVkLxxUorwr0m+ELYC4Ia+oDX89Hbjg+h83y5B2JK7WAS9plAeTQI7cYouJvUWGNO4M+0ZPm+2X4Z1PJnFDIoYDM+piMuFRzKNSDim8pa9kdnupsPq08sN7NNH0xxy599rKc9urNJ0DrGrTBqs6+/0e1eYXAheo0CeTA89ZGMVgjuk/L2c9xlErp8yQd504lnG/x4CMek78TyPnhgEiCRgmJqm8Kocr5nhnrQrNIQlhrJKhkqRzoAQSeat24fi4QaJ1oFUyXEYc3RqeBaRxCpKcWlSrUl0ReE7VlteE2f8Fzd5uVjOWSSLWpNcNd/+jd2bKZzRFdKbtIzbPYkud/d0gH5GqXWQiuMVG+W+L1mGydOLojipV04w6Ws+vDfhEyMvNC3kiEQHO/inlRdb7vRyeBlCWtv2Y+jwmoW+tBf6VNNjTJEduVXupcFyxXPmVQEwXdBfbypXzBfjA0h7TKtz7vSLwnG/lXf93wK+B5/OuPy3wnNnWwef6kftGt4AmGQ+sddYS61A6Sq2cXq7sI+BbWc3xaKzm6ompWTVgI2JUXvX9iWjmUmrhAdEqSZLfTa5Wnf5UbbrCMoAYRei+31UNeYAuieySyK7wWrWrSrULzQGxAaL5Be3zdJt9bBCmv320luNpyVDnqwPPeVcHG/18Ktu8oN73N4N8nJJUxgQtaVje9UcD2yedA2XjgARQrTejjo9T67Vra4B3A8+h4k1jknv1CDPvMbnoAZujw9WYsWYbiPSjC3dT30cnnNC5DOjuK9BEA0+t8nxZIpVGzCUSlrSVKz9RGkDY4K09OPtc4DlTFe/2zbzr/0PFxqFV43EeCcfTGgFPpRyRo9eHBP5zXYBMZCK2ledumQuX4jONMy1vr+TqiakelXf/ZNAAYJ5x+agM6tSyuZ7TXQj5js301QPdNyTuNKIEQnQ5sDqOeBPZwKaUNpBFvefurnEApcm9xvd97GS7rNHYAs/5u3HLxRnId9v1LQlDvaYQycLKAT3qOauMW0/KkI/3FUEMQDfdxyYBhfbc81EbvqM0FLNvkH7m9zD1fVScE6CEtxmAs74jwOkotd4FbCvh74rTPL9Yrrwn4PZiubJPZFbt2bp/pKUuCTxnP0KS9b8Krv9tM9ZS4DlSZjghU2uxPwKvDfQmWy2sxF4CYT11JQOn9oCVIM67/m4ZO3Vr3vV99fcb4DPpSBcuM6sVll0aXw2InZeXYoRfFJmQl+dDjc4fjorwb+MIlLwu1SyvNeiuGQg8E2wOzmB6vaW/R+Xv8KSGTZgYBBmWgW0njRrkNAV31pC0dlMDe7lx8uWxei4TjqR9KegddJPNAZbR03rYJHf2UNT+tZj6edk0ufsDOCgNsKNUmAp8k9CVf4REfgJ4uliuBMVypQ3YOuqjxXKFtfB04DkXVuGXhXC/2yjDdH4FmKovvMS0/82B55zSAPncCD9FsVz5DKGPTl83294Qtxo1NcF00hvto4Q7o6cRBtLZJr1Dhw50hd7TBBNVxAZkKcaye9pytOq4b6l7Nwe2Esmcwl3RMrkaEHtkA3XuNwDq4Ayzwny948gQ1Jqy1E1ffJ+EFTAEkXbSmw+5fVqdRnVl43lIPtieJuVkp97XGj3RYL8Y0U31fZHcB+4eaFPjOhVdT9L94ybYQoZuDlKjJdqBN4vlyv3FcmUCMGRfZV494jnvVDznD4HnvGueJxV4zt+lZKSEe0Xoe1UViKrSzJYDJwWec7IiowfMZDq1XKFYrmxRLFfmAjfojqR9GJ/3JIJNo/xHxo79RF6FDRC9R6zEqogixnSyvOuxuIqWFu5FXa8CkYlwqtrBHltegfimjbuIqwsR8auwuFDr+9NC4nsAeNy4/HGRsL1EINYAVRvJnuLJuzLFMFlq8HnjzPtjtIfbtBl6WDQjphDTr80JNzXWaI1pG1jtICvSXAIGHGxCLadAR2ky5VJhTUepMEWGvjJmUPLDZEhBvAE8XCxXZpxentMT+OUjreNrtcqQxO4OPOdIGU7o+0jkeHo3et6Sd/tOdPesHihCW2kyOw0NT8B4AxUGtB9niJ/fXiosGWIxoQRwQCPolXQmt0Wu1mbrSfGrVnqaMss2iXvi0ogjURUQRKr+f6Tk/+mKN+0VI7ToCXH5l7XvWFLpPW30QJvWJOoB90nDOfHfkz1y5VHAj2UNz1HPwRjvfVDC2ShTMqbulup8XmRii2SzEVm7AXG4gJEZNmGamxZ3SujIzyqtq4CVqJbWuo3yHXjOQ6xjCbmcwuPAR9rKlc8D3xTKpUTlaSwwCZiUI3d5sVx5ErhVwkNt5blPdZRaw5VSBSKKG1qG4RvWV9PJchLCbsVy5UhCx8DDksztLMfCqLp+tqNUuLRYrlh9YnJoQXbMJVpB+qbMhIBR5cBz5mmDaJK0EJQ2E0gmAEkc2GQAvyqwqtX1R1Vh3zSQNAh0gEMzvuMtk0SXMUCtlWtB1IEmuv42AvZMeddijA2XtjYwrlwHfE4k1/cSI4lDSZkggJWB57yjAfNwLKtoFrnN+L5jQn+bT+jHU0jrmxYN53XWg+iu/h2lwlXAVYq3+W1MfexPz74qQVt4msE9Enkz8GcQrxXLlbUSuVYiu68rTerT3tdiudIEDJHIIcVyZReJdATiCzJcSMgAIpk3JlWrdBcibSkObLZK6rBxjSuTn7kemGbM1uNrB5x1cLxBGL8jSYtqUkSahQJI5IO6c7CqqriBFLlFz7sK8zAkQyS+ecasc3QcryS12beqPE2V/f7ZtA2PVXhNZBvQerv9HvijTNZOl9rAJkVtXmgAc49LhEj28bm712Tz95WGWWvkfbUI3etjObqEZzfIqahqmbzj9PKcG3PkJqgJbN8UWmKqQEyVyJ8LxdEIxLsC8V6xXFkKLJSwSC28LJPIFQLRpR4frUjqrQRiBwm7C9hLXW8WiDGE53c3xO9lFYnc6/elycsjR0Ab2IxKmoWy8gEGEP3fwHN+YAzWPeIGnPH5u4Hn/CqtYHnXF5ad3iOSZj0B1TWwogkOifPCVf/fCDzHPHtnLNCUBMbql1s1zkNI5J5JQB19fsRzFmtE9HFxppfsvX+5CoGaqoVqW0beyLv+5JQ2MDWbfIZ+ZnIUn0wzbwiDQq3S8nh8ksYLvCPDScjSDUWaVvfohgCbSNMRiDXtpUIA7FcsV/KEcWo+i2VJ2dAmosiZW2qF/pioJ/WtmojIyOOl8TAZ0vknMKWj1LpUL7eNcDwmi8okwo6xUmZQXVE7V40Z/vAEclGvnExb4m0hJdJMKgndj4XPHRfHJ6j/51se3yrSnOKjwYXHk2oDbQjKq9XWUNr3+4yfPmYSngZAPKs+jkwDGo24/lbe9bfNYHIs1QB9p4x98hnD1+OTtpnTMB+XUev3cmKKJrRUmahdNk4hhch8akMGfNfNK4kM2kuFae2lwkjgLOBVqfbDNRq+o5GVR9kAuCRtDTHqfQ1wRXupML69VFhqM5lMOT4D87FCwn4i5uhRS6H3sUSwPywLysr6VZmBlMih79AEpn2Vrp1oMimJKJU9pKrzqGYORTNTrNovDKI07/r7CdjadHY0QPpWsz1lcudZLeBukS3AvN5pJmfszObK4H4ipa0lvCNqwWaSwO7UmQY2GQbVwo3lcLwIeM4Mydr/bS8VdhSwkwx91p5aF0fCNJKmqOtrMs5MvQvE7u2lwleL5Qq2ODg2Myo2Nq1OAAKvVDzn/bzrd5vciKUwO0HPEl4UV2U/mYHUE6Gr/Z7mnh6h+ZSqNN5H8pK5/JeySfG1vOt/jlqTqc75C3sw66kJ2lh0/a286+8uEE0SKQljs2xGwkyhPt+u3XKhtHA6hql3a0J72urjjWp4FPH4DHttlmpgeYjNzLTU39t514828m4fB8i6tzTwSM+K3blhwCxpNaN6UlhGuG+oK0OoDrNsz7ORSNf0FppndnLl/aeNunJ6y8nAOO4/7fXRr3ZeL27hpjPKle2UF/HRhBEtdyQjlRF3X3+4GVGzpYb3gWsAr71U6NlNELeRs6Zztrqzh1epjhUJNq/6bUnQ6w/xHMr9nnjOYwtgy+AyJ5olhVRaUVxl6YDQe5+0qsrqUxBc5hTSUNwAuE/W8glW+VmMiTY1DjS0m7cWsLDBnbtrgUWaJnQSJB+A1sSQyEN5eMZ3/PwRz5F5199PpmsE72rc0fgYM9P8fHsWld2ol7s1UNsazfs3zowKwjK8hgGaacATeM7SjQVsmmd20jW9ZTzhPsOeobB8h5aru6azf3Op8M+28ly/o9TqA5xWfnh0E03nyHAVcVe1KDAiyyTTH34muiTDcLiLgO+3lwrtAFmPBK4BmyrVXRIaV4/ddod22Qo2ls54NqCfobNdo2pdyn13ZbVVs55xpTrmFebvB7m/GSIQYzMsLaeq9Zb7V2hE6TgS4pNEBO7D3ufqqjtp8GlnGY23+yLVyHva5x2zdOhG60AHGwVq26gD7FPNOxEGgPp4AzzFnRuTVkPouDgvhsJ7rGt6Swv3n/5qBz1+NsuBXwC/aCtXhimwGaloiWMI4zHt0QCApNSZXC0QfwFuBO4S0NVeKqwAaCs/DDQlhqSwgo0KE7EzZPJX+Kt2eUHGvJ+jgc2YODIzWwB1q+Z1T3/AKkYzuTmsGx89Wt4QhkzUOZQkEq2RI1nVcysErFLxgSYnmUaq4+g+I6MyvEuvp/10v6gYk3OFVv6dMvaPRM3SVu+B57wc538VU0/LVHpzGpyo/rKxgI3SaqYltPEwYFrzzM7vm8Ry+L3wfrFceb+9VFgGdKg/AE4vzxkrEDsA4wRiK8LV09FCLYcb71mtNNguBeKLJfIViXzxutKknhVCt/wiXmk37f2TGypvTyGVd+ieGYf8HVrDL8jgcAewf/6r/pDgcmctRgT6Rs9ItsWB6dZiv/SHNDPyfn3eABolExsZYDQGcosqvQGzvp5BS3vNpi2L+IF9s/Z9S0sAcBPMVqiD4oZKbSWtEc0mIS/R9ccjrUbJkWltlSMXLck3dMicQNzOxiVHpfx+LPD9uB/jtIrrSpOWKuDoCUbWliECX5LoQNMXMVejJqUNFwHvBJ6zJlo6lKEZFTtwa9T3EGiA2oBZjZNUdZ12+aOes/pg97d9tltjBsqNMasWO/SXaEvIlb4me0iGJx7VlnGHJKnLqmwdihs5NktuZC9ntncWwE4DX2HfiPk345Ej0t411zs78kN6OSPIIBBrJPKVuPPTN4hIuYQM5uJASH+AZiDECjYyufM9Y8xCi+L9RWp+eVj7/Cmb+ZTU+Y0NlObnAOAxr+4c9KZGNRvtnTcF9XFcot8700Asy7lO5tKugEWB58xUYLBbFt5JIB5oIKzGI4HnvKE+f8K+klYboCrwnFc1bq5PAB6nlWrv93pOfTzXH0Z6OAzTHeKVtLyo8KxdwJoGQ8uuWxFidsodv2YTERNs9jWOyLV1GtPJ7v14h7iagXSLGkSbK/sxE09jT6uuW8V5hI60kWMZNZLvxP1Q8ZyrgOfTlu7TAr8bzy2WMNUWhkIkciDygfQh3lNjF2kXj7FpG8YSc0+9Bp6zWucE0kzGjI5jbxPG4n2pBzBFpF3XA7Mm9xm/P52FkyMk31dvZGPwT7qpY5RzPnCHIpI/8NKjdqvDwK6RsMr0VTUa8SazwwiYKa2nBfQQuU2yt6OOAK6ydU27KdObirmHSkv/DzEj+j4ETVGSIlaLERiE7ypgYdyRMEr2AY6ScJKAEQ0GdzIH3E3A3MBz1hqk3e8Ilxtjx1DgOcu0snRI5Ir6mpVIWCvgIQVmOeAOAXOj+jTjCatwG3/W+gcSeYYIA12fJbXNug1wYJGsIvSsvisIfbV66lmE/jWzBKK7VyOpk7LxrtnEnEltaILPD1TArIGS5pmdsmt6y0GEwdC/q+l9F4H4fvPMziqbiPx/wiHBDOTrzPYAAAAASUVORK5CYII=";
//# sourceMappingURL=revomonlogo.js.map

/***/ })

}]);
//# sourceMappingURL=pickup-pickup-module.js.map