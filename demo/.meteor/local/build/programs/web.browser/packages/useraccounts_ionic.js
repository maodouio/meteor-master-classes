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
var Template = Package.templating.Template;
var AccountsTemplates = Package['useraccounts:core'].AccountsTemplates;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Accounts = Package['accounts-base'].Accounts;
var T9n = Package['softwarerero:accounts-t9n'].T9n;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var HTML = Package.htmljs.HTML;
var Iron = Package['iron:core'].Iron;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_error.js                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atError");                                                                                    // 2
Template["atError"] = new Template("Template.atError", (function() {                                                // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "card at-error"                                                                                        // 6
  }, "\n    ", Blaze.Each(function() {                                                                              // 7
    return Spacebars.call(view.lookup("error"));                                                                    // 8
  }, function() {                                                                                                   // 9
    return [ "\n    ", HTML.DIV({                                                                                   // 10
      "class": "item item-text-wrap"                                                                                // 11
    }, Blaze.View("lookup:errorText", function() {                                                                  // 12
      return Spacebars.mustache(view.lookup("errorText"));                                                          // 13
    })), "\n    " ];                                                                                                // 14
  }), "\n  ");                                                                                                      // 15
}));                                                                                                                // 16
                                                                                                                    // 17
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_error.js                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atError.helpers(AccountsTemplates.atErrorHelpers);                                                         // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_form.js                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atForm");                                                                                     // 2
Template["atForm"] = new Template("Template.atForm", (function() {                                                  // 3
  var view = this;                                                                                                  // 4
  return Blaze.Unless(function() {                                                                                  // 5
    return Spacebars.call(view.lookup("hide"));                                                                     // 6
  }, function() {                                                                                                   // 7
    return [ "\n    ", HTML.DIV({                                                                                   // 8
      "class": "list at-form"                                                                                       // 9
    }, "\n      ", Blaze.If(function() {                                                                            // 10
      return Spacebars.call(view.lookup("showTitle"));                                                              // 11
    }, function() {                                                                                                 // 12
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atTitle")), "\n      " ];                       // 13
    }), "\n      ", Blaze.If(function() {                                                                           // 14
      return Spacebars.call(view.lookup("showOauthServices"));                                                      // 15
    }, function() {                                                                                                 // 16
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atOauth")), "\n      " ];                       // 17
    }), "\n      ", Blaze.If(function() {                                                                           // 18
      return Spacebars.call(view.lookup("showServicesSeparator"));                                                  // 19
    }, function() {                                                                                                 // 20
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atSep")), "\n      " ];                         // 21
    }), "\n      ", Blaze.If(function() {                                                                           // 22
      return Spacebars.call(view.lookup("showError"));                                                              // 23
    }, function() {                                                                                                 // 24
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atError")), "\n      " ];                       // 25
    }), "\n      ", Blaze.If(function() {                                                                           // 26
      return Spacebars.call(view.lookup("showResult"));                                                             // 27
    }, function() {                                                                                                 // 28
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atResult")), "\n      " ];                      // 29
    }), "\n      ", Blaze.If(function() {                                                                           // 30
      return Spacebars.call(view.lookup("showMessage"));                                                            // 31
    }, function() {                                                                                                 // 32
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atMessage")), "\n      " ];                     // 33
    }), "\n      ", Blaze.If(function() {                                                                           // 34
      return Spacebars.call(view.lookup("showPwdForm"));                                                            // 35
    }, function() {                                                                                                 // 36
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atPwdForm")), "\n      " ];                     // 37
    }), "\n      ", Blaze.If(function() {                                                                           // 38
      return Spacebars.call(view.lookup("showTermsLink"));                                                          // 39
    }, function() {                                                                                                 // 40
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atTermsLink")), "\n      " ];                   // 41
    }), "\n      ", Blaze.If(function() {                                                                           // 42
      return Spacebars.call(view.lookup("showSignInLink"));                                                         // 43
    }, function() {                                                                                                 // 44
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atSigninLink")), "\n      " ];                  // 45
    }), "\n      ", Blaze.If(function() {                                                                           // 46
      return Spacebars.call(view.lookup("showSignUpLink"));                                                         // 47
    }, function() {                                                                                                 // 48
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atSignupLink")), "\n      " ];                  // 49
    }), "\n      ", Blaze.If(function() {                                                                           // 50
      return Spacebars.call(view.lookup("showResendVerificationEmailLink"));                                        // 51
    }, function() {                                                                                                 // 52
      return [ "\n        ", Spacebars.include(view.lookupTemplate("atResendVerificationEmailLink")), "\n      " ]; // 53
    }), "\n    "), "\n  " ];                                                                                        // 54
  });                                                                                                               // 55
}));                                                                                                                // 56
                                                                                                                    // 57
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_form.js                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atForm.helpers(AccountsTemplates.atFormHelpers);                                                           // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_input.js                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atInput");                                                                                    // 2
Template["atInput"] = new Template("Template.atInput", (function() {                                                // 3
  var view = this;                                                                                                  // 4
  return Blaze._TemplateWith(function() {                                                                           // 5
    return {                                                                                                        // 6
      template: Spacebars.call(view.lookup("templateName"))                                                         // 7
    };                                                                                                              // 8
  }, function() {                                                                                                   // 9
    return Spacebars.include(function() {                                                                           // 10
      return Spacebars.call(Template.__dynamic);                                                                    // 11
    });                                                                                                             // 12
  });                                                                                                               // 13
}));                                                                                                                // 14
                                                                                                                    // 15
