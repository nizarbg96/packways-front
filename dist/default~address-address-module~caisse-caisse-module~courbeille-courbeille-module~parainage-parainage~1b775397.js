(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~address-address-module~caisse-caisse-module~courbeille-courbeille-module~parainage-parainage~1b775397"],{

/***/ "./node_modules/ng2-completer/esm5/ng2-completer.js":
/*!**********************************************************!*\
  !*** ./node_modules/ng2-completer/esm5/ng2-completer.js ***!
  \**********************************************************/
/*! exports provided: LocalData, RemoteData, LocalDataFactory, RemoteDataFactory, CompleterService, CtrCompleter, CtrDropdown, CtrInput, CtrList, CtrRow, CompleterListItemCmp, CompleterCmp, Ng2CompleterModule, ɵa, ɵb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalData", function() { return LocalData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoteData", function() { return RemoteData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalDataFactory", function() { return LocalDataFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoteDataFactory", function() { return RemoteDataFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleterService", function() { return CompleterService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrCompleter", function() { return CtrCompleter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrDropdown", function() { return CtrDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrInput", function() { return CtrInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrList", function() { return CtrList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrRow", function() { return CtrRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleterListItemCmp", function() { return CompleterListItemCmp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleterCmp", function() { return CompleterCmp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2CompleterModule", function() { return Ng2CompleterModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return CtrListContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return CompleterBaseData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/observable/timer */ "./node_modules/rxjs-compat/_esm5/observable/timer.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/**
 * @license ng2-completer
 * MIT license
 */











/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MAX_CHARS = 524288; // the default max length per the html maxlength attribute
var MIN_SEARCH_LENGTH = 3;
var PAUSE = 10;
var TEXT_SEARCHING = "Searching...";
var TEXT_NO_RESULTS = "No results found";
var CLEAR_TIMEOUT = 50;
/**
 * @param {?} value
 * @return {?}
 */
function isNil(value) {
    return typeof value === "undefined" || value === null;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var CompleterBaseData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(CompleterBaseData, _super);
    function CompleterBaseData() {
        return _super.call(this) || this;
    }
    /**
     * @return {?}
     */
    CompleterBaseData.prototype.cancel = /**
     * @return {?}
     */
    function () {
        return;
    };
    /**
     * @param {?} searchFields
     * @return {?}
     */
    CompleterBaseData.prototype.searchFields = /**
     * @param {?} searchFields
     * @return {?}
     */
    function (searchFields) {
        this._searchFields = searchFields;
        return this;
    };
    /**
     * @param {?} titleField
     * @return {?}
     */
    CompleterBaseData.prototype.titleField = /**
     * @param {?} titleField
     * @return {?}
     */
    function (titleField) {
        this._titleField = titleField;
        return this;
    };
    /**
     * @param {?} descriptionField
     * @return {?}
     */
    CompleterBaseData.prototype.descriptionField = /**
     * @param {?} descriptionField
     * @return {?}
     */
    function (descriptionField) {
        this._descriptionField = descriptionField;
        return this;
    };
    /**
     * @param {?} imageField
     * @return {?}
     */
    CompleterBaseData.prototype.imageField = /**
     * @param {?} imageField
     * @return {?}
     */
    function (imageField) {
        this._imageField = imageField;
        return this;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    CompleterBaseData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ image = null;
        var /** @type {?} */ formattedText;
        var /** @type {?} */ formattedDesc = null;
        if (this._titleField) {
            formattedText = this.extractTitle(data);
        }
        else {
            formattedText = data;
        }
        if (typeof formattedText !== "string") {
            formattedText = JSON.stringify(formattedText);
        }
        if (this._descriptionField) {
            formattedDesc = this.extractValue(data, this._descriptionField);
        }
        if (this._imageField) {
            image = this.extractValue(data, this._imageField);
        }
        if (isNil(formattedText)) {
            return null;
        }
        return /** @type {?} */ ({
            description: formattedDesc,
            image: image,
            originalObject: data,
            title: formattedText
        });
    };
    /**
     * @param {?} data
     * @param {?} term
     * @return {?}
     */
    CompleterBaseData.prototype.extractMatches = /**
     * @param {?} data
     * @param {?} term
     * @return {?}
     */
    function (data, term) {
        var _this = this;
        var /** @type {?} */ matches = [];
        var /** @type {?} */ searchFields = this._searchFields ? this._searchFields.split(",") : null;
        if (this._searchFields !== null && this._searchFields !== undefined && term !== "") {
            matches = data.filter(function (item) {
                var /** @type {?} */ values = searchFields ? _this.extractBySearchFields(searchFields, item) : [item];
                return values.some(function (value) {
                    return value
                        .toString()
                        .toLowerCase()
                        .indexOf(term.toString().toLowerCase()) >= 0;
                });
            });
        }
        else {
            matches = data;
        }
        return matches;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CompleterBaseData.prototype.extractTitle = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        // split title fields and run extractValue for each and join with ' '
        if (!this._titleField) {
            return "";
        }
        return this._titleField.split(",")
            .map(function (field) {
            return _this.extractValue(item, field);
        })
            .reduce(function (acc, titlePart) { return acc ? acc + " " + titlePart : titlePart; });
    };
    /**
     * @param {?} obj
     * @param {?} key
     * @return {?}
     */
    CompleterBaseData.prototype.extractValue = /**
     * @param {?} obj
     * @param {?} key
     * @return {?}
     */
    function (obj, key) {
        var /** @type {?} */ keys;
        var /** @type {?} */ result;
        if (key) {
            keys = key.split(".");
            result = obj;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                key = keys_1[_i];
                if (result) {
                    result = result[key];
                }
            }
        }
        else {
            result = obj;
        }
        return result;
    };
    /**
     * @param {?} matches
     * @return {?}
     */
    CompleterBaseData.prototype.processResults = /**
     * @param {?} matches
     * @return {?}
     */
    function (matches) {
        var /** @type {?} */ i;
        var /** @type {?} */ results = [];
        if (matches && matches.length > 0) {
            for (i = 0; i < matches.length; i++) {
                var /** @type {?} */ item = this.convertToItem(matches[i]);
                if (item) {
                    results.push(item);
                }
            }
        }
        return results;
    };
    /**
     * @param {?} searchFields
     * @param {?} item
     * @return {?}
     */
    CompleterBaseData.prototype.extractBySearchFields = /**
     * @param {?} searchFields
     * @param {?} item
     * @return {?}
     */
    function (searchFields, item) {
        var _this = this;
        return searchFields
            .map(function (searchField) { return _this.extractValue(item, searchField); }).filter(function (value) { return !!value; });
    };
    return CompleterBaseData;
}(rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LocalData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LocalData, _super);
    function LocalData() {
        var _this = _super.call(this) || this;
        _this.dataSourceChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        return _this;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    LocalData.prototype.data = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data instanceof rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"]) {
            var /** @type {?} */ data$ = /** @type {?} */ (data);
            data$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function () { return []; }))
                .subscribe(function (res) {
                _this._data = res;
                if (_this.savedTerm) {
                    _this.search(_this.savedTerm);
                }
                _this.dataSourceChange.emit();
            });
        }
        else {
            this._data = data;
        }
        this.dataSourceChange.emit();
        return this;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    LocalData.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (!this._data) {
            this.savedTerm = term;
        }
        else {
            this.savedTerm = null;
            var /** @type {?} */ matches = this.extractMatches(this._data, term);
            this.next(this.processResults(matches));
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    LocalData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    return LocalData;
}(CompleterBaseData));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RemoteData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(RemoteData, _super);
    function RemoteData(http$$1) {
        var _this = _super.call(this) || this;
        _this.http = http$$1;
        _this.dataSourceChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this._urlFormater = null;
        _this._dataField = null;
        return _this;
    }
    /**
     * @param {?} remoteUrl
     * @return {?}
     */
    RemoteData.prototype.remoteUrl = /**
     * @param {?} remoteUrl
     * @return {?}
     */
    function (remoteUrl) {
        this._remoteUrl = remoteUrl;
        this.dataSourceChange.emit();
        return this;
    };
    /**
     * @param {?} urlFormater
     * @return {?}
     */
    RemoteData.prototype.urlFormater = /**
     * @param {?} urlFormater
     * @return {?}
     */
    function (urlFormater) {
        this._urlFormater = urlFormater;
    };
    /**
     * @param {?} dataField
     * @return {?}
     */
    RemoteData.prototype.dataField = /**
     * @param {?} dataField
     * @return {?}
     */
    function (dataField) {
        this._dataField = dataField;
    };
    /**
     * @param {?} requestOptions
     * @return {?}
     */
    RemoteData.prototype.requestOptions = /**
     * @param {?} requestOptions
     * @return {?}
     */
    function (requestOptions) {
        this._requestOptions = requestOptions;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    RemoteData.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        this.cancel();
        // let params = {};
        var /** @type {?} */ url = "";
        if (this._urlFormater) {
            url = this._urlFormater(term);
        }
        else {
            url = this._remoteUrl + encodeURIComponent(term);
        }
        this.remoteSearch = this.http
            .get(url, Object.assign({}, this._requestOptions))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            var /** @type {?} */ matches = _this.extractValue(data, _this._dataField);
            return _this.extractMatches(matches, term);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function () { return []; }))
            .subscribe(function (matches) {
            var /** @type {?} */ results = _this.processResults(matches);
            _this.next(results);
        });
    };
    /**
     * @return {?}
     */
    RemoteData.prototype.cancel = /**
     * @return {?}
     */
    function () {
        if (this.remoteSearch) {
            this.remoteSearch.unsubscribe();
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    RemoteData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    return RemoteData;
}(CompleterBaseData));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LocalDataFactory = (function () {
    function LocalDataFactory() {
    }
    /**
     * @return {?}
     */
    LocalDataFactory.prototype.create = /**
     * @return {?}
     */
    function () {
        return new LocalData();
    };
    LocalDataFactory.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] },
    ];
    /** @nocollapse */
    LocalDataFactory.ctorParameters = function () { return []; };
    return LocalDataFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RemoteDataFactory = (function () {
    function RemoteDataFactory(http$$1) {
        this.http = http$$1;
    }
    /**
     * @return {?}
     */
    RemoteDataFactory.prototype.create = /**
     * @return {?}
     */
    function () {
        return new RemoteData(this.http);
    };
    RemoteDataFactory.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] },
    ];
    /** @nocollapse */
    RemoteDataFactory.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"], },
    ]; };
    return RemoteDataFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CompleterService = (function () {
    function CompleterService(localDataFactory, remoteDataFactory // Using any instead of () => LocalData because of AoT errors
    ) {
        this.localDataFactory = localDataFactory;
        this.remoteDataFactory = remoteDataFactory;
    }
    /**
     * @param {?} data
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    CompleterService.prototype.local = /**
     * @param {?} data
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    function (data, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var /** @type {?} */ localData = this.localDataFactory.create();
        return localData
            .data(data)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    /**
     * @param {?} url
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    CompleterService.prototype.remote = /**
     * @param {?} url
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    function (url, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var /** @type {?} */ remoteData = this.remoteDataFactory.create();
        return remoteData
            .remoteUrl(url)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    CompleterService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] },
    ];
    /** @nocollapse */
    CompleterService.ctorParameters = function () { return [
        { type: LocalDataFactory, },
        { type: RemoteDataFactory, },
    ]; };
    return CompleterService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

