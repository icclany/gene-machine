'use strict';

app.controller('PurchaseCtrl', function($scope, PurchaseFactory, thePurchases){
  $scope.purchases = thePurchases;
});
