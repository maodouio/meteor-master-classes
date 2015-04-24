Posts.allow({
	insert: function (userId, post) {
		// can only create posts where you are the author
		return post.authorId === userId;
	},
	remove: function (userId, post) {
		// can only delete your own posts
		return post.authorId === userId;
	},
	update:function(userId, document, fieldNames, modifier){
		console.log(document)
		//return true
		return document.authorId === userId;
	}
});


Images.allow({
	download: function(userId, fileObj) {
		return true
	},
	insert: function(userId, fileObj) {
		return true
	},
	update: function(userId, fileObj) {
		return true
	},
	remove: function(userId, fileObj) {
		return true
	}
})