Template.__checkName("atTextInput");                                                                                // 16
Template["atTextInput"] = new Template("Template.atTextInput", (function() {                                        // 17
  var view = this;                                                                                                  // 18
  return HTML.DIV({                                                                                                 // 19
    "class": function() {                                                                                           // 20
      return [ "at-input item item-input item-text-wrap ", Blaze.If(function() {                                    // 21
        return Spacebars.call(view.lookup("showLabels"));                                                           // 22
      }, function() {                                                                                               // 23
        return "item-stacked-label";                                                                                // 24
      }), " ", Blaze.If(function() {                                                                                // 25
        return Spacebars.call(view.lookup("isValidating"));                                                         // 26
      }, function() {                                                                                               // 27
        return "validating";                                                                                        // 28
      }), " ", Blaze.If(function() {                                                                                // 29
        return Spacebars.call(view.lookup("hasError"));                                                             // 30
      }, function() {                                                                                               // 31
        return "has-error";                                                                                         // 32
      }), " ", Blaze.If(function() {                                                                                // 33
        return Spacebars.call(view.lookup("hasSuccess"));                                                           // 34
      }, function() {                                                                                               // 35
        return "has-success";                                                                                       // 36
      }), " ", Blaze.If(function() {                                                                                // 37
        return Spacebars.call(view.lookup("feedback"));                                                             // 38
      }, function() {                                                                                               // 39
        return "has-feedback";                                                                                      // 40
      }) ];                                                                                                         // 41
    }                                                                                                               // 42
  }, "\n    ", Blaze.If(function() {                                                                                // 43
    return Spacebars.call(view.lookup("showLabels"));                                                               // 44
  }, function() {                                                                                                   // 45
    return [ "\n      ", HTML.LABEL({                                                                               // 46
      "class": "input-label",                                                                                       // 47
      "for": function() {                                                                                           // 48
        return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                             // 49
      }                                                                                                             // 50
    }, "\n        ", Blaze.View("lookup:displayName", function() {                                                  // 51
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("displayName")));                                     // 52
    }), " ", Blaze.Unless(function() {                                                                              // 53
      return Spacebars.call(view.lookup("required"));                                                               // 54
    }, function() {                                                                                                 // 55
      return Blaze.View("lookup:optionalText", function() {                                                         // 56
        return Spacebars.mustache(view.lookup("optionalText"));                                                     // 57
      });                                                                                                           // 58
    }), "\n      "), "\n    " ];                                                                                    // 59
  }), "\n    ", HTML.INPUT({                                                                                        // 60
    type: function() {                                                                                              // 61
      return Spacebars.mustache(view.lookup("type"));                                                               // 62
    },                                                                                                              // 63
    id: function() {                                                                                                // 64
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 65
    },                                                                                                              // 66
    name: function() {                                                                                              // 67
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 68
    },                                                                                                              // 69
    placeholder: function() {                                                                                       // 70
      return Spacebars.mustache(view.lookup("placeholder"));                                                        // 71
    },                                                                                                              // 72
    autocapitalize: "none",                                                                                         // 73
    autocorrect: "off"                                                                                              // 74
  }), "\n    ", Blaze.If(function() {                                                                               // 75
    return Spacebars.call(view.lookup("hasIcon"));                                                                  // 76
  }, function() {                                                                                                   // 77
    return [ "\n      ", HTML.SPAN({                                                                                // 78
      "class": function() {                                                                                         // 79
        return Spacebars.mustache(view.lookup("iconClass"));                                                        // 80
      }                                                                                                             // 81
    }), "\n    " ];                                                                                                 // 82
  }), "\n    ", Blaze.If(function() {                                                                               // 83
    return Spacebars.call(view.lookup("hasError"));                                                                 // 84
  }, function() {                                                                                                   // 85
    return [ "\n      ", HTML.SPAN(Blaze.View("lookup:errorText", function() {                                      // 86
      return Spacebars.mustache(view.lookup("errorText"));                                                          // 87
    })), "\n    " ];                                                                                                // 88
  }), "\n  ");                                                                                                      // 89
}));                                                                                                                // 90
                                                                                                                    // 91
