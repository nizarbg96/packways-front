(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-layout-module"],{

/***/ "./src/app/layout/components/header/header.component.html":
/*!****************************************************************!*\
  !*** ./src/app/layout/components/header/header.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg fixed-top\">\n    <a class=\"navbar-brand\" href=\"#\">PACKWAYS </a>\n    <button class=\"navbar-toggler\" type=\"button\" (click)=\"toggleSidebar()\">\n        <!-- <span class=\"navbar-toggler-icon\"></span> -->\n        <i class=\"fa fa-bars text-muted\" aria-hidden=\"true\"></i>\n    </button>\n    <div class=\"collapse navbar-collapse\">\n        <!-- <form class=\"form-inline my-2 my-lg-0\">\n            <input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"{{ 'Search' | translate }}\" >\n        </form> -->\n        <ul class=\"navbar-nav ml-auto\">\n            <!-- <li class=\"nav-item d-none d-xl-block\">\n                <a\n                    href=\"https://github.com/start-angular/SB-Admin-BS4-Angular-7/archive/master.zip\"\n                    class=\"nav-link btn mt-1\" role=\"button\"\n                    style=\"padding: .375rem 1rem !important;border-color: #999;\"\n                >\n                    {{ 'Download Now' | translate }}\n                </a>\n            </li> &nbsp;\n            <li class=\"nav-item\">\n                <a href=\"javascript:void(0)\" class=\"nav-link mt-1\"\n                    style=\"padding: 0.375rem 1rem !important; border-color: #999;\"\n                    (click)=\"rltAndLtr()\"\n                >\n                    RTL/LTR\n                </a>\n            </li> &nbsp;\n            <li class=\"nav-item dropdown\" ngbDropdown>\n                <a class=\"nav-link\" href=\"javascript:void(0)\" ngbDropdownToggle>\n                    <i class=\"fa fa-envelope\"></i> <b class=\"caret\"></b><span class=\"sr-only\">(current)</span>\n                </a>\n                <ul class=\"dropdown-menu-right messages\" ngbDropdownMenu>\n                    <li class=\"media\">\n                        <img class=\"d-flex align-self-center mr-3\"\n                            src=\"http://i.huffpost.com/gadgets/slideshows/461162/slide_461162_6224974_sq50.jpg\" alt=\"Generic placeholder image\"\n                        >\n                        <div class=\"media-body\">\n                            <h5 class=\"mt-0 mb-1\">John Smith</h5>\n                            <p class=\"small text-muted\"><i class=\"fa fa-clock-o\"></i> Yesterday at 4:32 PM</p>\n                            <p class=\"last\"> Lorem ipsum dolor sit amet, consectetur...</p>\n                        </div>\n                    </li>\n                    <li class=\"media\">\n                        <img class=\"d-flex align-self-center mr-3\"\n                            src=\"http://i.huffpost.com/gadgets/slideshows/461162/slide_461162_6224974_sq50.jpg\"\n                            alt=\"Generic placeholder image\"\n                        >\n                        <div class=\"media-body\">\n                            <h5 class=\"mt-0 mb-1\">John Smith</h5>\n                            <p class=\"small text-muted\"><i class=\"fa fa-clock-o\"></i> Yesterday at 4:32 PM</p>\n                            <p class=\"last\"> Lorem ipsum dolor sit amet, consectetur...</p>\n                        </div>\n                    </li>\n                    <li class=\"media\">\n                        <img class=\"d-flex align-self-center mr-3\"\n                            src=\"http://i.huffpost.com/gadgets/slideshows/461162/slide_461162_6224974_sq50.jpg\"\n                            alt=\"Generic placeholder image\"\n                        />\n                        <div class=\"media-body\">\n                            <h5 class=\"mt-0 mb-1\">John Smith</h5>\n                            <p class=\"small text-muted\"><i class=\"fa fa-clock-o\"></i> Yesterday at 4:32 PM</p>\n                            <p class=\"last\"> Lorem ipsum dolor sit amet, consectetur...</p>\n                        </div>\n                    </li>\n                </ul>\n            </li> -->\n            <!-- <li class=\"nav-item dropdown\" ngbDropdown>\n                <a href=\"javascript:void(0)\" class=\"nav-link\" ngbDropdownToggle>\n                    <i class=\"fa fa-bell\"></i> <b class=\"caret\"></b><span class=\"sr-only\">(current)</span>\n                </a>\n                <div class=\"dropdown-menu-right\" ngbDropdownMenu>\n                    <a href=\"javascript:void(0)\" class=\"dropdown-item\">\n                        {{ 'Pending Task' | translate }} <span class=\"badge badge-info\">6</span>\n                    </a>\n                    <a href=\"javascript:void(0)\" class=\"dropdown-item\">\n                        {{ 'In queue' | translate }} <span class=\"badge badge-info\"> 13</span>\n                    </a>\n                    <a href=\"javascript:void(0)\" class=\"dropdown-item\">\n                        {{ 'Mail' | translate }} <span class=\"badge badge-info\"> 45</span>\n                    </a>\n                    <li class=\"dropdown-divider\"></li>\n                    <a href=\"javascript:void(0)\" class=\"dropdown-item\">\n                        {{ 'View All' | translate }}\n                    </a>\n                </div>\n            </li> -->\n            <li class=\"nav-item dropdown\" ngbDropdown>\n                <a href=\"javascript:void(0)\" class=\"nav-link\" ngbDropdownToggle>\n                    <i class=\"fa fa-language\"></i> {{ 'Language' | translate }} <b class=\"caret\"></b>\n                </a>\n                <div class=\"dropdown-menu-right\" ngbDropdownMenu>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"changeLang('en')\">\n                        {{ 'English' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"changeLang('fr')\">\n                        {{ 'French' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"changeLang('ur')\">\n                        {{ 'Urdu' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"changeLang('es')\">\n                        {{ 'Spanish' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"changeLang('it')\">\n                        {{ 'Italian' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"changeLang('fa')\">\n                        {{ 'Farsi' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"changeLang('de')\">\n                        {{ 'German' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"changeLang('zh-CHS')\">\n                        {{ 'Simplified Chinese' | translate }}\n                    </a>\n                </div>\n            </li>\n            <li class=\"nav-item dropdown\" ngbDropdown>\n                <a href=\"javascript:void(0)\" class=\"nav-link\" ngbDropdownToggle>\n                    <i class=\"fa fa-user\"></i> {{ userName }} <b class=\"caret\"></b>\n                </a>\n                <div class=\"dropdown-menu-right\" ngbDropdownMenu>\n                    <!-- <a class=\"dropdown-item\" href=\"javascript:void(0)\">\n                        <i class=\"fa fa-fw fa-user\"></i> {{ 'Profile' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">\n                        <i class=\"fa fa-fw fa-envelope\"></i> {{ 'Inbox' | translate }}\n                    </a>\n                    <a class=\"dropdown-item\" href=\"javascript:void(0)\">\n                        <i class=\"fa fa-fw fa-gear\"></i> {{ 'Settings' | translate }}\n                    </a> -->\n                    <a class=\"dropdown-item\" [routerLink]=\"['/login']\" (click)=\"onLoggedout()\">\n                        <i class=\"fa fa-fw fa-power-off\"></i> {{ 'Log Out' | translate }}\n                    </a>\n                </div>\n            </li>\n        </ul>\n    </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/layout/components/header/header.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/layout/components/header/header.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .navbar {\n  background-color: #222; }\n  :host .navbar .navbar-brand {\n    color: #fff; }\n  :host .navbar .nav-item > a {\n    color: #999; }\n  :host .navbar .nav-item > a:hover {\n      color: #fff; }\n  :host .messages {\n  width: 300px; }\n  :host .messages .media {\n    border-bottom: 1px solid #ddd;\n    padding: 5px 10px; }\n  :host .messages .media:last-child {\n      border-bottom: none; }\n  :host .messages .media-body h5 {\n    font-size: 13px;\n    font-weight: 600; }\n  :host .messages .media-body .small {\n    margin: 0; }\n  :host .messages .media-body .last {\n    font-size: 12px;\n    margin: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudHMvaGVhZGVyL0M6XFxVc2Vyc1xcQUNFUlxcRGVza3RvcFxccGFja3dheXMtZnJvbnQvc3JjXFxhcHBcXGxheW91dFxcY29tcG9uZW50c1xcaGVhZGVyXFxoZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFFUSx1QkFIc0IsRUFhekI7RUFaTDtJQUlZLFlBQVcsRUFDZDtFQUxUO0lBT1ksWUFBVyxFQUlkO0VBWFQ7TUFTZ0IsWUFBVyxFQUNkO0VBVmI7RUFjUSxhQUFZLEVBcUJmO0VBbkNMO0lBZ0JZLDhCQUE2QjtJQUM3QixrQkFBaUIsRUFJcEI7RUFyQlQ7TUFtQmdCLG9CQUFtQixFQUN0QjtFQXBCYjtJQXdCZ0IsZ0JBQWU7SUFDZixpQkFBZ0IsRUFDbkI7RUExQmI7SUE0QmdCLFVBQVMsRUFDWjtFQTdCYjtJQStCZ0IsZ0JBQWU7SUFDZixVQUFTLEVBQ1oiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJHRvcG5hdi1iYWNrZ3JvdW5kLWNvbG9yOiAjMjIyO1xuOmhvc3Qge1xuICAgIC5uYXZiYXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdG9wbmF2LWJhY2tncm91bmQtY29sb3I7XG4gICAgICAgIC5uYXZiYXItYnJhbmQge1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICAgICAgLm5hdi1pdGVtID4gYSB7XG4gICAgICAgICAgICBjb2xvcjogIzk5OTtcbiAgICAgICAgICAgICY6aG92ZXIge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC5tZXNzYWdlcyB7XG4gICAgICAgIHdpZHRoOiAzMDBweDtcbiAgICAgICAgLm1lZGlhIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG4gICAgICAgICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLm1lZGlhLWJvZHkge1xuICAgICAgICAgICAgaDUge1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnNtYWxsIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubGFzdCB7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/components/header/header.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/components/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ng_idle_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-idle/core */ "./node_modules/@ng-idle/core/fesm2015/ng-idle-core.js");
