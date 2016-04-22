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

app.controller('CartCtrl', function($scope, $state, cart, currentUser, ProductFactory) {
    $scope.cart = cart;

    $scope.updateQuantity = function($event, cartItem) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            return ProductFactory.updateQuantity(currentUser, cartItem.productInfo, cartItem.quantity)
        }
    }

    $scope.removeFromCart = function(cartItem) {
        return ProductFactory.removeFromCart(currentUser, cartItem.productInfo).then(function(res) {
                $state.go($state.current, {}, {reload:true})
        })
    }
})
