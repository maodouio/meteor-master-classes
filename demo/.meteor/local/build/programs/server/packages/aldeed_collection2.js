(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var _ = Package.underscore._;
var check = Package.check.check;
var Match = Package.check.Match;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var EJSON = Package.ejson.EJSON;

/* Package-scope variables */
var Mongo;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aldeed:collection2/collection2.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/* global Meteor, _, SimpleSchema, Mongo:true, Match, Package, EJSON */                                              // 1
                                                                                                                     // 2
// Extend the schema options allowed by SimpleSchema                                                                 // 3
SimpleSchema.extendOptions({                                                                                         // 4
  index: Match.Optional(Match.OneOf(Number, String, Boolean)),                                                       // 5
  unique: Match.Optional(Boolean),                                                                                   // 6
  denyInsert: Match.Optional(Boolean),                                                                               // 7
  denyUpdate: Match.Optional(Boolean)                                                                                // 8
});                                                                                                                  // 9
                                                                                                                     // 10
// Define some extra validation error messages                                                                       // 11
SimpleSchema.messages({                                                                                              // 12
  notUnique: "[label] must be unique",                                                                               // 13
  insertNotAllowed: "[label] cannot be set during an insert",                                                        // 14
  updateNotAllowed: "[label] cannot be set during an update"                                                         // 15
});                                                                                                                  // 16
                                                                                                                     // 17
/*                                                                                                                   // 18
 * Public API                                                                                                        // 19
 */                                                                                                                  // 20
                                                                                                                     // 21
// backwards compatibility                                                                                           // 22
if (typeof Mongo === "undefined") {                                                                                  // 23
  Mongo = {};                                                                                                        // 24
  Mongo.Collection = Meteor.Collection;                                                                              // 25
}                                                                                                                    // 26
                                                                                                                     // 27
/**                                                                                                                  // 28
 * Mongo.Collection.prototype.attachSchema                                                                           // 29
 * @param {SimpleSchema|Object} ss - SimpleSchema instance or a schema definition object from which to create a new SimpleSchema instance
 * @param {Object} [options]                                                                                         // 31
 * @param {Boolean} [options.transform=false] Set to `true` if your document must be passed through the collection's transform to properly validate.
 * @param {Boolean} [options.replace=false] Set to `true` to replace any existing schema instead of combining        // 33
 * @return {undefined}                                                                                               // 34
 *                                                                                                                   // 35
 * Use this method to attach a schema to a collection created by another package,                                    // 36
 * such as Meteor.users. It is most likely unsafe to call this method more than                                      // 37
 * once for a single collection, or to call this for a collection that had a                                         // 38
 * schema object passed to its constructor.                                                                          // 39
 */                                                                                                                  // 40
Mongo.Collection.prototype.attachSchema = function c2AttachSchema(ss, options) {                                     // 41
  var self = this;                                                                                                   // 42
  options = options || {};                                                                                           // 43
                                                                                                                     // 44
  if (!(ss instanceof SimpleSchema)) {                                                                               // 45
    ss = new SimpleSchema(ss);                                                                                       // 46
  }                                                                                                                  // 47
                                                                                                                     // 48
  self._c2 = self._c2 || {};                                                                                         // 49
                                                                                                                     // 50
  // If we've already attached one schema, we combine both into a new schema unless options.replace is `true`        // 51
  if (self._c2._simpleSchema && options.replace !== true) {                                                          // 52
    ss = new SimpleSchema([self._c2._simpleSchema, ss]);                                                             // 53
  }                                                                                                                  // 54
                                                                                                                     // 55
  // Track the schema in the collection                                                                              // 56
  self._c2._simpleSchema = ss;                                                                                       // 57
                                                                                                                     // 58
  function ensureIndex(c, index, indexName, unique, sparse) {                                                        // 59
    Meteor.startup(function () {                                                                                     // 60
      c._collection._ensureIndex(index, {                                                                            // 61
        background: true,                                                                                            // 62
        name: indexName,                                                                                             // 63
        unique: unique,                                                                                              // 64
        sparse: sparse                                                                                               // 65
      });                                                                                                            // 66
    });                                                                                                              // 67
  }                                                                                                                  // 68
                                                                                                                     // 69
  function dropIndex(c, indexName) {                                                                                 // 70
    Meteor.startup(function () {                                                                                     // 71
      try {                                                                                                          // 72
        c._collection._dropIndex(indexName);                                                                         // 73
      } catch (err) {                                                                                                // 74
        // no index with that name, which is what we want                                                            // 75
      }                                                                                                              // 76
    });                                                                                                              // 77
  }                                                                                                                  // 78
                                                                                                                     // 79
  // Loop over fields definitions and ensure collection indexes (server side only)                                   // 80
  if (Meteor.isServer) {                                                                                             // 81
    _.each(ss.schema(), function(definition, fieldName) {                                                            // 82
      if ('index' in definition || definition.unique === true) {                                                     // 83
        var index = {}, indexValue;                                                                                  // 84
        // If they specified `unique: true` but not `index`,                                                         // 85
        // we assume `index: 1` to set up the unique index in mongo                                                  // 86
        if ('index' in definition) {                                                                                 // 87
          indexValue = definition.index;                                                                             // 88
          if (indexValue === true) {                                                                                 // 89
            indexValue = 1;                                                                                          // 90
          }                                                                                                          // 91
        } else {                                                                                                     // 92
          indexValue = 1;                                                                                            // 93
        }                                                                                                            // 94
        var indexName = 'c2_' + fieldName;                                                                           // 95
        // In the index object, we want object array keys without the ".$" piece                                     // 96
        var idxFieldName = fieldName.replace(/\.\$\./g, ".");                                                        // 97
        index[idxFieldName] = indexValue;                                                                            // 98
        var unique = !!definition.unique && (indexValue === 1 || indexValue === -1);                                 // 99
        var sparse = !!definition.optional && unique;                                                                // 100
                                                                                                                     // 101
        if (indexValue === false) {                                                                                  // 102
          dropIndex(self, indexName);                                                                                // 103
        } else {                                                                                                     // 104
          ensureIndex(self, index, indexName, unique, sparse);                                                       // 105
        }                                                                                                            // 106
      }                                                                                                              // 107
    });                                                                                                              // 108
  }                                                                                                                  // 109
                                                                                                                     // 110
  // Set up additional checks                                                                                        // 111
  ss.validator(function() {                                                                                          // 112
    var def = this.definition;                                                                                       // 113
    var val = this.value;                                                                                            // 114
    var op = this.operator;                                                                                          // 115
                                                                                                                     // 116
    if (def.denyInsert && val !== void 0 && !op) {                                                                   // 117
      // This is an insert of a defined value into a field where denyInsert=true                                     // 118
      return "insertNotAllowed";                                                                                     // 119
    }                                                                                                                // 120
                                                                                                                     // 121
    if (def.denyUpdate && op) {                                                                                      // 122
      // This is an insert of a defined value into a field where denyUpdate=true                                     // 123
      if (op !== "$set" || (op === "$set" && val !== void 0)) {                                                      // 124
        return "updateNotAllowed";                                                                                   // 125
      }                                                                                                              // 126
    }                                                                                                                // 127
                                                                                                                     // 128
    return true;                                                                                                     // 129
  });                                                                                                                // 130
                                                                                                                     // 131
  defineDeny(self, options);                                                                                         // 132
  keepInsecure(self);                                                                                                // 133
};                                                                                                                   // 134
                                                                                                                     // 135
Mongo.Collection.prototype.simpleSchema = function c2SS() {                                                          // 136
  var self = this;                                                                                                   // 137
  return self._c2 ? self._c2._simpleSchema : null;                                                                   // 138
};                                                                                                                   // 139
                                                                                                                     // 140
// Wrap DB write operation methods                                                                                   // 141
_.each(['insert', 'update', 'upsert'], function(methodName) {                                                        // 142
    var _super = Mongo.Collection.prototype[methodName];                                                             // 143
    Mongo.Collection.prototype[methodName] = function() {                                                            // 144
        var self = this,                                                                                             // 145
            args = _.toArray(arguments);                                                                             // 146
        if (self._c2) {                                                                                              // 147
                                                                                                                     // 148
            var userId = null;                                                                                       // 149
            try { // https://github.com/aldeed/meteor-collection2/issues/175                                         // 150
                userId = Meteor.userId();                                                                            // 151
            } catch (err) {}                                                                                         // 152
                                                                                                                     // 153
            args = doValidate.call(self, methodName, args, false, userId, Meteor.isServer);                          // 154
            if (!args) {                                                                                             // 155
                // doValidate already called the callback or threw the error                                         // 156
                if (methodName === "insert") {                                                                       // 157
                    // insert should always return an ID to match core behavior                                      // 158
                    return self._makeNewID();                                                                        // 159
                } else {                                                                                             // 160
                    return;                                                                                          // 161
                }                                                                                                    // 162
            }                                                                                                        // 163
        }                                                                                                            // 164
        return _super.apply(self, args);                                                                             // 165
    };                                                                                                               // 166
});                                                                                                                  // 167
                                                                                                                     // 168
/*                                                                                                                   // 169
 * Private                                                                                                           // 170
 */                                                                                                                  // 171
                                                                                                                     // 172
function doValidate(type, args, skipAutoValue, userId, isFromTrustedCode) {                                          // 173
  var self = this, schema = self._c2._simpleSchema,                                                                  // 174
      doc, callback, error, options, isUpsert, selector, last, hasCallback,                                          // 175
      isLocalCollection = (self._connection === null);                                                               // 176
                                                                                                                     // 177
  if (!args.length) {                                                                                                // 178
    throw new Error(type + " requires an argument");                                                                 // 179
  }                                                                                                                  // 180
                                                                                                                     // 181
  // Gather arguments and cache the selector                                                                         // 182
  if (type === "insert") {                                                                                           // 183
    doc = args[0];                                                                                                   // 184
    options = args[1];                                                                                               // 185
    callback = args[2];                                                                                              // 186
                                                                                                                     // 187
    // The real insert doesn't take options                                                                          // 188
    if (typeof options === "function") {                                                                             // 189
      args = [doc, options];                                                                                         // 190
    } else if (typeof callback === "function") {                                                                     // 191
      args = [doc, callback];                                                                                        // 192
    } else {                                                                                                         // 193
      args = [doc];                                                                                                  // 194
    }                                                                                                                // 195
                                                                                                                     // 196
  } else if (type === "update" || type === "upsert") {                                                               // 197
    selector = args[0];                                                                                              // 198
    doc = args[1];                                                                                                   // 199
    options = args[2];                                                                                               // 200
    callback = args[3];                                                                                              // 201
  } else {                                                                                                           // 202
    throw new Error("invalid type argument");                                                                        // 203
  }                                                                                                                  // 204
                                                                                                                     // 205
  // Support missing options arg                                                                                     // 206
  if (!callback && typeof options === "function") {                                                                  // 207
    callback = options;                                                                                              // 208
    options = {};                                                                                                    // 209
  }                                                                                                                  // 210
  options = options || {};                                                                                           // 211
                                                                                                                     // 212
  last = args.length - 1;                                                                                            // 213
                                                                                                                     // 214
  hasCallback = (typeof args[last] === 'function');                                                                  // 215
                                                                                                                     // 216
  // If update was called with upsert:true or upsert was called, flag as an upsert                                   // 217
  isUpsert = (type === "upsert" || (type === "update" && options.upsert === true));                                  // 218
                                                                                                                     // 219
  // Add a default callback function if we're on the client and no callback was given                                // 220
  if (Meteor.isClient && !callback) {                                                                                // 221
    // Client can't block, so it can't report errors by exception,                                                   // 222
    // only by callback. If they forget the callback, give them a                                                    // 223
    // default one that logs the error, so they aren't totally                                                       // 224
    // baffled if their writes don't work because their database is                                                  // 225
    // down.                                                                                                         // 226
    callback = function(err) {                                                                                       // 227
      if (err) {                                                                                                     // 228
        Meteor._debug(type + " failed: " + (err.reason || err.stack));                                               // 229
      }                                                                                                              // 230
    };                                                                                                               // 231
  }                                                                                                                  // 232
                                                                                                                     // 233
  // If client validation is fine or is skipped but then something                                                   // 234
  // is found to be invalid on the server, we get that error back                                                    // 235
  // as a special Meteor.Error that we need to parse.                                                                // 236
  if (Meteor.isClient && hasCallback) {                                                                              // 237
    callback = args[last] = wrapCallbackForParsingServerErrors(self, options.validationContext, callback);           // 238
  }                                                                                                                  // 239
                                                                                                                     // 240
  // If _id has already been added, remove it temporarily if it's                                                    // 241
  // not explicitly defined in the schema.                                                                           // 242
  var id;                                                                                                            // 243
  if (doc._id && !schema.allowsKey("_id")) {                                                                         // 244
    id = doc._id;                                                                                                    // 245
    delete doc._id;                                                                                                  // 246
  }                                                                                                                  // 247
                                                                                                                     // 248
  function doClean(docToClean, getAutoValues, filter, autoConvert, removeEmptyStrings, trimStrings) {                // 249
    // Clean the doc/modifier in place                                                                               // 250
    schema.clean(docToClean, {                                                                                       // 251
      filter: filter,                                                                                                // 252
      autoConvert: autoConvert,                                                                                      // 253
      getAutoValues: getAutoValues,                                                                                  // 254
      isModifier: (type !== "insert"),                                                                               // 255
      removeEmptyStrings: removeEmptyStrings,                                                                        // 256
      trimStrings: trimStrings,                                                                                      // 257
      extendAutoValueContext: _.extend({                                                                             // 258
        isInsert: (type === "insert"),                                                                               // 259
        isUpdate: (type === "update" && options.upsert !== true),                                                    // 260
        isUpsert: isUpsert,                                                                                          // 261
        userId: userId,                                                                                              // 262
        isFromTrustedCode: isFromTrustedCode,                                                                        // 263
        docId: ((type === "update" || type === "upsert") && selector) ? selector._id || selector : void 0,           // 264
        isLocalCollection: isLocalCollection                                                                         // 265
      }, options.extendAutoValueContext || {})                                                                       // 266
    });                                                                                                              // 267
  }                                                                                                                  // 268
                                                                                                                     // 269
  // On the server and for local collections, we allow passing `getAutoValues: false` to disable autoValue functions // 270
  if ((Meteor.isServer || isLocalCollection) && options.getAutoValues === false) {                                   // 271
    skipAutoValue = true;                                                                                            // 272
  }                                                                                                                  // 273
                                                                                                                     // 274
  // Preliminary cleaning on both client and server. On the server and for local                                     // 275
  // collections, automatic values will also be set at this point.                                                   // 276
  doClean(doc, ((Meteor.isServer || isLocalCollection) && !skipAutoValue), options.filter !== false, options.autoConvert !== false, options.removeEmptyStrings !== false, options.trimStrings !== false);
                                                                                                                     // 278
  // We clone before validating because in some cases we need to adjust the                                          // 279
  // object a bit before validating it. If we adjusted `doc` itself, our                                             // 280
  // changes would persist into the database.                                                                        // 281
  var docToValidate = {};                                                                                            // 282
  for (var prop in doc) {                                                                                            // 283
    // We omit prototype properties when cloning because they will not be valid                                      // 284
    // and mongo omits them when saving to the database anyway.                                                      // 285
    if (doc.hasOwnProperty(prop)) {                                                                                  // 286
      docToValidate[prop] = doc[prop];                                                                               // 287
    }                                                                                                                // 288
  }                                                                                                                  // 289
                                                                                                                     // 290
  // On the server, upserts are possible; SimpleSchema handles upserts pretty                                        // 291
  // well by default, but it will not know about the fields in the selector,                                         // 292
  // which are also stored in the database if an insert is performed. So we                                          // 293
  // will allow these fields to be considered for validation by adding them                                          // 294
  // to the $set in the modifier. This is no doubt prone to errors, but there                                        // 295
  // probably isn't any better way right now.                                                                        // 296
  if (Meteor.isServer && isUpsert && _.isObject(selector)) {                                                         // 297
    var set = docToValidate.$set || {};                                                                              // 298
    docToValidate.$set = _.clone(selector);                                                                          // 299
    _.extend(docToValidate.$set, set);                                                                               // 300
  }                                                                                                                  // 301
                                                                                                                     // 302
  // Set automatic values for validation on the client.                                                              // 303
  // On the server, we already updated doc with auto values, but on the client,                                      // 304
  // we will add them to docToValidate for validation purposes only.                                                 // 305
  // This is because we want all actual values generated on the server.                                              // 306
  if (Meteor.isClient && !isLocalCollection) {                                                                       // 307
    doClean(docToValidate, true, false, false, false, false);                                                        // 308
  }                                                                                                                  // 309
                                                                                                                     // 310
  // Validate doc                                                                                                    // 311
  var ctx = schema.namedContext(options.validationContext);                                                          // 312
  var isValid;                                                                                                       // 313
  if (options.validate === false) {                                                                                  // 314
    isValid = true;                                                                                                  // 315
  } else {                                                                                                           // 316
    isValid = ctx.validate(docToValidate, {                                                                          // 317
      modifier: (type === "update" || type === "upsert"),                                                            // 318
      upsert: isUpsert,                                                                                              // 319
      extendedCustomContext: _.extend({                                                                              // 320
        isInsert: (type === "insert"),                                                                               // 321
        isUpdate: (type === "update" && options.upsert !== true),                                                    // 322
        isUpsert: isUpsert,                                                                                          // 323
        userId: userId,                                                                                              // 324
        isFromTrustedCode: isFromTrustedCode,                                                                        // 325
        docId: ((type === "update" || type === "upsert") && selector) ? selector._id || selector : void 0,           // 326
        isLocalCollection: isLocalCollection                                                                         // 327
      }, options.extendedCustomContext || {})                                                                        // 328
    });                                                                                                              // 329
  }                                                                                                                  // 330
                                                                                                                     // 331
  if (isValid) {                                                                                                     // 332
    // Add the ID back                                                                                               // 333
    if (id) {                                                                                                        // 334
      doc._id = id;                                                                                                  // 335
    }                                                                                                                // 336
                                                                                                                     // 337
    // Update the args to reflect the cleaned doc                                                                    // 338
    if (type === "insert") {                                                                                         // 339
      args[0] = doc;                                                                                                 // 340
    } else {                                                                                                         // 341
      args[1] = doc;                                                                                                 // 342
    }                                                                                                                // 343
                                                                                                                     // 344
    // If callback, set invalidKey when we get a mongo unique error                                                  // 345
    if (Meteor.isServer && hasCallback) {                                                                            // 346
      args[last] = wrapCallbackForParsingMongoValidationErrors(self, doc, options.validationContext, args[last]);    // 347
    }                                                                                                                // 348
                                                                                                                     // 349
    return args;                                                                                                     // 350
  } else {                                                                                                           // 351
    error = getErrorObject(ctx);                                                                                     // 352
    if (callback) {                                                                                                  // 353
      // insert/update/upsert pass `false` when there's an error, so we do that                                      // 354
      callback(error, false);                                                                                        // 355
    } else {                                                                                                         // 356
      throw error;                                                                                                   // 357
    }                                                                                                                // 358
  }                                                                                                                  // 359
}                                                                                                                    // 360
                                                                                                                     // 361
function getErrorObject(context) {                                                                                   // 362
  var message, invalidKeys = context.invalidKeys();                                                                  // 363
  if (invalidKeys.length) {                                                                                          // 364
    message = context.keyErrorMessage(invalidKeys[0].name);                                                          // 365
  } else {                                                                                                           // 366
    message = "Failed validation";                                                                                   // 367
  }                                                                                                                  // 368
  var error = new Error(message);                                                                                    // 369
  error.invalidKeys = invalidKeys;                                                                                   // 370
  error.validationContext = context;                                                                                 // 371
  // If on the server, we add a sanitized error, too, in case we're                                                  // 372
  // called from a method.                                                                                           // 373
  if (Meteor.isServer) {                                                                                             // 374
    error.sanitizedError = new Meteor.Error(400, message);                                                           // 375
  }                                                                                                                  // 376
  return error;                                                                                                      // 377
}                                                                                                                    // 378
                                                                                                                     // 379
function addUniqueError(context, errorMessage) {                                                                     // 380
  var name = errorMessage.split('c2_')[1].split(' ')[0];                                                             // 381
  var val = errorMessage.split('dup key:')[1].split('"')[1];                                                         // 382
  context.addInvalidKeys([{                                                                                          // 383
    name: name,                                                                                                      // 384
    type: 'notUnique',                                                                                               // 385
    value: val                                                                                                       // 386
  }]);                                                                                                               // 387
}                                                                                                                    // 388
                                                                                                                     // 389
function wrapCallbackForParsingMongoValidationErrors(col, doc, vCtx, cb) {                                           // 390
  return function wrappedCallbackForParsingMongoValidationErrors(error) {                                            // 391
    if (error && ((error.name === "MongoError" && error.code === 11001) || error.message.indexOf('MongoError: E11000' !== -1)) && error.message.indexOf('c2_') !== -1) {
      var context = col.simpleSchema().namedContext(vCtx);                                                           // 393
      addUniqueError(context, error.message);                                                                        // 394
      arguments[0] = getErrorObject(context);                                                                        // 395
    }                                                                                                                // 396
    return cb.apply(this, arguments);                                                                                // 397
  };                                                                                                                 // 398
}                                                                                                                    // 399
                                                                                                                     // 400
function wrapCallbackForParsingServerErrors(col, vCtx, cb) {                                                         // 401
  return function wrappedCallbackForParsingServerErrors(error) {                                                     // 402
    // Handle our own validation errors                                                                              // 403
    var context = col.simpleSchema().namedContext(vCtx);                                                             // 404
    if (error instanceof Meteor.Error && error.error === 400 && error.reason === "INVALID" && typeof error.details === "string") {
      var invalidKeysFromServer = EJSON.parse(error.details);                                                        // 406
      context.addInvalidKeys(invalidKeysFromServer);                                                                 // 407
      arguments[0] = getErrorObject(context);                                                                        // 408
    }                                                                                                                // 409
    // Handle Mongo unique index errors, which are forwarded to the client as 409 errors                             // 410
    else if (error instanceof Meteor.Error && error.error === 409 && error.reason && error.reason.indexOf('E11000') !== -1 && error.reason.indexOf('c2_') !== -1) {
      addUniqueError(context, error.reason);                                                                         // 412
      arguments[0] = getErrorObject(context);                                                                        // 413
    }                                                                                                                // 414
    return cb.apply(this, arguments);                                                                                // 415
  };                                                                                                                 // 416
}                                                                                                                    // 417
                                                                                                                     // 418
var alreadyInsecured = {};                                                                                           // 419
function keepInsecure(c) {                                                                                           // 420
  // If insecure package is in use, we need to add allow rules that return                                           // 421
  // true. Otherwise, it would seemingly turn off insecure mode.                                                     // 422
  if (Package && Package.insecure && !alreadyInsecured[c._name]) {                                                   // 423
    c.allow({                                                                                                        // 424
      insert: function() {                                                                                           // 425
        return true;                                                                                                 // 426
      },                                                                                                             // 427
      update: function() {                                                                                           // 428
        return true;                                                                                                 // 429
      },                                                                                                             // 430
      remove: function () {                                                                                          // 431
        return true;                                                                                                 // 432
      },                                                                                                             // 433
      fetch: [],                                                                                                     // 434
      transform: null                                                                                                // 435
    });                                                                                                              // 436
    alreadyInsecured[c._name] = true;                                                                                // 437
  }                                                                                                                  // 438
  // If insecure package is NOT in use, then adding the two deny functions                                           // 439
  // does not have any effect on the main app's security paradigm. The                                               // 440
  // user will still be required to add at least one allow function of her                                           // 441
  // own for each operation for this collection. And the user may still add                                          // 442
  // additional deny functions, but does not have to.                                                                // 443
}                                                                                                                    // 444
                                                                                                                     // 445
var alreadyDefined = {};                                                                                             // 446
function defineDeny(c, options) {                                                                                    // 447
  if (!alreadyDefined[c._name]) {                                                                                    // 448
                                                                                                                     // 449
    var isLocalCollection = (c._connection === null);                                                                // 450
                                                                                                                     // 451
    // First define deny functions to extend doc with the results of clean                                           // 452
    // and autovalues. This must be done with "transform: null" or we would be                                       // 453
    // extending a clone of doc and therefore have no effect.                                                        // 454
    c.deny({                                                                                                         // 455
      insert: function(userId, doc) {                                                                                // 456
        var ss = c.simpleSchema();                                                                                   // 457
        // If _id has already been added, remove it temporarily if it's                                              // 458
        // not explicitly defined in the schema.                                                                     // 459
        var id;                                                                                                      // 460
        if (Meteor.isServer && doc._id && !ss.allowsKey("_id")) {                                                    // 461
          id = doc._id;                                                                                              // 462
          delete doc._id;                                                                                            // 463
        }                                                                                                            // 464
                                                                                                                     // 465
        // Referenced doc is cleaned in place                                                                        // 466
        ss.clean(doc, {                                                                                              // 467
          isModifier: false,                                                                                         // 468
          // We don't do these here because they are done on the client if desired                                   // 469
          filter: false,                                                                                             // 470
          autoConvert: false,                                                                                        // 471
          removeEmptyStrings: false,                                                                                 // 472
          trimStrings: false,                                                                                        // 473
          extendAutoValueContext: {                                                                                  // 474
            isInsert: true,                                                                                          // 475
            isUpdate: false,                                                                                         // 476
            isUpsert: false,                                                                                         // 477
            userId: userId,                                                                                          // 478
            isFromTrustedCode: false,                                                                                // 479
            docId: id,                                                                                               // 480
            isLocalCollection: isLocalCollection                                                                     // 481
          }                                                                                                          // 482
        });                                                                                                          // 483
                                                                                                                     // 484
        // Add the ID back                                                                                           // 485
        if (id) {                                                                                                    // 486
          doc._id = id;                                                                                              // 487
        }                                                                                                            // 488
                                                                                                                     // 489
        return false;                                                                                                // 490
      },                                                                                                             // 491
      update: function(userId, doc, fields, modifier) {                                                              // 492
        var ss = c.simpleSchema();                                                                                   // 493
        // Referenced modifier is cleaned in place                                                                   // 494
        ss.clean(modifier, {                                                                                         // 495
          isModifier: true,                                                                                          // 496
          // We don't do these here because they are done on the client if desired                                   // 497
          filter: false,                                                                                             // 498
          autoConvert: false,                                                                                        // 499
          removeEmptyStrings: false,                                                                                 // 500
          trimStrings: false,                                                                                        // 501
          extendAutoValueContext: {                                                                                  // 502
            isInsert: false,                                                                                         // 503
            isUpdate: true,                                                                                          // 504
            isUpsert: false,                                                                                         // 505
            userId: userId,                                                                                          // 506
            isFromTrustedCode: false,                                                                                // 507
            docId: doc && doc._id,                                                                                   // 508
            isLocalCollection: isLocalCollection                                                                     // 509
          }                                                                                                          // 510
        });                                                                                                          // 511
                                                                                                                     // 512
        return false;                                                                                                // 513
      },                                                                                                             // 514
      fetch: ['_id'],                                                                                                // 515
      transform: null                                                                                                // 516
    });                                                                                                              // 517
                                                                                                                     // 518
    // Second define deny functions to validate again on the server                                                  // 519
    // for client-initiated inserts and updates. These should be                                                     // 520
    // called after the clean/autovalue functions since we're adding                                                 // 521
    // them after. These must *not* have "transform: null" if options.transform is true because                      // 522
    // we need to pass the doc through any transforms to be sure                                                     // 523
    // that custom types are properly recognized for type validation.                                                // 524
    c.deny(_.extend({                                                                                                // 525
      insert: function(userId, doc) {                                                                                // 526
        // We pass the false options because we will have done them on client if desired                             // 527
        doValidate.call(c, "insert", [doc, {trimStrings: false, removeEmptyStrings: false, filter: false, autoConvert: false}, function(error) {
            if (error) {                                                                                             // 529
              throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));                            // 530
            }                                                                                                        // 531
          }], true, userId, false);                                                                                  // 532
                                                                                                                     // 533
        return false;                                                                                                // 534
      },                                                                                                             // 535
      update: function(userId, doc, fields, modifier) {                                                              // 536
        // NOTE: This will never be an upsert because client-side upserts                                            // 537
        // are not allowed once you define allow/deny functions.                                                     // 538
        // We pass the false options because we will have done them on client if desired                             // 539
        doValidate.call(c, "update", [{_id: doc && doc._id}, modifier, {trimStrings: false, removeEmptyStrings: false, filter: false, autoConvert: false}, function(error) {
            if (error) {                                                                                             // 541
              throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));                            // 542
            }                                                                                                        // 543
          }], true, userId, false);                                                                                  // 544
                                                                                                                     // 545
        return false;                                                                                                // 546
      },                                                                                                             // 547
      fetch: ['_id']                                                                                                 // 548
    }, options.transform === true ? {} : {transform: null}));                                                        // 549
                                                                                                                     // 550
    // note that we've already done this collection so that we don't do it again                                     // 551
    // if attachSchema is called again                                                                               // 552
    alreadyDefined[c._name] = true;                                                                                  // 553
  }                                                                                                                  // 554
}                                                                                                                    // 555
                                                                                                                     // 556
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['aldeed:collection2'] = {};

})();

//# sourceMappingURL=aldeed_collection2.js.map
