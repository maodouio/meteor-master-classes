Meteor.startup(function () {

  if (Posts.find({}).count() >= 0) {
    Posts.remove({});
    return;
    console.log('clear posts');
    _(5).times(function(n) {
      Posts.insert({
      title: Fake.sentence(),
      body: Fake.paragraph(),
      published: Fake.fromArray([true, false])
    });
    });

  }

});
