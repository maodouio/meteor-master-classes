(function(){
Template.__checkName("postView");
Template["postView"] = new Template("Template.postView", (function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return "headerButtonLeft";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n\n    ", Blaze._TemplateWith(function() {
        return {
          text: Spacebars.call(""),
          icon: Spacebars.call("chevron-left"),
          path: Spacebars.call("index")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("ionNavBackButton"));
      }), "\n\n  " ];
    });
  }), "\n\n  ", Blaze._TemplateWith(function() {
    return "headerTitle";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", HTML.H1({
        "class": "title"
      }, Blaze.View("lookup:title", function() {
        return Spacebars.mustache(view.lookup("title"));
      })), "\n  " ];
    });
  }), "\n\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isMyPost"));
  }, function() {
    return [ "\n  ", Blaze._TemplateWith(function() {
      return "headerButtonRight";
    }, function() {
      return Spacebars.include(view.lookupTemplate("contentFor"), function() {
        return [ "\n    ", HTML.BUTTON({
          "class": "button button-clear",
          onclick: function() {
            return [ "Router.go('/editPost/' + '", Spacebars.mustache(view.lookup("_id")), "')" ];
          }
        }, "Edit"), "\n  " ];
      });
    }), "\n  " ];
  }), "\n\n  ", Spacebars.include(view.lookupTemplate("ionView"), function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("ionContent"), function() {
      return [ "\n      ", HTML.DIV({
        "class": "list card"
      }, "\n\n        ", Blaze._TemplateWith(function() {
        return {
          buttonRight: Spacebars.call(true),
          avatar: Spacebars.call(true)
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("ionItem"), function() {
          return [ "\n          ", HTML.IMG({
            src: "https://randomuser.me/api/portraits/thumb/men/27.jpg"
          }), "\n\n          ", HTML.H2(Blaze.View("lookup:title", function() {
            return Spacebars.mustache(view.lookup("title"));
          })), "\n\n        " ];
        });
      }), "\n\n        ", HTML.H5("\n          ", Blaze.View("lookup:body", function() {
        return Spacebars.mustache(view.lookup("body"));
      }), "\n        "), "\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("pic_is_taken"));
      }, function() {
        return [ "\n        ", HTML.DIV({
          "class": "item item-image"
        }, "\n          ", HTML.IMG({
          "class": "full-image",
          src: function() {
            return Spacebars.mustache(view.lookup("pic"));
          }
        }), "\n        "), "\n        " ];
      }), "\n\n      "), "\n    " ];
    }), "\n  " ];
  }) ];
}));

})();
