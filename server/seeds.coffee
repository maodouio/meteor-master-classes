Meteor.startup ->
  if (Posts.find {}).count() >= 0
    Posts.remove {}