var CtrCompleter = (function () {
    function CtrCompleter() {
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.highlighted = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.opened = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.dataSourceChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._hasHighlighted = false;
        this._hasSelected = false;
        this._cancelBlur = false;
        this._isOpen = false;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    CtrCompleter.prototype.registerList = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        this.list = list;
    };
    /**
     * @param {?} dropdown
     * @return {?}
     */
    CtrCompleter.prototype.registerDropdown = /**
     * @param {?} dropdown
     * @return {?}
     */
    function (dropdown) {
        this.dropdown = dropdown;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CtrCompleter.prototype.onHighlighted = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.highlighted.emit(item);
        this._hasHighlighted = !!item;
    };
    /**
     * @param {?} item
     * @param {?=} clearList
     * @return {?}
     */
    CtrCompleter.prototype.onSelected = /**
     * @param {?} item
     * @param {?=} clearList
     * @return {?}
     */
    function (item, clearList) {
        if (clearList === void 0) { clearList = true; }
        this.selected.emit(item);
        if (item) {
            this._hasSelected = true;
        }
        if (clearList) {
            this.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.onDataSourceChange = /**
     * @return {?}
     */
    function () {
        if (this.hasSelected) {
            this.selected.emit(null);
            this._hasSelected = false;
        }
        this.dataSourceChange.emit();
    };
    /**
     * @param {?} term
     * @return {?}
     */
    CtrCompleter.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (this._hasSelected) {
            this.selected.emit(null);
            this._hasSelected = false;
        }
        if (this.list) {
            this.list.search(term);
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._hasHighlighted = false;
        this.isOpen = false;
        if (this.dropdown) {
            this.dropdown.clear();
        }
        if (this.list) {
            this.list.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.selectCurrent = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.selectCurrent();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.nextRow = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.nextRow();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.prevRow = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.prevRow();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.hasHighlighted = /**
     * @return {?}
     */
    function () {
        return this._hasHighlighted;
    };
    /**
     * @param {?} cancel
     * @return {?}
     */
    CtrCompleter.prototype.cancelBlur = /**
     * @param {?} cancel
     * @return {?}
     */
    function (cancel) {
        this._cancelBlur = cancel;
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.isCancelBlur = /**
     * @return {?}
     */
    function () {
        return this._cancelBlur;
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.open = /**
     * @return {?}
     */
    function () {
        if (!this._isOpen) {
            this.isOpen = true;
            this.list.open();
        }
    };
    Object.defineProperty(CtrCompleter.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isOpen;
        },
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            this._isOpen = open;
            this.opened.emit(this._isOpen);
            if (this.list) {
                this.list.isOpen(open);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrCompleter.prototype, "autoHighlightIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoHighlightIndex;
        },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._autoHighlightIndex = index;
            if (this.dropdown) {
                this.dropdown.highlightRow(this._autoHighlightIndex);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrCompleter.prototype, "hasSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasSelected;
        },
        enumerable: true,
        configurable: true
    });
    CtrCompleter.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrCompleter]",
                },] },
    ];
    /** @nocollapse */
    CtrCompleter.ctorParameters = function () { return []; };
    CtrCompleter.propDecorators = {
        "selected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "highlighted": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "opened": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "dataSourceChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
    };
    return CtrCompleter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

var CtrRowItem = (function () {
    function CtrRowItem(row, index) {
        this.row = row;
        this.index = index;
    }
    return CtrRowItem;
}());
var CtrDropdown = (function () {
    function CtrDropdown(completer, el) {
        this.completer = completer;
        this.el = el;
        this.rows = [];
        this._rowMouseDown = false;
        this.completer.registerDropdown(this);
    }
    /**
     * @return {?}
     */
    CtrDropdown.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.completer.registerDropdown(null);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ css = getComputedStyle(this.el.nativeElement);
        var /** @type {?} */ autoHighlightIndex = this.completer.autoHighlightIndex;
        this.isScrollOn = !!css.maxHeight && css.overflowY === "auto";
        if (autoHighlightIndex) {
            setTimeout(function () {
                _this.highlightRow(autoHighlightIndex);
            }, 0);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrDropdown.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // Support for canceling blur on IE (issue #158)
        if (!this._rowMouseDown) {
            this.completer.cancelBlur(true);
            setTimeout(function () {
                _this.completer.cancelBlur(false);
            }, 0);
        }
        else {
            this._rowMouseDown = false;
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    CtrDropdown.prototype.registerRow = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var /** @type {?} */ arrIndex = this.rows.findIndex(function (_row) { return _row.index === row.index; });
        if (arrIndex >= 0) {
            this.rows[arrIndex] = row;
        }
        else {
            this.rows.push(row);
        }
    };
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    CtrDropdown.prototype.unregisterRow = /**
     * @param {?} rowIndex
     * @return {?}
     */
    function (rowIndex) {
        var /** @type {?} */ arrIndex = this.rows.findIndex(function (_row) { return _row.index === rowIndex; });
        this.rows.splice(arrIndex, 1);
        if (this.currHighlighted && rowIndex === this.currHighlighted.index) {
            this.highlightRow(null);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    CtrDropdown.prototype.highlightRow = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ highlighted = this.rows.find(function (row) { return row.index === index; });
        if (isNil(index) || /** @type {?} */ ((index)) < 0) {
            if (this.currHighlighted) {
                this.currHighlighted.row.setHighlighted(false);
            }
            this.currHighlighted = undefined;
            this.completer.onHighlighted(null);
            return;
        }
        if (!highlighted) {
            return;
        }
        if (this.currHighlighted) {
            this.currHighlighted.row.setHighlighted(false);
        }
        this.currHighlighted = highlighted;
        this.currHighlighted.row.setHighlighted(true);
        this.completer.onHighlighted(this.currHighlighted.row.getDataItem());
        if (this.isScrollOn && this.currHighlighted) {
            var /** @type {?} */ rowTop = this.dropdownRowTop();
            if (!rowTop) {
                return;
            }
            if (rowTop < 0) {
                this.dropdownScrollTopTo(rowTop - 1);
            }
            else {
                var /** @type {?} */ row = this.currHighlighted.row.getNativeElement();
                if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
                    this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
                    if (this.el.nativeElement.getBoundingClientRect().bottom - this.dropdownRowOffsetHeight(row) < row.getBoundingClientRect().top) {
                        this.dropdownScrollTopTo(row.getBoundingClientRect().top - (this.el.nativeElement.getBoundingClientRect().top + parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).paddingTop), 10)));
                    }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.rows = [];
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CtrDropdown.prototype.onSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.completer.onSelected(item);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.rowMouseDown = /**
     * @return {?}
     */
    function () {
        this._rowMouseDown = true;
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.selectCurrent = /**
     * @return {?}
     */
    function () {
        if (this.currHighlighted) {
            this.onSelected(this.currHighlighted.row.getDataItem());
        }
        else if (this.rows.length > 0) {
            this.onSelected(this.rows[0].row.getDataItem());
        }
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.nextRow = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ nextRowIndex = 0;
        if (this.currHighlighted) {
            nextRowIndex = this.currHighlighted.index + 1;
        }
        this.highlightRow(nextRowIndex);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.prevRow = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ nextRowIndex = -1;
        if (this.currHighlighted) {
            nextRowIndex = this.currHighlighted.index - 1;
        }
        this.highlightRow(nextRowIndex);
    };
    /**
     * @param {?} offset
     * @return {?}
     */
    CtrDropdown.prototype.dropdownScrollTopTo = /**
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop + offset;
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.dropdownRowTop = /**
     * @return {?}
     */
    function () {
        if (!this.currHighlighted) {
            return;
        }
        return this.currHighlighted.row.getNativeElement().getBoundingClientRect().top -
            (this.el.nativeElement.getBoundingClientRect().top +
                parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).paddingTop), 10));
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.dropdownHeight = /**
     * @return {?}
     */
    function () {
        return this.el.nativeElement.getBoundingClientRect().top +
            parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).maxHeight), 10);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    CtrDropdown.prototype.dropdownRowOffsetHeight = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var /** @type {?} */ css = getComputedStyle(row.parentElement);
        return row.parentElement.offsetHeight +
            parseInt(/** @type {?} */ (css.marginTop), 10) + parseInt(/** @type {?} */ (css.marginBottom), 10);
    };
    CtrDropdown.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrDropdown]",
                },] },
    ];
    /** @nocollapse */
    CtrDropdown.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"] },] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], },
    ]; };
    CtrDropdown.propDecorators = {
        "onMouseDown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["mousedown", ["$event"],] },],
    };
    return CtrDropdown;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// keyboard events
