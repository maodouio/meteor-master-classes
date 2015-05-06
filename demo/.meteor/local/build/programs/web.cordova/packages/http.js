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
var _ = Package.underscore._;
var URL = Package.url.URL;

/* Package-scope variables */
var HTTP, makeErrorByStatus, populateData;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/http/httpcall_common.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
makeErrorByStatus = function(statusCode, content) {                                                                   // 1
  var MAX_LENGTH = 500; // if you change this, also change the appropriate test                                       // 2
                                                                                                                      // 3
  var truncate = function(str, length) {                                                                              // 4
    return str.length > length ? str.slice(0, length) + '...' : str;                                                  // 5
  };                                                                                                                  // 6
                                                                                                                      // 7
  var message = "failed [" + statusCode + "]";                                                                        // 8
  if (content)                                                                                                        // 9
    message += " " + truncate(content.replace(/\n/g, " "), MAX_LENGTH);                                               // 10
                                                                                                                      // 11
  return new Error(message);                                                                                          // 12
};                                                                                                                    // 13
                                                                                                                      // 14
                                                                                                                      // 15
// Fill in `response.data` if the content-type is JSON.                                                               // 16
populateData = function(response) {                                                                                   // 17
  // Read Content-Type header, up to a ';' if there is one.                                                           // 18
  // A typical header might be "application/json; charset=utf-8"                                                      // 19
  // or just "application/json".                                                                                      // 20
  var contentType = (response.headers['content-type'] || ';').split(';')[0];                                          // 21
                                                                                                                      // 22
  // Only try to parse data as JSON if server sets correct content type.                                              // 23
  if (_.include(['application/json', 'text/javascript'], contentType)) {                                              // 24
    try {                                                                                                             // 25
      response.data = JSON.parse(response.content);                                                                   // 26
    } catch (err) {                                                                                                   // 27
      response.data = null;                                                                                           // 28
    }                                                                                                                 // 29
  } else {                                                                                                            // 30
    response.data = null;                                                                                             // 31
  }                                                                                                                   // 32
};                                                                                                                    // 33
                                                                                                                      // 34
HTTP = {};                                                                                                            // 35
                                                                                                                      // 36
/**                                                                                                                   // 37
 * @summary Send an HTTP `GET` request. Equivalent to calling [`HTTP.call`](#http_call) with "GET" as the first argument.
 * @param {String} url The URL to which the request should be sent.                                                   // 39
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).                                      // 40
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.   // 41
 * @locus Anywhere                                                                                                    // 42
 */                                                                                                                   // 43
HTTP.get = function (/* varargs */) {                                                                                 // 44
  return HTTP.call.apply(this, ["GET"].concat(_.toArray(arguments)));                                                 // 45
};                                                                                                                    // 46
                                                                                                                      // 47
/**                                                                                                                   // 48
 * @summary Send an HTTP `POST` request. Equivalent to calling [`HTTP.call`](#http_call) with "POST" as the first argument.
 * @param {String} url The URL to which the request should be sent.                                                   // 50
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).                                      // 51
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.   // 52
 * @locus Anywhere                                                                                                    // 53
 */                                                                                                                   // 54
HTTP.post = function (/* varargs */) {                                                                                // 55
  return HTTP.call.apply(this, ["POST"].concat(_.toArray(arguments)));                                                // 56
};                                                                                                                    // 57
                                                                                                                      // 58
/**                                                                                                                   // 59
 * @summary Send an HTTP `PUT` request. Equivalent to calling [`HTTP.call`](#http_call) with "PUT" as the first argument.
 * @param {String} url The URL to which the request should be sent.                                                   // 61
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).                                      // 62
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.   // 63
 * @locus Anywhere                                                                                                    // 64
 */                                                                                                                   // 65
HTTP.put = function (/* varargs */) {                                                                                 // 66
  return HTTP.call.apply(this, ["PUT"].concat(_.toArray(arguments)));                                                 // 67
};                                                                                                                    // 68
                                                                                                                      // 69
/**                                                                                                                   // 70
 * @summary Send an HTTP `DELETE` request. Equivalent to calling [`HTTP.call`](#http_call) with "DELETE" as the first argument. (Named `del` to avoid conflic with the Javascript keyword `delete`)
 * @param {String} url The URL to which the request should be sent.                                                   // 72
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).                                      // 73
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.   // 74
 * @locus Anywhere                                                                                                    // 75
 */                                                                                                                   // 76
