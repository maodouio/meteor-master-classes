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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/field.js                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// ---------------------------------------------------------------------------------                                // 1
                                                                                                                    // 2
// Field object                                                                                                     // 3
                                                                                                                    // 4
// ---------------------------------------------------------------------------------                                // 5
                                                                                                                    // 6
                                                                                                                    // 7
Field = function(field){                                                                                            // 8
    check(field, FIELD_PAT);                                                                                        // 9
    _.defaults(this, field);                                                                                        // 10
                                                                                                                    // 11
    this.validating = new ReactiveVar(false);                                                                       // 12
    this.status = new ReactiveVar(null);                                                                            // 13
};                                                                                                                  // 14
                                                                                                                    // 15
if (Meteor.isClient)                                                                                                // 16
    Field.prototype.clearStatus = function(){                                                                       // 17
        return this.status.set(null);                                                                               // 18
    };                                                                                                              // 19
if (Meteor.isServer)                                                                                                // 20
    Field.prototype.clearStatus = function(){                                                                       // 21
        // Nothing to do server-side                                                                                // 22
        return                                                                                                      // 23
    };                                                                                                              // 24
                                                                                                                    // 25
Field.prototype.fixValue = function(value){                                                                         // 26
    if (this.type === "checkbox")                                                                                   // 27
        return !!value;                                                                                             // 28
    if (this.type === "select")                                                                                     // 29
        // TODO: something working...                                                                               // 30
        return value;                                                                                               // 31
    if (this.type === "radio")                                                                                      // 32
        // TODO: something working...                                                                               // 33
        return value;                                                                                               // 34
    // Possibly applies required transformations to the input value                                                 // 35
    if (this.trim)                                                                                                  // 36
        value = value.trim();                                                                                       // 37
    if (this.lowercase)                                                                                             // 38
        value = value.toLowerCase();                                                                                // 39
    if (this.uppercase)                                                                                             // 40
        value = value.toUpperCase();                                                                                // 41
    if (!!this.transform)                                                                                           // 42
        value = this.transform(value);                                                                              // 43
    return value;                                                                                                   // 44
};                                                                                                                  // 45
                                                                                                                    // 46
if (Meteor.isClient)                                                                                                // 47
    Field.prototype.getDisplayName = function(state){                                                               // 48
        var dN = this.displayName;                                                                                  // 49
        if (_.isObject(dN))                                                                                         // 50
            dN = dN[state] || dN["default"];                                                                        // 51
        if (!dN)                                                                                                    // 52
            dN = capitalize(this._id);                                                                              // 53
        return dN;                                                                                                  // 54
    };                                                                                                              // 55
                                                                                                                    // 56
if (Meteor.isClient)                                                                                                // 57
    Field.prototype.getPlaceholder = function(state){                                                               // 58
        var placeholder = this.placeholder;                                                                         // 59
        if (_.isObject(placeholder))                                                                                // 60
            placeholder = placeholder[state] || placeholder["default"];                                             // 61
        if (!placeholder)                                                                                           // 62
            placeholder = capitalize(this._id);                                                                     // 63
        return placeholder;                                                                                         // 64
    };                                                                                                              // 65
                                                                                                                    // 66
Field.prototype.getStatus = function(){                                                                             // 67
    return this.status.get();                                                                                       // 68
};                                                                                                                  // 69
                                                                                                                    // 70
if (Meteor.isClient)                                                                                                // 71
    Field.prototype.getValue = function(tempalteInstance){                                                          // 72
        if (this.type === "checkbox")                                                                               // 73
            return !!(tempalteInstance.$("#at-field-" + this._id + ":checked").val());                              // 74
        if (this.type === "radio")                                                                                  // 75
            return tempalteInstance.$("[name=at-field-"+ this._id + "]:checked").val();                             // 76
        return tempalteInstance.$("#at-field-" + this._id).val();                                                   // 77
    };                                                                                                              // 78
                                                                                                                    // 79
if (Meteor.isClient)                                                                                                // 80
    Field.prototype.hasError = function() {                                                                         // 81
        return this.negativeValidation && this.status.get();                                                        // 82
    };                                                                                                              // 83
                                                                                                                    // 84
if (Meteor.isClient)                                                                                                // 85
    Field.prototype.hasIcon = function(){                                                                           // 86
        if (this.showValidating && this.isValidating())                                                             // 87
            return true;                                                                                            // 88
        if (this.negativeFeedback && this.hasError())                                                               // 89
            return true;                                                                                            // 90
        if (this.positiveFeedback && this.hasSuccess())                                                             // 91
            return true;                                                                                            // 92
    };                                                                                                              // 93
                                                                                                                    // 94
if (Meteor.isClient)                                                                                                // 95
    Field.prototype.hasSuccess = function() {                                                                       // 96
        return this.positiveValidation && this.status.get() === false;                                              // 97
    };                                                                                                              // 98
                                                                                                                    // 99
if (Meteor.isClient)                                                                                                // 100
    Field.prototype.iconClass = function(){                                                                         // 101
        if (this.isValidating())                                                                                    // 102
            return AccountsTemplates.texts.inputIcons["isValidating"];                                              // 103
        if (this.hasError())                                                                                        // 104
            return AccountsTemplates.texts.inputIcons["hasError"];                                                  // 105
        if (this.hasSuccess())                                                                                      // 106
            return AccountsTemplates.texts.inputIcons["hasSuccess"];                                                // 107
    };                                                                                                              // 108
                                                                                                                    // 109
if (Meteor.isClient)                                                                                                // 110
    Field.prototype.isValidating = function(){                                                                      // 111
        return this.validating.get();                                                                               // 112
    };                                                                                                              // 113
                                                                                                                    // 114
if (Meteor.isClient)                                                                                                // 115
    Field.prototype.setError = function(err){                                                                       // 116
        check(err, Match.OneOf(String, undefined));                                                                 // 117
        return this.status.set(err || true);                                                                        // 118
    };                                                                                                              // 119
if (Meteor.isServer)                                                                                                // 120
    Field.prototype.setError = function(err){                                                                       // 121
        // Nothing to do server-side                                                                                // 122
        return;                                                                                                     // 123
    };                                                                                                              // 124
                                                                                                                    // 125
if (Meteor.isClient)                                                                                                // 126
    Field.prototype.setSuccess = function(){                                                                        // 127
        return this.status.set(false);                                                                              // 128
    };                                                                                                              // 129
if (Meteor.isServer)                                                                                                // 130
    Field.prototype.setSuccess = function(){                                                                        // 131
        // Nothing to do server-side                                                                                // 132
        return;                                                                                                     // 133
    };                                                                                                              // 134
                                                                                                                    // 135
                                                                                                                    // 136
if (Meteor.isClient)                                                                                                // 137
    Field.prototype.setValidating = function(state){                                                                // 138
        check(state, Boolean);                                                                                      // 139
        return this.validating.set(state);                                                                          // 140
    };                                                                                                              // 141
if (Meteor.isServer)                                                                                                // 142
    Field.prototype.setValidating = function(state){                                                                // 143
        // Nothing to do server-side                                                                                // 144
        return;                                                                                                     // 145
    };                                                                                                              // 146
                                                                                                                    // 147
if (Meteor.isClient)                                                                                                // 148
    Field.prototype.setValue = function(tempalteInstance, value){                                                   // 149
        if (this.type === "checkbox") {                                                                             // 150
            tempalteInstance.$("#at-field-" + this._id).prop('checked', true);                                      // 151
            return;                                                                                                 // 152
        }                                                                                                           // 153
        if (this.type === "radio") {                                                                                // 154
            tempalteInstance.$("[name=at-field-"+ this._id + "]").prop('checked', true);                            // 155
            return;                                                                                                 // 156
        }                                                                                                           // 157
        tempalteInstance.$("#at-field-" + this._id).val(value);                                                     // 158
    };                                                                                                              // 159
                                                                                                                    // 160
