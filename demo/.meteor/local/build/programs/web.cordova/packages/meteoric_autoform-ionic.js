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
var _ = Package.underscore._;
var AutoForm = Package['aldeed:autoform'].AutoForm;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var HTML = Package.htmljs.HTML;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/meteoric:autoform-ionic/template.ionic.js                                                             //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("autoForm_ionic");                                                                           // 2
Template["autoForm_ionic"] = new Template("Template.autoForm_ionic", (function() {                                // 3
  var view = this;                                                                                                // 4
  return Blaze.Unless(function() {                                                                                // 5
    return Spacebars.call(view.lookup("afDestroyUpdateForm"));                                                    // 6
  }, function() {                                                                                                 // 7
    return [ "\n    ", HTML.FORM(HTML.Attrs(function() {                                                          // 8
      return Spacebars.attrMustache(view.lookup("atts"));                                                         // 9
    }), "\n      ", HTML.DIV({                                                                                    // 10
      "class": "list"                                                                                             // 11
    }, "\n        ", Spacebars.With(function() {                                                                  // 12
      return Spacebars.dataMustache(view.lookup("innerContext"), view.lookup(".."));                              // 13
    }, function() {                                                                                               // 14
      return [ "\n          ", Blaze._InOuterTemplateScope(view, function() {                                     // 15
        return Blaze._TemplateWith(function() {                                                                   // 16
          return Spacebars.call(view.lookup("."));                                                                // 17
        }, function() {                                                                                           // 18
          return Spacebars.include(function() {                                                                   // 19
            return Spacebars.call(view.templateContentBlock);                                                     // 20
          });                                                                                                     // 21
        });                                                                                                       // 22
      }), "\n        " ];                                                                                         // 23
    }), "\n      "), "\n    "), "\n  " ];                                                                         // 24
  });                                                                                                             // 25
}));                                                                                                              // 26
                                                                                                                  // 27
Template.__checkName("quickForm_ionic");                                                                          // 28
Template["quickForm_ionic"] = new Template("Template.quickForm_ionic", (function() {                              // 29
  var view = this;                                                                                                // 30
  return Blaze._TemplateWith(function() {                                                                         // 31
    return Spacebars.call(Spacebars.dot(view.lookup("."), "qfAutoFormContext"));                                  // 32
  }, function() {                                                                                                 // 33
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                        // 34
      return [ "\n    ", Spacebars.include(view.lookupTemplate("afQuickFields")), "\n    ", Blaze.If(function() { // 35
        return Spacebars.call(view.lookup("qfShouldRenderButton"));                                               // 36
      }, function() {                                                                                             // 37
        return [ "\n      ", HTML.DIV({                                                                           // 38
          "class": "padding"                                                                                      // 39
        }, "\n        ", HTML.BUTTON(HTML.Attrs({                                                                 // 40
          type: "submit"                                                                                          // 41
        }, function() {                                                                                           // 42
          return Spacebars.attrMustache(view.lookup("submitButtonAtts"));                                         // 43
        }), "\n          ", Spacebars.With(function() {                                                           // 44
          return Spacebars.call(Spacebars.dot(view.lookup(".."), "atts", "buttonContent"));                       // 45
        }, function() {                                                                                           // 46
          return [ "\n            ", Blaze.View(function() {                                                      // 47
            return Spacebars.mustache(view.lookup("."));                                                          // 48
          }), "\n          " ];                                                                                   // 49
        }, function() {                                                                                           // 50
          return "\n            Submit\n          ";                                                              // 51
        }), "\n        "), "\n      "), "\n    " ];                                                               // 52
      }), "\n  " ];                                                                                               // 53
    });                                                                                                           // 54
  });                                                                                                             // 55
}));                                                                                                              // 56
                                                                                                                  // 57
Template.__checkName("afQuickField_ionic");                                                                       // 58
Template["afQuickField_ionic"] = new Template("Template.afQuickField_ionic", (function() {                        // 59
  var view = this;                                                                                                // 60
  return Blaze.If(function() {                                                                                    // 61
    return Spacebars.dataMustache(view.lookup("isGroup"), Spacebars.kw({                                          // 62
      atts: view.lookup(".")                                                                                      // 63
    }));                                                                                                          // 64
  }, function() {                                                                                                 // 65
    return [ "\n    ", Spacebars.include(view.lookupTemplate("afObjectField_ionic")), "\n  " ];                   // 66
  }, function() {                                                                                                 // 67
    return [ "\n    ", Blaze.If(function() {                                                                      // 68
      return Spacebars.dataMustache(view.lookup("isFieldArray"), Spacebars.kw({                                   // 69
        atts: view.lookup(".")                                                                                    // 70
      }));                                                                                                        // 71
    }, function() {                                                                                               // 72
      return [ "\n      ", Spacebars.include(view.lookupTemplate("afArrayField_ionic")), "\n    " ];              // 73
    }, function() {                                                                                               // 74
      return [ "\n      ", Blaze._TemplateWith(function() {                                                       // 75
        return Spacebars.call(view.lookup("groupAtts"));                                                          // 76
      }, function() {                                                                                             // 77
        return Spacebars.include(view.lookupTemplate("afFormGroup_ionic"));                                       // 78
      }), "\n    " ];                                                                                             // 79
    }), "\n  " ];                                                                                                 // 80
  });                                                                                                             // 81
}));                                                                                                              // 82
                                                                                                                  // 83
Template.__checkName("afFormGroup_ionic");                                                                        // 84
Template["afFormGroup_ionic"] = new Template("Template.afFormGroup_ionic", (function() {                          // 85
  var view = this;                                                                                                // 86
  return [ Blaze.If(function() {                                                                                  // 87
    return Spacebars.call(view.lookup("skipLabel"));                                                              // 88
  }, function() {                                                                                                 // 89
    return [ "\n    ", Blaze._TemplateWith(function() {                                                           // 90
      return Spacebars.call(Spacebars.dot(view.lookup("."), "afFieldInputAtts"));                                 // 91
    }, function() {                                                                                               // 92
      return Spacebars.include(view.lookupTemplate("afFieldInput"));                                              // 93
    }), "\n  " ];                                                                                                 // 94
  }, function() {                                                                                                 // 95
    return [ "\n    ", HTML.LABEL(HTML.Attrs(function() {                                                         // 96
      return Spacebars.attrMustache(view.lookup("ionicFieldLabelAtts"));                                          // 97
    }), "\n      ", Blaze.Unless(function() {                                                                     // 98
      return Spacebars.call(Spacebars.dot(view.lookup("ionicFieldLabelAtts"), "placeholderOnly"));                // 99
    }, function() {                                                                                               // 100
      return [ "\n        ", HTML.SPAN({                                                                          // 101
        "class": "input-label"                                                                                    // 102
      }, Blaze.If(function() {                                                                                    // 103
        return Spacebars.call(Spacebars.dot(view.lookup("."), "labelText"));                                      // 104
      }, function() {                                                                                             // 105
        return Blaze.View(function() {                                                                            // 106
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "labelText"));                                // 107
        });                                                                                                       // 108
      }, function() {                                                                                             // 109
        return Blaze.View(function() {                                                                            // 110
          return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                               // 111
            name: Spacebars.dot(view.lookup("."), "atts", "name")                                                 // 112
          }));                                                                                                    // 113
        });                                                                                                       // 114
      })), "\n      " ];                                                                                          // 115
    }), "\n      ", Blaze._TemplateWith(function() {                                                              // 116
      return Spacebars.call(Spacebars.dot(view.lookup("."), "afFieldInputAtts"));                                 // 117
    }, function() {                                                                                               // 118
      return Spacebars.include(view.lookupTemplate("afFieldInput"));                                              // 119
    }), "\n    "), "\n  " ];                                                                                      // 120
  }), "\n  ", Blaze.If(function() {                                                                               // 121
    return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                 // 122
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                       // 123
    }));                                                                                                          // 124
  }, function() {                                                                                                 // 125
    return [ "\n    ", HTML.DIV({                                                                                 // 126
      "class": "item item-text-wrap assertive"                                                                    // 127
    }, HTML.I({                                                                                                   // 128
      "class": "icon ion-android-alert"                                                                           // 129
    }), " ", Blaze.View(function() {                                                                              // 130
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                   // 131
        name: Spacebars.dot(view.lookup("."), "atts", "name")                                                     // 132
      })));                                                                                                       // 133
    })), "\n  " ];                                                                                                // 134
  }) ];                                                                                                           // 135
}));                                                                                                              // 136
                                                                                                                  // 137
