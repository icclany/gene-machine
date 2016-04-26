'use strict';

app.controller('AdminUserCtrl', function($scope, $state, AdminFactory, theUsers){
  $scope.goToUserSettings = function(user){
    $state.go('membersOnly', {user: user});
  };

  $scope.theUsers = theUsers;
  $scope.deleteUser = AdminFactory.deleteUser;

  $scope.editUser = AdminFactory.editUser;
  $scope.passwordReset = function(user){
    AdminFactory.resetPassword(user);
  };

});

app.controller('AdminProductCtrl', function($scope, $state, AdminFactory, theProducts){
  $scope.theProducts = theProducts;

  $scope.goToProductSettings = function(product){
    $state.go('productSettings', {product: product});
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

app.controller('AdminPurchaseCtrl', function($scope, $http, allPurchases, AdminFactory){
  $scope.thePurchases = allPurchases;
  $scope.shipPurchase = function(purchaseID){
    AdminFactory.shipPurchase(purchaseID)
      .then(function(shippedPurchase){
        $scope.thePurchases.find(function(purchase){
          return purchase._id === shippedPurchase._id;
        }).shippingDate = shippedPurchase.shippingDate;
      });
  };
});