Field.prototype.validate = function(value, strict) {                                                                // 161
    check(value, Match.OneOf(undefined, String, Boolean));                                                          // 162
    this.setValidating(true);                                                                                       // 163
    this.clearStatus();                                                                                             // 164
    if (value === undefined || value === ''){                                                                       // 165
        if (!!strict){                                                                                              // 166
            if (this.required) {                                                                                    // 167
                this.setError("Required Field");                                                                    // 168
                this.setValidating(false);                                                                          // 169
                return "Required Field";                                                                            // 170
            }                                                                                                       // 171
            else {                                                                                                  // 172
                this.setSuccess();                                                                                  // 173
                this.setValidating(false);                                                                          // 174
                return false;                                                                                       // 175
            }                                                                                                       // 176
        }                                                                                                           // 177
        else {                                                                                                      // 178
            this.clearStatus();                                                                                     // 179
            this.setValidating(false);                                                                              // 180
            return null;                                                                                            // 181
        }                                                                                                           // 182
    }                                                                                                               // 183
    var valueLength = value.length;                                                                                 // 184
    var minLength = this.minLength;                                                                                 // 185
    if (minLength && valueLength < minLength) {                                                                     // 186
        this.setError("Minimum required length: " + minLength);                                                     // 187
        this.setValidating(false);                                                                                  // 188
        return "Minimum required length: " + minLength;                                                             // 189
    }                                                                                                               // 190
    var maxLength = this.maxLength;                                                                                 // 191
    if (maxLength && valueLength > maxLength) {                                                                     // 192
        this.setError("Maximum allowed length: " + maxLength);                                                      // 193
        this.setValidating(false);                                                                                  // 194
        return "Maximum allowed length: " + maxLength;                                                              // 195
    }                                                                                                               // 196
    if (this.re && valueLength && !value.match(this.re)) {                                                          // 197
        this.setError(this.errStr);                                                                                 // 198
        this.setValidating(false);                                                                                  // 199
        return this.errStr;                                                                                         // 200
    }                                                                                                               // 201
    if (this.func){                                                                                                 // 202
        var result = this.func(value);                                                                              // 203
        var err = result === true ? this.errStr || true : result;                                                   // 204
        if (result === undefined)                                                                                   // 205
            return err;                                                                                             // 206
        this.status.set(err);                                                                                       // 207
        this.setValidating(false);                                                                                  // 208
        return err;                                                                                                 // 209
    }                                                                                                               // 210
    this.setSuccess();                                                                                              // 211
    this.setValidating(false);                                                                                      // 212
    return false;                                                                                                   // 213
};                                                                                                                  // 214
                                                                                                                    // 215
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/core.js                                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// ---------------------------------------------------------------------------------                                // 1
                                                                                                                    // 2
// Patterns for methods" parameters                                                                                 // 3
                                                                                                                    // 4
// ---------------------------------------------------------------------------------                                // 5
                                                                                                                    // 6
STATE_PAT = {                                                                                                       // 7
    changePwd: Match.Optional(String),                                                                              // 8
    enrollAccount: Match.Optional(String),                                                                          // 9
    forgotPwd: Match.Optional(String),                                                                              // 10
    resetPwd: Match.Optional(String),                                                                               // 11
    signIn: Match.Optional(String),                                                                                 // 12
    signUp: Match.Optional(String),                                                                                 // 13
};                                                                                                                  // 14
                                                                                                                    // 15
ERRORS_PAT = {                                                                                                      // 16
    mustBeLoggedIn: Match.Optional(String),                                                                         // 17
    pwdMismatch: Match.Optional(String),                                                                            // 18
};                                                                                                                  // 19
                                                                                                                    // 20
INFO_PAT = {                                                                                                        // 21
    emailSent: Match.Optional(String),                                                                              // 22
    emailVerified: Match.Optional(String),                                                                          // 23
    pwdChanged: Match.Optional(String),                                                                             // 24
    pwdReset: Match.Optional(String),                                                                               // 25
    pwdSet: Match.Optional(String),                                                                                 // 26
    signUpVerifyEmail: Match.Optional(String),                                                                      // 27
};                                                                                                                  // 28
                                                                                                                    // 29
INPUT_ICONS_PAT = {                                                                                                 // 30
    isValidating: Match.Optional(String),                                                                           // 31
    hasError: Match.Optional(String),                                                                               // 32
    hasSuccess: Match.Optional(String),                                                                             // 33
};                                                                                                                  // 34
                                                                                                                    // 35
ObjWithStringValues = Match.Where(function (x) {                                                                    // 36
    check(x, Object);                                                                                               // 37
    _.each(_.values(x), function(value){                                                                            // 38
        check(value, String);                                                                                       // 39
    });                                                                                                             // 40
    return true;                                                                                                    // 41
});                                                                                                                 // 42
                                                                                                                    // 43
TEXTS_PAT = {                                                                                                       // 44
    button: Match.Optional(STATE_PAT),                                                                              // 45
    errors: Match.Optional(ERRORS_PAT),                                                                             // 46
    navSignIn: Match.Optional(String),                                                                              // 47
    navSignOut: Match.Optional(String),                                                                             // 48
    info: Match.Optional(INFO_PAT),                                                                                 // 49
    inputIcons: Match.Optional(INPUT_ICONS_PAT),                                                                    // 50
    optionalField: Match.Optional(String),                                                                          // 51
    pwdLink_pre: Match.Optional(String),                                                                            // 52
    pwdLink_link: Match.Optional(String),                                                                           // 53
    pwdLink_suff: Match.Optional(String),                                                                           // 54
    sep: Match.Optional(String),                                                                                    // 55
    signInLink_pre: Match.Optional(String),                                                                         // 56
    signInLink_link: Match.Optional(String),                                                                        // 57
    signInLink_suff: Match.Optional(String),                                                                        // 58
    signUpLink_pre: Match.Optional(String),                                                                         // 59
    signUpLink_link: Match.Optional(String),                                                                        // 60
    signUpLink_suff: Match.Optional(String),                                                                        // 61
    socialAdd: Match.Optional(String),                                                                              // 62
    socialConfigure: Match.Optional(String),                                                                        // 63
    socialIcons: Match.Optional(ObjWithStringValues),                                                               // 64
    socialRemove: Match.Optional(String),                                                                           // 65
    socialSignIn: Match.Optional(String),                                                                           // 66
    socialSignUp: Match.Optional(String),                                                                           // 67
    socialWith: Match.Optional(String),                                                                             // 68
    termsPreamble: Match.Optional(String),                                                                          // 69
    termsPrivacy: Match.Optional(String),                                                                           // 70
    termsAnd: Match.Optional(String),                                                                               // 71
    termsTerms: Match.Optional(String),                                                                             // 72
    title: Match.Optional(STATE_PAT),                                                                               // 73
};                                                                                                                  // 74
                                                                                                                    // 75
