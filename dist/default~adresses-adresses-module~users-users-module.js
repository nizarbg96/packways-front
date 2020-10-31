(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~adresses-adresses-module~users-users-module"],{

/***/ "./node_modules/ng-auto-complete/fesm5/ng-auto-complete.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ng-auto-complete/fesm5/ng-auto-complete.js ***!
  \*****************************************************************/
/*! exports provided: NgAutoCompleteComponent, NgAutoCompleteModule, PipeModule, SearchableAutoCompleteItems, SearchableAutoCompleteString, ComparableAutoCompleteString, TransformToAutocompleteItem, AutocompleteItem, CreateNewAutocompleteGroup, AutocompleteGroup, ReturnStringArrayByID, FilterRemovals, IsMobileOrTablet, NotUsedKey, ɵa, ɵb, ɵc, ɵd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgAutoCompleteComponent", function() { return NgAutoCompleteComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgAutoCompleteModule", function() { return NgAutoCompleteModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipeModule", function() { return PipeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchableAutoCompleteItems", function() { return SearchableAutoCompleteItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchableAutoCompleteString", function() { return SearchableAutoCompleteString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparableAutoCompleteString", function() { return ComparableAutoCompleteString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformToAutocompleteItem", function() { return TransformToAutocompleteItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutocompleteItem", function() { return AutocompleteItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateNewAutocompleteGroup", function() { return CreateNewAutocompleteGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutocompleteGroup", function() { return AutocompleteGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReturnStringArrayByID", function() { return ReturnStringArrayByID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterRemovals", function() { return FilterRemovals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsMobileOrTablet", function() { return IsMobileOrTablet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotUsedKey", function() { return NotUsedKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return CompleterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return NgDropdownDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return HighlightPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return KeyValuePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutocompleteItem = /** @class */ (function () {
    function AutocompleteItem(title, id, original) {
        this.title = title;
        this.id = id;
        this.original = original;
    }
    return AutocompleteItem;
}());
/**
 *
 * @param {?} items
 * @param {?} titleKey
 * @param {?=} childrenKey
 * @return {?}
 */
function SearchableAutoCompleteItems(items, titleKey, childrenKey) {
    if (childrenKey === void 0) { childrenKey = null; }
    return items.reduce(function (r, i) {
        /** @type {?} */
        var t = SearchableAutoCompleteString(i[titleKey], i.id);
        if (typeof r[t] === 'undefined') {
            r[t] = TransformToAutocompleteItem(i, titleKey, childrenKey);
        }
        return r;
    }, {});
}
/**
 *
 * @param {?} key
 * @param {?} id
 * @return {?}
 */
function SearchableAutoCompleteString(key, id) {
    return key.replace(/ /g, "_") + "_id_" + String(id);
}
/**
 *
 * @param {?} str
 * @return {?}
 */
function ComparableAutoCompleteString(str) {
    return str.replace(/_/g, " ");
}
/**
 * object must have an ID
 * @param {?} object
 * @param {?} titleKey
 * @param {?=} childrenKey
 * @return {?}
 */
function TransformToAutocompleteItem(object, titleKey, childrenKey) {
    if (childrenKey === void 0) { childrenKey = null; }
    /** @type {?} */
    var item = new AutocompleteItem(object[titleKey], object.id, object);
    /**
     * if there are children, add these.
     */
    if (childrenKey !== null)
        item.children = object[childrenKey];
    return item;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutocompleteGroup = /** @class */ (function () {
    function AutocompleteGroup() {
        this.async = null;
        this.removals = [];
    }
    /**
     *
     */
    /**
     *
     * @param {?} value
     * @param {?} titleKey
     * @return {?}
     */
    AutocompleteGroup.prototype.SetNewValue = /**
     *
     * @param {?} value
     * @param {?} titleKey
     * @return {?}
     */
    function (value, titleKey) {
        /** @type {?} */
        var values = SearchableAutoCompleteItems(value, titleKey);
        this.SetCopy(values);
        /**
         *
         */
        this.value = this.FilterRemovals(this.removals, values);
    };
    /**
     *
     */
    /**
     *
     * @param {?} ids
     * @return {?}
     */
    AutocompleteGroup.prototype.Removables = /**
     *
     * @param {?} ids
     * @return {?}
     */
    function (ids) {
        this.removals = ids;
        /**
         *
         */
        this.value = this.FilterRemovals(this.removals, this._copy);
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    AutocompleteGroup.prototype.InitialValue = /**
     *
     * @return {?}
     */
    function () {
        this.value = this.FilterRemovals(this.removals, this.initialValue);
        /**
         *
         */
        this.SetCopy(this.initialValue);
    };
    /**
     *
     */
    /**
     *
     * @param {?} values
     * @return {?}
     */
    AutocompleteGroup.prototype.SetCopy = /**
     *
     * @param {?} values
     * @return {?}
     */
    function (values) {
        this._copy = Object.assign([], values);
    };
    /**
     *
     */
    /**
     *
     * @param {?} value
     * @return {?}
     */
    AutocompleteGroup.prototype.SetValues = /**
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = SearchableAutoCompleteItems(value, this.keys.titleKey, this.keys.childrenKey);
        /**
         *
         */
        this.initialValue = Object.assign({}, this.value);
        this.SetCopy(Object.assign({}, this.value));
    };
    /**
     *
     */
    /**
     *
     * @param {?} removals
     * @param {?} value
     * @return {?}
     */
    AutocompleteGroup.prototype.FilterRemovals = /**
     *
     * @param {?} removals
     * @param {?} value
     * @return {?}
     */
    function (removals, value) {
        /** @type {?} */
        var filtered = Object.assign({}, value);
        /** @type {?} */
        var key;
        /** @type {?} */
        var keys = [];
        for (key in filtered) {
            if (filtered.hasOwnProperty(key)) {
                removals.forEach(function (id) {
                    // Comparable string and ID
                    /** @type {?} */
                    var f = "_id_" + String(id);
                    /** @type {?} */
                    var c = key.substring(key.indexOf(f), key.length);
                    if (f === c) {
                        keys.push(key);
                    }
                });
            }
        }
        keys.forEach(function (k) {
            delete filtered[k];
        });
        return filtered;
    };
    return AutocompleteGroup;
}());
/**
 *
 * @template T
 * @param {?} placeholder
 * @param {?} key
 * @param {?} value
 * @param {?} keys
 * @param {?=} parent
 * @param {?=} completion
 * @param {?=} searchLength
 * @return {?}
 */
function CreateNewAutocompleteGroup(placeholder, key, value, keys, parent, completion, searchLength) {
    if (parent === void 0) { parent = ''; }
    if (completion === void 0) { completion = true; }
    if (searchLength === void 0) { searchLength = 2; }
    /** @type {?} */
    var group = new AutocompleteGroup();
    group.key = key;
    group.keys = keys;
    group.placeholder = placeholder;
    group.parent = parent;
    group.completion = completion;
    group.searchLength = searchLength;
    /**
     * Initial value needed, if we empty search box or want to clear it, it needs to be reset.
     * Setting copy, used if user wants to remove values (by id.). This _ list gets filtered.
     */
    group.SetValues(value);
    return group;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var UsedCodeList = {
    ArrowDown: 40,
    ArrowUp: 38,
    Enter: 13,
    Escape: 27,
    Tab: 9,
    MetaLeft: 91,
    AltLeft: 18,
    ControlLeft: 17,
    ShiftLeft: 16,
    ArrowLeft: 37,
    ArrowRight: 39,
    MetaRight: 93,
    AltRight: 18
};
/**
 *
 * @param {?} array
 * @return {?}
 */
function ReturnStringArrayByID(array) {
    return array.reduce(function (result, item) {
        result.push(item.id.toString());
        return result;
    }, []);
}
/**
 *
 * @param {?} removals
 * @param {?} list
 * @return {?}
 */
function FilterRemovals(removals, list) {
    return list.filter(function (item) {
        return removals.indexOf(item.id.toString()) <= -1;
    });
}
/**
 *
 * @return {?}
 */
function IsMobileOrTablet() {
    /** @type {?} */
    var isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    return isMobile;
}
/**
 * @param {?} code
 * @return {?}
 */
function NotUsedKey(code) {
    return typeof UsedCodeList[code] === 'undefined';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgDropdownDirective = /** @class */ (function () {
    function NgDropdownDirective(_eref) {
        this._eref = _eref;
        this.list = [];
        this.active = null;
        this.input = null;
        this.element = null;
        this.key = '';
        this.completion = true;
        this.hover = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.closed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._open = false;
        this._list = [];
        this._class = '';
    }
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.ngOnInit = /**
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this._class = "dr-item-" + this.key + "-";
        if (this.RefExists()) {
            this.input.addEventListener('keydown', function (event) {
                _this.keyDown(event);
            });
        }
        if (!this.completion) {
            document.addEventListener('keydown', function (event) {
                if (_this._open) {
                    _this.keyDown(event);
                }
            });
        }
        if (!IsMobileOrTablet()) {
            this._eref.nativeElement.addEventListener('mouseover', function (event) {
                _this.OnMouseOver(event);
            });
        }
        /**
         *
         */
        this.PrepareList();
    };
    /**
     *
     */
    /**
     *
     * @param {?} changes
     * @return {?}
     */
    NgDropdownDirective.prototype.ngOnChanges = /**
     *
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (typeof changes['active'] !== 'undefined' && !changes['active'].firstChange) {
            this.PrepareList();
        }
        if (typeof changes['list'] !== 'undefined') {
            this.list = changes['list'].currentValue;
            /**
             *
             */
            this.PrepareList();
        }
    };
    /**
     *
     */
    /**
     *
     * @param {?} event
     * @return {?}
     */
    NgDropdownDirective.prototype.keyDown = /**
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        /**
         *
         */
        switch (event.code) {
            case 'ArrowDown':
                this.Open();
                /**
                 *
                 */
                this.SetActive(this.FindActive() + 1);
                this.DropdownFocusAreaDown();
                event.preventDefault();
                break;
            case 'ArrowUp':
                this.Open();
                /**
                 *
                 */
                this.SetActive(this.FindActive() - 1);
                this.DropdownFocusAreaUp();
                event.preventDefault();
                break;
            case 'Enter':
                this.EmitSelected();
                this.Close(null, true);
                event.preventDefault();
                break;
            case 'Escape':
                this.Close(null, true);
                event.preventDefault();
                break;
            case 'Tab':
                if (!event.shiftKey) {
                    this.EmitSelected();
                }
                this.Close(null, true);
                break;
            default:
                return;
        }
    };
    /**
     *
     */
    /**
     *
     * @param {?} event
     * @return {?}
     */
    NgDropdownDirective.prototype.OnMouseOver = /**
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Mouse didn't actually move, so no logic needed.
        if (event.movementX == 0 && event.movementY == 0) {
            return;
        }
        /**
         *
         * @type {?}
         */
        var el = event.target || event.srcElement;
        if (el.id.length > 0 && el.id.includes(this._class)) {
            this.SetActive(Number(el.id.slice(this._class.length, el.id.length)));
        }
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.EmitSelected = /**
     *
     * @return {?}
     */
    function () {
        if (this.FindActive() > -1) {
            this.selected.emit(this._list[this.FindActive()].key);
        }
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.DropdownFocusAreaDown = /**
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scroll = this._eref.nativeElement.offsetHeight + this._eref.nativeElement.scrollTop;
        /**
         *
         */
        if ((this.GetElement(this.FindActive()).offsetTop + this.GetElement(this.FindActive()).offsetHeight) > scroll) {
            this._eref.nativeElement.scrollTop = this.GetElement(this.FindActive()).offsetTop - (this._eref.nativeElement.offsetHeight - this.GetElement(this.FindActive()).offsetHeight);
        }
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.DropdownFocusAreaUp = /**
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scroll = this._eref.nativeElement.scrollTop;
        /**
         *
         */
        if (this.GetElement(this.FindActive()).offsetTop < scroll && scroll > 0) {
            this._eref.nativeElement.scrollTop = this.GetElement(this.FindActive()).offsetTop;
        }
    };
    Object.defineProperty(NgDropdownDirective.prototype, "opened", {
        // =======================================================================//
        // ! Bindings                                                             //
        // =======================================================================//
        /**
         *
         */
        get: 
        // =======================================================================//
        // ! Bindings                                                             //
        // =======================================================================//
        /**
         *
         * @return {?}
         */
        function () {
            return this._open;
        },
        enumerable: true,
        configurable: true
    });
    // =======================================================================//
    // ! Listeners                                                            //
    // =======================================================================//
    /**
     *
     */
    // =======================================================================//
    // ! Listeners                                                            //
    // =======================================================================//
    /**
     *
     * @param {?} event
     * @param {?=} force
     * @return {?}
     */
    NgDropdownDirective.prototype.Close = 
    // =======================================================================//
    // ! Listeners                                                            //
    // =======================================================================//
    /**
     *
     * @param {?} event
     * @param {?=} force
     * @return {?}
     */
    function (event, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!this._open) {
            return;
        }
        /** @type {?} */
        var close = function () {
            _this._open = false;
            /**
             * Emit NULL so listening components know what to do.
             */
            _this.ClearActive();
            _this.hover.emit(null);
            _this.closed.emit();
        };
        if (force) {
            close();
            return;
        }
        if ((this._open && (!this.element.contains(event.target)))) {
            close();
        }
    };
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    /**
     *
     */
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.Open = 
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    /**
     *
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            if (!_this._open && !_this._eref.nativeElement.classList.contains('is-initial-empty')) {
                _this._open = true;
                _this.PrepareList();
                /**
                 *
                 */
                if (_this.FindActive() < 0) {
                    _this._eref.nativeElement.scrollTop = 0;
                }
                else {
                    _this._eref.nativeElement.scrollTop = _this.GetElement(_this.FindActive()).offsetHeight * _this.FindActive();
                }
            }
        }, 0);
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.RefExists = /**
     *
     * @return {?}
     */
    function () {
        return typeof this.input !== 'undefined';
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.FindActive = /**
     *
     * @return {?}
     */
    function () {
        return this._list.reduce(function (result, item, index) {
            if (item.active) {
                result = index;
            }
            return result;
        }, -1);
    };
    /**
     *
     */
    /**
     *
     * @param {?} index
     * @return {?}
     */
    NgDropdownDirective.prototype.SetActive = /**
     *
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index > this._list.length - 1 || index < 0)
            return;
        /**
         *
         */
        this.ClearActive();
        this._list[index].active = true;
        this.hover.emit(this._list[index].key);
        /**
         *
         */
        this.GetElement(index).classList.add('active');
    };
    /**
     *
     */
    /**
     *
     * @param {?} index
     * @return {?}
     */
    NgDropdownDirective.prototype.GetElement = /**
     *
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this._eref.nativeElement.children[index];
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.ClearActive = /**
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this._list.forEach(function (item, index) {
            item.active = false;
            /**
             *
             */
            _this.GetElement(index).classList.remove('active');
        });
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.PrepareList = /**
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this._list = Object.keys(this.list).map(function (key) {
            return {
                key: key,
                active: _this.ActiveItem(key)
            };
        });
        /**
         *
         */
        this.PrepareChildrenList();
    };
    /**
     *
     */
    /**
     *
     * @param {?} item
     * @return {?}
     */
    NgDropdownDirective.prototype.ActiveItem = /**
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.active !== null && item === this.active;
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.DetermineActiveClass = /**
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this._list.forEach(function (item, index) {
            if (typeof _this.GetElement(index) === 'undefined') {
                return;
            }
            /**
             *
             */
            _this.GetElement(index).classList.remove('active');
            if (item.active)
                _this.GetElement(index).classList.add('active');
        });
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.PrepareChildrenList = /**
     *
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var list = this._eref.nativeElement.children;
        setTimeout(function () {
            for (var i = 0; i < list.length; i++) {
                list[i].id = _this._class + i;
            }
        }, 0);
        /**
         *
         */
        this.DetermineActiveClass();
    };
    /**
     *
     */
    /**
     *
     * @param {?} object
     * @return {?}
     */
    NgDropdownDirective.prototype.DeReference = /**
     *
     * @param {?} object
     * @return {?}
     */
    function (object) {
        var item = object.item;
        /**
         *
         */
        return Object.assign({}, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, item));
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgDropdownDirective.prototype.ngOnDestroy = /**
     *
     * @return {?}
     */
    function () {
        if (this.RefExists()) {
            this.wheelHandler = this.removeEventListner.bind(this.input);
            // this.input.removeEventListener('keydown');
        }
        if (!this.completion) {
            this.wheelHandler = this.removeEventListner.bind(document);
            // document.removeEventListener('keydown');
        }
        if (!IsMobileOrTablet()) {
            this.wheelHandler = this.removeEventListner.bind(this._eref);
            // this._eref.nativeElement.removeEventListener('mouseover');
        }
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    NgDropdownDirective.prototype.removeEventListner = /**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        elem.removeEventListener('wheel', this.wheelHandler, true);
    };
    NgDropdownDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[ngDropdown]'
                },] }
    ];
    /** @nocollapse */
    NgDropdownDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    NgDropdownDirective.propDecorators = {
        list: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        active: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        input: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        element: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        key: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        completion: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        hover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        closed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        opened: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"], args: ['class.open',] }],
        Close: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['document:click', ['$event'],] }]
    };
    return NgDropdownDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CompleterComponent = /** @class */ (function () {
    function CompleterComponent(_zone) {
        this._zone = _zone;
        this.cleared = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.noResult = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.group = (/** @type {?} */ ({}));
        this._change = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this._items = {};
        this._completer = '';
        this._highlight = '';
        this._DOM = {
            notFound: (/** @type {?} */ (false)),
            empty: (/** @type {?} */ (false)),
            placeholder: (/** @type {?} */ (null)),
            selected: (/** @type {?} */ ('')),
            isLoading: (/** @type {?} */ (false))
        };
    }
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.ngOnInit = /**
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this._change.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(300))
                .subscribe(function (value) {
                _this._zone.run(function () {
                    if (_this.group.async !== null) {
                        _this.RunAsyncFunction(value);
                    }
                    else {
                        _this.OnModelChange(value);
                    }
                });
            });
        });
        this.SetItems();
    };
    /**
     * Only used when completion is off.
     */
    /**
     * Only used when completion is off.
     * @return {?}
     */
    CompleterComponent.prototype.RegisterClick = /**
     * Only used when completion is off.
     * @return {?}
     */
    function () {
        if (!this.group.completion) {
            this.SwitchDropdownState();
        }
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.DropdownArray = /**
     *
     * @return {?}
     */
    function () {
        if (this.group.completion) {
            this.SwitchDropdownState();
        }
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.SwitchDropdownState = /**
     *
     * @return {?}
     */
    function () {
        if (this.dropdown._open) {
            this.CloseDropdown();
            return;
        }
        /**
         *
         */
        this.OpenDropdown();
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.CloseDropdown = /**
     *
     * @return {?}
     */
    function () {
        this.dropdown._open = false;
        /**
         *
         */
        this._DOM.placeholder = null;
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.OpenDropdown = /**
     *
     * @return {?}
     */
    function () {
        this.dropdown.Open();
        /**
         *
         */
        this._DOM.placeholder = null;
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.SetItems = /**
     *
     * @return {?}
     */
    function () {
        this._items = this.group.value;
        this.IsInitialEmpty();
    };
    /**
     *
     */
    /**
     *
     * @param {?} item
     * @return {?}
     */
    CompleterComponent.prototype.SelectItem = /**
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var i;
        if (typeof item === 'string') {
            i = this._items[item];
            this._DOM.selected = item;
        }
        else {
            i = item;
            this._DOM.selected = SearchableAutoCompleteString(item.title, item.id);
        }
        this._completer = i.title;
        this._highlight = '';
        this.dropdown.Close(null, true);
        this.selected.emit({ group: { key: this.group.key }, item: i });
    };
    /**
     *
     */
    /**
     *
     * @param {?} value
     * @return {?}
     */
    CompleterComponent.prototype.RunAsyncFunction = /**
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var values;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._completer = value;
                        this._highlight = value;
                        this._DOM.selected = null;
                        if (!(value.length === 0)) return [3 /*break*/, 1];
                        this.group.InitialValue();
                        this.ClearModel();
                        this.dropdown.Close('', true);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(value.length > this.group.searchLength)) return [3 /*break*/, 3];
                        this._DOM.isLoading = true;
                        return [4 /*yield*/, this.group.async(value)];
                    case 2:
                        values = _a.sent();
                        this.group.SetNewValue(values, this.group.keys.titleKey);
                        this._DOM.isLoading = false;
                        this._items = this.group.value;
                        this.EmptySearch(this._items, value);
                        // User has typed something now, results could be shown. We need to remove the "is-initial-empty" class.
                        this.IsInitialEmpty();
                        this.dropdown.Open();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    /**
     *
     * @param {?} value
     * @return {?}
     */
    CompleterComponent.prototype.OnModelChange = /**
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._completer = value;
        this._highlight = value;
        this._DOM.selected = null;
        if (value.length === 0) {
            this.ClearModel();
            this.dropdown.Close('', true);
        }
        else if (value.length > this.group.searchLength) {
            this.CompareItemsAndSet(value);
        }
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.ClearModel = /**
     *
     * @return {?}
     */
    function () {
        this._DOM.selected = null;
        this._DOM.notFound = false;
        this.cleared.emit(this.group.key);
    };
    /**
     *
     */
    /**
     *
     * @param {?} value
     * @return {?}
     */
    CompleterComponent.prototype.CompareItemsAndSet = /**
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var obj = {};
        for (var key in this.group.value) {
            if (ComparableAutoCompleteString(key).toLowerCase().indexOf(value.toLowerCase()) > -1) {
                obj[key] = this.group.value[key];
            }
        }
        this._items = obj;
        this.EmptySearch(this._items, value);
        // User has typed something now, results could be shown. We need to remove the "is-initial-empty" class.
        this.IsInitialEmpty();
        this.dropdown.Open();
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.OnInputBlurred = /**
     *
     * @return {?}
     */
    function () {
        if (!this.HasChosenValue()) {
            /**
             * Let component know completer input has been cleared -
             * this function shows the list again, also resets children, if chosen.
             */
            this.OnModelChange('');
        }
    };
    /**
     *
     */
    /**
     *
     * @param {?} item
     * @return {?}
     */
    CompleterComponent.prototype.OnHoverDropdownItem = /**
     *
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (typeof item == 'string') {
            this._DOM.placeholder = this._items[item];
            return;
        }
        if (item == null) {
            this._DOM.placeholder = null;
            return;
        }
        this._DOM.placeholder = item;
    };
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    /**
     * @return {?}
     */
    CompleterComponent.prototype.IsInitialEmpty = 
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    /**
     * @return {?}
     */
    function () {
        if (Object.keys(this._items).length === 0 && this._completer.length === 0) {
            this._DOM.empty = true;
            return;
        }
        this._DOM.empty = false;
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.HasChosenValue = /**
     *
     * @return {?}
     */
    function () {
        return this._DOM.selected !== null;
    };
    /**
     *
     */
    /**
     *
     * @param {?} obj
     * @param {?} query
     * @return {?}
     */
    CompleterComponent.prototype.EmptySearch = /**
     *
     * @param {?} obj
     * @param {?} query
     * @return {?}
     */
    function (obj, query) {
        if (Object.keys(obj).length > 0) {
            this._DOM.notFound = false;
            return;
        }
        this._DOM.notFound = true;
        this.noResult.emit({ group: { key: this.group.key }, query: query });
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    CompleterComponent.prototype.ClearValue = /**
     *
     * @return {?}
     */
    function () {
        this._completer = '';
        this._DOM.selected = null;
        this.group.InitialValue();
        this.IsInitialEmpty();
        /**
         *
         */
        this.selected.emit({ group: { key: this.group.key }, item: null });
    };
    CompleterComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ng-completer',
                    template: "\n        <div #element class=\"ng-autocomplete-dropdown\"\n             [ngClass]=\"{'open': dropdown._open, 'is-loading': _DOM.isLoading, 'is-async': group.async !== null}\">\n\n            <!--GROUP: {{group.key}}-->\n\n            <div class=\"ng-autocomplete-inputs\" (click)=\"RegisterClick()\"\n                 [ngClass]=\"{'completion-off': !group.completion}\">\n                <span class=\"ng-autocomplete-placeholder\"\n                      *ngIf=\"_DOM.placeholder\">\n                  <ng-container *ngIf=\"group.placeholderValue\">\n                      <ng-template *ngTemplateOutlet=\"group.placeholderValue; context: {$implicit: _DOM.placeholder}\"></ng-template>\n                  </ng-container>\n                  <ng-template [ngIf]=\"!group.placeholderValue\">\n                      {{_DOM.placeholder.title}}\n                  </ng-template>\n                </span>\n                <input #input type=\"text\" [placeholder]=\"group.placeholder\" name=\"completer\" [(ngModel)]=\"_completer\"\n                       (ngModelChange)=\"_change.next($event);\"\n                       [value]=\"_completer\"\n                       autocomplete=\"off\"\n                       (click)=\"OpenDropdown()\"\n                       (focus)=\"OpenDropdown()\" class=\"ng-autocomplete-input\">\n\n                <span [ngClass]=\"{'open': dropdown._open}\" class=\"ng-autocomplete-dropdown-icon\"\n                      (click)=\"DropdownArray()\"></span>\n            </div>\n\n            <div class=\"ng-dropdown\" ngDropdown [list]=\"_items\" [element]=\"element\" [input]=\"input\"\n                 [ngClass]=\"{'is-initial-empty': _DOM.empty}\"\n                 [active]=\"_DOM.selected\" [key]=\"group.key\"\n                 [completion]=\"group.completion\"\n                 (hover)=\"OnHoverDropdownItem($event)\"\n                 (selected)=\"SelectItem($event)\"\n                 (closed)=\"OnInputBlurred()\"\n            >\n                <div *ngIf=\"_DOM.notFound && group.noResults\" class=\"dropdown-item no-results\">\n                    <ng-container *ngIf=\"group.noResults\">\n                        <ng-template *ngTemplateOutlet=\"group.noResults; context: {$implicit: _completer}\"></ng-template>\n                    </ng-container>\n                </div>\n\n                <div class=\"dropdown-item\" *ngFor=\"let item of _items | keys; let i = index\"\n                     (click)=\"SelectItem(_items[item])\">\n\n                    <ng-container *ngIf=\"group.dropdownValue\">\n                        <ng-template\n                            *ngTemplateOutlet=\"group.dropdownValue; context: {$implicit: _items[item], highlight: _items[item].title | highlight:_highlight}\"></ng-template>\n                    </ng-container>\n\n                    <div *ngIf=\"!group.dropdownValue\" [innerHTML]=\"_items[item].title | highlight:_highlight\"></div>\n                </div>\n            </div>\n        </div>",
                    styles: ["\n        .ng-autocomplete-inputs {\n            position: relative;\n        }\n\n        .ng-autocomplete-inputs.completion-off {\n            cursor: pointer;\n        }\n\n        .ng-autocomplete-inputs.completion-off input {\n            pointer-events: none;\n        }\n\n        .ng-autocomplete-placeholder {\n            pointer-events: none;\n        }\n\n        .ng-autocomplete-dropdown-icon {\n\n        }\n\n        .ng-autocomplete-dropdown .ng-dropdown {\n            display: none;\n        }\n\n        .ng-autocomplete-dropdown .ng-dropdown.is-empty {\n            display: none;\n        }\n\n        .ng-autocomplete-dropdown .ng-dropdown.open {\n            display: block;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    CompleterComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    CompleterComponent.propDecorators = {
        dropdown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: [NgDropdownDirective,] }],
        cleared: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        noResult: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ['no-result',] }],
        group: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return CompleterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgAutoCompleteComponent = /** @class */ (function () {
    function NgAutoCompleteComponent(cdr) {
        this.cdr = cdr;
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.noResult = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.group = [];
        this.key = '';
        this.classes = [];
        this._viewHasBeenInit = false;
        this._viewInitSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.ngOnInit = /**
     *
     * @return {?}
     */
    function () {
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.ngAfterViewChecked = /**
     *
     * @return {?}
     */
    function () {
        if (!this._viewHasBeenInit) {
            /** @type {?} */
            var el = this.init.nativeElement.querySelector('.after-view-init');
            if (window.getComputedStyle(el).length > 0) {
                this._viewHasBeenInit = true;
                this._viewInitSubject.next(true);
            }
        }
    };
    /**
     *
     */
    /**
     *
     * @param {?} selected
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.ListenToSelected = /**
     *
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        this.selected.emit(selected);
        /**
         *
         */
        this.SetChildren(selected);
    };
    /**
     *
     */
    /**
     *
     * @param {?} group
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.NoResult = /**
     *
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.noResult.emit(group);
    };
    /**
     *
     */
    /**
     *
     * @param {?} key
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.InputCleared = /**
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        this.group.forEach(function (group) {
            if (group.key === key || group.parent === key) {
                _this.ResetInput(group.key);
            }
        });
        /**
         * Items may have changed, need to te re-set list in completer components.
         */
        this.TriggerChange();
    };
    /**
     *
     */
    /**
     *
     * @param {?} selected
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.SetChildren = /**
     *
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        var _this = this;
        this.group.forEach(function (item) {
            if (item.parent == selected.group.key) {
                _this.ResetInput(item.key);
                /**
                 *
                 */
                if (selected.item !== null && typeof selected.item.children !== 'undefined') {
                    item.SetNewValue(selected.item.children, selected.group.keys.titleKey);
                }
            }
        });
        /**
         * Items may have changed, need to te re-set list in completer components.
         */
        this.TriggerChange();
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.TriggerChange = /**
     *
     * @return {?}
     */
    function () {
        this.completers.forEach(function (completer) {
            completer.SetItems();
        });
    };
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    /**
     *
     */
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    /**
     *
     * @param {?} key
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.GetInput = 
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    /**
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.completers.reduce(function (result, completer) {
            if (completer.group.key === key) {
                result = completer;
            }
            return result;
        }, (/** @type {?} */ ({})));
    };
    /**
     *
     */
    /**
     *
     * @param {?} key
     * @param {?} f
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.SubscribeInput = /**
     *
     * @param {?} key
     * @param {?} f
     * @return {?}
     */
    function (key, f) {
        var _this = this;
        if (this._viewHasBeenInit) {
            /** @type {?} */
            var completer = this.GetInput(key);
            /**
             *
             */
            f(completer);
            return;
        }
        this._viewInitSubject.subscribe(function (_bool) {
            /** @type {?} */
            var completer = _this.GetInput(key);
            setTimeout(function () {
                f(completer);
            });
            _this._viewInitSubject.unsubscribe();
        });
    };
    /**
     *
     */
    /**
     *
     * @param {?} key
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.ResetInput = /**
     *
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.SubscribeInput(key, function (completer) {
            completer.ClearValue();
        });
    };
    /**
     *
     */
    /**
     *
     * @param {?} key
     * @param {?} values
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.SetValues = /**
     *
     * @param {?} key
     * @param {?} values
     * @return {?}
     */
    function (key, values) {
        var _this = this;
        this.SubscribeInput(key, function (completer) {
            completer.group.SetValues(values);
            /**
             * Items may have changed, need to te re-set list in completer components.
             */
            _this.TriggerChange();
        });
    };
    /**
     *
     */
    /**
     *
     * @param {?} key
     * @param {?} type
     * @param {?} template
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.SetTemplate = /**
     *
     * @param {?} key
     * @param {?} type
     * @param {?} template
     * @return {?}
     */
    function (key, type, template) {
        var _this = this;
        this.SubscribeInput(key, function (completer) {
            completer.group[type] = template;
            /**
             * Items may have changed, need to te re-set list in completer components.
             */
            _this.TriggerChange();
        });
    };
    /**
     *
     */
    /**
     *
     * @param {?} key
     * @param {?} promise
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.SetAsync = /**
     *
     * @param {?} key
     * @param {?} promise
     * @return {?}
     */
    function (key, promise) {
        var _this = this;
        this.SubscribeInput(key, function (completer) {
            completer.group.async = promise;
            /**
             * Items may have changed, need to te re-set list in completer components.
             */
            _this.TriggerChange();
        });
    };
    /**
     *
     */
    /**
     *
     * @param {?} key
     * @param {?} id
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.SelectItem = /**
     *
     * @param {?} key
     * @param {?} id
     * @return {?}
     */
    function (key, id) {
        this.SubscribeInput(key, function (completer) {
            Object.keys(completer._items).forEach(function (key) {
                /** @type {?} */
                var f = "_id_" + String(id);
                /** @type {?} */
                var c = key.substring(key.indexOf(f), key.length);
                if (f === c) {
                    completer.SelectItem(completer._items[key]);
                }
            });
        });
    };
    /**
     *
     */
    /**
     *
     * @param {?} key
     * @param {?} ids
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.RemovableValues = /**
     *
     * @param {?} key
     * @param {?} ids
     * @return {?}
     */
    function (key, ids) {
        var _this = this;
        this.SubscribeInput(key, function (completer) {
            completer.group.Removables(ReturnStringArrayByID(ids));
            /**
             * Items may have changed, need to te re-set list in completer components.
             */
            _this.TriggerChange();
        });
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    NgAutoCompleteComponent.prototype.ResetInputs = /**
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this.group.forEach(function (item) {
            _this.ResetInput(item.key);
        });
    };
    // =======================================================================//
    // ! Static (utils)                                                       //
    // =======================================================================//
    /**
     *
     */
    // =======================================================================//
    // ! Static (utils)                                                       //
    // =======================================================================//
    /**
     *
     * @param {?} key
     * @param {?} list
     * @return {?}
     */
    NgAutoCompleteComponent.FindCompleter = 
    // =======================================================================//
    // ! Static (utils)                                                       //
    // =======================================================================//
    /**
     *
     * @param {?} key
     * @param {?} list
     * @return {?}
     */
    function (key, list) {
        /** @type {?} */
        var completer = list.filter(function (completer) {
            return key === completer.key;
        });
        if (typeof completer[0] !== 'undefined') {
            return completer[0];
        }
        return null;
    };
    NgAutoCompleteComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'ng-auto-complete',
                    template: "\n        <div #init style=\"display: none;\"><span class=\"after-view-init\"></span></div>\n        <ng-completer [ngClass]=\"classes\" *ngFor=\"let item of group\" (cleared)=\"InputCleared($event)\"\n                      (no-result)=\"NoResult($event)\"\n                      (selected)=\"ListenToSelected($event)\"\n                      [group]=\"item\"></ng-completer>\n    "
                }] }
    ];
    /** @nocollapse */
    NgAutoCompleteComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }
    ]; };
    NgAutoCompleteComponent.propDecorators = {
        completers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChildren"], args: [CompleterComponent,] }],
        init: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['init',] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        noResult: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ['no-result',] }],
        group: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        key: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        classes: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return NgAutoCompleteComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HighlightPipe = /** @class */ (function () {
    function HighlightPipe() {
    }
    /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    HighlightPipe.prototype.transform = /**
     * @param {?} text
     * @param {?} search
     * @return {?}
     */
    function (text, search) {
        if (typeof search === 'undefined') {
            return text;
        }
        /** @type {?} */
        var pattern = search.replace(/[\-\[\]\/{}()*+?.\\^$|]/g, '\\$&');
        pattern = pattern.split(' ').filter(function (t) { return t.length > 0; }).join('|');
        /**
         *
         */
        return text.replace(new RegExp(pattern, 'gi'), function (match) { return "<span class=\"dropdown-item-highlight\">" + match + "</span>"; });
    };
    HighlightPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"], args: [{
                    name: 'highlight'
                },] }
    ];
    return HighlightPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var KeyValuePipe = /** @class */ (function () {
    function KeyValuePipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    KeyValuePipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        /** @type {?} */
        var keys = [];
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };
    KeyValuePipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"], args: [{
                    name: 'keys'
                },] }
    ];
    return KeyValuePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PipeModule = /** @class */ (function () {
    function PipeModule() {
    }
    /**
     * @return {?}
     */
    PipeModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    };
    PipeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [],
                    declarations: [HighlightPipe, KeyValuePipe],
                    exports: [HighlightPipe, KeyValuePipe],
                },] }
    ];
    return PipeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgAutoCompleteModule = /** @class */ (function () {
    function NgAutoCompleteModule() {
    }
    NgAutoCompleteModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                        PipeModule.forRoot()
                    ],
                    exports: [
                        NgAutoCompleteComponent,
                        CompleterComponent,
                    ],
                    declarations: [
                        NgAutoCompleteComponent,
                        CompleterComponent,
                        NgDropdownDirective
                    ]
                },] }
    ];
    return NgAutoCompleteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYXV0by1jb21wbGV0ZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctYXV0by1jb21wbGV0ZS9saWIvY2xhc3Nlcy9BdXRvY29tcGxldGVJdGVtLnRzIiwibmc6Ly9uZy1hdXRvLWNvbXBsZXRlL2xpYi9jbGFzc2VzL0F1dG9jb21wbGV0ZUdyb3VwLnRzIiwibmc6Ly9uZy1hdXRvLWNvbXBsZXRlL2xpYi91dGlscy91dGlscy50cyIsIm5nOi8vbmctYXV0by1jb21wbGV0ZS9saWIvZHJvcGRvd24vbmctZHJvcGRvd24uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZy1hdXRvLWNvbXBsZXRlL2xpYi9jb21wbGV0ZXIvY29tcGxldGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmctYXV0by1jb21wbGV0ZS9saWIvbmctYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL25nLWF1dG8tY29tcGxldGUvbGliL3BpcGVzL2hpZ2hsaWdodC50cyIsIm5nOi8vbmctYXV0by1jb21wbGV0ZS9saWIvcGlwZXMva2V5LXZhbHVlLnRzIiwibmc6Ly9uZy1hdXRvLWNvbXBsZXRlL2xpYi9waXBlcy9waXBlcy5tb2R1bGUudHMiLCJuZzovL25nLWF1dG8tY29tcGxldGUvbGliL25nLWF1dG8tY29tcGxldGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgU3RyaXBwZWRBdXRvY29tcGxldGVHcm91cCB7XG4gICAgZ3JvdXA6IHsga2V5OiBzdHJpbmcgfSxcbiAgICBpdGVtOiBBdXRvY29tcGxldGVJdGVtXG59XG5cbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVJdGVtIHtcblxuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgaWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gICAgY2hpbGRyZW46IGFueVtdO1xuICAgIG9yaWdpbmFsOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih0aXRsZTogc3RyaW5nLCBpZDogc3RyaW5nIHwgbnVtYmVyLCBvcmlnaW5hbDogYW55KSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm9yaWdpbmFsID0gb3JpZ2luYWw7XG4gICAgfVxufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTZWFyY2hhYmxlQXV0b0NvbXBsZXRlSXRlbXMoaXRlbXM6IHsgaWQ/OiBzdHJpbmd8bnVtYmVyOyBbdmFsdWU6IHN0cmluZ106IGFueSB9W10sIHRpdGxlS2V5OiBzdHJpbmcsIGNoaWxkcmVuS2V5OiBzdHJpbmcgfCBudWxsID0gbnVsbCk6IHtbdmFsdWU6IHN0cmluZ106IEF1dG9jb21wbGV0ZUl0ZW19IHtcbiAgICByZXR1cm4gaXRlbXMucmVkdWNlKGZ1bmN0aW9uIChyLCBpKSB7XG4gICAgICAgIGNvbnN0IHQgPSBTZWFyY2hhYmxlQXV0b0NvbXBsZXRlU3RyaW5nKGlbdGl0bGVLZXldLCBpLmlkKTtcblxuICAgICAgICBpZih0eXBlb2Ygclt0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJbdF0gPSBUcmFuc2Zvcm1Ub0F1dG9jb21wbGV0ZUl0ZW0oaSwgdGl0bGVLZXksIGNoaWxkcmVuS2V5KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfSwge30pXG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFNlYXJjaGFibGVBdXRvQ29tcGxldGVTdHJpbmcoa2V5OiBzdHJpbmcsIGlkOiBzdHJpbmd8bnVtYmVyKSB7XG4gICAgcmV0dXJuIGAke2tleS5yZXBsYWNlKC8gL2csXCJfXCIpfV9pZF8ke1N0cmluZyhpZCl9YDtcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gQ29tcGFyYWJsZUF1dG9Db21wbGV0ZVN0cmluZyhzdHI6IHN0cmluZykge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXy9nLFwiIFwiKTtcbn1cblxuLyoqXG4gKiBvYmplY3QgbXVzdCBoYXZlIGFuIElEXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIFRyYW5zZm9ybVRvQXV0b2NvbXBsZXRlSXRlbShvYmplY3Q6IHsgaWQ/OiBzdHJpbmcgfCBudW1iZXI7IFt2YWx1ZTogc3RyaW5nXTogYW55IH0sIHRpdGxlS2V5OiBzdHJpbmcsIGNoaWxkcmVuS2V5OiBzdHJpbmcgfCBudWxsID0gbnVsbCkge1xuICAgIGNvbnN0IGl0ZW0gPSBuZXcgQXV0b2NvbXBsZXRlSXRlbShvYmplY3RbdGl0bGVLZXldLCBvYmplY3QuaWQsIG9iamVjdCk7XG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGVyZSBhcmUgY2hpbGRyZW4sIGFkZCB0aGVzZS5cbiAgICAgKi9cbiAgICBpZiAoY2hpbGRyZW5LZXkgIT09IG51bGwpIGl0ZW0uY2hpbGRyZW4gPSBvYmplY3RbY2hpbGRyZW5LZXldO1xuXG4gICAgcmV0dXJuIGl0ZW1cbn1cbiIsImltcG9ydCB7IEF1dG9jb21wbGV0ZUl0ZW0sIFNlYXJjaGFibGVBdXRvQ29tcGxldGVJdGVtcyB9IGZyb20gJy4vQXV0b2NvbXBsZXRlSXRlbSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlR3JvdXAge1xuICAgIGluaXRpYWxWYWx1ZTogeyBbdmFsdWU6IHN0cmluZ106IEF1dG9jb21wbGV0ZUl0ZW0gfTtcblxuICAgIGtleTogc3RyaW5nO1xuICAgIGtleXM6IHsgdGl0bGVLZXk6IHN0cmluZywgY2hpbGRyZW5LZXk6IHN0cmluZyB8IG51bGwgfTtcbiAgICB2YWx1ZTogeyBbdmFsdWU6IHN0cmluZ106IEF1dG9jb21wbGV0ZUl0ZW0gfTtcbiAgICByZW1vdmU6IHN0cmluZ1tdO1xuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgcGFyZW50OiBzdHJpbmc7XG4gICAgY29tcGxldGlvbjogYm9vbGVhbjtcbiAgICBzZWFyY2hMZW5ndGg6IG51bWJlcjtcbiAgICBhc3luYzogKHN0cjogc3RyaW5nKSA9PiBQcm9taXNlPHsgaWQ6IHN0cmluZyB8IG51bWJlcjsgW3ZhbHVlOiBzdHJpbmddOiBhbnkgfVtdPiA9IG51bGw7XG5cbiAgICAvLyBUZW1wbGF0ZXNcbiAgICBub1Jlc3VsdHM6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgZHJvcGRvd25WYWx1ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBwbGFjZWhvbGRlclZhbHVlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHJpdmF0ZSByZW1vdmFsczogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIF9jb3B5OiB7IFt2YWx1ZTogc3RyaW5nXTogQXV0b2NvbXBsZXRlSXRlbSB9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBTZXROZXdWYWx1ZSh2YWx1ZTogeyBpZDogc3RyaW5nIHwgbnVtYmVyOyBbdmFsdWU6IHN0cmluZ106IGFueSB9W10sIHRpdGxlS2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gU2VhcmNoYWJsZUF1dG9Db21wbGV0ZUl0ZW1zKHZhbHVlLCB0aXRsZUtleSk7XG4gICAgICAgIHRoaXMuU2V0Q29weSh2YWx1ZXMpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuRmlsdGVyUmVtb3ZhbHModGhpcy5yZW1vdmFscywgdmFsdWVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIFJlbW92YWJsZXMoaWRzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnJlbW92YWxzID0gaWRzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuRmlsdGVyUmVtb3ZhbHModGhpcy5yZW1vdmFscywgdGhpcy5fY29weSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBJbml0aWFsVmFsdWUoKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLkZpbHRlclJlbW92YWxzKHRoaXMucmVtb3ZhbHMsIHRoaXMuaW5pdGlhbFZhbHVlKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuU2V0Q29weSh0aGlzLmluaXRpYWxWYWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBTZXRDb3B5KHZhbHVlczogeyBbdmFsdWU6IHN0cmluZ106IEF1dG9jb21wbGV0ZUl0ZW0gfSkge1xuICAgICAgICB0aGlzLl9jb3B5ID0gT2JqZWN0LmFzc2lnbihbXSwgdmFsdWVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIFNldFZhbHVlcyh2YWx1ZTogeyBpZD86IHN0cmluZyB8IG51bWJlcjsgW3ZhbHVlOiBzdHJpbmddOiBhbnkgfVtdKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBTZWFyY2hhYmxlQXV0b0NvbXBsZXRlSXRlbXModmFsdWUsIHRoaXMua2V5cy50aXRsZUtleSwgdGhpcy5rZXlzLmNoaWxkcmVuS2V5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuU2V0Q29weShPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBGaWx0ZXJSZW1vdmFscyhyZW1vdmFsczogYW55W10sIHZhbHVlOiB7IFt2YWx1ZTogc3RyaW5nXTogQXV0b2NvbXBsZXRlSXRlbSB9KTogeyBbdmFsdWU6IHN0cmluZ106IEF1dG9jb21wbGV0ZUl0ZW0gfSB7XG4gICAgICAgIGxldCBmaWx0ZXJlZCA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlKTtcblxuICAgICAgICBsZXQga2V5LCBrZXlzID0gW107XG4gICAgICAgIGZvciAoa2V5IGluIGZpbHRlcmVkKSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyZWQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJlbW92YWxzLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvbXBhcmFibGUgc3RyaW5nIGFuZCBJRFxuICAgICAgICAgICAgICAgICAgICBsZXQgZiA9IGBfaWRfJHtTdHJpbmcoaWQpfWA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjID0ga2V5LnN1YnN0cmluZyhrZXkuaW5kZXhPZihmKSwga2V5Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGYgPT09IGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIGZpbHRlcmVkW2tdO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgfVxufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVOZXdBdXRvY29tcGxldGVHcm91cDxUPihwbGFjZWhvbGRlcjogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IHsgaWQ/OiBzdHJpbmcgfCBudW1iZXI7IFt2YWx1ZTogc3RyaW5nXTogYW55IH1bXSwga2V5czogeyB0aXRsZUtleTogc3RyaW5nLCBjaGlsZHJlbktleTogc3RyaW5nIHwgbnVsbCB9LCBwYXJlbnQ6IHN0cmluZyA9ICcnLCBjb21wbGV0aW9uOiBib29sZWFuID0gdHJ1ZSwgc2VhcmNoTGVuZ3RoOiBudW1iZXIgPSAyKTogQXV0b2NvbXBsZXRlR3JvdXAge1xuICAgIGNvbnN0IGdyb3VwID0gbmV3IEF1dG9jb21wbGV0ZUdyb3VwKCk7XG5cbiAgICBncm91cC5rZXkgPSBrZXk7XG4gICAgZ3JvdXAua2V5cyA9IGtleXM7XG4gICAgZ3JvdXAucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICBncm91cC5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgZ3JvdXAuY29tcGxldGlvbiA9IGNvbXBsZXRpb247XG4gICAgZ3JvdXAuc2VhcmNoTGVuZ3RoID0gc2VhcmNoTGVuZ3RoO1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbCB2YWx1ZSBuZWVkZWQsIGlmIHdlIGVtcHR5IHNlYXJjaCBib3ggb3Igd2FudCB0byBjbGVhciBpdCwgaXQgbmVlZHMgdG8gYmUgcmVzZXQuXG4gICAgICogU2V0dGluZyBjb3B5LCB1c2VkIGlmIHVzZXIgd2FudHMgdG8gcmVtb3ZlIHZhbHVlcyAoYnkgaWQuKS4gVGhpcyBfIGxpc3QgZ2V0cyBmaWx0ZXJlZC5cbiAgICAgKi9cbiAgICBncm91cC5TZXRWYWx1ZXModmFsdWUpO1xuXG4gICAgcmV0dXJuIGdyb3VwO1xufVxuIiwiaW1wb3J0IHsgQXV0b2NvbXBsZXRlSXRlbSB9IGZyb20gJy4uL2NsYXNzZXMvQXV0b2NvbXBsZXRlSXRlbSc7XG5cbmNvbnN0IFVzZWRDb2RlTGlzdCA9IHtcbiAgICBBcnJvd0Rvd246ICAgICAgNDAsXG4gICAgQXJyb3dVcDogICAgICAgIDM4LFxuICAgIEVudGVyOiAgICAgICAgICAxMyxcbiAgICBFc2NhcGU6ICAgICAgICAgMjcsXG4gICAgVGFiOiAgICAgICAgICAgIDksXG4gICAgTWV0YUxlZnQ6ICAgICAgIDkxLFxuICAgIEFsdExlZnQ6ICAgICAgICAxOCxcbiAgICBDb250cm9sTGVmdDogICAgMTcsXG4gICAgU2hpZnRMZWZ0OiAgICAgIDE2LFxuICAgIEFycm93TGVmdDogICAgICAzNyxcbiAgICBBcnJvd1JpZ2h0OiAgICAgMzksXG4gICAgTWV0YVJpZ2h0OiAgICAgIDkzLFxuICAgIEFsdFJpZ2h0OiAgICAgICAxOFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBHcm91cE5vUmVzdWx0IHtcbiAgICBncm91cDoge2tleTogc3RyaW5nfTtcbiAgICBxdWVyeTogc3RyaW5nO1xufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBSZXR1cm5TdHJpbmdBcnJheUJ5SUQoYXJyYXk6IHsgaWQ6IHN0cmluZyB8IG51bWJlciwgW3ZhbHVlOiBzdHJpbmddOiBhbnkgfVtdKSB7XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZSgocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0uaWQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sIFtdKVxufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBGaWx0ZXJSZW1vdmFscyhyZW1vdmFsczogc3RyaW5nW10sIGxpc3Q6IEF1dG9jb21wbGV0ZUl0ZW1bXSkge1xuICAgIHJldHVybiBsaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVtb3ZhbHMuaW5kZXhPZihpdGVtLmlkLnRvU3RyaW5nKCkpIDw9IC0xO1xuICAgIH0pO1xufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJc01vYmlsZU9yVGFibGV0KCkge1xuICAgIGxldCBpc01vYmlsZSA9IGZhbHNlO1xuICAgIGlmICgvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXBhZHxpcmlzfGtpbmRsZXxBbmRyb2lkfFNpbGt8bGdlIHxtYWVtb3xtaWRwfG1tcHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyAoY2V8cGhvbmUpfHhkYXx4aWluby9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICAgICAgfHwgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cigwLCA0KSkpIHtcbiAgICAgICAgaXNNb2JpbGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBpc01vYmlsZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTm90VXNlZEtleShjb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIFVzZWRDb2RlTGlzdFtjb2RlXSA9PT0gJ3VuZGVmaW5lZCc7XG59XG4iLCJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SXNNb2JpbGVPclRhYmxldH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW25nRHJvcGRvd25dJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ0Ryb3Bkb3duRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcHVibGljIGxpc3Q6IGFueVtdID0gW107XG4gICAgQElucHV0KCkgcHVibGljIGFjdGl2ZTogYW55ID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBpbnB1dDogRWxlbWVudCA9IG51bGw7XG4gICAgQElucHV0KCkgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnQgPSBudWxsO1xuXG4gICAgQElucHV0KCkgcHVibGljIGtleTogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCkgcHVibGljIGNvbXBsZXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQE91dHB1dCgpIHB1YmxpYyBob3ZlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgY2xvc2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgX29wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBfbGlzdDogeyBhY3RpdmU6IGJvb2xlYW4sIFt2YWx1ZTogc3RyaW5nXTogYW55IH1bXSA9IFtdO1xuICAgIF9jbGFzczogc3RyaW5nID0gJyc7XG4gICAgd2hlZWxIYW5kbGVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VyZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9jbGFzcyA9IGBkci1pdGVtLSR7dGhpcy5rZXl9LWA7XG5cbiAgICAgICAgaWYgKHRoaXMuUmVmRXhpc3RzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5RG93bihldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0aGlzLmNvbXBsZXRpb24pIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9vcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5RG93bihldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighSXNNb2JpbGVPclRhYmxldCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5Pbk1vdXNlT3ZlcihldmVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlByZXBhcmVMaXN0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2hhbmdlc1snYWN0aXZlJ10gIT09ICd1bmRlZmluZWQnICYmICFjaGFuZ2VzWydhY3RpdmUnXS5maXJzdENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5QcmVwYXJlTGlzdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2hhbmdlc1snbGlzdCddICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gY2hhbmdlc1snbGlzdCddLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLlByZXBhcmVMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuT3BlbigpO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLlNldEFjdGl2ZSh0aGlzLkZpbmRBY3RpdmUoKSArIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuRHJvcGRvd25Gb2N1c0FyZWFEb3duKCk7XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5PcGVuKCk7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuU2V0QWN0aXZlKHRoaXMuRmluZEFjdGl2ZSgpIC0gMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5Ecm9wZG93bkZvY3VzQXJlYVVwKCk7XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMuRW1pdFNlbGVjdGVkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5DbG9zZShudWxsLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuQ2xvc2UobnVsbCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgICAgICAgICBpZighZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5FbWl0U2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLkNsb3NlKG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIE9uTW91c2VPdmVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIC8vIE1vdXNlIGRpZG4ndCBhY3R1YWxseSBtb3ZlLCBzbyBubyBsb2dpYyBuZWVkZWQuXG4gICAgICAgIGlmKGV2ZW50Lm1vdmVtZW50WCA9PSAwICYmIGV2ZW50Lm1vdmVtZW50WSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgZWw6IGFueSA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgICAgICBpZiAoZWwuaWQubGVuZ3RoID4gMCAmJiBlbC5pZC5pbmNsdWRlcyh0aGlzLl9jbGFzcykpIHtcbiAgICAgICAgICAgIHRoaXMuU2V0QWN0aXZlKE51bWJlcihlbC5pZC5zbGljZSh0aGlzLl9jbGFzcy5sZW5ndGgsIGVsLmlkLmxlbmd0aCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgRW1pdFNlbGVjdGVkKCkge1xuICAgICAgICBpZih0aGlzLkZpbmRBY3RpdmUoKSA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmVtaXQodGhpcy5fbGlzdFt0aGlzLkZpbmRBY3RpdmUoKV0ua2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgRHJvcGRvd25Gb2N1c0FyZWFEb3duKCkge1xuICAgICAgICBsZXQgc2Nyb2xsID0gdGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArIHRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBpZigodGhpcy5HZXRFbGVtZW50KHRoaXMuRmluZEFjdGl2ZSgpKS5vZmZzZXRUb3AgKyB0aGlzLkdldEVsZW1lbnQodGhpcy5GaW5kQWN0aXZlKCkpLm9mZnNldEhlaWdodCkgPiBzY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLkdldEVsZW1lbnQodGhpcy5GaW5kQWN0aXZlKCkpLm9mZnNldFRvcCAtICh0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gdGhpcy5HZXRFbGVtZW50KHRoaXMuRmluZEFjdGl2ZSgpKS5vZmZzZXRIZWlnaHQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIERyb3Bkb3duRm9jdXNBcmVhVXAoKSB7XG4gICAgICAgIGxldCBzY3JvbGwgPSB0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgaWYodGhpcy5HZXRFbGVtZW50KHRoaXMuRmluZEFjdGl2ZSgpKS5vZmZzZXRUb3AgPCBzY3JvbGwgJiYgc2Nyb2xsID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuR2V0RWxlbWVudCh0aGlzLkZpbmRBY3RpdmUoKSkub2Zmc2V0VG9wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0vL1xuICAgIC8vICEgQmluZGluZ3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PS8vXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3Mub3BlbicpXG4gICAgZ2V0IG9wZW5lZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW47XG4gICAgfVxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PS8vXG4gICAgLy8gISBMaXN0ZW5lcnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ly9cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIENsb3NlKGV2ZW50LCBmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmKCF0aGlzLl9vcGVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFbWl0IE5VTEwgc28gbGlzdGVuaW5nIGNvbXBvbmVudHMga25vdyB3aGF0IHRvIGRvLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLkNsZWFyQWN0aXZlKCk7XG4gICAgICAgICAgICB0aGlzLmhvdmVyLmVtaXQobnVsbCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCh0aGlzLl9vcGVuICYmICghdGhpcy5lbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpKSkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ly9cbiAgICAvLyAhIFV0aWxzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0vL1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBPcGVuKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fb3BlbiAmJiAhdGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaXMtaW5pdGlhbC1lbXB0eScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5QcmVwYXJlTGlzdCgpO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5GaW5kQWN0aXZlKCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLkdldEVsZW1lbnQodGhpcy5GaW5kQWN0aXZlKCkpLm9mZnNldEhlaWdodCAqIHRoaXMuRmluZEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBSZWZFeGlzdHMoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5pbnB1dCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBGaW5kQWN0aXZlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0LnJlZHVjZSgocmVzdWx0LCBpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5kZXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIC0xKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIFNldEFjdGl2ZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMuX2xpc3QubGVuZ3RoIC0gMSB8fCBpbmRleCA8IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuQ2xlYXJBY3RpdmUoKTtcblxuICAgICAgICB0aGlzLl9saXN0W2luZGV4XS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvdmVyLmVtaXQodGhpcy5fbGlzdFtpbmRleF0ua2V5KTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkdldEVsZW1lbnQoaW5kZXgpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgR2V0RWxlbWVudChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5baW5kZXhdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgQ2xlYXJBY3RpdmUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2xpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5HZXRFbGVtZW50KGluZGV4KS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBQcmVwYXJlTGlzdCgpIHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMubGlzdCkubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogdGhpcy5BY3RpdmVJdGVtKGtleSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlByZXBhcmVDaGlsZHJlbkxpc3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIEFjdGl2ZUl0ZW0oaXRlbTogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZSAhPT0gbnVsbCAmJiBpdGVtID09PSB0aGlzLmFjdGl2ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIERldGVybWluZUFjdGl2ZUNsYXNzKCkge1xuICAgICAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuR2V0RWxlbWVudChpbmRleCkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuR2V0RWxlbWVudChpbmRleCkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAoaXRlbS5hY3RpdmUpXG4gICAgICAgICAgICAgICAgdGhpcy5HZXRFbGVtZW50KGluZGV4KS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgUHJlcGFyZUNoaWxkcmVuTGlzdCgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbjtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxpc3RbaV0uaWQgPSB0aGlzLl9jbGFzcyArIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5EZXRlcm1pbmVBY3RpdmVDbGFzcygpO1xuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgRGVSZWZlcmVuY2Uob2JqZWN0OiB7IGFjdGl2ZTogYm9vbGVhbiwgW3ZhbHVlOiBzdHJpbmddOiBhbnkgfSkge1xuICAgICAgICBjb25zdCB7aXRlbX0gPSBvYmplY3Q7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgey4uLml0ZW19KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5SZWZFeGlzdHMoKSkge1xuICAgICAgICAgICAgdGhpcy53aGVlbEhhbmRsZXIgPSB0aGlzLnJlbW92ZUV2ZW50TGlzdG5lci5iaW5kKHRoaXMuaW5wdXQpO1xuICAgICAgICAgICAgLy8gdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhpcy5jb21wbGV0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLndoZWVsSGFuZGxlciA9IHRoaXMucmVtb3ZlRXZlbnRMaXN0bmVyLmJpbmQoZG9jdW1lbnQpO1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIUlzTW9iaWxlT3JUYWJsZXQoKSkge1xuICAgICAgICAgICAgdGhpcy53aGVlbEhhbmRsZXIgPSB0aGlzLnJlbW92ZUV2ZW50TGlzdG5lci5iaW5kKHRoaXMuX2VyZWYpO1xuICAgICAgICAgICAgLy8gdGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlRXZlbnRMaXN0bmVyKGVsZW06IEVsZW1lbnQpIHtcbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMud2hlZWxIYW5kbGVyLCB0cnVlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge2RlYm91bmNlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0F1dG9jb21wbGV0ZUdyb3VwfSBmcm9tICcuLi9jbGFzc2VzL0F1dG9jb21wbGV0ZUdyb3VwJztcbmltcG9ydCB7XG4gICAgQXV0b2NvbXBsZXRlSXRlbSxcbiAgICBDb21wYXJhYmxlQXV0b0NvbXBsZXRlU3RyaW5nLFxuICAgIFNlYXJjaGFibGVBdXRvQ29tcGxldGVTdHJpbmcsXG4gICAgU3RyaXBwZWRBdXRvY29tcGxldGVHcm91cFxufSBmcm9tICcuLi9jbGFzc2VzL0F1dG9jb21wbGV0ZUl0ZW0nO1xuaW1wb3J0IHtOZ0Ryb3Bkb3duRGlyZWN0aXZlfSBmcm9tICcuLi9kcm9wZG93bi9uZy1kcm9wZG93bi5kaXJlY3RpdmUnO1xuaW1wb3J0IHtHcm91cE5vUmVzdWx0fSBmcm9tICcuLi91dGlscy91dGlscyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nLWNvbXBsZXRlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjZWxlbWVudCBjbGFzcz1cIm5nLWF1dG9jb21wbGV0ZS1kcm9wZG93blwiXG4gICAgICAgICAgICAgW25nQ2xhc3NdPVwieydvcGVuJzogZHJvcGRvd24uX29wZW4sICdpcy1sb2FkaW5nJzogX0RPTS5pc0xvYWRpbmcsICdpcy1hc3luYyc6IGdyb3VwLmFzeW5jICE9PSBudWxsfVwiPlxuXG4gICAgICAgICAgICA8IS0tR1JPVVA6IHt7Z3JvdXAua2V5fX0tLT5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5nLWF1dG9jb21wbGV0ZS1pbnB1dHNcIiAoY2xpY2spPVwiUmVnaXN0ZXJDbGljaygpXCJcbiAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydjb21wbGV0aW9uLW9mZic6ICFncm91cC5jb21wbGV0aW9ufVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmctYXV0b2NvbXBsZXRlLXBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIl9ET00ucGxhY2Vob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJncm91cC5wbGFjZWhvbGRlclZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ3JvdXAucGxhY2Vob2xkZXJWYWx1ZTsgY29udGV4dDogeyRpbXBsaWNpdDogX0RPTS5wbGFjZWhvbGRlcn1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiIWdyb3VwLnBsYWNlaG9sZGVyVmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7e19ET00ucGxhY2Vob2xkZXIudGl0bGV9fVxuICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbnB1dCB0eXBlPVwidGV4dFwiIFtwbGFjZWhvbGRlcl09XCJncm91cC5wbGFjZWhvbGRlclwiIG5hbWU9XCJjb21wbGV0ZXJcIiBbKG5nTW9kZWwpXT1cIl9jb21wbGV0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJfY2hhbmdlLm5leHQoJGV2ZW50KTtcIlxuICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiX2NvbXBsZXRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJPcGVuRHJvcGRvd24oKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJPcGVuRHJvcGRvd24oKVwiIGNsYXNzPVwibmctYXV0b2NvbXBsZXRlLWlucHV0XCI+XG5cbiAgICAgICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J29wZW4nOiBkcm9wZG93bi5fb3Blbn1cIiBjbGFzcz1cIm5nLWF1dG9jb21wbGV0ZS1kcm9wZG93bi1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiRHJvcGRvd25BcnJheSgpXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZy1kcm9wZG93blwiIG5nRHJvcGRvd24gW2xpc3RdPVwiX2l0ZW1zXCIgW2VsZW1lbnRdPVwiZWxlbWVudFwiIFtpbnB1dF09XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnaXMtaW5pdGlhbC1lbXB0eSc6IF9ET00uZW1wdHl9XCJcbiAgICAgICAgICAgICAgICAgW2FjdGl2ZV09XCJfRE9NLnNlbGVjdGVkXCIgW2tleV09XCJncm91cC5rZXlcIlxuICAgICAgICAgICAgICAgICBbY29tcGxldGlvbl09XCJncm91cC5jb21wbGV0aW9uXCJcbiAgICAgICAgICAgICAgICAgKGhvdmVyKT1cIk9uSG92ZXJEcm9wZG93bkl0ZW0oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgIChzZWxlY3RlZCk9XCJTZWxlY3RJdGVtKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAoY2xvc2VkKT1cIk9uSW5wdXRCbHVycmVkKClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJfRE9NLm5vdEZvdW5kICYmIGdyb3VwLm5vUmVzdWx0c1wiIGNsYXNzPVwiZHJvcGRvd24taXRlbSBuby1yZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJncm91cC5ub1Jlc3VsdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImdyb3VwLm5vUmVzdWx0czsgY29udGV4dDogeyRpbXBsaWNpdDogX2NvbXBsZXRlcn1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2l0ZW1zIHwga2V5czsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiU2VsZWN0SXRlbShfaXRlbXNbaXRlbV0pXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImdyb3VwLmRyb3Bkb3duVmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ3JvdXAuZHJvcGRvd25WYWx1ZTsgY29udGV4dDogeyRpbXBsaWNpdDogX2l0ZW1zW2l0ZW1dLCBoaWdobGlnaHQ6IF9pdGVtc1tpdGVtXS50aXRsZSB8IGhpZ2hsaWdodDpfaGlnaGxpZ2h0fVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhZ3JvdXAuZHJvcGRvd25WYWx1ZVwiIFtpbm5lckhUTUxdPVwiX2l0ZW1zW2l0ZW1dLnRpdGxlIHwgaGlnaGxpZ2h0Ol9oaWdobGlnaHRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLm5nLWF1dG9jb21wbGV0ZS1pbnB1dHMge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB9XG5cbiAgICAgICAgLm5nLWF1dG9jb21wbGV0ZS1pbnB1dHMuY29tcGxldGlvbi1vZmYge1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLm5nLWF1dG9jb21wbGV0ZS1pbnB1dHMuY29tcGxldGlvbi1vZmYgaW5wdXQge1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAubmctYXV0b2NvbXBsZXRlLXBsYWNlaG9sZGVyIHtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLm5nLWF1dG9jb21wbGV0ZS1kcm9wZG93bi1pY29uIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgLm5nLWF1dG9jb21wbGV0ZS1kcm9wZG93biAubmctZHJvcGRvd24ge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5uZy1hdXRvY29tcGxldGUtZHJvcGRvd24gLm5nLWRyb3Bkb3duLmlzLWVtcHR5IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAubmctYXV0b2NvbXBsZXRlLWRyb3Bkb3duIC5uZy1kcm9wZG93bi5vcGVuIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgQ29tcGxldGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKE5nRHJvcGRvd25EaXJlY3RpdmUpIHB1YmxpYyBkcm9wZG93bjogTmdEcm9wZG93bkRpcmVjdGl2ZTtcblxuICAgIEBPdXRwdXQoKSBwdWJsaWMgY2xlYXJlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8U3RyaXBwZWRBdXRvY29tcGxldGVHcm91cD4gPSBuZXcgRXZlbnRFbWl0dGVyPFN0cmlwcGVkQXV0b2NvbXBsZXRlR3JvdXA+KCk7XG4gICAgQE91dHB1dCgnbm8tcmVzdWx0JykgcHVibGljIG5vUmVzdWx0OiBFdmVudEVtaXR0ZXI8R3JvdXBOb1Jlc3VsdD4gPSBuZXcgRXZlbnRFbWl0dGVyPEdyb3VwTm9SZXN1bHQ+KCk7XG5cbiAgICBASW5wdXQoKSBwdWJsaWMgZ3JvdXA6IEF1dG9jb21wbGV0ZUdyb3VwID0gPEF1dG9jb21wbGV0ZUdyb3VwPnt9O1xuXG4gICAgX2NoYW5nZTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIF9pdGVtczogeyBbdmFsdWU6IHN0cmluZ106IEF1dG9jb21wbGV0ZUl0ZW0gfSA9IHt9O1xuICAgIF9jb21wbGV0ZXI6IHN0cmluZyA9ICcnO1xuICAgIF9oaWdobGlnaHQ6IHN0cmluZyA9ICcnO1xuXG4gICAgX0RPTSA9IHtcbiAgICAgICAgbm90Rm91bmQ6IDxib29sZWFuPmZhbHNlLFxuICAgICAgICBlbXB0eTogPGJvb2xlYW4+ZmFsc2UsXG4gICAgICAgIHBsYWNlaG9sZGVyOiA8QXV0b2NvbXBsZXRlSXRlbT5udWxsLFxuICAgICAgICBzZWxlY3RlZDogPHN0cmluZz4nJyxcbiAgICAgICAgaXNMb2FkaW5nOiA8Ym9vbGVhbj5mYWxzZVxuXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2UucGlwZShcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwLmFzeW5jICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5SdW5Bc3luY0Z1bmN0aW9uKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Pbk1vZGVsQ2hhbmdlKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5TZXRJdGVtcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9ubHkgdXNlZCB3aGVuIGNvbXBsZXRpb24gaXMgb2ZmLlxuICAgICAqL1xuICAgIFJlZ2lzdGVyQ2xpY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5ncm91cC5jb21wbGV0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLlN3aXRjaERyb3Bkb3duU3RhdGUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBEcm9wZG93bkFycmF5KCkge1xuICAgICAgICBpZiAodGhpcy5ncm91cC5jb21wbGV0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLlN3aXRjaERyb3Bkb3duU3RhdGUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBTd2l0Y2hEcm9wZG93blN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93bi5fb3Blbikge1xuICAgICAgICAgICAgdGhpcy5DbG9zZURyb3Bkb3duKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuT3BlbkRyb3Bkb3duKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIENsb3NlRHJvcGRvd24oKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uX29wZW4gPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX0RPTS5wbGFjZWhvbGRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBPcGVuRHJvcGRvd24oKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uT3BlbigpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fRE9NLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIFNldEl0ZW1zKCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IHRoaXMuZ3JvdXAudmFsdWU7XG4gICAgICAgIHRoaXMuSXNJbml0aWFsRW1wdHkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIFNlbGVjdEl0ZW0oaXRlbTogQXV0b2NvbXBsZXRlSXRlbSB8IHN0cmluZykge1xuICAgICAgICBsZXQgaTogQXV0b2NvbXBsZXRlSXRlbTtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaSA9IHRoaXMuX2l0ZW1zW2l0ZW1dO1xuICAgICAgICAgICAgdGhpcy5fRE9NLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGkgPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5fRE9NLnNlbGVjdGVkID0gU2VhcmNoYWJsZUF1dG9Db21wbGV0ZVN0cmluZyhpdGVtLnRpdGxlLCBpdGVtLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NvbXBsZXRlciA9IGkudGl0bGU7XG4gICAgICAgIHRoaXMuX2hpZ2hsaWdodCA9ICcnO1xuXG4gICAgICAgIHRoaXMuZHJvcGRvd24uQ2xvc2UobnVsbCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh7Z3JvdXA6IHtrZXk6IHRoaXMuZ3JvdXAua2V5fSwgaXRlbTogaX0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgYXN5bmMgUnVuQXN5bmNGdW5jdGlvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlciA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9oaWdobGlnaHQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLl9ET00uc2VsZWN0ZWQgPSBudWxsO1xuXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXAuSW5pdGlhbFZhbHVlKCk7XG4gICAgICAgICAgICB0aGlzLkNsZWFyTW9kZWwoKTtcblxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5DbG9zZSgnJywgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPiB0aGlzLmdyb3VwLnNlYXJjaExlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fRE9NLmlzTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBhd2FpdCB0aGlzLmdyb3VwLmFzeW5jKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXAuU2V0TmV3VmFsdWUodmFsdWVzLCB0aGlzLmdyb3VwLmtleXMudGl0bGVLZXkpO1xuXG4gICAgICAgICAgICB0aGlzLl9ET00uaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gdGhpcy5ncm91cC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuRW1wdHlTZWFyY2godGhpcy5faXRlbXMsIHZhbHVlKTtcblxuICAgICAgICAgICAgLy8gVXNlciBoYXMgdHlwZWQgc29tZXRoaW5nIG5vdywgcmVzdWx0cyBjb3VsZCBiZSBzaG93bi4gV2UgbmVlZCB0byByZW1vdmUgdGhlIFwiaXMtaW5pdGlhbC1lbXB0eVwiIGNsYXNzLlxuICAgICAgICAgICAgdGhpcy5Jc0luaXRpYWxFbXB0eSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5PcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIE9uTW9kZWxDaGFuZ2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jb21wbGV0ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5faGlnaGxpZ2h0ID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5fRE9NLnNlbGVjdGVkID0gbnVsbDtcblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLkNsZWFyTW9kZWwoKTtcblxuICAgICAgICAgICAgdGhpcy5kcm9wZG93bi5DbG9zZSgnJywgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPiB0aGlzLmdyb3VwLnNlYXJjaExlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5Db21wYXJlSXRlbXNBbmRTZXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBDbGVhck1vZGVsKCkge1xuICAgICAgICB0aGlzLl9ET00uc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9ET00ubm90Rm91bmQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmNsZWFyZWQuZW1pdCh0aGlzLmdyb3VwLmtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBDb21wYXJlSXRlbXNBbmRTZXQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZ3JvdXAudmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChDb21wYXJhYmxlQXV0b0NvbXBsZXRlU3RyaW5nKGtleSkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHRoaXMuZ3JvdXAudmFsdWVba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faXRlbXMgPSBvYmo7XG4gICAgICAgIHRoaXMuRW1wdHlTZWFyY2godGhpcy5faXRlbXMsIHZhbHVlKTtcblxuICAgICAgICAvLyBVc2VyIGhhcyB0eXBlZCBzb21ldGhpbmcgbm93LCByZXN1bHRzIGNvdWxkIGJlIHNob3duLiBXZSBuZWVkIHRvIHJlbW92ZSB0aGUgXCJpcy1pbml0aWFsLWVtcHR5XCIgY2xhc3MuXG4gICAgICAgIHRoaXMuSXNJbml0aWFsRW1wdHkoKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5PcGVuKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBPbklucHV0Qmx1cnJlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLkhhc0Nob3NlblZhbHVlKCkpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogTGV0IGNvbXBvbmVudCBrbm93IGNvbXBsZXRlciBpbnB1dCBoYXMgYmVlbiBjbGVhcmVkIC1cbiAgICAgICAgICAgICAqIHRoaXMgZnVuY3Rpb24gc2hvd3MgdGhlIGxpc3QgYWdhaW4sIGFsc28gcmVzZXRzIGNoaWxkcmVuLCBpZiBjaG9zZW4uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuT25Nb2RlbENoYW5nZSgnJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIE9uSG92ZXJEcm9wZG93bkl0ZW0oaXRlbTogQXV0b2NvbXBsZXRlSXRlbSB8IHN0cmluZykge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuX0RPTS5wbGFjZWhvbGRlciA9IHRoaXMuX2l0ZW1zW2l0ZW1dO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX0RPTS5wbGFjZWhvbGRlciA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ET00ucGxhY2Vob2xkZXIgPSBpdGVtO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ly9cbiAgICAvLyAhIFV0aWxzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0vL1xuXG4gICAgSXNJbml0aWFsRW1wdHkoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9pdGVtcykubGVuZ3RoID09PSAwICYmIHRoaXMuX2NvbXBsZXRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX0RPTS5lbXB0eSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ET00uZW1wdHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIEhhc0Nob3NlblZhbHVlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fRE9NLnNlbGVjdGVkICE9PSBudWxsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBFbXB0eVNlYXJjaChvYmo6IE9iamVjdCwgcXVlcnk6IHN0cmluZykge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9ET00ubm90Rm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fRE9NLm5vdEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub1Jlc3VsdC5lbWl0KHtncm91cDoge2tleTogdGhpcy5ncm91cC5rZXl9LCBxdWVyeTogcXVlcnl9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgQ2xlYXJWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5fY29tcGxldGVyID0gJyc7XG4gICAgICAgIHRoaXMuX0RPTS5zZWxlY3RlZCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5ncm91cC5Jbml0aWFsVmFsdWUoKTtcbiAgICAgICAgdGhpcy5Jc0luaXRpYWxFbXB0eSgpO1xuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh7Z3JvdXA6IHtrZXk6IHRoaXMuZ3JvdXAua2V5fSwgaXRlbTogbnVsbH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDaGlsZHJlblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QXV0b2NvbXBsZXRlR3JvdXB9IGZyb20gJy4vY2xhc3Nlcy9BdXRvY29tcGxldGVHcm91cCc7XG5pbXBvcnQge1NlbGVjdGVkQXV0b2NvbXBsZXRlSXRlbX0gZnJvbSAnLi9jbGFzc2VzL3R5cGluZyc7XG5pbXBvcnQge0NvbXBsZXRlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wbGV0ZXIvY29tcGxldGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge0dyb3VwTm9SZXN1bHQsIFJldHVyblN0cmluZ0FycmF5QnlJRH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nLWF1dG8tY29tcGxldGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2luaXQgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjxzcGFuIGNsYXNzPVwiYWZ0ZXItdmlldy1pbml0XCI+PC9zcGFuPjwvZGl2PlxuICAgICAgICA8bmctY29tcGxldGVyIFtuZ0NsYXNzXT1cImNsYXNzZXNcIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBncm91cFwiIChjbGVhcmVkKT1cIklucHV0Q2xlYXJlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAobm8tcmVzdWx0KT1cIk5vUmVzdWx0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgIChzZWxlY3RlZCk9XCJMaXN0ZW5Ub1NlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgIFtncm91cF09XCJpdGVtXCI+PC9uZy1jb21wbGV0ZXI+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmdBdXRvQ29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBWaWV3Q2hpbGRyZW4oQ29tcGxldGVyQ29tcG9uZW50KSBwdWJsaWMgY29tcGxldGVyczogUXVlcnlMaXN0PENvbXBsZXRlckNvbXBvbmVudD47XG4gICAgQFZpZXdDaGlsZCgnaW5pdCcpIHB1YmxpYyBpbml0OiBFbGVtZW50UmVmO1xuXG4gICAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPFNlbGVjdGVkQXV0b2NvbXBsZXRlSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlbGVjdGVkQXV0b2NvbXBsZXRlSXRlbT4oKTtcbiAgICBAT3V0cHV0KCduby1yZXN1bHQnKSBwdWJsaWMgbm9SZXN1bHQ6IEV2ZW50RW1pdHRlcjxHcm91cE5vUmVzdWx0PiA9IG5ldyBFdmVudEVtaXR0ZXI8R3JvdXBOb1Jlc3VsdD4oKTtcblxuICAgIEBJbnB1dCgpIHB1YmxpYyBncm91cDogQXV0b2NvbXBsZXRlR3JvdXBbXSA9IFtdO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBrZXk6IHN0cmluZyA9ICcnO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjbGFzc2VzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgX3ZpZXdIYXNCZWVuSW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIF92aWV3SW5pdFN1YmplY3Q6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92aWV3SGFzQmVlbkluaXQpIHtcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMuaW5pdC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZnRlci12aWV3LWluaXQnKTtcblxuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld0hhc0JlZW5Jbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3SW5pdFN1YmplY3QubmV4dCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgTGlzdGVuVG9TZWxlY3RlZChzZWxlY3RlZDogU2VsZWN0ZWRBdXRvY29tcGxldGVJdGVtKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChzZWxlY3RlZCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlNldENoaWxkcmVuKHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIE5vUmVzdWx0KGdyb3VwOiBHcm91cE5vUmVzdWx0KSB7XG4gICAgICAgIHRoaXMubm9SZXN1bHQuZW1pdChncm91cCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBJbnB1dENsZWFyZWQoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5ncm91cC5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICAgICAgaWYgKGdyb3VwLmtleSA9PT0ga2V5IHx8IGdyb3VwLnBhcmVudCA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5SZXNldElucHV0KGdyb3VwLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVtcyBtYXkgaGF2ZSBjaGFuZ2VkLCBuZWVkIHRvIHRlIHJlLXNldCBsaXN0IGluIGNvbXBsZXRlciBjb21wb25lbnRzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5UcmlnZ2VyQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBTZXRDaGlsZHJlbihzZWxlY3RlZDogU2VsZWN0ZWRBdXRvY29tcGxldGVJdGVtKSB7XG4gICAgICAgIHRoaXMuZ3JvdXAuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5wYXJlbnQgPT0gc2VsZWN0ZWQuZ3JvdXAua2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5SZXNldElucHV0KGl0ZW0ua2V5KTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLml0ZW0gIT09IG51bGwgJiYgdHlwZW9mIHNlbGVjdGVkLml0ZW0uY2hpbGRyZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uU2V0TmV3VmFsdWUoc2VsZWN0ZWQuaXRlbS5jaGlsZHJlbiwgc2VsZWN0ZWQuZ3JvdXAua2V5cy50aXRsZUtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXRlbXMgbWF5IGhhdmUgY2hhbmdlZCwgbmVlZCB0byB0ZSByZS1zZXQgbGlzdCBpbiBjb21wbGV0ZXIgY29tcG9uZW50cy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuVHJpZ2dlckNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgVHJpZ2dlckNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZXJzLmZvckVhY2goKGNvbXBsZXRlcikgPT4ge1xuICAgICAgICAgICAgY29tcGxldGVyLlNldEl0ZW1zKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ly9cbiAgICAvLyAhIFV0aWxzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0vL1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBHZXRJbnB1dChrZXk6IHN0cmluZyk6IENvbXBsZXRlckNvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlcnMucmVkdWNlKChyZXN1bHQsIGNvbXBsZXRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlci5ncm91cC5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNvbXBsZXRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwgPENvbXBsZXRlckNvbXBvbmVudD57fSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBTdWJzY3JpYmVJbnB1dChrZXk6IHN0cmluZywgZjogKGNvbXBsZXRlcjogQ29tcGxldGVyQ29tcG9uZW50KSA9PiB2b2lkKSB7XG4gICAgICAgIGlmICh0aGlzLl92aWV3SGFzQmVlbkluaXQpIHtcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZXIgPSB0aGlzLkdldElucHV0KGtleSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZihjb21wbGV0ZXIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmlld0luaXRTdWJqZWN0LnN1YnNjcmliZSgoX2Jvb2wpID0+IHtcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZXIgPSB0aGlzLkdldElucHV0KGtleSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBmKGNvbXBsZXRlcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fdmlld0luaXRTdWJqZWN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgUmVzZXRJbnB1dChrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLlN1YnNjcmliZUlucHV0KFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgKGNvbXBsZXRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlci5DbGVhclZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBTZXRWYWx1ZXMoa2V5OiBzdHJpbmcsIHZhbHVlczogeyBpZD86IHN0cmluZyB8IG51bWJlcjsgW3ZhbHVlOiBzdHJpbmddOiBhbnkgfVtdKSB7XG4gICAgICAgIHRoaXMuU3Vic2NyaWJlSW5wdXQoXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAoY29tcGxldGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVyLmdyb3VwLlNldFZhbHVlcyh2YWx1ZXMpO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSXRlbXMgbWF5IGhhdmUgY2hhbmdlZCwgbmVlZCB0byB0ZSByZS1zZXQgbGlzdCBpbiBjb21wbGV0ZXIgY29tcG9uZW50cy5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLlRyaWdnZXJDaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIFNldFRlbXBsYXRlKGtleTogc3RyaW5nLCB0eXBlOiAnbm9SZXN1bHRzJyB8ICdwbGFjZWhvbGRlclZhbHVlJyB8ICdkcm9wZG93blZhbHVlJywgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5TdWJzY3JpYmVJbnB1dChcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIChjb21wbGV0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZXIuZ3JvdXBbdHlwZV0gPSB0ZW1wbGF0ZTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEl0ZW1zIG1heSBoYXZlIGNoYW5nZWQsIG5lZWQgdG8gdGUgcmUtc2V0IGxpc3QgaW4gY29tcGxldGVyIGNvbXBvbmVudHMuXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5UcmlnZ2VyQ2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBTZXRBc3luYyhrZXk6IHN0cmluZywgcHJvbWlzZTogKHN0cjogc3RyaW5nKSA9PiBQcm9taXNlPHsgaWQ6IHN0cmluZyB8IG51bWJlcjsgW3ZhbHVlOiBzdHJpbmddOiBhbnkgfVtdPikge1xuICAgICAgICB0aGlzLlN1YnNjcmliZUlucHV0KFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgKGNvbXBsZXRlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlci5ncm91cC5hc3luYyA9IHByb21pc2U7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJdGVtcyBtYXkgaGF2ZSBjaGFuZ2VkLCBuZWVkIHRvIHRlIHJlLXNldCBsaXN0IGluIGNvbXBsZXRlciBjb21wb25lbnRzLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuVHJpZ2dlckNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgU2VsZWN0SXRlbShrZXk6IHN0cmluZywgaWQ6IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICB0aGlzLlN1YnNjcmliZUlucHV0KFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgKGNvbXBsZXRlcikgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBsZXRlci5faXRlbXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZiA9IGBfaWRfJHtTdHJpbmcoaWQpfWA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjID0ga2V5LnN1YnN0cmluZyhrZXkuaW5kZXhPZihmKSwga2V5Lmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGYgPT09IGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlci5TZWxlY3RJdGVtKGNvbXBsZXRlci5faXRlbXNba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgUmVtb3ZhYmxlVmFsdWVzKGtleTogc3RyaW5nLCBpZHM6IHsgaWQ6IHN0cmluZyB8IG51bWJlciwgW3ZhbHVlOiBzdHJpbmddOiBhbnkgfVtdKSB7XG4gICAgICAgIHRoaXMuU3Vic2NyaWJlSW5wdXQoXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAoY29tcGxldGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVyLmdyb3VwLlJlbW92YWJsZXMoUmV0dXJuU3RyaW5nQXJyYXlCeUlEKGlkcykpO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSXRlbXMgbWF5IGhhdmUgY2hhbmdlZCwgbmVlZCB0byB0ZSByZS1zZXQgbGlzdCBpbiBjb21wbGV0ZXIgY29tcG9uZW50cy5cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLlRyaWdnZXJDaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIFJlc2V0SW5wdXRzKCkge1xuICAgICAgICB0aGlzLmdyb3VwLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuUmVzZXRJbnB1dChpdGVtLmtleSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ly9cbiAgICAvLyAhIFN0YXRpYyAodXRpbHMpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0vL1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBzdGF0aWMgRmluZENvbXBsZXRlcihrZXk6IHN0cmluZywgbGlzdDogUXVlcnlMaXN0PE5nQXV0b0NvbXBsZXRlQ29tcG9uZW50Pik6IE5nQXV0b0NvbXBsZXRlQ29tcG9uZW50IHtcbiAgICAgICAgY29uc3QgY29tcGxldGVyID0gbGlzdC5maWx0ZXIoKGNvbXBsZXRlcjogTmdBdXRvQ29tcGxldGVDb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPT09IGNvbXBsZXRlci5rZXk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29tcGxldGVyWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlclswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdoaWdobGlnaHQnXG59KVxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odGV4dDogc3RyaW5nLCBzZWFyY2g6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VhcmNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHRleHRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXR0ZXJuID0gc2VhcmNoLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC97fSgpKis/LlxcXFxeJHxdL2csICdcXFxcJCYnKTtcbiAgICAgICAgcGF0dGVybiA9IHBhdHRlcm4uc3BsaXQoJyAnKS5maWx0ZXIoKHQpID0+IHQubGVuZ3RoID4gMCkuam9pbignfCcpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShuZXcgUmVnRXhwKHBhdHRlcm4sICdnaScpLCAobWF0Y2gpID0+IGA8c3BhbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW0taGlnaGxpZ2h0XCI+JHttYXRjaH08L3NwYW4+YCk7XG4gICAgfVxufSIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdrZXlzJ1xufSlcbmV4cG9ydCBjbGFzcyBLZXlWYWx1ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzPzogYW55KTogYW55IHtcbiAgICAgICAgbGV0IGtleXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0hpZ2hsaWdodFBpcGV9IGZyb20gJy4vaGlnaGxpZ2h0JztcbmltcG9ydCB7S2V5VmFsdWVQaXBlfSBmcm9tICcuL2tleS12YWx1ZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW10sXG4gICAgZGVjbGFyYXRpb25zOiBbSGlnaGxpZ2h0UGlwZSwgS2V5VmFsdWVQaXBlXSxcbiAgICBleHBvcnRzOiBbSGlnaGxpZ2h0UGlwZSwgS2V5VmFsdWVQaXBlXSxcbn0pXG5leHBvcnQgY2xhc3MgUGlwZU1vZHVsZSB7XG5cbiAgICBzdGF0aWMgZm9yUm9vdCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBQaXBlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdBdXRvQ29tcGxldGVDb21wb25lbnR9IGZyb20gJy4vbmctYXV0by1jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbXBsZXRlckNvbXBvbmVudH0gZnJvbSAnLi9jb21wbGV0ZXIvY29tcGxldGVyLmNvbXBvbmVudCc7XG5pbXBvcnQge05nRHJvcGRvd25EaXJlY3RpdmV9IGZyb20gJy4vZHJvcGRvd24vbmctZHJvcGRvd24uZGlyZWN0aXZlJztcbmltcG9ydCB7UGlwZU1vZHVsZX0gZnJvbSAnLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUGlwZU1vZHVsZS5mb3JSb290KClcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTmdBdXRvQ29tcGxldGVDb21wb25lbnQsXG4gICAgICAgIENvbXBsZXRlckNvbXBvbmVudCxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBOZ0F1dG9Db21wbGV0ZUNvbXBvbmVudCxcbiAgICAgICAgQ29tcGxldGVyQ29tcG9uZW50LFxuICAgICAgICBOZ0Ryb3Bkb3duRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0F1dG9Db21wbGV0ZU1vZHVsZSB7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBWUksMEJBQVksS0FBYSxFQUFFLEVBQW1CLEVBQUUsUUFBYTtRQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0tBQzVCO0lBQ0wsdUJBQUM7Q0FBQSxJQUFBOzs7Ozs7OztBQUtELFNBQWdCLDJCQUEyQixDQUFDLEtBQXFELEVBQUUsUUFBZ0IsRUFBRSxXQUFpQztJQUFqQyw0QkFBQSxFQUFBLGtCQUFpQztJQUNsSixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQzs7WUFDeEIsQ0FBQyxHQUFHLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXpELElBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQzVCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRywyQkFBMkIsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FB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

