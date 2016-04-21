'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/templates/cart.html',
        controller: 'CartCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });

});

app.controller('CartCtrl', function($scope, currentUser, ProductFactory) {
    $scope.cart = ProductFactory.getCart();
    $scope.user = currentUser;
})

// app.directive('cartItem', function() {
//     return {
//         restrict: 'E',
//         template: '<div>{{cart.name}}</div>',
//         link: function(scope, elem, attr) {
//             scope.products = Object.keys(cart)
//             scope.products.map(function(ele){
//                 $http.get('/api/products/'+ele).then()
//             })


//             scope.produ
//         }
//     }
// })


// app.directive('singleProduct', function(){
//   return {
//     restrict: 'E',
//     templateUrl: '/js/product/templates/product.html',
//     scope: {
//       theProduct: '='
//     }
//   };
// });

