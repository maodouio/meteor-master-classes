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
var FastClick, module;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/fastclick/pre.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// Define an object named module.exports. This will cause fastclick.js to put                                         // 1
// FastClick as a field on it, instead of in the global namespace.                                                    // 2
// See also post.js.                                                                                                  // 3
module = {                                                                                                            // 4
  exports: {}                                                                                                         // 5
};                                                                                                                    // 6
                                                                                                                      // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/fastclick/fastclick.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   // 1
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.                                   // 2
 *                                                                                                                    // 3
 * @version 1.0.3                                                                                                     // 4
 * @codingstandard ftlabs-jsv2                                                                                        // 5
 * @copyright The Financial Times Limited [All Rights Reserved]                                                       // 6
 * @license MIT License (see LICENSE.txt)                                                                             // 7
 */                                                                                                                   // 8
                                                                                                                      // 9
/*jslint browser:true, node:true*/                                                                                    // 10
/*global define, Event, Node*/                                                                                        // 11
                                                                                                                      // 12
                                                                                                                      // 13
/**                                                                                                                   // 14
 * Instantiate fast-clicking listeners on the specified layer.                                                        // 15
 *                                                                                                                    // 16
 * @constructor                                                                                                       // 17
 * @param {Element} layer The layer to listen on                                                                      // 18
 * @param {Object} options The options to override the defaults                                                       // 19
 */                                                                                                                   // 20
