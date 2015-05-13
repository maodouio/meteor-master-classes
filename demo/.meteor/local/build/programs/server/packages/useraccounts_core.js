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
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var AccountsTemplates, Field, STATE_PAT, ERRORS_PAT, INFO_PAT, INPUT_ICONS_PAT, ObjWithStringValues, TEXTS_PAT, CONFIG_PAT, FIELD_SUB_PAT, FIELD_PAT, AT;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/useraccounts:core/lib/field.js                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
// ---------------------------------------------------------------------------------                               // 1
                                                                                                                   // 2
// Field object                                                                                                    // 3
                                                                                                                   // 4
// ---------------------------------------------------------------------------------                               // 5
                                                                                                                   // 6
                                                                                                                   // 7
Field = function(field){                                                                                           // 8
    check(field, FIELD_PAT);                                                                                       // 9
    _.defaults(this, field);                                                                                       // 10
                                                                                                                   // 11
    this.validating = new ReactiveVar(false);                                                                      // 12
    this.status = new ReactiveVar(null);                                                                           // 13
};                                                                                                                 // 14
                                                                                                                   // 15
if (Meteor.isClient)                                                                                               // 16
    Field.prototype.clearStatus = function(){                                                                      // 17
        return this.status.set(null);                                                                              // 18
    };                                                                                                             // 19
if (Meteor.isServer)                                                                                               // 20
    Field.prototype.clearStatus = function(){                                                                      // 21
        // Nothing to do server-side                                                                               // 22
        return                                                                                                     // 23
    };                                                                                                             // 24
                                                                                                                   // 25
Field.prototype.fixValue = function(value){                                                                        // 26
    if (this.type === "checkbox")                                                                                  // 27
        return !!value;                                                                                            // 28
    if (this.type === "select")                                                                                    // 29
        // TODO: something working...                                                                              // 30
        return value;                                                                                              // 31
    if (this.type === "radio")                                                                                     // 32
        // TODO: something working...                                                                              // 33
        return value;                                                                                              // 34
    // Possibly applies required transformations to the input value                                                // 35
    if (this.trim)                                                                                                 // 36
        value = value.trim();                                                                                      // 37
    if (this.lowercase)                                                                                            // 38
        value = value.toLowerCase();                                                                               // 39
    if (this.uppercase)                                                                                            // 40
        value = value.toUpperCase();                                                                               // 41
    if (!!this.transform)                                                                                          // 42
        value = this.transform(value);                                                                             // 43
    return value;                                                                                                  // 44
};                                                                                                                 // 45
                                                                                                                   // 46
if (Meteor.isClient)                                                                                               // 47
    Field.prototype.getDisplayName = function(state){                                                              // 48
        var dN = this.displayName;                                                                                 // 49
        if (_.isObject(dN))                                                                                        // 50
            dN = dN[state] || dN["default"];                                                                       // 51
        if (!dN)                                                                                                   // 52
            dN = capitalize(this._id);                                                                             // 53
        return dN;                                                                                                 // 54
    };                                                                                                             // 55
                                                                                                                   // 56
if (Meteor.isClient)                                                                                               // 57
    Field.prototype.getPlaceholder = function(state){                                                              // 58
        var placeholder = this.placeholder;                                                                        // 59
        if (_.isObject(placeholder))                                                                               // 60
            placeholder = placeholder[state] || placeholder["default"];                                            // 61
        if (!placeholder)                                                                                          // 62
            placeholder = capitalize(this._id);                                                                    // 63
        return placeholder;                                                                                        // 64
    };                                                                                                             // 65
                                                                                                                   // 66
Field.prototype.getStatus = function(){                                                                            // 67
    return this.status.get();                                                                                      // 68
};                                                                                                                 // 69
                                                                                                                   // 70
if (Meteor.isClient)                                                                                               // 71
    Field.prototype.getValue = function(tempalteInstance){                                                         // 72
        if (this.type === "checkbox")                                                                              // 73
            return !!(tempalteInstance.$("#at-field-" + this._id + ":checked").val());                             // 74
        if (this.type === "radio")                                                                                 // 75
            return tempalteInstance.$("[name=at-field-"+ this._id + "]:checked").val();                            // 76
        return tempalteInstance.$("#at-field-" + this._id).val();                                                  // 77
    };                                                                                                             // 78
                                                                                                                   // 79
if (Meteor.isClient)                                                                                               // 80
    Field.prototype.hasError = function() {                                                                        // 81
        return this.negativeValidation && this.status.get();                                                       // 82
    };                                                                                                             // 83
                                                                                                                   // 84
if (Meteor.isClient)                                                                                               // 85
    Field.prototype.hasIcon = function(){                                                                          // 86
        if (this.showValidating && this.isValidating())                                                            // 87
            return true;                                                                                           // 88
        if (this.negativeFeedback && this.hasError())                                                              // 89
            return true;                                                                                           // 90
        if (this.positiveFeedback && this.hasSuccess())                                                            // 91
            return true;                                                                                           // 92
    };                                                                                                             // 93
                                                                                                                   // 94
if (Meteor.isClient)                                                                                               // 95
    Field.prototype.hasSuccess = function() {                                                                      // 96
        return this.positiveValidation && this.status.get() === false;                                             // 97
    };                                                                                                             // 98
                                                                                                                   // 99
if (Meteor.isClient)                                                                                               // 100
    Field.prototype.iconClass = function(){                                                                        // 101
        if (this.isValidating())                                                                                   // 102
            return AccountsTemplates.texts.inputIcons["isValidating"];                                             // 103
        if (this.hasError())                                                                                       // 104
            return AccountsTemplates.texts.inputIcons["hasError"];                                                 // 105
        if (this.hasSuccess())                                                                                     // 106
            return AccountsTemplates.texts.inputIcons["hasSuccess"];                                               // 107
    };                                                                                                             // 108
                                                                                                                   // 109
if (Meteor.isClient)                                                                                               // 110
    Field.prototype.isValidating = function(){                                                                     // 111
        return this.validating.get();                                                                              // 112
    };                                                                                                             // 113
                                                                                                                   // 114
if (Meteor.isClient)                                                                                               // 115
    Field.prototype.setError = function(err){                                                                      // 116
        check(err, Match.OneOf(String, undefined));                                                                // 117
        return this.status.set(err || true);                                                                       // 118
    };                                                                                                             // 119
if (Meteor.isServer)                                                                                               // 120
    Field.prototype.setError = function(err){                                                                      // 121
        // Nothing to do server-side                                                                               // 122
        return;                                                                                                    // 123
    };                                                                                                             // 124
                                                                                                                   // 125
if (Meteor.isClient)                                                                                               // 126
    Field.prototype.setSuccess = function(){                                                                       // 127
        return this.status.set(false);                                                                             // 128
    };                                                                                                             // 129
if (Meteor.isServer)                                                                                               // 130
    Field.prototype.setSuccess = function(){                                                                       // 131
        // Nothing to do server-side                                                                               // 132
        return;                                                                                                    // 133
    };                                                                                                             // 134
                                                                                                                   // 135
                                                                                                                   // 136
if (Meteor.isClient)                                                                                               // 137
    Field.prototype.setValidating = function(state){                                                               // 138
        check(state, Boolean);                                                                                     // 139
        return this.validating.set(state);                                                                         // 140
    };                                                                                                             // 141
if (Meteor.isServer)                                                                                               // 142
    Field.prototype.setValidating = function(state){                                                               // 143
        // Nothing to do server-side                                                                               // 144
        return;                                                                                                    // 145
    };                                                                                                             // 146
                                                                                                                   // 147
if (Meteor.isClient)                                                                                               // 148
    Field.prototype.setValue = function(tempalteInstance, value){                                                  // 149
        if (this.type === "checkbox") {                                                                            // 150
            tempalteInstance.$("#at-field-" + this._id).prop('checked', true);                                     // 151
            return;                                                                                                // 152
        }                                                                                                          // 153
        if (this.type === "radio") {                                                                               // 154
            tempalteInstance.$("[name=at-field-"+ this._id + "]").prop('checked', true);                           // 155
            return;                                                                                                // 156
        }                                                                                                          // 157
        tempalteInstance.$("#at-field-" + this._id).val(value);                                                    // 158
    };                                                                                                             // 159
                                                                                                                   // 160
