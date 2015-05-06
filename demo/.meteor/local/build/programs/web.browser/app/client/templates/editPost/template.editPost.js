(function(){
Template.__checkName("editPost");
Template["editPost"] = new Template("Template.editPost", (function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return "headerButtonLeft";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", Blaze._TemplateWith(function() {
        return {
          path: Spacebars.call("lists")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("ionNavBackButton"));
      }), "\n  " ];
    });
  }), "\n\n  ", Blaze._TemplateWith(function() {
    return "headerTitle";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", HTML.H1({
        "class": "title"
      }, "Edit Post"), "\n  " ];
    });
  }), "\n\n  ", Spacebars.include(view.lookupTemplate("ionView"), function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("ionContent"), function() {
      return [ "\n\n  ", Blaze._TemplateWith(function() {
        return {
          collection: Spacebars.call("Posts"),
          id: Spacebars.call("edit-form"),
          doc: Spacebars.call(view.lookup(".")),
          type: Spacebars.call("update")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("autoForm"), function() {
          return [ "\n      ", Blaze._TemplateWith(function() {
            return {
              id: Spacebars.call("title"),
              name: Spacebars.call("title")
            };
          }, function() {
            return Spacebars.include(view.lookupTemplate("afQuickField"));
          }), "\n      ", Blaze._TemplateWith(function() {
            return {
              id: Spacebars.call("body"),
              name: Spacebars.call("body")
            };
          }, function() {
            return Spacebars.include(view.lookupTemplate("afQuickField"));
          }), "\n\n        ", HTML.DIV({
            "class": "button-bar"
          }, "\n          ", HTML.A({
            "class": "button icon ion-android-send button-positive"
          }, "Submit"), "\n        "), "\n      " ];
        });
      }), "\n      \n    " ];
    }), "\n  " ];
  }) ];
}));

})();