Template.__checkName("afObjectField_ionic");                                                                      // 138
Template["afObjectField_ionic"] = new Template("Template.afObjectField_ionic", (function() {                      // 139
  var view = this;                                                                                                // 140
  return [ Spacebars.With(function() {                                                                            // 141
    return Spacebars.dataMustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                 // 142
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                       // 143
    }));                                                                                                          // 144
  }, function() {                                                                                                 // 145
    return [ "\n    ", HTML.DIV({                                                                                 // 146
      "class": "item item-divider"                                                                                // 147
    }, "\n      ", Blaze.View(function() {                                                                        // 148
      return Spacebars.mustache(view.lookup("."));                                                                // 149
    }), "\n    "), "\n  " ];                                                                                      // 150
  }), "\n  ", Blaze.If(function() {                                                                               // 151
    return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                 // 152
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                       // 153
    }));                                                                                                          // 154
  }, function() {                                                                                                 // 155
    return [ "\n    ", HTML.DIV({                                                                                 // 156
      "class": "assertive"                                                                                        // 157
    }, Blaze.View(function() {                                                                                    // 158
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                   // 159
        name: Spacebars.dot(view.lookup("."), "atts", "name")                                                     // 160
      })));                                                                                                       // 161
    })), "\n  " ];                                                                                                // 162
  }), "\n  ", Blaze._TemplateWith(function() {                                                                    // 163
    return {                                                                                                      // 164
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name"))                                       // 165
    };                                                                                                            // 166
  }, function() {                                                                                                 // 167
    return Spacebars.include(view.lookupTemplate("afQuickFields"));                                               // 168
  }) ];                                                                                                           // 169
}));                                                                                                              // 170
                                                                                                                  // 171
Template.__checkName("afArrayField_ionic");                                                                       // 172
Template["afArrayField_ionic"] = new Template("Template.afArrayField_ionic", (function() {                        // 173
  var view = this;                                                                                                // 174
  return [ HTML.DIV({                                                                                             // 175
    "class": "item item-divider"                                                                                  // 176
  }, "\n    ", Blaze.View(function() {                                                                            // 177
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 178
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                       // 179
    }));                                                                                                          // 180
  }), "\n\n    ", Blaze.If(function() {                                                                           // 181
    return Spacebars.dataMustache(view.lookup("afArrayFieldHasLessThanMaximum"), Spacebars.kw({                   // 182
      name: Spacebars.dot(view.lookup("."), "atts", "name"),                                                      // 183
      minCount: Spacebars.dot(view.lookup("."), "atts", "minCount"),                                              // 184
      maxCount: Spacebars.dot(view.lookup("."), "atts", "maxCount")                                               // 185
    }));                                                                                                          // 186
  }, function() {                                                                                                 // 187
    return [ "\n      ", HTML.BUTTON({                                                                            // 188
      type: "button",                                                                                             // 189
      "class": "button button-clear button-small pull-right autoform-add-item",                                   // 190
      "data-autoform-field": function() {                                                                         // 191
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "name"));                               // 192
      },                                                                                                          // 193
      "data-autoform-mincount": function() {                                                                      // 194
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "minCount"));                           // 195
      },                                                                                                          // 196
      "data-autoform-maxcount": function() {                                                                      // 197
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "atts", "maxCount"));                           // 198
      }                                                                                                           // 199
    }, "\n        Add ", HTML.SPAN({                                                                              // 200
      "class": "icon ion-plus"                                                                                    // 201
    }), "\n      "), "\n    " ];                                                                                  // 202
  }), "\n  "), "\n  ", Blaze.If(function() {                                                                      // 203
    return Spacebars.dataMustache(view.lookup("afFieldIsInvalid"), Spacebars.kw({                                 // 204
      name: Spacebars.dot(view.lookup("."), "atts", "name")                                                       // 205
    }));                                                                                                          // 206
  }, function() {                                                                                                 // 207
    return [ "\n    ", HTML.DIV({                                                                                 // 208
      "class": "item item-text-wrap"                                                                              // 209
    }, "\n      ", HTML.SPAN({                                                                                    // 210
      "class": "assertive"                                                                                        // 211
    }, Blaze.View(function() {                                                                                    // 212
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("afFieldMessage"), Spacebars.kw({                   // 213
        name: Spacebars.dot(view.lookup("."), "atts", "name")                                                     // 214
      })));                                                                                                       // 215
    })), "\n    "), "\n  " ];                                                                                     // 216
  }), "\n  ", Blaze._TemplateWith(function() {                                                                    // 217
    return {                                                                                                      // 218
      name: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "name")),                                      // 219
      minCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "minCount")),                              // 220
      maxCount: Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "maxCount"))                               // 221
    };                                                                                                            // 222
  }, function() {                                                                                                 // 223
    return Spacebars.include(view.lookupTemplate("afEachArrayItem"), function() {                                 // 224
      return [ "\n    ", HTML.DIV({                                                                               // 225
        "class": "card autoform-array-item"                                                                       // 226
      }, "\n      ", Blaze._TemplateWith(function() {                                                             // 227
        return {                                                                                                  // 228
          name: Spacebars.call(Spacebars.dot(view.lookup("."), "name")),                                          // 229
          label: Spacebars.call(false),                                                                           // 230
          options: Spacebars.call("auto")                                                                         // 231
        };                                                                                                        // 232
      }, function() {                                                                                             // 233
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                            // 234
      }), "\n      ", Blaze.If(function() {                                                                       // 235
        return Spacebars.dataMustache(view.lookup("afArrayFieldHasMoreThanMinimum"), Spacebars.kw({               // 236
          name: Spacebars.dot(view.lookup(".."), "atts", "name"),                                                 // 237
          minCount: Spacebars.dot(view.lookup(".."), "atts", "minCount"),                                         // 238
          maxCount: Spacebars.dot(view.lookup(".."), "atts", "maxCount")                                          // 239
        }));                                                                                                      // 240
      }, function() {                                                                                             // 241
        return [ "\n        ", HTML.DIV({                                                                         // 242
          "class": "item item-divider"                                                                            // 243
        }, "\n          ", HTML.BUTTON({                                                                          // 244
          type: "button",                                                                                         // 245
          "class": "button button-clear button-small pull-right autoform-remove-item"                             // 246
        }, "\n            Remove ", HTML.SPAN({                                                                   // 247
          "class": "icon ion-close"                                                                               // 248
        }), "\n          "), "\n        "), "\n      " ];                                                         // 249
      }), "\n    "), "\n  " ];                                                                                    // 250
    });                                                                                                           // 251
  }) ];                                                                                                           // 252
}));                                                                                                              // 253
                                                                                                                  // 254