Field.prototype.validate = function(value, strict) {                                                               // 161
    check(value, Match.OneOf(undefined, String, Boolean));                                                         // 162
    this.setValidating(true);                                                                                      // 163
    this.clearStatus();                                                                                            // 164
    if (value === undefined || value === ''){                                                                      // 165
        if (!!strict){                                                                                             // 166
            if (this.required) {                                                                                   // 167
                this.setError("Required Field");                                                                   // 168
                this.setValidating(false);                                                                         // 169
                return "Required Field";                                                                           // 170
            }                                                                                                      // 171
            else {                                                                                                 // 172
                this.setSuccess();                                                                                 // 173
                this.setValidating(false);                                                                         // 174
                return false;                                                                                      // 175
            }                                                                                                      // 176
        }                                                                                                          // 177
        else {                                                                                                     // 178
            this.clearStatus();                                                                                    // 179
            this.setValidating(false);                                                                             // 180
            return null;                                                                                           // 181
        }                                                                                                          // 182
    }                                                                                                              // 183
    var valueLength = value.length;                                                                                // 184
    var minLength = this.minLength;                                                                                // 185
    if (minLength && valueLength < minLength) {                                                                    // 186
        this.setError("Minimum required length: " + minLength);                                                    // 187
        this.setValidating(false);                                                                                 // 188
        return "Minimum required length: " + minLength;                                                            // 189
    }                                                                                                              // 190
    var maxLength = this.maxLength;                                                                                // 191
    if (maxLength && valueLength > maxLength) {                                                                    // 192
        this.setError("Maximum allowed length: " + maxLength);                                                     // 193
        this.setValidating(false);                                                                                 // 194
        return "Maximum allowed length: " + maxLength;                                                             // 195
    }                                                                                                              // 196
    if (this.re && valueLength && !value.match(this.re)) {                                                         // 197
        this.setError(this.errStr);                                                                                // 198
        this.setValidating(false);                                                                                 // 199
        return this.errStr;                                                                                        // 200
    }                                                                                                              // 201
    if (this.func){                                                                                                // 202
        var result = this.func(value);                                                                             // 203
        var err = result === true ? this.errStr || true : result;                                                  // 204
        if (result === undefined)                                                                                  // 205
            return err;                                                                                            // 206
        this.status.set(err);                                                                                      // 207
        this.setValidating(false);                                                                                 // 208
        return err;                                                                                                // 209
    }                                                                                                              // 210
    this.setSuccess();                                                                                             // 211
    this.setValidating(false);                                                                                     // 212
    return false;                                                                                                  // 213
};                                                                                                                 // 214
                                                                                                                   // 215
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/useraccounts:core/lib/core.js                                                                          //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
// ---------------------------------------------------------------------------------                               // 1
                                                                                                                   // 2
// Patterns for methods" parameters                                                                                // 3
                                                                                                                   // 4
// ---------------------------------------------------------------------------------                               // 5
                                                                                                                   // 6
STATE_PAT = {                                                                                                      // 7
    changePwd: Match.Optional(String),                                                                             // 8
    enrollAccount: Match.Optional(String),                                                                         // 9
    forgotPwd: Match.Optional(String),                                                                             // 10
    resetPwd: Match.Optional(String),                                                                              // 11
    signIn: Match.Optional(String),                                                                                // 12
    signUp: Match.Optional(String),                                                                                // 13
    verifyEmail: Match.Optional(String),                                                                           // 14
    resendVerificationEmail: Match.Optional(String),                                                               // 15
};                                                                                                                 // 16
                                                                                                                   // 17
ERRORS_PAT = {                                                                                                     // 18
    accountsCreationDisabled: Match.Optional(String),                                                              // 19
    cannotRemoveService: Match.Optional(String),                                                                   // 20
    captchaVerification: Match.Optional(String),                                                                   // 21
    loginForbidden: Match.Optional(String),                                                                        // 22
    mustBeLoggedIn: Match.Optional(String),                                                                        // 23
    pwdMismatch: Match.Optional(String),                                                                           // 24
    validationErrors: Match.Optional(String),                                                                      // 25
    verifyEmailFirst: Match.Optional(String),                                                                      // 26
};                                                                                                                 // 27
                                                                                                                   // 28
INFO_PAT = {                                                                                                       // 29
    emailSent: Match.Optional(String),                                                                             // 30
    emailVerified: Match.Optional(String),                                                                         // 31
    pwdChanged: Match.Optional(String),                                                                            // 32
    pwdReset: Match.Optional(String),                                                                              // 33
    pwdSet: Match.Optional(String),                                                                                // 34
    signUpVerifyEmail: Match.Optional(String),                                                                     // 35
    verificationEmailSent: Match.Optional(String),                                                                 // 36
};                                                                                                                 // 37
                                                                                                                   // 38
INPUT_ICONS_PAT = {                                                                                                // 39
    hasError: Match.Optional(String),                                                                              // 40
    hasSuccess: Match.Optional(String),                                                                            // 41
    isValidating: Match.Optional(String),                                                                          // 42
};                                                                                                                 // 43
                                                                                                                   // 44
ObjWithStringValues = Match.Where(function (x) {                                                                   // 45
    check(x, Object);                                                                                              // 46
    _.each(_.values(x), function(value){                                                                           // 47
        check(value, String);                                                                                      // 48
    });                                                                                                            // 49
    return true;                                                                                                   // 50
});                                                                                                                // 51
                                                                                                                   // 52
TEXTS_PAT = {                                                                                                      // 53
    button: Match.Optional(STATE_PAT),                                                                             // 54
    errors: Match.Optional(ERRORS_PAT),                                                                            // 55
    info: Match.Optional(INFO_PAT),                                                                                // 56
    inputIcons: Match.Optional(INPUT_ICONS_PAT),                                                                   // 57
    navSignIn: Match.Optional(String),                                                                             // 58
    navSignOut: Match.Optional(String),                                                                            // 59
    optionalField: Match.Optional(String),                                                                         // 60
    pwdLink_link: Match.Optional(String),                                                                          // 61
    pwdLink_pre: Match.Optional(String),                                                                           // 62
    pwdLink_suff: Match.Optional(String),                                                                          // 63
    sep: Match.Optional(String),                                                                                   // 64
    signInLink_link: Match.Optional(String),                                                                       // 65
    signInLink_pre: Match.Optional(String),                                                                        // 66
    signInLink_suff: Match.Optional(String),                                                                       // 67
    signUpLink_link: Match.Optional(String),                                                                       // 68
    signUpLink_pre: Match.Optional(String),                                                                        // 69
    signUpLink_suff: Match.Optional(String),                                                                       // 70
    socialAdd: Match.Optional(String),                                                                             // 71
    socialConfigure: Match.Optional(String),                                                                       // 72
    socialIcons: Match.Optional(ObjWithStringValues),                                                              // 73
    socialRemove: Match.Optional(String),                                                                          // 74
    socialSignIn: Match.Optional(String),                                                                          // 75
    socialSignUp: Match.Optional(String),                                                                          // 76
    socialWith: Match.Optional(String),                                                                            // 77
    termsAnd: Match.Optional(String),                                                                              // 78
    termsPreamble: Match.Optional(String),                                                                         // 79
    termsPrivacy: Match.Optional(String),                                                                          // 80
    termsTerms: Match.Optional(String),                                                                            // 81
    title: Match.Optional(STATE_PAT),                                                                              // 82
};                                                                                                                 // 83
                                                                                                                   // 84
