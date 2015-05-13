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
    verifyEmail: Match.Optional(String),                                                                             // 14
    resendVerificationEmail: Match.Optional(String),                                                                 // 15
};                                                                                                                   // 16
                                                                                                                     // 17
ERRORS_PAT = {                                                                                                       // 18
    accountsCreationDisabled: Match.Optional(String),                                                                // 19
    cannotRemoveService: Match.Optional(String),                                                                     // 20
    captchaVerification: Match.Optional(String),                                                                     // 21
    loginForbidden: Match.Optional(String),                                                                          // 22
    mustBeLoggedIn: Match.Optional(String),                                                                          // 23
    pwdMismatch: Match.Optional(String),                                                                             // 24
    validationErrors: Match.Optional(String),                                                                        // 25
    verifyEmailFirst: Match.Optional(String),                                                                        // 26
};                                                                                                                   // 27
                                                                                                                     // 28
INFO_PAT = {                                                                                                         // 29
    emailSent: Match.Optional(String),                                                                               // 30
    emailVerified: Match.Optional(String),                                                                           // 31
    pwdChanged: Match.Optional(String),                                                                              // 32
    pwdReset: Match.Optional(String),                                                                                // 33
    pwdSet: Match.Optional(String),                                                                                  // 34
    signUpVerifyEmail: Match.Optional(String),                                                                       // 35
    verificationEmailSent: Match.Optional(String),                                                                   // 36
};                                                                                                                   // 37
                                                                                                                     // 38
INPUT_ICONS_PAT = {                                                                                                  // 39
    hasError: Match.Optional(String),                                                                                // 40
    hasSuccess: Match.Optional(String),                                                                              // 41
    isValidating: Match.Optional(String),                                                                            // 42
};                                                                                                                   // 43
                                                                                                                     // 44
ObjWithStringValues = Match.Where(function (x) {                                                                     // 45
    check(x, Object);                                                                                                // 46
    _.each(_.values(x), function(value){                                                                             // 47
        check(value, String);                                                                                        // 48
    });                                                                                                              // 49
    return true;                                                                                                     // 50
});                                                                                                                  // 51
                                                                                                                     // 52
TEXTS_PAT = {                                                                                                        // 53
    button: Match.Optional(STATE_PAT),                                                                               // 54
    errors: Match.Optional(ERRORS_PAT),                                                                              // 55
    info: Match.Optional(INFO_PAT),                                                                                  // 56
    inputIcons: Match.Optional(INPUT_ICONS_PAT),                                                                     // 57
    navSignIn: Match.Optional(String),                                                                               // 58
    navSignOut: Match.Optional(String),                                                                              // 59
    optionalField: Match.Optional(String),                                                                           // 60
    pwdLink_link: Match.Optional(String),                                                                            // 61
    pwdLink_pre: Match.Optional(String),                                                                             // 62
    pwdLink_suff: Match.Optional(String),                                                                            // 63
    sep: Match.Optional(String),                                                                                     // 64
    signInLink_link: Match.Optional(String),                                                                         // 65
    signInLink_pre: Match.Optional(String),                                                                          // 66
    signInLink_suff: Match.Optional(String),                                                                         // 67
    signUpLink_link: Match.Optional(String),                                                                         // 68
    signUpLink_pre: Match.Optional(String),                                                                          // 69
    signUpLink_suff: Match.Optional(String),                                                                         // 70
    socialAdd: Match.Optional(String),                                                                               // 71
    socialConfigure: Match.Optional(String),                                                                         // 72
    socialIcons: Match.Optional(ObjWithStringValues),                                                                // 73
    socialRemove: Match.Optional(String),                                                                            // 74
    socialSignIn: Match.Optional(String),                                                                            // 75
    socialSignUp: Match.Optional(String),                                                                            // 76
    socialWith: Match.Optional(String),                                                                              // 77
    termsAnd: Match.Optional(String),                                                                                // 78
    termsPreamble: Match.Optional(String),                                                                           // 79
    termsPrivacy: Match.Optional(String),                                                                            // 80
    termsTerms: Match.Optional(String),                                                                              // 81
    title: Match.Optional(STATE_PAT),                                                                                // 82
};                                                                                                                   // 83
                                                                                                                     // 84
// Configuration pattern to be checked with check                                                                    // 85
CONFIG_PAT = {                                                                                                       // 86
    // Behaviour                                                                                                     // 87
    confirmPassword: Match.Optional(Boolean),                                                                        // 88
    defaultState: Match.Optional(String),                                                                            // 89
    enablePasswordChange: Match.Optional(Boolean),                                                                   // 90
    enforceEmailVerification: Match.Optional(Boolean),                                                               // 91
    forbidClientAccountCreation: Match.Optional(Boolean),                                                            // 92
    lowercaseUsername: Match.Optional(Boolean),                                                                      // 93
    overrideLoginErrors: Match.Optional(Boolean),                                                                    // 94
    sendVerificationEmail: Match.Optional(Boolean),                                                                  // 95
    socialLoginStyle: Match.Optional(Match.OneOf("popup", "redirect")),                                              // 96
                                                                                                                     // 97
    // Appearance                                                                                                    // 98
    defaultLayout: Match.Optional(String),                                                                           // 99
    hideSignInLink: Match.Optional(Boolean),                                                                         // 100
    hideSignUpLink: Match.Optional(Boolean),                                                                         // 101
    showAddRemoveServices: Match.Optional(Boolean),                                                                  // 102
    showForgotPasswordLink: Match.Optional(Boolean),                                                                 // 103
    showResendVerificationEmailLink: Match.Optional(Boolean),                                                        // 104
    showLabels: Match.Optional(Boolean),                                                                             // 105
    showPlaceholders: Match.Optional(Boolean),                                                                       // 106
                                                                                                                     // 107
    // Client-side Validation                                                                                        // 108
    continuousValidation: Match.Optional(Boolean),                                                                   // 109
    negativeFeedback: Match.Optional(Boolean),                                                                       // 110
    negativeValidation: Match.Optional(Boolean),                                                                     // 111
    positiveFeedback: Match.Optional(Boolean),                                                                       // 112
    positiveValidation: Match.Optional(Boolean),                                                                     // 113
    showValidating: Match.Optional(Boolean),                                                                         // 114
                                                                                                                     // 115
    // Privacy Policy and Terms of Use                                                                               // 116
    privacyUrl: Match.Optional(String),                                                                              // 117
    termsUrl: Match.Optional(String),                                                                                // 118
                                                                                                                     // 119
    // Redirects                                                                                                     // 120
    homeRoutePath: Match.Optional(String),                                                                           // 121
    redirectTimeout: Match.Optional(Number),                                                                         // 122
                                                                                                                     // 123
    // Hooks                                                                                                         // 124
    onLogoutHook: Match.Optional(Function),                                                                          // 125
    onSubmitHook: Match.Optional(Function),                                                                          // 126
                                                                                                                     // 127
    texts: Match.Optional(TEXTS_PAT),                                                                                // 128
                                                                                                                     // 129
    //reCaptcha config                                                                                               // 130
    reCaptcha: Match.Optional({                                                                                      // 131
        data_type: Match.Optional(Match.OneOf("audio", "image")),                                                    // 132
        secretKey: Match.Optional(String),                                                                           // 133
        siteKey: Match.Optional(String),                                                                             // 134
        theme: Match.Optional(Match.OneOf("dark", "light")),                                                         // 135
    }),                                                                                                              // 136
                                                                                                                     // 137
    showReCaptcha: Match.Optional(Boolean),                                                                          // 138
};                                                                                                                   // 139
                                                                                                                     // 140
                                                                                                                     // 141
FIELD_SUB_PAT = {                                                                                                    // 142
    "default": Match.Optional(String),                                                                               // 143
    changePwd: Match.Optional(String),                                                                               // 144
    enrollAccount: Match.Optional(String),                                                                           // 145
    forgotPwd: Match.Optional(String),                                                                               // 146
    resetPwd: Match.Optional(String),                                                                                // 147
    signIn: Match.Optional(String),                                                                                  // 148
    signUp: Match.Optional(String),                                                                                  // 149
};                                                                                                                   // 150
                                                                                                                     // 151
                                                                                                                     // 152
// Field pattern                                                                                                     // 153
FIELD_PAT = {                                                                                                        // 154
    _id: String,                                                                                                     // 155
    type: String,                                                                                                    // 156
    required: Match.Optional(Boolean),                                                                               // 157
    displayName: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                 // 158
    placeholder: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                 // 159
    select: Match.Optional([{text: String, value: Match.Any}]),                                                      // 160
    minLength: Match.Optional(Match.Integer),                                                                        // 161
    maxLength: Match.Optional(Match.Integer),                                                                        // 162
    re: Match.Optional(RegExp),                                                                                      // 163
    func: Match.Optional(Match.Where(_.isFunction)),                                                                 // 164
    errStr: Match.Optional(String),                                                                                  // 165
                                                                                                                     // 166
    // Client-side Validation                                                                                        // 167
    continuousValidation: Match.Optional(Boolean),                                                                   // 168
    negativeFeedback: Match.Optional(Boolean),                                                                       // 169
    negativeValidation: Match.Optional(Boolean),                                                                     // 170
    positiveValidation: Match.Optional(Boolean),                                                                     // 171
    positiveFeedback: Match.Optional(Boolean),                                                                       // 172
                                                                                                                     // 173
    // Transforms                                                                                                    // 174
    trim: Match.Optional(Boolean),                                                                                   // 175
    lowercase: Match.Optional(Boolean),                                                                              // 176
    uppercase: Match.Optional(Boolean),                                                                              // 177
    transform: Match.Optional(Match.Where(_.isFunction)),                                                            // 178
                                                                                                                     // 179
    // Custom options                                                                                                // 180
    options: Match.Optional(Object),                                                                                 // 181
    template: Match.Optional(String),                                                                                // 182
};                                                                                                                   // 183
                                                                                                                     // 184
// Route configuration pattern to be checked with check                                                              // 185
var ROUTE_PAT = {                                                                                                    // 186
    name: Match.Optional(String),                                                                                    // 187
    path: Match.Optional(String),                                                                                    // 188
    template: Match.Optional(String),                                                                                // 189
    layoutTemplate: Match.Optional(String),                                                                          // 190
    redirect: Match.Optional(Match.OneOf(String, Match.Where(_.isFunction))),                                        // 191
};                                                                                                                   // 192
                                                                                                                     // 193
                                                                                                                     // 194
// -----------------------------------------------------------------------------                                     // 195
                                                                                                                     // 196
// AccountsTemplates object                                                                                          // 197
                                                                                                                     // 198
// -----------------------------------------------------------------------------                                     // 199
                                                                                                                     // 200
                                                                                                                     // 201
                                                                                                                     // 202
// -------------------                                                                                               // 203
// Client/Server stuff                                                                                               // 204
// -------------------                                                                                               // 205
                                                                                                                     // 206
// Constructor                                                                                                       // 207
AT = function() {                                                                                                    // 208
                                                                                                                     // 209
};                                                                                                                   // 210
                                                                                                                     // 211
                                                                                                                     // 212
                                                                                                                     // 213
                                                                                                                     // 214
