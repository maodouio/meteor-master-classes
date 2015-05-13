Posts.allow({
  'insert': function(userId, doc) {
    return !!userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId === doc.authorId;
  },
  'remove': function(userId, doc) {
    return false;
  }
});