Meteor.startup(function () {

    if (Posts.find({}).count() >= 0) {
      Posts.remove({});
      console.log('clear posts');
        _(7).times(function(n) {
            Posts.insert({
                title: Fake.sentence(),
                body: Fake.paragraph(),
                published: Fake.fromArray([true, false])
            });
        });

    }

});