/*                                                                                                                   // 215
    Each field object is represented by the following properties:                                                    // 216
        _id:         String   (required)  // A unique field"s id / name                                              // 217
        type:        String   (required)  // Displayed input type                                                    // 218
        required:    Boolean  (optional)  // Specifies Whether to fail or not when field is left empty               // 219
        displayName: String   (optional)  // The field"s name to be displayed as a label above the input element     // 220
        placeholder: String   (optional)  // The placeholder text to be displayed inside the input element           // 221
        minLength:   Integer  (optional)  // Possibly specifies the minimum allowed length                           // 222
        maxLength:   Integer  (optional)  // Possibly specifies the maximum allowed length                           // 223
        re:          RegExp   (optional)  // Regular expression for validation                                       // 224
        func:        Function (optional)  // Custom function for validation                                          // 225
        errStr:      String   (optional)  // Error message to be displayed in case re validation fails               // 226
*/                                                                                                                   // 227
                                                                                                                     // 228
                                                                                                                     // 229
                                                                                                                     // 230
/*                                                                                                                   // 231
    Routes configuration can be done by calling AccountsTemplates.configureRoute with the route name and the         // 232
    following options in a separate object. E.g. AccountsTemplates.configureRoute("gingIn", option);                 // 233
        name:           String (optional). A unique route"s name to be passed to iron-router                         // 234
        path:           String (optional). A unique route"s path to be passed to iron-router                         // 235
        template:       String (optional). The name of the template to be rendered                                   // 236
        layoutTemplate: String (optional). The name of the layout to be used                                         // 237
        redirect:       String (optional). The name of the route (or its path) where to redirect after form submit   // 238
*/                                                                                                                   // 239
                                                                                                                     // 240
                                                                                                                     // 241
// Allowed routes along with theirs default configuration values                                                     // 242
AT.prototype.ROUTE_DEFAULT = {                                                                                       // 243
    changePwd:      { name: "atChangePwd",      path: "/change-password"},                                           // 244
    enrollAccount:  { name: "atEnrollAccount",  path: "/enroll-account"},                                            // 245
    ensureSignedIn: { name: "atEnsureSignedIn", path: null},                                                         // 246
    forgotPwd:      { name: "atForgotPwd",      path: "/forgot-password"},                                           // 247
    resetPwd:       { name: "atResetPwd",       path: "/reset-password"},                                            // 248
    signIn:         { name: "atSignIn",         path: "/sign-in"},                                                   // 249
    signUp:         { name: "atSignUp",         path: "/sign-up"},                                                   // 250
    verifyEmail:    { name: "atVerifyEmail",    path: "/verify-email"},                                              // 251
    resendVerificationEmail: { name: "atResendVerificationEmail", path: "/send-again"},                              // 252
};                                                                                                                   // 253
                                                                                                                     // 254
                                                                                                                     // 255
                                                                                                                     // 256
// Allowed input types                                                                                               // 257
AT.prototype.INPUT_TYPES = [                                                                                         // 258
    "checkbox",                                                                                                      // 259
    "email",                                                                                                         // 260
    "hidden",                                                                                                        // 261
    "password",                                                                                                      // 262
    "radio",                                                                                                         // 263
    "select",                                                                                                        // 264
    "tel",                                                                                                           // 265
    "text",                                                                                                          // 266
    "url",                                                                                                           // 267
];                                                                                                                   // 268
                                                                                                                     // 269
// Current configuration values                                                                                      // 270
AT.prototype.options = {                                                                                             // 271
    // Appearance                                                                                                    // 272
    //defaultLayout: undefined,                                                                                      // 273
    showAddRemoveServices: false,                                                                                    // 274
    showForgotPasswordLink: false,                                                                                   // 275
    showResendVerificationEmailLink: false,                                                                          // 276
    showLabels: true,                                                                                                // 277
    showPlaceholders: true,                                                                                          // 278
                                                                                                                     // 279
    // Behaviour                                                                                                     // 280
    confirmPassword: true,                                                                                           // 281
    defaultState: "signIn",                                                                                          // 282
    enablePasswordChange: false,                                                                                     // 283
    forbidClientAccountCreation: false,                                                                              // 284
    lowercaseUsername: false,                                                                                        // 285
    overrideLoginErrors: true,                                                                                       // 286
    sendVerificationEmail: false,                                                                                    // 287
    socialLoginStyle: "popup",                                                                                       // 288
                                                                                                                     // 289
    // Client-side Validation                                                                                        // 290
    //continuousValidation: false,                                                                                   // 291
    //negativeFeedback: false,                                                                                       // 292
    //negativeValidation: false,                                                                                     // 293
    //positiveValidation: false,                                                                                     // 294
    //positiveFeedback: false,                                                                                       // 295
    //showValidating: false,                                                                                         // 296
                                                                                                                     // 297
    // Privacy Policy and Terms of Use                                                                               // 298
    privacyUrl: undefined,                                                                                           // 299
    termsUrl: undefined,                                                                                             // 300
                                                                                                                     // 301
    // Redirects                                                                                                     // 302
    homeRoutePath: "/",                                                                                              // 303
    redirectTimeout: 2000, // 2 seconds                                                                              // 304
                                                                                                                     // 305
    // Hooks                                                                                                         // 306
    onSubmitHook: undefined,                                                                                         // 307
};                                                                                                                   // 308
                                                                                                                     // 309
AT.prototype.texts = {                                                                                               // 310
    button: {                                                                                                        // 311
        changePwd: "updateYourPassword",                                                                             // 312
        //enrollAccount: "createAccount",                                                                            // 313
        enrollAccount: "signUp",                                                                                     // 314
        forgotPwd: "emailResetLink",                                                                                 // 315
        resetPwd: "setPassword",                                                                                     // 316
        signIn: "signIn",                                                                                            // 317
        signUp: "signUp",                                                                                            // 318
        resendVerificationEmail: "Send email again",                                                                 // 319
    },                                                                                                               // 320
    errors: {                                                                                                        // 321
        accountsCreationDisabled: "Client side accounts creation is disabled!!!",                                    // 322
        cannotRemoveService: "Cannot remove the only active service!",                                               // 323
        captchaVerification: "Captcha verification failed!",                                                         // 324
        loginForbidden: "error.accounts.Login forbidden",                                                            // 325
        mustBeLoggedIn: "error.accounts.Must be logged in",                                                          // 326
        pwdMismatch: "error.pwdsDontMatch",                                                                          // 327
        validationErrors: "Validation Errors",                                                                       // 328
        verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",                    // 329
    },                                                                                                               // 330
    navSignIn: 'signIn',                                                                                             // 331
    navSignOut: 'signOut',                                                                                           // 332
    info: {                                                                                                          // 333
        emailSent: "info.emailSent",                                                                                 // 334
        emailVerified: "info.emailVerified",                                                                         // 335
        pwdChanged: "info.passwordChanged",                                                                          // 336
        pwdReset: "info.passwordReset",                                                                              // 337
        pwdSet: "Password Set",                                                                                      // 338
        signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",          // 339
        verificationEmailSent: "A new email has been sent to you. If the email doesn't show up in your inbox, be sure to check your spam folder.",
    },                                                                                                               // 341
    inputIcons: {                                                                                                    // 342
        isValidating: "fa fa-spinner fa-spin",                                                                       // 343
        hasSuccess: "fa fa-check",                                                                                   // 344
        hasError: "fa fa-times",                                                                                     // 345
    },                                                                                                               // 346
    optionalField: "optional",                                                                                       // 347
    pwdLink_pre: "",                                                                                                 // 348
    pwdLink_link: "forgotPassword",                                                                                  // 349
    pwdLink_suff: "",                                                                                                // 350
    resendVerificationEmailLink_pre: "Verification email lost?",                                                     // 351
    resendVerificationEmailLink_link: "Send again",                                                                  // 352
    resendVerificationEmailLink_suff: "",                                                                            // 353
    sep: "OR",                                                                                                       // 354
    signInLink_pre: "ifYouAlreadyHaveAnAccount",                                                                     // 355
    signInLink_link: "signin",                                                                                       // 356
    signInLink_suff: "",                                                                                             // 357
    signUpLink_pre: "dontHaveAnAccount",                                                                             // 358
    signUpLink_link: "signUp",                                                                                       // 359
    signUpLink_suff: "",                                                                                             // 360
    socialAdd: "add",                                                                                                // 361
    socialConfigure: "configure",                                                                                    // 362
    socialIcons: {                                                                                                   // 363
        "meteor-developer": "fa fa-rocket"                                                                           // 364
    },                                                                                                               // 365
    socialRemove: "remove",                                                                                          // 366
    socialSignIn: "signIn",                                                                                          // 367
    socialSignUp: "signUp",                                                                                          // 368
    socialWith: "with",                                                                                              // 369
    termsPreamble: "clickAgree",                                                                                     // 370
    termsPrivacy: "privacyPolicy",                                                                                   // 371
    termsAnd: "and",                                                                                                 // 372
    termsTerms: "terms",                                                                                             // 373
    title: {                                                                                                         // 374
        changePwd: "changePassword",                                                                                 // 375
        enrollAccount: "createAccount",                                                                              // 376
        forgotPwd: "resetYourPassword",                                                                              // 377
        resetPwd: "resetYourPassword",                                                                               // 378
        signIn: "signIn",                                                                                            // 379
        signUp: "createAccount",                                                                                     // 380
        verifyEmail: "",                                                                                             // 381
        resendVerificationEmail: "Send the verification email again",                                                // 382
    },                                                                                                               // 383
};                                                                                                                   // 384
                                                                                                                     // 385
AT.prototype.SPECIAL_FIELDS = [                                                                                      // 386
    "password_again",                                                                                                // 387
    "username_and_email",                                                                                            // 388
];                                                                                                                   // 389
                                                                                                                     // 390
// SignIn / SignUp fields                                                                                            // 391
AT.prototype._fields = [                                                                                             // 392
    new Field({                                                                                                      // 393
        _id: "email",                                                                                                // 394
        type: "email",                                                                                               // 395
        required: true,                                                                                              // 396
        lowercase: true,                                                                                             // 397
        trim: true,                                                                                                  // 398
        func: function(email){                                                                                       // 399
            return !_.contains(email, '@');                                                                          // 400
        },                                                                                                           // 401
        errStr: 'Invalid email',                                                                                     // 402
    }),                                                                                                              // 403
    new Field({                                                                                                      // 404
        _id: "password",                                                                                             // 405
        type: "password",                                                                                            // 406
        required: true,                                                                                              // 407
        minLength: 6,                                                                                                // 408
        displayName: {                                                                                               // 409
            "default": "password",                                                                                   // 410
            changePwd: "newPassword",                                                                                // 411
            resetPwd: "newPassword",                                                                                 // 412
        },                                                                                                           // 413
        placeholder: {                                                                                               // 414
            "default": "password",                                                                                   // 415
            changePwd: "newPassword",                                                                                // 416
            resetPwd: "newPassword",                                                                                 // 417
        },                                                                                                           // 418
    }),                                                                                                              // 419
];                                                                                                                   // 420
                                                                                                                     // 421
// Configured routes                                                                                                 // 422
AT.prototype.routes = {};                                                                                            // 423
                                                                                                                     // 424
AT.prototype._initialized = false;                                                                                   // 425
                                                                                                                     // 426
// Input type validation                                                                                             // 427
AT.prototype._isValidInputType = function(value) {                                                                   // 428
    return _.indexOf(this.INPUT_TYPES, value) !== -1;                                                                // 429
};                                                                                                                   // 430
                                                                                                                     // 431
