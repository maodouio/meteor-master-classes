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
var Accounts = Package['accounts-base'].Accounts;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var Iron = Package['iron:core'].Iron;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var AccountsTemplates, capitalize, signedInAs, Field, STATE_PAT, ERRORS_PAT, INFO_PAT, INPUT_ICONS_PAT, ObjWithStringValues, TEXTS_PAT, CONFIG_PAT, FIELD_SUB_PAT, FIELD_PAT, AT, form, markIfMissing, options;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/utils.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
capitalize = function(str) {                                                                                         // 1
    return str.charAt(0).toUpperCase() + str.slice(1);                                                               // 2
};                                                                                                                   // 3
                                                                                                                     // 4
signedInAs =  function() {                                                                                           // 5
    var user = Meteor.user();                                                                                        // 6
    if (user) {                                                                                                      // 7
        if (user.username) {                                                                                         // 8
            return user.username;                                                                                    // 9
        } else if (user.profile && user.profile.name) {                                                              // 10
            return user.profile.name;                                                                                // 11
        } else if (user.emails && user.emails[0]) {                                                                  // 12
            return user.emails[0].address;                                                                           // 13
        } else {                                                                                                     // 14
            return "Signed In";                                                                                      // 15
        }                                                                                                            // 16
    }                                                                                                                // 17
};                                                                                                                   // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/field.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// ---------------------------------------------------------------------------------                                 // 1
                                                                                                                     // 2
// Field object                                                                                                      // 3
                                                                                                                     // 4
// ---------------------------------------------------------------------------------                                 // 5
                                                                                                                     // 6
                                                                                                                     // 7
Field = function(field){                                                                                             // 8
    check(field, FIELD_PAT);                                                                                         // 9
    _.defaults(this, field);                                                                                         // 10
                                                                                                                     // 11
    this.validating = new ReactiveVar(false);                                                                        // 12
    this.status = new ReactiveVar(null);                                                                             // 13
};                                                                                                                   // 14
                                                                                                                     // 15
if (Meteor.isClient)                                                                                                 // 16
    Field.prototype.clearStatus = function(){                                                                        // 17
        return this.status.set(null);                                                                                // 18
    };                                                                                                               // 19
if (Meteor.isServer)                                                                                                 // 20
    Field.prototype.clearStatus = function(){                                                                        // 21
        // Nothing to do server-side                                                                                 // 22
        return                                                                                                       // 23
    };                                                                                                               // 24
                                                                                                                     // 25
Field.prototype.fixValue = function(value){                                                                          // 26
    if (this.type === "checkbox")                                                                                    // 27
        return !!value;                                                                                              // 28
    if (this.type === "select")                                                                                      // 29
        // TODO: something working...                                                                                // 30
        return value;                                                                                                // 31
    if (this.type === "radio")                                                                                       // 32
        // TODO: something working...                                                                                // 33
        return value;                                                                                                // 34
    // Possibly applies required transformations to the input value                                                  // 35
    if (this.trim)                                                                                                   // 36
        value = value.trim();                                                                                        // 37
    if (this.lowercase)                                                                                              // 38
        value = value.toLowerCase();                                                                                 // 39
    if (this.uppercase)                                                                                              // 40
        value = value.toUpperCase();                                                                                 // 41
    if (!!this.transform)                                                                                            // 42
        value = this.transform(value);                                                                               // 43
    return value;                                                                                                    // 44
};                                                                                                                   // 45
                                                                                                                     // 46
if (Meteor.isClient)                                                                                                 // 47
    Field.prototype.getDisplayName = function(state){                                                                // 48
        var dN = this.displayName;                                                                                   // 49
        if (_.isObject(dN))                                                                                          // 50
            dN = dN[state] || dN["default"];                                                                         // 51
        if (!dN)                                                                                                     // 52
            dN = capitalize(this._id);                                                                               // 53
        return dN;                                                                                                   // 54
    };                                                                                                               // 55
                                                                                                                     // 56
if (Meteor.isClient)                                                                                                 // 57
    Field.prototype.getPlaceholder = function(state){                                                                // 58
        var placeholder = this.placeholder;                                                                          // 59
        if (_.isObject(placeholder))                                                                                 // 60
            placeholder = placeholder[state] || placeholder["default"];                                              // 61
        if (!placeholder)                                                                                            // 62
            placeholder = capitalize(this._id);                                                                      // 63
        return placeholder;                                                                                          // 64
    };                                                                                                               // 65
                                                                                                                     // 66
Field.prototype.getStatus = function(){                                                                              // 67
    return this.status.get();                                                                                        // 68
};                                                                                                                   // 69
                                                                                                                     // 70
if (Meteor.isClient)                                                                                                 // 71
    Field.prototype.getValue = function(tempalteInstance){                                                           // 72
        if (this.type === "checkbox")                                                                                // 73
            return !!(tempalteInstance.$("#at-field-" + this._id + ":checked").val());                               // 74
        if (this.type === "radio")                                                                                   // 75
            return tempalteInstance.$("[name=at-field-"+ this._id + "]:checked").val();                              // 76
        return tempalteInstance.$("#at-field-" + this._id).val();                                                    // 77
    };                                                                                                               // 78
                                                                                                                     // 79
if (Meteor.isClient)                                                                                                 // 80
    Field.prototype.hasError = function() {                                                                          // 81
        return this.negativeValidation && this.status.get();                                                         // 82
    };                                                                                                               // 83
                                                                                                                     // 84
if (Meteor.isClient)                                                                                                 // 85
    Field.prototype.hasIcon = function(){                                                                            // 86
        if (this.showValidating && this.isValidating())                                                              // 87
            return true;                                                                                             // 88
        if (this.negativeFeedback && this.hasError())                                                                // 89
            return true;                                                                                             // 90
        if (this.positiveFeedback && this.hasSuccess())                                                              // 91
            return true;                                                                                             // 92
    };                                                                                                               // 93
                                                                                                                     // 94
if (Meteor.isClient)                                                                                                 // 95
    Field.prototype.hasSuccess = function() {                                                                        // 96
        return this.positiveValidation && this.status.get() === false;                                               // 97
    };                                                                                                               // 98
                                                                                                                     // 99
if (Meteor.isClient)                                                                                                 // 100
    Field.prototype.iconClass = function(){                                                                          // 101
        if (this.isValidating())                                                                                     // 102
            return AccountsTemplates.texts.inputIcons["isValidating"];                                               // 103
        if (this.hasError())                                                                                         // 104
            return AccountsTemplates.texts.inputIcons["hasError"];                                                   // 105
        if (this.hasSuccess())                                                                                       // 106
            return AccountsTemplates.texts.inputIcons["hasSuccess"];                                                 // 107
    };                                                                                                               // 108
                                                                                                                     // 109
if (Meteor.isClient)                                                                                                 // 110
    Field.prototype.isValidating = function(){                                                                       // 111
        return this.validating.get();                                                                                // 112
    };                                                                                                               // 113
                                                                                                                     // 114
if (Meteor.isClient)                                                                                                 // 115
    Field.prototype.setError = function(err){                                                                        // 116
        check(err, Match.OneOf(String, undefined));                                                                  // 117
        return this.status.set(err || true);                                                                         // 118
    };                                                                                                               // 119
if (Meteor.isServer)                                                                                                 // 120
    Field.prototype.setError = function(err){                                                                        // 121
        // Nothing to do server-side                                                                                 // 122
        return;                                                                                                      // 123
    };                                                                                                               // 124
                                                                                                                     // 125
if (Meteor.isClient)                                                                                                 // 126
    Field.prototype.setSuccess = function(){                                                                         // 127
        return this.status.set(false);                                                                               // 128
    };                                                                                                               // 129
if (Meteor.isServer)                                                                                                 // 130
    Field.prototype.setSuccess = function(){                                                                         // 131
        // Nothing to do server-side                                                                                 // 132
        return;                                                                                                      // 133
    };                                                                                                               // 134
                                                                                                                     // 135
                                                                                                                     // 136
if (Meteor.isClient)                                                                                                 // 137
    Field.prototype.setValidating = function(state){                                                                 // 138
        check(state, Boolean);                                                                                       // 139
        return this.validating.set(state);                                                                           // 140
    };                                                                                                               // 141
if (Meteor.isServer)                                                                                                 // 142
    Field.prototype.setValidating = function(state){                                                                 // 143
        // Nothing to do server-side                                                                                 // 144
        return;                                                                                                      // 145
    };                                                                                                               // 146
                                                                                                                     // 147
if (Meteor.isClient)                                                                                                 // 148
    Field.prototype.setValue = function(tempalteInstance, value){                                                    // 149
        if (this.type === "checkbox") {                                                                              // 150
            tempalteInstance.$("#at-field-" + this._id).prop('checked', true);                                       // 151
            return;                                                                                                  // 152
        }                                                                                                            // 153
        if (this.type === "radio") {                                                                                 // 154
            tempalteInstance.$("[name=at-field-"+ this._id + "]").prop('checked', true);                             // 155
            return;                                                                                                  // 156
        }                                                                                                            // 157
        tempalteInstance.$("#at-field-" + this._id).val(value);                                                      // 158
    };                                                                                                               // 159
                                                                                                                     // 160
Field.prototype.validate = function(value, strict) {                                                                 // 161
    check(value, Match.OneOf(undefined, String, Boolean));                                                           // 162
    this.setValidating(true);                                                                                        // 163
    this.clearStatus();                                                                                              // 164
    if (value === undefined || value === ''){                                                                        // 165
        if (!!strict){                                                                                               // 166
            if (this.required) {                                                                                     // 167
                this.setError("Required Field");                                                                     // 168
                this.setValidating(false);                                                                           // 169
                return "Required Field";                                                                             // 170
            }                                                                                                        // 171
            else {                                                                                                   // 172
                this.setSuccess();                                                                                   // 173
                this.setValidating(false);                                                                           // 174
                return false;                                                                                        // 175
            }                                                                                                        // 176
        }                                                                                                            // 177
        else {                                                                                                       // 178
            this.clearStatus();                                                                                      // 179
            this.setValidating(false);                                                                               // 180
            return null;                                                                                             // 181
        }                                                                                                            // 182
    }                                                                                                                // 183
    var valueLength = value.length;                                                                                  // 184
    var minLength = this.minLength;                                                                                  // 185
    if (minLength && valueLength < minLength) {                                                                      // 186
        this.setError("Minimum required length: " + minLength);                                                      // 187
        this.setValidating(false);                                                                                   // 188
        return "Minimum required length: " + minLength;                                                              // 189
    }                                                                                                                // 190
    var maxLength = this.maxLength;                                                                                  // 191
    if (maxLength && valueLength > maxLength) {                                                                      // 192
        this.setError("Maximum allowed length: " + maxLength);                                                       // 193
        this.setValidating(false);                                                                                   // 194
        return "Maximum allowed length: " + maxLength;                                                               // 195
    }                                                                                                                // 196
    if (this.re && valueLength && !value.match(this.re)) {                                                           // 197
        this.setError(this.errStr);                                                                                  // 198
        this.setValidating(false);                                                                                   // 199
        return this.errStr;                                                                                          // 200
    }                                                                                                                // 201
    if (this.func){                                                                                                  // 202
        var result = this.func(value);                                                                               // 203
        var err = result === true ? this.errStr || true : result;                                                    // 204
        if (result === undefined)                                                                                    // 205
            return err;                                                                                              // 206
        this.status.set(err);                                                                                        // 207
        this.setValidating(false);                                                                                   // 208
        return err;                                                                                                  // 209
    }                                                                                                                // 210
    this.setSuccess();                                                                                               // 211
    this.setValidating(false);                                                                                       // 212
    return false;                                                                                                    // 213
};                                                                                                                   // 214
                                                                                                                     // 215
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/core.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// ---------------------------------------------------------------------------------                                 // 1
                                                                                                                     // 2
// Patterns for methods" parameters                                                                                  // 3
                                                                                                                     // 4
// ---------------------------------------------------------------------------------                                 // 5
                                                                                                                     // 6
STATE_PAT = {                                                                                                        // 7
    changePwd: Match.Optional(String),                                                                               // 8
    enrollAccount: Match.Optional(String),                                                                           // 9
    forgotPwd: Match.Optional(String),                                                                               // 10
    resetPwd: Match.Optional(String),                                                                                // 11
    signIn: Match.Optional(String),                                                                                  // 12
    signUp: Match.Optional(String),                                                                                  // 13
};                                                                                                                   // 14
                                                                                                                     // 15
ERRORS_PAT = {                                                                                                       // 16
    mustBeLoggedIn: Match.Optional(String),                                                                          // 17
    pwdMismatch: Match.Optional(String),                                                                             // 18
};                                                                                                                   // 19
                                                                                                                     // 20
INFO_PAT = {                                                                                                         // 21
    emailSent: Match.Optional(String),                                                                               // 22
    emailVerified: Match.Optional(String),                                                                           // 23
    pwdChanged: Match.Optional(String),                                                                              // 24
    pwdReset: Match.Optional(String),                                                                                // 25
    pwdSet: Match.Optional(String),                                                                                  // 26
    signUpVerifyEmail: Match.Optional(String),                                                                       // 27
};                                                                                                                   // 28
                                                                                                                     // 29
INPUT_ICONS_PAT = {                                                                                                  // 30
    isValidating: Match.Optional(String),                                                                            // 31
    hasError: Match.Optional(String),                                                                                // 32
    hasSuccess: Match.Optional(String),                                                                              // 33
};                                                                                                                   // 34
                                                                                                                     // 35
ObjWithStringValues = Match.Where(function (x) {                                                                     // 36
    check(x, Object);                                                                                                // 37
    _.each(_.values(x), function(value){                                                                             // 38
        check(value, String);                                                                                        // 39
    });                                                                                                              // 40
    return true;                                                                                                     // 41
});                                                                                                                  // 42
                                                                                                                     // 43
TEXTS_PAT = {                                                                                                        // 44
    button: Match.Optional(STATE_PAT),                                                                               // 45
    errors: Match.Optional(ERRORS_PAT),                                                                              // 46
    navSignIn: Match.Optional(String),                                                                               // 47
    navSignOut: Match.Optional(String),                                                                              // 48
    info: Match.Optional(INFO_PAT),                                                                                  // 49
    inputIcons: Match.Optional(INPUT_ICONS_PAT),                                                                     // 50
    optionalField: Match.Optional(String),                                                                           // 51
    pwdLink_pre: Match.Optional(String),                                                                             // 52
    pwdLink_link: Match.Optional(String),                                                                            // 53
    pwdLink_suff: Match.Optional(String),                                                                            // 54
    sep: Match.Optional(String),                                                                                     // 55
    signInLink_pre: Match.Optional(String),                                                                          // 56
    signInLink_link: Match.Optional(String),                                                                         // 57
    signInLink_suff: Match.Optional(String),                                                                         // 58
    signUpLink_pre: Match.Optional(String),                                                                          // 59
    signUpLink_link: Match.Optional(String),                                                                         // 60
    signUpLink_suff: Match.Optional(String),                                                                         // 61
    socialAdd: Match.Optional(String),                                                                               // 62
    socialConfigure: Match.Optional(String),                                                                         // 63
    socialIcons: Match.Optional(ObjWithStringValues),                                                                // 64
    socialRemove: Match.Optional(String),                                                                            // 65
    socialSignIn: Match.Optional(String),                                                                            // 66
    socialSignUp: Match.Optional(String),                                                                            // 67
    socialWith: Match.Optional(String),                                                                              // 68
    termsPreamble: Match.Optional(String),                                                                           // 69
    termsPrivacy: Match.Optional(String),                                                                            // 70
    termsAnd: Match.Optional(String),                                                                                // 71
    termsTerms: Match.Optional(String),                                                                              // 72
    title: Match.Optional(STATE_PAT),                                                                                // 73
};                                                                                                                   // 74
                                                                                                                     // 75