// Configuration pattern to be checked with check                                                                   // 76
CONFIG_PAT = {                                                                                                      // 77
    // Behaviour                                                                                                    // 78
    confirmPassword: Match.Optional(Boolean),                                                                       // 79
    defaultState: Match.Optional(String),                                                                           // 80
    enablePasswordChange: Match.Optional(Boolean),                                                                  // 81
    enforceEmailVerification: Match.Optional(Boolean),                                                              // 82
    forbidClientAccountCreation: Match.Optional(Boolean),                                                           // 83
    lowercaseUsername: Match.Optional(Boolean),                                                                     // 84
    overrideLoginErrors: Match.Optional(Boolean),                                                                   // 85
    sendVerificationEmail: Match.Optional(Boolean),                                                                 // 86
    socialLoginStyle: Match.Optional(Match.OneOf("popup", "redirect")),                                             // 87
                                                                                                                    // 88
    // Appearance                                                                                                   // 89
    defaultLayout: Match.Optional(String),                                                                          // 90
    showAddRemoveServices: Match.Optional(Boolean),                                                                 // 91
    showForgotPasswordLink: Match.Optional(Boolean),                                                                // 92
    showLabels: Match.Optional(Boolean),                                                                            // 93
    showPlaceholders: Match.Optional(Boolean),                                                                      // 94
    hideSignInLink: Match.Optional(Boolean),                                                                        // 95
    hideSignUpLink: Match.Optional(Boolean),                                                                        // 96
                                                                                                                    // 97
    // Client-side Validation                                                                                       // 98
    continuousValidation: Match.Optional(Boolean),                                                                  // 99
    negativeFeedback: Match.Optional(Boolean),                                                                      // 100
    negativeValidation: Match.Optional(Boolean),                                                                    // 101
    positiveValidation: Match.Optional(Boolean),                                                                    // 102
    positiveFeedback: Match.Optional(Boolean),                                                                      // 103
    showValidating: Match.Optional(Boolean),                                                                        // 104
                                                                                                                    // 105
    // Privacy Policy and Terms of Use                                                                              // 106
    privacyUrl: Match.Optional(String),                                                                             // 107
    termsUrl: Match.Optional(String),                                                                               // 108
                                                                                                                    // 109
    // Redirects                                                                                                    // 110
    homeRoutePath: Match.Optional(String),                                                                          // 111
    redirectTimeout: Match.Optional(Number),                                                                        // 112
                                                                                                                    // 113
    // Hooks                                                                                                        // 114
    onSubmitHook: Match.Optional(Function),                                                                         // 115
    onLogoutHook: Match.Optional(Function),                                                                         // 116
                                                                                                                    // 117
    texts: Match.Optional(TEXTS_PAT),                                                                               // 118
                                                                                                                    // 119
    //reCaptcha config                                                                                              // 120
    reCaptcha: Match.Optional({                                                                                     // 121
        siteKey: Match.Optional(String),                                                                            // 122
        secretKey: Match.Optional(String),                                                                          // 123
        theme: Match.Optional(Match.OneOf("dark", "light")),                                                        // 124
        data_type: Match.Optional(Match.OneOf("audio", "image")),                                                   // 125
    }),                                                                                                             // 126
                                                                                                                    // 127
    showReCaptcha: Match.Optional(Boolean),                                                                         // 128
};                                                                                                                  // 129
                                                                                                                    // 130
                                                                                                                    // 131
FIELD_SUB_PAT = {                                                                                                   // 132
    "default": Match.Optional(String),                                                                              // 133
    changePwd: Match.Optional(String),                                                                              // 134
    enrollAccount: Match.Optional(String),                                                                          // 135
    forgotPwd: Match.Optional(String),                                                                              // 136
    resetPwd: Match.Optional(String),                                                                               // 137
    signIn: Match.Optional(String),                                                                                 // 138
    signUp: Match.Optional(String),                                                                                 // 139
};                                                                                                                  // 140
                                                                                                                    // 141
                                                                                                                    // 142
// Field pattern                                                                                                    // 143
FIELD_PAT = {                                                                                                       // 144
    _id: String,                                                                                                    // 145
    type: String,                                                                                                   // 146
    required: Match.Optional(Boolean),                                                                              // 147
    displayName: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                // 148
    placeholder: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                // 149
    select: Match.Optional([{text: String, value: Match.Any}]),                                                     // 150
    minLength: Match.Optional(Match.Integer),                                                                       // 151
    maxLength: Match.Optional(Match.Integer),                                                                       // 152
    re: Match.Optional(RegExp),                                                                                     // 153
    func: Match.Optional(Match.Where(_.isFunction)),                                                                // 154
    errStr: Match.Optional(String),                                                                                 // 155
                                                                                                                    // 156
    // Client-side Validation                                                                                       // 157
    continuousValidation: Match.Optional(Boolean),                                                                  // 158
    negativeFeedback: Match.Optional(Boolean),                                                                      // 159
    negativeValidation: Match.Optional(Boolean),                                                                    // 160
    positiveValidation: Match.Optional(Boolean),                                                                    // 161
    positiveFeedback: Match.Optional(Boolean),                                                                      // 162
                                                                                                                    // 163
    // Transforms                                                                                                   // 164
    trim: Match.Optional(Boolean),                                                                                  // 165
    lowercase: Match.Optional(Boolean),                                                                             // 166
    uppercase: Match.Optional(Boolean),                                                                             // 167
    transform: Match.Optional(Match.Where(_.isFunction)),                                                           // 168
                                                                                                                    // 169
    // Custom options                                                                                               // 170
    options: Match.Optional(Object),                                                                                // 171
    template: Match.Optional(String),                                                                               // 172
};                                                                                                                  // 173
                                                                                                                    // 174
// Route configuration pattern to be checked with check                                                             // 175
var ROUTE_PAT = {                                                                                                   // 176
    name: Match.Optional(String),                                                                                   // 177
    path: Match.Optional(String),                                                                                   // 178
    template: Match.Optional(String),                                                                               // 179
    layoutTemplate: Match.Optional(String),                                                                         // 180
    redirect: Match.Optional(Match.OneOf(String, Match.Where(_.isFunction))),                                       // 181
};                                                                                                                  // 182
                                                                                                                    // 183
                                                                                                                    // 184
// -----------------------------------------------------------------------------                                    // 185
                                                                                                                    // 186
// AccountsTemplates object                                                                                         // 187
                                                                                                                    // 188
// -----------------------------------------------------------------------------                                    // 189
                                                                                                                    // 190
                                                                                                                    // 191
                                                                                                                    // 192
// -------------------                                                                                              // 193
// Client/Server stuff                                                                                              // 194
// -------------------                                                                                              // 195
                                                                                                                    // 196
// Constructor                                                                                                      // 197
AT = function() {                                                                                                   // 198
                                                                                                                    // 199
};                                                                                                                  // 200
                                                                                                                    // 201
                                                                                                                    // 202
                                                                                                                    // 203
                                                                                                                    // 204
/*                                                                                                                  // 205
    Each field object is represented by the following properties:                                                   // 206
        _id:         String   (required)  // A unique field"s id / name                                             // 207
        type:        String   (required)  // Displayed input type                                                   // 208
        required:    Boolean  (optional)  // Specifies Whether to fail or not when field is left empty              // 209
        displayName: String   (optional)  // The field"s name to be displayed as a label above the input element    // 210
        placeholder: String   (optional)  // The placeholder text to be displayed inside the input element          // 211
        minLength:   Integer  (optional)  // Possibly specifies the minimum allowed length                          // 212
        maxLength:   Integer  (optional)  // Possibly specifies the maximum allowed length                          // 213
        re:          RegExp   (optional)  // Regular expression for validation                                      // 214
        func:        Function (optional)  // Custom function for validation                                         // 215
        errStr:      String   (optional)  // Error message to be displayed in case re validation fails              // 216
*/                                                                                                                  // 217
                                                                                                                    // 218
                                                                                                                    // 219
                                                                                                                    // 220
