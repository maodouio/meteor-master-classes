(function(){Template.layout.events({
  'click [data-action=showActionSheet]': function (event, template) {
    var buttons = [];
    if (Meteor.user() != null) {
      buttons.push({ id: 'addPost', text: 'New Post <i class="icon ion-ios-compose"></i>' });
      buttons.push({ id: 'logout', text: 'Logout <i class="icon ion-log-out"></i>' });
    } else {
      buttons.push({ id: 'login', text: 'Login <i class="icon ion-log-in"></i>' });
    }
    IonActionSheet.show({
      buttons: buttons,
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        switch(buttons[index].id)
        {
          case 'addPost':
            Router.go('/addPost');
            break;
          case 'login':
            Router.go('/userAccounts');
            break;
          case 'logout':
            Meteor.logout(function() {
              toastr.success('Logged out');
              return Router.go('lists');
            });
            break;
          default:
        }
        return true;
      }
    });
  }
});

})();