// Configuration pattern to be checked with check                                                                    // 76
CONFIG_PAT = {                                                                                                       // 77
    // Behaviour                                                                                                     // 78
    confirmPassword: Match.Optional(Boolean),                                                                        // 79
    defaultState: Match.Optional(String),                                                                            // 80
    enablePasswordChange: Match.Optional(Boolean),                                                                   // 81
    enforceEmailVerification: Match.Optional(Boolean),                                                               // 82
    forbidClientAccountCreation: Match.Optional(Boolean),                                                            // 83
    lowercaseUsername: Match.Optional(Boolean),                                                                      // 84
    overrideLoginErrors: Match.Optional(Boolean),                                                                    // 85
    sendVerificationEmail: Match.Optional(Boolean),                                                                  // 86
    socialLoginStyle: Match.Optional(Match.OneOf("popup", "redirect")),                                              // 87
                                                                                                                     // 88
    // Appearance                                                                                                    // 89
    defaultLayout: Match.Optional(String),                                                                           // 90
    showAddRemoveServices: Match.Optional(Boolean),                                                                  // 91
    showForgotPasswordLink: Match.Optional(Boolean),                                                                 // 92
    showLabels: Match.Optional(Boolean),                                                                             // 93
    showPlaceholders: Match.Optional(Boolean),                                                                       // 94
    hideSignInLink: Match.Optional(Boolean),                                                                         // 95
    hideSignUpLink: Match.Optional(Boolean),                                                                         // 96
                                                                                                                     // 97
    // Client-side Validation                                                                                        // 98
    continuousValidation: Match.Optional(Boolean),                                                                   // 99
    negativeFeedback: Match.Optional(Boolean),                                                                       // 100
    negativeValidation: Match.Optional(Boolean),                                                                     // 101
    positiveValidation: Match.Optional(Boolean),                                                                     // 102
    positiveFeedback: Match.Optional(Boolean),                                                                       // 103
    showValidating: Match.Optional(Boolean),                                                                         // 104
                                                                                                                     // 105
    // Privacy Policy and Terms of Use                                                                               // 106
    privacyUrl: Match.Optional(String),                                                                              // 107
    termsUrl: Match.Optional(String),                                                                                // 108
                                                                                                                     // 109
    // Redirects                                                                                                     // 110
    homeRoutePath: Match.Optional(String),                                                                           // 111
    redirectTimeout: Match.Optional(Number),                                                                         // 112
                                                                                                                     // 113
    // Hooks                                                                                                         // 114
    onSubmitHook: Match.Optional(Function),                                                                          // 115
    onLogoutHook: Match.Optional(Function),                                                                          // 116
                                                                                                                     // 117
    texts: Match.Optional(TEXTS_PAT),                                                                                // 118
                                                                                                                     // 119
    //reCaptcha config                                                                                               // 120
    reCaptcha: Match.Optional({                                                                                      // 121
        siteKey: Match.Optional(String),                                                                             // 122
        secretKey: Match.Optional(String),                                                                           // 123
        theme: Match.Optional(Match.OneOf("dark", "light")),                                                         // 124
        data_type: Match.Optional(Match.OneOf("audio", "image")),                                                    // 125
    }),                                                                                                              // 126
                                                                                                                     // 127
    showReCaptcha: Match.Optional(Boolean),                                                                          // 128
};                                                                                                                   // 129
                                                                                                                     // 130
                                                                                                                     // 131
FIELD_SUB_PAT = {                                                                                                    // 132
    "default": Match.Optional(String),                                                                               // 133
    changePwd: Match.Optional(String),                                                                               // 134
    enrollAccount: Match.Optional(String),                                                                           // 135
    forgotPwd: Match.Optional(String),                                                                               // 136
    resetPwd: Match.Optional(String),                                                                                // 137
    signIn: Match.Optional(String),                                                                                  // 138
    signUp: Match.Optional(String),                                                                                  // 139
};                                                                                                                   // 140
                                                                                                                     // 141
                                                                                                                     // 142
// Field pattern                                                                                                     // 143
FIELD_PAT = {                                                                                                        // 144
    _id: String,                                                                                                     // 145
    type: String,                                                                                                    // 146
    required: Match.Optional(Boolean),                                                                               // 147
    displayName: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                 // 148
    placeholder: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                 // 149
    select: Match.Optional([{text: String, value: Match.Any}]),                                                      // 150
    minLength: Match.Optional(Match.Integer),                                                                        // 151
    maxLength: Match.Optional(Match.Integer),                                                                        // 152
    re: Match.Optional(RegExp),                                                                                      // 153
    func: Match.Optional(Match.Where(_.isFunction)),                                                                 // 154
    errStr: Match.Optional(String),                                                                                  // 155
                                                                                                                     // 156
    // Client-side Validation                                                                                        // 157
    continuousValidation: Match.Optional(Boolean),                                                                   // 158
    negativeFeedback: Match.Optional(Boolean),                                                                       // 159
    negativeValidation: Match.Optional(Boolean),                                                                     // 160
    positiveValidation: Match.Optional(Boolean),                                                                     // 161
    positiveFeedback: Match.Optional(Boolean),                                                                       // 162
                                                                                                                     // 163
    // Transforms                                                                                                    // 164
    trim: Match.Optional(Boolean),                                                                                   // 165
    lowercase: Match.Optional(Boolean),                                                                              // 166
    uppercase: Match.Optional(Boolean),                                                                              // 167
    transform: Match.Optional(Match.Where(_.isFunction)),                                                            // 168
                                                                                                                     // 169
    // Custom options                                                                                                // 170
    options: Match.Optional(Object),                                                                                 // 171
    template: Match.Optional(String),                                                                                // 172
};                                                                                                                   // 173
                                                                                                                     // 174
// Route configuration pattern to be checked with check                                                              // 175
var ROUTE_PAT = {                                                                                                    // 176
    name: Match.Optional(String),                                                                                    // 177
    path: Match.Optional(String),                                                                                    // 178
    template: Match.Optional(String),                                                                                // 179
    layoutTemplate: Match.Optional(String),                                                                          // 180
    redirect: Match.Optional(Match.OneOf(String, Match.Where(_.isFunction))),                                        // 181
};                                                                                                                   // 182
                                                                                                                     // 183
                                                                                                                     // 184
// -----------------------------------------------------------------------------                                     // 185
                                                                                                                     // 186
// AccountsTemplates object                                                                                          // 187
                                                                                                                     // 188
// -----------------------------------------------------------------------------                                     // 189
                                                                                                                     // 190
                                                                                                                     // 191
                                                                                                                     // 192
// -------------------                                                                                               // 193
// Client/Server stuff                                                                                               // 194
// -------------------                                                                                               // 195
                                                                                                                     // 196
// Constructor                                                                                                       // 197
AT = function() {                                                                                                    // 198
                                                                                                                     // 199
};                                                                                                                   // 200
                                                                                                                     // 201
                                                                                                                     // 202
                                                                                                                     // 203
                                                                                                                     // 204
/*                                                                                                                   // 205
    Each field object is represented by the following properties:                                                    // 206
        _id:         String   (required)  // A unique field"s id / name                                              // 207
        type:        String   (required)  // Displayed input type                                                    // 208
        required:    Boolean  (optional)  // Specifies Whether to fail or not when field is left empty               // 209
        displayName: String   (optional)  // The field"s name to be displayed as a label above the input element     // 210
        placeholder: String   (optional)  // The placeholder text to be displayed inside the input element           // 211
        minLength:   Integer  (optional)  // Possibly specifies the minimum allowed length                           // 212
        maxLength:   Integer  (optional)  // Possibly specifies the maximum allowed length                           // 213
        re:          RegExp   (optional)  // Regular expression for validation                                       // 214
        func:        Function (optional)  // Custom function for validation                                          // 215
        errStr:      String   (optional)  // Error message to be displayed in case re validation fails               // 216
*/                                                                                                                   // 217
                                                                                                                     // 218
                                                                                                                     // 219
                                                                                                                     // 220
/*                                                                                                                   // 221
    Routes configuration can be done by calling AccountsTemplates.configureRoute with the route name and the         // 222
    following options in a separate object. E.g. AccountsTemplates.configureRoute("gingIn", option);                 // 223
        name:           String (optional). A unique route"s name to be passed to iron-router                         // 224
        path:           String (optional). A unique route"s path to be passed to iron-router                         // 225
        template:       String (optional). The name of the template to be rendered                                   // 226
        layoutTemplate: String (optional). The name of the layout to be used                                         // 227
        redirect:       String (optional). The name of the route (or its path) where to redirect after form submit   // 228
*/                                                                                                                   // 229
                                                                                                                     // 230
                                                                                                                     // 231
// Allowed routes along with theirs default configuration values                                                     // 232
AT.prototype.ROUTE_DEFAULT = {                                                                                       // 233
    changePwd:      { name: "atChangePwd",      path: "/change-password"},                                           // 234
    enrollAccount:  { name: "atEnrollAccount",  path: "/enroll-account"},                                            // 235
    ensureSignedIn: { name: "atEnsureSignedIn", path: null},                                                         // 236
    forgotPwd:      { name: "atForgotPwd",      path: "/forgot-password"},                                           // 237
    resetPwd:       { name: "atResetPwd",       path: "/reset-password"},                                            // 238
    signIn:         { name: "atSignIn",         path: "/sign-in"},                                                   // 239
    signUp:         { name: "atSignUp",         path: "/sign-up"},                                                   // 240
    verifyEmail:    { name: "atVerifyEmail",    path: "/verify-email"},                                              // 241
};                                                                                                                   // 242
                                                                                                                     // 243
                                                                                                                     // 244
                                                                                                                     // 245
// Allowed input types                                                                                               // 246
AT.prototype.INPUT_TYPES = [                                                                                         // 247
    "checkbox",                                                                                                      // 248
    "email",                                                                                                         // 249
    "hidden",                                                                                                        // 250
    "password",                                                                                                      // 251
    "radio",                                                                                                         // 252
    "select",                                                                                                        // 253
    "tel",                                                                                                           // 254
    "text",                                                                                                          // 255
    "url",                                                                                                           // 256
];                                                                                                                   // 257
                                                                                                                     // 258
// Current configuration values                                                                                      // 259
AT.prototype.options = {                                                                                             // 260
    // Appearance                                                                                                    // 261
    //defaultLayout: undefined,                                                                                      // 262
    showAddRemoveServices: false,                                                                                    // 263
    showForgotPasswordLink: false,                                                                                   // 264
    showLabels: true,                                                                                                // 265
    showPlaceholders: true,                                                                                          // 266
                                                                                                                     // 267
    // Behaviour                                                                                                     // 268
    confirmPassword: true,                                                                                           // 269
    defaultState: "signIn",                                                                                          // 270
    enablePasswordChange: false,                                                                                     // 271
    forbidClientAccountCreation: false,                                                                              // 272
    lowercaseUsername: false,                                                                                        // 273
    overrideLoginErrors: true,                                                                                       // 274
    sendVerificationEmail: false,                                                                                    // 275
    socialLoginStyle: "popup",                                                                                       // 276
                                                                                                                     // 277
    // Client-side Validation                                                                                        // 278
    //continuousValidation: false,                                                                                   // 279
    //negativeFeedback: false,                                                                                       // 280
    //negativeValidation: false,                                                                                     // 281
    //positiveValidation: false,                                                                                     // 282
    //positiveFeedback: false,                                                                                       // 283
    //showValidating: false,                                                                                         // 284
                                                                                                                     // 285
    // Privacy Policy and Terms of Use                                                                               // 286
    privacyUrl: undefined,                                                                                           // 287
    termsUrl: undefined,                                                                                             // 288
                                                                                                                     // 289
    // Redirects                                                                                                     // 290
    homeRoutePath: "/",                                                                                              // 291
    redirectTimeout: 2000, // 2 seconds                                                                              // 292
                                                                                                                     // 293
    // Hooks                                                                                                         // 294
    onSubmitHook: undefined,                                                                                         // 295
};                                                                                                                   // 296
                                                                                                                     // 297
AT.prototype.SPECIAL_FIELDS = [                                                                                      // 298
    "password_again",                                                                                                // 299
    "username_and_email",                                                                                            // 300
];                                                                                                                   // 301
                                                                                                                     // 302
// SignIn / SignUp fields                                                                                            // 303
AT.prototype._fields = [                                                                                             // 304
    new Field({                                                                                                      // 305
        _id: "email",                                                                                                // 306
        type: "email",                                                                                               // 307
        required: true,                                                                                              // 308
        lowercase: true,                                                                                             // 309
        trim: true,                                                                                                  // 310
        func: function(email){                                                                                       // 311
            return !_.contains(email, '@');                                                                          // 312
        },                                                                                                           // 313
        errStr: 'Invalid email',                                                                                     // 314
    }),                                                                                                              // 315
    new Field({                                                                                                      // 316
        _id: "password",                                                                                             // 317
        type: "password",                                                                                            // 318
        required: true,                                                                                              // 319
        minLength: 6,                                                                                                // 320
        displayName: {                                                                                               // 321
            "default": "password",                                                                                   // 322
            changePwd: "newPassword",                                                                                // 323
            resetPwd: "newPassword",                                                                                 // 324
        },                                                                                                           // 325
        placeholder: {                                                                                               // 326
            "default": "password",                                                                                   // 327
            changePwd: "newPassword",                                                                                // 328
            resetPwd: "newPassword",                                                                                 // 329
        },                                                                                                           // 330
    }),                                                                                                              // 331
];                                                                                                                   // 332
                                                                                                                     // 333
// Configured routes                                                                                                 // 334
AT.prototype.routes = {};                                                                                            // 335
                                                                                                                     // 336
AT.prototype._initialized = false;                                                                                   // 337
                                                                                                                     // 338
// Input type validation                                                                                             // 339
AT.prototype._isValidInputType = function(value) {                                                                   // 340
    return _.indexOf(this.INPUT_TYPES, value) !== -1;                                                                // 341
};                                                                                                                   // 342
                                                                                                                     // 343
AT.prototype.addField = function(field) {                                                                            // 344
    // Fields can be added only before initialization                                                                // 345
    if (this._initialized)                                                                                           // 346
        throw new Error("AccountsTemplates.addField should strictly be called before AccountsTemplates.init!");      // 347
    field = _.pick(field, _.keys(FIELD_PAT));                                                                        // 348
    check(field, FIELD_PAT);                                                                                         // 349
    // Checks there"s currently no field called field._id                                                            // 350
    if (_.indexOf(_.pluck(this._fields, "_id"), field._id) !== -1)                                                   // 351
        throw new Error("A field called " + field._id + " already exists!");                                         // 352
    // Validates field.type                                                                                          // 353
    if (!this._isValidInputType(field.type))                                                                         // 354
        throw new Error("field.type is not valid!");                                                                 // 355
    // Checks field.minLength is strictly positive                                                                   // 356
    if (typeof field.minLength !== "undefined" && field.minLength <= 0)                                              // 357
        throw new Error("field.minLength should be greater than zero!");                                             // 358
    // Checks field.maxLength is strictly positive                                                                   // 359
    if (typeof field.maxLength !== "undefined" && field.maxLength <= 0)                                              // 360
        throw new Error("field.maxLength should be greater than zero!");                                             // 361
    // Checks field.maxLength is greater than field.minLength                                                        // 362
    if (typeof field.minLength !== "undefined" && typeof field.minLength !== "undefined" && field.maxLength < field.minLength)
        throw new Error("field.maxLength should be greater than field.maxLength!");                                  // 364
                                                                                                                     // 365
    if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, field._id)))                                            // 366
        this._fields.push(new Field(field));                                                                         // 367
    return this._fields;                                                                                             // 368
};                                                                                                                   // 369
                                                                                                                     // 370