/*                                                                                                                  // 221
    Routes configuration can be done by calling AccountsTemplates.configureRoute with the route name and the        // 222
    following options in a separate object. E.g. AccountsTemplates.configureRoute("gingIn", option);                // 223
        name:           String (optional). A unique route"s name to be passed to iron-router                        // 224
        path:           String (optional). A unique route"s path to be passed to iron-router                        // 225
        template:       String (optional). The name of the template to be rendered                                  // 226
        layoutTemplate: String (optional). The name of the layout to be used                                        // 227
        redirect:       String (optional). The name of the route (or its path) where to redirect after form submit  // 228
*/                                                                                                                  // 229
                                                                                                                    // 230
                                                                                                                    // 231
// Allowed routes along with theirs default configuration values                                                    // 232
AT.prototype.ROUTE_DEFAULT = {                                                                                      // 233
    changePwd:      { name: "atChangePwd",      path: "/change-password"},                                          // 234
    enrollAccount:  { name: "atEnrollAccount",  path: "/enroll-account"},                                           // 235
    ensureSignedIn: { name: "atEnsureSignedIn", path: null},                                                        // 236
    forgotPwd:      { name: "atForgotPwd",      path: "/forgot-password"},                                          // 237
    resetPwd:       { name: "atResetPwd",       path: "/reset-password"},                                           // 238
    signIn:         { name: "atSignIn",         path: "/sign-in"},                                                  // 239
    signUp:         { name: "atSignUp",         path: "/sign-up"},                                                  // 240
    verifyEmail:    { name: "atVerifyEmail",    path: "/verify-email"},                                             // 241
};                                                                                                                  // 242
                                                                                                                    // 243
                                                                                                                    // 244
                                                                                                                    // 245
// Allowed input types                                                                                              // 246
AT.prototype.INPUT_TYPES = [                                                                                        // 247
    "checkbox",                                                                                                     // 248
    "email",                                                                                                        // 249
    "hidden",                                                                                                       // 250
    "password",                                                                                                     // 251
    "radio",                                                                                                        // 252
    "select",                                                                                                       // 253
    "tel",                                                                                                          // 254
    "text",                                                                                                         // 255
    "url",                                                                                                          // 256
];                                                                                                                  // 257
                                                                                                                    // 258
// Current configuration values                                                                                     // 259
AT.prototype.options = {                                                                                            // 260
    // Appearance                                                                                                   // 261
    //defaultLayout: undefined,                                                                                     // 262
    showAddRemoveServices: false,                                                                                   // 263
    showForgotPasswordLink: false,                                                                                  // 264
    showLabels: true,                                                                                               // 265
    showPlaceholders: true,                                                                                         // 266
                                                                                                                    // 267
    // Behaviour                                                                                                    // 268
    confirmPassword: true,                                                                                          // 269
    defaultState: "signIn",                                                                                         // 270
    enablePasswordChange: false,                                                                                    // 271
    forbidClientAccountCreation: false,                                                                             // 272
    lowercaseUsername: false,                                                                                       // 273
    overrideLoginErrors: true,                                                                                      // 274
    sendVerificationEmail: false,                                                                                   // 275
    socialLoginStyle: "popup",                                                                                      // 276
                                                                                                                    // 277
    // Client-side Validation                                                                                       // 278
    //continuousValidation: false,                                                                                  // 279
    //negativeFeedback: false,                                                                                      // 280
    //negativeValidation: false,                                                                                    // 281
    //positiveValidation: false,                                                                                    // 282
    //positiveFeedback: false,                                                                                      // 283
    //showValidating: false,                                                                                        // 284
                                                                                                                    // 285
    // Privacy Policy and Terms of Use                                                                              // 286
    privacyUrl: undefined,                                                                                          // 287
    termsUrl: undefined,                                                                                            // 288
                                                                                                                    // 289
    // Redirects                                                                                                    // 290
    homeRoutePath: "/",                                                                                             // 291
    redirectTimeout: 2000, // 2 seconds                                                                             // 292
                                                                                                                    // 293
    // Hooks                                                                                                        // 294
    onSubmitHook: undefined,                                                                                        // 295
};                                                                                                                  // 296
                                                                                                                    // 297
AT.prototype.SPECIAL_FIELDS = [                                                                                     // 298
    "password_again",                                                                                               // 299
    "username_and_email",                                                                                           // 300
];                                                                                                                  // 301
                                                                                                                    // 302
// SignIn / SignUp fields                                                                                           // 303
AT.prototype._fields = [                                                                                            // 304
    new Field({                                                                                                     // 305
        _id: "email",                                                                                               // 306
        type: "email",                                                                                              // 307
        required: true,                                                                                             // 308
        lowercase: true,                                                                                            // 309
        trim: true,                                                                                                 // 310
        func: function(email){                                                                                      // 311
            return !_.contains(email, '@');                                                                         // 312
        },                                                                                                          // 313
        errStr: 'Invalid email',                                                                                    // 314
    }),                                                                                                             // 315
    new Field({                                                                                                     // 316
        _id: "password",                                                                                            // 317
        type: "password",                                                                                           // 318
        required: true,                                                                                             // 319
        minLength: 6,                                                                                               // 320
        displayName: {                                                                                              // 321
            "default": "password",                                                                                  // 322
            changePwd: "newPassword",                                                                               // 323
            resetPwd: "newPassword",                                                                                // 324
        },                                                                                                          // 325
        placeholder: {                                                                                              // 326
            "default": "password",                                                                                  // 327
            changePwd: "newPassword",                                                                               // 328
            resetPwd: "newPassword",                                                                                // 329
        },                                                                                                          // 330
    }),                                                                                                             // 331
];                                                                                                                  // 332
                                                                                                                    // 333
// Configured routes                                                                                                // 334
AT.prototype.routes = {};                                                                                           // 335
                                                                                                                    // 336
AT.prototype._initialized = false;                                                                                  // 337
                                                                                                                    // 338
// Input type validation                                                                                            // 339
AT.prototype._isValidInputType = function(value) {                                                                  // 340
    return _.indexOf(this.INPUT_TYPES, value) !== -1;                                                               // 341
};                                                                                                                  // 342
                                                                                                                    // 343
AT.prototype.addField = function(field) {                                                                           // 344
    // Fields can be added only before initialization                                                               // 345
    if (this._initialized)                                                                                          // 346
        throw new Error("AccountsTemplates.addField should strictly be called before AccountsTemplates.init!");     // 347
    field = _.pick(field, _.keys(FIELD_PAT));                                                                       // 348
    check(field, FIELD_PAT);                                                                                        // 349
    // Checks there"s currently no field called field._id                                                           // 350
    if (_.indexOf(_.pluck(this._fields, "_id"), field._id) !== -1)                                                  // 351
        throw new Error("A field called " + field._id + " already exists!");                                        // 352
    // Validates field.type                                                                                         // 353
    if (!this._isValidInputType(field.type))                                                                        // 354
        throw new Error("field.type is not valid!");                                                                // 355
    // Checks field.minLength is strictly positive                                                                  // 356
    if (typeof field.minLength !== "undefined" && field.minLength <= 0)                                             // 357
        throw new Error("field.minLength should be greater than zero!");                                            // 358
    // Checks field.maxLength is strictly positive                                                                  // 359
    if (typeof field.maxLength !== "undefined" && field.maxLength <= 0)                                             // 360
        throw new Error("field.maxLength should be greater than zero!");                                            // 361
    // Checks field.maxLength is greater than field.minLength                                                       // 362
    if (typeof field.minLength !== "undefined" && typeof field.minLength !== "undefined" && field.maxLength < field.minLength)
        throw new Error("field.maxLength should be greater than field.maxLength!");                                 // 364
                                                                                                                    // 365
    if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, field._id)))                                           // 366
        this._fields.push(new Field(field));                                                                        // 367
    return this._fields;                                                                                            // 368
};                                                                                                                  // 369
                                                                                                                    // 370