function FastClick(layer, options) {                                                                                  // 21
	'use strict';                                                                                                        // 22
	var oldOnClick;                                                                                                      // 23
                                                                                                                      // 24
	options = options || {};                                                                                             // 25
                                                                                                                      // 26
	/**                                                                                                                  // 27
	 * Whether a click is currently being tracked.                                                                       // 28
	 *                                                                                                                   // 29
	 * @type boolean                                                                                                     // 30
	 */                                                                                                                  // 31
	this.trackingClick = false;                                                                                          // 32
                                                                                                                      // 33
                                                                                                                      // 34
	/**                                                                                                                  // 35
	 * Timestamp for when click tracking started.                                                                        // 36
	 *                                                                                                                   // 37
	 * @type number                                                                                                      // 38
	 */                                                                                                                  // 39
	this.trackingClickStart = 0;                                                                                         // 40
                                                                                                                      // 41
                                                                                                                      // 42
	/**                                                                                                                  // 43
	 * The element being tracked for a click.                                                                            // 44
	 *                                                                                                                   // 45
	 * @type EventTarget                                                                                                 // 46
	 */                                                                                                                  // 47
	this.targetElement = null;                                                                                           // 48
                                                                                                                      // 49
                                                                                                                      // 50
	/**                                                                                                                  // 51
	 * X-coordinate of touch start event.                                                                                // 52
	 *                                                                                                                   // 53
	 * @type number                                                                                                      // 54
	 */                                                                                                                  // 55
	this.touchStartX = 0;                                                                                                // 56
                                                                                                                      // 57
                                                                                                                      // 58
	/**                                                                                                                  // 59
	 * Y-coordinate of touch start event.                                                                                // 60
	 *                                                                                                                   // 61
	 * @type number                                                                                                      // 62
	 */                                                                                                                  // 63
	this.touchStartY = 0;                                                                                                // 64
                                                                                                                      // 65
                                                                                                                      // 66
	/**                                                                                                                  // 67
	 * ID of the last touch, retrieved from Touch.identifier.                                                            // 68
	 *                                                                                                                   // 69
	 * @type number                                                                                                      // 70
	 */                                                                                                                  // 71
	this.lastTouchIdentifier = 0;                                                                                        // 72
                                                                                                                      // 73
                                                                                                                      // 74
	/**                                                                                                                  // 75
	 * Touchmove boundary, beyond which a click will be cancelled.                                                       // 76
	 *                                                                                                                   // 77
	 * @type number                                                                                                      // 78
	 */                                                                                                                  // 79
	this.touchBoundary = options.touchBoundary || 10;                                                                    // 80
                                                                                                                      // 81
                                                                                                                      // 82
	/**                                                                                                                  // 83
	 * The FastClick layer.                                                                                              // 84
	 *                                                                                                                   // 85
	 * @type Element                                                                                                     // 86
	 */                                                                                                                  // 87
	this.layer = layer;                                                                                                  // 88
                                                                                                                      // 89
	/**                                                                                                                  // 90
	 * The minimum time between tap(touchstart and touchend) events                                                      // 91
	 *                                                                                                                   // 92
	 * @type number                                                                                                      // 93
	 */                                                                                                                  // 94
	this.tapDelay = options.tapDelay || 200;                                                                             // 95
                                                                                                                      // 96
	if (FastClick.notNeeded(layer)) {                                                                                    // 97
		return;                                                                                                             // 98
	}                                                                                                                    // 99
                                                                                                                      // 100
	// Some old versions of Android don't have Function.prototype.bind                                                   // 101
	function bind(method, context) {                                                                                     // 102
		return function() { return method.apply(context, arguments); };                                                     // 103
	}                                                                                                                    // 104
                                                                                                                      // 105
                                                                                                                      // 106
	var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];                  // 107
	var context = this;                                                                                                  // 108
	for (var i = 0, l = methods.length; i < l; i++) {                                                                    // 109
		context[methods[i]] = bind(context[methods[i]], context);                                                           // 110
	}                                                                                                                    // 111
                                                                                                                      // 112
	// Set up event handlers as required                                                                                 // 113
	if (deviceIsAndroid) {                                                                                               // 114
		layer.addEventListener('mouseover', this.onMouse, true);                                                            // 115
		layer.addEventListener('mousedown', this.onMouse, true);                                                            // 116
		layer.addEventListener('mouseup', this.onMouse, true);                                                              // 117
	}                                                                                                                    // 118
                                                                                                                      // 119
	layer.addEventListener('click', this.onClick, true);                                                                 // 120
	layer.addEventListener('touchstart', this.onTouchStart, false);                                                      // 121
	layer.addEventListener('touchmove', this.onTouchMove, false);                                                        // 122
	layer.addEventListener('touchend', this.onTouchEnd, false);                                                          // 123
	layer.addEventListener('touchcancel', this.onTouchCancel, false);                                                    // 124
                                                                                                                      // 125
	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)                  // 126
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick              // 127
	// layer when they are cancelled.                                                                                    // 128
	if (!Event.prototype.stopImmediatePropagation) {                                                                     // 129
		layer.removeEventListener = function(type, callback, capture) {                                                     // 130
			var rmv = Node.prototype.removeEventListener;                                                                      // 131
			if (type === 'click') {                                                                                            // 132
				rmv.call(layer, type, callback.hijacked || callback, capture);                                                    // 133
			} else {                                                                                                           // 134
				rmv.call(layer, type, callback, capture);                                                                         // 135
			}                                                                                                                  // 136
		};                                                                                                                  // 137
                                                                                                                      // 138
		layer.addEventListener = function(type, callback, capture) {                                                        // 139
			var adv = Node.prototype.addEventListener;                                                                         // 140
			if (type === 'click') {                                                                                            // 141
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {                                 // 142
					if (!event.propagationStopped) {                                                                                 // 143
						callback(event);                                                                                                // 144
					}                                                                                                                // 145
				}), capture);                                                                                                     // 146
			} else {                                                                                                           // 147
				adv.call(layer, type, callback, capture);                                                                         // 148
			}                                                                                                                  // 149
		};                                                                                                                  // 150
	}                                                                                                                    // 151
                                                                                                                      // 152
	// If a handler is already declared in the element's onclick attribute, it will be fired before                      // 153
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and                        // 154
	// adding it as listener.                                                                                            // 155
	if (typeof layer.onclick === 'function') {                                                                           // 156
                                                                                                                      // 157
		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick                        // 158
		// - the old one won't work if passed to addEventListener directly.                                                 // 159
		oldOnClick = layer.onclick;                                                                                         // 160
		layer.addEventListener('click', function(event) {                                                                   // 161
			oldOnClick(event);                                                                                                 // 162
		}, false);                                                                                                          // 163
		layer.onclick = null;                                                                                               // 164
	}                                                                                                                    // 165
}                                                                                                                     // 166
                                                                                                                      // 167
                                                                                                                      // 168
/**                                                                                                                   // 169
 * Android requires exceptions.                                                                                       // 170
 *                                                                                                                    // 171
 * @type boolean                                                                                                      // 172
 */                                                                                                                   // 173
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;                                                     // 174
                                                                                                                      // 175
                                                                                                                      // 176
/**                                                                                                                   // 177
 * iOS requires exceptions.                                                                                           // 178
 *                                                                                                                    // 179
 * @type boolean                                                                                                      // 180
 */                                                                                                                   // 181
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);                                                         // 182
                                                                                                                      // 183
                                                                                                                      // 184
/**                                                                                                                   // 185
 * iOS 4 requires an exception for select elements.                                                                   // 186
 *                                                                                                                    // 187
 * @type boolean                                                                                                      // 188
 */                                                                                                                   // 189
var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);                                        // 190
                                                                                                                      // 191
                                                                                                                      // 192
