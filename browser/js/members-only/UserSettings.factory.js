app.factory('UserSettingsFact', function($http){
	"use strict";
  var updateUser = function(user){

    return $http.put('/api/users/'+user._id, user)
    .then(function(updatedUser) {
    	return updatedUser.data;
    });
  };

  var getOrders = function(user){
    return $http.get('/api/users/'+user._id)
    .then(function(orders){
      return orders.data;
    });
  };

  var updatePassword = function(user){
    return $http.put('/api/users/'+user._id, user)
    .then(function(updatedPword){
      return updatedPword.data;
    });
  };


  return {
  	updateUser: updateUser,
    getOrders: getOrders,
    updatePassword: updatePassword
  };
});