AT.prototype.addFields = function(fields) {                                                                         // 371
    var ok;                                                                                                         // 372
    try { // don"t bother with `typeof` - just access `length` and `catch`                                          // 373
        ok = fields.length > 0 && "0" in Object(fields);                                                            // 374
    } catch (e) {                                                                                                   // 375
        throw new Error("field argument should be an array of valid field objects!");                               // 376
    }                                                                                                               // 377
    if (ok) {                                                                                                       // 378
        _.map(fields, function(field){                                                                              // 379
            this.addField(field);                                                                                   // 380
        }, this);                                                                                                   // 381
    } else                                                                                                          // 382
        throw new Error("field argument should be an array of valid field objects!");                               // 383
    return this._fields;                                                                                            // 384
};                                                                                                                  // 385
                                                                                                                    // 386
AT.prototype.configure = function(config) {                                                                         // 387
    // Configuration options can be set only before initialization                                                  // 388
    if (this._initialized)                                                                                          // 389
        throw new Error("Configuration options must be set before AccountsTemplates.init!");                        // 390
                                                                                                                    // 391
    // Updates the current configuration                                                                            // 392
    check(config, CONFIG_PAT);                                                                                      // 393
    var options = _.omit(config, "texts", "reCaptcha");                                                             // 394
    this.options = _.defaults(options, this.options);                                                               // 395
                                                                                                                    // 396
    // Possibly sets up reCaptcha options                                                                           // 397
    var reCaptcha = config.reCaptcha;                                                                               // 398
    if (reCaptcha) {                                                                                                // 399
        // Updates the current button object                                                                        // 400
        this.options.reCaptcha = _.defaults(reCaptcha, this.options.reCaptcha || {});                               // 401
    }                                                                                                               // 402
                                                                                                                    // 403
    if (Meteor.isClient){                                                                                           // 404
        // Possibly sets up client texts...                                                                         // 405
        if (config.texts){                                                                                          // 406
            var texts = config.texts;                                                                               // 407
            var simpleTexts = _.omit(texts, "button", "errors", "info", "inputIcons", "socialIcons", "title");      // 408
            this.texts = _.defaults(simpleTexts, this.texts);                                                       // 409
                                                                                                                    // 410
            if (texts.button) {                                                                                     // 411
                // Updates the current button object                                                                // 412
                this.texts.button = _.defaults(texts.button, this.texts.button);                                    // 413
            }                                                                                                       // 414
            if (texts.errors) {                                                                                     // 415
                // Updates the current errors object                                                                // 416
                this.texts.errors = _.defaults(texts.errors, this.texts.errors);                                    // 417
            }                                                                                                       // 418
            if (texts.info) {                                                                                       // 419
                // Updates the current info object                                                                  // 420
                this.texts.info = _.defaults(texts.info, this.texts.info);                                          // 421
            }                                                                                                       // 422
            if (texts.inputIcons) {                                                                                 // 423
                // Updates the current inputIcons object                                                            // 424
                this.texts.inputIcons = _.defaults(texts.inputIcons, this.texts.inputIcons);                        // 425
            }                                                                                                       // 426
            if (texts.socialIcons) {                                                                                // 427
                // Updates the current socialIcons object                                                           // 428
                this.texts.socialIcons = _.defaults(texts.socialIcons, this.texts.socialIcons);                     // 429
            }                                                                                                       // 430
            if (texts.title) {                                                                                      // 431
                // Updates the current title object                                                                 // 432
                this.texts.title = _.defaults(texts.title, this.texts.title);                                       // 433
            }                                                                                                       // 434
        }                                                                                                           // 435
    }                                                                                                               // 436
};                                                                                                                  // 437
                                                                                                                    // 438
AT.prototype.configureRoute = function(route, options) {                                                            // 439
    check(route, String);                                                                                           // 440
    check(options, Match.OneOf(undefined, ROUTE_PAT));                                                              // 441
    options = _.clone(options);                                                                                     // 442
    // Route Configuration can be done only before initialization                                                   // 443
    if (this._initialized)                                                                                          // 444
        throw new Error("Route Configuration can be done only before AccountsTemplates.init!");                     // 445
    // Only allowed routes can be configured                                                                        // 446
    if (!(route in this.ROUTE_DEFAULT))                                                                             // 447
        throw new Error("Unknown Route!");                                                                          // 448
                                                                                                                    // 449
    // Possibly adds a initial / to the provided path                                                               // 450
    if (options && options.path && options.path[0] !== "/")                                                         // 451
        options.path = "/" + options.path;                                                                          // 452
    // Updates the current configuration                                                                            // 453
    options = _.defaults(options || {}, this.ROUTE_DEFAULT[route]);                                                 // 454
    this.routes[route] = options;                                                                                   // 455
};                                                                                                                  // 456
                                                                                                                    // 457
AT.prototype.hasField = function(fieldId) {                                                                         // 458
    return !!this.getField(fieldId);                                                                                // 459
};                                                                                                                  // 460
                                                                                                                    // 461
AT.prototype.getField = function(fieldId) {                                                                         // 462
    var field = _.filter(this._fields, function(field){                                                             // 463
        return field._id == fieldId;                                                                                // 464
    });                                                                                                             // 465
    return (field.length === 1) ? field[0] : undefined;                                                             // 466
};                                                                                                                  // 467
                                                                                                                    // 468
AT.prototype.getFields = function() {                                                                               // 469
    return this._fields;                                                                                            // 470
};                                                                                                                  // 471
                                                                                                                    // 472
AT.prototype.getFieldIds = function() {                                                                             // 473
    return _.pluck(this._fields, "_id");                                                                            // 474
};                                                                                                                  // 475
                                                                                                                    // 476
AT.prototype.getRouteName = function(route) {                                                                       // 477
    if (route in this.routes)                                                                                       // 478
        return this.routes[route].name;                                                                             // 479
    return null;                                                                                                    // 480
};                                                                                                                  // 481
                                                                                                                    // 482
AT.prototype.getRoutePath = function(route) {                                                                       // 483
    if (route in this.routes)                                                                                       // 484
        return this.routes[route].path;                                                                             // 485
    return "#";                                                                                                     // 486
};                                                                                                                  // 487
                                                                                                                    // 488
AT.prototype.oauthServices = function(){                                                                            // 489
    // Extracts names of available services                                                                         // 490
    var names;                                                                                                      // 491
    if (Meteor.isServer)                                                                                            // 492
        names = (Accounts.oauth && Accounts.oauth.serviceNames()) || [];                                            // 493
    else                                                                                                            // 494
        names = (Accounts.oauth && Accounts.loginServicesConfigured() && Accounts.oauth.serviceNames()) || [];      // 495
    // Extracts names of configured services                                                                        // 496
    var configuredServices = [];                                                                                    // 497
    if (Accounts.loginServiceConfiguration)                                                                         // 498
        configuredServices = _.pluck(Accounts.loginServiceConfiguration.find().fetch(), "service");                 // 499
                                                                                                                    // 500
    // Builds a list of objects containing service name as _id and its configuration status                         // 501
    var services = _.map(names, function(name){                                                                     // 502
        return {                                                                                                    // 503
            _id : name,                                                                                             // 504
            configured: _.contains(configuredServices, name),                                                       // 505
        };                                                                                                          // 506
    });                                                                                                             // 507
                                                                                                                    // 508
    // Checks whether there is a UI to configure services...                                                        // 509
    // XXX: this only works with the accounts-ui package                                                            // 510
    var showUnconfigured = typeof Accounts._loginButtonsSession !== "undefined";                                    // 511
                                                                                                                    // 512
    // Filters out unconfigured services in case they"re not to be displayed                                        // 513
    if (!showUnconfigured){                                                                                         // 514
        services = _.filter(services, function(service){                                                            // 515
            return service.configured;                                                                              // 516
        });                                                                                                         // 517
    }                                                                                                               // 518
                                                                                                                    // 519
    // Sorts services by name                                                                                       // 520
    services = _.sortBy(services, function(service){                                                                // 521
        return service._id;                                                                                         // 522
    });                                                                                                             // 523
                                                                                                                    // 524
    return services;                                                                                                // 525
};                                                                                                                  // 526
                                                                                                                    // 527
