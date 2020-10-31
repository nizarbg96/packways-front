(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["map-trips-map-trips-module"],{

/***/ "./node_modules/agm-direction/fesm5/agm-direction.js":
/*!***********************************************************!*\
  !*** ./node_modules/agm-direction/fesm5/agm-direction.js ***!
  \***********************************************************/
/*! exports provided: AgmDirectionModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgmDirectionModule", function() { return AgmDirectionModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return AgmDirection; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AgmDirection = /** @class */ (function () {
    function AgmDirection(gmapsApi) {
        this.gmapsApi = gmapsApi;
        // Options
        this.travelMode = 'DRIVING';
        this.transitOptions = undefined;
        this.drivingOptions = undefined;
        this.waypoints = [];
        this.optimizeWaypoints = true;
        this.provideRouteAlternatives = false;
        this.avoidHighways = false;
        this.avoidTolls = false;
        // Remove or draw direction
        this.visible = true;
        // Direction change event handler
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Direction response for the new request
        this.onResponse = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Send a custom infowindow
        this.sendInfoWindow = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Status of Directions Query (google.maps.DirectionsStatus.OVER_QUERY_LIMIT)
        this.status = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.directionsService = undefined;
        this.directionsDisplay = undefined;
        this.waypointsMarker = [];
        // Use for visible flag
        this.isFirstChange = true;
    }
    /**
     * @return {?}
     */
    AgmDirection.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.visible === true) {
            this.directionDraw();
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    AgmDirection.prototype.ngOnChanges = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /**
         * When visible is false then remove the direction layer
         */
        if (!this.visible) {
            try {
                if (typeof this.originMarker !== 'undefined') {
                    this.originMarker.setMap(null);
                    this.destinationMarker.setMap(null);
                    this.waypointsMarker.forEach(function (w) { return w.setMap(null); });
                }
                this.directionsDisplay.setPanel(null);
                this.directionsDisplay.setMap(null);
                this.directionsDisplay = undefined;
            }
            catch (e) { }
        }
        else {
            if (this.isFirstChange) {
                /**
                 * When visible is false at the first time
                 */
                if (typeof this.directionsDisplay === 'undefined') {
                    this.directionDraw();
                }
                this.isFirstChange = false;
                return;
            }
            /**
             * When renderOptions are not first change then reset the display
             */
            if (typeof obj.renderOptions !== 'undefined') {
                if (obj.renderOptions.firstChange === false) {
                    if (typeof this.originMarker !== 'undefined') {
                        this.originMarker.setMap(null);
                        this.destinationMarker.setMap(null);
                        this.waypointsMarker.forEach(function (w) { return w.setMap(null); });
                    }
                    this.directionsDisplay.setPanel(null);
                    this.directionsDisplay.setMap(null);
                    this.directionsDisplay = undefined;
                }
            }
            this.directionDraw();
        }
    };
    /**
     * This event is fired when the user creating or updating this direction
     */
    /**
     * This event is fired when the user creating or updating this direction
     * @return {?}
     */
    AgmDirection.prototype.directionDraw = /**
     * This event is fired when the user creating or updating this direction
     * @return {?}
     */
    function () {
        var _this = this;
        this.gmapsApi.getNativeMap().then(function (map) {
            if (typeof _this.directionsDisplay === 'undefined') {
                _this.directionsDisplay = new google.maps.DirectionsRenderer(_this.renderOptions);
                _this.directionsDisplay.setMap(map);
                _this.directionsDisplay.addListener('directions_changed', function () {
                    _this.onChange.emit(_this.directionsDisplay.getDirections());
                });
            }
            if (typeof _this.directionsService === 'undefined') {
                _this.directionsService = new google.maps.DirectionsService;
            }
            if (typeof _this.panel === 'undefined') {
                _this.directionsDisplay.setPanel(null);
            }
            else {
                _this.directionsDisplay.setPanel(_this.panel);
            }
            // Render exist direction
            if (typeof _this.renderRoute === 'object' && _this.renderRoute !== null) {
                _this.directionsDisplay.setDirections(_this.renderRoute);
                _this.renderRoute = null; // or set undefined, ''
            }
            else {
                // Request new direction
                _this.directionsService.route({
                    origin: _this.origin,
                    destination: _this.destination,
                    travelMode: _this.travelMode,
                    transitOptions: _this.transitOptions,
                    drivingOptions: _this.drivingOptions,
                    waypoints: _this.waypoints,
                    optimizeWaypoints: _this.optimizeWaypoints,
                    provideRouteAlternatives: _this.provideRouteAlternatives,
                    avoidHighways: _this.avoidHighways,
                    avoidTolls: _this.avoidTolls,
                }, function (response, status) {
                    _this.onResponse.emit(response);
                    // Emit Query Status
                    _this.status.emit(status);
                    /**
                     * DirectionsStatus
                     * https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus
                     */
                    switch (status) {
                        case 'OK':
                            _this.directionsDisplay.setDirections(response);
                            /**
                             * Emit The DirectionsResult Object
                             * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                             */
                            // Custom Markers
                            if (typeof _this.markerOptions !== 'undefined') {
                                // Remove origin markers
                                try {
                                    if (typeof _this.originMarker !== 'undefined') {
                                        google.maps.event.clearListeners(_this.originMarker, 'click');
                                        _this.originMarker.setMap(null);
                                    }
                                    if (typeof _this.destinationMarker !== 'undefined') {
                                        google.maps.event.clearListeners(_this.destinationMarker, 'click');
                                        _this.destinationMarker.setMap(null);
                                    }
                                    _this.waypointsMarker.forEach(function (w) {
                                        if (typeof w !== 'undefined') {
                                            google.maps.event.clearListeners(w, 'click');
                                            w.setMap(null);
                                        }
                                    });
                                }
                                catch (err) {
                                    console.error('Can not reset custom marker.', err);
                                }
                                // Set custom markers
                                /** @type {?} */
                                var _route_1 = response.routes[0].legs[0];
                                try {
                                    // Origin Marker
                                    if (typeof _this.markerOptions.origin !== 'undefined') {
                                        _this.markerOptions.origin.map = map;
                                        _this.markerOptions.origin.position = _route_1.start_location;
                                        _this.originMarker = _this.setMarker(map, _this.originMarker, _this.markerOptions.origin, _route_1.start_address);
                                    }
                                    // Destination Marker
                                    if (typeof _this.markerOptions.destination !== 'undefined') {
                                        _this.markerOptions.destination.map = map;
                                        _this.markerOptions.destination.position = _route_1.end_location;
                                        _this.destinationMarker = _this.setMarker(map, _this.destinationMarker, _this.markerOptions.destination, _route_1.end_address);
                                    }
                                    // Waypoints Marker
                                    if (typeof _this.markerOptions.waypoints !== 'undefined') {
                                        _this.waypoints.forEach(function (waypoint, index) {
                                            // If waypoints are not array then set all the same
                                            if (!Array.isArray(_this.markerOptions.waypoints)) {
                                                _this.markerOptions.waypoints.map = map;
                                                _this.markerOptions.waypoints.position = _route_1.via_waypoints[index];
                                                _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints, _route_1.via_waypoints[index]));
                                            }
                                            else {
                                                _this.markerOptions.waypoints[index].map = map;
                                                _this.markerOptions.waypoints[index].position = _route_1.via_waypoints[index];
                                                _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints[index], _route_1.via_waypoints[index]));
                                            }
                                        }); // End forEach
                                    }
                                }
                                catch (err) {
                                    console.error('MarkerOptions error.', err);
                                }
                            }
                            break;
                        default:
                            // console.warn(status);
                            break;
                    } // End switch
                });
            }
        });
    };
    /**
     * Custom Origin and Destination Icon
     * @param map map
     * @param marker marker
     * @param markerOpts properties
     * @param content marker's infowindow content
     * @returns new marker
     * @memberof AgmDirection
     */
    /**
     * Custom Origin and Destination Icon
     * \@memberof AgmDirection
     * @param {?} map map
     * @param {?} marker marker
     * @param {?} markerOpts properties
     * @param {?} content marker's infowindow content
     * @return {?} new marker
     */
    AgmDirection.prototype.setMarker = /**
     * Custom Origin and Destination Icon
     * \@memberof AgmDirection
     * @param {?} map map
     * @param {?} marker marker
     * @param {?} markerOpts properties
     * @param {?} content marker's infowindow content
     * @return {?} new marker
     */
    function (map, marker, markerOpts, content) {
        var _this = this;
        if (typeof this.infoWindow === 'undefined') {
            this.infoWindow = new google.maps.InfoWindow({});
            this.sendInfoWindow.emit(this.infoWindow);
        }
        marker = new google.maps.Marker(markerOpts);
        marker.addListener('click', function () {
            /** @type {?} */
            var infowindoContent = typeof markerOpts.infoWindow === 'undefined' ? content : markerOpts.infoWindow;
            _this.infoWindow.setContent(infowindoContent);
            _this.infoWindow.open(map, marker);
        });
        return marker;
    };
    AgmDirection.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: 'agm-direction',
                },] }
    ];
    /** @nocollapse */
    AgmDirection.ctorParameters = function () { return [
        { type: _agm_core__WEBPACK_IMPORTED_MODULE_1__["GoogleMapsAPIWrapper"] }
    ]; };
    AgmDirection.propDecorators = {
        origin: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        destination: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        travelMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        transitOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        drivingOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        waypoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        optimizeWaypoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        provideRouteAlternatives: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        avoidHighways: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        avoidTolls: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        renderOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        panel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        markerOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        infoWindow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        visible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        renderRoute: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        onChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        onResponse: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        sendInfoWindow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        status: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
    };
    return AgmDirection;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AgmDirectionModule = /** @class */ (function () {
    function AgmDirectionModule() {
    }
    /**
     * @return {?}
     */
    AgmDirectionModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: AgmDirectionModule,
        };
    };
    AgmDirectionModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [],
                    declarations: [
                        AgmDirection,
                    ],
                    exports: [
                        AgmDirection,
                    ]
                },] }
    ];
    return AgmDirectionModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=agm-direction.js.map


