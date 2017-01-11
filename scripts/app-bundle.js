define('app',["exports", "aurelia-router"], function (exports, _aureliaRouter) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.App = undefined;

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var AuthorizeStep = function () {
      function AuthorizeStep() {
         _classCallCheck(this, AuthorizeStep);
      }

      AuthorizeStep.prototype.run = function run(navigationInstruction, next) {
         if (navigationInstruction.getAllInstructions().some(function (i) {
            return i.config.settings.roles.indexOf("authenticated") !== -1;
         })) {
            var isLoggedIn = !!localStorage.ticket;
            if (!isLoggedIn) {
               return next.cancel(new _aureliaRouter.Redirect("login"));
            }
         }
         return next();
      };

      return AuthorizeStep;
   }();

   var App = exports.App = function () {
      function App() {
         _classCallCheck(this, App);
      }

      App.prototype.configureRouter = function configureRouter(config, router) {
         config.title = "Aurelia Test";
         config.addPipelineStep("authorize", AuthorizeStep);
         config.map([{ route: ["login"], moduleId: "components/login", title: "Login", settings: { roles: [] } }, { route: ["", "home"], moduleId: "components/home", title: "Home", settings: { roles: ["authenticated"] } }]);
      };

      return App;
   }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('components/breadcrumb',["exports", "aurelia-framework", "alfresco-js-utils/lib/utils/navigation/Breadcrumbs"], function (exports, _aureliaFramework, _Breadcrumbs) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.Breadcrumb = undefined;

   var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _initDefineProp(target, property, descriptor, context) {
      if (!descriptor) return;
      Object.defineProperty(target, property, {
         enumerable: descriptor.enumerable,
         configurable: descriptor.configurable,
         writable: descriptor.writable,
         value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
      });
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
      var desc = {};
      Object['ke' + 'ys'](descriptor).forEach(function (key) {
         desc[key] = descriptor[key];
      });
      desc.enumerable = !!desc.enumerable;
      desc.configurable = !!desc.configurable;

      if ('value' in desc || desc.initializer) {
         desc.writable = true;
      }

      desc = decorators.slice().reverse().reduce(function (desc, decorator) {
         return decorator(target, property, desc) || desc;
      }, desc);

      if (context && desc.initializer !== void 0) {
         desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
         desc.initializer = undefined;
      }

      if (desc.initializer === void 0) {
         Object['define' + 'Property'](target, property, desc);
         desc = null;
      }

      return desc;
   }

   function _initializerWarningHelper(descriptor, context) {
      throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
   }

   var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

   var Breadcrumb = exports.Breadcrumb = (_dec = (0, _aureliaFramework.customElement)("breadcrumb"), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = (_class2 = function () {
      function Breadcrumb(element) {
         _classCallCheck(this, Breadcrumb);

         _initDefineProp(this, "relativePath", _descriptor, this);

         this.element = element;
         this.breadcrumbs = [{
            label: "Home",
            relativePath: "/"
         }];
      }

      Breadcrumb.prototype.navigate = function navigate(breadcrumb) {
         var changeEvent = new CustomEvent("relativePath", {
            detail: breadcrumb.relativePath,
            bubbles: true
         });
         this.element.dispatchEvent(changeEvent);
      };

      Breadcrumb.prototype.relativePathChanged = function relativePathChanged(newPath, oldPath) {
         var breadcrumbData = _Breadcrumbs2.default.createBreadcrumbs({
            relativePath: newPath
         });
         this.breadcrumbs = breadcrumbData.breadcrumbs;
      };

      return Breadcrumb;
   }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "relativePath", [_aureliaFramework.bindable], {
      enumerable: true,
      initializer: function initializer() {
         return "/";
      }
   })), _class2)) || _class) || _class);
});
define('components/home',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Home = exports.Home = function Home() {
    _classCallCheck(this, Home);
  };
});
define('components/list',["exports", "aurelia-framework", "alfresco-js-utils/lib/services/NodeService"], function (exports, _aureliaFramework, _NodeService) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.List = undefined;

   var _NodeService2 = _interopRequireDefault(_NodeService);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var _dec, _class;

   var List = exports.List = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
      function List(element) {
         _classCallCheck(this, List);

         this.element = element;

         this.data = {
            skipCount: 0,
            maxItems: 3,
            relativePath: "/",
            list: {
               entries: [],
               pagination: {
                  skipCount: 0,
                  maxItems: 3
               }
            }
         };
         this.getData();
      }

      List.prototype.attached = function attached() {
         var _this = this;

         this.element.addEventListener("navigate", function (event) {
            _this.navigate(event.detail);
         });
         this.element.addEventListener("relativePath", function (event) {
            _this.setRelativePath(event.detail);
         });
         this.element.addEventListener("pageBack", function () {
            _this.pageBack();
         });
         this.element.addEventListener("pageForward", function () {
            _this.pageForward();
         });
      };

      List.prototype.getData = function getData() {
         var _this2 = this;

         _NodeService2.default.getItems({
            skipCount: this.data.skipCount,
            maxItems: this.data.maxItems,
            relativePath: this.data.relativePath
         }).then(function (response) {
            _this2.data.list = response.data.list;
         });
      };

      List.prototype.pageBack = function pageBack() {
         if (this.data.list.pagination.skipCount) {
            this.data.skipCount -= this.data.maxItems;
            this.getData();
         }
      };

      List.prototype.pageForward = function pageForward() {
         if (this.data.list.pagination.hasMoreItems) {
            this.data.skipCount += this.data.maxItems;
            this.getData();
         }
      };

      List.prototype.navigate = function navigate(item) {
         this.data.skipCount = 0;
         this.data.relativePath += item.entry.name + "/";
         this.getData();
      };

      List.prototype.setRelativePath = function setRelativePath(relativePath) {
         this.data.skipCount = 0;
         this.data.relativePath = relativePath;
         this.getData();
      };

      return List;
   }()) || _class);
});
define('components/listview',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.ListView = undefined;

   function _initDefineProp(target, property, descriptor, context) {
      if (!descriptor) return;
      Object.defineProperty(target, property, {
         enumerable: descriptor.enumerable,
         configurable: descriptor.configurable,
         writable: descriptor.writable,
         value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
      });
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
      var desc = {};
      Object['ke' + 'ys'](descriptor).forEach(function (key) {
         desc[key] = descriptor[key];
      });
      desc.enumerable = !!desc.enumerable;
      desc.configurable = !!desc.configurable;

      if ('value' in desc || desc.initializer) {
         desc.writable = true;
      }

      desc = decorators.slice().reverse().reduce(function (desc, decorator) {
         return decorator(target, property, desc) || desc;
      }, desc);

      if (context && desc.initializer !== void 0) {
         desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
         desc.initializer = undefined;
      }

      if (desc.initializer === void 0) {
         Object['define' + 'Property'](target, property, desc);
         desc = null;
      }

      return desc;
   }

   function _initializerWarningHelper(descriptor, context) {
      throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
   }

   var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

   var ListView = exports.ListView = (_dec = (0, _aureliaFramework.customElement)("listview"), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = (_class2 = function () {
      function ListView(element) {
         _classCallCheck(this, ListView);

         _initDefineProp(this, "list", _descriptor, this);

         this.element = element;
      }

      ListView.prototype.navigate = function navigate(item) {
         if (item.entry.isFolder) {
            var changeEvent = new CustomEvent("navigate", {
               detail: item,
               bubbles: true
            });
            this.element.dispatchEvent(changeEvent);
         }
      };

      return ListView;
   }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "list", [_aureliaFramework.bindable], {
      enumerable: true,
      initializer: null
   })), _class2)) || _class) || _class);
});
define('components/login',["exports", "aurelia-framework", "aurelia-router", "alfresco-js-utils/lib/Authentication"], function (exports, _aureliaFramework, _aureliaRouter, _Authentication) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.Login = undefined;

   var _Authentication2 = _interopRequireDefault(_Authentication);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var _dec, _class;

   var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
      function Login(router) {
         _classCallCheck(this, Login);

         this.router = router;
      }

      Login.prototype.handleSubmit = function handleSubmit() {
         var _this = this;

         var username = this.username.value;
         var pass = this.pass.value;

         _Authentication2.default.login(username, pass).then(function (loggedIn) {
            if (!loggedIn) {} else {
               _this.router.navigate("home");
            }
         });
      };

      return Login;
   }()) || _class);
});
define('components/toolbar',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.Toolbar = undefined;

   function _initDefineProp(target, property, descriptor, context) {
      if (!descriptor) return;
      Object.defineProperty(target, property, {
         enumerable: descriptor.enumerable,
         configurable: descriptor.configurable,
         writable: descriptor.writable,
         value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
      });
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
      var desc = {};
      Object['ke' + 'ys'](descriptor).forEach(function (key) {
         desc[key] = descriptor[key];
      });
      desc.enumerable = !!desc.enumerable;
      desc.configurable = !!desc.configurable;

      if ('value' in desc || desc.initializer) {
         desc.writable = true;
      }

      desc = decorators.slice().reverse().reduce(function (desc, decorator) {
         return decorator(target, property, desc) || desc;
      }, desc);

      if (context && desc.initializer !== void 0) {
         desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
         desc.initializer = undefined;
      }

      if (desc.initializer === void 0) {
         Object['define' + 'Property'](target, property, desc);
         desc = null;
      }

      return desc;
   }

   function _initializerWarningHelper(descriptor, context) {
      throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
   }

   var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

   var Toolbar = exports.Toolbar = (_dec = (0, _aureliaFramework.customElement)("toolbar"), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = (_class2 = function () {
      function Toolbar(element) {
         _classCallCheck(this, Toolbar);

         _initDefineProp(this, "list", _descriptor, this);

         this.element = element;
      }

      Toolbar.prototype.back = function back() {
         var changeEvent = new CustomEvent("pageBack", {
            bubbles: true
         });
         this.element.dispatchEvent(changeEvent);
      };

      Toolbar.prototype.forward = function forward() {
         var changeEvent = new CustomEvent("pageForward", {
            bubbles: true
         });
         this.element.dispatchEvent(changeEvent);
      };

      return Toolbar;
   }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "list", [_aureliaFramework.bindable], {
      enumerable: true,
      initializer: null
   })), _class2)) || _class) || _class);
});
define('alfresco-js-utils/lib/utils/navigation/Breadcrumbs',['require','exports','module'],function (require, exports, module) {'use strict';

/* global module */

module.exports = {

   createBreadcrumbs(input) {
      let lastPathElement = '/';
      let breadcrumbs = [{
         label: 'Home',
         relativePath: lastPathElement
      }];
      input.relativePath
         .split('/')
         .filter(function(name) {
            return name.trim() !== '';
         })
         .forEach(function(pathElement) {
            let currRelativePath = lastPathElement + pathElement + '/';
            breadcrumbs.push({
               label: pathElement,
               relativePath: currRelativePath
            });
            lastPathElement = currRelativePath;
         });
      return {
         lastPathElement: lastPathElement,
         breadcrumbs: breadcrumbs
      };
   }
};
});