/**                                                                                                                   // 193
 * iOS 6.0(+?) requires the target element to be manually derived                                                     // 194
 *                                                                                                                    // 195
 * @type boolean                                                                                                      // 196
 */                                                                                                                   // 197
var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);                      // 198
                                                                                                                      // 199
/**                                                                                                                   // 200
 * BlackBerry requires exceptions.                                                                                    // 201
 *                                                                                                                    // 202
 * @type boolean                                                                                                      // 203
 */                                                                                                                   // 204
var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;                                                   // 205
                                                                                                                      // 206
/**                                                                                                                   // 207
 * Determine whether a given element requires a native click.                                                         // 208
 *                                                                                                                    // 209
 * @param {EventTarget|Element} target Target DOM element                                                             // 210
 * @returns {boolean} Returns true if the element needs a native click                                                // 211
 */                                                                                                                   // 212
FastClick.prototype.needsClick = function(target) {                                                                   // 213
	'use strict';                                                                                                        // 214
	switch (target.nodeName.toLowerCase()) {                                                                             // 215
                                                                                                                      // 216
	// Don't send a synthetic click to disabled inputs (issue #62)                                                       // 217
	case 'button':                                                                                                       // 218
	case 'select':                                                                                                       // 219
	case 'textarea':                                                                                                     // 220
		if (target.disabled) {                                                                                              // 221
			return true;                                                                                                       // 222
		}                                                                                                                   // 223
                                                                                                                      // 224
		break;                                                                                                              // 225
	case 'input':                                                                                                        // 226
                                                                                                                      // 227
		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)                                           // 228
		if ((deviceIsIOS && target.type === 'file') || target.disabled) {                                                   // 229
			return true;                                                                                                       // 230
		}                                                                                                                   // 231
                                                                                                                      // 232
		break;                                                                                                              // 233
	case 'label':                                                                                                        // 234
	case 'video':                                                                                                        // 235
		return true;                                                                                                        // 236
	}                                                                                                                    // 237
                                                                                                                      // 238
	return (/\bneedsclick\b/).test(target.className);                                                                    // 239
};                                                                                                                    // 240
                                                                                                                      // 241
                                                                                                                      // 242
/**                                                                                                                   // 243
 * Determine whether a given element requires a call to focus to simulate click into element.                         // 244
 *                                                                                                                    // 245
 * @param {EventTarget|Element} target Target DOM element                                                             // 246
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.                  // 247
 */                                                                                                                   // 248
FastClick.prototype.needsFocus = function(target) {                                                                   // 249
	'use strict';                                                                                                        // 250
	switch (target.nodeName.toLowerCase()) {                                                                             // 251
	case 'textarea':                                                                                                     // 252
		return true;                                                                                                        // 253
	case 'select':                                                                                                       // 254
		return !deviceIsAndroid;                                                                                            // 255
	case 'input':                                                                                                        // 256
		switch (target.type) {                                                                                              // 257
		case 'button':                                                                                                      // 258
		case 'checkbox':                                                                                                    // 259
		case 'file':                                                                                                        // 260
		case 'image':                                                                                                       // 261
		case 'radio':                                                                                                       // 262
		case 'submit':                                                                                                      // 263
			return false;                                                                                                      // 264
		}                                                                                                                   // 265
                                                                                                                      // 266
		// No point in attempting to focus disabled inputs                                                                  // 267
		return !target.disabled && !target.readOnly;                                                                        // 268
	default:                                                                                                             // 269
		return (/\bneedsfocus\b/).test(target.className);                                                                   // 270
	}                                                                                                                    // 271
};                                                                                                                    // 272
                                                                                                                      // 273
                                                                                                                      // 274
/**                                                                                                                   // 275
 * Send a click event to the specified element.                                                                       // 276
 *                                                                                                                    // 277
 * @param {EventTarget|Element} targetElement                                                                         // 278
 * @param {Event} event                                                                                               // 279
 */                                                                                                                   // 280
FastClick.prototype.sendClick = function(targetElement, event) {                                                      // 281
	'use strict';                                                                                                        // 282
	var clickEvent, touch;                                                                                               // 283
                                                                                                                      // 284
	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24) // 285
	if (document.activeElement && document.activeElement !== targetElement) {                                            // 286
		document.activeElement.blur();                                                                                      // 287
	}                                                                                                                    // 288
                                                                                                                      // 289
	touch = event.changedTouches[0];                                                                                     // 290
                                                                                                                      // 291
	// Synthesise a click event, with an extra attribute so it can be tracked                                            // 292
	clickEvent = document.createEvent('MouseEvents');                                                                    // 293
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;                                                                               // 295
	targetElement.dispatchEvent(clickEvent);                                                                             // 296
};                                                                                                                    // 297
                                                                                                                      // 298
