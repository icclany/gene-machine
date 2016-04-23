'use strict';

app.factory('AdminFactory', function($http, $state){
  var AdminFactory = {};

  AdminFactory.fetchAllUsers = function(){
    return $http.get('/api/users').then(function(users){
      return users.data;
    });
  };

  AdminFactory.deleteUser = function(user){
    var areYouSure = confirm("Are you sure you want to delete this user?");
    if(areYouSure){
      $http.delete('/api/users/' + user).then(function(anything){
        $state.go($state.current, {}, {reload:true});
      });
    }
  };

  AdminFactory.deleteProduct = function(product){
    console.log("deleting product in admin factory")
    var areYouSure = confirm("Delete this product?");
    if(areYouSure){
      $http.delete('/api/products/' + product).then(function(anything){
        $state.go($state.current, {}, {reload:true});
      });
    }
  };

  // AdminFactory.editUser = function(user, options){
  //   $http.put('/api/users/' + user, options).then(function(anything){
  //     $state.go($state.current, {}, {reload:true});
  //   });
  // };

  AdminFactory.updateProduct = function(product){
    $http.put('/api/products/' + product._id, product).then(function(){
      $state.go($state.current, {}, {reload:true});
    });
  };

  return AdminFactory;
});
