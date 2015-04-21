Posts.allow
  insert: -> true
  update: (userId, doc) -> userId == doc.authorId