Template.__checkName("atCheckboxInput");                                                                            // 92
Template["atCheckboxInput"] = new Template("Template.atCheckboxInput", (function() {                                // 93
  var view = this;                                                                                                  // 94
  return HTML.DIV({                                                                                                 // 95
    "class": "at-input item item-toggle item-text-wrap"                                                             // 96
  }, "\n    ", HTML.LABEL({                                                                                         // 97
    "class": "toggle toggle-balance",                                                                               // 98
    "for": function() {                                                                                             // 99
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 100
    }                                                                                                               // 101
  }, "\n      ", HTML.INPUT(HTML.Attrs({                                                                            // 102
    type: function() {                                                                                              // 103
      return Spacebars.mustache(view.lookup("type"));                                                               // 104
    },                                                                                                              // 105
    id: function() {                                                                                                // 106
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 107
    },                                                                                                              // 108
    name: function() {                                                                                              // 109
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 110
    }                                                                                                               // 111
  }, function() {                                                                                                   // 112
    return Spacebars.attrMustache(view.lookup("disabled"));                                                         // 113
  })), "\n      ", HTML.Raw('<div class="track">\n        <div class="handle"></div>\n      </div>'), "\n    "), "\n    ", Blaze.View("lookup:displayName", function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("displayName")));                                       // 115
  }), "\n  ");                                                                                                      // 116
}));                                                                                                                // 117
                                                                                                                    // 118
Template.__checkName("atSelectInput");                                                                              // 119
Template["atSelectInput"] = new Template("Template.atSelectInput", (function() {                                    // 120
  var view = this;                                                                                                  // 121
  return HTML.DIV({                                                                                                 // 122
    "class": "at-input item item-input item-select item-text-wrap"                                                  // 123
  }, "\n    ", HTML.DIV({                                                                                           // 124
    "class": "input-label"                                                                                          // 125
  }, "\n      ", HTML.LABEL({                                                                                       // 126
    "for": function() {                                                                                             // 127
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 128
    }                                                                                                               // 129
  }, Blaze.View("lookup:displayName", function() {                                                                  // 130
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("displayName")));                                       // 131
  })), "\n    "), "\n    ", HTML.SELECT({                                                                           // 132
    id: function() {                                                                                                // 133
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 134
    },                                                                                                              // 135
    name: function() {                                                                                              // 136
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 137
    }                                                                                                               // 138
  }, "\n      ", Blaze.Each(function() {                                                                            // 139
    return Spacebars.call(view.lookup("values"));                                                                   // 140
  }, function() {                                                                                                   // 141
    return [ "\n        ", HTML.OPTION({                                                                            // 142
      value: function() {                                                                                           // 143
        return Spacebars.mustache(view.lookup("value"));                                                            // 144
      }                                                                                                             // 145
    }, Blaze.View("lookup:text", function() {                                                                       // 146
      return Spacebars.mustache(view.lookup("text"));                                                               // 147
    })), "\n      " ];                                                                                              // 148
  }), "\n    "), "\n  ");                                                                                           // 149
}));                                                                                                                // 150
                                                                                                                    // 151
Template.__checkName("atRadioInput");                                                                               // 152
Template["atRadioInput"] = new Template("Template.atRadioInput", (function() {                                      // 153
  var view = this;                                                                                                  // 154
  return [ HTML.DIV({                                                                                               // 155
    "class": "item item-divider"                                                                                    // 156
  }, "\n    ", Blaze.View("lookup:displayName", function() {                                                        // 157
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("displayName")));                                       // 158
  }), "\n  "), "\n  ", Blaze.Each(function() {                                                                      // 159
    return Spacebars.call(view.lookup("values"));                                                                   // 160
  }, function() {                                                                                                   // 161
    return [ "\n    ", HTML.LABEL({                                                                                 // 162
      "class": "at-input item item-radio item-text-wrap"                                                            // 163
    }, "\n      ", HTML.INPUT({                                                                                     // 164
      id: function() {                                                                                              // 165
        return [ "at-field-", Spacebars.mustache(view.lookup("id")), "-choice-", Spacebars.mustache(view.lookup("value")) ];
      },                                                                                                            // 167
      type: "radio",                                                                                                // 168
      name: function() {                                                                                            // 169
        return [ "at-field-", Spacebars.mustache(view.lookup("id")) ];                                              // 170
      },                                                                                                            // 171
      value: function() {                                                                                           // 172
        return Spacebars.mustache(view.lookup("value"));                                                            // 173
      }                                                                                                             // 174
    }), "\n      ", HTML.DIV({                                                                                      // 175
      "class": "item-content"                                                                                       // 176
    }, Blaze.View("lookup:text", function() {                                                                       // 177
      return Spacebars.mustache(view.lookup("text"));                                                               // 178
    })), "\n      ", HTML.I({                                                                                       // 179
      "class": "radio-icon ion-checkmark"                                                                           // 180
    }), "\n    "), "\n  " ];                                                                                        // 181
  }) ];                                                                                                             // 182
}));                                                                                                                // 183
                                                                                                                    // 184