FastClick.prototype.determineEventType = function(targetElement) {                                                    // 299
	'use strict';                                                                                                        // 300
                                                                                                                      // 301
	//Issue #159: Android Chrome Select Box does not open with a synthetic click event                                   // 302
	if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {                                           // 303
		return 'mousedown';                                                                                                 // 304
	}                                                                                                                    // 305
                                                                                                                      // 306
	return 'click';                                                                                                      // 307
};                                                                                                                    // 308
                                                                                                                      // 309
                                                                                                                      // 310
/**                                                                                                                   // 311
 * @param {EventTarget|Element} targetElement                                                                         // 312
 */                                                                                                                   // 313
FastClick.prototype.focus = function(targetElement) {                                                                 // 314
	'use strict';                                                                                                        // 315
	var length;                                                                                                          // 316
                                                                                                                      // 317
	// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
		length = targetElement.value.length;                                                                                // 320
		targetElement.setSelectionRange(length, length);                                                                    // 321
	} else {                                                                                                             // 322
		targetElement.focus();                                                                                              // 323
	}                                                                                                                    // 324
};                                                                                                                    // 325
                                                                                                                      // 326
                                                                                                                      // 327
/**                                                                                                                   // 328
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.               // 329
 *                                                                                                                    // 330
 * @param {EventTarget|Element} targetElement                                                                         // 331
 */                                                                                                                   // 332
FastClick.prototype.updateScrollParent = function(targetElement) {                                                    // 333
	'use strict';                                                                                                        // 334
	var scrollParent, parentElement;                                                                                     // 335
                                                                                                                      // 336
	scrollParent = targetElement.fastClickScrollParent;                                                                  // 337
                                                                                                                      // 338
	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the            // 339
	// target element was moved to another parent.                                                                       // 340
	if (!scrollParent || !scrollParent.contains(targetElement)) {                                                        // 341
		parentElement = targetElement;                                                                                      // 342
		do {                                                                                                                // 343
			if (parentElement.scrollHeight > parentElement.offsetHeight) {                                                     // 344
				scrollParent = parentElement;                                                                                     // 345
				targetElement.fastClickScrollParent = parentElement;                                                              // 346
				break;                                                                                                            // 347
			}                                                                                                                  // 348
                                                                                                                      // 349
			parentElement = parentElement.parentElement;                                                                       // 350
		} while (parentElement);                                                                                            // 351
	}                                                                                                                    // 352
                                                                                                                      // 353
	// Always update the scroll top tracker if possible.                                                                 // 354
	if (scrollParent) {                                                                                                  // 355
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;                                                       // 356
	}                                                                                                                    // 357
};                                                                                                                    // 358
                                                                                                                      // 359
                                                                                                                      // 360
/**                                                                                                                   // 361
 * @param {EventTarget} targetElement                                                                                 // 362
 * @returns {Element|EventTarget}                                                                                     // 363
 */                                                                                                                   // 364
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {                                         // 365
	'use strict';                                                                                                        // 366
                                                                                                                      // 367
	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.           // 368
	if (eventTarget.nodeType === Node.TEXT_NODE) {                                                                       // 369
		return eventTarget.parentNode;                                                                                      // 370
	}                                                                                                                    // 371
                                                                                                                      // 372
	return eventTarget;                                                                                                  // 373
};                                                                                                                    // 374
                                                                                                                      // 375
                                                                                                                      // 376
/**                                                                                                                   // 377
 * On touch start, record the position and scroll offset.                                                             // 378
 *                                                                                                                    // 379
 * @param {Event} event                                                                                               // 380
 * @returns {boolean}                                                                                                 // 381
 */                                                                                                                   // 382
