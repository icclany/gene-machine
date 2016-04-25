app.factory('UserSettingsFact', function($http){
	"use strict";

  var UserSettingsFactory = {};

  UserSettingsFactory.updateUser = function(user){

    return $http.put('/api/users/'+user._id, user)
    .then(function(updatedUser) {
    	return updatedUser.data;
    });
  };

  UserSettingsFactory.getOrders = function(user){
    return $http.get('/api/users/'+user._id)
    .then(function(orders){
      return orders.data;
    });
  };

  UserSettingsFactory.updatePassword = function(user){
    return $http.put('/api/users/'+user._id, user)
    .then(function(updatedPword){
      return updatedPword.data;
    });
  };

  UserSettingsFactory.sendReview = function(reviewObj) {
    return $http.post('/api/reviews', reviewObj);
  };


  return UserSettingsFactory;
});
