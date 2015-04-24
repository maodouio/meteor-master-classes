Template.userAccounts.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  }
});


if (Meteor.isServer){
  Meteor.methods({
    "userExists": function(username){
      return !!Meteor.users.findOne({username: username});
    }
  });
}


AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  //required: true,
  displayName: "用户名",
  func: function(value){
    if (Meteor.isClient) {
      console.log("Validating username...");
      var self = this;
      Meteor.call("userExists", value, function(err, userExists){
        if (!userExists)
          self.setSuccess();
        else
          self.setError(userExists);
        self.setValidating(false);
      });
      return;
    }
    // Server
    return Meteor.call("userExists", value);
  }
});
