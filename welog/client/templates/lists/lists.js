Template.lists.helpers({
  times: function () {
    var times = [];
    _(20).times(function(n){
      times.push(n);
    });
    return times;
  },
  posts: function() {
    return Posts.find({}, {
      sort: {
        time: -1
      }
    });
  }
});

Template.lists.events({
  'click .item-post': function() {
    alert('click')
    //return Router.go("/postView/" + this._id);
  }
});