/***/ }),

/***/ "./node_modules/ngx-google-places-autocomplete/bundles/ngx-google-places-autocomplete.umd.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/ngx-google-places-autocomplete/bundles/ngx-google-places-autocomplete.umd.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js")) :
	undefined;
}(this, (function (exports,_angular_core) { 'use strict';

var Options = (function () {
    /**
     * @param {?=} opt
     */
    function Options(opt) {
        if (!opt)
            return;
        Object.assign(this, opt);
    }
    return Options;
}());

var GooglePlaceDirective = (function () {
    /**
     * @param {?} el
     * @param {?} ngZone
     */
    function GooglePlaceDirective(el, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.onAddressChange = new _angular_core.EventEmitter();
    }
    /**
     * @return {?}
     */
    GooglePlaceDirective.prototype.ngAfterViewInit = function () {
        if (!this.options)
            this.options = new Options();
        this.initialize();
    };
    /**
     * @return {?}
     */
    GooglePlaceDirective.prototype.isGoogleLibExists = function () {
        return !(!google || !google.maps || !google.maps.places);
    };
    /**
     * @return {?}
     */
    GooglePlaceDirective.prototype.initialize = function () {
        var _this = this;
        if (!this.isGoogleLibExists())
            throw new Error("Google maps library can not be found");
        this.autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement, this.options);
        if (!this.autocomplete)
            throw new Error("Autocomplete is not initialized");
        if (!this.autocomplete.addListener != null) {
            this.eventListener = this.autocomplete.addListener('place_changed', function () {
                _this.handleChangeEvent();
            });
        }
        this.el.nativeElement.addEventListener('keydown', function (event) {
            var /** @type {?} */ key = event.key.toLowerCase();
            if (key == 'enter' && event.target === _this.el.nativeElement) {
                event.preventDefault();
                event.stopPropagation();
            }
        });
        // according to https://gist.github.com/schoenobates/ef578a02ac8ab6726487
        if (window && window.navigator && window.navigator.userAgent && navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
            setTimeout(function () {
                var /** @type {?} */ containers = document.getElementsByClassName('pac-container');
                if (containers) {
                    var /** @type {?} */ arr = Array.from(containers);
                    if (arr) {
                        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                            var container = arr_1[_i];
                            if (!container)
                                continue;
                            container.addEventListener('touchend', function (e) {
                                e.stopImmediatePropagation();
                            });
                        }
                    }
                }
            }, 500);
        }
    };
    /**
     * @return {?}
     */
    GooglePlaceDirective.prototype.reset = function () {
        this.autocomplete.setComponentRestrictions(this.options.componentRestrictions);
        this.autocomplete.setTypes(this.options.types);
    };
    /**
     * @return {?}
     */
    GooglePlaceDirective.prototype.handleChangeEvent = function () {
        var _this = this;
        this.ngZone.run(function () {
            _this.place = _this.autocomplete.getPlace();
            if (_this.place && _this.place.place_id) {
                _this.onAddressChange.emit(_this.place);
            }
        });
    };
    GooglePlaceDirective.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[ngx-google-places-autocomplete]',
                    exportAs: 'ngx-places'
                },] },
    ];
    /**
     * @nocollapse
     */
    GooglePlaceDirective.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.NgZone, },
    ]; };
    GooglePlaceDirective.propDecorators = {
        'options': [{ type: _angular_core.Input, args: ['options',] },],
        'onAddressChange': [{ type: _angular_core.Output },],
    };
    return GooglePlaceDirective;
}());

var GooglePlaceModule = (function () {
    function GooglePlaceModule() {
    }
    GooglePlaceModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    declarations: [GooglePlaceDirective],
                    exports: [GooglePlaceDirective]
                },] },
    ];
    /**
     * @nocollapse
     */
    GooglePlaceModule.ctorParameters = function () { return []; };
    return GooglePlaceModule;
}());

exports.GooglePlaceModule = GooglePlaceModule;
exports.GooglePlaceDirective = GooglePlaceDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));


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

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/map.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/map.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/map */ "./node_modules/rxjs-compat/_esm5/operator/map.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.map = _operator_map__WEBPACK_IMPORTED_MODULE_1__["map"];
//# sourceMappingURL=map.js.map

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

/***/ "./node_modules/rxjs-compat/_esm5/operator/map.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/operator/map.js ***!
  \********************************************************/
/*! exports provided: map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

function map(project, thisArg) {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(project, thisArg)(this);
}
//# sourceMappingURL=map.js.map

/***/ })

}]);
//# sourceMappingURL=default~adresses-adresses-module~users-users-module.js.map