Template.editPost.events({
  'click a.ion-android-send': function(e, t) {
    var $title = t.find('#title'), $body = t.find('#body'), updatePost, postId;
    updatePost = {
      title: $title.value ? $title.value : '',
      body: body ? $body.value : ''
    };
    Posts.update({
      _id: this._id
    }, {
      $set: updatePost
    });
    return Router.go("/postView/" + this._id);
  },

  'click a.ion-android-camera': function(e) {
    return MeteoricCamera.getPicture({}, function(e, r) {
      var picture;
      if (e != null) {
        return console.log(e.message);
      } else {
        picture = r;
        return Session.set('picture', picture);
      }
    });
  }
});


Template.editPost.helpers({
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