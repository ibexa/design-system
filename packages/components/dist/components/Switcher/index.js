"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Switcher = require("./Switcher");
Object.keys(_Switcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Switcher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Switcher[key];
    }
  });
});
var _Switcher2 = require("./Switcher.types");
Object.keys(_Switcher2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Switcher2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Switcher2[key];
    }
  });
});