var KEY_DW = 40;
var KEY_RT = 39;
var KEY_UP = 38;
var KEY_LF = 37;
var KEY_ES = 27;
var KEY_EN = 13;
var KEY_TAB = 9;
var KEY_BK = 8;
var KEY_SH = 16;
var KEY_CL = 20;
var KEY_F1 = 112;
var KEY_F12 = 123;
var CtrInput = (function () {
    function CtrInput(completer, ngModel, el) {
        var _this = this;
        this.completer = completer;
        this.ngModel = ngModel;
        this.el = el;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.overrideSuggested = false;
        this.fillHighlighted = true;
        this.openOnFocus = false;
        this.openOnClick = false;
        this.selectOnClick = false;
        this.selectOnFocus = false;
        this.ngModelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._searchStr = "";
        this._displayStr = "";
        this.blurTimer = null;
        this.completer.selected.subscribe(function (item) {
            if (!item) {
                return;
            }
            if (_this.clearSelected) {
                _this.searchStr = "";
            }
            else {
                _this.searchStr = item.title;
            }
            _this.ngModelChange.emit(_this.searchStr);
        });
        this.completer.highlighted.subscribe(function (item) {
            if (_this.fillHighlighted) {
                if (item) {
                    _this._displayStr = item.title;
                    _this.ngModelChange.emit(item.title);
                }
                else {
                    _this._displayStr = _this.searchStr;
                    _this.ngModelChange.emit(_this.searchStr);
                }
            }
        });
        this.completer.dataSourceChange.subscribe(function () {
            _this.completer.search(_this.searchStr);
        });
        if (this.ngModel.valueChanges) {
            this.ngModel.valueChanges.subscribe(function (value) {
                if (!isNil(value) && _this._displayStr !== value) {
                    if (_this.searchStr !== value) {
                        _this.completer.search(value);
                    }
                    _this.searchStr = value;
                }
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.keyupHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT || event.keyCode === KEY_TAB) {
            // do nothing
            return;
        }
        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
            event.preventDefault();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.search(this.searchStr);
        }
        else if (event.keyCode === KEY_ES) {
            if (this.completer.isOpen) {
                this.restoreSearchValue();
                this.completer.clear();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.pasteHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.completer.open();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ keyCode = event.keyCode || event.which;
        if (keyCode === KEY_EN) {
            if (this.completer.hasHighlighted()) {
                event.preventDefault();
            }
            this.handleSelection();
        }
        else if (keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.open();
            this.completer.nextRow();
        }
        else if (keyCode === KEY_UP) {
            event.preventDefault();
            this.completer.prevRow();
        }
        else if (keyCode === KEY_TAB) {
            this.handleSelection();
        }
        else if (keyCode === KEY_BK) {
            this.completer.open();
        }
        else if (keyCode === KEY_ES) {
            // This is very specific to IE10/11 #272
            // without this, IE clears the input text
            event.preventDefault();
            if (this.completer.isOpen) {
                event.stopPropagation();
            }
        }
        else {
            if (keyCode !== 0 && keyCode !== KEY_SH && keyCode !== KEY_CL &&
                (keyCode <= KEY_F1 || keyCode >= KEY_F12) &&
                !event.ctrlKey && !event.metaKey && !event.altKey) {
                this.completer.open();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.onBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // Check if we need to cancel Blur for IE
        if (this.completer.isCancelBlur()) {
            setTimeout(function () {
                // get the focus back
                // get the focus back
                _this.el.nativeElement.focus();
            }, 0);
            return;
        }
        if (this.completer.isOpen) {
            this.blurTimer = Object(rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_7__["timer"])(200).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function () { return _this.doBlur(); });
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.onfocus = /**
     * @return {?}
     */
    function () {
        if (this.blurTimer) {
            this.blurTimer.unsubscribe();
            this.blurTimer = null;
        }
        if (this.selectOnFocus) {
            this.el.nativeElement.select();
        }
        if (this.openOnFocus) {
            this.completer.open();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.selectOnClick) {
            this.el.nativeElement.select();
        }
        if (this.openOnClick) {
            if (this.completer.isOpen) {
                this.completer.clear();
            }
            else {
                this.completer.open();
            }
        }
    };
    Object.defineProperty(CtrInput.prototype, "searchStr", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchStr;
        },
        set: /**
         * @param {?} term
         * @return {?}
         */
        function (term) {
            this._searchStr = term;
            this._displayStr = term;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CtrInput.prototype.handleSelection = /**
     * @return {?}
     */
    function () {
        if (this.completer.hasHighlighted()) {
            this._searchStr = "";
            this.completer.selectCurrent();
        }
        else if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            if (this.clearUnselected && !this.completer.hasSelected) {
                this.searchStr = "";
                this.ngModelChange.emit(this.searchStr);
            }
            this.completer.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.restoreSearchValue = /**
     * @return {?}
     */
    function () {
        if (this.fillHighlighted) {
            if (this._displayStr != this.searchStr) {
                this._displayStr = this.searchStr;
                this.ngModelChange.emit(this.searchStr);
            }
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.doBlur = /**
     * @return {?}
     */
    function () {
        if (this.blurTimer) {
            this.blurTimer.unsubscribe();
            this.blurTimer = null;
        }
        if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            if (this.clearUnselected && !this.completer.hasSelected) {
                this.searchStr = "";
                this.ngModelChange.emit(this.searchStr);
            }
            else {
                this.restoreSearchValue();
            }
        }
        this.completer.clear();
    };
    CtrInput.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrInput]",
                },] },
    ];
    /** @nocollapse */
    CtrInput.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"] },] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], },
    ]; };
    CtrInput.propDecorators = {
        "clearSelected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["clearSelected",] },],
        "clearUnselected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["clearUnselected",] },],
        "overrideSuggested": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["overrideSuggested",] },],
        "fillHighlighted": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["fillHighlighted",] },],
        "openOnFocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["openOnFocus",] },],
        "openOnClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["openOnClick",] },],
        "selectOnClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["selectOnClick",] },],
        "selectOnFocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["selectOnFocus",] },],
        "ngModelChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "keyupHandler": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["keyup", ["$event"],] },],
        "pasteHandler": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["paste", ["$event"],] },],
        "keydownHandler": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["keydown", ["$event"],] },],
        "onBlur": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["blur", ["$event"],] },],
        "onfocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["focus", [],] },],
        "onClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["click", ["$event"],] },],
    };
    return CtrInput;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CtrListContext = (function () {
    function CtrListContext(results, searching, searchInitialized, isOpen) {
        this.results = results;
        this.searching = searching;
        this.searchInitialized = searchInitialized;
        this.isOpen = isOpen;
    }
    return CtrListContext;
}());
var CtrList = (function () {
    function CtrList(completer, templateRef, viewContainer, cd) {
        this.completer = completer;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.ctrListMinSearchLength = MIN_SEARCH_LENGTH;
        this.ctrListPause = PAUSE;
        this.ctrListAutoMatch = false;
        this.ctrListAutoHighlight = false;
        this.ctrListDisplaySearching = true;
        this.term = null;
        this.searchTimer = null;
        this.clearTimer = null;
        this.ctx = new CtrListContext([], false, false, false);
        this._initialValue = null;
        this.viewRef = null;
    }
    /**
     * @return {?}
     */
    CtrList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.completer.registerList(this);
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, new CtrListContext([], false, false, false));
    };
    Object.defineProperty(CtrList.prototype, "dataService", {
        set: /**
         * @param {?} newService
         * @return {?}
         */
        function (newService) {
            this._dataService = newService;
            this.dataServiceSubscribe();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrList.prototype, "initialValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (this._dataService && typeof this._dataService.convertToItem === "function") {
                setTimeout(function () {
                    var /** @type {?} */ initialItem = /** @type {?} */ ((_this._dataService.convertToItem))(value);
                    if (initialItem) {
                        _this.completer.onSelected(initialItem, false);
                    }
                });
            }
            else if (!this._dataService) {
                this._initialValue = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} term
     * @return {?}
     */
    CtrList.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        if (!isNil(term) && term.length >= this.ctrListMinSearchLength && this.term !== term) {
            if (this.searchTimer) {
                this.searchTimer.unsubscribe();
                this.searchTimer = null;
            }
            if (!this.ctx.searching) {
                if (this.ctrListDisplaySearching) {
                    this.ctx.results = [];
                }
                this.ctx.searching = true;
                this.ctx.searchInitialized = true;
                this.refreshTemplate();
            }
            if (this.clearTimer) {
                this.clearTimer.unsubscribe();
            }
            this.searchTimer = Object(rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_7__["timer"])(this.ctrListPause).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function () {
                _this.searchTimerComplete(term);
            });
        }
        else if (!isNil(term) && term.length < this.ctrListMinSearchLength) {
            this.clear();
            this.term = "";
        }
    };
    /**
     * @return {?}
     */
    CtrList.prototype.clear = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
        }
        this.clearTimer = Object(rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_7__["timer"])(CLEAR_TIMEOUT).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function () {
            _this._clear();
        });
    };
    /**
     * @return {?}
     */
    CtrList.prototype.open = /**
     * @return {?}
     */
    function () {
        if (!this.ctx.searchInitialized) {
            this.search("");
        }
        this.refreshTemplate();
    };
    /**
     * @param {?} open
     * @return {?}
     */
    CtrList.prototype.isOpen = /**
     * @param {?} open
     * @return {?}
     */
    function (open) {
        this.ctx.isOpen = open;
    };
    /**
     * @return {?}
     */
    CtrList.prototype._clear = /**
     * @return {?}
     */
    function () {
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
            this.searchTimer = null;
        }
        if (this.dataService) {
            this.dataService.cancel();
        }
        this.viewContainer.clear();
        this.viewRef = null;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    CtrList.prototype.searchTimerComplete = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        // Begin the search
        if (isNil(term) || term.length < this.ctrListMinSearchLength) {
            this.ctx.searching = false;
            return;
        }
        this.term = term;
        this._dataService.search(term);
    };
    /**
     * @return {?}
     */
    CtrList.prototype.refreshTemplate = /**
     * @return {?}
     */
    function () {
        // create the template if it doesn't exist
        if (!this.viewRef) {
            this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.ctx);
        }
        else if (!this.viewRef.destroyed) {
            /** @type {?} */ ((
            // refresh the template
            this.viewRef)).context.isOpen = this.ctx.isOpen; /** @type {?} */
            ((this.viewRef)).context.results = this.ctx.results; /** @type {?} */
            ((this.viewRef)).context.searching = this.ctx.searching; /** @type {?} */
            ((this.viewRef)).context.searchInitialized = this.ctx.searchInitialized;
            this.viewRef.detectChanges();
        }
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    CtrList.prototype.getBestMatchIndex = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.ctx.results || !this.term) {
            return null;
        }
        // First try to find the exact term
        var /** @type {?} */ bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase() === /** @type {?} */ ((_this.term)).toLocaleLowerCase(); });
        // If not try to find the first item that starts with the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().startsWith(/** @type {?} */ ((_this.term)).toLocaleLowerCase()); });
        }
        // If not try to find the first item that includes the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().includes(/** @type {?} */ ((_this.term)).toLocaleLowerCase()); });
        }
        return bestMatch < 0 ? null : bestMatch;
    };
    /**
     * @return {?}
     */
    CtrList.prototype.dataServiceSubscribe = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._dataService) {
            this._dataService.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
                console.error(err);
                console.error("Unexpected error in dataService: errors should be handled by the dataService Observable");
                return [];
            }))
                .subscribe(function (results) {
                _this.ctx.searchInitialized = true;
                _this.ctx.searching = false;
                _this.ctx.results = results;
                if (_this.ctrListAutoMatch && results && results.length === 1 && results[0].title && !isNil(_this.term) &&
                    results[0].title.toLocaleLowerCase() === /** @type {?} */ ((_this.term)).toLocaleLowerCase()) {
                    // Do automatch
                    // Do automatch
                    _this.completer.onSelected(results[0]);
                    return;
                }
                if (_this._initialValue) {
                    _this.initialValue = _this._initialValue;
                    _this._initialValue = null;
                }
                _this.refreshTemplate();
                if (_this.ctrListAutoHighlight) {
                    _this.completer.autoHighlightIndex = _this.getBestMatchIndex();
                }
            });
            if (this._dataService.dataSourceChange) {
                this._dataService.dataSourceChange.subscribe(function () {
                    _this.term = null;
                    _this.ctx.searchInitialized = false;
                    _this.ctx.searching = false;
                    _this.ctx.results = [];
                    _this.refreshTemplate();
                    _this.completer.onDataSourceChange();
                });
            }
        }
    };
    CtrList.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrList]",
                },] },
    ];
    /** @nocollapse */
    CtrList.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"] },] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], },
    ]; };
    CtrList.propDecorators = {
        "ctrListMinSearchLength": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "ctrListPause": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "ctrListAutoMatch": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "ctrListAutoHighlight": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "ctrListDisplaySearching": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "dataService": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["ctrList",] },],
        "initialValue": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["ctrListInitialValue",] },],
    };
    return CtrList;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CtrRow = (function () {
    function CtrRow(el, renderer, dropdown) {
        this.el = el;
        this.renderer = renderer;
        this.dropdown = dropdown;
        this.selected = false;
    }
    /**
     * @return {?}
     */
    CtrRow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._rowIndex) {
            this.dropdown.unregisterRow(this._rowIndex);
        }
    };
    Object.defineProperty(CtrRow.prototype, "ctrRow", {
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._rowIndex = index;
            this.dropdown.registerRow(new CtrRowItem(this, this._rowIndex));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrRow.prototype, "dataItem", {
        set: /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this._item = item;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.onSelected(this._item);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onMouseEnter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.highlightRow(this._rowIndex);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.rowMouseDown();
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    CtrRow.prototype.setHighlighted = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        this.selected = selected;
        this.renderer.setElementClass(this.el.nativeElement, "completer-selected-row", this.selected);
    };
    /**
     * @return {?}
     */
    CtrRow.prototype.getNativeElement = /**
     * @return {?}
     */
    function () {
        return this.el.nativeElement;
    };
    /**
     * @return {?}
     */
    CtrRow.prototype.getDataItem = /**
     * @return {?}
     */
    function () {
        return this._item;
    };
    CtrRow.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrRow]",
                },] },
    ];
    /** @nocollapse */
    CtrRow.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer"], },
        { type: CtrDropdown, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"] },] },
    ]; };
    CtrRow.propDecorators = {
        "ctrRow": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "dataItem": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "onClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["click", ["$event"],] },],
        "onMouseEnter": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["mouseenter", ["$event"],] },],
        "onMouseDown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["mousedown", ["$event"],] },],
    };
    return CtrRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