AT.prototype.addFields = function(fields) {                                                                          // 371
    var ok;                                                                                                          // 372
    try { // don"t bother with `typeof` - just access `length` and `catch`                                           // 373
        ok = fields.length > 0 && "0" in Object(fields);                                                             // 374
    } catch (e) {                                                                                                    // 375
        throw new Error("field argument should be an array of valid field objects!");                                // 376
    }                                                                                                                // 377
    if (ok) {                                                                                                        // 378
        _.map(fields, function(field){                                                                               // 379
            this.addField(field);                                                                                    // 380
        }, this);                                                                                                    // 381
    } else                                                                                                           // 382
        throw new Error("field argument should be an array of valid field objects!");                                // 383
    return this._fields;                                                                                             // 384
};                                                                                                                   // 385
                                                                                                                     // 386
AT.prototype.configure = function(config) {                                                                          // 387
    // Configuration options can be set only before initialization                                                   // 388
    if (this._initialized)                                                                                           // 389
        throw new Error("Configuration options must be set before AccountsTemplates.init!");                         // 390
                                                                                                                     // 391
    // Updates the current configuration                                                                             // 392
    check(config, CONFIG_PAT);                                                                                       // 393
    var options = _.omit(config, "texts", "reCaptcha");                                                              // 394
    this.options = _.defaults(options, this.options);                                                                // 395
                                                                                                                     // 396
    // Possibly sets up reCaptcha options                                                                            // 397
    var reCaptcha = config.reCaptcha;                                                                                // 398
    if (reCaptcha) {                                                                                                 // 399
        // Updates the current button object                                                                         // 400
        this.options.reCaptcha = _.defaults(reCaptcha, this.options.reCaptcha || {});                                // 401
    }                                                                                                                // 402
                                                                                                                     // 403
    if (Meteor.isClient){                                                                                            // 404
        // Possibly sets up client texts...                                                                          // 405
        if (config.texts){                                                                                           // 406
            var texts = config.texts;                                                                                // 407
            var simpleTexts = _.omit(texts, "button", "errors", "info", "inputIcons", "socialIcons", "title");       // 408
            this.texts = _.defaults(simpleTexts, this.texts);                                                        // 409
                                                                                                                     // 410
            if (texts.button) {                                                                                      // 411
                // Updates the current button object                                                                 // 412
                this.texts.button = _.defaults(texts.button, this.texts.button);                                     // 413
            }                                                                                                        // 414
            if (texts.errors) {                                                                                      // 415
                // Updates the current errors object                                                                 // 416
                this.texts.errors = _.defaults(texts.errors, this.texts.errors);                                     // 417
            }                                                                                                        // 418
            if (texts.info) {                                                                                        // 419
                // Updates the current info object                                                                   // 420
                this.texts.info = _.defaults(texts.info, this.texts.info);                                           // 421
            }                                                                                                        // 422
            if (texts.inputIcons) {                                                                                  // 423
                // Updates the current inputIcons object                                                             // 424
                this.texts.inputIcons = _.defaults(texts.inputIcons, this.texts.inputIcons);                         // 425
            }                                                                                                        // 426
            if (texts.socialIcons) {                                                                                 // 427
                // Updates the current socialIcons object                                                            // 428
                this.texts.socialIcons = _.defaults(texts.socialIcons, this.texts.socialIcons);                      // 429
            }                                                                                                        // 430
            if (texts.title) {                                                                                       // 431
                // Updates the current title object                                                                  // 432
                this.texts.title = _.defaults(texts.title, this.texts.title);                                        // 433
            }                                                                                                        // 434
        }                                                                                                            // 435
    }                                                                                                                // 436
};                                                                                                                   // 437
                                                                                                                     // 438
AT.prototype.configureRoute = function(route, options) {                                                             // 439
    check(route, String);                                                                                            // 440
    check(options, Match.OneOf(undefined, ROUTE_PAT));                                                               // 441
    options = _.clone(options);                                                                                      // 442
    // Route Configuration can be done only before initialization                                                    // 443
    if (this._initialized)                                                                                           // 444
        throw new Error("Route Configuration can be done only before AccountsTemplates.init!");                      // 445
    // Only allowed routes can be configured                                                                         // 446
    if (!(route in this.ROUTE_DEFAULT))                                                                              // 447
        throw new Error("Unknown Route!");                                                                           // 448
                                                                                                                     // 449
    // Possibly adds a initial / to the provided path                                                                // 450
    if (options && options.path && options.path[0] !== "/")                                                          // 451
        options.path = "/" + options.path;                                                                           // 452
    // Updates the current configuration                                                                             // 453
    options = _.defaults(options || {}, this.ROUTE_DEFAULT[route]);                                                  // 454
    this.routes[route] = options;                                                                                    // 455
};                                                                                                                   // 456
                                                                                                                     // 457
AT.prototype.hasField = function(fieldId) {                                                                          // 458
    return !!this.getField(fieldId);                                                                                 // 459
};                                                                                                                   // 460
                                                                                                                     // 461
AT.prototype.getField = function(fieldId) {                                                                          // 462
    var field = _.filter(this._fields, function(field){                                                              // 463
        return field._id == fieldId;                                                                                 // 464
    });                                                                                                              // 465
    return (field.length === 1) ? field[0] : undefined;                                                              // 466
};                                                                                                                   // 467
                                                                                                                     // 468
AT.prototype.getFields = function() {                                                                                // 469
    return this._fields;                                                                                             // 470
};                                                                                                                   // 471
                                                                                                                     // 472
AT.prototype.getFieldIds = function() {                                                                              // 473
    return _.pluck(this._fields, "_id");                                                                             // 474
};                                                                                                                   // 475
                                                                                                                     // 476
AT.prototype.getRouteName = function(route) {                                                                        // 477
    if (route in this.routes)                                                                                        // 478
        return this.routes[route].name;                                                                              // 479
    return null;                                                                                                     // 480
};                                                                                                                   // 481
                                                                                                                     // 482
AT.prototype.getRoutePath = function(route) {                                                                        // 483
    if (route in this.routes)                                                                                        // 484
        return this.routes[route].path;                                                                              // 485
    return "#";                                                                                                      // 486
};                                                                                                                   // 487
                                                                                                                     // 488
AT.prototype.oauthServices = function(){                                                                             // 489
    // Extracts names of available services                                                                          // 490
    var names;                                                                                                       // 491
    if (Meteor.isServer)                                                                                             // 492
        names = (Accounts.oauth && Accounts.oauth.serviceNames()) || [];                                             // 493
    else                                                                                                             // 494
        names = (Accounts.oauth && Accounts.loginServicesConfigured() && Accounts.oauth.serviceNames()) || [];       // 495
    // Extracts names of configured services                                                                         // 496
    var configuredServices = [];                                                                                     // 497
    if (Accounts.loginServiceConfiguration)                                                                          // 498
        configuredServices = _.pluck(Accounts.loginServiceConfiguration.find().fetch(), "service");                  // 499
                                                                                                                     // 500
    // Builds a list of objects containing service name as _id and its configuration status                          // 501
    var services = _.map(names, function(name){                                                                      // 502
        return {                                                                                                     // 503
            _id : name,                                                                                              // 504
            configured: _.contains(configuredServices, name),                                                        // 505
        };                                                                                                           // 506
    });                                                                                                              // 507
                                                                                                                     // 508
    // Checks whether there is a UI to configure services...                                                         // 509
    // XXX: this only works with the accounts-ui package                                                             // 510
    var showUnconfigured = typeof Accounts._loginButtonsSession !== "undefined";                                     // 511
                                                                                                                     // 512
    // Filters out unconfigured services in case they"re not to be displayed                                         // 513
    if (!showUnconfigured){                                                                                          // 514
        services = _.filter(services, function(service){                                                             // 515
            return service.configured;                                                                               // 516
        });                                                                                                          // 517
    }                                                                                                                // 518
                                                                                                                     // 519
    // Sorts services by name                                                                                        // 520
    services = _.sortBy(services, function(service){                                                                 // 521
        return service._id;                                                                                          // 522
    });                                                                                                              // 523
                                                                                                                     // 524
    return services;                                                                                                 // 525
};                                                                                                                   // 526
                                                                                                                     // 527
AT.prototype.removeField = function(fieldId) {                                                                       // 528
    // Fields can be removed only before initialization                                                              // 529
    if (this._initialized)                                                                                           // 530
        throw new Error("AccountsTemplates.removeField should strictly be called before AccountsTemplates.init!");   // 531
    // Tries to look up the field with given _id                                                                     // 532
    var index = _.indexOf(_.pluck(this._fields, "_id"), fieldId);                                                    // 533
    if (index !== -1)                                                                                                // 534
        return this._fields.splice(index, 1)[0];                                                                     // 535
    else                                                                                                             // 536
        if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, fieldId)))                                          // 537
            throw new Error("A field called " + fieldId + " does not exist!");                                       // 538
};                                                                                                                   // 539
                                                                                                                     // 540
AT.prototype.setupRoutes = function() {                                                                              // 541
    if (Meteor.isServer){                                                                                            // 542
        // Possibly prints a warning in case showForgotPasswordLink is set to true but the route is not configured   // 543
        if (AccountsTemplates.options.showForgotPasswordLink && !("forgotPwd" in  AccountsTemplates.routes))         // 544
            console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but forgotPwd route is not configured!");
        // Configures "reset password" email link                                                                    // 546
        if ("resetPwd" in AccountsTemplates.routes){                                                                 // 547
            var resetPwdPath = AccountsTemplates.routes["resetPwd"].path.substr(1);                                  // 548
            Accounts.urls.resetPassword = function(token){                                                           // 549
                return Meteor.absoluteUrl(resetPwdPath + "/" + token);                                               // 550
            };                                                                                                       // 551
        }                                                                                                            // 552
        // Configures "enroll account" email link                                                                    // 553
        if ("enrollAccount" in AccountsTemplates.routes){                                                            // 554
            var enrollAccountPath = AccountsTemplates.routes["enrollAccount"].path.substr(1);                        // 555
            Accounts.urls.enrollAccount = function(token){                                                           // 556
                return Meteor.absoluteUrl(enrollAccountPath + "/" + token);                                          // 557
            };                                                                                                       // 558
        }                                                                                                            // 559
        // Configures "verify email" email link                                                                      // 560
        if ("verifyEmail" in AccountsTemplates.routes){                                                              // 561
            var verifyEmailPath = AccountsTemplates.routes["verifyEmail"].path.substr(1);                            // 562
            Accounts.urls.verifyEmail = function(token){                                                             // 563
                return Meteor.absoluteUrl(verifyEmailPath + "/" + token);                                            // 564
            };                                                                                                       // 565
        }                                                                                                            // 566
    }                                                                                                                // 567
                                                                                                                     // 568
    // Determines the default layout to be used in case no specific one is specified for single routes               // 569
    var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                    // 570
                                                                                                                     // 571
    _.each(AccountsTemplates.routes, function(options, route){                                                       // 572
        if (route === "ensureSignedIn")                                                                              // 573
            return;                                                                                                  // 574
        if (route === "changePwd" && !AccountsTemplates.options.enablePasswordChange)                                // 575
            throw new Error("changePwd route configured but enablePasswordChange set to false!");                    // 576
        if (route === "forgotPwd" && !AccountsTemplates.options.showForgotPasswordLink)                              // 577
            throw new Error("forgotPwd route configured but showForgotPasswordLink set to false!");                  // 578
        if (route === "signUp" && AccountsTemplates.options.forbidClientAccountCreation)                             // 579
            throw new Error("signUp route configured but forbidClientAccountCreation set to true!");                 // 580
        // Possibly prints a warning in case the MAIL_URL environment variable was not set                           // 581
        //if (Meteor.isServer && route === "forgotPwd" && (!process.env.MAIL_URL || ! Package["email"])){            // 582
        //    console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but MAIL_URL is not configured!");
        //}                                                                                                          // 584
                                                                                                                     // 585
        var name = options.name; // Default provided...                                                              // 586
        var path = options.path; // Default provided...                                                              // 587
        var template = options.template || "fullPageAtForm";                                                         // 588
        var layoutTemplate = options.layoutTemplate || defaultLayout;                                                // 589
                                                                                                                     // 590
        // Possibly adds token parameter                                                                             // 591
        if (_.contains(["enrollAccount", "resetPwd", "verifyEmail"], route)){                                        // 592
            path += "/:paramToken";                                                                                  // 593
            if (route === "verifyEmail")                                                                             // 594
                Router.route(path, {                                                                                 // 595
                    name: name,                                                                                      // 596
                    template: template,                                                                              // 597
                    layoutTemplate: layoutTemplate,                                                                  // 598
                    onRun: function() {                                                                              // 599
                        AccountsTemplates.setState(route);                                                           // 600
                        AccountsTemplates.setDisabled(true);                                                         // 601
                        var token = this.params.paramToken;                                                          // 602
                        Accounts.verifyEmail(token, function(error){                                                 // 603
                            AccountsTemplates.setDisabled(false);                                                    // 604
                            AccountsTemplates.submitCallback(error, route, function(){                               // 605
                                AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailVerified);
                            });                                                                                      // 607
                        });                                                                                          // 608
                                                                                                                     // 609
                        this.next();                                                                                 // 610
                    },                                                                                               // 611
                    onStop: function() {                                                                             // 612
                        AccountsTemplates.clearState();                                                              // 613
                    },                                                                                               // 614
                });                                                                                                  // 615
            else                                                                                                     // 616
                Router.route(path, {                                                                                 // 617
                    name: name,                                                                                      // 618
                    template: template,                                                                              // 619
                    layoutTemplate: layoutTemplate,                                                                  // 620
                    onRun: function() {                                                                              // 621
                        AccountsTemplates.paramToken = this.params.paramToken;                                       // 622
                        this.next();                                                                                 // 623
                    },                                                                                               // 624
                    onBeforeAction: function() {                                                                     // 625
                        AccountsTemplates.setState(route);                                                           // 626
                        this.next();                                                                                 // 627
                    },                                                                                               // 628
                    onStop: function() {                                                                             // 629
                        AccountsTemplates.clearState();                                                              // 630
                        AccountsTemplates.paramToken = null;                                                         // 631
                    }                                                                                                // 632
                });                                                                                                  // 633
        }                                                                                                            // 634
        else                                                                                                         // 635
            Router.route(path, {                                                                                     // 636
                name: name,                                                                                          // 637
                template: template,                                                                                  // 638
                layoutTemplate: layoutTemplate,                                                                      // 639
                onBeforeAction: function() {                                                                         // 640
                    var redirect = false;                                                                            // 641
                    if (route === 'changePwd') {                                                                     // 642
                      if (!Meteor.loggingIn() && !Meteor.userId()) {                                                 // 643
                        redirect = true;                                                                             // 644
                      }                                                                                              // 645
                    }                                                                                                // 646
                    else if (Meteor.userId()) {                                                                      // 647
                        redirect = true;                                                                             // 648
                    }                                                                                                // 649
                    if (redirect) {                                                                                  // 650
                        AccountsTemplates.postSubmitRedirect(route);                                                 // 651
                    }                                                                                                // 652
                    else {                                                                                           // 653
                        AccountsTemplates.setState(route);                                                           // 654
                        this.next();                                                                                 // 655
                    }                                                                                                // 656
                },                                                                                                   // 657
                onStop: function() {                                                                                 // 658
                    AccountsTemplates.clearState();                                                                  // 659
                }                                                                                                    // 660
            });                                                                                                      // 661
    });                                                                                                              // 662
};                                                                                                                   // 663
                                                                                                                     // 664
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/client.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Allowed Internal (client-side) States                                                                             // 1
AT.prototype.STATES = [                                                                                              // 2
    "changePwd", // Change Password                                                                                  // 3
    "enrollAccount", // Account Enrollment                                                                           // 4
    "forgotPwd", // Forgot Password                                                                                  // 5
    "hide", // Nothing displayed                                                                                     // 6
    "resetPwd", // Reset Password                                                                                    // 7
    "signIn", // Sign In                                                                                             // 8
    "signUp", // Sign Up                                                                                             // 9
    "verifyEmail", // Email verification                                                                             // 10
];                                                                                                                   // 11
                                                                                                                     // 12
