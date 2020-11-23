(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["verifpage-verifpage-module"],{

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


/***/ }),

/***/ "./src/app/verifpage/verifpage-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/verifpage/verifpage-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: VerifpageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifpageRoutingModule", function() { return VerifpageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _verifpage_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./verifpage.component */ "./src/app/verifpage/verifpage.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _verifpage_component__WEBPACK_IMPORTED_MODULE_2__["VerifpageComponent"]
    }
];
var VerifpageRoutingModule = /** @class */ (function () {
    function VerifpageRoutingModule() {
    }
    VerifpageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], VerifpageRoutingModule);
    return VerifpageRoutingModule;
}());



/***/ }),

/***/ "./src/app/verifpage/verifpage.component.html":
/*!****************************************************!*\
  !*** ./src/app/verifpage/verifpage.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"signup-page\" [@routerTransition] style=\"background-color:rgb(250, 250, 250);\">\n  <div class=\"row  justify-content-md-center\">\n          <img class=\"user-avatar\" src=\"assets/images/logo.png\" width=\"150px\" height=\"100px\" />\n  </div>\n  <br><br><br>\n  <div class=\"row  justify-content-md-center\">\n\n    <div class=\"form-group\">\n        <label  style=\"color:rgb(4, 5, 2);\"><h5><b>Merci de saisir votre code de vérification envoyé par email ou par sms:</b></h5></label>\n        \n    </div>\n  </div>\n  <div class=\"row  justify-content-md-center\">\n    <div class=\"form-group\">\n      <input type=\"text\" class=\"form-control\" id=\"code\" [(ngModel)]=\"codeVerif\" name=\"code\">  \n    </div>\n  </div>\n  <div class=\"row  justify-content-md-center\">\n    <div class=\"form-group\">\n      <button mat-raised-button class=\"btn rounded-btn\" type=\"submit\"  (click)=\"testvalid()\" style=\" background-color:rgb(128, 185, 66);\" [routerLink]=\"['/login']\">{{ 'Valider' | translate }}</button>  \n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/verifpage/verifpage.component.scss":
/*!****************************************************!*\
  !*** ./src/app/verifpage/verifpage.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block; }\n\n.signup-page {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: auto;\n  background: #222;\n  text-align: center;\n  color: #fff;\n  padding: 3em; }\n\n.signup-page .col-lg-4 {\n    padding: 0; }\n\n.signup-page .input-lg {\n    height: 46px;\n    padding: 10px 16px;\n    font-size: 18px;\n    line-height: 1.3333333;\n    border-radius: 0; }\n\n.signup-page .input-underline {\n    background: 0 0;\n    border: none;\n    box-shadow: none;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.5);\n    color: #fff;\n    border-radius: 0; }\n\n.signup-page .input-underline:focus {\n    border-bottom: 2px solid #fff;\n    box-shadow: none; }\n\n.signup-page .rounded-btn {\n    border-radius: 50px;\n    color: rgba(255, 255, 255, 0.8);\n    background: #222;\n    border: 2px solid rgba(255, 255, 255, 0.8);\n    font-size: 18px;\n    line-height: 40px;\n    padding: 0 25px; }\n\n.signup-page .rounded-btn:hover,\n  .signup-page .rounded-btn:focus,\n  .signup-page .rounded-btn:active,\n  .signup-page .rounded-btn:visited {\n    color: white;\n    border: 2px solid white;\n    outline: none; }\n\n.signup-page h1 {\n    font-weight: 300;\n    margin-top: 20px;\n    margin-bottom: 10px;\n    font-size: 36px; }\n\n.signup-page h1 small {\n      color: rgba(255, 255, 255, 0.7); }\n\n.signup-page .form-group {\n    padding: 8px 0; }\n\n.signup-page .form-group input::-webkit-input-placeholder {\n      color: rgba(15, 6, 6, 0.6) !important; }\n\n.signup-page .form-group input:-moz-placeholder {\n      /* Firefox 18- */\n      color: rgba(15, 6, 6, 0.6) !important; }\n\n.signup-page .form-group input::-moz-placeholder {\n      /* Firefox 19+ */\n      color: rgba(14, 5, 5, 0.6) !important; }\n\n.signup-page .form-group input:-ms-input-placeholder {\n      color: rgba(17, 5, 5, 0.6) !important; }\n\n.signup-page .form-content {\n    padding: 40px 0; }\n\n.signup-page .user-avatar {\n    border-radius: 50%;\n    border: 2px solid #fff; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmVyaWZwYWdlL0M6XFxVc2Vyc1xcQUNFUlxcRGVza3RvcFxccGFja3dheXMtZnJvbnQvc3JjXFxhcHBcXHZlcmlmcGFnZVxcdmVyaWZwYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksZUFBYyxFQUNqQjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLFNBQVE7RUFDUixVQUFTO0VBQ1QsZUFBYztFQUNkLGlCQVgwQjtFQVkxQixtQkFBa0I7RUFDbEIsWUFBVztFQUNYLGFBQVksRUFnRmY7O0FBMUZEO0lBWVEsV0FBVSxFQUNiOztBQWJMO0lBZVEsYUFBWTtJQUNaLG1CQUFrQjtJQUNsQixnQkFBZTtJQUNmLHVCQUFzQjtJQUN0QixpQkFBZ0IsRUFDbkI7O0FBcEJMO0lBc0JRLGdCQUFlO0lBQ2YsYUFBWTtJQUNaLGlCQUFnQjtJQUNoQixrREFBaUQ7SUFDakQsWUFBVztJQUNYLGlCQUFnQixFQUNuQjs7QUE1Qkw7SUE4QlEsOEJBQTZCO0lBQzdCLGlCQUFnQixFQUNuQjs7QUFoQ0w7SUFtQ1Esb0JBQW1CO0lBQ25CLGdDQUErQjtJQUMvQixpQkF6Q3NCO0lBMEN0QiwyQ0FBMEM7SUFDMUMsZ0JBQWU7SUFDZixrQkFBaUI7SUFDakIsZ0JBQWUsRUFDbEI7O0FBMUNMOzs7O0lBK0NRLGFBQTZCO0lBQzdCLHdCQUF3QztJQUN4QyxjQUFhLEVBQ2hCOztBQWxETDtJQXFEUSxpQkFBZ0I7SUFDaEIsaUJBQWdCO0lBQ2hCLG9CQUFtQjtJQUNuQixnQkFBZSxFQUlsQjs7QUE1REw7TUEwRFksZ0NBQStCLEVBQ2xDOztBQTNEVDtJQStEUSxlQUFjLEVBa0JqQjs7QUFqRkw7TUFpRVksc0NBQXFDLEVBQ3hDOztBQWxFVDtNQXFFWSxpQkFBaUI7TUFDakIsc0NBQXFDLEVBQ3hDOztBQXZFVDtNQTBFWSxpQkFBaUI7TUFDakIsc0NBQXFDLEVBQ3hDOztBQTVFVDtNQStFWSxzQ0FBcUMsRUFDeEM7O0FBaEZUO0lBbUZRLGdCQUFlLEVBQ2xCOztBQXBGTDtJQXVGUSxtQkFBa0I7SUFDbEIsdUJBQXNCLEVBQ3pCIiwiZmlsZSI6InNyYy9hcHAvdmVyaWZwYWdlL3ZlcmlmcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiR0b3BuYXYtYmFja2dyb3VuZC1jb2xvcjogIzIyMjtcbjpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1cbi5zaWdudXAtcGFnZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBiYWNrZ3JvdW5kOiAkdG9wbmF2LWJhY2tncm91bmQtY29sb3I7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIHBhZGRpbmc6IDNlbTtcbiAgICAuY29sLWxnLTQge1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgIH1cbiAgICAuaW5wdXQtbGcge1xuICAgICAgICBoZWlnaHQ6IDQ2cHg7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMTZweDtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMS4zMzMzMzMzO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIH1cbiAgICAuaW5wdXQtdW5kZXJsaW5lIHtcbiAgICAgICAgYmFja2dyb3VuZDogMCAwO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIH1cbiAgICAuaW5wdXQtdW5kZXJsaW5lOmZvY3VzIHtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNmZmY7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgfVxuICAgIC5yb3VuZGVkLWJ0biB7XG4gICAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNTBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcbiAgICAgICAgYmFja2dyb3VuZDogJHRvcG5hdi1iYWNrZ3JvdW5kLWNvbG9yO1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gICAgICAgIHBhZGRpbmc6IDAgMjVweDtcbiAgICB9XG4gICAgLnJvdW5kZWQtYnRuOmhvdmVyLFxuICAgIC5yb3VuZGVkLWJ0bjpmb2N1cyxcbiAgICAucm91bmRlZC1idG46YWN0aXZlLFxuICAgIC5yb3VuZGVkLWJ0bjp2aXNpdGVkIHtcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuXG4gICAgaDEge1xuICAgICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgICAgICBmb250LXNpemU6IDM2cHg7XG4gICAgICAgIHNtYWxsIHtcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuZm9ybS1ncm91cCB7XG4gICAgICAgIHBhZGRpbmc6IDhweCAwO1xuICAgICAgICBpbnB1dDo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICAgICAgICBjb2xvcjogcmdiYSgxNSwgNiwgNiwgMC42KSAhaW1wb3J0YW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQ6LW1vei1wbGFjZWhvbGRlciB7XG4gICAgICAgICAgICAvKiBGaXJlZm94IDE4LSAqL1xuICAgICAgICAgICAgY29sb3I6IHJnYmEoMTUsIDYsIDYsIDAuNikgIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0OjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgICAgIC8qIEZpcmVmb3ggMTkrICovXG4gICAgICAgICAgICBjb2xvcjogcmdiYSgxNCwgNSwgNSwgMC42KSAhaW1wb3J0YW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKDE3LCA1LCA1LCAwLjYpICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmZvcm0tY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6IDQwcHggMDtcbiAgICB9XG4gICAgLnVzZXItYXZhdGFyIHtcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcbiAgICB9XG59XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/verifpage/verifpage.component.ts":
/*!**************************************************!*\
  !*** ./src/app/verifpage/verifpage.component.ts ***!
  \**************************************************/
/*! exports provided: VerifpageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifpageComponent", function() { return VerifpageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../router.animations */ "./src/app/router.animations.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VerifpageComponent = /** @class */ (function () {
    function VerifpageComponent(http, snackBar, router) {
        this.http = http;
        this.snackBar = snackBar;
        this.router = router;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].serverUrl + '/user/';
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
    VerifpageComponent.prototype.ngOnInit = function () {
    };
    VerifpageComponent.prototype.testvalid = function () {
        var id = localStorage.getItem('idUser');
        var code = localStorage.getItem('code');
        if (this.codeVerif === code) {
            var userdata = {
                accountActive: true
            };
            var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            var options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({ headers: headers });
            this.http.put(this.url + 'update/' + id, userdata, { headers: this.headerOptions }).subscribe(function (data) {
                console.log('User Blocked');
            }, function (error) {
            });
            this.router.navigate(['login']);
        }
        else {
            this.snackBar.open('Le code de validation est incorrect', 'Fermer', {
                duration: 5000,
            });
        }
    };
    VerifpageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-verifpage',
            template: __webpack_require__(/*! ./verifpage.component.html */ "./src/app/verifpage/verifpage.component.html"),
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_1__["routerTransition"])()],
            styles: [__webpack_require__(/*! ./verifpage.component.scss */ "./src/app/verifpage/verifpage.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], VerifpageComponent);
    return VerifpageComponent;
}());



/***/ }),

/***/ "./src/app/verifpage/verifpage.module.ts":
/*!***********************************************!*\
  !*** ./src/app/verifpage/verifpage.module.ts ***!
  \***********************************************/
/*! exports provided: VerifpageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifpageModule", function() { return VerifpageModule; });
/* harmony import */ var _verifpage_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./verifpage.component */ "./src/app/verifpage/verifpage.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _verifpage_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./verifpage-routing.module */ "./src/app/verifpage/verifpage-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var VerifpageModule = /** @class */ (function () {
    function VerifpageModule() {
    }
    VerifpageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_verifpage_component__WEBPACK_IMPORTED_MODULE_0__["VerifpageComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _verifpage_routing_module__WEBPACK_IMPORTED_MODULE_9__["VerifpageRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_6__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                //MatButtonModule,
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]
            ]
        })
    ], VerifpageModule);
    return VerifpageModule;
}());



/***/ })

}]);
//# sourceMappingURL=verifpage-verifpage-module.js.map