"use strict";
/**
 * @record
 */

var CompleterListItemCmp = (function () {
    function CompleterListItemCmp() {
        this.parts = [];
    }
    /**
     * @return {?}
     */
    CompleterListItemCmp.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.searchStr) {
            this.parts.push({ isMatch: false, text: this.text });
            return;
        }
        var /** @type {?} */ matchStr = this.text.toLowerCase();
        var /** @type {?} */ matchPos = matchStr.indexOf(this.searchStr.toLowerCase());
        var /** @type {?} */ startIndex = 0;
        while (matchPos >= 0) {
            var /** @type {?} */ matchText = this.text.slice(matchPos, matchPos + this.searchStr.length);
            if (matchPos === 0) {
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length;
            }
            else if (matchPos > 0) {
                var /** @type {?} */ matchPart = this.text.slice(startIndex, matchPos);
                this.parts.push({ isMatch: false, text: matchPart });
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length + matchPart.length;
            }
            matchPos = matchStr.indexOf(this.searchStr.toLowerCase(), startIndex);
        }
        if (startIndex < this.text.length) {
            this.parts.push({ isMatch: false, text: this.text.slice(startIndex, this.text.length) });
        }
    };
    CompleterListItemCmp.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: "completer-list-item",
                    template: "<span class=\"completer-list-item-holder\" [ngClass]= \"{'completer-title': type === 'title', 'completer-description': type === 'description'}\" >\n        <span class=\"completer-list-item\" *ngFor=\"let part of parts\" [ngClass]= \"part.isMatch ? matchClass : null\">{{part.text}}</span>\n    </span>"
                },] },
    ];
    /** @nocollapse */
    CompleterListItemCmp.ctorParameters = function () { return []; };
    CompleterListItemCmp.propDecorators = {
        "text": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "searchStr": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "matchClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "type": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    };
    return CompleterListItemCmp;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
"use strict";
var noop = function () {
    return;
};
var COMPLETER_CONTROL_VALUE_ACCESSOR = {
    multi: true,
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return CompleterCmp; }),
};
var CompleterCmp = (function () {
    function CompleterCmp(completerService, cdr) {
        this.completerService = completerService;
        this.cdr = cdr;
        this.inputName = "";
        this.inputId = "";
        this.pause = PAUSE;
        this.minSearchLength = MIN_SEARCH_LENGTH;
        this.maxChars = MAX_CHARS;
        this.overrideSuggested = false;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.fillHighlighted = true;
        this.placeholder = "";
        this.autoMatch = false;
        this.disableInput = false;
        this.autofocus = false;
        this.openOnFocus = false;
        this.openOnClick = false;
        this.selectOnClick = false;
        this.selectOnFocus = false;
        this.autoHighlight = false;
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.highlighted = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.blurEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.click = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.focusEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.opened = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.keyup = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.keydown = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]("");
        this.displaySearching = true;
        this.displayNoResults = true;
        this._textNoResults = TEXT_NO_RESULTS;
        this._textSearching = TEXT_SEARCHING;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._focus = false;
        this._open = false;
        this._searchStr = "";
    }
    Object.defineProperty(CompleterCmp.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this.searchStr; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.searchStr) {
                this.searchStr = v;
            }
            // Propagate the change in any case
            this._onChangeCallback(v);
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(CompleterCmp.prototype, "searchStr", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchStr;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === "string" || isNil(value)) {
                this._searchStr = value;
            }
            else {
                this._searchStr = JSON.stringify(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.autofocus) {
            this._focus = true;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._focus) {
            setTimeout(function () {
                _this.ctrInput.nativeElement.focus();
                _this._focus = false;
            }, 0);
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onTouched = /**
     * @return {?}
     */
    function () {
        this._onTouchedCallback();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CompleterCmp.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.searchStr = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CompleterCmp.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CompleterCmp.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    CompleterCmp.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disableInput = isDisabled;
    };
    Object.defineProperty(CompleterCmp.prototype, "datasource", {
        set: /**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            if (source) {
                if (source instanceof Array) {
                    this.dataService = this.completerService.local(source);
                }
                else if (typeof (source) === "string") {
                    this.dataService = this.completerService.remote(source);
                }
                else {
                    this.dataService = /** @type {?} */ (source);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textNoResults", {
        set: /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            if (this._textNoResults !== text) {
                this._textNoResults = text;
                this.displayNoResults = !!this._textNoResults && this._textNoResults !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textSearching", {
        set: /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            if (this._textSearching !== text) {
                this._textSearching = text;
                this.displaySearching = !!this._textSearching && this._textSearching !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.completer.selected.subscribe(function (item) {
            _this.selected.emit(item);
        });
        this.completer.highlighted.subscribe(function (item) {
            _this.highlighted.emit(item);
        });
        this.completer.opened.subscribe(function (isOpen) {
            _this._open = isOpen;
            _this.opened.emit(isOpen);
        });
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.blurEvent.emit();
        this.onTouched();
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.focusEvent.emit();
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.click.emit(event);
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onKeyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keyup.emit(event);
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keydown.emit(event);
        event.stopPropagation();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CompleterCmp.prototype.onChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.open = /**
     * @return {?}
     */
    function () {
        this.completer.open();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.close = /**
     * @return {?}
     */
    function () {
        this.completer.clear();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.focus();
        }
        else {
            this._focus = true;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.blur = /**
     * @return {?}
     */
    function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.blur();
        }
        else {
            this._focus = false;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.isOpen = /**
     * @return {?}
     */
    function () {
        return this._open;
    };
    CompleterCmp.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: "ng2-completer",
                    template: "\n        <div class=\"completer-holder\" ctrCompleter>\n            <input #ctrInput [attr.id]=\"inputId.length > 0 ? inputId : null\" type=\"search\"\n                class=\"completer-input\" ctrInput [ngClass]=\"inputClass\"\n                [(ngModel)]=\"searchStr\" (ngModelChange)=\"onChange($event)\"\n                [attr.name]=\"inputName\" [placeholder]=\"placeholder\"\n                [attr.maxlength]=\"maxChars\" [tabindex]=\"fieldTabindex\" [disabled]=\"disableInput\"\n                [clearSelected]=\"clearSelected\" [clearUnselected]=\"clearUnselected\"\n                [overrideSuggested]=\"overrideSuggested\" [openOnFocus]=\"openOnFocus\" [fillHighlighted]=\"fillHighlighted\"\n                [openOnClick]=\"openOnClick\" [selectOnClick]=\"selectOnClick\" [selectOnFocus]=\"selectOnFocus\"\n                (blur)=\"onBlur()\" (focus)=\"onFocus()\" (keyup)=\"onKeyup($event)\"\n                (keydown)=\"onKeydown($event)\" (click)=\"onClick($event)\"\n                autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\n\n            <div class=\"completer-dropdown-holder\"\n                *ctrList=\"dataService;\n                    minSearchLength: minSearchLength;\n                    pause: pause;\n                    autoMatch: autoMatch;\n                    initialValue: initialValue;\n                    autoHighlight: autoHighlight;\n                    displaySearching: displaySearching;\n                    let items = results;\n                    let searchActive = searching;\n                    let isInitialized = searchInitialized;\n                    let isOpen = isOpen;\">\n                <div class=\"completer-dropdown\" ctrDropdown \n                    *ngIf=\"isInitialized && isOpen && (( items?.length > 0|| (displayNoResults && !searchActive)) || (searchActive && displaySearching))\">\n                    <div *ngIf=\"searchActive && displaySearching\" class=\"completer-searching\">{{ _textSearching }}</div>\n                    <div *ngIf=\"!searchActive && (!items || items?.length === 0)\"\n                    class=\"completer-no-results\">{{ _textNoResults }}</div>\n                    <div class=\"completer-row-wrapper\" *ngFor=\"let item of items; let rowIndex=index\">\n                        <div class=\"completer-row\" [ctrRow]=\"rowIndex\" [dataItem]=\"item\">\n                            <div *ngIf=\"item.image || item.image === ''\" class=\"completer-image-holder\">\n                                <img *ngIf=\"item.image != ''\" src=\"{{item.image}}\" class=\"completer-image\" />\n                                <div *ngIf=\"item.image === ''\" class=\"completer-image-default\"></div>\n                            </div>\n                            <div class=\"completer-item-text\"\n                            [ngClass]=\"{'completer-item-text-image': item.image || item.image === '' }\">\n                                <completer-list-item\n                                class=\"completer-title\" [text]=\"item.title\" [matchClass]=\"matchClass\"\n                                [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n                                <completer-list-item *ngIf=\"item.description && item.description != ''\"\n                                class=\"completer-description\" [text]=\"item.description\"\n                                    [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n                                </completer-list-item>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                    styles: ["\n    .completer-dropdown {\n        border-color: #ececec;\n        border-width: 1px;\n        border-style: solid;\n        border-radius: 2px;\n        width: 250px;\n        padding: 6px;\n        cursor: pointer;\n        z-index: 9999;\n        position: absolute;\n        margin-top: -6px;\n        background-color: #ffffff;\n    }\n\n    .completer-row {\n        padding: 5px;\n        color: #000000;\n        margin-bottom: 4px;\n        clear: both;\n        display: inline-block;\n        width: 103%;\n    }\n\n    .completer-selected-row {\n        background-color: lightblue;\n        color: #ffffff;\n    }\n\n    .completer-description {\n        font-size: 14px;\n    }\n\n    .completer-image-default {\n        width: 16px;\n        height: 16px;\n        background-image: url(\"demo/res/img/default.png\");\n    }\n\n    .completer-image-holder {\n        float: left;\n        width: 10%;\n    }\n    .completer-item-text-image {\n        float: right;\n        width: 90%;\n    }\n    "],
                    providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CompleterCmp.ctorParameters = function () { return [
        { type: CompleterService, },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], },
    ]; };
    CompleterCmp.propDecorators = {
        "dataService": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "inputName": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "inputId": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "pause": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "minSearchLength": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "maxChars": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "overrideSuggested": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "clearSelected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "clearUnselected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "fillHighlighted": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "placeholder": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "matchClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "fieldTabindex": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "autoMatch": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "disableInput": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "inputClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "autofocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "openOnFocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "openOnClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "selectOnClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "selectOnFocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "initialValue": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "autoHighlight": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "selected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "highlighted": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "blurEvent": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ["blur",] },],
        "click": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "focusEvent": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ["focus",] },],
        "opened": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "keyup": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "keydown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "completer": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: [CtrCompleter,] },],
        "ctrInput": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ["ctrInput",] },],
        "datasource": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "textNoResults": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "textSearching": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    };
    return CompleterCmp;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var providers = [
    CompleterService,
    LocalDataFactory,
    RemoteDataFactory
];
var Ng2CompleterModule = (function () {
    function Ng2CompleterModule() {
    }
    /**
     * @return {?}
     */
    Ng2CompleterModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Ng2CompleterModule,
            providers: providers
        };
    };
    /**
     * @return {?}
     */
    Ng2CompleterModule.forChild = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Ng2CompleterModule,
            providers: providers
        };
    };
    Ng2CompleterModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [
                        CompleterListItemCmp,
                        CtrCompleter,
                        CtrDropdown,
                        CtrInput,
                        CtrList,
                        CtrRow,
                        CompleterCmp
                    ],
                    exports: [
                        CompleterListItemCmp,
                        CtrCompleter,
                        CtrDropdown,
                        CtrInput,
                        CtrList,
                        CtrRow,
                        CompleterCmp
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_9__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
                    ],
                    providers: providers
                },] },
    ];
    /** @nocollapse */
    Ng2CompleterModule.ctorParameters = function () { return []; };
    return Ng2CompleterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ng2-completer.js.map