Template.__checkName("atHiddenInput");                                                                              // 185
Template["atHiddenInput"] = new Template("Template.atHiddenInput", (function() {                                    // 186
  var view = this;                                                                                                  // 187
  return HTML.INPUT({                                                                                               // 188
    type: "hidden",                                                                                                 // 189
    id: function() {                                                                                                // 190
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 191
    },                                                                                                              // 192
    name: function() {                                                                                              // 193
      return [ "at-field-", Spacebars.mustache(view.lookup("_id")) ];                                               // 194
    }                                                                                                               // 195
  });                                                                                                               // 196
}));                                                                                                                // 197
                                                                                                                    // 198
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_input.js                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Template.atInput.rendered = AccountsTemplates.atInputRendered;                                                      // 1
                                                                                                                    // 2
// Simply 'inherites' helpers from AccountsTemplates                                                                // 3
Template.atInput.helpers(AccountsTemplates.atInputHelpers);                                                         // 4
                                                                                                                    // 5
// Simply 'inherites' events from AccountsTemplates                                                                 // 6
Template.atInput.events(AccountsTemplates.atInputEvents);                                                           // 7
                                                                                                                    // 8
// Simply 'inherites' helpers from AccountsTemplates                                                                // 9
Template.atTextInput.helpers(AccountsTemplates.atInputHelpers);                                                     // 10
                                                                                                                    // 11
// Simply 'inherites' helpers from AccountsTemplates                                                                // 12
Template.atCheckboxInput.helpers(AccountsTemplates.atInputHelpers);                                                 // 13
                                                                                                                    // 14
// Simply 'inherites' helpers from AccountsTemplates                                                                // 15
Template.atSelectInput.helpers(AccountsTemplates.atInputHelpers);                                                   // 16
                                                                                                                    // 17
// Simply 'inherites' helpers from AccountsTemplates                                                                // 18
Template.atRadioInput.helpers(AccountsTemplates.atInputHelpers);                                                    // 19
                                                                                                                    // 20
// Simply 'inherites' helpers from AccountsTemplates                                                                // 21
Template.atHiddenInput.helpers(AccountsTemplates.atInputHelpers);                                                   // 22
                                                                                                                    // 23
AccountsTemplates.configure({                                                                                       // 24
  texts: {                                                                                                          // 25
    inputIcons: {                                                                                                   // 26
      isValidating: "icon ion-load-d",                                                                              // 27
      hasSuccess: "icon ion-checkmark",                                                                             // 28
      hasError: "icon ion-close"                                                                                    // 29
    }                                                                                                               // 30
  },                                                                                                                // 31
});                                                                                                                 // 32
                                                                                                                    // 33
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_nav_button.js                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atNavButton");                                                                                // 2
Template["atNavButton"] = new Template("Template.atNavButton", (function() {                                        // 3
  var view = this;                                                                                                  // 4
  return HTML.A({                                                                                                   // 5
    "class": "button button-clear pull-right",                                                                      // 6
    id: "at-nav-button"                                                                                             // 7
  }, Blaze.View("lookup:text", function() {                                                                         // 8
    return Spacebars.mustache(view.lookup("text"));                                                                 // 9
  }));                                                                                                              // 10
}));                                                                                                                // 11
                                                                                                                    // 12
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_nav_button.js                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atNavButton.helpers(AccountsTemplates.atNavButtonHelpers);                                                 // 2
                                                                                                                    // 3
// Simply 'inherites' events from AccountsTemplates                                                                 // 4
Template.atNavButton.events(AccountsTemplates.atNavButtonEvents);                                                   // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_oauth.js                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atOauth");                                                                                    // 2
Template["atOauth"] = new Template("Template.atOauth", (function() {                                                // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "at-oauth"                                                                                             // 6
  }, "\n    ", Blaze.Each(function() {                                                                              // 7
    return Spacebars.call(view.lookup("oauthService"));                                                             // 8
  }, function() {                                                                                                   // 9
    return [ "\n      ", Spacebars.include(view.lookupTemplate("atSocial")), "\n    " ];                            // 10
  }), "\n  ");                                                                                                      // 11
}));                                                                                                                // 12
                                                                                                                    // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_oauth.js                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atOauth.helpers(AccountsTemplates.atOauthHelpers);                                                         // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_pwd_form.js                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atPwdForm");                                                                                  // 2
