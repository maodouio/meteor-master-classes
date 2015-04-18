
AutoForm.hooks({
	postUpdateForm: {
		onSuccess: function(formType, result) {
			//console.log(this)

			var id = this.docId;

			Router.go('postView',{_id: id})
		},

		// Called when any submit operation fails
		onError: function(formType, error) {
			alert(0)
		}
	}
});
