/*! scar v2.3.0 - https://larsjung.de/scar/ */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("scar", [], factory);
	else if(typeof exports === 'object')
		exports["scar"] = factory();
	else
		root["scar"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Test = __webpack_require__(1);

var Suite = __webpack_require__(3);

var reporter = __webpack_require__(4);

var cli = __webpack_require__(7);

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
    options = _objectSpread({
      reporter: reporter
    }, options, {
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
  assert: __webpack_require__(8),
  insp: __webpack_require__(9),
  spy: __webpack_require__(10),
  uniq: __webpack_require__(11)
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var Test =
/*#__PURE__*/
function () {
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

  _createClass(Test, [{
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

  return Test;
}();

Test.WAITING = 'WAITING';
Test.PENDING = 'PENDING';
Test.PASSED = 'PASSED';
Test.FAILED = 'FAILED';
Test.SKIPPED = 'SKIPPED';
module.exports = Test;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

    var check = function check() {
      while (fns.length && pending < max) {
        run_fn(fns.shift()).then(check);
        pending += 1;
      }

      if (!awaiting) {
        resolve();
      }
    };

    check();
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
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(2),
    as_fn = _require.as_fn,
    run_seq = _require.run_seq,
    run_conc = _require.run_conc;

var Test = __webpack_require__(1);

var Suite =
/*#__PURE__*/
function () {
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

  _createClass(Suite, [{
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

  return Suite;
}();

module.exports = Suite;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var format_err = __webpack_require__(6);

var Test = __webpack_require__(1);

var DOC = global.window && global.window.document;
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
    set_title("running ".concat(suite.filtered_total, " tests..."), ICON_GREY); // take time to update icon

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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var LINE_PATTERNS = [{
  // v8: ' at <method> (<url>:<line>:<col>)'
  re: /^\s*at\s+(.*?)\s+\((.*?)(?::(\d+))?(?::(\d+))?\)\s*$/,
  method: 1,
  url: 2,
  line: 3,
  column: 4
}, {
  // v8 no method: ' at <url>:<line>:<col>'
  re: /^\s*at\s+(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
  method: null,
  url: 1,
  line: 2,
  column: 3
}, {
  // spidermonkey: '<method>@<url>:<line>:<col>'
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PROC = global.process;
var WIN = global.window;
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

    options = _objectSpread({}, options, {
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(2),
    is_fn = _require.is_fn,
    is_regexp = _require.is_regexp;

var insp = __webpack_require__(9);

var get_type = function get_type(x) {
  return Reflect.apply(Object.prototype.toString, x, []);
};

var deep_equal = function deep_equal(a, b) {
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
      return deep_equal(a[idx], b[idx]);
    });
  }

  if (type === '[object Object]') {
    var keys = Object.keys(a);
    return deep_equal(keys.sort(), Object.keys(b).sort()) && keys.every(function (key) {
      return deep_equal(a[key], b[key]);
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
  asrt(deep_equal(act, exp), msg || "expected ".concat(insp(act), " to deeply equal ").concat(insp(exp)));
};

assert.not_deep_equal = function (act, ref, msg) {
  asrt(!deep_equal(act, ref), msg || "expected ".concat(insp(act), " not to deeply equal ").concat(insp(ref)));
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

module.exports = assert; // deprecated

assert.notOk = assert.not_ok;
assert.notEqual = assert.not_equal;
assert.deepEqual = assert.deep_equal;
assert.notDeepEqual = assert.not_deep_equal;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(2),
    is_str = _require.is_str,
    is_fn = _require.is_fn,
    is_arr = _require.is_arr,
    is_plain_obj = _require.is_plain_obj;

var insp = function insp(x) {
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
      return insp(el, visited);
    }).join(', ') + ']';
  }

  if (is_plain_obj(x)) {
    return '{' + Object.keys(x).map(function (key) {
      return "".concat(key, ": ").concat(insp(x[key], visited));
    }).join(', ') + '}';
  }

  return String(x);
};

module.exports = insp;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(2),
    as_fn = _require.as_fn;

var spy = function spy(fn) {
  var calls = [];

  function wrapper() {
    'use strict'; // eslint-disable-line strict

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
/* 11 */
/***/ (function(module, exports) {

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
/******/ ]);
});