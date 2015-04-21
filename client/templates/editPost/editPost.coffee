Template.editPost.events
  'click a.ion-android-send': (e, t)->
    title = (t.find 'input[name=title]')?.value
    body = (t.find 'input[name=body]')?.value

    updateObj = 
      title: title
      body: body

    Posts.update {_id: @_id}, {$set: updateObj}
    Router.go "/postView/#{@_id}"