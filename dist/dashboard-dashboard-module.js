(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./src/app/layout/dashboard/components/chat/chat.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/layout/dashboard/components/chat/chat.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"chat-panel card card-default\">\n    <div class=\"card-header\">\n        <i class=\"fa fa-comments fa-fw\"></i>\n        Chat\n        <div class=\" pull-right\" ngbDropdown>\n            <button class=\"btn btn-secondary btn-sm\" ngbDropdownToggle>\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu dropdown-menu-right\">\n                <li role=\"menuitem\"><a class=\"dropdown-item\" href=\"#\">\n                    <i class=\"fa fa-refresh fa-fw\"></i> Refresh</a>\n                </li>\n                <li role=\"menuitem\"><a class=\"dropdown-item\" href=\"#\">\n                    <i class=\"fa fa-check-circle fa-fw\"></i> Available</a>\n                </li>\n                <li role=\"menuitem\"><a class=\"dropdown-item\" href=\"#\">\n                    <i class=\"fa fa-times fa-fw\"></i> Busy</a>\n                </li>\n                <li class=\"divider dropdown-divider\"></li>\n                <li role=\"menuitem\">\n                    <a href=\"#\" class=\"dropdown-item\">\n                        <i class=\"fa fa-times fa-fw\"></i> Busy\n                    </a>\n                </li>\n                <li>\n                    <a href=\"#\" class=\"dropdown-item\">\n                        <i class=\"fa fa-clock-o fa-fw\"></i> Away\n                    </a>\n                </li>\n                <li class=\"divider\"></li>\n                <li>\n                  <a href=\"#\" class=\"dropdown-item\">\n                    <i class=\"fa fa-sign-out fa-fw\"></i> Sign Out\n                  </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <!-- /.panel-heading -->\n    <div class=\"card-body\">\n        <ul class=\"chat\">\n            <li class=\"left clearfix\">\n                <span class=\"chat-img pull-left\">\n                    <img src=\"http://placehold.it/50/55C1E7/fff\" alt=\"User Avatar\" class=\"img-circle\">\n                </span>\n                <div class=\"chat-body clearfix\">\n                    <div class=\"header\">\n                        <strong class=\"primary-font\">Jack Sparrow</strong>\n                        <small class=\"pull-right text-muted\">\n                            <i class=\"fa fa-clock-o fa-fw\"></i> 12 mins ago\n                        </small>\n                    </div>\n                    <p>\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.\n                    </p>\n                </div>\n            </li>\n            <li class=\"right clearfix\">\n                <span class=\"chat-img pull-right\">\n                    <img src=\"http://placehold.it/50/FA6F57/fff\" alt=\"User Avatar\" class=\"img-circle\">\n                </span>\n                <div class=\"chat-body clearfix\">\n                    <div class=\"header\">\n                        <small class=\" text-muted\">\n                            <i class=\"fa fa-clock-o fa-fw\"></i> 13 mins ago\n                        </small>\n                        <strong class=\"pull-right primary-font\">Bhaumik Patel</strong>\n                    </div>\n                    <p>\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.\n                    </p>\n                </div>\n            </li>\n            <li class=\"left clearfix\">\n                <span class=\"chat-img pull-left\">\n                    <img src=\"http://placehold.it/50/55C1E7/fff\" alt=\"User Avatar\" class=\"img-circle\">\n                </span>\n                <div class=\"chat-body clearfix\">\n                    <div class=\"header\">\n                        <strong class=\"primary-font\">Jack Sparrow</strong>\n                        <small class=\"pull-right text-muted\">\n                            <i class=\"fa fa-clock-o fa-fw\"></i> 14 mins ago\n                        </small>\n                    </div>\n                    <p>\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.\n                    </p>\n                </div>\n            </li>\n            <li class=\"right clearfix\">\n                <span class=\"chat-img pull-right\">\n                    <img src=\"http://placehold.it/50/FA6F57/fff\" alt=\"User Avatar\" class=\"img-circle\">\n                </span>\n                <div class=\"chat-body clearfix\">\n                    <div class=\"header\">\n                        <small class=\" text-muted\">\n                            <i class=\"fa fa-clock-o fa-fw\"></i> 15 mins ago\n                        </small>\n                        <strong class=\"pull-right primary-font\">Bhaumik Patel</strong>\n                    </div>\n                    <p>\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.\n                    </p>\n                </div>\n            </li>\n        </ul>\n    </div>\n    <!-- /.card-body -->\n    <div class=\"card-footer\">\n        <div class=\"input-group\">\n            <input id=\"btn-input\" type=\"text\" class=\"form-control input-sm\" placeholder=\"Type your message here...\">\n            <span class=\"input-group-btn\">\n                <button class=\"btn btn-warning btn-sm\" id=\"btn-chat\">\n                    Send\n                </button>\n            </span>\n        </div>\n    </div>\n    <!-- /.card-footer -->\n</div>\n"

/***/ }),