FastClick.prototype.onTouchStart = function(event) {                                                                  // 383
	'use strict';                                                                                                        // 384
	var targetElement, touch, selection;                                                                                 // 385
                                                                                                                      // 386
	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {                                                                                // 388
		return true;                                                                                                        // 389
	}                                                                                                                    // 390
                                                                                                                      // 391
	targetElement = this.getTargetElementFromEventTarget(event.target);                                                  // 392
	touch = event.targetTouches[0];                                                                                      // 393
                                                                                                                      // 394
	if (deviceIsIOS) {                                                                                                   // 395
                                                                                                                      // 396
		// Only trusted events will deselect text on iOS (issue #49)                                                        // 397
		selection = window.getSelection();                                                                                  // 398
		if (selection.rangeCount && !selection.isCollapsed) {                                                               // 399
			return true;                                                                                                       // 400
		}                                                                                                                   // 401
                                                                                                                      // 402
		if (!deviceIsIOS4) {                                                                                                // 403
                                                                                                                      // 404
			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):   // 405
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched            // 406
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.       // 407
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an        // 408
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.                    // 409
			// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
			// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
			// random integers, it's safe to to continue if the identifier is 0 here.                                          // 412
			if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {                                           // 413
				event.preventDefault();                                                                                           // 414
				return false;                                                                                                     // 415
			}                                                                                                                  // 416
                                                                                                                      // 417
			this.lastTouchIdentifier = touch.identifier;                                                                       // 418
                                                                                                                      // 419
			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:           // 420
			// 1) the user does a fling scroll on the scrollable layer                                                         // 421
			// 2) the user stops the fling scroll with another tap                                                             // 422
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger         // 423
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check       // 424
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).            // 425
			this.updateScrollParent(targetElement);                                                                            // 426
		}                                                                                                                   // 427
	}                                                                                                                    // 428
                                                                                                                      // 429
	this.trackingClick = true;                                                                                           // 430
	this.trackingClickStart = event.timeStamp;                                                                           // 431
	this.targetElement = targetElement;                                                                                  // 432
                                                                                                                      // 433
	this.touchStartX = touch.pageX;                                                                                      // 434
	this.touchStartY = touch.pageY;                                                                                      // 435
                                                                                                                      // 436
	// Prevent phantom clicks on fast double-tap (issue #36)                                                             // 437
	if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {                                                        // 438
		event.preventDefault();                                                                                             // 439
	}                                                                                                                    // 440
                                                                                                                      // 441
	return true;                                                                                                         // 442
};                                                                                                                    // 443
                                                                                                                      // 444
                                                                                                                      // 445
/**                                                                                                                   // 446
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.             // 447
 *                                                                                                                    // 448
 * @param {Event} event                                                                                               // 449
 * @returns {boolean}                                                                                                 // 450
 */                                                                                                                   // 451
FastClick.prototype.touchHasMoved = function(event) {                                                                 // 452
	'use strict';                                                                                                        // 453
	var touch = event.changedTouches[0], boundary = this.touchBoundary;                                                  // 454
                                                                                                                      // 455
	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {    // 456
		return true;                                                                                                        // 457
	}                                                                                                                    // 458
                                                                                                                      // 459
	return false;                                                                                                        // 460
};                                                                                                                    // 461
                                                                                                                      // 462
                                                                                                                      // 463
/**                                                                                                                   // 464
 * Update the last position.                                                                                          // 465
 *                                                                                                                    // 466
 * @param {Event} event                                                                                               // 467
 * @returns {boolean}                                                                                                 // 468
 */                                                                                                                   // 469
FastClick.prototype.onTouchMove = function(event) {                                                                   // 470
	'use strict';                                                                                                        // 471
	if (!this.trackingClick) {                                                                                           // 472
		return true;                                                                                                        // 473
	}                                                                                                                    // 474
                                                                                                                      // 475
	// If the touch has moved, cancel the click tracking                                                                 // 476
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {        // 477
		this.trackingClick = false;                                                                                         // 478
		this.targetElement = null;                                                                                          // 479
	}                                                                                                                    // 480
                                                                                                                      // 481
	return true;                                                                                                         // 482
};                                                                                                                    // 483
                                                                                                                      // 484
                                                                                                                      // 485
/**                                                                                                                   // 486
 * Attempt to find the labelled control for the given label element.                                                  // 487
 *                                                                                                                    // 488
 * @param {EventTarget|HTMLLabelElement} labelElement                                                                 // 489
 * @returns {Element|null}                                                                                            // 490
 */                                                                                                                   // 491
FastClick.prototype.findControl = function(labelElement) {                                                            // 492
	'use strict';                                                                                                        // 493
                                                                                                                      // 494
	// Fast path for newer browsers supporting the HTML5 control attribute                                               // 495
	if (labelElement.control !== undefined) {                                                                            // 496
		return labelElement.control;                                                                                        // 497
	}                                                                                                                    // 498
                                                                                                                      // 499
	// All browsers under test that support touch events also support the HTML5 htmlFor attribute                        // 500
	if (labelElement.htmlFor) {                                                                                          // 501
		return document.getElementById(labelElement.htmlFor);                                                               // 502
	}                                                                                                                    // 503
                                                                                                                      // 504
	// If no for attribute exists, attempt to retrieve the first labellable descendant element                           // 505
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label                           // 506
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};                                                                                                                    // 508
                                                                                                                      // 509
                                                                                                                      // 510
/**                                                                                                                   // 511
 * On touch end, determine whether to send a click event at once.                                                     // 512
 *                                                                                                                    // 513
 * @param {Event} event                                                                                               // 514
 * @returns {boolean}                                                                                                 // 515
 */                                                                                                                   // 516
