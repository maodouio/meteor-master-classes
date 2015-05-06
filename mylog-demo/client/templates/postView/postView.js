Template.postView.events({
  'click #edit-button': function(event, template) {
    var postId;
    postId = template.data._id;
    return Router.go("/editView/" + postId);
  },
});

Template.postView.helpers({
  userName: function(authorId) {
    var currentUser = Meteor.users.findOne(authorId);
    return currentUser.username;
  },
  isMyPost: function() {
    if (Meteor.user() != null) {
      return Meteor.user()._id === this.authorId;
    }
  },
  get_avatar_url_from_post: function(post) {
    var p, usr;
    p = Posts.findOne({
      _id: post._id
    });
    usr = Meteor.users.findOne({
      _id: p.authorId
    });
    return Avatar.getUrl(usr);
  },
});