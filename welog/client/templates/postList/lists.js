
Meteor.subscribe("posts");//todo move to router

Template.postList.helpers({
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
  },
  userDisplay:function(){
    return Meteor.user().username || Meteor.user().emails[0].address

  }

});

Template.postList.events({
  'click .item-post': function() {
    //alert('click')
    console.log(this)
    return Router.go("/posts/" + this._id);
  },
  'click h2': function() {
    console.log(this)

  }
});
