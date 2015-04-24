Router.configure
  layoutTemplate: 'layout'

Router.route '/',
  name: 'lists'
  subscriptions: -> Meteor.subscribe 'posts'

Router.route '/userAccounts'

Router.route '/addPost'

Router.route '/postView/:_id',
  name: 'postView'
  subscriptions: -> Meteor.subscribe 'post', @params._id
  data: -> Posts.findOne @params._id

Router.route '/editPost/:_id',
  name: 'editPost'
  subscriptions: -> Meteor.subscribe 'post', @params._id
  data: -> Posts.findOne @params._id