FastClick.prototype.onTouchEnd = function(event) {                                                                    // 517
	'use strict';                                                                                                        // 518
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;          // 519
                                                                                                                      // 520
	if (!this.trackingClick) {                                                                                           // 521
		return true;                                                                                                        // 522
	}                                                                                                                    // 523
                                                                                                                      // 524
	// Prevent phantom clicks on fast double-tap (issue #36)                                                             // 525
	if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {                                                        // 526
		this.cancelNextClick = true;                                                                                        // 527
		return true;                                                                                                        // 528
	}                                                                                                                    // 529
                                                                                                                      // 530
	// Reset to prevent wrong click cancel on input (issue #156).                                                        // 531
	this.cancelNextClick = false;                                                                                        // 532
                                                                                                                      // 533
	this.lastClickTime = event.timeStamp;                                                                                // 534
                                                                                                                      // 535
	trackingClickStart = this.trackingClickStart;                                                                        // 536
	this.trackingClick = false;                                                                                          // 537
	this.trackingClickStart = 0;                                                                                         // 538
                                                                                                                      // 539
	// On some iOS devices, the targetElement supplied with the event is invalid if the layer                            // 540
	// is performing a transition or scroll, and has to be re-detected manually. Note that                               // 541
	// for this to function correctly, it must be called *after* the event target is checked!                            // 542
	// See issue #57; also filed as rdar://13048589 .                                                                    // 543
	if (deviceIsIOSWithBadTarget) {                                                                                      // 544
		touch = event.changedTouches[0];                                                                                    // 545
                                                                                                                      // 546
		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null         // 547
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;                                     // 549
	}                                                                                                                    // 550
                                                                                                                      // 551
	targetTagName = targetElement.tagName.toLowerCase();                                                                 // 552
	if (targetTagName === 'label') {                                                                                     // 553
		forElement = this.findControl(targetElement);                                                                       // 554
		if (forElement) {                                                                                                   // 555
			this.focus(targetElement);                                                                                         // 556
			if (deviceIsAndroid) {                                                                                             // 557
				return false;                                                                                                     // 558
			}                                                                                                                  // 559
                                                                                                                      // 560
			targetElement = forElement;                                                                                        // 561
		}                                                                                                                   // 562
	} else if (this.needsFocus(targetElement)) {                                                                         // 563
                                                                                                                      // 564
		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;                                                                                         // 568
			return false;                                                                                                      // 569
		}                                                                                                                   // 570
                                                                                                                      // 571
		this.focus(targetElement);                                                                                          // 572
		this.sendClick(targetElement, event);                                                                               // 573
                                                                                                                      // 574
		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.                   // 575
		// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)                    // 576
		if (!deviceIsIOS || targetTagName !== 'select') {                                                                   // 577
			this.targetElement = null;                                                                                         // 578
			event.preventDefault();                                                                                            // 579
		}                                                                                                                   // 580
                                                                                                                      // 581
		return false;                                                                                                       // 582
	}                                                                                                                    // 583
                                                                                                                      // 584
	if (deviceIsIOS && !deviceIsIOS4) {                                                                                  // 585
                                                                                                                      // 586
		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled    // 587
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).                     // 588
		scrollParent = targetElement.fastClickScrollParent;                                                                 // 589
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {                               // 590
			return true;                                                                                                       // 591
		}                                                                                                                   // 592
	}                                                                                                                    // 593
                                                                                                                      // 594
	// Prevent the actual click from going though - unless the target node is marked as requiring                        // 595
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.                // 596
	if (!this.needsClick(targetElement)) {                                                                               // 597
		event.preventDefault();                                                                                             // 598
		this.sendClick(targetElement, event);                                                                               // 599
	}                                                                                                                    // 600
                                                                                                                      // 601
	return false;                                                                                                        // 602
};                                                                                                                    // 603
                                                                                                                      // 604
                                                                                                                      // 605
/**                                                                                                                   // 606
 * On touch cancel, stop tracking the click.                                                                          // 607
 *                                                                                                                    // 608
 * @returns {void}                                                                                                    // 609
 */                                                                                                                   // 610
FastClick.prototype.onTouchCancel = function() {                                                                      // 611
	'use strict';                                                                                                        // 612
	this.trackingClick = false;                                                                                          // 613
	this.targetElement = null;                                                                                           // 614
};                                                                                                                    // 615
                                                                                                                      // 616
                                                                                                                      // 617
/**                                                                                                                   // 618
 * Determine mouse events which should be permitted.                                                                  // 619
 *                                                                                                                    // 620
 * @param {Event} event                                                                                               // 621
 * @returns {boolean}                                                                                                 // 622
 */                                                                                                                   // 623