/* harmony import */ var _ng_idle_keepalive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-idle/keepalive */ "./node_modules/@ng-idle/keepalive/fesm2015/ng-idle-keepalive.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { BnNgIdleService } from 'bn-ng-idle';


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(translate, router, idle, keepalive) {
        var _this = this;
        this.translate = translate;
        this.router = router;
        this.idle = idle;
        this.keepalive = keepalive;
        this.idleState = 'Not started.';
        this.timedOut = false;
        this.lastPing = null;
        this.title = 'angular-idle-timeout';
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        var browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        if (localStorage.getItem('auth') === 'admin') {
            this.userName = this.dataUser.name;
            this.idleTimer = 300; // 5min
        }
        else {
            this.userName = this.dataUser.nameUser;
            this.idleTimer = 10800; // 3 heures
        }
        this.router.events.subscribe(function (val) {
            if (val instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"] &&
                window.innerWidth <= 992 &&
                _this.isToggled()) {
                _this.toggleSidebar();
            }
        });
        // Timert session
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(this.idleTimer);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(10);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(_ng_idle_core__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_INTERRUPTSOURCES"]);
        idle.onIdleEnd.subscribe(function () {
            _this.idleState = 'No longer idle.';
            console.log(_this.idleState);
            _this.reset();
        });
        idle.onTimeout.subscribe(function () {
            _this.idleState = 'Timed out!';
            _this.timedOut = true;
            console.log(_this.idleState);
            _this.router.navigate(['/login']);
            _this.onLoggedout();
        });
        idle.onIdleStart.subscribe(function () {
            _this.idleState = 'You\'ve gone idle!';
            console.log(_this.idleState);
            // this.childModal.show();
        });
        idle.onTimeoutWarning.subscribe(function (countdown) {
            _this.idleState = 'You will time out in ' + countdown + ' seconds!';
            console.log(_this.idleState);
        });
        // sets the ping interval to 15 seconds
        keepalive.interval(15);
        keepalive.onPing.subscribe(function () { return _this.lastPing = new Date(); });
        this.reset();
        // fin timer session
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.pushRightClass = 'push-right';
        /*
        this.bnIdle.startWatching(10).subscribe((isTimedOut: boolean) => {
          if (isTimedOut) {
            console.log('session expired');
            this.router.navigate(['/login']);
            this.onLoggedout();
          }
        }); */
    };
    HeaderComponent.prototype.isToggled = function () {
        var dom = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    };
    HeaderComponent.prototype.toggleSidebar = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    };
    HeaderComponent.prototype.rltAndLtr = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle('rtl');
    };
    HeaderComponent.prototype.onLoggedout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('auth');
    };
    HeaderComponent.prototype.changeLang = function (language) {
        this.translate.use(language);
    };
    HeaderComponent.prototype.reset = function () {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/layout/components/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.scss */ "./src/app/layout/components/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _ng_idle_core__WEBPACK_IMPORTED_MODULE_3__["Idle"], _ng_idle_keepalive__WEBPACK_IMPORTED_MODULE_4__["Keepalive"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/layout/components/sidebar/sidebar.component.html":
/*!******************************************************************!*\
  !*** ./src/app/layout/components/sidebar/sidebar.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"sidebar\" [ngClass]=\"{sidebarPushRight: isActive, collapsed: collapsed}\">\n    <div class=\"list-group\">\n        <a routerLink=\"/dashboard\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-dashboard\"></i>&nbsp;\n            <span>{{ 'Dashboard' | translate }}</span>\n        </a>\n        <a [routerLink]=\"['/trips']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-table\"></i>&nbsp;\n            <span>{{ 'Gestion des colis' | translate }}</span>\n        </a>\n        <!-- <a [routerLink]=\"['/adresses']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-address-card\"></i>&nbsp;\n            <span>{{ 'Adresses' | translate }}</span>\n        </a> -->\n        <a *ngIf=\"isVisible\" [routerLink]=\"['/users']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-users\"></i>&nbsp;\n            <span>{{ 'Clients' | translate }}</span>\n        </a>\n        <a [routerLink]=\"['/address']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-address-card\"></i>&nbsp;\n            <span>Adresses</span>\n        </a>\n        <a *ngIf=\"isVisible\" [routerLink]=\"['/drivers']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-car\"></i>&nbsp;\n            <span>{{ 'Drivers' | translate }}</span>\n        </a>\n        <a *ngIf=\"isVisible\" [routerLink]=\"['/pickup']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-exchange\"></i>&nbsp;\n            <span>PickUp</span>\n        </a>  \n        <a *ngIf=\"!isVisible\" [routerLink]=\"['/profile']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-user\"></i>&nbsp;\n            <span>Profil</span>\n        </a>\n        <a *ngIf=\"isVisible\" [routerLink]=\"['/courbeille']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-trash\"></i>&nbsp;\n            <span>Corbeille</span>\n        </a> \n        <a *ngIf=\"isVisible\" [routerLink]=\"['/caisse']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-usd\"></i>&nbsp;\n            <span>Caisse</span>\n        </a>\n        <a *ngIf=\"isVisible\" [routerLink]=\"['/statlivreur']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-tachometer\"></i>&nbsp;\n            <span>Compteurs </span>\n        </a>\n        <a *ngIf=\"isVisible\" [routerLink]=\"['/rapport']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-files-o\"></i>&nbsp;\n            <span>Rapports </span>\n        </a>\n\n        <a *ngIf=\"idUser === '5c595e33e497064553069490'\" [routerLink]=\"['/parainage']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-files-o\"></i>&nbsp;\n            <span>Parainage </span>\n        </a>\n       <!--  <a *ngIf=\"isVisible\" [routerLink]=\"['/map-trips']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-map-marker\"></i>&nbsp;\n            <span>{{ 'MapTrips' | translate }}</span>\n        </a> -->       \n        <!-- <a [routerLink]=\"['/charts']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-bar-chart-o\"></i>&nbsp;\n            <span>{{ 'Charts' | translate }}</span>\n        </a>\n        <a [routerLink]=\"['/tables']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-table\"></i>&nbsp;\n            <span>{{ 'Tables' | translate }}</span>\n        </a>\n        <a [routerLink]=\"['/forms']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-edit\"></i>&nbsp;\n            <span>{{ 'Forms' | translate }}</span>\n        </a>\n        <a [routerLink]=\"['/bs-element']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-desktop\"></i>&nbsp;\n            <span>{{ 'Bootstrap Element' | translate }}</span>\n        </a>\n        <a [routerLink]=\"['/grid']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-fw fa-wrench\"></i>&nbsp;\n            <span>{{ 'Bootstrap Grid' | translate }}</span>\n        </a>\n        <a [routerLink]=\"['/components']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-th-list\"></i>&nbsp;\n            <span>{{ 'Component' | translate }}</span>\n        </a>\n        <div class=\"nested-menu\">\n            <a class=\"list-group-item\" (click)=\"addExpandClass('pages')\">\n                <i class=\"fa fa-plus\"></i>&nbsp;\n                <span>{{ 'Menu' | translate }}</span>\n            </a>\n            <li class=\"nested\" [class.expand]=\"showMenu === 'pages'\">\n                <ul class=\"submenu\">\n                    <li>\n                        <a href=\"javascript:void(0)\">\n                            <i class=\"fa fa-monument\"></i>&nbsp;\n                            <span>{{ 'Submenu' | translate }}</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"javascript:void(0)\">\n                            <i class=\"fa fa-monument\"></i>&nbsp;\n                            <span>{{ 'Submenu' | translate }}</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"javascript:void(0)\">\n                            <i class=\"fa fa-monument\"></i>&nbsp;\n                            <span>{{ 'Submenu' | translate }}</span>\n                        </a>\n                    </li>\n                </ul>\n            </li>\n        </div>\n        <a [routerLink]=\"['/blank-page']\" [routerLinkActive]=\"['router-link-active']\" class=\"list-group-item\">\n            <i class=\"fa fa-file-o\"></i>&nbsp;\n            <span>{{ 'Blank Page' | translate }}</span>\n        </a>\n        <a href=\"http://www.strapui.com/\" class=\"list-group-item\">\n            <i class=\"fa fa-caret-down\"></i>&nbsp;\n            <span>{{ 'More Themes' | translate }}</span>\n        </a> -->\n\n        <div class=\"header-fields\">\n            <a (click)=\"rltAndLtr()\" class=\"list-group-item\">\n                <span><i class=\"fa fa-arrows-h\"></i>&nbsp; RTL/LTR</span>\n            </a>\n            <div class=\"nested-menu\">\n                <a class=\"list-group-item\" (click)=\"addExpandClass('languages')\">\n                    <span><i class=\"fa fa-language\"></i>&nbsp; {{ 'Language' | translate }} <b class=\"caret\"></b></span>\n                </a>\n                <li class=\"nested\" [class.expand]=\"showMenu === 'languages'\">\n                    <ul class=\"submenu\">\n                        <li>\n                            <a href=\"javascript:void(0)\" (click)=\"changeLang('en')\">\n                                {{ 'English' | translate }}\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:void(0)\" (click)=\"changeLang('fr')\">\n                                {{ 'French' | translate }}\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:void(0)\" (click)=\"changeLang('ur')\">\n                                {{ 'Urdu' | translate }}\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:void(0)\" (click)=\"changeLang('es')\">\n                                {{ 'Spanish' | translate }}\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:void(0)\" (click)=\"changeLang('it')\">\n                                {{ 'Italian' | translate }}\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:void(0)\" (click)=\"changeLang('fa')\">\n                                {{ 'Farsi' | translate }}\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:void(0)\" (click)=\"changeLang('de')\">\n                                {{ 'German' | translate }}\n                            </a>\n                        </li>\n                    </ul>\n                </li>\n            </div>\n            <div class=\"nested-menu\">\n                <a class=\"list-group-item\" (click)=\"addExpandClass('profile')\">\n                    <span><i class=\"fa fa-user\"></i>&nbsp; {{ userName }}</span>\n                </a>\n                <li class=\"nested\" [class.expand]=\"showMenu === 'profile'\">\n                    <ul class=\"submenu\">\n                        <!-- <li>\n                            <a href=\"javascript:void(0)\">\n                                <span><i class=\"fa fa-fw fa-user\"></i> {{ 'Profile' | translate }}</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:void(0)\">\n                                <span><i class=\"fa fa-fw fa-envelope\"></i> {{ 'Inbox' | translate }}</span>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"javascript:void(0)\">\n                                <span><i class=\"fa fa-fw fa-gear\"></i> {{ 'Settings' | translate }}</span>\n                            </a>\n                        </li> -->\n                        <li>\n                            <a [routerLink]=\"['/login']\" (click)=\"onLoggedout()\">\n                                <span><i class=\"fa fa-fw fa-power-off\"></i> {{ 'Log Out' | translate }}</span>\n                            </a>\n                        </li>\n                    </ul>\n                </li>\n            </div>\n        </div>\n    </div>\n    <div class=\"toggle-button\" [ngClass]=\"{collapsed: collapsed}\" (click)=\"toggleCollapsed()\">\n        <i class=\"fa fa-fw fa-angle-double-left\"></i>&nbsp;\n        <span>{{ 'Collapse Sidebar' | translate }}</span>\n    </div>\n</nav>"

/***/ }),

