//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var Template = Package.templating.Template;
var _ = Package.underscore._;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Iron = Package['iron:core'].Iron;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare;

(function () {

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/zimme:iron-router-active/client/helpers.coffee.js              //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var func, helpers, isActive, name, testExp,
  __hasProp = {}.hasOwnProperty;

isActive = function(type, inverse) {
  var name;
  if (inverse == null) {
    inverse = false;
  }
  name = 'is';
  if (inverse) {
    name = name + 'Not';
  }
  name = name + 'Active' + s.capitalize(type);
  return function(view) {
    var className, controller, isPath, pattern, regex, test, _ref;
    if (!(view instanceof Spacebars.kw)) {
      throw new Error(("" + name + " options must be key value pair such ") + ("as {{" + name + " regex='route/path'}}. You passed: ") + ("" + (JSON.stringify(view))));
    }
    pattern = {
      className: Match.Optional(String),
      regex: String
    };
    check(view.hash, pattern);
    controller = Router.current();
    if (!controller) {
      return false;
    }
    _ref = view.hash, className = _ref.className, regex = _ref.regex;
    if (className == null) {
      className = inverse ? 'disabled' : 'active';
    }
    if (type === 'path') {
      isPath = true;
    }
    test = testExp(controller, regex, isPath);
    if (inverse) {
      test = !test;
    }
    if (test) {
      return className;
    } else {
      return false;
    }
  };
};

testExp = function(controller, exp, isPath) {
  var pattern, re, _ref;
  if (isPath == null) {
    isPath = false;
  }
  if (isPath) {
    pattern = controller.location.get().path;
  } else {
    pattern = (_ref = controller.route) != null ? _ref.getName() : void 0;
  }
  re = new RegExp(exp, 'i');
  return re.test(pattern);
};

helpers = {
  isActiveRoute: isActive('route'),
  isActivePath: isActive('path'),
  isNotActiveRoute: isActive('route', true),
  isNotActivePath: isActive('path', true)
};

for (name in helpers) {
  if (!__hasProp.call(helpers, name)) continue;
  func = helpers[name];
  Template.registerHelper(name, func);
}
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['zimme:iron-router-active'] = {};

})();
