app.config(function($stateProvider){
  $stateProvider.state('adminUsers', {
    url: '/admin',
    templateUrl: '/js/admin/templates/admin.html',
    controller: 'AdminCtrl',
    resolve: {
      theUsers: function(AdminFactory){
        return AdminFactory.fetchAllUsers().then(function(users){
          console.log('in adminUsers state:', users);
          return users;
        });
      }
    }
  });
});
