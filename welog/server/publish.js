Meteor.publish("posts", function () {
	return Posts.find();
});

Meteor.publish("images", function () {//todo
	return Images.find();
});


//Meteor.publish("postAndImage", function (userId) {
//	check(userId, String);
//	return [
//		Posts.find({userId: userId}, {fields: {secretInfo: 0}}),
//		Image.find({})
//	];
//});