AT.prototype.addField = function(field) {                                                                            // 432
    // Fields can be added only before initialization                                                                // 433
    if (this._initialized)                                                                                           // 434
        throw new Error("AccountsTemplates.addField should strictly be called before AccountsTemplates.init!");      // 435
    field = _.pick(field, _.keys(FIELD_PAT));                                                                        // 436
    check(field, FIELD_PAT);                                                                                         // 437
    // Checks there"s currently no field called field._id                                                            // 438
    if (_.indexOf(_.pluck(this._fields, "_id"), field._id) !== -1)                                                   // 439
        throw new Error("A field called " + field._id + " already exists!");                                         // 440
    // Validates field.type                                                                                          // 441
    if (!this._isValidInputType(field.type))                                                                         // 442
        throw new Error("field.type is not valid!");                                                                 // 443
    // Checks field.minLength is strictly positive                                                                   // 444
    if (typeof field.minLength !== "undefined" && field.minLength <= 0)                                              // 445
        throw new Error("field.minLength should be greater than zero!");                                             // 446
    // Checks field.maxLength is strictly positive                                                                   // 447
    if (typeof field.maxLength !== "undefined" && field.maxLength <= 0)                                              // 448
        throw new Error("field.maxLength should be greater than zero!");                                             // 449
    // Checks field.maxLength is greater than field.minLength                                                        // 450
    if (typeof field.minLength !== "undefined" && typeof field.minLength !== "undefined" && field.maxLength < field.minLength)
        throw new Error("field.maxLength should be greater than field.maxLength!");                                  // 452
                                                                                                                     // 453
    if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, field._id)))                                            // 454
        this._fields.push(new Field(field));                                                                         // 455
    return this._fields;                                                                                             // 456
};                                                                                                                   // 457
                                                                                                                     // 458
AT.prototype.addFields = function(fields) {                                                                          // 459
    var ok;                                                                                                          // 460
    try { // don"t bother with `typeof` - just access `length` and `catch`                                           // 461
        ok = fields.length > 0 && "0" in Object(fields);                                                             // 462
    } catch (e) {                                                                                                    // 463
        throw new Error("field argument should be an array of valid field objects!");                                // 464
    }                                                                                                                // 465
    if (ok) {                                                                                                        // 466
        _.map(fields, function(field){                                                                               // 467
            this.addField(field);                                                                                    // 468
        }, this);                                                                                                    // 469
    } else                                                                                                           // 470
        throw new Error("field argument should be an array of valid field objects!");                                // 471
    return this._fields;                                                                                             // 472
};                                                                                                                   // 473
                                                                                                                     // 474
AT.prototype.configure = function(config) {                                                                          // 475
    // Configuration options can be set only before initialization                                                   // 476
    if (this._initialized)                                                                                           // 477
        throw new Error("Configuration options must be set before AccountsTemplates.init!");                         // 478
                                                                                                                     // 479
    // Updates the current configuration                                                                             // 480
    check(config, CONFIG_PAT);                                                                                       // 481
    var options = _.omit(config, "texts", "reCaptcha");                                                              // 482
    this.options = _.defaults(options, this.options);                                                                // 483
                                                                                                                     // 484
    // Possibly sets up reCaptcha options                                                                            // 485
    var reCaptcha = config.reCaptcha;                                                                                // 486
    if (reCaptcha) {                                                                                                 // 487
        // Updates the current button object                                                                         // 488
        this.options.reCaptcha = _.defaults(reCaptcha, this.options.reCaptcha || {});                                // 489
    }                                                                                                                // 490
                                                                                                                     // 491
    // Possibly sets up texts...                                                                                     // 492
    if (config.texts){                                                                                               // 493
        var texts = config.texts;                                                                                    // 494
        var simpleTexts = _.omit(texts, "button", "errors", "info", "inputIcons", "socialIcons", "title");           // 495
        this.texts = _.defaults(simpleTexts, this.texts);                                                            // 496
                                                                                                                     // 497
        if (texts.button) {                                                                                          // 498
            // Updates the current button object                                                                     // 499
            this.texts.button = _.defaults(texts.button, this.texts.button);                                         // 500
        }                                                                                                            // 501
        if (texts.errors) {                                                                                          // 502
            // Updates the current errors object                                                                     // 503
            this.texts.errors = _.defaults(texts.errors, this.texts.errors);                                         // 504
        }                                                                                                            // 505
        if (texts.info) {                                                                                            // 506
            // Updates the current info object                                                                       // 507
            this.texts.info = _.defaults(texts.info, this.texts.info);                                               // 508
        }                                                                                                            // 509
        if (texts.inputIcons) {                                                                                      // 510
            // Updates the current inputIcons object                                                                 // 511
            this.texts.inputIcons = _.defaults(texts.inputIcons, this.texts.inputIcons);                             // 512
        }                                                                                                            // 513
        if (texts.socialIcons) {                                                                                     // 514
            // Updates the current socialIcons object                                                                // 515
            this.texts.socialIcons = _.defaults(texts.socialIcons, this.texts.socialIcons);                          // 516
        }                                                                                                            // 517
        if (texts.title) {                                                                                           // 518
            // Updates the current title object                                                                      // 519
            this.texts.title = _.defaults(texts.title, this.texts.title);                                            // 520
        }                                                                                                            // 521
    }                                                                                                                // 522
};                                                                                                                   // 523
                                                                                                                     // 524
AT.prototype.configureRoute = function(route, options) {                                                             // 525
    check(route, String);                                                                                            // 526
    check(options, Match.OneOf(undefined, ROUTE_PAT));                                                               // 527
    options = _.clone(options);                                                                                      // 528
    // Route Configuration can be done only before initialization                                                    // 529
    if (this._initialized)                                                                                           // 530
        throw new Error("Route Configuration can be done only before AccountsTemplates.init!");                      // 531
    // Only allowed routes can be configured                                                                         // 532
    if (!(route in this.ROUTE_DEFAULT))                                                                              // 533
        throw new Error("Unknown Route!");                                                                           // 534
                                                                                                                     // 535
    // Possibly adds a initial / to the provided path                                                                // 536
    if (options && options.path && options.path[0] !== "/")                                                          // 537
        options.path = "/" + options.path;                                                                           // 538
    // Updates the current configuration                                                                             // 539
    options = _.defaults(options || {}, this.ROUTE_DEFAULT[route]);                                                  // 540
    this.routes[route] = options;                                                                                    // 541
};                                                                                                                   // 542
                                                                                                                     // 543
AT.prototype.hasField = function(fieldId) {                                                                          // 544
    return !!this.getField(fieldId);                                                                                 // 545
};                                                                                                                   // 546
                                                                                                                     // 547
AT.prototype.getField = function(fieldId) {                                                                          // 548
    var field = _.filter(this._fields, function(field){                                                              // 549
        return field._id == fieldId;                                                                                 // 550
    });                                                                                                              // 551
    return (field.length === 1) ? field[0] : undefined;                                                              // 552
};                                                                                                                   // 553
                                                                                                                     // 554
AT.prototype.getFields = function() {                                                                                // 555
    return this._fields;                                                                                             // 556
};                                                                                                                   // 557
                                                                                                                     // 558
AT.prototype.getFieldIds = function() {                                                                              // 559
    return _.pluck(this._fields, "_id");                                                                             // 560
};                                                                                                                   // 561
                                                                                                                     // 562
AT.prototype.getRouteName = function(route) {                                                                        // 563
    if (route in this.routes)                                                                                        // 564
        return this.routes[route].name;                                                                              // 565
    return null;                                                                                                     // 566
};                                                                                                                   // 567
                                                                                                                     // 568
AT.prototype.getRoutePath = function(route) {                                                                        // 569
    if (route in this.routes)                                                                                        // 570
        return this.routes[route].path;                                                                              // 571
    return "#";                                                                                                      // 572
};                                                                                                                   // 573
                                                                                                                     // 574
AT.prototype.oauthServices = function(){                                                                             // 575
    // Extracts names of available services                                                                          // 576
    var names;                                                                                                       // 577
    if (Meteor.isServer)                                                                                             // 578
        names = (Accounts.oauth && Accounts.oauth.serviceNames()) || [];                                             // 579
    else                                                                                                             // 580
        names = (Accounts.oauth && Accounts.loginServicesConfigured() && Accounts.oauth.serviceNames()) || [];       // 581
    // Extracts names of configured services                                                                         // 582
    var configuredServices = [];                                                                                     // 583
    if (Accounts.loginServiceConfiguration)                                                                          // 584
        configuredServices = _.pluck(Accounts.loginServiceConfiguration.find().fetch(), "service");                  // 585
                                                                                                                     // 586
    // Builds a list of objects containing service name as _id and its configuration status                          // 587
    var services = _.map(names, function(name){                                                                      // 588
        return {                                                                                                     // 589
            _id : name,                                                                                              // 590
            configured: _.contains(configuredServices, name),                                                        // 591
        };                                                                                                           // 592
    });                                                                                                              // 593
                                                                                                                     // 594
    // Checks whether there is a UI to configure services...                                                         // 595
    // XXX: this only works with the accounts-ui package                                                             // 596
    var showUnconfigured = typeof Accounts._loginButtonsSession !== "undefined";                                     // 597
                                                                                                                     // 598
    // Filters out unconfigured services in case they"re not to be displayed                                         // 599
    if (!showUnconfigured){                                                                                          // 600
        services = _.filter(services, function(service){                                                             // 601
            return service.configured;                                                                               // 602
        });                                                                                                          // 603
    }                                                                                                                // 604
                                                                                                                     // 605
    // Sorts services by name                                                                                        // 606
    services = _.sortBy(services, function(service){                                                                 // 607
        return service._id;                                                                                          // 608
    });                                                                                                              // 609
                                                                                                                     // 610
    return services;                                                                                                 // 611
};                                                                                                                   // 612
                                                                                                                     // 613
AT.prototype.removeField = function(fieldId) {                                                                       // 614
    // Fields can be removed only before initialization                                                              // 615
    if (this._initialized)                                                                                           // 616
        throw new Error("AccountsTemplates.removeField should strictly be called before AccountsTemplates.init!");   // 617
    // Tries to look up the field with given _id                                                                     // 618
    var index = _.indexOf(_.pluck(this._fields, "_id"), fieldId);                                                    // 619
    if (index !== -1)                                                                                                // 620
        return this._fields.splice(index, 1)[0];                                                                     // 621
    else                                                                                                             // 622
        if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, fieldId)))                                          // 623
            throw new Error("A field called " + fieldId + " does not exist!");                                       // 624
};                                                                                                                   // 625
                                                                                                                     // 626
