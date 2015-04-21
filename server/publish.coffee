Meteor.publishComposite 'posts',
  find: ->
    Posts.find {}, limit: 100

Meteor.publishComposite 'post', (postId) ->
  find: ->
    Posts.find {_id: postId}, limit: 100