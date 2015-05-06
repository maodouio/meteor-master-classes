(function(){
Template.__checkName("userAccounts");
Template["userAccounts"] = new Template("Template.userAccounts", (function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return "headerButtonLeft";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", Blaze._TemplateWith(function() {
        return {
          path: Spacebars.call("index")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("ionNavBackButton"));
      }), "\n  " ];
    });
  }), "\n  ", Blaze._TemplateWith(function() {
    return "headerTitle";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", HTML.H1({
        "class": "title"
      }, "User Accounts"), "\n  " ];
    });
  }), "\n\n  ", Spacebars.include(view.lookupTemplate("ionView"), function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("ionContent"), function() {
      return [ "\n      ", Blaze.If(function() {
        return Spacebars.call(view.lookup("currentUser"));
      }, function() {
        return [ "\n        ", HTML.DIV({
          "class": "padding"
        }, "\n          ", HTML.BUTTON({
          "class": "button button-positive button-block",
          "data-action": "logout"
        }, "Log Out"), "\n        "), "\n      " ];
      }, function() {
        return [ "\n        ", Spacebars.include(view.lookupTemplate("atForm")), "\n      " ];
      }), "\n    " ];
    }), "\n  " ];
  }) ];
}));

})();
