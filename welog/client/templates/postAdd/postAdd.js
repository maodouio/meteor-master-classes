Template.postAdd.helpers({
	name:'add'


});


AutoForm.hooks({
	postAddForm: {
		onSuccess: function(formType, result) {
			//alert('success')
			Router.go('postList')

		},

		// Called when any submit operation fails
		onError: function(formType, error) {
			alert(0)
		}
	}
});