Template.__checkName("afCheckbox_ionic");                                                                         // 255
Template["afCheckbox_ionic"] = new Template("Template.afCheckbox_ionic", (function() {                            // 256
  var view = this;                                                                                                // 257
  return HTML.DIV({                                                                                               // 258
    "class": "item item-checkbox item-text-wrap"                                                                  // 259
  }, "\n    ", HTML.LABEL({                                                                                       // 260
    "class": "checkbox"                                                                                           // 261
  }, "\n      ", HTML.INPUT(HTML.Attrs({                                                                          // 262
    type: "checkbox",                                                                                             // 263
    value: function() {                                                                                           // 264
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 265
    }                                                                                                             // 266
  }, function() {                                                                                                 // 267
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 268
  })), "\n    "), "\n    ", Blaze.View(function() {                                                               // 269
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 270
      name: Spacebars.dot(view.lookup("."), "name")                                                               // 271
    }));                                                                                                          // 272
  }), "\n  ");                                                                                                    // 273
}));                                                                                                              // 274
                                                                                                                  // 275
Template.__checkName("afCheckboxGroup_ionic");                                                                    // 276
Template["afCheckboxGroup_ionic"] = new Template("Template.afCheckboxGroup_ionic", (function() {                  // 277
  var view = this;                                                                                                // 278
  return HTML.DIV(HTML.Attrs({                                                                                    // 279
    "class": "af-checkbox-group"                                                                                  // 280
  }, function() {                                                                                                 // 281
    return Spacebars.attrMustache(view.lookup("dsk"));                                                            // 282
  }), "\n    ", HTML.DIV({                                                                                        // 283
    "class": "item item-divider"                                                                                  // 284
  }, "\n      ", Blaze.View(function() {                                                                          // 285
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 286
      name: Spacebars.dot(view.lookup("."), "name")                                                               // 287
    }));                                                                                                          // 288
  }), "\n    "), "\n    ", Blaze.Each(function() {                                                                // 289
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                              // 290
  }, function() {                                                                                                 // 291
    return [ "\n      ", HTML.DIV({                                                                               // 292
      "class": "item item-checkbox item-text-wrap"                                                                // 293
    }, "\n        ", HTML.LABEL({                                                                                 // 294
      "class": "checkbox"                                                                                         // 295
    }, "\n          ", HTML.INPUT(HTML.Attrs({                                                                    // 296
      type: "checkbox",                                                                                           // 297
      value: function() {                                                                                         // 298
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                      // 299
      }                                                                                                           // 300
    }, function() {                                                                                               // 301
      return Spacebars.attrMustache(view.lookup("atts"));                                                         // 302
    })), "\n        "), "\n        ", Blaze.View(function() {                                                     // 303
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                        // 304
    }), "\n      "), "\n    " ];                                                                                  // 305
  }), "\n  ");                                                                                                    // 306
}));                                                                                                              // 307
                                                                                                                  // 308
Template.__checkName("afCheckboxGroupInline_ionic");                                                              // 309
Template["afCheckboxGroupInline_ionic"] = new Template("Template.afCheckboxGroupInline_ionic", (function() {      // 310
  var view = this;                                                                                                // 311
  return HTML.DIV(HTML.Attrs({                                                                                    // 312
    "class": "af-checkbox-group"                                                                                  // 313
  }, function() {                                                                                                 // 314
    return Spacebars.attrMustache(view.lookup("dsk"));                                                            // 315
  }), "\n    ", Blaze.Each(function() {                                                                           // 316
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                              // 317
  }, function() {                                                                                                 // 318
    return [ "\n    ", HTML.DIV({                                                                                 // 319
      "class": "item item-checkbox item-text-wrap"                                                                // 320
    }, "\n      ", HTML.LABEL({                                                                                   // 321
      "class": "checkbox"                                                                                         // 322
    }, "\n        ", HTML.INPUT(HTML.Attrs({                                                                      // 323
      type: "checkbox",                                                                                           // 324
      value: function() {                                                                                         // 325
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                      // 326
      }                                                                                                           // 327
    }, function() {                                                                                               // 328
      return Spacebars.attrMustache(view.lookup("atts"));                                                         // 329
    })), "\n      "), "\n      ", Blaze.View(function() {                                                         // 330
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                        // 331
    }), "\n    "), "\n    " ];                                                                                    // 332
  }), "\n  ");                                                                                                    // 333
}));                                                                                                              // 334
                                                                                                                  // 335
Template.__checkName("afRadio_ionic");                                                                            // 336
Template["afRadio_ionic"] = new Template("Template.afRadio_ionic", (function() {                                  // 337
  var view = this;                                                                                                // 338
  return HTML.LABEL({                                                                                             // 339
    "class": "item item-radio item-text-wrap"                                                                     // 340
  }, "\n    ", HTML.INPUT(HTML.Attrs({                                                                            // 341
    type: "radio",                                                                                                // 342
    value: function() {                                                                                           // 343
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 344
    }                                                                                                             // 345
  }, function() {                                                                                                 // 346
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 347
  })), "\n    ", HTML.DIV({                                                                                       // 348
    "class": "item-content disable-pointer-events"                                                                // 349
  }, "\n      ", Blaze.View(function() {                                                                          // 350
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 351
      name: Spacebars.dot(view.lookup("."), "name")                                                               // 352
    }));                                                                                                          // 353
  }), "\n    "), HTML.Raw('\n    <i class="radio-icon ion-checkmark disable-pointer-events"></i>\n  '));          // 354
}));                                                                                                              // 355
                                                                                                                  // 356
