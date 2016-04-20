'use strict';

app.directive('singleProduct', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/product/product.html',
    scope: {
      theProduct: '='
    }
  };
});