AT.prototype.setupRoutes = function() {                                                                              // 627
    if (Meteor.isServer){                                                                                            // 628
        // Possibly prints a warning in case showForgotPasswordLink is set to true but the route is not configured   // 629
        if (AccountsTemplates.options.showForgotPasswordLink && !("forgotPwd" in  AccountsTemplates.routes))         // 630
            console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but forgotPwd route is not configured!");
        // Configures "reset password" email link                                                                    // 632
        if ("resetPwd" in AccountsTemplates.routes){                                                                 // 633
            var resetPwdPath = AccountsTemplates.routes["resetPwd"].path.substr(1);                                  // 634
            Accounts.urls.resetPassword = function(token){                                                           // 635
                return Meteor.absoluteUrl(resetPwdPath + "/" + token);                                               // 636
            };                                                                                                       // 637
        }                                                                                                            // 638
        // Configures "enroll account" email link                                                                    // 639
        if ("enrollAccount" in AccountsTemplates.routes){                                                            // 640
            var enrollAccountPath = AccountsTemplates.routes["enrollAccount"].path.substr(1);                        // 641
            Accounts.urls.enrollAccount = function(token){                                                           // 642
                return Meteor.absoluteUrl(enrollAccountPath + "/" + token);                                          // 643
            };                                                                                                       // 644
        }                                                                                                            // 645
        // Configures "verify email" email link                                                                      // 646
        if ("verifyEmail" in AccountsTemplates.routes){                                                              // 647
            var verifyEmailPath = AccountsTemplates.routes["verifyEmail"].path.substr(1);                            // 648
            Accounts.urls.verifyEmail = function(token){                                                             // 649
                return Meteor.absoluteUrl(verifyEmailPath + "/" + token);                                            // 650
            };                                                                                                       // 651
        }                                                                                                            // 652
    }                                                                                                                // 653
                                                                                                                     // 654
    // Determines the default layout to be used in case no specific one is specified for single routes               // 655
    var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                    // 656
                                                                                                                     // 657
    _.each(AccountsTemplates.routes, function(options, route){                                                       // 658
        if (route === "ensureSignedIn")                                                                              // 659
            return;                                                                                                  // 660
        if (route === "changePwd" && !AccountsTemplates.options.enablePasswordChange)                                // 661
            throw new Error("changePwd route configured but enablePasswordChange set to false!");                    // 662
        if (route === "forgotPwd" && !AccountsTemplates.options.showForgotPasswordLink)                              // 663
            throw new Error("forgotPwd route configured but showForgotPasswordLink set to false!");                  // 664
        if (route === "signUp" && AccountsTemplates.options.forbidClientAccountCreation)                             // 665
            throw new Error("signUp route configured but forbidClientAccountCreation set to true!");                 // 666
        // Possibly prints a warning in case the MAIL_URL environment variable was not set                           // 667
        //if (Meteor.isServer && route === "forgotPwd" && (!process.env.MAIL_URL || ! Package["email"])){            // 668
        //    console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but MAIL_URL is not configured!");
        //}                                                                                                          // 670
                                                                                                                     // 671
        var name = options.name; // Default provided...                                                              // 672
        var path = options.path; // Default provided...                                                              // 673
        var template = options.template || "fullPageAtForm";                                                         // 674
        var layoutTemplate = options.layoutTemplate || defaultLayout;                                                // 675
                                                                                                                     // 676
        // Possibly adds token parameter                                                                             // 677
        if (_.contains(["enrollAccount", "resetPwd", "verifyEmail"], route)){                                        // 678
            path += "/:paramToken";                                                                                  // 679
            if (route === "verifyEmail")                                                                             // 680
                Router.route(path, {                                                                                 // 681
                    name: name,                                                                                      // 682
                    template: template,                                                                              // 683
                    layoutTemplate: layoutTemplate,                                                                  // 684
                    onRun: function() {                                                                              // 685
                        AccountsTemplates.setState(route);                                                           // 686
                        AccountsTemplates.setDisabled(true);                                                         // 687
                        var token = this.params.paramToken;                                                          // 688
                        Accounts.verifyEmail(token, function(error){                                                 // 689
                            AccountsTemplates.setDisabled(false);                                                    // 690
                            AccountsTemplates.submitCallback(error, route, function(){                               // 691
                                AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailVerified);
                            });                                                                                      // 693
                        });                                                                                          // 694
                                                                                                                     // 695
                        this.next();                                                                                 // 696
                    },                                                                                               // 697
                    onStop: function() {                                                                             // 698
                        AccountsTemplates.clearState();                                                              // 699
                    },                                                                                               // 700
                });                                                                                                  // 701
            else                                                                                                     // 702
                Router.route(path, {                                                                                 // 703
                    name: name,                                                                                      // 704
                    template: template,                                                                              // 705
                    layoutTemplate: layoutTemplate,                                                                  // 706
                    onRun: function() {                                                                              // 707
                        AccountsTemplates.paramToken = this.params.paramToken;                                       // 708
                        this.next();                                                                                 // 709
                    },                                                                                               // 710
                    onBeforeAction: function() {                                                                     // 711
                        AccountsTemplates.setState(route);                                                           // 712
                        this.next();                                                                                 // 713
                    },                                                                                               // 714
                    onStop: function() {                                                                             // 715
                        AccountsTemplates.clearState();                                                              // 716
                        AccountsTemplates.paramToken = null;                                                         // 717
                    }                                                                                                // 718
                });                                                                                                  // 719
        }                                                                                                            // 720
        else                                                                                                         // 721
            Router.route(path, {                                                                                     // 722
                name: name,                                                                                          // 723
                template: template,                                                                                  // 724
                layoutTemplate: layoutTemplate,                                                                      // 725
                onBeforeAction: function() {                                                                         // 726
                    var redirect = false;                                                                            // 727
                    if (route === 'changePwd') {                                                                     // 728
                      if (!Meteor.loggingIn() && !Meteor.userId()) {                                                 // 729
                        redirect = true;                                                                             // 730
                      }                                                                                              // 731
                    }                                                                                                // 732
                    else if (Meteor.userId()) {                                                                      // 733
                        redirect = true;                                                                             // 734
                    }                                                                                                // 735
                    if (redirect) {                                                                                  // 736
                        AccountsTemplates.postSubmitRedirect(route);                                                 // 737
                        this.stop();                                                                                 // 738
                    }                                                                                                // 739
                    else {                                                                                           // 740
                        AccountsTemplates.setState(route);                                                           // 741
                        this.next();                                                                                 // 742
                    }                                                                                                // 743
                },                                                                                                   // 744
                onStop: function() {                                                                                 // 745
                    AccountsTemplates.clearState();                                                                  // 746
                }                                                                                                    // 747
            });                                                                                                      // 748
    });                                                                                                              // 749
};                                                                                                                   // 750
                                                                                                                     // 751
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
    "resendVerificationEmail", // Resend verification email                                                          // 11
];                                                                                                                   // 12
                                                                                                                     // 13
AT.prototype._loginType = "";                                                                                        // 14
                                                                                                                     // 15
// Previous path used for redirect after form submit                                                                 // 16
AT.prototype._prevPath = null;                                                                                       // 17
                                                                                                                     // 18
// Flag telling whether the whole form should appear disabled                                                        // 19
AT.prototype._disabled = false;                                                                                      // 20
                                                                                                                     // 21
// Flag used to avoid redirecting to previous route when signing in/up                                               // 22
// as a results of a call to ensureSignedIn                                                                          // 23
AT.prototype.avoidRedirect = false;                                                                                  // 24
                                                                                                                     // 25
// Possibly keeps reference to the handle for the timed out redirect set on some routes                              // 26
AT.prototype.timedOutRedirect = null;                                                                                // 27
                                                                                                                     // 28
// Known routes used to filter out previous path for redirects...                                                    // 29
AT.prototype.knownRoutes = [];                                                                                       // 30
                                                                                                                     // 31
// Token provided for routes like reset-password and enroll-account                                                  // 32
AT.prototype.paramToken = null;                                                                                      // 33
                                                                                                                     // 34
// Current Internal (client-side) State (to be among allowed ones, see STATES)                                       // 35
//AT.prototype.state = "signIn";                                                                                     // 36
                                                                                                                     // 37
// State validation                                                                                                  // 38
AT.prototype._isValidState = function(value) {                                                                       // 39
    return _.contains(this.STATES, value);                                                                           // 40
};                                                                                                                   // 41
                                                                                                                     // 42
AT.prototype.loginType = function () {                                                                               // 43
    return this._loginType;                                                                                          // 44
};                                                                                                                   // 45
                                                                                                                     // 46
// Getter for previous route"s path                                                                                  // 47
AT.prototype.getPrevPath = function() {                                                                              // 48
    return this._prevPath;                                                                                           // 49
};                                                                                                                   // 50
                                                                                                                     // 51
// Setter for previous route"s path                                                                                  // 52
AT.prototype.setPrevPath = function(newPath) {                                                                       // 53
    check(newPath, String);                                                                                          // 54
    this._prevPath = newPath;                                                                                        // 55
};                                                                                                                   // 56
                                                                                                                     // 57
// Getter for current state                                                                                          // 58
AT.prototype.getState = function() {                                                                                 // 59
    return this.state.form.get("state");                                                                             // 60
};                                                                                                                   // 61
                                                                                                                     // 62
// Getter for disabled state                                                                                         // 63
AT.prototype.disabled = function() {                                                                                 // 64
    return this.state.form.equals("disabled", true) ? "disabled" : undefined;                                        // 65
};                                                                                                                   // 66
                                                                                                                     // 67
// Setter for disabled state                                                                                         // 68
AT.prototype.setDisabled = function(value) {                                                                         // 69
    check(value, Boolean);                                                                                           // 70
    return this.state.form.set("disabled", value);                                                                   // 71
};                                                                                                                   // 72
                                                                                                                     // 73
// Setter for current state                                                                                          // 74
AT.prototype.setState = function(state, callback) {                                                                  // 75
    check(state, String);                                                                                            // 76
    if (!this._isValidState(state))                                                                                  // 77
        throw new Meteor.Error(500, "Internal server error", "accounts-templates-core package got an invalid state value!");
    this.state.form.set("state", state);                                                                             // 79
    this.clearState();                                                                                               // 80
    if (_.isFunction(callback))                                                                                      // 81
        callback();                                                                                                  // 82
};                                                                                                                   // 83
                                                                                                                     // 84
AT.prototype.clearState = function() {                                                                               // 85
    _.each(this._fields, function(field){                                                                            // 86
        field.clearStatus();                                                                                         // 87
    });                                                                                                              // 88
    var form = this.state.form;                                                                                      // 89
    form.set("error", null);                                                                                         // 90
    form.set("result", null);                                                                                        // 91
    form.set("message", null);                                                                                       // 92
                                                                                                                     // 93
    AccountsTemplates.setDisabled(false);                                                                            // 94
                                                                                                                     // 95
    // Possibly clears timed out redirects                                                                           // 96
    if (AccountsTemplates.timedOutRedirect !== null) {                                                               // 97
        Meteor.clearTimeout(AccountsTemplates.timedOutRedirect);                                                     // 98
        AccountsTemplates.timedOutRedirect = null;                                                                   // 99
    }                                                                                                                // 100
};                                                                                                                   // 101
                                                                                                                     // 102
AT.prototype.clearError = function() {                                                                               // 103
    form.set("error", null);                                                                                         // 104
};                                                                                                                   // 105
                                                                                                                     // 106
AT.prototype.clearResult = function() {                                                                              // 107
    form.set("result", null);                                                                                        // 108
};                                                                                                                   // 109
                                                                                                                     // 110
AT.prototype.clearMessage = function() {                                                                             // 111
    form.set("message", null);                                                                                       // 112
};                                                                                                                   // 113
                                                                                                                     // 114
var ensureSignedIn = function() {                                                                                    // 115
  if (!Meteor.userId()) {                                                                                            // 116
      Tracker.nonreactive(function () {                                                                              // 117
        AccountsTemplates.setPrevPath(Router.current().url);                                                         // 118
      });                                                                                                            // 119
      AccountsTemplates.setState(AccountsTemplates.options.defaultState, function(){                                 // 120
          var err = AccountsTemplates.texts.errors.mustBeLoggedIn;                                                   // 121
          AccountsTemplates.state.form.set("error", [err]);                                                          // 122
      });                                                                                                            // 123
      AccountsTemplates.avoidRedirect = true;                                                                        // 124
      // render the login template but keep the url in the browser the same                                          // 125
                                                                                                                     // 126
      var options = AccountsTemplates.routes["ensureSignedIn"];                                                      // 127
                                                                                                                     // 128
      // Determines the template to be rendered in case no specific one was configured for ensureSignedIn            // 129
      var signInRouteTemplate = AccountsTemplates.routes.signIn && AccountsTemplates.routes.signIn.template;         // 130
      var template = (options && options.template) || signInRouteTemplate || "fullPageAtForm";                       // 131
                                                                                                                     // 132
      // Determines the layout to be used in case no specific one was configured for ensureSignedIn                  // 133
      var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                  // 134
      var layoutTemplate = (options && options.layoutTemplate) || defaultLayout;                                     // 135
                                                                                                                     // 136
      this.layout(layoutTemplate);                                                                                   // 137
      this.render(template);                                                                                         // 138
      this.renderRegions();                                                                                          // 139
  } else {                                                                                                           // 140
      AccountsTemplates.clearError();                                                                                // 141
      this.next();                                                                                                   // 142
  }                                                                                                                  // 143
};                                                                                                                   // 144
                                                                                                                     // 145