// Configuration pattern to be checked with check                                                                  // 85
CONFIG_PAT = {                                                                                                     // 86
    // Behaviour                                                                                                   // 87
    confirmPassword: Match.Optional(Boolean),                                                                      // 88
    defaultState: Match.Optional(String),                                                                          // 89
    enablePasswordChange: Match.Optional(Boolean),                                                                 // 90
    enforceEmailVerification: Match.Optional(Boolean),                                                             // 91
    forbidClientAccountCreation: Match.Optional(Boolean),                                                          // 92
    lowercaseUsername: Match.Optional(Boolean),                                                                    // 93
    overrideLoginErrors: Match.Optional(Boolean),                                                                  // 94
    sendVerificationEmail: Match.Optional(Boolean),                                                                // 95
    socialLoginStyle: Match.Optional(Match.OneOf("popup", "redirect")),                                            // 96
                                                                                                                   // 97
    // Appearance                                                                                                  // 98
    defaultLayout: Match.Optional(String),                                                                         // 99
    hideSignInLink: Match.Optional(Boolean),                                                                       // 100
    hideSignUpLink: Match.Optional(Boolean),                                                                       // 101
    showAddRemoveServices: Match.Optional(Boolean),                                                                // 102
    showForgotPasswordLink: Match.Optional(Boolean),                                                               // 103
    showResendVerificationEmailLink: Match.Optional(Boolean),                                                      // 104
    showLabels: Match.Optional(Boolean),                                                                           // 105
    showPlaceholders: Match.Optional(Boolean),                                                                     // 106
                                                                                                                   // 107
    // Client-side Validation                                                                                      // 108
    continuousValidation: Match.Optional(Boolean),                                                                 // 109
    negativeFeedback: Match.Optional(Boolean),                                                                     // 110
    negativeValidation: Match.Optional(Boolean),                                                                   // 111
    positiveFeedback: Match.Optional(Boolean),                                                                     // 112
    positiveValidation: Match.Optional(Boolean),                                                                   // 113
    showValidating: Match.Optional(Boolean),                                                                       // 114
                                                                                                                   // 115
    // Privacy Policy and Terms of Use                                                                             // 116
    privacyUrl: Match.Optional(String),                                                                            // 117
    termsUrl: Match.Optional(String),                                                                              // 118
                                                                                                                   // 119
    // Redirects                                                                                                   // 120
    homeRoutePath: Match.Optional(String),                                                                         // 121
    redirectTimeout: Match.Optional(Number),                                                                       // 122
                                                                                                                   // 123
    // Hooks                                                                                                       // 124
    onLogoutHook: Match.Optional(Function),                                                                        // 125
    onSubmitHook: Match.Optional(Function),                                                                        // 126
                                                                                                                   // 127
    texts: Match.Optional(TEXTS_PAT),                                                                              // 128
                                                                                                                   // 129
    //reCaptcha config                                                                                             // 130
    reCaptcha: Match.Optional({                                                                                    // 131
        data_type: Match.Optional(Match.OneOf("audio", "image")),                                                  // 132
        secretKey: Match.Optional(String),                                                                         // 133
        siteKey: Match.Optional(String),                                                                           // 134
        theme: Match.Optional(Match.OneOf("dark", "light")),                                                       // 135
    }),                                                                                                            // 136
                                                                                                                   // 137
    showReCaptcha: Match.Optional(Boolean),                                                                        // 138
};                                                                                                                 // 139
                                                                                                                   // 140
                                                                                                                   // 141
FIELD_SUB_PAT = {                                                                                                  // 142
    "default": Match.Optional(String),                                                                             // 143
    changePwd: Match.Optional(String),                                                                             // 144
    enrollAccount: Match.Optional(String),                                                                         // 145
    forgotPwd: Match.Optional(String),                                                                             // 146
    resetPwd: Match.Optional(String),                                                                              // 147
    signIn: Match.Optional(String),                                                                                // 148
    signUp: Match.Optional(String),                                                                                // 149
};                                                                                                                 // 150
                                                                                                                   // 151
                                                                                                                   // 152
// Field pattern                                                                                                   // 153
FIELD_PAT = {                                                                                                      // 154
    _id: String,                                                                                                   // 155
    type: String,                                                                                                  // 156
    required: Match.Optional(Boolean),                                                                             // 157
    displayName: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                               // 158
    placeholder: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                               // 159
    select: Match.Optional([{text: String, value: Match.Any}]),                                                    // 160
    minLength: Match.Optional(Match.Integer),                                                                      // 161
    maxLength: Match.Optional(Match.Integer),                                                                      // 162
    re: Match.Optional(RegExp),                                                                                    // 163
    func: Match.Optional(Match.Where(_.isFunction)),                                                               // 164
    errStr: Match.Optional(String),                                                                                // 165
                                                                                                                   // 166
    // Client-side Validation                                                                                      // 167
    continuousValidation: Match.Optional(Boolean),                                                                 // 168
    negativeFeedback: Match.Optional(Boolean),                                                                     // 169
    negativeValidation: Match.Optional(Boolean),                                                                   // 170
    positiveValidation: Match.Optional(Boolean),                                                                   // 171
    positiveFeedback: Match.Optional(Boolean),                                                                     // 172
                                                                                                                   // 173
    // Transforms                                                                                                  // 174
    trim: Match.Optional(Boolean),                                                                                 // 175
    lowercase: Match.Optional(Boolean),                                                                            // 176
    uppercase: Match.Optional(Boolean),                                                                            // 177
    transform: Match.Optional(Match.Where(_.isFunction)),                                                          // 178
                                                                                                                   // 179
    // Custom options                                                                                              // 180
    options: Match.Optional(Object),                                                                               // 181
    template: Match.Optional(String),                                                                              // 182
};                                                                                                                 // 183
                                                                                                                   // 184
// Route configuration pattern to be checked with check                                                            // 185
var ROUTE_PAT = {                                                                                                  // 186
    name: Match.Optional(String),                                                                                  // 187
    path: Match.Optional(String),                                                                                  // 188
    template: Match.Optional(String),                                                                              // 189
    layoutTemplate: Match.Optional(String),                                                                        // 190
    redirect: Match.Optional(Match.OneOf(String, Match.Where(_.isFunction))),                                      // 191
};                                                                                                                 // 192
                                                                                                                   // 193
                                                                                                                   // 194
// -----------------------------------------------------------------------------                                   // 195
                                                                                                                   // 196
// AccountsTemplates object                                                                                        // 197
                                                                                                                   // 198
// -----------------------------------------------------------------------------                                   // 199
                                                                                                                   // 200
                                                                                                                   // 201
                                                                                                                   // 202
// -------------------                                                                                             // 203
// Client/Server stuff                                                                                             // 204
// -------------------                                                                                             // 205
                                                                                                                   // 206
// Constructor                                                                                                     // 207
AT = function() {                                                                                                  // 208
                                                                                                                   // 209
};                                                                                                                 // 210
                                                                                                                   // 211
                                                                                                                   // 212
                                                                                                                   // 213
                                                                                                                   // 214
/*                                                                                                                 // 215
    Each field object is represented by the following properties:                                                  // 216
        _id:         String   (required)  // A unique field"s id / name                                            // 217
        type:        String   (required)  // Displayed input type                                                  // 218
        required:    Boolean  (optional)  // Specifies Whether to fail or not when field is left empty             // 219
        displayName: String   (optional)  // The field"s name to be displayed as a label above the input element   // 220
        placeholder: String   (optional)  // The placeholder text to be displayed inside the input element         // 221
        minLength:   Integer  (optional)  // Possibly specifies the minimum allowed length                         // 222
        maxLength:   Integer  (optional)  // Possibly specifies the maximum allowed length                         // 223
        re:          RegExp   (optional)  // Regular expression for validation                                     // 224
        func:        Function (optional)  // Custom function for validation                                        // 225
        errStr:      String   (optional)  // Error message to be displayed in case re validation fails             // 226
*/                                                                                                                 // 227
                                                                                                                   // 228
                                                                                                                   // 229
                                                                                                                   // 230
/*                                                                                                                 // 231
    Routes configuration can be done by calling AccountsTemplates.configureRoute with the route name and the       // 232
    following options in a separate object. E.g. AccountsTemplates.configureRoute("gingIn", option);               // 233
        name:           String (optional). A unique route"s name to be passed to iron-router                       // 234
        path:           String (optional). A unique route"s path to be passed to iron-router                       // 235
        template:       String (optional). The name of the template to be rendered                                 // 236
        layoutTemplate: String (optional). The name of the layout to be used                                       // 237
        redirect:       String (optional). The name of the route (or its path) where to redirect after form submit // 238
*/                                                                                                                 // 239
                                                                                                                   // 240
                                                                                                                   // 241
// Allowed routes along with theirs default configuration values                                                   // 242
AT.prototype.ROUTE_DEFAULT = {                                                                                     // 243
    changePwd:      { name: "atChangePwd",      path: "/change-password"},                                         // 244
    enrollAccount:  { name: "atEnrollAccount",  path: "/enroll-account"},                                          // 245
    ensureSignedIn: { name: "atEnsureSignedIn", path: null},                                                       // 246
    forgotPwd:      { name: "atForgotPwd",      path: "/forgot-password"},                                         // 247
    resetPwd:       { name: "atResetPwd",       path: "/reset-password"},                                          // 248
    signIn:         { name: "atSignIn",         path: "/sign-in"},                                                 // 249
    signUp:         { name: "atSignUp",         path: "/sign-up"},                                                 // 250
    verifyEmail:    { name: "atVerifyEmail",    path: "/verify-email"},                                            // 251
    resendVerificationEmail: { name: "atResendVerificationEmail", path: "/send-again"},                            // 252
};                                                                                                                 // 253
                                                                                                                   // 254
                                                                                                                   // 255
                                                                                                                   // 256
