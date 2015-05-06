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

/* Package-scope variables */
var moment;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/momentjs:moment/moment.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//! moment.js                                                                                                          // 1
//! version : 2.8.4                                                                                                    // 2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors                                                         // 3
//! license : MIT                                                                                                      // 4
//! momentjs.com                                                                                                       // 5
                                                                                                                       // 6
(function (undefined) {                                                                                                // 7
    /************************************                                                                              // 8
        Constants                                                                                                      // 9
    ************************************/                                                                              // 10
                                                                                                                       // 11
    var moment,                                                                                                        // 12
        VERSION = '2.8.4',                                                                                             // 13
        // the global-scope this is NOT the global object in Node.js                                                   // 14
        globalScope = typeof global !== 'undefined' ? global : this,                                                   // 15
        oldGlobalMoment,                                                                                               // 16
        round = Math.round,                                                                                            // 17
        hasOwnProperty = Object.prototype.hasOwnProperty,                                                              // 18
        i,                                                                                                             // 19
                                                                                                                       // 20
        YEAR = 0,                                                                                                      // 21
        MONTH = 1,                                                                                                     // 22
        DATE = 2,                                                                                                      // 23
        HOUR = 3,                                                                                                      // 24
        MINUTE = 4,                                                                                                    // 25
        SECOND = 5,                                                                                                    // 26
        MILLISECOND = 6,                                                                                               // 27
                                                                                                                       // 28
        // internal storage for locale config files                                                                    // 29
        locales = {},                                                                                                  // 30
                                                                                                                       // 31
        // extra moment internal properties (plugins register props here)                                              // 32
        momentProperties = [],                                                                                         // 33
                                                                                                                       // 34
        // check for nodeJS                                                                                            // 35
        hasModule = (typeof module !== 'undefined' && module && module.exports),                                       // 36
                                                                                                                       // 37
        // ASP.NET json date format regex                                                                              // 38
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,                                                                       // 39
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,                              // 40
                                                                                                                       // 41
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html                   // 42
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere                                   // 43
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
                                                                                                                       // 45
        // format tokens                                                                                               // 46
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,                                          // 48
                                                                                                                       // 49
        // parsing token regexes                                                                                       // 50
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99                                                                  // 51
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999                                                             // 52
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999                                                             // 53
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999                                              // 54
        parseTokenDigits = /\d+/, // nonzero number of digits                                                          // 55
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z                                 // 57
        parseTokenT = /T/i, // T (ISO separator)                                                                       // 58
        parseTokenOffsetMs = /[\+\-]?\d+/, // 1234567890123                                                            // 59
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123                                   // 60
                                                                                                                       // 61
        //strict parsing regexes                                                                                       // 62
        parseTokenOneDigit = /\d/, // 0 - 9                                                                            // 63
        parseTokenTwoDigits = /\d\d/, // 00 - 99                                                                       // 64
        parseTokenThreeDigits = /\d{3}/, // 000 - 999                                                                  // 65
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999                                                                 // 66
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999                                                      // 67
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf                                                             // 68
                                                                                                                       // 69
        // iso 8601 regex                                                                                              // 70
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)   // 71
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                                                                                                                       // 73
        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',                                                                            // 74
                                                                                                                       // 75
        isoDates = [                                                                                                   // 76
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],                                                                 // 77
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],                                                                       // 78
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],                                                                       // 79
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],                                                                            // 80
            ['YYYY-DDD', /\d{4}-\d{3}/]                                                                                // 81
        ],                                                                                                             // 82
                                                                                                                       // 83
        // iso time formats and regexes                                                                                // 84
        isoTimes = [                                                                                                   // 85
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],                                                             // 86
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],                                                                       // 87
            ['HH:mm', /(T| )\d\d:\d\d/],                                                                               // 88
            ['HH', /(T| )\d\d/]                                                                                        // 89
        ],                                                                                                             // 90
                                                                                                                       // 91
        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-15', '30']                                         // 92
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,                                                                      // 93
                                                                                                                       // 94
        // getter and setter names                                                                                     // 95
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),                                 // 96
        unitMillisecondFactors = {                                                                                     // 97
            'Milliseconds' : 1,                                                                                        // 98
            'Seconds' : 1e3,                                                                                           // 99
            'Minutes' : 6e4,                                                                                           // 100
            'Hours' : 36e5,                                                                                            // 101
            'Days' : 864e5,                                                                                            // 102
            'Months' : 2592e6,                                                                                         // 103
            'Years' : 31536e6                                                                                          // 104
        },                                                                                                             // 105
                                                                                                                       // 106
        unitAliases = {                                                                                                // 107
            ms : 'millisecond',                                                                                        // 108
            s : 'second',                                                                                              // 109
            m : 'minute',                                                                                              // 110
            h : 'hour',                                                                                                // 111
            d : 'day',                                                                                                 // 112
            D : 'date',                                                                                                // 113
            w : 'week',                                                                                                // 114
            W : 'isoWeek',                                                                                             // 115
            M : 'month',                                                                                               // 116
            Q : 'quarter',                                                                                             // 117
            y : 'year',                                                                                                // 118
            DDD : 'dayOfYear',                                                                                         // 119
            e : 'weekday',                                                                                             // 120
            E : 'isoWeekday',                                                                                          // 121
            gg: 'weekYear',                                                                                            // 122
            GG: 'isoWeekYear'                                                                                          // 123
        },                                                                                                             // 124
                                                                                                                       // 125
        camelFunctions = {                                                                                             // 126
            dayofyear : 'dayOfYear',                                                                                   // 127
            isoweekday : 'isoWeekday',                                                                                 // 128
            isoweek : 'isoWeek',                                                                                       // 129
            weekyear : 'weekYear',                                                                                     // 130
            isoweekyear : 'isoWeekYear'                                                                                // 131
        },                                                                                                             // 132
                                                                                                                       // 133
        // format function strings                                                                                     // 134
        formatFunctions = {},                                                                                          // 135
                                                                                                                       // 136
        // default relative time thresholds                                                                            // 137
        relativeTimeThresholds = {                                                                                     // 138
            s: 45,  // seconds to minute                                                                               // 139
            m: 45,  // minutes to hour                                                                                 // 140
            h: 22,  // hours to day                                                                                    // 141
            d: 26,  // days to month                                                                                   // 142
            M: 11   // months to year                                                                                  // 143
        },                                                                                                             // 144
                                                                                                                       // 145
        // tokens to ordinalize and pad                                                                                // 146
        ordinalizeTokens = 'DDD w W M D d'.split(' '),                                                                 // 147
        paddedTokens = 'M D H h m s w W'.split(' '),                                                                   // 148
                                                                                                                       // 149
        formatTokenFunctions = {                                                                                       // 150
            M    : function () {                                                                                       // 151
                return this.month() + 1;                                                                               // 152
            },                                                                                                         // 153
            MMM  : function (format) {                                                                                 // 154
                return this.localeData().monthsShort(this, format);                                                    // 155
            },                                                                                                         // 156
            MMMM : function (format) {                                                                                 // 157
                return this.localeData().months(this, format);                                                         // 158
            },                                                                                                         // 159
            D    : function () {                                                                                       // 160
                return this.date();                                                                                    // 161
            },                                                                                                         // 162
            DDD  : function () {                                                                                       // 163
                return this.dayOfYear();                                                                               // 164
            },                                                                                                         // 165
            d    : function () {                                                                                       // 166
                return this.day();                                                                                     // 167
            },                                                                                                         // 168
            dd   : function (format) {                                                                                 // 169
                return this.localeData().weekdaysMin(this, format);                                                    // 170
            },                                                                                                         // 171
            ddd  : function (format) {                                                                                 // 172
                return this.localeData().weekdaysShort(this, format);                                                  // 173
            },                                                                                                         // 174
            dddd : function (format) {                                                                                 // 175
                return this.localeData().weekdays(this, format);                                                       // 176
            },                                                                                                         // 177
            w    : function () {                                                                                       // 178
                return this.week();                                                                                    // 179
            },                                                                                                         // 180
            W    : function () {                                                                                       // 181
                return this.isoWeek();                                                                                 // 182
            },                                                                                                         // 183
            YY   : function () {                                                                                       // 184
                return leftZeroFill(this.year() % 100, 2);                                                             // 185
            },                                                                                                         // 186
            YYYY : function () {                                                                                       // 187
                return leftZeroFill(this.year(), 4);                                                                   // 188
            },                                                                                                         // 189
            YYYYY : function () {                                                                                      // 190
                return leftZeroFill(this.year(), 5);                                                                   // 191
            },                                                                                                         // 192
            YYYYYY : function () {                                                                                     // 193
                var y = this.year(), sign = y >= 0 ? '+' : '-';                                                        // 194
                return sign + leftZeroFill(Math.abs(y), 6);                                                            // 195
            },                                                                                                         // 196
            gg   : function () {                                                                                       // 197
                return leftZeroFill(this.weekYear() % 100, 2);                                                         // 198
            },                                                                                                         // 199
            gggg : function () {                                                                                       // 200
                return leftZeroFill(this.weekYear(), 4);                                                               // 201
            },                                                                                                         // 202
            ggggg : function () {                                                                                      // 203
                return leftZeroFill(this.weekYear(), 5);                                                               // 204
            },                                                                                                         // 205
            GG   : function () {                                                                                       // 206
                return leftZeroFill(this.isoWeekYear() % 100, 2);                                                      // 207
            },                                                                                                         // 208
            GGGG : function () {                                                                                       // 209
                return leftZeroFill(this.isoWeekYear(), 4);                                                            // 210
            },                                                                                                         // 211
            GGGGG : function () {                                                                                      // 212
                return leftZeroFill(this.isoWeekYear(), 5);                                                            // 213
            },                                                                                                         // 214
            e : function () {                                                                                          // 215
                return this.weekday();                                                                                 // 216
            },                                                                                                         // 217
            E : function () {                                                                                          // 218
                return this.isoWeekday();                                                                              // 219
            },                                                                                                         // 220
            a    : function () {                                                                                       // 221
                return this.localeData().meridiem(this.hours(), this.minutes(), true);                                 // 222
            },                                                                                                         // 223
            A    : function () {                                                                                       // 224
                return this.localeData().meridiem(this.hours(), this.minutes(), false);                                // 225
            },                                                                                                         // 226
            H    : function () {                                                                                       // 227
                return this.hours();                                                                                   // 228
            },                                                                                                         // 229
            h    : function () {                                                                                       // 230
                return this.hours() % 12 || 12;                                                                        // 231
            },                                                                                                         // 232
            m    : function () {                                                                                       // 233
                return this.minutes();                                                                                 // 234
            },                                                                                                         // 235
            s    : function () {                                                                                       // 236
                return this.seconds();                                                                                 // 237
            },                                                                                                         // 238
            S    : function () {                                                                                       // 239
                return toInt(this.milliseconds() / 100);                                                               // 240
            },                                                                                                         // 241
            SS   : function () {                                                                                       // 242
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);                                               // 243
            },                                                                                                         // 244
            SSS  : function () {                                                                                       // 245
                return leftZeroFill(this.milliseconds(), 3);                                                           // 246
            },                                                                                                         // 247
            SSSS : function () {                                                                                       // 248
                return leftZeroFill(this.milliseconds(), 3);                                                           // 249
            },                                                                                                         // 250
            Z    : function () {                                                                                       // 251
                var a = -this.zone(),                                                                                  // 252
                    b = '+';                                                                                           // 253
                if (a < 0) {                                                                                           // 254
                    a = -a;                                                                                            // 255
                    b = '-';                                                                                           // 256
                }                                                                                                      // 257
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);                      // 258
            },                                                                                                         // 259
            ZZ   : function () {                                                                                       // 260
                var a = -this.zone(),                                                                                  // 261
                    b = '+';                                                                                           // 262
                if (a < 0) {                                                                                           // 263
                    a = -a;                                                                                            // 264
                    b = '-';                                                                                           // 265
                }                                                                                                      // 266
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);                            // 267
            },                                                                                                         // 268
            z : function () {                                                                                          // 269
                return this.zoneAbbr();                                                                                // 270
            },                                                                                                         // 271
            zz : function () {                                                                                         // 272
                return this.zoneName();                                                                                // 273
            },                                                                                                         // 274
            x    : function () {                                                                                       // 275
                return this.valueOf();                                                                                 // 276
            },                                                                                                         // 277
            X    : function () {                                                                                       // 278
                return this.unix();                                                                                    // 279
            },                                                                                                         // 280
            Q : function () {                                                                                          // 281
                return this.quarter();                                                                                 // 282
            }                                                                                                          // 283
        },                                                                                                             // 284
                                                                                                                       // 285
        deprecations = {},                                                                                             // 286
                                                                                                                       // 287
        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];                                 // 288
                                                                                                                       // 289
    // Pick the first defined of two or three arguments. dfl comes from                                                // 290
    // default.                                                                                                        // 291
    function dfl(a, b, c) {                                                                                            // 292
        switch (arguments.length) {                                                                                    // 293
            case 2: return a != null ? a : b;                                                                          // 294
            case 3: return a != null ? a : b != null ? b : c;                                                          // 295
            default: throw new Error('Implement me');                                                                  // 296
        }                                                                                                              // 297
    }                                                                                                                  // 298
                                                                                                                       // 299
    function hasOwnProp(a, b) {                                                                                        // 300
        return hasOwnProperty.call(a, b);                                                                              // 301
    }                                                                                                                  // 302
                                                                                                                       // 303
    function defaultParsingFlags() {                                                                                   // 304
        // We need to deep clone this object, and es5 standard is not very                                             // 305
        // helpful.                                                                                                    // 306
        return {                                                                                                       // 307
            empty : false,                                                                                             // 308
            unusedTokens : [],                                                                                         // 309
            unusedInput : [],                                                                                          // 310
            overflow : -2,                                                                                             // 311
            charsLeftOver : 0,                                                                                         // 312
            nullInput : false,                                                                                         // 313
            invalidMonth : null,                                                                                       // 314
            invalidFormat : false,                                                                                     // 315
            userInvalidated : false,                                                                                   // 316
            iso: false                                                                                                 // 317
        };                                                                                                             // 318
    }                                                                                                                  // 319
                                                                                                                       // 320
    function printMsg(msg) {                                                                                           // 321
        if (moment.suppressDeprecationWarnings === false &&                                                            // 322
                typeof console !== 'undefined' && console.warn) {                                                      // 323
            console.warn('Deprecation warning: ' + msg);                                                               // 324
        }                                                                                                              // 325
    }                                                                                                                  // 326
                                                                                                                       // 327
    function deprecate(msg, fn) {                                                                                      // 328
        var firstTime = true;                                                                                          // 329
        return extend(function () {                                                                                    // 330
            if (firstTime) {                                                                                           // 331
                printMsg(msg);                                                                                         // 332
                firstTime = false;                                                                                     // 333
            }                                                                                                          // 334
            return fn.apply(this, arguments);                                                                          // 335
        }, fn);                                                                                                        // 336
    }                                                                                                                  // 337
                                                                                                                       // 338
    function deprecateSimple(name, msg) {                                                                              // 339
        if (!deprecations[name]) {                                                                                     // 340
            printMsg(msg);                                                                                             // 341
            deprecations[name] = true;                                                                                 // 342
        }                                                                                                              // 343
    }                                                                                                                  // 344
                                                                                                                       // 345
    function padToken(func, count) {                                                                                   // 346
        return function (a) {                                                                                          // 347
            return leftZeroFill(func.call(this, a), count);                                                            // 348
        };                                                                                                             // 349
    }                                                                                                                  // 350
    function ordinalizeToken(func, period) {                                                                           // 351
        return function (a) {                                                                                          // 352
            return this.localeData().ordinal(func.call(this, a), period);                                              // 353
        };                                                                                                             // 354
    }                                                                                                                  // 355
                                                                                                                       // 356
    while (ordinalizeTokens.length) {                                                                                  // 357
        i = ordinalizeTokens.pop();                                                                                    // 358
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);                                   // 359
    }                                                                                                                  // 360
    while (paddedTokens.length) {                                                                                      // 361
        i = paddedTokens.pop();                                                                                        // 362
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);                                            // 363
    }                                                                                                                  // 364
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);                                                 // 365
                                                                                                                       // 366
                                                                                                                       // 367
    /************************************                                                                              // 368
        Constructors                                                                                                   // 369
    ************************************/                                                                              // 370
                                                                                                                       // 371
    function Locale() {                                                                                                // 372
    }                                                                                                                  // 373
                                                                                                                       // 374
    // Moment prototype object                                                                                         // 375
    function Moment(config, skipOverflow) {                                                                            // 376
        if (skipOverflow !== false) {                                                                                  // 377
            checkOverflow(config);                                                                                     // 378
        }                                                                                                              // 379
        copyConfig(this, config);                                                                                      // 380
        this._d = new Date(+config._d);                                                                                // 381
    }                                                                                                                  // 382
                                                                                                                       // 383
    // Duration Constructor                                                                                            // 384
    function Duration(duration) {                                                                                      // 385
        var normalizedInput = normalizeObjectUnits(duration),                                                          // 386
            years = normalizedInput.year || 0,                                                                         // 387
            quarters = normalizedInput.quarter || 0,                                                                   // 388
            months = normalizedInput.month || 0,                                                                       // 389
            weeks = normalizedInput.week || 0,                                                                         // 390
            days = normalizedInput.day || 0,                                                                           // 391
            hours = normalizedInput.hour || 0,                                                                         // 392
            minutes = normalizedInput.minute || 0,                                                                     // 393
            seconds = normalizedInput.second || 0,                                                                     // 394
            milliseconds = normalizedInput.millisecond || 0;                                                           // 395
                                                                                                                       // 396
        // representation for dateAddRemove                                                                            // 397
        this._milliseconds = +milliseconds +                                                                           // 398
            seconds * 1e3 + // 1000                                                                                    // 399
            minutes * 6e4 + // 1000 * 60                                                                               // 400
            hours * 36e5; // 1000 * 60 * 60                                                                            // 401
        // Because of dateAddRemove treats 24 hours as different from a                                                // 402
        // day when working around DST, we need to store them separately                                               // 403
        this._days = +days +                                                                                           // 404
            weeks * 7;                                                                                                 // 405
        // It is impossible translate months into days without knowing                                                 // 406
        // which months you are are talking about, so we have to store                                                 // 407
        // it separately.                                                                                              // 408
        this._months = +months +                                                                                       // 409
            quarters * 3 +                                                                                             // 410
            years * 12;                                                                                                // 411
                                                                                                                       // 412
        this._data = {};                                                                                               // 413
                                                                                                                       // 414
        this._locale = moment.localeData();                                                                            // 415
                                                                                                                       // 416
        this._bubble();                                                                                                // 417
    }                                                                                                                  // 418
                                                                                                                       // 419
    /************************************                                                                              // 420
        Helpers                                                                                                        // 421
    ************************************/                                                                              // 422
                                                                                                                       // 423
                                                                                                                       // 424
    function extend(a, b) {                                                                                            // 425
        for (var i in b) {                                                                                             // 426
            if (hasOwnProp(b, i)) {                                                                                    // 427
                a[i] = b[i];                                                                                           // 428
            }                                                                                                          // 429
        }                                                                                                              // 430
                                                                                                                       // 431
        if (hasOwnProp(b, 'toString')) {                                                                               // 432
            a.toString = b.toString;                                                                                   // 433
        }                                                                                                              // 434
                                                                                                                       // 435
        if (hasOwnProp(b, 'valueOf')) {                                                                                // 436
            a.valueOf = b.valueOf;                                                                                     // 437
        }                                                                                                              // 438
                                                                                                                       // 439
        return a;                                                                                                      // 440
    }                                                                                                                  // 441
                                                                                                                       // 442
    function copyConfig(to, from) {                                                                                    // 443
        var i, prop, val;                                                                                              // 444
                                                                                                                       // 445
        if (typeof from._isAMomentObject !== 'undefined') {                                                            // 446
            to._isAMomentObject = from._isAMomentObject;                                                               // 447
        }                                                                                                              // 448
        if (typeof from._i !== 'undefined') {                                                                          // 449
            to._i = from._i;                                                                                           // 450
        }                                                                                                              // 451
        if (typeof from._f !== 'undefined') {                                                                          // 452
            to._f = from._f;                                                                                           // 453
        }                                                                                                              // 454
        if (typeof from._l !== 'undefined') {                                                                          // 455
            to._l = from._l;                                                                                           // 456
        }                                                                                                              // 457
        if (typeof from._strict !== 'undefined') {                                                                     // 458
            to._strict = from._strict;                                                                                 // 459
        }                                                                                                              // 460
        if (typeof from._tzm !== 'undefined') {                                                                        // 461
            to._tzm = from._tzm;                                                                                       // 462
        }                                                                                                              // 463
        if (typeof from._isUTC !== 'undefined') {                                                                      // 464
            to._isUTC = from._isUTC;                                                                                   // 465
        }                                                                                                              // 466
        if (typeof from._offset !== 'undefined') {                                                                     // 467
            to._offset = from._offset;                                                                                 // 468
        }                                                                                                              // 469
        if (typeof from._pf !== 'undefined') {                                                                         // 470
            to._pf = from._pf;                                                                                         // 471
        }                                                                                                              // 472
        if (typeof from._locale !== 'undefined') {                                                                     // 473
            to._locale = from._locale;                                                                                 // 474
        }                                                                                                              // 475
                                                                                                                       // 476
        if (momentProperties.length > 0) {                                                                             // 477
            for (i in momentProperties) {                                                                              // 478
                prop = momentProperties[i];                                                                            // 479
                val = from[prop];                                                                                      // 480
                if (typeof val !== 'undefined') {                                                                      // 481
                    to[prop] = val;                                                                                    // 482
                }                                                                                                      // 483
            }                                                                                                          // 484
        }                                                                                                              // 485
                                                                                                                       // 486
        return to;                                                                                                     // 487
    }                                                                                                                  // 488
                                                                                                                       // 489
    function absRound(number) {                                                                                        // 490
        if (number < 0) {                                                                                              // 491
            return Math.ceil(number);                                                                                  // 492
        } else {                                                                                                       // 493
            return Math.floor(number);                                                                                 // 494
        }                                                                                                              // 495
    }                                                                                                                  // 496
                                                                                                                       // 497
    // left zero fill a number                                                                                         // 498
    // see http://jsperf.com/left-zero-filling for performance comparison                                              // 499
    function leftZeroFill(number, targetLength, forceSign) {                                                           // 500
        var output = '' + Math.abs(number),                                                                            // 501
            sign = number >= 0;                                                                                        // 502
                                                                                                                       // 503
        while (output.length < targetLength) {                                                                         // 504
            output = '0' + output;                                                                                     // 505
        }                                                                                                              // 506
        return (sign ? (forceSign ? '+' : '') : '-') + output;                                                         // 507
    }                                                                                                                  // 508
                                                                                                                       // 509
    function positiveMomentsDifference(base, other) {                                                                  // 510
        var res = {milliseconds: 0, months: 0};                                                                        // 511
                                                                                                                       // 512
        res.months = other.month() - base.month() +                                                                    // 513
            (other.year() - base.year()) * 12;                                                                         // 514
        if (base.clone().add(res.months, 'M').isAfter(other)) {                                                        // 515
            --res.months;                                                                                              // 516
        }                                                                                                              // 517
                                                                                                                       // 518
        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));                                              // 519
                                                                                                                       // 520
        return res;                                                                                                    // 521
    }                                                                                                                  // 522
                                                                                                                       // 523
    function momentsDifference(base, other) {                                                                          // 524
        var res;                                                                                                       // 525
        other = makeAs(other, base);                                                                                   // 526
        if (base.isBefore(other)) {                                                                                    // 527
            res = positiveMomentsDifference(base, other);                                                              // 528
        } else {                                                                                                       // 529
            res = positiveMomentsDifference(other, base);                                                              // 530
            res.milliseconds = -res.milliseconds;                                                                      // 531
            res.months = -res.months;                                                                                  // 532
        }                                                                                                              // 533
                                                                                                                       // 534
        return res;                                                                                                    // 535
    }                                                                                                                  // 536
                                                                                                                       // 537
    // TODO: remove 'name' arg after deprecation is removed                                                            // 538
    function createAdder(direction, name) {                                                                            // 539
        return function (val, period) {                                                                                // 540
            var dur, tmp;                                                                                              // 541
            //invert the arguments, but complain about it                                                              // 542
            if (period !== null && !isNaN(+period)) {                                                                  // 543
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;                                                                 // 545
            }                                                                                                          // 546
                                                                                                                       // 547
            val = typeof val === 'string' ? +val : val;                                                                // 548
            dur = moment.duration(val, period);                                                                        // 549
            addOrSubtractDurationFromMoment(this, dur, direction);                                                     // 550
            return this;                                                                                               // 551
        };                                                                                                             // 552
    }                                                                                                                  // 553
                                                                                                                       // 554
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {                                  // 555
        var milliseconds = duration._milliseconds,                                                                     // 556
            days = duration._days,                                                                                     // 557
            months = duration._months;                                                                                 // 558
        updateOffset = updateOffset == null ? true : updateOffset;                                                     // 559
                                                                                                                       // 560
        if (milliseconds) {                                                                                            // 561
            mom._d.setTime(+mom._d + milliseconds * isAdding);                                                         // 562
        }                                                                                                              // 563
        if (days) {                                                                                                    // 564
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);                                          // 565
        }                                                                                                              // 566
        if (months) {                                                                                                  // 567
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);                                          // 568
        }                                                                                                              // 569
        if (updateOffset) {                                                                                            // 570
            moment.updateOffset(mom, days || months);                                                                  // 571
        }                                                                                                              // 572
    }                                                                                                                  // 573
                                                                                                                       // 574
    // check if is an array                                                                                            // 575
    function isArray(input) {                                                                                          // 576
        return Object.prototype.toString.call(input) === '[object Array]';                                             // 577
    }                                                                                                                  // 578
                                                                                                                       // 579
    function isDate(input) {                                                                                           // 580
        return Object.prototype.toString.call(input) === '[object Date]' ||                                            // 581
            input instanceof Date;                                                                                     // 582
    }                                                                                                                  // 583
                                                                                                                       // 584
    // compare two arrays, return the number of differences                                                            // 585
    function compareArrays(array1, array2, dontConvert) {                                                              // 586
        var len = Math.min(array1.length, array2.length),                                                              // 587
            lengthDiff = Math.abs(array1.length - array2.length),                                                      // 588
            diffs = 0,                                                                                                 // 589
            i;                                                                                                         // 590
        for (i = 0; i < len; i++) {                                                                                    // 591
            if ((dontConvert && array1[i] !== array2[i]) ||                                                            // 592
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {                                             // 593
                diffs++;                                                                                               // 594
            }                                                                                                          // 595
        }                                                                                                              // 596
        return diffs + lengthDiff;                                                                                     // 597
    }                                                                                                                  // 598
                                                                                                                       // 599
    function normalizeUnits(units) {                                                                                   // 600
        if (units) {                                                                                                   // 601
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');                                                  // 602
            units = unitAliases[units] || camelFunctions[lowered] || lowered;                                          // 603
        }                                                                                                              // 604
        return units;                                                                                                  // 605
    }                                                                                                                  // 606
                                                                                                                       // 607
    function normalizeObjectUnits(inputObject) {                                                                       // 608
        var normalizedInput = {},                                                                                      // 609
            normalizedProp,                                                                                            // 610
            prop;                                                                                                      // 611
                                                                                                                       // 612
        for (prop in inputObject) {                                                                                    // 613
            if (hasOwnProp(inputObject, prop)) {                                                                       // 614
                normalizedProp = normalizeUnits(prop);                                                                 // 615
                if (normalizedProp) {                                                                                  // 616
                    normalizedInput[normalizedProp] = inputObject[prop];                                               // 617
                }                                                                                                      // 618
            }                                                                                                          // 619
        }                                                                                                              // 620
                                                                                                                       // 621
        return normalizedInput;                                                                                        // 622
    }                                                                                                                  // 623
                                                                                                                       // 624
    function makeList(field) {                                                                                         // 625
        var count, setter;                                                                                             // 626
                                                                                                                       // 627
        if (field.indexOf('week') === 0) {                                                                             // 628
            count = 7;                                                                                                 // 629
            setter = 'day';                                                                                            // 630
        }                                                                                                              // 631
        else if (field.indexOf('month') === 0) {                                                                       // 632
            count = 12;                                                                                                // 633
            setter = 'month';                                                                                          // 634
        }                                                                                                              // 635
        else {                                                                                                         // 636
            return;                                                                                                    // 637
        }                                                                                                              // 638
                                                                                                                       // 639
        moment[field] = function (format, index) {                                                                     // 640
            var i, getter,                                                                                             // 641
                method = moment._locale[field],                                                                        // 642
                results = [];                                                                                          // 643
                                                                                                                       // 644
            if (typeof format === 'number') {                                                                          // 645
                index = format;                                                                                        // 646
                format = undefined;                                                                                    // 647
            }                                                                                                          // 648
                                                                                                                       // 649
            getter = function (i) {                                                                                    // 650
                var m = moment().utc().set(setter, i);                                                                 // 651
                return method.call(moment._locale, m, format || '');                                                   // 652
            };                                                                                                         // 653
                                                                                                                       // 654
            if (index != null) {                                                                                       // 655
                return getter(index);                                                                                  // 656
            }                                                                                                          // 657
            else {                                                                                                     // 658
                for (i = 0; i < count; i++) {                                                                          // 659
                    results.push(getter(i));                                                                           // 660
                }                                                                                                      // 661
                return results;                                                                                        // 662
            }                                                                                                          // 663
        };                                                                                                             // 664
    }                                                                                                                  // 665
                                                                                                                       // 666
    function toInt(argumentForCoercion) {                                                                              // 667
        var coercedNumber = +argumentForCoercion,                                                                      // 668
            value = 0;                                                                                                 // 669
                                                                                                                       // 670
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {                                                          // 671
            if (coercedNumber >= 0) {                                                                                  // 672
                value = Math.floor(coercedNumber);                                                                     // 673
            } else {                                                                                                   // 674
                value = Math.ceil(coercedNumber);                                                                      // 675
            }                                                                                                          // 676
        }                                                                                                              // 677
                                                                                                                       // 678
        return value;                                                                                                  // 679
    }                                                                                                                  // 680
                                                                                                                       // 681
    function daysInMonth(year, month) {                                                                                // 682
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();                                                    // 683
    }                                                                                                                  // 684
                                                                                                                       // 685
    function weeksInYear(year, dow, doy) {                                                                             // 686
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;                                          // 687
    }                                                                                                                  // 688
                                                                                                                       // 689
    function daysInYear(year) {                                                                                        // 690
        return isLeapYear(year) ? 366 : 365;                                                                           // 691
    }                                                                                                                  // 692
                                                                                                                       // 693
    function isLeapYear(year) {                                                                                        // 694
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;                                               // 695
    }                                                                                                                  // 696
                                                                                                                       // 697
    function checkOverflow(m) {                                                                                        // 698
        var overflow;                                                                                                  // 699
        if (m._a && m._pf.overflow === -2) {                                                                           // 700
            overflow =                                                                                                 // 701
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :                                                          // 702
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :                           // 703
                m._a[HOUR] < 0 || m._a[HOUR] > 24 ||                                                                   // 704
                    (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 ||                                                       // 705
                                           m._a[SECOND] !== 0 ||                                                       // 706
                                           m._a[MILLISECOND] !== 0)) ? HOUR :                                          // 707
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :                                                       // 708
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :                                                       // 709
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :                                       // 710
                -1;                                                                                                    // 711
                                                                                                                       // 712
            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {                                    // 713
                overflow = DATE;                                                                                       // 714
            }                                                                                                          // 715
                                                                                                                       // 716
            m._pf.overflow = overflow;                                                                                 // 717
        }                                                                                                              // 718
    }                                                                                                                  // 719
                                                                                                                       // 720
    function isValid(m) {                                                                                              // 721
        if (m._isValid == null) {                                                                                      // 722
            m._isValid = !isNaN(m._d.getTime()) &&                                                                     // 723
                m._pf.overflow < 0 &&                                                                                  // 724
                !m._pf.empty &&                                                                                        // 725
                !m._pf.invalidMonth &&                                                                                 // 726
                !m._pf.nullInput &&                                                                                    // 727
                !m._pf.invalidFormat &&                                                                                // 728
                !m._pf.userInvalidated;                                                                                // 729
                                                                                                                       // 730
            if (m._strict) {                                                                                           // 731
                m._isValid = m._isValid &&                                                                             // 732
                    m._pf.charsLeftOver === 0 &&                                                                       // 733
                    m._pf.unusedTokens.length === 0 &&                                                                 // 734
                    m._pf.bigHour === undefined;                                                                       // 735
            }                                                                                                          // 736
        }                                                                                                              // 737
        return m._isValid;                                                                                             // 738
    }                                                                                                                  // 739
                                                                                                                       // 740
    function normalizeLocale(key) {                                                                                    // 741
        return key ? key.toLowerCase().replace('_', '-') : key;                                                        // 742
    }                                                                                                                  // 743
                                                                                                                       // 744
    // pick the locale from the array                                                                                  // 745
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each                       // 746
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {                                                                                     // 748
        var i = 0, j, next, locale, split;                                                                             // 749
                                                                                                                       // 750
        while (i < names.length) {                                                                                     // 751
            split = normalizeLocale(names[i]).split('-');                                                              // 752
            j = split.length;                                                                                          // 753
            next = normalizeLocale(names[i + 1]);                                                                      // 754
            next = next ? next.split('-') : null;                                                                      // 755
            while (j > 0) {                                                                                            // 756
                locale = loadLocale(split.slice(0, j).join('-'));                                                      // 757
                if (locale) {                                                                                          // 758
                    return locale;                                                                                     // 759
                }                                                                                                      // 760
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {                           // 761
                    //the next array item is better than a shallower substring of this one                             // 762
                    break;                                                                                             // 763
                }                                                                                                      // 764
                j--;                                                                                                   // 765
            }                                                                                                          // 766
            i++;                                                                                                       // 767
        }                                                                                                              // 768
        return null;                                                                                                   // 769
    }                                                                                                                  // 770
                                                                                                                       // 771
    function loadLocale(name) {                                                                                        // 772
        var oldLocale = null;                                                                                          // 773
        if (!locales[name] && hasModule) {                                                                             // 774
            try {                                                                                                      // 775
                oldLocale = moment.locale();                                                                           // 776
                require('./locale/' + name);                                                                           // 777
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);                                                                              // 779
            } catch (e) { }                                                                                            // 780
        }                                                                                                              // 781
        return locales[name];                                                                                          // 782
    }                                                                                                                  // 783
                                                                                                                       // 784
    // Return a moment from input, that is local/utc/zone equivalent to model.                                         // 785
    function makeAs(input, model) {                                                                                    // 786
        var res, diff;                                                                                                 // 787
        if (model._isUTC) {                                                                                            // 788
            res = model.clone();                                                                                       // 789
            diff = (moment.isMoment(input) || isDate(input) ?                                                          // 790
                    +input : +moment(input)) - (+res);                                                                 // 791
            // Use low-level api, because this fn is low-level api.                                                    // 792
            res._d.setTime(+res._d + diff);                                                                            // 793
            moment.updateOffset(res, false);                                                                           // 794
            return res;                                                                                                // 795
        } else {                                                                                                       // 796
            return moment(input).local();                                                                              // 797
        }                                                                                                              // 798
    }                                                                                                                  // 799
                                                                                                                       // 800
    /************************************                                                                              // 801
        Locale                                                                                                         // 802
    ************************************/                                                                              // 803
                                                                                                                       // 804
                                                                                                                       // 805
    extend(Locale.prototype, {                                                                                         // 806
                                                                                                                       // 807
        set : function (config) {                                                                                      // 808
            var prop, i;                                                                                               // 809
            for (i in config) {                                                                                        // 810
                prop = config[i];                                                                                      // 811
                if (typeof prop === 'function') {                                                                      // 812
                    this[i] = prop;                                                                                    // 813
                } else {                                                                                               // 814
                    this['_' + i] = prop;                                                                              // 815
                }                                                                                                      // 816
            }                                                                                                          // 817
            // Lenient ordinal parsing accepts just a number in addition to                                            // 818
            // number + (possibly) stuff coming from _ordinalParseLenient.                                             // 819
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);                // 820
        },                                                                                                             // 821
                                                                                                                       // 822
        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),  // 823
        months : function (m) {                                                                                        // 824
            return this._months[m.month()];                                                                            // 825
        },                                                                                                             // 826
                                                                                                                       // 827
        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),                                   // 828
        monthsShort : function (m) {                                                                                   // 829
            return this._monthsShort[m.month()];                                                                       // 830
        },                                                                                                             // 831
                                                                                                                       // 832
        monthsParse : function (monthName, format, strict) {                                                           // 833
            var i, mom, regex;                                                                                         // 834
                                                                                                                       // 835
            if (!this._monthsParse) {                                                                                  // 836
                this._monthsParse = [];                                                                                // 837
                this._longMonthsParse = [];                                                                            // 838
                this._shortMonthsParse = [];                                                                           // 839
            }                                                                                                          // 840
                                                                                                                       // 841
            for (i = 0; i < 12; i++) {                                                                                 // 842
                // make the regex if we don't have it already                                                          // 843
                mom = moment.utc([2000, i]);                                                                           // 844
                if (strict && !this._longMonthsParse[i]) {                                                             // 845
                    this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');     // 846
                    this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                }                                                                                                      // 848
                if (!strict && !this._monthsParse[i]) {                                                                // 849
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');                             // 850
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');                                    // 851
                }                                                                                                      // 852
                // test the regex                                                                                      // 853
                if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {                         // 854
                    return i;                                                                                          // 855
                } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {                  // 856
                    return i;                                                                                          // 857
                } else if (!strict && this._monthsParse[i].test(monthName)) {                                          // 858
                    return i;                                                                                          // 859
                }                                                                                                      // 860
            }                                                                                                          // 861
        },                                                                                                             // 862
                                                                                                                       // 863
        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),                             // 864
        weekdays : function (m) {                                                                                      // 865
            return this._weekdays[m.day()];                                                                            // 866
        },                                                                                                             // 867
                                                                                                                       // 868
        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),                                                     // 869
        weekdaysShort : function (m) {                                                                                 // 870
            return this._weekdaysShort[m.day()];                                                                       // 871
        },                                                                                                             // 872
                                                                                                                       // 873
        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),                                                              // 874
        weekdaysMin : function (m) {                                                                                   // 875
            return this._weekdaysMin[m.day()];                                                                         // 876
        },                                                                                                             // 877
                                                                                                                       // 878
        weekdaysParse : function (weekdayName) {                                                                       // 879
            var i, mom, regex;                                                                                         // 880
                                                                                                                       // 881
            if (!this._weekdaysParse) {                                                                                // 882
                this._weekdaysParse = [];                                                                              // 883
            }                                                                                                          // 884
                                                                                                                       // 885
            for (i = 0; i < 7; i++) {                                                                                  // 886
                // make the regex if we don't have it already                                                          // 887
                if (!this._weekdaysParse[i]) {                                                                         // 888
                    mom = moment([2000, 1]).day(i);                                                                    // 889
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');                                  // 891
                }                                                                                                      // 892
                // test the regex                                                                                      // 893
                if (this._weekdaysParse[i].test(weekdayName)) {                                                        // 894
                    return i;                                                                                          // 895
                }                                                                                                      // 896
            }                                                                                                          // 897
        },                                                                                                             // 898
                                                                                                                       // 899
        _longDateFormat : {                                                                                            // 900
            LTS : 'h:mm:ss A',                                                                                         // 901
            LT : 'h:mm A',                                                                                             // 902
            L : 'MM/DD/YYYY',                                                                                          // 903
            LL : 'MMMM D, YYYY',                                                                                       // 904
            LLL : 'MMMM D, YYYY LT',                                                                                   // 905
            LLLL : 'dddd, MMMM D, YYYY LT'                                                                             // 906
        },                                                                                                             // 907
        longDateFormat : function (key) {                                                                              // 908
            var output = this._longDateFormat[key];                                                                    // 909
            if (!output && this._longDateFormat[key.toUpperCase()]) {                                                  // 910
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {          // 911
                    return val.slice(1);                                                                               // 912
                });                                                                                                    // 913
                this._longDateFormat[key] = output;                                                                    // 914
            }                                                                                                          // 915
            return output;                                                                                             // 916
        },                                                                                                             // 917
                                                                                                                       // 918
        isPM : function (input) {                                                                                      // 919
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays                         // 920
            // Using charAt should be more compatible.                                                                 // 921
            return ((input + '').toLowerCase().charAt(0) === 'p');                                                     // 922
        },                                                                                                             // 923
                                                                                                                       // 924
        _meridiemParse : /[ap]\.?m?\.?/i,                                                                              // 925
        meridiem : function (hours, minutes, isLower) {                                                                // 926
            if (hours > 11) {                                                                                          // 927
                return isLower ? 'pm' : 'PM';                                                                          // 928
            } else {                                                                                                   // 929
                return isLower ? 'am' : 'AM';                                                                          // 930
            }                                                                                                          // 931
        },                                                                                                             // 932
                                                                                                                       // 933
        _calendar : {                                                                                                  // 934
            sameDay : '[Today at] LT',                                                                                 // 935
            nextDay : '[Tomorrow at] LT',                                                                              // 936
            nextWeek : 'dddd [at] LT',                                                                                 // 937
            lastDay : '[Yesterday at] LT',                                                                             // 938
            lastWeek : '[Last] dddd [at] LT',                                                                          // 939
            sameElse : 'L'                                                                                             // 940
        },                                                                                                             // 941
        calendar : function (key, mom, now) {                                                                          // 942
            var output = this._calendar[key];                                                                          // 943
            return typeof output === 'function' ? output.apply(mom, [now]) : output;                                   // 944
        },                                                                                                             // 945
                                                                                                                       // 946
        _relativeTime : {                                                                                              // 947
            future : 'in %s',                                                                                          // 948
            past : '%s ago',                                                                                           // 949
            s : 'a few seconds',                                                                                       // 950
            m : 'a minute',                                                                                            // 951
            mm : '%d minutes',                                                                                         // 952
            h : 'an hour',                                                                                             // 953
            hh : '%d hours',                                                                                           // 954
            d : 'a day',                                                                                               // 955
            dd : '%d days',                                                                                            // 956
            M : 'a month',                                                                                             // 957
            MM : '%d months',                                                                                          // 958
            y : 'a year',                                                                                              // 959
            yy : '%d years'                                                                                            // 960
        },                                                                                                             // 961
                                                                                                                       // 962
        relativeTime : function (number, withoutSuffix, string, isFuture) {                                            // 963
            var output = this._relativeTime[string];                                                                   // 964
            return (typeof output === 'function') ?                                                                    // 965
                output(number, withoutSuffix, string, isFuture) :                                                      // 966
                output.replace(/%d/i, number);                                                                         // 967
        },                                                                                                             // 968
                                                                                                                       // 969
        pastFuture : function (diff, output) {                                                                         // 970
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];                                             // 971
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);                      // 972
        },                                                                                                             // 973
                                                                                                                       // 974
        ordinal : function (number) {                                                                                  // 975
            return this._ordinal.replace('%d', number);                                                                // 976
        },                                                                                                             // 977
        _ordinal : '%d',                                                                                               // 978
        _ordinalParse : /\d{1,2}/,                                                                                     // 979
                                                                                                                       // 980
        preparse : function (string) {                                                                                 // 981
            return string;                                                                                             // 982
        },                                                                                                             // 983
                                                                                                                       // 984
        postformat : function (string) {                                                                               // 985
            return string;                                                                                             // 986
        },                                                                                                             // 987
                                                                                                                       // 988
        week : function (mom) {                                                                                        // 989
            return weekOfYear(mom, this._week.dow, this._week.doy).week;                                               // 990
        },                                                                                                             // 991
                                                                                                                       // 992
        _week : {                                                                                                      // 993
            dow : 0, // Sunday is the first day of the week.                                                           // 994
            doy : 6  // The week that contains Jan 1st is the first week of the year.                                  // 995
        },                                                                                                             // 996
                                                                                                                       // 997
        _invalidDate: 'Invalid date',                                                                                  // 998
        invalidDate: function () {                                                                                     // 999
            return this._invalidDate;                                                                                  // 1000
        }                                                                                                              // 1001
    });                                                                                                                // 1002
                                                                                                                       // 1003
    /************************************                                                                              // 1004
        Formatting                                                                                                     // 1005
    ************************************/                                                                              // 1006
                                                                                                                       // 1007
                                                                                                                       // 1008
    function removeFormattingTokens(input) {                                                                           // 1009
        if (input.match(/\[[\s\S]/)) {                                                                                 // 1010
            return input.replace(/^\[|\]$/g, '');                                                                      // 1011
        }                                                                                                              // 1012
        return input.replace(/\\/g, '');                                                                               // 1013
    }                                                                                                                  // 1014
                                                                                                                       // 1015
    function makeFormatFunction(format) {                                                                              // 1016
        var array = format.match(formattingTokens), i, length;                                                         // 1017
                                                                                                                       // 1018
        for (i = 0, length = array.length; i < length; i++) {                                                          // 1019
            if (formatTokenFunctions[array[i]]) {                                                                      // 1020
                array[i] = formatTokenFunctions[array[i]];                                                             // 1021
            } else {                                                                                                   // 1022
                array[i] = removeFormattingTokens(array[i]);                                                           // 1023
            }                                                                                                          // 1024
        }                                                                                                              // 1025
                                                                                                                       // 1026
        return function (mom) {                                                                                        // 1027
            var output = '';                                                                                           // 1028
            for (i = 0; i < length; i++) {                                                                             // 1029
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];                        // 1030
            }                                                                                                          // 1031
            return output;                                                                                             // 1032
        };                                                                                                             // 1033
    }                                                                                                                  // 1034
                                                                                                                       // 1035
    // format date using native date object                                                                            // 1036
    function formatMoment(m, format) {                                                                                 // 1037
        if (!m.isValid()) {                                                                                            // 1038
            return m.localeData().invalidDate();                                                                       // 1039
        }                                                                                                              // 1040
                                                                                                                       // 1041
        format = expandFormat(format, m.localeData());                                                                 // 1042
                                                                                                                       // 1043
        if (!formatFunctions[format]) {                                                                                // 1044
            formatFunctions[format] = makeFormatFunction(format);                                                      // 1045
        }                                                                                                              // 1046
                                                                                                                       // 1047
        return formatFunctions[format](m);                                                                             // 1048
    }                                                                                                                  // 1049
                                                                                                                       // 1050
    function expandFormat(format, locale) {                                                                            // 1051
        var i = 5;                                                                                                     // 1052
                                                                                                                       // 1053
        function replaceLongDateFormatTokens(input) {                                                                  // 1054
            return locale.longDateFormat(input) || input;                                                              // 1055
        }                                                                                                              // 1056
                                                                                                                       // 1057
        localFormattingTokens.lastIndex = 0;                                                                           // 1058
        while (i >= 0 && localFormattingTokens.test(format)) {                                                         // 1059
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);                               // 1060
            localFormattingTokens.lastIndex = 0;                                                                       // 1061
            i -= 1;                                                                                                    // 1062
        }                                                                                                              // 1063
                                                                                                                       // 1064
        return format;                                                                                                 // 1065
    }                                                                                                                  // 1066
                                                                                                                       // 1067
                                                                                                                       // 1068
    /************************************                                                                              // 1069
        Parsing                                                                                                        // 1070
    ************************************/                                                                              // 1071
                                                                                                                       // 1072
                                                                                                                       // 1073
    // get the regex to find the next token                                                                            // 1074
    function getParseRegexForToken(token, config) {                                                                    // 1075
        var a, strict = config._strict;                                                                                // 1076
        switch (token) {                                                                                               // 1077
        case 'Q':                                                                                                      // 1078
            return parseTokenOneDigit;                                                                                 // 1079
        case 'DDDD':                                                                                                   // 1080
            return parseTokenThreeDigits;                                                                              // 1081
        case 'YYYY':                                                                                                   // 1082
        case 'GGGG':                                                                                                   // 1083
        case 'gggg':                                                                                                   // 1084
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;                                          // 1085
        case 'Y':                                                                                                      // 1086
        case 'G':                                                                                                      // 1087
        case 'g':                                                                                                      // 1088
            return parseTokenSignedNumber;                                                                             // 1089
        case 'YYYYYY':                                                                                                 // 1090
        case 'YYYYY':                                                                                                  // 1091
        case 'GGGGG':                                                                                                  // 1092
        case 'ggggg':                                                                                                  // 1093
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;                                            // 1094
        case 'S':                                                                                                      // 1095
            if (strict) {                                                                                              // 1096
                return parseTokenOneDigit;                                                                             // 1097
            }                                                                                                          // 1098
            /* falls through */                                                                                        // 1099
        case 'SS':                                                                                                     // 1100
            if (strict) {                                                                                              // 1101
                return parseTokenTwoDigits;                                                                            // 1102
            }                                                                                                          // 1103
            /* falls through */                                                                                        // 1104
        case 'SSS':                                                                                                    // 1105
            if (strict) {                                                                                              // 1106
                return parseTokenThreeDigits;                                                                          // 1107
            }                                                                                                          // 1108
            /* falls through */                                                                                        // 1109
        case 'DDD':                                                                                                    // 1110
            return parseTokenOneToThreeDigits;                                                                         // 1111
        case 'MMM':                                                                                                    // 1112
        case 'MMMM':                                                                                                   // 1113
        case 'dd':                                                                                                     // 1114
        case 'ddd':                                                                                                    // 1115
        case 'dddd':                                                                                                   // 1116
            return parseTokenWord;                                                                                     // 1117
        case 'a':                                                                                                      // 1118
        case 'A':                                                                                                      // 1119
            return config._locale._meridiemParse;                                                                      // 1120
        case 'x':                                                                                                      // 1121
            return parseTokenOffsetMs;                                                                                 // 1122
        case 'X':                                                                                                      // 1123
            return parseTokenTimestampMs;                                                                              // 1124
        case 'Z':                                                                                                      // 1125
        case 'ZZ':                                                                                                     // 1126
            return parseTokenTimezone;                                                                                 // 1127
        case 'T':                                                                                                      // 1128
            return parseTokenT;                                                                                        // 1129
        case 'SSSS':                                                                                                   // 1130
            return parseTokenDigits;                                                                                   // 1131
        case 'MM':                                                                                                     // 1132
        case 'DD':                                                                                                     // 1133
        case 'YY':                                                                                                     // 1134
        case 'GG':                                                                                                     // 1135
        case 'gg':                                                                                                     // 1136
        case 'HH':                                                                                                     // 1137
        case 'hh':                                                                                                     // 1138
        case 'mm':                                                                                                     // 1139
        case 'ss':                                                                                                     // 1140
        case 'ww':                                                                                                     // 1141
        case 'WW':                                                                                                     // 1142
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;                                            // 1143
        case 'M':                                                                                                      // 1144
        case 'D':                                                                                                      // 1145
        case 'd':                                                                                                      // 1146
        case 'H':                                                                                                      // 1147
        case 'h':                                                                                                      // 1148
        case 'm':                                                                                                      // 1149
        case 's':                                                                                                      // 1150
        case 'w':                                                                                                      // 1151
        case 'W':                                                                                                      // 1152
        case 'e':                                                                                                      // 1153
        case 'E':                                                                                                      // 1154
            return parseTokenOneOrTwoDigits;                                                                           // 1155
        case 'Do':                                                                                                     // 1156
            return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;                        // 1157
        default :                                                                                                      // 1158
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));                                // 1159
            return a;                                                                                                  // 1160
        }                                                                                                              // 1161
    }                                                                                                                  // 1162
                                                                                                                       // 1163
    function timezoneMinutesFromString(string) {                                                                       // 1164
        string = string || '';                                                                                         // 1165
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),                                              // 1166
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],                                           // 1167
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],                                         // 1168
            minutes = +(parts[1] * 60) + toInt(parts[2]);                                                              // 1169
                                                                                                                       // 1170
        return parts[0] === '+' ? -minutes : minutes;                                                                  // 1171
    }                                                                                                                  // 1172
                                                                                                                       // 1173
    // function to convert string input to date                                                                        // 1174
    function addTimeToArrayFromToken(token, input, config) {                                                           // 1175
        var a, datePartArray = config._a;                                                                              // 1176
                                                                                                                       // 1177
        switch (token) {                                                                                               // 1178
        // QUARTER                                                                                                     // 1179
        case 'Q':                                                                                                      // 1180
            if (input != null) {                                                                                       // 1181
                datePartArray[MONTH] = (toInt(input) - 1) * 3;                                                         // 1182
            }                                                                                                          // 1183
            break;                                                                                                     // 1184
        // MONTH                                                                                                       // 1185
        case 'M' : // fall through to MM                                                                               // 1186
        case 'MM' :                                                                                                    // 1187
            if (input != null) {                                                                                       // 1188
                datePartArray[MONTH] = toInt(input) - 1;                                                               // 1189
            }                                                                                                          // 1190
            break;                                                                                                     // 1191
        case 'MMM' : // fall through to MMMM                                                                           // 1192
        case 'MMMM' :                                                                                                  // 1193
            a = config._locale.monthsParse(input, token, config._strict);                                              // 1194
            // if we didn't find a month name, mark the date as invalid.                                               // 1195
            if (a != null) {                                                                                           // 1196
                datePartArray[MONTH] = a;                                                                              // 1197
            } else {                                                                                                   // 1198
                config._pf.invalidMonth = input;                                                                       // 1199
            }                                                                                                          // 1200
            break;                                                                                                     // 1201
        // DAY OF MONTH                                                                                                // 1202
        case 'D' : // fall through to DD                                                                               // 1203
        case 'DD' :                                                                                                    // 1204
            if (input != null) {                                                                                       // 1205
                datePartArray[DATE] = toInt(input);                                                                    // 1206
            }                                                                                                          // 1207
            break;                                                                                                     // 1208
        case 'Do' :                                                                                                    // 1209
            if (input != null) {                                                                                       // 1210
                datePartArray[DATE] = toInt(parseInt(                                                                  // 1211
                            input.match(/\d{1,2}/)[0], 10));                                                           // 1212
            }                                                                                                          // 1213
            break;                                                                                                     // 1214
        // DAY OF YEAR                                                                                                 // 1215
        case 'DDD' : // fall through to DDDD                                                                           // 1216
        case 'DDDD' :                                                                                                  // 1217
            if (input != null) {                                                                                       // 1218
                config._dayOfYear = toInt(input);                                                                      // 1219
            }                                                                                                          // 1220
                                                                                                                       // 1221
            break;                                                                                                     // 1222
        // YEAR                                                                                                        // 1223
        case 'YY' :                                                                                                    // 1224
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);                                                     // 1225
            break;                                                                                                     // 1226
        case 'YYYY' :                                                                                                  // 1227
        case 'YYYYY' :                                                                                                 // 1228
        case 'YYYYYY' :                                                                                                // 1229
            datePartArray[YEAR] = toInt(input);                                                                        // 1230
            break;                                                                                                     // 1231
        // AM / PM                                                                                                     // 1232
        case 'a' : // fall through to A                                                                                // 1233
        case 'A' :                                                                                                     // 1234
            config._isPm = config._locale.isPM(input);                                                                 // 1235
            break;                                                                                                     // 1236
        // HOUR                                                                                                        // 1237
        case 'h' : // fall through to hh                                                                               // 1238
        case 'hh' :                                                                                                    // 1239
            config._pf.bigHour = true;                                                                                 // 1240
            /* falls through */                                                                                        // 1241
        case 'H' : // fall through to HH                                                                               // 1242
        case 'HH' :                                                                                                    // 1243
            datePartArray[HOUR] = toInt(input);                                                                        // 1244
            break;                                                                                                     // 1245
        // MINUTE                                                                                                      // 1246
        case 'm' : // fall through to mm                                                                               // 1247
        case 'mm' :                                                                                                    // 1248
            datePartArray[MINUTE] = toInt(input);                                                                      // 1249
            break;                                                                                                     // 1250
        // SECOND                                                                                                      // 1251
        case 's' : // fall through to ss                                                                               // 1252
        case 'ss' :                                                                                                    // 1253
            datePartArray[SECOND] = toInt(input);                                                                      // 1254
            break;                                                                                                     // 1255
        // MILLISECOND                                                                                                 // 1256
        case 'S' :                                                                                                     // 1257
        case 'SS' :                                                                                                    // 1258
        case 'SSS' :                                                                                                   // 1259
        case 'SSSS' :                                                                                                  // 1260
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);                                                 // 1261
            break;                                                                                                     // 1262
        // UNIX OFFSET (MILLISECONDS)                                                                                  // 1263
        case 'x':                                                                                                      // 1264
            config._d = new Date(toInt(input));                                                                        // 1265
            break;                                                                                                     // 1266
        // UNIX TIMESTAMP WITH MS                                                                                      // 1267
        case 'X':                                                                                                      // 1268
            config._d = new Date(parseFloat(input) * 1000);                                                            // 1269
            break;                                                                                                     // 1270
        // TIMEZONE                                                                                                    // 1271
        case 'Z' : // fall through to ZZ                                                                               // 1272
        case 'ZZ' :                                                                                                    // 1273
            config._useUTC = true;                                                                                     // 1274
            config._tzm = timezoneMinutesFromString(input);                                                            // 1275
            break;                                                                                                     // 1276
        // WEEKDAY - human                                                                                             // 1277
        case 'dd':                                                                                                     // 1278
        case 'ddd':                                                                                                    // 1279
        case 'dddd':                                                                                                   // 1280
            a = config._locale.weekdaysParse(input);                                                                   // 1281
            // if we didn't get a weekday name, mark the date as invalid                                               // 1282
            if (a != null) {                                                                                           // 1283
                config._w = config._w || {};                                                                           // 1284
                config._w['d'] = a;                                                                                    // 1285
            } else {                                                                                                   // 1286
                config._pf.invalidWeekday = input;                                                                     // 1287
            }                                                                                                          // 1288
            break;                                                                                                     // 1289
        // WEEK, WEEK DAY - numeric                                                                                    // 1290
        case 'w':                                                                                                      // 1291
        case 'ww':                                                                                                     // 1292
        case 'W':                                                                                                      // 1293
        case 'WW':                                                                                                     // 1294
        case 'd':                                                                                                      // 1295
        case 'e':                                                                                                      // 1296
        case 'E':                                                                                                      // 1297
            token = token.substr(0, 1);                                                                                // 1298
            /* falls through */                                                                                        // 1299
        case 'gggg':                                                                                                   // 1300
        case 'GGGG':                                                                                                   // 1301
        case 'GGGGG':                                                                                                  // 1302
            token = token.substr(0, 2);                                                                                // 1303
            if (input) {                                                                                               // 1304
                config._w = config._w || {};                                                                           // 1305
                config._w[token] = toInt(input);                                                                       // 1306
            }                                                                                                          // 1307
            break;                                                                                                     // 1308
        case 'gg':                                                                                                     // 1309
        case 'GG':                                                                                                     // 1310
            config._w = config._w || {};                                                                               // 1311
            config._w[token] = moment.parseTwoDigitYear(input);                                                        // 1312
        }                                                                                                              // 1313
    }                                                                                                                  // 1314
                                                                                                                       // 1315
    function dayOfYearFromWeekInfo(config) {                                                                           // 1316
        var w, weekYear, week, weekday, dow, doy, temp;                                                                // 1317
                                                                                                                       // 1318
        w = config._w;                                                                                                 // 1319
        if (w.GG != null || w.W != null || w.E != null) {                                                              // 1320
            dow = 1;                                                                                                   // 1321
            doy = 4;                                                                                                   // 1322
                                                                                                                       // 1323
            // TODO: We need to take the current isoWeekYear, but that depends on                                      // 1324
            // how we interpret now (local, utc, fixed offset). So create                                              // 1325
            // a now version of current config (take local/utc/offset flags, and                                       // 1326
            // create now).                                                                                            // 1327
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);                                    // 1328
            week = dfl(w.W, 1);                                                                                        // 1329
            weekday = dfl(w.E, 1);                                                                                     // 1330
        } else {                                                                                                       // 1331
            dow = config._locale._week.dow;                                                                            // 1332
            doy = config._locale._week.doy;                                                                            // 1333
                                                                                                                       // 1334
            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);                                // 1335
            week = dfl(w.w, 1);                                                                                        // 1336
                                                                                                                       // 1337
            if (w.d != null) {                                                                                         // 1338
                // weekday -- low day numbers are considered next week                                                 // 1339
                weekday = w.d;                                                                                         // 1340
                if (weekday < dow) {                                                                                   // 1341
                    ++week;                                                                                            // 1342
                }                                                                                                      // 1343
            } else if (w.e != null) {                                                                                  // 1344
                // local weekday -- counting starts from begining of week                                              // 1345
                weekday = w.e + dow;                                                                                   // 1346
            } else {                                                                                                   // 1347
                // default to begining of week                                                                         // 1348
                weekday = dow;                                                                                         // 1349
            }                                                                                                          // 1350
        }                                                                                                              // 1351
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);                                                  // 1352
                                                                                                                       // 1353
        config._a[YEAR] = temp.year;                                                                                   // 1354
        config._dayOfYear = temp.dayOfYear;                                                                            // 1355
    }                                                                                                                  // 1356
                                                                                                                       // 1357
    // convert an array to a date.                                                                                     // 1358
    // the array should mirror the parameters below                                                                    // 1359
    // note: all values past the year are optional and will default to the lowest possible value.                      // 1360
    // [year, month, day , hour, minute, second, millisecond]                                                          // 1361
    function dateFromConfig(config) {                                                                                  // 1362
        var i, date, input = [], currentDate, yearToUse;                                                               // 1363
                                                                                                                       // 1364
        if (config._d) {                                                                                               // 1365
            return;                                                                                                    // 1366
        }                                                                                                              // 1367
                                                                                                                       // 1368
        currentDate = currentDateArray(config);                                                                        // 1369
                                                                                                                       // 1370
        //compute day of the year from weeks and weekdays                                                              // 1371
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {                                        // 1372
            dayOfYearFromWeekInfo(config);                                                                             // 1373
        }                                                                                                              // 1374
                                                                                                                       // 1375
        //if the day of the year is set, figure out what it is                                                         // 1376
        if (config._dayOfYear) {                                                                                       // 1377
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);                                                       // 1378
                                                                                                                       // 1379
            if (config._dayOfYear > daysInYear(yearToUse)) {                                                           // 1380
                config._pf._overflowDayOfYear = true;                                                                  // 1381
            }                                                                                                          // 1382
                                                                                                                       // 1383
            date = makeUTCDate(yearToUse, 0, config._dayOfYear);                                                       // 1384
            config._a[MONTH] = date.getUTCMonth();                                                                     // 1385
            config._a[DATE] = date.getUTCDate();                                                                       // 1386
        }                                                                                                              // 1387
                                                                                                                       // 1388
        // Default to current date.                                                                                    // 1389
        // * if no year, month, day of month are given, default to today                                               // 1390
        // * if day of month is given, default month and year                                                          // 1391
        // * if month is given, default only year                                                                      // 1392
        // * if year is given, don't default anything                                                                  // 1393
        for (i = 0; i < 3 && config._a[i] == null; ++i) {                                                              // 1394
            config._a[i] = input[i] = currentDate[i];                                                                  // 1395
        }                                                                                                              // 1396
                                                                                                                       // 1397
        // Zero out whatever was not defaulted, including time                                                         // 1398
        for (; i < 7; i++) {                                                                                           // 1399
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];                       // 1400
        }                                                                                                              // 1401
                                                                                                                       // 1402
        // Check for 24:00:00.000                                                                                      // 1403
        if (config._a[HOUR] === 24 &&                                                                                  // 1404
                config._a[MINUTE] === 0 &&                                                                             // 1405
                config._a[SECOND] === 0 &&                                                                             // 1406
                config._a[MILLISECOND] === 0) {                                                                        // 1407
            config._nextDay = true;                                                                                    // 1408
            config._a[HOUR] = 0;                                                                                       // 1409
        }                                                                                                              // 1410
                                                                                                                       // 1411
        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);                                      // 1412
        // Apply timezone offset from input. The actual zone can be changed                                            // 1413
        // with parseZone.                                                                                             // 1414
        if (config._tzm != null) {                                                                                     // 1415
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);                                          // 1416
        }                                                                                                              // 1417
                                                                                                                       // 1418
        if (config._nextDay) {                                                                                         // 1419
            config._a[HOUR] = 24;                                                                                      // 1420
        }                                                                                                              // 1421
    }                                                                                                                  // 1422
                                                                                                                       // 1423
    function dateFromObject(config) {                                                                                  // 1424
        var normalizedInput;                                                                                           // 1425
                                                                                                                       // 1426
        if (config._d) {                                                                                               // 1427
            return;                                                                                                    // 1428
        }                                                                                                              // 1429
                                                                                                                       // 1430
        normalizedInput = normalizeObjectUnits(config._i);                                                             // 1431
        config._a = [                                                                                                  // 1432
            normalizedInput.year,                                                                                      // 1433
            normalizedInput.month,                                                                                     // 1434
            normalizedInput.day || normalizedInput.date,                                                               // 1435
            normalizedInput.hour,                                                                                      // 1436
            normalizedInput.minute,                                                                                    // 1437
            normalizedInput.second,                                                                                    // 1438
            normalizedInput.millisecond                                                                                // 1439
        ];                                                                                                             // 1440
                                                                                                                       // 1441
        dateFromConfig(config);                                                                                        // 1442
    }                                                                                                                  // 1443
                                                                                                                       // 1444
    function currentDateArray(config) {                                                                                // 1445
        var now = new Date();                                                                                          // 1446
        if (config._useUTC) {                                                                                          // 1447
            return [                                                                                                   // 1448
                now.getUTCFullYear(),                                                                                  // 1449
                now.getUTCMonth(),                                                                                     // 1450
                now.getUTCDate()                                                                                       // 1451
            ];                                                                                                         // 1452
        } else {                                                                                                       // 1453
            return [now.getFullYear(), now.getMonth(), now.getDate()];                                                 // 1454
        }                                                                                                              // 1455
    }                                                                                                                  // 1456
                                                                                                                       // 1457
    // date from string and format string                                                                              // 1458
    function makeDateFromStringAndFormat(config) {                                                                     // 1459
        if (config._f === moment.ISO_8601) {                                                                           // 1460
            parseISO(config);                                                                                          // 1461
            return;                                                                                                    // 1462
        }                                                                                                              // 1463
                                                                                                                       // 1464
        config._a = [];                                                                                                // 1465
        config._pf.empty = true;                                                                                       // 1466
                                                                                                                       // 1467
        // This array is used to make a Date, either with `new Date` or `Date.UTC`                                     // 1468
        var string = '' + config._i,                                                                                   // 1469
            i, parsedInput, tokens, token, skipped,                                                                    // 1470
            stringLength = string.length,                                                                              // 1471
            totalParsedInputLength = 0;                                                                                // 1472
                                                                                                                       // 1473
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];                                // 1474
                                                                                                                       // 1475
        for (i = 0; i < tokens.length; i++) {                                                                          // 1476
            token = tokens[i];                                                                                         // 1477
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];                               // 1478
            if (parsedInput) {                                                                                         // 1479
                skipped = string.substr(0, string.indexOf(parsedInput));                                               // 1480
                if (skipped.length > 0) {                                                                              // 1481
                    config._pf.unusedInput.push(skipped);                                                              // 1482
                }                                                                                                      // 1483
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);                               // 1484
                totalParsedInputLength += parsedInput.length;                                                          // 1485
            }                                                                                                          // 1486
            // don't parse if it's not a known token                                                                   // 1487
            if (formatTokenFunctions[token]) {                                                                         // 1488
                if (parsedInput) {                                                                                     // 1489
                    config._pf.empty = false;                                                                          // 1490
                }                                                                                                      // 1491
                else {                                                                                                 // 1492
                    config._pf.unusedTokens.push(token);                                                               // 1493
                }                                                                                                      // 1494
                addTimeToArrayFromToken(token, parsedInput, config);                                                   // 1495
            }                                                                                                          // 1496
            else if (config._strict && !parsedInput) {                                                                 // 1497
                config._pf.unusedTokens.push(token);                                                                   // 1498
            }                                                                                                          // 1499
        }                                                                                                              // 1500
                                                                                                                       // 1501
        // add remaining unparsed input length to the string                                                           // 1502
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;                                              // 1503
        if (string.length > 0) {                                                                                       // 1504
            config._pf.unusedInput.push(string);                                                                       // 1505
        }                                                                                                              // 1506
                                                                                                                       // 1507
        // clear _12h flag if hour is <= 12                                                                            // 1508
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {                                                    // 1509
            config._pf.bigHour = undefined;                                                                            // 1510
        }                                                                                                              // 1511
        // handle am pm                                                                                                // 1512
        if (config._isPm && config._a[HOUR] < 12) {                                                                    // 1513
            config._a[HOUR] += 12;                                                                                     // 1514
        }                                                                                                              // 1515
        // if is 12 am, change hours to 0                                                                              // 1516
        if (config._isPm === false && config._a[HOUR] === 12) {                                                        // 1517
            config._a[HOUR] = 0;                                                                                       // 1518
        }                                                                                                              // 1519
        dateFromConfig(config);                                                                                        // 1520
        checkOverflow(config);                                                                                         // 1521
    }                                                                                                                  // 1522
                                                                                                                       // 1523
    function unescapeFormat(s) {                                                                                       // 1524
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {                   // 1525
            return p1 || p2 || p3 || p4;                                                                               // 1526
        });                                                                                                            // 1527
    }                                                                                                                  // 1528
                                                                                                                       // 1529
    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript            // 1530
    function regexpEscape(s) {                                                                                         // 1531
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');                                                            // 1532
    }                                                                                                                  // 1533
                                                                                                                       // 1534
    // date from string and array of format strings                                                                    // 1535
    function makeDateFromStringAndArray(config) {                                                                      // 1536
        var tempConfig,                                                                                                // 1537
            bestMoment,                                                                                                // 1538
                                                                                                                       // 1539
            scoreToBeat,                                                                                               // 1540
            i,                                                                                                         // 1541
            currentScore;                                                                                              // 1542
                                                                                                                       // 1543
        if (config._f.length === 0) {                                                                                  // 1544
            config._pf.invalidFormat = true;                                                                           // 1545
            config._d = new Date(NaN);                                                                                 // 1546
            return;                                                                                                    // 1547
        }                                                                                                              // 1548
                                                                                                                       // 1549
        for (i = 0; i < config._f.length; i++) {                                                                       // 1550
            currentScore = 0;                                                                                          // 1551
            tempConfig = copyConfig({}, config);                                                                       // 1552
            if (config._useUTC != null) {                                                                              // 1553
                tempConfig._useUTC = config._useUTC;                                                                   // 1554
            }                                                                                                          // 1555
            tempConfig._pf = defaultParsingFlags();                                                                    // 1556
            tempConfig._f = config._f[i];                                                                              // 1557
            makeDateFromStringAndFormat(tempConfig);                                                                   // 1558
                                                                                                                       // 1559
            if (!isValid(tempConfig)) {                                                                                // 1560
                continue;                                                                                              // 1561
            }                                                                                                          // 1562
                                                                                                                       // 1563
            // if there is any input that was not parsed add a penalty for that format                                 // 1564
            currentScore += tempConfig._pf.charsLeftOver;                                                              // 1565
                                                                                                                       // 1566
            //or tokens                                                                                                // 1567
            currentScore += tempConfig._pf.unusedTokens.length * 10;                                                   // 1568
                                                                                                                       // 1569
            tempConfig._pf.score = currentScore;                                                                       // 1570
                                                                                                                       // 1571
            if (scoreToBeat == null || currentScore < scoreToBeat) {                                                   // 1572
                scoreToBeat = currentScore;                                                                            // 1573
                bestMoment = tempConfig;                                                                               // 1574
            }                                                                                                          // 1575
        }                                                                                                              // 1576
                                                                                                                       // 1577
        extend(config, bestMoment || tempConfig);                                                                      // 1578
    }                                                                                                                  // 1579
                                                                                                                       // 1580
    // date from iso format                                                                                            // 1581
    function parseISO(config) {                                                                                        // 1582
        var i, l,                                                                                                      // 1583
            string = config._i,                                                                                        // 1584
            match = isoRegex.exec(string);                                                                             // 1585
                                                                                                                       // 1586
        if (match) {                                                                                                   // 1587
            config._pf.iso = true;                                                                                     // 1588
            for (i = 0, l = isoDates.length; i < l; i++) {                                                             // 1589
                if (isoDates[i][1].exec(string)) {                                                                     // 1590
                    // match[5] should be 'T' or undefined                                                             // 1591
                    config._f = isoDates[i][0] + (match[6] || ' ');                                                    // 1592
                    break;                                                                                             // 1593
                }                                                                                                      // 1594
            }                                                                                                          // 1595
            for (i = 0, l = isoTimes.length; i < l; i++) {                                                             // 1596
                if (isoTimes[i][1].exec(string)) {                                                                     // 1597
                    config._f += isoTimes[i][0];                                                                       // 1598
                    break;                                                                                             // 1599
                }                                                                                                      // 1600
            }                                                                                                          // 1601
            if (string.match(parseTokenTimezone)) {                                                                    // 1602
                config._f += 'Z';                                                                                      // 1603
            }                                                                                                          // 1604
            makeDateFromStringAndFormat(config);                                                                       // 1605
        } else {                                                                                                       // 1606
            config._isValid = false;                                                                                   // 1607
        }                                                                                                              // 1608
    }                                                                                                                  // 1609
                                                                                                                       // 1610
    // date from iso format or fallback                                                                                // 1611
    function makeDateFromString(config) {                                                                              // 1612
        parseISO(config);                                                                                              // 1613
        if (config._isValid === false) {                                                                               // 1614
            delete config._isValid;                                                                                    // 1615
            moment.createFromInputFallback(config);                                                                    // 1616
        }                                                                                                              // 1617
    }                                                                                                                  // 1618
                                                                                                                       // 1619
    function map(arr, fn) {                                                                                            // 1620
        var res = [], i;                                                                                               // 1621
        for (i = 0; i < arr.length; ++i) {                                                                             // 1622
            res.push(fn(arr[i], i));                                                                                   // 1623
        }                                                                                                              // 1624
        return res;                                                                                                    // 1625
    }                                                                                                                  // 1626
                                                                                                                       // 1627
    function makeDateFromInput(config) {                                                                               // 1628
        var input = config._i, matched;                                                                                // 1629
        if (input === undefined) {                                                                                     // 1630
            config._d = new Date();                                                                                    // 1631
        } else if (isDate(input)) {                                                                                    // 1632
            config._d = new Date(+input);                                                                              // 1633
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {                                                 // 1634
            config._d = new Date(+matched[1]);                                                                         // 1635
        } else if (typeof input === 'string') {                                                                        // 1636
            makeDateFromString(config);                                                                                // 1637
        } else if (isArray(input)) {                                                                                   // 1638
            config._a = map(input.slice(0), function (obj) {                                                           // 1639
                return parseInt(obj, 10);                                                                              // 1640
            });                                                                                                        // 1641
            dateFromConfig(config);                                                                                    // 1642
        } else if (typeof(input) === 'object') {                                                                       // 1643
            dateFromObject(config);                                                                                    // 1644
        } else if (typeof(input) === 'number') {                                                                       // 1645
            // from milliseconds                                                                                       // 1646
            config._d = new Date(input);                                                                               // 1647
        } else {                                                                                                       // 1648
            moment.createFromInputFallback(config);                                                                    // 1649
        }                                                                                                              // 1650
    }                                                                                                                  // 1651
                                                                                                                       // 1652
    function makeDate(y, m, d, h, M, s, ms) {                                                                          // 1653
        //can't just apply() to create a date:                                                                         // 1654
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);                                                                     // 1656
                                                                                                                       // 1657
        //the date constructor doesn't accept years < 1970                                                             // 1658
        if (y < 1970) {                                                                                                // 1659
            date.setFullYear(y);                                                                                       // 1660
        }                                                                                                              // 1661
        return date;                                                                                                   // 1662
    }                                                                                                                  // 1663
                                                                                                                       // 1664
    function makeUTCDate(y) {                                                                                          // 1665
        var date = new Date(Date.UTC.apply(null, arguments));                                                          // 1666
        if (y < 1970) {                                                                                                // 1667
            date.setUTCFullYear(y);                                                                                    // 1668
        }                                                                                                              // 1669
        return date;                                                                                                   // 1670
    }                                                                                                                  // 1671
                                                                                                                       // 1672
    function parseWeekday(input, locale) {                                                                             // 1673
        if (typeof input === 'string') {                                                                               // 1674
            if (!isNaN(input)) {                                                                                       // 1675
                input = parseInt(input, 10);                                                                           // 1676
            }                                                                                                          // 1677
            else {                                                                                                     // 1678
                input = locale.weekdaysParse(input);                                                                   // 1679
                if (typeof input !== 'number') {                                                                       // 1680
                    return null;                                                                                       // 1681
                }                                                                                                      // 1682
            }                                                                                                          // 1683
        }                                                                                                              // 1684
        return input;                                                                                                  // 1685
    }                                                                                                                  // 1686
                                                                                                                       // 1687
    /************************************                                                                              // 1688
        Relative Time                                                                                                  // 1689
    ************************************/                                                                              // 1690
                                                                                                                       // 1691
                                                                                                                       // 1692
    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize                          // 1693
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {                                      // 1694
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);                                    // 1695
    }                                                                                                                  // 1696
                                                                                                                       // 1697
    function relativeTime(posNegDuration, withoutSuffix, locale) {                                                     // 1698
        var duration = moment.duration(posNegDuration).abs(),                                                          // 1699
            seconds = round(duration.as('s')),                                                                         // 1700
            minutes = round(duration.as('m')),                                                                         // 1701
            hours = round(duration.as('h')),                                                                           // 1702
            days = round(duration.as('d')),                                                                            // 1703
            months = round(duration.as('M')),                                                                          // 1704
            years = round(duration.as('y')),                                                                           // 1705
                                                                                                                       // 1706
            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||                                             // 1707
                minutes === 1 && ['m'] ||                                                                              // 1708
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||                                               // 1709
                hours === 1 && ['h'] ||                                                                                // 1710
                hours < relativeTimeThresholds.h && ['hh', hours] ||                                                   // 1711
                days === 1 && ['d'] ||                                                                                 // 1712
                days < relativeTimeThresholds.d && ['dd', days] ||                                                     // 1713
                months === 1 && ['M'] ||                                                                               // 1714
                months < relativeTimeThresholds.M && ['MM', months] ||                                                 // 1715
                years === 1 && ['y'] || ['yy', years];                                                                 // 1716
                                                                                                                       // 1717
        args[2] = withoutSuffix;                                                                                       // 1718
        args[3] = +posNegDuration > 0;                                                                                 // 1719
        args[4] = locale;                                                                                              // 1720
        return substituteTimeAgo.apply({}, args);                                                                      // 1721
    }                                                                                                                  // 1722
                                                                                                                       // 1723
                                                                                                                       // 1724
    /************************************                                                                              // 1725
        Week of Year                                                                                                   // 1726
    ************************************/                                                                              // 1727
                                                                                                                       // 1728
                                                                                                                       // 1729
    // firstDayOfWeek       0 = sun, 6 = sat                                                                           // 1730
    //                      the day of the week that starts the week                                                   // 1731
    //                      (usually sunday or monday)                                                                 // 1732
    // firstDayOfWeekOfYear 0 = sun, 6 = sat                                                                           // 1733
    //                      the first week is the week that contains the first                                         // 1734
    //                      of this day of the week                                                                    // 1735
    //                      (eg. ISO weeks use thursday (4))                                                           // 1736
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {                                                   // 1737
        var end = firstDayOfWeekOfYear - firstDayOfWeek,                                                               // 1738
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),                                                        // 1739
            adjustedMoment;                                                                                            // 1740
                                                                                                                       // 1741
                                                                                                                       // 1742
        if (daysToDayOfWeek > end) {                                                                                   // 1743
            daysToDayOfWeek -= 7;                                                                                      // 1744
        }                                                                                                              // 1745
                                                                                                                       // 1746
        if (daysToDayOfWeek < end - 7) {                                                                               // 1747
            daysToDayOfWeek += 7;                                                                                      // 1748
        }                                                                                                              // 1749
                                                                                                                       // 1750
        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');                                                        // 1751
        return {                                                                                                       // 1752
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),                                                           // 1753
            year: adjustedMoment.year()                                                                                // 1754
        };                                                                                                             // 1755
    }                                                                                                                  // 1756
                                                                                                                       // 1757
    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday          // 1758
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {                           // 1759
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;                                             // 1760
                                                                                                                       // 1761
        d = d === 0 ? 7 : d;                                                                                           // 1762
        weekday = weekday != null ? weekday : firstDayOfWeek;                                                          // 1763
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);            // 1764
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;                                       // 1765
                                                                                                                       // 1766
        return {                                                                                                       // 1767
            year: dayOfYear > 0 ? year : year - 1,                                                                     // 1768
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear                                   // 1769
        };                                                                                                             // 1770
    }                                                                                                                  // 1771
                                                                                                                       // 1772
    /************************************                                                                              // 1773
        Top Level Functions                                                                                            // 1774
    ************************************/                                                                              // 1775
                                                                                                                       // 1776
    function makeMoment(config) {                                                                                      // 1777
        var input = config._i,                                                                                         // 1778
            format = config._f,                                                                                        // 1779
            res;                                                                                                       // 1780
                                                                                                                       // 1781
        config._locale = config._locale || moment.localeData(config._l);                                               // 1782
                                                                                                                       // 1783
        if (input === null || (format === undefined && input === '')) {                                                // 1784
            return moment.invalid({nullInput: true});                                                                  // 1785
        }                                                                                                              // 1786
                                                                                                                       // 1787
        if (typeof input === 'string') {                                                                               // 1788
            config._i = input = config._locale.preparse(input);                                                        // 1789
        }                                                                                                              // 1790
                                                                                                                       // 1791
        if (moment.isMoment(input)) {                                                                                  // 1792
            return new Moment(input, true);                                                                            // 1793
        } else if (format) {                                                                                           // 1794
            if (isArray(format)) {                                                                                     // 1795
                makeDateFromStringAndArray(config);                                                                    // 1796
            } else {                                                                                                   // 1797
                makeDateFromStringAndFormat(config);                                                                   // 1798
            }                                                                                                          // 1799
        } else {                                                                                                       // 1800
            makeDateFromInput(config);                                                                                 // 1801
        }                                                                                                              // 1802
                                                                                                                       // 1803
        res = new Moment(config);                                                                                      // 1804
        if (res._nextDay) {                                                                                            // 1805
            // Adding is smart enough around DST                                                                       // 1806
            res.add(1, 'd');                                                                                           // 1807
            res._nextDay = undefined;                                                                                  // 1808
        }                                                                                                              // 1809
                                                                                                                       // 1810
        return res;                                                                                                    // 1811
    }                                                                                                                  // 1812
                                                                                                                       // 1813
    moment = function (input, format, locale, strict) {                                                                // 1814
        var c;                                                                                                         // 1815
                                                                                                                       // 1816
        if (typeof(locale) === 'boolean') {                                                                            // 1817
            strict = locale;                                                                                           // 1818
            locale = undefined;                                                                                        // 1819
        }                                                                                                              // 1820
        // object construction must be done this way.                                                                  // 1821
        // https://github.com/moment/moment/issues/1423                                                                // 1822
        c = {};                                                                                                        // 1823
        c._isAMomentObject = true;                                                                                     // 1824
        c._i = input;                                                                                                  // 1825
        c._f = format;                                                                                                 // 1826
        c._l = locale;                                                                                                 // 1827
        c._strict = strict;                                                                                            // 1828
        c._isUTC = false;                                                                                              // 1829
        c._pf = defaultParsingFlags();                                                                                 // 1830
                                                                                                                       // 1831
        return makeMoment(c);                                                                                          // 1832
    };                                                                                                                 // 1833
                                                                                                                       // 1834
    moment.suppressDeprecationWarnings = false;                                                                        // 1835
                                                                                                                       // 1836
    moment.createFromInputFallback = deprecate(                                                                        // 1837
        'moment construction falls back to js Date. This is ' +                                                        // 1838
        'discouraged and will be removed in upcoming major ' +                                                         // 1839
        'release. Please refer to ' +                                                                                  // 1840
        'https://github.com/moment/moment/issues/1407 for more info.',                                                 // 1841
        function (config) {                                                                                            // 1842
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));                                          // 1843
        }                                                                                                              // 1844
    );                                                                                                                 // 1845
                                                                                                                       // 1846
    // Pick a moment m from moments so that m[fn](other) is true for all                                               // 1847
    // other. This relies on the function fn to be transitive.                                                         // 1848
    //                                                                                                                 // 1849
    // moments should either be an array of moment objects or an array, whose                                          // 1850
    // first element is an array of moment objects.                                                                    // 1851
    function pickBy(fn, moments) {                                                                                     // 1852
        var res, i;                                                                                                    // 1853
        if (moments.length === 1 && isArray(moments[0])) {                                                             // 1854
            moments = moments[0];                                                                                      // 1855
        }                                                                                                              // 1856
        if (!moments.length) {                                                                                         // 1857
            return moment();                                                                                           // 1858
        }                                                                                                              // 1859
        res = moments[0];                                                                                              // 1860
        for (i = 1; i < moments.length; ++i) {                                                                         // 1861
            if (moments[i][fn](res)) {                                                                                 // 1862
                res = moments[i];                                                                                      // 1863
            }                                                                                                          // 1864
        }                                                                                                              // 1865
        return res;                                                                                                    // 1866
    }                                                                                                                  // 1867
                                                                                                                       // 1868
    moment.min = function () {                                                                                         // 1869
        var args = [].slice.call(arguments, 0);                                                                        // 1870
                                                                                                                       // 1871
        return pickBy('isBefore', args);                                                                               // 1872
    };                                                                                                                 // 1873
                                                                                                                       // 1874
    moment.max = function () {                                                                                         // 1875
        var args = [].slice.call(arguments, 0);                                                                        // 1876
                                                                                                                       // 1877
        return pickBy('isAfter', args);                                                                                // 1878
    };                                                                                                                 // 1879
                                                                                                                       // 1880
    // creating with utc                                                                                               // 1881
    moment.utc = function (input, format, locale, strict) {                                                            // 1882
        var c;                                                                                                         // 1883
                                                                                                                       // 1884
        if (typeof(locale) === 'boolean') {                                                                            // 1885
            strict = locale;                                                                                           // 1886
            locale = undefined;                                                                                        // 1887
        }                                                                                                              // 1888
        // object construction must be done this way.                                                                  // 1889
        // https://github.com/moment/moment/issues/1423                                                                // 1890
        c = {};                                                                                                        // 1891
        c._isAMomentObject = true;                                                                                     // 1892
        c._useUTC = true;                                                                                              // 1893
        c._isUTC = true;                                                                                               // 1894
        c._l = locale;                                                                                                 // 1895
        c._i = input;                                                                                                  // 1896
        c._f = format;                                                                                                 // 1897
        c._strict = strict;                                                                                            // 1898
        c._pf = defaultParsingFlags();                                                                                 // 1899
                                                                                                                       // 1900
        return makeMoment(c).utc();                                                                                    // 1901
    };                                                                                                                 // 1902
                                                                                                                       // 1903
    // creating with unix timestamp (in seconds)                                                                       // 1904
    moment.unix = function (input) {                                                                                   // 1905
        return moment(input * 1000);                                                                                   // 1906
    };                                                                                                                 // 1907
                                                                                                                       // 1908
    // duration                                                                                                        // 1909
    moment.duration = function (input, key) {                                                                          // 1910
        var duration = input,                                                                                          // 1911
            // matching against regexp is expensive, do it on demand                                                   // 1912
            match = null,                                                                                              // 1913
            sign,                                                                                                      // 1914
            ret,                                                                                                       // 1915
            parseIso,                                                                                                  // 1916
            diffRes;                                                                                                   // 1917
                                                                                                                       // 1918
        if (moment.isDuration(input)) {                                                                                // 1919
            duration = {                                                                                               // 1920
                ms: input._milliseconds,                                                                               // 1921
                d: input._days,                                                                                        // 1922
                M: input._months                                                                                       // 1923
            };                                                                                                         // 1924
        } else if (typeof input === 'number') {                                                                        // 1925
            duration = {};                                                                                             // 1926
            if (key) {                                                                                                 // 1927
                duration[key] = input;                                                                                 // 1928
            } else {                                                                                                   // 1929
                duration.milliseconds = input;                                                                         // 1930
            }                                                                                                          // 1931
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {                                                  // 1932
            sign = (match[1] === '-') ? -1 : 1;                                                                        // 1933
            duration = {                                                                                               // 1934
                y: 0,                                                                                                  // 1935
                d: toInt(match[DATE]) * sign,                                                                          // 1936
                h: toInt(match[HOUR]) * sign,                                                                          // 1937
                m: toInt(match[MINUTE]) * sign,                                                                        // 1938
                s: toInt(match[SECOND]) * sign,                                                                        // 1939
                ms: toInt(match[MILLISECOND]) * sign                                                                   // 1940
            };                                                                                                         // 1941
        } else if (!!(match = isoDurationRegex.exec(input))) {                                                         // 1942
            sign = (match[1] === '-') ? -1 : 1;                                                                        // 1943
            parseIso = function (inp) {                                                                                // 1944
                // We'd normally use ~~inp for this, but unfortunately it also                                         // 1945
                // converts floats to ints.                                                                            // 1946
                // inp may be undefined, so careful calling replace on it.                                             // 1947
                var res = inp && parseFloat(inp.replace(',', '.'));                                                    // 1948
                // apply sign while we're at it                                                                        // 1949
                return (isNaN(res) ? 0 : res) * sign;                                                                  // 1950
            };                                                                                                         // 1951
            duration = {                                                                                               // 1952
                y: parseIso(match[2]),                                                                                 // 1953
                M: parseIso(match[3]),                                                                                 // 1954
                d: parseIso(match[4]),                                                                                 // 1955
                h: parseIso(match[5]),                                                                                 // 1956
                m: parseIso(match[6]),                                                                                 // 1957
                s: parseIso(match[7]),                                                                                 // 1958
                w: parseIso(match[8])                                                                                  // 1959
            };                                                                                                         // 1960
        } else if (typeof duration === 'object' &&                                                                     // 1961
                ('from' in duration || 'to' in duration)) {                                                            // 1962
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));                                   // 1963
                                                                                                                       // 1964
            duration = {};                                                                                             // 1965
            duration.ms = diffRes.milliseconds;                                                                        // 1966
            duration.M = diffRes.months;                                                                               // 1967
        }                                                                                                              // 1968
                                                                                                                       // 1969
        ret = new Duration(duration);                                                                                  // 1970
                                                                                                                       // 1971
        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {                                                // 1972
            ret._locale = input._locale;                                                                               // 1973
        }                                                                                                              // 1974
                                                                                                                       // 1975
        return ret;                                                                                                    // 1976
    };                                                                                                                 // 1977
                                                                                                                       // 1978
    // version number                                                                                                  // 1979
    moment.version = VERSION;                                                                                          // 1980
                                                                                                                       // 1981
    // default format                                                                                                  // 1982
    moment.defaultFormat = isoFormat;                                                                                  // 1983
                                                                                                                       // 1984
    // constant that refers to the ISO standard                                                                        // 1985
    moment.ISO_8601 = function () {};                                                                                  // 1986
                                                                                                                       // 1987
    // Plugins that add properties should also add the key here (null value),                                          // 1988
    // so we can properly clone ourselves.                                                                             // 1989
    moment.momentProperties = momentProperties;                                                                        // 1990
                                                                                                                       // 1991
    // This function will be called whenever a moment is mutated.                                                      // 1992
    // It is intended to keep the offset in sync with the timezone.                                                    // 1993
    moment.updateOffset = function () {};                                                                              // 1994
                                                                                                                       // 1995
    // This function allows you to set a threshold for relative time strings                                           // 1996
    moment.relativeTimeThreshold = function (threshold, limit) {                                                       // 1997
        if (relativeTimeThresholds[threshold] === undefined) {                                                         // 1998
            return false;                                                                                              // 1999
        }                                                                                                              // 2000
        if (limit === undefined) {                                                                                     // 2001
            return relativeTimeThresholds[threshold];                                                                  // 2002
        }                                                                                                              // 2003
        relativeTimeThresholds[threshold] = limit;                                                                     // 2004
        return true;                                                                                                   // 2005
    };                                                                                                                 // 2006
                                                                                                                       // 2007
    moment.lang = deprecate(                                                                                           // 2008
        'moment.lang is deprecated. Use moment.locale instead.',                                                       // 2009
        function (key, value) {                                                                                        // 2010
            return moment.locale(key, value);                                                                          // 2011
        }                                                                                                              // 2012
    );                                                                                                                 // 2013
                                                                                                                       // 2014
    // This function will load locale and then set the global locale.  If                                              // 2015
    // no arguments are passed in, it will simply return the current global                                            // 2016
    // locale key.                                                                                                     // 2017
    moment.locale = function (key, values) {                                                                           // 2018
        var data;                                                                                                      // 2019
        if (key) {                                                                                                     // 2020
            if (typeof(values) !== 'undefined') {                                                                      // 2021
                data = moment.defineLocale(key, values);                                                               // 2022
            }                                                                                                          // 2023
            else {                                                                                                     // 2024
                data = moment.localeData(key);                                                                         // 2025
            }                                                                                                          // 2026
                                                                                                                       // 2027
            if (data) {                                                                                                // 2028
                moment.duration._locale = moment._locale = data;                                                       // 2029
            }                                                                                                          // 2030
        }                                                                                                              // 2031
                                                                                                                       // 2032
        return moment._locale._abbr;                                                                                   // 2033
    };                                                                                                                 // 2034
                                                                                                                       // 2035
    moment.defineLocale = function (name, values) {                                                                    // 2036
        if (values !== null) {                                                                                         // 2037
            values.abbr = name;                                                                                        // 2038
            if (!locales[name]) {                                                                                      // 2039
                locales[name] = new Locale();                                                                          // 2040
            }                                                                                                          // 2041
            locales[name].set(values);                                                                                 // 2042
                                                                                                                       // 2043
            // backwards compat for now: also set the locale                                                           // 2044
            moment.locale(name);                                                                                       // 2045
                                                                                                                       // 2046
            return locales[name];                                                                                      // 2047
        } else {                                                                                                       // 2048
            // useful for testing                                                                                      // 2049
            delete locales[name];                                                                                      // 2050
            return null;                                                                                               // 2051
        }                                                                                                              // 2052
    };                                                                                                                 // 2053
                                                                                                                       // 2054
    moment.langData = deprecate(                                                                                       // 2055
        'moment.langData is deprecated. Use moment.localeData instead.',                                               // 2056
        function (key) {                                                                                               // 2057
            return moment.localeData(key);                                                                             // 2058
        }                                                                                                              // 2059
    );                                                                                                                 // 2060
                                                                                                                       // 2061
    // returns locale data                                                                                             // 2062
    moment.localeData = function (key) {                                                                               // 2063
        var locale;                                                                                                    // 2064
                                                                                                                       // 2065
        if (key && key._locale && key._locale._abbr) {                                                                 // 2066
            key = key._locale._abbr;                                                                                   // 2067
        }                                                                                                              // 2068
                                                                                                                       // 2069
        if (!key) {                                                                                                    // 2070
            return moment._locale;                                                                                     // 2071
        }                                                                                                              // 2072
                                                                                                                       // 2073
        if (!isArray(key)) {                                                                                           // 2074
            //short-circuit everything else                                                                            // 2075
            locale = loadLocale(key);                                                                                  // 2076
            if (locale) {                                                                                              // 2077
                return locale;                                                                                         // 2078
            }                                                                                                          // 2079
            key = [key];                                                                                               // 2080
        }                                                                                                              // 2081
                                                                                                                       // 2082
        return chooseLocale(key);                                                                                      // 2083
    };                                                                                                                 // 2084
                                                                                                                       // 2085
    // compare moment object                                                                                           // 2086
    moment.isMoment = function (obj) {                                                                                 // 2087
        return obj instanceof Moment ||                                                                                // 2088
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));                                                      // 2089
    };                                                                                                                 // 2090
                                                                                                                       // 2091
    // for typechecking Duration objects                                                                               // 2092
    moment.isDuration = function (obj) {                                                                               // 2093
        return obj instanceof Duration;                                                                                // 2094
    };                                                                                                                 // 2095
                                                                                                                       // 2096
    for (i = lists.length - 1; i >= 0; --i) {                                                                          // 2097
        makeList(lists[i]);                                                                                            // 2098
    }                                                                                                                  // 2099
                                                                                                                       // 2100
    moment.normalizeUnits = function (units) {                                                                         // 2101
        return normalizeUnits(units);                                                                                  // 2102
    };                                                                                                                 // 2103
                                                                                                                       // 2104
    moment.invalid = function (flags) {                                                                                // 2105
        var m = moment.utc(NaN);                                                                                       // 2106
        if (flags != null) {                                                                                           // 2107
            extend(m._pf, flags);                                                                                      // 2108
        }                                                                                                              // 2109
        else {                                                                                                         // 2110
            m._pf.userInvalidated = true;                                                                              // 2111
        }                                                                                                              // 2112
                                                                                                                       // 2113
        return m;                                                                                                      // 2114
    };                                                                                                                 // 2115
                                                                                                                       // 2116
    moment.parseZone = function () {                                                                                   // 2117
        return moment.apply(null, arguments).parseZone();                                                              // 2118
    };                                                                                                                 // 2119
                                                                                                                       // 2120
    moment.parseTwoDigitYear = function (input) {                                                                      // 2121
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);                                                       // 2122
    };                                                                                                                 // 2123
                                                                                                                       // 2124
    /************************************                                                                              // 2125
        Moment Prototype                                                                                               // 2126
    ************************************/                                                                              // 2127
                                                                                                                       // 2128
                                                                                                                       // 2129
    extend(moment.fn = Moment.prototype, {                                                                             // 2130
                                                                                                                       // 2131
        clone : function () {                                                                                          // 2132
            return moment(this);                                                                                       // 2133
        },                                                                                                             // 2134
                                                                                                                       // 2135
        valueOf : function () {                                                                                        // 2136
            return +this._d + ((this._offset || 0) * 60000);                                                           // 2137
        },                                                                                                             // 2138
                                                                                                                       // 2139
        unix : function () {                                                                                           // 2140
            return Math.floor(+this / 1000);                                                                           // 2141
        },                                                                                                             // 2142
                                                                                                                       // 2143
        toString : function () {                                                                                       // 2144
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');                               // 2145
        },                                                                                                             // 2146
                                                                                                                       // 2147
        toDate : function () {                                                                                         // 2148
            return this._offset ? new Date(+this) : this._d;                                                           // 2149
        },                                                                                                             // 2150
                                                                                                                       // 2151
        toISOString : function () {                                                                                    // 2152
            var m = moment(this).utc();                                                                                // 2153
            if (0 < m.year() && m.year() <= 9999) {                                                                    // 2154
                if ('function' === typeof Date.prototype.toISOString) {                                                // 2155
                    // native implementation is ~50x faster, use it when we can                                        // 2156
                    return this.toDate().toISOString();                                                                // 2157
                } else {                                                                                               // 2158
                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');                                            // 2159
                }                                                                                                      // 2160
            } else {                                                                                                   // 2161
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');                                              // 2162
            }                                                                                                          // 2163
        },                                                                                                             // 2164
                                                                                                                       // 2165
        toArray : function () {                                                                                        // 2166
            var m = this;                                                                                              // 2167
            return [                                                                                                   // 2168
                m.year(),                                                                                              // 2169
                m.month(),                                                                                             // 2170
                m.date(),                                                                                              // 2171
                m.hours(),                                                                                             // 2172
                m.minutes(),                                                                                           // 2173
                m.seconds(),                                                                                           // 2174
                m.milliseconds()                                                                                       // 2175
            ];                                                                                                         // 2176
        },                                                                                                             // 2177
                                                                                                                       // 2178
        isValid : function () {                                                                                        // 2179
            return isValid(this);                                                                                      // 2180
        },                                                                                                             // 2181
                                                                                                                       // 2182
        isDSTShifted : function () {                                                                                   // 2183
            if (this._a) {                                                                                             // 2184
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }                                                                                                          // 2186
                                                                                                                       // 2187
            return false;                                                                                              // 2188
        },                                                                                                             // 2189
                                                                                                                       // 2190
        parsingFlags : function () {                                                                                   // 2191
            return extend({}, this._pf);                                                                               // 2192
        },                                                                                                             // 2193
                                                                                                                       // 2194
        invalidAt: function () {                                                                                       // 2195
            return this._pf.overflow;                                                                                  // 2196
        },                                                                                                             // 2197
                                                                                                                       // 2198
        utc : function (keepLocalTime) {                                                                               // 2199
            return this.zone(0, keepLocalTime);                                                                        // 2200
        },                                                                                                             // 2201
                                                                                                                       // 2202
        local : function (keepLocalTime) {                                                                             // 2203
            if (this._isUTC) {                                                                                         // 2204
                this.zone(0, keepLocalTime);                                                                           // 2205
                this._isUTC = false;                                                                                   // 2206
                                                                                                                       // 2207
                if (keepLocalTime) {                                                                                   // 2208
                    this.add(this._dateTzOffset(), 'm');                                                               // 2209
                }                                                                                                      // 2210
            }                                                                                                          // 2211
            return this;                                                                                               // 2212
        },                                                                                                             // 2213
                                                                                                                       // 2214
        format : function (inputString) {                                                                              // 2215
            var output = formatMoment(this, inputString || moment.defaultFormat);                                      // 2216
            return this.localeData().postformat(output);                                                               // 2217
        },                                                                                                             // 2218
                                                                                                                       // 2219
        add : createAdder(1, 'add'),                                                                                   // 2220
                                                                                                                       // 2221
        subtract : createAdder(-1, 'subtract'),                                                                        // 2222
                                                                                                                       // 2223
        diff : function (input, units, asFloat) {                                                                      // 2224
            var that = makeAs(input, this),                                                                            // 2225
                zoneDiff = (this.zone() - that.zone()) * 6e4,                                                          // 2226
                diff, output, daysAdjust;                                                                              // 2227
                                                                                                                       // 2228
            units = normalizeUnits(units);                                                                             // 2229
                                                                                                                       // 2230
            if (units === 'year' || units === 'month') {                                                               // 2231
                // average number of days in the months in the given dates                                             // 2232
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2                   // 2233
                // difference in months                                                                                // 2234
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());                           // 2235
                // adjust by taking difference in days, average number of days                                         // 2236
                // and dst in the given months.                                                                        // 2237
                daysAdjust = (this - moment(this).startOf('month')) -                                                  // 2238
                    (that - moment(that).startOf('month'));                                                            // 2239
                // same as above but with zones, to negate all dst                                                     // 2240
                daysAdjust -= ((this.zone() - moment(this).startOf('month').zone()) -                                  // 2241
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4;                                   // 2242
                output += daysAdjust / diff;                                                                           // 2243
                if (units === 'year') {                                                                                // 2244
                    output = output / 12;                                                                              // 2245
                }                                                                                                      // 2246
            } else {                                                                                                   // 2247
                diff = (this - that);                                                                                  // 2248
                output = units === 'second' ? diff / 1e3 : // 1000                                                     // 2249
                    units === 'minute' ? diff / 6e4 : // 1000 * 60                                                     // 2250
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60                                                 // 2251
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst                   // 2252
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst             // 2253
                    diff;                                                                                              // 2254
            }                                                                                                          // 2255
            return asFloat ? output : absRound(output);                                                                // 2256
        },                                                                                                             // 2257
                                                                                                                       // 2258
        from : function (time, withoutSuffix) {                                                                        // 2259
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);             // 2260
        },                                                                                                             // 2261
                                                                                                                       // 2262
        fromNow : function (withoutSuffix) {                                                                           // 2263
            return this.from(moment(), withoutSuffix);                                                                 // 2264
        },                                                                                                             // 2265
                                                                                                                       // 2266
        calendar : function (time) {                                                                                   // 2267
            // We want to compare the start of today, vs this.                                                         // 2268
            // Getting start-of-today depends on whether we're zone'd or not.                                          // 2269
            var now = time || moment(),                                                                                // 2270
                sod = makeAs(now, this).startOf('day'),                                                                // 2271
                diff = this.diff(sod, 'days', true),                                                                   // 2272
                format = diff < -6 ? 'sameElse' :                                                                      // 2273
                    diff < -1 ? 'lastWeek' :                                                                           // 2274
                    diff < 0 ? 'lastDay' :                                                                             // 2275
                    diff < 1 ? 'sameDay' :                                                                             // 2276
                    diff < 2 ? 'nextDay' :                                                                             // 2277
                    diff < 7 ? 'nextWeek' : 'sameElse';                                                                // 2278
            return this.format(this.localeData().calendar(format, this, moment(now)));                                 // 2279
        },                                                                                                             // 2280
                                                                                                                       // 2281
        isLeapYear : function () {                                                                                     // 2282
            return isLeapYear(this.year());                                                                            // 2283
        },                                                                                                             // 2284
                                                                                                                       // 2285
        isDST : function () {                                                                                          // 2286
            return (this.zone() < this.clone().month(0).zone() ||                                                      // 2287
                this.zone() < this.clone().month(5).zone());                                                           // 2288
        },                                                                                                             // 2289
                                                                                                                       // 2290
        day : function (input) {                                                                                       // 2291
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();                                            // 2292
            if (input != null) {                                                                                       // 2293
                input = parseWeekday(input, this.localeData());                                                        // 2294
                return this.add(input - day, 'd');                                                                     // 2295
            } else {                                                                                                   // 2296
                return day;                                                                                            // 2297
            }                                                                                                          // 2298
        },                                                                                                             // 2299
                                                                                                                       // 2300
        month : makeAccessor('Month', true),                                                                           // 2301
                                                                                                                       // 2302
        startOf : function (units) {                                                                                   // 2303
            units = normalizeUnits(units);                                                                             // 2304
            // the following switch intentionally omits break keywords                                                 // 2305
            // to utilize falling through the cases.                                                                   // 2306
            switch (units) {                                                                                           // 2307
            case 'year':                                                                                               // 2308
                this.month(0);                                                                                         // 2309
                /* falls through */                                                                                    // 2310
            case 'quarter':                                                                                            // 2311
            case 'month':                                                                                              // 2312
                this.date(1);                                                                                          // 2313
                /* falls through */                                                                                    // 2314
            case 'week':                                                                                               // 2315
            case 'isoWeek':                                                                                            // 2316
            case 'day':                                                                                                // 2317
                this.hours(0);                                                                                         // 2318
                /* falls through */                                                                                    // 2319
            case 'hour':                                                                                               // 2320
                this.minutes(0);                                                                                       // 2321
                /* falls through */                                                                                    // 2322
            case 'minute':                                                                                             // 2323
                this.seconds(0);                                                                                       // 2324
                /* falls through */                                                                                    // 2325
            case 'second':                                                                                             // 2326
                this.milliseconds(0);                                                                                  // 2327
                /* falls through */                                                                                    // 2328
            }                                                                                                          // 2329
                                                                                                                       // 2330
            // weeks are a special case                                                                                // 2331
            if (units === 'week') {                                                                                    // 2332
                this.weekday(0);                                                                                       // 2333
            } else if (units === 'isoWeek') {                                                                          // 2334
                this.isoWeekday(1);                                                                                    // 2335
            }                                                                                                          // 2336
                                                                                                                       // 2337
            // quarters are also special                                                                               // 2338
            if (units === 'quarter') {                                                                                 // 2339
                this.month(Math.floor(this.month() / 3) * 3);                                                          // 2340
            }                                                                                                          // 2341
                                                                                                                       // 2342
            return this;                                                                                               // 2343
        },                                                                                                             // 2344
                                                                                                                       // 2345
        endOf: function (units) {                                                                                      // 2346
            units = normalizeUnits(units);                                                                             // 2347
            if (units === undefined || units === 'millisecond') {                                                      // 2348
                return this;                                                                                           // 2349
            }                                                                                                          // 2350
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');               // 2351
        },                                                                                                             // 2352
                                                                                                                       // 2353
        isAfter: function (input, units) {                                                                             // 2354
            var inputMs;                                                                                               // 2355
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');                              // 2356
            if (units === 'millisecond') {                                                                             // 2357
                input = moment.isMoment(input) ? input : moment(input);                                                // 2358
                return +this > +input;                                                                                 // 2359
            } else {                                                                                                   // 2360
                inputMs = moment.isMoment(input) ? +input : +moment(input);                                            // 2361
                return inputMs < +this.clone().startOf(units);                                                         // 2362
            }                                                                                                          // 2363
        },                                                                                                             // 2364
                                                                                                                       // 2365
        isBefore: function (input, units) {                                                                            // 2366
            var inputMs;                                                                                               // 2367
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');                              // 2368
            if (units === 'millisecond') {                                                                             // 2369
                input = moment.isMoment(input) ? input : moment(input);                                                // 2370
                return +this < +input;                                                                                 // 2371
            } else {                                                                                                   // 2372
                inputMs = moment.isMoment(input) ? +input : +moment(input);                                            // 2373
                return +this.clone().endOf(units) < inputMs;                                                           // 2374
            }                                                                                                          // 2375
        },                                                                                                             // 2376
                                                                                                                       // 2377
        isSame: function (input, units) {                                                                              // 2378
            var inputMs;                                                                                               // 2379
            units = normalizeUnits(units || 'millisecond');                                                            // 2380
            if (units === 'millisecond') {                                                                             // 2381
                input = moment.isMoment(input) ? input : moment(input);                                                // 2382
                return +this === +input;                                                                               // 2383
            } else {                                                                                                   // 2384
                inputMs = +moment(input);                                                                              // 2385
                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));           // 2386
            }                                                                                                          // 2387
        },                                                                                                             // 2388
                                                                                                                       // 2389
        min: deprecate(                                                                                                // 2390
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',   // 2391
                 function (other) {                                                                                    // 2392
                     other = moment.apply(null, arguments);                                                            // 2393
                     return other < this ? this : other;                                                               // 2394
                 }                                                                                                     // 2395
         ),                                                                                                            // 2396
                                                                                                                       // 2397
        max: deprecate(                                                                                                // 2398
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',    // 2399
                function (other) {                                                                                     // 2400
                    other = moment.apply(null, arguments);                                                             // 2401
                    return other > this ? this : other;                                                                // 2402
                }                                                                                                      // 2403
        ),                                                                                                             // 2404
                                                                                                                       // 2405
        // keepLocalTime = true means only change the timezone, without                                                // 2406
        // affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->                                             // 2407
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone                                            // 2408
        // +0200, so we adjust the time as needed, to be valid.                                                        // 2409
        //                                                                                                             // 2410
        // Keeping the time actually adds/subtracts (one hour)                                                         // 2411
        // from the actual represented time. That is why we call updateOffset                                          // 2412
        // a second time. In case it wants us to change the offset again                                               // 2413
        // _changeInProgress == true case, then we have to adjust, because                                             // 2414
        // there is no such time in the given timezone.                                                                // 2415
        zone : function (input, keepLocalTime) {                                                                       // 2416
            var offset = this._offset || 0,                                                                            // 2417
                localAdjust;                                                                                           // 2418
            if (input != null) {                                                                                       // 2419
                if (typeof input === 'string') {                                                                       // 2420
                    input = timezoneMinutesFromString(input);                                                          // 2421
                }                                                                                                      // 2422
                if (Math.abs(input) < 16) {                                                                            // 2423
                    input = input * 60;                                                                                // 2424
                }                                                                                                      // 2425
                if (!this._isUTC && keepLocalTime) {                                                                   // 2426
                    localAdjust = this._dateTzOffset();                                                                // 2427
                }                                                                                                      // 2428
                this._offset = input;                                                                                  // 2429
                this._isUTC = true;                                                                                    // 2430
                if (localAdjust != null) {                                                                             // 2431
                    this.subtract(localAdjust, 'm');                                                                   // 2432
                }                                                                                                      // 2433
                if (offset !== input) {                                                                                // 2434
                    if (!keepLocalTime || this._changeInProgress) {                                                    // 2435
                        addOrSubtractDurationFromMoment(this,                                                          // 2436
                                moment.duration(offset - input, 'm'), 1, false);                                       // 2437
                    } else if (!this._changeInProgress) {                                                              // 2438
                        this._changeInProgress = true;                                                                 // 2439
                        moment.updateOffset(this, true);                                                               // 2440
                        this._changeInProgress = null;                                                                 // 2441
                    }                                                                                                  // 2442
                }                                                                                                      // 2443
            } else {                                                                                                   // 2444
                return this._isUTC ? offset : this._dateTzOffset();                                                    // 2445
            }                                                                                                          // 2446
            return this;                                                                                               // 2447
        },                                                                                                             // 2448
                                                                                                                       // 2449
        zoneAbbr : function () {                                                                                       // 2450
            return this._isUTC ? 'UTC' : '';                                                                           // 2451
        },                                                                                                             // 2452
                                                                                                                       // 2453
        zoneName : function () {                                                                                       // 2454
            return this._isUTC ? 'Coordinated Universal Time' : '';                                                    // 2455
        },                                                                                                             // 2456
                                                                                                                       // 2457
        parseZone : function () {                                                                                      // 2458
            if (this._tzm) {                                                                                           // 2459
                this.zone(this._tzm);                                                                                  // 2460
            } else if (typeof this._i === 'string') {                                                                  // 2461
                this.zone(this._i);                                                                                    // 2462
            }                                                                                                          // 2463
            return this;                                                                                               // 2464
        },                                                                                                             // 2465
                                                                                                                       // 2466
        hasAlignedHourOffset : function (input) {                                                                      // 2467
            if (!input) {                                                                                              // 2468
                input = 0;                                                                                             // 2469
            }                                                                                                          // 2470
            else {                                                                                                     // 2471
                input = moment(input).zone();                                                                          // 2472
            }                                                                                                          // 2473
                                                                                                                       // 2474
            return (this.zone() - input) % 60 === 0;                                                                   // 2475
        },                                                                                                             // 2476
                                                                                                                       // 2477
        daysInMonth : function () {                                                                                    // 2478
            return daysInMonth(this.year(), this.month());                                                             // 2479
        },                                                                                                             // 2480
                                                                                                                       // 2481
        dayOfYear : function (input) {                                                                                 // 2482
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;           // 2483
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');                                     // 2484
        },                                                                                                             // 2485
                                                                                                                       // 2486
        quarter : function (input) {                                                                                   // 2487
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3); // 2488
        },                                                                                                             // 2489
                                                                                                                       // 2490
        weekYear : function (input) {                                                                                  // 2491
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;                // 2492
            return input == null ? year : this.add((input - year), 'y');                                               // 2493
        },                                                                                                             // 2494
                                                                                                                       // 2495
        isoWeekYear : function (input) {                                                                               // 2496
            var year = weekOfYear(this, 1, 4).year;                                                                    // 2497
            return input == null ? year : this.add((input - year), 'y');                                               // 2498
        },                                                                                                             // 2499
                                                                                                                       // 2500
        week : function (input) {                                                                                      // 2501
            var week = this.localeData().week(this);                                                                   // 2502
            return input == null ? week : this.add((input - week) * 7, 'd');                                           // 2503
        },                                                                                                             // 2504
                                                                                                                       // 2505
        isoWeek : function (input) {                                                                                   // 2506
            var week = weekOfYear(this, 1, 4).week;                                                                    // 2507
            return input == null ? week : this.add((input - week) * 7, 'd');                                           // 2508
        },                                                                                                             // 2509
                                                                                                                       // 2510
        weekday : function (input) {                                                                                   // 2511
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;                                          // 2512
            return input == null ? weekday : this.add(input - weekday, 'd');                                           // 2513
        },                                                                                                             // 2514
                                                                                                                       // 2515
        isoWeekday : function (input) {                                                                                // 2516
            // behaves the same as moment#day except                                                                   // 2517
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)                                          // 2518
            // as a setter, sunday should belong to the previous week.                                                 // 2519
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);                     // 2520
        },                                                                                                             // 2521
                                                                                                                       // 2522
        isoWeeksInYear : function () {                                                                                 // 2523
            return weeksInYear(this.year(), 1, 4);                                                                     // 2524
        },                                                                                                             // 2525
                                                                                                                       // 2526
        weeksInYear : function () {                                                                                    // 2527
            var weekInfo = this.localeData()._week;                                                                    // 2528
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);                                               // 2529
        },                                                                                                             // 2530
                                                                                                                       // 2531
        get : function (units) {                                                                                       // 2532
            units = normalizeUnits(units);                                                                             // 2533
            return this[units]();                                                                                      // 2534
        },                                                                                                             // 2535
                                                                                                                       // 2536
        set : function (units, value) {                                                                                // 2537
            units = normalizeUnits(units);                                                                             // 2538
            if (typeof this[units] === 'function') {                                                                   // 2539
                this[units](value);                                                                                    // 2540
            }                                                                                                          // 2541
            return this;                                                                                               // 2542
        },                                                                                                             // 2543
                                                                                                                       // 2544
        // If passed a locale key, it will set the locale for this                                                     // 2545
        // instance.  Otherwise, it will return the locale configuration                                               // 2546
        // variables for this instance.                                                                                // 2547
        locale : function (key) {                                                                                      // 2548
            var newLocaleData;                                                                                         // 2549
                                                                                                                       // 2550
            if (key === undefined) {                                                                                   // 2551
                return this._locale._abbr;                                                                             // 2552
            } else {                                                                                                   // 2553
                newLocaleData = moment.localeData(key);                                                                // 2554
                if (newLocaleData != null) {                                                                           // 2555
                    this._locale = newLocaleData;                                                                      // 2556
                }                                                                                                      // 2557
                return this;                                                                                           // 2558
            }                                                                                                          // 2559
        },                                                                                                             // 2560
                                                                                                                       // 2561
        lang : deprecate(                                                                                              // 2562
            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
            function (key) {                                                                                           // 2564
                if (key === undefined) {                                                                               // 2565
                    return this.localeData();                                                                          // 2566
                } else {                                                                                               // 2567
                    return this.locale(key);                                                                           // 2568
                }                                                                                                      // 2569
            }                                                                                                          // 2570
        ),                                                                                                             // 2571
                                                                                                                       // 2572
        localeData : function () {                                                                                     // 2573
            return this._locale;                                                                                       // 2574
        },                                                                                                             // 2575
                                                                                                                       // 2576
        _dateTzOffset : function () {                                                                                  // 2577
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.                                          // 2578
            // https://github.com/moment/moment/pull/1871                                                              // 2579
            return Math.round(this._d.getTimezoneOffset() / 15) * 15;                                                  // 2580
        }                                                                                                              // 2581
    });                                                                                                                // 2582
                                                                                                                       // 2583
    function rawMonthSetter(mom, value) {                                                                              // 2584
        var dayOfMonth;                                                                                                // 2585
                                                                                                                       // 2586
        // TODO: Move this out of here!                                                                                // 2587
        if (typeof value === 'string') {                                                                               // 2588
            value = mom.localeData().monthsParse(value);                                                               // 2589
            // TODO: Another silent failure?                                                                           // 2590
            if (typeof value !== 'number') {                                                                           // 2591
                return mom;                                                                                            // 2592
            }                                                                                                          // 2593
        }                                                                                                              // 2594
                                                                                                                       // 2595
        dayOfMonth = Math.min(mom.date(),                                                                              // 2596
                daysInMonth(mom.year(), value));                                                                       // 2597
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);                                        // 2598
        return mom;                                                                                                    // 2599
    }                                                                                                                  // 2600
                                                                                                                       // 2601
    function rawGetter(mom, unit) {                                                                                    // 2602
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();                                                     // 2603
    }                                                                                                                  // 2604
                                                                                                                       // 2605
    function rawSetter(mom, unit, value) {                                                                             // 2606
        if (unit === 'Month') {                                                                                        // 2607
            return rawMonthSetter(mom, value);                                                                         // 2608
        } else {                                                                                                       // 2609
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);                                            // 2610
        }                                                                                                              // 2611
    }                                                                                                                  // 2612
                                                                                                                       // 2613
    function makeAccessor(unit, keepTime) {                                                                            // 2614
        return function (value) {                                                                                      // 2615
            if (value != null) {                                                                                       // 2616
                rawSetter(this, unit, value);                                                                          // 2617
                moment.updateOffset(this, keepTime);                                                                   // 2618
                return this;                                                                                           // 2619
            } else {                                                                                                   // 2620
                return rawGetter(this, unit);                                                                          // 2621
            }                                                                                                          // 2622
        };                                                                                                             // 2623
    }                                                                                                                  // 2624
                                                                                                                       // 2625
    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);                              // 2626
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);                                             // 2627
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);                                             // 2628
    // Setting the hour should keep the time, because the user explicitly                                              // 2629
    // specified which hour he wants. So trying to maintain the same hour (in                                          // 2630
    // a new timezone) makes sense. Adding/subtracting hours does not follow                                           // 2631
    // this rule.                                                                                                      // 2632
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);                                                    // 2633
    // moment.fn.month is defined separately                                                                           // 2634
    moment.fn.date = makeAccessor('Date', true);                                                                       // 2635
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));        // 2636
    moment.fn.year = makeAccessor('FullYear', true);                                                                   // 2637
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));    // 2638
                                                                                                                       // 2639
    // add plural methods                                                                                              // 2640
    moment.fn.days = moment.fn.day;                                                                                    // 2641
    moment.fn.months = moment.fn.month;                                                                                // 2642
    moment.fn.weeks = moment.fn.week;                                                                                  // 2643
    moment.fn.isoWeeks = moment.fn.isoWeek;                                                                            // 2644
    moment.fn.quarters = moment.fn.quarter;                                                                            // 2645
                                                                                                                       // 2646
    // add aliased format methods                                                                                      // 2647
    moment.fn.toJSON = moment.fn.toISOString;                                                                          // 2648
                                                                                                                       // 2649
    /************************************                                                                              // 2650
        Duration Prototype                                                                                             // 2651
    ************************************/                                                                              // 2652
                                                                                                                       // 2653
                                                                                                                       // 2654
    function daysToYears (days) {                                                                                      // 2655
        // 400 years have 146097 days (taking into account leap year rules)                                            // 2656
        return days * 400 / 146097;                                                                                    // 2657
    }                                                                                                                  // 2658
                                                                                                                       // 2659
    function yearsToDays (years) {                                                                                     // 2660
        // years * 365 + absRound(years / 4) -                                                                         // 2661
        //     absRound(years / 100) + absRound(years / 400);                                                          // 2662
        return years * 146097 / 400;                                                                                   // 2663
    }                                                                                                                  // 2664
                                                                                                                       // 2665
    extend(moment.duration.fn = Duration.prototype, {                                                                  // 2666
                                                                                                                       // 2667
        _bubble : function () {                                                                                        // 2668
            var milliseconds = this._milliseconds,                                                                     // 2669
                days = this._days,                                                                                     // 2670
                months = this._months,                                                                                 // 2671
                data = this._data,                                                                                     // 2672
                seconds, minutes, hours, years = 0;                                                                    // 2673
                                                                                                                       // 2674
            // The following code bubbles up values, see the tests for                                                 // 2675
            // examples of what that means.                                                                            // 2676
            data.milliseconds = milliseconds % 1000;                                                                   // 2677
                                                                                                                       // 2678
            seconds = absRound(milliseconds / 1000);                                                                   // 2679
            data.seconds = seconds % 60;                                                                               // 2680
                                                                                                                       // 2681
            minutes = absRound(seconds / 60);                                                                          // 2682
            data.minutes = minutes % 60;                                                                               // 2683
                                                                                                                       // 2684
            hours = absRound(minutes / 60);                                                                            // 2685
            data.hours = hours % 24;                                                                                   // 2686
                                                                                                                       // 2687
            days += absRound(hours / 24);                                                                              // 2688
                                                                                                                       // 2689
            // Accurately convert days to years, assume start from year 0.                                             // 2690
            years = absRound(daysToYears(days));                                                                       // 2691
            days -= absRound(yearsToDays(years));                                                                      // 2692
                                                                                                                       // 2693
            // 30 days to a month                                                                                      // 2694
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.                                          // 2695
            months += absRound(days / 30);                                                                             // 2696
            days %= 30;                                                                                                // 2697
                                                                                                                       // 2698
            // 12 months -> 1 year                                                                                     // 2699
            years += absRound(months / 12);                                                                            // 2700
            months %= 12;                                                                                              // 2701
                                                                                                                       // 2702
            data.days = days;                                                                                          // 2703
            data.months = months;                                                                                      // 2704
            data.years = years;                                                                                        // 2705
        },                                                                                                             // 2706
                                                                                                                       // 2707
        abs : function () {                                                                                            // 2708
            this._milliseconds = Math.abs(this._milliseconds);                                                         // 2709
            this._days = Math.abs(this._days);                                                                         // 2710
            this._months = Math.abs(this._months);                                                                     // 2711
                                                                                                                       // 2712
            this._data.milliseconds = Math.abs(this._data.milliseconds);                                               // 2713
            this._data.seconds = Math.abs(this._data.seconds);                                                         // 2714
            this._data.minutes = Math.abs(this._data.minutes);                                                         // 2715
            this._data.hours = Math.abs(this._data.hours);                                                             // 2716
            this._data.months = Math.abs(this._data.months);                                                           // 2717
            this._data.years = Math.abs(this._data.years);                                                             // 2718
                                                                                                                       // 2719
            return this;                                                                                               // 2720
        },                                                                                                             // 2721
                                                                                                                       // 2722
        weeks : function () {                                                                                          // 2723
            return absRound(this.days() / 7);                                                                          // 2724
        },                                                                                                             // 2725
                                                                                                                       // 2726
        valueOf : function () {                                                                                        // 2727
            return this._milliseconds +                                                                                // 2728
              this._days * 864e5 +                                                                                     // 2729
              (this._months % 12) * 2592e6 +                                                                           // 2730
              toInt(this._months / 12) * 31536e6;                                                                      // 2731
        },                                                                                                             // 2732
                                                                                                                       // 2733
        humanize : function (withSuffix) {                                                                             // 2734
            var output = relativeTime(this, !withSuffix, this.localeData());                                           // 2735
                                                                                                                       // 2736
            if (withSuffix) {                                                                                          // 2737
                output = this.localeData().pastFuture(+this, output);                                                  // 2738
            }                                                                                                          // 2739
                                                                                                                       // 2740
            return this.localeData().postformat(output);                                                               // 2741
        },                                                                                                             // 2742
                                                                                                                       // 2743
        add : function (input, val) {                                                                                  // 2744
            // supports only 2.0-style add(1, 's') or add(moment)                                                      // 2745
            var dur = moment.duration(input, val);                                                                     // 2746
                                                                                                                       // 2747
            this._milliseconds += dur._milliseconds;                                                                   // 2748
            this._days += dur._days;                                                                                   // 2749
            this._months += dur._months;                                                                               // 2750
                                                                                                                       // 2751
            this._bubble();                                                                                            // 2752
                                                                                                                       // 2753
            return this;                                                                                               // 2754
        },                                                                                                             // 2755
                                                                                                                       // 2756
        subtract : function (input, val) {                                                                             // 2757
            var dur = moment.duration(input, val);                                                                     // 2758
                                                                                                                       // 2759
            this._milliseconds -= dur._milliseconds;                                                                   // 2760
            this._days -= dur._days;                                                                                   // 2761
            this._months -= dur._months;                                                                               // 2762
                                                                                                                       // 2763
            this._bubble();                                                                                            // 2764
                                                                                                                       // 2765
            return this;                                                                                               // 2766
        },                                                                                                             // 2767
                                                                                                                       // 2768
        get : function (units) {                                                                                       // 2769
            units = normalizeUnits(units);                                                                             // 2770
            return this[units.toLowerCase() + 's']();                                                                  // 2771
        },                                                                                                             // 2772
                                                                                                                       // 2773
        as : function (units) {                                                                                        // 2774
            var days, months;                                                                                          // 2775
            units = normalizeUnits(units);                                                                             // 2776
                                                                                                                       // 2777
            if (units === 'month' || units === 'year') {                                                               // 2778
                days = this._days + this._milliseconds / 864e5;                                                        // 2779
                months = this._months + daysToYears(days) * 12;                                                        // 2780
                return units === 'month' ? months : months / 12;                                                       // 2781
            } else {                                                                                                   // 2782
                // handle milliseconds separately because of floating point math errors (issue #1867)                  // 2783
                days = this._days + Math.round(yearsToDays(this._months / 12));                                        // 2784
                switch (units) {                                                                                       // 2785
                    case 'week': return days / 7 + this._milliseconds / 6048e5;                                        // 2786
                    case 'day': return days + this._milliseconds / 864e5;                                              // 2787
                    case 'hour': return days * 24 + this._milliseconds / 36e5;                                         // 2788
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;                                   // 2789
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;                             // 2790
                    // Math.floor prevents floating point math errors here                                             // 2791
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;            // 2792
                    default: throw new Error('Unknown unit ' + units);                                                 // 2793
                }                                                                                                      // 2794
            }                                                                                                          // 2795
        },                                                                                                             // 2796
                                                                                                                       // 2797
        lang : moment.fn.lang,                                                                                         // 2798
        locale : moment.fn.locale,                                                                                     // 2799
                                                                                                                       // 2800
        toIsoString : deprecate(                                                                                       // 2801
            'toIsoString() is deprecated. Please use toISOString() instead ' +                                         // 2802
            '(notice the capitals)',                                                                                   // 2803
            function () {                                                                                              // 2804
                return this.toISOString();                                                                             // 2805
            }                                                                                                          // 2806
        ),                                                                                                             // 2807
                                                                                                                       // 2808
        toISOString : function () {                                                                                    // 2809
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js            // 2810
            var years = Math.abs(this.years()),                                                                        // 2811
                months = Math.abs(this.months()),                                                                      // 2812
                days = Math.abs(this.days()),                                                                          // 2813
                hours = Math.abs(this.hours()),                                                                        // 2814
                minutes = Math.abs(this.minutes()),                                                                    // 2815
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);                                       // 2816
                                                                                                                       // 2817
            if (!this.asSeconds()) {                                                                                   // 2818
                // this is the same as C#'s (Noda) and python (isodate)...                                             // 2819
                // but not other JS (goog.date)                                                                        // 2820
                return 'P0D';                                                                                          // 2821
            }                                                                                                          // 2822
                                                                                                                       // 2823
            return (this.asSeconds() < 0 ? '-' : '') +                                                                 // 2824
                'P' +                                                                                                  // 2825
                (years ? years + 'Y' : '') +                                                                           // 2826
                (months ? months + 'M' : '') +                                                                         // 2827
                (days ? days + 'D' : '') +                                                                             // 2828
                ((hours || minutes || seconds) ? 'T' : '') +                                                           // 2829
                (hours ? hours + 'H' : '') +                                                                           // 2830
                (minutes ? minutes + 'M' : '') +                                                                       // 2831
                (seconds ? seconds + 'S' : '');                                                                        // 2832
        },                                                                                                             // 2833
                                                                                                                       // 2834
        localeData : function () {                                                                                     // 2835
            return this._locale;                                                                                       // 2836
        }                                                                                                              // 2837
    });                                                                                                                // 2838
                                                                                                                       // 2839
    moment.duration.fn.toString = moment.duration.fn.toISOString;                                                      // 2840
                                                                                                                       // 2841
    function makeDurationGetter(name) {                                                                                // 2842
        moment.duration.fn[name] = function () {                                                                       // 2843
            return this._data[name];                                                                                   // 2844
        };                                                                                                             // 2845
    }                                                                                                                  // 2846
                                                                                                                       // 2847
    for (i in unitMillisecondFactors) {                                                                                // 2848
        if (hasOwnProp(unitMillisecondFactors, i)) {                                                                   // 2849
            makeDurationGetter(i.toLowerCase());                                                                       // 2850
        }                                                                                                              // 2851
    }                                                                                                                  // 2852
                                                                                                                       // 2853
    moment.duration.fn.asMilliseconds = function () {                                                                  // 2854
        return this.as('ms');                                                                                          // 2855
    };                                                                                                                 // 2856
    moment.duration.fn.asSeconds = function () {                                                                       // 2857
        return this.as('s');                                                                                           // 2858
    };                                                                                                                 // 2859
    moment.duration.fn.asMinutes = function () {                                                                       // 2860
        return this.as('m');                                                                                           // 2861
    };                                                                                                                 // 2862
    moment.duration.fn.asHours = function () {                                                                         // 2863
        return this.as('h');                                                                                           // 2864
    };                                                                                                                 // 2865
    moment.duration.fn.asDays = function () {                                                                          // 2866
        return this.as('d');                                                                                           // 2867
    };                                                                                                                 // 2868
    moment.duration.fn.asWeeks = function () {                                                                         // 2869
        return this.as('weeks');                                                                                       // 2870
    };                                                                                                                 // 2871
    moment.duration.fn.asMonths = function () {                                                                        // 2872
        return this.as('M');                                                                                           // 2873
    };                                                                                                                 // 2874
    moment.duration.fn.asYears = function () {                                                                         // 2875
        return this.as('y');                                                                                           // 2876
    };                                                                                                                 // 2877
                                                                                                                       // 2878
    /************************************                                                                              // 2879
        Default Locale                                                                                                 // 2880
    ************************************/                                                                              // 2881
                                                                                                                       // 2882
                                                                                                                       // 2883
    // Set default locale, other locale will inherit from English.                                                     // 2884
    moment.locale('en', {                                                                                              // 2885
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,                                                                          // 2886
        ordinal : function (number) {                                                                                  // 2887
            var b = number % 10,                                                                                       // 2888
                output = (toInt(number % 100 / 10) === 1) ? 'th' :                                                     // 2889
                (b === 1) ? 'st' :                                                                                     // 2890
                (b === 2) ? 'nd' :                                                                                     // 2891
                (b === 3) ? 'rd' : 'th';                                                                               // 2892
            return number + output;                                                                                    // 2893
        }                                                                                                              // 2894
    });                                                                                                                // 2895
                                                                                                                       // 2896
    /* EMBED_LOCALES */                                                                                                // 2897
                                                                                                                       // 2898
    /************************************                                                                              // 2899
        Exposing Moment                                                                                                // 2900
    ************************************/                                                                              // 2901
                                                                                                                       // 2902
    function makeGlobal(shouldDeprecate) {                                                                             // 2903
        /*global ender:false */                                                                                        // 2904
        if (typeof ender !== 'undefined') {                                                                            // 2905
            return;                                                                                                    // 2906
        }                                                                                                              // 2907
        oldGlobalMoment = globalScope.moment;                                                                          // 2908
        if (shouldDeprecate) {                                                                                         // 2909
            globalScope.moment = deprecate(                                                                            // 2910
                    'Accessing Moment through the global scope is ' +                                                  // 2911
                    'deprecated, and will be removed in an upcoming ' +                                                // 2912
                    'release.',                                                                                        // 2913
                    moment);                                                                                           // 2914
        } else {                                                                                                       // 2915
            globalScope.moment = moment;                                                                               // 2916
        }                                                                                                              // 2917
    }                                                                                                                  // 2918
                                                                                                                       // 2919
    // CommonJS module is defined                                                                                      // 2920
    if (hasModule) {                                                                                                   // 2921
        module.exports = moment;                                                                                       // 2922
    } else if (typeof define === 'function' && define.amd) {                                                           // 2923
        define('moment', function (require, exports, module) {                                                         // 2924
            if (module.config && module.config() && module.config().noGlobal === true) {                               // 2925
                // release the global variable                                                                         // 2926
                globalScope.moment = oldGlobalMoment;                                                                  // 2927
            }                                                                                                          // 2928
                                                                                                                       // 2929
            return moment;                                                                                             // 2930
        });                                                                                                            // 2931
        makeGlobal(true);                                                                                              // 2932
    } else {                                                                                                           // 2933
        makeGlobal();                                                                                                  // 2934
    }                                                                                                                  // 2935
}).call(this);                                                                                                         // 2936
                                                                                                                       // 2937
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/momentjs:moment/meteor/export.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// moment.js makes `moment` global on the window (or global) object, while Meteor expects a file-scoped global variable
moment = this.moment;                                                                                                  // 2
delete this.moment;                                                                                                    // 3
                                                                                                                       // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['momentjs:moment'] = {
  moment: moment
};

})();