FastClick.prototype.onMouse = function(event) {                                                                       // 624
	'use strict';                                                                                                        // 625
                                                                                                                      // 626
	// If a target element was never set (because a touch event was never fired) allow the event                         // 627
	if (!this.targetElement) {                                                                                           // 628
		return true;                                                                                                        // 629
	}                                                                                                                    // 630
                                                                                                                      // 631
	if (event.forwardedTouchEvent) {                                                                                     // 632
		return true;                                                                                                        // 633
	}                                                                                                                    // 634
                                                                                                                      // 635
	// Programmatically generated events targeting a specific element should be permitted                                // 636
	if (!event.cancelable) {                                                                                             // 637
		return true;                                                                                                        // 638
	}                                                                                                                    // 639
                                                                                                                      // 640
	// Derive and check the target element to see whether the mouse event needs to be permitted;                         // 641
	// unless explicitly enabled, prevent non-touch click events from triggering actions,                                // 642
	// to prevent ghost/doubleclicks.                                                                                    // 643
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {                                                  // 644
                                                                                                                      // 645
		// Prevent any user-added listeners declared on FastClick element from being fired.                                 // 646
		if (event.stopImmediatePropagation) {                                                                               // 647
			event.stopImmediatePropagation();                                                                                  // 648
		} else {                                                                                                            // 649
                                                                                                                      // 650
			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)                // 651
			event.propagationStopped = true;                                                                                   // 652
		}                                                                                                                   // 653
                                                                                                                      // 654
		// Cancel the event                                                                                                 // 655
		event.stopPropagation();                                                                                            // 656
		event.preventDefault();                                                                                             // 657
                                                                                                                      // 658
		return false;                                                                                                       // 659
	}                                                                                                                    // 660
                                                                                                                      // 661
	// If the mouse event is permitted, return true for the action to go through.                                        // 662
	return true;                                                                                                         // 663
};                                                                                                                    // 664
                                                                                                                      // 665
                                                                                                                      // 666
/**                                                                                                                   // 667
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring                      // 668
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or                       // 669
 * an actual click which should be permitted.                                                                         // 670
 *                                                                                                                    // 671
 * @param {Event} event                                                                                               // 672
 * @returns {boolean}                                                                                                 // 673
 */                                                                                                                   // 674
FastClick.prototype.onClick = function(event) {                                                                       // 675
	'use strict';                                                                                                        // 676
	var permitted;                                                                                                       // 677
                                                                                                                      // 678
	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {                                                                                            // 680
		this.targetElement = null;                                                                                          // 681
		this.trackingClick = false;                                                                                         // 682
		return true;                                                                                                        // 683
	}                                                                                                                    // 684
                                                                                                                      // 685
	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {                                                          // 687
		return true;                                                                                                        // 688
	}                                                                                                                    // 689
                                                                                                                      // 690
	permitted = this.onMouse(event);                                                                                     // 691
                                                                                                                      // 692
	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {                                                                                                    // 694
		this.targetElement = null;                                                                                          // 695
	}                                                                                                                    // 696
                                                                                                                      // 697
	// If clicks are permitted, return true for the action to go through.                                                // 698
	return permitted;                                                                                                    // 699
};                                                                                                                    // 700
                                                                                                                      // 701
                                                                                                                      // 702
/**                                                                                                                   // 703
 * Remove all FastClick's event listeners.                                                                            // 704
 *                                                                                                                    // 705
 * @returns {void}                                                                                                    // 706
 */                                                                                                                   // 707
FastClick.prototype.destroy = function() {                                                                            // 708
	'use strict';                                                                                                        // 709
	var layer = this.layer;                                                                                              // 710
                                                                                                                      // 711
	if (deviceIsAndroid) {                                                                                               // 712
		layer.removeEventListener('mouseover', this.onMouse, true);                                                         // 713
		layer.removeEventListener('mousedown', this.onMouse, true);                                                         // 714
		layer.removeEventListener('mouseup', this.onMouse, true);                                                           // 715
	}                                                                                                                    // 716
                                                                                                                      // 717
	layer.removeEventListener('click', this.onClick, true);                                                              // 718
	layer.removeEventListener('touchstart', this.onTouchStart, false);                                                   // 719
	layer.removeEventListener('touchmove', this.onTouchMove, false);                                                     // 720
	layer.removeEventListener('touchend', this.onTouchEnd, false);                                                       // 721
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);                                                 // 722
};                                                                                                                    // 723
                                                                                                                      // 724
                                                                                                                      // 725
/**                                                                                                                   // 726
 * Check whether FastClick is needed.                                                                                 // 727
 *                                                                                                                    // 728
 * @param {Element} layer The layer to listen on                                                                      // 729
 */                                                                                                                   // 730