AT.prototype.ensureSignedIn = function() {                                                                           // 146
  console.warn(                                                                                                      // 147
    "[UserAccounts] AccountsTemplates.ensureSignedIn will be deprecated soon, please use the plugin version\n" +     // 148
    "               see https://github.com/meteor-useraccounts/core/blob/master/Guide.md#content-protection"         // 149
  );                                                                                                                 // 150
  ensureSignedIn.call(this);                                                                                         // 151
};                                                                                                                   // 152
                                                                                                                     // 153
                                                                                                                     // 154
Iron.Router.plugins.ensureSignedIn = function (router, options) {                                                    // 155
  // this loading plugin just creates an onBeforeAction hook                                                         // 156
  router.onRun(function(){                                                                                           // 157
    if (Meteor.loggingIn()) {                                                                                        // 158
        this.renderRegions();                                                                                        // 159
    } else {                                                                                                         // 160
        this.next();                                                                                                 // 161
    }                                                                                                                // 162
  }, options);                                                                                                       // 163
                                                                                                                     // 164
  router.onBeforeAction(                                                                                             // 165
    ensureSignedIn,                                                                                                  // 166
    options                                                                                                          // 167
  );                                                                                                                 // 168
};                                                                                                                   // 169
                                                                                                                     // 170
                                                                                                                     // 171
// Initialization                                                                                                    // 172
AT.prototype.init = function() {                                                                                     // 173
    console.warn("[AccountsTemplates] There is no more need to call AccountsTemplates.init()! Simply remove the call ;-)");
};                                                                                                                   // 175
                                                                                                                     // 176
AT.prototype._init = function() {                                                                                    // 177
    if (this._initialized)                                                                                           // 178
        return;                                                                                                      // 179
                                                                                                                     // 180
    var usernamePresent = this.hasField("username");                                                                 // 181
    var emailPresent = this.hasField("email");                                                                       // 182
    if (usernamePresent && emailPresent){                                                                            // 183
        this._loginType = "username_and_email";                                                                      // 184
    }                                                                                                                // 185
    else{                                                                                                            // 186
        if (usernamePresent)                                                                                         // 187
            this._loginType = "username";                                                                            // 188
        else                                                                                                         // 189
            this._loginType = "email";                                                                               // 190
    }                                                                                                                // 191
                                                                                                                     // 192
    if (this._loginType === "username_and_email"){                                                                   // 193
        // Possibly adds the field username_and_email in case                                                        // 194
        // it was not configured                                                                                     // 195
        if (!this.hasField("username_and_email"))                                                                    // 196
            this.addField({                                                                                          // 197
                _id: "username_and_email",                                                                           // 198
                type: "text",                                                                                        // 199
                displayName: "usernameOrEmail",                                                                      // 200
                placeholder: "usernameOrEmail",                                                                      // 201
                required: true,                                                                                      // 202
            });                                                                                                      // 203
    }                                                                                                                // 204
                                                                                                                     // 205
    // Only in case password confirmation is required                                                                // 206
    if (this.options.confirmPassword){                                                                               // 207
        // Possibly adds the field password_again in case                                                            // 208
        // it was not configured                                                                                     // 209
        if (!this.hasField("password_again")){                                                                       // 210
            var pwdAgain = _.clone(this.getField("password"));                                                       // 211
            pwdAgain._id = "password_again";                                                                         // 212
            pwdAgain.displayName = {                                                                                 // 213
                "default": "passwordAgain",                                                                          // 214
                changePwd: "newPasswordAgain",                                                                       // 215
                resetPwd: "newPasswordAgain",                                                                        // 216
            };                                                                                                       // 217
            pwdAgain.placeholder = {                                                                                 // 218
                "default": "passwordAgain",                                                                          // 219
                changePwd: "newPasswordAgain",                                                                       // 220
                resetPwd: "newPasswordAgain",                                                                        // 221
            };                                                                                                       // 222
            this.addField(pwdAgain);                                                                                 // 223
        }                                                                                                            // 224
    }                                                                                                                // 225
    else{                                                                                                            // 226
        if (this.hasField("password_again"))                                                                         // 227
            throw new Error("AccountsTemplates: a field password_again was added but confirmPassword is set to false!");
    }                                                                                                                // 229
                                                                                                                     // 230
    // Possibly adds the field current_password in case                                                              // 231
    // it was not configured                                                                                         // 232
    if (this.options.enablePasswordChange){                                                                          // 233
        if (!this.hasField("current_password"))                                                                      // 234
            this.addField({                                                                                          // 235
                _id: "current_password",                                                                             // 236
                type: "password",                                                                                    // 237
                displayName: "currentPassword",                                                                      // 238
                placeholder: "currentPassword",                                                                      // 239
                required: true,                                                                                      // 240
            });                                                                                                      // 241
    }                                                                                                                // 242
                                                                                                                     // 243
    // Ensuser the right order of special fields                                                                     // 244
    var moveFieldAfter = function(field_name, reference_field_name) {                                                // 245
        var fieldIds = AccountsTemplates.getFieldIds();                                                              // 246
        var refFieldId = _.indexOf(fieldIds, reference_field_name);                                                  // 247
        // In case the reference field is not present, just return...                                                // 248
        if (refFieldId === -1)                                                                                       // 249
            return;                                                                                                  // 250
        var fieldId = _.indexOf(fieldIds, field_name);                                                               // 251
        // In case the sought field is not present, just return...                                                   // 252
        if (fieldId === -1)                                                                                          // 253
            return;                                                                                                  // 254
        if (fieldId !== -1 && fieldId !== (refFieldId + 1)){                                                         // 255
            // removes the field                                                                                     // 256
            var field = AccountsTemplates._fields.splice(fieldId, 1)[0];                                             // 257
            // push the field right after the reference field position                                               // 258
            var new_fieldIds = AccountsTemplates.getFieldIds();                                                      // 259
            var new_refFieldId = _.indexOf(new_fieldIds, reference_field_name);                                      // 260
            AccountsTemplates._fields.splice(new_refFieldId + 1, 0, field);                                          // 261
        }                                                                                                            // 262
    };                                                                                                               // 263
                                                                                                                     // 264
    // Ensuser the right order of special fields                                                                     // 265
    var moveFieldBefore = function(field_name, reference_field_name) {                                               // 266
        var fieldIds = AccountsTemplates.getFieldIds();                                                              // 267
        var refFieldId = _.indexOf(fieldIds, reference_field_name);                                                  // 268
        // In case the reference field is not present, just return...                                                // 269
        if (refFieldId === -1)                                                                                       // 270
            return;                                                                                                  // 271
        var fieldId = _.indexOf(fieldIds, field_name);                                                               // 272
        // In case the sought field is not present, just return...                                                   // 273
        if (fieldId === -1)                                                                                          // 274
            return;                                                                                                  // 275
        if (fieldId !== -1 && fieldId !== (refFieldId - 1)){                                                         // 276
            // removes the field                                                                                     // 277
            var field = AccountsTemplates._fields.splice(fieldId, 1)[0];                                             // 278
            // push the field right after the reference field position                                               // 279
            var new_fieldIds = AccountsTemplates.getFieldIds();                                                      // 280
            var new_refFieldId = _.indexOf(new_fieldIds, reference_field_name);                                      // 281
            AccountsTemplates._fields.splice(new_refFieldId, 0, field);                                              // 282
        }                                                                                                            // 283
    };                                                                                                               // 284
                                                                                                                     // 285
    // The final order should be something like:                                                                     // 286
    // - username                                                                                                    // 287
    // - email                                                                                                       // 288
    // - username_and_email                                                                                          // 289
    // - password                                                                                                    // 290
    // - password_again                                                                                              // 291
    //                                                                                                               // 292
    // ...so lets do it in reverse order...                                                                          // 293
    moveFieldAfter("username_and_email", "username");                                                                // 294
    moveFieldAfter("username_and_email", "email");                                                                   // 295
    moveFieldBefore("current_password", "password");                                                                 // 296
    moveFieldAfter("password", "current_password");                                                                  // 297
    moveFieldAfter("password_again", "password");                                                                    // 298
                                                                                                                     // 299
                                                                                                                     // 300
    // Sets visibility condition and validation flags for each field                                                 // 301
    var gPositiveValidation = !!AccountsTemplates.options.positiveValidation;                                        // 302
    var gNegativeValidation = !!AccountsTemplates.options.negativeValidation;                                        // 303
    var gShowValidating = !!AccountsTemplates.options.showValidating;                                                // 304
    var gContinuousValidation = !!AccountsTemplates.options.continuousValidation;                                    // 305
    var gNegativeFeedback = !!AccountsTemplates.options.negativeFeedback;                                            // 306
    var gPositiveFeedback = !!AccountsTemplates.options.positiveFeedback;                                            // 307
    _.each(this._fields, function(field){                                                                            // 308
        // Visibility                                                                                                // 309
        switch(field._id) {                                                                                          // 310
            case "current_password":                                                                                 // 311
                field.visible = ["changePwd"];                                                                       // 312
                break;                                                                                               // 313
            case "email":                                                                                            // 314
                field.visible = ["forgotPwd", "signUp", "resendVerificationEmail"];                                  // 315
                if (AccountsTemplates.loginType() === "email")                                                       // 316
                    field.visible.push("signIn");                                                                    // 317
                break;                                                                                               // 318
            case "password":                                                                                         // 319
                field.visible = ["changePwd", "enrollAccount", "resetPwd", "signIn", "signUp"];                      // 320
                break;                                                                                               // 321
            case "password_again":                                                                                   // 322
                field.visible = ["changePwd", "enrollAccount", "resetPwd", "signUp"];                                // 323
                break;                                                                                               // 324
            case "username":                                                                                         // 325
                field.visible = ["signUp"];                                                                          // 326
                if (AccountsTemplates.loginType() === "username")                                                    // 327
                    field.visible.push("signIn");                                                                    // 328
                break;                                                                                               // 329
            case "username_and_email":                                                                               // 330
                field.visible = [];                                                                                  // 331
                if (AccountsTemplates.loginType() === "username_and_email")                                          // 332
                    field.visible.push("signIn");                                                                    // 333
                break;                                                                                               // 334
            default:                                                                                                 // 335
                field.visible = ["signUp"];                                                                          // 336
        }                                                                                                            // 337
                                                                                                                     // 338
        // Validation                                                                                                // 339
        var positiveValidation = field.positiveValidation;                                                           // 340
        if (positiveValidation === undefined)                                                                        // 341
            field.positiveValidation = gPositiveValidation;                                                          // 342
        var negativeValidation = field.negativeValidation;                                                           // 343
        if (negativeValidation === undefined)                                                                        // 344
            field.negativeValidation = gNegativeValidation;                                                          // 345
        field.validation = field.positiveValidation || field.negativeValidation;                                     // 346
        if (field.continuousValidation === undefined)                                                                // 347
            field.continuousValidation = gContinuousValidation;                                                      // 348
        field.continuousValidation = field.validation && field.continuousValidation;                                 // 349
        if (field.negativeFeedback === undefined)                                                                    // 350
            field.negativeFeedback = gNegativeFeedback;                                                              // 351
        if (field.positiveFeedback === undefined)                                                                    // 352
            field.positiveFeedback = gPositiveFeedback;                                                              // 353
        field.feedback = field.negativeFeedback || field.positiveFeedback;                                           // 354
        // Validating icon                                                                                           // 355
        var showValidating = field.showValidating;                                                                   // 356
        if (showValidating === undefined)                                                                            // 357
            field.showValidating = gShowValidating;                                                                  // 358
                                                                                                                     // 359
        // Custom Template                                                                                           // 360
        if (field.template) {                                                                                        // 361
          if (field.template in Template) {                                                                          // 362
            Template[field.template].helpers(AccountsTemplates.atInputHelpers);                                      // 363
          }                                                                                                          // 364
          else {                                                                                                     // 365
            console.warn(                                                                                            // 366
              "[UserAccounts] Warning no template " + field.template + " found!"                                     // 367
            );                                                                                                       // 368
          }                                                                                                          // 369
        }                                                                                                            // 370
    });                                                                                                              // 371
                                                                                                                     // 372
    // Initializes reactive states                                                                                   // 373
    form = new ReactiveDict();                                                                                       // 374
    form.set("disabled", false);                                                                                     // 375
    form.set("state", "signIn");                                                                                     // 376
    form.set("result", null);                                                                                        // 377
    form.set("error", null);                                                                                         // 378
    form.set("message", null);                                                                                       // 379
    this.state = {                                                                                                   // 380
        form: form,                                                                                                  // 381
    };                                                                                                               // 382
                                                                                                                     // 383
    // Possibly subscribes to extended user data (to get the list of registered services...)                         // 384
    if (this.options.showAddRemoveServices){                                                                         // 385
        Meteor.subscribe("userRegisteredServices");                                                                  // 386
    }                                                                                                                // 387
                                                                                                                     // 388
    //Check that reCaptcha site keys are available and no secret keys visible                                        // 389
    if (this.options.showReCaptcha) {                                                                                // 390
        var atSiteKey = null, atSecretKey = null, settingsSiteKey = null, settingsSecretKey = null;                  // 391
                                                                                                                     // 392
                                                                                                                     // 393
        if (AccountsTemplates.options.reCaptcha) {                                                                   // 394
            atSiteKey = AccountsTemplates.options.reCaptcha.siteKey;                                                 // 395
            atSecretKey = AccountsTemplates.options.reCaptcha.secretKey;                                             // 396
        }                                                                                                            // 397
        if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.reCaptcha) {                         // 398
          settingsSiteKey = Meteor.settings.public.reCaptcha.siteKey;                                                // 399
          settingsSecretKey = Meteor.settings.public.reCaptcha.secretKey;                                            // 400
        }                                                                                                            // 401
                                                                                                                     // 402
        if (atSecretKey || settingsSecretKey) {                                                                      // 403
            //erase the secret key                                                                                   // 404
            if (atSecretKey) {                                                                                       // 405
                AccountsTemplates.options.reCaptcha.secretKey = null;                                                // 406
            }                                                                                                        // 407
            if (settingsSecretKey) {                                                                                 // 408
                Meteor.settings.public.reCaptcha.secretKey = null;                                                   // 409
            }                                                                                                        // 410
                                                                                                                     // 411
            var loc = atSecretKey ? "User Accounts configuration!" : "Meteor settings!";                             // 412
            throw new Meteor.Error(401, "User Accounts: DANGER - reCaptcha private key leaked to client from " + loc // 413
            + " Provide the key in server settings ONLY.");                                                          // 414
        }                                                                                                            // 415
                                                                                                                     // 416
        if (!atSiteKey && !settingsSiteKey) {                                                                        // 417
            throw new Meteor.Error(401, "User Accounts: reCaptcha site key not found! Please provide it or set showReCaptcha to false.");
        }                                                                                                            // 419
    }                                                                                                                // 420
                                                                                                                     // 421
    // ------------                                                                                                  // 422
    // Routing Stuff                                                                                                 // 423
    // ------------                                                                                                  // 424
                                                                                                                     // 425
    // Known routes are used to filter out previous path for redirects...                                            // 426
    this.knownRoutes = _.pluck(_.values(this.routes), "path");                                                       // 427
                                                                                                                     // 428
    // Stores previous path on path change...                                                                        // 429
    Router.onStop(function() {                                                                                       // 430
        Tracker.nonreactive(function () {                                                                            // 431
            var currentPath = Router.current().url;                                                                  // 432
            var currentPathClean = currentPath.replace(/^\/+|\/+$/gm,'')                                             // 433
            var isKnownRoute = _.map(AccountsTemplates.knownRoutes, function(path){                                  // 434
              if (!path) {                                                                                           // 435
                return false;                                                                                        // 436
              }                                                                                                      // 437
              path = path.replace(/^\/+|\/+$/gm,'');                                                                 // 438
              var known = RegExp(path).test(currentPathClean)                                                        // 439
              return known;                                                                                          // 440
            });                                                                                                      // 441
            if (!_.some(isKnownRoute)) {                                                                             // 442
                AccountsTemplates.setPrevPath(currentPath);                                                          // 443
            }                                                                                                        // 444
            AccountsTemplates.avoidRedirect = false;                                                                 // 445
        });                                                                                                          // 446
    });                                                                                                              // 447
                                                                                                                     // 448
    // Sets up configured routes                                                                                     // 449
    AccountsTemplates.setupRoutes();                                                                                 // 450
                                                                                                                     // 451
    // Marks AccountsTemplates as initialized                                                                        // 452
    this._initialized = true;                                                                                        // 453
};                                                                                                                   // 454
                                                                                                                     // 455
