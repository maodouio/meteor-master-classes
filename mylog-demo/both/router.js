Router.configure({
  layoutTemplate: 'layout'
});

Meteor.startup(function () {
  if (Meteor.isClient) {
    var location = Iron.Location.get();
    if (location.queryObject.platformOverride) {
      Session.set('platformOverride', location.queryObject.platformOverride);
    }
  }
});

console.log('meteor is running');

Router.map(function() {
  this.route('lists', {
    path: '/',
    subscriptions: function() {
      Meteor.subscribe('Posts');
    }
  });
  this.route('addPost');
  this.route('postView', {
    path: '/postView/:_id',
    subscriptions: function() {
      Meteor.subscribe('post', this.params._id);
    },
    data: function() {
      return Posts.findOne(this.params._id);
    }
  });
  this.route('editPost', {
    path: '/editPost/:_id',
    subscriptions: function() {
      Meteor.subscribe('post', this.params._id);
    },
    data: function() {
      return Posts.findOne(this.params._id);
    }
  })
  /*
  this.route('actionSheet');
  this.route('backdrop');
  this.route('forms', {
    data: function () {
      return {
        post: Posts.find().fetch()[0]
      };
    }
  });
  this.route('headersFooters');
  this.route('lists');
  this.route('loading');
  this.route('modal');
  this.route('navigation');
  this.route('navigation.one', {path: '/navigation/one'});
  this.route('navigation.two', {path: '/navigation/two'});
  this.route('navigation.three', {path: '/navigation/three'});
  this.route('popover');
  this.route('popup');
  this.route('sideMenu');
  this.route('slideBox');
  this.route('tabs.one', {path: '/tabs/one', layoutTemplate: 'tabsLayout'});
  this.route('tabs.two', {path: '/tabs/two', layoutTemplate: 'tabsLayout'});
  this.route('tabs.three', {path: '/tabs/three', layoutTemplate: 'tabsLayout'});
  this.route('tabs.four', {path: '/tabs/four', layoutTemplate: 'tabsLayout'});
  */
  this.route('userAccounts');
});
