"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switcher = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Icon = require("../Icon");
var _OverflowList = require("../OverflowList");
var _idsCore = require("@ids-core");
var _generators = require("../../hooks/generators");
var _Switcher = require("./Switcher.types");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ERROR_ICON = 'alert-error';
var MORE_ICON = 'arrow-double-right';
var NAVIGATION_FORWARD_KEYS = ['ArrowRight', 'ArrowDown'];
var NAVIGATION_BACKWARD_KEYS = ['ArrowLeft', 'ArrowUp'];
var NAVIGATION_STEP = 1;
var Switcher = exports.Switcher = function Switcher(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    items = _ref.items,
    _ref$moreLabel = _ref.moreLabel,
    moreLabel = _ref$moreLabel === void 0 ? 'More' : _ref$moreLabel,
    name = _ref.name,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {
      return undefined;
    } : _ref$onChange,
    _ref$overflow = _ref.overflow,
    overflow = _ref$overflow === void 0 ? false : _ref$overflow,
    selectedValue = _ref.selectedValue,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _Switcher.SwitcherSize.Large : _ref$size,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? _Switcher.SwitcherType.Backoffice : _ref$type;
  var groupName = (0, _generators.useGetOrCreateId)(name);
  var rootRef = (0, _react.useRef)(null);
  var hiddenCountRef = (0, _react.useRef)(0);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMoreOpen = _useState2[0],
    setIsMoreOpen = _useState2[1];
  // Overflow "promote into track": when an item is picked from the More menu it is pinned to the
  // front so it becomes visible. Switching between already-visible items does NOT change this, so
  // the visible order (and OverflowList's measurement) stays stable — no reflow/flash on selection.
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    promotedValue = _useState4[0],
    setPromotedValue = _useState4[1];
  var overflowItems = (0, _react.useMemo)(function () {
    var mapped = items.map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        id: item.value
      });
    });
    var promoted = mapped.find(function (item) {
      return item.value === promotedValue;
    });
    if (!promoted) {
      return mapped;
    }
    return [promoted].concat(_toConsumableArray(mapped.filter(function (item) {
      return item.value !== promotedValue;
    })));
  }, [items, promotedValue]);
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-switcher': true
  }, "ids-switcher--".concat(size), true), "ids-switcher--".concat(type), true), 'ids-switcher--overflow', overflow), className, !!className));
  var enabledValues = items.filter(function (item) {
    return !item.disabled;
  }).map(function (item) {
    return item.value;
  });
  var isSelectedEnabled = selectedValue !== undefined && enabledValues.includes(selectedValue);
  var activeValue = isSelectedEnabled ? selectedValue : enabledValues[0];
  var selectItem = function selectItem(item) {
    if (item.disabled || item.value === selectedValue) {
      return;
    }
    onChange(item.value);
  };
  var focusItemByValue = function focusItemByValue(value) {
    var _rootRef$current;
    (_rootRef$current = rootRef.current) === null || _rootRef$current === void 0 || (_rootRef$current = _rootRef$current.querySelector("[data-value=\"".concat(value, "\"]"))) === null || _rootRef$current === void 0 || _rootRef$current.focus();
  };
  var onGroupKeyDown = function onGroupKeyDown(event) {
    var isForward = NAVIGATION_FORWARD_KEYS.includes(event.key);
    var isBackward = NAVIGATION_BACKWARD_KEYS.includes(event.key);
    if (!isForward && !isBackward) {
      return;
    }
    var target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    var focusedValue = target.getAttribute('data-value');
    var currentIndex = focusedValue ? enabledValues.indexOf(focusedValue) : -1;
    if (currentIndex === -1 || enabledValues.length === 0) {
      return;
    }
    event.preventDefault();
    var offset = isForward ? NAVIGATION_STEP : -NAVIGATION_STEP;
    var nextIndex = (currentIndex + offset + enabledValues.length) % enabledValues.length;
    var nextValue = enabledValues[nextIndex];
    onChange(nextValue);
    focusItemByValue(nextValue);
  };
  var renderItemButton = function renderItemButton(item) {
    var isSelected = item.value === selectedValue;
    var itemClassName = (0, _idsCore.createCssClassNames)({
      'ids-switcher__item': true,
      'ids-switcher__item--disabled': !!item.disabled,
      'ids-switcher__item--error': !!item.error,
      'ids-switcher__item--selected': isSelected
    });
    return /*#__PURE__*/_react["default"].createElement("button", {
      "aria-checked": isSelected,
      className: itemClassName,
      "data-value": item.value,
      disabled: item.disabled,
      key: item.value,
      name: groupName,
      onClick: function onClick() {
        selectItem(item);
      },
      role: "radio",
      tabIndex: item.value === activeValue ? 0 : -1,
      title: title,
      type: "button"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "ids-switcher__item-label"
    }, item.label), item.error && /*#__PURE__*/_react["default"].createElement("span", {
      className: "ids-switcher__item-icon"
    }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
      name: ERROR_ICON,
      size: _Icon.IconSize.TinySmall
    })));
  };
  // Only the trigger button lives inside OverflowList (which is `overflow: hidden`). The dropdown
  // menu is rendered as a sibling of OverflowList so it isn't clipped by that hidden overflow.
  var renderMore = function renderMore(_ref2) {
    var hiddenCount = _ref2.hiddenCount;
    hiddenCountRef.current = hiddenCount;
    var moreClassName = (0, _idsCore.createCssClassNames)({
      'ids-switcher__item': true,
      'ids-switcher__item--more': true
    });
    return /*#__PURE__*/_react["default"].createElement("button", {
      "aria-expanded": isMoreOpen,
      "aria-haspopup": "menu",
      className: moreClassName,
      onClick: function onClick() {
        setIsMoreOpen(function (open) {
          return !open;
        });
      },
      type: "button"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "ids-switcher__item-label"
    }, moreLabel), /*#__PURE__*/_react["default"].createElement("span", {
      className: "ids-switcher__item-icon"
    }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
      name: MORE_ICON,
      size: _Icon.IconSize.TinySmall
    })));
  };
  var renderMenu = function renderMenu() {
    var hiddenItems = overflowItems.slice(overflowItems.length - hiddenCountRef.current);
    if (!isMoreOpen || hiddenItems.length === 0) {
      return null;
    }
    var onMenuClick = function onMenuClick(event) {
      var target = event.target;
      var itemElement = target instanceof Element ? target.closest('.ids-switcher__item') : null;
      var value = itemElement === null || itemElement === void 0 ? void 0 : itemElement.getAttribute('data-value');
      if (value) {
        setPromotedValue(value);
      }
      setIsMoreOpen(false);
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ids-switcher__menu",
      onClick: onMenuClick,
      role: "menu"
    }, hiddenItems.map(function (item) {
      return renderItemButton(item);
    }));
  };
  (0, _react.useEffect)(function () {
    if (!isMoreOpen) {
      return undefined;
    }
    var onDocumentMouseDown = function onDocumentMouseDown(event) {
      var target = event.target;
      if (rootRef.current && target instanceof Node && !rootRef.current.contains(target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocumentMouseDown);
    return function () {
      document.removeEventListener('mousedown', onDocumentMouseDown);
    };
  }, [isMoreOpen]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClassName,
    onKeyDown: onGroupKeyDown,
    ref: rootRef,
    role: "radiogroup",
    title: title
  }, overflow ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_OverflowList.OverflowList, {
    items: overflowItems,
    renderItem: function renderItem(item) {
      return renderItemButton(item);
    },
    renderMore: renderMore
  }), renderMenu()) : items.map(function (item) {
    return renderItemButton(item);
  }));
};