AT.prototype._loginType = "";                                                                                        // 13
                                                                                                                     // 14
// Previous path used for redirect after form submit                                                                 // 15
AT.prototype._prevPath = null;                                                                                       // 16
                                                                                                                     // 17
// Flag telling whether the whole form should appear disabled                                                        // 18
AT.prototype._disabled = false;                                                                                      // 19
                                                                                                                     // 20
// Flag used to avoid redirecting to previous route when signing in/up                                               // 21
// as a results of a call to ensureSignedIn                                                                          // 22
AT.prototype.avoidRedirect = false;                                                                                  // 23
                                                                                                                     // 24
// Possibly keeps reference to the handle for the timed out redirect set on some routes                              // 25
AT.prototype.timedOutRedirect = null;                                                                                // 26
                                                                                                                     // 27
AT.prototype.texts = {                                                                                               // 28
    button: {                                                                                                        // 29
        changePwd: "updateYourPassword",                                                                             // 30
        //enrollAccount: "createAccount",                                                                            // 31
        enrollAccount: "signUp",                                                                                     // 32
        forgotPwd: "emailResetLink",                                                                                 // 33
        resetPwd: "setPassword",                                                                                     // 34
        signIn: "signIn",                                                                                            // 35
        signUp: "signUp",                                                                                            // 36
    },                                                                                                               // 37
    errors: {                                                                                                        // 38
        mustBeLoggedIn: "error.accounts.Must be logged in",                                                          // 39
        pwdMismatch: "error.pwdsDontMatch",                                                                          // 40
    },                                                                                                               // 41
    navSignIn: 'signIn',                                                                                             // 42
    navSignOut: 'signOut',                                                                                           // 43
    info: {                                                                                                          // 44
        emailSent: "info.emailSent",                                                                                 // 45
        emailVerified: "info.emailVerified",                                                                         // 46
        pwdChanged: "info.passwordChanged",                                                                          // 47
        pwdReset: "info.passwordReset",                                                                              // 48
        pwdSet: "Password Set",                                                                                      // 49
        signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",          // 50
    },                                                                                                               // 51
    inputIcons: {                                                                                                    // 52
        isValidating: "fa fa-spinner fa-spin",                                                                       // 53
        hasSuccess: "fa fa-check",                                                                                   // 54
        hasError: "fa fa-times",                                                                                     // 55
    },                                                                                                               // 56
    optionalField: "optional",                                                                                       // 57
    pwdLink_pre: "",                                                                                                 // 58
    pwdLink_link: "forgotPassword",                                                                                  // 59
    pwdLink_suff: "",                                                                                                // 60
    sep: "OR",                                                                                                       // 61
    signInLink_pre: "ifYouAlreadyHaveAnAccount",                                                                     // 62
    signInLink_link: "signin",                                                                                       // 63
    signInLink_suff: "",                                                                                             // 64
    signUpLink_pre: "dontHaveAnAccount",                                                                             // 65
    signUpLink_link: "signUp",                                                                                       // 66
    signUpLink_suff: "",                                                                                             // 67
    socialAdd: "add",                                                                                                // 68
    socialConfigure: "configure",                                                                                    // 69
    socialIcons: {                                                                                                   // 70
        "meteor-developer": "fa fa-rocket"                                                                           // 71
    },                                                                                                               // 72
    socialRemove: "remove",                                                                                          // 73
    socialSignIn: "signIn",                                                                                          // 74
    socialSignUp: "signUp",                                                                                          // 75
    socialWith: "with",                                                                                              // 76
    termsPreamble: "clickAgree",                                                                                     // 77
    termsPrivacy: "privacyPolicy",                                                                                   // 78
    termsAnd: "and",                                                                                                 // 79
    termsTerms: "terms",                                                                                             // 80
    title: {                                                                                                         // 81
        changePwd: "changePassword",                                                                                 // 82
        enrollAccount: "createAccount",                                                                              // 83
        forgotPwd: "resetYourPassword",                                                                              // 84
        resetPwd: "resetYourPassword",                                                                               // 85
        signIn: "signIn",                                                                                            // 86
        signUp: "createAccount",                                                                                     // 87
    },                                                                                                               // 88
};                                                                                                                   // 89
                                                                                                                     // 90
// Known routes used to filter out previous path for redirects...                                                    // 91
AT.prototype.knownRoutes = [];                                                                                       // 92
                                                                                                                     // 93
// Token provided for routes like reset-password and enroll-account                                                  // 94
AT.prototype.paramToken = null;                                                                                      // 95
                                                                                                                     // 96
// Current Internal (client-side) State (to be among allowed ones, see STATES)                                       // 97
//AT.prototype.state = "signIn";                                                                                     // 98
                                                                                                                     // 99
// State validation                                                                                                  // 100
AT.prototype._isValidState = function(value) {                                                                       // 101
    return _.contains(this.STATES, value);                                                                           // 102
};                                                                                                                   // 103
                                                                                                                     // 104
AT.prototype.loginType = function () {                                                                               // 105
    return this._loginType;                                                                                          // 106
};                                                                                                                   // 107
                                                                                                                     // 108
// Getter for previous route"s path                                                                                  // 109
AT.prototype.getPrevPath = function() {                                                                              // 110
    return this._prevPath;                                                                                           // 111
};                                                                                                                   // 112
                                                                                                                     // 113
// Setter for previous route"s path                                                                                  // 114
AT.prototype.setPrevPath = function(newPath) {                                                                       // 115
    check(newPath, String);                                                                                          // 116
    this._prevPath = newPath;                                                                                        // 117
};                                                                                                                   // 118
                                                                                                                     // 119
// Getter for current state                                                                                          // 120
AT.prototype.getState = function() {                                                                                 // 121
    return this.state.form.get("state");                                                                             // 122
};                                                                                                                   // 123
                                                                                                                     // 124
// Getter for disabled state                                                                                         // 125
AT.prototype.disabled = function() {                                                                                 // 126
    return this.state.form.equals("disabled", true) ? "disabled" : undefined;                                        // 127
};                                                                                                                   // 128
                                                                                                                     // 129
// Setter for disabled state                                                                                         // 130
AT.prototype.setDisabled = function(value) {                                                                         // 131
    check(value, Boolean);                                                                                           // 132
    return this.state.form.set("disabled", value);                                                                   // 133
};                                                                                                                   // 134
                                                                                                                     // 135
// Setter for current state                                                                                          // 136
AT.prototype.setState = function(state, callback) {                                                                  // 137
    check(state, String);                                                                                            // 138
    if (!this._isValidState(state))                                                                                  // 139
        throw new Meteor.Error(500, "Internal server error", "accounts-templates-core package got an invalid state value!");
    this.state.form.set("state", state);                                                                             // 141
    this.clearState();                                                                                               // 142
    if (_.isFunction(callback))                                                                                      // 143
        callback();                                                                                                  // 144
};                                                                                                                   // 145
                                                                                                                     // 146
AT.prototype.clearState = function() {                                                                               // 147
    _.each(this._fields, function(field){                                                                            // 148
        field.clearStatus();                                                                                         // 149
    });                                                                                                              // 150
    var form = this.state.form;                                                                                      // 151
    form.set("error", null);                                                                                         // 152
    form.set("result", null);                                                                                        // 153
                                                                                                                     // 154
    AccountsTemplates.setDisabled(false);                                                                            // 155
                                                                                                                     // 156
    // Possibly clears timed out redirects                                                                           // 157
    if (AccountsTemplates.timedOutRedirect !== null) {                                                               // 158
        Meteor.clearTimeout(AccountsTemplates.timedOutRedirect);                                                     // 159
        AccountsTemplates.timedOutRedirect = null;                                                                   // 160
    }                                                                                                                // 161
};                                                                                                                   // 162
                                                                                                                     // 163
AT.prototype.clearError = function() {                                                                               // 164
    form.set("error", null);                                                                                         // 165
};                                                                                                                   // 166
                                                                                                                     // 167
AT.prototype.clearResult = function() {                                                                              // 168
    form.set("result", null);                                                                                        // 169
};                                                                                                                   // 170
                                                                                                                     // 171
var ensureSignedIn = function() {                                                                                    // 172
  if (!Meteor.userId()) {                                                                                            // 173
      Tracker.nonreactive(function () {                                                                              // 174
        AccountsTemplates.setPrevPath(Router.current().url);                                                         // 175
      });                                                                                                            // 176
      AccountsTemplates.setState(AccountsTemplates.options.defaultState, function(){                                 // 177
          var err = AccountsTemplates.texts.errors.mustBeLoggedIn;                                                   // 178
          AccountsTemplates.state.form.set("error", [err]);                                                          // 179
      });                                                                                                            // 180
      AccountsTemplates.avoidRedirect = true;                                                                        // 181
      // render the login template but keep the url in the browser the same                                          // 182
                                                                                                                     // 183
      var options = AccountsTemplates.routes["ensureSignedIn"];                                                      // 184
                                                                                                                     // 185
      // Determines the template to be rendered in case no specific one was configured for ensureSignedIn            // 186
      var signInRouteTemplate = AccountsTemplates.routes.signIn && AccountsTemplates.routes.signIn.template;         // 187
      var template = (options && options.template) || signInRouteTemplate || "fullPageAtForm";                       // 188
                                                                                                                     // 189
      // Determines the layout to be used in case no specific one was configured for ensureSignedIn                  // 190
      var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                  // 191
      var layoutTemplate = (options && options.layoutTemplate) || defaultLayout;                                     // 192
                                                                                                                     // 193
      this.layout(layoutTemplate);                                                                                   // 194
      this.render(template);                                                                                         // 195
      this.renderRegions();                                                                                          // 196
  } else {                                                                                                           // 197
      this.next();                                                                                                   // 198
  }                                                                                                                  // 199
};                                                                                                                   // 200
                                                                                                                     // 201
AT.prototype.ensureSignedIn = function() {                                                                           // 202
  console.warn(                                                                                                      // 203
    "[UserAccounts] AccountsTemplates.ensureSignedIn will be deprecated soon, please use the plugin version\n" +     // 204
    "               see https://github.com/meteor-useraccounts/core/blob/master/Guide.md#content-protection"         // 205
  );                                                                                                                 // 206
  ensureSignedIn.call(this);                                                                                         // 207
};                                                                                                                   // 208
                                                                                                                     // 209
                                                                                                                     // 210
Iron.Router.plugins.ensureSignedIn = function (router, options) {                                                    // 211
  // this loading plugin just creates an onBeforeAction hook                                                         // 212
  router.onRun(function(){                                                                                           // 213
    if (Meteor.loggingIn()) {                                                                                        // 214
        this.renderRegions();                                                                                        // 215
    } else {                                                                                                         // 216
        this.next();                                                                                                 // 217
    }                                                                                                                // 218
  }, options);                                                                                                       // 219
                                                                                                                     // 220
  router.onBeforeAction(                                                                                             // 221
    ensureSignedIn,                                                                                                  // 222
    options                                                                                                          // 223
  );                                                                                                                 // 224
};                                                                                                                   // 225
                                                                                                                     // 226
                                                                                                                     // 227
// Initialization                                                                                                    // 228
AT.prototype.init = function() {                                                                                     // 229
    console.warn("[AccountsTemplates] There is no more need to call AccountsTemplates.init()! Simply remove the call ;-)");
};                                                                                                                   // 231
                                                                                                                     // 232