AT.prototype.linkClick = function(route){                                                                            // 456
    if (AccountsTemplates.disabled())                                                                                // 457
        return;                                                                                                      // 458
    var path = AccountsTemplates.getRoutePath(route);                                                                // 459
    if (path === "#" || AccountsTemplates.avoidRedirect || path === Router.current().route.path())                   // 460
        AccountsTemplates.setState(route);                                                                           // 461
    else                                                                                                             // 462
        Meteor.defer(function(){                                                                                     // 463
            Router.go(AccountsTemplates.getRouteName(route));                                                        // 464
        });                                                                                                          // 465
};                                                                                                                   // 466
                                                                                                                     // 467
AT.prototype.logout = function(){                                                                                    // 468
    var onLogoutHook = AccountsTemplates.options.onLogoutHook;                                                       // 469
    var homeRoutePath = AccountsTemplates.options.homeRoutePath;                                                     // 470
    Meteor.logout(function(){                                                                                        // 471
        if (onLogoutHook)                                                                                            // 472
          onLogoutHook();                                                                                            // 473
        else if (homeRoutePath)                                                                                      // 474
            Router.go(homeRoutePath);                                                                                // 475
    });                                                                                                              // 476
};                                                                                                                   // 477
                                                                                                                     // 478
AT.prototype.postSubmitRedirect = function(route){                                                                   // 479
    if (AccountsTemplates.avoidRedirect)                                                                             // 480
        AccountsTemplates.avoidRedirect = false;                                                                     // 481
    else{                                                                                                            // 482
        var nextPath = AccountsTemplates.routes[route] && AccountsTemplates.routes[route].redirect;                  // 483
        if (nextPath){                                                                                               // 484
            if (_.isFunction(nextPath))                                                                              // 485
                nextPath();                                                                                          // 486
            else                                                                                                     // 487
                Router.go(nextPath);                                                                                 // 488
        }else{                                                                                                       // 489
            var previousPath = AccountsTemplates.getPrevPath();                                                      // 490
            if (previousPath)                                                                                        // 491
                Router.go(previousPath);                                                                             // 492
            else{                                                                                                    // 493
                var homeRoutePath = AccountsTemplates.options.homeRoutePath;                                         // 494
                if (homeRoutePath)                                                                                   // 495
                    Router.go(homeRoutePath);                                                                        // 496
            }                                                                                                        // 497
        }                                                                                                            // 498
    }                                                                                                                // 499
};                                                                                                                   // 500
                                                                                                                     // 501
AT.prototype.submitCallback = function(error, state, onSuccess){                                                     // 502
                                                                                                                     // 503
    var onSubmitHook = AccountsTemplates.options.onSubmitHook;                                                       // 504
    if(onSubmitHook)                                                                                                 // 505
        onSubmitHook(error, state);                                                                                  // 506
                                                                                                                     // 507
    if (error) {                                                                                                     // 508
        if(_.isObject(error.details)) {                                                                              // 509
            // If error.details is an object, we may try to set fields errors from it                                // 510
            _.each(error.details, function(error, fieldId){                                                          // 511
                AccountsTemplates.getField(fieldId).setError(error);                                                 // 512
            });                                                                                                      // 513
        }                                                                                                            // 514
        else {                                                                                                       // 515
            var err = "error.accounts.Unknown error";                                                                // 516
            if (error.reason) {                                                                                      // 517
              err = error.reason;                                                                                    // 518
            }                                                                                                        // 519
            if (err.substring(0, 15) !== "error.accounts.") {                                                        // 520
              err = "error.accounts." + err;                                                                         // 521
            }                                                                                                        // 522
            AccountsTemplates.state.form.set("error", [err]);                                                        // 523
        }                                                                                                            // 524
        AccountsTemplates.setDisabled(false);                                                                        // 525
        // Possibly resets reCaptcha form                                                                            // 526
        if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                         // 527
            grecaptcha.reset();                                                                                      // 528
        }                                                                                                            // 529
    }                                                                                                                // 530
    else{                                                                                                            // 531
        if (onSuccess)                                                                                               // 532
            onSuccess()                                                                                              // 533
                                                                                                                     // 534
        if (_.contains(["enrollAccount", "forgotPwd", "resetPwd", "verifyEmail"], state)){                           // 535
            var redirectTimeout = AccountsTemplates.options.redirectTimeout;                                         // 536
            if (redirectTimeout > 0)                                                                                 // 537
                AccountsTemplates.timedOutRedirect = Meteor.setTimeout(function(){                                   // 538
                    AccountsTemplates.timedOutRedirect = null;                                                       // 539
                    AccountsTemplates.setDisabled(false);                                                            // 540
                    AccountsTemplates.postSubmitRedirect(state);                                                     // 541
                }, redirectTimeout);                                                                                 // 542
        }                                                                                                            // 543
        else if (state){                                                                                             // 544
            AccountsTemplates.setDisabled(false);                                                                    // 545
            AccountsTemplates.postSubmitRedirect(state);                                                             // 546
        }                                                                                                            // 547
    }                                                                                                                // 548
};                                                                                                                   // 549
                                                                                                                     // 550
AccountsTemplates = new AT();                                                                                        // 551
                                                                                                                     // 552
                                                                                                                     // 553