/***/ }),

/***/ "./src/app/layout/map-trips/map-trips-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/map-trips/map-trips-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: MapTripsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapTripsRoutingModule", function() { return MapTripsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _map_trips_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map-trips.component */ "./src/app/layout/map-trips/map-trips.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _map_trips_component__WEBPACK_IMPORTED_MODULE_2__["MapTripsComponent"]
    }
];
var MapTripsRoutingModule = /** @class */ (function () {
    function MapTripsRoutingModule() {
    }
    MapTripsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MapTripsRoutingModule);
    return MapTripsRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/map-trips/map-trips.component.html":
/*!***********************************************************!*\
  !*** ./src/app/layout/map-trips/map-trips.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@routerTransition]>\n        <div class=\"row\">            \n                <div id=\"map\"></div>\n                <div id=\"right-panel\">\n                  <p>Total Distance: <span id=\"total\"></span></p>\n                </div>   \n        </div>\n</div>  \n    "

/***/ }),

/***/ "./src/app/layout/map-trips/map-trips.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/layout/map-trips/map-trips.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "agm-map {\n  height: 400px;\n  width: 100%; }\n\n#map {\n  height: 400px;\n  width: 100%; }\n\n#map-canvas {\n  height: 400px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hcC10cmlwcy9EOlxcTmV3UGFja3dheXNXZWJcXGRvdHdheXMvc3JjXFxhcHBcXGxheW91dFxcbWFwLXRyaXBzXFxtYXAtdHJpcHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFhO0VBQ2IsWUFBVyxFQUNkOztBQUVEO0VBQ0ksY0FBYTtFQUNiLFlBQVcsRUFDZDs7QUFFRDtFQUNJLGNBQVksRUFDZiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9tYXAtdHJpcHMvbWFwLXRyaXBzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYWdtLW1hcCB7XHJcbiAgICBoZWlnaHQ6IDQwMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbiNtYXAge1xyXG4gICAgaGVpZ2h0OiA0MDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4jbWFwLWNhbnZhcyB7XHJcbiAgICBoZWlnaHQ6NDAwcHg7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/map-trips/map-trips.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layout/map-trips/map-trips.component.ts ***!
  \*********************************************************/
