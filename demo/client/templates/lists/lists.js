Template.lists.helpers({
  times: function () {
    var times = [];
    _(20).times(function(n){
      times.push(n);
    });
    return times;
  },
  posts: function () {
    // body...
    return Posts.find();
  },
  email: function () {
    return Meteor.user().emails[0].address;
  },
  getuser: function () {
    console.log('getuser', this);
    return Meteor.users.findOne({_id: this.authorId});
  },
  getUserPictureOrDefault: function () {
    return 'https://randomuser.me/api/portraits/thumb/men/1.jpg';
  },
  get_avatar_url: function (usr) {
    console.log('usr is ', usr);
    return Avatar.getUrl(usr);
  },
});

Template.lists.events({
  'click .viewpost': function() {
    return Router.go("/postView/" + this._id);
  }
});