AT.prototype.removeField = function(fieldId) {                                                                      // 528
    // Fields can be removed only before initialization                                                             // 529
    if (this._initialized)                                                                                          // 530
        throw new Error("AccountsTemplates.removeField should strictly be called before AccountsTemplates.init!");  // 531
    // Tries to look up the field with given _id                                                                    // 532
    var index = _.indexOf(_.pluck(this._fields, "_id"), fieldId);                                                   // 533
    if (index !== -1)                                                                                               // 534
        return this._fields.splice(index, 1)[0];                                                                    // 535
    else                                                                                                            // 536
        if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, fieldId)))                                         // 537
            throw new Error("A field called " + fieldId + " does not exist!");                                      // 538
};                                                                                                                  // 539
                                                                                                                    // 540
AT.prototype.setupRoutes = function() {                                                                             // 541
    if (Meteor.isServer){                                                                                           // 542
        // Possibly prints a warning in case showForgotPasswordLink is set to true but the route is not configured  // 543
        if (AccountsTemplates.options.showForgotPasswordLink && !("forgotPwd" in  AccountsTemplates.routes))        // 544
            console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but forgotPwd route is not configured!");
        // Configures "reset password" email link                                                                   // 546
        if ("resetPwd" in AccountsTemplates.routes){                                                                // 547
            var resetPwdPath = AccountsTemplates.routes["resetPwd"].path.substr(1);                                 // 548
            Accounts.urls.resetPassword = function(token){                                                          // 549
                return Meteor.absoluteUrl(resetPwdPath + "/" + token);                                              // 550
            };                                                                                                      // 551
        }                                                                                                           // 552
        // Configures "enroll account" email link                                                                   // 553
        if ("enrollAccount" in AccountsTemplates.routes){                                                           // 554
            var enrollAccountPath = AccountsTemplates.routes["enrollAccount"].path.substr(1);                       // 555
            Accounts.urls.enrollAccount = function(token){                                                          // 556
                return Meteor.absoluteUrl(enrollAccountPath + "/" + token);                                         // 557
            };                                                                                                      // 558
        }                                                                                                           // 559
        // Configures "verify email" email link                                                                     // 560
        if ("verifyEmail" in AccountsTemplates.routes){                                                             // 561
            var verifyEmailPath = AccountsTemplates.routes["verifyEmail"].path.substr(1);                           // 562
            Accounts.urls.verifyEmail = function(token){                                                            // 563
                return Meteor.absoluteUrl(verifyEmailPath + "/" + token);                                           // 564
            };                                                                                                      // 565
        }                                                                                                           // 566
    }                                                                                                               // 567
                                                                                                                    // 568
    // Determines the default layout to be used in case no specific one is specified for single routes              // 569
    var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                   // 570
                                                                                                                    // 571
    _.each(AccountsTemplates.routes, function(options, route){                                                      // 572
        if (route === "ensureSignedIn")                                                                             // 573
            return;                                                                                                 // 574
        if (route === "changePwd" && !AccountsTemplates.options.enablePasswordChange)                               // 575
            throw new Error("changePwd route configured but enablePasswordChange set to false!");                   // 576
        if (route === "forgotPwd" && !AccountsTemplates.options.showForgotPasswordLink)                             // 577
            throw new Error("forgotPwd route configured but showForgotPasswordLink set to false!");                 // 578
        if (route === "signUp" && AccountsTemplates.options.forbidClientAccountCreation)                            // 579
            throw new Error("signUp route configured but forbidClientAccountCreation set to true!");                // 580
        // Possibly prints a warning in case the MAIL_URL environment variable was not set                          // 581
        //if (Meteor.isServer && route === "forgotPwd" && (!process.env.MAIL_URL || ! Package["email"])){           // 582
        //    console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but MAIL_URL is not configured!");
        //}                                                                                                         // 584
                                                                                                                    // 585
        var name = options.name; // Default provided...                                                             // 586
        var path = options.path; // Default provided...                                                             // 587
        var template = options.template || "fullPageAtForm";                                                        // 588
        var layoutTemplate = options.layoutTemplate || defaultLayout;                                               // 589
                                                                                                                    // 590
        // Possibly adds token parameter                                                                            // 591
        if (_.contains(["enrollAccount", "resetPwd", "verifyEmail"], route)){                                       // 592
            path += "/:paramToken";                                                                                 // 593
            if (route === "verifyEmail")                                                                            // 594
                Router.route(path, {                                                                                // 595
                    name: name,                                                                                     // 596
                    template: template,                                                                             // 597
                    layoutTemplate: layoutTemplate,                                                                 // 598
                    onRun: function() {                                                                             // 599
                        AccountsTemplates.setState(route);                                                          // 600
                        AccountsTemplates.setDisabled(true);                                                        // 601
                        var token = this.params.paramToken;                                                         // 602
                        Accounts.verifyEmail(token, function(error){                                                // 603
                            AccountsTemplates.setDisabled(false);                                                   // 604
                            AccountsTemplates.submitCallback(error, route, function(){                              // 605
                                AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailVerified);
                            });                                                                                     // 607
                        });                                                                                         // 608
                                                                                                                    // 609
                        this.next();                                                                                // 610
                    },                                                                                              // 611
                    onStop: function() {                                                                            // 612
                        AccountsTemplates.clearState();                                                             // 613
                    },                                                                                              // 614
                });                                                                                                 // 615
            else                                                                                                    // 616
                Router.route(path, {                                                                                // 617
                    name: name,                                                                                     // 618
                    template: template,                                                                             // 619
                    layoutTemplate: layoutTemplate,                                                                 // 620
                    onRun: function() {                                                                             // 621
                        AccountsTemplates.paramToken = this.params.paramToken;                                      // 622
                        this.next();                                                                                // 623
                    },                                                                                              // 624
                    onBeforeAction: function() {                                                                    // 625
                        AccountsTemplates.setState(route);                                                          // 626
                        this.next();                                                                                // 627
                    },                                                                                              // 628
                    onStop: function() {                                                                            // 629
                        AccountsTemplates.clearState();                                                             // 630
                        AccountsTemplates.paramToken = null;                                                        // 631
                    }                                                                                               // 632
                });                                                                                                 // 633
        }                                                                                                           // 634
        else                                                                                                        // 635
            Router.route(path, {                                                                                    // 636
                name: name,                                                                                         // 637
                template: template,                                                                                 // 638
                layoutTemplate: layoutTemplate,                                                                     // 639
                onBeforeAction: function() {                                                                        // 640
                    var redirect = false;                                                                           // 641
                    if (route === 'changePwd') {                                                                    // 642
                      if (!Meteor.loggingIn() && !Meteor.userId()) {                                                // 643
                        redirect = true;                                                                            // 644
                      }                                                                                             // 645
                    }                                                                                               // 646
                    else if (Meteor.userId()) {                                                                     // 647
                        redirect = true;                                                                            // 648
                    }                                                                                               // 649
                    if (redirect) {                                                                                 // 650
                        AccountsTemplates.postSubmitRedirect(route);                                                // 651
                    }                                                                                               // 652
                    else {                                                                                          // 653
                        AccountsTemplates.setState(route);                                                          // 654
                        this.next();                                                                                // 655
                    }                                                                                               // 656
                },                                                                                                  // 657
                onStop: function() {                                                                                // 658
                    AccountsTemplates.clearState();                                                                 // 659
                }                                                                                                   // 660
            });                                                                                                     // 661
    });                                                                                                             // 662
};                                                                                                                  // 663
                                                                                                                    // 664
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/server.js                                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Initialization                                                                                                   // 1
                                                                                                                    // 2
