'use strict';

app.controller('AdminUserCtrl', function($scope, $state, AdminFactory, theUsers){
  $scope.goToUserSettings = function(user){
    $state.go('membersOnly', {user: user});
  };

  $scope.theUsers = theUsers;
  $scope.deleteUser = AdminFactory.deleteUser;

  $scope.editUser = AdminFactory.editUser;
});

app.controller('AdminProductCtrl', function($scope, $state, AdminFactory, theProducts){
  $scope.theProducts = theProducts;

  $scope.goToProductSettings = function(product){
    $state.go('productSettings', {product: product}); // maybe needs to be wrapped
  };

  $scope.deleteProduct = AdminFactory.deleteProduct;
});

app.controller('AdminSingleProductCtrl', function($scope, theProduct, AdminFactory){
  $scope.theProduct = theProduct;

  $scope.updated = false;

  $scope.updateProduct = function(product){
    AdminFactory.updateProduct(product);
    $scope.updated = true;
  };


});
