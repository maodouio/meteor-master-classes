Template.editPost.rendered = function() {
  //return Session.set('sections', this.data.sections);
};

Template.editPost.helpers({
  sections: function() {
    return Session.get('sections');
  },
  pic_is_taken: function (argument) {
    if (this.pic || Session.get('picture'))
      return true;
    return false;
  },
  get_pic: function (argument) {
    if (this.pic)
      return this.pic;
    if (Session.get('picture'))
      return Session.get('picture');
  }
});

Template.editPost.events({
  'click a.ion-android-send': function(e, t) {
    var postId, title, body, picture;
    title = (_ref = t.find('input[name=title]')) != null ? _ref.value : void 0;
    body = (_ref = t.find('textarea[name=body]')) != null ? _ref.value : void 0;
    console.log(title + body);
    if (Session.get('picture'))
      picture = Session.get('picture');
    else
      picture = this.pic;
    console.log(picture);

    updateObj = {
      title: title,
      body: body,
      pic: picture,
      published: true
    };
    postId = Posts.update({
      _id: this._id
    }, {
      $set: updateObj
    });
    Session.set('picture', '');
    return Router.go("/postView/" + this._id);
  },
  'click a.ion-android-camera': function(e) {
    return MeteoricCamera.getPicture({}, function(e, r) {
      var picture;
      if (e != null) {
        return console.log(e.message);
      } else {
        //picture = (Session.get('picture')) || [];
        picture = r;
        /*
        picture = {
          type: 'picture',
          time: Date.now(),
          pic: r
        };*/
        return Session.set('picture', picture);
      }
    });
  },
});

// ---
// generated by coffee-script 1.9.0