'use strict';

app.controller('AdminCtrl', function($scope, $state, AdminFactory, theUsers){
  $scope.goToUserSettings = function(user){
    $state.go('UserSettings', user);
  };

  $scope.theUsers = theUsers;

  console.log('inside admin controller');

  $scope.deleteUser = AdminFactory.deleteUser;
});