// Allowed input types                                                                                             // 257
AT.prototype.INPUT_TYPES = [                                                                                       // 258
    "checkbox",                                                                                                    // 259
    "email",                                                                                                       // 260
    "hidden",                                                                                                      // 261
    "password",                                                                                                    // 262
    "radio",                                                                                                       // 263
    "select",                                                                                                      // 264
    "tel",                                                                                                         // 265
    "text",                                                                                                        // 266
    "url",                                                                                                         // 267
];                                                                                                                 // 268
                                                                                                                   // 269
// Current configuration values                                                                                    // 270
AT.prototype.options = {                                                                                           // 271
    // Appearance                                                                                                  // 272
    //defaultLayout: undefined,                                                                                    // 273
    showAddRemoveServices: false,                                                                                  // 274
    showForgotPasswordLink: false,                                                                                 // 275
    showResendVerificationEmailLink: false,                                                                        // 276
    showLabels: true,                                                                                              // 277
    showPlaceholders: true,                                                                                        // 278
                                                                                                                   // 279
    // Behaviour                                                                                                   // 280
    confirmPassword: true,                                                                                         // 281
    defaultState: "signIn",                                                                                        // 282
    enablePasswordChange: false,                                                                                   // 283
    forbidClientAccountCreation: false,                                                                            // 284
    lowercaseUsername: false,                                                                                      // 285
    overrideLoginErrors: true,                                                                                     // 286
    sendVerificationEmail: false,                                                                                  // 287
    socialLoginStyle: "popup",                                                                                     // 288
                                                                                                                   // 289
    // Client-side Validation                                                                                      // 290
    //continuousValidation: false,                                                                                 // 291
    //negativeFeedback: false,                                                                                     // 292
    //negativeValidation: false,                                                                                   // 293
    //positiveValidation: false,                                                                                   // 294
    //positiveFeedback: false,                                                                                     // 295
    //showValidating: false,                                                                                       // 296
                                                                                                                   // 297
    // Privacy Policy and Terms of Use                                                                             // 298
    privacyUrl: undefined,                                                                                         // 299
    termsUrl: undefined,                                                                                           // 300
                                                                                                                   // 301
    // Redirects                                                                                                   // 302
    homeRoutePath: "/",                                                                                            // 303
    redirectTimeout: 2000, // 2 seconds                                                                            // 304
                                                                                                                   // 305
    // Hooks                                                                                                       // 306
    onSubmitHook: undefined,                                                                                       // 307
};                                                                                                                 // 308
                                                                                                                   // 309
AT.prototype.texts = {                                                                                             // 310
    button: {                                                                                                      // 311
        changePwd: "updateYourPassword",                                                                           // 312
        //enrollAccount: "createAccount",                                                                          // 313
        enrollAccount: "signUp",                                                                                   // 314
        forgotPwd: "emailResetLink",                                                                               // 315
        resetPwd: "setPassword",                                                                                   // 316
        signIn: "signIn",                                                                                          // 317
        signUp: "signUp",                                                                                          // 318
        resendVerificationEmail: "Send email again",                                                               // 319
    },                                                                                                             // 320
    errors: {                                                                                                      // 321
        accountsCreationDisabled: "Client side accounts creation is disabled!!!",                                  // 322
        cannotRemoveService: "Cannot remove the only active service!",                                             // 323
        captchaVerification: "Captcha verification failed!",                                                       // 324
        loginForbidden: "error.accounts.Login forbidden",                                                          // 325
        mustBeLoggedIn: "error.accounts.Must be logged in",                                                        // 326
        pwdMismatch: "error.pwdsDontMatch",                                                                        // 327
        validationErrors: "Validation Errors",                                                                     // 328
        verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",                  // 329
    },                                                                                                             // 330
    navSignIn: 'signIn',                                                                                           // 331
    navSignOut: 'signOut',                                                                                         // 332
    info: {                                                                                                        // 333
        emailSent: "info.emailSent",                                                                               // 334
        emailVerified: "info.emailVerified",                                                                       // 335
        pwdChanged: "info.passwordChanged",                                                                        // 336
        pwdReset: "info.passwordReset",                                                                            // 337
        pwdSet: "Password Set",                                                                                    // 338
        signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",        // 339
        verificationEmailSent: "A new email has been sent to you. If the email doesn't show up in your inbox, be sure to check your spam folder.",
    },                                                                                                             // 341
    inputIcons: {                                                                                                  // 342
        isValidating: "fa fa-spinner fa-spin",                                                                     // 343
        hasSuccess: "fa fa-check",                                                                                 // 344
        hasError: "fa fa-times",                                                                                   // 345
    },                                                                                                             // 346
    optionalField: "optional",                                                                                     // 347
    pwdLink_pre: "",                                                                                               // 348
    pwdLink_link: "forgotPassword",                                                                                // 349
    pwdLink_suff: "",                                                                                              // 350
    resendVerificationEmailLink_pre: "Verification email lost?",                                                   // 351
    resendVerificationEmailLink_link: "Send again",                                                                // 352
    resendVerificationEmailLink_suff: "",                                                                          // 353
    sep: "OR",                                                                                                     // 354
    signInLink_pre: "ifYouAlreadyHaveAnAccount",                                                                   // 355
    signInLink_link: "signin",                                                                                     // 356
    signInLink_suff: "",                                                                                           // 357
    signUpLink_pre: "dontHaveAnAccount",                                                                           // 358
    signUpLink_link: "signUp",                                                                                     // 359
    signUpLink_suff: "",                                                                                           // 360
    socialAdd: "add",                                                                                              // 361
    socialConfigure: "configure",                                                                                  // 362
    socialIcons: {                                                                                                 // 363
        "meteor-developer": "fa fa-rocket"                                                                         // 364
    },                                                                                                             // 365
    socialRemove: "remove",                                                                                        // 366
    socialSignIn: "signIn",                                                                                        // 367
    socialSignUp: "signUp",                                                                                        // 368
    socialWith: "with",                                                                                            // 369
    termsPreamble: "clickAgree",                                                                                   // 370
    termsPrivacy: "privacyPolicy",                                                                                 // 371
    termsAnd: "and",                                                                                               // 372
    termsTerms: "terms",                                                                                           // 373
    title: {                                                                                                       // 374
        changePwd: "changePassword",                                                                               // 375
        enrollAccount: "createAccount",                                                                            // 376
        forgotPwd: "resetYourPassword",                                                                            // 377
        resetPwd: "resetYourPassword",                                                                             // 378
        signIn: "signIn",                                                                                          // 379
        signUp: "createAccount",                                                                                   // 380
        verifyEmail: "",                                                                                           // 381
        resendVerificationEmail: "Send the verification email again",                                              // 382
    },                                                                                                             // 383
};                                                                                                                 // 384
                                                                                                                   // 385
AT.prototype.SPECIAL_FIELDS = [                                                                                    // 386
    "password_again",                                                                                              // 387
    "username_and_email",                                                                                          // 388
];                                                                                                                 // 389
                                                                                                                   // 390
// SignIn / SignUp fields                                                                                          // 391
AT.prototype._fields = [                                                                                           // 392
    new Field({                                                                                                    // 393
        _id: "email",                                                                                              // 394
        type: "email",                                                                                             // 395
        required: true,                                                                                            // 396
        lowercase: true,                                                                                           // 397
        trim: true,                                                                                                // 398
        func: function(email){                                                                                     // 399
            return !_.contains(email, '@');                                                                        // 400
        },                                                                                                         // 401
        errStr: 'Invalid email',                                                                                   // 402
    }),                                                                                                            // 403
    new Field({                                                                                                    // 404
        _id: "password",                                                                                           // 405
        type: "password",                                                                                          // 406
        required: true,                                                                                            // 407
        minLength: 6,                                                                                              // 408
        displayName: {                                                                                             // 409
            "default": "password",                                                                                 // 410
            changePwd: "newPassword",                                                                              // 411
            resetPwd: "newPassword",                                                                               // 412
        },                                                                                                         // 413
        placeholder: {                                                                                             // 414
            "default": "password",                                                                                 // 415
            changePwd: "newPassword",                                                                              // 416
            resetPwd: "newPassword",                                                                               // 417
        },                                                                                                         // 418
    }),                                                                                                            // 419
];                                                                                                                 // 420
                                                                                                                   // 421
