'use strict';

app.factory('AdminFactory', function($http, $state){
  var AdminFactory = {};

  AdminFactory.deleteUser = function(user){
    var areYouSure = confirm("Are you sure you want to delete this user?");
    if(areYouSure){
      $http.delete('/api/users/' + user).then(function(anything){
        $state.go($state.current, {}, {reload:true});
      });
    }
  };

  AdminFactory.fetchAllUsers = function(){
    return $http.get('/api/users').then(function(users){
      return users.data;
    });
  };

  return AdminFactory;
});