/***/ "./src/app/layout/dashboard/components/chat/chat.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/layout/dashboard/components/chat/chat.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".chat-panel .chat-dropdown {\n  margin-top: -3px; }\n\n.chat-panel .chat {\n  height: 350px;\n  overflow-y: scroll;\n  margin: 0;\n  padding: 0;\n  list-style: none; }\n\n.chat-panel .chat .left img {\n    margin-right: 15px; }\n\n.chat-panel .chat .right img {\n    margin-left: 15px; }\n\n.chat-panel .chat li {\n    margin-bottom: 10px;\n    margin-right: 15px;\n    padding-bottom: 5px;\n    border-bottom: 1px dotted #999; }\n\n.chat-panel .card-footer input {\n  padding: 3px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2Rhc2hib2FyZC9jb21wb25lbnRzL2NoYXQvQzpcXFVzZXJzXFxBQ0VSXFxEZXNrdG9wXFxwYWNrd2F5cy1mcm9udC9zcmNcXGFwcFxcbGF5b3V0XFxkYXNoYm9hcmRcXGNvbXBvbmVudHNcXGNoYXRcXGNoYXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxpQkFBZ0IsRUFDbkI7O0FBSEw7RUFlUSxjQUFhO0VBQ2IsbUJBQWtCO0VBQ2xCLFVBQVM7RUFDVCxXQUFVO0VBQ1YsaUJBQWdCLEVBT25COztBQTFCTDtJQU9nQixtQkFBa0IsRUFDckI7O0FBUmI7SUFZZ0Isa0JBQWlCLEVBQ3BCOztBQWJiO0lBcUJZLG9CQUFtQjtJQUNuQixtQkFBa0I7SUFDbEIsb0JBQW1CO0lBQ25CLCtCQUE4QixFQUNqQzs7QUF6QlQ7RUE2QlksYUFBYSxFQUNoQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9kYXNoYm9hcmQvY29tcG9uZW50cy9jaGF0L2NoYXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2hhdC1wYW5lbHtcbiAgICAuY2hhdC1kcm9wZG93bntcbiAgICAgICAgbWFyZ2luLXRvcDogLTNweDtcbiAgICB9XG4gICAgLmNoYXR7XG4gICAgICAgIC5sZWZ0e1xuICAgICAgICAgICAgaW1ne1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAucmlnaHR7XG4gICAgICAgICAgICBpbWd7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDE1cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaGVpZ2h0OiAzNTBweDtcbiAgICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgIGxpe1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTVweDtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggZG90dGVkICM5OTk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLmNhcmQtZm9vdGVye1xuICAgICAgICBpbnB1dHtcbiAgICAgICAgICAgIHBhZGRpbmcgOiAzcHg7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/layout/dashboard/components/chat/chat.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/layout/dashboard/components/chat/chat.component.ts ***!
  \********************************************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
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

var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
    }
    ChatComponent.prototype.ngOnInit = function () { };
    ChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__(/*! ./chat.component.html */ "./src/app/layout/dashboard/components/chat/chat.component.html"),
            styles: [__webpack_require__(/*! ./chat.component.scss */ "./src/app/layout/dashboard/components/chat/chat.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/components/index.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/dashboard/components/index.ts ***!
  \******************************************************/
/*! exports provided: TimelineComponent, NotificationComponent, ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timeline/timeline.component */ "./src/app/layout/dashboard/components/timeline/timeline.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineComponent", function() { return _timeline_timeline_component__WEBPACK_IMPORTED_MODULE_0__["TimelineComponent"]; });

/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification/notification.component */ "./src/app/layout/dashboard/components/notification/notification.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationComponent", function() { return _notification_notification_component__WEBPACK_IMPORTED_MODULE_1__["NotificationComponent"]; });

/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat/chat.component */ "./src/app/layout/dashboard/components/chat/chat.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return _chat_chat_component__WEBPACK_IMPORTED_MODULE_2__["ChatComponent"]; });






/***/ }),

/***/ "./src/app/layout/dashboard/components/notification/notification.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/layout/dashboard/components/notification/notification.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card-body\">\n    <div class=\"list-group\">\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-comment fa-fw\"></i> New Comment\n            <span class=\"float-right text-muted small\"><em>4 minutes ago</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-twitter fa-fw\"></i> 3 New Followers\n            <span class=\"float-right text-muted small\"><em>12 minutes ago</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-envelope fa-fw\"></i> Message Sent\n            <span class=\"float-right text-muted small\"><em>27 minutes ago</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-tasks fa-fw\"></i> New Task\n            <span class=\"float-right text-muted small\"><em>43 minutes ago</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-upload fa-fw\"></i> Server Rebooted\n            <span class=\"float-right text-muted small\"><em>11:32 AM</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-bolt fa-fw\"></i> Server Crashed!\n            <span class=\"float-right text-muted small\"><em>11:13 AM</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-warning fa-fw\"></i> Server Not Responding\n            <span class=\"float-right text-muted small\"><em>10:57 AM</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-shopping-cart fa-fw\"></i> New Order Placed\n            <span class=\"float-right text-muted small\"><em>9:49 AM</em></span>\n        </a>\n        <a href=\"#\" class=\"list-group-item clearfix d-block\">\n            <i class=\"fa fa-money fa-fw\"></i> Payment Received\n            <span class=\"float-right text-muted small\"><em>Yesterday</em></span>\n        </a>\n    </div>\n    <!-- /.list-group -->\n    <a href=\"#\" class=\"btn btn-default btn-block\">View All Alerts</a>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/dashboard/components/notification/notification.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/layout/dashboard/components/notification/notification.component.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9kYXNoYm9hcmQvY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/dashboard/components/notification/notification.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/layout/dashboard/components/notification/notification.component.ts ***!
  \************************************************************************************/
