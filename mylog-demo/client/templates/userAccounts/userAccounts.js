Template.userAccounts.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  }
});

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  required: true,
  func: function(value) {
    if (Meteor.isClient) {
      var self = this;
      Meteor.call("userExists", value, function(err, userExists) {
        if (!userExists)
          self.setSuccess();
        else
          self.setError(userExists);
        self.setValidating(false);
      });
      return;
    }

    return Meteor.call("userExists", value);
  }
}
);
