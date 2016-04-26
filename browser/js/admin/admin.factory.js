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
      $http.delete('/api/users/' + user).then(function(){
        $state.go($state.current, {}, {reload:true});
      });
    }
  };

  AdminFactory.deleteProduct = function(product){
    var areYouSure = confirm("Delete this product?");
    if(areYouSure){
      $http.delete('/api/products/' + product).then(function(){
        $state.go($state.current, {}, {reload:true});
      });
    }
  };

  AdminFactory.resetPassword = function(user){
    $http.post('/api/users/reset', {email: user.email})
        .then(function(resetUser){
          console.log(resetUser);
      });
  };

  AdminFactory.updateProduct = function(product){
    $http.put('/api/products/' + product._id, product).then(function(){
      $state.go($state.current, {}, {reload:true});
    });
  };
  AdminFactory.getPurchases = function(){
    return $http.get('/api/purchases/')
      .then(function(purchases){
        return purchases.data;
      });
  };

  AdminFactory.shipPurchase = function(purchase){
    return $http.put('/api/purchases/'+purchase._id)
    .then(function(shippedPurchase){
      return $http.post('/api/users/email', {email: purchase.email, text: 'Your GeneMachine order, '+purchase._id+', has shipped!', subject: 'GeneMachine Order Shipped'})
        .then(function(emailSent){
          console.log(shippedPurchase);
          return shippedPurchase.data;
        });
    });
  };

  return AdminFactory;
});
