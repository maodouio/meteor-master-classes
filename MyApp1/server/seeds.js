Meteor.startup(function () {

  if (Posts.find({}).count() >= 0) {
    Posts.remove({});
    return;
    _(5).times(function(n){
        Posts.insert({
        title: Fake.word(),
        body: Fake.sentence(),
        published: Fake.fromArray([true, false]),
      });
    });
  }
});