// Initialization                                                                                                    // 554
Meteor.startup(function(){                                                                                           // 555
    AccountsTemplates._init();                                                                                       // 556
});                                                                                                                  // 557
                                                                                                                     // 558
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
        if (Meteor.userId() && state === "signIn")                                                                   // 8
          return false;                                                                                              // 9
        return !!AccountsTemplates.texts.title[state];                                                               // 10
    },                                                                                                               // 11
    showOauthServices: function(next_state){                                                                         // 12
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 13
        if (!(state === "signIn" || state === "signUp"))                                                             // 14
            return false;                                                                                            // 15
        var services = AccountsTemplates.oauthServices();                                                            // 16
        if (!services.length)                                                                                        // 17
            return false;                                                                                            // 18
        if (Meteor.userId())                                                                                         // 19
            return AccountsTemplates.options.showAddRemoveServices;                                                  // 20
        return true;                                                                                                 // 21
    },                                                                                                               // 22
    showServicesSeparator: function(next_state){                                                                     // 23
        var pwdService = Package["accounts-password"] !== undefined;                                                 // 24
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 25
        var rightState = (state === "signIn" || state === "signUp");                                                 // 26
        return rightState && !Meteor.userId() && pwdService && AccountsTemplates.oauthServices().length;             // 27
    },                                                                                                               // 28
    showError: function(next_state) {                                                                                // 29
        return !!AccountsTemplates.state.form.get("error");                                                          // 30
    },                                                                                                               // 31
    showResult: function(next_state) {                                                                               // 32
        return !!AccountsTemplates.state.form.get("result");                                                         // 33
    },                                                                                                               // 34
    showMessage: function(next_state) {                                                                              // 35
        return !!AccountsTemplates.state.form.get("message");                                                        // 36
    },                                                                                                               // 37
    showPwdForm: function(next_state) {                                                                              // 38
        if (Package["accounts-password"] === undefined)                                                              // 39
            return false;                                                                                            // 40
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 41
        if ((state === "verifyEmail") || (state === "signIn" && Meteor.userId()))                                    // 42
            return false;                                                                                            // 43
        return true;                                                                                                 // 44
    },                                                                                                               // 45
    showSignInLink: function(next_state){                                                                            // 46
        if (AccountsTemplates.options.hideSignInLink)                                                                // 47
            return false;                                                                                            // 48
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 49
        if (AccountsTemplates.options.forbidClientAccountCreation && state === "forgotPwd")                          // 50
            return true;                                                                                             // 51
        return state === "signUp";                                                                                   // 52
    },                                                                                                               // 53
    showSignUpLink: function(next_state){                                                                            // 54
        if  (AccountsTemplates.options.hideSignUpLink)                                                               // 55
            return false;                                                                                            // 56
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 57
        return ((state === "signIn" && !Meteor.userId()) || state === "forgotPwd") && !AccountsTemplates.options.forbidClientAccountCreation;
    },                                                                                                               // 59
    showTermsLink: function(next_state){                                                                             // 60
        //TODO: Add privacyRoute and termsRoute as alternatives (the point of named routes is                        // 61
        // being able to change the url in one place only)                                                           // 62
        if (!!AccountsTemplates.options.privacyUrl || !!AccountsTemplates.options.termsUrl) {                        // 63
            var state = next_state || this.state || AccountsTemplates.getState();                                    // 64
            if (state === "signUp" || state === "enrollAccount" ) {                                                  // 65
              return true;                                                                                           // 66
            }                                                                                                        // 67
        }                                                                                                            // 68
        /*                                                                                                           // 69
        if (state === "signIn"){                                                                                     // 70
            var pwdService = Package["accounts-password"] !== undefined;                                             // 71
            if (!pwdService)                                                                                         // 72
                return true;                                                                                         // 73
        }                                                                                                            // 74
        */                                                                                                           // 75
        return false;                                                                                                // 76
    },                                                                                                               // 77
    showResendVerificationEmailLink: function(){                                                                     // 78
        var parentData = Template.currentData();                                                                     // 79
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 80
        return (state === "signIn" || state === "forgotPwd") && AccountsTemplates.options.showResendVerificationEmailLink;
    },                                                                                                               // 82
};                                                                                                                   // 83
                                                                                                                     // 84
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
    var queryKey = this.data.options && this.data.options.queryKey || this.data._id;                                 // 3
    var inputQueryVal = Router.current().params.query[queryKey];                                                     // 4
    if (inputQueryVal)                                                                                               // 5
        this.$("input#at-field-" + fieldId).val(inputQueryVal);                                                      // 6
};                                                                                                                   // 7
                                                                                                                     // 8
AT.prototype.atInputHelpers = {                                                                                      // 9
    disabled: function() {                                                                                           // 10
        return AccountsTemplates.disabled();                                                                         // 11
    },                                                                                                               // 12
    showLabels: function() {                                                                                         // 13
        return AccountsTemplates.options.showLabels;                                                                 // 14
    },                                                                                                               // 15
    displayName: function() {                                                                                        // 16
        var parentData = Template.parentData();                                                                      // 17
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 18
        var displayName = this.getDisplayName(state);                                                                // 19
        return T9n.get(displayName, markIfMissing=false);                                                            // 20
    },                                                                                                               // 21
    optionalText: function(){                                                                                        // 22
        return "(" + T9n.get(AccountsTemplates.texts.optionalField, markIfMissing=false) + ")";                      // 23
    },                                                                                                               // 24
    templateName: function() {                                                                                       // 25
        if (this.template)                                                                                           // 26
            return this.template;                                                                                    // 27
        if (this.type === "checkbox")                                                                                // 28
            return "atCheckboxInput";                                                                                // 29
        if (this.type === "select")                                                                                  // 30
            return "atSelectInput";                                                                                  // 31
        if (this.type === "radio")                                                                                   // 32
            return "atRadioInput";                                                                                   // 33
        if (this.type === "hidden")                                                                                  // 34
            return "atHiddenInput";                                                                                  // 35
        return "atTextInput";                                                                                        // 36
    },                                                                                                               // 37
    values: function(){                                                                                              // 38
        var id = this._id;                                                                                           // 39
        return _.map(this.select, function(select){                                                                  // 40
            var s = _.clone(select);                                                                                 // 41
            s._id = id + "-" + select.value;                                                                         // 42
            s.id = id;                                                                                               // 43
            return s;                                                                                                // 44
        });                                                                                                          // 45
    },                                                                                                               // 46
    errorText: function() {                                                                                          // 47
        var err = this.getStatus();                                                                                  // 48
        return T9n.get(err, markIfMissing=false);                                                                    // 49
    },                                                                                                               // 50
    placeholder: function() {                                                                                        // 51
        if (AccountsTemplates.options.showPlaceholders) {                                                            // 52
            var parentData = Template.parentData();                                                                  // 53
            var state = (parentData && parentData.state) || AccountsTemplates.getState();                            // 54
            var placeholder = this.getPlaceholder(state);                                                            // 55
            return T9n.get(placeholder, markIfMissing=false);                                                        // 56
        }                                                                                                            // 57
    },                                                                                                               // 58
};                                                                                                                   // 59
                                                                                                                     // 60