// Configured routes                                                                                               // 422
AT.prototype.routes = {};                                                                                          // 423
                                                                                                                   // 424
AT.prototype._initialized = false;                                                                                 // 425
                                                                                                                   // 426
// Input type validation                                                                                           // 427
AT.prototype._isValidInputType = function(value) {                                                                 // 428
    return _.indexOf(this.INPUT_TYPES, value) !== -1;                                                              // 429
};                                                                                                                 // 430
                                                                                                                   // 431
AT.prototype.addField = function(field) {                                                                          // 432
    // Fields can be added only before initialization                                                              // 433
    if (this._initialized)                                                                                         // 434
        throw new Error("AccountsTemplates.addField should strictly be called before AccountsTemplates.init!");    // 435
    field = _.pick(field, _.keys(FIELD_PAT));                                                                      // 436
    check(field, FIELD_PAT);                                                                                       // 437
    // Checks there"s currently no field called field._id                                                          // 438
    if (_.indexOf(_.pluck(this._fields, "_id"), field._id) !== -1)                                                 // 439
        throw new Error("A field called " + field._id + " already exists!");                                       // 440
    // Validates field.type                                                                                        // 441
    if (!this._isValidInputType(field.type))                                                                       // 442
        throw new Error("field.type is not valid!");                                                               // 443
    // Checks field.minLength is strictly positive                                                                 // 444
    if (typeof field.minLength !== "undefined" && field.minLength <= 0)                                            // 445
        throw new Error("field.minLength should be greater than zero!");                                           // 446
    // Checks field.maxLength is strictly positive                                                                 // 447
    if (typeof field.maxLength !== "undefined" && field.maxLength <= 0)                                            // 448
        throw new Error("field.maxLength should be greater than zero!");                                           // 449
    // Checks field.maxLength is greater than field.minLength                                                      // 450
    if (typeof field.minLength !== "undefined" && typeof field.minLength !== "undefined" && field.maxLength < field.minLength)
        throw new Error("field.maxLength should be greater than field.maxLength!");                                // 452
                                                                                                                   // 453
    if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, field._id)))                                          // 454
        this._fields.push(new Field(field));                                                                       // 455
    return this._fields;                                                                                           // 456
};                                                                                                                 // 457
                                                                                                                   // 458
AT.prototype.addFields = function(fields) {                                                                        // 459
    var ok;                                                                                                        // 460
    try { // don"t bother with `typeof` - just access `length` and `catch`                                         // 461
        ok = fields.length > 0 && "0" in Object(fields);                                                           // 462
    } catch (e) {                                                                                                  // 463
        throw new Error("field argument should be an array of valid field objects!");                              // 464
    }                                                                                                              // 465
    if (ok) {                                                                                                      // 466
        _.map(fields, function(field){                                                                             // 467
            this.addField(field);                                                                                  // 468
        }, this);                                                                                                  // 469
    } else                                                                                                         // 470
        throw new Error("field argument should be an array of valid field objects!");                              // 471
    return this._fields;                                                                                           // 472
};                                                                                                                 // 473
                                                                                                                   // 474
AT.prototype.configure = function(config) {                                                                        // 475
    // Configuration options can be set only before initialization                                                 // 476
    if (this._initialized)                                                                                         // 477
        throw new Error("Configuration options must be set before AccountsTemplates.init!");                       // 478
                                                                                                                   // 479
    // Updates the current configuration                                                                           // 480
    check(config, CONFIG_PAT);                                                                                     // 481
    var options = _.omit(config, "texts", "reCaptcha");                                                            // 482
    this.options = _.defaults(options, this.options);                                                              // 483
                                                                                                                   // 484
    // Possibly sets up reCaptcha options                                                                          // 485
    var reCaptcha = config.reCaptcha;                                                                              // 486
    if (reCaptcha) {                                                                                               // 487
        // Updates the current button object                                                                       // 488
        this.options.reCaptcha = _.defaults(reCaptcha, this.options.reCaptcha || {});                              // 489
    }                                                                                                              // 490
                                                                                                                   // 491
    // Possibly sets up texts...                                                                                   // 492
    if (config.texts){                                                                                             // 493
        var texts = config.texts;                                                                                  // 494
        var simpleTexts = _.omit(texts, "button", "errors", "info", "inputIcons", "socialIcons", "title");         // 495
        this.texts = _.defaults(simpleTexts, this.texts);                                                          // 496
                                                                                                                   // 497
        if (texts.button) {                                                                                        // 498
            // Updates the current button object                                                                   // 499
            this.texts.button = _.defaults(texts.button, this.texts.button);                                       // 500
        }                                                                                                          // 501
        if (texts.errors) {                                                                                        // 502
            // Updates the current errors object                                                                   // 503
            this.texts.errors = _.defaults(texts.errors, this.texts.errors);                                       // 504
        }                                                                                                          // 505
        if (texts.info) {                                                                                          // 506
            // Updates the current info object                                                                     // 507
            this.texts.info = _.defaults(texts.info, this.texts.info);                                             // 508
        }                                                                                                          // 509
        if (texts.inputIcons) {                                                                                    // 510
            // Updates the current inputIcons object                                                               // 511
            this.texts.inputIcons = _.defaults(texts.inputIcons, this.texts.inputIcons);                           // 512
        }                                                                                                          // 513
        if (texts.socialIcons) {                                                                                   // 514
            // Updates the current socialIcons object                                                              // 515
            this.texts.socialIcons = _.defaults(texts.socialIcons, this.texts.socialIcons);                        // 516
        }                                                                                                          // 517
        if (texts.title) {                                                                                         // 518
            // Updates the current title object                                                                    // 519
            this.texts.title = _.defaults(texts.title, this.texts.title);                                          // 520
        }                                                                                                          // 521
    }                                                                                                              // 522
};                                                                                                                 // 523
                                                                                                                   // 524
AT.prototype.configureRoute = function(route, options) {                                                           // 525
    check(route, String);                                                                                          // 526
    check(options, Match.OneOf(undefined, ROUTE_PAT));                                                             // 527
    options = _.clone(options);                                                                                    // 528
    // Route Configuration can be done only before initialization                                                  // 529
    if (this._initialized)                                                                                         // 530
        throw new Error("Route Configuration can be done only before AccountsTemplates.init!");                    // 531
    // Only allowed routes can be configured                                                                       // 532
    if (!(route in this.ROUTE_DEFAULT))                                                                            // 533
        throw new Error("Unknown Route!");                                                                         // 534
                                                                                                                   // 535
    // Possibly adds a initial / to the provided path                                                              // 536
    if (options && options.path && options.path[0] !== "/")                                                        // 537
        options.path = "/" + options.path;                                                                         // 538
    // Updates the current configuration                                                                           // 539
    options = _.defaults(options || {}, this.ROUTE_DEFAULT[route]);                                                // 540
    this.routes[route] = options;                                                                                  // 541
};                                                                                                                 // 542
                                                                                                                   // 543
AT.prototype.hasField = function(fieldId) {                                                                        // 544
    return !!this.getField(fieldId);                                                                               // 545
};                                                                                                                 // 546
                                                                                                                   // 547
AT.prototype.getField = function(fieldId) {                                                                        // 548
    var field = _.filter(this._fields, function(field){                                                            // 549
        return field._id == fieldId;                                                                               // 550
    });                                                                                                            // 551
    return (field.length === 1) ? field[0] : undefined;                                                            // 552
};                                                                                                                 // 553
                                                                                                                   // 554
AT.prototype.getFields = function() {                                                                              // 555
    return this._fields;                                                                                           // 556
};                                                                                                                 // 557
                                                                                                                   // 558
AT.prototype.getFieldIds = function() {                                                                            // 559
    return _.pluck(this._fields, "_id");                                                                           // 560
};                                                                                                                 // 561
                                                                                                                   // 562
AT.prototype.getRouteName = function(route) {                                                                      // 563
    if (route in this.routes)                                                                                      // 564
        return this.routes[route].name;                                                                            // 565
    return null;                                                                                                   // 566
};                                                                                                                 // 567
                                                                                                                   // 568
AT.prototype.getRoutePath = function(route) {                                                                      // 569
    if (route in this.routes)                                                                                      // 570
        return this.routes[route].path;                                                                            // 571
    return "#";                                                                                                    // 572
};                                                                                                                 // 573
                                                                                                                   // 574
