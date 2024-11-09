/*! scar v2.3.2 - https://larsjung.de/scar/ */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("scar", [], factory);
	else if(typeof exports === 'object')
		exports["scar"] = factory();
	else
		root["scar"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Test = __webpack_require__(1);
var Suite = __webpack_require__(3);
var reporter = __webpack_require__(4);
var cli = __webpack_require__(6);
var scar = function scar() {
  var tests = [];
  var test = function test() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    tests.push(_construct(Test, args));
  };
  test.skip = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return test.apply(void 0, args.concat([{
      skip: true
    }]));
  };
  test.sync = function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return test.apply(void 0, args.concat([{
      sync: true
    }]));
  };
  test.run = function (options) {
    options = _objectSpread(_objectSpread({
      reporter: reporter
    }, options), {}, {
      tests: tests
    });
    return new Suite(options).run();
  };
  test.cli = function (options) {
    return cli(test.run, options);
  };
  return test;
};
module.exports = {
  scar: scar,
  test: scar(),
  assert: __webpack_require__(7),
  insp: __webpack_require__(8),
  spy: __webpack_require__(9),
  uniq: __webpack_require__(10)
};

/***/ }),
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(2),
  is_str = _require.is_str,
  is_num = _require.is_num,
  is_fn = _require.is_fn,
  as_fn = _require.as_fn;
var timeout = function timeout(promise, millis) {
  if (!is_num(millis) || millis <= 0) {
    return promise;
  }
  return Promise.race([promise, new Promise(function (resolve, reject) {
    setTimeout(function () {
      return reject(new Error("Timeout (".concat(millis, "ms)")));
    }, millis);
  })]);
};
var Test = /*#__PURE__*/function () {
  function Test() {
    var _this = this;
    _classCallCheck(this, Test);
    this.desc = '[No Description]';
    this.fn = null;
    this.skip = false;
    this.sync = false;
    this.timeout = null;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    args.forEach(function (arg) {
      if (is_str(arg)) {
        _this.desc = arg;
      } else if (is_fn(arg)) {
        _this.fn = arg;
      } else {
        Object.assign(_this, arg);
      }
    });
    this.status = Test.WAITING;
    this.err = null;
    this.starttime = null;
    this.duration = null;
    this.promise = null;
  }
  return _createClass(Test, [{
    key: "__TRACE_MARKER__",
    value: function __TRACE_MARKER__() {
      return as_fn(this.fn)();
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;
      this.promise = this.promise || Promise.resolve().then(function () {
        _this2.starttime = Date.now();
        _this2.status = Test.PENDING;
        if (_this2.skip) {
          return null;
        }
        var pr = Promise.resolve().then(function () {
          return _this2.__TRACE_MARKER__();
        });
        return timeout(pr, _this2.timeout);
      }).then(function () {
        _this2.status = _this2.skip ? Test.SKIPPED : Test.PASSED;
      })["catch"](function (err) {
        _this2.status = Test.FAILED;
        _this2.err = err;
      }).then(function () {
        _this2.duration = Date.now() - _this2.starttime;
      });
      return this.promise;
    }
  }]);
}();
Test.WAITING = 'WAITING';
Test.PENDING = 'PENDING';
Test.PASSED = 'PASSED';
Test.FAILED = 'FAILED';
Test.SKIPPED = 'SKIPPED';
module.exports = Test;