AT.prototype.init = function() {                                                                                    // 3
    console.warn("[AccountsTemplates] There is no more need to call AccountsTemplates.init()! Simply remove the call ;-)");
};                                                                                                                  // 5
                                                                                                                    // 6
AT.prototype._init = function() {                                                                                   // 7
    if (this._initialized)                                                                                          // 8
        return;                                                                                                     // 9
                                                                                                                    // 10
    // Checks there is at least one account service installed                                                       // 11
    if (!Package["accounts-password"] && (!Accounts.oauth || Accounts.oauth.serviceNames().length === 0))           // 12
        throw Error("AccountsTemplates: You must add at least one account service!");                               // 13
                                                                                                                    // 14
    // A password field is strictly required                                                                        // 15
    var password = this.getField("password");                                                                       // 16
    if (!password)                                                                                                  // 17
        throw Error("A password field is strictly required!");                                                      // 18
    if (password.type !== "password")                                                                               // 19
        throw Error("The type of password field should be password!");                                              // 20
                                                                                                                    // 21
    // Then we can have "username" or "email" or even both of them                                                  // 22
    // but at least one of the two is strictly required                                                             // 23
    var username = this.getField("username");                                                                       // 24
    var email = this.getField("email");                                                                             // 25
    if (!username && !email)                                                                                        // 26
        throw Error("At least one field out of username and email is strictly required!");                          // 27
    if (username && !username.required)                                                                             // 28
        throw Error("The username field should be required!");                                                      // 29
    if (email){                                                                                                     // 30
        if (email.type !== "email")                                                                                 // 31
            throw Error("The type of email field should be email!");                                                // 32
        if (username){                                                                                              // 33
            // username and email                                                                                   // 34
            if (username.type !== "text")                                                                           // 35
                throw Error("The type of username field should be text when email field is present!");              // 36
        }else{                                                                                                      // 37
            // email only                                                                                           // 38
            if (!email.required)                                                                                    // 39
                throw Error("The email field should be required when username is not present!");                    // 40
        }                                                                                                           // 41
    }                                                                                                               // 42
    else{                                                                                                           // 43
        // username only                                                                                            // 44
        if (username.type !== "text" && username.type !== "tel")                                                    // 45
            throw Error("The type of username field should be text or tel!");                                       // 46
    }                                                                                                               // 47
                                                                                                                    // 48
    // Possibly publish more user data in order to be able to show add/remove                                       // 49
    // buttons for 3rd-party services                                                                               // 50
    if (this.options.showAddRemoveServices){                                                                        // 51
        // Publish additional current user info to get the list of registered services                              // 52
        // XXX TODO:                                                                                                // 53
        // ...adds only user.services.*.id                                                                          // 54
        Meteor.publish("userRegisteredServices", function() {                                                       // 55
            var userId = this.userId;                                                                               // 56
            return Meteor.users.find(userId, {fields: {services: 1}});                                              // 57
            /*                                                                                                      // 58
            if (userId){                                                                                            // 59
                var user = Meteor.users.findOne(userId);                                                            // 60
                var services_id = _.chain(user.services)                                                            // 61
                    .keys()                                                                                         // 62
                    .reject(function(service){return service === "resume";})                                        // 63
                    .map(function(service){return "services." + service + ".id";})                                  // 64
                    .value();                                                                                       // 65
                var projection = {};                                                                                // 66
                _.each(services_id, function(key){projection[key] = 1;});                                           // 67
                return Meteor.users.find(userId, {fields: projection});                                             // 68
            }                                                                                                       // 69
            */                                                                                                      // 70
        });                                                                                                         // 71
    }                                                                                                               // 72
                                                                                                                    // 73
    // Security stuff                                                                                               // 74
    if (this.options.overrideLoginErrors){                                                                          // 75
        Accounts.validateLoginAttempt(function(attempt){                                                            // 76
            if (attempt.error){                                                                                     // 77
                var reason = attempt.error.reason;                                                                  // 78
                if (reason === "User not found" || reason === "Incorrect password")                                 // 79
                    throw new Meteor.Error(403, "Login forbidden");                                                 // 80
            }                                                                                                       // 81
            return attempt.allowed;                                                                                 // 82
        });                                                                                                         // 83
    }                                                                                                               // 84
                                                                                                                    // 85
    if (this.options.sendVerificationEmail && this.options.enforceEmailVerification){                               // 86
        Accounts.validateLoginAttempt(function(info){                                                               // 87
            if (info.type !== "password" || info.methodName !== "login")                                            // 88
                return true;                                                                                        // 89
            var user = info.user;                                                                                   // 90
            if (!user)                                                                                              // 91
                return true;                                                                                        // 92
            var ok = true;                                                                                          // 93
            var loginEmail = info.methodArguments[0].user.email;                                                    // 94
            if (loginEmail){                                                                                        // 95
              var email = _.filter(user.emails, function(obj){                                                      // 96
                  return obj.address === loginEmail;                                                                // 97
              });                                                                                                   // 98
              if (!email.length || !email[0].verified)                                                              // 99
                  ok = false;                                                                                       // 100
            }                                                                                                       // 101
            else {                                                                                                  // 102
              // we got the username, lets check there's at lease one verified email                                // 103
              var emailVerified = _.chain(user.emails)                                                              // 104
                .pluck('verified')                                                                                  // 105
                .any()                                                                                              // 106
                .value();                                                                                           // 107
              if (!emailVerified)                                                                                   // 108
                ok = false;                                                                                         // 109
            }                                                                                                       // 110
            if (!ok)                                                                                                // 111
              throw new Meteor.Error(401, "Please verify your email first. Check the email and follow the link!" ); // 112
            return true;                                                                                            // 113
        });                                                                                                         // 114
    }                                                                                                               // 115
                                                                                                                    // 116
    //Check that reCaptcha secret keys are available                                                                // 117
    if (this.options.showReCaptcha) {                                                                               // 118
        var atSecretKey = AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.secretKey;     // 119
        var settingsSecretKey = Meteor.settings.reCaptcha && Meteor.settings.reCaptcha.secretKey;                   // 120
                                                                                                                    // 121
        if (!atSecretKey && !settingsSecretKey) {                                                                   // 122
            throw new Meteor.Error(401, "User Accounts: reCaptcha secret key not found! Please provide it or set showReCaptcha to false." );
        }                                                                                                           // 124
    }                                                                                                               // 125
                                                                                                                    // 126
    // ------------                                                                                                 // 127
    // Server-Side Routes Definition                                                                                // 128
    //                                                                                                              // 129
    //   this allows for server-side iron-router usage, like, e.g.                                                  // 130
    //   Router.map(function(){                                                                                     // 131
    //       this.route("fullPageSigninForm", {                                                                     // 132
    //           path: "*",                                                                                         // 133
    //           where: "server"                                                                                    // 134
    //           action: function() {                                                                               // 135
    //               this.response.statusCode = 404;                                                                // 136
    //               return this.response.end(Handlebars.templates["404"]());                                       // 137
    //           }                                                                                                  // 138
    //       });                                                                                                    // 139
    //   })                                                                                                         // 140
    // ------------                                                                                                 // 141
    AccountsTemplates.setupRoutes();                                                                                // 142
                                                                                                                    // 143
    // Marks AccountsTemplates as initialized                                                                       // 144
    this._initialized = true;                                                                                       // 145
};                                                                                                                  // 146
                                                                                                                    // 147
                                                                                                                    // 148