AT.prototype.oauthServices = function(){                                                                           // 575
    // Extracts names of available services                                                                        // 576
    var names;                                                                                                     // 577
    if (Meteor.isServer)                                                                                           // 578
        names = (Accounts.oauth && Accounts.oauth.serviceNames()) || [];                                           // 579
    else                                                                                                           // 580
        names = (Accounts.oauth && Accounts.loginServicesConfigured() && Accounts.oauth.serviceNames()) || [];     // 581
    // Extracts names of configured services                                                                       // 582
    var configuredServices = [];                                                                                   // 583
    if (Accounts.loginServiceConfiguration)                                                                        // 584
        configuredServices = _.pluck(Accounts.loginServiceConfiguration.find().fetch(), "service");                // 585
                                                                                                                   // 586
    // Builds a list of objects containing service name as _id and its configuration status                        // 587
    var services = _.map(names, function(name){                                                                    // 588
        return {                                                                                                   // 589
            _id : name,                                                                                            // 590
            configured: _.contains(configuredServices, name),                                                      // 591
        };                                                                                                         // 592
    });                                                                                                            // 593
                                                                                                                   // 594
    // Checks whether there is a UI to configure services...                                                       // 595
    // XXX: this only works with the accounts-ui package                                                           // 596
    var showUnconfigured = typeof Accounts._loginButtonsSession !== "undefined";                                   // 597
                                                                                                                   // 598
    // Filters out unconfigured services in case they"re not to be displayed                                       // 599
    if (!showUnconfigured){                                                                                        // 600
        services = _.filter(services, function(service){                                                           // 601
            return service.configured;                                                                             // 602
        });                                                                                                        // 603
    }                                                                                                              // 604
                                                                                                                   // 605
    // Sorts services by name                                                                                      // 606
    services = _.sortBy(services, function(service){                                                               // 607
        return service._id;                                                                                        // 608
    });                                                                                                            // 609
                                                                                                                   // 610
    return services;                                                                                               // 611
};                                                                                                                 // 612
                                                                                                                   // 613
AT.prototype.removeField = function(fieldId) {                                                                     // 614
    // Fields can be removed only before initialization                                                            // 615
    if (this._initialized)                                                                                         // 616
        throw new Error("AccountsTemplates.removeField should strictly be called before AccountsTemplates.init!"); // 617
    // Tries to look up the field with given _id                                                                   // 618
    var index = _.indexOf(_.pluck(this._fields, "_id"), fieldId);                                                  // 619
    if (index !== -1)                                                                                              // 620
        return this._fields.splice(index, 1)[0];                                                                   // 621
    else                                                                                                           // 622
        if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, fieldId)))                                        // 623
            throw new Error("A field called " + fieldId + " does not exist!");                                     // 624
};                                                                                                                 // 625
                                                                                                                   // 626
AT.prototype.setupRoutes = function() {                                                                            // 627
    if (Meteor.isServer){                                                                                          // 628
        // Possibly prints a warning in case showForgotPasswordLink is set to true but the route is not configured // 629
        if (AccountsTemplates.options.showForgotPasswordLink && !("forgotPwd" in  AccountsTemplates.routes))       // 630
            console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but forgotPwd route is not configured!");
        // Configures "reset password" email link                                                                  // 632
        if ("resetPwd" in AccountsTemplates.routes){                                                               // 633
            var resetPwdPath = AccountsTemplates.routes["resetPwd"].path.substr(1);                                // 634
            Accounts.urls.resetPassword = function(token){                                                         // 635
                return Meteor.absoluteUrl(resetPwdPath + "/" + token);                                             // 636
            };                                                                                                     // 637
        }                                                                                                          // 638
        // Configures "enroll account" email link                                                                  // 639
        if ("enrollAccount" in AccountsTemplates.routes){                                                          // 640
            var enrollAccountPath = AccountsTemplates.routes["enrollAccount"].path.substr(1);                      // 641
            Accounts.urls.enrollAccount = function(token){                                                         // 642
                return Meteor.absoluteUrl(enrollAccountPath + "/" + token);                                        // 643
            };                                                                                                     // 644
        }                                                                                                          // 645
        // Configures "verify email" email link                                                                    // 646
        if ("verifyEmail" in AccountsTemplates.routes){                                                            // 647
            var verifyEmailPath = AccountsTemplates.routes["verifyEmail"].path.substr(1);                          // 648
            Accounts.urls.verifyEmail = function(token){                                                           // 649
                return Meteor.absoluteUrl(verifyEmailPath + "/" + token);                                          // 650
            };                                                                                                     // 651
        }                                                                                                          // 652
    }                                                                                                              // 653
                                                                                                                   // 654
    // Determines the default layout to be used in case no specific one is specified for single routes             // 655
    var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                  // 656
                                                                                                                   // 657
    _.each(AccountsTemplates.routes, function(options, route){                                                     // 658
        if (route === "ensureSignedIn")                                                                            // 659
            return;                                                                                                // 660
        if (route === "changePwd" && !AccountsTemplates.options.enablePasswordChange)                              // 661
            throw new Error("changePwd route configured but enablePasswordChange set to false!");                  // 662
        if (route === "forgotPwd" && !AccountsTemplates.options.showForgotPasswordLink)                            // 663
            throw new Error("forgotPwd route configured but showForgotPasswordLink set to false!");                // 664
        if (route === "signUp" && AccountsTemplates.options.forbidClientAccountCreation)                           // 665
            throw new Error("signUp route configured but forbidClientAccountCreation set to true!");               // 666
        // Possibly prints a warning in case the MAIL_URL environment variable was not set                         // 667
        //if (Meteor.isServer && route === "forgotPwd" && (!process.env.MAIL_URL || ! Package["email"])){          // 668
        //    console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but MAIL_URL is not configured!");
        //}                                                                                                        // 670
                                                                                                                   // 671
        var name = options.name; // Default provided...                                                            // 672
        var path = options.path; // Default provided...                                                            // 673
        var template = options.template || "fullPageAtForm";                                                       // 674
        var layoutTemplate = options.layoutTemplate || defaultLayout;                                              // 675
                                                                                                                   // 676
        // Possibly adds token parameter                                                                           // 677
        if (_.contains(["enrollAccount", "resetPwd", "verifyEmail"], route)){                                      // 678
            path += "/:paramToken";                                                                                // 679
            if (route === "verifyEmail")                                                                           // 680
                Router.route(path, {                                                                               // 681
                    name: name,                                                                                    // 682
                    template: template,                                                                            // 683
                    layoutTemplate: layoutTemplate,                                                                // 684
                    onRun: function() {                                                                            // 685
                        AccountsTemplates.setState(route);                                                         // 686
                        AccountsTemplates.setDisabled(true);                                                       // 687
                        var token = this.params.paramToken;                                                        // 688
                        Accounts.verifyEmail(token, function(error){                                               // 689
                            AccountsTemplates.setDisabled(false);                                                  // 690
                            AccountsTemplates.submitCallback(error, route, function(){                             // 691
                                AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailVerified);
                            });                                                                                    // 693
                        });                                                                                        // 694
                                                                                                                   // 695
                        this.next();                                                                               // 696
                    },                                                                                             // 697
                    onStop: function() {                                                                           // 698
                        AccountsTemplates.clearState();                                                            // 699
                    },                                                                                             // 700
                });                                                                                                // 701
            else                                                                                                   // 702
                Router.route(path, {                                                                               // 703
                    name: name,                                                                                    // 704
                    template: template,                                                                            // 705
                    layoutTemplate: layoutTemplate,                                                                // 706
                    onRun: function() {                                                                            // 707
                        AccountsTemplates.paramToken = this.params.paramToken;                                     // 708
                        this.next();                                                                               // 709
                    },                                                                                             // 710
                    onBeforeAction: function() {                                                                   // 711
                        AccountsTemplates.setState(route);                                                         // 712
                        this.next();                                                                               // 713
                    },                                                                                             // 714
                    onStop: function() {                                                                           // 715
                        AccountsTemplates.clearState();                                                            // 716
                        AccountsTemplates.paramToken = null;                                                       // 717
                    }                                                                                              // 718
                });                                                                                                // 719
        }                                                                                                          // 720
        else                                                                                                       // 721
            Router.route(path, {                                                                                   // 722
                name: name,                                                                                        // 723
                template: template,                                                                                // 724
                layoutTemplate: layoutTemplate,                                                                    // 725
                onBeforeAction: function() {                                                                       // 726
                    var redirect = false;                                                                          // 727
                    if (route === 'changePwd') {                                                                   // 728
                      if (!Meteor.loggingIn() && !Meteor.userId()) {                                               // 729
                        redirect = true;                                                                           // 730
                      }                                                                                            // 731
                    }                                                                                              // 732
                    else if (Meteor.userId()) {                                                                    // 733
                        redirect = true;                                                                           // 734
                    }                                                                                              // 735
                    if (redirect) {                                                                                // 736
                        AccountsTemplates.postSubmitRedirect(route);                                               // 737
                        this.stop();                                                                               // 738
                    }                                                                                              // 739
                    else {                                                                                         // 740
                        AccountsTemplates.setState(route);                                                         // 741
                        this.next();                                                                               // 742
                    }                                                                                              // 743
                },                                                                                                 // 744
                onStop: function() {                                                                               // 745
                    AccountsTemplates.clearState();                                                                // 746
                }                                                                                                  // 747
            });                                                                                                    // 748
    });                                                                                                            // 749
};                                                                                                                 // 750
                                                                                                                   // 751
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/useraccounts:core/lib/server.js                                                                        //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
// Initialization                                                                                                  // 1
                                                                                                                   // 2
