Template.postView.events
  'click #edit-button': (event, template) ->
    postId = template.data._id
    Router.go "/editView/#{postId}"

Template.postView.helpers
  userName: (authorId) ->
    currentUser = Meteor.users.findOne(authorId)
    currentUser?.username

  isMyPost: ->
    Meteor.user()?._id == @authorId
  
  get_avatar_url_from_post:  (post) ->
    usr = Meteor.users.findOne({_id: post.authorId})
    Avatar.getUrl(usr)