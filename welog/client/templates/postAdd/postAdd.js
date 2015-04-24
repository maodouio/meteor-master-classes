Template.postAdd.helpers({
	image: function () {
		return Session.get("image");
	}
});

Template.postAdd.events({
	'click a.takePicture': function () {
		var cameraOptions = {
			width: 800,
			height: 600
		};

		MeteorCamera.getPicture(cameraOptions, function (error, data) {
			Session.set("image", data);
		});
	}
});


AutoForm.hooks({//todo validation
	postAddForm: {
		before:{
			insert: function(doc) {
				//debugger
				if(Session.get('image')){ //保存图片
					doc.image=Images.insert(Session.get('image'))
				}
				return doc;

				// Then return it or pass it to this.result()
				//return doc; //(synchronous)
				//return false; (synchronous, cancel)
				//this.result(doc); (asynchronous)
				//this.result(false); (asynchronous, cancel)
			}
		},
		onSuccess: function(formType, result) {
			//alert('success')
			Router.go('postList')

		},

		// Called when any submit operation fails
		onError: function(formType, error) {
			alert(error)
		}
	}
});