/*! exports provided: MapTripsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapTripsComponent", function() { return MapTripsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MapTripsComponent = /** @class */ (function () {
    function MapTripsComponent() {
        this.lat = 33.667090;
        this.lng = 10.016560;
        this.renderOptions = { polylineOptions: { strokeColor: '#f0f' }, draggable: true, };
        this.origin1 = { lat: 33.667090, lng: 10.016560 };
        this.destination1 = { lat: 36.716927, lng: 10.370461 };
        this.origin2 = { lat: 36.716927, lng: 10.370461 };
        this.destination2 = { lat: 35.789524, lng: 10.972017 };
        this.travelMode = 'DRIVING';
        this.transitOptions = undefined;
        this.drivingOptions = undefined;
        this.optimizeWaypoints = true;
        this.provideRouteAlternatives = true;
        this.avoidHighways = true;
        this.avoidTolls = true;
        this.visible = true;
        this.waypoints = [
            {
                location: { lat: 34.667090, lng: 10.716560 },
                stopover: true,
            }
        ];
        this.markerOptions = {
            origin: {
                draggable: true,
                infoWindow: 'This is origin.',
            },
            destination: {
                draggable: true,
                infoWindow: "<h4>Hello<h4>",
                label: 'marker label',
                opacity: 0.8,
            },
            waypoints: {
                icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756617_face_512x512.png',
                label: 'marker label',
                opacity: 0.8,
            },
        };
        this.markers = [
            { latitude: 52.228973, longitude: 20.728218, draggable: true }
        ];
        this.infoWindow = undefined;
        this.citymap = {
            chicago: {
                center: { lat: 41.878, lng: -87.629 },
                population: 2714856
            },
            newyork: {
                center: { lat: 40.714, lng: -74.005 },
                population: 8405837
            },
            losangeles: {
                center: { lat: 34.052, lng: -118.243 },
                population: 3857799
            },
            vancouver: {
                center: { lat: 49.25, lng: -123.1 },
                population: 603502
            }
        };
    }
    MapTripsComponent.prototype.ngOnInit = function () {
        //this.getDirection();
        this.initMap();
    };
    MapTripsComponent.prototype.getDirection = function () {
        this.origin = { lat: 33.667090, lng: 10.016560 };
        this.destination = { lat: 36.716927, lng: 10.370461 };
        // this.origin = 'Taipei Main Station'
        // this.destination = 'Taiwan Presidential Office'
    };
    MapTripsComponent.prototype.getStatus = function (status) {
        console.log('status', status);
    };
    MapTripsComponent.prototype.obtainInfowindow = function (window) {
        this.infoWindow = window;
    };
    MapTripsComponent.prototype.change = function (event) {
        this.waypoints = event.request.waypoints;
    };
    MapTripsComponent.prototype.placeMarker = function (position) {
        var lat = position.coords.lat;
        var lng = position.coords.lng;
        this.markers.push({ latitude: lat, longitude: lng, draggable: true });
    };
    MapTripsComponent.prototype.initMap = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: { lat: -24.345, lng: 134.46 } // Australia.
        });
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            map: map,
            panel: document.getElementById('right-panel')
        });
        directionsDisplay.addListener('directions_changed', function () {
            var rslt = directionsDisplay.getDirections();
            console.log('rslt: ', rslt);
            //this.computeTotalDistance(rslt);
        });
        this.displayRoute('Perth, WA', 'Sydney, NSW', directionsService, directionsDisplay);
        // this.addCircle(map);
    };
    MapTripsComponent.prototype.displayRoute = function (origin, destination, service, display) {
        service.route({
            origin: origin,
            destination: destination,
            //waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}], 
            waypoints: [{ location: 'Adelaide, SA' }, { location: 'Broken Hill, NSW' }],
            travelMode: 'DRIVING',
            avoidTolls: true
        }, function (response, status) {
            if (status === 'OK') {
                display.setDirections(response);
            }
            else {
                alert('Could not display directions due to: ' + status);
            }
        });
    };
    MapTripsComponent.prototype.computeTotalDistance = function (result) {
        console.log('result: ', result);
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' km';
    };
    MapTripsComponent.prototype.addCircle = function (map) {
        // tslint:disable-next-line:forin
        for (var city in this.citymap) {
            // Add the circle for this city to the map.
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: this.citymap[city].center,
                radius: Math.sqrt(this.citymap[city].population) * 100
            });
        }
    };
    MapTripsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-map-trips',
            template: __webpack_require__(/*! ./map-trips.component.html */ "./src/app/layout/map-trips/map-trips.component.html"),
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_1__["routerTransition"])()],
            styles: [__webpack_require__(/*! ./map-trips.component.scss */ "./src/app/layout/map-trips/map-trips.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MapTripsComponent);
    return MapTripsComponent;
}());



