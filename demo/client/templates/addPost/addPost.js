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
    var cleanedSections, newPost, postId, sections, title, _ref;
    console.log('Submitting...');
    console.log(t);
    title = (_ref = t.find('input[name=title]')) != null ? _ref.value : void 0;
    body = (_ref = t.find('textarea[name=body]')) != null ? _ref.value : void 0;
    console.log(title, body);

    picture = Session.get('picture');
    console.log(picture);

    newPost = {
      title: title,
      body: body,
      pic: picture,
      published: true
    };
    console.log(newPost);
    postId = Posts.insert(newPost);
    Session.set('picture', '');
    return Router.go("/postView/" + postId);
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
