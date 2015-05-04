Meteor.startup(function () {

  if (Posts.find({}).count() === 0) {
    Posts.remove({});
    return;
    Posts.insert({
      title: Fake.sentence(),
      body: Fake.paragraph(),
      published: Fake.fromArray([true, false])
    });
  }

});