define('alfresco-js-utils/lib/services/NodeService',['require','exports','module','axios'],function (require, exports, module) {'use strict';

/* global module, require */
const axios = require('axios');

module.exports = {

   getItems(options) {
      if (!options)
      {
         options = {};
      }
      options.skipCount = options.skipCount || 0;
      options.maxItems = options.maxItems || 10;
      options.relativePath = options.relativePath || '/';

      return axios.get(`/api/-default-/public/alfresco/versions/1/nodes/-root-/children?include=path&skipCount=${options.skipCount}&maxItems=${options.maxItems}&relativePath=${options.relativePath}`);
   }
};
});

define('alfresco-js-utils/lib/Authentication',['require','exports','module','axios'],function (require, exports, module) {'use strict';

/* global module, require */
const axios = require('axios');

module.exports = {
   
   login(username, password) {
      return new Promise((resolve, reject) => {
         if (localStorage.ticket) {
            // The user is already authenticated so nothing more is required...
            this.onChange(true);
            resolve(true);
         }
         else
         {
            // There is no session ticket in local storage so we need to make an XHR
            // request to get one...
            axios.post(`/service/api/login`, {
               username: username,
               password: password
            }).then(response => {
               if (response.status === 200)
               {
                  // Authentication was successful so save the ticket in local storage
                  // and call onChange with an argument of true to indicate that authentication
                  // has been successful...
                  localStorage.ticket = response.data.data.ticket;
                  this.onChange(true);
                  resolve(true);
               }
               else
               {
                  // If authentication failed for any reason call onChange with an argument
                  // of false to indicate that login has failed...
                  this.onChange(false);
                  resolve(false);
               }
            });
         }
      });
   },

   getTicket() {
      return localStorage.ticket;
   },

   logout() {
      delete localStorage.ticket;
      this.onChange(false);
   },

   loggedIn() {
      return !!localStorage.ticket;
   },

   onChange() {}
};
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>Test</h1>\n  <router-view></router-view>\n</template>\n"; });
define('text!components/breadcrumb.html', ['module'], function(module) { module.exports = "<template bindable=\"relativePath\">\n   <nav role='navigation'>\n      <p id='breadcrumblabel'>You are here: ${relativePath}</p>\n      <ol id='breadcrumb' aria-labelledby='breadcrumblabel'>\n         <li role='link' repeat.for=\"breadcrumb of breadcrumbs\" click.delegate=\"navigate(breadcrumb)\">${breadcrumb.label}</li>\n      </ol>\n   </nav>\n</template>"; });
define('text!components/home.html', ['module'], function(module) { module.exports = "<template>\n   <require from=\"components/list\"></require>\n   <h1>Home</h1>\n   <list></list>\n</template>"; });
define('text!components/list.html', ['module'], function(module) { module.exports = "<template>\n   <require from=\"components/breadcrumb\"></require>\n   <require from=\"components/toolbar\"></require>\n   <require from=\"components/listview\"></require>\n   <breadcrumb relative-path.bind=\"data.relativePath\"></breadcrumb>\n   <toolbar list.bind=\"data.list\"></toolbar>\n   <listview list.bind=\"data.list\"></listview>\n</template>"; });
define('text!components/listview.html', ['module'], function(module) { module.exports = "<template bindable=\"list\">\n   <ul>\n      <li repeat.for=\"item of list.entries\" click.delegate=\"navigate(item)\">${item.entry.name}</li>\n   </ul>\n</template>"; });
define('text!components/login.html', ['module'], function(module) { module.exports = "<template>\n   <form submit.trigger=\"handleSubmit()\">\n      <label><input ref=\"username\" placeholder=\"username\" /></label>\n      <label><input ref=\"pass\" placeholder=\"password\" /></label><br/>\n      <button type=\"submit\">login</button>\n   </form>\n</template>"; });
define('text!components/toolbar.html', ['module'], function(module) { module.exports = "<template bindable=\"list\">\n   <span>\n      <button click.delegate=\"back()\">Page Back</button>\n      <span>${ list.pagination.skipCount / list.pagination.maxItems + 1}</span>\n      <button click.delegate=\"forward()\">Page Forward</button>\n   </span>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map