Template.__checkName("afRadioGroup_ionic");                                                                       // 357
Template["afRadioGroup_ionic"] = new Template("Template.afRadioGroup_ionic", (function() {                        // 358
  var view = this;                                                                                                // 359
  return HTML.DIV(HTML.Attrs({                                                                                    // 360
    "class": "af-radio-group"                                                                                     // 361
  }, function() {                                                                                                 // 362
    return Spacebars.attrMustache(view.lookup("dsk"));                                                            // 363
  }), "\n    ", HTML.DIV({                                                                                        // 364
    "class": "item item-divider"                                                                                  // 365
  }, "\n      ", Blaze.View(function() {                                                                          // 366
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 367
      name: Spacebars.dot(view.lookup("."), "name")                                                               // 368
    }));                                                                                                          // 369
  }), "\n    "), "\n    ", Blaze.Each(function() {                                                                // 370
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                              // 371
  }, function() {                                                                                                 // 372
    return [ "\n      ", HTML.LABEL({                                                                             // 373
      "class": "item item-radio item-text-wrap"                                                                   // 374
    }, "\n        ", HTML.INPUT(HTML.Attrs({                                                                      // 375
      type: "radio",                                                                                              // 376
      value: function() {                                                                                         // 377
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                      // 378
      }                                                                                                           // 379
    }, function() {                                                                                               // 380
      return Spacebars.attrMustache(view.lookup("atts"));                                                         // 381
    })), "\n        ", HTML.DIV({                                                                                 // 382
      "class": "item-content disable-pointer-events"                                                              // 383
    }, "\n          ", Blaze.View(function() {                                                                    // 384
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                        // 385
    }), "\n        "), "\n        ", HTML.I({                                                                     // 386
      "class": "radio-icon ion-checkmark disable-pointer-events"                                                  // 387
    }), "\n      "), "\n    " ];                                                                                  // 388
  }), "\n  ");                                                                                                    // 389
}));                                                                                                              // 390
                                                                                                                  // 391
Template.__checkName("afRadioGroupInline_ionic");                                                                 // 392
Template["afRadioGroupInline_ionic"] = new Template("Template.afRadioGroupInline_ionic", (function() {            // 393
  var view = this;                                                                                                // 394
  return HTML.DIV(HTML.Attrs({                                                                                    // 395
    "class": "af-radio-group"                                                                                     // 396
  }, function() {                                                                                                 // 397
    return Spacebars.attrMustache(view.lookup("dsk"));                                                            // 398
  }), "\n    ", Blaze.Each(function() {                                                                           // 399
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                              // 400
  }, function() {                                                                                                 // 401
    return [ "\n      ", HTML.LABEL({                                                                             // 402
      "class": "item item-radio item-text-wrap"                                                                   // 403
    }, "\n        ", HTML.INPUT(HTML.Attrs({                                                                      // 404
      type: "radio",                                                                                              // 405
      value: function() {                                                                                         // 406
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                      // 407
      }                                                                                                           // 408
    }, function() {                                                                                               // 409
      return Spacebars.attrMustache(view.lookup("atts"));                                                         // 410
    })), "\n        ", HTML.DIV({                                                                                 // 411
      "class": "item-content disable-pointer-events"                                                              // 412
    }, "\n          ", Blaze.View(function() {                                                                    // 413
      return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                   // 414
        name: Spacebars.dot(view.lookup("."), "name")                                                             // 415
      }));                                                                                                        // 416
    }), "\n        "), "\n        ", HTML.I({                                                                     // 417
      "class": "radio-icon ion-checkmark disable-pointer-events"                                                  // 418
    }), "\n      "), "\n    " ];                                                                                  // 419
  }), "\n  ");                                                                                                    // 420
}));                                                                                                              // 421
                                                                                                                  // 422
Template.__checkName("afBooleanRadioGroup_ionic");                                                                // 423
Template["afBooleanRadioGroup_ionic"] = new Template("Template.afBooleanRadioGroup_ionic", (function() {          // 424
  var view = this;                                                                                                // 425
  return HTML.DIV(HTML.Attrs(function() {                                                                         // 426
    return Spacebars.attrMustache(view.lookup("dsk"));                                                            // 427
  }), "\n    ", HTML.LABEL({                                                                                      // 428
    "class": "item item-radio item-text-wrap"                                                                     // 429
  }, "\n      ", HTML.INPUT(HTML.Attrs({                                                                          // 430
    type: "radio",                                                                                                // 431
    value: "false",                                                                                               // 432
    name: function() {                                                                                            // 433
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));                                         // 434
    }                                                                                                             // 435
  }, function() {                                                                                                 // 436
    return Spacebars.attrMustache(view.lookup("falseAtts"));                                                      // 437
  })), "\n      ", HTML.DIV({                                                                                     // 438
    "class": "item-content disable-pointer-events"                                                                // 439
  }, "\n        ", Spacebars.With(function() {                                                                    // 440
    return Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "falseLabel"));                                 // 441
  }, function() {                                                                                                 // 442
    return Blaze.View(function() {                                                                                // 443
      return Spacebars.mustache(view.lookup("."));                                                                // 444
    });                                                                                                           // 445
  }, function() {                                                                                                 // 446
    return "False";                                                                                               // 447
  }), "\n      "), "\n      ", HTML.Raw('<i class="radio-icon ion-checkmark disable-pointer-events"></i>'), "\n    "), "\n    ", HTML.LABEL({
    "class": "item item-radio item-text-wrap"                                                                     // 449
  }, "\n      ", HTML.INPUT(HTML.Attrs({                                                                          // 450
    type: "radio",                                                                                                // 451
    value: "true",                                                                                                // 452
    name: function() {                                                                                            // 453
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));                                         // 454
    }                                                                                                             // 455
  }, function() {                                                                                                 // 456
    return Spacebars.attrMustache(view.lookup("trueAtts"));                                                       // 457
  })), "\n      ", HTML.DIV({                                                                                     // 458
    "class": "item-content disable-pointer-events"                                                                // 459
  }, "\n        ", Spacebars.With(function() {                                                                    // 460
    return Spacebars.call(Spacebars.dot(view.lookup("."), "atts", "trueLabel"));                                  // 461
  }, function() {                                                                                                 // 462
    return Blaze.View(function() {                                                                                // 463
      return Spacebars.mustache(view.lookup("."));                                                                // 464
    });                                                                                                           // 465
  }, function() {                                                                                                 // 466
    return "True";                                                                                                // 467
  }), "\n      "), "\n      ", HTML.Raw('<i class="radio-icon ion-checkmark disable-pointer-events"></i>'), "\n    "), "\n  ");
}));                                                                                                              // 469
                                                                                                                  // 470
Template.__checkName("afSelect_ionic");                                                                           // 471
Template["afSelect_ionic"] = new Template("Template.afSelect_ionic", (function() {                                // 472
  var view = this;                                                                                                // 473
  return HTML.LABEL({                                                                                             // 474
    "class": "item item-input item-select item-text-wrap"                                                         // 475
  }, "\n    ", HTML.DIV({                                                                                         // 476
    "class": "input-label"                                                                                        // 477
  }, "\n      ", Blaze.View(function() {                                                                          // 478
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 479
      name: Spacebars.dot(view.lookup("."), "name")                                                               // 480
    }));                                                                                                          // 481
  }), "\n    "), "\n    ", HTML.SELECT(HTML.Attrs(function() {                                                    // 482
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 483
  }), "\n      ", Blaze.Each(function() {                                                                         // 484
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                              // 485
  }, function() {                                                                                                 // 486
    return [ "\n        ", Blaze.If(function() {                                                                  // 487
      return Spacebars.call(Spacebars.dot(view.lookup("."), "optgroup"));                                         // 488
    }, function() {                                                                                               // 489
      return [ "\n          ", HTML.OPTGROUP({                                                                    // 490
        label: function() {                                                                                       // 491
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "optgroup"));                                 // 492
        }                                                                                                         // 493
      }, "\n            ", Blaze.Each(function() {                                                                // 494
        return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                          // 495
      }, function() {                                                                                             // 496
        return [ "\n            ", HTML.OPTION(HTML.Attrs(function() {                                            // 497
          return Spacebars.attrMustache(view.lookup("optionAtts"));                                               // 498
        }), Blaze.View(function() {                                                                               // 499
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                    // 500
        })), "\n            " ];                                                                                  // 501
      }), "\n          "), "\n        " ];                                                                        // 502
    }, function() {                                                                                               // 503
      return [ "\n          ", HTML.OPTION(HTML.Attrs(function() {                                                // 504
        return Spacebars.attrMustache(view.lookup("optionAtts"));                                                 // 505
      }), Blaze.View(function() {                                                                                 // 506
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                      // 507
      })), "\n        " ];                                                                                        // 508
    }), "\n      " ];                                                                                             // 509
  }), "\n    "), "\n  ");                                                                                         // 510
}));                                                                                                              // 511
                                                                                                                  // 512
