(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var URL = Package.url.URL;

/* Package-scope variables */
var HTTP, HTTPInternals, makeErrorByStatus, populateData;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/http/httpcall_common.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
makeErrorByStatus = function(statusCode, content) {                                                                 // 1
  var MAX_LENGTH = 500; // if you change this, also change the appropriate test                                     // 2
                                                                                                                    // 3
  var truncate = function(str, length) {                                                                            // 4
    return str.length > length ? str.slice(0, length) + '...' : str;                                                // 5
  };                                                                                                                // 6
                                                                                                                    // 7
  var message = "failed [" + statusCode + "]";                                                                      // 8
  if (content)                                                                                                      // 9
    message += " " + truncate(content.replace(/\n/g, " "), MAX_LENGTH);                                             // 10
                                                                                                                    // 11
  return new Error(message);                                                                                        // 12
};                                                                                                                  // 13
                                                                                                                    // 14
                                                                                                                    // 15
// Fill in `response.data` if the content-type is JSON.                                                             // 16
populateData = function(response) {                                                                                 // 17
  // Read Content-Type header, up to a ';' if there is one.                                                         // 18
  // A typical header might be "application/json; charset=utf-8"                                                    // 19
  // or just "application/json".                                                                                    // 20
  var contentType = (response.headers['content-type'] || ';').split(';')[0];                                        // 21
                                                                                                                    // 22
  // Only try to parse data as JSON if server sets correct content type.                                            // 23
  if (_.include(['application/json', 'text/javascript'], contentType)) {                                            // 24
    try {                                                                                                           // 25
      response.data = JSON.parse(response.content);                                                                 // 26
    } catch (err) {                                                                                                 // 27
      response.data = null;                                                                                         // 28
    }                                                                                                               // 29
  } else {                                                                                                          // 30
    response.data = null;                                                                                           // 31
  }                                                                                                                 // 32
};                                                                                                                  // 33
                                                                                                                    // 34
HTTP = {};                                                                                                          // 35
                                                                                                                    // 36
/**                                                                                                                 // 37
 * @summary Send an HTTP `GET` request. Equivalent to calling [`HTTP.call`](#http_call) with "GET" as the first argument.
 * @param {String} url The URL to which the request should be sent.                                                 // 39
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).                                    // 40
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client. // 41
 * @locus Anywhere                                                                                                  // 42
 */                                                                                                                 // 43
HTTP.get = function (/* varargs */) {                                                                               // 44
  return HTTP.call.apply(this, ["GET"].concat(_.toArray(arguments)));                                               // 45
};                                                                                                                  // 46
                                                                                                                    // 47
/**                                                                                                                 // 48
 * @summary Send an HTTP `POST` request. Equivalent to calling [`HTTP.call`](#http_call) with "POST" as the first argument.
 * @param {String} url The URL to which the request should be sent.                                                 // 50
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).                                    // 51
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client. // 52
 * @locus Anywhere                                                                                                  // 53
 */                                                                                                                 // 54
HTTP.post = function (/* varargs */) {                                                                              // 55
  return HTTP.call.apply(this, ["POST"].concat(_.toArray(arguments)));                                              // 56
};                                                                                                                  // 57
                                                                                                                    // 58
/**                                                                                                                 // 59
 * @summary Send an HTTP `PUT` request. Equivalent to calling [`HTTP.call`](#http_call) with "PUT" as the first argument.
 * @param {String} url The URL to which the request should be sent.                                                 // 61
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).                                    // 62
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client. // 63
 * @locus Anywhere                                                                                                  // 64
 */                                                                                                                 // 65
HTTP.put = function (/* varargs */) {                                                                               // 66
  return HTTP.call.apply(this, ["PUT"].concat(_.toArray(arguments)));                                               // 67
};                                                                                                                  // 68
                                                                                                                    // 69
/**                                                                                                                 // 70
 * @summary Send an HTTP `DELETE` request. Equivalent to calling [`HTTP.call`](#http_call) with "DELETE" as the first argument. (Named `del` to avoid conflic with the Javascript keyword `delete`)
 * @param {String} url The URL to which the request should be sent.                                                 // 72
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).                                    // 73
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client. // 74
 * @locus Anywhere                                                                                                  // 75
 */                                                                                                                 // 76
HTTP.del = function (/* varargs */) {                                                                               // 77
  return HTTP.call.apply(this, ["DELETE"].concat(_.toArray(arguments)));                                            // 78
};                                                                                                                  // 79
                                                                                                                    // 80
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/http/httpcall_server.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var path = Npm.require('path');                                                                                     // 1
var request = Npm.require('request');                                                                               // 2
var url_util = Npm.require('url');                                                                                  // 3
                                                                                                                    // 4
HTTPInternals = {                                                                                                   // 5
  NpmModules: {                                                                                                     // 6
    request: {                                                                                                      // 7
      version: Npm.require('request/package.json').version,                                                         // 8
      module: request                                                                                               // 9
    }                                                                                                               // 10
  }                                                                                                                 // 11
};                                                                                                                  // 12
                                                                                                                    // 13
// _call always runs asynchronously; HTTP.call, defined below,                                                      // 14
// wraps _call and runs synchronously when no callback is provided.                                                 // 15
var _call = function(method, url, options, callback) {                                                              // 16
                                                                                                                    // 17
  ////////// Process arguments //////////                                                                           // 18
                                                                                                                    // 19
  if (! callback && typeof options === "function") {                                                                // 20
    // support (method, url, callback) argument list                                                                // 21
    callback = options;                                                                                             // 22
    options = null;                                                                                                 // 23
  }                                                                                                                 // 24
                                                                                                                    // 25
  options = options || {};                                                                                          // 26
                                                                                                                    // 27
  method = (method || "").toUpperCase();                                                                            // 28
                                                                                                                    // 29
  if (! /^https?:\/\//.test(url))                                                                                   // 30
    throw new Error("url must be absolute and start with http:// or https://");                                     // 31
                                                                                                                    // 32
  var headers = {};                                                                                                 // 33
                                                                                                                    // 34
  var content = options.content;                                                                                    // 35
  if (options.data) {                                                                                               // 36
    content = JSON.stringify(options.data);                                                                         // 37
    headers['Content-Type'] = 'application/json';                                                                   // 38
  }                                                                                                                 // 39
                                                                                                                    // 40
                                                                                                                    // 41
  var paramsForUrl, paramsForBody;                                                                                  // 42
  if (content || method === "GET" || method === "HEAD")                                                             // 43
    paramsForUrl = options.params;                                                                                  // 44
  else                                                                                                              // 45
    paramsForBody = options.params;                                                                                 // 46
                                                                                                                    // 47
  var newUrl = URL._constructUrl(url, options.query, paramsForUrl);                                                 // 48
                                                                                                                    // 49
  if (options.auth) {                                                                                               // 50
    if (options.auth.indexOf(':') < 0)                                                                              // 51
      throw new Error('auth option should be of the form "username:password"');                                     // 52
    headers['Authorization'] = "Basic "+                                                                            // 53
      (new Buffer(options.auth, "ascii")).toString("base64");                                                       // 54
  }                                                                                                                 // 55
                                                                                                                    // 56
  if (paramsForBody) {                                                                                              // 57
    content = URL._encodeParams(paramsForBody);                                                                     // 58
    headers['Content-Type'] = "application/x-www-form-urlencoded";                                                  // 59
  }                                                                                                                 // 60
                                                                                                                    // 61
  _.extend(headers, options.headers || {});                                                                         // 62
                                                                                                                    // 63
  // wrap callback to add a 'response' property on an error, in case                                                // 64
  // we have both (http 4xx/5xx error, which has a response payload)                                                // 65
  callback = (function(callback) {                                                                                  // 66
    return function(error, response) {                                                                              // 67
      if (error && response)                                                                                        // 68
        error.response = response;                                                                                  // 69
      callback(error, response);                                                                                    // 70
    };                                                                                                              // 71
  })(callback);                                                                                                     // 72
                                                                                                                    // 73
  // safety belt: only call the callback once.                                                                      // 74
  callback = _.once(callback);                                                                                      // 75
                                                                                                                    // 76
                                                                                                                    // 77
  ////////// Kickoff! //////////                                                                                    // 78
                                                                                                                    // 79
  // Allow users to override any request option with the npmRequestOptions                                          // 80
  // option.                                                                                                        // 81
  var reqOptions = _.extend({                                                                                       // 82
    url: newUrl,                                                                                                    // 83
    method: method,                                                                                                 // 84
    encoding: "utf8",                                                                                               // 85
    jar: false,                                                                                                     // 86
    timeout: options.timeout,                                                                                       // 87
    body: content,                                                                                                  // 88
    followRedirect: options.followRedirects,                                                                        // 89
    // Follow redirects on non-GET requests                                                                         // 90
    // also. (https://github.com/meteor/meteor/issues/2808)                                                         // 91
    followAllRedirects: options.followRedirects,                                                                    // 92
    headers: headers                                                                                                // 93
  }, options.npmRequestOptions || {});                                                                              // 94
                                                                                                                    // 95
  request(reqOptions, function(error, res, body) {                                                                  // 96
    var response = null;                                                                                            // 97
                                                                                                                    // 98
    if (! error) {                                                                                                  // 99
                                                                                                                    // 100
      response = {};                                                                                                // 101
      response.statusCode = res.statusCode;                                                                         // 102
      response.content = body;                                                                                      // 103
      response.headers = res.headers;                                                                               // 104
                                                                                                                    // 105
      populateData(response);                                                                                       // 106
                                                                                                                    // 107
      if (response.statusCode >= 400)                                                                               // 108
        error = makeErrorByStatus(response.statusCode, response.content);                                           // 109
    }                                                                                                               // 110
                                                                                                                    // 111
    callback(error, response);                                                                                      // 112
                                                                                                                    // 113
  });                                                                                                               // 114
};                                                                                                                  // 115
                                                                                                                    // 116
HTTP.call = Meteor.wrapAsync(_call);                                                                                // 117
                                                                                                                    // 118
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/http/deprecated.js                                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// The HTTP object used to be called Meteor.http.                                                                   // 1
// XXX COMPAT WITH 0.6.4                                                                                            // 2
Meteor.http = HTTP;                                                                                                 // 3
                                                                                                                    // 4
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.http = {
  HTTP: HTTP,
  HTTPInternals: HTTPInternals
};

})();

//# sourceMappingURL=http.js.map
