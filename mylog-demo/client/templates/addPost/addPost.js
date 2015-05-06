Template.addPost.events({
  'click a.ion-android-send': function(e, t) {
    var title = t.find('input[name=title]').value;
    var body = t.find('input[name=body]').value;

    var newPost = {
      title: title,
      body: body,
      published: true
    };
    var postId = Posts.insert(newPost);
    return Router.go("/postView/" + postId);
  }
});