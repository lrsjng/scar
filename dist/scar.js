/*! scar v0.15.0 - https://larsjung.de/scar/ */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scar"] = factory();
	else
		root["scar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Scar = __webpack_require__(1);

	module.exports = {
	    Scar: Scar,
	    test: Scar().static(),
	    assert: __webpack_require__(10),
	    insp: __webpack_require__(11),
	    spy: __webpack_require__(12),
	    uniq: __webpack_require__(13)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Test = __webpack_require__(2);
	var Suite = __webpack_require__(4);
	var Reporter = __webpack_require__(5);
	var Cli = __webpack_require__(9);

	var Scar = function Scar() {
	    return Object.assign(Object.create(Scar.prototype), {
	        tests: []
	    });
	};

	Scar.prototype = {
	    constructor: Scar,

	    test: function test() {
	        this.tests.push(Test.apply(undefined, arguments));
	    },
	    skip: function skip() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        this.test.apply(this, args.concat([{ skip: true }]));
	    },
	    sync: function sync() {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }

	        this.test.apply(this, args.concat([{ sync: true }]));
	    },
	    run: function run(options) {
	        options = Object.assign({
	            reporter: Reporter().callback
	        }, options);
	        return Suite(this.tests, options).run();
	    },
	    cli: function cli(options) {
	        var _this = this;

	        // take time to load page
	        return new Promise(function (resolve) {
	            return setTimeout(resolve, 10);
	        }).then(function () {
	            return Cli().run(_this, options);
	        });
	        // return Cli().run(this, options);
	    },
	    static: function _static() {
	        return Object.assign(this.test.bind(this), {
	            scar: this,
	            skip: this.skip.bind(this),
	            sync: this.sync.bind(this),
	            run: this.run.bind(this),
	            cli: this.cli.bind(this)
	        });
	    }
	};

	module.exports = Scar;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _require = __webpack_require__(3);

	var isString = _require.isString;
	var isNumber = _require.isNumber;
	var isFn = _require.isFn;
	var asFn = _require.asFn;


	var Test = function Test() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    return Object.assign.apply(Object, [Object.create(Test.prototype), {
	        desc: '[No Description]',
	        fn: null,
	        skip: false,
	        sync: false,
	        timeout: null
	    }].concat(_toConsumableArray(args.map(function (arg) {
	        if (isString(arg)) {
	            return { desc: arg };
	        }
	        if (isFn(arg)) {
	            return { fn: arg };
	        }
	        return arg;
	    })), [{
	        status: Test.WAITING,
	        err: null,
	        starttime: null,
	        duration: null,
	        promise: null
	    }]));
	};

	Test.WAITING = 'WAITING';
	Test.PENDING = 'PENDING';
	Test.PASSED = 'PASSED';
	Test.FAILED = 'FAILED';
	Test.SKIPPED = 'SKIPPED';

	var promisedTimeout = function promisedTimeout(millis) {
	    return new Promise(function (resolve, reject) {
	        setTimeout(function () {
	            return reject(new Error('Timeout (' + millis + 'ms)'));
	        }, millis);
	    });
	};

	Test.prototype = {
	    constructor: Test,

	    __TRACE_MARKER__: function __TRACE_MARKER__() {
	        return asFn(this.fn)();
	    },
	    runFn: function runFn() {
	        var _this = this;

	        var promise = Promise.resolve().then(function () {
	            return _this.__TRACE_MARKER__();
	        });

	        if (isNumber(this.timeout) && this.timeout > 0) {
	            return Promise.race([promise, promisedTimeout(this.timeout)]);
	        }

	        return promise;
	    },
	    run: function run() {
	        var _this2 = this;

	        this.promise = this.promise || Promise.resolve().then(function () {
	            _this2.starttime = Date.now();
	            _this2.status = Test.PENDING;
	            if (!_this2.skip) {
	                return _this2.runFn();
	            }
	            return null;
	        }).then(function () {
	            _this2.status = _this2.skip ? Test.SKIPPED : Test.PASSED;
	        }).catch(function (err) {
	            _this2.status = Test.FAILED;
	            _this2.err = err;
	        }).then(function () {
	            _this2.duration = Date.now() - _this2.starttime;
	        });
	        return this.promise;
	    }
	};

	module.exports = Test;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var isBoolean = function isBoolean(x) {
	    return typeof x === 'boolean';
	};
	var isNumber = function isNumber(x) {
	    return typeof x === 'number';
	};
	var isString = function isString(x) {
	    return typeof x === 'string';
	};
	var isArray = function isArray(x) {
	    return Array.isArray(x);
	};
	var isFn = function isFn(x) {
	    return typeof x === 'function';
	};
	var isPlainObject = function isPlainObject(x) {
	    return Object.prototype.toString.call(x) === '[object Object]';
	}; // eslint-disable-line prefer-reflect

	var asFn = function asFn(x) {
	    return isFn(x) ? x : function () {
	        return x;
	    };
	};

	var runSequential = function runSequential(fns) {
	    return fns.reduce(function (promise, fn) {
	        return promise.then(fn);
	    }, Promise.resolve());
	};

	var runConcurrent = function runConcurrent(fns, max) {
	    if (!isNumber(max) || max < 2) {
	        return runSequential(fns);
	    }

	    return new Promise(function (resolve) {
	        var total = fns.length;
	        var settled = 0;
	        var pending = 0;
	        var next = 0;

	        var runFn = function runFn(fn) {
	            return Promise.resolve().then(fn).catch(function () {
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
	                runFn(fn).then(check);
	            }
	            if (settled === total) {
	                resolve();
	            }
	        };

	        check();
	    });
	};

	module.exports = {
	    isBoolean: isBoolean,
	    isNumber: isNumber,
	    isString: isString,
	    isArray: isArray,
	    isFn: isFn,
	    isPlainObject: isPlainObject,
	    asFn: asFn,
	    runSequential: runSequential,
	    runConcurrent: runConcurrent
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3);

	var asFn = _require.asFn;
	var runSequential = _require.runSequential;
	var runConcurrent = _require.runConcurrent;

	var Test = __webpack_require__(2);

	var isSync = function isSync(test) {
	    return !!test.sync;
	};
	var isAsync = function isAsync(test) {
	    return !test.sync;
	};

	var Suite = function Suite() {
	    var tests = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var options = arguments[1];

	    return Object.assign(Object.create(Suite.prototype), {
	        sync: false,
	        reporter: null,
	        filter: null,
	        maxConcurrent: 100
	    }, options, {
	        tests: tests,
	        status: Test.WAITING,
	        starttime: null,
	        duration: null,
	        promise: null
	    });
	};

	Suite.prototype = {
	    constructor: Suite,

	    runTest: function runTest(test) {
	        var _this = this;

	        return Promise.resolve().then(function () {
	            return asFn(_this.reporter)('beforeTest', _this, test);
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
	            return asFn(_this.reporter)('afterTest', _this, test);
	        });
	    },
	    run: function run() {
	        var _this2 = this;

	        this.promise = this.promise || Promise.resolve().then(function () {
	            _this2.tests.forEach(function (test, idx) {
	                test.defIdx = idx + 1;
	            });
	            _this2.total = _this2.tests.length;
	            _this2.filteredTests = _this2.tests.filter(asFn(_this2.filter || true));
	            _this2.filteredTotal = _this2.filteredTests.length;
	            _this2.runCount = 0;
	            _this2.settledCount = 0;
	            _this2.passedCount = 0;
	            _this2.failedCount = 0;
	            _this2.skippedCount = 0;
	        }).then(function () {
	            return asFn(_this2.reporter)('beforeAll', _this2);
	        }).then(function () {
	            _this2.starttime = Date.now();
	            _this2.status = Test.PENDING;

	            var testToFn = function testToFn(test) {
	                return function () {
	                    return _this2.runTest(test);
	                };
	            };

	            var tests = _this2.filteredTests;
	            var syncTests = _this2.sync ? tests : tests.filter(isSync);
	            var asyncTests = _this2.sync ? [] : tests.filter(isAsync);

	            var syncFns = syncTests.map(testToFn);
	            var asyncFns = asyncTests.map(testToFn);

	            return runSequential(syncFns).then(function () {
	                return runConcurrent(asyncFns, _this2.maxConcurrent);
	            });
	        }).then(function () {
	            _this2.status = _this2.failedCount ? Test.FAILED : Test.PASSED;
	            _this2.duration = Date.now() - _this2.starttime;
	        }).then(function () {
	            return asFn(_this2.reporter)('afterAll', _this2);
	        }).then(function () {
	            return _this2;
	        });

	        return this.promise;
	    }
	};

	module.exports = Suite;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Err = __webpack_require__(7);

	var _require = __webpack_require__(8);

	var setTitle = _require.setTitle;
	var setFavIcon = _require.setFavIcon;


	var Reporter = function Reporter() {
	    var inst = Object.assign(Object.create(Reporter.prototype), {
	        log: console.log.bind(console),
	        callback: function callback() {
	            return inst.handle.apply(inst, arguments);
	        }
	    });
	    return inst;
	};

	Reporter.prototype = {
	    constructor: Reporter,

	    handle: function handle(type) {
	        if (['beforeAll', 'afterTest', 'afterAll'].indexOf(type) >= 0) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            return this[type].apply(this, args);
	        }
	        return null;
	    },
	    beforeAll: function beforeAll(suite) {
	        var str = 'running ';
	        if (suite.filteredTotal !== suite.total) {
	            str += suite.filteredTotal + ' of ';
	        }
	        str += suite.total + ' tests\n ';
	        this.log(str);
	        setTitle('running ' + suite.filteredTotal + ' tests...');
	        setFavIcon('GREY');

	        // take time to update icon
	        return new Promise(function (resolve) {
	            return setTimeout(function () {
	                return resolve();
	            }, 10);
	        });
	    },
	    afterTest: function afterTest(suite, test) {
	        var status = test.status === 'PASSED' ? ' ok ' : test.status === 'SKIPPED' ? 'skip' : 'FAIL';
	        this.log(' ' + status + ' ' + test.desc);
	    },
	    afterAll: function afterAll(suite) {
	        var _this = this;

	        suite.tests.filter(function (test) {
	            return test.status === 'FAILED';
	        }).forEach(function (test) {
	            var err = Err(test.err);
	            _this.log('\n[' + test.failedIdx + '] ' + test.desc + '\n' + err.format());
	        });
	        var resume = '\n';
	        if (suite.failedCount) {
	            resume += suite.failedCount + ' failed, ';
	        }
	        if (suite.skippedCount) {
	            resume += suite.skippedCount + ' skipped, ';
	        }
	        resume += suite.passedCount + ' passed (' + suite.duration + 'ms)';
	        this.log(resume);
	        setTitle(resume);
	        setFavIcon(suite.failedCount ? 'RED' : 'GREEN');
	    }
	};

	module.exports = Reporter;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var LINE_PATTERNS = [{ // v8: ' at <method> (<url>:<line>:<col>)'
	    re: /^\s*at\s+(.*?)\s+\((.*?)(?::(\d+))?(?::(\d+))?\)\s*$/,
	    method: 1,
	    url: 2,
	    line: 3,
	    column: 4
	}, { // v8 no method: ' at <url>:<line>:<col>'
	    re: /^\s*at\s+(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
	    method: null,
	    url: 1,
	    line: 2,
	    column: 3
	}, { // spidermonkey: '<method>@<url>:<line>:<col>'
	    re: /^(.*?)@(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
	    method: 1,
	    url: 2,
	    line: 3,
	    column: 4
	}];
	var RE_MARKER = /__TRACE_MARKER__$|^process\._tickCallback$/;

	var parseStackLine = function parseStackLine(line) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = LINE_PATTERNS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var pattern = _step.value;

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
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    return null;
	};

	var parseStack = function parseStack(sequence) {
	    var lines = sequence.split('\n');
	    return lines.map(function (line) {
	        return parseStackLine(line);
	    }).filter(function (x) {
	        return x;
	    });
	};

	var filterFrames = function filterFrames(frames, drop) {
	    frames = frames.slice(Number(drop) || 0);
	    var dropFrame = false;
	    return frames.filter(function (frame) {
	        dropFrame = dropFrame || RE_MARKER.test(frame.method);
	        return !dropFrame;
	    });
	};

	var formatFrame = function formatFrame(frame, short) {
	    var loc = [short ? frame.basename : frame.url, frame.line, frame.column].filter(function (x) {
	        return x;
	    }).join(':');
	    return frame.method ? frame.method + ' - ' + loc : loc;
	};

	var formatFrames = function formatFrames(frames, short) {
	    return frames.map(function (frame) {
	        return formatFrame(frame, short);
	    }).join('\n');
	};

	var indent = function indent(str, prefix) {
	    return prefix + str.replace(/\n/g, '\n' + prefix);
	};

	var Err = function Err() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    var inst = Object.assign.apply(Object, [Object.create(Err.prototype), {
	        name: 'Err',
	        message: '[no message]',
	        stack: new Error().stack,
	        drop: 0
	    }].concat(_toConsumableArray(args.map(function (arg) {
	        if (typeof arg === 'string') {
	            return { message: arg };
	        }
	        if (typeof arg === 'number') {
	            return { drop: arg };
	        }
	        if (arg) {
	            var obj = { error: arg };

	            var _arr = ['name', 'message', 'stack', 'drop'].concat(_toConsumableArray(Object.keys(arg)));

	            for (var _i = 0; _i < _arr.length; _i++) {
	                var prop = _arr[_i];
	                if (arg[prop] !== undefined) {
	                    obj[prop] = arg[prop];
	                }
	            }
	            return obj;
	        }
	        return null;
	    }))));
	    inst.frames = parseStack(inst.stack);
	    inst.filteredFrames = filterFrames(inst.frames, inst.drop);
	    return inst;
	};

	Err.prototype = Object.assign(Object.create(Error.prototype), {
	    constructor: Err,

	    format: function format() {
	        var prefix = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	        var short = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	        var str = this.name + ': ' + this.message + '\n';
	        str += indent(formatFrames(this.filteredFrames, short), '  at ');
	        return indent(str, prefix);
	    },
	    toString: function toString() {
	        return this.format();
	    }
	});

	module.exports = Err;

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var noop = function noop() {
	    return null;
	};
	var DOC = !!global.window && global.document;

	var setTitle = !DOC ? noop : function (title) {
	    DOC.title = title;
	};

	var setFavIcon = function () {
	    if (!DOC) {
	        return noop;
	    }

	    var ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wsZER*AAAAAElFTkSuQmCC';
	    var PRESETS = {
	        RED: ICON.replace('*', 'Y0VbWlewAAAB1JREFUOMtj/OJs9p+BAsDEQCEYNWDUgFEDBosBABZOAow9yV0y'),
	        GREEN: ICON.replace('*', 'kM+i8BKgAAAB1JREFUOMtj9Fkf8J+BAsDEQCEYNWDUgFEDBosBAIuhAmqCXURi'),
	        GREY: ICON.replace('*', 'kjUf48cwAAAB1JREFUOMtjDA0N/c9AAWBioBCMGjBqwKgBg8UAAFduAh79mcom')
	    };

	    var head = DOC.head || DOC.getElementsByTagName('head')[0];
	    var rel = 'shortcut icon';

	    return function (href) {
	        if (PRESETS.hasOwnProperty(href)) {
	            href = PRESETS[href];
	        }
	        var iconEl = DOC.querySelector('link[rel="' + rel + '"]');
	        var link = DOC.createElement('link');
	        link.rel = rel;
	        link.href = href;
	        if (iconEl) {
	            head.removeChild(iconEl);
	        }
	        head.appendChild(link);
	    };
	}();

	module.exports = {
	    setTitle: setTitle,
	    setFavIcon: setFavIcon
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var Err = __webpack_require__(7);

	var HELP = '\n\n  scar - a test runner for node and the browser\n\n  Usage:\n    [node] your-script.js [opt...] [arg...]\n    your-url.html?opt&...&arg&...\n\n  Options:\n    -h: show this help message\n    -t: show test stats\n\n  Arguments:\n    all arguments are used as test filters\n\n';

	var createFilterFn = function createFilterFn(filters) {
	    if (!filters || !filters.length) {
	        return null;
	    }
	    return function (test) {
	        return filters.every(function (filter) {
	            return test.desc.indexOf(filter) >= 0;
	        });
	    };
	};

	var Cli = function Cli() {
	    return Object.assign(Object.create(Cli.prototype), {
	        log: console.log.bind(console)
	    });
	};

	Cli.prototype = {
	    constructor: Cli,

	    getArgs: function getArgs() {
	        if (global.process) {
	            return global.process.argv.slice(2);
	        }

	        if (global.window) {
	            return global.window.location.href.split(/[\?&]+/).slice(1);
	        }

	        return [];
	    },
	    parseArgs: function parseArgs() {
	        var args = arguments.length <= 0 || arguments[0] === undefined ? this.getArgs() : arguments[0];

	        return {
	            showHelp: args.indexOf('-h') >= 0,
	            showStats: args.indexOf('-s') >= 0,
	            filters: args.filter(function (arg) {
	                return arg.length > 0 && arg[0] !== '-';
	            })
	        };
	    },
	    run: function run(scar, options) {
	        var _this = this;

	        return Promise.resolve().then(function () {
	            var cliopts = _this.parseArgs();

	            if (cliopts.showHelp) {
	                _this.log(HELP);
	            } else if (cliopts.showStats) {
	                _this.log('\n  ' + scar.tests.length + ' tests defined\n \n');
	            } else {
	                options = Object.assign({}, options, {
	                    filter: createFilterFn(cliopts.filters)
	                });
	                return scar.run(options).then(function (suite) {
	                    if (global.process && suite.failedCount) {
	                        global.process.exit(1);
	                    }
	                }).catch(function (err) {
	                    _this.log('\n' + Err(err).format('  ') + '\n');
	                    if (global.process) {
	                        global.process.exit(2);
	                    }
	                });
	            }
	            return null;
	        });
	    }
	};

	module.exports = Cli;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var insp = __webpack_require__(11);
	var Err = __webpack_require__(7);
	var NO_ERROR = {};

	var getType = function getType(x) {
	    return Object.prototype.toString.call(x); // eslint-disable-line prefer-reflect
	};

	var deepEqual = function deepEqual(a, b) {
	    if (a === b || Number.isNaN(a) && Number.isNaN(b)) {
	        return true;
	    }

	    var type = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	    if (type !== 'object' && type === (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
	        return a === b;
	    }

	    type = getType(a);
	    if (type !== getType(b)) {
	        return false;
	    }

	    if (type === '[object Array]') {
	        return a.length === b.length && a.every(function (_, idx) {
	            return deepEqual(a[idx], b[idx]);
	        });
	    }

	    if (type === '[object Object]') {
	        var keys = Object.keys(a);
	        return deepEqual(keys.sort(), Object.keys(b).sort()) && keys.every(function (key) {
	            return deepEqual(a[key], b[key]);
	        });
	    }

	    return false;
	};

	var checkError = function checkError(isError, act, exp, msg) {
	    if (!isError) {
	        return { act: act, exp: exp, msg: msg || 'expected error but returned ' + act };
	    }

	    if (exp === undefined) {
	        return null;
	    }

	    if (exp instanceof RegExp) {
	        act = String(act);
	        if (exp.test(act)) {
	            return null;
	        }
	        return { act: act, exp: exp, msg: msg || 'expected error ' + insp(act) + ' to be matched by ' + insp(exp) };
	    }

	    if (typeof exp === 'function') {
	        exp(act);
	        return null;
	    }

	    if (act !== exp) {
	        return { act: act, exp: exp, msg: msg || 'expected error ' + insp(act) + ' to be ' + insp(exp) };
	    }

	    return null;
	};

	var raise = function raise(props) {
	    var drop = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

	    if (props && !props.expr) {
	        throw Err(props.msg, props, drop);
	    }
	};

	var assert = function assert(expr, msg) {
	    raise({ expr: expr, msg: msg });
	};

	assert.fail = function (msg) {
	    raise({ msg: msg });
	};

	assert.ok = function (act) {
	    var msg = arguments.length <= 1 || arguments[1] === undefined ? 'expected ' + insp(act) + ' to be truthy' : arguments[1];

	    raise({ expr: !!act, act: act, msg: msg });
	};

	assert.notOk = function (act) {
	    var msg = arguments.length <= 1 || arguments[1] === undefined ? 'expected ' + insp(act) + ' to be falsy' : arguments[1];

	    raise({ expr: !act, act: act, msg: msg });
	};

	assert.equal = function (act, exp) {
	    var msg = arguments.length <= 2 || arguments[2] === undefined ? 'expected ' + insp(act) + ' to equal ' + insp(exp) : arguments[2];

	    raise({ expr: act === exp, act: act, exp: exp, msg: msg });
	};

	assert.notEqual = function (act, ref) {
	    var msg = arguments.length <= 2 || arguments[2] === undefined ? 'expected ' + insp(act) + ' not to equal ' + insp(ref) : arguments[2];

	    raise({ expr: act !== ref, act: act, ref: ref, msg: msg });
	};

	assert.deepEqual = function (act, exp) {
	    var msg = arguments.length <= 2 || arguments[2] === undefined ? 'expected ' + insp(act) + ' to deeply equal ' + insp(exp) : arguments[2];

	    raise({ expr: deepEqual(act, exp), act: act, exp: exp, msg: msg });
	};

	assert.notDeepEqual = function (act, ref) {
	    var msg = arguments.length <= 2 || arguments[2] === undefined ? 'expected ' + insp(act) + ' not to deeply equal ' + insp(ref) : arguments[2];

	    raise({ expr: !deepEqual(act, ref), act: act, ref: ref, msg: msg });
	};

	assert.throws = function (fn, exp, msg) {
	    raise({ expr: typeof fn === 'function', msg: 'assert.throws(): first arg must be a function' });
	    var val = NO_ERROR;

	    try {
	        val = fn();
	    } catch (err) {
	        raise(checkError(true, err, exp, msg));
	    }

	    if (val !== NO_ERROR) {
	        raise(checkError(false, val, exp, msg));
	    }
	};

	assert.rejects = function (promise, exp, msg) {
	    raise({ expr: promise && typeof promise.then === 'function', msg: 'assert.rejects(): first arg must be a thenable' });

	    return Promise.resolve(promise).then(function (val) {
	        raise(checkError(false, val, exp, msg), 2);
	    }, function (err) {
	        raise(checkError(true, err, exp, msg), 2);
	    });
	};

	module.exports = assert;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(3);

	var isString = _require.isString;
	var isFn = _require.isFn;
	var isArray = _require.isArray;
	var isPlainObject = _require.isPlainObject;


	var insp = function insp(x) {
	    if (isString(x)) {
	        return '\'' + x + '\'';
	    }
	    if (isFn(x)) {
	        return String(x).split(')')[0] + ')';
	    }
	    if (isArray(x)) {
	        return '[' + Array.from(x, function (el) {
	            return insp(el);
	        }).join(', ') + ']';
	    }
	    if (isPlainObject(x)) {
	        return '{' + Object.keys(x).map(function (key) {
	            return key + ': ' + insp(x[key]);
	        }).join(', ') + '}';
	    }
	    return String(x);
	};

	module.exports = insp;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var asFn = function asFn(x) {
	    return typeof x === 'function' ? x : function () {
	        return x;
	    };
	};

	var spy = function spy(fn) {
	    var calls = [];

	    function wrapper() {
	        'use strict'; // eslint-disable-line strict

	        var call = {
	            idx: calls.length,
	            time: Date.now(),
	            ctx: this, // eslint-disable-line no-invalid-this
	            args: Array.from(arguments)
	        };

	        calls.push(call);
	        call.ret = asFn(fn)(call, calls);
	        call.done = Date.now();

	        return call.ret;
	    }

	    wrapper.calls = calls;
	    return wrapper;
	};

	module.exports = spy;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var PREFIX = 'UNIQ-';
	var SUFFIX = '-ID';
	var LENGTH = 4;
	var ZEROPAD = '0000';
	var RE_ID = new RegExp('^' + PREFIX + '\\d{' + LENGTH + '}' + SUFFIX + '$');

	var counter = 0;

	var id = function id() {
	    counter += 1;
	    return PREFIX + (ZEROPAD + counter).substr(-LENGTH) + SUFFIX;
	};

	var isId = function isId(sequence) {
	    return RE_ID.test(sequence);
	};

	var obj = function obj() {
	    return { _uniq_id: id() };
	};

	var path = function path() {
	    var ext = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    return '_uniq_path/' + id() + ext;
	};

	module.exports = {
	    id: id,
	    isId: isId,
	    obj: obj,
	    path: path
	};

/***/ }
/******/ ])
});
;