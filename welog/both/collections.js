Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "标题",
    max: 200,
    autoform: {
      'label-type': 'stacked'
    }
  },
  body: {
    type: String,
    label: "内容",
    autoform: {
      rows: 10,
      'label-type': 'stacked'
    }
  },
  image: {//存储图片id
    type: FS.File,    //cfs:ejson-file
    optional: true,
    label: "图片"
  },

  authorId: {   //form 忽略
    type: String,
    autoValue: function() {
      if (this.isUpdate) {
        return;
      }
      if (this.isInsert) {
        return this.userId;
      }
    }
  },
  published: {
    type: Boolean,
    label: "公开",
    defaultValue: true,
    autoform: {
      type: 'toggle'
    }
  }
}));


//图片
Images = new FS.Collection("images", {
  stores: [
    //new FS.Store.FileSystem("thumbs", { transformWrite: createThumb }),
    new FS.Store.FileSystem("images")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});