Template["atPwdForm"] = new Template("Template.atPwdForm", (function() {                                            // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "at-pwd-form"                                                                                          // 6
  }, "\n    ", HTML.FORM({                                                                                          // 7
    role: "form",                                                                                                   // 8
    id: "at-pwd-form",                                                                                              // 9
    "class": function() {                                                                                           // 10
      return Spacebars.mustache(view.lookup("disabled"));                                                           // 11
    },                                                                                                              // 12
    novalidate: "",                                                                                                 // 13
    action: "#",                                                                                                    // 14
    method: "POST"                                                                                                  // 15
  }, "\n      ", Blaze.Each(function() {                                                                            // 16
    return Spacebars.call(view.lookup("fields"));                                                                   // 17
  }, function() {                                                                                                   // 18
    return [ "\n        ", Spacebars.include(view.lookupTemplate("atInput")), "\n      " ];                         // 19
  }), "\n      ", Blaze.If(function() {                                                                             // 20
    return Spacebars.call(view.lookup("showReCaptcha"));                                                            // 21
  }, function() {                                                                                                   // 22
    return [ "\n        ", Spacebars.include(view.lookupTemplate("atReCaptcha")), "\n      " ];                     // 23
  }), "\n      ", Blaze.If(function() {                                                                             // 24
    return Spacebars.call(view.lookup("showForgotPasswordLink"));                                                   // 25
  }, function() {                                                                                                   // 26
    return [ "\n        ", Spacebars.include(view.lookupTemplate("atPwdLink")), "\n      " ];                       // 27
  }), "\n      ", Spacebars.include(view.lookupTemplate("atPwdFormBtn")), "\n    "), "\n  ");                       // 28
}));                                                                                                                // 29
                                                                                                                    // 30
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_pwd_form.js                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atPwdForm.helpers(AccountsTemplates.atPwdFormHelpers);                                                     // 2
                                                                                                                    // 3
// Simply 'inherites' events from AccountsTemplates                                                                 // 4
Template.atPwdForm.events(AccountsTemplates.atPwdFormEvents);                                                       // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_pwd_form_btn.js                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atPwdFormBtn");                                                                               // 2
Template["atPwdFormBtn"] = new Template("Template.atPwdFormBtn", (function() {                                      // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "padding"                                                                                              // 6
  }, "\n    ", HTML.BUTTON({                                                                                        // 7
    type: "submit",                                                                                                 // 8
    "class": function() {                                                                                           // 9
      return [ "at-btn button button-positive button-block submit ", Spacebars.mustache(view.lookup("submitDisabled")) ];
    },                                                                                                              // 11
    id: "at-btn"                                                                                                    // 12
  }, "\n      ", Blaze.View("lookup:buttonText", function() {                                                       // 13
    return Spacebars.mustache(view.lookup("buttonText"));                                                           // 14
  }), "\n    "), "\n  ");                                                                                           // 15
}));                                                                                                                // 16
                                                                                                                    // 17
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_pwd_form_btn.js                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atPwdFormBtn.helpers(AccountsTemplates.atPwdFormBtnHelpers);                                               // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_pwd_link.js                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atPwdLink");                                                                                  // 2
Template["atPwdLink"] = new Template("Template.atPwdLink", (function() {                                            // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "at-pwd-link"                                                                                          // 6
  }, "\n    ", HTML.DIV({                                                                                           // 7
    "class": "padding"                                                                                              // 8
  }, "\n      ", Blaze.View("lookup:preText", function() {                                                          // 9
    return Spacebars.mustache(view.lookup("preText"));                                                              // 10
  }), "\n      ", HTML.A({                                                                                          // 11
    href: function() {                                                                                              // 12
      return Spacebars.mustache(view.lookup("forgotPwdLink"));                                                      // 13
    },                                                                                                              // 14
    id: "at-forgotPwd",                                                                                             // 15
    "class": function() {                                                                                           // 16
      return [ "at-link at-pwd positive ", Spacebars.mustache(view.lookup("disabled")) ];                           // 17
    }                                                                                                               // 18
  }, Blaze.View("lookup:linkText", function() {                                                                     // 19
    return Spacebars.mustache(view.lookup("linkText"));                                                             // 20
  })), "\n      ", Blaze.View("lookup:suffText", function() {                                                       // 21
    return Spacebars.mustache(view.lookup("suffText"));                                                             // 22
  }), "\n    "), "\n  ");                                                                                           // 23
}));                                                                                                                // 24
                                                                                                                    // 25
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_pwd_link.js                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atPwdLink.helpers(AccountsTemplates.atPwdLinkHelpers);                                                     // 2
                                                                                                                    // 3
