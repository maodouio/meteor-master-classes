Meteor.subscribe("images");//todo move to router

Template.postView.helpers({

	isMyPost: function() {
		//console.log(Meteor.user()._id)
		//console.log(this.authorId)
		var user= Meteor.user()
		return user && user._id && user._id == this.authorId
	},

	beforeRemove: function () {
		return function (collection, id) {debugger
			var doc = collection.findOne(id);
			if (confirm('确定删除  "' + doc.title + '"?')) {
				this.remove();
				Router.go('postList')
			}
		};
	}

});