AT.prototype.init = function() {                                                                                   // 3
    console.warn("[AccountsTemplates] There is no more need to call AccountsTemplates.init()! Simply remove the call ;-)");
};                                                                                                                 // 5
                                                                                                                   // 6
AT.prototype._init = function() {                                                                                  // 7
    if (this._initialized)                                                                                         // 8
        return;                                                                                                    // 9
                                                                                                                   // 10
    // Checks there is at least one account service installed                                                      // 11
    if (!Package["accounts-password"] && (!Accounts.oauth || Accounts.oauth.serviceNames().length === 0))          // 12
        throw Error("AccountsTemplates: You must add at least one account service!");                              // 13
                                                                                                                   // 14
    // A password field is strictly required                                                                       // 15
    var password = this.getField("password");                                                                      // 16
    if (!password)                                                                                                 // 17
        throw Error("A password field is strictly required!");                                                     // 18
    if (password.type !== "password")                                                                              // 19
        throw Error("The type of password field should be password!");                                             // 20
                                                                                                                   // 21
    // Then we can have "username" or "email" or even both of them                                                 // 22
    // but at least one of the two is strictly required                                                            // 23
    var username = this.getField("username");                                                                      // 24
    var email = this.getField("email");                                                                            // 25
    if (!username && !email)                                                                                       // 26
        throw Error("At least one field out of username and email is strictly required!");                         // 27
    if (username && !username.required)                                                                            // 28
        throw Error("The username field should be required!");                                                     // 29
    if (email){                                                                                                    // 30
        if (email.type !== "email")                                                                                // 31
            throw Error("The type of email field should be email!");                                               // 32
        if (username){                                                                                             // 33
            // username and email                                                                                  // 34
            if (username.type !== "text")                                                                          // 35
                throw Error("The type of username field should be text when email field is present!");             // 36
        }else{                                                                                                     // 37
            // email only                                                                                          // 38
            if (!email.required)                                                                                   // 39
                throw Error("The email field should be required when username is not present!");                   // 40
        }                                                                                                          // 41
    }                                                                                                              // 42
    else{                                                                                                          // 43
        // username only                                                                                           // 44
        if (username.type !== "text" && username.type !== "tel")                                                   // 45
            throw Error("The type of username field should be text or tel!");                                      // 46
    }                                                                                                              // 47
                                                                                                                   // 48
    // Possibly publish more user data in order to be able to show add/remove                                      // 49
    // buttons for 3rd-party services                                                                              // 50
    if (this.options.showAddRemoveServices){                                                                       // 51
        // Publish additional current user info to get the list of registered services                             // 52
        // XXX TODO: use                                                                                           // 53
        // Accounts.addAutopublishFields({                                                                         // 54
        //   forLoggedInUser: ['services.facebook'],                                                               // 55
        //   forOtherUsers: [],                                                                                    // 56
        // })                                                                                                      // 57
        // ...adds only user.services.*.id                                                                         // 58
        Meteor.publish("userRegisteredServices", function() {                                                      // 59
            var userId = this.userId;                                                                              // 60
            return Meteor.users.find(userId, {fields: {services: 1}});                                             // 61
            /*                                                                                                     // 62
            if (userId){                                                                                           // 63
                var user = Meteor.users.findOne(userId);                                                           // 64
                var services_id = _.chain(user.services)                                                           // 65
                    .keys()                                                                                        // 66
                    .reject(function(service){return service === "resume";})                                       // 67
                    .map(function(service){return "services." + service + ".id";})                                 // 68
                    .value();                                                                                      // 69
                var projection = {};                                                                               // 70
                _.each(services_id, function(key){projection[key] = 1;});                                          // 71
                return Meteor.users.find(userId, {fields: projection});                                            // 72
            }                                                                                                      // 73
            */                                                                                                     // 74
        });                                                                                                        // 75
    }                                                                                                              // 76
                                                                                                                   // 77
    // Security stuff                                                                                              // 78
    if (this.options.overrideLoginErrors){                                                                         // 79
        Accounts.validateLoginAttempt(function(attempt){                                                           // 80
            if (attempt.error){                                                                                    // 81
                var reason = attempt.error.reason;                                                                 // 82
                if (reason === "User not found" || reason === "Incorrect password")                                // 83
                    throw new Meteor.Error(403, AccountsTemplates.texts.errors.loginForbidden);                    // 84
            }                                                                                                      // 85
            return attempt.allowed;                                                                                // 86
        });                                                                                                        // 87
    }                                                                                                              // 88
                                                                                                                   // 89
    if (this.options.sendVerificationEmail && this.options.enforceEmailVerification){                              // 90
        Accounts.validateLoginAttempt(function(info){                                                              // 91
            if (info.type !== "password" || info.methodName !== "login")                                           // 92
                return true;                                                                                       // 93
            var user = info.user;                                                                                  // 94
            if (!user)                                                                                             // 95
                return true;                                                                                       // 96
            var ok = true;                                                                                         // 97
            var loginEmail = info.methodArguments[0].user.email;                                                   // 98
            if (loginEmail){                                                                                       // 99
              var email = _.filter(user.emails, function(obj){                                                     // 100
                  return obj.address === loginEmail;                                                               // 101
              });                                                                                                  // 102
              if (!email.length || !email[0].verified)                                                             // 103
                  ok = false;                                                                                      // 104
            }                                                                                                      // 105
            else {                                                                                                 // 106
              // we got the username, lets check there's at lease one verified email                               // 107
              var emailVerified = _.chain(user.emails)                                                             // 108
                .pluck('verified')                                                                                 // 109
                .any()                                                                                             // 110
                .value();                                                                                          // 111
              if (!emailVerified)                                                                                  // 112
                ok = false;                                                                                        // 113
            }                                                                                                      // 114
            if (!ok)                                                                                               // 115
              throw new Meteor.Error(401, AccountsTemplates.texts.errors.verifyEmailFirst);                        // 116
            return true;                                                                                           // 117
        });                                                                                                        // 118
    }                                                                                                              // 119
                                                                                                                   // 120
    //Check that reCaptcha secret keys are available                                                               // 121
    if (this.options.showReCaptcha) {                                                                              // 122
        var atSecretKey = AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.secretKey;    // 123
        var settingsSecretKey = Meteor.settings.reCaptcha && Meteor.settings.reCaptcha.secretKey;                  // 124
                                                                                                                   // 125
        if (!atSecretKey && !settingsSecretKey) {                                                                  // 126
            throw new Meteor.Error(401, "User Accounts: reCaptcha secret key not found! Please provide it or set showReCaptcha to false." );
        }                                                                                                          // 128
    }                                                                                                              // 129
                                                                                                                   // 130
    // ------------                                                                                                // 131
    // Server-Side Routes Definition                                                                               // 132
    //                                                                                                             // 133
    //   this allows for server-side iron-router usage, like, e.g.                                                 // 134
    //   Router.map(function(){                                                                                    // 135
    //       this.route("fullPageSigninForm", {                                                                    // 136
    //           path: "*",                                                                                        // 137
    //           where: "server"                                                                                   // 138
    //           action: function() {                                                                              // 139
    //               this.response.statusCode = 404;                                                               // 140
    //               return this.response.end(Handlebars.templates["404"]());                                      // 141
    //           }                                                                                                 // 142
    //       });                                                                                                   // 143
    //   })                                                                                                        // 144
    // ------------                                                                                                // 145
    AccountsTemplates.setupRoutes();                                                                               // 146
                                                                                                                   // 147
    // Marks AccountsTemplates as initialized                                                                      // 148
    this._initialized = true;                                                                                      // 149
};                                                                                                                 // 150
                                                                                                                   // 151
                                                                                                                   // 152