AT.prototype._init = function() {                                                                                    // 233
    if (this._initialized)                                                                                           // 234
        return;                                                                                                      // 235
                                                                                                                     // 236
    var usernamePresent = this.hasField("username");                                                                 // 237
    var emailPresent = this.hasField("email");                                                                       // 238
    if (usernamePresent && emailPresent){                                                                            // 239
        this._loginType = "username_and_email";                                                                      // 240
    }                                                                                                                // 241
    else{                                                                                                            // 242
        if (usernamePresent)                                                                                         // 243
            this._loginType = "username";                                                                            // 244
        else                                                                                                         // 245
            this._loginType = "email";                                                                               // 246
    }                                                                                                                // 247
                                                                                                                     // 248
    if (this._loginType === "username_and_email"){                                                                   // 249
        // Possibly adds the field username_and_email in case                                                        // 250
        // it was not configured                                                                                     // 251
        if (!this.hasField("username_and_email"))                                                                    // 252
            this.addField({                                                                                          // 253
                _id: "username_and_email",                                                                           // 254
                type: "text",                                                                                        // 255
                displayName: "usernameOrEmail",                                                                      // 256
                placeholder: "usernameOrEmail",                                                                      // 257
                required: true,                                                                                      // 258
            });                                                                                                      // 259
    }                                                                                                                // 260
                                                                                                                     // 261
    // Only in case password confirmation is required                                                                // 262
    if (this.options.confirmPassword){                                                                               // 263
        // Possibly adds the field password_again in case                                                            // 264
        // it was not configured                                                                                     // 265
        if (!this.hasField("password_again")){                                                                       // 266
            var pwdAgain = _.clone(this.getField("password"));                                                       // 267
            pwdAgain._id = "password_again";                                                                         // 268
            pwdAgain.displayName = {                                                                                 // 269
                "default": "passwordAgain",                                                                          // 270
                changePwd: "newPasswordAgain",                                                                       // 271
                resetPwd: "newPasswordAgain",                                                                        // 272
            };                                                                                                       // 273
            pwdAgain.placeholder = {                                                                                 // 274
                "default": "passwordAgain",                                                                          // 275
                changePwd: "newPasswordAgain",                                                                       // 276
                resetPwd: "newPasswordAgain",                                                                        // 277
            };                                                                                                       // 278
            this.addField(pwdAgain);                                                                                 // 279
        }                                                                                                            // 280
    }                                                                                                                // 281
    else{                                                                                                            // 282
        if (this.hasField("password_again"))                                                                         // 283
            throw new Error("AccountsTemplates: a field password_again was added but confirmPassword is set to false!");
    }                                                                                                                // 285
                                                                                                                     // 286
    // Possibly adds the field current_password in case                                                              // 287
    // it was not configured                                                                                         // 288
    if (this.options.enablePasswordChange){                                                                          // 289
        if (!this.hasField("current_password"))                                                                      // 290
            this.addField({                                                                                          // 291
                _id: "current_password",                                                                             // 292
                type: "password",                                                                                    // 293
                displayName: "currentPassword",                                                                      // 294
                placeholder: "currentPassword",                                                                      // 295
                required: true,                                                                                      // 296
            });                                                                                                      // 297
    }                                                                                                                // 298
                                                                                                                     // 299
    // Ensuser the right order of special fields                                                                     // 300
    var moveFieldAfter = function(field_name, reference_field_name) {                                                // 301
        var fieldIds = AccountsTemplates.getFieldIds();                                                              // 302
        var refFieldId = _.indexOf(fieldIds, reference_field_name);                                                  // 303
        // In case the reference field is not present, just return...                                                // 304
        if (refFieldId === -1)                                                                                       // 305
            return;                                                                                                  // 306
        var fieldId = _.indexOf(fieldIds, field_name);                                                               // 307
        // In case the sought field is not present, just return...                                                   // 308
        if (fieldId === -1)                                                                                          // 309
            return;                                                                                                  // 310
        if (fieldId !== -1 && fieldId !== (refFieldId + 1)){                                                         // 311
            // removes the field                                                                                     // 312
            var field = AccountsTemplates._fields.splice(fieldId, 1)[0];                                             // 313
            // push the field right after the reference field position                                               // 314
            var new_fieldIds = AccountsTemplates.getFieldIds();                                                      // 315
            var new_refFieldId = _.indexOf(new_fieldIds, reference_field_name);                                      // 316
            AccountsTemplates._fields.splice(new_refFieldId + 1, 0, field);                                          // 317
        }                                                                                                            // 318
    };                                                                                                               // 319
                                                                                                                     // 320
    // Ensuser the right order of special fields                                                                     // 321
    var moveFieldBefore = function(field_name, reference_field_name) {                                               // 322
        var fieldIds = AccountsTemplates.getFieldIds();                                                              // 323
        var refFieldId = _.indexOf(fieldIds, reference_field_name);                                                  // 324
        // In case the reference field is not present, just return...                                                // 325
        if (refFieldId === -1)                                                                                       // 326
            return;                                                                                                  // 327
        var fieldId = _.indexOf(fieldIds, field_name);                                                               // 328
        // In case the sought field is not present, just return...                                                   // 329
        if (fieldId === -1)                                                                                          // 330
            return;                                                                                                  // 331
        if (fieldId !== -1 && fieldId !== (refFieldId - 1)){                                                         // 332
            // removes the field                                                                                     // 333
            var field = AccountsTemplates._fields.splice(fieldId, 1)[0];                                             // 334
            // push the field right after the reference field position                                               // 335
            var new_fieldIds = AccountsTemplates.getFieldIds();                                                      // 336
            var new_refFieldId = _.indexOf(new_fieldIds, reference_field_name);                                      // 337
            AccountsTemplates._fields.splice(new_refFieldId, 0, field);                                              // 338
        }                                                                                                            // 339
    };                                                                                                               // 340
                                                                                                                     // 341
    // The final order should be something like:                                                                     // 342
    // - username                                                                                                    // 343
    // - email                                                                                                       // 344
    // - username_and_email                                                                                          // 345
    // - password                                                                                                    // 346
    // - password_again                                                                                              // 347
    //                                                                                                               // 348
    // ...so lets do it in reverse order...                                                                          // 349
    moveFieldAfter("username_and_email", "username");                                                                // 350
    moveFieldAfter("username_and_email", "email");                                                                   // 351
    moveFieldBefore("current_password", "password");                                                                 // 352
    moveFieldAfter("password", "current_password");                                                                  // 353
    moveFieldAfter("password_again", "password");                                                                    // 354
                                                                                                                     // 355
                                                                                                                     // 356
    // Sets visibility condition and validation flags for each field                                                 // 357
    var gPositiveValidation = !!AccountsTemplates.options.positiveValidation;                                        // 358
    var gNegativeValidation = !!AccountsTemplates.options.negativeValidation;                                        // 359
    var gShowValidating = !!AccountsTemplates.options.showValidating;                                                // 360
    var gContinuousValidation = !!AccountsTemplates.options.continuousValidation;                                    // 361
    var gNegativeFeedback = !!AccountsTemplates.options.negativeFeedback;                                            // 362
    var gPositiveFeedback = !!AccountsTemplates.options.positiveFeedback;                                            // 363
    _.each(this._fields, function(field){                                                                            // 364
        // Visibility                                                                                                // 365
        switch(field._id) {                                                                                          // 366
            case "current_password":                                                                                 // 367
                field.visible = ["changePwd"];                                                                       // 368
                break;                                                                                               // 369
            case "email":                                                                                            // 370
                field.visible = ["forgotPwd", "signUp"];                                                             // 371
                if (AccountsTemplates.loginType() === "email")                                                       // 372
                    field.visible.push("signIn");                                                                    // 373
                break;                                                                                               // 374
            case "password":                                                                                         // 375
                field.visible = ["changePwd", "enrollAccount", "resetPwd", "signIn", "signUp"];                      // 376
                break;                                                                                               // 377
            case "password_again":                                                                                   // 378
                field.visible = ["changePwd", "enrollAccount", "resetPwd", "signUp"];                                // 379
                break;                                                                                               // 380
            case "username":                                                                                         // 381
                field.visible = ["signUp"];                                                                          // 382
                if (AccountsTemplates.loginType() === "username")                                                    // 383
                    field.visible.push("signIn");                                                                    // 384
                break;                                                                                               // 385
            case "username_and_email":                                                                               // 386
                field.visible = [];                                                                                  // 387
                if (AccountsTemplates.loginType() === "username_and_email")                                          // 388
                    field.visible.push("signIn");                                                                    // 389
                break;                                                                                               // 390
            default:                                                                                                 // 391
                field.visible = ["signUp"];                                                                          // 392
        }                                                                                                            // 393
                                                                                                                     // 394
        // Validation                                                                                                // 395
        var positiveValidation = field.positiveValidation;                                                           // 396
        if (positiveValidation === undefined)                                                                        // 397
            field.positiveValidation = gPositiveValidation;                                                          // 398
        var negativeValidation = field.negativeValidation;                                                           // 399
        if (negativeValidation === undefined)                                                                        // 400
            field.negativeValidation = gNegativeValidation;                                                          // 401
        field.validation = field.positiveValidation || field.negativeValidation;                                     // 402
        if (field.continuousValidation === undefined)                                                                // 403
            field.continuousValidation = gContinuousValidation;                                                      // 404
        field.continuousValidation = field.validation && field.continuousValidation;                                 // 405
        if (field.negativeFeedback === undefined)                                                                    // 406
            field.negativeFeedback = gNegativeFeedback;                                                              // 407
        if (field.positiveFeedback === undefined)                                                                    // 408
            field.positiveFeedback = gPositiveFeedback;                                                              // 409
        field.feedback = field.negativeFeedback || field.positiveFeedback;                                           // 410
        // Validating icon                                                                                           // 411
        var showValidating = field.showValidating;                                                                   // 412
        if (showValidating === undefined)                                                                            // 413
            field.showValidating = gShowValidating;                                                                  // 414
                                                                                                                     // 415
        // Custom Template                                                                                           // 416
        if (field.template) {                                                                                        // 417
          if (field.template in Template) {                                                                          // 418
            Template[field.template].helpers(AccountsTemplates.atInputHelpers);                                      // 419
          }                                                                                                          // 420
          else {                                                                                                     // 421
            console.warn(                                                                                            // 422
              "[UserAccounts] Warning no template " + field.template + " found!"                                     // 423
            );                                                                                                       // 424
          }                                                                                                          // 425
        }                                                                                                            // 426
    });                                                                                                              // 427
                                                                                                                     // 428
    // Initializes reactive states                                                                                   // 429
    form = new ReactiveDict();                                                                                       // 430
    form.set("disabled", false);                                                                                     // 431
    form.set("state", "signIn");                                                                                     // 432
    form.set("result", null);                                                                                        // 433
    form.set("error", null);                                                                                         // 434
    this.state = {                                                                                                   // 435
        form: form,                                                                                                  // 436
    };                                                                                                               // 437
                                                                                                                     // 438
    // Possibly subscribes to extended user data (to get the list of registered services...)                         // 439
    if (this.options.showAddRemoveServices){                                                                         // 440
        Meteor.subscribe("userRegisteredServices");                                                                  // 441
    }                                                                                                                // 442
                                                                                                                     // 443
    //Check that reCaptcha site keys are available and no secret keys visible                                        // 444
    if (this.options.showReCaptcha) {                                                                                // 445
        var atSiteKey = null, atSecretKey = null, settingsSiteKey = null, settingsSecretKey = null;                  // 446
                                                                                                                     // 447
                                                                                                                     // 448
        if (AccountsTemplates.options.reCaptcha) {                                                                   // 449
            atSiteKey = AccountsTemplates.options.reCaptcha.siteKey;                                                 // 450
            atSecretKey = AccountsTemplates.options.reCaptcha.secretKey;                                             // 451
        }                                                                                                            // 452
        if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.reCaptcha) {                         // 453
          settingsSiteKey = Meteor.settings.public.reCaptcha.siteKey;                                                // 454
          settingsSecretKey = Meteor.settings.public.reCaptcha.secretKey;                                            // 455
        }                                                                                                            // 456
                                                                                                                     // 457
        if (atSecretKey || settingsSecretKey) {                                                                      // 458
            //erase the secret key                                                                                   // 459
            if (atSecretKey) {                                                                                       // 460
                AccountsTemplates.options.reCaptcha.secretKey = null;                                                // 461
            }                                                                                                        // 462
            if (settingsSecretKey) {                                                                                 // 463
                Meteor.settings.public.reCaptcha.secretKey = null;                                                   // 464
            }                                                                                                        // 465
                                                                                                                     // 466
            var loc = atSecretKey ? "User Accounts configuration!" : "Meteor settings!";                             // 467
            throw new Meteor.Error(401, "User Accounts: DANGER - reCaptcha private key leaked to client from " + loc // 468
            + " Provide the key in server settings ONLY.");                                                          // 469
        }                                                                                                            // 470
                                                                                                                     // 471
        if (!atSiteKey && !settingsSiteKey) {                                                                        // 472
            throw new Meteor.Error(401, "User Accounts: reCaptcha site key not found! Please provide it or set showReCaptcha to false.");
        }                                                                                                            // 474
    }                                                                                                                // 475
                                                                                                                     // 476
    // ------------                                                                                                  // 477
    // Routing Stuff                                                                                                 // 478
    // ------------                                                                                                  // 479
                                                                                                                     // 480
    // Known routes are used to filter out previous path for redirects...                                            // 481
    this.knownRoutes = _.pluck(_.values(this.routes), "path");                                                       // 482
                                                                                                                     // 483
    // Stores previous path on path change...                                                                        // 484
    Router.onStop(function() {                                                                                       // 485
        Tracker.nonreactive(function () {                                                                            // 486
            var currentPath = Router.current().url;                                                                  // 487
            var currentPathClean = currentPath.replace(/^\/+|\/+$/gm,'')                                             // 488
            var isKnownRoute = _.map(AccountsTemplates.knownRoutes, function(path){                                  // 489
              if (!path) {                                                                                           // 490
                return false;                                                                                        // 491
              }                                                                                                      // 492
              path = path.replace(/^\/+|\/+$/gm,'');                                                                 // 493
              var known = RegExp(path).test(currentPathClean)                                                        // 494
              return known;                                                                                          // 495
            });                                                                                                      // 496
            if (!_.some(isKnownRoute)) {                                                                             // 497
                AccountsTemplates.setPrevPath(currentPath);                                                          // 498
            }                                                                                                        // 499
            AccountsTemplates.avoidRedirect = false;                                                                 // 500
        });                                                                                                          // 501
    });                                                                                                              // 502
                                                                                                                     // 503
    // Sets up configured routes                                                                                     // 504
    AccountsTemplates.setupRoutes();                                                                                 // 505
                                                                                                                     // 506
    // Marks AccountsTemplates as initialized                                                                        // 507
    this._initialized = true;                                                                                        // 508
};                                                                                                                   // 509
                                                                                                                     // 510
AT.prototype.linkClick = function(route){                                                                            // 511
    if (AccountsTemplates.disabled())                                                                                // 512
        return;                                                                                                      // 513
    var path = AccountsTemplates.getRoutePath(route);                                                                // 514
    if (path === "#" || AccountsTemplates.avoidRedirect || path === Router.current().route.path())                   // 515
        AccountsTemplates.setState(route);                                                                           // 516
    else                                                                                                             // 517
        Meteor.defer(function(){                                                                                     // 518
            Router.go(AccountsTemplates.getRouteName(route));                                                        // 519
        });                                                                                                          // 520
};                                                                                                                   // 521
                                                                                                                     // 522
AT.prototype.logout = function(){                                                                                    // 523
    var onLogoutHook = AccountsTemplates.options.onLogoutHook;                                                       // 524
    var homeRoutePath = AccountsTemplates.options.homeRoutePath;                                                     // 525
    Meteor.logout(function(){                                                                                        // 526
        if (onLogoutHook)                                                                                            // 527
          onLogoutHook();                                                                                            // 528
        else if (homeRoutePath)                                                                                      // 529
            Router.go(homeRoutePath);                                                                                // 530
    });                                                                                                              // 531
};                                                                                                                   // 532
                                                                                                                     // 533
AT.prototype.postSubmitRedirect = function(route){                                                                   // 534
    if (AccountsTemplates.avoidRedirect)                                                                             // 535
        AccountsTemplates.avoidRedirect = false;                                                                     // 536
    else{                                                                                                            // 537
        var nextPath = AccountsTemplates.routes[route] && AccountsTemplates.routes[route].redirect;                  // 538
        if (nextPath){                                                                                               // 539
            if (_.isFunction(nextPath))                                                                              // 540
                nextPath();                                                                                          // 541
            else                                                                                                     // 542
                Router.go(nextPath);                                                                                 // 543
        }else{                                                                                                       // 544
            var previousPath = AccountsTemplates.getPrevPath();                                                      // 545
            if (previousPath)                                                                                        // 546
                Router.go(previousPath);                                                                             // 547
            else{                                                                                                    // 548
                var homeRoutePath = AccountsTemplates.options.homeRoutePath;                                         // 549
                if (homeRoutePath)                                                                                   // 550
                    Router.go(homeRoutePath);                                                                        // 551
            }                                                                                                        // 552
        }                                                                                                            // 553
    }                                                                                                                // 554
};                                                                                                                   // 555
                                                                                                                     // 556