/***/ }),

/***/ "./src/app/layout/map-trips/map-trips.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/map-trips/map-trips.module.ts ***!
  \******************************************************/
/*! exports provided: MapTripsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapTripsModule", function() { return MapTripsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var agm_direction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! agm-direction */ "./node_modules/agm-direction/fesm5/agm-direction.js");
/* harmony import */ var _map_trips_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map-trips.component */ "./src/app/layout/map-trips/map-trips.component.ts");
/* harmony import */ var _map_trips_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./map-trips-routing.module */ "./src/app/layout/map-trips/map-trips-routing.module.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


 // @agm/core
 // agm-direction



var MapTripsModule = /** @class */ (function () {
    function MapTripsModule() {
    }
    MapTripsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _map_trips_routing_module__WEBPACK_IMPORTED_MODULE_5__["MapTripsRoutingModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_2__["AgmCoreModule"].forRoot({
                    apiKey: src_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].googleAPIKey,
                }),
                agm_direction__WEBPACK_IMPORTED_MODULE_3__["AgmDirectionModule"]
            ],
            declarations: [_map_trips_component__WEBPACK_IMPORTED_MODULE_4__["MapTripsComponent"]]
        })
    ], MapTripsModule);
    return MapTripsModule;
}());



/***/ })

}]);
//# sourceMappingURL=map-trips-map-trips-module.js.map