'use strict';

app.directive('singleProduct', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/product/templates/product.html',
    scope: {
      theProduct: '='
    }
  };
});