// Fake server-side IR plugin to allow for shared routing files                                                     // 149
Iron.Router.plugins.ensureSignedIn = function (router, options) {};                                                 // 150
                                                                                                                    // 151
                                                                                                                    // 152
AccountsTemplates = new AT();                                                                                       // 153
                                                                                                                    // 154
                                                                                                                    // 155
// Client side account creation is disabled by default:                                                             // 156
// the methos ATCreateUserServer is used instead!                                                                   // 157
// to actually disable client side account creation use:                                                            // 158
//                                                                                                                  // 159
//    AccountsTemplates.config({                                                                                    // 160
//        forbidClientAccountCreation: true                                                                         // 161
//    });                                                                                                           // 162
Accounts.config({                                                                                                   // 163
    forbidClientAccountCreation: true                                                                               // 164
});                                                                                                                 // 165
                                                                                                                    // 166
                                                                                                                    // 167
// Initialization                                                                                                   // 168
Meteor.startup(function(){                                                                                          // 169
    AccountsTemplates._init();                                                                                      // 170
});                                                                                                                 // 171
                                                                                                                    // 172
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:core/lib/methods.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Meteor.methods({                                                                                                    // 2
    ATRemoveService: function(service_name){                                                                        // 3
        var userId = this.userId;                                                                                   // 4
        if (userId){                                                                                                // 5
            var user = Meteor.users.findOne(userId);                                                                // 6
            var numServices = _.keys(user.services).length; // including "resume"                                   // 7
            if (numServices === 2)                                                                                  // 8
                throw new Meteor.Error(403, "Cannot remove the only active service!", {});                          // 9
            var unset = {};                                                                                         // 10
            unset["services." + service_name] = "";                                                                 // 11
            Meteor.users.update(userId, {$unset: unset});                                                           // 12
        }                                                                                                           // 13
    },                                                                                                              // 14
});                                                                                                                 // 15
                                                                                                                    // 16
                                                                                                                    // 17
if (Meteor.isServer) {                                                                                              // 18
    Meteor.methods({                                                                                                // 19
        ATCreateUserServer: function(options){                                                                      // 20
            if (AccountsTemplates.options.forbidClientAccountCreation)                                              // 21
                throw new Meteor.Error(403, "Client side accounts creation is disabled!!!");                        // 22
            // createUser() does more checking.                                                                     // 23
            check(options, Object);                                                                                 // 24
            var allFieldIds = AccountsTemplates.getFieldIds();                                                      // 25
            // Picks-up whitelisted fields for profile                                                              // 26
            var profile = options.profile;                                                                          // 27
            profile = _.pick(profile, allFieldIds);                                                                 // 28
            profile = _.omit(profile, "username", "email", "password");                                             // 29
            // Validates fields" value                                                                              // 30
            var signupInfo = _.clone(profile);                                                                      // 31
            if (options.username) {                                                                                 // 32
                signupInfo.username = options.username;                                                             // 33
                                                                                                                    // 34
                if (AccountsTemplates.options.lowercaseUsername) {                                                  // 35
                  signupInfo.username = signupInfo.username.trim().replace(/\s+/gm, ' ');                           // 36
                  options.profile.username = signupInfo.username;                                                   // 37
                  signupInfo.username = signupInfo.username.toLowerCase().replace(/\s+/gm, '');                     // 38
                  options.username = signupInfo.username                                                            // 39
                }                                                                                                   // 40
            }                                                                                                       // 41
            if (options.email) {                                                                                    // 42
                signupInfo.email = options.email;                                                                   // 43
                                                                                                                    // 44
                if (AccountsTemplates.options.lowercaseUsername) {                                                  // 45
                  signupInfo.email = signupInfo.email.toLowerCase().replace(/\s+/gm, '');                           // 46
                  options.email = signupInfo.email                                                                  // 47
                }                                                                                                   // 48
            }                                                                                                       // 49
            if (options.password)                                                                                   // 50
                signupInfo.password = options.password;                                                             // 51
            var validationErrors = {};                                                                              // 52
            var someError = false;                                                                                  // 53
                                                                                                                    // 54
            // Validates fields values                                                                              // 55
            _.each(AccountsTemplates.getFields(), function(field){                                                  // 56
                var fieldId = field._id;                                                                            // 57
                var value = signupInfo[fieldId];                                                                    // 58
                if (fieldId === "password"){                                                                        // 59
                    // Can"t Pick-up password here                                                                  // 60
                    // NOTE: at this stage the password is already encripted,                                       // 61
                    //       so there is no way to validate it!!!                                                   // 62
                    check(value, Object);                                                                           // 63
                    return;                                                                                         // 64
                }                                                                                                   // 65
                var validationErr = field.validate(value, "strict");                                                // 66
                if (validationErr) {                                                                                // 67
                    validationErrors[fieldId] = validationErr;                                                      // 68
                    someError = true;                                                                               // 69
                }                                                                                                   // 70
            });                                                                                                     // 71
                                                                                                                    // 72
            if (AccountsTemplates.options.showReCaptcha) {                                                          // 73
                var secretKey = null;                                                                               // 74
                                                                                                                    // 75
                if (AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.secretKey) {         // 76
                    secretKey = AccountsTemplates.options.reCaptcha.secretKey;                                      // 77
                }                                                                                                   // 78
                else {                                                                                              // 79
                    secretKey = Meteor.settings.reCaptcha.secretKey;                                                // 80
                }                                                                                                   // 81
                                                                                                                    // 82
                var apiResponse = HTTP.post("https://www.google.com/recaptcha/api/siteverify", {                    // 83
                  params: {                                                                                         // 84
                      secret: secretKey,                                                                            // 85
                      response: options.profile.reCaptchaResponse,                                                  // 86
                      remoteip: this.connection.clientAddress,                                                      // 87
                  }                                                                                                 // 88
                }).data;                                                                                            // 89
                                                                                                                    // 90
                if (!apiResponse.success) {                                                                         // 91
                    throw new Meteor.Error(403, "Captcha verification failed!",                                     // 92
                      apiResponse['error-codes'] ? apiResponse['error-codes'].join(", ") : "Unknown Error.");       // 93
                }                                                                                                   // 94
            }                                                                                                       // 95
                                                                                                                    // 96
            if (someError)                                                                                          // 97
                throw new Meteor.Error(403, "Validation Errors", validationErrors);                                 // 98
                                                                                                                    // 99
            // Possibly removes the profile field                                                                   // 100
            if (_.isEmpty(options.profile))                                                                         // 101
                delete options.profile;                                                                             // 102
                                                                                                                    // 103
            // Create user. result contains id and token.                                                           // 104
            var userId = Accounts.createUser(options);                                                              // 105
            // safety belt. createUser is supposed to throw on error. send 500 error                                // 106
            // instead of sending a verification email with empty userid.                                           // 107
            if (! userId)                                                                                           // 108
                throw new Error("createUser failed to insert new user");                                            // 109
                                                                                                                    // 110
            // Send a email address verification email in case the context permits it                               // 111
            // and the specific configuration flag was set to true                                                  // 112
            if (options.email && AccountsTemplates.options.sendVerificationEmail)                                   // 113
                Accounts.sendVerificationEmail(userId, options.email);                                              // 114
        },                                                                                                          // 115
    });                                                                                                             // 116
}                                                                                                                   // 117
                                                                                                                    // 118
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['useraccounts:core'] = {
  AccountsTemplates: AccountsTemplates
};

})();

//# sourceMappingURL=useraccounts_core.js.map
