Template.addPost.events({
  'click a.ion-android-send': function(e, t) {
    var _ref;

    var title = t.find('input[name=title]').value;
    var body = (_ref = t.find('textarea[name=body]')) != null ? _ref.value : void 0;
    var picture = Session.get('picture');
    var newPost = {
      title: title,
      body: body,
      pic: picture,
      published: true
    };
    var postId = Posts.insert(newPost);
    Session.set('picture', '');
    return Router.go("/postView/" + postId);
  },

  'click a.ion-android-camera': function(e) {
    return MeteoricCamera.getPicture({}, function(e, r) {
      var picture;
      if (e != null) {
        return conslue.log(e.message);
      } else {
        picture = r;
        return Session.set('picture', picture);
      }
    });
  }
});

AutoForm.setDefaultTemplate('ionic');

AutoForm.hooks({
  'edit-form': {
    onSuccess: function(formType, result) {
      console.log('Success submit!');
      console.log(result);
      var postId = this.docId;
      postId && Router.go('postView', {_id: postId});
    },

    onError: function(operation, error, template) {
      console.log(error);
    }
  }
});