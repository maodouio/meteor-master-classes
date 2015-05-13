Template.postView.helpers({
  isMyPost: function() {
    return true;
    if (Meteor.user() != null) {
      return Meteor.user()._id === this.authorId;
    }
  },
  pic_is_taken: function (argument) {
    if (this.pic)
      return true;
    return false;
  }
});