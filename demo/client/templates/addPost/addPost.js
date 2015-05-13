AutoForm.setDefaultTemplate('ionic');

Template.addPost.helpers({
  picture: function() {
    return Session.get('picture');
  },
  pic_is_taken: function (argument) {
    if (Session.get('picture'))
      return true;
    return false;
  }
});

Template.addPost.events({
  'click a.ion-android-send': function(e, t) {
    var $title = t.find('#title'), $body = t.find('#body'), newPost, postId;
    newPost = {
      title: $title.value ? $title.value : '',
      body: body ? $body.value : '',
      published: true,
      pic: picture = Session.get('picture')
    };
    postId = Posts.insert(newPost);
    return Router.go("/postView/" + postId);
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

AutoForm.hooks({
  'edit-form': {
    onSuccess: function(formType, result) {
      Router.go('postView', {_id: this.docId});
    },

    onError: function(operation, error, template) {
      console.log(error);
    }
  }
});