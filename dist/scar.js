/*! scar v1.7.0 - https://larsjung.de/scar/ */
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

var Scar = __webpack_require__(1);

module.exports = {
  Scar: Scar,
  test: new Scar()["static"](),
  assert: __webpack_require__(11),
  insp: __webpack_require__(12),
  spy: __webpack_require__(13),
  uniq: __webpack_require__(14)
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Test = __webpack_require__(3);

var Suite = __webpack_require__(5);

var Reporter = __webpack_require__(6);

var Cli = __webpack_require__(10);

var Scar =
/*#__PURE__*/
function () {
  function Scar() {
    _classCallCheck(this, Scar);

    this.tests = [];
  }

  _createClass(Scar, [{
    key: "test",
    value: function test() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.tests.push(_construct(Test, args));
    }
  }, {
    key: "skip",
    value: function skip() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.test.apply(this, args.concat([{
        skip: true
      }]));
    }
  }, {
    key: "sync",
    value: function sync() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.test.apply(this, args.concat([{
        sync: true
      }]));
    }
  }, {
    key: "run",
    value: function run(options) {
      options = Object.assign({
        reporter: new Reporter().callback
      }, options);
      return new Suite(this.tests, options).run();
    }
  }, {
    key: "cli",
    value: function cli(options) {
      var _this = this;

      if (global.window) {
        return new Promise(function (resolve) {
          global.window.addEventListener('load', function () {
            return resolve();
          });
        }).then(function () {
          return new Cli().run(_this, options);
        });
      }

      return new Cli().run(this, options);
    }
  }, {
    key: "static",
    value: function _static() {
      return Object.assign(this.test.bind(this), {
        scar: this,
        skip: this.skip.bind(this),
        sync: this.sync.bind(this),
        run: this.run.bind(this),
        cli: this.cli.bind(this)
      });
    }
  }]);

  return Scar;
}();

module.exports = Scar;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(4),
    is_str = _require.is_str,
    is_num = _require.is_num,
    is_fn = _require.is_fn,
    as_fn = _require.as_fn;

var promised_timeout = function promised_timeout(millis) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      return reject(new Error("Timeout (".concat(millis, "ms)")));
    }, millis);
  });
};