// Simply 'inherites' events from AccountsTemplates                                                                 // 4
Template.atPwdLink.events(AccountsTemplates.atPwdLinkEvents);                                                       // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_reCaptcha.js                                                         //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atReCaptcha");                                                                                // 2
Template["atReCaptcha"] = new Template("Template.atReCaptcha", (function() {                                        // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "g-recaptcha",                                                                                         // 6
    "data-sitekey": function() {                                                                                    // 7
      return Spacebars.mustache(view.lookup("key"));                                                                // 8
    },                                                                                                              // 9
    "data-theme": function() {                                                                                      // 10
      return Spacebars.mustache(view.lookup("theme"));                                                              // 11
    },                                                                                                              // 12
    "data-type": function() {                                                                                       // 13
      return Spacebars.mustache(view.lookup("data_type"));                                                          // 14
    }                                                                                                               // 15
  });                                                                                                               // 16
}));                                                                                                                // 17
                                                                                                                    // 18
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_reCaptcha.js                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' rendered callback from AccountsTemplates                                                      // 1
Template.atReCaptcha.rendered = AccountsTemplates.atReCaptchaRendered;                                              // 2
                                                                                                                    // 3
// Simply 'inherites' helpers from AccountsTemplates                                                                // 4
Template.atReCaptcha.helpers(AccountsTemplates.atReCaptchaHelpers);                                                 // 5
                                                                                                                    // 6
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_result.js                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atResult");                                                                                   // 2
Template["atResult"] = new Template("Template.atResult", (function() {                                              // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "at-result"                                                                                            // 6
  }, "\n    ", Blaze.View("lookup:result", function() {                                                             // 7
    return Spacebars.mustache(view.lookup("result"));                                                               // 8
  }), "\n  ");                                                                                                      // 9
}));                                                                                                                // 10
                                                                                                                    // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_result.js                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atResult.helpers(AccountsTemplates.atResultHelpers);                                                       // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_sep.js                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atSep");                                                                                      // 2
Template["atSep"] = new Template("Template.atSep", (function() {                                                    // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "item item-divider at-sep"                                                                             // 6
  }, "\n    ", Blaze.View("lookup:sepText", function() {                                                            // 7
    return Spacebars.mustache(view.lookup("sepText"));                                                              // 8
  }), "\n  ");                                                                                                      // 9
}));                                                                                                                // 10
                                                                                                                    // 11
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_sep.js                                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atSep.helpers(AccountsTemplates.atSepHelpers);                                                             // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_signin_link.js                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atSigninLink");                                                                               // 2
Template["atSigninLink"] = new Template("Template.atSigninLink", (function() {                                      // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "at-signin-link"                                                                                       // 6
  }, "\n    ", HTML.P("\n      ", Blaze.View("lookup:preText", function() {                                         // 7
    return Spacebars.mustache(view.lookup("preText"));                                                              // 8
  }), "\n      ", HTML.A({                                                                                          // 9
    href: function() {                                                                                              // 10
      return Spacebars.mustache(view.lookup("signInLink"));                                                         // 11
    },                                                                                                              // 12
    id: "at-signIn",                                                                                                // 13
    "class": function() {                                                                                           // 14
      return [ "at-link at-signin positive ", Spacebars.mustache(view.lookup("disabled")) ];                        // 15
    }                                                                                                               // 16
  }, Blaze.View("lookup:linkText", function() {                                                                     // 17
    return Spacebars.mustache(view.lookup("linkText"));                                                             // 18
  })), "\n      ", Blaze.View("lookup:suffText", function() {                                                       // 19
    return Spacebars.mustache(view.lookup("suffText"));                                                             // 20
  }), "\n    "), "\n  ");                                                                                           // 21
}));                                                                                                                // 22
                                                                                                                    // 23
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_signin_link.js                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atSigninLink.helpers(AccountsTemplates.atSigninLinkHelpers);                                               // 2
                                                                                                                    // 3
