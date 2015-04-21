Template.addPost.events
  'click a.ion-android-send': (e, t)->
    console.log 'Submitting...'

    title = (t.find 'input[name=title]')?.value
    body = (t.find 'input[name=body]')?.value
    
    newPost =
      title: title
      body: body

    console.log newPost
    postId = Posts.insert newPost
    Router.go "/postView/#{postId}"