Template.__checkName("afBooleanSelect_ionic");                                                                    // 513
Template["afBooleanSelect_ionic"] = new Template("Template.afBooleanSelect_ionic", (function() {                  // 514
  var view = this;                                                                                                // 515
  return HTML.LABEL({                                                                                             // 516
    "class": "item item-input item-select item-text-wrap"                                                         // 517
  }, "\n    ", HTML.DIV({                                                                                         // 518
    "class": "input-label"                                                                                        // 519
  }, "\n      ", Blaze.View(function() {                                                                          // 520
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 521
      name: Spacebars.dot(view.lookup("."), "name")                                                               // 522
    }));                                                                                                          // 523
  }), "\n    "), "\n    ", HTML.SELECT(HTML.Attrs(function() {                                                    // 524
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 525
  }), "\n      ", Blaze.Each(function() {                                                                         // 526
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                              // 527
  }, function() {                                                                                                 // 528
    return [ "\n        ", HTML.OPTION(HTML.Attrs(function() {                                                    // 529
      return Spacebars.attrMustache(view.lookup("optionAtts"));                                                   // 530
    }), Blaze.View(function() {                                                                                   // 531
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                        // 532
    })), "\n      " ];                                                                                            // 533
  }), "\n    "), "\n  ");                                                                                         // 534
}));                                                                                                              // 535
                                                                                                                  // 536
Template.__checkName("afSelectMultiple_ionic");                                                                   // 537
Template["afSelectMultiple_ionic"] = new Template("Template.afSelectMultiple_ionic", (function() {                // 538
  var view = this;                                                                                                // 539
  return HTML.LABEL({                                                                                             // 540
    "class": "item item-input item-select item-text-wrap"                                                         // 541
  }, "\n    ", HTML.DIV({                                                                                         // 542
    "class": "input-label"                                                                                        // 543
  }, "\n      ", Blaze.View(function() {                                                                          // 544
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 545
      name: Spacebars.dot(view.lookup("."), "name")                                                               // 546
    }));                                                                                                          // 547
  }), "\n    "), "\n    ", HTML.SELECT(HTML.Attrs({                                                               // 548
    multiple: ""                                                                                                  // 549
  }, function() {                                                                                                 // 550
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 551
  }), "\n      ", Blaze.Each(function() {                                                                         // 552
    return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                              // 553
  }, function() {                                                                                                 // 554
    return [ "\n        ", Blaze.If(function() {                                                                  // 555
      return Spacebars.call(Spacebars.dot(view.lookup("."), "optgroup"));                                         // 556
    }, function() {                                                                                               // 557
      return [ "\n          ", HTML.OPTGROUP({                                                                    // 558
        label: function() {                                                                                       // 559
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "optgroup"));                                 // 560
        }                                                                                                         // 561
      }, "\n            ", Blaze.Each(function() {                                                                // 562
        return Spacebars.call(Spacebars.dot(view.lookup("."), "items"));                                          // 563
      }, function() {                                                                                             // 564
        return [ "\n              ", HTML.OPTION(HTML.Attrs(function() {                                          // 565
          return Spacebars.attrMustache(view.lookup("optionAtts"));                                               // 566
        }), Blaze.View(function() {                                                                               // 567
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                    // 568
        })), "\n            " ];                                                                                  // 569
      }), "\n          "), "\n        " ];                                                                        // 570
    }, function() {                                                                                               // 571
      return [ "\n          ", HTML.OPTION(HTML.Attrs(function() {                                                // 572
        return Spacebars.attrMustache(view.lookup("optionAtts"));                                                 // 573
      }), Blaze.View(function() {                                                                                 // 574
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                      // 575
      })), "\n        " ];                                                                                        // 576
    }), "\n      " ];                                                                                             // 577
  }), "\n    "), "\n  ");                                                                                         // 578
}));                                                                                                              // 579
                                                                                                                  // 580
Template.__checkName("afToggle");                                                                                 // 581
Template["afToggle"] = new Template("Template.afToggle", (function() {                                            // 582
  var view = this;                                                                                                // 583
  return HTML.DIV({                                                                                               // 584
    "class": "item item-toggle item-text-wrap"                                                                    // 585
  }, "\n    ", Blaze.View(function() {                                                                            // 586
    return Spacebars.mustache(view.lookup("afFieldLabelText"), Spacebars.kw({                                     // 587
      name: Spacebars.dot(view.lookup("."), "name")                                                               // 588
    }));                                                                                                          // 589
  }), "\n    ", HTML.LABEL({                                                                                      // 590
    "class": "toggle"                                                                                             // 591
  }, "\n      ", HTML.INPUT(HTML.Attrs({                                                                          // 592
    type: "checkbox",                                                                                             // 593
    value: "true"                                                                                                 // 594
  }, function() {                                                                                                 // 595
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 596
  })), "\n      ", HTML.Raw('<div class="track">\n        <div class="handle"></div>\n      </div>'), "\n    "), "\n  ");
}));                                                                                                              // 598
                                                                                                                  // 599
Template.__checkName("afTextarea_ionic");                                                                         // 600
Template["afTextarea_ionic"] = new Template("Template.afTextarea_ionic", (function() {                            // 601
  var view = this;                                                                                                // 602
  return HTML.TEXTAREA(HTML.Attrs(function() {                                                                    // 603
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 604
  }, {                                                                                                            // 605
    value: function() {                                                                                           // 606
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 607
    }                                                                                                             // 608
  }));                                                                                                            // 609
}));                                                                                                              // 610
                                                                                                                  // 611
Template.__checkName("afInputText_ionic");                                                                        // 612
Template["afInputText_ionic"] = new Template("Template.afInputText_ionic", (function() {                          // 613
  var view = this;                                                                                                // 614
  return HTML.INPUT(HTML.Attrs({                                                                                  // 615
    type: "text",                                                                                                 // 616
    value: function() {                                                                                           // 617
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 618
    }                                                                                                             // 619
  }, function() {                                                                                                 // 620
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 621
  }));                                                                                                            // 622
}));                                                                                                              // 623
                                                                                                                  // 624
