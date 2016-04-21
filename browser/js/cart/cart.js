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
