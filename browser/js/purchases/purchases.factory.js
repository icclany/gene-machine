'use strict';

app.factory('PurchaseFactory', function($http){
  let PurchaseFactory = {};

  PurchaseFactory.fetchAll = function(){
    console.log('inside PurchaseFactory.fetchAll');
    return $http.get('api/purchases');
  };

  return PurchaseFactory;
})