Template.__checkName("afInputPassword_ionic");                                                                    // 625
Template["afInputPassword_ionic"] = new Template("Template.afInputPassword_ionic", (function() {                  // 626
  var view = this;                                                                                                // 627
  return HTML.INPUT(HTML.Attrs({                                                                                  // 628
    type: "password",                                                                                             // 629
    value: function() {                                                                                           // 630
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 631
    }                                                                                                             // 632
  }, function() {                                                                                                 // 633
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 634
  }));                                                                                                            // 635
}));                                                                                                              // 636
                                                                                                                  // 637
Template.__checkName("afInputButton_ionic");                                                                      // 638
Template["afInputButton_ionic"] = new Template("Template.afInputButton_ionic", (function() {                      // 639
  var view = this;                                                                                                // 640
  return HTML.INPUT(HTML.Attrs({                                                                                  // 641
    type: "button",                                                                                               // 642
    value: function() {                                                                                           // 643
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 644
    }                                                                                                             // 645
  }, function() {                                                                                                 // 646
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 647
  }));                                                                                                            // 648
}));                                                                                                              // 649
                                                                                                                  // 650
Template.__checkName("afInputSubmit_ionic");                                                                      // 651
Template["afInputSubmit_ionic"] = new Template("Template.afInputSubmit_ionic", (function() {                      // 652
  var view = this;                                                                                                // 653
  return HTML.INPUT(HTML.Attrs({                                                                                  // 654
    type: "submit",                                                                                               // 655
    value: function() {                                                                                           // 656
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 657
    }                                                                                                             // 658
  }, function() {                                                                                                 // 659
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 660
  }));                                                                                                            // 661
}));                                                                                                              // 662
                                                                                                                  // 663
Template.__checkName("afInputReset_ionic");                                                                       // 664
Template["afInputReset_ionic"] = new Template("Template.afInputReset_ionic", (function() {                        // 665
  var view = this;                                                                                                // 666
  return HTML.INPUT(HTML.Attrs({                                                                                  // 667
    type: "reset",                                                                                                // 668
    value: function() {                                                                                           // 669
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 670
    }                                                                                                             // 671
  }, function() {                                                                                                 // 672
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 673
  }));                                                                                                            // 674
}));                                                                                                              // 675
                                                                                                                  // 676
Template.__checkName("afInputDateTime_ionic");                                                                    // 677
Template["afInputDateTime_ionic"] = new Template("Template.afInputDateTime_ionic", (function() {                  // 678
  var view = this;                                                                                                // 679
  return HTML.INPUT(HTML.Attrs({                                                                                  // 680
    type: "datetime",                                                                                             // 681
    value: function() {                                                                                           // 682
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 683
    }                                                                                                             // 684
  }, function() {                                                                                                 // 685
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 686
  }));                                                                                                            // 687
}));                                                                                                              // 688
                                                                                                                  // 689
Template.__checkName("afInputDateTimeLocal_ionic");                                                               // 690
Template["afInputDateTimeLocal_ionic"] = new Template("Template.afInputDateTimeLocal_ionic", (function() {        // 691
  var view = this;                                                                                                // 692
  return HTML.INPUT(HTML.Attrs({                                                                                  // 693
    type: "datetime-local",                                                                                       // 694
    value: function() {                                                                                           // 695
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 696
    }                                                                                                             // 697
  }, function() {                                                                                                 // 698
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 699
  }));                                                                                                            // 700
}));                                                                                                              // 701
                                                                                                                  // 702
Template.__checkName("afInputDate_ionic");                                                                        // 703
Template["afInputDate_ionic"] = new Template("Template.afInputDate_ionic", (function() {                          // 704
  var view = this;                                                                                                // 705
  return HTML.INPUT(HTML.Attrs({                                                                                  // 706
    type: "date",                                                                                                 // 707
    value: function() {                                                                                           // 708
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 709
    }                                                                                                             // 710
  }, function() {                                                                                                 // 711
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 712
  }));                                                                                                            // 713
}));                                                                                                              // 714
                                                                                                                  // 715
Template.__checkName("afInputMonth_ionic");                                                                       // 716
Template["afInputMonth_ionic"] = new Template("Template.afInputMonth_ionic", (function() {                        // 717
  var view = this;                                                                                                // 718
  return HTML.INPUT(HTML.Attrs({                                                                                  // 719
    type: "month",                                                                                                // 720
    value: function() {                                                                                           // 721
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 722
    }                                                                                                             // 723
  }, function() {                                                                                                 // 724
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 725
  }));                                                                                                            // 726
}));                                                                                                              // 727
                                                                                                                  // 728
Template.__checkName("afInputTime_ionic");                                                                        // 729
Template["afInputTime_ionic"] = new Template("Template.afInputTime_ionic", (function() {                          // 730
  var view = this;                                                                                                // 731
  return HTML.INPUT(HTML.Attrs({                                                                                  // 732
    type: "time",                                                                                                 // 733
    value: function() {                                                                                           // 734
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 735
    }                                                                                                             // 736
  }, function() {                                                                                                 // 737
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 738
  }));                                                                                                            // 739
}));                                                                                                              // 740
                                                                                                                  // 741
Template.__checkName("afInputWeek_ionic");                                                                        // 742
Template["afInputWeek_ionic"] = new Template("Template.afInputWeek_ionic", (function() {                          // 743
  var view = this;                                                                                                // 744
  return HTML.INPUT(HTML.Attrs({                                                                                  // 745
    type: "week",                                                                                                 // 746
    value: function() {                                                                                           // 747
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 748
    }                                                                                                             // 749
  }, function() {                                                                                                 // 750
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 751
  }));                                                                                                            // 752
}));                                                                                                              // 753
                                                                                                                  // 754
Template.__checkName("afInputNumber_ionic");                                                                      // 755
Template["afInputNumber_ionic"] = new Template("Template.afInputNumber_ionic", (function() {                      // 756
  var view = this;                                                                                                // 757
  return HTML.INPUT(HTML.Attrs({                                                                                  // 758
    type: "number",                                                                                               // 759
    value: function() {                                                                                           // 760
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 761
    }                                                                                                             // 762
  }, function() {                                                                                                 // 763
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 764
  }));                                                                                                            // 765
}));                                                                                                              // 766
                                                                                                                  // 767
Template.__checkName("afInputRange_ionic");                                                                       // 768
Template["afInputRange_ionic"] = new Template("Template.afInputRange_ionic", (function() {                        // 769
  var view = this;                                                                                                // 770
  return HTML.INPUT(HTML.Attrs({                                                                                  // 771
    type: "range",                                                                                                // 772
    value: function() {                                                                                           // 773
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 774
    }                                                                                                             // 775
  }, function() {                                                                                                 // 776
    return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                                       // 777
  }));                                                                                                            // 778
}));                                                                                                              // 779
                                                                                                                  // 780
Template.__checkName("afInputEmail_ionic");                                                                       // 781
Template["afInputEmail_ionic"] = new Template("Template.afInputEmail_ionic", (function() {                        // 782
  var view = this;                                                                                                // 783
  return HTML.INPUT(HTML.Attrs({                                                                                  // 784
    type: "email",                                                                                                // 785
    value: function() {                                                                                           // 786
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 787
    }                                                                                                             // 788
  }, function() {                                                                                                 // 789
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 790
  }));                                                                                                            // 791
}));                                                                                                              // 792
                                                                                                                  // 793