/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/Observable.js":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/Observable.js ***!
  \******************************************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/internal/Observable */ "./node_modules/rxjs/internal/Observable.js");
/* harmony import */ var rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"]; });


//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/Subject.js":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/Subject.js ***!
  \***************************************************/
/*! exports provided: Subject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]; });


//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/catch.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_catch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/catch */ "./node_modules/rxjs-compat/_esm5/operator/catch.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.catch = _operator_catch__WEBPACK_IMPORTED_MODULE_1__["_catch"];
rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype._catch = _operator_catch__WEBPACK_IMPORTED_MODULE_1__["_catch"];
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/observable/timer.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/observable/timer.js ***!
  \************************************************************/
/*! exports provided: timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"]; });


//# sourceMappingURL=timer.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/operator/catch.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/operator/catch.js ***!
  \**********************************************************/
/*! exports provided: _catch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_catch", function() { return _catch; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

function _catch(selector) {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])(selector)(this);
}
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Observable.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/internal/Observable.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canReportError_1 = __webpack_require__(/*! ./util/canReportError */ "./node_modules/rxjs/internal/util/canReportError.js");
var toSubscriber_1 = __webpack_require__(/*! ./util/toSubscriber */ "./node_modules/rxjs/internal/util/toSubscriber.js");
var observable_1 = __webpack_require__(/*! ../internal/symbol/observable */ "./node_modules/rxjs/internal/symbol/observable.js");
var pipe_1 = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/internal/util/pipe.js");
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var Observable = (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source || (config_1.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            if (canReportError_1.canReportError(sink)) {
                sink.error(err);
            }
            else {
                console.warn(err);
            }
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config_1.config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Observer.js":
/*!************************************************!*\
  !*** ./node_modules/rxjs/internal/Observer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var hostReportError_1 = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/internal/util/hostReportError.js");
exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError_1.hostReportError(err);
        }
    },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Subscriber.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/internal/Subscriber.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/internal/util/isFunction.js");
var Observer_1 = __webpack_require__(/*! ./Observer */ "./node_modules/rxjs/internal/Observer.js");
var Subscription_1 = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/internal/Subscription.js");
var rxSubscriber_1 = __webpack_require__(/*! ../internal/symbol/rxSubscriber */ "./node_modules/rxjs/internal/symbol/rxSubscriber.js");
var config_1 = __webpack_require__(/*! ./config */ "./node_modules/rxjs/internal/config.js");
var hostReportError_1 = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/internal/util/hostReportError.js");
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        _this._parentSubscription = null;
        switch (arguments.length) {
            case 0:
                _this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        _this.destination = destinationOrNext;
                        destinationOrNext.add(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        this._parentSubscription = null;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config_1.config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError_1.hostReportError(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    hostReportError_1.hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError_1.hostReportError(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                hostReportError_1.hostReportError(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
exports.SafeSubscriber = SafeSubscriber;
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/Subscription.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/internal/Subscription.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = __webpack_require__(/*! ./util/isArray */ "./node_modules/rxjs/internal/util/isArray.js");
var isObject_1 = __webpack_require__(/*! ./util/isObject */ "./node_modules/rxjs/internal/util/isObject.js");
var isFunction_1 = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/internal/util/isFunction.js");
var tryCatch_1 = __webpack_require__(/*! ./util/tryCatch */ "./node_modules/rxjs/internal/util/tryCatch.js");
var errorObject_1 = __webpack_require__(/*! ./util/errorObject */ "./node_modules/rxjs/internal/util/errorObject.js");
var UnsubscriptionError_1 = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/internal/util/UnsubscriptionError.js");
var Subscription = (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
            _parent.remove(this);
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function') {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            this._parent = parent;
        }
        else if (!_parents) {
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/config.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/internal/config.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _enable_super_gross_mode_that_will_cause_bad_things = false;
exports.config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = new Error();
            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/symbol/observable.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/internal/symbol/observable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/symbol/rxSubscriber.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/internal/symbol/rxSubscriber.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.rxSubscriber = typeof Symbol === 'function'
    ? Symbol('rxSubscriber')
    : '@@rxSubscriber_' + Math.random();
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/UnsubscriptionError.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs/internal/util/UnsubscriptionError.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ?
        errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
}
UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
exports.UnsubscriptionError = UnsubscriptionErrorImpl;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/canReportError.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/internal/util/canReportError.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/internal/Subscriber.js");
function canReportError(observer) {
    while (observer) {
        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
        if (closed_1 || isStopped) {
            return false;
        }
        else if (destination && destination instanceof Subscriber_1.Subscriber) {
            observer = destination;
        }
        else {
            observer = null;
        }
    }
    return true;
}
exports.canReportError = canReportError;
//# sourceMappingURL=canReportError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/errorObject.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/internal/util/errorObject.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/hostReportError.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs/internal/util/hostReportError.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function hostReportError(err) {
    setTimeout(function () { throw err; });
}
exports.hostReportError = hostReportError;
//# sourceMappingURL=hostReportError.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isArray.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isFunction.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isFunction.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/isObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs/internal/util/isObject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/noop.js":
/*!*************************************************!*\
  !*** ./node_modules/rxjs/internal/util/noop.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/pipe.js":
/*!*************************************************!*\
  !*** ./node_modules/rxjs/internal/util/pipe.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var noop_1 = __webpack_require__(/*! ./noop */ "./node_modules/rxjs/internal/util/noop.js");
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/toSubscriber.js":
/*!*********************************************************!*\
  !*** ./node_modules/rxjs/internal/util/toSubscriber.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/internal/Subscriber.js");
var rxSubscriber_1 = __webpack_require__(/*! ../symbol/rxSubscriber */ "./node_modules/rxjs/internal/symbol/rxSubscriber.js");
var Observer_1 = __webpack_require__(/*! ../Observer */ "./node_modules/rxjs/internal/Observer.js");
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/internal/util/tryCatch.js":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs/internal/util/tryCatch.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errorObject_1 = __webpack_require__(/*! ./errorObject */ "./node_modules/rxjs/internal/util/errorObject.js");
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
//# sourceMappingURL=tryCatch.js.map

/***/ })

}]);
//# sourceMappingURL=default~address-address-module~caisse-caisse-module~courbeille-courbeille-module~parainage-parainage~1b775397.js.map