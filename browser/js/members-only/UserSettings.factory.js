app.factory('UserSettingsFact', function($http){
	"use strict";
  var updateUser = function(user){

    return $http.put('/api/users/'+user._id, user)
    .then(function(updatedUser) {
    	return updatedUser.data;
    });
  };


  return {
  	updateUser: updateUser
  };
});