AT.prototype.submitCallback = function(error, state, onSuccess){                                                     // 557
                                                                                                                     // 558
    var onSubmitHook = AccountsTemplates.options.onSubmitHook;                                                       // 559
    if(onSubmitHook)                                                                                                 // 560
        onSubmitHook(error, state);                                                                                  // 561
                                                                                                                     // 562
    if (error) {                                                                                                     // 563
        if(_.isObject(error.details))                                                                                // 564
            // If error.details is an object, we may try to set fields errors from it                                // 565
            _.each(error.details, function(error, fieldId){                                                          // 566
                AccountsTemplates.getField(fieldId).setError(error);                                                 // 567
            });                                                                                                      // 568
        else{                                                                                                        // 569
            var err = error.reason ? "error.accounts." + error.reason : "error.accounts.Unknown error";              // 570
            AccountsTemplates.state.form.set("error", [err]);                                                        // 571
        }                                                                                                            // 572
        AccountsTemplates.setDisabled(false);                                                                        // 573
        // Possibly resets reCaptcha form                                                                            // 574
        if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                         // 575
          grecaptcha.reset();                                                                                        // 576
        }                                                                                                            // 577
    }                                                                                                                // 578
    else{                                                                                                            // 579
        if (onSuccess)                                                                                               // 580
            onSuccess()                                                                                              // 581
                                                                                                                     // 582
        if (_.contains(["enrollAccount", "forgotPwd", "resetPwd", "verifyEmail"], state)){                           // 583
            var redirectTimeout = AccountsTemplates.options.redirectTimeout;                                         // 584
            if (redirectTimeout > 0)                                                                                 // 585
                AccountsTemplates.timedOutRedirect = Meteor.setTimeout(function(){                                   // 586
                    AccountsTemplates.timedOutRedirect = null;                                                       // 587
                    AccountsTemplates.setDisabled(false);                                                            // 588
                    AccountsTemplates.postSubmitRedirect(state);                                                     // 589
                }, redirectTimeout);                                                                                 // 590
        }                                                                                                            // 591
        else if (state){                                                                                             // 592
            AccountsTemplates.setDisabled(false);                                                                    // 593
            AccountsTemplates.postSubmitRedirect(state);                                                             // 594
        }                                                                                                            // 595
    }                                                                                                                // 596
};                                                                                                                   // 597
                                                                                                                     // 598
AccountsTemplates = new AT();                                                                                        // 599
                                                                                                                     // 600
                                                                                                                     // 601
// Initialization                                                                                                    // 602
Meteor.startup(function(){                                                                                           // 603
    AccountsTemplates._init();                                                                                       // 604
});                                                                                                                  // 605
                                                                                                                     // 606
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_error.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atErrorHelpers = {                                                                                      // 1
    singleError: function() {                                                                                        // 2
        var errors = AccountsTemplates.state.form.get("error");                                                      // 3
        return errors && errors.length === 1;                                                                        // 4
    },                                                                                                               // 5
    error: function() {                                                                                              // 6
        return AccountsTemplates.state.form.get("error");                                                            // 7
    },                                                                                                               // 8
    errorText: function(){                                                                                           // 9
        var field, err;                                                                                              // 10
        if (this.field){                                                                                             // 11
            field = T9n.get(this.field, markIfMissing=false);                                                        // 12
            err = T9n.get(this.err, markIfMissing=false);                                                            // 13
        }                                                                                                            // 14
        else                                                                                                         // 15
            err = T9n.get(this.valueOf(), markIfMissing=false);                                                      // 16
                                                                                                                     // 17
        // Possibly removes initial prefix in case the key in not found inside t9n                                   // 18
        if (err.substring(0, 15) === "error.accounts.")                                                              // 19
            err = err.substring(15);                                                                                 // 20
                                                                                                                     // 21
        if (field)                                                                                                   // 22
            return field + ": " + err;                                                                               // 23
        return err;                                                                                                  // 24
    },                                                                                                               // 25
};                                                                                                                   // 26
                                                                                                                     // 27
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_form.js                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atFormHelpers = {                                                                                       // 1
    hide: function(){                                                                                                // 2
        var state = this.state || AccountsTemplates.getState();                                                      // 3
        return state === "hide";                                                                                     // 4
    },                                                                                                               // 5
    showTitle: function(next_state){                                                                                 // 6
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 7
        if (state === "verifyEmail" || (Meteor.userId() && state === "signIn"))                                      // 8
            return false;                                                                                            // 9
        return true;                                                                                                 // 10
        //return !(state === "signIn" && AccountsTemplates.oauthServices().length);                                  // 11
    },                                                                                                               // 12
    showOauthServices: function(next_state){                                                                         // 13
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 14
        if (!(state === "signIn" || state === "signUp"))                                                             // 15
            return false;                                                                                            // 16
        var services = AccountsTemplates.oauthServices();                                                            // 17
        if (!services.length)                                                                                        // 18
            return false;                                                                                            // 19
        if (Meteor.userId())                                                                                         // 20
            return AccountsTemplates.options.showAddRemoveServices;                                                  // 21
        return true;                                                                                                 // 22
    },                                                                                                               // 23
    showServicesSeparator: function(next_state){                                                                     // 24
        var pwdService = Package["accounts-password"] !== undefined;                                                 // 25
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 26
        var rightState = (state === "signIn" || state === "signUp");                                                 // 27
        return rightState && !Meteor.userId() && pwdService && AccountsTemplates.oauthServices().length;             // 28
    },                                                                                                               // 29
    showError: function(next_state) {                                                                                // 30
        return !!AccountsTemplates.state.form.get("error");                                                          // 31
    },                                                                                                               // 32
    showResult: function(next_state) {                                                                               // 33
        return !!AccountsTemplates.state.form.get("result");                                                         // 34
    },                                                                                                               // 35
    showPwdForm: function(next_state) {                                                                              // 36
        if (Package["accounts-password"] === undefined)                                                              // 37
            return false;                                                                                            // 38
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 39
        if ((state === "verifyEmail") || (state === "signIn" && Meteor.userId()))                                    // 40
            return false;                                                                                            // 41
        return true;                                                                                                 // 42
    },                                                                                                               // 43
    showSignInLink: function(next_state){                                                                            // 44
        if (AccountsTemplates.options.hideSignInLink)                                                                // 45
            return false;                                                                                            // 46
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 47
        if (AccountsTemplates.options.forbidClientAccountCreation && state === "forgotPwd")                          // 48
            return true;                                                                                             // 49
        return state === "signUp";                                                                                   // 50
    },                                                                                                               // 51
    showSignUpLink: function(next_state){                                                                            // 52
        if  (AccountsTemplates.options.hideSignUpLink)                                                               // 53
            return false;                                                                                            // 54
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 55
        return ((state === "signIn" && !Meteor.userId()) || state === "forgotPwd") && !AccountsTemplates.options.forbidClientAccountCreation;
    },                                                                                                               // 57
    showTermsLink: function(next_state){                                                                             // 58
        if (!!AccountsTemplates.options.privacyUrl || !!AccountsTemplates.options.termsUrl) {                        // 59
            var state = next_state || this.state || AccountsTemplates.getState();                                    // 60
            if (state === "signUp" || state === "enrollAccount" ) {                                                  // 61
              return true;                                                                                           // 62
            }                                                                                                        // 63
        }                                                                                                            // 64
        /*                                                                                                           // 65
        if (state === "signIn"){                                                                                     // 66
            var pwdService = Package["accounts-password"] !== undefined;                                             // 67
            if (!pwdService)                                                                                         // 68
                return true;                                                                                         // 69
        }                                                                                                            // 70
        */                                                                                                           // 71
        return false;                                                                                                // 72
    },                                                                                                               // 73
};                                                                                                                   // 74
                                                                                                                     // 75
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_input.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atInputRendered = function(){                                                                           // 1
    var fieldId = this.data._id;                                                                                     // 2
    var inputQueryVal = Router.current().params.query[fieldId];                                                      // 3
    if (inputQueryVal)                                                                                               // 4
        this.$("input#at-field-" + fieldId).val(inputQueryVal);                                                      // 5
};                                                                                                                   // 6
                                                                                                                     // 7
AT.prototype.atInputHelpers = {                                                                                      // 8
    disabled: function() {                                                                                           // 9
        return AccountsTemplates.disabled();                                                                         // 10
    },                                                                                                               // 11
    showLabels: function() {                                                                                         // 12
        return AccountsTemplates.options.showLabels;                                                                 // 13
    },                                                                                                               // 14
    displayName: function() {                                                                                        // 15
        var parentData = Template.parentData();                                                                      // 16
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 17
        var displayName = this.getDisplayName(state);                                                                // 18
        return T9n.get(displayName, markIfMissing=false);                                                            // 19
    },                                                                                                               // 20
    optionalText: function(){                                                                                        // 21
        return "(" + T9n.get(AccountsTemplates.texts.optionalField, markIfMissing=false) + ")";                      // 22
    },                                                                                                               // 23
    templateName: function() {                                                                                       // 24
        if (this.template)                                                                                           // 25
            return this.template;                                                                                    // 26
        if (this.type === "checkbox")                                                                                // 27
            return "atCheckboxInput";                                                                                // 28
        if (this.type === "select")                                                                                  // 29
            return "atSelectInput";                                                                                  // 30
        if (this.type === "radio")                                                                                   // 31
            return "atRadioInput";                                                                                   // 32
        if (this.type === "hidden")                                                                                  // 33
            return "atHiddenInput";                                                                                  // 34
        return "atTextInput";                                                                                        // 35
    },                                                                                                               // 36
    values: function(){                                                                                              // 37
        var id = this._id;                                                                                           // 38
        return _.map(this.select, function(select){                                                                  // 39
            var s = _.clone(select);                                                                                 // 40
            s._id = id + "-" + select.value;                                                                         // 41
            s.id = id;                                                                                               // 42
            return s;                                                                                                // 43
        });                                                                                                          // 44
    },                                                                                                               // 45
    errorText: function() {                                                                                          // 46
        var err = this.getStatus();                                                                                  // 47
        return T9n.get(err, markIfMissing=false);                                                                    // 48
    },                                                                                                               // 49
    placeholder: function() {                                                                                        // 50
        if (AccountsTemplates.options.showPlaceholders) {                                                            // 51
            var parentData = Template.parentData();                                                                  // 52
            var state = (parentData && parentData.state) || AccountsTemplates.getState();                            // 53
            var placeholder = this.getPlaceholder(state);                                                            // 54
            return T9n.get(placeholder, markIfMissing=false);                                                        // 55
        }                                                                                                            // 56
    },                                                                                                               // 57
};                                                                                                                   // 58
                                                                                                                     // 59
AT.prototype.atInputEvents = {                                                                                       // 60
    "focusin input": function(event, t){                                                                             // 61
        this.clearStatus();                                                                                          // 62
    },                                                                                                               // 63
    "focusout input": function(event, t){                                                                            // 64
        var fieldId = this._id;                                                                                      // 65
        var rawValue = this.getValue(t);                                                                             // 66
        var value = this.fixValue(rawValue);                                                                         // 67
        // Possibly updates the input value                                                                          // 68
        if (value !== rawValue) {                                                                                    // 69
            this.setValue(t, value);                                                                                 // 70
        }                                                                                                            // 71
                                                                                                                     // 72
        // Client-side only validation                                                                               // 73
        if (!this.validation)                                                                                        // 74
            return;                                                                                                  // 75
        var parentData = Template.parentData();                                                                      // 76
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 77
        // No validation during signIn                                                                               // 78
        if (state === "signIn")                                                                                      // 79
            return;                                                                                                  // 80
        // Special case for password confirmation                                                                    // 81
        if (value && fieldId === "password_again"){                                                                  // 82
            if (value !== $("#at-field-password").val())                                                             // 83
                return this.setError(AccountsTemplates.texts.errors.pwdMismatch);                                    // 84
        }                                                                                                            // 85
        this.validate(value);                                                                                        // 86
    },                                                                                                               // 87
    "keyup input": function(event, t){                                                                               // 88
        // Client-side only continuous validation                                                                    // 89
        if (!this.continuousValidation)                                                                              // 90
            return;                                                                                                  // 91
        var parentData = Template.parentData();                                                                      // 92
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 93
        // No validation during signIn                                                                               // 94
        if (state === "signIn")                                                                                      // 95
            return;                                                                                                  // 96
        var fieldId = this._id;                                                                                      // 97
        var rawValue = this.getValue(t);                                                                             // 98
        var value = this.fixValue(rawValue);                                                                         // 99
        // Possibly updates the input value                                                                          // 100
        if (value !== rawValue) {                                                                                    // 101
            this.setValue(t, value);                                                                                 // 102
        }                                                                                                            // 103
        // Special case for password confirmation                                                                    // 104
        if (value && fieldId === "password_again"){                                                                  // 105
            if (value !== $("#at-field-password").val())                                                             // 106
                return this.setError(AccountsTemplates.texts.errors.pwdMismatch);                                    // 107
        }                                                                                                            // 108
        this.validate(value);                                                                                        // 109
    },                                                                                                               // 110
};                                                                                                                   // 111
                                                                                                                     // 112
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_nav_button.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atNavButtonHelpers = {                                                                                  // 1
    text: function(){                                                                                                // 2
        var key = Meteor.userId() ? AccountsTemplates.texts.navSignOut : AccountsTemplates.texts.navSignIn;          // 3
        return T9n.get(key, markIfMissing=false);                                                                    // 4
    }                                                                                                                // 5
};                                                                                                                   // 6
                                                                                                                     // 7
AT.prototype.atNavButtonEvents = {                                                                                   // 8
    'click #at-nav-button': function(event){                                                                         // 9
        event.preventDefault();                                                                                      // 10
        if (Meteor.userId())                                                                                         // 11
            AccountsTemplates.logout();                                                                              // 12
        else                                                                                                         // 13
            AccountsTemplates.linkClick("signIn");                                                                   // 14
    },                                                                                                               // 15
};                                                                                                                   // 16
                                                                                                                     // 17
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_oauth.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atOauthHelpers = {                                                                                      // 1
    oauthService: function() {                                                                                       // 2
        return AccountsTemplates.oauthServices();                                                                    // 3
    },                                                                                                               // 4
};                                                                                                                   // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_form.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atPwdFormHelpers = {                                                                                    // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    fields: function() {                                                                                             // 5
        var parentData = Template.currentData();                                                                     // 6
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 7
        return _.filter(AccountsTemplates.getFields(), function(s) {                                                 // 8
            return _.contains(s.visible, state);                                                                     // 9
        });                                                                                                          // 10
    },                                                                                                               // 11
    showForgotPasswordLink: function() {                                                                             // 12
        var parentData = Template.currentData();                                                                     // 13
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 14
        return state === "signIn" && AccountsTemplates.options.showForgotPasswordLink;                               // 15
    },                                                                                                               // 16
    showReCaptcha: function() {                                                                                      // 17
      var parentData = Template.currentData();                                                                       // 18
      var state = (parentData && parentData.state) || AccountsTemplates.getState();                                  // 19
      return state === "signUp" && AccountsTemplates.options.showReCaptcha;                                          // 20
    },                                                                                                               // 21
};                                                                                                                   // 22
                                                                                                                     // 23
                                                                                                                     // 24
var toLowercaseUsername = function(value){                                                                           // 25
  return value.toLowerCase().replace(/\s+/gm, '');                                                                   // 26
};                                                                                                                   // 27
                                                                                                                     // 28
