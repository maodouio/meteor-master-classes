(function(){
Template.__checkName("lists");
Template["lists"] = new Template("Template.lists", (function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return "headerTitle";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", HTML.H1({
        "class": "title"
      }, "Lists"), "\n  " ];
    });
  }), "\n  ", Blaze._TemplateWith(function() {
    return "headerButtonRight";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", HTML.BUTTON({
        "class": "button button-clear",
        "data-action": "showActionSheet"
      }, "\n      ", Blaze.If(function() {
        return Spacebars.call(view.lookup("currentUser"));
      }, function() {
        return [ "\n        Hi, ", Blaze.View("lookup:username", function() {
          return Spacebars.mustache(view.lookup("username"));
        }), "\n        ", HTML.I({
          "class": "icon ion-ios-person"
        }), "\n      " ];
      }, function() {
        return [ "\n        ", HTML.I({
          "class": "icon ion-ios-person-outline"
        }), "\n      " ];
      }), "\n    "), "\n  " ];
    });
  }), "\n\n  ", Spacebars.include(view.lookupTemplate("ionView"), function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("ionContent"), function() {
      return [ "\n      ", Spacebars.include(view.lookupTemplate("ionList"), function() {
        return [ "\n\n        ", Blaze.Each(function() {
          return Spacebars.call(view.lookup("posts"));
        }, function() {
          return [ "\n          ", HTML.DIV({
            "class": "viewpost",
            "data-id": function() {
              return Spacebars.mustache(view.lookup("_id"));
            }
          }, "\n            ", Blaze._TemplateWith(function() {
            return {
              buttonRight: Spacebars.call(true),
              avatar: Spacebars.call(true)
            };
          }, function() {
            return Spacebars.include(view.lookupTemplate("ionItem"), function() {
              return [ "\n            \n              ", HTML.IMG({
                src: "https://randomuser.me/api/portraits/thumb/men/27.jpg"
              }), "\n              ", HTML.H2(Blaze.View("lookup:title", function() {
                return Spacebars.mustache(view.lookup("title"));
              })), "\n              ", HTML.P("\n                ", Blaze.View("lookup:body", function() {
                return Spacebars.mustache(view.lookup("body"));
              }), "\n              "), "\n              ", HTML.BUTTON({
                "class": "button button-positive"
              }, Blaze._TemplateWith(function() {
                return {
                  icon: Spacebars.call("chevron-right")
                };
              }, function() {
                return Spacebars.include(view.lookupTemplate("ionIcon"));
              })), "\n            " ];
            });
          }), "\n          "), "\n        " ];
        }), "\n\n      " ];
      }), "\n    " ];
    }), "\n  " ];
  }) ];
}));

})();
