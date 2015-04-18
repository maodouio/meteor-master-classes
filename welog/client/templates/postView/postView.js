Template.postView.helpers({

	isMyPost: function() {

		Meteor.user() && Meteor.user()._id == this._id
	}
});/**
 * Created by ennea8 on 4/17/15.
 */