AT.prototype.atInputEvents = {                                                                                       // 61
    "focusin input": function(event, t){                                                                             // 62
        this.clearStatus();                                                                                          // 63
    },                                                                                                               // 64
    "focusout input": function(event, t){                                                                            // 65
        var fieldId = this._id;                                                                                      // 66
        var rawValue = this.getValue(t);                                                                             // 67
        var value = this.fixValue(rawValue);                                                                         // 68
        // Possibly updates the input value                                                                          // 69
        if (value !== rawValue) {                                                                                    // 70
            this.setValue(t, value);                                                                                 // 71
        }                                                                                                            // 72
                                                                                                                     // 73
        // Client-side only validation                                                                               // 74
        if (!this.validation)                                                                                        // 75
            return;                                                                                                  // 76
        var parentData = Template.parentData();                                                                      // 77
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 78
        // No validation during signIn                                                                               // 79
        if (state === "signIn")                                                                                      // 80
            return;                                                                                                  // 81
        // Special case for password confirmation                                                                    // 82
        if (value && fieldId === "password_again"){                                                                  // 83
            if (value !== $("#at-field-password").val())                                                             // 84
                return this.setError(AccountsTemplates.texts.errors.pwdMismatch);                                    // 85
        }                                                                                                            // 86
        this.validate(value);                                                                                        // 87
    },                                                                                                               // 88
    "keyup input": function(event, t){                                                                               // 89
        // Client-side only continuous validation                                                                    // 90
        if (!this.continuousValidation)                                                                              // 91
            return;                                                                                                  // 92
        var parentData = Template.parentData();                                                                      // 93
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 94
        // No validation during signIn                                                                               // 95
        if (state === "signIn")                                                                                      // 96
            return;                                                                                                  // 97
        var fieldId = this._id;                                                                                      // 98
        var rawValue = this.getValue(t);                                                                             // 99
        var value = this.fixValue(rawValue);                                                                         // 100
        // Possibly updates the input value                                                                          // 101
        if (value !== rawValue) {                                                                                    // 102
            this.setValue(t, value);                                                                                 // 103
        }                                                                                                            // 104
        // Special case for password confirmation                                                                    // 105
        if (value && fieldId === "password_again"){                                                                  // 106
            if (value !== $("#at-field-password").val())                                                             // 107
                return this.setError(AccountsTemplates.texts.errors.pwdMismatch);                                    // 108
        }                                                                                                            // 109
        this.validate(value);                                                                                        // 110
    },                                                                                                               // 111
};                                                                                                                   // 112
                                                                                                                     // 113
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
        AccountsTemplates.clearMessage();                                                                            // 88
        // Possibly sets errors                                                                                      // 89
        if (someError){                                                                                              // 90
            if (errList.length)                                                                                      // 91
                AccountsTemplates.state.form.set("error", errList);                                                  // 92
            AccountsTemplates.setDisabled(false);                                                                    // 93
            //reset reCaptcha form                                                                                   // 94
            if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                     // 95
                grecaptcha.reset();                                                                                  // 96
            }                                                                                                        // 97
            return;                                                                                                  // 98
        }                                                                                                            // 99
                                                                                                                     // 100
        // Extracts username, email, and pwds                                                                        // 101
        var current_password = formData.current_password;                                                            // 102
        var email = formData.email;                                                                                  // 103
        var password = formData.password;                                                                            // 104
        var password_again = formData.password_again;                                                                // 105
        var username = formData.username;                                                                            // 106
        var username_and_email = formData.username_and_email;                                                        // 107
        // Clears profile data removing username, email, and pwd                                                     // 108
        delete formData.current_password;                                                                            // 109
        delete formData.email;                                                                                       // 110
        delete formData.password;                                                                                    // 111
        delete formData.password_again;                                                                              // 112
        delete formData.username;                                                                                    // 113
        delete formData.username_and_email;                                                                          // 114
                                                                                                                     // 115
        if (AccountsTemplates.options.confirmPassword){                                                              // 116
            // Checks passwords for correct match                                                                    // 117
            if (password_again && password !== password_again){                                                      // 118
                var pwd_again = AccountsTemplates.getField("password_again");                                        // 119
                if (pwd_again.negativeValidation)                                                                    // 120
                    pwd_again.setError(AccountsTemplates.texts.errors.pwdMismatch);                                  // 121
                else                                                                                                 // 122
                    AccountsTemplates.state.form.set("error", [{                                                     // 123
                        field: pwd_again.getDisplayName(),                                                           // 124
                        err: AccountsTemplates.texts.errors.pwdMismatch                                              // 125
                    }]);                                                                                             // 126
                AccountsTemplates.setDisabled(false);                                                                // 127
                //reset reCaptcha form                                                                               // 128
                if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                 // 129
                  grecaptcha.reset();                                                                                // 130
                }                                                                                                    // 131
                return;                                                                                              // 132
            }                                                                                                        // 133
        }                                                                                                            // 134
                                                                                                                     // 135
        // -------                                                                                                   // 136
        // Sign In                                                                                                   // 137
        // -------                                                                                                   // 138
        if (state === "signIn") {                                                                                    // 139
            var pwdOk = !!password;                                                                                  // 140
            var userOk = true;                                                                                       // 141
            var loginSelector;                                                                                       // 142
            if (email) {                                                                                             // 143
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 144
                  email = toLowercaseUsername(email);                                                                // 145
                }                                                                                                    // 146
                                                                                                                     // 147
                loginSelector = {email: email};                                                                      // 148
            }                                                                                                        // 149
            else if (username) {                                                                                     // 150
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 151
                  username = toLowercaseUsername(username);                                                          // 152
                }                                                                                                    // 153
                loginSelector = {username: username};                                                                // 154
            }                                                                                                        // 155
            else if (username_and_email) {                                                                           // 156
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 157
                  username_and_email = toLowercaseUsername(username_and_email);                                      // 158
                }                                                                                                    // 159
                loginSelector = username_and_email;                                                                  // 160
            }                                                                                                        // 161
            else                                                                                                     // 162
                userOk = false;                                                                                      // 163
                                                                                                                     // 164
            // Possibly exits if not both 'password' and 'username' are non-empty...                                 // 165
            if (!pwdOk || !userOk){                                                                                  // 166
                AccountsTemplates.state.form.set("error", [AccountsTemplates.texts.errors.loginForbidden]);          // 167
                AccountsTemplates.setDisabled(false);                                                                // 168
                return;                                                                                              // 169
            }                                                                                                        // 170
                                                                                                                     // 171
            return Meteor.loginWithPassword(loginSelector, password, function(error) {                               // 172
                AccountsTemplates.submitCallback(error, state);                                                      // 173
            });                                                                                                      // 174
        }                                                                                                            // 175
                                                                                                                     // 176
        // -------                                                                                                   // 177
        // Sign Up                                                                                                   // 178
        // -------                                                                                                   // 179
        if (state === "signUp") {                                                                                    // 180
            // Possibly gets reCaptcha response                                                                      // 181
            if (AccountsTemplates.options.showReCaptcha) {                                                           // 182
              formData.reCaptchaResponse = grecaptcha.getResponse();                                                 // 183
            }                                                                                                        // 184
                                                                                                                     // 185
            var hash = Accounts._hashPassword(password);                                                             // 186
            return Meteor.call("ATCreateUserServer", {                                                               // 187
                username: username,                                                                                  // 188
                email: email,                                                                                        // 189
                password: hash,                                                                                      // 190
                profile: formData,                                                                                   // 191
            }, function(error){                                                                                      // 192
                AccountsTemplates.submitCallback(error, undefined, function(){                                       // 193
                    if (AccountsTemplates.options.sendVerificationEmail && AccountsTemplates.options.enforceEmailVerification){
                        AccountsTemplates.submitCallback(error, state, function () {                                 // 195
                            AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.signUpVerifyEmail);
                            // Cleans up input fields' content                                                       // 197
                            _.each(AccountsTemplates.getFields(), function(field){                                   // 198
                                // Considers only visible fields...                                                  // 199
                                if (!_.contains(field.visible, state))                                               // 200
                                    return;                                                                          // 201
                                                                                                                     // 202
                                var elem = t.$("#at-field-" + field._id);                                            // 203
                                                                                                                     // 204
                                // Naïve reset                                                                       // 205
                                if (field.type === "checkbox") elem.prop('checked', false);                          // 206
                                else elem.val("");                                                                   // 207
                                                                                                                     // 208
                            });                                                                                      // 209
                            AccountsTemplates.setDisabled(false);                                                    // 210
                            AccountsTemplates.avoidRedirect = true;                                                  // 211
                        });                                                                                          // 212
                    }                                                                                                // 213
                    else {                                                                                           // 214
                        var loginSelector;                                                                           // 215
                                                                                                                     // 216
                        if (email) {                                                                                 // 217
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 218
                              email = toLowercaseUsername(email);                                                    // 219
                            }                                                                                        // 220
                                                                                                                     // 221
                            loginSelector = {email: email};                                                          // 222
                        }                                                                                            // 223
                        else if (username) {                                                                         // 224
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 225
                              username = toLowercaseUsername(username);                                              // 226
                            }                                                                                        // 227
                            loginSelector = {username: username};                                                    // 228
                        }                                                                                            // 229
                        else {                                                                                       // 230
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 231
                              username_and_email = toLowercaseUsername(username_and_email);                          // 232
                            }                                                                                        // 233
                            loginSelector = username_and_email;                                                      // 234
                        }                                                                                            // 235
                                                                                                                     // 236
                        Meteor.loginWithPassword(loginSelector, password, function(error) {                          // 237
                            AccountsTemplates.submitCallback(error, state, function(){                               // 238
                                AccountsTemplates.setState("signIn");                                                // 239
                            });                                                                                      // 240
                        });                                                                                          // 241
                    }                                                                                                // 242
                });                                                                                                  // 243
            });                                                                                                      // 244
        }                                                                                                            // 245
                                                                                                                     // 246
        //----------------                                                                                           // 247
        // Forgot Password                                                                                           // 248
        //----------------                                                                                           // 249
        if (state === "forgotPwd"){                                                                                  // 250
            return Accounts.forgotPassword({                                                                         // 251
                email: email                                                                                         // 252
            }, function(error) {                                                                                     // 253
                AccountsTemplates.submitCallback(error, state, function(){                                           // 254
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailSent);              // 255
                    t.$("#at-field-email").val("");                                                                  // 256
                });                                                                                                  // 257
            });                                                                                                      // 258
        }                                                                                                            // 259
                                                                                                                     // 260
        //--------------------------------                                                                           // 261
        // Reset Password / Enroll Account                                                                           // 262
        //--------------------------------                                                                           // 263
        if (state === "resetPwd" || state === "enrollAccount") {                                                     // 264
            return Accounts.resetPassword(AccountsTemplates.paramToken, password, function(error) {                  // 265
                AccountsTemplates.submitCallback(error, state, function(){                                           // 266
                    var pwd_field_id;                                                                                // 267
                    if (state === "resetPwd")                                                                        // 268
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdReset);           // 269
                    else // Enroll Account                                                                           // 270
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdSet);             // 271
                    t.$("#at-field-password").val("");                                                               // 272
                    if (AccountsTemplates.options.confirmPassword)                                                   // 273
                        t.$("#at-field-password_again").val("");                                                     // 274
                });                                                                                                  // 275
            });                                                                                                      // 276
        }                                                                                                            // 277
                                                                                                                     // 278
        //----------------                                                                                           // 279
        // Change Password                                                                                           // 280
        //----------------                                                                                           // 281
        if (state === "changePwd"){                                                                                  // 282
            return Accounts.changePassword(current_password, password, function(error) {                             // 283
                AccountsTemplates.submitCallback(error, state, function(){                                           // 284
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdChanged);             // 285
                    t.$("#at-field-current_password").val("");                                                       // 286
                    t.$("#at-field-password").val("");                                                               // 287
                    if (AccountsTemplates.options.confirmPassword)                                                   // 288
                        t.$("#at-field-password_again").val("");                                                     // 289
                });                                                                                                  // 290
            });                                                                                                      // 291
        }                                                                                                            // 292
                                                                                                                     // 293
        //----------------                                                                                           // 294
        // Resend Verification E-mail                                                                                // 295
        //----------------                                                                                           // 296
        if (state === "resendVerificationEmail"){                                                                    // 297
            return Meteor.call("ATResendVerificationEmail", email, function (error) {                                // 298
                AccountsTemplates.submitCallback(error, state, function(){                                           // 299
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.verificationEmailSent);  // 300
                    t.$("#at-field-email").val("");                                                                  // 301
                                                                                                                     // 302
                    AccountsTemplates.avoidRedirect = true;                                                          // 303
                });                                                                                                  // 304
            });                                                                                                      // 305
        }                                                                                                            // 306
    },                                                                                                               // 307
};                                                                                                                   // 308
                                                                                                                     // 309
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
// packages/useraccounts:core/lib/templates_helpers/at_resend_verification_email_link.js                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atResendVerificationEmailLinkHelpers = {                                                                // 1
    disabled: function () {                                                                                          // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    resendVerificationEmailLink: function () {                                                                       // 5
        return AccountsTemplates.getRoutePath("resendVerificationEmail");                                            // 6
    },                                                                                                               // 7
    preText: function(){                                                                                             // 8
        return T9n.get(AccountsTemplates.texts.resendVerificationEmailLink_pre, markIfMissing=false);                // 9
    },                                                                                                               // 10
    linkText: function(){                                                                                            // 11
        return T9n.get(AccountsTemplates.texts.resendVerificationEmailLink_link, markIfMissing=false);               // 12
    },                                                                                                               // 13
    suffText: function(){                                                                                            // 14
        return T9n.get(AccountsTemplates.texts.resendVerificationEmailLink_suff, markIfMissing=false);               // 15
    },                                                                                                               // 16
};                                                                                                                   // 17
                                                                                                                     // 18
AT.prototype.atResendVerificationEmailLinkEvents = {                                                                 // 19
    "click #at-resend-verification-email": function(event, t) {                                                      // 20
        event.preventDefault();                                                                                      // 21
        AccountsTemplates.linkClick('resendVerificationEmail');                                                      // 22
    },                                                                                                               // 23
};                                                                                                                   // 24
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
  title: function() {                                                                                                // 2
    var parentData = Template.currentData();                                                                         // 3
    var state = (parentData && parentData.state) || AccountsTemplates.getState();                                    // 4
    return T9n.get(AccountsTemplates.texts.title[state], markIfMissing = false);                                     // 5
  },                                                                                                                 // 6
};                                                                                                                   // 7
                                                                                                                     // 8
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_message.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atMessageHelpers = {                                                                                    // 1
    message: function() {                                                                                            // 2
        var messageText = AccountsTemplates.state.form.get("message");                                               // 3
        if (messageText)                                                                                             // 4
            return T9n.get(messageText, markIfMissing=false);                                                        // 5
    },                                                                                                               // 6
};                                                                                                                   // 7
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
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.cannotRemoveService, {});                 // 9
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
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.accountsCreationDisabled);                // 22
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
                    throw new Meteor.Error(403, AccountsTemplates.texts.errors.captchaVerification,                  // 92
                      apiResponse['error-codes'] ? apiResponse['error-codes'].join(", ") : "Unknown Error.");        // 93
                }                                                                                                    // 94
            }                                                                                                        // 95
                                                                                                                     // 96
            if (someError)                                                                                           // 97
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.validationErrors, validationErrors);      // 98
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
                                                                                                                     // 116
        // Resend a user's verification e-mail                                                                       // 117
        ATResendVerificationEmail: function (email) {                                                                // 118
            check(email, String);                                                                                    // 119
                                                                                                                     // 120
            var user = Meteor.users.findOne({ "emails.address": email });                                            // 121
                                                                                                                     // 122
            // Send the standard error back to the client if no user exist with this e-mail                          // 123
            if (!user)                                                                                               // 124
                throw new Meteor.Error(403, "User not found");                                                       // 125
                                                                                                                     // 126
            try {                                                                                                    // 127
                Accounts.sendVerificationEmail(user._id);                                                            // 128
            }                                                                                                        // 129
            catch (error) {                                                                                          // 130
                // Handle error when email already verified                                                          // 131
                // https://github.com/dwinston/send-verification-email-bug                                           // 132
                throw new Meteor.Error(403, "Already verified");                                                     // 133
            }                                                                                                        // 134
        },                                                                                                           // 135
    });                                                                                                              // 136
}                                                                                                                    // 137
                                                                                                                     // 138
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['useraccounts:core'] = {
  AccountsTemplates: AccountsTemplates
};

})();
