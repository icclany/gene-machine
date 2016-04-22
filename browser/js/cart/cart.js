'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/templates/cart.html',
        controller: 'CartCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            cart: function(ProductFactory, currentUser) {
                return ProductFactory.getCart(currentUser);
            }
        }
    });
});

app.controller('CartCtrl', function($scope, currentUser, ProductFactory) {
    $scope.cart = ProductFactory.getCart();
    $scope.user = currentUser;
});

app.controller('CartCtrl', function($scope, cart, currentUser, ProductFactory) {
    $scope.cart = cart;

    $scope.updateQuantity = function($event, cartItem) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            // Do that thing you finally wanted to do
            console.log("item is")
            console.log(cartItem);
            return ProductFactory.updateQuantity(currentUser, cartItem.productInfo, cartItem.quantity)
        }
    }
})