AT.prototype.atPwdFormEvents = {                                                                                     // 29
    // Form submit                                                                                                   // 30
    "submit #at-pwd-form": function(event, t) {                                                                      // 31
        event.preventDefault();                                                                                      // 32
        $("#at-btn").blur();                                                                                         // 33
                                                                                                                     // 34
        AccountsTemplates.setDisabled(true);                                                                         // 35
                                                                                                                     // 36
        var parentData = Template.currentData();                                                                     // 37
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 38
        var preValidation = (state !== "signIn");                                                                    // 39
                                                                                                                     // 40
        // Client-side pre-validation                                                                                // 41
        // Validates fields values                                                                                   // 42
        // NOTE: This is the only place where password validation can be enforced!                                   // 43
        var formData = {};                                                                                           // 44
        var someError = false;                                                                                       // 45
        var errList = [];                                                                                            // 46
        _.each(AccountsTemplates.getFields(), function(field){                                                       // 47
            // Considers only visible fields...                                                                      // 48
            if (!_.contains(field.visible, state))                                                                   // 49
                return;                                                                                              // 50
                                                                                                                     // 51
            var fieldId = field._id;                                                                                 // 52
                                                                                                                     // 53
            var rawValue = field.getValue(t);                                                                        // 54
            var value = field.fixValue(rawValue);                                                                    // 55
            // Possibly updates the input value                                                                      // 56
            if (value !== rawValue) {                                                                                // 57
                field.setValue(t, value);                                                                            // 58
            }                                                                                                        // 59
            if (value !== undefined && value !== "") {                                                               // 60
                formData[fieldId] = value;                                                                           // 61
            }                                                                                                        // 62
                                                                                                                     // 63
            // Validates the field value only if current state is not "signIn"                                       // 64
            if (preValidation && field.getStatus() !== false){                                                       // 65
                var validationErr = field.validate(value, "strict");                                                 // 66
                if (validationErr) {                                                                                 // 67
                    if (field.negativeValidation)                                                                    // 68
                        field.setError(validationErr);                                                               // 69
                    else{                                                                                            // 70
                        var fId = T9n.get(field.getDisplayName(), markIfMissing=false);                              // 71
                        //errList.push(fId + ": " + err);                                                            // 72
                        errList.push({                                                                               // 73
                            field: field.getDisplayName(),                                                           // 74
                            err: validationErr                                                                       // 75
                        });                                                                                          // 76
                    }                                                                                                // 77
                    someError = true;                                                                                // 78
                }                                                                                                    // 79
                else                                                                                                 // 80
                    field.setSuccess();                                                                              // 81
            }                                                                                                        // 82
        });                                                                                                          // 83
                                                                                                                     // 84
        // Clears error and result                                                                                   // 85
        AccountsTemplates.clearError();                                                                              // 86
        AccountsTemplates.clearResult();                                                                             // 87
        // Possibly sets errors                                                                                      // 88
        if (someError){                                                                                              // 89
            if (errList.length)                                                                                      // 90
                AccountsTemplates.state.form.set("error", errList);                                                  // 91
            AccountsTemplates.setDisabled(false);                                                                    // 92
            //reset reCaptcha form                                                                                   // 93
            if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                     // 94
                grecaptcha.reset();                                                                                  // 95
            }                                                                                                        // 96
            return;                                                                                                  // 97
        }                                                                                                            // 98
                                                                                                                     // 99
        // Extracts username, email, and pwds                                                                        // 100
        var current_password = formData.current_password;                                                            // 101
        var email = formData.email;                                                                                  // 102
        var password = formData.password;                                                                            // 103
        var password_again = formData.password_again;                                                                // 104
        var username = formData.username;                                                                            // 105
        var username_and_email = formData.username_and_email;                                                        // 106
        // Clears profile data removing username, email, and pwd                                                     // 107
        delete formData.current_password;                                                                            // 108
        delete formData.email;                                                                                       // 109
        delete formData.password;                                                                                    // 110
        delete formData.password_again;                                                                              // 111
        delete formData.username;                                                                                    // 112
        delete formData.username_and_email;                                                                          // 113
                                                                                                                     // 114
        if (AccountsTemplates.options.confirmPassword){                                                              // 115
            // Checks passwords for correct match                                                                    // 116
            if (password_again && password !== password_again){                                                      // 117
                var pwd_again = AccountsTemplates.getField("password_again");                                        // 118
                if (pwd_again.negativeValidation)                                                                    // 119
                    pwd_again.setError(AccountsTemplates.texts.errors.pwdMismatch);                                  // 120
                else                                                                                                 // 121
                    AccountsTemplates.state.form.set("error", [{                                                     // 122
                        field: pwd_again.getDisplayName(),                                                           // 123
                        err: AccountsTemplates.texts.errors.pwdMismatch                                              // 124
                    }]);                                                                                             // 125
                AccountsTemplates.setDisabled(false);                                                                // 126
                //reset reCaptcha form                                                                               // 127
                if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                 // 128
                  grecaptcha.reset();                                                                                // 129
                }                                                                                                    // 130
                return;                                                                                              // 131
            }                                                                                                        // 132
        }                                                                                                            // 133
                                                                                                                     // 134
        // -------                                                                                                   // 135
        // Sign In                                                                                                   // 136
        // -------                                                                                                   // 137
        if (state === "signIn") {                                                                                    // 138
            var pwdOk = !!password;                                                                                  // 139
            var userOk = true;                                                                                       // 140
            var loginSelector;                                                                                       // 141
            if (email) {                                                                                             // 142
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 143
                  email = toLowercaseUsername(email);                                                                // 144
                }                                                                                                    // 145
                                                                                                                     // 146
                loginSelector = {email: email};                                                                      // 147
            }                                                                                                        // 148
            else if (username) {                                                                                     // 149
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 150
                  username = toLowercaseUsername(username);                                                          // 151
                }                                                                                                    // 152
                loginSelector = {username: username};                                                                // 153
            }                                                                                                        // 154
            else if (username_and_email) {                                                                           // 155
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 156
                  username_and_email = toLowercaseUsername(username_and_email);                                      // 157
                }                                                                                                    // 158
                loginSelector = username_and_email;                                                                  // 159
            }                                                                                                        // 160
            else                                                                                                     // 161
                userOk = false;                                                                                      // 162
                                                                                                                     // 163
            // Possibly exits if not both 'password' and 'username' are non-empty...                                 // 164
            if (!pwdOk || !userOk){                                                                                  // 165
                AccountsTemplates.state.form.set("error", ["error.accounts.Login forbidden"]);                       // 166
                AccountsTemplates.setDisabled(false);                                                                // 167
                return;                                                                                              // 168
            }                                                                                                        // 169
                                                                                                                     // 170
            return Meteor.loginWithPassword(loginSelector, password, function(error) {                               // 171
                AccountsTemplates.submitCallback(error, state);                                                      // 172
            });                                                                                                      // 173
        }                                                                                                            // 174
                                                                                                                     // 175
        // -------                                                                                                   // 176
        // Sign Up                                                                                                   // 177
        // -------                                                                                                   // 178
        if (state === "signUp") {                                                                                    // 179
            // Possibly gets reCaptcha response                                                                      // 180
            if (AccountsTemplates.options.showReCaptcha) {                                                           // 181
              formData.reCaptchaResponse = grecaptcha.getResponse();                                                 // 182
            }                                                                                                        // 183
                                                                                                                     // 184
            var hash = Accounts._hashPassword(password);                                                             // 185
            return Meteor.call("ATCreateUserServer", {                                                               // 186
                username: username,                                                                                  // 187
                email: email,                                                                                        // 188
                password: hash,                                                                                      // 189
                profile: formData,                                                                                   // 190
            }, function(error){                                                                                      // 191
                AccountsTemplates.submitCallback(error, undefined, function(){                                       // 192
                    if (AccountsTemplates.options.sendVerificationEmail && AccountsTemplates.options.enforceEmailVerification){
                        AccountsTemplates.submitCallback(error, state, function () {                                 // 194
                            AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.signUpVerifyEmail);
                            // Cleans up input fields' content                                                       // 196
                            _.each(AccountsTemplates.getFields(), function(field){                                   // 197
                                // Considers only visible fields...                                                  // 198
                                if (!_.contains(field.visible, state))                                               // 199
                                    return;                                                                          // 200
                                                                                                                     // 201
                                var elem = t.$("#at-field-" + field._id);                                            // 202
                                                                                                                     // 203
                                // Naïve reset                                                                       // 204
                                if (field.type === "checkbox") elem.prop('checked', false);                          // 205
                                else elem.val("");                                                                   // 206
                                                                                                                     // 207
                            });                                                                                      // 208
                            AccountsTemplates.setDisabled(false);                                                    // 209
                            AccountsTemplates.avoidRedirect = true;                                                  // 210
                        });                                                                                          // 211
                    }                                                                                                // 212
                    else {                                                                                           // 213
                        var loginSelector;                                                                           // 214
                                                                                                                     // 215
                        if (email) {                                                                                 // 216
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 217
                              email = toLowercaseUsername(email);                                                    // 218
                            }                                                                                        // 219
                                                                                                                     // 220
                            loginSelector = {email: email};                                                          // 221
                        }                                                                                            // 222
                        else if (username) {                                                                         // 223
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 224
                              username = toLowercaseUsername(username);                                              // 225
                            }                                                                                        // 226
                            loginSelector = {username: username};                                                    // 227
                        }                                                                                            // 228
                        else {                                                                                       // 229
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 230
                              username_and_email = toLowercaseUsername(username_and_email);                          // 231
                            }                                                                                        // 232
                            loginSelector = username_and_email;                                                      // 233
                        }                                                                                            // 234
                                                                                                                     // 235
                        Meteor.loginWithPassword(loginSelector, password, function(error) {                          // 236
                            AccountsTemplates.submitCallback(error, state, function(){                               // 237
                                AccountsTemplates.setState("signIn");                                                // 238
                            });                                                                                      // 239
                        });                                                                                          // 240
                    }                                                                                                // 241
                });                                                                                                  // 242
            });                                                                                                      // 243
        }                                                                                                            // 244
                                                                                                                     // 245
        //----------------                                                                                           // 246
        // Forgot Password                                                                                           // 247
        //----------------                                                                                           // 248
        if (state === "forgotPwd"){                                                                                  // 249
            return Accounts.forgotPassword({                                                                         // 250
                email: email                                                                                         // 251
            }, function(error) {                                                                                     // 252
                AccountsTemplates.submitCallback(error, state, function(){                                           // 253
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailSent);              // 254
                    t.$("#at-field-email").val("");                                                                  // 255
                });                                                                                                  // 256
            });                                                                                                      // 257
        }                                                                                                            // 258
                                                                                                                     // 259
        //--------------------------------                                                                           // 260
        // Reset Password / Enroll Account                                                                           // 261
        //--------------------------------                                                                           // 262
        if (state === "resetPwd" || state === "enrollAccount") {                                                     // 263
            return Accounts.resetPassword(AccountsTemplates.paramToken, password, function(error) {                  // 264
                AccountsTemplates.submitCallback(error, state, function(){                                           // 265
                    var pwd_field_id;                                                                                // 266
                    if (state === "resetPwd")                                                                        // 267
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdReset);           // 268
                    else // Enroll Account                                                                           // 269
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdSet);             // 270
                    t.$("#at-field-password").val("");                                                               // 271
                    if (AccountsTemplates.options.confirmPassword)                                                   // 272
                        t.$("#at-field-password_again").val("");                                                     // 273
                });                                                                                                  // 274
            });                                                                                                      // 275
        }                                                                                                            // 276
                                                                                                                     // 277
        //----------------                                                                                           // 278
        // Change Password                                                                                           // 279
        //----------------                                                                                           // 280
        if (state === "changePwd"){                                                                                  // 281
            return Accounts.changePassword(current_password, password, function(error) {                             // 282
                AccountsTemplates.submitCallback(error, state, function(){                                           // 283
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdChanged);             // 284
                    t.$("#at-field-current_password").val("");                                                       // 285
                    t.$("#at-field-password").val("");                                                               // 286
                    if (AccountsTemplates.options.confirmPassword)                                                   // 287
                        t.$("#at-field-password_again").val("");                                                     // 288
                });                                                                                                  // 289
            });                                                                                                      // 290
        }                                                                                                            // 291
    },                                                                                                               // 292
};                                                                                                                   // 293
                                                                                                                     // 294
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_form_btn.js                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atPwdFormBtnHelpers = {                                                                                 // 1
    submitDisabled: function(){                                                                                      // 2
        var disable = _.chain(AccountsTemplates.getFields())                                                         // 3
            .map(function(field){                                                                                    // 4
                return field.hasError() || field.isValidating();                                                     // 5
            })                                                                                                       // 6
            .some()                                                                                                  // 7
            .value()                                                                                                 // 8
        ;                                                                                                            // 9
        if (disable)                                                                                                 // 10
            return "disabled";                                                                                       // 11
    },                                                                                                               // 12
    buttonText: function() {                                                                                         // 13
        var parentData = Template.currentData();                                                                     // 14
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 15
        return T9n.get(AccountsTemplates.texts.button[state], markIfMissing=false);                                  // 16
    },                                                                                                               // 17
};                                                                                                                   // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_link.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atPwdLinkHelpers = {                                                                                    // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    forgotPwdLink: function(){                                                                                       // 5
        return AccountsTemplates.getRoutePath("forgotPwd");                                                          // 6
    },                                                                                                               // 7
    preText: function(){                                                                                             // 8
        return T9n.get(AccountsTemplates.texts.pwdLink_pre, markIfMissing=false);                                    // 9
    },                                                                                                               // 10
    linkText: function(){                                                                                            // 11
        return T9n.get(AccountsTemplates.texts.pwdLink_link, markIfMissing=false);                                   // 12
    },                                                                                                               // 13
    suffText: function(){                                                                                            // 14
        return T9n.get(AccountsTemplates.texts.pwdLink_suff, markIfMissing=false);                                   // 15
    },                                                                                                               // 16
};                                                                                                                   // 17
                                                                                                                     // 18
AT.prototype.atPwdLinkEvents = {                                                                                     // 19
    "click #at-forgotPwd": function(event, t) {                                                                      // 20
        event.preventDefault();                                                                                      // 21
        AccountsTemplates.linkClick("forgotPwd");                                                                    // 22
    },                                                                                                               // 23
};                                                                                                                   // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_reCaptcha.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atReCaptchaRendered = function() {                                                                      // 1
    $.getScript('//www.google.com/recaptcha/api.js');                                                                // 2
};                                                                                                                   // 3
                                                                                                                     // 4
AT.prototype.atReCaptchaHelpers = {                                                                                  // 5
    key: function() {                                                                                                // 6
        if (AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.siteKey)                      // 7
            return AccountsTemplates.options.reCaptcha.siteKey;                                                      // 8
        return Meteor.settings.public.reCaptcha.siteKey;                                                             // 9
    },                                                                                                               // 10
                                                                                                                     // 11
    theme: function() {                                                                                              // 12
        return AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.theme;                     // 13
    },                                                                                                               // 14
                                                                                                                     // 15
    data_type: function() {                                                                                          // 16
        return AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.data_type;                 // 17
    },                                                                                                               // 18
};                                                                                                                   // 19
                                                                                                                     // 20
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_result.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atResultHelpers = {                                                                                     // 1
    result: function() {                                                                                             // 2
        var resultText = AccountsTemplates.state.form.get("result");                                                 // 3
        if (resultText)                                                                                              // 4
            return T9n.get(resultText, markIfMissing=false);                                                         // 5
    },                                                                                                               // 6
};                                                                                                                   // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_sep.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atSepHelpers = {                                                                                        // 1
    sepText: function(){                                                                                             // 2
        return T9n.get(AccountsTemplates.texts.sep, markIfMissing=false);                                            // 3
    },                                                                                                               // 4
};                                                                                                                   // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_signin_link.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atSigninLinkHelpers = {                                                                                 // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    signInLink: function(){                                                                                          // 5
        return AccountsTemplates.getRoutePath("signIn");                                                             // 6
    },                                                                                                               // 7
    preText: function(){                                                                                             // 8
        return T9n.get(AccountsTemplates.texts.signInLink_pre, markIfMissing=false);                                 // 9
    },                                                                                                               // 10
    linkText: function(){                                                                                            // 11
        return T9n.get(AccountsTemplates.texts.signInLink_link, markIfMissing=false);                                // 12
    },                                                                                                               // 13
    suffText: function(){                                                                                            // 14
        return T9n.get(AccountsTemplates.texts.signInLink_suff, markIfMissing=false);                                // 15
    },                                                                                                               // 16
};                                                                                                                   // 17
                                                                                                                     // 18
