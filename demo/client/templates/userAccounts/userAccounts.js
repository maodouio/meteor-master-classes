Template.userAccounts.events({
  'click [data-action=logout]': function() {
    AccountsTemplates.logout();
  }
});

AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
  }
]);

// Accounts.ui.config({ passwordSignupFields: 'USERNAME_ONLY' });