/***/ }),
/* 2 */
/***/ ((module) => {

var is_bool = function is_bool(x) {
  return typeof x === 'boolean';
};
var is_num = function is_num(x) {
  return typeof x === 'number';
};
var is_str = function is_str(x) {
  return typeof x === 'string';
};
var is_arr = function is_arr(x) {
  return Array.isArray(x);
};
var is_fn = function is_fn(x) {
  return typeof x === 'function';
};
var as_fn = function as_fn(x) {
  return is_fn(x) ? x : function () {
    return x;
  };
};
var is_regexp = function is_regexp(x) {
  return x instanceof RegExp;
};
var is_plain_obj = function is_plain_obj(x) {
  return Reflect.apply(Object.prototype.toString, x, []) === '[object Object]';
};
var run_seq = function run_seq(fns) {
  return fns.reduce(function (p, fn) {
    return p.then(fn);
  }, Promise.resolve());
};
var run_conc = function run_conc(fns) {
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1024;
  if (max < 2) {
    return run_seq(fns);
  }
  return new Promise(function (resolve) {
    fns = Array.from(fns);
    var awaiting = fns.length;
    var pending = 0;
    var run_fn = function run_fn(fn) {
      return Promise.resolve().then(fn)["catch"](function () {}).then(function () {
        pending -= 1;
        awaiting -= 1;
      });
    };
    var _check = function check() {
      while (fns.length && pending < max) {
        run_fn(fns.shift()).then(_check);
        pending += 1;
      }
      if (!awaiting) {
        resolve();
      }
    };
    _check();
  });
};
module.exports = {
  is_bool: is_bool,
  is_num: is_num,
  is_str: is_str,
  is_arr: is_arr,
  is_fn: is_fn,
  is_regexp: is_regexp,
  is_plain_obj: is_plain_obj,
  as_fn: as_fn,
  run_seq: run_seq,
  run_conc: run_conc
};

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = __webpack_require__(2),
  as_fn = _require.as_fn,
  run_seq = _require.run_seq,
  run_conc = _require.run_conc;
var Test = __webpack_require__(1);
var Suite = /*#__PURE__*/function () {
  function Suite(options) {
    _classCallCheck(this, Suite);
    this.sync = false;
    this.reporter = null;
    this.filter = null;
    this.max_conc = 64;
    this.tests = [];
    Object.assign(this, options);
    this.status = Test.WAITING;
    this.starttime = null;
    this.duration = null;
    this.promise = null;
  }
  return _createClass(Suite, [{
    key: "run_test",
    value: function run_test(test) {
      var _this = this;
      return Promise.resolve().then(function () {
        return as_fn(_this.reporter)('before_test', _this, test);
      }).then(function () {
        _this.run_count += 1;
        test.run_idx = _this.run_count;
      }).then(function () {
        return test.run();
      }).then(function () {
        _this.settled_count += 1;
        test.settled_idx = _this.settled_count;
        if (test.status === Test.PASSED) {
          _this.passed_count += 1;
          test.passed_idx = _this.passed_count;
        } else if (test.status === Test.SKIPPED) {
          _this.skipped_count += 1;
          test.skipped_idx = _this.skipped_count;
        } else {
          _this.failed_count += 1;
          test.failed_idx = _this.failed_count;
        }
      }).then(function () {
        return as_fn(_this.reporter)('after_test', _this, test);
      });
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;
      this.promise = this.promise || Promise.resolve().then(function () {
        _this2.tests.forEach(function (test, idx) {
          test.def_idx = idx + 1;
        });
        _this2.total = _this2.tests.length;
        _this2.filtered_tests = _this2.tests.filter(as_fn(_this2.filter || true));
        _this2.filtered_total = _this2.filtered_tests.length;
        _this2.run_count = 0;
        _this2.settled_count = 0;
        _this2.passed_count = 0;
        _this2.failed_count = 0;
        _this2.skipped_count = 0;
      }).then(function () {
        return as_fn(_this2.reporter)('before_all', _this2);
      }).then(function () {
        _this2.starttime = Date.now();
        _this2.status = Test.PENDING;
        var test_to_fn = function test_to_fn(test) {
          return function () {
            return _this2.run_test(test);
          };
        };
        var tests = _this2.filtered_tests;
        var sync_tests = _this2.sync ? tests : tests.filter(function (t) {
          return !!t.sync;
        });
        var async_tests = _this2.sync ? [] : tests.filter(function (t) {
          return !t.sync;
        });
        var sync_fns = sync_tests.map(test_to_fn);
        var async_fns = async_tests.map(test_to_fn);
        return run_seq(sync_fns).then(function () {
          return run_conc(async_fns, _this2.max_conc);
        });
      }).then(function () {
        _this2.status = _this2.failed_count ? Test.FAILED : Test.PASSED;
        _this2.duration = Date.now() - _this2.starttime;
      }).then(function () {
        return as_fn(_this2.reporter)('after_all', _this2);
      }).then(function () {
        return _this2;
      });
      return this.promise;
    }
  }]);
}();
module.exports = Suite;

/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var format_err = __webpack_require__(5);
var Test = __webpack_require__(1);
var DOC = __webpack_require__.g.window && __webpack_require__.g.window.document;
var ICON_TPL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wsZER*AAAAAElFTkSuQmCC';
var ICON_RED = ICON_TPL.replace('*', 'Y0VbWlewAAAB1JREFUOMtj/OJs9p+BAsDEQCEYNWDUgFEDBosBABZOAow9yV0y');
var ICON_GREEN = ICON_TPL.replace('*', 'kM+i8BKgAAAB1JREFUOMtj9Fkf8J+BAsDEQCEYNWDUgFEDBosBAIuhAmqCXURi');
var ICON_GREY = ICON_TPL.replace('*', 'kjUf48cwAAAB1JREFUOMtjDA0N/c9AAWBioBCMGjBqwKgBg8UAAFduAh79mcom');
var log = function log(x) {
  return console.log(x);
};
var set_title = !DOC ? function () {
  return null;
} : function () {
  var head = DOC.querySelector('head');
  var rel = 'shortcut icon';
  return function (title, href) {
    DOC.title = title;
    var el = head.querySelector("link[rel=\"".concat(rel, "\"]"));
    if (el) {
      head.removeChild(el);
    }
    head.appendChild(Object.assign(DOC.createElement('link'), {
      rel: rel,
      href: href
    }));
  };
}();
module.exports = function (type, suite, test) {
  if (type === 'before_all') {
    var str = 'running ';
    if (suite.filtered_total !== suite.total) {
      str += "".concat(suite.filtered_total, " of ");
    }
    str += "".concat(suite.total, " tests\n ");
    log(str);
    set_title("running ".concat(suite.filtered_total, " tests..."), ICON_GREY);

    // take time to update icon
    return new Promise(function (resolve) {
      return setTimeout(function () {
        return resolve();
      }, 30);
    });
  }
  if (type === 'after_test') {
    var status = test.status === Test.PASSED ? ' ok ' : test.status === Test.SKIPPED ? 'skip' : 'FAIL';
    log(" ".concat(status, " ").concat(test.desc));
  }
  if (type === 'after_all') {
    suite.tests.filter(function (t) {
      return t.status === Test.FAILED;
    }).forEach(function (t) {
      var str = format_err(t.err, '  ');
      log("\n[".concat(t.failed_idx, "] ").concat(t.desc, "\n").concat(str));
    });
    var resume = '\n';
    if (suite.failed_count) {
      resume += "".concat(suite.failed_count, " failed, ");
    }
    if (suite.skipped_count) {
      resume += "".concat(suite.skipped_count, " skipped, ");
    }
    resume += "".concat(suite.passed_count, " passed (").concat(suite.duration, "ms)");
    log(resume);
    set_title(resume, suite.failed_count ? ICON_RED : ICON_GREEN);
  }
  return null;
};

/***/ }),
/* 5 */
/***/ ((module) => {

var LINE_PATTERNS = [
// v8: ' at <method> (<url>:<line>:<col>)'
{
  re: /^\s*at\s+(.*?)\s+\((.*?)(?::(\d+))?(?::(\d+))?\)\s*$/,
  method: 1,
  url: 2,
  line: 3,
  column: 4
},
// v8 no method: ' at <url>:<line>:<col>'
{
  re: /^\s*at\s+(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
  method: null,
  url: 1,
  line: 2,
  column: 3
},
// spidermonkey: '<method>@<url>:<line>:<col>'
{
  re: /^(.*?)@(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
  method: 1,
  url: 2,
  line: 3,
  column: 4
}];
var RE_MARKER = /\b__TRACE_MARKER__\b|^process\._tickCallback$/;
var parse_frame = function parse_frame(line) {
  for (var _i = 0, _LINE_PATTERNS = LINE_PATTERNS; _i < _LINE_PATTERNS.length; _i++) {
    var pattern = _LINE_PATTERNS[_i];
    var match = pattern.re.exec(line);
    if (match) {
      return {
        method: match[pattern.method] || '',
        url: match[pattern.url],
        basename: match[pattern.url].replace(/^.*\//, ''),
        line: parseInt(match[pattern.line], 10),
        column: parseInt(match[pattern.column], 10),
        drop: false
      };
    }
  }
  return null;
};
var parse_frames = function parse_frames(sequence, drop) {
  drop = Number(drop) || 0;
  var lines = sequence.split('\n');
  var frames = lines.map(function (line) {
    return parse_frame(line);
  }).filter(function (x) {
    return x;
  });
  var drop_frames = false;
  frames.forEach(function (frame, idx) {
    drop_frames = drop_frames || RE_MARKER.test(frame.method);
    frame.drop = idx < drop || drop_frames;
  });
  return frames;
};
var format_frames = function format_frames(frames, _short, full_stack) {
  frames = frames.filter(function (frame) {
    return full_stack || !frame.drop;
  });
  return frames.map(function (frame) {
    var str = frame.drop ? '      ' : '  ->  ';
    str += [_short ? frame.basename : frame.url, frame.line, frame.column].filter(function (x) {
      return x;
    }).join('  ');
    if (frame.method) {
      str += "  (".concat(frame.method, ")");
    }
    return str;
  }).join('\n');
};
var format_err = function format_err(err) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var _short2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var full_stack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var frames = parse_frames(err.stack, err.drop);
  var str = "".concat(err.name, ": ").concat(err.message, "\n") + format_frames(frames, _short2, full_stack);
  return prefix + str.replace(/\n/g, '\n' + prefix);
};
module.exports = format_err;

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PROC = __webpack_require__.g.process;
var WIN = __webpack_require__.g.window;
var HELP = "scar - a test runner for node and the browser\n\nUsage:\n  node tests.js [opt...] [arg...]\n  tests.html?opt&...&arg&...\n\nOptions:\n  -h: show this help message\n\nArguments:\n  all arguments are used as test filters\n";
var log = console.log.bind(console);
var create_filter_fn = function create_filter_fn(strs) {
  return function (test) {
    return strs.every(function (s) {
      return test.desc.includes(s);
    });
  };
};
var parse_args = function parse_args() {
  var args = [];
  if (PROC) {
    args = PROC.argv.slice(2);
  } else if (WIN) {
    args = WIN.location.href.split(/[\?&]+/).slice(1);
  }
  return {
    show_help: args.includes('-h'),
    filters: args.filter(function (arg) {
      return arg.length && arg[0] !== '-';
    })
  };
};
var cli = function cli(run, options) {
  return Promise.resolve().then(function () {
    return !WIN ? null : new Promise(function (resolve) {
      WIN.addEventListener('load', function () {
        return resolve();
      });
    });
  }).then(function () {
    var cli_opts = parse_args();
    if (cli_opts.show_help) {
      log(HELP);
      return null;
    }
    options = _objectSpread(_objectSpread({}, options), {}, {
      filter: create_filter_fn(cli_opts.filters)
    });
    return run(options).then(function (suite) {
      if (PROC && suite.failed_count) {
        PROC.exit(1);
      }
    })["catch"](function (err) {
      log("\n".concat(err.stack, "\n"));
      if (PROC) {
        PROC.exit(2);
      }
    });
  });
};
module.exports = cli;

/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _require = __webpack_require__(2),
  is_fn = _require.is_fn,
  is_regexp = _require.is_regexp;
var insp = __webpack_require__(8);
var get_type = function get_type(x) {
  return Reflect.apply(Object.prototype.toString, x, []);
};
var _deep_equal = function deep_equal(a, b) {
  if (a === b || Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }
  var type = _typeof(a);
  if (type !== 'object' && type === _typeof(b)) {
    return a === b;
  }
  type = get_type(a);
  if (type !== get_type(b)) {
    return false;
  }
  if (type === '[object Array]') {
    return a.length === b.length && a.every(function (_, idx) {
      return _deep_equal(a[idx], b[idx]);
    });
  }
  if (type === '[object Object]') {
    var keys = Object.keys(a);
    return _deep_equal(keys.sort(), Object.keys(b).sort()) && keys.every(function (key) {
      return _deep_equal(a[key], b[key]);
    });
  }
  return false;
};
var asrt = function asrt(expr, msg) {
  var drop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  if (!expr) {
    throw Object.assign(new Error(msg), {
      name: 'AssertionError',
      drop: drop
    });
  }
};
var asrt_err = function asrt_err(err, exp, msg) {
  if (is_regexp(exp)) {
    err = String(err);
    asrt(exp.test(err), msg || "expected error ".concat(insp(err), " to be matched by ").concat(insp(exp)), 3);
  } else if (is_fn(exp)) {
    exp(err);
  } else if (exp !== undefined) {
    asrt(err === exp, msg || "expected error ".concat(insp(err), " to be ").concat(insp(exp)), 3);
  }
};
var assert = function assert(expr, msg) {
  asrt(expr, msg);
};
assert.fail = function (msg) {
  asrt(false, msg);
};
assert.ok = function (act, msg) {
  asrt(!!act, msg || "expected ".concat(insp(act), " to be truthy"));
};
assert.not_ok = function (act, msg) {
  asrt(!act, msg || "expected ".concat(insp(act), " to be falsy"));
};
assert.equal = function (act, exp, msg) {
  asrt(act === exp, msg || "expected ".concat(insp(act), " to equal ").concat(insp(exp)));
};
assert.not_equal = function (act, ref, msg) {
  asrt(act !== ref, msg || "expected ".concat(insp(act), " not to equal ").concat(insp(ref)));
};
assert.deep_equal = function (act, exp, msg) {
  asrt(_deep_equal(act, exp), msg || "expected ".concat(insp(act), " to deeply equal ").concat(insp(exp)));
};
assert.not_deep_equal = function (act, ref, msg) {
  asrt(!_deep_equal(act, ref), msg || "expected ".concat(insp(act), " not to deeply equal ").concat(insp(ref)));
};
assert["throws"] = function (fn, exp, msg) {
  asrt(is_fn(fn), "expected ".concat(insp(fn), " to be a function"));
  var none = {};
  var val = none;
  try {
    val = fn();
  } catch (err) {
    asrt_err(err, exp, msg);
  }
  asrt(val === none, msg || "expected fn to throw but returned ".concat(val));
};
assert.rejects = function (promise, exp, msg) {
  return Promise.resolve(promise).then(function (val) {
    return asrt(false, msg || "expected rejection but resolved to ".concat(val));
  }, function (err) {
    return asrt_err(err, exp, msg);
  });
};
module.exports = assert;

// deprecated
assert.notOk = assert.not_ok;
assert.notEqual = assert.not_equal;
assert.deepEqual = assert.deep_equal;
assert.notDeepEqual = assert.not_deep_equal;

/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(2),
  is_str = _require.is_str,
  is_fn = _require.is_fn,
  is_arr = _require.is_arr,
  is_plain_obj = _require.is_plain_obj;
var _insp = function insp(x) {
  var visited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (visited.includes(x)) {
    return '[circular]';
  }
  visited.push(x);
  if (is_str(x)) {
    return "'".concat(x, "'");
  }
  if (is_fn(x)) {
    return String(x).split(')')[0] + ')';
  }
  if (is_arr(x)) {
    return '[' + Array.from(x, function (el) {
      return _insp(el, visited);
    }).join(', ') + ']';
  }
  if (is_plain_obj(x)) {
    return '{' + Object.keys(x).map(function (key) {
      return "".concat(key, ": ").concat(_insp(x[key], visited));
    }).join(', ') + '}';
  }
  return String(x);
};
module.exports = _insp;

/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(2),
  as_fn = _require.as_fn;
var spy = function spy(fn) {
  var calls = [];
  function wrapper() {
    'use strict';

    // eslint-disable-line strict
    var call = {
      idx: calls.length,
      time: Date.now(),
      ctx: this,
      // eslint-disable-line no-invalid-this
      args: Array.from(arguments)
    };
    calls.push(call);
    call.ret = as_fn(fn)(call, calls);
    call.done = Date.now();
    return call.ret;
  }
  wrapper.calls = calls;
  return wrapper;
};
module.exports = spy;

/***/ }),
/* 10 */
/***/ ((module) => {

var PREFIX = 'UNIQ-';
var SUFFIX = '-ID';
var LENGTH = 4;
var ZEROPAD = '0000';
var RE_ID = new RegExp("^".concat(PREFIX, "\\d{").concat(LENGTH, "}").concat(SUFFIX, "$"));
var counter = 0;
var id = function id() {
  counter += 1;
  return PREFIX + (ZEROPAD + counter).substr(-LENGTH) + SUFFIX;
};
var is_id = function is_id(sequence) {
  return RE_ID.test(sequence);
};
var obj = function obj() {
  return {
    _uniq_id: id()
  };
};
var path = function path() {
  var ext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return '_uniq_path/' + id() + ext;
};
module.exports = {
  id: id,
  is_id: is_id,
  isId: is_id,
  // deprecated
  obj: obj,
  path: path
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});