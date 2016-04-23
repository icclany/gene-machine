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
      console.log('in factory');
      return orders.data;
    });
  };


  return {
  	updateUser: updateUser,
    getOrders: getOrders
  };
});
