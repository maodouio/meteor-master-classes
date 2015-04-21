@Posts = new Mongo.Collection 'posts'

Posts.attachSchema new SimpleSchema
  title:
    type: String,
    max: 200,
    autoform:
      'label-type': 'stacked'

  body:
    type: String,
    autoform:
      rows: 10,
      'label-type': 'stacked'

  authorId:
    type: String,
    optional: false,
    autoValue: ->
      if this.isSet
        return;
      if this.isInsert
        return Meteor.userId()
      else
        this.unset()   