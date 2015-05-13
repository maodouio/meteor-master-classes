(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("ionBody"), function() {
    return [ "\n\n        ", Blaze._TemplateWith(function() {
      return {
        "class": Spacebars.call("bar-positive")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("ionNavBar"));
    }), "\n\n        ", Spacebars.include(view.lookupTemplate("ionNavView"), function() {
      return [ "\n          ", Spacebars.include(view.lookupTemplate("yield")), "\n        " ];
    }), "\n\n  " ];
  });
}));

})();