/***/ "./src/app/layout/components/sidebar/sidebar.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/layout/components/sidebar/sidebar.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sidebar {\n  border-radius: 0;\n  position: fixed;\n  z-index: 1000;\n  top: 56px;\n  left: 235px;\n  width: 235px;\n  margin-left: -235px;\n  margin-bottom: 48px;\n  border: none;\n  border-radius: 0;\n  overflow-y: auto;\n  background-color: #222;\n  bottom: 0;\n  overflow-x: hidden;\n  padding-bottom: 40px;\n  white-space: nowrap;\n  transition: all 0.2s ease-in-out; }\n  .sidebar .list-group a.list-group-item {\n    background: #222;\n    border: 0;\n    border-radius: 0;\n    color: #999;\n    text-decoration: none; }\n  .sidebar .list-group a.list-group-item .fa {\n      margin-right: 10px; }\n  .sidebar .list-group a:hover {\n    background: #151515;\n    color: #fff; }\n  .sidebar .list-group a.router-link-active {\n    background: #151515;\n    color: #fff; }\n  .sidebar .list-group .header-fields {\n    padding-top: 10px; }\n  .sidebar .list-group .header-fields > .list-group-item:first-child {\n      border-top: 1px solid rgba(255, 255, 255, 0.2); }\n  .sidebar .sidebar-dropdown *:focus {\n    border-radius: none;\n    border: none; }\n  .sidebar .sidebar-dropdown .panel-title {\n    font-size: 1rem;\n    height: 50px;\n    margin-bottom: 0; }\n  .sidebar .sidebar-dropdown .panel-title a {\n      color: #999;\n      text-decoration: none;\n      font-weight: 400;\n      background: #222; }\n  .sidebar .sidebar-dropdown .panel-title a span {\n        position: relative;\n        display: block;\n        padding: 0.75rem 1.5rem;\n        padding-top: 1rem; }\n  .sidebar .sidebar-dropdown .panel-title a:hover,\n    .sidebar .sidebar-dropdown .panel-title a:focus {\n      color: #fff;\n      outline: none;\n      outline-offset: -2px; }\n  .sidebar .sidebar-dropdown .panel-title:hover {\n    background: #151515; }\n  .sidebar .sidebar-dropdown .panel-collapse {\n    border-radious: 0;\n    border: none; }\n  .sidebar .sidebar-dropdown .panel-collapse .panel-body .list-group-item {\n      border-radius: 0;\n      background-color: #222;\n      border: 0 solid transparent; }\n  .sidebar .sidebar-dropdown .panel-collapse .panel-body .list-group-item a {\n        color: #999; }\n  .sidebar .sidebar-dropdown .panel-collapse .panel-body .list-group-item a:hover {\n        color: #fff; }\n  .sidebar .sidebar-dropdown .panel-collapse .panel-body .list-group-item:hover {\n      background: #151515; }\n  .nested-menu .list-group-item {\n  cursor: pointer; }\n  .nested-menu .nested {\n  list-style-type: none; }\n  .nested-menu ul.submenu {\n  display: none;\n  height: 0; }\n  .nested-menu .expand ul.submenu {\n  display: block;\n  list-style-type: none;\n  height: auto; }\n  .nested-menu .expand ul.submenu li a {\n    color: #fff;\n    padding: 10px;\n    display: block; }\n  @media screen and (max-width: 992px) {\n  .sidebar {\n    top: 54px;\n    left: 0px; } }\n  @media print {\n  .sidebar {\n    display: none !important; } }\n  @media (min-width: 992px) {\n  .header-fields {\n    display: none; } }\n  ::-webkit-scrollbar {\n  width: 8px; }\n  ::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 0px white;\n  border-radius: 3px; }\n  ::-webkit-scrollbar-thumb {\n  border-radius: 3px;\n  -webkit-box-shadow: inset 0 0 3px white; }\n  .toggle-button {\n  position: fixed;\n  width: 236px;\n  cursor: pointer;\n  padding: 12px;\n  bottom: 0;\n  color: #999;\n  background: #212529;\n  border-top: 1px solid #999;\n  transition: all 0.2s ease-in-out; }\n  .toggle-button i {\n    font-size: 23px; }\n  .toggle-button:hover {\n    background: #151515;\n    color: #fff; }\n  .collapsed {\n  width: 50px; }\n  .collapsed span {\n    display: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudHMvc2lkZWJhci9DOlxcVXNlcnNcXEFDRVJcXERlc2t0b3BcXHBhY2t3YXlzLWZyb250L3NyY1xcYXBwXFxsYXlvdXRcXGNvbXBvbmVudHNcXHNpZGViYXJcXHNpZGViYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxpQkFBZ0I7RUFDaEIsZ0JBQWU7RUFDZixjQUFhO0VBQ2IsVUFBUztFQUNULFlBQVc7RUFDWCxhQUFZO0VBQ1osb0JBQW1CO0VBQ25CLG9CQUFtQjtFQUNuQixhQUFZO0VBQ1osaUJBQWdCO0VBQ2hCLGlCQUFnQjtFQUNoQix1QkFiMEI7RUFjMUIsVUFBUztFQUNULG1CQUFrQjtFQUNsQixxQkFBb0I7RUFDcEIsb0JBQW1CO0VBS25CLGlDQUFnQyxFQWlGbkM7RUF0R0Q7SUF5QlksaUJBMUJrQjtJQTJCbEIsVUFBUztJQUNULGlCQUFnQjtJQUNoQixZQUFXO0lBQ1gsc0JBQXFCLEVBSXhCO0VBakNUO01BK0JnQixtQkFBa0IsRUFDckI7RUFoQ2I7SUFtQ1ksb0JBQWdEO0lBQ2hELFlBQVcsRUFDZDtFQXJDVDtJQXVDWSxvQkFBZ0Q7SUFDaEQsWUFBVyxFQUNkO0VBekNUO0lBMkNZLGtCQUFpQixFQUtwQjtFQWhEVDtNQThDZ0IsK0NBQThDLEVBQ2pEO0VBL0NiO0lBb0RZLG9CQUFtQjtJQUNuQixhQUFZLEVBQ2Y7RUF0RFQ7SUF3RFksZ0JBQWU7SUFDZixhQUFZO0lBQ1osaUJBQWdCLEVBbUJuQjtFQTdFVDtNQTREZ0IsWUFBVztNQUNYLHNCQUFxQjtNQUNyQixpQkFBZ0I7TUFDaEIsaUJBaEVjLEVBdUVqQjtFQXRFYjtRQWlFb0IsbUJBQWtCO1FBQ2xCLGVBQWM7UUFDZCx3QkFBdUI7UUFDdkIsa0JBQWlCLEVBQ3BCO0VBckVqQjs7TUF5RWdCLFlBQVc7TUFDWCxjQUFhO01BQ2IscUJBQW9CLEVBQ3ZCO0VBNUViO0lBK0VZLG9CQUFnRCxFQUNuRDtFQWhGVDtJQWtGWSxrQkFBaUI7SUFDakIsYUFBWSxFQWlCZjtFQXBHVDtNQXNGb0IsaUJBQWdCO01BQ2hCLHVCQXhGVTtNQXlGViw0QkFBMkIsRUFPOUI7RUEvRmpCO1FBMEZ3QixZQUFXLEVBQ2Q7RUEzRnJCO1FBNkZ3QixZQUFXLEVBQ2Q7RUE5RnJCO01BaUdvQixvQkFBZ0QsRUFDbkQ7RUFNakI7RUFFUSxnQkFBZSxFQUNsQjtFQUhMO0VBS1Esc0JBQXFCLEVBQ3hCO0VBTkw7RUFRUSxjQUFhO0VBQ2IsVUFBUyxFQUNaO0VBVkw7RUFhWSxlQUFjO0VBQ2Qsc0JBQXFCO0VBQ3JCLGFBQVksRUFRZjtFQXZCVDtJQWtCb0IsWUFBVztJQUNYLGNBQWE7SUFDYixlQUFjLEVBQ2pCO0VBS2pCO0VBQ0k7SUFDSSxVQUFTO0lBQ1QsVUFBUyxFQUNaLEVBQUE7RUFFTDtFQUNJO0lBQ0kseUJBQXdCLEVBQzNCLEVBQUE7RUFFTDtFQUNJO0lBQ0ksY0FBYSxFQUNoQixFQUFBO0VBR0w7RUFDSSxXQUFVLEVBQ2I7RUFFRDtFQUNJLHdDQUF3RDtFQUN4RCxtQkFBa0IsRUFDckI7RUFFRDtFQUNJLG1CQUFrQjtFQUNsQix3Q0FBd0QsRUFDM0Q7RUFFRDtFQUNJLGdCQUFlO0VBQ2YsYUFBWTtFQUNaLGdCQUFlO0VBQ2YsY0FBYTtFQUNiLFVBQVM7RUFDVCxZQUFXO0VBQ1gsb0JBQW1CO0VBUW5CLDJCQUEwQjtFQUsxQixpQ0FBZ0MsRUFDbkM7RUFyQkQ7SUFTUSxnQkFBZSxFQUNsQjtFQVZMO0lBWVEsb0JBQWdEO0lBQ2hELFlBQVcsRUFDZDtFQVNMO0VBQ0ksWUFBVyxFQUlkO0VBTEQ7SUFHUSxjQUFhLEVBQ2hCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJHRvcG5hdi1iYWNrZ3JvdW5kLWNvbG9yOiAjMjIyO1xuLnNpZGViYXIge1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgdG9wOiA1NnB4O1xuICAgIGxlZnQ6IDIzNXB4O1xuICAgIHdpZHRoOiAyMzVweDtcbiAgICBtYXJnaW4tbGVmdDogLTIzNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDQ4cHg7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdG9wbmF2LWJhY2tncm91bmQtY29sb3I7XG4gICAgYm90dG9tOiAwO1xuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICBwYWRkaW5nLWJvdHRvbTogNDBweDtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgLW8tdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgLy8gYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4zKTtcbiAgICAubGlzdC1ncm91cCB7XG4gICAgICAgIGEubGlzdC1ncm91cC1pdGVtIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICR0b3BuYXYtYmFja2dyb3VuZC1jb2xvcjtcbiAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgICAgICBjb2xvcjogIzk5OTtcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgICAgIC5mYSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGE6aG92ZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogZGFya2VuKCR0b3BuYXYtYmFja2dyb3VuZC1jb2xvciwgNSUpO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICAgICAgYS5yb3V0ZXItbGluay1hY3RpdmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogZGFya2VuKCR0b3BuYXYtYmFja2dyb3VuZC1jb2xvciwgNSUpO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1maWVsZHMge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgIFxuICAgICAgICAgICAgPiAubGlzdC1ncm91cC1pdGVtOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC5zaWRlYmFyLWRyb3Bkb3duIHtcbiAgICAgICAgKjpmb2N1cyB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiBub25lO1xuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5wYW5lbC10aXRsZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICAgICAgYSB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICM5OTk7XG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJHRvcG5hdi1iYWNrZ3JvdW5kLWNvbG9yO1xuICAgICAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZy10b3A6IDFyZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYTpob3ZlcixcbiAgICAgICAgICAgIGE6Zm9jdXMge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgICAgICAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLnBhbmVsLXRpdGxlOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGRhcmtlbigkdG9wbmF2LWJhY2tncm91bmQtY29sb3IsIDUlKTtcbiAgICAgICAgfVxuICAgICAgICAucGFuZWwtY29sbGFwc2Uge1xuICAgICAgICAgICAgYm9yZGVyLXJhZGlvdXM6IDA7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICAucGFuZWwtYm9keSB7XG4gICAgICAgICAgICAgICAgLmxpc3QtZ3JvdXAtaXRlbSB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR0b3BuYXYtYmFja2dyb3VuZC1jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAwIHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBhIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjOTk5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGE6aG92ZXIge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLmxpc3QtZ3JvdXAtaXRlbTpob3ZlciB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGRhcmtlbigkdG9wbmF2LWJhY2tncm91bmQtY29sb3IsIDUlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi5uZXN0ZWQtbWVudSB7XG4gICAgLmxpc3QtZ3JvdXAtaXRlbSB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gICAgLm5lc3RlZCB7XG4gICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICB9XG4gICAgdWwuc3VibWVudSB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICB9XG4gICAgJiAuZXhwYW5kIHtcbiAgICAgICAgdWwuc3VibWVudSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgICAgIGxpIHtcbiAgICAgICAgICAgICAgICBhIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XG4gICAgLnNpZGViYXIge1xuICAgICAgICB0b3A6IDU0cHg7XG4gICAgICAgIGxlZnQ6IDBweDtcbiAgICB9XG59XG5AbWVkaWEgcHJpbnQge1xuICAgIC5zaWRlYmFyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbn1cbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xuICAgIC5oZWFkZXItZmllbGRzIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59XG5cbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiA4cHg7XG59XG5cbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDBweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDNweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xufVxuXG4udG9nZ2xlLWJ1dHRvbiB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHdpZHRoOiAyMzZweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcGFkZGluZzogMTJweDtcbiAgICBib3R0b206IDA7XG4gICAgY29sb3I6ICM5OTk7XG4gICAgYmFja2dyb3VuZDogIzIxMjUyOTtcbiAgICBpIHtcbiAgICAgICAgZm9udC1zaXplOiAyM3B4O1xuICAgIH1cbiAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogZGFya2VuKCR0b3BuYXYtYmFja2dyb3VuZC1jb2xvciwgNSUpO1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICB9XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5OTk7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xuICAgIC1tcy10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgICAtby10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbn1cblxuLmNvbGxhcHNlZCB7XG4gICAgd2lkdGg6IDUwcHg7XG4gICAgc3BhbiB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/components/sidebar/sidebar.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layout/components/sidebar/sidebar.component.ts ***!
  \****************************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(translate, router) {
        var _this = this;
        this.translate = translate;
        this.router = router;
        this.collapsedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        var browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.dataUser = this.currentUser.data[0];
        if (localStorage.getItem('auth') === 'admin') {
            this.userName = this.dataUser.name;
            this.isVisible = true;
        }
        else {
            this.userName = this.dataUser.nameUser;
            this.isVisible = false;
            this.idUser = this.dataUser.idUser;
        }
        this.router.events.subscribe(function (val) {
            if (val instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"] &&
                window.innerWidth <= 992 &&
                _this.isToggled()) {
                _this.toggleSidebar();
            }
        });
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
    };
    SidebarComponent.prototype.eventCalled = function () {
        this.isActive = !this.isActive;
    };
    SidebarComponent.prototype.addExpandClass = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    SidebarComponent.prototype.toggleCollapsed = function () {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    };
    SidebarComponent.prototype.isToggled = function () {
        var dom = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    };
    SidebarComponent.prototype.toggleSidebar = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    };
    SidebarComponent.prototype.rltAndLtr = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle('rtl');
    };
    SidebarComponent.prototype.changeLang = function (language) {
        this.translate.use(language);
    };
    SidebarComponent.prototype.onLoggedout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('auth');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "collapsedEvent", void 0);
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/layout/components/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/layout/components/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/layout/layout-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/layout-routing.module.ts ***!
  \*************************************************/
