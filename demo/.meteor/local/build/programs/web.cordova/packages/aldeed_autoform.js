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
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var check = Package.check.check;
var Match = Package.check.Match;
var DDP = Package.ddp.DDP;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var EJSON = Package.ejson.EJSON;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var moment = Package['momentjs:moment'].moment;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var AutoForm, Utility, FormPreserve, res, Hooks, FormData, ArrayTracker, defaultFormId, formPreserve, formData, templatesById, formValues, formDeps, inputTypeDefinitions, fd, arrayTracker, componentTypeList, Tracker, afDestroyUpdateForm, globalDefaultTemplate, defaultTypeTemplates, deps, validateFormDoc, _validateForm, _validateField, validateField, selectFirstInvalidField, getInputType, getFieldValue, getFormValues, getInputValue, getInputData, updateTrackedFieldValue, updateAllTrackedFieldValues, getAllFieldsInForm, hook;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-common.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// This is the only file that is run on the server, too                                                                // 1
                                                                                                                       // 2
// Extend the schema options allowed by SimpleSchema                                                                   // 3
SimpleSchema.extendOptions({                                                                                           // 4
  autoform: Match.Optional(Object)                                                                                     // 5
});                                                                                                                    // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/utility.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Utility = {                                                                                                            // 1
  /**                                                                                                                  // 2
   * @method Utility.cleanNulls                                                                                        // 3
   * @private                                                                                                          // 4
   * @param {Object} doc - Source object                                                                               // 5
   * @returns {Object}                                                                                                 // 6
   *                                                                                                                   // 7
   * Returns an object in which all properties with null, undefined, or empty                                          // 8
   * string values have been removed, recursively.                                                                     // 9
   */                                                                                                                  // 10
  cleanNulls: function cleanNulls(doc, isArray, keepEmptyStrings) {                                                    // 11
    var newDoc = isArray ? [] : {};                                                                                    // 12
    _.each(doc, function(val, key) {                                                                                   // 13
      if (!_.isArray(val) && isBasicObject(val)) {                                                                     // 14
        val = cleanNulls(val, false, keepEmptyStrings); //recurse into plain objects                                   // 15
        if (!_.isEmpty(val)) {                                                                                         // 16
          newDoc[key] = val;                                                                                           // 17
        }                                                                                                              // 18
      } else if (_.isArray(val)) {                                                                                     // 19
        val = cleanNulls(val, true, keepEmptyStrings); //recurse into non-typed arrays                                 // 20
        if (!_.isEmpty(val)) {                                                                                         // 21
          newDoc[key] = val;                                                                                           // 22
        }                                                                                                              // 23
      } else if (!Utility.isNullUndefinedOrEmptyString(val)) {                                                         // 24
        newDoc[key] = val;                                                                                             // 25
      } else if (keepEmptyStrings && typeof val === "string" && val.length === 0) {                                    // 26
        newDoc[key] = val;                                                                                             // 27
      }                                                                                                                // 28
    });                                                                                                                // 29
    return newDoc;                                                                                                     // 30
  },                                                                                                                   // 31
  /**                                                                                                                  // 32
   * @method Utility.reportNulls                                                                                       // 33
   * @private                                                                                                          // 34
   * @param {Object} flatDoc - An object with no properties that are also objects.                                     // 35
   * @returns {Object} An object in which the keys represent the keys in the                                           // 36
   * original object that were null, undefined, or empty strings, and the value                                        // 37
   * of each key is "".                                                                                                // 38
   */                                                                                                                  // 39
  reportNulls: function reportNulls(flatDoc, keepEmptyStrings) {                                                       // 40
    var nulls = {};                                                                                                    // 41
    // Loop through the flat doc                                                                                       // 42
    _.each(flatDoc, function(val, key) {                                                                               // 43
      // If value is undefined, null, or an empty string, report this as null so it will be unset                      // 44
      if (val === null) {                                                                                              // 45
        nulls[key] = "";                                                                                               // 46
      } else if (val === void 0) {                                                                                     // 47
        nulls[key] = "";                                                                                               // 48
      } else if (!keepEmptyStrings && typeof val === "string" && val.length === 0) {                                   // 49
        nulls[key] = "";                                                                                               // 50
      }                                                                                                                // 51
      // If value is an array in which all the values recursively are undefined, null, or an empty string, report this as null so it will be unset
      else if (_.isArray(val) && Utility.cleanNulls(val, true, keepEmptyStrings).length === 0) {                       // 53
        nulls[key] = "";                                                                                               // 54
      }                                                                                                                // 55
    });                                                                                                                // 56
    return nulls;                                                                                                      // 57
  },                                                                                                                   // 58
  /**                                                                                                                  // 59
   * @method Utility.docToModifier                                                                                     // 60
   * @private                                                                                                          // 61
   * @param {Object} doc - An object to be converted into a MongoDB modifier                                           // 62
   * @returns {Object} A MongoDB modifier.                                                                             // 63
   *                                                                                                                   // 64
   * Converts an object into a modifier by flattening it, putting keys with                                            // 65
   * null, undefined, and empty string values into `modifier.$unset`, and                                              // 66
   * putting the rest of the keys into `modifier.$set`.                                                                // 67
   */                                                                                                                  // 68
  docToModifier: function docToModifier(doc, keepEmptyStrings) {                                                       // 69
    var modifier = {};                                                                                                 // 70
                                                                                                                       // 71
    // Flatten doc                                                                                                     // 72
    var mDoc = new MongoObject(doc);                                                                                   // 73
    var flatDoc = mDoc.getFlatObject({keepArrays: true});                                                              // 74
    mDoc = null;                                                                                                       // 75
    // Get a list of null, undefined, and empty string values so we can unset them instead                             // 76
    var nulls = Utility.reportNulls(flatDoc, keepEmptyStrings);                                                        // 77
    flatDoc = Utility.cleanNulls(flatDoc, false, keepEmptyStrings);                                                    // 78
                                                                                                                       // 79
    if (!_.isEmpty(flatDoc)) {                                                                                         // 80
      modifier.$set = flatDoc;                                                                                         // 81
    }                                                                                                                  // 82
    if (!_.isEmpty(nulls)) {                                                                                           // 83
      modifier.$unset = nulls;                                                                                         // 84
    }                                                                                                                  // 85
    return modifier;                                                                                                   // 86
  },                                                                                                                   // 87
  /**                                                                                                                  // 88
   * @method Utility.getSelectValues                                                                                   // 89
   * @private                                                                                                          // 90
   * @param {Element} select - DOM Element from which to get current values                                            // 91
   * @returns {string[]}                                                                                               // 92
   *                                                                                                                   // 93
   * Gets a string array of all the selected values in a given `select` DOM element.                                   // 94
   */                                                                                                                  // 95
  getSelectValues: function getSelectValues(select) {                                                                  // 96
    var result = [];                                                                                                   // 97
    var options = select && select.options || [];                                                                      // 98
    var opt;                                                                                                           // 99
                                                                                                                       // 100
    for (var i = 0, ln = options.length; i < ln; i++) {                                                                // 101
      opt = options[i];                                                                                                // 102
                                                                                                                       // 103
      if (opt.selected) {                                                                                              // 104
        result.push(opt.value || opt.text);                                                                            // 105
      }                                                                                                                // 106
    }                                                                                                                  // 107
    return result;                                                                                                     // 108
  },                                                                                                                   // 109
  /**                                                                                                                  // 110
   * @method Utility.lookup                                                                                            // 111
   * @private                                                                                                          // 112
   * @param {Any} obj                                                                                                  // 113
   * @returns {Any}                                                                                                    // 114
   *                                                                                                                   // 115
   * If `obj` is a string, returns the value of the property with that                                                 // 116
   * name on the `window` object. Otherwise returns `obj`.                                                             // 117
   */                                                                                                                  // 118
  lookup: function lookup(obj) {                                                                                       // 119
    var ref = window, arr;                                                                                             // 120
    if (typeof obj === "string") {                                                                                     // 121
      arr = obj.split(".");                                                                                            // 122
      while(arr.length && (ref = ref[arr.shift()]));                                                                   // 123
      if (!ref) {                                                                                                      // 124
        throw new Error(obj + " is not in the window scope");                                                          // 125
      }                                                                                                                // 126
      return ref;                                                                                                      // 127
    }                                                                                                                  // 128
    return obj;                                                                                                        // 129
  },                                                                                                                   // 130
  /**                                                                                                                  // 131
   * @method Utility.getDefs                                                                                           // 132
   * @private                                                                                                          // 133
   * @param {SimpleSchema} ss                                                                                          // 134
   * @param {String} name                                                                                              // 135
   * @return {Object} Schema definitions object                                                                        // 136
   *                                                                                                                   // 137
   * Returns the schema definitions object from a SimpleSchema instance. Equivalent to calling                         // 138
   * `ss.schema(name)` but handles throwing errors if `name` is not a string or is not a valid                         // 139
   * field name for this SimpleSchema instance.                                                                        // 140
   */                                                                                                                  // 141
  getDefs: function getDefs(ss, name) {                                                                                // 142
    if (typeof name !== "string") {                                                                                    // 143
      throw new Error("Invalid field name: (not a string)");                                                           // 144
    }                                                                                                                  // 145
                                                                                                                       // 146
    var defs = ss.schema(name);                                                                                        // 147
    if (!defs)                                                                                                         // 148
      throw new Error("Invalid field name: " + name);                                                                  // 149
    return defs;                                                                                                       // 150
  },                                                                                                                   // 151
  /**                                                                                                                  // 152
   * @method Utility.objAffectsKey                                                                                     // 153
   * @private                                                                                                          // 154
   * @param  {Object} obj                                                                                              // 155
   * @param  {String} key                                                                                              // 156
   * @return {Boolean}                                                                                                 // 157
   * @todo should make this a static method in MongoObject                                                             // 158
   */                                                                                                                  // 159
  objAffectsKey: function objAffectsKey(obj, key) {                                                                    // 160
    var mDoc = new MongoObject(obj);                                                                                   // 161
    return mDoc.affectsKey(key);                                                                                       // 162
  },                                                                                                                   // 163
  /**                                                                                                                  // 164
   * @method Utility.expandObj                                                                                         // 165
   * @private                                                                                                          // 166
   * @param  {Object} doc                                                                                              // 167
   * @return {Object}                                                                                                  // 168
   *                                                                                                                   // 169
   * Takes a flat object and returns an expanded version of it.                                                        // 170
   */                                                                                                                  // 171
  expandObj: function expandObj(doc) {                                                                                 // 172
    var newDoc = {}, subkeys, subkey, subkeylen, nextPiece, current;                                                   // 173
    _.each(doc, function(val, key) {                                                                                   // 174
      subkeys = key.split(".");                                                                                        // 175
      subkeylen = subkeys.length;                                                                                      // 176
      current = newDoc;                                                                                                // 177
      for (var i = 0; i < subkeylen; i++) {                                                                            // 178
        subkey = subkeys[i];                                                                                           // 179
        if (typeof current[subkey] !== "undefined" && !_.isObject(current[subkey])) {                                  // 180
          break; //already set for some reason; leave it alone                                                         // 181
        }                                                                                                              // 182
        if (i === subkeylen - 1) {                                                                                     // 183
          //last iteration; time to set the value                                                                      // 184
          current[subkey] = val;                                                                                       // 185
        } else {                                                                                                       // 186
          //see if the next piece is a number                                                                          // 187
          nextPiece = subkeys[i + 1];                                                                                  // 188
          nextPiece = parseInt(nextPiece, 10);                                                                         // 189
          if (isNaN(nextPiece) && !_.isObject(current[subkey])) {                                                      // 190
            current[subkey] = {};                                                                                      // 191
          } else if (!isNaN(nextPiece) && !_.isArray(current[subkey])) {                                               // 192
            current[subkey] = [];                                                                                      // 193
          }                                                                                                            // 194
        }                                                                                                              // 195
        current = current[subkey];                                                                                     // 196
      }                                                                                                                // 197
    });                                                                                                                // 198
    return newDoc;                                                                                                     // 199
  },                                                                                                                   // 200
  /**                                                                                                                  // 201
   * @method Utility.compactArrays                                                                                     // 202
   * @private                                                                                                          // 203
   * @param  {Object} obj                                                                                              // 204
   * @return {undefined}                                                                                               // 205
   *                                                                                                                   // 206
   * Edits the object by reference, compacting any arrays at any level recursively.                                    // 207
   */                                                                                                                  // 208
  compactArrays: function compactArrays(obj) {                                                                         // 209
    if (_.isObject(obj)) {                                                                                             // 210
      _.each(obj, function (val, key) {                                                                                // 211
        if (_.isArray(val)) {                                                                                          // 212
          obj[key] = _.without(val, void 0, null);                                                                     // 213
          _.each(obj[key], function (arrayItem) {                                                                      // 214
            compactArrays(arrayItem);                                                                                  // 215
          });                                                                                                          // 216
        } else if (!(val instanceof Date) && _.isObject(val)) {                                                        // 217
          //recurse into objects                                                                                       // 218
          compactArrays(val);                                                                                          // 219
        }                                                                                                              // 220
      });                                                                                                              // 221
    }                                                                                                                  // 222
  },                                                                                                                   // 223
  /**                                                                                                                  // 224
   * @method Utility.bubbleEmpty                                                                                       // 225
   * @private                                                                                                          // 226
   * @param  {Object} obj                                                                                              // 227
   * @return {undefined}                                                                                               // 228
   *                                                                                                                   // 229
   * Edits the object by reference.                                                                                    // 230
   */                                                                                                                  // 231
  bubbleEmpty: function bubbleEmpty(obj, keepEmptyStrings) {                                                           // 232
    if (_.isObject(obj)) {                                                                                             // 233
      _.each(obj, function (val, key) {                                                                                // 234
        if (_.isArray(val)) {                                                                                          // 235
          _.each(val, function (arrayItem) {                                                                           // 236
            bubbleEmpty(arrayItem);                                                                                    // 237
          });                                                                                                          // 238
        } else if (isBasicObject(val)) {                                                                               // 239
          var allEmpty = _.all(val, function (prop) {                                                                  // 240
            return (prop === void 0 || prop === null || (!keepEmptyStrings && typeof prop === "string" && prop.length === 0));
          });                                                                                                          // 242
          if (_.isEmpty(val) || allEmpty) {                                                                            // 243
            obj[key] = null;                                                                                           // 244
          } else {                                                                                                     // 245
            //recurse into objects                                                                                     // 246
            bubbleEmpty(val);                                                                                          // 247
          }                                                                                                            // 248
        }                                                                                                              // 249
      });                                                                                                              // 250
    }                                                                                                                  // 251
  },                                                                                                                   // 252
  /**                                                                                                                  // 253
   * @method Utility.getSimpleSchemaFromContext                                                                        // 254
   * @private                                                                                                          // 255
   * @param  {Object} context                                                                                          // 256
   * @return {SimpleSchema}                                                                                            // 257
   *                                                                                                                   // 258
   * Given a context object that may or may not have schema and collection properties,                                 // 259
   * returns a SimpleSchema instance or throws an error if one cannot be obtained.                                     // 260
   */                                                                                                                  // 261
  getSimpleSchemaFromContext: function getSimpleSchemaFromContext(context, formId) {                                   // 262
    // If schema attribute, use that                                                                                   // 263
    var ss = Utility.lookup(context.schema);                                                                           // 264
    if (ss) {                                                                                                          // 265
      if (ss instanceof SimpleSchema) {                                                                                // 266
        return ss;                                                                                                     // 267
      } else {                                                                                                         // 268
        throw new Error('AutoForm: schema attribute for form with id "' + formId + '" is not a SimpleSchema instance');
      }                                                                                                                // 270
    }                                                                                                                  // 271
    // If no schema attribute, use the schema attached to the collection                                               // 272
    var collection = Utility.lookup(context.collection);                                                               // 273
    if (collection) {                                                                                                  // 274
      if (typeof collection.simpleSchema === 'function') {                                                             // 275
        return collection.simpleSchema();                                                                              // 276
      } else {                                                                                                         // 277
        throw new Error('AutoForm: collection attribute for form with id "' + formId + '" refers to a collection that does not have a schema, or is not a collection. You might have forgotten to attach a schema to the collection or you might need to add the collection2 package to your app.');
      }                                                                                                                // 279
    }                                                                                                                  // 280
    // If we got this far, we have no schema so throw an error                                                         // 281
    throw new Error('AutoForm: form with id "' + formId + '" needs either "schema" or "collection" attribute');        // 282
  },                                                                                                                   // 283
  /**                                                                                                                  // 284
   * @method Utility.isNullUndefinedOrEmptyString                                                                      // 285
   * @private                                                                                                          // 286
   * @param  {Any} val                                                                                                 // 287
   * @return {Boolean}                                                                                                 // 288
   *                                                                                                                   // 289
   * Returns `true` if the value is null, undefined, or an empty string                                                // 290
   */                                                                                                                  // 291
  isNullUndefinedOrEmptyString: function isNullUndefinedOrEmptyString(val) {                                           // 292
    return (val === void 0 || val === null || (typeof val === "string" && val.length === 0));                          // 293
  },                                                                                                                   // 294
  /**                                                                                                                  // 295
   * @method Utility.isValidDateString                                                                                 // 296
   * @private                                                                                                          // 297
   * @param  {String}  dateString                                                                                      // 298
   * @return {Boolean}                                                                                                 // 299
   *                                                                                                                   // 300
   * Returns `true` if dateString is a "valid date string"                                                             // 301
   */                                                                                                                  // 302
  isValidDateString: function isValidDateString(dateString) {                                                          // 303
    var m = moment(dateString, 'YYYY-MM-DD', true);                                                                    // 304
    return m && m.isValid();                                                                                           // 305
  },                                                                                                                   // 306
  /**                                                                                                                  // 307
   * @method Utility.isValidTimeString                                                                                 // 308
   * @private                                                                                                          // 309
   * @param  {String}  timeString                                                                                      // 310
   * @return {Boolean}                                                                                                 // 311
   *                                                                                                                   // 312
   * Returns `true` if timeString is a "valid time string"                                                             // 313
   */                                                                                                                  // 314
  isValidTimeString: function isValidTimeString(timeString) {                                                          // 315
    if (typeof timeString !== "string")                                                                                // 316
      return false;                                                                                                    // 317
                                                                                                                       // 318
    //this reg ex actually allows a few invalid hours/minutes/seconds, but                                             // 319
    //we can catch that when parsing                                                                                   // 320
    var regEx = /^[0-2][0-9]:[0-5][0-9](:[0-5][0-9](\.[0-9]{1,3})?)?$/;                                                // 321
    return regEx.test(timeString);                                                                                     // 322
  },                                                                                                                   // 323
  /**                                                                                                                  // 324
   * @method  Utility.dateToDateString                                                                                 // 325
   * @private                                                                                                          // 326
   * @param  {Date} date                                                                                               // 327
   * @return {String}                                                                                                  // 328
   *                                                                                                                   // 329
   * Returns a "valid date string" representing the local date.                                                        // 330
   */                                                                                                                  // 331
  dateToDateString: function dateToDateString(date) {                                                                  // 332
    var m = (date.getMonth() + 1);                                                                                     // 333
    if (m < 10) {                                                                                                      // 334
      m = "0" + m;                                                                                                     // 335
    }                                                                                                                  // 336
    var d = date.getDate();                                                                                            // 337
    if (d < 10) {                                                                                                      // 338
      d = "0" + d;                                                                                                     // 339
    }                                                                                                                  // 340
    return date.getFullYear() + '-' + m + '-' + d;                                                                     // 341
  },                                                                                                                   // 342
  /**                                                                                                                  // 343
   * @method  Utility.dateToDateStringUTC                                                                              // 344
   * @private                                                                                                          // 345
   * @param  {Date} date                                                                                               // 346
   * @return {String}                                                                                                  // 347
   *                                                                                                                   // 348
   * Returns a "valid date string" representing the date converted to the UTC time zone.                               // 349
   */                                                                                                                  // 350
  dateToDateStringUTC: function dateToDateStringUTC(date) {                                                            // 351
    var m = (date.getUTCMonth() + 1);                                                                                  // 352
    if (m < 10) {                                                                                                      // 353
      m = "0" + m;                                                                                                     // 354
    }                                                                                                                  // 355
    var d = date.getUTCDate();                                                                                         // 356
    if (d < 10) {                                                                                                      // 357
      d = "0" + d;                                                                                                     // 358
    }                                                                                                                  // 359
    return date.getUTCFullYear() + '-' + m + '-' + d;                                                                  // 360
  },                                                                                                                   // 361
  /**                                                                                                                  // 362
   * @method  Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString                                                 // 363
   * @private                                                                                                          // 364
   * @param  {Date} date                                                                                               // 365
   * @return {String}                                                                                                  // 366
   *                                                                                                                   // 367
   * Returns a "valid normalized forced-UTC global date and time string" representing the time                         // 368
   * converted to the UTC time zone and expressed as the shortest possible string for the given                        // 369
   * time (e.g. omitting the seconds component entirely if the given time is zero seconds past the minute).            // 370
   *                                                                                                                   // 371
   * http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#date-and-time-state-(type=datetime)
   * http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#valid-normalized-forced-utc-global-date-and-time-string
   */                                                                                                                  // 374
  dateToNormalizedForcedUtcGlobalDateAndTimeString: function dateToNormalizedForcedUtcGlobalDateAndTimeString(date) {  // 375
    return moment(date).utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");                                                  // 376
  },                                                                                                                   // 377
  /**                                                                                                                  // 378
   * @method  Utility.isValidNormalizedForcedUtcGlobalDateAndTimeString                                                // 379
   * @private                                                                                                          // 380
   * @param  {String} dateString                                                                                       // 381
   * @return {Boolean}                                                                                                 // 382
   *                                                                                                                   // 383
   * Returns true if dateString is a "valid normalized forced-UTC global date and time string"                         // 384
   */                                                                                                                  // 385
  isValidNormalizedForcedUtcGlobalDateAndTimeString: function isValidNormalizedForcedUtcGlobalDateAndTimeString(dateString) {
    if (typeof dateString !== "string")                                                                                // 387
      return false;                                                                                                    // 388
                                                                                                                       // 389
    var datePart = dateString.substring(0, 10);                                                                        // 390
    var tPart = dateString.substring(10, 11);                                                                          // 391
    var timePart = dateString.substring(11, dateString.length - 1);                                                    // 392
    var zPart = dateString.substring(dateString.length - 1);                                                           // 393
    return Utility.isValidDateString(datePart) && tPart === "T" && Utility.isValidTimeString(timePart) && zPart === "Z";
  },                                                                                                                   // 395
  /**                                                                                                                  // 396
   * @method Utility.dateToNormalizedLocalDateAndTimeString                                                            // 397
   * @private                                                                                                          // 398
   * @param {Date} date The Date object                                                                                // 399
   * @param {String} [timezoneId] A valid timezoneId that moment-timezone understands, e.g., "America/Los_Angeles"     // 400
   * @return {String}                                                                                                  // 401
   *                                                                                                                   // 402
   * Returns a "valid normalized local date and time string".                                                          // 403
   */                                                                                                                  // 404
  dateToNormalizedLocalDateAndTimeString: function dateToNormalizedLocalDateAndTimeString(date, timezoneId) {          // 405
    var m = moment(date);                                                                                              // 406
    // by default, we assume local timezone; add moment-timezone to app and pass timezoneId                            // 407
    // to use a different timezone                                                                                     // 408
    if (typeof timezoneId === "string") {                                                                              // 409
      if (typeof m.tz !== "function") {                                                                                // 410
        throw new Error("If you specify a timezoneId, make sure that you've added a moment-timezone package to your app");
      }                                                                                                                // 412
      m.tz(timezoneId);                                                                                                // 413
    }                                                                                                                  // 414
    return m.format("YYYY-MM-DD[T]HH:mm:ss.SSS");                                                                      // 415
  },                                                                                                                   // 416
  /**                                                                                                                  // 417
   * @method  Utility.isValidNormalizedLocalDateAndTimeString                                                          // 418
   * @private                                                                                                          // 419
   * @param  {String} dtString                                                                                         // 420
   * @return {Boolean}                                                                                                 // 421
   *                                                                                                                   // 422
   * Returns true if dtString is a "valid normalized local date and time string"                                       // 423
   */                                                                                                                  // 424
  isValidNormalizedLocalDateAndTimeString: function isValidNormalizedLocalDateAndTimeString(dtString) {                // 425
    if (typeof dtString !== "string")                                                                                  // 426
      return false;                                                                                                    // 427
                                                                                                                       // 428
    var datePart = dtString.substring(0, 10);                                                                          // 429
    var tPart = dtString.substring(10, 11);                                                                            // 430
    var timePart = dtString.substring(11, dtString.length);                                                            // 431
    return Utility.isValidDateString(datePart) && tPart === "T" && Utility.isValidTimeString(timePart);                // 432
  },                                                                                                                   // 433
  /**                                                                                                                  // 434
   * @method Utility.normalizeContext                                                                                  // 435
   * @private                                                                                                          // 436
   * @param  {Object} context A context object, potentially with an `atts` property.                                   // 437
   * @param {String} name The name of the helper or component we're calling from.                                      // 438
   * @return {Object} Normalized context object                                                                        // 439
   *                                                                                                                   // 440
   * Returns an object with `afc`, `af`, and `atts` properties, normalized from whatever object is passed in.          // 441
   * This helps deal with the fact that we have to pass the ancestor autoform's context to different                   // 442
   * helpers and components in different ways, but in all cases we want to get access to it and throw                  // 443
   * an error if we can't find an autoform context.                                                                    // 444
   */                                                                                                                  // 445
  normalizeContext: function autoFormNormalizeContext(context, name) {                                                 // 446
    var atts, autoform, defs, itemDefs, allowedValues, formComponentAttributes,                                        // 447
      fieldAttributes, fieldAttributesForComponentType;                                                                // 448
                                                                                                                       // 449
    context = context || {};                                                                                           // 450
    atts = context.atts ? _.clone(context.atts) : _.clone(context);                                                    // 451
    autoform = AutoForm.find(name);                                                                                    // 452
    defs = Utility.getDefs(autoform.ss, atts.name); //defs will not be undefined                                       // 453
                                                                                                                       // 454
    // For array fields, `allowedValues` is on the array item definition                                               // 455
    if (defs.type === Array) {                                                                                         // 456
      itemDefs = Utility.getDefs(autoform.ss, atts.name + ".$");                                                       // 457
      allowedValues = itemDefs.allowedValues;                                                                          // 458
    } else {                                                                                                           // 459
      allowedValues = defs.allowedValues;                                                                              // 460
    }                                                                                                                  // 461
                                                                                                                       // 462
    // Look up the tree if we're in a helper, checking to see if any ancestor components                               // 463
    // had a <componentType>-attribute specified.                                                                      // 464
    formComponentAttributes = AutoForm.findAttributesWithPrefix(name + "-");                                           // 465
                                                                                                                       // 466
    // Get any field-specific attributes defined in the schema.                                                        // 467
    // They can be in autoform.attrName or autoform.componentType.attrName, with                                       // 468
    // the latter overriding the former.                                                                               // 469
    fieldAttributes = _.clone(defs.autoform) || {};                                                                    // 470
    fieldAttributesForComponentType = fieldAttributes[name] || {};                                                     // 471
    fieldAttributes = _.omit(fieldAttributes, componentTypeList);                                                      // 472
    fieldAttributes = _.extend({}, fieldAttributes, fieldAttributesForComponentType);                                  // 473
                                                                                                                       // 474
    // If options="auto", we want to use defs.autoform.options                                                         // 475
    // if specified and otherwise fall back to "allowed"                                                               // 476
    if (fieldAttributes.options && atts.options === "auto")                                                            // 477
      delete atts.options;                                                                                             // 478
                                                                                                                       // 479
    // "autoform" option in the schema provides default atts                                                           // 480
    atts = _.extend({}, formComponentAttributes, fieldAttributes, atts);                                               // 481
                                                                                                                       // 482
    // If still set to "auto", then there were no options in defs, so we use "allowed"                                 // 483
    if (atts.options === "auto") {                                                                                     // 484
      if (allowedValues) {                                                                                             // 485
        atts.options = "allowed";                                                                                      // 486
      } else {                                                                                                         // 487
        delete atts.options;                                                                                           // 488
      }                                                                                                                // 489
    }                                                                                                                  // 490
                                                                                                                       // 491
    return {                                                                                                           // 492
      af: autoform,                                                                                                    // 493
      atts: atts,                                                                                                      // 494
      defs: defs                                                                                                       // 495
    };                                                                                                                 // 496
  },                                                                                                                   // 497
  /**                                                                                                                  // 498
   * @method Utility.stringToArray                                                                                     // 499
   * @private                                                                                                          // 500
   * @param {String|Array} s A variable that might be a string or an array.                                            // 501
   * @param {String} errorMessage Error message to use if it's not a string or an array.                               // 502
   * @return {Array} The array, building it from a comma-delimited string if necessary.                                // 503
   */                                                                                                                  // 504
  stringToArray: function stringToArray(s, errorMessage) {                                                             // 505
    if (typeof s === "string") {                                                                                       // 506
      return s.replace(/ /g, '').split(',');                                                                           // 507
    } else if (!_.isArray(s)) {                                                                                        // 508
      throw new Error(errorMessage);                                                                                   // 509
    } else {                                                                                                           // 510
      return s;                                                                                                        // 511
    }                                                                                                                  // 512
  },                                                                                                                   // 513
  /**                                                                                                                  // 514
   * @method Utility.stringToBool                                                                                      // 515
   * @private                                                                                                          // 516
   * @param {String} val A string or null or undefined.                                                                // 517
   * @return {Boolean|String} The string converted to a Boolean.                                                       // 518
   *                                                                                                                   // 519
   * If the string is "true" or "1", returns `true`. If the string is "false" or "0", returns `false`. Otherwise returns the original string.
   */                                                                                                                  // 521
  stringToBool: function stringToBool(val) {                                                                           // 522
    if (typeof val === "string" && val.length > 0) {                                                                   // 523
      var lval = val.toLowerCase();                                                                                    // 524
      if (lval === "true" || lval === "1") {                                                                           // 525
        return true;                                                                                                   // 526
      } else if (lval === "false" || lval === "0") {                                                                   // 527
        return false;                                                                                                  // 528
      }                                                                                                                // 529
    }                                                                                                                  // 530
    return val;                                                                                                        // 531
  },                                                                                                                   // 532
  /**                                                                                                                  // 533
   * @method Utility.stringToNumber                                                                                    // 534
   * @private                                                                                                          // 535
   * @param {String} val A string or null or undefined.                                                                // 536
   * @return {Number|String} The string converted to a Number or the original value.                                   // 537
   *                                                                                                                   // 538
   * Returns Number(val) unless the result is NaN.                                                                     // 539
   */                                                                                                                  // 540
  stringToNumber: function stringToNumber(val) {                                                                       // 541
    if (typeof val === "string" && val.length > 0) {                                                                   // 542
      var numVal = Number(val);                                                                                        // 543
      if (!isNaN(numVal)) {                                                                                            // 544
        return numVal;                                                                                                 // 545
      }                                                                                                                // 546
    }                                                                                                                  // 547
    return val;                                                                                                        // 548
  },                                                                                                                   // 549
  /**                                                                                                                  // 550
   * @method Utility.stringToDate                                                                                      // 551
   * @private                                                                                                          // 552
   * @param {String} val A string or null or undefined.                                                                // 553
   * @return {Date|String} The string converted to a Date instance.                                                    // 554
   *                                                                                                                   // 555
   * Returns new Date(val) as long as val is a string with at least one character. Otherwise returns the original string.
   */                                                                                                                  // 557
  stringToDate: function stringToDate(val) {                                                                           // 558
    if (typeof val === "string" && val.length > 0) {                                                                   // 559
      return new Date(val);                                                                                            // 560
    }                                                                                                                  // 561
    return val;                                                                                                        // 562
  },                                                                                                                   // 563
  /**                                                                                                                  // 564
   * @method Utility.addClass                                                                                          // 565
   * @private                                                                                                          // 566
   * @param {Object} atts An object that might have a "class" property                                                 // 567
   * @param {String} klass The class string to add                                                                     // 568
   * @return {Object} The object with klass added to the "class" property, creating the property if necessary          // 569
   */                                                                                                                  // 570
  addClass: function addClass(atts, klass) {                                                                           // 571
    if (typeof atts["class"] === "string") {                                                                           // 572
      atts["class"] += " " + klass;                                                                                    // 573
    } else {                                                                                                           // 574
      atts["class"] = klass;                                                                                           // 575
    }                                                                                                                  // 576
    return atts;                                                                                                       // 577
  }                                                                                                                    // 578
};                                                                                                                     // 579
                                                                                                                       // 580
                                                                                                                       // 581
// getPrototypeOf polyfill                                                                                             // 582
if (typeof Object.getPrototypeOf !== "function") {                                                                     // 583
  if (typeof "".__proto__ === "object") {                                                                              // 584
    Object.getPrototypeOf = function(object) {                                                                         // 585
      return object.__proto__;                                                                                         // 586
    };                                                                                                                 // 587
  } else {                                                                                                             // 588
    Object.getPrototypeOf = function(object) {                                                                         // 589
      // May break if the constructor has been tampered with                                                           // 590
      return object.constructor.prototype;                                                                             // 591
    };                                                                                                                 // 592
  }                                                                                                                    // 593
}                                                                                                                      // 594
                                                                                                                       // 595
/* Tests whether "obj" is an Object as opposed to                                                                      // 596
 * something that inherits from Object                                                                                 // 597
 *                                                                                                                     // 598
 * @param {any} obj                                                                                                    // 599
 * @returns {Boolean}                                                                                                  // 600
 */                                                                                                                    // 601
var isBasicObject = function(obj) {                                                                                    // 602
  return _.isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;                                           // 603
};                                                                                                                     // 604
                                                                                                                       // 605
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/form-preserve.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @constructor                                                                                                        // 2
 * @private                                                                                                            // 3
 * @param {String} migrationName                                                                                       // 4
 *                                                                                                                     // 5
 * Internal helper object to preserve form inputs across Hot Code Push                                                 // 6
 * and across "pages" navigation if the option is enabled.                                                             // 7
 */                                                                                                                    // 8
FormPreserve = function formPreserveConstructor(migrationName) {                                                       // 9
  var self = this;                                                                                                     // 10
  if (! _.isString(migrationName))                                                                                     // 11
    throw Error("You must define an unique migration name of type String");                                            // 12
  self.registeredForms = {};                                                                                           // 13
  self.retrievedDocuments = {};                                                                                        // 14
  if (Package.reload) {                                                                                                // 15
    var Reload = Package.reload.Reload;                                                                                // 16
    self.retrievedDocuments = Reload._migrationData(migrationName) || {};                                              // 17
    Reload._onMigrate(migrationName, function () {                                                                     // 18
      return [true, self._retrieveRegisteredDocuments()];                                                              // 19
    });                                                                                                                // 20
  }                                                                                                                    // 21
};                                                                                                                     // 22
                                                                                                                       // 23
FormPreserve.prototype.getDocument = function (formId) {                                                               // 24
  var self = this;                                                                                                     // 25
  if (! _.has(self.retrievedDocuments, formId))                                                                        // 26
    return false;                                                                                                      // 27
  else                                                                                                                 // 28
    return self.retrievedDocuments[formId];                                                                            // 29
};                                                                                                                     // 30
                                                                                                                       // 31
FormPreserve.prototype.clearDocument = function (formId) {                                                             // 32
  delete this.retrievedDocuments[formId];                                                                              // 33
};                                                                                                                     // 34
                                                                                                                       // 35
FormPreserve.prototype.registerForm = function (formId, retrieveFunc) {                                                // 36
  this.registeredForms[formId] = retrieveFunc;                                                                         // 37
};                                                                                                                     // 38
                                                                                                                       // 39
FormPreserve.prototype.formIsRegistered = function (formId) {                                                          // 40
  return !!this.registeredForms[formId];                                                                               // 41
};                                                                                                                     // 42
                                                                                                                       // 43
FormPreserve.prototype.unregisterForm = function (formId) {                                                            // 44
  delete this.registeredForms[formId];                                                                                 // 45
  delete this.retrievedDocuments[formId];                                                                              // 46
};                                                                                                                     // 47
                                                                                                                       // 48
FormPreserve.prototype.unregisterAllForms = function () {                                                              // 49
  var self = this;                                                                                                     // 50
  self.registeredForms = {};                                                                                           // 51
  self.retrievedDocuments = {};                                                                                        // 52
};                                                                                                                     // 53
                                                                                                                       // 54
FormPreserve.prototype._retrieveRegisteredDocuments = function () {                                                    // 55
  var self = this;                                                                                                     // 56
  res = {};                                                                                                            // 57
  _.each(self.registeredForms, function (retrieveFunc, formId) {                                                       // 58
    res[formId] = retrieveFunc();                                                                                      // 59
  });                                                                                                                  // 60
  return res;                                                                                                          // 61
};                                                                                                                     // 62
                                                                                                                       // 63
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-hooks.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Manages all hooks, supporting append/replace, get                                                                   // 1
                                                                                                                       // 2
Hooks = {                                                                                                              // 3
  form: {},                                                                                                            // 4
  global: {                                                                                                            // 5
    before: {},                                                                                                        // 6
    after: {},                                                                                                         // 7
    formToDoc: [],                                                                                                     // 8
    docToForm: [],                                                                                                     // 9
    onSubmit: [],                                                                                                      // 10
    onSuccess: [],                                                                                                     // 11
    onError: [],                                                                                                       // 12
    beginSubmit: [],                                                                                                   // 13
    endSubmit: []                                                                                                      // 14
  }                                                                                                                    // 15
};                                                                                                                     // 16
                                                                                                                       // 17
Hooks.addHooksToList = function addHooksToList(hooksList, hooks, replace) {                                            // 18
  // Add before hooks                                                                                                  // 19
  hooks.before && _.each(hooks.before, function autoFormBeforeHooksEach(func, type) {                                  // 20
    if (typeof func !== "function") {                                                                                  // 21
      throw new Error("AutoForm before hook must be a function, not " + typeof func);                                  // 22
    }                                                                                                                  // 23
    hooksList.before[type] = (!replace && hooksList.before[type]) ? hooksList.before[type] : [];                       // 24
    hooksList.before[type].push(func);                                                                                 // 25
  });                                                                                                                  // 26
                                                                                                                       // 27
  // Add after hooks                                                                                                   // 28
  hooks.after && _.each(hooks.after, function autoFormAfterHooksEach(func, type) {                                     // 29
    if (typeof func !== "function") {                                                                                  // 30
      throw new Error("AutoForm after hook must be a function, not " + typeof func);                                   // 31
    }                                                                                                                  // 32
    hooksList.after[type] = (!replace && hooksList.after[type]) ? hooksList.after[type] : [];                          // 33
    hooksList.after[type].push(func);                                                                                  // 34
  });                                                                                                                  // 35
                                                                                                                       // 36
  // Add all other hooks                                                                                               // 37
  _.each(['formToDoc', 'docToForm', 'onSubmit', 'onSuccess', 'onError', 'beginSubmit', 'endSubmit'], function autoFormHooksEach(name) {
    if (hooks[name]) {                                                                                                 // 39
      if (typeof hooks[name] !== "function") {                                                                         // 40
        throw new Error("AutoForm " + name + " hook must be a function, not " + typeof hooks[name]);                   // 41
      }                                                                                                                // 42
                                                                                                                       // 43
      if(replace) {                                                                                                    // 44
          hooksList[name] = [];                                                                                        // 45
      }                                                                                                                // 46
                                                                                                                       // 47
      hooksList[name].push(hooks[name]);                                                                               // 48
    }                                                                                                                  // 49
  });                                                                                                                  // 50
};                                                                                                                     // 51
                                                                                                                       // 52
Hooks.getHooks = function getHooks(formId, type, subtype) {                                                            // 53
  var f, g;                                                                                                            // 54
  if (subtype) {                                                                                                       // 55
    f = Hooks.form[formId] && Hooks.form[formId][type] && Hooks.form[formId][type][subtype] || [];                     // 56
    g = Hooks.global[type] && Hooks.global[type][subtype] || [];                                                       // 57
  } else {                                                                                                             // 58
    f = Hooks.form[formId] && Hooks.form[formId][type] || [];                                                          // 59
    g = Hooks.global[type] || [];                                                                                      // 60
  }                                                                                                                    // 61
  return f.concat(g);                                                                                                  // 62
};                                                                                                                     // 63
                                                                                                                       // 64
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-formdata.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Tracks form data; particularly needed to track the number of items in arrays in the doc                             // 1
                                                                                                                       // 2
FormData = function afFormData() {                                                                                     // 3
	var self = this;                                                                                                      // 4
	self.forms = {};                                                                                                      // 5
};                                                                                                                     // 6
                                                                                                                       // 7
FormData.prototype.initForm = function fdInitForm(formId) {                                                            // 8
	var self = this;                                                                                                      // 9
                                                                                                                       // 10
	if (self.forms[formId])                                                                                               // 11
		return;                                                                                                              // 12
                                                                                                                       // 13
	self.forms[formId] = {                                                                                                // 14
		sourceDoc: null,                                                                                                     // 15
		deps: {                                                                                                              // 16
			sourceDoc: new Tracker.Dependency()                                                                                 // 17
		}                                                                                                                    // 18
	};                                                                                                                    // 19
};                                                                                                                     // 20
                                                                                                                       // 21
FormData.prototype.sourceDoc = function fdSourceDoc(formId, sourceDoc) {                                               // 22
	var self = this;                                                                                                      // 23
	self.initForm(formId);                                                                                                // 24
                                                                                                                       // 25
	if (sourceDoc) {                                                                                                      // 26
		//setter                                                                                                             // 27
		self.forms[formId].sourceDoc = sourceDoc;                                                                            // 28
		self.forms[formId].deps.sourceDoc.changed();                                                                         // 29
	} else {                                                                                                              // 30
		//getter                                                                                                             // 31
		self.forms[formId].deps.sourceDoc.depend();                                                                          // 32
		return self.forms[formId].sourceDoc;                                                                                 // 33
	}                                                                                                                     // 34
};                                                                                                                     // 35
                                                                                                                       // 36
FormData.prototype.getDocCountForField = function fdGetDocCountForField(formId, field) {                               // 37
	var self = this;                                                                                                      // 38
	var mDoc = self.sourceDoc(formId);                                                                                    // 39
	var docCount;                                                                                                         // 40
	if (mDoc) {                                                                                                           // 41
		var keyInfo = mDoc.getInfoForKey(field);                                                                             // 42
		if (keyInfo && _.isArray(keyInfo.value)) {                                                                           // 43
			docCount = keyInfo.value.length                                                                                     // 44
		}                                                                                                                    // 45
	}                                                                                                                     // 46
	return docCount;                                                                                                      // 47
};                                                                                                                     // 48
                                                                                                                       // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-arrays.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Track arrays; this allows us to add/remove fields or groups of fields for an array                                  // 1
// but still easily respect minCount and maxCount, and properly add/remove the same                                    // 2
// items from the database once the form is submitted.                                                                 // 3
                                                                                                                       // 4
ArrayTracker = function afArrayTracker() {                                                                             // 5
  var self = this;                                                                                                     // 6
  self.info = {};                                                                                                      // 7
};                                                                                                                     // 8
                                                                                                                       // 9
ArrayTracker.prototype.getMinMax = function atGetMinMax(ss, field, overrideMinCount, overrideMaxCount) {               // 10
  var defs = AutoForm.Utility.getDefs(ss, field);                                                                      // 11
                                                                                                                       // 12
  // minCount is set by the schema, but can be set higher on the field attribute                                       // 13
  overrideMinCount = overrideMinCount || 0;                                                                            // 14
  var minCount = defs.minCount || 0;                                                                                   // 15
  minCount = Math.max(overrideMinCount, minCount);                                                                     // 16
                                                                                                                       // 17
  // maxCount is set by the schema, but can be set lower on the field attribute                                        // 18
  overrideMaxCount = overrideMaxCount || Infinity;                                                                     // 19
  var maxCount = defs.maxCount || Infinity;                                                                            // 20
  maxCount = Math.min(overrideMaxCount, maxCount);                                                                     // 21
                                                                                                                       // 22
  return {minCount: minCount, maxCount: maxCount};                                                                     // 23
};                                                                                                                     // 24
                                                                                                                       // 25
ArrayTracker.prototype.initForm = function atInitForm(formId) {                                                        // 26
	var self = this;                                                                                                      // 27
                                                                                                                       // 28
	if (self.info[formId])                                                                                                // 29
		return;                                                                                                              // 30
                                                                                                                       // 31
	self.info[formId] = {};                                                                                               // 32
};                                                                                                                     // 33
                                                                                                                       // 34
ArrayTracker.prototype.getForm = function atInitForm(formId) {                                                         // 35
	var self = this;                                                                                                      // 36
	self.initForm(formId);                                                                                                // 37
	return self.info[formId];                                                                                             // 38
};                                                                                                                     // 39
                                                                                                                       // 40
ArrayTracker.prototype.ensureField = function atEnsureField(formId, field) {                                           // 41
	var self = this;                                                                                                      // 42
	self.initForm(formId);                                                                                                // 43
                                                                                                                       // 44
	if (!self.info[formId][field]) {                                                                                      // 45
		self.resetField(formId, field);                                                                                      // 46
	}                                                                                                                     // 47
};                                                                                                                     // 48
                                                                                                                       // 49
ArrayTracker.prototype.initField = function atInitField(formId, field, ss, docCount, overrideMinCount, overrideMaxCount) {
	var self = this;                                                                                                      // 51
	self.ensureField(formId, field);                                                                                      // 52
                                                                                                                       // 53
	if (self.info[formId][field].array != null)                                                                           // 54
		return;                                                                                                              // 55
                                                                                                                       // 56
	// If we have a doc: The count should be the maximum of docCount or schema minCount or field minCount or 1.           // 57
	// If we don't have a doc: The count should be the maximum of schema minCount or field minCount or 1.                 // 58
	var range = self.getMinMax(ss, field, overrideMinCount, overrideMaxCount);                                            // 59
	var arrayCount = Math.max(range.minCount, (docCount == null) ? 1 : docCount);                                         // 60
                                                                                                                       // 61
	// If this is an array of objects, collect names of object props                                                      // 62
	var childKeys = [];                                                                                                   // 63
	if (ss.schema(field + '.$').type === Object) {                                                                        // 64
    childKeys = ss.objectKeys(SimpleSchema._makeGeneric(field) + '.$');                                                // 65
	}                                                                                                                     // 66
                                                                                                                       // 67
	var loopArray = [];                                                                                                   // 68
	for (var i = 0; i < arrayCount; i++) {                                                                                // 69
		var loopCtx = createLoopCtx(formId, field, i, childKeys, overrideMinCount, overrideMaxCount);                        // 70
		loopArray.push(loopCtx);                                                                                             // 71
	};                                                                                                                    // 72
                                                                                                                       // 73
	self.info[formId][field].array = loopArray;                                                                           // 74
	var count = loopArray.length;                                                                                         // 75
	self.info[formId][field].count = count;                                                                               // 76
	self.info[formId][field].visibleCount = count;                                                                        // 77
	self.info[formId][field].deps.changed();                                                                              // 78
};                                                                                                                     // 79
                                                                                                                       // 80
ArrayTracker.prototype.resetField = function atResetField(formId, field) {                                             // 81
	var self = this;                                                                                                      // 82
	self.initForm(formId);                                                                                                // 83
                                                                                                                       // 84
	if (!self.info[formId][field]) {                                                                                      // 85
		self.info[formId][field] = {                                                                                         // 86
			deps: new Tracker.Dependency()                                                                                      // 87
		};                                                                                                                   // 88
	}                                                                                                                     // 89
                                                                                                                       // 90
	self.info[formId][field].array = null;                                                                                // 91
	self.info[formId][field].count = 0;                                                                                   // 92
	self.info[formId][field].visibleCount = 0;                                                                            // 93
	self.info[formId][field].deps.changed();                                                                              // 94
};                                                                                                                     // 95
                                                                                                                       // 96
ArrayTracker.prototype.resetForm = function atResetForm(formId) {                                                      // 97
	var self = this;                                                                                                      // 98
	_.each(self.info[formId], function (info, field) {                                                                    // 99
		self.resetField(formId, field);                                                                                      // 100
	});                                                                                                                   // 101
};                                                                                                                     // 102
                                                                                                                       // 103
ArrayTracker.prototype.untrackForm = function atUntrackForm(formId) {                                                  // 104
	var self = this;                                                                                                      // 105
	self.info[formId] = {};                                                                                               // 106
};                                                                                                                     // 107
                                                                                                                       // 108
ArrayTracker.prototype.tracksField = function atTracksField(formId, field) {                                           // 109
	var self = this;                                                                                                      // 110
	self.ensureField(formId, field);                                                                                      // 111
	self.info[formId][field].deps.depend();                                                                               // 112
	return !!self.info[formId][field].array;                                                                              // 113
};                                                                                                                     // 114
                                                                                                                       // 115
ArrayTracker.prototype.getField = function atGetField(formId, field) {                                                 // 116
	var self = this;                                                                                                      // 117
	self.ensureField(formId, field);                                                                                      // 118
	self.info[formId][field].deps.depend();                                                                               // 119
	return self.info[formId][field].array;                                                                                // 120
};                                                                                                                     // 121
                                                                                                                       // 122
ArrayTracker.prototype.getCount = function atGetCount(formId, field) {                                                 // 123
	var self = this;                                                                                                      // 124
	self.ensureField(formId, field);                                                                                      // 125
	self.info[formId][field].deps.depend();                                                                               // 126
	return self.info[formId][field].count;                                                                                // 127
};                                                                                                                     // 128
                                                                                                                       // 129
ArrayTracker.prototype.getVisibleCount = function atGetVisibleCount(formId, field) {                                   // 130
	var self = this;                                                                                                      // 131
	self.ensureField(formId, field);                                                                                      // 132
	self.info[formId][field].deps.depend();                                                                               // 133
	return self.info[formId][field].visibleCount;                                                                         // 134
};                                                                                                                     // 135
                                                                                                                       // 136
ArrayTracker.prototype.isFirstFieldlVisible = function atIsFirstFieldlVisible(formId, field, currentIndex) {           // 137
	var self = this;                                                                                                      // 138
	self.ensureField(formId, field);                                                                                      // 139
	self.info[formId][field].deps.depend();                                                                               // 140
	var firstVisibleField = _.find(self.info[formId][field].array, function(currentField) {                               // 141
		return !currentField.removed;                                                                                        // 142
	});                                                                                                                   // 143
	return (firstVisibleField && firstVisibleField.index === currentIndex);                                               // 144
};                                                                                                                     // 145
                                                                                                                       // 146
ArrayTracker.prototype.isLastFieldlVisible = function atIsLastFieldlVisible(formId, field, currentIndex) {             // 147
	var self = this;                                                                                                      // 148
	self.ensureField(formId, field);                                                                                      // 149
	self.info[formId][field].deps.depend();                                                                               // 150
	var lastVisibleField = _.last(_.filter(self.info[formId][field].array, function(currentField) {                       // 151
		return !currentField.removed;                                                                                        // 152
	}));                                                                                                                  // 153
	return (lastVisibleField && lastVisibleField.index === currentIndex);                                                 // 154
};                                                                                                                     // 155
                                                                                                                       // 156
ArrayTracker.prototype.addOneToField = function atAddOneToField(formId, field, ss, overrideMinCount, overrideMaxCount) {
  var self = this;                                                                                                     // 158
  self.ensureField(formId, field);                                                                                     // 159
                                                                                                                       // 160
  if (!self.info[formId][field].array) {                                                                               // 161
  	return;                                                                                                             // 162
  }                                                                                                                    // 163
                                                                                                                       // 164
  var currentCount = self.info[formId][field].visibleCount                                                             // 165
  var maxCount = self.getMinMax(ss, field, overrideMinCount, overrideMaxCount).maxCount;                               // 166
                                                                                                                       // 167
  if (currentCount < maxCount) {                                                                                       // 168
	  var i = self.info[formId][field].array.length;                                                                      // 169
                                                                                                                       // 170
	  // If this is an array of objects, collect names of object props                                                    // 171
	  var childKeys = [];                                                                                                 // 172
	  if (ss.schema(field + '.$').type === Object) {                                                                      // 173
      childKeys = ss.objectKeys(SimpleSchema._makeGeneric(field) + '.$');                                              // 174
	  }                                                                                                                   // 175
                                                                                                                       // 176
	  var loopCtx = createLoopCtx(formId, field, i, childKeys, overrideMinCount, overrideMaxCount);                       // 177
                                                                                                                       // 178
	  self.info[formId][field].array.push(loopCtx);                                                                       // 179
	  self.info[formId][field].count++;                                                                                   // 180
	  self.info[formId][field].visibleCount++;                                                                            // 181
	  self.info[formId][field].deps.changed();                                                                            // 182
  }                                                                                                                    // 183
};                                                                                                                     // 184
                                                                                                                       // 185
ArrayTracker.prototype.removeFromFieldAtIndex = function atRemoveFromFieldAtIndex(formId, field, index, ss, overrideMinCount, overrideMaxCount) {
  var self = this;                                                                                                     // 187
  self.ensureField(formId, field);                                                                                     // 188
                                                                                                                       // 189
  if (!self.info[formId][field].array) {                                                                               // 190
  	return;                                                                                                             // 191
  }                                                                                                                    // 192
                                                                                                                       // 193
  var currentCount = self.info[formId][field].visibleCount;                                                            // 194
  var minCount = self.getMinMax(ss, field, overrideMinCount, overrideMaxCount).minCount;                               // 195
                                                                                                                       // 196
  if (currentCount > minCount) {                                                                                       // 197
    self.info[formId][field].array[index].removed = true;                                                              // 198
    self.info[formId][field].count--;                                                                                  // 199
    self.info[formId][field].visibleCount--;                                                                           // 200
    self.info[formId][field].deps.changed();                                                                           // 201
  }                                                                                                                    // 202
}                                                                                                                      // 203
                                                                                                                       // 204
/*                                                                                                                     // 205
 * PRIVATE                                                                                                             // 206
 */                                                                                                                    // 207
var createLoopCtx = function(formId, field, index, childKeys, overrideMinCount, overrideMaxCount) {                    // 208
  var loopCtx = {                                                                                                      // 209
  	formId:         formId,                                                                                             // 210
  	arrayFieldName: field,                                                                                              // 211
  	name:           field + '.' + index,                                                                                // 212
  	index:          index,                                                                                              // 213
  	minCount:       overrideMinCount,                                                                                   // 214
  	maxCount:       overrideMaxCount                                                                                    // 215
  };                                                                                                                   // 216
                                                                                                                       // 217
  // If this is an array of objects, add child key names under loopCtx.current[childName] = fullKeyName                // 218
  if (childKeys.length) {                                                                                              // 219
    loopCtx.current = {};                                                                                              // 220
	_.each(childKeys, function (k) {                                                                                      // 221
	  loopCtx.current[k] = field + '.' + index + '.' + k;                                                                 // 222
    });                                                                                                                // 223
  }                                                                                                                    // 224
                                                                                                                       // 225
  return loopCtx;                                                                                                      // 226
}                                                                                                                      // 227
                                                                                                                       // 228
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
defaultFormId = "_afGenericID";                                                                                        // 1
formPreserve = new FormPreserve("autoforms");                                                                          // 2
formData = {}; //for looking up autoform data by form ID                                                               // 3
templatesById = {}; //keep a reference of autoForm templates by form `id` for AutoForm.getFormValues                   // 4
formValues = {}; //for reactive show/hide based on current value of a field                                            // 5
formDeps = {}; //for invalidating the form inner context and causing rerender                                          // 6
inputTypeDefinitions = {}; //for storing input type definitions added by AutoForm.addInputType                         // 7
fd = new FormData();                                                                                                   // 8
arrayTracker = new ArrayTracker();                                                                                     // 9
componentTypeList = ['afArrayField', 'afEachArrayItem', 'afFieldInput', 'afFormGroup', 'afObjectField', 'afQuickField', 'afQuickFields', 'autoForm', 'quickForm'];
                                                                                                                       // 11
// backwards compatibility                                                                                             // 12
if (typeof Tracker === "undefined" && typeof Deps !== "undefined") {                                                   // 13
  Tracker = Deps;                                                                                                      // 14
}                                                                                                                      // 15
                                                                                                                       // 16
afDestroyUpdateForm = new ReactiveVar(false);                                                                          // 17
                                                                                                                       // 18
// reactive templates                                                                                                  // 19
globalDefaultTemplate = "bootstrap3"                                                                                   // 20
defaultTypeTemplates = {};                                                                                             // 21
deps = {                                                                                                               // 22
  defaultTemplate: new Tracker.Dependency,                                                                             // 23
  defaultTypeTemplates: {}                                                                                             // 24
};                                                                                                                     // 25
                                                                                                                       // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-helpers.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Global template helpers (exported)                                                                                  // 1
                                                                                                                       // 2
var regHelper = Template.registerHelper;                                                                               // 3
if (typeof regHelper !== "function") {                                                                                 // 4
  regHelper = UI.registerHelper;                                                                                       // 5
}                                                                                                                      // 6
                                                                                                                       // 7
/*                                                                                                                     // 8
 * afFieldMessage                                                                                                      // 9
 */                                                                                                                    // 10
regHelper('afFieldMessage', function autoFormFieldMessage(options) {                                                   // 11
  options = parseOptions(options, 'afFieldMessage');                                                                   // 12
                                                                                                                       // 13
  return options.ss.namedContext(options.formId).keyErrorMessage(options.name);                                        // 14
});                                                                                                                    // 15
                                                                                                                       // 16
/*                                                                                                                     // 17
 * afFieldIsInvalid                                                                                                    // 18
 */                                                                                                                    // 19
regHelper('afFieldIsInvalid', function autoFormFieldIsInvalid(options) {                                               // 20
  options = parseOptions(options, 'afFieldIsInvalid');                                                                 // 21
                                                                                                                       // 22
  return options.ss.namedContext(options.formId).keyIsInvalid(options.name);                                           // 23
});                                                                                                                    // 24
                                                                                                                       // 25
/*                                                                                                                     // 26
 * afArrayFieldHasMoreThanMinimum                                                                                      // 27
 */                                                                                                                    // 28
regHelper('afArrayFieldHasMoreThanMinimum', function autoFormArrayFieldHasMoreThanMinimum(options) {                   // 29
  options = parseOptions(options, 'afArrayFieldHasMoreThanMinimum');                                                   // 30
                                                                                                                       // 31
  var range = arrayTracker.getMinMax(options.ss, options.name, options.minCount, options.maxCount);                    // 32
  var visibleCount = arrayTracker.getVisibleCount(options.formId, options.name);                                       // 33
  return (visibleCount > range.minCount);                                                                              // 34
});                                                                                                                    // 35
                                                                                                                       // 36
/*                                                                                                                     // 37
 * afArrayFieldHasLessThanMaximum                                                                                      // 38
 */                                                                                                                    // 39
regHelper('afArrayFieldHasLessThanMaximum', function autoFormArrayFieldHasLessThanMaximum(options) {                   // 40
  options = parseOptions(options, 'afArrayFieldHasLessThanMaximum');                                                   // 41
                                                                                                                       // 42
  var range = arrayTracker.getMinMax(options.ss, options.name, options.minCount, options.maxCount);                    // 43
  var visibleCount = arrayTracker.getVisibleCount(options.formId, options.name);                                       // 44
  return (visibleCount < range.maxCount);                                                                              // 45
});                                                                                                                    // 46
                                                                                                                       // 47
/*                                                                                                                     // 48
 * afFieldValueIs                                                                                                      // 49
 */                                                                                                                    // 50
regHelper('afFieldValueIs', function autoFormFieldValueIs(options) {                                                   // 51
  options = parseOptions(options, 'afFieldValueIs');                                                                   // 52
                                                                                                                       // 53
  var currentValue = AutoForm.getFieldValue(options.formId, options.name);                                             // 54
  return currentValue === options.value;                                                                               // 55
});                                                                                                                    // 56
                                                                                                                       // 57
/*                                                                                                                     // 58
 * afArrayFieldIsFirstVisible                                                                                          // 59
 */                                                                                                                    // 60
regHelper('afArrayFieldIsFirstVisible', function autoFormArrayFieldIsFirstVisible() {                                  // 61
  var context = this;                                                                                                  // 62
  return arrayTracker.isFirstFieldlVisible(context.formId, context.arrayFieldName, context.index);                     // 63
});                                                                                                                    // 64
                                                                                                                       // 65
/*                                                                                                                     // 66
 * afArrayFieldIsLastVisible                                                                                           // 67
 */                                                                                                                    // 68
regHelper('afArrayFieldIsLastVisible', function autoFormArrayFieldIsLastVisible() {                                    // 69
  var context = this;                                                                                                  // 70
  return arrayTracker.isLastFieldlVisible(context.formId, context.arrayFieldName, context.index);                      // 71
});                                                                                                                    // 72
                                                                                                                       // 73
/*                                                                                                                     // 74
 * afFieldValueContains                                                                                                // 75
 */                                                                                                                    // 76
regHelper('afFieldValueContains', function autoFormFieldValueContains(options) {                                       // 77
  options = parseOptions(options, 'afFieldValueContains');                                                             // 78
                                                                                                                       // 79
  var currentValue = AutoForm.getFieldValue(options.formId, options.name);                                             // 80
  return _.isArray(currentValue) && (_.contains(currentValue, options.value) || options.values && _.intersection(currentValue, options.values.split(",")));
});                                                                                                                    // 82
                                                                                                                       // 83
/*                                                                                                                     // 84
 * afFieldLabelText                                                                                                    // 85
 */                                                                                                                    // 86
regHelper('afFieldLabelText', function autoFormFieldLabelText(options) {                                               // 87
  options = parseOptions(options, 'afFieldLabelText');                                                                 // 88
                                                                                                                       // 89
  if (SimpleSchema._makeGeneric(options.name).slice(-1) === "$") {                                                     // 90
    // for array items we don't want to inflect the label because                                                      // 91
    // we will end up with a number                                                                                    // 92
    var label = options.ss.label(options.name);                                                                        // 93
    if (!isNaN(parseInt(label, 10))) {                                                                                 // 94
      return null;                                                                                                     // 95
    } else {                                                                                                           // 96
      return label;                                                                                                    // 97
    }                                                                                                                  // 98
  } else {                                                                                                             // 99
    return options.ss.label(options.name);                                                                             // 100
  }                                                                                                                    // 101
});                                                                                                                    // 102
                                                                                                                       // 103
/*                                                                                                                     // 104
 * afFieldNames                                                                                                        // 105
 */                                                                                                                    // 106
regHelper("afFieldNames", function autoFormFieldNames(options) {                                                       // 107
  options = parseOptions(options, 'afFieldNames');                                                                     // 108
  var ss = options.ss, name = options.name, namePlusDot, genericName, genericNamePlusDot;                              // 109
                                                                                                                       // 110
  if (name) {                                                                                                          // 111
    namePlusDot = name + ".";                                                                                          // 112
    genericName = SimpleSchema._makeGeneric(name);                                                                     // 113
    genericNamePlusDot = genericName + ".";                                                                            // 114
  }                                                                                                                    // 115
                                                                                                                       // 116
  // Get the list of fields we want included                                                                           // 117
  var fieldList = options.fields || AutoForm.findAttribute("fields");                                                  // 118
  if (fieldList) {                                                                                                     // 119
    fieldList = AutoForm.Utility.stringToArray(fieldList, 'AutoForm: fields attribute must be an array or a string containing a comma-delimited list of fields');
                                                                                                                       // 121
    // Take only those fields in the fieldList that are descendants of the `name` field                                // 122
    if (name) {                                                                                                        // 123
      // Replace generic name with real name. We assume that field names                                               // 124
      // with $ apply to all array items. Field list will not have the                                                 // 125
      // correct array field item number instead of $.                                                                 // 126
      if (genericName !== name) {                                                                                      // 127
        fieldList = _.map(fieldList, function (field) {                                                                // 128
          if (field.indexOf(genericNamePlusDot) === 0) {                                                               // 129
            return namePlusDot + field.slice(genericNamePlusDot.length);                                               // 130
          }                                                                                                            // 131
          return field;                                                                                                // 132
        });                                                                                                            // 133
      }                                                                                                                // 134
                                                                                                                       // 135
      fieldList = _.filter(fieldList, function filterFieldsByName(field) {                                             // 136
        return field.indexOf(namePlusDot) === 0;                                                                       // 137
      });                                                                                                              // 138
    }                                                                                                                  // 139
                                                                                                                       // 140
    // If top level fields, be sure to remove any with $ in them                                                       // 141
    else {                                                                                                             // 142
      fieldList = _.filter(fieldList, function filterFieldsByName(field) {                                             // 143
        return (field.slice(-2) !== '.$' && field.indexOf('.$.') === -1);                                              // 144
      });                                                                                                              // 145
    }                                                                                                                  // 146
                                                                                                                       // 147
    // First we filter out any fields that are subobjects where the                                                    // 148
    // parent object is also in the fieldList and is NOT the current                                                   // 149
    // field name.                                                                                                     // 150
    // This means that if you do `fields="address,address.city"` we                                                    // 151
    // will use an afObjectField for address and include only the                                                      // 152
    // "city" field within that, but if you instead do `fields="address.city"`                                         // 153
    // we will use a single field for the city, with no afObjectField                                                  // 154
    // template around it.                                                                                             // 155
    fieldList = _.reject(fieldList, function (field) {                                                                 // 156
      var lastDotPos = field.lastIndexOf(".");                                                                         // 157
      if (lastDotPos === -1) {                                                                                         // 158
        return false; //keep                                                                                           // 159
      }                                                                                                                // 160
                                                                                                                       // 161
      var parentField = field.slice(0, lastDotPos);                                                                    // 162
      if (parentField.slice(-2) === ".$") {                                                                            // 163
        parentField = parentField.slice(0, -2);                                                                        // 164
      }                                                                                                                // 165
      return _.contains(fieldList, parentField) && parentField !== name && parentField !== genericName;                // 166
    });                                                                                                                // 167
  }                                                                                                                    // 168
                                                                                                                       // 169
  if (!fieldList || fieldList.length === 0) {                                                                          // 170
    // Get list of field names that are descendants of this field's name.                                              // 171
    // If name/genericName is undefined, this will return top-level                                                    // 172
    // schema keys.                                                                                                    // 173
    fieldList = ss.objectKeys(genericName);                                                                            // 174
                                                                                                                       // 175
    if (name) {                                                                                                        // 176
      // Tack child field name on to end of parent field name. This                                                    // 177
      // ensures that we keep the desired array index for array items.                                                 // 178
      fieldList = _.map(fieldList, function (field) {                                                                  // 179
        return name + "." + field;                                                                                     // 180
      });                                                                                                              // 181
    }                                                                                                                  // 182
  }                                                                                                                    // 183
                                                                                                                       // 184
  // If user wants to omit some fields, remove those from the array                                                    // 185
  var omitFields = options.omitFields || AutoForm.findAttribute("omitFields");                                         // 186
  if (omitFields) {                                                                                                    // 187
    omitFields = AutoForm.Utility.stringToArray(omitFields, 'AutoForm: omitFields attribute must be an array or a string containing a comma-delimited list of fields');
    fieldList = _.difference(fieldList, omitFields);                                                                   // 189
    // If omitFields contains generic field names (with $) we omit those too                                           // 190
    fieldList = _.reject(fieldList, function (f) {                                                                     // 191
      return _.contains(omitFields, SimpleSchema._makeGeneric(f));                                                     // 192
    });                                                                                                                // 193
  }                                                                                                                    // 194
                                                                                                                       // 195
  // Filter out fields we never want                                                                                   // 196
  fieldList = _.filter(fieldList, function shouldIncludeField(field) {                                                 // 197
    var fieldDefs = ss.schema(field);                                                                                  // 198
                                                                                                                       // 199
    // Don't include fields with autoform.omit=true                                                                    // 200
    if (fieldDefs.autoform && fieldDefs.autoform.omit === true)                                                        // 201
      return false;                                                                                                    // 202
                                                                                                                       // 203
    // Don't include fields with denyInsert=true when it's an insert form                                              // 204
    if (fieldDefs.denyInsert && options.submitType === "insert")                                                       // 205
      return false;                                                                                                    // 206
                                                                                                                       // 207
    // Don't include fields with denyUpdate=true when it's an update form                                              // 208
    if (fieldDefs.denyUpdate && options.submitType === "update")                                                       // 209
      return false;                                                                                                    // 210
                                                                                                                       // 211
    return true;                                                                                                       // 212
  });                                                                                                                  // 213
                                                                                                                       // 214
  // Ensure fields are not added more than once                                                                        // 215
  fieldList = _.unique(fieldList);                                                                                     // 216
                                                                                                                       // 217
  return fieldList;                                                                                                    // 218
});                                                                                                                    // 219
                                                                                                                       // 220
/*                                                                                                                     // 221
 * afTemplateName                                                                                                      // 222
 *                                                                                                                     // 223
 * Returns the full template name. In the simplest scenario, this is templateType_templateName                         // 224
 * as passed in. However, if templateName is not provided, it is looked up in the following                            // 225
 * manner:                                                                                                             // 226
 *                                                                                                                     // 227
 * 1. autoform.<componentType>.template from the schema (field+type override for all forms)                            // 228
 * 2. autoform.template from the schema (field override for all forms)                                                 // 229
 * 3. template-<componentType> attribute on an ancestor component within the same form (form+type for all fields)      // 230
 * 4. template attribute on an ancestor component within the same form (form specificity for all types and fields)     // 231
 * 5. Default template for component type, as set by AutoForm.setDefaultTemplateForType                                // 232
 * 6. Default template, as set by AutoForm.setDefaultTemplate.                                                         // 233
 * 7. Built-in default template, currently bootstrap-3.                                                                // 234
 */                                                                                                                    // 235
regHelper('afTemplateName', function afTemplateNameHelper(templateType, templateName) {                                // 236
  var self = this, result, schemaAutoFormDefs, templateFromAncestor, defaultTemplate;                                  // 237
                                                                                                                       // 238
  var result = templateType + '_' + templateName; // templateName might be undefined, but the result will be the same  // 239
  if (Template[result]) {                                                                                              // 240
    return result;                                                                                                     // 241
  }                                                                                                                    // 242
                                                                                                                       // 243
  // If the attributes provided a templateName but that template didn't exist, show a warning                          // 244
  if (templateName && AutoForm._debug) {                                                                               // 245
    console.warn(templateType + ': "' + templateName + '" is not a valid template name. Falling back to a different template.');
  }                                                                                                                    // 247
                                                                                                                       // 248
  // Get `autoform` object from the schema, if present.                                                                // 249
  // Skip for quickForm because it renders a form and not a field.                                                     // 250
  if (templateType !== 'quickForm' && self.atts && self.atts.name) {                                                   // 251
    schemaAutoFormDefs = AutoForm.getSchemaForField(self.atts.name).autoform;                                          // 252
  }                                                                                                                    // 253
                                                                                                                       // 254
  // Fallback #1: autoform.<componentType>.template from the schema                                                    // 255
  if (schemaAutoFormDefs && schemaAutoFormDefs[templateType] && schemaAutoFormDefs[templateType].template && Template[templateType + '_' + schemaAutoFormDefs[templateType].template]) {
    return templateType + '_' + schemaAutoFormDefs[templateType].template;                                             // 257
  }                                                                                                                    // 258
                                                                                                                       // 259
  // Fallback #2: autoform.template from the schema                                                                    // 260
  if (schemaAutoFormDefs && schemaAutoFormDefs.template && Template[templateType + '_' + schemaAutoFormDefs.template]) {
    return templateType + '_' + schemaAutoFormDefs.template;                                                           // 262
  }                                                                                                                    // 263
                                                                                                                       // 264
  // Fallback #3: template-<componentType> attribute on an ancestor component within the same form                     // 265
  templateFromAncestor = AutoForm.findAttribute("template-" + templateType);                                           // 266
  if (templateFromAncestor && Template[templateType + '_' + templateFromAncestor]) {                                   // 267
    return templateType + '_' + templateFromAncestor;                                                                  // 268
  }                                                                                                                    // 269
                                                                                                                       // 270
  // Fallback #4: template attribute on an ancestor component within the same form                                     // 271
  templateFromAncestor = AutoForm.findAttribute("template");                                                           // 272
  if (templateFromAncestor && Template[templateType + '_' + templateFromAncestor]) {                                   // 273
    return templateType + '_' + templateFromAncestor;                                                                  // 274
  }                                                                                                                    // 275
                                                                                                                       // 276
  // Fallback #5: Default template for component type, as set by AutoForm.setDefaultTemplateForType                    // 277
  defaultTemplate = AutoForm.getDefaultTemplateForType(templateType);                                                  // 278
  if (defaultTemplate && Template[templateType + '_' + defaultTemplate]) {                                             // 279
    return templateType + '_' + defaultTemplate;                                                                       // 280
  }                                                                                                                    // 281
                                                                                                                       // 282
  // Fallback #6: Default template, as set by AutoForm.setDefaultTemplate                                              // 283
  defaultTemplate = AutoForm.getDefaultTemplate();                                                                     // 284
  if (defaultTemplate && Template[templateType + '_' + defaultTemplate]) {                                             // 285
    return templateType + '_' + defaultTemplate;                                                                       // 286
  }                                                                                                                    // 287
                                                                                                                       // 288
  // Fallback #7: hard-coded default                                                                                   // 289
  return "bootstrap3";                                                                                                 // 290
});                                                                                                                    // 291
                                                                                                                       // 292
/*                                                                                                                     // 293
 * PRIVATE                                                                                                             // 294
 */                                                                                                                    // 295
                                                                                                                       // 296
function parseOptions(options, helperName) {                                                                           // 297
  var hash = (options || {}).hash || {};                                                                               // 298
  // Find the autoform context                                                                                         // 299
  var afContext = AutoForm.find(helperName);                                                                           // 300
  // Call getDefs for side effect of throwing errors when name is not in schema                                        // 301
  hash.name && AutoForm.Utility.getDefs(afContext.ss, hash.name);                                                      // 302
  return _.extend({}, afContext, hash);                                                                                // 303
}                                                                                                                      // 304
                                                                                                                       // 305
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-validation.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * all form validation logic is here                                                                                   // 2
 */                                                                                                                    // 3
                                                                                                                       // 4
validateFormDoc = function validateFormDoc(doc, isModifier, formId, ss, docId, key) {                                  // 5
  var ec = {                                                                                                           // 6
    userId: (Meteor.userId && Meteor.userId()) || null,                                                                // 7
    isInsert: !isModifier,                                                                                             // 8
    isUpdate: !!isModifier,                                                                                            // 9
    isUpsert: false,                                                                                                   // 10
    isFromTrustedCode: false,                                                                                          // 11
    docId: docId                                                                                                       // 12
  };                                                                                                                   // 13
                                                                                                                       // 14
  // Get a version of the doc that has auto values to validate here. We                                                // 15
  // don't want to actually send any auto values to the server because                                                 // 16
  // we ultimately want them generated on the server                                                                   // 17
  var docForValidation = ss.clean(_.clone(doc), {                                                                      // 18
    isModifier: isModifier,                                                                                            // 19
    filter: false,                                                                                                     // 20
    autoConvert: false,                                                                                                // 21
    trimStrings: false,                                                                                                // 22
    extendAutoValueContext: ec                                                                                         // 23
  });                                                                                                                  // 24
                                                                                                                       // 25
  // Validate                                                                                                          // 26
  // If `key` is provided, we validate that key/field only                                                             // 27
  if (key) {                                                                                                           // 28
    return ss.namedContext(formId).validateOne(docForValidation, key, {                                                // 29
      modifier: isModifier,                                                                                            // 30
      extendedCustomContext: ec                                                                                        // 31
    });                                                                                                                // 32
  } else {                                                                                                             // 33
    return ss.namedContext(formId).validate(docForValidation, {                                                        // 34
      modifier: isModifier,                                                                                            // 35
      extendedCustomContext: ec                                                                                        // 36
    });                                                                                                                // 37
  }                                                                                                                    // 38
};                                                                                                                     // 39
                                                                                                                       // 40
_validateForm = function _validateForm(formId, formDetails, formDocs, useCollectionSchema) {                           // 41
  var ss, docId, isValid;                                                                                              // 42
                                                                                                                       // 43
  if (formDetails.validationType === 'none')                                                                           // 44
    return true;                                                                                                       // 45
                                                                                                                       // 46
  // We use the schema for the `schema` attribute if present,                                                          // 47
  // else the schema for the collection. If there is a `schema`                                                        // 48
  // attribute but you want to force validation against the                                                            // 49
  // collection's schema instead, pass useCollectionSchema=true                                                        // 50
  ss = (useCollectionSchema && formDetails.collection) ? formDetails.collection.simpleSchema() : formDetails.ss;       // 51
                                                                                                                       // 52
  docId = formDetails.doc && formDetails.doc._id || null;                                                              // 53
                                                                                                                       // 54
  // Perform validation                                                                                                // 55
  if (formDetails.submitType === "update") {                                                                           // 56
    // For a type="update" form, we validate the modifier. We don't want to throw                                      // 57
    // errors about missing required fields, etc.                                                                      // 58
    isValid = validateFormDoc(formDocs.updateDoc, true, formId, ss, docId);                                            // 59
  } else {                                                                                                             // 60
    // For any other type of form, we validate the document.                                                           // 61
    isValid = validateFormDoc(formDocs.insertDoc, false, formId, ss, docId);                                           // 62
  }                                                                                                                    // 63
                                                                                                                       // 64
  if (!isValid) {                                                                                                      // 65
    selectFirstInvalidField(formId, ss);                                                                               // 66
  }                                                                                                                    // 67
                                                                                                                       // 68
  return isValid;                                                                                                      // 69
};                                                                                                                     // 70
                                                                                                                       // 71
_validateField = function _validateField(key, template, skipEmpty, onlyIfAlreadyInvalid) {                             // 72
  // Due to throttling, this can be called after the autoForm template is destroyed.                                   // 73
  // If that happens, we exit without error.                                                                           // 74
  if (!template || !template.view._domrange || template.view.isDestroyed) {                                            // 75
    return;                                                                                                            // 76
  }                                                                                                                    // 77
                                                                                                                       // 78
  var context = template.data;                                                                                         // 79
  var formId = context.id || defaultFormId;                                                                            // 80
  var formDetails = formData[formId];                                                                                  // 81
  var docId = formDetails.doc && formDetails.doc._id || null;                                                          // 82
  var ss = formDetails.ss;                                                                                             // 83
                                                                                                                       // 84
  if (onlyIfAlreadyInvalid && ss.namedContext(formId).isValid()) {                                                     // 85
    return; //skip validation                                                                                          // 86
  }                                                                                                                    // 87
                                                                                                                       // 88
  // Create a document based on all the values of all the inputs on the form                                           // 89
  var formDocs = getFormValues(template, formId, ss);                                                                  // 90
                                                                                                                       // 91
  // Clean and validate doc                                                                                            // 92
  if (formDetails.submitType === "update") {                                                                           // 93
    var docToValidate = formDocs.updateDoc;                                                                            // 94
    var isModifier = true;                                                                                             // 95
  } else {                                                                                                             // 96
    var docToValidate = formDocs.insertDoc;                                                                            // 97
    var isModifier = false;                                                                                            // 98
  }                                                                                                                    // 99
                                                                                                                       // 100
  // Skip validation if skipEmpty is true and the field we're validating                                               // 101
  // has no value.                                                                                                     // 102
  if (skipEmpty && !AutoForm.Utility.objAffectsKey(docToValidate, key))                                                // 103
    return true; //skip validation                                                                                     // 104
                                                                                                                       // 105
  return validateFormDoc(docToValidate, isModifier, formId, ss, docId, key);                                           // 106
};                                                                                                                     // 107
                                                                                                                       // 108
// Throttle field validation to occur at most every 300ms,                                                             // 109
// with leading and trailing calls.                                                                                    // 110
validateField = _.throttle(_validateField, 300);                                                                       // 111
                                                                                                                       // 112
// Selects the focus the first field with an error                                                                     // 113
selectFirstInvalidField = function selectFirstInvalidField(formId, ss) {                                               // 114
  var ctx = ss.namedContext(formId), template, fields;                                                                 // 115
  if (!ctx.isValid()) {                                                                                                // 116
    template = templatesById[formId];                                                                                  // 117
    fields = getAllFieldsInForm(template);                                                                             // 118
    fields.each(function () {                                                                                          // 119
      var f = $(this);                                                                                                 // 120
      if (ctx.keyIsInvalid(f.attr('data-schema-key'))) {                                                               // 121
        f.focus();                                                                                                     // 122
        return false;                                                                                                  // 123
      }                                                                                                                // 124
    });                                                                                                                // 125
  }                                                                                                                    // 126
};                                                                                                                     // 127
                                                                                                                       // 128
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-inputs.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global AutoForm */                                                                                                  // 1
/* global getInputType:true */                                                                                         // 2
/* global getFieldValue:true */                                                                                        // 3
/* global getFormValues:true */                                                                                        // 4
/* global formData */                                                                                                  // 5
/* global getInputValue:true */                                                                                        // 6
/* global getFieldsValues:true */                                                                                      // 7
/* global getAllFieldsInForm:true */                                                                                   // 8
/* global Hooks */                                                                                                     // 9
/* global getInputData:true */                                                                                         // 10
/* global updateTrackedFieldValue:true */                                                                              // 11
/* global updateAllTrackedFieldValues:true */                                                                          // 12
/* global formValues */                                                                                                // 13
                                                                                                                       // 14
function getFieldsValues(fields, ss) {                                                                                 // 15
  var doc = {};                                                                                                        // 16
  fields.each(function formValuesEach() {                                                                              // 17
    var fieldName, val = AutoForm.getInputValue(this, ss);                                                             // 18
    if (val !== void 0) {                                                                                              // 19
      // Get the field/schema key name                                                                                 // 20
      fieldName = $(this).attr("data-schema-key");                                                                     // 21
      doc[fieldName] = val;                                                                                            // 22
    }                                                                                                                  // 23
  });                                                                                                                  // 24
  return doc;                                                                                                          // 25
}                                                                                                                      // 26
                                                                                                                       // 27
/*                                                                                                                     // 28
 * package scope functions                                                                                             // 29
 */                                                                                                                    // 30
                                                                                                                       // 31
// Determines based on different options what type of input/control should be used                                     // 32
getInputType = function getInputType(atts) {                                                                           // 33
	var expectsArray = false, defs, schemaType;                                                                           // 34
                                                                                                                       // 35
  atts = AutoForm.Utility.normalizeContext(atts, 'afFieldInput').atts;                                                 // 36
                                                                                                                       // 37
  // If a `type` attribute is specified, we just use that                                                              // 38
  if (atts.type) {                                                                                                     // 39
    return atts.type;                                                                                                  // 40
  }                                                                                                                    // 41
                                                                                                                       // 42
	// Get schema definition, using the item definition for array fields                                                  // 43
	defs = AutoForm.getSchemaForField(atts.name);                                                                         // 44
  schemaType = defs.type;                                                                                              // 45
  if (schemaType === Array) {                                                                                          // 46
    expectsArray = true;                                                                                               // 47
    defs = AutoForm.getSchemaForField(atts.name + ".$");                                                               // 48
    schemaType = defs.type;                                                                                            // 49
  }                                                                                                                    // 50
                                                                                                                       // 51
  // Based on the `type` attribute, the `type` from the schema, and/or                                                 // 52
  // other characteristics such as regEx and whether an array is expected,                                             // 53
  // choose which type string to return.                                                                               // 54
  // TODO allow outside packages to extend/override this logic.                                                        // 55
  var type = "text";                                                                                                   // 56
  if (atts.options) {                                                                                                  // 57
    if (atts.noselect) {                                                                                               // 58
      // Does the schema expect the value of the field to be an array?                                                 // 59
      // If so, use a check box group, which will return an array value.                                               // 60
      if (expectsArray) {                                                                                              // 61
        type = "select-checkbox";                                                                                      // 62
      } else {                                                                                                         // 63
        type = "select-radio";                                                                                         // 64
      }                                                                                                                // 65
    } else {                                                                                                           // 66
      if (expectsArray) {                                                                                              // 67
        type = "select-multiple";                                                                                      // 68
      } else {                                                                                                         // 69
        type = "select";                                                                                               // 70
      }                                                                                                                // 71
    }                                                                                                                  // 72
  } else if (schemaType === String && atts.rows) {                                                                     // 73
    type = "textarea";                                                                                                 // 74
  } else if (schemaType === Number) {                                                                                  // 75
    type = "number";                                                                                                   // 76
  } else if (schemaType === Date) {                                                                                    // 77
    type = "date";                                                                                                     // 78
  } else if (schemaType === Boolean) {                                                                                 // 79
    type = "boolean-checkbox";                                                                                         // 80
  }                                                                                                                    // 81
  return type;                                                                                                         // 82
};                                                                                                                     // 83
                                                                                                                       // 84
getFieldValue = function getFieldValue(template, key) {                                                                // 85
  var formInfo = formData[template.data.id];                                                                           // 86
  var doc = getFieldsValues(getAllFieldsInForm(template).filter('[data-schema-key="' + key + '"], [data-schema-key^="' + key + '."]'), formInfo.ss);
  return doc && doc[key];                                                                                              // 88
};                                                                                                                     // 89
                                                                                                                       // 90
getFormValues = function getFormValues(template, formId, ss) {                                                         // 91
  var formInfo = formData[formId];                                                                                     // 92
  // By default, we do not keep empty strings                                                                          // 93
  var keepEmptyStrings = false;                                                                                        // 94
  if (formInfo.removeEmptyStrings === false) {                                                                         // 95
    keepEmptyStrings = true;                                                                                           // 96
  }                                                                                                                    // 97
  // By default, we do filter                                                                                          // 98
  var filter = true;                                                                                                   // 99
  if (formInfo.filter === false) {                                                                                     // 100
    filter = false;                                                                                                    // 101
  }                                                                                                                    // 102
  // By default, we do autoConvert                                                                                     // 103
  var autoConvert = true;                                                                                              // 104
  if (formInfo.autoConvert === false) {                                                                                // 105
    autoConvert = false;                                                                                               // 106
  }                                                                                                                    // 107
  // By default, we do trimStrings                                                                                     // 108
  var trimStrings = true;                                                                                              // 109
  if (formInfo.trimStrings === false) {                                                                                // 110
    trimStrings = false;                                                                                               // 111
  }                                                                                                                    // 112
                                                                                                                       // 113
  // Build doc from field values                                                                                       // 114
  var doc = getFieldsValues(getAllFieldsInForm(template), ss);                                                         // 115
                                                                                                                       // 116
  // Expand the object                                                                                                 // 117
  doc = AutoForm.Utility.expandObj(doc);                                                                               // 118
                                                                                                                       // 119
  // As array items are removed, gaps can appear in the numbering,                                                     // 120
  // which results in arrays that have undefined items. Here we                                                        // 121
  // remove any array items that are undefined.                                                                        // 122
  AutoForm.Utility.compactArrays(doc);                                                                                 // 123
                                                                                                                       // 124
  // When all fields that comprise a sub-object are empty, we should unset                                             // 125
  // the whole subobject and not complain about required fields in it. For example,                                    // 126
  // if `profile.address` has several properties but they are all null or undefined,                                   // 127
  // we will set `profile.address=null`. This ensures that we don't get incorrect validation                           // 128
  // errors about required fields that are children of optional objects.                                               // 129
  AutoForm.Utility.bubbleEmpty(doc, keepEmptyStrings);                                                                 // 130
                                                                                                                       // 131
  // Pass expanded doc through formToDoc hooks                                                                         // 132
  var hookCtx = {                                                                                                      // 133
    template: template,                                                                                                // 134
    formId: formId                                                                                                     // 135
  };                                                                                                                   // 136
  var transforms = Hooks.getHooks(formId, 'formToDoc');                                                                // 137
  _.each(transforms, function formValuesTransform(transform) {                                                         // 138
    doc = transform.call(hookCtx, doc, ss, formId);                                                                    // 139
  });                                                                                                                  // 140
                                                                                                                       // 141
  // We return doc, insertDoc, and updateDoc.                                                                          // 142
  // For insertDoc, delete any properties that are null, undefined, or empty strings.                                  // 143
  // For updateDoc, convert to modifier object with $set and $unset.                                                   // 144
  // Do not add auto values to either.                                                                                 // 145
  var result = {                                                                                                       // 146
    insertDoc: ss.clean(AutoForm.Utility.cleanNulls(doc, false, keepEmptyStrings), {                                   // 147
      isModifier: false,                                                                                               // 148
      getAutoValues: false,                                                                                            // 149
      filter: filter,                                                                                                  // 150
      autoConvert: autoConvert,                                                                                        // 151
      trimStrings: trimStrings                                                                                         // 152
    }),                                                                                                                // 153
    updateDoc: ss.clean(AutoForm.Utility.docToModifier(doc, keepEmptyStrings), {                                       // 154
      isModifier: true,                                                                                                // 155
      getAutoValues: false,                                                                                            // 156
      filter: filter,                                                                                                  // 157
      autoConvert: autoConvert,                                                                                        // 158
      trimStrings: trimStrings                                                                                         // 159
    })                                                                                                                 // 160
  };                                                                                                                   // 161
  return result;                                                                                                       // 162
};                                                                                                                     // 163
                                                                                                                       // 164
/*                                                                                                                     // 165
 * Gets the value that should be shown/selected in the input. Returns                                                  // 166
 * a string, a boolean, or an array of strings. The value used,                                                        // 167
 * in order of preference, is one of:                                                                                  // 168
 * * The `value` attribute provided                                                                                    // 169
 * * The value that is set in the `doc` provided on the containing autoForm                                            // 170
 * * The `defaultValue` from the schema                                                                                // 171
 */                                                                                                                    // 172
getInputValue = function getInputValue(atts, value, mDoc, defaultValue, typeDefs) {                                    // 173
  if (typeof value === "undefined") {                                                                                  // 174
    // Get the value for this key in the current document                                                              // 175
    if (mDoc) {                                                                                                        // 176
      var valueInfo = mDoc.getInfoForKey(atts.name);                                                                   // 177
      if (valueInfo) {                                                                                                 // 178
        value = valueInfo.value;                                                                                       // 179
      }                                                                                                                // 180
    }                                                                                                                  // 181
                                                                                                                       // 182
    // Only if there is no current document, use the schema defaultValue                                               // 183
    else {                                                                                                             // 184
      value = defaultValue;                                                                                            // 185
    }                                                                                                                  // 186
  }                                                                                                                    // 187
                                                                                                                       // 188
  // Change null or undefined to an empty string                                                                       // 189
  value = (value === null || value === void 0) ? '' : value;                                                           // 190
                                                                                                                       // 191
  // If the component expects the value to be an array, and it's not, make it one                                      // 192
  if (typeDefs.valueIsArray && !_.isArray(value)) {                                                                    // 193
    if (typeof value === "string") {                                                                                   // 194
      value = value.split(',');                                                                                        // 195
    } else {                                                                                                           // 196
      value = [value];                                                                                                 // 197
    }                                                                                                                  // 198
  }                                                                                                                    // 199
                                                                                                                       // 200
  // At this point we have a value or an array of values.                                                              // 201
  // Run through the components valueIn function if we have one.                                                       // 202
  // It should then be in whatever format the component expects.                                                       // 203
  if (typeof typeDefs.valueIn === "function") {                                                                        // 204
    value = typeDefs.valueIn(value, atts);                                                                             // 205
  }                                                                                                                    // 206
                                                                                                                       // 207
  return value;                                                                                                        // 208
};                                                                                                                     // 209
                                                                                                                       // 210
/*                                                                                                                     // 211
 * Builds the data context that the input component will have.                                                         // 212
 */                                                                                                                    // 213
getInputData = function getInputData(defs, hash, value, label, submitType) {                                           // 214
  var schemaType = defs.type;                                                                                          // 215
                                                                                                                       // 216
  /*                                                                                                                   // 217
   * Get HTML attributes                                                                                               // 218
   */                                                                                                                  // 219
                                                                                                                       // 220
  // We don't want to alter the original hash, so we clone it and                                                      // 221
  // remove some stuff that should not be HTML attributes.                                                             // 222
  var inputAtts = _.omit(hash,                                                                                         // 223
          "autoform",                                                                                                  // 224
          "type",                                                                                                      // 225
          "value",                                                                                                     // 226
          "noselect",                                                                                                  // 227
          "options",                                                                                                   // 228
          "template");                                                                                                 // 229
                                                                                                                       // 230
  // Add required if required                                                                                          // 231
  if (typeof inputAtts.required === "undefined" && !defs.optional) {                                                   // 232
    inputAtts.required = "";                                                                                           // 233
  }                                                                                                                    // 234
                                                                                                                       // 235
  // Add disabled or readonly if the form has that submit type                                                         // 236
  if (submitType === "disabled") {                                                                                     // 237
    inputAtts.disabled = "";                                                                                           // 238
  } else if (submitType === "readonly") {                                                                              // 239
    inputAtts.readonly = "";                                                                                           // 240
  }                                                                                                                    // 241
                                                                                                                       // 242
   // Add data-schema-key to every type of element                                                                     // 243
  inputAtts['data-schema-key'] = inputAtts.name;                                                                       // 244
                                                                                                                       // 245
  // Set placeholder to label from schema if requested.                                                                // 246
  // We check hash.placeholder instead of inputAtts.placeholder because                                                // 247
  // we're setting inputAtts.placeholder, so it wouldn't be the same on                                                // 248
  // subsequent reactive runs of this function.                                                                        // 249
  if (hash.placeholder === "schemaLabel") {                                                                            // 250
    inputAtts.placeholder = label;                                                                                     // 251
  }                                                                                                                    // 252
                                                                                                                       // 253
  // To enable reactively toggling boolean attributes                                                                  // 254
  // in a simple way, we add the attributes to the HTML                                                                // 255
  // only if their value is `true`. That is, unlike in                                                                 // 256
  // HTML, their mere presence does not matter.                                                                        // 257
  _.each(["disabled", "readonly", "checked", "required", "autofocus"], function (booleanProp) {                        // 258
    if (!_.has(hash, booleanProp)) {                                                                                   // 259
      return;                                                                                                          // 260
    }                                                                                                                  // 261
                                                                                                                       // 262
    // For historical reasons, we treat the string "true" and an empty string as `true`, too.                          // 263
    // But an empty string value results in the cleanest rendered output for boolean props,                            // 264
    // so we standardize as that.                                                                                      // 265
    if (hash[booleanProp] === true || hash[booleanProp] === "true" || hash[booleanProp] === "") {                      // 266
      inputAtts[booleanProp] = "";                                                                                     // 267
    } else {                                                                                                           // 268
      // If the value is anything else, we don't render it                                                             // 269
      delete inputAtts[booleanProp];                                                                                   // 270
    }                                                                                                                  // 271
  });                                                                                                                  // 272
                                                                                                                       // 273
  /*                                                                                                                   // 274
   * Get select options                                                                                                // 275
   */                                                                                                                  // 276
                                                                                                                       // 277
  var selectOptions = hash.options;                                                                                    // 278
                                                                                                                       // 279
  // Handle options="allowed"                                                                                          // 280
  if (selectOptions === "allowed") {                                                                                   // 281
    selectOptions = _.map(defs.allowedValues, function(v) {                                                            // 282
      var label = v;                                                                                                   // 283
      if (hash.capitalize && v.length > 0 && schemaType === String) {                                                  // 284
        label = v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();                                                  // 285
      }                                                                                                                // 286
                                                                                                                       // 287
      return {label: label, value: v};                                                                                 // 288
    });                                                                                                                // 289
  }                                                                                                                    // 290
  // If options are specified in the schema, they may be a function                                                    // 291
  // that has not yet been evaluated.                                                                                  // 292
  else if (typeof selectOptions === "function") {                                                                      // 293
    selectOptions = selectOptions();                                                                                   // 294
  }                                                                                                                    // 295
  // Hashtable                                                                                                         // 296
  if (_.isObject(selectOptions) && !_.isArray(selectOptions)) {                                                        // 297
    selectOptions = _.map(selectOptions, function(v, k) {                                                              // 298
      return {label: v, value: schemaType(k)};                                                                         // 299
    });                                                                                                                // 300
  }                                                                                                                    // 301
                                                                                                                       // 302
  /*                                                                                                                   // 303
   * Return the context. This is the object that becomes `this` in the                                                 // 304
   * input type template.                                                                                              // 305
   */                                                                                                                  // 306
                                                                                                                       // 307
  return {                                                                                                             // 308
    name: inputAtts.name,                                                                                              // 309
    schemaType: schemaType,                                                                                            // 310
    min: (typeof defs.min === "function") ? defs.min() : defs.min,                                                     // 311
    max: (typeof defs.max === "function") ? defs.max() : defs.max,                                                     // 312
    decimal: defs.decimal,                                                                                             // 313
    value: value,                                                                                                      // 314
    atts: inputAtts,                                                                                                   // 315
    selectOptions: selectOptions                                                                                       // 316
  };                                                                                                                   // 317
};                                                                                                                     // 318
                                                                                                                       // 319
updateTrackedFieldValue = function updateTrackedFieldValue(formId, key) {                                              // 320
  formValues[formId] = formValues[formId] || {};                                                                       // 321
  formValues[formId][key] = formValues[formId][key] || new Tracker.Dependency();                                       // 322
  formValues[formId][key].changed();                                                                                   // 323
};                                                                                                                     // 324
                                                                                                                       // 325
updateAllTrackedFieldValues = function updateAllTrackedFieldValues(formId) {                                           // 326
  _.each(formValues[formId], function (o, key) {                                                                       // 327
    updateTrackedFieldValue(formId, key);                                                                              // 328
  });                                                                                                                  // 329
};                                                                                                                     // 330
                                                                                                                       // 331
getAllFieldsInForm = function getAllFieldsInForm(template) {                                                           // 332
  // Get all elements with `data-schema-key` attribute, unless disabled                                                // 333
  return template.$("[data-schema-key]").not("[disabled]");                                                            // 334
  // Exclude fields in sub-forms, since they will belong to a different AutoForm and schema.                           // 335
  // TODO need some selector/filter that actually works correctly for excluding subforms                               // 336
  // return template.$('[data-schema-key]').not("[disabled]").not(template.$('form form [data-schema-key]'));          // 337
};                                                                                                                     // 338
                                                                                                                       // 339
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-api.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* global AutoForm:true */                                                                                             // 1
/* global formPreserve */                                                                                              // 2
/* global Utility */                                                                                                   // 3
/* global Hooks */                                                                                                     // 4
/* global templatesById */                                                                                             // 5
/* global deps */                                                                                                      // 6
/* global globalDefaultTemplate:true */                                                                                // 7
/* global defaultTypeTemplates:true */                                                                                 // 8
/* global SimpleSchema */                                                                                              // 9
/* global getFormValues */                                                                                             // 10
/* global formValues */                                                                                                // 11
/* global formData */                                                                                                  // 12
/* global inputTypeDefinitions */                                                                                      // 13
/* global _validateField */                                                                                            // 14
/* global _validateForm */                                                                                             // 15
/* global arrayTracker */                                                                                              // 16
/* global getInputType */                                                                                              // 17
/* global formDeps */                                                                                                  // 18
                                                                                                                       // 19
// This file defines the public, exported API                                                                          // 20
                                                                                                                       // 21
AutoForm = AutoForm || {}; //exported                                                                                  // 22
                                                                                                                       // 23
AutoForm.formPreserve = formPreserve;                                                                                  // 24
                                                                                                                       // 25
AutoForm.Utility = Utility;                                                                                            // 26
                                                                                                                       // 27
/**                                                                                                                    // 28
 * @method AutoForm.addHooks                                                                                           // 29
 * @public                                                                                                             // 30
 * @param {String[]|String|null} formIds Form `id` or array of form IDs to which these hooks apply. Specify `null` to add hooks that will run for every form.
 * @param {Object} hooks Hooks to add, where supported names are "before", "after", "formToDoc", "docToForm", "onSubmit", "onSuccess", and "onError".
 * @returns {undefined}                                                                                                // 33
 *                                                                                                                     // 34
 * Defines hooks to be used by one or more forms. Extends hooks lists if called multiple times for the same            // 35
 * form.                                                                                                               // 36
 */                                                                                                                    // 37
AutoForm.addHooks = function autoFormAddHooks(formIds, hooks, replace) {                                               // 38
  if (typeof formIds === "string") {                                                                                   // 39
    formIds = [formIds];                                                                                               // 40
  }                                                                                                                    // 41
                                                                                                                       // 42
  // If formIds is null, add global hooks                                                                              // 43
  if (!formIds) {                                                                                                      // 44
    Hooks.addHooksToList(Hooks.global, hooks, replace);                                                                // 45
  } else {                                                                                                             // 46
    _.each(formIds, function (formId) {                                                                                // 47
                                                                                                                       // 48
      // Init the hooks object if not done yet                                                                         // 49
      Hooks.form[formId] = Hooks.form[formId] || {                                                                     // 50
        before: {},                                                                                                    // 51
        after: {},                                                                                                     // 52
        formToDoc: [],                                                                                                 // 53
        docToForm: [],                                                                                                 // 54
        onSubmit: [],                                                                                                  // 55
        onSuccess: [],                                                                                                 // 56
        onError: [],                                                                                                   // 57
        beginSubmit: [],                                                                                               // 58
        endSubmit: []                                                                                                  // 59
      };                                                                                                               // 60
                                                                                                                       // 61
      Hooks.addHooksToList(Hooks.form[formId], hooks, replace);                                                        // 62
    });                                                                                                                // 63
  }                                                                                                                    // 64
};                                                                                                                     // 65
                                                                                                                       // 66
/**                                                                                                                    // 67
 * @method AutoForm.hooks                                                                                              // 68
 * @public                                                                                                             // 69
 * @param {Object} hooks                                                                                               // 70
 * @returns {undefined}                                                                                                // 71
 *                                                                                                                     // 72
 * Defines hooks by form id. Extends hooks lists if called multiple times for the same                                 // 73
 * form.                                                                                                               // 74
 */                                                                                                                    // 75
AutoForm.hooks = function autoFormHooks(hooks, replace) {                                                              // 76
  _.each(hooks, function(hooksObj, formId) {                                                                           // 77
    AutoForm.addHooks(formId, hooksObj, replace);                                                                      // 78
  });                                                                                                                  // 79
};                                                                                                                     // 80
                                                                                                                       // 81
/**                                                                                                                    // 82
 * @method AutoForm.resetForm                                                                                          // 83
 * @public                                                                                                             // 84
 * @param {String} formId                                                                                              // 85
 * @param {TemplateInstance} [template] Looked up if not provided. Pass in for efficiency.                             // 86
 * @returns {undefined}                                                                                                // 87
 *                                                                                                                     // 88
 * Resets an autoform, including resetting validation errors. The same as clicking the reset button for an autoform.   // 89
 */                                                                                                                    // 90
AutoForm.resetForm = function autoFormResetForm(formId, template) {                                                    // 91
  template = template || templatesById[formId];                                                                        // 92
                                                                                                                       // 93
  if (template && template.view._domrange) {                                                                           // 94
    template.$("form")[0].reset();                                                                                     // 95
  }                                                                                                                    // 96
};                                                                                                                     // 97
                                                                                                                       // 98
/**                                                                                                                    // 99
 * @method AutoForm.setDefaultTemplate                                                                                 // 100
 * @public                                                                                                             // 101
 * @param {String} template                                                                                            // 102
 */                                                                                                                    // 103
AutoForm.setDefaultTemplate = function autoFormSetDefaultTemplate(template) {                                          // 104
  globalDefaultTemplate = template;                                                                                    // 105
  deps.defaultTemplate.changed();                                                                                      // 106
};                                                                                                                     // 107
                                                                                                                       // 108
/**                                                                                                                    // 109
 * @method AutoForm.getDefaultTemplate                                                                                 // 110
 * @public                                                                                                             // 111
 *                                                                                                                     // 112
 * Reactive.                                                                                                           // 113
 */                                                                                                                    // 114
AutoForm.getDefaultTemplate = function autoFormGetDefaultTemplate() {                                                  // 115
  deps.defaultTemplate.depend();                                                                                       // 116
  return globalDefaultTemplate;                                                                                        // 117
};                                                                                                                     // 118
                                                                                                                       // 119
/**                                                                                                                    // 120
 * @method AutoForm.setDefaultTemplateForType                                                                          // 121
 * @public                                                                                                             // 122
 * @param {String} type                                                                                                // 123
 * @param {String} template                                                                                            // 124
 */                                                                                                                    // 125
AutoForm.setDefaultTemplateForType = function autoFormSetDefaultTemplateForType(type, template) {                      // 126
  if (!deps.defaultTypeTemplates[type]) {                                                                              // 127
    deps.defaultTypeTemplates[type] = new Tracker.Dependency();                                                        // 128
  }                                                                                                                    // 129
  if (template !== null && !Template[type + "_" + template]) {                                                         // 130
    throw new Error("setDefaultTemplateForType can't set default template to \"" + template + "\" for type \"" + type + "\" because there is no defined template with the name \"" + type + "_" + template + "\"");
  }                                                                                                                    // 132
  defaultTypeTemplates[type] = template;                                                                               // 133
  deps.defaultTypeTemplates[type].changed();                                                                           // 134
};                                                                                                                     // 135
                                                                                                                       // 136
/**                                                                                                                    // 137
 * @method AutoForm.getDefaultTemplateForType                                                                          // 138
 * @public                                                                                                             // 139
 * @param {String} type                                                                                                // 140
 * @return {String} Template name                                                                                      // 141
 *                                                                                                                     // 142
 * Reactive.                                                                                                           // 143
 */                                                                                                                    // 144
AutoForm.getDefaultTemplateForType = function autoFormGetDefaultTemplateForType(type) {                                // 145
  if (!deps.defaultTypeTemplates[type]) {                                                                              // 146
    deps.defaultTypeTemplates[type] = new Tracker.Dependency();                                                        // 147
  }                                                                                                                    // 148
  deps.defaultTypeTemplates[type].depend();                                                                            // 149
  return defaultTypeTemplates[type];                                                                                   // 150
};                                                                                                                     // 151
                                                                                                                       // 152
/**                                                                                                                    // 153
 * @method AutoForm.getFormValues                                                                                      // 154
 * @public                                                                                                             // 155
 * @param {String} formId The `id` attribute of the `autoForm` you want current values for.                            // 156
 * @return {Object}                                                                                                    // 157
 *                                                                                                                     // 158
 * Returns an object representing the current values of all schema-based fields in the form.                           // 159
 * The returned object contains two properties, "insertDoc" and "updateDoc", which represent                           // 160
 * the field values as a normal object and as a MongoDB modifier, respectively.                                        // 161
 */                                                                                                                    // 162
AutoForm.getFormValues = function autoFormGetFormValues(formId) {                                                      // 163
  var template = templatesById[formId];                                                                                // 164
  if (!template || !template.view._domrange) {                                                                         // 165
    throw new Error("getFormValues: There is currently no autoForm template rendered for the form with id " + formId); // 166
  }                                                                                                                    // 167
  // Get a reference to the SimpleSchema instance that should be used for                                              // 168
  // determining what types we want back for each field.                                                               // 169
  var context = template.data;                                                                                         // 170
  var ss = AutoForm.Utility.getSimpleSchemaFromContext(context, formId);                                               // 171
  return getFormValues(template, formId, ss);                                                                          // 172
};                                                                                                                     // 173
                                                                                                                       // 174
/**                                                                                                                    // 175
 * @method AutoForm.getFieldValue                                                                                      // 176
 * @public                                                                                                             // 177
 * @param {String} formId The `id` attribute of the `autoForm` you want current values for.                            // 178
 * @param {String} fieldName The name of the field for which you want the current value.                               // 179
 * @return {Any}                                                                                                       // 180
 *                                                                                                                     // 181
 * Returns the value of the field (the value that would be used if the form were submitted right now).                 // 182
 * This is a reactive method that will rerun whenever the current value of the requested field changes.                // 183
 */                                                                                                                    // 184
AutoForm.getFieldValue = function autoFormGetFieldValue(formId, fieldName) {                                           // 185
  // reactive dependency                                                                                               // 186
  formValues[formId] = formValues[formId] || {};                                                                       // 187
  formValues[formId][fieldName] = formValues[formId][fieldName] || new Tracker.Dependency();                           // 188
  formValues[formId][fieldName].depend();                                                                              // 189
                                                                                                                       // 190
  // find AutoForm template                                                                                            // 191
  var template = templatesById[formId];                                                                                // 192
  if (!template || !template.view._domrange) {                                                                         // 193
    return;                                                                                                            // 194
  }                                                                                                                    // 195
                                                                                                                       // 196
  // find AutoForm schema                                                                                              // 197
  var data = formData[formId];                                                                                         // 198
  // ss will be the schema for the `schema` attribute if present,                                                      // 199
  // else the schema for the collection                                                                                // 200
  var ss = data.ss;                                                                                                    // 201
                                                                                                                       // 202
  // get element reference                                                                                             // 203
  var element = template.$('[data-schema-key="' + fieldName + '"]')[0];                                                // 204
                                                                                                                       // 205
  return AutoForm.getInputValue(element, ss);                                                                          // 206
};                                                                                                                     // 207
                                                                                                                       // 208
/**                                                                                                                    // 209
 * @method AutoForm.getInputTypeTemplateNameForElement                                                                 // 210
 * @public                                                                                                             // 211
 * @param {DOMElement} element The input DOM element, generated by an autoform input control                           // 212
 * @return {String}                                                                                                    // 213
 *                                                                                                                     // 214
 * Returns the name of the template used to render the element.                                                        // 215
 */                                                                                                                    // 216
AutoForm.getInputTypeTemplateNameForElement = function autoFormGetInputTypeTemplateNameForElement(element) {           // 217
  // get the enclosing view                                                                                            // 218
  var view = Blaze.getView(element);                                                                                   // 219
  // if the enclosing view is not a template, perhaps because                                                          // 220
  // the template contains a block helper like if, with, each,                                                         // 221
  // then look up the view chain until we arrive at a template                                                         // 222
  while (view && view.name.slice(0, 9) !== "Template.") {                                                              // 223
    view = view.parentView;                                                                                            // 224
  }                                                                                                                    // 225
                                                                                                                       // 226
  if (!view) {                                                                                                         // 227
    throw new Error("The element does not appear to be in a template view");                                           // 228
  }                                                                                                                    // 229
                                                                                                                       // 230
  // View names have "Template." at the beginning so we slice that off.                                                // 231
  return view.name.slice(9);                                                                                           // 232
};                                                                                                                     // 233
                                                                                                                       // 234
/**                                                                                                                    // 235
 * @method AutoForm.getInputValue                                                                                      // 236
 * @public                                                                                                             // 237
 * @param {DOMElement} element The input DOM element, generated by an autoform input control, which must have a `data-schema-key` attribute set to the correct schema key name.
 * @param {SimpleSchema} [ss] Provide the SimpleSchema instance if you already have it.                                // 239
 * @return {Any}                                                                                                       // 240
 *                                                                                                                     // 241
 * Returns the value of the field (the value that would be used if the form were submitted right now).                 // 242
 * Unlike `AutoForm.getFieldValue`, this function is not reactive.                                                     // 243
 */                                                                                                                    // 244
AutoForm.getInputValue = function autoFormGetInputValue(element, ss) {                                                 // 245
  var field, fieldName, fieldType, arrayItemFieldType, val, typeDef, inputTypeTemplate, dataContext, autoConvert;      // 246
                                                                                                                       // 247
  dataContext = Blaze.getData(element);                                                                                // 248
  if (dataContext && dataContext.atts) {                                                                               // 249
    autoConvert = dataContext.atts.autoConvert;                                                                        // 250
  }                                                                                                                    // 251
                                                                                                                       // 252
  // Get jQuery field reference                                                                                        // 253
  field = $(element);                                                                                                  // 254
                                                                                                                       // 255
  // Get the field/schema key name                                                                                     // 256
  fieldName = field.attr("data-schema-key");                                                                           // 257
                                                                                                                       // 258
  // If we have a schema, we can autoconvert to the correct data type                                                  // 259
  if (ss) {                                                                                                            // 260
    fieldType = ss.schema(fieldName).type;                                                                             // 261
  }                                                                                                                    // 262
                                                                                                                       // 263
  // Get the name of the input type template used to render the input element                                          // 264
  inputTypeTemplate = AutoForm.getInputTypeTemplateNameForElement(element);                                            // 265
                                                                                                                       // 266
  // Slice off the potential theme template, after the underscore.                                                     // 267
  inputTypeTemplate = inputTypeTemplate.split("_")[0];                                                                 // 268
                                                                                                                       // 269
  // Figure out what registered input type was used to render this element                                             // 270
  typeDef = _.where(inputTypeDefinitions, {template: inputTypeTemplate})[0];                                           // 271
                                                                                                                       // 272
  // If field has a "data-null-value" attribute, value should always be null                                           // 273
  if (field.attr("data-null-value") !== void 0) {                                                                      // 274
    val = null;                                                                                                        // 275
  }                                                                                                                    // 276
  // Otherwise get the field's value using the input type's `valueOut` function if provided                            // 277
  else if (typeDef && typeDef.valueOut) {                                                                              // 278
    val = typeDef.valueOut.call(field);                                                                                // 279
  }                                                                                                                    // 280
  // Otherwise get the field's value in a default way                                                                  // 281
  else {                                                                                                               // 282
    val = field.val();                                                                                                 // 283
  }                                                                                                                    // 284
                                                                                                                       // 285
  // run through input's type converter if provided                                                                    // 286
  if (val !== void 0 && autoConvert !== false && typeDef && typeDef.valueConverters && fieldType) {                    // 287
    var converterFunc;                                                                                                 // 288
    if (fieldType === String) {                                                                                        // 289
      converterFunc = typeDef.valueConverters.string;                                                                  // 290
    } else if (fieldType === Number) {                                                                                 // 291
      converterFunc = typeDef.valueConverters.number;                                                                  // 292
    } else if (fieldType === Boolean) {                                                                                // 293
      converterFunc = typeDef.valueConverters.boolean;                                                                 // 294
    } else if (fieldType === Date) {                                                                                   // 295
      converterFunc = typeDef.valueConverters.date;                                                                    // 296
    } else if (fieldType === Array) {                                                                                  // 297
      arrayItemFieldType = ss.schema(fieldName + ".$").type;                                                           // 298
      if (arrayItemFieldType === String) {                                                                             // 299
        converterFunc = typeDef.valueConverters.stringArray;                                                           // 300
      } else if (arrayItemFieldType === Number) {                                                                      // 301
        converterFunc = typeDef.valueConverters.numberArray;                                                           // 302
      } else if (arrayItemFieldType === Boolean) {                                                                     // 303
        converterFunc = typeDef.valueConverters.booleanArray;                                                          // 304
      } else if (arrayItemFieldType === Date) {                                                                        // 305
        converterFunc = typeDef.valueConverters.dateArray;                                                             // 306
      }                                                                                                                // 307
    }                                                                                                                  // 308
                                                                                                                       // 309
    if (typeof converterFunc === "function") {                                                                         // 310
      val = converterFunc.call(field, val);                                                                            // 311
    }                                                                                                                  // 312
  }                                                                                                                    // 313
                                                                                                                       // 314
  return val;                                                                                                          // 315
};                                                                                                                     // 316
                                                                                                                       // 317
/**                                                                                                                    // 318
 * @method AutoForm.addInputType                                                                                       // 319
 * @public                                                                                                             // 320
 * @param {String} name The type string that this definition is for.                                                   // 321
 * @param {Object} definition Defines how the input type should be rendered.                                           // 322
 * @param {String} definition.componentName The component name. A template with the name <componentName>_bootstrap3, and potentially others, must be defined.
 * @return {undefined}                                                                                                 // 324
 *                                                                                                                     // 325
 * Use this method to add custom input components.                                                                     // 326
 */                                                                                                                    // 327
AutoForm.addInputType = function afAddInputType(name, definition) {                                                    // 328
  var obj = {};                                                                                                        // 329
  obj[name] = definition;                                                                                              // 330
  _.extend(inputTypeDefinitions, obj);                                                                                 // 331
};                                                                                                                     // 332
                                                                                                                       // 333
/**                                                                                                                    // 334
 * @method AutoForm.validateField                                                                                      // 335
 * @public                                                                                                             // 336
 * @param {String} formId The `id` attribute of the `autoForm` you want to validate.                                   // 337
 * @param {String} fieldName The name of the field within the `autoForm` you want to validate.                         // 338
 * @param {Boolean} [skipEmpty=false] Set to `true` to skip validation if the field has no value. Useful for preventing `required` errors in form fields that the user has not yet filled out.
 * @return {Boolean} Is it valid?                                                                                      // 340
 *                                                                                                                     // 341
 * In addition to returning a boolean that indicates whether the field is currently valid,                             // 342
 * this method causes the reactive validation messages to appear.                                                      // 343
 */                                                                                                                    // 344
AutoForm.validateField = function autoFormValidateField(formId, fieldName, skipEmpty) {                                // 345
  var template = templatesById[formId];                                                                                // 346
  if (!template || !template.view._domrange) {                                                                         // 347
    throw new Error("validateField: There is currently no autoForm template rendered for the form with id " + formId); // 348
  }                                                                                                                    // 349
                                                                                                                       // 350
  return _validateField(fieldName, template, skipEmpty, false);                                                        // 351
};                                                                                                                     // 352
                                                                                                                       // 353
/**                                                                                                                    // 354
 * @method AutoForm.validateForm                                                                                       // 355
 * @public                                                                                                             // 356
 * @param {String} formId The `id` attribute of the `autoForm` you want to validate.                                   // 357
 * @return {Boolean} Is it valid?                                                                                      // 358
 *                                                                                                                     // 359
 * In addition to returning a boolean that indicates whether the form is currently valid,                              // 360
 * this method causes the reactive validation messages to appear.                                                      // 361
 */                                                                                                                    // 362
AutoForm.validateForm = function autoFormValidateForm(formId) {                                                        // 363
  // Gather all form values                                                                                            // 364
  var formDocs = AutoForm.getFormValues(formId);                                                                       // 365
                                                                                                                       // 366
  return _validateForm(formId, formData[formId], formDocs);                                                            // 367
};                                                                                                                     // 368
                                                                                                                       // 369
/**                                                                                                                    // 370
 * @method AutoForm.getValidationContext                                                                               // 371
 * @public                                                                                                             // 372
 * @param {String} formId The `id` attribute of the `autoForm` for which you want the validation context               // 373
 * @return {SimpleSchemaValidationContext} The SimpleSchema validation context object.                                 // 374
 *                                                                                                                     // 375
 * Use this method to get the validation context, which can be used to check                                           // 376
 * the current invalid fields, manually invalidate fields, etc.                                                        // 377
 */                                                                                                                    // 378
AutoForm.getValidationContext = function autoFormGetValidationContext(formId) {                                        // 379
  var data = formData[formId];                                                                                         // 380
  // ss will be the schema for the `schema` attribute if present,                                                      // 381
  // else the schema for the collection                                                                                // 382
  var ss = data.ss;                                                                                                    // 383
  return ss.namedContext(formId);                                                                                      // 384
};                                                                                                                     // 385
                                                                                                                       // 386
/**                                                                                                                    // 387
 * @method AutoForm.find                                                                                               // 388
 * @public                                                                                                             // 389
 * @return {Object} The data context for the closest autoform.                                                         // 390
 *                                                                                                                     // 391
 * Call this method from a UI helper to get the data context for the closest autoform. Always returns the context or throws an error.
 */                                                                                                                    // 393
AutoForm.find = function autoFormFind(type) {                                                                          // 394
  var n = 0, af;                                                                                                       // 395
  do {                                                                                                                 // 396
    af = Template.parentData(n++);                                                                                     // 397
  } while (af && !af._af);                                                                                             // 398
  if (!af || !af._af) {                                                                                                // 399
    throw new Error((type || "AutoForm.find") + " must be used within an autoForm block");                             // 400
  }                                                                                                                    // 401
  return af._af;                                                                                                       // 402
};                                                                                                                     // 403
                                                                                                                       // 404
/**                                                                                                                    // 405
 * @method AutoForm.findAttribute                                                                                      // 406
 * @param {String} attrName Attribute name                                                                             // 407
 * @public                                                                                                             // 408
 * @return {Any|undefined} Searches for the given attribute, looking up the parent context tree until the closest autoform is reached.
 *                                                                                                                     // 410
 * Call this method from a UI helper. Might return undefined.                                                          // 411
 */                                                                                                                    // 412
AutoForm.findAttribute = function autoFormFindAttribute(attrName) {                                                    // 413
  var n = 0, af, val, stopAt = -1;                                                                                     // 414
  // we go one level past _af so that we get the original autoForm or quickForm attributes, too                        // 415
  do {                                                                                                                 // 416
    af = Template.parentData(n++);                                                                                     // 417
    if (af && af.atts && af.atts[attrName] !== void 0) {                                                               // 418
      val = af.atts[attrName];                                                                                         // 419
    } else if (af && af[attrName] !== void 0) {                                                                        // 420
      val = af[attrName];                                                                                              // 421
    }                                                                                                                  // 422
    if (af && af._af) {                                                                                                // 423
      stopAt = n + 1;                                                                                                  // 424
    }                                                                                                                  // 425
  } while (af && stopAt < n && val === void 0);                                                                        // 426
  return val;                                                                                                          // 427
};                                                                                                                     // 428
                                                                                                                       // 429
/**                                                                                                                    // 430
 * @method AutoForm.findAttributesWithPrefix                                                                           // 431
 * @param {String} prefix Attribute prefix                                                                             // 432
 * @public                                                                                                             // 433
 * @return {Object} An object containing all of the found attributes and their values, with the prefix removed from the keys.
 *                                                                                                                     // 435
 * Call this method from a UI helper. Searches for attributes that start with the given prefix, looking up the parent context tree until the closest autoform is reached.
 */                                                                                                                    // 437
AutoForm.findAttributesWithPrefix = function autoFormFindAttributesWithPrefix(prefix) {                                // 438
  var n = 0, af, searchObj, stopAt = -1, obj = {};                                                                     // 439
  // we go one level past _af so that we get the original autoForm or quickForm attributes, too                        // 440
  do {                                                                                                                 // 441
    af = Template.parentData(n++);                                                                                     // 442
    if (af) {                                                                                                          // 443
      if (af.atts) {                                                                                                   // 444
        searchObj = af.atts;                                                                                           // 445
      } else {                                                                                                         // 446
        searchObj = af;                                                                                                // 447
      }                                                                                                                // 448
      if (_.isObject(searchObj)) {                                                                                     // 449
        _.each(searchObj, function (v, k) {                                                                            // 450
          if (k.indexOf(prefix) === 0) {                                                                               // 451
            obj[k.slice(prefix.length)] = v;                                                                           // 452
          }                                                                                                            // 453
        });                                                                                                            // 454
      }                                                                                                                // 455
      if (af._af) {                                                                                                    // 456
        stopAt = n + 1;                                                                                                // 457
      }                                                                                                                // 458
    }                                                                                                                  // 459
  } while (af && stopAt < n);                                                                                          // 460
  return obj;                                                                                                          // 461
};                                                                                                                     // 462
                                                                                                                       // 463
/**                                                                                                                    // 464
 * @method AutoForm.debug                                                                                              // 465
 * @public                                                                                                             // 466
 *                                                                                                                     // 467
 * Call this method in client code while developing to turn on extra logging.                                          // 468
 */                                                                                                                    // 469
AutoForm.debug = function autoFormDebug() {                                                                            // 470
  SimpleSchema.debug = true;                                                                                           // 471
  AutoForm._debug = true;                                                                                              // 472
  AutoForm.addHooks(null, {                                                                                            // 473
    onError: function (operation, error) {                                                                             // 474
      console.log("Error in " + this.formId, operation, error);                                                        // 475
    }                                                                                                                  // 476
  });                                                                                                                  // 477
};                                                                                                                     // 478
                                                                                                                       // 479
/**                                                                                                                    // 480
 * @property AutoForm.arrayTracker                                                                                     // 481
 * @public                                                                                                             // 482
 */                                                                                                                    // 483
AutoForm.arrayTracker = arrayTracker;                                                                                  // 484
                                                                                                                       // 485
/**                                                                                                                    // 486
 * @method AutoForm.getInputType                                                                                       // 487
 * @param {Object} atts The attributes provided to afFieldInput.                                                       // 488
 * @public                                                                                                             // 489
 * @return {String} The input type. Most are the same as the `type` attributes for HTML input elements, but some are special strings that autoform interprets.
 *                                                                                                                     // 491
 * Call this method from a UI helper to get the type string for the input control.                                     // 492
 */                                                                                                                    // 493
AutoForm.getInputType = getInputType;                                                                                  // 494
                                                                                                                       // 495
/**                                                                                                                    // 496
 * @method AutoForm.getSchemaForField                                                                                  // 497
 * @public                                                                                                             // 498
 * @param {String} name The field name attribute / schema key.                                                         // 499
 * @param {Object} [autoform] The autoform context. Optionally pass this if you've already retrieved it using AutoForm.find as a performance enhancement.
 * @return {Object}                                                                                                    // 501
 *                                                                                                                     // 502
 * Call this method from a UI helper to get the field definitions based on the schema used by the closest containing autoForm.
 * Always throws an error or returns the schema object.                                                                // 504
 */                                                                                                                    // 505
AutoForm.getSchemaForField = function autoFormGetSchemaForField(name, autoform) {                                      // 506
  var ss;                                                                                                              // 507
  if (autoform) {                                                                                                      // 508
    ss = autoform.ss;                                                                                                  // 509
  }                                                                                                                    // 510
  if (!ss) {                                                                                                           // 511
    ss = AutoForm.find().ss;                                                                                           // 512
  }                                                                                                                    // 513
  return AutoForm.Utility.getDefs(ss, name);                                                                           // 514
};                                                                                                                     // 515
                                                                                                                       // 516
/**                                                                                                                    // 517
 * @method AutoForm.invalidateFormContext                                                                              // 518
 * @public                                                                                                             // 519
 * @param {String} formId The form ID.                                                                                 // 520
 * @return {undefined}                                                                                                 // 521
 *                                                                                                                     // 522
 * Call this to force invalidate the form context, such as when you're changing the `doc`                              // 523
 * and it does not react by itself.                                                                                    // 524
 */                                                                                                                    // 525
AutoForm.invalidateFormContext = function autoFormInvalidateFormContext(formId) {                                      // 526
  formDeps[formId] = formDeps[formId] || new Tracker.Dependency();                                                     // 527
  formDeps[formId].changed();                                                                                          // 528
};                                                                                                                     // 529
                                                                                                                       // 530
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/boolean-checkbox/template.boolean-checkbox.js                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afCheckbox");                                                                                    // 2
Template["afCheckbox"] = new Template("Template.afCheckbox", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV(HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                                   // 5
    type: "checkbox",                                                                                                  // 6
    value: "true"                                                                                                      // 7
  }, function() {                                                                                                      // 8
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 9
  })), " ", Blaze.View(function() {                                                                                    // 10
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                          // 11
      name: Spacebars.dot(view.lookup("."), "name")                                                                    // 12
    }));                                                                                                               // 13
  })));                                                                                                                // 14
}));                                                                                                                   // 15
                                                                                                                       // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/boolean-checkbox/boolean-checkbox.js                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("boolean-checkbox", {                                                                            // 1
  template: "afCheckbox",                                                                                              // 2
  valueOut: function () {                                                                                              // 3
    return !!this.is(":checked");                                                                                      // 4
  },                                                                                                                   // 5
  valueConverters: {                                                                                                   // 6
    "string": function (val) {                                                                                         // 7
      if (val === true) {                                                                                              // 8
        return "TRUE";                                                                                                 // 9
      } else if (val === false) {                                                                                      // 10
        return "FALSE";                                                                                                // 11
      }                                                                                                                // 12
      return val;                                                                                                      // 13
    },                                                                                                                 // 14
    "stringArray": function (val) {                                                                                    // 15
      if (val === true) {                                                                                              // 16
        return ["TRUE"];                                                                                               // 17
      } else if (val === false) {                                                                                      // 18
        return ["FALSE"];                                                                                              // 19
      }                                                                                                                // 20
      return val;                                                                                                      // 21
    },                                                                                                                 // 22
    "number": function (val) {                                                                                         // 23
      if (val === true) {                                                                                              // 24
        return 1;                                                                                                      // 25
      } else if (val === false) {                                                                                      // 26
        return 0;                                                                                                      // 27
      }                                                                                                                // 28
      return val;                                                                                                      // 29
    },                                                                                                                 // 30
    "numberArray": function (val) {                                                                                    // 31
      if (val === true) {                                                                                              // 32
        return [1];                                                                                                    // 33
      } else if (val === false) {                                                                                      // 34
        return [0];                                                                                                    // 35
      }                                                                                                                // 36
      return val;                                                                                                      // 37
    }                                                                                                                  // 38
  },                                                                                                                   // 39
  contextAdjust: function (context) {                                                                                  // 40
    if (context.value === true) {                                                                                      // 41
      context.atts.checked = "";                                                                                       // 42
    }                                                                                                                  // 43
    //don't add required attribute to checkboxes because some browsers assume that to mean that it must be checked, which is not what we mean by "required"
    delete context.atts.required;                                                                                      // 45
    return context;                                                                                                    // 46
  }                                                                                                                    // 47
});                                                                                                                    // 48
                                                                                                                       // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/boolean-radios/template.boolean-radios.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afBooleanRadioGroup");                                                                           // 2
Template["afBooleanRadioGroup"] = new Template("Template.afBooleanRadioGroup", (function() {                           // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV(HTML.Attrs(function() {                                                                              // 5
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 6
  }), "\n    ", HTML.DIV("\n      ", HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                // 7
    type: "radio",                                                                                                     // 8
    value: "false",                                                                                                    // 9
    name: function() {                                                                                                 // 10
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));                                              // 11
    }                                                                                                                  // 12
  }, function() {                                                                                                      // 13
    return Spacebars.attrMustache(view.lookup("falseAtts"));                                                           // 14
  })), " ", Spacebars.With(function() {                                                                                // 15
    return Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "falseLabel"));                                      // 16
  }, function() {                                                                                                      // 17
    return Blaze.View(function() {                                                                                     // 18
      return Spacebars.mustache(view.lookup("."));                                                                     // 19
    });                                                                                                                // 20
  }, function() {                                                                                                      // 21
    return "False";                                                                                                    // 22
  })), "\n    "), "\n    ", HTML.DIV("\n      ", HTML.LABEL(HTML.INPUT(HTML.Attrs({                                    // 23
    type: "radio",                                                                                                     // 24
    value: "true",                                                                                                     // 25
    name: function() {                                                                                                 // 26
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));                                              // 27
    }                                                                                                                  // 28
  }, function() {                                                                                                      // 29
    return Spacebars.attrMustache(view.lookup("trueAtts"));                                                            // 30
  })), " ", Spacebars.With(function() {                                                                                // 31
    return Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "trueLabel"));                                       // 32
  }, function() {                                                                                                      // 33
    return Blaze.View(function() {                                                                                     // 34
      return Spacebars.mustache(view.lookup("."));                                                                     // 35
    });                                                                                                                // 36
  }, function() {                                                                                                      // 37
    return "True";                                                                                                     // 38
  })), "\n    "), "\n  ");                                                                                             // 39
}));                                                                                                                   // 40
                                                                                                                       // 41
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/boolean-radios/boolean-radios.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("boolean-radios", {                                                                              // 1
  template: "afBooleanRadioGroup",                                                                                     // 2
  valueOut: function () {                                                                                              // 3
    if (this.find('input[value=false]').is(":checked")) {                                                              // 4
      return false;                                                                                                    // 5
    } else if (this.find('input[value=true]').is(":checked")) {                                                        // 6
      return true;                                                                                                     // 7
    }                                                                                                                  // 8
  },                                                                                                                   // 9
  valueConverters: {                                                                                                   // 10
    "string": function (val) {                                                                                         // 11
      if (val === true) {                                                                                              // 12
        return "TRUE";                                                                                                 // 13
      } else if (val === false) {                                                                                      // 14
        return "FALSE";                                                                                                // 15
      }                                                                                                                // 16
      return val;                                                                                                      // 17
    },                                                                                                                 // 18
    "stringArray": function (val) {                                                                                    // 19
      if (val === true) {                                                                                              // 20
        return ["TRUE"];                                                                                               // 21
      } else if (val === false) {                                                                                      // 22
        return ["FALSE"];                                                                                              // 23
      }                                                                                                                // 24
      return val;                                                                                                      // 25
    },                                                                                                                 // 26
    "number": function (val) {                                                                                         // 27
      if (val === true) {                                                                                              // 28
        return 1;                                                                                                      // 29
      } else if (val === false) {                                                                                      // 30
        return 0;                                                                                                      // 31
      }                                                                                                                // 32
      return val;                                                                                                      // 33
    },                                                                                                                 // 34
    "numberArray": function (val) {                                                                                    // 35
      if (val === true) {                                                                                              // 36
        return [1];                                                                                                    // 37
      } else if (val === false) {                                                                                      // 38
        return [0];                                                                                                    // 39
      }                                                                                                                // 40
      return val;                                                                                                      // 41
    }                                                                                                                  // 42
  }                                                                                                                    // 43
});                                                                                                                    // 44
                                                                                                                       // 45
Template["afBooleanRadioGroup"].helpers({                                                                              // 46
  falseAtts: function falseAtts() {                                                                                    // 47
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'data-schema-key');                                        // 48
    if (this.value === false) {                                                                                        // 49
      atts.checked = "";                                                                                               // 50
    }                                                                                                                  // 51
    return atts;                                                                                                       // 52
  },                                                                                                                   // 53
  trueAtts: function trueAtts() {                                                                                      // 54
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'data-schema-key');                                        // 55
    if (this.value === true) {                                                                                         // 56
      atts.checked = "";                                                                                               // 57
    }                                                                                                                  // 58
    return atts;                                                                                                       // 59
  },                                                                                                                   // 60
  dsk: function () {                                                                                                   // 61
    return {'data-schema-key': this.atts['data-schema-key']};                                                          // 62
  }                                                                                                                    // 63
});                                                                                                                    // 64
                                                                                                                       // 65
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/boolean-select/template.boolean-select.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afBooleanSelect");                                                                               // 2
Template["afBooleanSelect"] = new Template("Template.afBooleanSelect", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.SELECT(HTML.Attrs(function() {                                                                           // 5
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 6
  }), "\n    ", Blaze.Each(function() {                                                                                // 7
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", HTML.OPTION(HTML.Attrs(function() {                                                             // 10
      return Spacebars.attrMustache(view.lookup("optionAtts"));                                                        // 11
    }), Blaze.View(function() {                                                                                        // 12
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 13
    })), "\n    " ];                                                                                                   // 14
  }), "\n  ");                                                                                                         // 15
}));                                                                                                                   // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/boolean-select/boolean-select.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("boolean-select", {                                                                              // 1
  template: "afBooleanSelect",                                                                                         // 2
  valueOut: function () {                                                                                              // 3
    var val = this.val();                                                                                              // 4
    if (val === "true") {                                                                                              // 5
      return true;                                                                                                     // 6
    } else if (val === "false") {                                                                                      // 7
      return false;                                                                                                    // 8
    }                                                                                                                  // 9
  },                                                                                                                   // 10
  valueConverters: {                                                                                                   // 11
    "string": function (val) {                                                                                         // 12
      if (val === true) {                                                                                              // 13
        return "TRUE";                                                                                                 // 14
      } else if (val === false) {                                                                                      // 15
        return "FALSE";                                                                                                // 16
      }                                                                                                                // 17
      return val;                                                                                                      // 18
    },                                                                                                                 // 19
    "stringArray": function (val) {                                                                                    // 20
      if (val === true) {                                                                                              // 21
        return ["TRUE"];                                                                                               // 22
      } else if (val === false) {                                                                                      // 23
        return ["FALSE"];                                                                                              // 24
      }                                                                                                                // 25
      return val;                                                                                                      // 26
    },                                                                                                                 // 27
    "number": function (val) {                                                                                         // 28
      if (val === true) {                                                                                              // 29
        return 1;                                                                                                      // 30
      } else if (val === false) {                                                                                      // 31
        return 0;                                                                                                      // 32
      }                                                                                                                // 33
      return val;                                                                                                      // 34
    },                                                                                                                 // 35
    "numberArray": function (val) {                                                                                    // 36
      if (val === true) {                                                                                              // 37
        return [1];                                                                                                    // 38
      } else if (val === false) {                                                                                      // 39
        return [0];                                                                                                    // 40
      }                                                                                                                // 41
      return val;                                                                                                      // 42
    }                                                                                                                  // 43
  },                                                                                                                   // 44
  contextAdjust: function (context) {                                                                                  // 45
    var atts = _.omit(context.atts, 'trueLabel', 'falseLabel', 'firstOption');                                         // 46
                                                                                                                       // 47
    // build items list                                                                                                // 48
    context.items = [                                                                                                  // 49
      {                                                                                                                // 50
        name: context.name,                                                                                            // 51
        value: "",                                                                                                     // 52
        // _id must be included because it is a special property that                                                  // 53
        // #each uses to track unique list items when adding and removing them                                         // 54
        // See https://github.com/meteor/meteor/issues/2174                                                            // 55
        _id: "",                                                                                                       // 56
        selected: (context.value !== false && context.value !== true),                                                 // 57
        label: context.atts.firstOption || "(Select One)",                                                             // 58
        atts: atts                                                                                                     // 59
      },                                                                                                               // 60
      {                                                                                                                // 61
        name: context.name,                                                                                            // 62
        value: "false",                                                                                                // 63
        // _id must be included because it is a special property that                                                  // 64
        // #each uses to track unique list items when adding and removing them                                         // 65
        // See https://github.com/meteor/meteor/issues/2174                                                            // 66
        _id: "false",                                                                                                  // 67
        selected: (context.value === false),                                                                           // 68
        label: context.atts.falseLabel || "False",                                                                     // 69
        atts: atts                                                                                                     // 70
      },                                                                                                               // 71
      {                                                                                                                // 72
        name: context.name,                                                                                            // 73
        value: "true",                                                                                                 // 74
        // _id must be included because it is a special property that                                                  // 75
        // #each uses to track unique list items when adding and removing them                                         // 76
        // See https://github.com/meteor/meteor/issues/2174                                                            // 77
        _id: "true",                                                                                                   // 78
        selected: (context.value === true),                                                                            // 79
        label: context.atts.trueLabel || "True",                                                                       // 80
        atts: atts                                                                                                     // 81
      }                                                                                                                // 82
    ];                                                                                                                 // 83
                                                                                                                       // 84
    return context;                                                                                                    // 85
  }                                                                                                                    // 86
});                                                                                                                    // 87
                                                                                                                       // 88
Template["afBooleanSelect"].helpers({                                                                                  // 89
  optionAtts: function afSelectOptionAtts() {                                                                          // 90
    var item = this;                                                                                                   // 91
    var atts = {                                                                                                       // 92
      value: item.value                                                                                                // 93
    };                                                                                                                 // 94
    if (item.selected) {                                                                                               // 95
      atts.selected = "";                                                                                              // 96
    }                                                                                                                  // 97
    return atts;                                                                                                       // 98
  }                                                                                                                    // 99
});                                                                                                                    // 100
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/button/template.button.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputButton");                                                                                 // 2
Template["afInputButton"] = new Template("Template.afInputButton", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "button",                                                                                                    // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/button/button.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("button", {                                                                                      // 1
  template: "afInputButton"                                                                                            // 2
});                                                                                                                    // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/color/template.color.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputColor");                                                                                  // 2
Template["afInputColor"] = new Template("Template.afInputColor", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "color",                                                                                                     // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/color/color.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("color", {                                                                                       // 1
  template: "afInputColor"                                                                                             // 2
});                                                                                                                    // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/contenteditable/template.contenteditable.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afContenteditable");                                                                             // 2
Template["afContenteditable"] = new Template("Template.afContenteditable", (function() {                               // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV(HTML.Attrs({                                                                                         // 5
    contenteditable: "true"                                                                                            // 6
  }, function() {                                                                                                      // 7
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 8
  }), Blaze.View(function() {                                                                                          // 9
    return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("."), "value")));                            // 10
  }));                                                                                                                 // 11
}));                                                                                                                   // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/contenteditable/contenteditable.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("contenteditable", {                                                                             // 1
  template: "afContenteditable",                                                                                       // 2
  valueOut: function () {                                                                                              // 3
    return this.html();                                                                                                // 4
  },                                                                                                                   // 5
  contextAdjust: function (context) {                                                                                  // 6
    if (typeof context.atts['data-maxlength'] === "undefined" && typeof context.max === "number") {                    // 7
      context.atts['data-maxlength'] = context.max;                                                                    // 8
    }                                                                                                                  // 9
    return context;                                                                                                    // 10
  }                                                                                                                    // 11
});                                                                                                                    // 12
                                                                                                                       // 13
Template.afContenteditable.events({                                                                                    // 14
  'blur div[contenteditable=true]': function (event, template) {                                                       // 15
    template.$(event.target).change();                                                                                 // 16
  }                                                                                                                    // 17
});                                                                                                                    // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/date/template.date.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputDate");                                                                                   // 2
Template["afInputDate"] = new Template("Template.afInputDate", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "date",                                                                                                      // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/date/date.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("date", {                                                                                        // 1
  template: "afInputDate",                                                                                             // 2
  valueIn: function (val) {                                                                                            // 3
    //convert Date to string value                                                                                     // 4
    return (val instanceof Date) ? AutoForm.Utility.dateToDateStringUTC(val) : val;                                    // 5
  },                                                                                                                   // 6
  valueOut: function () {                                                                                              // 7
    var val = this.val();                                                                                              // 8
    if (AutoForm.Utility.isValidDateString(val)) {                                                                     // 9
      //Date constructor will interpret val as UTC and create                                                          // 10
      //date at mignight in the morning of val date in UTC time zone                                                   // 11
      return new Date(val);                                                                                            // 12
    } else {                                                                                                           // 13
      return null;                                                                                                     // 14
    }                                                                                                                  // 15
  },                                                                                                                   // 16
  valueConverters: {                                                                                                   // 17
    "string": function (val) {                                                                                         // 18
      return (val instanceof Date) ? AutoForm.Utility.dateToDateStringUTC(val) : val;                                  // 19
    },                                                                                                                 // 20
    "stringArray": function (val) {                                                                                    // 21
      if (val instanceof Date) {                                                                                       // 22
        return [AutoForm.Utility.dateToDateStringUTC(val)];                                                            // 23
      }                                                                                                                // 24
      return val;                                                                                                      // 25
    },                                                                                                                 // 26
    "number": function (val) {                                                                                         // 27
      return (val instanceof Date) ? val.getTime() : val;                                                              // 28
    },                                                                                                                 // 29
    "numberArray": function (val) {                                                                                    // 30
      if (val instanceof Date) {                                                                                       // 31
        return [val.getTime()];                                                                                        // 32
      }                                                                                                                // 33
      return val;                                                                                                      // 34
    },                                                                                                                 // 35
    "dateArray": function (val) {                                                                                      // 36
      if (val instanceof Date) {                                                                                       // 37
        return [val];                                                                                                  // 38
      }                                                                                                                // 39
      return val;                                                                                                      // 40
    }                                                                                                                  // 41
  },                                                                                                                   // 42
  contextAdjust: function (context) {                                                                                  // 43
    if (typeof context.atts.max === "undefined" && context.max instanceof Date) {                                      // 44
      context.atts.max = AutoForm.Utility.dateToDateStringUTC(context.max);                                            // 45
    }                                                                                                                  // 46
    if (typeof context.atts.min === "undefined" && context.min instanceof Date) {                                      // 47
      context.atts.min = AutoForm.Utility.dateToDateStringUTC(context.min);                                            // 48
    }                                                                                                                  // 49
    return context;                                                                                                    // 50
  }                                                                                                                    // 51
});                                                                                                                    // 52
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/datetime/template.datetime.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputDateTime");                                                                               // 2
Template["afInputDateTime"] = new Template("Template.afInputDateTime", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "datetime",                                                                                                  // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/datetime/datetime.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("datetime", {                                                                                    // 1
  template: "afInputDateTime",                                                                                         // 2
  valueIn: function (val) {                                                                                            // 3
    //convert Date to string value                                                                                     // 4
    return (val instanceof Date) ? AutoForm.Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString(val): val;        // 5
  },                                                                                                                   // 6
  valueOut: function () {                                                                                              // 7
    var val = this.val();                                                                                              // 8
    val = (typeof val === "string") ? val.replace(/ /g, "T") : val;                                                    // 9
    if (AutoForm.Utility.isValidNormalizedForcedUtcGlobalDateAndTimeString(val)) {                                     // 10
      //Date constructor will interpret val as UTC due to ending "Z"                                                   // 11
      return new Date(val);                                                                                            // 12
    } else {                                                                                                           // 13
      return null;                                                                                                     // 14
    }                                                                                                                  // 15
  },                                                                                                                   // 16
  valueConverters: {                                                                                                   // 17
    "string": function (val) {                                                                                         // 18
      return (val instanceof Date) ? AutoForm.Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString(val) : val;     // 19
    },                                                                                                                 // 20
    "stringArray": function (val) {                                                                                    // 21
      if (val instanceof Date) {                                                                                       // 22
        return [AutoForm.Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString(val)];                               // 23
      }                                                                                                                // 24
      return val;                                                                                                      // 25
    },                                                                                                                 // 26
    "number": function (val) {                                                                                         // 27
      return (val instanceof Date) ? val.getTime() : val;                                                              // 28
    },                                                                                                                 // 29
    "numberArray": function (val) {                                                                                    // 30
      if (val instanceof Date) {                                                                                       // 31
        return [val.getTime()];                                                                                        // 32
      }                                                                                                                // 33
      return val;                                                                                                      // 34
    },                                                                                                                 // 35
    "dateArray": function (val) {                                                                                      // 36
      if (val instanceof Date) {                                                                                       // 37
        return [val];                                                                                                  // 38
      }                                                                                                                // 39
      return val;                                                                                                      // 40
    }                                                                                                                  // 41
  },                                                                                                                   // 42
  contextAdjust: function (context) {                                                                                  // 43
    if (typeof context.atts.max === "undefined" && context.max instanceof Date) {                                      // 44
      context.atts.max = AutoForm.Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString(context.max);               // 45
    }                                                                                                                  // 46
    if (typeof context.atts.min === "undefined" && context.min instanceof Date) {                                      // 47
      context.atts.min = AutoForm.Utility.dateToNormalizedForcedUtcGlobalDateAndTimeString(context.min);               // 48
    }                                                                                                                  // 49
    return context;                                                                                                    // 50
  }                                                                                                                    // 51
});                                                                                                                    // 52
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/datetime-local/template.datetime-local.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputDateTimeLocal");                                                                          // 2
Template["afInputDateTimeLocal"] = new Template("Template.afInputDateTimeLocal", (function() {                         // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "datetime-local",                                                                                            // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/datetime-local/datetime-local.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("datetime-local", {                                                                              // 1
  template: "afInputDateTimeLocal",                                                                                    // 2
  valueIn: function (val, atts) {                                                                                      // 3
    //convert Date to string value                                                                                     // 4
    return (val instanceof Date) ? AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(val, atts.timezoneId) : val;
  },                                                                                                                   // 6
  valueOut: function () {                                                                                              // 7
    var val = this.val();                                                                                              // 8
    val = (typeof val === "string") ? val.replace(/ /g, "T") : val;                                                    // 9
    if (AutoForm.Utility.isValidNormalizedLocalDateAndTimeString(val)) {                                               // 10
      var timezoneId = this.attr("data-timezone-id");                                                                  // 11
      // default is local, but if there's a timezoneId, we use that                                                    // 12
      if (typeof timezoneId === "string") {                                                                            // 13
        if (typeof moment.tz !== "function") {                                                                         // 14
          throw new Error("If you specify a timezoneId, make sure that you've added a moment-timezone package to your app");
        }                                                                                                              // 16
        return moment.tz(val, timezoneId).toDate();                                                                    // 17
      } else {                                                                                                         // 18
        return moment(val).toDate();                                                                                   // 19
      }                                                                                                                // 20
    } else {                                                                                                           // 21
      return this.val();                                                                                               // 22
    }                                                                                                                  // 23
  },                                                                                                                   // 24
  valueConverters: {                                                                                                   // 25
    "string": function (val) {                                                                                         // 26
      return (val instanceof Date) ? AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(val, this.attr("data-timezone-id")) : val;
    },                                                                                                                 // 28
    "stringArray": function (val) {                                                                                    // 29
      if (val instanceof Date) {                                                                                       // 30
        return [AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(val, this.attr("data-timezone-id"))];          // 31
      }                                                                                                                // 32
      return val;                                                                                                      // 33
    },                                                                                                                 // 34
    "number": function (val) {                                                                                         // 35
      return (val instanceof Date) ? val.getTime() : val;                                                              // 36
    },                                                                                                                 // 37
    "numberArray": function (val) {                                                                                    // 38
      if (val instanceof Date) {                                                                                       // 39
        return [val.getTime()];                                                                                        // 40
      }                                                                                                                // 41
      return val;                                                                                                      // 42
    },                                                                                                                 // 43
    "dateArray": function (val) {                                                                                      // 44
      if (val instanceof Date) {                                                                                       // 45
        return [val];                                                                                                  // 46
      }                                                                                                                // 47
      return val;                                                                                                      // 48
    }                                                                                                                  // 49
  },                                                                                                                   // 50
  contextAdjust: function (context) {                                                                                  // 51
    if (typeof context.atts.max === "undefined" && context.max instanceof Date) {                                      // 52
      context.atts.max = AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(context.max, context.atts.timezoneId);
    }                                                                                                                  // 54
    if (typeof context.atts.min === "undefined" && context.min instanceof Date) {                                      // 55
      context.atts.min = AutoForm.Utility.dateToNormalizedLocalDateAndTimeString(context.min, context.atts.timezoneId);
    }                                                                                                                  // 57
    if (context.atts.timezoneId) {                                                                                     // 58
      context.atts["data-timezone-id"] = context.atts.timezoneId;                                                      // 59
    }                                                                                                                  // 60
    delete context.atts.timezoneId;                                                                                    // 61
    return context;                                                                                                    // 62
  }                                                                                                                    // 63
});                                                                                                                    // 64
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/email/template.email.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputEmail");                                                                                  // 2
Template["afInputEmail"] = new Template("Template.afInputEmail", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "email",                                                                                                     // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/email/email.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("email", {                                                                                       // 1
  template: "afInputEmail",                                                                                            // 2
  contextAdjust: function (context) {                                                                                  // 3
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {                            // 4
      context.atts.maxlength = context.max;                                                                            // 5
    }                                                                                                                  // 6
    return context;                                                                                                    // 7
  }                                                                                                                    // 8
});                                                                                                                    // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/file/template.file.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputFile");                                                                                   // 2
Template["afInputFile"] = new Template("Template.afInputFile", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "file",                                                                                                      // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/file/file.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("file", {                                                                                        // 1
  template: "afInputFile"                                                                                              // 2
});                                                                                                                    // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/hidden/template.hidden.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputHidden");                                                                                 // 2
Template["afInputHidden"] = new Template("Template.afInputHidden", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "hidden",                                                                                                    // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/hidden/hidden.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("hidden", {                                                                                      // 1
  template: "afInputHidden",                                                                                           // 2
  valueOut: function () {                                                                                              // 3
    return this.val();                                                                                                 // 4
  },                                                                                                                   // 5
  valueConverters: {                                                                                                   // 6
    "stringArray": function (val) {                                                                                    // 7
      if (typeof val === "string") {                                                                                   // 8
        val = val.split(",");                                                                                          // 9
        return _.map(val, function (item) {                                                                            // 10
          return $.trim(item);                                                                                         // 11
        });                                                                                                            // 12
      }                                                                                                                // 13
      return val;                                                                                                      // 14
    },                                                                                                                 // 15
    "number": AutoForm.Utility.stringToNumber,                                                                         // 16
    "numberArray": function (val) {                                                                                    // 17
      if (typeof val === "string") {                                                                                   // 18
        val = val.split(",");                                                                                          // 19
        return _.map(val, function (item) {                                                                            // 20
          item = $.trim(item);                                                                                         // 21
          return AutoForm.Utility.stringToNumber(item);                                                                // 22
        });                                                                                                            // 23
      }                                                                                                                // 24
      return val;                                                                                                      // 25
    },                                                                                                                 // 26
    "boolean": AutoForm.Utility.stringToBool,                                                                          // 27
    "booleanArray": function (val) {                                                                                   // 28
      if (typeof val === "string") {                                                                                   // 29
        val = val.split(",");                                                                                          // 30
        return _.map(val, function (item) {                                                                            // 31
          item = $.trim(item);                                                                                         // 32
          return AutoForm.Utility.stringToBool(item);                                                                  // 33
        });                                                                                                            // 34
      }                                                                                                                // 35
      return val;                                                                                                      // 36
    },                                                                                                                 // 37
    "date": AutoForm.Utility.stringToDate,                                                                             // 38
    "dateArray": function (val) {                                                                                      // 39
      if (typeof val === "string") {                                                                                   // 40
        val = val.split(",");                                                                                          // 41
        return _.map(val, function (item) {                                                                            // 42
          item = $.trim(item);                                                                                         // 43
          return AutoForm.Utility.stringToDate(item);                                                                  // 44
        });                                                                                                            // 45
      }                                                                                                                // 46
      return val;                                                                                                      // 47
    }                                                                                                                  // 48
  }                                                                                                                    // 49
});                                                                                                                    // 50
                                                                                                                       // 51
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/image/template.image.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputImage");                                                                                  // 2
Template["afInputImage"] = new Template("Template.afInputImage", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "image",                                                                                                     // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/image/image.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("image", {                                                                                       // 1
  template: "afInputImage"                                                                                             // 2
});                                                                                                                    // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/month/template.month.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputMonth");                                                                                  // 2
Template["afInputMonth"] = new Template("Template.afInputMonth", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "month",                                                                                                     // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/month/month.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("month", {                                                                                       // 1
  template: "afInputMonth",                                                                                            // 2
  valueConverters: {                                                                                                   // 3
    "stringArray": function (val) {                                                                                    // 4
      if (typeof val === "string" && val.length > 0) {                                                                 // 5
        return [val];                                                                                                  // 6
      }                                                                                                                // 7
      return val;                                                                                                      // 8
    }                                                                                                                  // 9
  }                                                                                                                    // 10
});                                                                                                                    // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/number/template.number.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputNumber");                                                                                 // 2
Template["afInputNumber"] = new Template("Template.afInputNumber", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "number",                                                                                                    // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/number/number.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("number", {                                                                                      // 1
  template: "afInputNumber",                                                                                           // 2
  valueOut: function () {                                                                                              // 3
    return AutoForm.Utility.stringToNumber(this.val());                                                                // 4
  },                                                                                                                   // 5
  valueConverters: {                                                                                                   // 6
    "string": function (val) {                                                                                         // 7
      if (typeof val === "number") {                                                                                   // 8
        return val.toString();                                                                                         // 9
      }                                                                                                                // 10
      return val;                                                                                                      // 11
    },                                                                                                                 // 12
    "stringArray": function (val) {                                                                                    // 13
      if (typeof val === "number") {                                                                                   // 14
        return [val.toString()];                                                                                       // 15
      }                                                                                                                // 16
      return val;                                                                                                      // 17
    },                                                                                                                 // 18
    "numberArray": function (val) {                                                                                    // 19
      if (typeof val === "number") {                                                                                   // 20
        return [val];                                                                                                  // 21
      }                                                                                                                // 22
      return val;                                                                                                      // 23
    },                                                                                                                 // 24
    "boolean": function (val) {                                                                                        // 25
      if (val === 0) {                                                                                                 // 26
        return false;                                                                                                  // 27
      } else if (val === 1) {                                                                                          // 28
        return true;                                                                                                   // 29
      }                                                                                                                // 30
      return val;                                                                                                      // 31
    },                                                                                                                 // 32
    "booleanArray": function (val) {                                                                                   // 33
      if (val === 0) {                                                                                                 // 34
        return [false];                                                                                                // 35
      } else if (val === 1) {                                                                                          // 36
        return [true];                                                                                                 // 37
      }                                                                                                                // 38
      return val;                                                                                                      // 39
    }                                                                                                                  // 40
  },                                                                                                                   // 41
  contextAdjust: function (context) {                                                                                  // 42
    if (typeof context.atts.max === "undefined" && typeof context.max === "number") {                                  // 43
      context.atts.max = context.max;                                                                                  // 44
    }                                                                                                                  // 45
    if (typeof context.atts.min === "undefined" && typeof context.min === "number") {                                  // 46
      context.atts.min = context.min;                                                                                  // 47
    }                                                                                                                  // 48
    if (typeof context.atts.step === "undefined" && context.decimal) {                                                 // 49
      context.atts.step = '0.01';                                                                                      // 50
    }                                                                                                                  // 51
    return context;                                                                                                    // 52
  }                                                                                                                    // 53
});                                                                                                                    // 54
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/password/template.password.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputPassword");                                                                               // 2
Template["afInputPassword"] = new Template("Template.afInputPassword", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "password",                                                                                                  // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/password/password.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("password", {                                                                                    // 1
  template: "afInputPassword",                                                                                         // 2
  valueConverters: {                                                                                                   // 3
    "stringArray": function (val) {                                                                                    // 4
      if (typeof val === "string" && val.length > 0) {                                                                 // 5
        return [val];                                                                                                  // 6
      }                                                                                                                // 7
      return val;                                                                                                      // 8
    }                                                                                                                  // 9
  },                                                                                                                   // 10
  contextAdjust: function (context) {                                                                                  // 11
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {                            // 12
      context.atts.maxlength = context.max;                                                                            // 13
    }                                                                                                                  // 14
    return context;                                                                                                    // 15
  }                                                                                                                    // 16
});                                                                                                                    // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/radio/template.radio.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afRadio");                                                                                       // 2
Template["afRadio"] = new Template("Template.afRadio", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV(HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                                   // 5
    type: "checkbox",                                                                                                  // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 11
  })), " ", Blaze.View(function() {                                                                                    // 12
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                          // 13
      name: Spacebars.dot(view.lookup("."), "name")                                                                    // 14
    }));                                                                                                               // 15
  })));                                                                                                                // 16
}));                                                                                                                   // 17
                                                                                                                       // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/radio/radio.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("radio", {                                                                                       // 1
  template: "afRadio",                                                                                                 // 2
  valueOut: function () {                                                                                              // 3
    if (this.is(":checked")) {                                                                                         // 4
      return this.val();                                                                                               // 5
    }                                                                                                                  // 6
  },                                                                                                                   // 7
  valueConverters: {                                                                                                   // 8
    "stringArray": function (val) {                                                                                    // 9
      if (typeof val === "string" && val.length > 0) {                                                                 // 10
        return [val];                                                                                                  // 11
      }                                                                                                                // 12
      return val;                                                                                                      // 13
    }                                                                                                                  // 14
  }                                                                                                                    // 15
});                                                                                                                    // 16
                                                                                                                       // 17
Template["afRadio"].helpers({                                                                                          // 18
  atts: function selectedAttsAdjust() {                                                                                // 19
    var atts = _.clone(this.atts);                                                                                     // 20
    if (this.selected) {                                                                                               // 21
      atts.checked = "";                                                                                               // 22
    }                                                                                                                  // 23
    return atts;                                                                                                       // 24
  }                                                                                                                    // 25
});                                                                                                                    // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/range/template.range.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputRange");                                                                                  // 2
Template["afInputRange"] = new Template("Template.afInputRange", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "range",                                                                                                     // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/range/range.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("range", {                                                                                       // 1
  template: "afInputRange",                                                                                            // 2
  valueOut: function () {                                                                                              // 3
    return AutoForm.Utility.stringToNumber(this.val());                                                                // 4
  },                                                                                                                   // 5
  valueConverters: {                                                                                                   // 6
    "string": function (val) {                                                                                         // 7
      if (typeof val === "number") {                                                                                   // 8
        return val.toString();                                                                                         // 9
      }                                                                                                                // 10
      return val;                                                                                                      // 11
    },                                                                                                                 // 12
    "stringArray": function (val) {                                                                                    // 13
      if (typeof val === "number") {                                                                                   // 14
        return [val.toString()];                                                                                       // 15
      }                                                                                                                // 16
      return val;                                                                                                      // 17
    },                                                                                                                 // 18
    "numberArray": function (val) {                                                                                    // 19
      if (typeof val === "number") {                                                                                   // 20
        return [val];                                                                                                  // 21
      }                                                                                                                // 22
      return val;                                                                                                      // 23
    },                                                                                                                 // 24
    "boolean": function (val) {                                                                                        // 25
      if (val === 0) {                                                                                                 // 26
        return false;                                                                                                  // 27
      } else if (val === 1) {                                                                                          // 28
        return true;                                                                                                   // 29
      }                                                                                                                // 30
      return val;                                                                                                      // 31
    },                                                                                                                 // 32
    "booleanArray": function (val) {                                                                                   // 33
      if (val === 0) {                                                                                                 // 34
        return [false];                                                                                                // 35
      } else if (val === 1) {                                                                                          // 36
        return [true];                                                                                                 // 37
      }                                                                                                                // 38
      return val;                                                                                                      // 39
    }                                                                                                                  // 40
  }                                                                                                                    // 41
});                                                                                                                    // 42
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/reset/template.reset.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputReset");                                                                                  // 2
Template["afInputReset"] = new Template("Template.afInputReset", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "reset",                                                                                                     // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/reset/reset.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("reset", {                                                                                       // 1
  template: "afInputReset"                                                                                             // 2
});                                                                                                                    // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/search/template.search.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputSearch");                                                                                 // 2
Template["afInputSearch"] = new Template("Template.afInputSearch", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "search",                                                                                                    // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/search/search.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("search", {                                                                                      // 1
  template: "afInputSearch",                                                                                           // 2
  valueConverters: {                                                                                                   // 3
    "stringArray": function (val) {                                                                                    // 4
      if (typeof val === "string" && val.length > 0) {                                                                 // 5
        return [val];                                                                                                  // 6
      }                                                                                                                // 7
      return val;                                                                                                      // 8
    }                                                                                                                  // 9
  },                                                                                                                   // 10
  contextAdjust: function (context) {                                                                                  // 11
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {                            // 12
      context.atts.maxlength = context.max;                                                                            // 13
    }                                                                                                                  // 14
    return context;                                                                                                    // 15
  }                                                                                                                    // 16
});                                                                                                                    // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select/template.select.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afSelect");                                                                                      // 2
Template["afSelect"] = new Template("Template.afSelect", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.SELECT(HTML.Attrs(function() {                                                                           // 5
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 6
  }), "\n    ", Blaze.Each(function() {                                                                                // 7
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 8
  }, function() {                                                                                                      // 9
    return [ "\n      ", Blaze.If(function() {                                                                         // 10
      return Spacebars.call(Spacebars.dot(view.lookup("."), "optgroup"));                                              // 11
    }, function() {                                                                                                    // 12
      return [ "\n        ", HTML.OPTGROUP({                                                                           // 13
        label: function() {                                                                                            // 14
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "optgroup"));                                      // 15
        }                                                                                                              // 16
      }, "\n        ", Blaze.Each(function() {                                                                         // 17
        return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                               // 18
      }, function() {                                                                                                  // 19
        return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                     // 20
          return Spacebars.attrMustache(view.lookup("optionAtts"));                                                    // 21
        }), Blaze.View(function() {                                                                                    // 22
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                         // 23
        })), "\n        " ];                                                                                           // 24
      }), "\n        "), "\n      " ];                                                                                 // 25
    }, function() {                                                                                                    // 26
      return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                       // 27
        return Spacebars.attrMustache(view.lookup("optionAtts"));                                                      // 28
      }), Blaze.View(function() {                                                                                      // 29
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                           // 30
      })), "\n      " ];                                                                                               // 31
    }), "\n    " ];                                                                                                    // 32
  }), "\n  ");                                                                                                         // 33
}));                                                                                                                   // 34
                                                                                                                       // 35
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select/select.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("select", {                                                                                      // 1
  template: "afSelect",                                                                                                // 2
  valueOut: function () {                                                                                              // 3
    return AutoForm.Utility.stringToNumber(this.val());                                                                // 4
  },                                                                                                                   // 5
  contextAdjust: function (context) {                                                                                  // 6
    //can fix issues with some browsers selecting the firstOption instead of the selected option                       // 7
    context.atts.autocomplete = "off";                                                                                 // 8
                                                                                                                       // 9
    var itemAtts = _.omit(context.atts, 'firstOption');                                                                // 10
    var firstOption = context.atts.firstOption;                                                                        // 11
                                                                                                                       // 12
    // build items list                                                                                                // 13
    context.items = [];                                                                                                // 14
                                                                                                                       // 15
    // If a firstOption was provided, add that to the items list first                                                 // 16
    if (firstOption !== false) {                                                                                       // 17
      context.items.push({                                                                                             // 18
        name: context.name,                                                                                            // 19
        label: (typeof firstOption === "string" ? firstOption : "(Select One)"),                                       // 20
        value: "",                                                                                                     // 21
        // _id must be included because it is a special property that                                                  // 22
        // #each uses to track unique list items when adding and removing them                                         // 23
        // See https://github.com/meteor/meteor/issues/2174                                                            // 24
        _id: "",                                                                                                       // 25
        selected: false,                                                                                               // 26
        atts: itemAtts                                                                                                 // 27
      });                                                                                                              // 28
    }                                                                                                                  // 29
                                                                                                                       // 30
    // Add all defined options                                                                                         // 31
    _.each(context.selectOptions, function(opt) {                                                                      // 32
      if (opt.optgroup) {                                                                                              // 33
        var subItems = _.map(opt.options, function(subOpt) {                                                           // 34
          return {                                                                                                     // 35
            name: context.name,                                                                                        // 36
            label: subOpt.label,                                                                                       // 37
            value: subOpt.value,                                                                                       // 38
            // _id must be included because it is a special property that                                              // 39
            // #each uses to track unique list items when adding and removing them                                     // 40
            // See https://github.com/meteor/meteor/issues/2174                                                        // 41
            _id: subOpt.value,                                                                                         // 42
            selected: (subOpt.value === context.value),                                                                // 43
            atts: itemAtts                                                                                             // 44
          };                                                                                                           // 45
        });                                                                                                            // 46
        context.items.push({                                                                                           // 47
          optgroup: opt.optgroup,                                                                                      // 48
          items: subItems                                                                                              // 49
        });                                                                                                            // 50
      } else {                                                                                                         // 51
        context.items.push({                                                                                           // 52
          name: context.name,                                                                                          // 53
          label: opt.label,                                                                                            // 54
          value: opt.value,                                                                                            // 55
          // _id must be included because it is a special property that                                                // 56
          // #each uses to track unique list items when adding and removing them                                       // 57
          // See https://github.com/meteor/meteor/issues/2174                                                          // 58
          _id: opt.value,                                                                                              // 59
          selected: (opt.value === context.value),                                                                     // 60
          atts: itemAtts                                                                                               // 61
        });                                                                                                            // 62
      }                                                                                                                // 63
    });                                                                                                                // 64
                                                                                                                       // 65
    return context;                                                                                                    // 66
  }                                                                                                                    // 67
});                                                                                                                    // 68
                                                                                                                       // 69
Template["afSelect"].helpers({                                                                                         // 70
  optionAtts: function afSelectOptionAtts() {                                                                          // 71
    var item = this                                                                                                    // 72
    var atts = {                                                                                                       // 73
      value: item.value                                                                                                // 74
    };                                                                                                                 // 75
    if (item.selected) {                                                                                               // 76
      atts.selected = "";                                                                                              // 77
    }                                                                                                                  // 78
    return atts;                                                                                                       // 79
  }                                                                                                                    // 80
});                                                                                                                    // 81
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-checkbox/template.select-checkbox.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afCheckboxGroup");                                                                               // 2
Template["afCheckboxGroup"] = new Template("Template.afCheckboxGroup", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV(HTML.Attrs({                                                                                         // 5
    "class": "af-checkbox-group"                                                                                       // 6
  }, function() {                                                                                                      // 7
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 8
  }), "\n    ", Blaze.Each(function() {                                                                                // 9
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 10
  }, function() {                                                                                                      // 11
    return [ "\n      ", HTML.DIV(HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                   // 12
      type: "checkbox",                                                                                                // 13
      value: function() {                                                                                              // 14
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 15
      }                                                                                                                // 16
    }, function() {                                                                                                    // 17
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 18
    })), " ", Blaze.View(function() {                                                                                  // 19
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 20
    }))), "\n    " ];                                                                                                  // 21
  }), "\n  ");                                                                                                         // 22
}));                                                                                                                   // 23
                                                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-checkbox/select-checkbox.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("select-checkbox", {                                                                             // 1
  template: "afCheckboxGroup",                                                                                         // 2
  valueIsArray: true,                                                                                                  // 3
  valueOut: function () {                                                                                              // 4
    var val = [];                                                                                                      // 5
    this.find('input[type=checkbox]').each(function () {                                                               // 6
      if ($(this).is(":checked")) {                                                                                    // 7
        val.push($(this).val());                                                                                       // 8
      }                                                                                                                // 9
    });                                                                                                                // 10
    return val;                                                                                                        // 11
  },                                                                                                                   // 12
  contextAdjust: function (context) {                                                                                  // 13
    var itemAtts = _.omit(context.atts);                                                                               // 14
                                                                                                                       // 15
    // build items list                                                                                                // 16
    context.items = [];                                                                                                // 17
                                                                                                                       // 18
    // Add all defined options                                                                                         // 19
    _.each(context.selectOptions, function(opt) {                                                                      // 20
      context.items.push({                                                                                             // 21
        name: context.name,                                                                                            // 22
        label: opt.label,                                                                                              // 23
        value: opt.value,                                                                                              // 24
        // _id must be included because it is a special property that                                                  // 25
        // #each uses to track unique list items when adding and removing them                                         // 26
        // See https://github.com/meteor/meteor/issues/2174                                                            // 27
        _id: opt.value,                                                                                                // 28
        selected: (_.contains(context.value, opt.value)),                                                              // 29
        atts: itemAtts                                                                                                 // 30
      });                                                                                                              // 31
    });                                                                                                                // 32
                                                                                                                       // 33
    return context;                                                                                                    // 34
  }                                                                                                                    // 35
});                                                                                                                    // 36
                                                                                                                       // 37
Template["afCheckboxGroup"].helpers({                                                                                  // 38
  atts: function selectedAttsAdjust() {                                                                                // 39
    var atts = _.clone(this.atts);                                                                                     // 40
    if (this.selected) {                                                                                               // 41
      atts.checked = "";                                                                                               // 42
    }                                                                                                                  // 43
    // remove data-schema-key attribute because we put it                                                              // 44
    // on the entire group                                                                                             // 45
    delete atts["data-schema-key"];                                                                                    // 46
    return atts;                                                                                                       // 47
  },                                                                                                                   // 48
  dsk: function dsk() {                                                                                                // 49
    return {                                                                                                           // 50
      "data-schema-key": this.atts["data-schema-key"]                                                                  // 51
    }                                                                                                                  // 52
  }                                                                                                                    // 53
});                                                                                                                    // 54
                                                                                                                       // 55
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-checkbox-inline/template.select-checkbox-inline.js                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afCheckboxGroupInline");                                                                         // 2
Template["afCheckboxGroupInline"] = new Template("Template.afCheckboxGroupInline", (function() {                       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV(HTML.Attrs({                                                                                         // 5
    "class": "af-checkbox-group"                                                                                       // 6
  }, function() {                                                                                                      // 7
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 8
  }), "\n    ", Blaze.Each(function() {                                                                                // 9
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 10
  }, function() {                                                                                                      // 11
    return [ "\n      ", HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                            // 12
      type: "checkbox",                                                                                                // 13
      value: function() {                                                                                              // 14
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 15
      }                                                                                                                // 16
    }, function() {                                                                                                    // 17
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 18
    })), " ", Blaze.View(function() {                                                                                  // 19
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 20
    })), "\n    " ];                                                                                                   // 21
  }), "\n  ");                                                                                                         // 22
}));                                                                                                                   // 23
                                                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-checkbox-inline/select-checkbox-inline.js                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("select-checkbox-inline", {                                                                      // 1
  template: "afCheckboxGroupInline",                                                                                   // 2
  valueIsArray: true,                                                                                                  // 3
  valueOut: function () {                                                                                              // 4
    var val = [];                                                                                                      // 5
    this.find('input[type=checkbox]').each(function () {                                                               // 6
      if ($(this).is(":checked")) {                                                                                    // 7
        val.push($(this).val());                                                                                       // 8
      }                                                                                                                // 9
    });                                                                                                                // 10
    return val;                                                                                                        // 11
  },                                                                                                                   // 12
  contextAdjust: function (context) {                                                                                  // 13
    var itemAtts = _.omit(context.atts);                                                                               // 14
                                                                                                                       // 15
    // build items list                                                                                                // 16
    context.items = [];                                                                                                // 17
                                                                                                                       // 18
    // Add all defined options                                                                                         // 19
    _.each(context.selectOptions, function(opt) {                                                                      // 20
      context.items.push({                                                                                             // 21
        name: context.name,                                                                                            // 22
        label: opt.label,                                                                                              // 23
        value: opt.value,                                                                                              // 24
        // _id must be included because it is a special property that                                                  // 25
        // #each uses to track unique list items when adding and removing them                                         // 26
        // See https://github.com/meteor/meteor/issues/2174                                                            // 27
        _id: opt.value,                                                                                                // 28
        selected: (_.contains(context.value, opt.value)),                                                              // 29
        atts: itemAtts                                                                                                 // 30
      });                                                                                                              // 31
    });                                                                                                                // 32
                                                                                                                       // 33
    return context;                                                                                                    // 34
  }                                                                                                                    // 35
});                                                                                                                    // 36
                                                                                                                       // 37
Template["afCheckboxGroupInline"].helpers({                                                                            // 38
  atts: function selectedAttsAdjust() {                                                                                // 39
    var atts = _.clone(this.atts);                                                                                     // 40
    if (this.selected) {                                                                                               // 41
      atts.checked = "";                                                                                               // 42
    }                                                                                                                  // 43
    // remove data-schema-key attribute because we put it                                                              // 44
    // on the entire group                                                                                             // 45
    delete atts["data-schema-key"];                                                                                    // 46
    return atts;                                                                                                       // 47
  },                                                                                                                   // 48
  dsk: function dsk() {                                                                                                // 49
    return {                                                                                                           // 50
      "data-schema-key": this.atts["data-schema-key"]                                                                  // 51
    }                                                                                                                  // 52
  }                                                                                                                    // 53
});                                                                                                                    // 54
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-multiple/template.select-multiple.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afSelectMultiple");                                                                              // 2
Template["afSelectMultiple"] = new Template("Template.afSelectMultiple", (function() {                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.SELECT(HTML.Attrs({                                                                                      // 5
    multiple: ""                                                                                                       // 6
  }, function() {                                                                                                      // 7
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 8
  }), "\n    ", Blaze.Each(function() {                                                                                // 9
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 10
  }, function() {                                                                                                      // 11
    return [ "\n      ", Blaze.If(function() {                                                                         // 12
      return Spacebars.call(Spacebars.dot(view.lookup("."), "optgroup"));                                              // 13
    }, function() {                                                                                                    // 14
      return [ "\n        ", HTML.OPTGROUP({                                                                           // 15
        label: function() {                                                                                            // 16
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "optgroup"));                                      // 17
        }                                                                                                              // 18
      }, "\n        ", Blaze.Each(function() {                                                                         // 19
        return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                               // 20
      }, function() {                                                                                                  // 21
        return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                     // 22
          return Spacebars.attrMustache(view.lookup("optionAtts"));                                                    // 23
        }), Blaze.View(function() {                                                                                    // 24
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                         // 25
        })), "\n        " ];                                                                                           // 26
      }), "\n        "), "\n      " ];                                                                                 // 27
    }, function() {                                                                                                    // 28
      return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                       // 29
        return Spacebars.attrMustache(view.lookup("optionAtts"));                                                      // 30
      }), Blaze.View(function() {                                                                                      // 31
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                           // 32
      })), "\n      " ];                                                                                               // 33
    }), "\n    " ];                                                                                                    // 34
  }), "\n  ");                                                                                                         // 35
}));                                                                                                                   // 36
                                                                                                                       // 37
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-multiple/select-multiple.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("select-multiple", {                                                                             // 1
  template: "afSelectMultiple",                                                                                        // 2
  valueIsArray: true,                                                                                                  // 3
  valueOut: function () {                                                                                              // 4
    return AutoForm.Utility.getSelectValues(this[0]);                                                                  // 5
  },                                                                                                                   // 6
  contextAdjust: function (context) {                                                                                  // 7
    // build items list                                                                                                // 8
    context.items = _.map(context.selectOptions, function(opt) {                                                       // 9
      if (opt.optgroup) {                                                                                              // 10
        var subItems = _.map(opt.options, function(subOpt) {                                                           // 11
          return {                                                                                                     // 12
            name: context.name,                                                                                        // 13
            label: subOpt.label,                                                                                       // 14
            value: subOpt.value,                                                                                       // 15
            // _id must be included because it is a special property that                                              // 16
            // #each uses to track unique list items when adding and removing them                                     // 17
            // See https://github.com/meteor/meteor/issues/2174                                                        // 18
            _id: subOpt.value,                                                                                         // 19
            selected: _.contains(context.value, subOpt.value),                                                         // 20
            atts: context.atts                                                                                         // 21
          };                                                                                                           // 22
        });                                                                                                            // 23
        return {                                                                                                       // 24
          optgroup: opt.optgroup,                                                                                      // 25
          items: subItems                                                                                              // 26
        };                                                                                                             // 27
      } else {                                                                                                         // 28
        return {                                                                                                       // 29
          name: context.name,                                                                                          // 30
          label: opt.label,                                                                                            // 31
          value: opt.value,                                                                                            // 32
          // _id must be included because it is a special property that                                                // 33
          // #each uses to track unique list items when adding and removing them                                       // 34
          // See https://github.com/meteor/meteor/issues/2174                                                          // 35
          _id: opt.value,                                                                                              // 36
          selected: _.contains(context.value, opt.value),                                                              // 37
          atts: context.atts                                                                                           // 38
        };                                                                                                             // 39
      }                                                                                                                // 40
    });                                                                                                                // 41
                                                                                                                       // 42
    return context;                                                                                                    // 43
  }                                                                                                                    // 44
});                                                                                                                    // 45
                                                                                                                       // 46
Template["afSelectMultiple"].helpers({                                                                                 // 47
  optionAtts: function afSelectOptionAtts() {                                                                          // 48
    var item = this;                                                                                                   // 49
    var atts = {                                                                                                       // 50
      value: item.value                                                                                                // 51
    };                                                                                                                 // 52
    if (item.selected) {                                                                                               // 53
      atts.selected = "";                                                                                              // 54
    }                                                                                                                  // 55
    return atts;                                                                                                       // 56
  }                                                                                                                    // 57
});                                                                                                                    // 58
                                                                                                                       // 59
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-radio/template.select-radio.js                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afRadioGroup");                                                                                  // 2
Template["afRadioGroup"] = new Template("Template.afRadioGroup", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV(HTML.Attrs({                                                                                         // 5
    "class": "af-radio-group"                                                                                          // 6
  }, function() {                                                                                                      // 7
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 8
  }), "\n  ", Blaze.Each(function() {                                                                                  // 9
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 10
  }, function() {                                                                                                      // 11
    return [ "\n    ", HTML.DIV(HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                     // 12
      type: "radio",                                                                                                   // 13
      value: function() {                                                                                              // 14
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 15
      }                                                                                                                // 16
    }, function() {                                                                                                    // 17
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 18
    })), " ", Blaze.View(function() {                                                                                  // 19
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 20
    }))), "\n  " ];                                                                                                    // 21
  }), "\n  ");                                                                                                         // 22
}));                                                                                                                   // 23
                                                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-radio/select-radio.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("select-radio", {                                                                                // 1
  template: "afRadioGroup",                                                                                            // 2
  valueOut: function () {                                                                                              // 3
    return this.find('input[type=radio]:checked').val();                                                               // 4
  },                                                                                                                   // 5
  contextAdjust: function (context) {                                                                                  // 6
    var itemAtts = _.omit(context.atts);                                                                               // 7
                                                                                                                       // 8
    // build items list                                                                                                // 9
    context.items = [];                                                                                                // 10
                                                                                                                       // 11
    // Add all defined options                                                                                         // 12
    _.each(context.selectOptions, function(opt) {                                                                      // 13
      context.items.push({                                                                                             // 14
        name: context.name,                                                                                            // 15
        label: opt.label,                                                                                              // 16
        value: opt.value,                                                                                              // 17
        // _id must be included because it is a special property that                                                  // 18
        // #each uses to track unique list items when adding and removing them                                         // 19
        // See https://github.com/meteor/meteor/issues/2174                                                            // 20
        _id: opt.value,                                                                                                // 21
        selected: (opt.value === context.value),                                                                       // 22
        atts: itemAtts                                                                                                 // 23
      });                                                                                                              // 24
    });                                                                                                                // 25
                                                                                                                       // 26
    return context;                                                                                                    // 27
  }                                                                                                                    // 28
});                                                                                                                    // 29
                                                                                                                       // 30
Template["afRadioGroup"].helpers({                                                                                     // 31
  atts: function selectedAttsAdjust() {                                                                                // 32
    var atts = _.clone(this.atts);                                                                                     // 33
    if (this.selected) {                                                                                               // 34
      atts.checked = "";                                                                                               // 35
    }                                                                                                                  // 36
    // remove data-schema-key attribute because we put it                                                              // 37
    // on the entire group                                                                                             // 38
    delete atts["data-schema-key"];                                                                                    // 39
    return atts;                                                                                                       // 40
  },                                                                                                                   // 41
  dsk: function dsk() {                                                                                                // 42
    return {                                                                                                           // 43
      "data-schema-key": this.atts["data-schema-key"]                                                                  // 44
    }                                                                                                                  // 45
  }                                                                                                                    // 46
});                                                                                                                    // 47
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-radio-inline/template.select-radio-inline.js                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afRadioGroupInline");                                                                            // 2
Template["afRadioGroupInline"] = new Template("Template.afRadioGroupInline", (function() {                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV(HTML.Attrs({                                                                                         // 5
    "class": "af-radio-group"                                                                                          // 6
  }, function() {                                                                                                      // 7
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 8
  }), "\n  ", Blaze.Each(function() {                                                                                  // 9
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 10
  }, function() {                                                                                                      // 11
    return [ "\n    ", HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                              // 12
      type: "radio",                                                                                                   // 13
      value: function() {                                                                                              // 14
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 15
      }                                                                                                                // 16
    }, function() {                                                                                                    // 17
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 18
    })), " ", Blaze.View(function() {                                                                                  // 19
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 20
    })), "\n  " ];                                                                                                     // 21
  }), "\n  ");                                                                                                         // 22
}));                                                                                                                   // 23
                                                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/select-radio-inline/select-radio-inline.js                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("select-radio-inline", {                                                                         // 1
  template: "afRadioGroupInline",                                                                                      // 2
  valueOut: function () {                                                                                              // 3
    return this.find('input[type=radio]:checked').val();                                                               // 4
  },                                                                                                                   // 5
  contextAdjust: function (context) {                                                                                  // 6
    var itemAtts = _.omit(context.atts);                                                                               // 7
                                                                                                                       // 8
    // build items list                                                                                                // 9
    context.items = [];                                                                                                // 10
                                                                                                                       // 11
    // Add all defined options                                                                                         // 12
    _.each(context.selectOptions, function(opt) {                                                                      // 13
      context.items.push({                                                                                             // 14
        name: context.name,                                                                                            // 15
        label: opt.label,                                                                                              // 16
        value: opt.value,                                                                                              // 17
        // _id must be included because it is a special property that                                                  // 18
        // #each uses to track unique list items when adding and removing them                                         // 19
        // See https://github.com/meteor/meteor/issues/2174                                                            // 20
        _id: opt.value,                                                                                                // 21
        selected: (opt.value === context.value),                                                                       // 22
        atts: itemAtts                                                                                                 // 23
      });                                                                                                              // 24
    });                                                                                                                // 25
                                                                                                                       // 26
    return context;                                                                                                    // 27
  }                                                                                                                    // 28
});                                                                                                                    // 29
                                                                                                                       // 30
Template["afRadioGroupInline"].helpers({                                                                               // 31
  atts: function selectedAttsAdjust() {                                                                                // 32
    var atts = _.clone(this.atts);                                                                                     // 33
    if (this.selected) {                                                                                               // 34
      atts.checked = "";                                                                                               // 35
    }                                                                                                                  // 36
    // remove data-schema-key attribute because we put it                                                              // 37
    // on the entire group                                                                                             // 38
    delete atts["data-schema-key"];                                                                                    // 39
    return atts;                                                                                                       // 40
  },                                                                                                                   // 41
  dsk: function dsk() {                                                                                                // 42
    return {                                                                                                           // 43
      "data-schema-key": this.atts["data-schema-key"]                                                                  // 44
    }                                                                                                                  // 45
  }                                                                                                                    // 46
});                                                                                                                    // 47
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/submit/template.submit.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputSubmit");                                                                                 // 2
Template["afInputSubmit"] = new Template("Template.afInputSubmit", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "submit",                                                                                                    // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/submit/submit.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("submit", {                                                                                      // 1
  template: "afInputSubmit"                                                                                            // 2
});                                                                                                                    // 3
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/tel/template.tel.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputTel");                                                                                    // 2
Template["afInputTel"] = new Template("Template.afInputTel", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "tel",                                                                                                       // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/tel/tel.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("tel", {                                                                                         // 1
  template: "afInputTel",                                                                                              // 2
  valueConverters: {                                                                                                   // 3
    "stringArray": function (val) {                                                                                    // 4
      if (typeof val === "string" && val.length > 0) {                                                                 // 5
        return [val];                                                                                                  // 6
      }                                                                                                                // 7
      return val;                                                                                                      // 8
    }                                                                                                                  // 9
  },                                                                                                                   // 10
  contextAdjust: function (context) {                                                                                  // 11
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {                            // 12
      context.atts.maxlength = context.max;                                                                            // 13
    }                                                                                                                  // 14
    return context;                                                                                                    // 15
  }                                                                                                                    // 16
});                                                                                                                    // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/text/template.text.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputText");                                                                                   // 2
Template["afInputText"] = new Template("Template.afInputText", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "text",                                                                                                      // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/text/text.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("text", {                                                                                        // 1
  template: "afInputText",                                                                                             // 2
  valueOut: function () {                                                                                              // 3
    return this.val();                                                                                                 // 4
  },                                                                                                                   // 5
  valueConverters: {                                                                                                   // 6
    "stringArray": function (val) {                                                                                    // 7
      if (typeof val === "string") {                                                                                   // 8
        val = val.split(",");                                                                                          // 9
        return _.map(val, function (item) {                                                                            // 10
          return $.trim(item);                                                                                         // 11
        });                                                                                                            // 12
      }                                                                                                                // 13
      return val;                                                                                                      // 14
    },                                                                                                                 // 15
    "number": AutoForm.Utility.stringToNumber,                                                                         // 16
    "numberArray": function (val) {                                                                                    // 17
      if (typeof val === "string") {                                                                                   // 18
        val = val.split(",");                                                                                          // 19
        return _.map(val, function (item) {                                                                            // 20
          item = $.trim(item);                                                                                         // 21
          return AutoForm.Utility.stringToNumber(item);                                                                // 22
        });                                                                                                            // 23
      }                                                                                                                // 24
      return val;                                                                                                      // 25
    },                                                                                                                 // 26
    "boolean": AutoForm.Utility.stringToBool,                                                                          // 27
    "booleanArray": function (val) {                                                                                   // 28
      if (typeof val === "string") {                                                                                   // 29
        val = val.split(",");                                                                                          // 30
        return _.map(val, function (item) {                                                                            // 31
          item = $.trim(item);                                                                                         // 32
          return AutoForm.Utility.stringToBool(item);                                                                  // 33
        });                                                                                                            // 34
      }                                                                                                                // 35
      return val;                                                                                                      // 36
    },                                                                                                                 // 37
    "date": AutoForm.Utility.stringToDate,                                                                             // 38
    "dateArray": function (val) {                                                                                      // 39
      if (typeof val === "string") {                                                                                   // 40
        val = val.split(",");                                                                                          // 41
        return _.map(val, function (item) {                                                                            // 42
          item = $.trim(item);                                                                                         // 43
          return AutoForm.Utility.stringToDate(item);                                                                  // 44
        });                                                                                                            // 45
      }                                                                                                                // 46
      return val;                                                                                                      // 47
    }                                                                                                                  // 48
  },                                                                                                                   // 49
  contextAdjust: function (context) {                                                                                  // 50
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {                            // 51
      context.atts.maxlength = context.max;                                                                            // 52
    }                                                                                                                  // 53
    return context;                                                                                                    // 54
  }                                                                                                                    // 55
});                                                                                                                    // 56
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/textarea/template.textarea.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afTextarea");                                                                                    // 2
Template["afTextarea"] = new Template("Template.afTextarea", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.TEXTAREA(HTML.Attrs(function() {                                                                         // 5
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 6
  }, {                                                                                                                 // 7
    value: function() {                                                                                                // 8
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 9
    }                                                                                                                  // 10
  }));                                                                                                                 // 11
}));                                                                                                                   // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/textarea/textarea.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("textarea", {                                                                                    // 1
  template: "afTextarea",                                                                                              // 2
  valueConverters: {                                                                                                   // 3
    "string": function (val) {                                                                                         // 4
      return val;                                                                                                      // 5
    },                                                                                                                 // 6
    "stringArray": function (val) {                                                                                    // 7
      if (typeof val === "string" && val.length > 0) {                                                                 // 8
        return linesToArray(val);                                                                                      // 9
      }                                                                                                                // 10
      return val;                                                                                                      // 11
    },                                                                                                                 // 12
    "number": AutoForm.Utility.stringToNumber,                                                                         // 13
    "numberArray": function (val) {                                                                                    // 14
      if (typeof val === "string" && val.length > 0) {                                                                 // 15
        var arr = linesToArray(val);                                                                                   // 16
        return _.map(arr, function (item) {                                                                            // 17
          return AutoForm.Utility.stringToNumber(item);                                                                // 18
        });                                                                                                            // 19
      }                                                                                                                // 20
      return val;                                                                                                      // 21
    },                                                                                                                 // 22
    "boolean": AutoForm.Utility.stringToBool,                                                                          // 23
    "booleanArray": function (val) {                                                                                   // 24
      if (typeof val === "string" && val.length > 0) {                                                                 // 25
        var arr = linesToArray(val);                                                                                   // 26
        return _.map(arr, function (item) {                                                                            // 27
          return AutoForm.Utility.stringToBool(item);                                                                  // 28
        });                                                                                                            // 29
      }                                                                                                                // 30
      return val;                                                                                                      // 31
    },                                                                                                                 // 32
    "date": AutoForm.Utility.stringToDate,                                                                             // 33
    "dateArray": function (val) {                                                                                      // 34
      if (typeof val === "string" && val.length > 0) {                                                                 // 35
        var arr = linesToArray(val);                                                                                   // 36
        return _.map(arr, function (item) {                                                                            // 37
          return AutoForm.Utility.stringToDate(item);                                                                  // 38
        });                                                                                                            // 39
      }                                                                                                                // 40
      return val;                                                                                                      // 41
    }                                                                                                                  // 42
  },                                                                                                                   // 43
  contextAdjust: function (context) {                                                                                  // 44
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {                            // 45
      context.atts.maxlength = context.max;                                                                            // 46
    }                                                                                                                  // 47
    return context;                                                                                                    // 48
  }                                                                                                                    // 49
});                                                                                                                    // 50
                                                                                                                       // 51
function linesToArray(text) {                                                                                          // 52
  text = text.split('\n');                                                                                             // 53
  var lines = [];                                                                                                      // 54
  _.each(text, function (line) {                                                                                       // 55
    line = $.trim(line);                                                                                               // 56
    if (line.length) {                                                                                                 // 57
      lines.push(line);                                                                                                // 58
    }                                                                                                                  // 59
  });                                                                                                                  // 60
  return lines;                                                                                                        // 61
}                                                                                                                      // 62
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/time/template.time.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputTime");                                                                                   // 2
Template["afInputTime"] = new Template("Template.afInputTime", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "time",                                                                                                      // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/time/time.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("time", {                                                                                        // 1
  template: "afInputTime",                                                                                             // 2
  valueConverters: {                                                                                                   // 3
    "stringArray": function (val) {                                                                                    // 4
      if (typeof val === "string" && val.length > 0) {                                                                 // 5
        return [val];                                                                                                  // 6
      }                                                                                                                // 7
      return val;                                                                                                      // 8
    }                                                                                                                  // 9
  }                                                                                                                    // 10
});                                                                                                                    // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/url/template.url.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputUrl");                                                                                    // 2
Template["afInputUrl"] = new Template("Template.afInputUrl", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "url",                                                                                                       // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/url/url.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("url", {                                                                                         // 1
  template: "afInputUrl",                                                                                              // 2
  valueConverters: {                                                                                                   // 3
    "stringArray": function (val) {                                                                                    // 4
      if (typeof val === "string" && val.length > 0) {                                                                 // 5
        return [val];                                                                                                  // 6
      }                                                                                                                // 7
      return val;                                                                                                      // 8
    }                                                                                                                  // 9
  },                                                                                                                   // 10
  contextAdjust: function (context) {                                                                                  // 11
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {                            // 12
      context.atts.maxlength = context.max;                                                                            // 13
    }                                                                                                                  // 14
    return context;                                                                                                    // 15
  }                                                                                                                    // 16
});                                                                                                                    // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/week/template.week.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afInputWeek");                                                                                   // 2
Template["afInputWeek"] = new Template("Template.afInputWeek", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.INPUT(HTML.Attrs({                                                                                       // 5
    type: "week",                                                                                                      // 6
    value: function() {                                                                                                // 7
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 8
    }                                                                                                                  // 9
  }, function() {                                                                                                      // 10
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 11
  }));                                                                                                                 // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/inputTypes/week/week.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AutoForm.addInputType("week", {                                                                                        // 1
  template: "afInputWeek",                                                                                             // 2
  valueConverters: {                                                                                                   // 3
    "stringArray": function (val) {                                                                                    // 4
      if (typeof val === "string" && val.length > 0) {                                                                 // 5
        return [val];                                                                                                  // 6
      }                                                                                                                // 7
      return val;                                                                                                      // 8
    }                                                                                                                  // 9
  }                                                                                                                    // 10
});                                                                                                                    // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/autoForm/template.autoForm.js                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("autoForm");                                                                                      // 2
Template["autoForm"] = new Template("Template.autoForm", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return Blaze.Unless(function() {                                                                                     // 5
    return Spacebars.call(view.lookup("afDestroyUpdateForm"));                                                         // 6
  }, function() {                                                                                                      // 7
    return [ "\n  \n  \n  ", HTML.FORM(HTML.Attrs(function() {                                                         // 8
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 9
    }), "\n    ", Spacebars.With(function() {                                                                          // 10
      return Spacebars.dataMustache(view.lookup("innerContext"), view.lookup(".."));                                   // 11
    }, function() {                                                                                                    // 12
      return [ "\n    ", Blaze._InOuterTemplateScope(view, function() {                                                // 13
        return Blaze._TemplateWith(function() {                                                                        // 14
          return Spacebars.call(view.lookup("."));                                                                     // 15
        }, function() {                                                                                                // 16
          return Spacebars.include(function() {                                                                        // 17
            return Spacebars.call(view.templateContentBlock);                                                          // 18
          });                                                                                                          // 19
        });                                                                                                            // 20
      }), "\n    " ];                                                                                                  // 21
    }), "\n  "), "\n  " ];                                                                                             // 22
  });                                                                                                                  // 23
}));                                                                                                                   // 24
                                                                                                                       // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/autoForm/autoForm.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var contextDependency = new Tracker.Dependency();                                                                      // 1
                                                                                                                       // 2
Template.autoForm.helpers({                                                                                            // 3
  atts: function autoFormTplAtts() {                                                                                   // 4
    var context = _.clone(this);                                                                                       // 5
                                                                                                                       // 6
    // By default, we add the `novalidate="novalidate"` attribute to our form,                                         // 7
    // unless the user passes `validation="browser"`.                                                                  // 8
    if (context.validation !== "browser" && !context.novalidate) {                                                     // 9
      context.novalidate = "novalidate";                                                                               // 10
    }                                                                                                                  // 11
    // After removing all of the props we know about, everything else should                                           // 12
    // become a form attribute.                                                                                        // 13
    // XXX Would be better to use a whitelist of HTML attributes allowed on form elements                              // 14
    return _.omit(context, "schema", "collection", "validation", "doc", "resetOnSuccess",                              // 15
        "type", "template", "autosave", "meteormethod", "filter", "autoConvert", "removeEmptyStrings", "trimStrings"); // 16
  },                                                                                                                   // 17
  innerContext: function autoFormTplContext(outerContext) {                                                            // 18
    var formId = this.id || defaultFormId;                                                                             // 19
                                                                                                                       // 20
    contextDependency.depend();                                                                                        // 21
                                                                                                                       // 22
    // Set up the context to be used for everything within the autoform.                                               // 23
    var innerContext = {_af: formData[formId]};                                                                        // 24
                                                                                                                       // 25
    // Preserve outer context, allowing access within autoForm block without needing ..                                // 26
    _.extend(innerContext, outerContext);                                                                              // 27
    return innerContext;                                                                                               // 28
  },                                                                                                                   // 29
  afDestroyUpdateForm: function () {                                                                                   // 30
    return afDestroyUpdateForm.get();                                                                                  // 31
  }                                                                                                                    // 32
});                                                                                                                    // 33
                                                                                                                       // 34
Template.autoForm.created = function autoFormCreated() {                                                               // 35
  var template = this;                                                                                                 // 36
                                                                                                                       // 37
  template.autorun(function () {                                                                                       // 38
    var data = Template.currentData(); // rerun when current data changes                                              // 39
    var formId = data.id || defaultFormId;                                                                             // 40
                                                                                                                       // 41
    // rerun when manually invalidated                                                                                 // 42
    if (!formDeps[formId]) {                                                                                           // 43
      formDeps[formId] = new Tracker.Dependency();                                                                     // 44
    }                                                                                                                  // 45
    formDeps[formId].depend();                                                                                         // 46
                                                                                                                       // 47
    // cache template instance for lookup by formId                                                                    // 48
    templatesById[formId] = template;                                                                                  // 49
                                                                                                                       // 50
    // When we change the form, loading a different doc, reloading the current doc, etc.,                              // 51
    // we also want to reset the array counts for the form                                                             // 52
    arrayTracker.resetForm(formId);                                                                                    // 53
                                                                                                                       // 54
    var collection = AutoForm.Utility.lookup(data.collection);                                                         // 55
    var ss = AutoForm.Utility.getSimpleSchemaFromContext(data, formId);                                                // 56
                                                                                                                       // 57
    // Clone the doc so that docToForm and other modifications do not change                                           // 58
    // the original referenced object.                                                                                 // 59
    var doc = data.doc ? EJSON.clone(data.doc) : null;                                                                 // 60
                                                                                                                       // 61
    // Update cached form values for hot code reload persistence                                                       // 62
    if (data.preserveForm === false) {                                                                                 // 63
      formPreserve.unregisterForm(formId);                                                                             // 64
    } else if (!formPreserve.formIsRegistered(formId)) {                                                               // 65
      formPreserve.registerForm(formId, function autoFormRegFormCallback() {                                           // 66
        return getFormValues(template, formId, ss).insertDoc;                                                          // 67
      });                                                                                                              // 68
    }                                                                                                                  // 69
                                                                                                                       // 70
    // Retain doc values after a "hot code push", if possible                                                          // 71
    var retrievedDoc = formPreserve.getDocument(formId);                                                               // 72
    if (retrievedDoc !== false) {                                                                                      // 73
      // Ensure we keep the _id property which may not be present in retrievedDoc.                                     // 74
      doc = _.extend(doc || {}, retrievedDoc);                                                                         // 75
    }                                                                                                                  // 76
                                                                                                                       // 77
    var mDoc;                                                                                                          // 78
    if (doc && !_.isEmpty(doc)) {                                                                                      // 79
      var hookCtx = {formId: formId};                                                                                  // 80
      // Pass doc through docToForm hooks                                                                              // 81
      _.each(Hooks.getHooks(formId, 'docToForm'), function autoFormEachDocToForm(hook) {                               // 82
        doc = hook.call(hookCtx, doc, ss, formId);                                                                     // 83
      });                                                                                                              // 84
      // Create a "flat doc" that can be used to easily get values for corresponding                                   // 85
      // form fields.                                                                                                  // 86
      mDoc = new MongoObject(doc);                                                                                     // 87
      fd.sourceDoc(formId, mDoc);                                                                                      // 88
    } else {                                                                                                           // 89
      fd.sourceDoc(formId, null);                                                                                      // 90
    }                                                                                                                  // 91
                                                                                                                       // 92
    // Check autosave                                                                                                  // 93
    var autosave, resetOnSuccess;                                                                                      // 94
    if (data.autosave === true && data.type === "update") {                                                            // 95
      // Autosave and never reset on success                                                                           // 96
      autosave = true;                                                                                                 // 97
      resetOnSuccess = false;                                                                                          // 98
    } else {                                                                                                           // 99
      autosave = false;                                                                                                // 100
      resetOnSuccess = data.resetOnSuccess;                                                                            // 101
    }                                                                                                                  // 102
                                                                                                                       // 103
    // Cache form data for lookup by form ID                                                                           // 104
    formData[formId] = {                                                                                               // 105
      formId: formId,                                                                                                  // 106
      collection: collection,                                                                                          // 107
      ss: ss,                                                                                                          // 108
      ssIsOverride: !!collection && !!data.schema,                                                                     // 109
      doc: doc,                                                                                                        // 110
      mDoc: mDoc,                                                                                                      // 111
      validationType: (data.validation == null ? "submitThenKeyup" : data.validation),                                 // 112
      submitType: data.type,                                                                                           // 113
      submitMethod: data.meteormethod,                                                                                 // 114
      resetOnSuccess: resetOnSuccess,                                                                                  // 115
      autosave: autosave,                                                                                              // 116
      filter: data.filter,                                                                                             // 117
      autoConvert: data.autoConvert,                                                                                   // 118
      removeEmptyStrings: data.removeEmptyStrings,                                                                     // 119
      trimStrings: data.trimStrings                                                                                    // 120
    };                                                                                                                 // 121
                                                                                                                       // 122
    // This ensures that anything dependent on field values will properly                                              // 123
    // react to field values set from the database document. That is,                                                  // 124
    // computations dependent on AutoForm.getFieldValue will rerun properly                                            // 125
    // when the form is initially rendered using values from `doc`.                                                    // 126
    setTimeout(function () {                                                                                           // 127
      updateAllTrackedFieldValues(formId);                                                                             // 128
    }, 0);                                                                                                             // 129
                                                                                                                       // 130
    contextDependency.changed();                                                                                       // 131
  });                                                                                                                  // 132
};                                                                                                                     // 133
                                                                                                                       // 134
Template.autoForm.destroyed = function autoFormDestroyed() {                                                           // 135
  var self = this;                                                                                                     // 136
  var formId = self.data.id || defaultFormId;                                                                          // 137
                                                                                                                       // 138
  // TODO if formId was changing reactively during life of instance,                                                   // 139
  // some data won't be removed by the calls below.                                                                    // 140
                                                                                                                       // 141
  // Remove from templatesById list                                                                                    // 142
  if (templatesById[formId]) {                                                                                         // 143
    delete templatesById[formId];                                                                                      // 144
  }                                                                                                                    // 145
                                                                                                                       // 146
  // Remove from data list                                                                                             // 147
  if (formData[formId]) {                                                                                              // 148
    delete formData[formId];                                                                                           // 149
  }                                                                                                                    // 150
                                                                                                                       // 151
  // Remove from array fields list                                                                                     // 152
  arrayTracker.untrackForm(formId);                                                                                    // 153
                                                                                                                       // 154
  // Remove from field values                                                                                          // 155
  if (formValues[formId]) {                                                                                            // 156
    delete formValues[formId];                                                                                         // 157
  }                                                                                                                    // 158
                                                                                                                       // 159
  // Unregister form preservation                                                                                      // 160
  formPreserve.unregisterForm(formId);                                                                                 // 161
};                                                                                                                     // 162
                                                                                                                       // 163
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/quickForm/template.quickForm.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("quickForm");                                                                                     // 2
Template["quickForm"] = new Template("Template.quickForm", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return Spacebars.With(function() {                                                                                   // 5
    return Spacebars.call(view.lookup("innerContext"));                                                                // 6
  }, function() {                                                                                                      // 7
    return [ "\n    ", Spacebars.With(function() {                                                                     // 8
      return Spacebars.dataMustache(view.lookup("afTemplateName"), "quickForm", Spacebars.dot(view.lookup(".."), "template"));
    }, function() {                                                                                                    // 10
      return [ "\n      ", Blaze._TemplateWith(function() {                                                            // 11
        return {                                                                                                       // 12
          template: Spacebars.call(view.lookup(".")),                                                                  // 13
          data: Spacebars.call(view.lookup(".."))                                                                      // 14
        };                                                                                                             // 15
      }, function() {                                                                                                  // 16
        return Spacebars.include(function() {                                                                          // 17
          return Spacebars.call(Template.__dynamic);                                                                   // 18
        });                                                                                                            // 19
      }), "\n    " ];                                                                                                  // 20
    }), "\n  " ];                                                                                                      // 21
  });                                                                                                                  // 22
}));                                                                                                                   // 23
                                                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/quickForm/quickForm.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.quickForm.helpers({                                                                                           // 1
  innerContext: function quickFormContext() {                                                                          // 2
    var atts = this;                                                                                                   // 3
                                                                                                                       // 4
    // Pass along quickForm context to autoForm context, minus a few                                                   // 5
    // properties that are specific to quickForms.                                                                     // 6
    var qfAutoFormContext = _.omit(atts, "buttonContent", "buttonClasses", "fields", "omitFields");                    // 7
                                                                                                                       // 8
    // Determine whether we want to render a submit button                                                             // 9
    var qfShouldRenderButton = (atts.buttonContent !== false && atts.type !== "readonly" && atts.type !== "disabled"); // 10
                                                                                                                       // 11
    return {                                                                                                           // 12
      qfAutoFormContext: qfAutoFormContext,                                                                            // 13
      atts: atts,                                                                                                      // 14
      qfShouldRenderButton: qfShouldRenderButton                                                                       // 15
    };                                                                                                                 // 16
  }                                                                                                                    // 17
});                                                                                                                    // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afArrayField/template.afArrayField.js                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afArrayField");                                                                                  // 2
Template["afArrayField"] = new Template("Template.afArrayField", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return Spacebars.With(function() {                                                                                   // 5
    return Spacebars.dataMustache(view.lookup("innerContext"), Spacebars.kw({                                          // 6
      atts: view.lookup(".")                                                                                           // 7
    }));                                                                                                               // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", Spacebars.With(function() {                                                                     // 10
      return Spacebars.dataMustache(view.lookup("afTemplateName"), "afArrayField", Spacebars.dot(view.lookup(".."), "template"));
    }, function() {                                                                                                    // 12
      return [ "\n      ", Blaze._TemplateWith(function() {                                                            // 13
        return {                                                                                                       // 14
          template: Spacebars.call(view.lookup(".")),                                                                  // 15
          data: Spacebars.call(view.lookup(".."))                                                                      // 16
        };                                                                                                             // 17
      }, function() {                                                                                                  // 18
        return Spacebars.include(function() {                                                                          // 19
          return Spacebars.call(Template.__dynamic);                                                                   // 20
        });                                                                                                            // 21
      }), "\n    " ];                                                                                                  // 22
    }), "\n  " ];                                                                                                      // 23
  });                                                                                                                  // 24
}));                                                                                                                   // 25
                                                                                                                       // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afArrayField/afArrayField.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.afArrayField.helpers({                                                                                        // 1
  innerContext: function afArrayFieldContext(options) {                                                                // 2
    var c = AutoForm.Utility.normalizeContext(options.hash, "afArrayField");                                           // 3
    var name = c.atts.name;                                                                                            // 4
    var fieldMinCount = c.atts.minCount || 0;                                                                          // 5
    var fieldMaxCount = c.atts.maxCount || Infinity;                                                                   // 6
    var ss = c.af.ss;                                                                                                  // 7
    var formId = c.af.formId;                                                                                          // 8
                                                                                                                       // 9
    // Init the array tracking for this field                                                                          // 10
    var docCount = fd.getDocCountForField(formId, name);                                                               // 11
    if (docCount == null) {                                                                                            // 12
      docCount = c.atts.initialCount;                                                                                  // 13
    }                                                                                                                  // 14
    arrayTracker.initField(formId, name, ss, docCount, fieldMinCount, fieldMaxCount);                                  // 15
                                                                                                                       // 16
    return {                                                                                                           // 17
      atts: c.atts                                                                                                     // 18
    };                                                                                                                 // 19
  }                                                                                                                    // 20
});                                                                                                                    // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afEachArrayItem/template.afEachArrayItem.js                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afEachArrayItem");                                                                               // 2
Template["afEachArrayItem"] = new Template("Template.afEachArrayItem", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return [ "\n  ", Spacebars.With(function() {                                                                         // 5
    return Spacebars.dataMustache(view.lookup("innerContext"), Spacebars.kw({                                          // 6
      atts: view.lookup(".")                                                                                           // 7
    }));                                                                                                               // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", Blaze.Each(function() {                                                                         // 10
      return Spacebars.call(view.lookup("."));                                                                         // 11
    }, function() {                                                                                                    // 12
      return [ "\n    ", Blaze.If(function() {                                                                         // 13
        return Spacebars.call(Spacebars.dot(view.lookup("."), "removed"));                                             // 14
      }, function() {                                                                                                  // 15
        return [ "\n    ", HTML.INPUT({                                                                                // 16
          type: "hidden",                                                                                              // 17
          name: function() {                                                                                           // 18
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));                                        // 19
          },                                                                                                           // 20
          "data-schema-key": function() {                                                                              // 21
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));                                        // 22
          },                                                                                                           // 23
          "data-null-value": "true",                                                                                   // 24
          value: ""                                                                                                    // 25
        }), "\n    " ];                                                                                                // 26
      }, function() {                                                                                                  // 27
        return [ "\n    ", Blaze._InOuterTemplateScope(view, function() {                                              // 28
          return Blaze._TemplateWith(function() {                                                                      // 29
            return Spacebars.call(view.lookup("."));                                                                   // 30
          }, function() {                                                                                              // 31
            return Spacebars.include(function() {                                                                      // 32
              return Spacebars.call(view.templateContentBlock);                                                        // 33
            });                                                                                                        // 34
          });                                                                                                          // 35
        }), "\n    " ];                                                                                                // 36
      }), "\n    " ];                                                                                                  // 37
    }), "\n  " ];                                                                                                      // 38
  }) ];                                                                                                                // 39
}));                                                                                                                   // 40
                                                                                                                       // 41
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afEachArrayItem/afEachArrayItem.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.afEachArrayItem.helpers({                                                                                     // 1
  innerContext: function afEachArrayItemContext(options) {                                                             // 2
    var c = AutoForm.Utility.normalizeContext(options.hash, "afEachArrayItem");                                        // 3
    var formId = c.af.formId;                                                                                          // 4
    var name = c.atts.name;                                                                                            // 5
                                                                                                                       // 6
    var docCount = fd.getDocCountForField(formId, name);                                                               // 7
    if (docCount == null) {                                                                                            // 8
      docCount = c.atts.initialCount;                                                                                  // 9
    }                                                                                                                  // 10
    arrayTracker.initField(formId, name, c.af.ss, docCount, c.atts.minCount, c.atts.maxCount);                         // 11
                                                                                                                       // 12
    return arrayTracker.getField(formId, name);                                                                        // 13
  }                                                                                                                    // 14
});                                                                                                                    // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afFieldInput/template.afFieldInput.js                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afFieldInput");                                                                                  // 2
Template["afFieldInput"] = new Template("Template.afFieldInput", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return Spacebars.With(function() {                                                                                   // 5
    return Spacebars.call(view.lookup("getComponentDef"));                                                             // 6
  }, function() {                                                                                                      // 7
    return [ "\n    ", Spacebars.With(function() {                                                                     // 8
      return Spacebars.dataMustache(view.lookup("innerContext"), Spacebars.kw({                                        // 9
        atts: view.lookup(".."),                                                                                       // 10
        componentDef: view.lookup(".")                                                                                 // 11
      }));                                                                                                             // 12
    }, function() {                                                                                                    // 13
      return [ "\n      ", Spacebars.With(function() {                                                                 // 14
        return Spacebars.dataMustache(view.lookup("getTemplateName"), Spacebars.dot(view.lookup(".."), "template"), Spacebars.dot(view.lookup("..."), "template"));
      }, function() {                                                                                                  // 16
        return [ "\n        ", Blaze._TemplateWith(function() {                                                        // 17
          return {                                                                                                     // 18
            template: Spacebars.call(view.lookup(".")),                                                                // 19
            data: Spacebars.call(view.lookup(".."))                                                                    // 20
          };                                                                                                           // 21
        }, function() {                                                                                                // 22
          return Spacebars.include(function() {                                                                        // 23
            return Spacebars.call(Template.__dynamic);                                                                 // 24
          });                                                                                                          // 25
        }), "\n      " ];                                                                                              // 26
      }), "\n    " ];                                                                                                  // 27
    }), "\n  " ];                                                                                                      // 28
  });                                                                                                                  // 29
}));                                                                                                                   // 30
                                                                                                                       // 31
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afFieldInput/afFieldInput.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.afFieldInput.helpers({                                                                                        // 1
  getComponentDef: function getComponentDef() {                                                                        // 2
    // Determine what `type` attribute should be if not set                                                            // 3
    var inputType = AutoForm.getInputType(this);                                                                       // 4
    var componentDef = inputTypeDefinitions[inputType];                                                                // 5
    if (!componentDef) {                                                                                               // 6
      throw new Error('AutoForm: No component found for rendering input with type "' + inputType + '"');               // 7
    }                                                                                                                  // 8
    return componentDef;                                                                                               // 9
  },                                                                                                                   // 10
  // similar to afTemplateName helper, but we have fewer layers of fallback, and we fall back                          // 11
  // lastly to a template without an _ piece at the end                                                                // 12
  getTemplateName: function getTemplateName(inputTemplateName, styleTemplateName) {                                    // 13
    var self = this, schemaAutoFormDefs, templateFromAncestor, defaultTemplate;                                        // 14
                                                                                                                       // 15
    // In simplest case, just try to combine the two given strings.                                                    // 16
    if (styleTemplateName && Template[inputTemplateName + '_' + styleTemplateName]) {                                  // 17
      return inputTemplateName + '_' + styleTemplateName;                                                              // 18
    }                                                                                                                  // 19
                                                                                                                       // 20
    // If the attributes provided a styleTemplateName but that template didn't exist, show a warning                   // 21
    if (styleTemplateName && AutoForm._debug) {                                                                        // 22
      console.warn(inputTemplateName + '_' + styleTemplateName + ' is not a valid template name. Falling back to a different template.');
    }                                                                                                                  // 24
                                                                                                                       // 25
    // Get `autoform` object from the schema, if present.                                                              // 26
    if (self.atts && self.atts.name) {                                                                                 // 27
      schemaAutoFormDefs = AutoForm.getSchemaForField(self.atts.name).autoform;                                        // 28
    }                                                                                                                  // 29
                                                                                                                       // 30
    // Fallback #1: autoform.template from the schema                                                                  // 31
    if (schemaAutoFormDefs && schemaAutoFormDefs.template && Template[inputTemplateName + '_' + schemaAutoFormDefs.template]) {
      return inputTemplateName + '_' + schemaAutoFormDefs.template;                                                    // 33
    }                                                                                                                  // 34
                                                                                                                       // 35
    // Fallback #2: template attribute on an ancestor component within the same form                                   // 36
    templateFromAncestor = AutoForm.findAttribute("template");                                                         // 37
    if (templateFromAncestor && Template[inputTemplateName + '_' + templateFromAncestor]) {                            // 38
      return inputTemplateName + '_' + templateFromAncestor;                                                           // 39
    }                                                                                                                  // 40
                                                                                                                       // 41
    // Fallback #3: Default template, as set by AutoForm.setDefaultTemplate                                            // 42
    defaultTemplate = AutoForm.getDefaultTemplate();                                                                   // 43
    if (defaultTemplate && Template[inputTemplateName + '_' + defaultTemplate]) {                                      // 44
      return inputTemplateName + '_' + defaultTemplate;                                                                // 45
    }                                                                                                                  // 46
                                                                                                                       // 47
    // Fallback #4: Just the inputTemplateName with no custom styled piece                                             // 48
    return inputTemplateName;                                                                                          // 49
  },                                                                                                                   // 50
  innerContext: function afFieldInputContext(options) {                                                                // 51
    var c = AutoForm.Utility.normalizeContext(options.hash, "afFieldInput");                                           // 52
                                                                                                                       // 53
    var ss = c.af.ss;                                                                                                  // 54
    var defs = c.defs;                                                                                                 // 55
                                                                                                                       // 56
    // Adjust for array fields if necessary                                                                            // 57
    var defaultValue = defs.defaultValue; //make sure to use pre-adjustment defaultValue for arrays                    // 58
    if (defs.type === Array) {                                                                                         // 59
      defs = ss.schema(c.atts.name + ".$");                                                                            // 60
    }                                                                                                                  // 61
                                                                                                                       // 62
    // Get inputTypeDefinition based on `type` attribute                                                               // 63
    var componentDef = options.hash.componentDef;                                                                      // 64
                                                                                                                       // 65
    // Get input value                                                                                                 // 66
    var value = getInputValue(c.atts, c.atts.value, c.af.mDoc, defaultValue, componentDef);                            // 67
                                                                                                                       // 68
    // Mark field value as changed for reactive updates                                                                // 69
    // We need to defer this until the element will be                                                                 // 70
    // added to the DOM. Otherwise, AutoForm.getFieldValue                                                             // 71
    // will not pick up the new value when there are #if etc.                                                          // 72
    // blocks involved.                                                                                                // 73
    // See https://github.com/aldeed/meteor-autoform/issues/461                                                        // 74
   setTimeout(function () {                                                                                            // 75
      updateTrackedFieldValue(c.af.formId, c.atts.name);                                                               // 76
    }, 0);                                                                                                             // 77
                                                                                                                       // 78
    // Build input data context                                                                                        // 79
    var iData = getInputData(defs, c.atts, value, ss.label(c.atts.name), c.af.submitType);                             // 80
                                                                                                                       // 81
    // Adjust and return context                                                                                       // 82
    return (typeof componentDef.contextAdjust === "function") ? componentDef.contextAdjust(iData) : iData;             // 83
  }                                                                                                                    // 84
});                                                                                                                    // 85
                                                                                                                       // 86
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afFormGroup/template.afFormGroup.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afFormGroup");                                                                                   // 2
Template["afFormGroup"] = new Template("Template.afFormGroup", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return Spacebars.With(function() {                                                                                   // 5
    return Spacebars.dataMustache(view.lookup("innerContext"), Spacebars.kw({                                          // 6
      atts: view.lookup(".")                                                                                           // 7
    }));                                                                                                               // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", Spacebars.With(function() {                                                                     // 10
      return Spacebars.dataMustache(view.lookup("afTemplateName"), "afFormGroup", Spacebars.dot(view.lookup(".."), "template"));
    }, function() {                                                                                                    // 12
      return [ "\n      ", Blaze._TemplateWith(function() {                                                            // 13
        return {                                                                                                       // 14
          template: Spacebars.call(view.lookup(".")),                                                                  // 15
          data: Spacebars.call(view.lookup(".."))                                                                      // 16
        };                                                                                                             // 17
      }, function() {                                                                                                  // 18
        return Spacebars.include(function() {                                                                          // 19
          return Spacebars.call(Template.__dynamic);                                                                   // 20
        });                                                                                                            // 21
      }), "\n    " ];                                                                                                  // 22
    }), "\n  " ];                                                                                                      // 23
  });                                                                                                                  // 24
}));                                                                                                                   // 25
                                                                                                                       // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afFormGroup/afFormGroup.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.afFormGroup.helpers({                                                                                         // 1
  innerContext: function afFormGroupContext(options) {                                                                 // 2
    var c = AutoForm.Utility.normalizeContext(options.hash, "afFormGroup");                                            // 3
    return {                                                                                                           // 4
      skipLabel: (c.atts.label === false),                                                                             // 5
      afFieldLabelAtts: formGroupLabelAtts(c.atts),                                                                    // 6
      afFieldInputAtts: formGroupInputAtts(c.atts),                                                                    // 7
      atts: {name: c.atts.name},                                                                                       // 8
      labelText: (typeof c.atts.label === "string") ? c.atts.label : null                                              // 9
    };                                                                                                                 // 10
  }                                                                                                                    // 11
});                                                                                                                    // 12
                                                                                                                       // 13
/*                                                                                                                     // 14
 * Private                                                                                                             // 15
 */                                                                                                                    // 16
                                                                                                                       // 17
function formGroupLabelAtts(atts) {                                                                                    // 18
  // Separate label options from input options; label items begin with "label-"                                        // 19
  var labelAtts = {};                                                                                                  // 20
  _.each(atts, function autoFormLabelAttsEach(val, key) {                                                              // 21
    if (key.indexOf("label-") === 0) {                                                                                 // 22
      labelAtts[key.substring(6)] = val;                                                                               // 23
    }                                                                                                                  // 24
  });                                                                                                                  // 25
  return labelAtts;                                                                                                    // 26
}                                                                                                                      // 27
                                                                                                                       // 28
function formGroupInputAtts(atts) {                                                                                    // 29
  // Separate label options from input options; label items begin with "label-"                                        // 30
  // We also don't want the "label" option                                                                             // 31
  var inputAtts = {};                                                                                                  // 32
  _.each(atts, function autoFormLabelAttsEach(val, key) {                                                              // 33
    if (key !== "label" && key.indexOf("label-") !== 0) {                                                              // 34
      inputAtts[key] = val;                                                                                            // 35
    }                                                                                                                  // 36
  });                                                                                                                  // 37
  return inputAtts;                                                                                                    // 38
}                                                                                                                      // 39
                                                                                                                       // 40
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afObjectField/template.afObjectField.js                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afObjectField");                                                                                 // 2
Template["afObjectField"] = new Template("Template.afObjectField", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return Spacebars.With(function() {                                                                                   // 5
    return {                                                                                                           // 6
      atts: Spacebars.call(view.lookup("."))                                                                           // 7
    };                                                                                                                 // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", Spacebars.With(function() {                                                                     // 10
      return Spacebars.dataMustache(view.lookup("afTemplateName"), "afObjectField", Spacebars.dot(view.lookup(".."), "template"));
    }, function() {                                                                                                    // 12
      return [ "\n      ", Blaze._TemplateWith(function() {                                                            // 13
        return {                                                                                                       // 14
          template: Spacebars.call(view.lookup(".")),                                                                  // 15
          data: Spacebars.call(view.lookup(".."))                                                                      // 16
        };                                                                                                             // 17
      }, function() {                                                                                                  // 18
        return Spacebars.include(function() {                                                                          // 19
          return Spacebars.call(Template.__dynamic);                                                                   // 20
        });                                                                                                            // 21
      }), "\n    " ];                                                                                                  // 22
    }), "\n  " ];                                                                                                      // 23
  });                                                                                                                  // 24
}));                                                                                                                   // 25
                                                                                                                       // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afQuickField/template.afQuickField.js                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afQuickField");                                                                                  // 2
Template["afQuickField"] = new Template("Template.afQuickField", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.dataMustache(view.lookup("isGroup"), Spacebars.kw({                                               // 6
      atts: view.lookup(".")                                                                                           // 7
    }));                                                                                                               // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", Spacebars.include(view.lookupTemplate("afObjectField")), "\n  " ];                              // 10
  }, function() {                                                                                                      // 11
    return [ "\n    ", Blaze.If(function() {                                                                           // 12
      return Spacebars.dataMustache(view.lookup("isFieldArray"), Spacebars.kw({                                        // 13
        atts: view.lookup(".")                                                                                         // 14
      }));                                                                                                             // 15
    }, function() {                                                                                                    // 16
      return [ "\n      ", Spacebars.include(view.lookupTemplate("afArrayField")), "\n    " ];                         // 17
    }, function() {                                                                                                    // 18
      return [ "\n      ", Blaze._TemplateWith(function() {                                                            // 19
        return Spacebars.call(view.lookup("groupAtts"));                                                               // 20
      }, function() {                                                                                                  // 21
        return Spacebars.include(view.lookupTemplate("afFormGroup"));                                                  // 22
      }), "\n    " ];                                                                                                  // 23
    }), "\n  " ];                                                                                                      // 24
  });                                                                                                                  // 25
}));                                                                                                                   // 26
                                                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afQuickField/afQuickField.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.afQuickField.helpers({                                                                                        // 1
  isGroup: function afQuickFieldIsGroup(options) {                                                                     // 2
    var c = AutoForm.Utility.normalizeContext(options.hash, "afQuickField");                                           // 3
    // Render a group of fields if we expect an Object and we don't have options                                       // 4
    // and we have not overridden the type                                                                             // 5
    return (c.defs.type === Object && !c.atts.options && !c.atts.type);                                                // 6
  },                                                                                                                   // 7
  isFieldArray: function afQuickFieldIsFieldArray(options) {                                                           // 8
    var c = AutoForm.Utility.normalizeContext(options.hash, "afQuickField");                                           // 9
    // Render an array of fields if we expect an Array and we don't have options                                       // 10
    // and we have not overridden the type                                                                             // 11
    return (c.defs.type === Array && !c.atts.options && !c.atts.type);                                                 // 12
  },                                                                                                                   // 13
  groupAtts: function afQuickFieldGroupAtts() {                                                                        // 14
    return _.omit(this, 'fields', 'omitFields');                                                                       // 15
  }                                                                                                                    // 16
});                                                                                                                    // 17
                                                                                                                       // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afQuickFields/template.afQuickFields.js                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("afQuickFields");                                                                                 // 2
Template["afQuickFields"] = new Template("Template.afQuickFields", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return Blaze.Each(function() {                                                                                       // 5
    return Spacebars.dataMustache(view.lookup("afFieldNames"), Spacebars.kw({                                          // 6
      name: Spacebars.dot(view.lookup("."), "name")                                                                    // 7
    }));                                                                                                               // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", Spacebars.With(function() {                                                                     // 10
      return {                                                                                                         // 11
        name: Spacebars.call(view.lookup("."))                                                                         // 12
      };                                                                                                               // 13
    }, function() {                                                                                                    // 14
      return [ "\n    ", Blaze._TemplateWith(function() {                                                              // 15
        return Spacebars.call(view.lookup("quickFieldAtts"));                                                          // 16
      }, function() {                                                                                                  // 17
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 18
      }), "\n    " ];                                                                                                  // 19
    }), "\n  " ];                                                                                                      // 20
  });                                                                                                                  // 21
}));                                                                                                                   // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/components/afQuickFields/afQuickFields.js                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.afQuickFields.helpers({                                                                                       // 1
  quickFieldAtts: function afQuickFieldsQuickFieldAtts() {                                                             // 2
    // Get the attributes that were on the afQuickFields component                                                     // 3
    var afQuickFieldsComponentAtts = Template.parentData(2);                                                           // 4
    // It's possible to call {{> afQuickFields}} with no attributes, in which case we                                  // 5
    // don't want the "attributes" because they're really just the parent context.                                     // 6
    if (afQuickFieldsComponentAtts.atts) {                                                                             // 7
      afQuickFieldsComponentAtts = {};                                                                                 // 8
    }                                                                                                                  // 9
    return _.extend({options: "auto"}, afQuickFieldsComponentAtts, this);                                              // 10
  }                                                                                                                    // 11
});                                                                                                                    // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/autoform-events.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// all form events handled here                                                                                        // 1
var lastAutoSaveElement = null;                                                                                        // 2
                                                                                                                       // 3
function beginSubmit(formId, template) {                                                                               // 4
  if (!template || !template.view._domrange)                                                                           // 5
    return;                                                                                                            // 6
  // Get user-defined hooks                                                                                            // 7
  var hooks = Hooks.getHooks(formId, 'beginSubmit');                                                                   // 8
  if (hooks.length) {                                                                                                  // 9
    _.each(hooks, function beginSubmitHooks(hook) {                                                                    // 10
      hook(formId, template);                                                                                          // 11
    });                                                                                                                // 12
  } else {                                                                                                             // 13
    // If there are no user-defined hooks, by default we disable the submit button during submission                   // 14
    var submitButton = template.find("button[type=submit]") || template.find("input[type=submit]");                    // 15
    if (submitButton) {                                                                                                // 16
      submitButton.disabled = true;                                                                                    // 17
    }                                                                                                                  // 18
  }                                                                                                                    // 19
}                                                                                                                      // 20
                                                                                                                       // 21
function endSubmit(formId, template) {                                                                                 // 22
  if (!template || !template.view._domrange)                                                                           // 23
    return;                                                                                                            // 24
  // Try to avoid incorrect reporting of which input caused autosave                                                   // 25
  lastAutoSaveElement = null;                                                                                          // 26
  // Get user-defined hooks                                                                                            // 27
  var hooks = Hooks.getHooks(formId, 'endSubmit');                                                                     // 28
  if (hooks.length) {                                                                                                  // 29
    _.each(hooks, function endSubmitHooks(hook) {                                                                      // 30
      hook(formId, template);                                                                                          // 31
    });                                                                                                                // 32
  } else {                                                                                                             // 33
    // If there are no user-defined hooks, by default we disable the submit button during submission                   // 34
    var submitButton = template.find("button[type=submit]") || template.find("input[type=submit]");                    // 35
    if (submitButton) {                                                                                                // 36
      submitButton.disabled = false;                                                                                   // 37
    }                                                                                                                  // 38
  }                                                                                                                    // 39
}                                                                                                                      // 40
                                                                                                                       // 41
Template.autoForm.events({                                                                                             // 42
  'submit form': function autoFormSubmitHandler(event, template) {                                                     // 43
    // Gather necessary form info                                                                                      // 44
    var formId = this.id || defaultFormId;                                                                             // 45
    var data = formData[formId];                                                                                       // 46
    var isInsert = (data.submitType === "insert");                                                                     // 47
    var isUpdate = (data.submitType === "update");                                                                     // 48
    var isMethod = (data.submitType === "method");                                                                     // 49
    var method = data.submitMethod;                                                                                    // 50
    var isNormalSubmit = (!isInsert && !isUpdate && !isMethod);                                                        // 51
    // ss will be the schema for the `schema` attribute if present,                                                    // 52
    // else the schema for the collection                                                                              // 53
    var ss = data.ss;                                                                                                  // 54
    var ssIsOverride = data.ssIsOverride;                                                                              // 55
    var collection = data.collection;                                                                                  // 56
    var currentDoc = data.doc;                                                                                         // 57
    var docId = currentDoc ? currentDoc._id : null;                                                                    // 58
    var isValid;                                                                                                       // 59
                                                                                                                       // 60
    // Make sure we have a collection if we need one for the requested submit type                                     // 61
    if (!collection) {                                                                                                 // 62
      if (isInsert)                                                                                                    // 63
        throw new Error("AutoForm: You must specify a collection when form type is insert.");                          // 64
      else if (isUpdate)                                                                                               // 65
        throw new Error("AutoForm: You must specify a collection when form type is update.");                          // 66
    }                                                                                                                  // 67
                                                                                                                       // 68
    // Prevent browser form submission if we're planning to do our own thing                                           // 69
    if (!isNormalSubmit) {                                                                                             // 70
      event.preventDefault();                                                                                          // 71
    }                                                                                                                  // 72
                                                                                                                       // 73
    // Gather hooks                                                                                                    // 74
    var onSuccess = Hooks.getHooks(formId, 'onSuccess');                                                               // 75
    var onError = Hooks.getHooks(formId, 'onError');                                                                   // 76
                                                                                                                       // 77
    // Prep haltSubmission function                                                                                    // 78
    function haltSubmission() {                                                                                        // 79
      event.preventDefault();                                                                                          // 80
      event.stopPropagation();                                                                                         // 81
      // Run endSubmit hooks (re-enabled submit button or form, etc.)                                                  // 82
      endSubmit(formId, template);                                                                                     // 83
    }                                                                                                                  // 84
                                                                                                                       // 85
    function failedValidation() {                                                                                      // 86
      var ec = ss.namedContext(formId);                                                                                // 87
      var ik = ec.invalidKeys(), err;                                                                                  // 88
      if (ik) {                                                                                                        // 89
        if (ik.length) {                                                                                               // 90
          // We add `message` prop to the invalidKeys.                                                                 // 91
          // Maybe SS pkg should just add that property back in?                                                       // 92
          ik = _.map(ik, function (o) {                                                                                // 93
            return _.extend({message: ec.keyErrorMessage(o.name)}, o);                                                 // 94
          });                                                                                                          // 95
          err = new Error(ik[0].message);                                                                              // 96
        } else {                                                                                                       // 97
          err = new Error('form failed validation');                                                                   // 98
        }                                                                                                              // 99
        err.invalidKeys = ik;                                                                                          // 100
      } else {                                                                                                         // 101
        err = new Error('form failed validation');                                                                     // 102
      }                                                                                                                // 103
      _.each(onError, function onErrorEach(hook) {                                                                     // 104
        hook('pre-submit validation', err, template);                                                                  // 105
      });                                                                                                              // 106
      haltSubmission();                                                                                                // 107
    }                                                                                                                  // 108
                                                                                                                       // 109
    // Prep callback creator function                                                                                  // 110
    function makeCallback(name) {                                                                                      // 111
      var cbCtx = {                                                                                                    // 112
        event: event,                                                                                                  // 113
        template: template,                                                                                            // 114
        formId: formId,                                                                                                // 115
        docId: docId,                                                                                                  // 116
        autoSaveChangedElement: lastAutoSaveElement,                                                                   // 117
        resetForm: function () {                                                                                       // 118
          AutoForm.resetForm(formId, template);                                                                        // 119
        }                                                                                                              // 120
      };                                                                                                               // 121
      var afterHooks = Hooks.getHooks(formId, 'after', name);                                                          // 122
      return function autoFormActionCallback(error, result) {                                                          // 123
        if (error) {                                                                                                   // 124
          if (onError && onError.length) {                                                                             // 125
            _.each(onError, function onErrorEach(hook) {                                                               // 126
              hook.call(cbCtx, name, error, template);                                                                 // 127
            });                                                                                                        // 128
          } else if ((!afterHooks || !afterHooks.length) && ss.namedContext(formId).isValid()) {                       // 129
            // if there are no onError or "after" hooks or validation errors, throw the error                          // 130
            // because it must be some other error from the server                                                     // 131
            endSubmit(formId, template);                                                                               // 132
            throw error;                                                                                               // 133
          }                                                                                                            // 134
        } else {                                                                                                       // 135
          // By default, we reset form after successful submit, but                                                    // 136
          // you can opt out.                                                                                          // 137
          if (data.resetOnSuccess !== false) {                                                                         // 138
            AutoForm.resetForm(formId, template);                                                                      // 139
          }                                                                                                            // 140
          // Set docId in the context for insert forms, too                                                            // 141
          if (name === "insert") {                                                                                     // 142
            cbCtx.docId = result;                                                                                      // 143
          }                                                                                                            // 144
          _.each(onSuccess, function onSuccessEach(hook) {                                                             // 145
            hook.call(cbCtx, name, result, template);                                                                  // 146
          });                                                                                                          // 147
        }                                                                                                              // 148
        _.each(afterHooks, function afterHooksEach(hook) {                                                             // 149
          hook.call(cbCtx, error, result, template);                                                                   // 150
        });                                                                                                            // 151
        // Run endSubmit hooks (re-enabled submit button or form, etc.)                                                // 152
        endSubmit(formId, template);                                                                                   // 153
      };                                                                                                               // 154
    }                                                                                                                  // 155
                                                                                                                       // 156
    // Prep function that calls before hooks.                                                                          // 157
    // We pass the template instance in case the hook                                                                  // 158
    // needs the data context.                                                                                         // 159
    function doBefore(docId, doc, hooks, name, next) {                                                                 // 160
      // We call the hooks recursively, in order added,                                                                // 161
      // passing the result of the first hook to the                                                                   // 162
      // second hook, etc.                                                                                             // 163
      function runHook(i, doc) {                                                                                       // 164
        hook = hooks[i];                                                                                               // 165
                                                                                                                       // 166
        if (!hook) {                                                                                                   // 167
          // We've run all hooks; continue submission                                                                  // 168
          next(doc);                                                                                                   // 169
          return;                                                                                                      // 170
        }                                                                                                              // 171
                                                                                                                       // 172
        // Set up before hook context                                                                                  // 173
        var cb = function (d) {                                                                                        // 174
          // If the hook returns false, we cancel                                                                      // 175
          if (d === false) {                                                                                           // 176
            // Run endSubmit hooks (re-enabled submit button or form, etc.)                                            // 177
            endSubmit(formId, template);                                                                               // 178
          } else {                                                                                                     // 179
            if (!_.isObject(d)) {                                                                                      // 180
              throw new Error(name + " must return an object");                                                        // 181
            }                                                                                                          // 182
            runHook(i+1, d);                                                                                           // 183
          }                                                                                                            // 184
        };                                                                                                             // 185
        var ctx = {                                                                                                    // 186
          event: event,                                                                                                // 187
          template: template,                                                                                          // 188
          formId: formId,                                                                                              // 189
          docId: docId,                                                                                                // 190
          autoSaveChangedElement: lastAutoSaveElement,                                                                 // 191
          resetForm: function () {                                                                                     // 192
            AutoForm.resetForm(formId, template);                                                                      // 193
          },                                                                                                           // 194
          result: _.once(cb)                                                                                           // 195
        };                                                                                                             // 196
                                                                                                                       // 197
        var result;                                                                                                    // 198
        if (docId) {                                                                                                   // 199
          result = hook.call(ctx, docId, doc, template);                                                               // 200
        } else {                                                                                                       // 201
          result = hook.call(ctx, doc, template);                                                                      // 202
        }                                                                                                              // 203
        // If the hook returns undefined, we wait for it                                                               // 204
        // to call this.result()                                                                                       // 205
        if (result !== void 0) {                                                                                       // 206
          ctx.result(result);                                                                                          // 207
        }                                                                                                              // 208
      }                                                                                                                // 209
                                                                                                                       // 210
      runHook(0, doc);                                                                                                 // 211
    }                                                                                                                  // 212
                                                                                                                       // 213
    // Prep function that calls onSubmit hooks.                                                                        // 214
    // We pass the template instance in case the hook                                                                  // 215
    // needs the data context, and event in case they                                                                  // 216
    // need to prevent default, etc.                                                                                   // 217
    function doOnSubmit(hooks, insertDoc, updateDoc, currentDoc) {                                                     // 218
      // These are called differently from the before hooks because                                                    // 219
      // they run async, but they can run in parallel and we need the                                                  // 220
      // result of all of them immediately because they can return                                                     // 221
      // false to stop normal form submission.                                                                         // 222
                                                                                                                       // 223
      var hookCount = hooks.length, doneCount = 0, submitError, submitResult;                                          // 224
                                                                                                                       // 225
      if (hookCount === 0) {                                                                                           // 226
        // Run endSubmit hooks (re-enabled submit button or form, etc.)                                                // 227
        endSubmit(formId, template);                                                                                   // 228
        return;                                                                                                        // 229
      }                                                                                                                // 230
                                                                                                                       // 231
      // Set up onSubmit hook context                                                                                  // 232
      var ctx = {                                                                                                      // 233
        event: event,                                                                                                  // 234
        template: template,                                                                                            // 235
        formId: formId,                                                                                                // 236
        docId: docId,                                                                                                  // 237
        autoSaveChangedElement: lastAutoSaveElement,                                                                   // 238
        resetForm: function () {                                                                                       // 239
          AutoForm.resetForm(formId, template);                                                                        // 240
        },                                                                                                             // 241
        done: function (error, result) {                                                                               // 242
          doneCount++;                                                                                                 // 243
          if (!submitError && error) {                                                                                 // 244
            submitError = error;                                                                                       // 245
          }                                                                                                            // 246
          if (!submitResult && result) {                                                                               // 247
            submitResult = result;                                                                                     // 248
          }                                                                                                            // 249
          if (doneCount === hookCount) {                                                                               // 250
            var submitCallback = makeCallback('submit');                                                               // 251
            // run onError, onSuccess, endSubmit                                                                       // 252
            submitCallback(submitError, submitResult);                                                                 // 253
          }                                                                                                            // 254
        }                                                                                                              // 255
      };                                                                                                               // 256
                                                                                                                       // 257
      // Call all hooks at once.                                                                                       // 258
      // Pass both types of doc plus the doc attached to the form.                                                     // 259
      // If any return false, we stop normal submission, but we don't                                                  // 260
      // run onError, onSuccess, endSubmit hooks until they all call this.done().                                      // 261
      var shouldStop = false;                                                                                          // 262
      _.each(hooks, function eachOnSubmit(hook) {                                                                      // 263
        var result = hook.call(ctx, insertDoc, updateDoc, currentDoc);                                                 // 264
        if (shouldStop === false && result === false) {                                                                // 265
          shouldStop = true;                                                                                           // 266
        }                                                                                                              // 267
      });                                                                                                              // 268
      if (shouldStop) {                                                                                                // 269
        event.preventDefault();                                                                                        // 270
        event.stopPropagation();                                                                                       // 271
      }                                                                                                                // 272
    }                                                                                                                  // 273
                                                                                                                       // 274
    // Gather all form values                                                                                          // 275
    var formDocs = getFormValues(template, formId, ss);                                                                // 276
    var insertDoc = formDocs.insertDoc;                                                                                // 277
    var updateDoc = formDocs.updateDoc;                                                                                // 278
                                                                                                                       // 279
    // This validation pass happens before any "before" hooks run. It should happen                                    // 280
    // only when there is both a collection AND a schema specified, in which case we                                   // 281
    // validate first against the form schema. Then before hooks can add any missing                                   // 282
    // properties before we validate against the full collection schema.                                               // 283
    //                                                                                                                 // 284
    // We also validate at this time if we're doing normal form submission, in which                                   // 285
    // case there are no "before" hooks, and this is the only validation pass we do                                    // 286
    // before running onSubmit hooks and potentially allowing the browser to submit.                                   // 287
    if (data.validationType !== 'none' && (ssIsOverride || isNormalSubmit)) {                                          // 288
      // Catch exceptions in validation functions which will bubble up here, cause a form with                         // 289
      // onSubmit() to submit prematurely and prevent the error from being reported                                    // 290
      // (due to a page refresh).                                                                                      // 291
      try {                                                                                                            // 292
        isValid = _validateForm(formId, data, formDocs);                                                               // 293
      } catch (e) {                                                                                                    // 294
        console.error('Validation error', e);                                                                          // 295
        isValid = false;                                                                                               // 296
      }                                                                                                                // 297
      // If we failed pre-submit validation, we stop submission.                                                       // 298
      if (isValid === false) {                                                                                         // 299
        return failedValidation();                                                                                     // 300
      }                                                                                                                // 301
    }                                                                                                                  // 302
                                                                                                                       // 303
    // Run beginSubmit hooks (disable submit button or form, etc.)                                                     // 304
    // NOTE: This needs to stay after getFormValues in case a                                                          // 305
    // beginSubmit hook disables inputs. We don't get values for                                                       // 306
    // disabled inputs, but if they are just disabling during submission,                                              // 307
    // then we actually do want the values.                                                                            // 308
    beginSubmit(formId, template);                                                                                     // 309
                                                                                                                       // 310
    // Now we will do the requested insert, update, method, or normal                                                  // 311
    // browser form submission.                                                                                        // 312
    var validationOptions = {                                                                                          // 313
      validationContext: formId,                                                                                       // 314
      filter: data.filter,                                                                                             // 315
      autoConvert: data.autoConvert,                                                                                   // 316
      removeEmptyStrings: data.removeEmptyStrings,                                                                     // 317
      trimStrings: data.trimStrings                                                                                    // 318
    };                                                                                                                 // 319
                                                                                                                       // 320
    // INSERT FORM SUBMIT                                                                                              // 321
    if (isInsert) {                                                                                                    // 322
      // Get "before.insert" hooks                                                                                     // 323
      var beforeInsertHooks = Hooks.getHooks(formId, 'before', 'insert');                                              // 324
      // Run "before.insert" hooks                                                                                     // 325
      doBefore(null, insertDoc, beforeInsertHooks, 'before.insert hook', function (doc) {                              // 326
        // Make callback for insert                                                                                    // 327
        var insertCallback = makeCallback('insert');                                                                   // 328
        // Perform insert                                                                                              // 329
        if (typeof collection.simpleSchema === "function" && collection.simpleSchema() != null) {                      // 330
          // If the collection2 pkg is used and a schema is attached, we pass a validationContext                      // 331
          collection.insert(doc, validationOptions, insertCallback);                                                   // 332
        } else {                                                                                                       // 333
          // If the collection2 pkg is not used or no schema is attached, we don't pass options                        // 334
          // because core Meteor's `insert` function does not accept                                                   // 335
          // an options argument.                                                                                      // 336
          collection.insert(doc, insertCallback);                                                                      // 337
        }                                                                                                              // 338
      });                                                                                                              // 339
    }                                                                                                                  // 340
                                                                                                                       // 341
    // UPDATE FORM SUBMIT                                                                                              // 342
    else if (isUpdate) {                                                                                               // 343
      // Get "before.update" hooks                                                                                     // 344
      var beforeUpdateHooks = Hooks.getHooks(formId, 'before', 'update');                                              // 345
      // Run "before.update" hooks                                                                                     // 346
      doBefore(docId, updateDoc, beforeUpdateHooks, 'before.update hook', function (modifier) {                        // 347
        // Make callback for update                                                                                    // 348
        var updateCallback = makeCallback('update');                                                                   // 349
        if (_.isEmpty(modifier)) { // make sure this check stays after the before hooks                                // 350
          // Nothing to update. Just treat it as a successful update.                                                  // 351
          updateCallback(null, 0);                                                                                     // 352
        } else {                                                                                                       // 353
          // Perform update                                                                                            // 354
          collection.update(docId, modifier, validationOptions, updateCallback);                                       // 355
        }                                                                                                              // 356
      });                                                                                                              // 357
    }                                                                                                                  // 358
                                                                                                                       // 359
    // METHOD FORM SUBMIT                                                                                              // 360
    else if (isMethod) {                                                                                               // 361
      // Get "before.methodName" hooks                                                                                 // 362
      if (!method) {                                                                                                   // 363
        throw new Error('When form type is "method", you must also provide a "meteormethod" attribute');               // 364
      }                                                                                                                // 365
      var beforeMethodHooks = Hooks.getHooks(formId, 'before', method);                                                // 366
      // Run "before.methodName" hooks                                                                                 // 367
      doBefore(null, insertDoc, beforeMethodHooks, 'before.method hook', function (doc) {                              // 368
        // Validate. If both schema and collection were provided, then we validate                                     // 369
        // against the collection schema here. Otherwise we validate against whichever                                 // 370
        // one was passed.                                                                                             // 371
        isValid = _validateForm(formId, data, formDocs, ssIsOverride);                                                 // 372
        if (isValid === false) {                                                                                       // 373
          return failedValidation();                                                                                   // 374
        }                                                                                                              // 375
        // Make callback for Meteor.call                                                                               // 376
        var methodCallback = makeCallback(method);                                                                     // 377
        // Call the method                                                                                             // 378
        Meteor.call(method, doc, updateDoc, docId, methodCallback);                                                    // 379
      });                                                                                                              // 380
    }                                                                                                                  // 381
                                                                                                                       // 382
    // NORMAL FORM SUBMIT                                                                                              // 383
    else if (isNormalSubmit) {                                                                                         // 384
      // Get onSubmit hooks                                                                                            // 385
      var onSubmitHooks = Hooks.getHooks(formId, 'onSubmit');                                                          // 386
      doOnSubmit(onSubmitHooks, insertDoc, updateDoc, currentDoc);                                                     // 387
    }                                                                                                                  // 388
  },                                                                                                                   // 389
  'keyup [data-schema-key]': function autoFormKeyUpHandler(event, template) {                                          // 390
    var validationType = template.data.validation || 'submitThenKeyup';                                                // 391
    var onlyIfAlreadyInvalid = (validationType === 'submitThenKeyup');                                                 // 392
    var skipEmpty = !(event.keyCode === 8 || event.keyCode === 46); //if deleting or backspacing, don't skip empty     // 393
    if ((validationType === 'keyup' || validationType === 'submitThenKeyup')) {                                        // 394
      validateField(event.currentTarget.getAttribute("data-schema-key"), template, skipEmpty, onlyIfAlreadyInvalid);   // 395
    }                                                                                                                  // 396
  },                                                                                                                   // 397
  'blur [data-schema-key]': function autoFormBlurHandler(event, template) {                                            // 398
    var validationType = template.data.validation || 'submitThenKeyup';                                                // 399
    var onlyIfAlreadyInvalid = (validationType === 'submitThenKeyup' || validationType === 'submitThenBlur');          // 400
    if (validationType === 'keyup' || validationType === 'blur' || validationType === 'submitThenKeyup' || validationType === 'submitThenBlur') {
      validateField(event.currentTarget.getAttribute("data-schema-key"), template, false, onlyIfAlreadyInvalid);       // 402
    }                                                                                                                  // 403
  },                                                                                                                   // 404
  'change form': function autoFormChangeHandler(event, template) {                                                     // 405
    var self = this;                                                                                                   // 406
                                                                                                                       // 407
    var key = event.target.getAttribute("data-schema-key");                                                            // 408
    if (!key) {                                                                                                        // 409
      key = $(event.target).closest('[data-schema-key]').attr("data-schema-key");                                      // 410
      if (!key) return;                                                                                                // 411
    }                                                                                                                  // 412
                                                                                                                       // 413
    var formId = self.id || defaultFormId;                                                                             // 414
    var data = formData[formId];                                                                                       // 415
    if (!data)                                                                                                         // 416
      return;                                                                                                          // 417
                                                                                                                       // 418
    // Mark field value as changed for reactive updates                                                                // 419
    updateTrackedFieldValue(formId, key);                                                                              // 420
                                                                                                                       // 421
    // If the form should be auto-saved whenever updated, we do that on field                                          // 422
    // changes instead of validating the field                                                                         // 423
    if (data.autosave) {                                                                                               // 424
      lastAutoSaveElement = event.target;                                                                              // 425
      $(event.currentTarget).submit();                                                                                 // 426
      return;                                                                                                          // 427
    }                                                                                                                  // 428
                                                                                                                       // 429
    var validationType = data.validationType || 'submitThenKeyup';                                                     // 430
    var onlyIfAlreadyInvalid = (validationType === 'submitThenKeyup' || validationType === 'submitThenBlur');          // 431
    if (validationType === 'keyup' || validationType === 'blur' || validationType === 'submitThenKeyup' || validationType === 'submitThenBlur') {
      validateField(key, template, false, onlyIfAlreadyInvalid);                                                       // 433
    }                                                                                                                  // 434
  },                                                                                                                   // 435
  'reset form': function autoFormResetHandler(event, template) {                                                       // 436
    var formId = this.id || defaultFormId;                                                                             // 437
                                                                                                                       // 438
    formPreserve.clearDocument(formId);                                                                                // 439
                                                                                                                       // 440
    // Reset array counts                                                                                              // 441
    arrayTracker.resetForm(formId);                                                                                    // 442
                                                                                                                       // 443
    var fd = formData[formId];                                                                                         // 444
                                                                                                                       // 445
    if (!fd)                                                                                                           // 446
      return;                                                                                                          // 447
                                                                                                                       // 448
    if (fd.ss) {                                                                                                       // 449
      fd.ss.namedContext(formId).resetValidation();                                                                    // 450
      // If simpleSchema is undefined, we haven't yet rendered the form, and therefore                                 // 451
      // there is no need to reset validation for it. No error need be thrown.                                         // 452
    }                                                                                                                  // 453
                                                                                                                       // 454
    if (this.doc) {                                                                                                    // 455
      event.preventDefault();                                                                                          // 456
                                                                                                                       // 457
      // Use destroy form hack since Meteor doesn't give us an easy way to                                             // 458
      // invalidate changed form attributes yet.                                                                       // 459
      afDestroyUpdateForm.set(true);                                                                                   // 460
      Tracker.flush();                                                                                                 // 461
      afDestroyUpdateForm.set(false);                                                                                  // 462
      Tracker.flush();                                                                                                 // 463
                                                                                                                       // 464
      template.$("[autofocus]").focus();                                                                               // 465
    } else {                                                                                                           // 466
      // This must be done after we allow this event handler to return                                                 // 467
      // because we have to let the browser reset all fields before we                                                 // 468
      // update their values for deps.                                                                                 // 469
      setTimeout(function () {                                                                                         // 470
        // Mark all fields as changed                                                                                  // 471
        updateAllTrackedFieldValues(formId);                                                                           // 472
                                                                                                                       // 473
        // Focus the autofocus element                                                                                 // 474
        if (template && template.view._domrange && !template.view.isDestroyed) {                                       // 475
          template.$("[autofocus]").focus();                                                                           // 476
        }                                                                                                              // 477
      }, 0);                                                                                                           // 478
    }                                                                                                                  // 479
                                                                                                                       // 480
  },                                                                                                                   // 481
  'keydown .autoform-array-item input': function (event, template) {                                                   // 482
    // When enter is pressed in an array item field, default behavior                                                  // 483
    // seems to be to "click" the remove item button. This doesn't make                                                // 484
    // sense so we stop it.                                                                                            // 485
    if (event.keyCode === 13) {                                                                                        // 486
      event.preventDefault();                                                                                          // 487
    }                                                                                                                  // 488
  },                                                                                                                   // 489
  'click .autoform-remove-item': function autoFormClickRemoveItem(event, template) {                                   // 490
    var self = this; // This type of button must be used within an afEachArrayItem block, so we know the context       // 491
                                                                                                                       // 492
    event.preventDefault();                                                                                            // 493
                                                                                                                       // 494
    var name = self.arrayFieldName;                                                                                    // 495
    var minCount = self.minCount; // optional, overrides schema                                                        // 496
    var maxCount = self.maxCount; // optional, overrides schema                                                        // 497
    var index = self.index;                                                                                            // 498
    var data = template.data;                                                                                          // 499
    var formId = data && data.id || defaultFormId;                                                                     // 500
    var ss = formData[formId].ss;                                                                                      // 501
                                                                                                                       // 502
    // remove the item we clicked                                                                                      // 503
    arrayTracker.removeFromFieldAtIndex(formId, name, index, ss, minCount, maxCount);                                  // 504
  },                                                                                                                   // 505
  'click .autoform-add-item': function autoFormClickAddItem(event, template) {                                         // 506
    event.preventDefault();                                                                                            // 507
                                                                                                                       // 508
    // We pull from data attributes because the button could be manually                                               // 509
    // added anywhere, so we don't know the data context.                                                              // 510
    var btn = $(event.currentTarget);                                                                                  // 511
    var name = btn.attr("data-autoform-field");                                                                        // 512
    var minCount = btn.attr("data-autoform-minCount"); // optional, overrides schema                                   // 513
    var maxCount = btn.attr("data-autoform-maxCount"); // optional, overrides schema                                   // 514
    var data = template.data;                                                                                          // 515
    var formId = data && data.id || defaultFormId;                                                                     // 516
    var ss = formData[formId].ss;                                                                                      // 517
                                                                                                                       // 518
    arrayTracker.addOneToField(formId, name, ss, minCount, maxCount);                                                  // 519
  }                                                                                                                    // 520
});                                                                                                                    // 521
                                                                                                                       // 522
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/bootstrap3/template.bootstrap3.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("quickForm_bootstrap3");                                                                          // 2
Template["quickForm_bootstrap3"] = new Template("Template.quickForm_bootstrap3", (function() {                         // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return Spacebars.call(Spacebars.dot(view.lookup("."), "qfAutoFormContext"));                                       // 6
  }, function() {                                                                                                      // 7
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 8
      return [ "\n    ", Spacebars.include(view.lookupTemplate("afQuickFields")), "\n    ", Blaze.If(function() {      // 9
        return Spacebars.call(view.lookup("qfShouldRenderButton"));                                                    // 10
      }, function() {                                                                                                  // 11
        return [ "\n    ", HTML.DIV({                                                                                  // 12
          "class": "form-group"                                                                                        // 13
        }, "\n      ", HTML.BUTTON(HTML.Attrs({                                                                        // 14
          type: "submit"                                                                                               // 15
        }, function() {                                                                                                // 16
          return Spacebars.attrMustache(view.lookup("submitButtonAtts"));                                              // 17
        }), "\n      ", Spacebars.With(function() {                                                                    // 18
          return Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "buttonContent"));                            // 19
        }, function() {                                                                                                // 20
          return [ "\n      ", Blaze.View(function() {                                                                 // 21
            return Spacebars.mustache(view.lookup("."));                                                               // 22
          }), "\n      " ];                                                                                            // 23
        }, function() {                                                                                                // 24
          return "\n      Submit\n      ";                                                                             // 25
        }), "\n      "), "\n    "), "\n    " ];                                                                        // 26
      }), "\n  " ];                                                                                                    // 27
    });                                                                                                                // 28
  });                                                                                                                  // 29
}));                                                                                                                   // 30
                                                                                                                       // 31
Template.__checkName("afFormGroup_bootstrap3");                                                                        // 32
Template["afFormGroup_bootstrap3"] = new Template("Template.afFormGroup_bootstrap3", (function() {                     // 33
  var view = this;                                                                                                     // 34
  return HTML.DIV({                                                                                                    // 35
    "class": function() {                                                                                              // 36
      return [ "form-group ", Blaze.If(function() {                                                                    // 37
        return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                  // 38
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 39
        }));                                                                                                           // 40
      }, function() {                                                                                                  // 41
        return "has-error";                                                                                            // 42
      }) ];                                                                                                            // 43
    }                                                                                                                  // 44
  }, "\n    ", Blaze.Unless(function() {                                                                               // 45
    return Spacebars.call(view.lookup("skipLabel"));                                                                   // 46
  }, function() {                                                                                                      // 47
    return [ "\n    ", HTML.LABEL(HTML.Attrs(function() {                                                              // 48
      return Spacebars.attrMustache(view.lookup("bsFieldLabelAtts"));                                                  // 49
    }), Blaze.If(function() {                                                                                          // 50
      return Spacebars.call(Spacebars.dot(view.lookup("."), "labelText"));                                             // 51
    }, function() {                                                                                                    // 52
      return Blaze.View(function() {                                                                                   // 53
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "labelText"));                                       // 54
      });                                                                                                              // 55
    }, function() {                                                                                                    // 56
      return Blaze.View(function() {                                                                                   // 57
        return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                      // 58
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 59
        }));                                                                                                           // 60
      });                                                                                                              // 61
    })), "\n    " ];                                                                                                   // 62
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 63
    return Spacebars.call(Spacebars.dot(view.lookup("."), "afFieldInputAtts"));                                        // 64
  }, function() {                                                                                                      // 65
    return Spacebars.include(view.lookupTemplate("afFieldInput"));                                                     // 66
  }), "\n    ", HTML.SPAN({                                                                                            // 67
    "class": "help-block"                                                                                              // 68
  }, Blaze.View(function() {                                                                                           // 69
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                          // 70
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 71
    })));                                                                                                              // 72
  })), "\n  ");                                                                                                        // 73
}));                                                                                                                   // 74
                                                                                                                       // 75
Template.__checkName("afObjectField_bootstrap3");                                                                      // 76
Template["afObjectField_bootstrap3"] = new Template("Template.afObjectField_bootstrap3", (function() {                 // 77
  var view = this;                                                                                                     // 78
  return HTML.DIV({                                                                                                    // 79
    "class": "panel panel-default"                                                                                     // 80
  }, "\n    ", Spacebars.With(function() {                                                                             // 81
    return Spacebars.dataMustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                      // 82
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 83
    }));                                                                                                               // 84
  }, function() {                                                                                                      // 85
    return [ "\n    ", HTML.DIV({                                                                                      // 86
      "class": "panel-heading"                                                                                         // 87
    }, "\n      ", HTML.H3({                                                                                           // 88
      "class": "panel-title"                                                                                           // 89
    }, Blaze.View(function() {                                                                                         // 90
      return Spacebars.mustache(view.lookup("."));                                                                     // 91
    })), "\n    "), "\n    " ];                                                                                        // 92
  }), "\n    ", HTML.DIV({                                                                                             // 93
    "class": "panel-body"                                                                                              // 94
  }, "\n      ", Blaze.If(function() {                                                                                 // 95
    return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                      // 96
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 97
    }));                                                                                                               // 98
  }, function() {                                                                                                      // 99
    return [ "\n      ", HTML.SPAN({                                                                                   // 100
      "class": "help-block"                                                                                            // 101
    }, Blaze.View(function() {                                                                                         // 102
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                        // 103
        name: Spacebars.dot(view.lookup("."), "atts", "name")                                                          // 104
      })));                                                                                                            // 105
    })), "\n      " ];                                                                                                 // 106
  }), "\n      ", Blaze._TemplateWith(function() {                                                                     // 107
    return {                                                                                                           // 108
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name"))                                            // 109
    };                                                                                                                 // 110
  }, function() {                                                                                                      // 111
    return Spacebars.include(view.lookupTemplate("afQuickFields"));                                                    // 112
  }), "\n    "), "\n  ");                                                                                              // 113
}));                                                                                                                   // 114
                                                                                                                       // 115
Template.__checkName("afArrayField_bootstrap3");                                                                       // 116
Template["afArrayField_bootstrap3"] = new Template("Template.afArrayField_bootstrap3", (function() {                   // 117
  var view = this;                                                                                                     // 118
  return HTML.DIV({                                                                                                    // 119
    "class": "panel panel-default"                                                                                     // 120
  }, "\n    ", HTML.DIV({                                                                                              // 121
    "class": "panel-heading"                                                                                           // 122
  }, Blaze.View(function() {                                                                                           // 123
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                          // 124
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 125
    }));                                                                                                               // 126
  })), "\n    ", Blaze.If(function() {                                                                                 // 127
    return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                      // 128
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 129
    }));                                                                                                               // 130
  }, function() {                                                                                                      // 131
    return [ "\n    ", HTML.DIV({                                                                                      // 132
      "class": "panel-body has-error"                                                                                  // 133
    }, "\n      ", HTML.SPAN({                                                                                         // 134
      "class": "help-block"                                                                                            // 135
    }, Blaze.View(function() {                                                                                         // 136
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                        // 137
        name: Spacebars.dot(view.lookup("."), "atts", "name")                                                          // 138
      })));                                                                                                            // 139
    })), "\n    "), "\n    " ];                                                                                        // 140
  }), "\n    ", HTML.UL({                                                                                              // 141
    "class": "list-group"                                                                                              // 142
  }, "\n      ", Blaze._TemplateWith(function() {                                                                      // 143
    return {                                                                                                           // 144
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name")),                                           // 145
      minCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "minCount")),                                   // 146
      maxCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "maxCount"))                                    // 147
    };                                                                                                                 // 148
  }, function() {                                                                                                      // 149
    return Spacebars.include(view.lookupTemplate("afEachArrayItem"), function() {                                      // 150
      return [ "\n      ", HTML.LI({                                                                                   // 151
        "class": "list-group-item autoform-array-item"                                                                 // 152
      }, "\n        ", HTML.DIV({                                                                                      // 153
        "class": "media"                                                                                               // 154
      }, "\n          ", Blaze.If(function() {                                                                         // 155
        return Spacebars.dataMustache(view.lookup("afArrayFieldHasMoreThanMinimum"), Spacebars.kw({                    // 156
          name: Spacebars.dot(view.lookup(".."), "atts", "name"),                                                      // 157
          minCount: Spacebars.dot(view.lookup(".."), "atts", "minCount"),                                              // 158
          maxCount: Spacebars.dot(view.lookup(".."), "atts", "maxCount")                                               // 159
        }));                                                                                                           // 160
      }, function() {                                                                                                  // 161
        return [ "\n          ", HTML.BUTTON({                                                                         // 162
          type: "button",                                                                                              // 163
          "class": "btn btn-primary autoform-remove-item pull-left"                                                    // 164
        }, HTML.SPAN({                                                                                                 // 165
          "class": "glyphicon glyphicon-minus"                                                                         // 166
        })), "\n          " ];                                                                                         // 167
      }), "\n          ", HTML.DIV({                                                                                   // 168
        "class": "media-body"                                                                                          // 169
      }, "\n            ", Blaze._TemplateWith(function() {                                                            // 170
        return {                                                                                                       // 171
          name: Spacebars.call(Spacebars.dot(view.lookup("."), "name")),                                               // 172
          label: Spacebars.call(false),                                                                                // 173
          options: Spacebars.call("auto")                                                                              // 174
        };                                                                                                             // 175
      }, function() {                                                                                                  // 176
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 177
      }), "\n          "), "\n        "), "\n      "), "\n      " ];                                                   // 178
    });                                                                                                                // 179
  }), "\n      ", Blaze.If(function() {                                                                                // 180
    return Spacebars.dataMustache(view.lookup("afArrayFieldHasLessThanMaximum"), Spacebars.kw({                        // 181
      name: Spacebars.dot(view.lookup("."), "atts", "name"),                                                           // 182
      minCount: Spacebars.dot(view.lookup("."), "atts", "minCount"),                                                   // 183
      maxCount: Spacebars.dot(view.lookup("."), "atts", "maxCount")                                                    // 184
    }));                                                                                                               // 185
  }, function() {                                                                                                      // 186
    return [ "\n      ", HTML.LI({                                                                                     // 187
      "class": "list-group-item"                                                                                       // 188
    }, "\n        ", HTML.BUTTON({                                                                                     // 189
      type: "button",                                                                                                  // 190
      "class": "btn btn-primary autoform-add-item",                                                                    // 191
      "data-autoform-field": function() {                                                                              // 192
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "name"));                                    // 193
      },                                                                                                               // 194
      "data-autoform-mincount": function() {                                                                           // 195
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "minCount"));                                // 196
      },                                                                                                               // 197
      "data-autoform-maxcount": function() {                                                                           // 198
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "maxCount"));                                // 199
      }                                                                                                                // 200
    }, HTML.SPAN({                                                                                                     // 201
      "class": "glyphicon glyphicon-plus"                                                                              // 202
    })), "\n      "), "\n      " ];                                                                                    // 203
  }), "\n    "), "\n  ");                                                                                              // 204
}));                                                                                                                   // 205
                                                                                                                       // 206
Template.__checkName("afCheckbox_bootstrap3");                                                                         // 207
Template["afCheckbox_bootstrap3"] = new Template("Template.afCheckbox_bootstrap3", (function() {                       // 208
  var view = this;                                                                                                     // 209
  return HTML.DIV({                                                                                                    // 210
    "class": "checkbox"                                                                                                // 211
  }, "\n    ", HTML.LABEL("\n      ", HTML.INPUT(HTML.Attrs({                                                          // 212
    type: "checkbox",                                                                                                  // 213
    value: function() {                                                                                                // 214
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 215
    }                                                                                                                  // 216
  }, function() {                                                                                                      // 217
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 218
  })), "\n      ", Blaze.View(function() {                                                                             // 219
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                          // 220
      name: Spacebars.dot(view.lookup("."), "name")                                                                    // 221
    }));                                                                                                               // 222
  }), "\n    "), "\n  ");                                                                                              // 223
}));                                                                                                                   // 224
                                                                                                                       // 225
Template.__checkName("afCheckboxGroup_bootstrap3");                                                                    // 226
Template["afCheckboxGroup_bootstrap3"] = new Template("Template.afCheckboxGroup_bootstrap3", (function() {             // 227
  var view = this;                                                                                                     // 228
  return HTML.DIV(HTML.Attrs({                                                                                         // 229
    "class": "af-checkbox-group"                                                                                       // 230
  }, function() {                                                                                                      // 231
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 232
  }), "\n    ", Blaze.Each(function() {                                                                                // 233
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 234
  }, function() {                                                                                                      // 235
    return [ "\n      ", HTML.DIV({                                                                                    // 236
      "class": "checkbox"                                                                                              // 237
    }, "\n        ", HTML.LABEL("\n          ", HTML.INPUT(HTML.Attrs({                                                // 238
      type: "checkbox",                                                                                                // 239
      value: function() {                                                                                              // 240
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 241
      }                                                                                                                // 242
    }, function() {                                                                                                    // 243
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 244
    })), "\n          ", Blaze.View(function() {                                                                       // 245
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 246
    }), "\n        "), "\n      "), "\n    " ];                                                                        // 247
  }), "\n  ");                                                                                                         // 248
}));                                                                                                                   // 249
                                                                                                                       // 250
Template.__checkName("afCheckboxGroupInline_bootstrap3");                                                              // 251
Template["afCheckboxGroupInline_bootstrap3"] = new Template("Template.afCheckboxGroupInline_bootstrap3", (function() { // 252
  var view = this;                                                                                                     // 253
  return HTML.DIV(HTML.Attrs({                                                                                         // 254
    "class": "af-checkbox-group"                                                                                       // 255
  }, function() {                                                                                                      // 256
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 257
  }), "\n    ", Blaze.Each(function() {                                                                                // 258
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 259
  }, function() {                                                                                                      // 260
    return [ "\n      ", HTML.LABEL({                                                                                  // 261
      "class": "checkbox-inline"                                                                                       // 262
    }, "\n        ", HTML.INPUT(HTML.Attrs({                                                                           // 263
      type: "checkbox",                                                                                                // 264
      value: function() {                                                                                              // 265
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 266
      }                                                                                                                // 267
    }, function() {                                                                                                    // 268
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 269
    })), "\n        ", Blaze.View(function() {                                                                         // 270
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 271
    }), "\n      "), "\n    " ];                                                                                       // 272
  }), "\n  ");                                                                                                         // 273
}));                                                                                                                   // 274
                                                                                                                       // 275
Template.__checkName("afRadio_bootstrap3");                                                                            // 276
Template["afRadio_bootstrap3"] = new Template("Template.afRadio_bootstrap3", (function() {                             // 277
  var view = this;                                                                                                     // 278
  return HTML.DIV({                                                                                                    // 279
    "class": "radio"                                                                                                   // 280
  }, "\n    ", HTML.LABEL("\n      ", HTML.INPUT(HTML.Attrs({                                                          // 281
    type: "radio",                                                                                                     // 282
    value: function() {                                                                                                // 283
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 284
    }                                                                                                                  // 285
  }, function() {                                                                                                      // 286
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 287
  })), "\n      ", Blaze.View(function() {                                                                             // 288
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                          // 289
      name: Spacebars.dot(view.lookup("."), "name")                                                                    // 290
    }));                                                                                                               // 291
  }), "\n    "), "\n  ");                                                                                              // 292
}));                                                                                                                   // 293
                                                                                                                       // 294
Template.__checkName("afRadioGroup_bootstrap3");                                                                       // 295
Template["afRadioGroup_bootstrap3"] = new Template("Template.afRadioGroup_bootstrap3", (function() {                   // 296
  var view = this;                                                                                                     // 297
  return HTML.DIV(HTML.Attrs({                                                                                         // 298
    "class": "af-radio-group"                                                                                          // 299
  }, function() {                                                                                                      // 300
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 301
  }), "\n    ", Blaze.Each(function() {                                                                                // 302
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 303
  }, function() {                                                                                                      // 304
    return [ "\n      ", HTML.DIV({                                                                                    // 305
      "class": "radio"                                                                                                 // 306
    }, "\n        ", HTML.LABEL("\n          ", HTML.INPUT(HTML.Attrs({                                                // 307
      type: "radio",                                                                                                   // 308
      value: function() {                                                                                              // 309
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 310
      }                                                                                                                // 311
    }, function() {                                                                                                    // 312
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 313
    })), "\n          ", Blaze.View(function() {                                                                       // 314
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 315
    }), "\n        "), "\n      "), "\n    " ];                                                                        // 316
  }), "\n  ");                                                                                                         // 317
}));                                                                                                                   // 318
                                                                                                                       // 319
Template.__checkName("afRadioGroupInline_bootstrap3");                                                                 // 320
Template["afRadioGroupInline_bootstrap3"] = new Template("Template.afRadioGroupInline_bootstrap3", (function() {       // 321
  var view = this;                                                                                                     // 322
  return HTML.DIV(HTML.Attrs({                                                                                         // 323
    "class": "af-radio-group"                                                                                          // 324
  }, function() {                                                                                                      // 325
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 326
  }), "\n    ", Blaze.Each(function() {                                                                                // 327
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 328
  }, function() {                                                                                                      // 329
    return [ "\n      ", HTML.LABEL({                                                                                  // 330
      "class": "radio-inline"                                                                                          // 331
    }, "\n        ", HTML.INPUT(HTML.Attrs({                                                                           // 332
      type: "radio",                                                                                                   // 333
      value: function() {                                                                                              // 334
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 335
      }                                                                                                                // 336
    }, function() {                                                                                                    // 337
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 338
    })), "\n        ", Blaze.View(function() {                                                                         // 339
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 340
    }), "\n      "), "\n    " ];                                                                                       // 341
  }), "\n  ");                                                                                                         // 342
}));                                                                                                                   // 343
                                                                                                                       // 344
Template.__checkName("afBooleanRadioGroup_bootstrap3");                                                                // 345
Template["afBooleanRadioGroup_bootstrap3"] = new Template("Template.afBooleanRadioGroup_bootstrap3", (function() {     // 346
  var view = this;                                                                                                     // 347
  return HTML.DIV(HTML.Attrs(function() {                                                                              // 348
    return Spacebars.attrMustache(view.lookup("dsk"));                                                                 // 349
  }), "\n    ", HTML.DIV({                                                                                             // 350
    "class": "radio"                                                                                                   // 351
  }, "\n      ", HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                                    // 352
    type: "radio",                                                                                                     // 353
    value: "false",                                                                                                    // 354
    name: function() {                                                                                                 // 355
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));                                              // 356
    }                                                                                                                  // 357
  }, function() {                                                                                                      // 358
    return Spacebars.attrMustache(view.lookup("falseAtts"));                                                           // 359
  })), " ", Spacebars.With(function() {                                                                                // 360
    return Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "falseLabel"));                                      // 361
  }, function() {                                                                                                      // 362
    return Blaze.View(function() {                                                                                     // 363
      return Spacebars.mustache(view.lookup("."));                                                                     // 364
    });                                                                                                                // 365
  }, function() {                                                                                                      // 366
    return "False";                                                                                                    // 367
  })), "\n    "), "\n    ", HTML.DIV({                                                                                 // 368
    "class": "radio"                                                                                                   // 369
  }, "\n      ", HTML.LABEL(HTML.INPUT(HTML.Attrs({                                                                    // 370
    type: "radio",                                                                                                     // 371
    value: "true",                                                                                                     // 372
    name: function() {                                                                                                 // 373
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));                                              // 374
    }                                                                                                                  // 375
  }, function() {                                                                                                      // 376
    return Spacebars.attrMustache(view.lookup("trueAtts"));                                                            // 377
  })), " ", Spacebars.With(function() {                                                                                // 378
    return Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "trueLabel"));                                       // 379
  }, function() {                                                                                                      // 380
    return Blaze.View(function() {                                                                                     // 381
      return Spacebars.mustache(view.lookup("."));                                                                     // 382
    });                                                                                                                // 383
  }, function() {                                                                                                      // 384
    return "True";                                                                                                     // 385
  })), "\n    "), "\n  ");                                                                                             // 386
}));                                                                                                                   // 387
                                                                                                                       // 388
Template.__checkName("afSelect_bootstrap3");                                                                           // 389
Template["afSelect_bootstrap3"] = new Template("Template.afSelect_bootstrap3", (function() {                           // 390
  var view = this;                                                                                                     // 391
  return HTML.SELECT(HTML.Attrs(function() {                                                                           // 392
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 393
  }), "\n    ", Blaze.Each(function() {                                                                                // 394
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 395
  }, function() {                                                                                                      // 396
    return [ "\n      ", Blaze.If(function() {                                                                         // 397
      return Spacebars.call(Spacebars.dot(view.lookup("."), "optgroup"));                                              // 398
    }, function() {                                                                                                    // 399
      return [ "\n        ", HTML.OPTGROUP({                                                                           // 400
        label: function() {                                                                                            // 401
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "optgroup"));                                      // 402
        }                                                                                                              // 403
      }, "\n        ", Blaze.Each(function() {                                                                         // 404
        return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                               // 405
      }, function() {                                                                                                  // 406
        return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                     // 407
          return Spacebars.attrMustache(view.lookup("optionAtts"));                                                    // 408
        }), Blaze.View(function() {                                                                                    // 409
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                         // 410
        })), "\n        " ];                                                                                           // 411
      }), "\n        "), "\n      " ];                                                                                 // 412
    }, function() {                                                                                                    // 413
      return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                       // 414
        return Spacebars.attrMustache(view.lookup("optionAtts"));                                                      // 415
      }), Blaze.View(function() {                                                                                      // 416
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                           // 417
      })), "\n      " ];                                                                                               // 418
    }), "\n    " ];                                                                                                    // 419
  }), "\n  ");                                                                                                         // 420
}));                                                                                                                   // 421
                                                                                                                       // 422
Template.__checkName("afBooleanSelect_bootstrap3");                                                                    // 423
Template["afBooleanSelect_bootstrap3"] = new Template("Template.afBooleanSelect_bootstrap3", (function() {             // 424
  var view = this;                                                                                                     // 425
  return HTML.SELECT(HTML.Attrs(function() {                                                                           // 426
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 427
  }), "\n    ", Blaze.Each(function() {                                                                                // 428
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 429
  }, function() {                                                                                                      // 430
    return [ "\n      ", HTML.OPTION(HTML.Attrs(function() {                                                           // 431
      return Spacebars.attrMustache(view.lookup("optionAtts"));                                                        // 432
    }), Blaze.View(function() {                                                                                        // 433
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 434
    })), "\n    " ];                                                                                                   // 435
  }), "\n  ");                                                                                                         // 436
}));                                                                                                                   // 437
                                                                                                                       // 438
Template.__checkName("afSelectMultiple_bootstrap3");                                                                   // 439
Template["afSelectMultiple_bootstrap3"] = new Template("Template.afSelectMultiple_bootstrap3", (function() {           // 440
  var view = this;                                                                                                     // 441
  return HTML.SELECT(HTML.Attrs({                                                                                      // 442
    multiple: ""                                                                                                       // 443
  }, function() {                                                                                                      // 444
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 445
  }), "\n    ", Blaze.Each(function() {                                                                                // 446
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                                   // 447
  }, function() {                                                                                                      // 448
    return [ "\n      ", Blaze.If(function() {                                                                         // 449
      return Spacebars.call(Spacebars.dot(view.lookup("."), "optgroup"));                                              // 450
    }, function() {                                                                                                    // 451
      return [ "\n        ", HTML.OPTGROUP({                                                                           // 452
        label: function() {                                                                                            // 453
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "optgroup"));                                      // 454
        }                                                                                                              // 455
      }, "\n        ", Blaze.Each(function() {                                                                         // 456
        return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                               // 457
      }, function() {                                                                                                  // 458
        return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                     // 459
          return Spacebars.attrMustache(view.lookup("optionAtts"));                                                    // 460
        }), Blaze.View(function() {                                                                                    // 461
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                         // 462
        })), "\n        " ];                                                                                           // 463
      }), "\n        "), "\n      " ];                                                                                 // 464
    }, function() {                                                                                                    // 465
      return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                       // 466
        return Spacebars.attrMustache(view.lookup("optionAtts"));                                                      // 467
      }), Blaze.View(function() {                                                                                      // 468
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                           // 469
      })), "\n      " ];                                                                                               // 470
    }), "\n    " ];                                                                                                    // 471
  }), "\n  ");                                                                                                         // 472
}));                                                                                                                   // 473
                                                                                                                       // 474
Template.__checkName("afTextarea_bootstrap3");                                                                         // 475
Template["afTextarea_bootstrap3"] = new Template("Template.afTextarea_bootstrap3", (function() {                       // 476
  var view = this;                                                                                                     // 477
  return HTML.TEXTAREA(HTML.Attrs(function() {                                                                         // 478
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 479
  }, {                                                                                                                 // 480
    value: function() {                                                                                                // 481
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 482
    }                                                                                                                  // 483
  }));                                                                                                                 // 484
}));                                                                                                                   // 485
                                                                                                                       // 486
Template.__checkName("afInputText_bootstrap3");                                                                        // 487
Template["afInputText_bootstrap3"] = new Template("Template.afInputText_bootstrap3", (function() {                     // 488
  var view = this;                                                                                                     // 489
  return HTML.INPUT(HTML.Attrs({                                                                                       // 490
    type: "text",                                                                                                      // 491
    value: function() {                                                                                                // 492
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 493
    }                                                                                                                  // 494
  }, function() {                                                                                                      // 495
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 496
  }));                                                                                                                 // 497
}));                                                                                                                   // 498
                                                                                                                       // 499
Template.__checkName("afInputPassword_bootstrap3");                                                                    // 500
Template["afInputPassword_bootstrap3"] = new Template("Template.afInputPassword_bootstrap3", (function() {             // 501
  var view = this;                                                                                                     // 502
  return HTML.INPUT(HTML.Attrs({                                                                                       // 503
    type: "password",                                                                                                  // 504
    value: function() {                                                                                                // 505
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 506
    }                                                                                                                  // 507
  }, function() {                                                                                                      // 508
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 509
  }));                                                                                                                 // 510
}));                                                                                                                   // 511
                                                                                                                       // 512
Template.__checkName("afInputButton_bootstrap3");                                                                      // 513
Template["afInputButton_bootstrap3"] = new Template("Template.afInputButton_bootstrap3", (function() {                 // 514
  var view = this;                                                                                                     // 515
  return HTML.INPUT(HTML.Attrs({                                                                                       // 516
    type: "button",                                                                                                    // 517
    value: function() {                                                                                                // 518
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 519
    }                                                                                                                  // 520
  }, function() {                                                                                                      // 521
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 522
  }));                                                                                                                 // 523
}));                                                                                                                   // 524
                                                                                                                       // 525
Template.__checkName("afInputSubmit_bootstrap3");                                                                      // 526
Template["afInputSubmit_bootstrap3"] = new Template("Template.afInputSubmit_bootstrap3", (function() {                 // 527
  var view = this;                                                                                                     // 528
  return HTML.INPUT(HTML.Attrs({                                                                                       // 529
    type: "submit",                                                                                                    // 530
    value: function() {                                                                                                // 531
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 532
    }                                                                                                                  // 533
  }, function() {                                                                                                      // 534
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 535
  }));                                                                                                                 // 536
}));                                                                                                                   // 537
                                                                                                                       // 538
Template.__checkName("afInputReset_bootstrap3");                                                                       // 539
Template["afInputReset_bootstrap3"] = new Template("Template.afInputReset_bootstrap3", (function() {                   // 540
  var view = this;                                                                                                     // 541
  return HTML.INPUT(HTML.Attrs({                                                                                       // 542
    type: "reset",                                                                                                     // 543
    value: function() {                                                                                                // 544
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 545
    }                                                                                                                  // 546
  }, function() {                                                                                                      // 547
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 548
  }));                                                                                                                 // 549
}));                                                                                                                   // 550
                                                                                                                       // 551
Template.__checkName("afInputDateTime_bootstrap3");                                                                    // 552
Template["afInputDateTime_bootstrap3"] = new Template("Template.afInputDateTime_bootstrap3", (function() {             // 553
  var view = this;                                                                                                     // 554
  return HTML.INPUT(HTML.Attrs({                                                                                       // 555
    type: "datetime",                                                                                                  // 556
    value: function() {                                                                                                // 557
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 558
    }                                                                                                                  // 559
  }, function() {                                                                                                      // 560
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 561
  }));                                                                                                                 // 562
}));                                                                                                                   // 563
                                                                                                                       // 564
Template.__checkName("afInputDateTimeLocal_bootstrap3");                                                               // 565
Template["afInputDateTimeLocal_bootstrap3"] = new Template("Template.afInputDateTimeLocal_bootstrap3", (function() {   // 566
  var view = this;                                                                                                     // 567
  return HTML.INPUT(HTML.Attrs({                                                                                       // 568
    type: "datetime-local",                                                                                            // 569
    value: function() {                                                                                                // 570
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 571
    }                                                                                                                  // 572
  }, function() {                                                                                                      // 573
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 574
  }));                                                                                                                 // 575
}));                                                                                                                   // 576
                                                                                                                       // 577
Template.__checkName("afInputDate_bootstrap3");                                                                        // 578
Template["afInputDate_bootstrap3"] = new Template("Template.afInputDate_bootstrap3", (function() {                     // 579
  var view = this;                                                                                                     // 580
  return HTML.INPUT(HTML.Attrs({                                                                                       // 581
    type: "date",                                                                                                      // 582
    value: function() {                                                                                                // 583
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 584
    }                                                                                                                  // 585
  }, function() {                                                                                                      // 586
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 587
  }));                                                                                                                 // 588
}));                                                                                                                   // 589
                                                                                                                       // 590
Template.__checkName("afInputMonth_bootstrap3");                                                                       // 591
Template["afInputMonth_bootstrap3"] = new Template("Template.afInputMonth_bootstrap3", (function() {                   // 592
  var view = this;                                                                                                     // 593
  return HTML.INPUT(HTML.Attrs({                                                                                       // 594
    type: "month",                                                                                                     // 595
    value: function() {                                                                                                // 596
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 597
    }                                                                                                                  // 598
  }, function() {                                                                                                      // 599
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 600
  }));                                                                                                                 // 601
}));                                                                                                                   // 602
                                                                                                                       // 603
Template.__checkName("afInputTime_bootstrap3");                                                                        // 604
Template["afInputTime_bootstrap3"] = new Template("Template.afInputTime_bootstrap3", (function() {                     // 605
  var view = this;                                                                                                     // 606
  return HTML.INPUT(HTML.Attrs({                                                                                       // 607
    type: "time",                                                                                                      // 608
    value: function() {                                                                                                // 609
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 610
    }                                                                                                                  // 611
  }, function() {                                                                                                      // 612
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 613
  }));                                                                                                                 // 614
}));                                                                                                                   // 615
                                                                                                                       // 616
Template.__checkName("afInputWeek_bootstrap3");                                                                        // 617
Template["afInputWeek_bootstrap3"] = new Template("Template.afInputWeek_bootstrap3", (function() {                     // 618
  var view = this;                                                                                                     // 619
  return HTML.INPUT(HTML.Attrs({                                                                                       // 620
    type: "week",                                                                                                      // 621
    value: function() {                                                                                                // 622
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 623
    }                                                                                                                  // 624
  }, function() {                                                                                                      // 625
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 626
  }));                                                                                                                 // 627
}));                                                                                                                   // 628
                                                                                                                       // 629
Template.__checkName("afInputNumber_bootstrap3");                                                                      // 630
Template["afInputNumber_bootstrap3"] = new Template("Template.afInputNumber_bootstrap3", (function() {                 // 631
  var view = this;                                                                                                     // 632
  return HTML.INPUT(HTML.Attrs({                                                                                       // 633
    type: "number",                                                                                                    // 634
    value: function() {                                                                                                // 635
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 636
    }                                                                                                                  // 637
  }, function() {                                                                                                      // 638
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 639
  }));                                                                                                                 // 640
}));                                                                                                                   // 641
                                                                                                                       // 642
Template.__checkName("afInputRange_bootstrap3");                                                                       // 643
Template["afInputRange_bootstrap3"] = new Template("Template.afInputRange_bootstrap3", (function() {                   // 644
  var view = this;                                                                                                     // 645
  return HTML.INPUT(HTML.Attrs({                                                                                       // 646
    type: "range",                                                                                                     // 647
    value: function() {                                                                                                // 648
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 649
    }                                                                                                                  // 650
  }, function() {                                                                                                      // 651
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                            // 652
  }));                                                                                                                 // 653
}));                                                                                                                   // 654
                                                                                                                       // 655
Template.__checkName("afInputEmail_bootstrap3");                                                                       // 656
Template["afInputEmail_bootstrap3"] = new Template("Template.afInputEmail_bootstrap3", (function() {                   // 657
  var view = this;                                                                                                     // 658
  return HTML.INPUT(HTML.Attrs({                                                                                       // 659
    type: "email",                                                                                                     // 660
    value: function() {                                                                                                // 661
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 662
    }                                                                                                                  // 663
  }, function() {                                                                                                      // 664
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 665
  }));                                                                                                                 // 666
}));                                                                                                                   // 667
                                                                                                                       // 668
Template.__checkName("afInputUrl_bootstrap3");                                                                         // 669
Template["afInputUrl_bootstrap3"] = new Template("Template.afInputUrl_bootstrap3", (function() {                       // 670
  var view = this;                                                                                                     // 671
  return HTML.INPUT(HTML.Attrs({                                                                                       // 672
    type: "url",                                                                                                       // 673
    value: function() {                                                                                                // 674
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 675
    }                                                                                                                  // 676
  }, function() {                                                                                                      // 677
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 678
  }));                                                                                                                 // 679
}));                                                                                                                   // 680
                                                                                                                       // 681
Template.__checkName("afInputSearch_bootstrap3");                                                                      // 682
Template["afInputSearch_bootstrap3"] = new Template("Template.afInputSearch_bootstrap3", (function() {                 // 683
  var view = this;                                                                                                     // 684
  return HTML.INPUT(HTML.Attrs({                                                                                       // 685
    type: "search",                                                                                                    // 686
    value: function() {                                                                                                // 687
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 688
    }                                                                                                                  // 689
  }, function() {                                                                                                      // 690
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 691
  }));                                                                                                                 // 692
}));                                                                                                                   // 693
                                                                                                                       // 694
Template.__checkName("afInputTel_bootstrap3");                                                                         // 695
Template["afInputTel_bootstrap3"] = new Template("Template.afInputTel_bootstrap3", (function() {                       // 696
  var view = this;                                                                                                     // 697
  return HTML.INPUT(HTML.Attrs({                                                                                       // 698
    type: "tel",                                                                                                       // 699
    value: function() {                                                                                                // 700
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 701
    }                                                                                                                  // 702
  }, function() {                                                                                                      // 703
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 704
  }));                                                                                                                 // 705
}));                                                                                                                   // 706
                                                                                                                       // 707
Template.__checkName("afInputColor_bootstrap3");                                                                       // 708
Template["afInputColor_bootstrap3"] = new Template("Template.afInputColor_bootstrap3", (function() {                   // 709
  var view = this;                                                                                                     // 710
  return HTML.INPUT(HTML.Attrs({                                                                                       // 711
    type: "color",                                                                                                     // 712
    value: function() {                                                                                                // 713
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                             // 714
    }                                                                                                                  // 715
  }, function() {                                                                                                      // 716
    return Spacebars.attrMustache(view.lookup("atts"));                                                                // 717
  }));                                                                                                                 // 718
}));                                                                                                                   // 719
                                                                                                                       // 720
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/bootstrap3/bootstrap3.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * Template helpers for "bootstrap3" template                                                                          // 2
 */                                                                                                                    // 3
                                                                                                                       // 4
Template['quickForm_bootstrap3'].helpers({                                                                             // 5
  submitButtonAtts: function bsQuickFormSubmitButtonAtts() {                                                           // 6
    var qfAtts = this.atts;                                                                                            // 7
    var atts = {};                                                                                                     // 8
    if (typeof qfAtts.buttonClasses === "string") {                                                                    // 9
      atts['class'] = qfAtts.buttonClasses;                                                                            // 10
    } else {                                                                                                           // 11
      atts['class'] = 'btn btn-primary';                                                                               // 12
    }                                                                                                                  // 13
    return atts;                                                                                                       // 14
  }                                                                                                                    // 15
});                                                                                                                    // 16
                                                                                                                       // 17
Template['afFormGroup_bootstrap3'].helpers({                                                                           // 18
  skipLabel: function bsFormGroupSkipLabel() {                                                                         // 19
    var self = this;                                                                                                   // 20
                                                                                                                       // 21
    var type = AutoForm.getInputType(self.afFieldInputAtts);                                                           // 22
    return (self.skipLabel || type === "boolean-checkbox");                                                            // 23
  },                                                                                                                   // 24
  bsFieldLabelAtts: function bsFieldLabelAtts() {                                                                      // 25
    var atts = _.clone(this.afFieldLabelAtts);                                                                         // 26
    // Add bootstrap class                                                                                             // 27
    atts = AutoForm.Utility.addClass(atts, "control-label");                                                           // 28
    return atts;                                                                                                       // 29
  }                                                                                                                    // 30
});                                                                                                                    // 31
                                                                                                                       // 32
_.each([                                                                                                               // 33
    "afSelect_bootstrap3",                                                                                             // 34
    "afBooleanSelect_bootstrap3",                                                                                      // 35
    "afSelectMultiple_bootstrap3",                                                                                     // 36
    "afTextarea_bootstrap3",                                                                                           // 37
    "afInputText_bootstrap3",                                                                                          // 38
    "afInputPassword_bootstrap3",                                                                                      // 39
    "afInputDateTime_bootstrap3",                                                                                      // 40
    "afInputDateTimeLocal_bootstrap3",                                                                                 // 41
    "afInputDate_bootstrap3",                                                                                          // 42
    "afInputMonth_bootstrap3",                                                                                         // 43
    "afInputTime_bootstrap3",                                                                                          // 44
    "afInputWeek_bootstrap3",                                                                                          // 45
    "afInputNumber_bootstrap3",                                                                                        // 46
    "afInputEmail_bootstrap3",                                                                                         // 47
    "afInputUrl_bootstrap3",                                                                                           // 48
    "afInputSearch_bootstrap3",                                                                                        // 49
    "afInputTel_bootstrap3",                                                                                           // 50
    "afInputColor_bootstrap3"                                                                                          // 51
  ], function (tmplName) {                                                                                             // 52
  Template[tmplName].helpers({                                                                                         // 53
    atts: function addFormControlAtts() {                                                                              // 54
      var atts = _.clone(this.atts);                                                                                   // 55
      // Add bootstrap class                                                                                           // 56
      atts = AutoForm.Utility.addClass(atts, "form-control");                                                          // 57
      return atts;                                                                                                     // 58
    }                                                                                                                  // 59
  });                                                                                                                  // 60
});                                                                                                                    // 61
                                                                                                                       // 62
_.each([                                                                                                               // 63
    "afInputButton_bootstrap3",                                                                                        // 64
    "afInputSubmit_bootstrap3",                                                                                        // 65
    "afInputReset_bootstrap3",                                                                                         // 66
  ], function (tmplName) {                                                                                             // 67
  Template[tmplName].helpers({                                                                                         // 68
    atts: function addFormControlAtts() {                                                                              // 69
      var atts = _.clone(this.atts);                                                                                   // 70
      // Add bootstrap class                                                                                           // 71
      atts = AutoForm.Utility.addClass(atts, "btn");                                                                   // 72
      return atts;                                                                                                     // 73
    }                                                                                                                  // 74
  });                                                                                                                  // 75
});                                                                                                                    // 76
                                                                                                                       // 77
Template["afRadio_bootstrap3"].helpers({                                                                               // 78
  atts: function selectedAttsAdjust() {                                                                                // 79
    var atts = _.clone(this.atts);                                                                                     // 80
    if (this.selected) {                                                                                               // 81
      atts.checked = "";                                                                                               // 82
    }                                                                                                                  // 83
    return atts;                                                                                                       // 84
  }                                                                                                                    // 85
});                                                                                                                    // 86
                                                                                                                       // 87
_.each([                                                                                                               // 88
    "afCheckboxGroup_bootstrap3",                                                                                      // 89
    "afRadioGroup_bootstrap3",                                                                                         // 90
    "afCheckboxGroupInline_bootstrap3",                                                                                // 91
    "afRadioGroupInline_bootstrap3"                                                                                    // 92
  ], function (tmplName) {                                                                                             // 93
  Template[tmplName].helpers({                                                                                         // 94
    atts: function selectedAttsAdjust() {                                                                              // 95
      var atts = _.clone(this.atts);                                                                                   // 96
      if (this.selected) {                                                                                             // 97
        atts.checked = "";                                                                                             // 98
      }                                                                                                                // 99
      // remove data-schema-key attribute because we put it                                                            // 100
      // on the entire group                                                                                           // 101
      delete atts["data-schema-key"];                                                                                  // 102
      return atts;                                                                                                     // 103
    },                                                                                                                 // 104
    dsk: function dsk() {                                                                                              // 105
      return {                                                                                                         // 106
        "data-schema-key": this.atts["data-schema-key"]                                                                // 107
      }                                                                                                                // 108
    }                                                                                                                  // 109
  });                                                                                                                  // 110
});                                                                                                                    // 111
                                                                                                                       // 112
var selectHelpers = {                                                                                                  // 113
  optionAtts: function afSelectOptionAtts() {                                                                          // 114
    var item = this;                                                                                                   // 115
    var atts = {                                                                                                       // 116
      value: item.value                                                                                                // 117
    };                                                                                                                 // 118
    if (item.selected) {                                                                                               // 119
      atts.selected = "";                                                                                              // 120
    }                                                                                                                  // 121
    return atts;                                                                                                       // 122
  }                                                                                                                    // 123
};                                                                                                                     // 124
Template["afSelect_bootstrap3"].helpers(selectHelpers);                                                                // 125
Template["afSelectMultiple_bootstrap3"].helpers(selectHelpers);                                                        // 126
Template["afBooleanSelect_bootstrap3"].helpers(selectHelpers);                                                         // 127
                                                                                                                       // 128
Template["afBooleanRadioGroup_bootstrap3"].helpers({                                                                   // 129
  falseAtts: function falseAtts() {                                                                                    // 130
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'data-schema-key');                                        // 131
    if (this.value === false) {                                                                                        // 132
      atts.checked = "";                                                                                               // 133
    }                                                                                                                  // 134
    return atts;                                                                                                       // 135
  },                                                                                                                   // 136
  trueAtts: function trueAtts() {                                                                                      // 137
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'data-schema-key');                                        // 138
    if (this.value === true) {                                                                                         // 139
      atts.checked = "";                                                                                               // 140
    }                                                                                                                  // 141
    return atts;                                                                                                       // 142
  },                                                                                                                   // 143
  dsk: function () {                                                                                                   // 144
    return {'data-schema-key': this.atts['data-schema-key']};                                                          // 145
  }                                                                                                                    // 146
});                                                                                                                    // 147
                                                                                                                       // 148
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/bootstrap3-horizontal/template.bootstrap3-horizontal.js                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("quickForm_bootstrap3-horizontal");                                                               // 2
Template["quickForm_bootstrap3-horizontal"] = new Template("Template.quickForm_bootstrap3-horizontal", (function() {   // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return Spacebars.call(view.lookup("qfAutoFormContext"));                                                           // 6
  }, function() {                                                                                                      // 7
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 8
      return [ "\n    ", Blaze._TemplateWith(function() {                                                              // 9
        return {                                                                                                       // 10
          "input-col-class": Spacebars.call(view.lookup("inputClass")),                                                // 11
          "label-class": Spacebars.call(view.lookup("labelClass"))                                                     // 12
        };                                                                                                             // 13
      }, function() {                                                                                                  // 14
        return Spacebars.include(view.lookupTemplate("afQuickFields"));                                                // 15
      }), "\n    ", Blaze.If(function() {                                                                              // 16
        return Spacebars.call(view.lookup("qfShouldRenderButton"));                                                    // 17
      }, function() {                                                                                                  // 18
        return [ "\n    ", HTML.DIV({                                                                                  // 19
          "class": "form-group"                                                                                        // 20
        }, "\n      ", HTML.DIV({                                                                                      // 21
          "class": function() {                                                                                        // 22
            return Spacebars.mustache(view.lookup("labelClass"));                                                      // 23
          }                                                                                                            // 24
        }), "\n      ", HTML.DIV({                                                                                     // 25
          "class": function() {                                                                                        // 26
            return Spacebars.mustache(view.lookup("inputClass"));                                                      // 27
          }                                                                                                            // 28
        }, "\n        ", HTML.BUTTON(HTML.Attrs({                                                                      // 29
          type: "submit"                                                                                               // 30
        }, function() {                                                                                                // 31
          return Spacebars.attrMustache(view.lookup("submitButtonAtts"));                                              // 32
        }), "\n        ", Spacebars.With(function() {                                                                  // 33
          return Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "buttonContent"));                            // 34
        }, function() {                                                                                                // 35
          return [ "\n        ", Blaze.View(function() {                                                               // 36
            return Spacebars.mustache(view.lookup("."));                                                               // 37
          }), "\n        " ];                                                                                          // 38
        }, function() {                                                                                                // 39
          return "\n        Submit\n        ";                                                                         // 40
        }), "\n        "), "\n      "), "\n    "), "\n    " ];                                                         // 41
      }), "\n  " ];                                                                                                    // 42
    });                                                                                                                // 43
  });                                                                                                                  // 44
}));                                                                                                                   // 45
                                                                                                                       // 46
Template.__checkName("afFormGroup_bootstrap3-horizontal");                                                             // 47
Template["afFormGroup_bootstrap3-horizontal"] = new Template("Template.afFormGroup_bootstrap3-horizontal", (function() {
  var view = this;                                                                                                     // 49
  return HTML.DIV({                                                                                                    // 50
    "class": function() {                                                                                              // 51
      return [ "form-group ", Blaze.If(function() {                                                                    // 52
        return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                  // 53
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 54
        }));                                                                                                           // 55
      }, function() {                                                                                                  // 56
        return "has-error";                                                                                            // 57
      }) ];                                                                                                            // 58
    }                                                                                                                  // 59
  }, "\n    ", Blaze.If(function() {                                                                                   // 60
    return Spacebars.call(view.lookup("skipLabel"));                                                                   // 61
  }, function() {                                                                                                      // 62
    return [ "\n    \n    ", HTML.LABEL(HTML.Attrs(function() {                                                        // 63
      return Spacebars.attrMustache(view.lookup("afFieldLabelAtts"));                                                  // 64
    })), "\n    " ];                                                                                                   // 65
  }, function() {                                                                                                      // 66
    return [ "\n    ", HTML.LABEL(HTML.Attrs(function() {                                                              // 67
      return Spacebars.attrMustache(view.lookup("afFieldLabelAtts"));                                                  // 68
    }), Blaze.If(function() {                                                                                          // 69
      return Spacebars.call(Spacebars.dot(view.lookup("."), "labelText"));                                             // 70
    }, function() {                                                                                                    // 71
      return Blaze.View(function() {                                                                                   // 72
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "labelText"));                                       // 73
      });                                                                                                              // 74
    }, function() {                                                                                                    // 75
      return Blaze.View(function() {                                                                                   // 76
        return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                      // 77
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 78
        }));                                                                                                           // 79
      });                                                                                                              // 80
    })), "\n    " ];                                                                                                   // 81
  }), "\n    ", HTML.DIV({                                                                                             // 82
    "class": function() {                                                                                              // 83
      return Spacebars.mustache(view.lookup("rightColumnClass"));                                                      // 84
    }                                                                                                                  // 85
  }, "\n      ", Blaze._TemplateWith(function() {                                                                      // 86
    return Spacebars.call(view.lookup("afFieldInputAtts"));                                                            // 87
  }, function() {                                                                                                      // 88
    return Spacebars.include(view.lookupTemplate("afFieldInput"));                                                     // 89
  }), "\n      ", HTML.SPAN({                                                                                          // 90
    "class": "help-block"                                                                                              // 91
  }, Blaze.View(function() {                                                                                           // 92
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                          // 93
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 94
    })));                                                                                                              // 95
  })), "\n    "), "\n  ");                                                                                             // 96
}));                                                                                                                   // 97
                                                                                                                       // 98
Template.__checkName("afObjectField_bootstrap3-horizontal");                                                           // 99
Template["afObjectField_bootstrap3-horizontal"] = new Template("Template.afObjectField_bootstrap3-horizontal", (function() {
  var view = this;                                                                                                     // 101
  return HTML.DIV({                                                                                                    // 102
    "class": function() {                                                                                              // 103
      return [ "form-group ", Blaze.If(function() {                                                                    // 104
        return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                  // 105
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 106
        }));                                                                                                           // 107
      }, function() {                                                                                                  // 108
        return "has-error";                                                                                            // 109
      }) ];                                                                                                            // 110
    }                                                                                                                  // 111
  }, "\n    ", HTML.LABEL(HTML.Attrs(function() {                                                                      // 112
    return Spacebars.attrMustache(view.lookup("afFieldLabelAtts"));                                                    // 113
  }), Blaze.View(function() {                                                                                          // 114
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                          // 115
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 116
    }));                                                                                                               // 117
  })), "\n    ", HTML.DIV({                                                                                            // 118
    "class": function() {                                                                                              // 119
      return Spacebars.mustache(view.lookup("rightColumnClass"));                                                      // 120
    }                                                                                                                  // 121
  }, "\n      ", HTML.DIV({                                                                                            // 122
    "class": "panel panel-default autoform-padding-fix"                                                                // 123
  }, "\n        ", HTML.DIV({                                                                                          // 124
    "class": "panel-body"                                                                                              // 125
  }, "\n        \n        ", Blaze._TemplateWith(function() {                                                          // 126
    return {                                                                                                           // 127
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name")),                                           // 128
      template: Spacebars.call("bootstrap3")                                                                           // 129
    };                                                                                                                 // 130
  }, function() {                                                                                                      // 131
    return Spacebars.include(view.lookupTemplate("afQuickFields"));                                                    // 132
  }), "\n        "), "\n      "), "\n    "), "\n  ");                                                                  // 133
}));                                                                                                                   // 134
                                                                                                                       // 135
Template.__checkName("afArrayField_bootstrap3-horizontal");                                                            // 136
Template["afArrayField_bootstrap3-horizontal"] = new Template("Template.afArrayField_bootstrap3-horizontal", (function() {
  var view = this;                                                                                                     // 138
  return HTML.DIV({                                                                                                    // 139
    "class": function() {                                                                                              // 140
      return [ "form-group ", Blaze.If(function() {                                                                    // 141
        return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                  // 142
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 143
        }));                                                                                                           // 144
      }, function() {                                                                                                  // 145
        return "has-error";                                                                                            // 146
      }) ];                                                                                                            // 147
    }                                                                                                                  // 148
  }, "\n    ", HTML.LABEL(HTML.Attrs(function() {                                                                      // 149
    return Spacebars.attrMustache(view.lookup("afFieldLabelAtts"));                                                    // 150
  }), Blaze.View(function() {                                                                                          // 151
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                          // 152
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 153
    }));                                                                                                               // 154
  })), "\n    ", HTML.DIV({                                                                                            // 155
    "class": function() {                                                                                              // 156
      return Spacebars.mustache(view.lookup("rightColumnClass"));                                                      // 157
    }                                                                                                                  // 158
  }, "\n      ", HTML.DIV({                                                                                            // 159
    "class": "panel panel-default autoform-padding-fix"                                                                // 160
  }, "\n        ", Blaze.If(function() {                                                                               // 161
    return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                      // 162
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 163
    }));                                                                                                               // 164
  }, function() {                                                                                                      // 165
    return [ "\n        ", HTML.DIV({                                                                                  // 166
      "class": "panel-body has-error"                                                                                  // 167
    }, "\n          ", HTML.SPAN({                                                                                     // 168
      "class": "help-block"                                                                                            // 169
    }, Blaze.View(function() {                                                                                         // 170
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                        // 171
        name: Spacebars.dot(view.lookup("."), "atts", "name")                                                          // 172
      })));                                                                                                            // 173
    })), "\n        "), "\n        " ];                                                                                // 174
  }), "\n        ", HTML.UL({                                                                                          // 175
    "class": "list-group"                                                                                              // 176
  }, "\n          ", Blaze._TemplateWith(function() {                                                                  // 177
    return {                                                                                                           // 178
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name")),                                           // 179
      minCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "minCount")),                                   // 180
      maxCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "maxCount"))                                    // 181
    };                                                                                                                 // 182
  }, function() {                                                                                                      // 183
    return Spacebars.include(view.lookupTemplate("afEachArrayItem"), function() {                                      // 184
      return [ "\n          ", HTML.LI({                                                                               // 185
        "class": "list-group-item autoform-array-item"                                                                 // 186
      }, "\n            ", HTML.DIV({                                                                                  // 187
        "class": "media"                                                                                               // 188
      }, "\n              ", Blaze.If(function() {                                                                     // 189
        return Spacebars.dataMustache(view.lookup("afArrayFieldHasMoreThanMinimum"), Spacebars.kw({                    // 190
          name: Spacebars.dot(view.lookup(".."), "atts", "name"),                                                      // 191
          minCount: Spacebars.dot(view.lookup(".."), "atts", "minCount"),                                              // 192
          maxCount: Spacebars.dot(view.lookup(".."), "atts", "maxCount")                                               // 193
        }));                                                                                                           // 194
      }, function() {                                                                                                  // 195
        return [ "\n              ", HTML.BUTTON({                                                                     // 196
          type: "button",                                                                                              // 197
          "class": "btn btn-primary autoform-remove-item pull-left"                                                    // 198
        }, HTML.SPAN({                                                                                                 // 199
          "class": "glyphicon glyphicon-minus"                                                                         // 200
        })), "\n              " ];                                                                                     // 201
      }), "\n              ", HTML.DIV({                                                                               // 202
        "class": "media-body"                                                                                          // 203
      }, "\n                ", Blaze._TemplateWith(function() {                                                        // 204
        return {                                                                                                       // 205
          name: Spacebars.call(Spacebars.dot(view.lookup("."), "name")),                                               // 206
          label: Spacebars.call(false)                                                                                 // 207
        };                                                                                                             // 208
      }, function() {                                                                                                  // 209
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 210
      }), "\n              "), "\n            "), "\n          "), "\n          " ];                                   // 211
    });                                                                                                                // 212
  }), "\n          ", Blaze.If(function() {                                                                            // 213
    return Spacebars.dataMustache(view.lookup("afArrayFieldHasLessThanMaximum"), Spacebars.kw({                        // 214
      name: Spacebars.dot(view.lookup("."), "atts", "name"),                                                           // 215
      minCount: Spacebars.dot(view.lookup("."), "atts", "minCount"),                                                   // 216
      maxCount: Spacebars.dot(view.lookup("."), "atts", "maxCount")                                                    // 217
    }));                                                                                                               // 218
  }, function() {                                                                                                      // 219
    return [ "\n          ", HTML.LI({                                                                                 // 220
      "class": "list-group-item"                                                                                       // 221
    }, "\n            ", HTML.BUTTON({                                                                                 // 222
      type: "button",                                                                                                  // 223
      "class": "btn btn-primary autoform-add-item",                                                                    // 224
      "data-autoform-field": function() {                                                                              // 225
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "name"));                                    // 226
      },                                                                                                               // 227
      "data-autoform-mincount": function() {                                                                           // 228
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "minCount"));                                // 229
      },                                                                                                               // 230
      "data-autoform-maxcount": function() {                                                                           // 231
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "maxCount"));                                // 232
      }                                                                                                                // 233
    }, HTML.SPAN({                                                                                                     // 234
      "class": "glyphicon glyphicon-plus"                                                                              // 235
    })), "\n          "), "\n          " ];                                                                            // 236
  }), "\n        "), "\n      "), "\n    "), "\n  ");                                                                  // 237
}));                                                                                                                   // 238
                                                                                                                       // 239
Template.__checkName("afCheckbox_bootstrap3-horizontal");                                                              // 240
Template["afCheckbox_bootstrap3-horizontal"] = new Template("Template.afCheckbox_bootstrap3-horizontal", (function() { // 241
  var view = this;                                                                                                     // 242
  return Blaze.If(function() {                                                                                         // 243
    return Spacebars.call(view.lookup("useLeftLabel"));                                                                // 244
  }, function() {                                                                                                      // 245
    return [ "\n  \n  ", HTML.DIV({                                                                                    // 246
      "class": "checkbox"                                                                                              // 247
    }, "\n    ", HTML.INPUT(HTML.Attrs({                                                                               // 248
      type: "checkbox",                                                                                                // 249
      value: function() {                                                                                              // 250
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 251
      }                                                                                                                // 252
    }, function() {                                                                                                    // 253
      return Spacebars.attrMustache(view.lookup("attsPlusSpecialClass"));                                              // 254
    })), "\n  "), "\n  " ];                                                                                            // 255
  }, function() {                                                                                                      // 256
    return [ "\n  ", HTML.DIV({                                                                                        // 257
      "class": "checkbox"                                                                                              // 258
    }, "\n    ", HTML.LABEL("\n      ", HTML.INPUT(HTML.Attrs({                                                        // 259
      type: "checkbox",                                                                                                // 260
      value: function() {                                                                                              // 261
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                           // 262
      }                                                                                                                // 263
    }, function() {                                                                                                    // 264
      return Spacebars.attrMustache(view.lookup("atts"));                                                              // 265
    })), "\n      ", Blaze.View(function() {                                                                           // 266
      return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                        // 267
        name: Spacebars.dot(view.lookup("."), "name")                                                                  // 268
      }));                                                                                                             // 269
    }), "\n    "), "\n  "), "\n  " ];                                                                                  // 270
  });                                                                                                                  // 271
}));                                                                                                                   // 272
                                                                                                                       // 273
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/bootstrap3-horizontal/bootstrap3-horizontal.js                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function findAtts() {                                                                                                  // 1
  var c, n = 0;                                                                                                        // 2
  do {                                                                                                                 // 3
    c = Template.parentData(n++);                                                                                      // 4
  } while (c && !c.atts);                                                                                              // 5
  return c && c.atts;                                                                                                  // 6
}                                                                                                                      // 7
                                                                                                                       // 8
Template['quickForm_bootstrap3-horizontal'].helpers({                                                                  // 9
  inputClass: function () {                                                                                            // 10
    var atts = findAtts();                                                                                             // 11
    if (atts) {                                                                                                        // 12
      return atts["input-col-class"];                                                                                  // 13
    }                                                                                                                  // 14
  },                                                                                                                   // 15
  labelClass: function () {                                                                                            // 16
    var atts = findAtts();                                                                                             // 17
    if (atts) {                                                                                                        // 18
      return atts["label-class"];                                                                                      // 19
    }                                                                                                                  // 20
  },                                                                                                                   // 21
  submitButtonAtts: function () {                                                                                      // 22
    var qfAtts = this.atts;                                                                                            // 23
    var atts = {};                                                                                                     // 24
    if (typeof qfAtts.buttonClasses === "string") {                                                                    // 25
      atts['class'] = qfAtts.buttonClasses;                                                                            // 26
    } else {                                                                                                           // 27
      atts['class'] = 'btn btn-primary';                                                                               // 28
    }                                                                                                                  // 29
    return atts;                                                                                                       // 30
  },                                                                                                                   // 31
  qfAutoFormContext: function () {                                                                                     // 32
    var ctx = _.clone(this.qfAutoFormContext || {});                                                                   // 33
    ctx = AutoForm.Utility.addClass(ctx, "form-horizontal");                                                           // 34
    if (ctx["input-col-class"])                                                                                        // 35
      delete ctx["input-col-class"];                                                                                   // 36
    if (ctx["label-class"])                                                                                            // 37
      delete ctx["label-class"];                                                                                       // 38
    return ctx;                                                                                                        // 39
  }                                                                                                                    // 40
});                                                                                                                    // 41
                                                                                                                       // 42
Template["afFormGroup_bootstrap3-horizontal"].helpers({                                                                // 43
  afFieldInputAtts: function () {                                                                                      // 44
    var atts = _.clone(this.afFieldInputAtts || {});                                                                   // 45
    if ('input-col-class' in atts) {                                                                                   // 46
      delete atts['input-col-class'];                                                                                  // 47
    }                                                                                                                  // 48
    // We have a special template for check boxes, but otherwise we                                                    // 49
    // want to use the same as those defined for bootstrap3 template.                                                  // 50
    if (AutoForm.getInputType(this.afFieldInputAtts) === "boolean-checkbox") {                                         // 51
      atts.template = "bootstrap3-horizontal";                                                                         // 52
    } else {                                                                                                           // 53
      atts.template = "bootstrap3";                                                                                    // 54
    }                                                                                                                  // 55
    return atts;                                                                                                       // 56
  },                                                                                                                   // 57
  afFieldLabelAtts: function () {                                                                                      // 58
    var atts = _.clone(this.afFieldLabelAtts || {});                                                                   // 59
    // Add bootstrap class                                                                                             // 60
    atts = AutoForm.Utility.addClass(atts, "control-label");                                                           // 61
    return atts;                                                                                                       // 62
  },                                                                                                                   // 63
  rightColumnClass: function () {                                                                                      // 64
    var atts = this.afFieldInputAtts || {};                                                                            // 65
    return atts['input-col-class'] || "";                                                                              // 66
  },                                                                                                                   // 67
  skipLabel: function () {                                                                                             // 68
    var self = this;                                                                                                   // 69
                                                                                                                       // 70
    var type = AutoForm.getInputType(self.afFieldInputAtts);                                                           // 71
    return (self.skipLabel || (type === "boolean-checkbox" && !self.afFieldInputAtts.leftLabel));                      // 72
  }                                                                                                                    // 73
});                                                                                                                    // 74
                                                                                                                       // 75
Template["afObjectField_bootstrap3-horizontal"].helpers({                                                              // 76
  rightColumnClass: function () {                                                                                      // 77
    var atts = this.atts || {};                                                                                        // 78
    return atts['input-col-class'] || "";                                                                              // 79
  },                                                                                                                   // 80
  afFieldLabelAtts: function () {                                                                                      // 81
    // Use only atts beginning with label-                                                                             // 82
    var labelAtts = {};                                                                                                // 83
    _.each(this.atts, function (val, key) {                                                                            // 84
      if (key.indexOf("label-") === 0) {                                                                               // 85
        labelAtts[key.substring(6)] = val;                                                                             // 86
      }                                                                                                                // 87
    });                                                                                                                // 88
    // Add bootstrap class                                                                                             // 89
    labelAtts = AutoForm.Utility.addClass(labelAtts, "control-label");                                                 // 90
    return labelAtts;                                                                                                  // 91
  }                                                                                                                    // 92
});                                                                                                                    // 93
                                                                                                                       // 94
Template["afArrayField_bootstrap3-horizontal"].helpers({                                                               // 95
  rightColumnClass: function () {                                                                                      // 96
    var atts = this.atts || {};                                                                                        // 97
    return atts['input-col-class'] || "";                                                                              // 98
  },                                                                                                                   // 99
  afFieldLabelAtts: function () {                                                                                      // 100
    // Use only atts beginning with label-                                                                             // 101
    var labelAtts = {};                                                                                                // 102
    _.each(this.atts, function (val, key) {                                                                            // 103
      if (key.indexOf("label-") === 0) {                                                                               // 104
        labelAtts[key.substring(6)] = val;                                                                             // 105
      }                                                                                                                // 106
    });                                                                                                                // 107
    // Add bootstrap class                                                                                             // 108
    labelAtts = AutoForm.Utility.addClass(labelAtts, "control-label");                                                 // 109
    return labelAtts;                                                                                                  // 110
  }                                                                                                                    // 111
});                                                                                                                    // 112
                                                                                                                       // 113
Template["afCheckbox_bootstrap3-horizontal"].helpers({                                                                 // 114
  attsPlusSpecialClass: function () {                                                                                  // 115
    var atts = _.clone(this.atts);                                                                                     // 116
    atts = AutoForm.Utility.addClass(atts, "autoform-checkbox-margin-fix");                                            // 117
    return atts;                                                                                                       // 118
  },                                                                                                                   // 119
  useLeftLabel: function () {                                                                                          // 120
    return this.atts.leftLabel;                                                                                        // 121
  }                                                                                                                    // 122
});                                                                                                                    // 123
                                                                                                                       // 124
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/bootstrap3-inline/template.bootstrap3-inline.js                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("quickForm_bootstrap3-inline");                                                                   // 2
Template["quickForm_bootstrap3-inline"] = new Template("Template.quickForm_bootstrap3-inline", (function() {           // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return Spacebars.call(view.lookup("qfAutoFormContext"));                                                           // 6
  }, function() {                                                                                                      // 7
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 8
      return [ "\n    ", Blaze._TemplateWith(function() {                                                              // 9
        return {                                                                                                       // 10
          "label-class": Spacebars.call(view.lookup("labelClass"))                                                     // 11
        };                                                                                                             // 12
      }, function() {                                                                                                  // 13
        return Spacebars.include(view.lookupTemplate("afQuickFields"));                                                // 14
      }), "\n    ", Blaze.If(function() {                                                                              // 15
        return Spacebars.call(view.lookup("qfShouldRenderButton"));                                                    // 16
      }, function() {                                                                                                  // 17
        return [ "\n    ", HTML.BUTTON(HTML.Attrs({                                                                    // 18
          type: "submit"                                                                                               // 19
        }, function() {                                                                                                // 20
          return Spacebars.attrMustache(view.lookup("submitButtonAtts"));                                              // 21
        }), "\n    ", Spacebars.With(function() {                                                                      // 22
          return Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "buttonContent"));                            // 23
        }, function() {                                                                                                // 24
          return [ "\n    ", Blaze.View(function() {                                                                   // 25
            return Spacebars.mustache(view.lookup("."));                                                               // 26
          }), "\n    " ];                                                                                              // 27
        }, function() {                                                                                                // 28
          return "\n    Submit\n    ";                                                                                 // 29
        }), "\n    "), "\n    " ];                                                                                     // 30
      }), "\n  " ];                                                                                                    // 31
    });                                                                                                                // 32
  });                                                                                                                  // 33
}));                                                                                                                   // 34
                                                                                                                       // 35
Template.__checkName("afFormGroup_bootstrap3-inline");                                                                 // 36
Template["afFormGroup_bootstrap3-inline"] = new Template("Template.afFormGroup_bootstrap3-inline", (function() {       // 37
  var view = this;                                                                                                     // 38
  return HTML.DIV({                                                                                                    // 39
    "class": function() {                                                                                              // 40
      return [ "form-group ", Blaze.If(function() {                                                                    // 41
        return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                  // 42
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 43
        }));                                                                                                           // 44
      }, function() {                                                                                                  // 45
        return "has-error";                                                                                            // 46
      }) ];                                                                                                            // 47
    }                                                                                                                  // 48
  }, "\n    ", Blaze.Unless(function() {                                                                               // 49
    return Spacebars.call(view.lookup("skipLabel"));                                                                   // 50
  }, function() {                                                                                                      // 51
    return [ "\n    ", HTML.LABEL(HTML.Attrs(function() {                                                              // 52
      return Spacebars.attrMustache(view.lookup("afFieldLabelAtts"));                                                  // 53
    }), Blaze.If(function() {                                                                                          // 54
      return Spacebars.call(Spacebars.dot(view.lookup("."), "labelText"));                                             // 55
    }, function() {                                                                                                    // 56
      return Blaze.View(function() {                                                                                   // 57
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "labelText"));                                       // 58
      });                                                                                                              // 59
    }, function() {                                                                                                    // 60
      return Blaze.View(function() {                                                                                   // 61
        return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                      // 62
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 63
        }));                                                                                                           // 64
      });                                                                                                              // 65
    })), "\n    " ];                                                                                                   // 66
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 67
    return Spacebars.call(view.lookup("afFieldInputAtts"));                                                            // 68
  }, function() {                                                                                                      // 69
    return Spacebars.include(view.lookupTemplate("afFieldInput"));                                                     // 70
  }), "\n    ", HTML.SPAN({                                                                                            // 71
    "class": "help-block"                                                                                              // 72
  }, Blaze.View(function() {                                                                                           // 73
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                          // 74
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 75
    })));                                                                                                              // 76
  })), "\n  ");                                                                                                        // 77
}));                                                                                                                   // 78
                                                                                                                       // 79
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/bootstrap3-inline/bootstrap3-inline.js                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function findAtts() {                                                                                                  // 1
  var c, n = 0;                                                                                                        // 2
  do {                                                                                                                 // 3
    c = Template.parentData(n++);                                                                                      // 4
  } while (c && !c.atts);                                                                                              // 5
  return c && c.atts;                                                                                                  // 6
}                                                                                                                      // 7
                                                                                                                       // 8
Template['quickForm_bootstrap3-inline'].helpers({                                                                      // 9
  labelClass: function () {                                                                                            // 10
    return this.atts["label-class"];                                                                                   // 11
  },                                                                                                                   // 12
  submitButtonAtts: function () {                                                                                      // 13
    var qfAtts = this.atts;                                                                                            // 14
    var atts = {};                                                                                                     // 15
    if (typeof qfAtts.buttonClasses === "string") {                                                                    // 16
      atts['class'] = qfAtts.buttonClasses;                                                                            // 17
    } else {                                                                                                           // 18
      atts['class'] = 'btn btn-primary autoform-inline-align';                                                         // 19
    }                                                                                                                  // 20
    return atts;                                                                                                       // 21
  },                                                                                                                   // 22
  qfAutoFormContext: function () {                                                                                     // 23
    var ctx = _.clone(this.qfAutoFormContext || {});                                                                   // 24
    ctx = AutoForm.Utility.addClass(ctx, "form-inline");                                                               // 25
    if (ctx["label-class"])                                                                                            // 26
      delete ctx["label-class"];                                                                                       // 27
    return ctx;                                                                                                        // 28
  }                                                                                                                    // 29
});                                                                                                                    // 30
                                                                                                                       // 31
Template["afFormGroup_bootstrap3-inline"].helpers({                                                                    // 32
  afFieldInputAtts: function () {                                                                                      // 33
    var atts = _.clone(this.afFieldInputAtts || {});                                                                   // 34
    // Use the same templates as those defined for bootstrap3 template.                                                // 35
    atts.template = "bootstrap3";                                                                                      // 36
    return atts;                                                                                                       // 37
  }                                                                                                                    // 38
});                                                                                                                    // 39
                                                                                                                       // 40
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/plain/template.plain.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("quickForm_plain");                                                                               // 2
Template["quickForm_plain"] = new Template("Template.quickForm_plain", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return Spacebars.call(Spacebars.dot(view.lookup("."), "qfAutoFormContext"));                                       // 6
  }, function() {                                                                                                      // 7
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 8
      return [ "\n    ", Spacebars.include(view.lookupTemplate("afQuickFields")), "\n    ", Blaze.If(function() {      // 9
        return Spacebars.call(view.lookup("qfShouldRenderButton"));                                                    // 10
      }, function() {                                                                                                  // 11
        return [ "\n    ", HTML.DIV("\n      ", HTML.BUTTON(HTML.Attrs({                                               // 12
          type: "submit"                                                                                               // 13
        }, function() {                                                                                                // 14
          return Spacebars.attrMustache(view.lookup("submitButtonAtts"));                                              // 15
        }), "\n      ", Spacebars.With(function() {                                                                    // 16
          return Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "buttonContent"));                            // 17
        }, function() {                                                                                                // 18
          return [ "\n      ", Blaze.View(function() {                                                                 // 19
            return Spacebars.mustache(view.lookup("."));                                                               // 20
          }), "\n      " ];                                                                                            // 21
        }, function() {                                                                                                // 22
          return "\n      Submit\n      ";                                                                             // 23
        }), "\n      "), "\n    "), "\n    " ];                                                                        // 24
      }), "\n  " ];                                                                                                    // 25
    });                                                                                                                // 26
  });                                                                                                                  // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
Template.__checkName("afFormGroup_plain");                                                                             // 30
Template["afFormGroup_plain"] = new Template("Template.afFormGroup_plain", (function() {                               // 31
  var view = this;                                                                                                     // 32
  return HTML.DIV({                                                                                                    // 33
    "class": function() {                                                                                              // 34
      return Blaze.If(function() {                                                                                     // 35
        return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                  // 36
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 37
        }));                                                                                                           // 38
      }, function() {                                                                                                  // 39
        return "has-error";                                                                                            // 40
      });                                                                                                              // 41
    }                                                                                                                  // 42
  }, "\n    ", Blaze.Unless(function() {                                                                               // 43
    return Spacebars.call(Spacebars.dot(view.lookup("."), "skipLabel"));                                               // 44
  }, function() {                                                                                                      // 45
    return [ "\n    ", HTML.LABEL(HTML.Attrs(function() {                                                              // 46
      return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "afFieldLabelAtts"));                              // 47
    }), Blaze.If(function() {                                                                                          // 48
      return Spacebars.call(Spacebars.dot(view.lookup("."), "labelText"));                                             // 49
    }, function() {                                                                                                    // 50
      return Blaze.View(function() {                                                                                   // 51
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "labelText"));                                       // 52
      });                                                                                                              // 53
    }, function() {                                                                                                    // 54
      return Blaze.View(function() {                                                                                   // 55
        return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                      // 56
          name: Spacebars.dot(view.lookup("."), "atts", "name")                                                        // 57
        }));                                                                                                           // 58
      });                                                                                                              // 59
    })), "\n    " ];                                                                                                   // 60
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 61
    return Spacebars.call(Spacebars.dot(view.lookup("."), "afFieldInputAtts"));                                        // 62
  }, function() {                                                                                                      // 63
    return Spacebars.include(view.lookupTemplate("afFieldInput"));                                                     // 64
  }), "\n    ", HTML.SPAN(Blaze.View(function() {                                                                      // 65
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                          // 66
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 67
    })));                                                                                                              // 68
  })), "\n  ");                                                                                                        // 69
}));                                                                                                                   // 70
                                                                                                                       // 71
Template.__checkName("afObjectField_plain");                                                                           // 72
Template["afObjectField_plain"] = new Template("Template.afObjectField_plain", (function() {                           // 73
  var view = this;                                                                                                     // 74
  return HTML.FIELDSET("\n    ", Spacebars.With(function() {                                                           // 75
    return Spacebars.dataMustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                      // 76
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 77
    }));                                                                                                               // 78
  }, function() {                                                                                                      // 79
    return [ "\n    ", HTML.LEGEND(Blaze.View(function() {                                                             // 80
      return Spacebars.mustache(view.lookup("."));                                                                     // 81
    })), "\n    " ];                                                                                                   // 82
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 83
    return {                                                                                                           // 84
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name"))                                            // 85
    };                                                                                                                 // 86
  }, function() {                                                                                                      // 87
    return Spacebars.include(view.lookupTemplate("afQuickFields"));                                                    // 88
  }), "\n  ");                                                                                                         // 89
}));                                                                                                                   // 90
                                                                                                                       // 91
Template.__checkName("afArrayField_plain");                                                                            // 92
Template["afArrayField_plain"] = new Template("Template.afArrayField_plain", (function() {                             // 93
  var view = this;                                                                                                     // 94
  return HTML.FIELDSET("\n    ", HTML.LEGEND(Blaze.View(function() {                                                   // 95
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                          // 96
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 97
    }));                                                                                                               // 98
  })), "\n    ", Blaze.If(function() {                                                                                 // 99
    return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                      // 100
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                            // 101
    }));                                                                                                               // 102
  }, function() {                                                                                                      // 103
    return [ "\n    ", HTML.DIV({                                                                                      // 104
      "class": "autoform-array-field-error"                                                                            // 105
    }, "\n      ", Blaze.View(function() {                                                                             // 106
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                        // 107
        name: Spacebars.dot(view.lookup("."), "atts", "name")                                                          // 108
      })));                                                                                                            // 109
    }), "\n    "), "\n    " ];                                                                                         // 110
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 111
    return {                                                                                                           // 112
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name")),                                           // 113
      minCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "minCount")),                                   // 114
      maxCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "maxCount"))                                    // 115
    };                                                                                                                 // 116
  }, function() {                                                                                                      // 117
    return Spacebars.include(view.lookupTemplate("afEachArrayItem"), function() {                                      // 118
      return [ "\n    ", HTML.DIV({                                                                                    // 119
        "class": "autoform-array-item"                                                                                 // 120
      }, "\n      ", Blaze._TemplateWith(function() {                                                                  // 121
        return {                                                                                                       // 122
          name: Spacebars.call(Spacebars.dot(view.lookup("."), "name")),                                               // 123
          label: Spacebars.call(false)                                                                                 // 124
        };                                                                                                             // 125
      }, function() {                                                                                                  // 126
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 127
      }), "\n      ", Blaze.If(function() {                                                                            // 128
        return Spacebars.dataMustache(view.lookup("afArrayFieldHasMoreThanMinimum"), Spacebars.kw({                    // 129
          name: Spacebars.dot(view.lookup(".."), "atts", "name"),                                                      // 130
          minCount: Spacebars.dot(view.lookup(".."), "atts", "minCount"),                                              // 131
          maxCount: Spacebars.dot(view.lookup(".."), "atts", "maxCount")                                               // 132
        }));                                                                                                           // 133
      }, function() {                                                                                                  // 134
        return [ "\n      ", HTML.BUTTON({                                                                             // 135
          type: "button",                                                                                              // 136
          "class": "autoform-remove-item"                                                                              // 137
        }, "Remove"), "\n      " ];                                                                                    // 138
      }), "\n    "), "\n    " ];                                                                                       // 139
    });                                                                                                                // 140
  }), "\n    ", Blaze.If(function() {                                                                                  // 141
    return Spacebars.dataMustache(view.lookup("afArrayFieldHasLessThanMaximum"), Spacebars.kw({                        // 142
      name: Spacebars.dot(view.lookup("."), "atts", "name"),                                                           // 143
      minCount: Spacebars.dot(view.lookup("."), "atts", "minCount"),                                                   // 144
      maxCount: Spacebars.dot(view.lookup("."), "atts", "maxCount")                                                    // 145
    }));                                                                                                               // 146
  }, function() {                                                                                                      // 147
    return [ "\n    ", HTML.DIV({                                                                                      // 148
      style: "margin-top: 20px;"                                                                                       // 149
    }, "\n      ", HTML.BUTTON({                                                                                       // 150
      type: "button",                                                                                                  // 151
      "class": "autoform-add-item",                                                                                    // 152
      "data-autoform-field": function() {                                                                              // 153
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "name"));                                    // 154
      },                                                                                                               // 155
      "data-autoform-mincount": function() {                                                                           // 156
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "minCount"));                                // 157
      },                                                                                                               // 158
      "data-autoform-maxcount": function() {                                                                           // 159
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "maxCount"));                                // 160
      }                                                                                                                // 161
    }, "Add"), "\n    "), "\n    " ];                                                                                  // 162
  }), "\n  ");                                                                                                         // 163
}));                                                                                                                   // 164
                                                                                                                       // 165
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/plain/plain.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * Template helpers for "plain" template                                                                               // 2
 */                                                                                                                    // 3
                                                                                                                       // 4
Template['quickForm_plain'].helpers({                                                                                  // 5
  submitButtonAtts: function plQuickFormSubmitButtonAtts() {                                                           // 6
    var qfAtts = this.atts;                                                                                            // 7
    var atts = {};                                                                                                     // 8
    if (typeof qfAtts.buttonClasses === "string") {                                                                    // 9
      atts['class'] = qfAtts.buttonClasses;                                                                            // 10
    }                                                                                                                  // 11
    return atts;                                                                                                       // 12
  }                                                                                                                    // 13
});                                                                                                                    // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/plain-fieldset/template.plain-fieldset.js                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("quickForm_plain-fieldset");                                                                      // 2
Template["quickForm_plain-fieldset"] = new Template("Template.quickForm_plain-fieldset", (function() {                 // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return Spacebars.call(Spacebars.dot(view.lookup("."), "qfAutoFormContext"));                                       // 6
  }, function() {                                                                                                      // 7
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 8
      return [ "\n    ", HTML.FIELDSET("\n      ", Spacebars.With(function() {                                         // 9
        return Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "legend"));                                     // 10
      }, function() {                                                                                                  // 11
        return [ "\n      ", HTML.LEGEND(Blaze.View(function() {                                                       // 12
          return Spacebars.mustache(view.lookup("."));                                                                 // 13
        })), "\n      " ];                                                                                             // 14
      }), "\n      ", Spacebars.include(view.lookupTemplate("afQuickFields")), "\n    "), "\n    ", Blaze.If(function() {
        return Spacebars.call(view.lookup("qfShouldRenderButton"));                                                    // 16
      }, function() {                                                                                                  // 17
        return [ "\n    ", HTML.DIV("\n      ", HTML.BUTTON(HTML.Attrs({                                               // 18
          type: "submit"                                                                                               // 19
        }, function() {                                                                                                // 20
          return Spacebars.attrMustache(view.lookup("submitButtonAtts"));                                              // 21
        }), "\n        ", Spacebars.With(function() {                                                                  // 22
          return Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "buttonContent"));                            // 23
        }, function() {                                                                                                // 24
          return [ "\n        ", Blaze.View(function() {                                                               // 25
            return Spacebars.mustache(view.lookup("."));                                                               // 26
          }), "\n        " ];                                                                                          // 27
        }, function() {                                                                                                // 28
          return "\n        Submit\n        ";                                                                         // 29
        }), "\n      "), "\n    "), "\n    " ];                                                                        // 30
      }), "\n  " ];                                                                                                    // 31
    });                                                                                                                // 32
  });                                                                                                                  // 33
}));                                                                                                                   // 34
                                                                                                                       // 35
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/aldeed:autoform/templates/plain-fieldset/plain-fieldset.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template['quickForm_plain-fieldset'].helpers({                                                                         // 1
  submitButtonAtts: function plfsQuickFormSubmitButtonAtts() {                                                         // 2
    var qfAtts = this.atts;                                                                                            // 3
    var atts = {};                                                                                                     // 4
    if (typeof qfAtts.buttonClasses === "string") {                                                                    // 5
      atts['class'] = qfAtts.buttonClasses;                                                                            // 6
    }                                                                                                                  // 7
    return atts;                                                                                                       // 8
  }                                                                                                                    // 9
});                                                                                                                    // 10
                                                                                                                       // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['aldeed:autoform'] = {
  AutoForm: AutoForm,
  Utility: Utility
};

})();