/*! exports provided: NotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationComponent", function() { return NotificationComponent; });
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

var NotificationComponent = /** @class */ (function () {
    function NotificationComponent() {
    }
    NotificationComponent.prototype.ngOnInit = function () { };
    NotificationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notification',
            template: __webpack_require__(/*! ./notification.component.html */ "./src/app/layout/dashboard/components/notification/notification.component.html"),
            styles: [__webpack_require__(/*! ./notification.component.scss */ "./src/app/layout/dashboard/components/notification/notification.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NotificationComponent);
    return NotificationComponent;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/components/timeline/timeline.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/layout/dashboard/components/timeline/timeline.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card-body\">\n    <ul class=\"timeline\">\n        <li>\n            <div class=\"timeline-badge\"><i class=\"fa fa-check\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                    <p><small class=\"text-muted\"><i class=\"fa fa-clock-o\"></i> 11 hours ago via Twitter</small>\n                    </p>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis.</p>\n                </div>\n            </div>\n        </li>\n        <li class=\"timeline-inverted\">\n            <div class=\"timeline-badge warning\"><i class=\"fa fa-credit-card\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem quibusdam, tenetur commodi provident cumque magni voluptatem libero, quis rerum. Fugiat esse debitis optio, tempore. Animi officiis alias, officia repellendus.</p>\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium maiores odit qui est tempora eos, nostrum provident explicabo dignissimos debitis vel! Adipisci eius voluptates, ad aut recusandae minus eaque facere.</p>\n                </div>\n            </div>\n        </li>\n        <li>\n            <div class=\"timeline-badge danger\"><i class=\"fa fa-bomb\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus numquam facilis enim eaque, tenetur nam id qui vel velit similique nihil iure molestias aliquam, voluptatem totam quaerat, magni commodi quisquam.</p>\n                </div>\n            </div>\n        </li>\n        <li class=\"timeline-inverted\">\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est quaerat asperiores sapiente, eligendi, nihil. Itaque quos, alias sapiente rerum quas odit! Aperiam officiis quidem delectus libero, omnis ut debitis!</p>\n                </div>\n            </div>\n        </li>\n        <li>\n            <div class=\"timeline-badge info\"><i class=\"fa fa-save\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis minus modi quam ipsum alias at est molestiae excepturi delectus nesciunt, quibusdam debitis amet, beatae consequuntur impedit nulla qui! Laborum, atque.</p>\n                    <hr>\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-primary btn-sm dropdown-toggle\" data-toggle=\"dropdown\">\n                            <i class=\"fa fa-gear\"></i>  <span class=\"caret\"></span>\n                        </button>\n                        <ul class=\"dropdown-menu\" role=\"menu\">\n                            <li><a href=\"#\">Action</a>\n                            </li>\n                            <li><a href=\"#\">Another action</a>\n                            </li>\n                            <li><a href=\"#\">Something else here</a>\n                            </li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </li>\n        <li>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi fuga odio quibusdam. Iure expedita, incidunt unde quis nam! Quod, quisquam. Officia quam qui adipisci quas consequuntur nostrum sequi. Consequuntur, commodi.</p>\n                </div>\n            </div>\n        </li>\n        <li class=\"timeline-inverted\">\n            <div class=\"timeline-badge success\"><i class=\"fa fa-graduation-cap\"></i>\n            </div>\n            <div class=\"timeline-panel\">\n                <div class=\"timeline-heading\">\n                    <h4 class=\"timeline-title\">Lorem ipsum dolor</h4>\n                </div>\n                <div class=\"timeline-body\">\n                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt obcaecati, quaerat tempore officia voluptas debitis consectetur culpa amet, accusamus dolorum fugiat, animi dicta aperiam, enim incidunt quisquam maxime neque eaque.</p>\n                </div>\n            </div>\n        </li>\n    </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/dashboard/components/timeline/timeline.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/layout/dashboard/components/timeline/timeline.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".timeline {\n  position: relative;\n  padding: 20px 0 20px;\n  list-style: none; }\n\n.timeline:before {\n  content: \" \";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 50%;\n  width: 3px;\n  margin-left: -1.5px;\n  background-color: #eeeeee; }\n\n.timeline > li {\n  position: relative;\n  margin-bottom: 20px; }\n\n.timeline > li:before,\n.timeline > li:after {\n  content: \" \";\n  display: table; }\n\n.timeline > li:after {\n  clear: both; }\n\n.timeline > li:before,\n.timeline > li:after {\n  content: \" \";\n  display: table; }\n\n.timeline > li:after {\n  clear: both; }\n\n.timeline > li > .timeline-panel {\n  float: left;\n  position: relative;\n  width: 46%;\n  padding: 20px;\n  border: 1px solid #d4d4d4;\n  border-radius: 2px;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175); }\n\n.timeline > li > .timeline-panel:before {\n  content: \" \";\n  display: inline-block;\n  position: absolute;\n  top: 26px;\n  right: -15px;\n  border-top: 15px solid transparent;\n  border-right: 0 solid #ccc;\n  border-bottom: 15px solid transparent;\n  border-left: 15px solid #ccc; }\n\n.timeline > li > .timeline-panel:after {\n  content: \" \";\n  display: inline-block;\n  position: absolute;\n  top: 27px;\n  right: -14px;\n  border-top: 14px solid transparent;\n  border-right: 0 solid #fff;\n  border-bottom: 14px solid transparent;\n  border-left: 14px solid #fff; }\n\n.timeline > li > .timeline-badge {\n  z-index: 100;\n  position: absolute;\n  top: 16px;\n  left: 50%;\n  width: 50px;\n  height: 50px;\n  margin-left: -25px;\n  border-radius: 50% 50% 50% 50%;\n  text-align: center;\n  font-size: 1.4em;\n  line-height: 50px;\n  color: #fff;\n  background-color: #999999; }\n\n.timeline > li.timeline-inverted > .timeline-panel {\n  float: right; }\n\n.timeline > li.timeline-inverted > .timeline-panel:before {\n  right: auto;\n  left: -15px;\n  border-right-width: 15px;\n  border-left-width: 0; }\n\n.timeline > li.timeline-inverted > .timeline-panel:after {\n  right: auto;\n  left: -14px;\n  border-right-width: 14px;\n  border-left-width: 0; }\n\n.timeline-badge.primary {\n  background-color: #2e6da4 !important; }\n\n.timeline-badge.success {\n  background-color: #3f903f !important; }\n\n.timeline-badge.warning {\n  background-color: #f0ad4e !important; }\n\n.timeline-badge.danger {\n  background-color: #d9534f !important; }\n\n.timeline-badge.info {\n  background-color: #5bc0de !important; }\n\n.timeline-title {\n  margin-top: 0;\n  color: inherit; }\n\n.timeline-body > p,\n.timeline-body > ul {\n  margin-bottom: 0; }\n\n.timeline-body > p + p {\n  margin-top: 5px; }\n\n@media (max-width: 767px) {\n  ul.timeline:before {\n    left: 40px; }\n  ul.timeline > li > .timeline-panel {\n    width: calc(100% - 90px);\n    width: -webkit-calc(100% - 90px); }\n  ul.timeline > li > .timeline-badge {\n    top: 16px;\n    left: 15px;\n    margin-left: 0; }\n  ul.timeline > li > .timeline-panel {\n    float: right; }\n  ul.timeline > li > .timeline-panel:before {\n    right: auto;\n    left: -15px;\n    border-right-width: 15px;\n    border-left-width: 0; }\n  ul.timeline > li > .timeline-panel:after {\n    right: auto;\n    left: -14px;\n    border-right-width: 14px;\n    border-left-width: 0; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2Rhc2hib2FyZC9jb21wb25lbnRzL3RpbWVsaW5lL0M6XFxVc2Vyc1xcQUNFUlxcRGVza3RvcFxccGFja3dheXMtZnJvbnQvc3JjXFxhcHBcXGxheW91dFxcZGFzaGJvYXJkXFxjb21wb25lbnRzXFx0aW1lbGluZVxcdGltZWxpbmUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBa0I7RUFDbEIscUJBQW9CO0VBQ3BCLGlCQUFnQixFQUNuQjs7QUFFRDtFQUNJLGFBQVk7RUFDWixtQkFBa0I7RUFDbEIsT0FBTTtFQUNOLFVBQVM7RUFDVCxVQUFTO0VBQ1QsV0FBVTtFQUNWLG9CQUFtQjtFQUNuQiwwQkFBeUIsRUFDNUI7O0FBRUQ7RUFDSSxtQkFBa0I7RUFDbEIsb0JBQW1CLEVBQ3RCOztBQUVEOztFQUVJLGFBQVk7RUFDWixlQUFjLEVBQ2pCOztBQUVEO0VBQ0ksWUFBVyxFQUNkOztBQUVEOztFQUVJLGFBQVk7RUFDWixlQUFjLEVBQ2pCOztBQUVEO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksWUFBVztFQUNYLG1CQUFrQjtFQUNsQixXQUFVO0VBQ1YsY0FBYTtFQUNiLDBCQUF5QjtFQUN6QixtQkFBa0I7RUFFbEIsMkNBQXVDLEVBQzFDOztBQUVEO0VBQ0ksYUFBWTtFQUNaLHNCQUFxQjtFQUNyQixtQkFBa0I7RUFDbEIsVUFBUztFQUNULGFBQVk7RUFDWixtQ0FBa0M7RUFDbEMsMkJBQTBCO0VBQzFCLHNDQUFxQztFQUNyQyw2QkFBNEIsRUFDL0I7O0FBRUQ7RUFDSSxhQUFZO0VBQ1osc0JBQXFCO0VBQ3JCLG1CQUFrQjtFQUNsQixVQUFTO0VBQ1QsYUFBWTtFQUNaLG1DQUFrQztFQUNsQywyQkFBMEI7RUFDMUIsc0NBQXFDO0VBQ3JDLDZCQUE0QixFQUMvQjs7QUFFRDtFQUNJLGFBQVk7RUFDWixtQkFBa0I7RUFDbEIsVUFBUztFQUNULFVBQVM7RUFDVCxZQUFXO0VBQ1gsYUFBWTtFQUNaLG1CQUFrQjtFQUNsQiwrQkFBOEI7RUFDOUIsbUJBQWtCO0VBQ2xCLGlCQUFnQjtFQUNoQixrQkFBaUI7RUFDakIsWUFBVztFQUNYLDBCQUF5QixFQUM1Qjs7QUFFRDtFQUNJLGFBQVksRUFDZjs7QUFFRDtFQUNJLFlBQVc7RUFDWCxZQUFXO0VBQ1gseUJBQXdCO0VBQ3hCLHFCQUFvQixFQUN2Qjs7QUFFRDtFQUNJLFlBQVc7RUFDWCxZQUFXO0VBQ1gseUJBQXdCO0VBQ3hCLHFCQUFvQixFQUN2Qjs7QUFFRDtFQUNJLHFDQUFvQyxFQUN2Qzs7QUFFRDtFQUNJLHFDQUFvQyxFQUN2Qzs7QUFFRDtFQUNJLHFDQUFvQyxFQUN2Qzs7QUFFRDtFQUNJLHFDQUFvQyxFQUN2Qzs7QUFFRDtFQUNJLHFDQUFvQyxFQUN2Qzs7QUFFRDtFQUNJLGNBQWE7RUFDYixlQUFjLEVBQ2pCOztBQUVEOztFQUVJLGlCQUFnQixFQUNuQjs7QUFFRDtFQUNJLGdCQUFlLEVBQ2xCOztBQUVEO0VBQ0k7SUFDSSxXQUFVLEVBQ2I7RUFFRDtJQUNJLHlCQUF3QjtJQUV4QixpQ0FBZ0MsRUFDbkM7RUFFRDtJQUNJLFVBQVM7SUFDVCxXQUFVO0lBQ1YsZUFBYyxFQUNqQjtFQUVEO0lBQ0ksYUFBWSxFQUNmO0VBRUQ7SUFDSSxZQUFXO0lBQ1gsWUFBVztJQUNYLHlCQUF3QjtJQUN4QixxQkFBb0IsRUFDdkI7RUFFRDtJQUNJLFlBQVc7SUFDWCxZQUFXO0lBQ1gseUJBQXdCO0lBQ3hCLHFCQUFvQixFQUN2QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2Rhc2hib2FyZC9jb21wb25lbnRzL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRpbWVsaW5lIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgcGFkZGluZzogMjBweCAwIDIwcHg7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLnRpbWVsaW5lOmJlZm9yZSB7XG4gICAgY29udGVudDogXCIgXCI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHdpZHRoOiAzcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0xLjVweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xufVxuXG4udGltZWxpbmUgPiBsaSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi50aW1lbGluZSA+IGxpOmJlZm9yZSxcbi50aW1lbGluZSA+IGxpOmFmdGVyIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbn1cblxuLnRpbWVsaW5lID4gbGk6YWZ0ZXIge1xuICAgIGNsZWFyOiBib3RoO1xufVxuXG4udGltZWxpbmUgPiBsaTpiZWZvcmUsXG4udGltZWxpbmUgPiBsaTphZnRlciB7XG4gICAgY29udGVudDogXCIgXCI7XG4gICAgZGlzcGxheTogdGFibGU7XG59XG5cbi50aW1lbGluZSA+IGxpOmFmdGVyIHtcbiAgICBjbGVhcjogYm90aDtcbn1cblxuLnRpbWVsaW5lID4gbGkgPiAudGltZWxpbmUtcGFuZWwge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogNDYlO1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2Q0ZDRkNDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCA2cHggcmdiYSgwLDAsMCwwLjE3NSk7XG4gICAgYm94LXNoYWRvdzogMCAxcHggNnB4IHJnYmEoMCwwLDAsMC4xNzUpO1xufVxuXG4udGltZWxpbmUgPiBsaSA+IC50aW1lbGluZS1wYW5lbDpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAyNnB4O1xuICAgIHJpZ2h0OiAtMTVweDtcbiAgICBib3JkZXItdG9wOiAxNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yaWdodDogMCBzb2xpZCAjY2NjO1xuICAgIGJvcmRlci1ib3R0b206IDE1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLWxlZnQ6IDE1cHggc29saWQgI2NjYztcbn1cblxuLnRpbWVsaW5lID4gbGkgPiAudGltZWxpbmUtcGFuZWw6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAyN3B4O1xuICAgIHJpZ2h0OiAtMTRweDtcbiAgICBib3JkZXItdG9wOiAxNHB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yaWdodDogMCBzb2xpZCAjZmZmO1xuICAgIGJvcmRlci1ib3R0b206IDE0cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLWxlZnQ6IDE0cHggc29saWQgI2ZmZjtcbn1cblxuLnRpbWVsaW5lID4gbGkgPiAudGltZWxpbmUtYmFkZ2Uge1xuICAgIHotaW5kZXg6IDEwMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxNnB4O1xuICAgIGxlZnQ6IDUwJTtcbiAgICB3aWR0aDogNTBweDtcbiAgICBoZWlnaHQ6IDUwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IC0yNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJSA1MCUgNTAlIDUwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxLjRlbTtcbiAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5OTk5O1xufVxuXG4udGltZWxpbmUgPiBsaS50aW1lbGluZS1pbnZlcnRlZCA+IC50aW1lbGluZS1wYW5lbCB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xufVxuXG4udGltZWxpbmUgPiBsaS50aW1lbGluZS1pbnZlcnRlZCA+IC50aW1lbGluZS1wYW5lbDpiZWZvcmUge1xuICAgIHJpZ2h0OiBhdXRvO1xuICAgIGxlZnQ6IC0xNXB4O1xuICAgIGJvcmRlci1yaWdodC13aWR0aDogMTVweDtcbiAgICBib3JkZXItbGVmdC13aWR0aDogMDtcbn1cblxuLnRpbWVsaW5lID4gbGkudGltZWxpbmUtaW52ZXJ0ZWQgPiAudGltZWxpbmUtcGFuZWw6YWZ0ZXIge1xuICAgIHJpZ2h0OiBhdXRvO1xuICAgIGxlZnQ6IC0xNHB4O1xuICAgIGJvcmRlci1yaWdodC13aWR0aDogMTRweDtcbiAgICBib3JkZXItbGVmdC13aWR0aDogMDtcbn1cblxuLnRpbWVsaW5lLWJhZGdlLnByaW1hcnkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyZTZkYTQgIWltcG9ydGFudDtcbn1cblxuLnRpbWVsaW5lLWJhZGdlLnN1Y2Nlc3Mge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZjkwM2YgIWltcG9ydGFudDtcbn1cblxuLnRpbWVsaW5lLWJhZGdlLndhcm5pbmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmMGFkNGUgIWltcG9ydGFudDtcbn1cblxuLnRpbWVsaW5lLWJhZGdlLmRhbmdlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q5NTM0ZiAhaW1wb3J0YW50O1xufVxuXG4udGltZWxpbmUtYmFkZ2UuaW5mbyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzViYzBkZSAhaW1wb3J0YW50O1xufVxuXG4udGltZWxpbmUtdGl0bGUge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgY29sb3I6IGluaGVyaXQ7XG59XG5cbi50aW1lbGluZS1ib2R5ID4gcCxcbi50aW1lbGluZS1ib2R5ID4gdWwge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi50aW1lbGluZS1ib2R5ID4gcCArIHAge1xuICAgIG1hcmdpbi10b3A6IDVweDtcbn1cblxuQG1lZGlhKG1heC13aWR0aDo3NjdweCkge1xuICAgIHVsLnRpbWVsaW5lOmJlZm9yZSB7XG4gICAgICAgIGxlZnQ6IDQwcHg7XG4gICAgfVxuXG4gICAgdWwudGltZWxpbmUgPiBsaSA+IC50aW1lbGluZS1wYW5lbCB7XG4gICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSA5MHB4KTtcbiAgICAgICAgd2lkdGg6IC1tb3otY2FsYygxMDAlIC0gOTBweCk7XG4gICAgICAgIHdpZHRoOiAtd2Via2l0LWNhbGMoMTAwJSAtIDkwcHgpO1xuICAgIH1cblxuICAgIHVsLnRpbWVsaW5lID4gbGkgPiAudGltZWxpbmUtYmFkZ2Uge1xuICAgICAgICB0b3A6IDE2cHg7XG4gICAgICAgIGxlZnQ6IDE1cHg7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIH1cblxuICAgIHVsLnRpbWVsaW5lID4gbGkgPiAudGltZWxpbmUtcGFuZWwge1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgfVxuXG4gICAgdWwudGltZWxpbmUgPiBsaSA+IC50aW1lbGluZS1wYW5lbDpiZWZvcmUge1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgbGVmdDogLTE1cHg7XG4gICAgICAgIGJvcmRlci1yaWdodC13aWR0aDogMTVweDtcbiAgICAgICAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7XG4gICAgfVxuXG4gICAgdWwudGltZWxpbmUgPiBsaSA+IC50aW1lbGluZS1wYW5lbDphZnRlciB7XG4gICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICBsZWZ0OiAtMTRweDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAxNHB4O1xuICAgICAgICBib3JkZXItbGVmdC13aWR0aDogMDtcbiAgICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/layout/dashboard/components/timeline/timeline.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/layout/dashboard/components/timeline/timeline.component.ts ***!
  \****************************************************************************/
/*! exports provided: TimelineComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineComponent", function() { return TimelineComponent; });
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

var TimelineComponent = /** @class */ (function () {
    function TimelineComponent() {
    }
    TimelineComponent.prototype.ngOnInit = function () {
    };
    TimelineComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-timeline',
            template: __webpack_require__(/*! ./timeline.component.html */ "./src/app/layout/dashboard/components/timeline/timeline.component.html"),
            styles: [__webpack_require__(/*! ./timeline.component.scss */ "./src/app/layout/dashboard/components/timeline/timeline.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TimelineComponent);
    return TimelineComponent;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/dashboard-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/dashboard/dashboard-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/layout/dashboard/dashboard.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"]
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.component.html":
/*!***********************************************************!*\
  !*** ./src/app/layout/dashboard/dashboard.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@routerTransition]>\n    <h2 class=\"text-muted\" align=\"center\">PACKWAYS <small>Pensons Livraison, Pensez Business</small></h2>\n    <div class=\"row\" hidden>\n        <div class=\"col-md-12\">\n            <ngb-carousel>\n                <ng-template ngbSlide *ngFor=\"let slider of sliders\">\n                    <img class=\"img-fluid mx-auto d-block\" [src]=\"slider.imagePath\" alt=\"Random first slide\" width=\"100%\">\n                    <div class=\"carousel-caption\">\n                        <h3>{{slider.label}}</h3>\n                        <p>{{slider.text}}</p>\n                    </div>\n                </ng-template>\n            </ngb-carousel>\n        </div>\n    </div>\n    <hr>\n    <div class=\"row\">\n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'warning'\" [icon]=\"'fa-plus-square'\" [count]=\"postes\" [label]=\"'Colis postés.'\" ></app-stat> \n           <!-- <app-statdriver [bgClass]=\"'warning'\" [icon]=\"'fa-plus-square'\" [count]=\"postes\" [label]=\"'Colis postés.'\" ></app-statdriver> -->\n        </div>\n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'info'\" [icon]=\"'fa-spinner'\" [count]=\"ChercheL\" [label]=\"'Colis en attente .'\" ></app-stat>\n        </div>\n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'success'\" [icon]=\"'fa-truck'\" [count]=\"Enchemin\" [label]=\"'Livreur en chemin.'\"></app-stat>\n        </div> \n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'dark'\" [icon]=\"'fa-get-pocket'\" [count]=\"Chezlivreur\" [label]=\"'Colis chez livreur'\"></app-stat>\n        </div>          \n    </div>\n    <hr />  \n    <hr>\n        <div class=\"row\">\n            <div class=\"col-xl-3 col-lg-6\">\n                <app-stat [bgClass]=\"'secondary'\" [icon]=\"'fa-play-circle'\" [count]=\"Encours\" [label]=\"'Colis en cours de livraison.'\" ></app-stat>\n            </div> \n            <div class=\"col-xl-3 col-lg-6\">\n                <app-stat [bgClass]=\"'primary'\" [icon]=\"'fa-check'\" [count]=\"livree\" [label]=\"'Colis livrés.'\" ></app-stat>\n            </div>\n            <div class=\"col-xl-3 col-lg-6\">\n                <app-stat [bgClass]=\"'info'\" [icon]=\"'fa-spinner'\" [count]=\"Retour\" [label]=\"'Colis en retour.'\" ></app-stat>\n            </div>\n            <div class=\"col-xl-3 col-lg-6\">\n                <app-stat [bgClass]=\"'warning'\" [icon]=\"'fa-minus-square'\" [count]=\"Retournee\" [label]=\"'Colis retournés.'\" ></app-stat>\n            </div>\n        </div>  \n\n    <hr />\n\n    <div class=\"row\">\n\n        <div class=\"col-xl-3 col-lg-6\">\n            <app-stat [bgClass]=\"'danger'\" [icon]=\"'fa-ban'\" [count]=\"annulee\" [label]=\"'Colis annulés.'\" ></app-stat>\n        </div>\n        \n        <!-- <div *ngIf=\"isVisible\" class=\"col-xl-3 col-lg-6\">\n                <app-stat [bgClass]=\"'success'\" [icon]=\"'fa-truck'\" [count]=\"driver\" [label]=\"'Conducteurs actifs.'\"></app-stat>\n        </div> -->\n    </div>\n    <hr />\n    \n    <!-- <ngb-alert [type]=\"alert.type\" (close)=\"closeAlert(alert)\" *ngFor=\"let alert of alerts\">{{ alert.message }}</ngb-alert>\n    <hr />\n    <div class=\"row\">\n        <div class=\"col-lg-8\">\n            <div class=\"card card-default\">\n                <div class=\"card-header\">\n                    <i class=\"fa fa-clock-o fa-fw\"></i> Responsive Timeline\n                </div>\n                \n                <app-timeline></app-timeline>\n                \n            </div>\n            \n        </div>\n        \n        <div class=\"col-lg-4\">\n            <div class=\"card card-default mb-3\">\n                <div class=\"card-header\">\n                    <i class=\"fa fa-bell fa-fw\"></i> Notifications card\n                </div>\n                \n                <app-notification></app-notification>\n                \n            </div>            \n\n            <app-chat></app-chat>            \n        </div>\n        \n    </div> -->\n    <fieldset class=\"scheduler-border-1\" *ngIf=\"isVisible\" >\n        <legend class=\"scheduler-border-1\"><h2><b>Tableau par clients</b></h2></legend>\n        <div class=\"card-body table-responsive\">                                                     \n            <table class=\"table\" [mfData]=\"items\" #mf=\"mfDataTable\"  id=\"myTable\">\n                    <thead>\n                            <tr style=\"background-color: rgb(0, 153, 255)\">\n                                    <th style=\"width:3%\">Client</th>\n                                    <th style=\"width:4%\">Nombre des colis postés</th>\n                                    <th style=\"width:3%\">Nombre des colis en chemin</th>\n                                    \n                            </tr>\n                    </thead>\n                    <tbody>\n                            <tr *ngFor=\"let colis of items\" >\n                                    <td>{{ colis[0] }}</td>\n                                    <td>{{ colis[1]}}</td>\n                                    <td >{{ colis[2] }}</td>\n                                    \n                            </tr>\n                    </tbody>\n                    <tfoot style=\"background-color: rgb(0, 153, 255)\" >\n                        <td><b>Nombre totale : </b></td>\n                        <td><b>{{ sommeCH}}</b></td>\n                        <td ><b>{{ sommeLC}}</b></td>\n                    </tfoot>\n                    \n            </table>\n        </div>\n    </fieldset>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/layout/dashboard/dashboard.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".html2canvas-container {\n  width: 3000px !important;\n  height: 3000px !important; }\n\nfieldset.scheduler-border {\n  border: 1px groove #ddd !important;\n  padding: 0 1.4em 1.4em 1.4em !important;\n  margin: 0 0 1.5em 0 !important;\n  box-shadow: 0px 0px 0px 0px #000; }\n\nlegend.scheduler-border {\n  font-size: 1.2em !important;\n  font-weight: bold !important;\n  text-align: center !important;\n  width: auto;\n  padding: 0 10px;\n  border-bottom: none; }\n\nfieldset.scheduler-border-1 {\n  border: 1px groove #ddd !important;\n  padding: 0 0.3em 0.3em 0.3em !important;\n  margin: 0 0 0.2em 0 !important;\n  box-shadow: 0px 0px 0px 0px #000; }\n\nlegend.scheduler-border-1 {\n  font-size: 1.0em !important;\n  font-weight: bold !important;\n  text-align: center !important;\n  width: auto;\n  padding: 0 1px;\n  border-bottom: none;\n  color: #1428dc; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2Rhc2hib2FyZC9DOlxcVXNlcnNcXEFDRVJcXERlc2t0b3BcXHBhY2t3YXlzLWZyb250L3NyY1xcYXBwXFxsYXlvdXRcXGRhc2hib2FyZFxcZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQXlCLHlCQUF3QjtFQUFFLDBCQUF5QixFQUFJOztBQUVoRjtFQUNJLG1DQUFrQztFQUNsQyx3Q0FBdUM7RUFDdkMsK0JBQThCO0VBRXRCLGlDQUFpQyxFQUM1Qzs7QUFFRDtFQUNJLDRCQUEyQjtFQUMzQiw2QkFBNEI7RUFDNUIsOEJBQTZCO0VBQzdCLFlBQVU7RUFDVixnQkFBYztFQUNkLG9CQUFrQixFQUNyQjs7QUFFRDtFQUNFLG1DQUFrQztFQUNsQyx3Q0FBdUM7RUFDdkMsK0JBQThCO0VBRXRCLGlDQUFpQyxFQUMxQzs7QUFFRDtFQUNFLDRCQUEyQjtFQUMzQiw2QkFBNEI7RUFDNUIsOEJBQTZCO0VBQzdCLFlBQVU7RUFDVixlQUFhO0VBQ2Isb0JBQWtCO0VBQ2xCLGVBQXVCLEVBQ3hCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaHRtbDJjYW52YXMtY29udGFpbmVyIHsgd2lkdGg6IDMwMDBweCAhaW1wb3J0YW50OyBoZWlnaHQ6IDMwMDBweCAhaW1wb3J0YW50OyB9XG5cbmZpZWxkc2V0LnNjaGVkdWxlci1ib3JkZXIge1xuICAgIGJvcmRlcjogMXB4IGdyb292ZSAjZGRkICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZzogMCAxLjRlbSAxLjRlbSAxLjRlbSAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMCAwIDEuNWVtIDAgIWltcG9ydGFudDtcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6ICAwcHggMHB4IDBweCAwcHggIzAwMDtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6ICAwcHggMHB4IDBweCAwcHggIzAwMDtcbn1cblxubGVnZW5kLnNjaGVkdWxlci1ib3JkZXIge1xuICAgIGZvbnQtc2l6ZTogMS4yZW0gIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50O1xuICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xuICAgIHdpZHRoOmF1dG87XG4gICAgcGFkZGluZzowIDEwcHg7XG4gICAgYm9yZGVyLWJvdHRvbTpub25lO1xufVxuXG5maWVsZHNldC5zY2hlZHVsZXItYm9yZGVyLTEge1xuICBib3JkZXI6IDFweCBncm9vdmUgI2RkZCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwIDAuM2VtIDAuM2VtIDAuM2VtICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogMCAwIDAuMmVtIDAgIWltcG9ydGFudDtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAgMHB4IDBweCAwcHggMHB4ICMwMDA7XG4gICAgICAgICAgYm94LXNoYWRvdzogIDBweCAwcHggMHB4IDBweCAjMDAwO1xufVxuXG5sZWdlbmQuc2NoZWR1bGVyLWJvcmRlci0xIHtcbiAgZm9udC1zaXplOiAxLjBlbSAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50O1xuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgd2lkdGg6YXV0bztcbiAgcGFkZGluZzowIDFweDtcbiAgYm9yZGVyLWJvdHRvbTpub25lO1xuICBjb2xvcjogcmdiKDIwLCA0MCwgMjIwKVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layout/dashboard/dashboard.component.ts ***!
  \*********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _dashboard_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.service */ "./src/app/layout/dashboard/dashboard.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dservice) {
        this.dservice = dservice;
        this.items = [];
        this.ChercheL = [];
        this.Enchemin = [];
        this.Encours = [];
        this.Chezlivreur = [];
        this.Retour = [];
        this.Retournee = [];
        this.driver = [];
        this.postes = [];
        this.livree = [];
        this.annulee = [];
        this.alerts = [];
        this.sliders = [];
        this.sliders.push({
            imagePath: 'assets/images/slider1.jpg',
            label: 'PACKWAYS',
            text: 'The way how to deliver.'
        }, {
            imagePath: 'assets/images/slider2.jpg',
            label: 'PACKWAYS',
            text: 'Assez Simple, Assez Rapide 24/7.'
        }, {
            imagePath: 'assets/images/slider3.jpg',
            label: 'PACKWAYS',
            text: 'PACKWAYS est une plateforme de livraison permettant d’envoyer des colis 24h/24h et 7J/7 en quelques clic et sans avoir à se déplacer.'
        });
        this.alerts.push({
            id: 1,
            type: 'success',
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n                Voluptates est animi quibusdam praesentium quam, et perspiciatis,\n                consectetur velit culpa molestias dignissimos\n                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum"
        }, {
            id: 2,
            type: 'warning',
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n                Voluptates est animi quibusdam praesentium quam, et perspiciatis,\n                consectetur velit culpa molestias dignissimos\n                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum"
        });
        if (localStorage.getItem('auth') === 'admin') {
            this.isVisible = true;
        }
        else {
            this.isVisible = false;
        }
    }
    DashboardComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('auth') === 'admin') {
            console.log('user is Admin---');
            this.id = 'admin';
        }
        else {
            console.log('user is Cleint---');
            this.id = 'UT' + JSON.parse(localStorage.getItem('currentUser')).data[0].idUser;
        }
        this.getTripPostées();
        this.getTripLivree();
        this.getTripAnnulee();
        this.getDriverAcrives();
        this.getTripRetournee();
        this.getTripChezlivreur();
        this.getTripEncourLivraison();
        this.getTripRetour();
        this.getTripEnchemin();
        this.getTripChercheLivreur();
        this.getTrips();
    };
    DashboardComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    DashboardComponent.prototype.getTripPostées = function () {
        var _this = this;
        this.dservice.getTripsEncours(this.id).subscribe(function (data) {
            _this.postes = data;
        });
    };
    DashboardComponent.prototype.getTripLivree = function () {
        var _this = this;
        this.dservice.getTripsLivree(this.id).subscribe(function (data) {
            _this.livree = data;
        });
    };
    DashboardComponent.prototype.getTripAnnulee = function () {
        var _this = this;
        this.dservice.getTripsAnnulee(this.id).subscribe(function (data) {
            _this.annulee = data;
        });
    };
    DashboardComponent.prototype.getTripRetournee = function () {
        var _this = this;
        this.dservice.getTripRetournee(this.id).subscribe(function (data) {
            _this.Retournee = data;
            console.log("Retournee", _this.Retournee);
        });
    };
    DashboardComponent.prototype.getTripRetour = function () {
        var _this = this;
        this.dservice.getTripRetour(this.id).subscribe(function (data) {
            _this.Retour = data;
            console.log("Retour", _this.Retour);
        });
    };
    DashboardComponent.prototype.getTripChezlivreur = function () {
        var _this = this;
        this.dservice.getTripChezlivreur(this.id).subscribe(function (data) {
            _this.Chezlivreur = data;
            console.log("Chez livreur", _this.Chezlivreur);
        });
    };
    DashboardComponent.prototype.getTripEncourLivraison = function () {
        var _this = this;
        this.dservice.getTripEncoursdeLivraison(this.id).subscribe(function (data) {
            _this.Encours = data;
            console.log("EN cours", _this.Encours);
        });
    };
    DashboardComponent.prototype.getTripEnchemin = function () {
        var _this = this;
        this.dservice.getTripEnchemin(this.id).subscribe(function (data) {
            _this.Enchemin = data;
            console.log("En chemein", _this.Enchemin);
        });
    };
    DashboardComponent.prototype.getTripChercheLivreur = function () {
        var _this = this;
        this.dservice.getTripChercheLivreur(this.id).subscribe(function (data) {
            _this.ChercheL = data;
            console.log("Cherche Livreur::", _this.ChercheL);
        });
    };
    DashboardComponent.prototype.getDriverAcrives = function () {
        var _this = this;
        this.dservice.getDriverActive().subscribe(function (data) {
            _this.driver = data;
        });
    };
    DashboardComponent.prototype.getTrips = function () {
        var _this = this;
        this.sommeCH = 0;
        this.sommeLC = 0;
        this.dservice.getTripParClient().subscribe(function (data) {
            /*const result = data['_body'];
            const jo = JSON.parse(result);
            const obj = Array.of(jo.data);*/
            _this.jsonObj = data.data;
            console.log('cleint: ', _this.jsonObj);
            for (var index = 0; index < _this.jsonObj.length; index++) {
                _this.items.push(_this.jsonObj[index]);
                _this.somm = _this.jsonObj[index];
                _this.sommeCH += Number(_this.somm[1]);
                _this.sommeLC += Number(_this.somm[2]);
            }
            console.log('cleint2222: ', _this.items);
            console.log('somme222: ', _this.sommeCH);
            console.log('somme222: ', _this.sommeLC);
        });
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/layout/dashboard/dashboard.component.html"),
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/layout/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [_dashboard_service__WEBPACK_IMPORTED_MODULE_0__["DashboardService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/dashboard/dashboard.module.ts ***!
  \******************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _shared_modules_statdriver_statdriver_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../shared/modules/statdriver/statdriver.module */ "./src/app/shared/modules/statdriver/statdriver.module.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _dashboard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.service */ "./src/app/layout/dashboard/dashboard.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/layout/dashboard/dashboard-routing.module.ts");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/layout/dashboard/dashboard.component.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components */ "./src/app/layout/dashboard/components/index.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular-6-datatable */ "./node_modules/angular-6-datatable/index.js");
/* harmony import */ var angular_6_datatable__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(angular_6_datatable__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCarouselModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbAlertModule"],
                _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_6__["DashboardRoutingModule"],
                _shared__WEBPACK_IMPORTED_MODULE_9__["StatModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_1__["HttpModule"],
                _shared_modules_statdriver_statdriver_module__WEBPACK_IMPORTED_MODULE_0__["StatDriverModule"],
                angular_6_datatable__WEBPACK_IMPORTED_MODULE_10__["DataTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"]
            ],
            declarations: [
                _dashboard_component__WEBPACK_IMPORTED_MODULE_7__["DashboardComponent"],
                _components__WEBPACK_IMPORTED_MODULE_8__["TimelineComponent"],
                _components__WEBPACK_IMPORTED_MODULE_8__["NotificationComponent"],
                _components__WEBPACK_IMPORTED_MODULE_8__["ChatComponent"]
            ],
            providers: [_dashboard_service__WEBPACK_IMPORTED_MODULE_2__["DashboardService"]]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/layout/dashboard/dashboard.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/dashboard/dashboard.service.ts ***!
  \*******************************************************/
/*! exports provided: DashboardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardService", function() { return DashboardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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



var DashboardService = /** @class */ (function () {
    function DashboardService(http, httpc) {
        this.http = http;
        this.httpc = httpc;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].serverUrl + '/trip';
        this.urlD = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].serverUrl + '/driver';
        this.jwt = JSON.parse(localStorage.getItem('currentUser')).token;
        this.headerOptions = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Authorization': "Bearer " + this.jwt
        });
    }
    DashboardService.prototype.getTripsEncours = function (id) {
        return this.httpc.get(this.url + "/encours?id=" + id);
    };
    DashboardService.prototype.getTripsLivree = function (id) {
        return this.httpc.get(this.url + "/livree?id=" + id);
    };
    DashboardService.prototype.getTripsAnnulee = function (id) {
        return this.httpc.get(this.url + "/annulee?id=" + id);
    };
    DashboardService.prototype.getDriverActive = function () {
        return this.httpc.get(this.urlD + "/activelast");
    };
    DashboardService.prototype.getTripRetournee = function (id) {
        return this.httpc.get(this.url + "/Retournee?id=" + id);
    };
    DashboardService.prototype.getTripRetour = function (id) {
        console.log('envoie de requéte');
        return this.httpc.get(this.url + "/enretour?id=" + id);
    };
    DashboardService.prototype.getTripChezlivreur = function (id) {
        return this.httpc.get(this.url + "/chezlivreur?id=" + id);
    };
    DashboardService.prototype.getTripEncoursdeLivraison = function (id) {
        return this.httpc.get(this.url + "/encourslivraison?id=" + id);
    };
    DashboardService.prototype.getTripEnchemin = function (id) {
        return this.httpc.get(this.url + "/enchemin?id=" + id);
    };
    DashboardService.prototype.getTripChercheLivreur = function (id) {
        return this.httpc.get(this.url + "/cherchelivreur?id=" + id);
    };
    DashboardService.prototype.getTripParClient = function () {
        return this.httpc.get(this.url + "/statusparclient");
    };
    DashboardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DashboardService);
    return DashboardService;
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
//# sourceMappingURL=dashboard-dashboard-module.js.map