Meteor.publish('Posts', function() {
  return Posts.find();
});
Meteor.publish('post', function(id) {
  return Posts.find({_id: id});
});