Meteor.startup(function () {
  Posts.remove()
  if (Posts.find({}).count() === 0) {
    //Posts.remove()
    _(5).times(function(n){
      Posts.insert({
        title: Fake.sentence(),
        body: Fake.paragraph(),
        published: Fake.fromArray([true, false])
      });
    });

  }

});
