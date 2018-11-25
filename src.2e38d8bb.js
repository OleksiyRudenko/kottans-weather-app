// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createDomFragment = exports.createDomFragment = function createDomFragment(string) {
  var template = document.createElement('template');
  template.innerHTML = string.trim();
  return template.content;
};

var clearDomChildren = exports.clearDomChildren = function clearDomChildren(domElement) {
  domElement.innerHTML = '';
  return domElement;
};

var appendDomFragment = exports.appendDomFragment = function appendDomFragment(domElement, domFragment) {
  if (Array.isArray(domFragment)) {
    domElement.append.apply(domElement, _toConsumableArray(domFragment));
  } else {
    domElement.append(domFragment);
  }
  return domElement;
};

var buildDomFragment = exports.buildDomFragment = function buildDomFragment(host, elements) {
  elements.forEach(function (elementSpec) {
    var element = document.createElement(typeof elementSpec.tag === 'string' ? elementSpec.tag : 'div');
    if (elementSpec.innerHTML) {
      element.innerHTML = elementSpec.innerHTML;
    }
    if (elementSpec.classList) {
      var _element$classList;

      if (typeof elementSpec.classList === 'string') {
        elementSpec.classList = elementSpec.classList.split(' ');
      }
      (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(elementSpec.classList));
    }
    if (!(typeof elementSpec.tag === 'string')) {
      new elementSpec.tag(element, elementSpec.props);
    }
    if (elementSpec.children) {
      buildDomFragment(element, elementSpec.children);
    }
    host.appendChild(element);
  });
  return host;
};

var bindScope = exports.bindScope = function bindScope(scope) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  names.forEach(function (name) {
    if (typeof scope[name] === 'function') {
      scope[name] = scope[name].bind(scope);
    } else {
      throw Error('Expected ' + name + ' to be a function. Instead ' + name + ' is ' + _typeof(scope[name]));
    }
  });
};
},{}],16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ComponentFactory = {
  mappings: {},
  register: function register(componentClass) {
    return ComponentFactory.mappings[componentClass.name] = componentClass;
  },
  get: function get(componentClassName) {
    return ComponentFactory.mappings[componentClassName];
  }
};
exports.default = ComponentFactory;
},{}],26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../utils");

var _ComponentFactory = require("./ComponentFactory");

var _ComponentFactory2 = _interopRequireDefault(_ComponentFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component(host, props) {
    _classCallCheck(this, Component);

    this.host = host;
    this.props = props || {};
    this.state = {};
    this._render();
  }

  _createClass(Component, [{
    key: "render",
    value: function render() {
      return '';
    }
  }, {
    key: "updateState",
    value: function updateState(partialState) {
      this.state = Object.assign({}, this.state, partialState);
      this._render();
    }
  }, {
    key: "_render",
    value: function _render() {
      var rendered = this.render();
      if (typeof rendered === 'string') {
        rendered = this._createDomFragment(rendered);
      }
      if (Array.isArray(rendered) && rendered[0].tag) {
        rendered = (0, _utils.buildDomFragment)(document.createDocumentFragment(), rendered);
      }
      (0, _utils.appendDomFragment)((0, _utils.clearDomChildren)(this.host), rendered);
    }
  }, {
    key: "_createDomFragment",
    value: function _createDomFragment(string) {
      var _this = this;

      var template = document.createElement('template');

      var componentCount = 0;
      var idBase = new Date().getTime();
      var componentMap = {};

      string = string.trim().replace(/<([A-Z][a-zA-Z]*)(.*)\/>/g, function (match, p1, p2, offset) {
        var id = 'z' + idBase + componentCount++;

        // extract props
        var props = {};
        var parsingResults = void 0;
        p2 = p2.trim();
        if (p2.length) {
          var paramsRegex = /(\S+)=['"]?((?:(?!\/>|>|"|'|\s).)+)/g;
          while ((parsingResults = paramsRegex.exec(p2)) !== null) {
            var objectPropertyName = parsingResults[2].match(/{(.*)}/);
            var propValue = objectPropertyName ? _this[objectPropertyName[1].split('.').filter(function (segment) {
              return segment !== 'this';
            }).join('.')] : parsingResults[2];
            props[parsingResults[1]] = propValue;
          }
        }

        componentMap[id] = {
          name: p1,
          props: props
        };
        return "<div id=\"" + id + "\"></div>";
      });
      template.innerHTML = string;

      // manage event handlers
      var eventTypes = ['click', 'mouseup', 'mousedown', 'mouseover', 'mousein', 'mouseout', 'change', 'input', 'keyup', 'keydown', 'focus', 'blur'];
      var elementsWithListeners = template.content.querySelectorAll([eventTypes].map(function (eventType) {
        return 'on-' + eventType;
      }));
      elementsWithListeners.forEach(function (element) {
        eventTypes.forEach(function (eventType) {
          if (element.hasAttribute('on-' + eventType)) {
            var handlerName = element.getAttribute('on-' + eventType).match(/{(.*)}/)[1];
            handlerName = handlerName.split('.').filter(function (segment) {
              return segment !== 'this';
            }).join('.');
            element.addEventListener(eventType, _this[handlerName].bind(_this));
          }
        });
      });

      // render mapped components
      Object.keys(componentMap).forEach(function (id) {
        var host = template.content.querySelector('#' + id);
        var cls = _ComponentFactory2.default.get(componentMap[id].name);
        new cls(host, componentMap[id].props);
      });

      return template.content;
    }
  }]);

  return Component;
}();