Template.__checkName("afInputUrl_ionic");                                                                         // 794
Template["afInputUrl_ionic"] = new Template("Template.afInputUrl_ionic", (function() {                            // 795
  var view = this;                                                                                                // 796
  return HTML.INPUT(HTML.Attrs({                                                                                  // 797
    type: "url",                                                                                                  // 798
    value: function() {                                                                                           // 799
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 800
    }                                                                                                             // 801
  }, function() {                                                                                                 // 802
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 803
  }));                                                                                                            // 804
}));                                                                                                              // 805
                                                                                                                  // 806
Template.__checkName("afInputSearch_ionic");                                                                      // 807
Template["afInputSearch_ionic"] = new Template("Template.afInputSearch_ionic", (function() {                      // 808
  var view = this;                                                                                                // 809
  return HTML.INPUT(HTML.Attrs({                                                                                  // 810
    type: "search",                                                                                               // 811
    value: function() {                                                                                           // 812
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 813
    }                                                                                                             // 814
  }, function() {                                                                                                 // 815
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 816
  }));                                                                                                            // 817
}));                                                                                                              // 818
                                                                                                                  // 819
Template.__checkName("afInputTel_ionic");                                                                         // 820
Template["afInputTel_ionic"] = new Template("Template.afInputTel_ionic", (function() {                            // 821
  var view = this;                                                                                                // 822
  return HTML.INPUT(HTML.Attrs({                                                                                  // 823
    type: "tel",                                                                                                  // 824
    value: function() {                                                                                           // 825
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 826
    }                                                                                                             // 827
  }, function() {                                                                                                 // 828
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 829
  }));                                                                                                            // 830
}));                                                                                                              // 831
                                                                                                                  // 832
Template.__checkName("afInputColor_ionic");                                                                       // 833
Template["afInputColor_ionic"] = new Template("Template.afInputColor_ionic", (function() {                        // 834
  var view = this;                                                                                                // 835
  return HTML.INPUT(HTML.Attrs({                                                                                  // 836
    type: "color",                                                                                                // 837
    value: function() {                                                                                           // 838
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "value"));                                        // 839
    }                                                                                                             // 840
  }, function() {                                                                                                 // 841
    return Spacebars.attrMustache(view.lookup("atts"));                                                           // 842
  }));                                                                                                            // 843
}));                                                                                                              // 844
                                                                                                                  // 845
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/meteoric:autoform-ionic/ionic.js                                                                      //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
/*                                                                                                                // 1
* Template helpers for "ionic" template                                                                           // 2
*/                                                                                                                // 3
                                                                                                                  // 4
Template['quickForm_ionic'].helpers({                                                                             // 5
  submitButtonAtts: function bsQuickFormSubmitButtonAtts() {                                                      // 6
    var qfAtts = this.atts;                                                                                       // 7
    var atts = {};                                                                                                // 8
    if (typeof qfAtts.buttonClasses === "string") {                                                               // 9
      atts['class'] = qfAtts.buttonClasses;                                                                       // 10
    } else {                                                                                                      // 11
      atts['class'] = 'button button-positive button-block';                                                      // 12
    }                                                                                                             // 13
    return atts;                                                                                                  // 14
  }                                                                                                               // 15
});                                                                                                               // 16
                                                                                                                  // 17
Template['afFormGroup_ionic'].helpers({                                                                           // 18
  skipLabel: function bsFormGroupSkipLabel() {                                                                    // 19
    var self = this;                                                                                              // 20
    var skipLabelTypes = [                                                                                        // 21
      "checkbox", "checkbox-group", "boolean-checkbox", "select-checkbox",                                        // 22
      "select-radio", "select-radio-group", "select-radio-group-inline", "boolean-radio", "boolean-radio-group",  // 23
      "select", "boolean-select", "select-multiple",                                                              // 24
      "toggle"                                                                                                    // 25
    ];                                                                                                            // 26
    var type = AutoForm.getInputType(self.afFieldInputAtts);                                                      // 27
    return (self.skipLabel || _.contains(skipLabelTypes, type));                                                  // 28
  },                                                                                                              // 29
  ionicFieldLabelAtts: function ionicFieldLabelAtts() {                                                           // 30
    var atts = _.clone(this.afFieldLabelAtts);                                                                    // 31
    var classes = ['item', 'item-input'];                                                                         // 32
                                                                                                                  // 33
    if (atts.type === 'placeholder') {                                                                            // 34
      atts.placeholderOnly = true;                                                                                // 35
    } else if (atts.type === 'stacked') {                                                                         // 36
      classes.push('item-stacked-label');                                                                         // 37
    }                                                                                                             // 38
    else if (atts.type === 'floating') {                                                                          // 39
      classes.push('item-floating-label');                                                                        // 40
    }                                                                                                             // 41
                                                                                                                  // 42
    atts = AutoForm.Utility.addClass(atts, classes.join(' '));                                                    // 43
    return atts;                                                                                                  // 44
  }                                                                                                               // 45
});                                                                                                               // 46
                                                                                                                  // 47
_.each([                                                                                                          // 48
  "afSelect_ionic",                                                                                               // 49
  "afBooleanSelect_ionic",                                                                                        // 50
  "afSelectMultiple_ionic",                                                                                       // 51
  "afTextarea_ionic",                                                                                             // 52
  "afInputText_ionic",                                                                                            // 53
  "afInputPassword_ionic",                                                                                        // 54
  "afInputDateTime_ionic",                                                                                        // 55
  "afInputDateTimeLocal_ionic",                                                                                   // 56
  "afInputDate_ionic",                                                                                            // 57
  "afInputMonth_ionic",                                                                                           // 58
  "afInputTime_ionic",                                                                                            // 59
  "afInputWeek_ionic",                                                                                            // 60
  "afInputNumber_ionic",                                                                                          // 61
  "afInputEmail_ionic",                                                                                           // 62
  "afInputUrl_ionic",                                                                                             // 63
  "afInputSearch_ionic",                                                                                          // 64
  "afInputTel_ionic",                                                                                             // 65
  "afInputColor_ionic"                                                                                            // 66
  ], function (tmplName) {                                                                                        // 67
  Template[tmplName].helpers({                                                                                    // 68
    atts: function addFormControlAtts() {                                                                         // 69
      var atts = _.clone(this.atts);                                                                              // 70
      return atts;                                                                                                // 71
    }                                                                                                             // 72
  });                                                                                                             // 73
});                                                                                                               // 74
                                                                                                                  // 75
_.each([                                                                                                          // 76
  "afInputButton_ionic",                                                                                          // 77
  "afInputSubmit_ionic",                                                                                          // 78
  "afInputReset_ionic",                                                                                           // 79
  ], function (tmplName) {                                                                                        // 80
  Template[tmplName].helpers({                                                                                    // 81
    atts: function addFormControlAtts() {                                                                         // 82
      var atts = _.clone(this.atts);                                                                              // 83
      // Add bootstrap class                                                                                      // 84
      atts = AutoForm.Utility.addClass(atts, "button");                                                           // 85
      return atts;                                                                                                // 86
    }                                                                                                             // 87
  });                                                                                                             // 88
});                                                                                                               // 89
                                                                                                                  // 90
