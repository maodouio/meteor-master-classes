Template.lists.helpers({
  times: function () {
    var times = [];
    _(8).times(function(n){
      times.push(n);
    });
    return times;
  },
  posts: function() {
    return Posts.find({}, {limit:10, sort:{time: -1}});
  },
});