// Fake server-side IR plugin to allow for shared routing files                                                    // 153
Iron.Router.plugins.ensureSignedIn = function (router, options) {};                                                // 154
                                                                                                                   // 155
                                                                                                                   // 156
AccountsTemplates = new AT();                                                                                      // 157
                                                                                                                   // 158
                                                                                                                   // 159
// Client side account creation is disabled by default:                                                            // 160
// the methos ATCreateUserServer is used instead!                                                                  // 161
// to actually disable client side account creation use:                                                           // 162
//                                                                                                                 // 163
//    AccountsTemplates.config({                                                                                   // 164
//        forbidClientAccountCreation: true                                                                        // 165
//    });                                                                                                          // 166
Accounts.config({                                                                                                  // 167
    forbidClientAccountCreation: true                                                                              // 168
});                                                                                                                // 169
                                                                                                                   // 170
                                                                                                                   // 171
// Initialization                                                                                                  // 172
Meteor.startup(function(){                                                                                         // 173
    AccountsTemplates._init();                                                                                     // 174
});                                                                                                                // 175
                                                                                                                   // 176
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/useraccounts:core/lib/methods.js                                                                       //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Meteor.methods({                                                                                                   // 2
    ATRemoveService: function(service_name){                                                                       // 3
        var userId = this.userId;                                                                                  // 4
        if (userId){                                                                                               // 5
            var user = Meteor.users.findOne(userId);                                                               // 6
            var numServices = _.keys(user.services).length; // including "resume"                                  // 7
            if (numServices === 2)                                                                                 // 8
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.cannotRemoveService, {});               // 9
            var unset = {};                                                                                        // 10
            unset["services." + service_name] = "";                                                                // 11
            Meteor.users.update(userId, {$unset: unset});                                                          // 12
        }                                                                                                          // 13
    },                                                                                                             // 14
});                                                                                                                // 15
                                                                                                                   // 16
                                                                                                                   // 17
if (Meteor.isServer) {                                                                                             // 18
    Meteor.methods({                                                                                               // 19
        ATCreateUserServer: function(options){                                                                     // 20
            if (AccountsTemplates.options.forbidClientAccountCreation)                                             // 21
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.accountsCreationDisabled);              // 22
            // createUser() does more checking.                                                                    // 23
            check(options, Object);                                                                                // 24
            var allFieldIds = AccountsTemplates.getFieldIds();                                                     // 25
            // Picks-up whitelisted fields for profile                                                             // 26
            var profile = options.profile;                                                                         // 27
            profile = _.pick(profile, allFieldIds);                                                                // 28
            profile = _.omit(profile, "username", "email", "password");                                            // 29
            // Validates fields" value                                                                             // 30
            var signupInfo = _.clone(profile);                                                                     // 31
            if (options.username) {                                                                                // 32
                signupInfo.username = options.username;                                                            // 33
                                                                                                                   // 34
                if (AccountsTemplates.options.lowercaseUsername) {                                                 // 35
                  signupInfo.username = signupInfo.username.trim().replace(/\s+/gm, ' ');                          // 36
                  options.profile.username = signupInfo.username;                                                  // 37
                  signupInfo.username = signupInfo.username.toLowerCase().replace(/\s+/gm, '');                    // 38
                  options.username = signupInfo.username                                                           // 39
                }                                                                                                  // 40
            }                                                                                                      // 41
            if (options.email) {                                                                                   // 42
                signupInfo.email = options.email;                                                                  // 43
                                                                                                                   // 44
                if (AccountsTemplates.options.lowercaseUsername) {                                                 // 45
                  signupInfo.email = signupInfo.email.toLowerCase().replace(/\s+/gm, '');                          // 46
                  options.email = signupInfo.email                                                                 // 47
                }                                                                                                  // 48
            }                                                                                                      // 49
            if (options.password)                                                                                  // 50
                signupInfo.password = options.password;                                                            // 51
            var validationErrors = {};                                                                             // 52
            var someError = false;                                                                                 // 53
                                                                                                                   // 54
            // Validates fields values                                                                             // 55
            _.each(AccountsTemplates.getFields(), function(field){                                                 // 56
                var fieldId = field._id;                                                                           // 57
                var value = signupInfo[fieldId];                                                                   // 58
                if (fieldId === "password"){                                                                       // 59
                    // Can"t Pick-up password here                                                                 // 60
                    // NOTE: at this stage the password is already encripted,                                      // 61
                    //       so there is no way to validate it!!!                                                  // 62
                    check(value, Object);                                                                          // 63
                    return;                                                                                        // 64
                }                                                                                                  // 65
                var validationErr = field.validate(value, "strict");                                               // 66
                if (validationErr) {                                                                               // 67
                    validationErrors[fieldId] = validationErr;                                                     // 68
                    someError = true;                                                                              // 69
                }                                                                                                  // 70
            });                                                                                                    // 71
                                                                                                                   // 72
            if (AccountsTemplates.options.showReCaptcha) {                                                         // 73
                var secretKey = null;                                                                              // 74
                                                                                                                   // 75
                if (AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.secretKey) {        // 76
                    secretKey = AccountsTemplates.options.reCaptcha.secretKey;                                     // 77
                }                                                                                                  // 78
                else {                                                                                             // 79
                    secretKey = Meteor.settings.reCaptcha.secretKey;                                               // 80
                }                                                                                                  // 81
                                                                                                                   // 82
                var apiResponse = HTTP.post("https://www.google.com/recaptcha/api/siteverify", {                   // 83
                  params: {                                                                                        // 84
                      secret: secretKey,                                                                           // 85
                      response: options.profile.reCaptchaResponse,                                                 // 86
                      remoteip: this.connection.clientAddress,                                                     // 87
                  }                                                                                                // 88
                }).data;                                                                                           // 89
                                                                                                                   // 90
                if (!apiResponse.success) {                                                                        // 91
                    throw new Meteor.Error(403, AccountsTemplates.texts.errors.captchaVerification,                // 92
                      apiResponse['error-codes'] ? apiResponse['error-codes'].join(", ") : "Unknown Error.");      // 93
                }                                                                                                  // 94
            }                                                                                                      // 95
                                                                                                                   // 96
            if (someError)                                                                                         // 97
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.validationErrors, validationErrors);    // 98
                                                                                                                   // 99
            // Possibly removes the profile field                                                                  // 100
            if (_.isEmpty(options.profile))                                                                        // 101
                delete options.profile;                                                                            // 102
                                                                                                                   // 103
            // Create user. result contains id and token.                                                          // 104
            var userId = Accounts.createUser(options);                                                             // 105
            // safety belt. createUser is supposed to throw on error. send 500 error                               // 106
            // instead of sending a verification email with empty userid.                                          // 107
            if (! userId)                                                                                          // 108
                throw new Error("createUser failed to insert new user");                                           // 109
                                                                                                                   // 110
            // Send a email address verification email in case the context permits it                              // 111
            // and the specific configuration flag was set to true                                                 // 112
            if (options.email && AccountsTemplates.options.sendVerificationEmail)                                  // 113
                Accounts.sendVerificationEmail(userId, options.email);                                             // 114
        },                                                                                                         // 115
                                                                                                                   // 116
        // Resend a user's verification e-mail                                                                     // 117
        ATResendVerificationEmail: function (email) {                                                              // 118
            check(email, String);                                                                                  // 119
                                                                                                                   // 120
            var user = Meteor.users.findOne({ "emails.address": email });                                          // 121
                                                                                                                   // 122
            // Send the standard error back to the client if no user exist with this e-mail                        // 123
            if (!user)                                                                                             // 124
                throw new Meteor.Error(403, "User not found");                                                     // 125
                                                                                                                   // 126
            try {                                                                                                  // 127
                Accounts.sendVerificationEmail(user._id);                                                          // 128
            }                                                                                                      // 129
            catch (error) {                                                                                        // 130
                // Handle error when email already verified                                                        // 131
                // https://github.com/dwinston/send-verification-email-bug                                         // 132
                throw new Meteor.Error(403, "Already verified");                                                   // 133
            }                                                                                                      // 134
        },                                                                                                         // 135
    });                                                                                                            // 136
}                                                                                                                  // 137
                                                                                                                   // 138
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['useraccounts:core'] = {
  AccountsTemplates: AccountsTemplates
};

})();

//# sourceMappingURL=useraccounts_core.js.map
