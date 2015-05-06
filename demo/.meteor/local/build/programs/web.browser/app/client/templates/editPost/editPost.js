(function(){Template.editPost.events({
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
  }
});

})();