AT.prototype.atSigninLinkEvents = {                                                                                  // 19
    "click #at-signIn": function(event, t) {                                                                         // 20
        event.preventDefault();                                                                                      // 21
        AccountsTemplates.linkClick("signIn");                                                                       // 22
    },                                                                                                               // 23
};                                                                                                                   // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_signup_link.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atSignupLinkHelpers = {                                                                                 // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    signUpLink: function(){                                                                                          // 5
        return AccountsTemplates.getRoutePath("signUp");                                                             // 6
    },                                                                                                               // 7
    preText: function(){                                                                                             // 8
        return T9n.get(AccountsTemplates.texts.signUpLink_pre, markIfMissing=false);                                 // 9
    },                                                                                                               // 10
    linkText: function(){                                                                                            // 11
        return T9n.get(AccountsTemplates.texts.signUpLink_link, markIfMissing=false);                                // 12
    },                                                                                                               // 13
    suffText: function(){                                                                                            // 14
        return T9n.get(AccountsTemplates.texts.signUpLink_suff, markIfMissing=false);                                // 15
    },                                                                                                               // 16
};                                                                                                                   // 17
                                                                                                                     // 18
AT.prototype.atSignupLinkEvents = {                                                                                  // 19
    "click #at-signUp": function(event, t) {                                                                         // 20
        event.preventDefault();                                                                                      // 21
        AccountsTemplates.linkClick('signUp');                                                                       // 22
    },                                                                                                               // 23
};                                                                                                                   // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_social.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atSocialHelpers = {                                                                                     // 1
    disabled: function() {                                                                                           // 2
        if (AccountsTemplates.disabled())                                                                            // 3
            return "disabled";                                                                                       // 4
        var user = Meteor.user();                                                                                    // 5
        if (user){                                                                                                   // 6
            var numServices = 0;                                                                                     // 7
            if (user.services)                                                                                       // 8
                numServices = _.keys(user.services).length; // including "resume"                                    // 9
            if (numServices === 2 && user.services[this._id])                                                        // 10
                return "disabled";                                                                                   // 11
        }                                                                                                            // 12
    },                                                                                                               // 13
    name: function(){                                                                                                // 14
        return this._id;                                                                                             // 15
    },                                                                                                               // 16
    iconClass: function() {                                                                                          // 17
        var ic = AccountsTemplates.texts.socialIcons[this._id];                                                      // 18
        if (!ic)                                                                                                     // 19
            ic = "fa fa-" + this._id;                                                                                // 20
        return ic;                                                                                                   // 21
    },                                                                                                               // 22
    buttonText: function() {                                                                                         // 23
        var service = this;                                                                                          // 24
        var serviceName = this._id;                                                                                  // 25
        if (serviceName === "meteor-developer")                                                                      // 26
            serviceName = "meteor";                                                                                  // 27
        serviceName = capitalize(serviceName);                                                                       // 28
        if (!service.configured)                                                                                     // 29
            return T9n.get(AccountsTemplates.texts.socialConfigure, markIfMissing=false) + " " + serviceName;        // 30
        var showAddRemove = AccountsTemplates.options.showAddRemoveServices;                                         // 31
        var user = Meteor.user();                                                                                    // 32
        if (user && showAddRemove){                                                                                  // 33
            if (user.services && user.services[this._id]){                                                           // 34
                var numServices = _.keys(user.services).length; // including "resume"                                // 35
                if (numServices === 2)                                                                               // 36
                    return serviceName;                                                                              // 37
                else                                                                                                 // 38
                    return T9n.get(AccountsTemplates.texts.socialRemove, markIfMissing=false) + " " + serviceName;   // 39
            } else                                                                                                   // 40
                    return T9n.get(AccountsTemplates.texts.socialAdd, markIfMissing=false) + " " + serviceName;      // 41
        }                                                                                                            // 42
        var parentData = Template.parentData();                                                                      // 43
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 44
        var prefix = state === "signIn" ?                                                                            // 45
            T9n.get(AccountsTemplates.texts.socialSignIn, markIfMissing=false) :                                     // 46
            T9n.get(AccountsTemplates.texts.socialSignUp, markIfMissing=false);                                      // 47
        return prefix + " " + T9n.get(AccountsTemplates.texts.socialWith, markIfMissing=false) + " " + serviceName;  // 48
    },                                                                                                               // 49
};                                                                                                                   // 50
                                                                                                                     // 51
AT.prototype.atSocialEvents = {                                                                                      // 52
    "click button": function(event, t) {                                                                             // 53
        event.preventDefault();                                                                                      // 54
        event.currentTarget.blur();                                                                                  // 55
        if (AccountsTemplates.disabled())                                                                            // 56
            return;                                                                                                  // 57
        var user = Meteor.user();                                                                                    // 58
        if (user && user.services && user.services[this._id]){                                                       // 59
            var numServices = _.keys(user.services).length; // including "resume"                                    // 60
            if (numServices === 2)                                                                                   // 61
                return;                                                                                              // 62
            else{                                                                                                    // 63
                AccountsTemplates.setDisabled(true);                                                                 // 64
                Meteor.call("ATRemoveService", this._id, function(error){                                            // 65
                    AccountsTemplates.setDisabled(false);                                                            // 66
                });                                                                                                  // 67
            }                                                                                                        // 68
        } else {                                                                                                     // 69
            AccountsTemplates.setDisabled(true);                                                                     // 70
            var parentData = Template.parentData();                                                                  // 71
            var state = (parentData && parentData.state) || AccountsTemplates.getState();                            // 72
            var serviceName = this._id;                                                                              // 73
            var methodName;                                                                                          // 74
            if (serviceName === 'meteor-developer')                                                                  // 75
                methodName = "loginWithMeteorDeveloperAccount";                                                      // 76
            else                                                                                                     // 77
                methodName = "loginWith" + capitalize(serviceName);                                                  // 78
            var loginWithService = Meteor[methodName];                                                               // 79
            options = {                                                                                              // 80
                loginStyle: AccountsTemplates.options.socialLoginStyle,                                              // 81
            };                                                                                                       // 82
            if (Accounts.ui) {                                                                                       // 83
                if (Accounts.ui._options.requestPermissions[serviceName]) {                                          // 84
                    options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];               // 85
                }                                                                                                    // 86
                if (Accounts.ui._options.requestOfflineToken[serviceName]) {                                         // 87
                    options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];             // 88
                }                                                                                                    // 89
            }                                                                                                        // 90
            loginWithService(options, function(err) {                                                                // 91
                AccountsTemplates.setDisabled(false);                                                                // 92
                if (err && err instanceof Accounts.LoginCancelledError) {                                            // 93
                    // do nothing                                                                                    // 94
                }                                                                                                    // 95
                else if (err && err instanceof ServiceConfiguration.ConfigError) {                                   // 96
                    if (Accounts._loginButtonsSession)                                                               // 97
                        return Accounts._loginButtonsSession.configureService(serviceName);                          // 98
                }                                                                                                    // 99
                else                                                                                                 // 100
                    AccountsTemplates.submitCallback(err, state);                                                    // 101
            });                                                                                                      // 102
        }                                                                                                            // 103
    },                                                                                                               // 104
};                                                                                                                   // 105
                                                                                                                     // 106
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_terms_link.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atTermsLinkHelpers = {                                                                                  // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    text: function(){                                                                                                // 5
        return T9n.get(AccountsTemplates.texts.termsPreamble, markIfMissing=false);                                  // 6
    },                                                                                                               // 7
    privacyUrl: function(){                                                                                          // 8
        return AccountsTemplates.options.privacyUrl;                                                                 // 9
    },                                                                                                               // 10
    privacyLinkText: function(){                                                                                     // 11
        return T9n.get(AccountsTemplates.texts.termsPrivacy, markIfMissing=false);                                   // 12
    },                                                                                                               // 13
    showTermsAnd: function(){                                                                                        // 14
        return !!AccountsTemplates.options.privacyUrl && !!AccountsTemplates.options.termsUrl;                       // 15
    },                                                                                                               // 16
    and: function(){                                                                                                 // 17
        return T9n.get(AccountsTemplates.texts.termsAnd, markIfMissing=false);                                       // 18
    },                                                                                                               // 19
    termsUrl: function(){                                                                                            // 20
        return AccountsTemplates.options.termsUrl;                                                                   // 21
    },                                                                                                               // 22
    termsLinkText: function(){                                                                                       // 23
        return T9n.get(AccountsTemplates.texts.termsTerms, markIfMissing=false);                                     // 24
    },                                                                                                               // 25
};                                                                                                                   // 26
                                                                                                                     // 27
AT.prototype.atTermsLinkEvents = {                                                                                   // 28
    "click a": function(event) {                                                                                     // 29
        if (AccountsTemplates.disabled())                                                                            // 30
            event.preventDefault();                                                                                  // 31
    },                                                                                                               // 32
};                                                                                                                   // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_title.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atTitleHelpers = {                                                                                      // 1
    title: function(){                                                                                               // 2
        var parentData = Template.currentData();                                                                     // 3
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 4
        return T9n.get(AccountsTemplates.texts.title[state], markIfMissing=false);                                   // 5
    },                                                                                                               // 6
};                                                                                                                   // 7
                                                                                                                     // 8
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/methods.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Meteor.methods({                                                                                                     // 2
    ATRemoveService: function(service_name){                                                                         // 3
        var userId = this.userId;                                                                                    // 4
        if (userId){                                                                                                 // 5
            var user = Meteor.users.findOne(userId);                                                                 // 6
            var numServices = _.keys(user.services).length; // including "resume"                                    // 7
            if (numServices === 2)                                                                                   // 8
                throw new Meteor.Error(403, "Cannot remove the only active service!", {});                           // 9
            var unset = {};                                                                                          // 10
            unset["services." + service_name] = "";                                                                  // 11
            Meteor.users.update(userId, {$unset: unset});                                                            // 12
        }                                                                                                            // 13
    },                                                                                                               // 14
});                                                                                                                  // 15
                                                                                                                     // 16
                                                                                                                     // 17
if (Meteor.isServer) {                                                                                               // 18
    Meteor.methods({                                                                                                 // 19
        ATCreateUserServer: function(options){                                                                       // 20
            if (AccountsTemplates.options.forbidClientAccountCreation)                                               // 21
                throw new Meteor.Error(403, "Client side accounts creation is disabled!!!");                         // 22
            // createUser() does more checking.                                                                      // 23
            check(options, Object);                                                                                  // 24
            var allFieldIds = AccountsTemplates.getFieldIds();                                                       // 25
            // Picks-up whitelisted fields for profile                                                               // 26
            var profile = options.profile;                                                                           // 27
            profile = _.pick(profile, allFieldIds);                                                                  // 28
            profile = _.omit(profile, "username", "email", "password");                                              // 29
            // Validates fields" value                                                                               // 30
            var signupInfo = _.clone(profile);                                                                       // 31
            if (options.username) {                                                                                  // 32
                signupInfo.username = options.username;                                                              // 33
                                                                                                                     // 34
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 35
                  signupInfo.username = signupInfo.username.trim().replace(/\s+/gm, ' ');                            // 36
                  options.profile.username = signupInfo.username;                                                    // 37
                  signupInfo.username = signupInfo.username.toLowerCase().replace(/\s+/gm, '');                      // 38
                  options.username = signupInfo.username                                                             // 39
                }                                                                                                    // 40
            }                                                                                                        // 41
            if (options.email) {                                                                                     // 42
                signupInfo.email = options.email;                                                                    // 43
                                                                                                                     // 44
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 45
                  signupInfo.email = signupInfo.email.toLowerCase().replace(/\s+/gm, '');                            // 46
                  options.email = signupInfo.email                                                                   // 47
                }                                                                                                    // 48
            }                                                                                                        // 49
            if (options.password)                                                                                    // 50
                signupInfo.password = options.password;                                                              // 51
            var validationErrors = {};                                                                               // 52
            var someError = false;                                                                                   // 53
                                                                                                                     // 54
            // Validates fields values                                                                               // 55
            _.each(AccountsTemplates.getFields(), function(field){                                                   // 56
                var fieldId = field._id;                                                                             // 57
                var value = signupInfo[fieldId];                                                                     // 58
                if (fieldId === "password"){                                                                         // 59
                    // Can"t Pick-up password here                                                                   // 60
                    // NOTE: at this stage the password is already encripted,                                        // 61
                    //       so there is no way to validate it!!!                                                    // 62
                    check(value, Object);                                                                            // 63
                    return;                                                                                          // 64
                }                                                                                                    // 65
                var validationErr = field.validate(value, "strict");                                                 // 66
                if (validationErr) {                                                                                 // 67
                    validationErrors[fieldId] = validationErr;                                                       // 68
                    someError = true;                                                                                // 69
                }                                                                                                    // 70
            });                                                                                                      // 71
                                                                                                                     // 72
            if (AccountsTemplates.options.showReCaptcha) {                                                           // 73
                var secretKey = null;                                                                                // 74
                                                                                                                     // 75
                if (AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.secretKey) {          // 76
                    secretKey = AccountsTemplates.options.reCaptcha.secretKey;                                       // 77
                }                                                                                                    // 78
                else {                                                                                               // 79
                    secretKey = Meteor.settings.reCaptcha.secretKey;                                                 // 80
                }                                                                                                    // 81
                                                                                                                     // 82
                var apiResponse = HTTP.post("https://www.google.com/recaptcha/api/siteverify", {                     // 83
                  params: {                                                                                          // 84
                      secret: secretKey,                                                                             // 85
                      response: options.profile.reCaptchaResponse,                                                   // 86
                      remoteip: this.connection.clientAddress,                                                       // 87
                  }                                                                                                  // 88
                }).data;                                                                                             // 89
                                                                                                                     // 90
                if (!apiResponse.success) {                                                                          // 91
                    throw new Meteor.Error(403, "Captcha verification failed!",                                      // 92
                      apiResponse['error-codes'] ? apiResponse['error-codes'].join(", ") : "Unknown Error.");        // 93
                }                                                                                                    // 94
            }                                                                                                        // 95
                                                                                                                     // 96
            if (someError)                                                                                           // 97
                throw new Meteor.Error(403, "Validation Errors", validationErrors);                                  // 98
                                                                                                                     // 99
            // Possibly removes the profile field                                                                    // 100
            if (_.isEmpty(options.profile))                                                                          // 101
                delete options.profile;                                                                              // 102
                                                                                                                     // 103
            // Create user. result contains id and token.                                                            // 104
            var userId = Accounts.createUser(options);                                                               // 105
            // safety belt. createUser is supposed to throw on error. send 500 error                                 // 106
            // instead of sending a verification email with empty userid.                                            // 107
            if (! userId)                                                                                            // 108
                throw new Error("createUser failed to insert new user");                                             // 109
                                                                                                                     // 110
            // Send a email address verification email in case the context permits it                                // 111
            // and the specific configuration flag was set to true                                                   // 112
            if (options.email && AccountsTemplates.options.sendVerificationEmail)                                    // 113
                Accounts.sendVerificationEmail(userId, options.email);                                               // 114
        },                                                                                                           // 115
    });                                                                                                              // 116
}                                                                                                                    // 117
                                                                                                                     // 118
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['useraccounts:core'] = {
  AccountsTemplates: AccountsTemplates
};

})();