// Simply 'inherites' events from AccountsTemplates                                                                 // 4
Template.atSigninLink.events(AccountsTemplates.atSigninLinkEvents);                                                 // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_signup_link.js                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atSignupLink");                                                                               // 2
Template["atSignupLink"] = new Template("Template.atSignupLink", (function() {                                      // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "at-signup-link padding text-center"                                                                   // 6
  }, "\n    ", HTML.P("\n      ", Blaze.View("lookup:preText", function() {                                         // 7
    return Spacebars.mustache(view.lookup("preText"));                                                              // 8
  }), "\n      ", HTML.A({                                                                                          // 9
    href: function() {                                                                                              // 10
      return Spacebars.mustache(view.lookup("signUpLink"));                                                         // 11
    },                                                                                                              // 12
    id: "at-signUp",                                                                                                // 13
    "class": function() {                                                                                           // 14
      return [ "at-link at-signup positive ", Spacebars.mustache(view.lookup("disabled")) ];                        // 15
    }                                                                                                               // 16
  }, Blaze.View("lookup:linkText", function() {                                                                     // 17
    return Spacebars.mustache(view.lookup("linkText"));                                                             // 18
  })), "\n      ", Blaze.View("lookup:suffText", function() {                                                       // 19
    return Spacebars.mustache(view.lookup("suffText"));                                                             // 20
  }), "\n    "), "\n  ");                                                                                           // 21
}));                                                                                                                // 22
                                                                                                                    // 23
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_signup_link.js                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atSignupLink.helpers(AccountsTemplates.atSignupLinkHelpers);                                               // 2
                                                                                                                    // 3
// Simply 'inherites' events from AccountsTemplates                                                                 // 4
Template.atSignupLink.events(AccountsTemplates.atSignupLinkEvents);                                                 // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_social.js                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atSocial");                                                                                   // 2
Template["atSocial"] = new Template("Template.atSocial", (function() {                                              // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "item"                                                                                                 // 6
  }, "\n    ", HTML.BUTTON({                                                                                        // 7
    "class": function() {                                                                                           // 8
      return [ "button button-block at-social-btn ", Spacebars.mustache(view.lookup("disabled")) ];                 // 9
    },                                                                                                              // 10
    id: function() {                                                                                                // 11
      return [ "at-", Spacebars.mustache(view.lookup("name")) ];                                                    // 12
    },                                                                                                              // 13
    name: function() {                                                                                              // 14
      return Spacebars.mustache(view.lookup("name"));                                                               // 15
    }                                                                                                               // 16
  }, "\n      ", HTML.I({                                                                                           // 17
    "class": function() {                                                                                           // 18
      return Spacebars.mustache(view.lookup("iconClass"));                                                          // 19
    }                                                                                                               // 20
  }), " ", Blaze.View("lookup:buttonText", function() {                                                             // 21
    return Spacebars.mustache(view.lookup("buttonText"));                                                           // 22
  }), "\n    "), "\n  ");                                                                                           // 23
}));                                                                                                                // 24
                                                                                                                    // 25
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_social.js                                                                     //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atSocial.helpers(AccountsTemplates.atSocialHelpers);                                                       // 2
// Simply 'inherites' events from AccountsTemplates                                                                 // 3
Template.atSocial.events(AccountsTemplates.atSocialEvents);                                                         // 4
                                                                                                                    // 5
AccountsTemplates.configure({                                                                                       // 6
  texts: {                                                                                                          // 7
    socialIcons: {                                                                                                  // 8
      facebook: "icon ion-social-facebook",                                                                         // 9
      twitter: "icon ion-social-twitter",                                                                           // 10
      google: "icon ion-social-google",                                                                             // 11
      github: "icon ion-social-github",                                                                             // 12
      linkedin: "icon ion-social-linkedin",                                                                         // 13
      instagram: "icon ion-social-instagram"                                                                        // 14
    }                                                                                                               // 15
  }                                                                                                                 // 16
});                                                                                                                 // 17
                                                                                                                    // 18
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_terms_link.js                                                        //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atTermsLink");                                                                                // 2
Template["atTermsLink"] = new Template("Template.atTermsLink", (function() {                                        // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "at-terms-link at-wrap card"                                                                           // 6
  }, "\n    ", HTML.DIV({                                                                                           // 7
    "class": "item item-text-wrap"                                                                                  // 8
  }, "\n      ", HTML.SMALL("\n        ", Blaze.View("lookup:text", function() {                                    // 9
    return Spacebars.mustache(view.lookup("text"));                                                                 // 10
  }), "\n        ", Blaze.If(function() {                                                                           // 11
    return Spacebars.call(view.lookup("privacyUrl"));                                                               // 12
  }, function() {                                                                                                   // 13
    return [ "\n          ", HTML.A({                                                                               // 14
      href: function() {                                                                                            // 15
        return Spacebars.mustache(view.lookup("privacyUrl"));                                                       // 16
      },                                                                                                            // 17
      "class": function() {                                                                                         // 18
        return [ Spacebars.mustache(view.lookup("disabled")), " positive" ];                                        // 19
      }                                                                                                             // 20
    }, Blaze.View("lookup:privacyLinkText", function() {                                                            // 21
      return Spacebars.mustache(view.lookup("privacyLinkText"));                                                    // 22
    })), "\n        " ];                                                                                            // 23
  }), "\n        ", Blaze.If(function() {                                                                           // 24
    return Spacebars.call(view.lookup("showTermsAnd"));                                                             // 25
  }, function() {                                                                                                   // 26
    return [ "\n          ", Blaze.View("lookup:and", function() {                                                  // 27
      return Spacebars.mustache(view.lookup("and"));                                                                // 28
    }), "\n        " ];                                                                                             // 29
  }), "\n        ", Blaze.If(function() {                                                                           // 30
    return Spacebars.call(view.lookup("termsUrl"));                                                                 // 31
  }, function() {                                                                                                   // 32
    return [ "\n          ", HTML.A({                                                                               // 33
      href: function() {                                                                                            // 34
        return Spacebars.mustache(view.lookup("termsUrl"));                                                         // 35
      },                                                                                                            // 36
      "class": function() {                                                                                         // 37
        return [ Spacebars.mustache(view.lookup("disabled")), " positive" ];                                        // 38
      }                                                                                                             // 39
    }, Blaze.View("lookup:termsLinkText", function() {                                                              // 40
      return Spacebars.mustache(view.lookup("termsLinkText"));                                                      // 41
    })), "\n        " ];                                                                                            // 42
  }), "\n      "), "\n    "), "\n  ");                                                                              // 43
}));                                                                                                                // 44
                                                                                                                    // 45
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_terms_link.js                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atTermsLink.helpers(AccountsTemplates.atTermsLinkHelpers);                                                 // 2
                                                                                                                    // 3
