Template.lists.helpers({
  times: function () {
    var times = [];
    _(7).times(function(n){
      times.push(n);
    });
    return times;
  }
});
