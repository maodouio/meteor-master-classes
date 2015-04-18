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


Router.route('/',{name:'index',template:'postList'})

Router.route('/postList',{name:'postList'})

Router.route('/posts/:_id',{
  name:'postView',
  data: function () {
    return Posts.findOne({_id: this.params._id});
  }
})
Router.route('/postAdd',{name:'postAdd'})
Router.route('/postUpdate/:_id',{
  name:'postUpdate',
  data: function () {
    return Posts.findOne({_id: this.params._id});
  }
})


Router.route('userAccounts');


//Router.map(function() {
//  this.route('index', {path: '/'});
//  this.route('actionSheet');
//  this.route('backdrop');
//  this.route('forms', {
//    data: function () {
//      return {
//        post: Posts.find().fetch()[0]
//      };
//    }
//  });
//  this.route('headersFooters');
//  this.route('lists');
//  this.route('loading');
//  this.route('modal');
//  this.route('navigation');
//  this.route('navigation.one', {path: '/navigation/one'});
//  this.route('navigation.two', {path: '/navigation/two'});
//  this.route('navigation.three', {path: '/navigation/three'});
//  this.route('popover');
//  this.route('popup');
//  this.route('sideMenu');
//  this.route('slideBox');
//  this.route('tabs.one', {path: '/tabs/one', layoutTemplate: 'tabsLayout'});
//  this.route('tabs.two', {path: '/tabs/two', layoutTemplate: 'tabsLayout'});
//  this.route('tabs.three', {path: '/tabs/three', layoutTemplate: 'tabsLayout'});
//  this.route('tabs.four', {path: '/tabs/four', layoutTemplate: 'tabsLayout'});
//  this.route('userAccounts');
//});
