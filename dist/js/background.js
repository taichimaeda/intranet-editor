/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deepCopy": () => (/* binding */ deepCopy),
/* harmony export */   "sendMessage": () => (/* binding */ sendMessage),
/* harmony export */   "getTitle": () => (/* binding */ getTitle),
/* harmony export */   "getTime": () => (/* binding */ getTime),
/* harmony export */   "getColumns": () => (/* binding */ getColumns),
/* harmony export */   "getStyles": () => (/* binding */ getStyles)
/* harmony export */ });
function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
function sendMessage(message) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
function getTitle(cell) {
  var res = cell.title.match(/(?:\d\d:\d\d\s-\s)?(.+)$/);
  return res[res.length - 1];
}
function getTime(cell) {
  var res = cell.title.match(/(\d\d:\d\d\s-\s)/);
  return res === null ? "" : res[0];
}
function getColumns(rootElement) {
  var columnElements = rootElement.querySelectorAll('td > div:nth-of-type(2)');
  var columns = [];
  Array.prototype.forEach.call(columnElements, function (columnElement, columnIndex) {
    var cellElements = columnElement.querySelectorAll('div.WDPLN-RendezVousExterne');
    var cells = [];
    Array.prototype.forEach.call(cellElements, function (cellElement, cellIndex) {
      var ulElement = cellElement.querySelector('ul');
      var liElements = cellElement.querySelectorAll('ul > li');
      var divElements = cellElement.querySelectorAll('ul > li > div');
      cells.push({
        index: cellIndex,
        id: cellElement.id,
        className: cellElement.className,
        title: divElements[0].innerText,
        content: divElements[1].innerText,
        style: {
          display: 'block',
          top: cellElement.style.top,
          left: cellElement.style.left,
          width: ulElement.style.width,
          height: ulElement.style.height,
          color1: liElements[0].style.backgroundColor,
          color2: liElements[1].style.backgroundColor
        }
      });
    });
    columns.push({
      index: columnIndex,
      id: columnElement.id,
      className: columnElement.className,
      cells: cells
    });
  });
  return columns;
}
function getStyles(cell) {
  return {
    container: {
      display: cell.style.display,
      position: 'absolute',
      zIndex: '4',
      top: "calc(".concat(cell.style.top, " + 2px)"),
      left: "calc(".concat(cell.style.left, ")"),
      // width: `calc(${cell.style.width} + 2px`,
      height: "calc(".concat(cell.style.height, " + 2px")
    },
    ul: {
      width: cell.style.width,
      height: cell.style.height
    },
    li: [{
      paddingTop: '1px',
      boxShadow: "0px 20px 10px -10px ".concat(cell.style.color2, " inset"),
      backgroundColor: cell.style.color1
    }, {
      height: '100%',
      backgroundImage: "url('https://sp.rosey.ch/AgendaEleve_WEB/ext/covid16.png')",
      backgroundColor: cell.style.color2
    }],
    div: {
      width: "calc(".concat(cell.style.width, " - 4px)")
    }
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({
    columns: null
  });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendMessage)({
      command: 'activate'
    }); // add context menus

    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
      title: 'remove',
      contexts: ['all'],
      onclick: function onclick() {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendMessage)({
          command: 'remove'
        });
      }
    });
  }
});
chrome.runtime.onMessage.addListener(function (message) {
  if (message.command === 'create') {
    var flags = {};
    var columns = message.content;

    var _iterator = _createForOfIteratorHelper(columns),
        _step;

    try {
      var _loop = function _loop() {
        var column = _step.value;

        var _iterator2 = _createForOfIteratorHelper(column.cells),
            _step2;

        try {
          var _loop2 = function _loop2() {
            var cell = _step2.value;
            var title = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getTitle)(cell);

            if (!flags[title]) {
              flags[title] = true;
              chrome.contextMenus.create({
                title: 'change to ' + title,
                contexts: ['all'],
                onclick: function onclick() {
                  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sendMessage)({
                    command: 'change',
                    target: {
                      column: column,
                      cell: cell
                    }
                  });
                }
              });
            }
          };

          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
});
})();

/******/ })()
;