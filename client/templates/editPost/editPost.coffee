Template.editPost.helpers
  pic_is_taken: -> !!(@pic or Session.get 'picture')
  get_pic: -> @pic or Session.get 'picture'

Template.editPost.events
  'click a.ion-android-send': (ev, t) ->
    title = (t.find 'input[name=title]')?.value
    body = (t.find 'input[name=body]')?.value

    updateObj = 
      title: title
      body: body
      pic: Session.get 'picture' or @pic

    Posts.update {_id: @_id}, {$set: updateObj}
    Session.set 'picture', null
    Router.go "/postView/#{@_id}"

  'click a.ion-android-camera': (ev) ->
    MeteoricCamera.getPicture {}, (err, data) ->
      if err then console.log(err.message) else Session.set 'picture', data