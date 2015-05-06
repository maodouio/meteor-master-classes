(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("ionBody"), function() {
    return [ "\n\n    ", Spacebars.include(view.lookupTemplate("ionSideMenuContainer"), function() {
      return [ "\n\n      ", Spacebars.include(view.lookupTemplate("ionSideMenus"), function() {
        return [ "\n\n        ", Spacebars.include(view.lookupTemplate("ionSideMenu"), function() {
          return [ "\n          ", HTML.DIV({
            "class": "bar bar-header bar-dark"
          }, "\n            ", HTML.H1({
            "class": "title"
          }, "Left Menu"), "\n          "), "\n          ", HTML.DIV({
            "class": "content has-header"
          }, "\n            ", HTML.DIV({
            "class": "list"
          }, "\n              ", HTML.DIV({
            "class": "item item-icon-right",
            "data-ion-menu-close": ""
          }, "\n                Close Me ", Blaze._TemplateWith(function() {
            return {
              icon: Spacebars.call("ios-arrow-right")
            };
          }, function() {
            return Spacebars.include(view.lookupTemplate("ionIcon"));
          }), "\n              "), "\n            "), "\n          "), "\n        " ];
        }), "\n\n        ", Blaze._TemplateWith(function() {
          return {
            side: Spacebars.call("right")
          };
        }, function() {
          return Spacebars.include(view.lookupTemplate("ionSideMenu"), function() {
            return [ "\n          ", HTML.DIV({
              "class": "bar bar-header bar-dark"
            }, "\n            ", HTML.H1({
              "class": "title"
            }, "Right Menu"), "\n          "), "\n          ", HTML.DIV({
              "class": "content has-header"
            }, "\n            ", HTML.DIV({
              "class": "list"
            }, "\n              ", HTML.DIV({
              "class": "item item-icon-left",
              "data-ion-menu-close": ""
            }, "\n                ", Blaze._TemplateWith(function() {
              return {
                icon: Spacebars.call("ios-arrow-left")
              };
            }, function() {
              return Spacebars.include(view.lookupTemplate("ionIcon"));
            }), " Close Me\n              "), "\n            "), "\n          "), "\n        " ];
          });
        }), "\n\n      " ];
      }), "\n\n      ", Spacebars.include(view.lookupTemplate("ionSideMenuContent"), function() {
        return [ "\n\n        ", Blaze._TemplateWith(function() {
          return {
            "class": Spacebars.call("bar-positive")
          };
        }, function() {
          return Spacebars.include(view.lookupTemplate("ionNavBar"));
        }), "\n\n        ", Spacebars.include(view.lookupTemplate("ionNavView"), function() {
          return [ "\n          ", Spacebars.include(view.lookupTemplate("yield")), "\n        " ];
        }), "\n\n      " ];
      }), "\n\n    " ];
    }), "\n\n  " ];
  });
}));

})();
