Template.addPost.helpers
  picture: -> Session.get('picture')
  pic_is_taken: (argument) -> !!Session.get('picture')

Template.addPost.events
  'click a.ion-android-send': (ev, t) ->
    title = (t.find 'input[name=title]')?.value
    body = (t.find 'input[name=body]')?.value
    
    newPost =
      title: title
      body: body
      pic: Session.get 'picture'

    postId = Posts.insert newPost
    Session.set 'picture', null
    Router.go "/postView/#{postId}"

  'click a.ion-android-camera': (ev) ->
    MeteoricCamera.getPicture {}, (err, data) ->
      if err then console.log err.messsage else Session.set 'picture', data