// Simply 'inherites' events from AccountsTemplates                                                                 // 4
Template.atTermsLink.events(AccountsTemplates.atTermsLinkEvents);                                                   // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_resend_verification_email_link.js                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atResendVerificationEmailLink");                                                              // 2
Template["atResendVerificationEmailLink"] = new Template("Template.atResendVerificationEmailLink", (function() {    // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "at-resend-verification-email-link at-wrap"                                                            // 6
  }, "\n    ", HTML.DIV({                                                                                           // 7
    "class": "padding"                                                                                              // 8
  }, "\n      ", HTML.A({                                                                                           // 9
    href: function() {                                                                                              // 10
      return Spacebars.mustache(view.lookup("resendVerificationEmailLink"));                                        // 11
    },                                                                                                              // 12
    id: "at-resend-verification-email",                                                                             // 13
    "class": function() {                                                                                           // 14
      return [ "at-link at-resend-verification-email positive ", Spacebars.mustache(view.lookup("disabled")) ];     // 15
    }                                                                                                               // 16
  }, Blaze.View("lookup:linkText", function() {                                                                     // 17
    return Spacebars.mustache(view.lookup("linkText"));                                                             // 18
  })), "\n    "), "\n  ");                                                                                          // 19
}));                                                                                                                // 20
                                                                                                                    // 21
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_resend_verification_email_link.js                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atResendVerificationEmailLink.helpers(AccountsTemplates.atResendVerificationEmailLinkHelpers);             // 2
                                                                                                                    // 3
// Simply 'inherites' events from AccountsTemplates                                                                 // 4
Template.atResendVerificationEmailLink.events(AccountsTemplates.atResendVerificationEmailLinkEvents);               // 5
                                                                                                                    // 6
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.at_title.js                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("atTitle");                                                                                    // 2
Template["atTitle"] = new Template("Template.atTitle", (function() {                                                // 3
  var view = this;                                                                                                  // 4
  return HTML.DIV({                                                                                                 // 5
    "class": "item item-divider"                                                                                    // 6
  }, "\n    ", HTML.H3({                                                                                            // 7
    "class": "title"                                                                                                // 8
  }, Blaze.View("lookup:title", function() {                                                                        // 9
    return Spacebars.mustache(view.lookup("title"));                                                                // 10
  })), "\n  ");                                                                                                     // 11
}));                                                                                                                // 12
                                                                                                                    // 13
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/at_title.js                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Simply 'inherites' helpers from AccountsTemplates                                                                // 1
Template.atTitle.helpers(AccountsTemplates.atTitleHelpers);                                                         // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/useraccounts:ionic/lib/template.full_page_at_form.js                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("fullPageAtForm");                                                                             // 2
Template["fullPageAtForm"] = new Template("Template.fullPageAtForm", (function() {                                  // 3
  var view = this;                                                                                                  // 4
  return Spacebars.include(view.lookupTemplate("atForm"));                                                          // 5
}));                                                                                                                // 6
                                                                                                                    // 7
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['useraccounts:ionic'] = {};

})();