/*! exports provided: LayoutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutRoutingModule", function() { return LayoutRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.component */ "./src/app/layout/layout.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _layout_component__WEBPACK_IMPORTED_MODULE_2__["LayoutComponent"],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'trips', loadChildren: './trips/trips.module#TripsModule' },
            { path: 'adresses', loadChildren: './adresses/adresses.module#AdressesModule' },
            { path: 'address', loadChildren: './address/address.module#AddressModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'drivers', loadChildren: './drivers/drivers.module#DriversModule' },
            { path: 'pickup', loadChildren: './pickup/pickup.module#PickUpModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'courbeille', loadChildren: './courbeille/courbeille.module#CourbeilleModule' },
            { path: 'caisse', loadChildren: './caisse/caisse.module#CaisseModule' },
            { path: 'statlivreur', loadChildren: './statlivreur/statlivreur.module#StatlivreurModule' },
            { path: 'rapport', loadChildren: './rapport/rapport.module#RapportModule' },
            { path: 'parainage', loadChildren: './parainage/parainage.module#ParainageModule' },
            { path: 'map-trips', loadChildren: './map-trips/map-trips.module#MapTripsModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/layout.component.html":
/*!**********************************************!*\
  !*** ./src/app/layout/layout.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<app-sidebar (collapsedEvent)=\"receiveCollapsed($event)\"></app-sidebar>\n<section class=\"main-container\" [ngClass]=\"{collapsed: collapedSideBar}\">\n    <router-outlet></router-outlet>\n</section>\n"

/***/ }),

/***/ "./src/app/layout/layout.component.scss":
/*!**********************************************!*\
  !*** ./src/app/layout/layout.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "* {\n  transition: margin-left 0.2s ease-in-out; }\n\n.main-container {\n  margin-top: 56px;\n  margin-left: 235px;\n  padding: 15px;\n  -ms-overflow-x: hidden;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  position: relative;\n  overflow: hidden; }\n\n.collapsed {\n  margin-left: 100px; }\n\n@media screen and (max-width: 992px) {\n  .main-container {\n    margin-left: 0px !important; } }\n\n@media print {\n  .main-container {\n    margin-top: 0px !important;\n    margin-left: 0px !important; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L0M6XFxVc2Vyc1xcQUNFUlxcRGVza3RvcFxccGFja3dheXMtZnJvbnQvc3JjXFxhcHBcXGxheW91dFxcbGF5b3V0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBS0kseUNBQXdDLEVBQzNDOztBQUNEO0VBQ0ksaUJBQWdCO0VBQ2hCLG1CQUFrQjtFQUNsQixjQUFhO0VBQ2IsdUJBQXNCO0VBQ3RCLG1CQUFrQjtFQUNsQixtQkFBa0I7RUFDbEIsbUJBQWtCO0VBQ2xCLGlCQUFnQixFQUNuQjs7QUFDRDtFQUNJLG1CQUFrQixFQUNyQjs7QUFDRDtFQUNJO0lBQ0ksNEJBQTJCLEVBQzlCLEVBQUE7O0FBRUw7RUFDSTtJQUNJLDJCQUEwQjtJQUMxQiw0QkFBMkIsRUFDOUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IG1hcmdpbi1sZWZ0IDAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgLW1vei10cmFuc2l0aW9uOiBtYXJnaW4tbGVmdCAwLjJzIGVhc2UtaW4tb3V0O1xuICAgIC1tcy10cmFuc2l0aW9uOiBtYXJnaW4tbGVmdCAwLjJzIGVhc2UtaW4tb3V0O1xuICAgIC1vLXRyYW5zaXRpb246IG1hcmdpbi1sZWZ0IDAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgdHJhbnNpdGlvbjogbWFyZ2luLWxlZnQgMC4ycyBlYXNlLWluLW91dDtcbn1cbi5tYWluLWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLXRvcDogNTZweDtcbiAgICBtYXJnaW4tbGVmdDogMjM1cHg7XG4gICAgcGFkZGluZzogMTVweDtcbiAgICAtbXMtb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG59XG4uY29sbGFwc2VkIHtcbiAgICBtYXJnaW4tbGVmdDogMTAwcHg7XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xuICAgIC5tYWluLWNvbnRhaW5lciB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwcHggIWltcG9ydGFudDtcbiAgICB9XG59XG5AbWVkaWEgcHJpbnQge1xuICAgIC5tYWluLWNvbnRhaW5lciB7XG4gICAgICAgIG1hcmdpbi10b3A6IDBweCAhaW1wb3J0YW50O1xuICAgICAgICBtYXJnaW4tbGVmdDogMHB4ICFpbXBvcnRhbnQ7XG4gICAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/layout/layout.component.ts":
/*!********************************************!*\
  !*** ./src/app/layout/layout.component.ts ***!
  \********************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LayoutComponent = /** @class */ (function () {
    function LayoutComponent() {
    }
    LayoutComponent.prototype.ngOnInit = function () { };
    LayoutComponent.prototype.receiveCollapsed = function ($event) {
        this.collapedSideBar = $event;
    };
    LayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-layout',
            template: __webpack_require__(/*! ./layout.component.html */ "./src/app/layout/layout.component.html"),
            styles: [__webpack_require__(/*! ./layout.component.scss */ "./src/app/layout/layout.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LayoutComponent);
    return LayoutComponent;
}());



/***/ }),

/***/ "./src/app/layout/layout.module.ts":
/*!*****************************************!*\
  !*** ./src/app/layout/layout.module.ts ***!
  \*****************************************/
/*! exports provided: LayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _layout_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout-routing.module */ "./src/app/layout/layout-routing.module.ts");
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layout.component */ "./src/app/layout/layout.component.ts");
/* harmony import */ var _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/sidebar/sidebar.component */ "./src/app/layout/components/sidebar/sidebar.component.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/layout/components/header/header.component.ts");
/* harmony import */ var _smart_table_smart_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./smart-table/smart-table.component */ "./src/app/layout/smart-table/smart-table.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _layout_routing_module__WEBPACK_IMPORTED_MODULE_4__["LayoutRoutingModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbDropdownModule"]
            ],
            declarations: [_layout_component__WEBPACK_IMPORTED_MODULE_5__["LayoutComponent"], _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_6__["SidebarComponent"], _components_header_header_component__WEBPACK_IMPORTED_MODULE_7__["HeaderComponent"], _smart_table_smart_table_component__WEBPACK_IMPORTED_MODULE_8__["SmartTableComponent"]]
        })
    ], LayoutModule);
    return LayoutModule;
}());



/***/ }),

/***/ "./src/app/layout/smart-table/smart-table.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/smart-table/smart-table.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  smart-table works!\n</p>\n"

/***/ }),

/***/ "./src/app/layout/smart-table/smart-table.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/layout/smart-table/smart-table.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9zbWFydC10YWJsZS9zbWFydC10YWJsZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/smart-table/smart-table.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/smart-table/smart-table.component.ts ***!
  \*************************************************************/
/*! exports provided: SmartTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmartTableComponent", function() { return SmartTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SmartTableComponent = /** @class */ (function () {
    function SmartTableComponent() {
    }
    SmartTableComponent.prototype.ngOnInit = function () {
    };
    SmartTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-smart-table',
            template: __webpack_require__(/*! ./smart-table.component.html */ "./src/app/layout/smart-table/smart-table.component.html"),
            styles: [__webpack_require__(/*! ./smart-table.component.scss */ "./src/app/layout/smart-table/smart-table.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SmartTableComponent);
    return SmartTableComponent;
}());



/***/ })

}]);
//# sourceMappingURL=layout-layout-module.js.map