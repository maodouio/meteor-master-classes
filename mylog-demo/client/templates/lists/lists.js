Template.lists.helpers({
  times: function () {
    var times = [];
    _(8).times(function(n){
      times.push(n);
    });
    return times;
  },
  posts: function() {
    return Posts.find();
  },
  email: function() {
    return Meteor.user().emails[0].address;
  },
  getuser: function() {
    return Meteor.users.findOne({_id: this.authorId});
  },
  getUserPictureOrDefault: function() {
    return 'https://randomuser.me/api/portraits/thumb/men/1.jpg';
  },
  get_avatar_url: function(usr) {
    return Avator.getUrl(usr);
  }
});

Template.lists.events({
  'click .viewpost': function() {
    return Router.go("/postView/" + this._id);
  }
}
)
