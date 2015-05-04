Template.layout.events({
  'click #showProfileMenu': function(event, t) {
    //alert('show profile clicked');
    t.ActionSheetButtons = [];
    if (Meteor.user() != null) {
      t.ActionSheetButtons.push({
        actionId: 'addPost',
        text: 'New Post <i class="icon ion-ios-compose"></i>'
      });
      t.ActionSheetButtons.push({
        actionId: 'logout',
        text: 'Logout <i class="icon ion-log-out"></i>'
      });
    } else {
      t.ActionSheetButtons.push({
        actionId: 'login',
        text: 'Login <i class="icon ion-log-in"></i>'
      });
    }
    return IonActionSheet.show({
      titleText: '',
      buttons: t.ActionSheetButtons,
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        var _ref;
        switch ((_ref = t.ActionSheetButtons[index]) != null ? _ref.actionId : void 0) {
          case 'logout':
            Meteor.logout(function() {
              toastr.success('Logged out');
              return Router.go('lists');
            });
            break;
          case 'login':
            Router.go('userAccounts');
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  }
});