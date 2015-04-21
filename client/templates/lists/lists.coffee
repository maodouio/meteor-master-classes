Template.lists.helpers
  posts: ->
    Posts.find {}, sort: time: -1
  getuser: ->
    Meteor.users.findOne _id: @authorId
  getUserPictureOrDefault: ->
    'https://randomuser.me/api/portraits/thumb/men/1.jpg'
  get_avatar_url: (usr) ->
    Avatar.getUrl usr
  email: -> Meteor.user().emails[0].address

Template.lists.events
  'click .viewpost': ->
    Router.go "/postView/#{@_id}"