Template["afRadio_ionic"].helpers({                                                                               // 91
  atts: function selectedAttsAdjust() {                                                                           // 92
    var atts = _.clone(this.atts);                                                                                // 93
    if (this.selected) {                                                                                          // 94
      atts.checked = "";                                                                                          // 95
    }                                                                                                             // 96
    return atts;                                                                                                  // 97
  }                                                                                                               // 98
});                                                                                                               // 99
                                                                                                                  // 100
_.each([                                                                                                          // 101
  "afCheckboxGroup_ionic",                                                                                        // 102
  "afRadioGroup_ionic",                                                                                           // 103
  "afCheckboxGroupInline_ionic",                                                                                  // 104
  "afRadioGroupInline_ionic"                                                                                      // 105
  ], function (tmplName) {                                                                                        // 106
  Template[tmplName].helpers({                                                                                    // 107
    atts: function selectedAttsAdjust() {                                                                         // 108
      var atts = _.clone(this.atts);                                                                              // 109
      if (this.selected) {                                                                                        // 110
        atts.checked = "";                                                                                        // 111
      }                                                                                                           // 112
      // remove data-schema-key attribute because we put it                                                       // 113
      // on the entire group                                                                                      // 114
      delete atts["data-schema-key"];                                                                             // 115
      return atts;                                                                                                // 116
    },                                                                                                            // 117
    dsk: function dsk() {                                                                                         // 118
      return {                                                                                                    // 119
        "data-schema-key": this.atts["data-schema-key"]                                                           // 120
      }                                                                                                           // 121
    }                                                                                                             // 122
  });                                                                                                             // 123
});                                                                                                               // 124
                                                                                                                  // 125
var selectHelpers = {                                                                                             // 126
  optionAtts: function afSelectOptionAtts() {                                                                     // 127
    var item = this;                                                                                              // 128
    var atts = {                                                                                                  // 129
      value: item.value                                                                                           // 130
    };                                                                                                            // 131
    if (item.selected) {                                                                                          // 132
      atts.selected = "";                                                                                         // 133
    }                                                                                                             // 134
    return atts;                                                                                                  // 135
  }                                                                                                               // 136
};                                                                                                                // 137
Template["afSelect_ionic"].helpers(selectHelpers);                                                                // 138
Template["afSelectMultiple_ionic"].helpers(selectHelpers);                                                        // 139
Template["afBooleanSelect_ionic"].helpers(selectHelpers);                                                         // 140
                                                                                                                  // 141
Template["afBooleanRadioGroup_ionic"].helpers({                                                                   // 142
  falseAtts: function falseAtts() {                                                                               // 143
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'data-schema-key');                                   // 144
    if (this.value === false) {                                                                                   // 145
      atts.checked = "";                                                                                          // 146
    }                                                                                                             // 147
    return atts;                                                                                                  // 148
  },                                                                                                              // 149
  trueAtts: function trueAtts() {                                                                                 // 150
    var atts = _.omit(this.atts, 'trueLabel', 'falseLabel', 'data-schema-key');                                   // 151
    if (this.value === true) {                                                                                    // 152
      atts.checked = "";                                                                                          // 153
    }                                                                                                             // 154
    return atts;                                                                                                  // 155
  },                                                                                                              // 156
  dsk: function () {                                                                                              // 157
    return {'data-schema-key': this.atts['data-schema-key']};                                                     // 158
  }                                                                                                               // 159
});                                                                                                               // 160
                                                                                                                  // 161
                                                                                                                  // 162
// Custom Ionic input types:                                                                                      // 163
                                                                                                                  // 164
AutoForm.addInputType("toggle", {                                                                                 // 165
  template: "afToggle",                                                                                           // 166
  valueOut: function () {                                                                                         // 167
    return !!this.is(":checked");                                                                                 // 168
  },                                                                                                              // 169
  valueConverters: {                                                                                              // 170
    "boolean": function (val) {                                                                                   // 171
      if (val === "true") {                                                                                       // 172
        return true;                                                                                              // 173
      } else if (val === "false") {                                                                               // 174
        return false;                                                                                             // 175
      }                                                                                                           // 176
      return val;                                                                                                 // 177
    },                                                                                                            // 178
    "string": function (val) {                                                                                    // 179
      if (val === true) {                                                                                         // 180
        return "TRUE";                                                                                            // 181
      } else if (val === false) {                                                                                 // 182
        return "FALSE";                                                                                           // 183
      }                                                                                                           // 184
      return val;                                                                                                 // 185
    },                                                                                                            // 186
    "stringArray": function (val) {                                                                               // 187
      if (val === true) {                                                                                         // 188
        return ["TRUE"];                                                                                          // 189
      } else if (val === false) {                                                                                 // 190
        return ["FALSE"];                                                                                         // 191
      }                                                                                                           // 192
      return val;                                                                                                 // 193
    },                                                                                                            // 194
    "number": function (val) {                                                                                    // 195
      if (val === true) {                                                                                         // 196
        return 1;                                                                                                 // 197
      } else if (val === false) {                                                                                 // 198
        return 0;                                                                                                 // 199
      }                                                                                                           // 200
      return val;                                                                                                 // 201
    },                                                                                                            // 202
    "numberArray": function (val) {                                                                               // 203
      if (val === true) {                                                                                         // 204
        return [1];                                                                                               // 205
      } else if (val === false) {                                                                                 // 206
        return [0];                                                                                               // 207
      }                                                                                                           // 208
      return val;                                                                                                 // 209
    }                                                                                                             // 210
  },                                                                                                              // 211
  contextAdjust: function (context) {                                                                             // 212
    if (context.value === true) {                                                                                 // 213
      context.atts.checked = "";                                                                                  // 214
    }                                                                                                             // 215
    //don't add required attribute to checkboxes because some browsers assume that to mean that it must be checked, which is not what we mean by "required"
    delete context.atts.required;                                                                                 // 217
    return context;                                                                                               // 218
  }                                                                                                               // 219
});                                                                                                               // 220
                                                                                                                  // 221
// Floating Labels: http://ionicframework.com/docs/components/#forms-floating-labels                              // 222
// 'label-type': 'floating'                                                                                       // 223
Template.afFormGroup_ionic.rendered = function () {                                                               // 224
  var template = this;                                                                                            // 225
  var isFloating = template.$('.item-floating-label').length;                                                     // 226
                                                                                                                  // 227
  if (isFloating) {                                                                                               // 228
    template.$('input').on('keyup.item-floating-label', function (event) {                                        // 229
      if ($(this).val() !== '') {                                                                                 // 230
        template.$('.item-floating-label .input-label').addClass('has-input');                                    // 231
      } else {                                                                                                    // 232
        template.$('.item-floating-label .input-label').removeClass('has-input');                                 // 233
      }                                                                                                           // 234
    });                                                                                                           // 235
                                                                                                                  // 236
    template.$('input').trigger('keydown.item-floating-label');                                                   // 237
  }                                                                                                               // 238
};                                                                                                                // 239
                                                                                                                  // 240
Template.afFormGroup_ionic.destroyed = function () {                                                              // 241
  var template = this;                                                                                            // 242
  template.$('input').off('keyup.item-floating-label');                                                           // 243
};                                                                                                                // 244
                                                                                                                  // 245
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteoric:autoform-ionic'] = {};

})();
