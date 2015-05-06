(function(){AutoForm.setDefaultTemplate('ionic');
Template.addPost.events({
  'click a.ion-android-send': function(e, t) {
    var $title = t.find('#title'), $body = t.find('#body'), newPost, postId;
    newPost = {
      title: $title.value ? $title.value : '',
      body: body ? $body.value : ''
    };
    postId = Posts.insert(newPost);
    return Router.go("/postView/" + postId);
  }
});

})();