FastClick.notNeeded = function(layer) {                                                                               // 731
	'use strict';                                                                                                        // 732
	var metaViewport;                                                                                                    // 733
	var chromeVersion;                                                                                                   // 734
	var blackberryVersion;                                                                                               // 735
                                                                                                                      // 736
	// Devices that don't support touch don't need FastClick                                                             // 737
	if (typeof window.ontouchstart === 'undefined') {                                                                    // 738
		return true;                                                                                                        // 739
	}                                                                                                                    // 740
                                                                                                                      // 741
	// Chrome version - zero for other browsers                                                                          // 742
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];                                          // 743
                                                                                                                      // 744
	if (chromeVersion) {                                                                                                 // 745
                                                                                                                      // 746
		if (deviceIsAndroid) {                                                                                              // 747
			metaViewport = document.querySelector('meta[name=viewport]');                                                      // 748
                                                                                                                      // 749
			if (metaViewport) {                                                                                                // 750
				// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)                                   // 751
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {                                                    // 752
					return true;                                                                                                     // 753
				}                                                                                                                 // 754
				// Chrome 32 and above with width=device-width or less don't need FastClick                                       // 755
				if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {                            // 756
					return true;                                                                                                     // 757
				}                                                                                                                 // 758
			}                                                                                                                  // 759
                                                                                                                      // 760
		// Chrome desktop doesn't need FastClick (issue #15)                                                                // 761
		} else {                                                                                                            // 762
			return true;                                                                                                       // 763
		}                                                                                                                   // 764
	}                                                                                                                    // 765
                                                                                                                      // 766
	if (deviceIsBlackBerry10) {                                                                                          // 767
		blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);                                       // 768
                                                                                                                      // 769
		// BlackBerry 10.3+ does not require Fastclick library.                                                             // 770
		// https://github.com/ftlabs/fastclick/issues/251                                                                   // 771
		if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {                                                      // 772
			metaViewport = document.querySelector('meta[name=viewport]');                                                      // 773
                                                                                                                      // 774
			if (metaViewport) {                                                                                                // 775
				// user-scalable=no eliminates click delay.                                                                       // 776
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {                                                    // 777
					return true;                                                                                                     // 778
				}                                                                                                                 // 779
				// width=device-width (or less than device-width) eliminates click delay.                                         // 780
				if (document.documentElement.scrollWidth <= window.outerWidth) {                                                  // 781
					return true;                                                                                                     // 782
				}                                                                                                                 // 783
			}                                                                                                                  // 784
		}                                                                                                                   // 785
	}                                                                                                                    // 786
                                                                                                                      // 787
	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)                                   // 788
	if (layer.style.msTouchAction === 'none') {                                                                          // 789
		return true;                                                                                                        // 790
	}                                                                                                                    // 791
                                                                                                                      // 792
	return false;                                                                                                        // 793
};                                                                                                                    // 794
                                                                                                                      // 795
                                                                                                                      // 796
/**                                                                                                                   // 797
 * Factory method for creating a FastClick object                                                                     // 798
 *                                                                                                                    // 799
 * @param {Element} layer The layer to listen on                                                                      // 800
 * @param {Object} options The options to override the defaults                                                       // 801
 */                                                                                                                   // 802
FastClick.attach = function(layer, options) {                                                                         // 803
	'use strict';                                                                                                        // 804
	return new FastClick(layer, options);                                                                                // 805
};                                                                                                                    // 806
                                                                                                                      // 807
                                                                                                                      // 808
if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {                                     // 809
                                                                                                                      // 810
	// AMD. Register as an anonymous module.                                                                             // 811
	define(function() {                                                                                                  // 812
		'use strict';                                                                                                       // 813
		return FastClick;                                                                                                   // 814
	});                                                                                                                  // 815
} else if (typeof module !== 'undefined' && module.exports) {                                                         // 816
	module.exports = FastClick.attach;                                                                                   // 817
	module.exports.FastClick = FastClick;                                                                                // 818
} else {                                                                                                              // 819
	window.FastClick = FastClick;                                                                                        // 820
}                                                                                                                     // 821
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/fastclick/post.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// This exports object was created in pre.js.  Now copy the 'FastClick' object                                        // 1
// from it into the package-scope variable `FastClick`, which will get exported.                                      // 2
                                                                                                                      // 3
FastClick = module.exports.FastClick;                                                                                 // 4
                                                                                                                      // 5
Meteor.startup(function () {                                                                                          // 6
  FastClick.attach(document.body);                                                                                    // 7
});                                                                                                                   // 8
                                                                                                                      // 9
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.fastclick = {
  FastClick: FastClick
};

})();