var Test =
/*#__PURE__*/
function () {
  function Test() {
    _classCallCheck(this, Test);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    Object.assign.apply(Object, [this, {
      desc: '[No Description]',
      fn: null,
      skip: false,
      sync: false,
      timeout: null
    }].concat(_toConsumableArray(args.map(function (arg) {
      if (is_str(arg)) {
        return {
          desc: arg
        };
      }

      if (is_fn(arg)) {
        return {
          fn: arg
        };
      }

      return arg;
    })), [{
      status: Test.WAITING,
      err: null,
      starttime: null,
      duration: null,
      promise: null
    }]));
  }

  _createClass(Test, [{
    key: "__TRACE_MARKER__",
    value: function __TRACE_MARKER__() {
      return as_fn(this.fn)();
    }
  }, {
    key: "run_fn",
    value: function run_fn() {
      var _this = this;

      var promise = Promise.resolve().then(function () {
        return _this.__TRACE_MARKER__();
      });

      if (is_num(this.timeout) && this.timeout > 0) {
        return Promise.race([promise, promised_timeout(this.timeout)]);
      }

      return promise;
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      this.promise = this.promise || Promise.resolve().then(function () {
        _this2.starttime = Date.now();
        _this2.status = Test.PENDING;

        if (!_this2.skip) {
          return _this2.run_fn();
        }

        return null;
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
/* 4 */
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

var is_plain_obj = function is_plain_obj(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}; // eslint-disable-line prefer-reflect


var run_seq = function run_seq(fns) {
  return fns.reduce(function (p, fn) {
    return p.then(fn);
  }, Promise.resolve());
};

var run_conc = function run_conc(fns, max) {
  if (!is_num(max) || max < 2) {
    return run_seq(fns);
  }

  return new Promise(function (resolve) {
    var total = fns.length;
    var settled = 0;
    var pending = 0;
    var next = 0;

    var run_fn = function run_fn(fn) {
      return Promise.resolve().then(fn)["catch"](function () {
        return null;
      }).then(function () {
        pending -= 1;
        settled += 1;
      });
    };

    var check = function check() {
      while (next < total && pending < max) {
        var fn = fns[next];
        next += 1;
        pending += 1;
        run_fn(fn).then(check);
      }

      if (settled === total) {
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
  is_plain_obj: is_plain_obj,
  as_fn: as_fn,
  run_seq: run_seq,
  run_conc: run_conc
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(4),
    as_fn = _require.as_fn,
    run_seq = _require.run_seq,
    run_conc = _require.run_conc;

var Test = __webpack_require__(3);

var is_sync = function is_sync(test) {
  return !!test.sync;
};

var is_async = function is_async(test) {
  return !test.sync;
};

var Suite =
/*#__PURE__*/
function () {
  function Suite() {
    var tests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Suite);

    Object.assign(this, {
      sync: false,
      reporter: null,
      filter: null,
      max_conc: 100
    }, options, {
      tests: tests,
      status: Test.WAITING,
      starttime: null,
      duration: null,
      promise: null
    });
  }

  _createClass(Suite, [{
    key: "run_test",
    value: function run_test(test) {
      var _this = this;

      return Promise.resolve().then(function () {
        return as_fn(_this.reporter)('beforeTest', _this, test);
      }).then(function () {
        _this.runCount += 1;
        test.runIdx = _this.runCount;
      }).then(function () {
        return test.run();
      }).then(function () {
        _this.settledCount += 1;
        test.settledIdx = _this.settledCount;

        if (test.status === Test.PASSED) {
          _this.passedCount += 1;
          test.passedIdx = _this.passedCount;
        } else if (test.status === Test.SKIPPED) {
          _this.skippedCount += 1;
          test.skippedIdx = _this.skippedCount;
        } else {
          _this.failedCount += 1;
          test.failedIdx = _this.failedCount;
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
          test.defIdx = idx + 1;
        });

        _this2.total = _this2.tests.length;
        _this2.filteredTests = _this2.tests.filter(as_fn(_this2.filter || true));
        _this2.filteredTotal = _this2.filteredTests.length;
        _this2.runCount = 0;
        _this2.settledCount = 0;
        _this2.passedCount = 0;
        _this2.failedCount = 0;
        _this2.skippedCount = 0;
      }).then(function () {
        return as_fn(_this2.reporter)('before_all', _this2);
      }).then(function () {
        _this2.starttime = Date.now();
        _this2.status = Test.PENDING;

        var testToFn = function testToFn(test) {
          return function () {
            return _this2.run_test(test);
          };
        };

        var tests = _this2.filteredTests;
        var syncTests = _this2.sync ? tests : tests.filter(is_sync);
        var asyncTests = _this2.sync ? [] : tests.filter(is_async);
        var syncFns = syncTests.map(testToFn);
        var asyncFns = asyncTests.map(testToFn);
        return run_seq(syncFns).then(function () {
          return run_conc(asyncFns, _this2.max_conc);
        });
      }).then(function () {
        _this2.status = _this2.failedCount ? Test.FAILED : Test.PASSED;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Err = __webpack_require__(8);

var _require = __webpack_require__(9),
    set_title = _require.set_title,
    set_fav_icon = _require.set_fav_icon;

var Reporter =
/*#__PURE__*/
function () {
  function Reporter() {
    var _this = this;

    _classCallCheck(this, Reporter);

    Object.assign(this, {
      log: console.log.bind(console),
      callback: function callback() {
        return _this.handle.apply(_this, arguments);
      }
    });
  }

  _createClass(Reporter, [{
    key: "handle",
    value: function handle(type) {
      if (['before_all', 'after_test', 'after_all'].indexOf(type) >= 0) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return this[type].apply(this, args);
      }

      return null;
    }
  }, {
    key: "before_all",
    value: function before_all(suite) {
      var str = 'running ';

      if (suite.filteredTotal !== suite.total) {
        str += "".concat(suite.filteredTotal, " of ");
      }

      str += "".concat(suite.total, " tests\n ");
      this.log(str);
      set_title("running ".concat(suite.filteredTotal, " tests..."));
      set_fav_icon('GREY'); // take time to update icon

      return new Promise(function (resolve) {
        return setTimeout(function () {
          return resolve();
        }, 100);
      });
    }
  }, {
    key: "after_test",
    value: function after_test(suite, test) {
      var status = test.status === 'PASSED' ? ' ok ' : test.status === 'SKIPPED' ? 'skip' : 'FAIL';
      this.log(" ".concat(status, " ").concat(test.desc));
    }
  }, {
    key: "after_all",
    value: function after_all(suite) {
      var _this2 = this;

      suite.tests.filter(function (test) {
        return test.status === 'FAILED';
      }).forEach(function (test) {
        var err = Err(test.err);

        _this2.log("\n[".concat(test.failedIdx, "] ").concat(test.desc, "\n").concat(err.format()));
      });
      var resume = '\n';

      if (suite.failedCount) {
        resume += "".concat(suite.failedCount, " failed, ");
      }

      if (suite.skippedCount) {
        resume += "".concat(suite.skippedCount, " skipped, ");
      }

      resume += "".concat(suite.passedCount, " passed (").concat(suite.duration, "ms)");
      this.log(resume);
      set_title(resume);
      set_fav_icon(suite.failedCount ? 'RED' : 'GREEN');
    }
  }]);

  return Reporter;
}();

module.exports = Reporter;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var RE_MARKER = /__TRACE_MARKER__$|^process\._tickCallback$/;

var parse_stack_line = function parse_stack_line(line) {
  for (var _i = 0, _LINE_PATTERNS = LINE_PATTERNS; _i < _LINE_PATTERNS.length; _i++) {
    var pattern = _LINE_PATTERNS[_i];
    var match = pattern.re.exec(line);

    if (match) {
      return {
        method: match[pattern.method] || '',
        url: match[pattern.url],
        basename: match[pattern.url].replace(/^.*\//, ''),
        line: parseInt(match[pattern.line], 10),
        column: parseInt(match[pattern.column], 10)
      };
    }
  }

  return null;
};

var parse_stack = function parse_stack(sequence) {
  var lines = sequence.split('\n');
  return lines.map(function (line) {
    return parse_stack_line(line);
  }).filter(function (x) {
    return x;
  });
};

var filter_frames = function filter_frames(frames, drop) {
  frames = frames.slice(Number(drop) || 0);
  var dropFrame = false;
  return frames.filter(function (frame) {
    dropFrame = dropFrame || RE_MARKER.test(frame.method);
    return !dropFrame;
  });
};

var format_frame = function format_frame(frame, _short) {
  var loc = [_short ? frame.basename : frame.url, frame.line, frame.column].filter(function (x) {
    return x;
  }).join(':');
  return frame.method ? "".concat(frame.method, " - ").concat(loc) : loc;
};

var format_frames = function format_frames(frames, _short2) {
  return frames.map(function (frame) {
    return format_frame(frame, _short2);
  }).join('\n');
};

var indent = function indent(str, prefix) {
  return prefix + str.replace(/\n/g, '\n' + prefix);
};

var Err = function Err() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var inst = Object.assign.apply(Object, [Object.create(Err.prototype), {
    name: 'Err',
    message: '[no message]',
    stack: new Error().stack,
    drop: 0
  }].concat(_toConsumableArray(args.map(function (arg) {
    if (typeof arg === 'string') {
      return {
        message: arg
      };
    }

    if (typeof arg === 'number') {
      return {
        drop: arg
      };
    }

    if (arg) {
      var obj = {
        error: arg
      };

      for (var _i2 = 0, _arr = ['name', 'message', 'stack', 'drop'].concat(_toConsumableArray(Object.keys(arg))); _i2 < _arr.length; _i2++) {
        var prop = _arr[_i2];

        if (arg[prop] !== undefined) {
          obj[prop] = arg[prop];
        }
      }

      return obj;
    }

    return null;
  }))));
  inst.frames = parse_stack(inst.stack);
  inst.filteredFrames = filter_frames(inst.frames, inst.drop);
  return inst;
};

Err.prototype = Object.assign(Object.create(Error.prototype), {
  constructor: Err,
  format: function format() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var _short3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var str = "".concat(this.name, ": ").concat(this.message, "\n");
    str += indent(format_frames(this.filteredFrames, _short3), '  at ');
    return indent(str, prefix);
  },
  toString: function toString() {
    return this.format();
  }
});
module.exports = Err;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var noop = function noop() {
  return null;
};

var doc = global.window && global.window.document;
var set_title = !doc ? noop : function (title) {
  doc.title = title;
};
var set_fav_icon = !doc ? noop : function () {
  var ICON_TPL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wsZER*AAAAAElFTkSuQmCC';
  var PRESETS = {
    RED: ICON_TPL.replace('*', 'Y0VbWlewAAAB1JREFUOMtj/OJs9p+BAsDEQCEYNWDUgFEDBosBABZOAow9yV0y'),
    GREEN: ICON_TPL.replace('*', 'kM+i8BKgAAAB1JREFUOMtj9Fkf8J+BAsDEQCEYNWDUgFEDBosBAIuhAmqCXURi'),
    GREY: ICON_TPL.replace('*', 'kjUf48cwAAAB1JREFUOMtjDA0N/c9AAWBioBCMGjBqwKgBg8UAAFduAh79mcom')
  };
  var head = doc.querySelector('head');
  var rel = 'shortcut icon';
  return function (href) {
    var old_el = doc.querySelector("link[rel=\"".concat(rel, "\"]"));

    if (old_el) {
      head.removeChild(old_el);
    }

    var el = doc.createElement('link');
    el.rel = rel;
    el.href = PRESETS.hasOwnProperty(href) ? PRESETS[href] : href;
    head.appendChild(el);
  };
}();
module.exports = {
  set_title: set_title,
  set_fav_icon: set_fav_icon
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Err = __webpack_require__(8);

var HELP = "\n  scar - a test runner for node and the browser\n\n  Usage:\n    node tests.js [opt...] [arg...]\n    tests.html?opt&...&arg&...\n\n  Options:\n    -h: show this help message\n    -s: show test stats\n\n  Arguments:\n    all arguments are used as test filters\n\n";

var create_filter_fn = function create_filter_fn(filters) {
  if (!filters || !filters.length) {
    return null;
  }

  return function (test) {
    return filters.every(function (filter) {
      return test.desc.indexOf(filter) >= 0;
    });
  };
};

var Cli =
/*#__PURE__*/
function () {
  function Cli() {
    _classCallCheck(this, Cli);

    Object.assign(this, {
      log: console.log.bind(console)
    });
  }

  _createClass(Cli, [{
    key: "get_args",
    value: function get_args() {
      if (global.process) {
        return global.process.argv.slice(2);
      }

      if (global.window) {
        return global.window.location.href.split(/[\?&]+/).slice(1);
      }

      return [];
    }
  }, {
    key: "parse_args",
    value: function parse_args() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.get_args();
      return {
        showHelp: args.indexOf('-h') >= 0,
        showStats: args.indexOf('-s') >= 0,
        filters: args.filter(function (arg) {
          return arg.length > 0 && arg[0] !== '-';
        })
      };
    }
  }, {
    key: "run",
    value: function run(scar, options) {
      var _this = this;

      return Promise.resolve().then(function () {
        var cliopts = _this.parse_args();

        if (cliopts.showHelp) {
          _this.log(HELP);
        } else if (cliopts.showStats) {
          _this.log("\n  ".concat(scar.tests.length, " tests defined\n \n"));
        } else {
          options = Object.assign({}, options, {
            filter: create_filter_fn(cliopts.filters)
          });
          return scar.run(options).then(function (suite) {
            if (global.process && suite.failedCount) {
              global.process.exit(1);
            }
          })["catch"](function (err) {
            _this.log("\n".concat(Err(err).format('  '), "\n"));

            if (global.process) {
              global.process.exit(2);
            }
          });
        }

        return null;
      });
    }
  }]);

  return Cli;
}();

module.exports = Cli;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var insp = __webpack_require__(12);

var Err = __webpack_require__(8);

var get_type = function get_type(x) {
  return Object.prototype.toString.call(x);
}; // eslint-disable-line prefer-reflect


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

var check_err = function check_err(isError, act, exp, msg) {
  if (!isError) {
    return {
      act: act,
      exp: exp,
      msg: msg || "expected error but returned ".concat(act)
    };
  }

  if (exp === undefined) {
    return null;
  }

  if (exp instanceof RegExp) {
    act = String(act);

    if (exp.test(act)) {
      return null;
    }

    return {
      act: act,
      exp: exp,
      msg: msg || "expected error ".concat(insp(act), " to be matched by ").concat(insp(exp))
    };
  }

  if (typeof exp === 'function') {
    exp(act);
    return null;
  }

  if (act === exp) {
    return null;
  }

  return {
    act: act,
    exp: exp,
    msg: msg || "expected error ".concat(insp(act), " to be ").concat(insp(exp))
  };
};

var raise = function raise(props) {
  var drop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

  if (props && !props.expr) {
    throw Err(props.msg, props, drop);
  }
};

var assert = function assert(expr, msg) {
  raise({
    expr: expr,
    msg: msg
  });
};

assert.fail = function (msg) {
  raise({
    msg: msg
  });
};

assert.ok = function (act) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "expected ".concat(insp(act), " to be truthy");
  raise({
    expr: !!act,
    act: act,
    msg: msg
  });
};

assert.notOk = function (act) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "expected ".concat(insp(act), " to be falsy");
  raise({
    expr: !act,
    act: act,
    msg: msg
  });
};

assert.equal = function (act, exp) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "expected ".concat(insp(act), " to equal ").concat(insp(exp));
  raise({
    expr: act === exp,
    act: act,
    exp: exp,
    msg: msg
  });
};

assert.notEqual = function (act, ref) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "expected ".concat(insp(act), " not to equal ").concat(insp(ref));
  raise({
    expr: act !== ref,
    act: act,
    ref: ref,
    msg: msg
  });
};

assert.deepEqual = function (act, exp) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "expected ".concat(insp(act), " to deeply equal ").concat(insp(exp));
  raise({
    expr: deep_equal(act, exp),
    act: act,
    exp: exp,
    msg: msg
  });
};

assert.notDeepEqual = function (act, ref) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "expected ".concat(insp(act), " not to deeply equal ").concat(insp(ref));
  raise({
    expr: !deep_equal(act, ref),
    act: act,
    ref: ref,
    msg: msg
  });
};

assert["throws"] = function (fn, exp, msg) {
  raise({
    expr: typeof fn === 'function',
    msg: 'assert.throws(): first arg must be a function'
  });
  var none = {};
  var val = none;

  try {
    val = fn();
  } catch (err) {
    raise(check_err(true, err, exp, msg));
  }

  if (val !== none) {
    raise(check_err(false, val, exp, msg));
  }
};

assert.rejects = function (promise, exp, msg) {
  raise({
    expr: promise && typeof promise.then === 'function',
    msg: 'assert.rejects(): first arg must be a thenable'
  });
  return Promise.resolve(promise).then(function (val) {
    return raise(check_err(false, val, exp, msg), 2);
  }, function (err) {
    return raise(check_err(true, err, exp, msg), 2);
  });
};

module.exports = assert;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(4),
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(4),
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
/* 14 */
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

var isId = function isId(sequence) {
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
  isId: isId,
  obj: obj,
  path: path
};

/***/ })
/******/ ]);
});