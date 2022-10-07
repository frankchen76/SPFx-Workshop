define("f92f1be5-7a5a-4998-a5e3-1017223e24ab_0.0.1", ["@microsoft/sp-dialog","@microsoft/sp-listview-extensibility","@microsoft/sp-core-library"], function(__WEBPACK_EXTERNAL_MODULE__Cqt__, __WEBPACK_EXTERNAL_MODULE__7wVe__, __WEBPACK_EXTERNAL_MODULE_UWqr__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "a1/L");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/Cqt":
/*!***************************************!*\
  !*** external "@microsoft/sp-dialog" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__Cqt__;

/***/ }),

/***/ "7wVe":
/*!*******************************************************!*\
  !*** external "@microsoft/sp-listview-extensibility" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7wVe__;

/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "a1/L":
/*!***************************************************************************!*\
  !*** ./lib/extensions/module05CommandSet/Module05CommandSetCommandSet.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_listview_extensibility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-listview-extensibility */ "7wVe");
/* harmony import */ var _microsoft_sp_listview_extensibility__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_listview_extensibility__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-dialog */ "/Cqt");
/* harmony import */ var _microsoft_sp_dialog__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_dialog__WEBPACK_IMPORTED_MODULE_2__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var LOG_SOURCE = 'Module05CommandSetCommandSet';
var Module05CommandSetCommandSet = /** @class */ (function (_super) {
    __extends(Module05CommandSetCommandSet, _super);
    function Module05CommandSetCommandSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onListViewStateChanged = function (args) {
            var _a;
            _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Log"].info(LOG_SOURCE, 'List view state changed');
            var compareOneCommand = _this.tryGetCommand('COMMAND_1');
            if (compareOneCommand) {
                // This command should be hidden unless exactly one row is selected.
                compareOneCommand.visible = ((_a = _this.context.listView.selectedRows) === null || _a === void 0 ? void 0 : _a.length) === 1;
            }
            // TODO: Add your logic here
            // You should call this.raiseOnChage() to update the command bar
            _this.raiseOnChange();
        };
        return _this;
    }
    Module05CommandSetCommandSet.prototype.onInit = function () {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Log"].info(LOG_SOURCE, 'Initialized Module05CommandSetCommandSet');
        return Promise.resolve();
    };
    Module05CommandSetCommandSet.prototype.onListViewUpdated = function (event) {
        var compareOneCommand = this.tryGetCommand('COMMAND_1');
        if (compareOneCommand) {
            // This command should be hidden unless exactly one row is selected.
            compareOneCommand.visible = event.selectedRows.length === 1;
        }
    };
    Module05CommandSetCommandSet.prototype.onExecute = function (event) {
        switch (event.itemId) {
            case 'COMMAND_1':
                _microsoft_sp_dialog__WEBPACK_IMPORTED_MODULE_2__["Dialog"].alert("".concat(this.properties.sampleTextOne));
                break;
            case 'COMMAND_2':
                _microsoft_sp_dialog__WEBPACK_IMPORTED_MODULE_2__["Dialog"].alert("".concat(this.properties.sampleTextTwo));
                break;
            default:
                throw new Error('Unknown command');
        }
    };
    return Module05CommandSetCommandSet;
}(_microsoft_sp_listview_extensibility__WEBPACK_IMPORTED_MODULE_1__["BaseListViewCommandSet"]));
/* harmony default export */ __webpack_exports__["default"] = (Module05CommandSetCommandSet);


/***/ })

/******/ })});;
//# sourceMappingURL=module-05-command-set-command-set.js.map