HTTP.del = function (/* varargs */) {                                                                                 // 77
  return HTTP.call.apply(this, ["DELETE"].concat(_.toArray(arguments)));                                              // 78
};                                                                                                                    // 79
                                                                                                                      // 80
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/http/httpcall_client.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   // 1
 * @summary Perform an outbound HTTP request.                                                                         // 2
 * @locus Anywhere                                                                                                    // 3
 * @param {String} method The [HTTP method](http://en.wikipedia.org/wiki/HTTP_method) to use, such as "`GET`", "`POST`", or "`HEAD`".
 * @param {String} url The URL to retrieve.                                                                           // 5
 * @param {Object} [options]                                                                                          // 6
 * @param {String} options.content String to use as the HTTP request body.                                            // 7
 * @param {Object} options.data JSON-able object to stringify and use as the HTTP request body. Overwrites `content`. // 8
 * @param {String} options.query Query string to go in the URL. Overwrites any query string in `url`.                 // 9
 * @param {Object} options.params Dictionary of request parameters to be encoded and placed in the URL (for GETs) or request body (for POSTs).  If `content` or `data` is specified, `params` will always be placed in the URL.
 * @param {String} options.auth HTTP basic authentication string of the form `"username:password"`                    // 11
 * @param {Object} options.headers Dictionary of strings, headers to add to the HTTP request.                         // 12
 * @param {Number} options.timeout Maximum time in milliseconds to wait for the request before failing.  There is no timeout by default.
 * @param {Boolean} options.followRedirects If `true`, transparently follow HTTP redirects. Cannot be set to `false` on the client. Default `true`.
 * @param {Object} options.npmRequestOptions On the server, `HTTP.call` is implemented by using the [npm `request` module](https://www.npmjs.com/package/request). Any options in this object will be passed directly to the `request` invocation.
 * @param {Function} [asyncCallback] Optional callback.  If passed, the method runs asynchronously, instead of synchronously, and calls asyncCallback.  On the client, this callback is required.
 */                                                                                                                   // 17
HTTP.call = function(method, url, options, callback) {                                                                // 18
                                                                                                                      // 19
  ////////// Process arguments //////////                                                                             // 20
                                                                                                                      // 21
  if (! callback && typeof options === "function") {                                                                  // 22
    // support (method, url, callback) argument list                                                                  // 23
    callback = options;                                                                                               // 24
    options = null;                                                                                                   // 25
  }                                                                                                                   // 26
                                                                                                                      // 27
  options = options || {};                                                                                            // 28
                                                                                                                      // 29
  if (typeof callback !== "function")                                                                                 // 30
    throw new Error(                                                                                                  // 31
      "Can't make a blocking HTTP call from the client; callback required.");                                         // 32
                                                                                                                      // 33
  method = (method || "").toUpperCase();                                                                              // 34
                                                                                                                      // 35
  var headers = {};                                                                                                   // 36
                                                                                                                      // 37
  var content = options.content;                                                                                      // 38
  if (options.data) {                                                                                                 // 39
    content = JSON.stringify(options.data);                                                                           // 40
    headers['Content-Type'] = 'application/json';                                                                     // 41
  }                                                                                                                   // 42
                                                                                                                      // 43
  var params_for_url, params_for_body;                                                                                // 44
  if (content || method === "GET" || method === "HEAD")                                                               // 45
    params_for_url = options.params;                                                                                  // 46
  else                                                                                                                // 47
    params_for_body = options.params;                                                                                 // 48
                                                                                                                      // 49
  url = URL._constructUrl(url, options.query, params_for_url);                                                        // 50
                                                                                                                      // 51
  if (options.followRedirects === false)                                                                              // 52
    throw new Error("Option followRedirects:false not supported on client.");                                         // 53
                                                                                                                      // 54
  if (_.has(options, 'npmRequestOptions')) {                                                                          // 55
    throw new Error("Option npmRequestOptions not supported on client.");                                             // 56
  }                                                                                                                   // 57
                                                                                                                      // 58
  var username, password;                                                                                             // 59
  if (options.auth) {                                                                                                 // 60
    var colonLoc = options.auth.indexOf(':');                                                                         // 61
    if (colonLoc < 0)                                                                                                 // 62
      throw new Error('auth option should be of the form "username:password"');                                       // 63
    username = options.auth.substring(0, colonLoc);                                                                   // 64
    password = options.auth.substring(colonLoc+1);                                                                    // 65
  }                                                                                                                   // 66
                                                                                                                      // 67
  if (params_for_body) {                                                                                              // 68
    content = URL._encodeParams(params_for_body);                                                                     // 69
  }                                                                                                                   // 70
                                                                                                                      // 71
  _.extend(headers, options.headers || {});                                                                           // 72
                                                                                                                      // 73
  ////////// Callback wrapping //////////                                                                             // 74
                                                                                                                      // 75
  // wrap callback to add a 'response' property on an error, in case                                                  // 76
  // we have both (http 4xx/5xx error, which has a response payload)                                                  // 77
  callback = (function(callback) {                                                                                    // 78
    return function(error, response) {                                                                                // 79
      if (error && response)                                                                                          // 80
        error.response = response;                                                                                    // 81
      callback(error, response);                                                                                      // 82
    };                                                                                                                // 83
  })(callback);                                                                                                       // 84
                                                                                                                      // 85
  // safety belt: only call the callback once.                                                                        // 86
  callback = _.once(callback);                                                                                        // 87
                                                                                                                      // 88
                                                                                                                      // 89
  ////////// Kickoff! //////////                                                                                      // 90
                                                                                                                      // 91
  // from this point on, errors are because of something remote, not                                                  // 92
  // something we should check in advance. Turn exceptions into error                                                 // 93
  // results.                                                                                                         // 94
  try {                                                                                                               // 95
    // setup XHR object                                                                                               // 96
    var xhr;                                                                                                          // 97
    if (typeof XMLHttpRequest !== "undefined")                                                                        // 98
      xhr = new XMLHttpRequest();                                                                                     // 99
    else if (typeof ActiveXObject !== "undefined")                                                                    // 100
      xhr = new ActiveXObject("Microsoft.XMLHttp"); // IE6                                                            // 101
    else                                                                                                              // 102
      throw new Error("Can't create XMLHttpRequest"); // ???                                                          // 103
                                                                                                                      // 104
    xhr.open(method, url, true, username, password);                                                                  // 105
                                                                                                                      // 106
    for (var k in headers)                                                                                            // 107
      xhr.setRequestHeader(k, headers[k]);                                                                            // 108
                                                                                                                      // 109
                                                                                                                      // 110
    // setup timeout                                                                                                  // 111
    var timed_out = false;                                                                                            // 112
    var timer;                                                                                                        // 113
    if (options.timeout) {                                                                                            // 114
      timer = Meteor.setTimeout(function() {                                                                          // 115
        timed_out = true;                                                                                             // 116
        xhr.abort();                                                                                                  // 117
      }, options.timeout);                                                                                            // 118
    };                                                                                                                // 119
                                                                                                                      // 120
    // callback on complete                                                                                           // 121
    xhr.onreadystatechange = function(evt) {                                                                          // 122
      if (xhr.readyState === 4) { // COMPLETE                                                                         // 123
        if (timer)                                                                                                    // 124
          Meteor.clearTimeout(timer);                                                                                 // 125
                                                                                                                      // 126
        if (timed_out) {                                                                                              // 127
          callback(new Error("timeout"));                                                                             // 128
        } else if (! xhr.status) {                                                                                    // 129
          // no HTTP response                                                                                         // 130
          callback(new Error("network"));                                                                             // 131
        } else {                                                                                                      // 132
                                                                                                                      // 133
          var response = {};                                                                                          // 134
          response.statusCode = xhr.status;                                                                           // 135
          response.content = xhr.responseText;                                                                        // 136
                                                                                                                      // 137
          response.headers = {};                                                                                      // 138
          var header_str = xhr.getAllResponseHeaders();                                                               // 139
                                                                                                                      // 140
          // https://github.com/meteor/meteor/issues/553                                                              // 141
          //                                                                                                          // 142
          // In Firefox there is a weird issue, sometimes                                                             // 143
          // getAllResponseHeaders returns the empty string, but                                                      // 144
          // getResponseHeader returns correct results. Possibly this                                                 // 145
          // issue:                                                                                                   // 146
          // https://bugzilla.mozilla.org/show_bug.cgi?id=608735                                                      // 147
          //                                                                                                          // 148
          // If this happens we can't get a full list of headers, but                                                 // 149
          // at least get content-type so our JSON decoding happens                                                   // 150
          // correctly. In theory, we could try and rescue more header                                                // 151
          // values with a list of common headers, but content-type is                                                // 152
          // the only vital one for now.                                                                              // 153
          if ("" === header_str && xhr.getResponseHeader("content-type"))                                             // 154
            header_str =                                                                                              // 155
            "content-type: " + xhr.getResponseHeader("content-type");                                                 // 156
                                                                                                                      // 157
          var headers_raw = header_str.split(/\r?\n/);                                                                // 158
          _.each(headers_raw, function (h) {                                                                          // 159
            var m = /^(.*?):(?:\s+)(.*)$/.exec(h);                                                                    // 160
            if (m && m.length === 3)                                                                                  // 161
              response.headers[m[1].toLowerCase()] = m[2];                                                            // 162
          });                                                                                                         // 163
                                                                                                                      // 164
          populateData(response);                                                                                     // 165
                                                                                                                      // 166
          var error = null;                                                                                           // 167
          if (response.statusCode >= 400)                                                                             // 168
            error = makeErrorByStatus(response.statusCode, response.content);                                         // 169
                                                                                                                      // 170
          callback(error, response);                                                                                  // 171
        }                                                                                                             // 172
      }                                                                                                               // 173
    };                                                                                                                // 174
                                                                                                                      // 175
    // send it on its way                                                                                             // 176
    xhr.send(content);                                                                                                // 177
                                                                                                                      // 178
  } catch (err) {                                                                                                     // 179
    callback(err);                                                                                                    // 180
  }                                                                                                                   // 181
                                                                                                                      // 182
};                                                                                                                    // 183
                                                                                                                      // 184
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/http/deprecated.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// The HTTP object used to be called Meteor.http.                                                                     // 1
// XXX COMPAT WITH 0.6.4                                                                                              // 2
Meteor.http = HTTP;                                                                                                   // 3
                                                                                                                      // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.http = {
  HTTP: HTTP
};

})();