exports.default = Component;
},{"../utils":21,"./ComponentFactory":16}],18:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component = require('./Component');

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Component":26}],27:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require("../framework");

var _ComponentFactory = require("../framework/ComponentFactory");

var _ComponentFactory2 = _interopRequireDefault(_ComponentFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Temperature = function (_Component) {
  _inherits(Temperature, _Component);

  function Temperature(host, props) {
    _classCallCheck(this, Temperature);

    return _possibleConstructorReturn(this, (Temperature.__proto__ || Object.getPrototypeOf(Temperature)).call(this, host, props));
  }

  _createClass(Temperature, [{
    key: "render",
    value: function render() {
      return this.props.t + '&deg;' + this.props.unit;
    }
  }]);

  return Temperature;
}(_framework.Component);

exports.default = Temperature;

_ComponentFactory2.default.register(Temperature);
},{"../framework":18,"../framework/ComponentFactory":16}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Temperature = require('./Temperature');

Object.defineProperty(exports, 'Temperature', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Temperature).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Temperature":27}],28:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require("../framework");

var _ComponentFactory = require("../framework/ComponentFactory");

var _ComponentFactory2 = _interopRequireDefault(_ComponentFactory);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = function (_Component) {
  _inherits(Counter, _Component);

  function Counter(host, props) {
    _classCallCheck(this, Counter);

    var _this = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, host, props));

    _this.updateState({
      count: _this.props.count
    });
    (0, _utils.bindScope)(_this, 'decrement', 'increment');
    return _this;
  }

  _createClass(Counter, [{
    key: "render",
    value: function render() {
      return "<input type=\"button\" value=\"-\" on-Click={this.decrement} />\n        " + this.state.count + "\n        <input type=\"button\" value=\"+\" on-Click={this.increment} />";
    }
  }, {
    key: "decrement",
    value: function decrement() {
      this.props.changeHandler(+this.state.count - 1);
    }
  }, {
    key: "increment",
    value: function increment() {
      this.props.changeHandler(+this.state.count + 1);
    }
  }]);

  return Counter;
}(_framework.Component);

exports.default = Counter;

_ComponentFactory2.default.register(Counter);
},{"../framework":18,"../framework/ComponentFactory":16,"../utils":21}],20:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Counter = require('./Counter');

Object.defineProperty(exports, 'Counter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Counter).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Counter":28}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require("../framework");

var _ComponentFactory = require("../framework/ComponentFactory");

var _ComponentFactory2 = _interopRequireDefault(_ComponentFactory);

var _Temperature = require("../Temperature");

var _Counter = require("../Counter");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(host) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, host));

    (0, _utils.bindScope)(_this, 'updateCount');
    _this.updateState({
      count: 5
    });
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return "<div class=\"flex-column\">\n              <div>\n                Weather " + this.state.count + "\n                <Counter count=" + this.state.count + " changeHandler={this.updateCount} />\n              </div>\n              <Temperature t=-10 unit=\"C\" />\n              <div class=\"flex-row\">\n                  <Temperature t=-9 unit=\"C\"/>\n                  <Temperature t=-8 unit=\"C\" />\n                  <Temperature t=-8 unit=\"C\" />\n                  <Temperature t=-5 unit=\"C\" />\n                  <Temperature t=-32 unit=\"C\" />\n              </div>\n           </div>";
    }
  }, {
    key: "updateCount",
    value: function updateCount(newValue) {
      this.updateState({
        count: newValue
      });
    }
  }]);

  return App;
}(_framework.Component);

exports.default = App;

_ComponentFactory2.default.register(App);
},{"../framework":18,"../framework/ComponentFactory":16,"../Temperature":19,"../Counter":20,"../utils":21}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

Object.defineProperty(exports, 'App', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_App).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./App":14}],7:[function(require,module,exports) {
'use strict';

var _App = require('./App');

new _App.App(document.getElementById('root'));
},{"./App":12}]},{},[7])
//# sourceMappingURL=src.2e38d8bb.map