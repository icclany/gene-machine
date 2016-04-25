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
            cart: function(CartFactory, currentUser, ProductFactory) {
                console.log('in cart resolve');
                return ProductFactory.fetchAll()
                    .then(function(allProducts){
                        console.log('here i am!');
                        console.log(allProducts);
                        return CartFactory.populate(allProducts);
                    });
            }
        }
    });
});

app.config(function($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/cart/templates/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            cart: function(CartFactory, currentUser) {
                return CartFactory(currentUser);
            }
        }
    });
});

app.controller('CheckoutCtrl', function($state, $scope, cart, currentUser, CartFactory) {
    $scope.user = currentUser;
    $scope.cart = cart;
    $scope.total = CartFactory.getTotal(cart);

    $scope.checkout = function() {
        return CartFactory.finishOrder($scope.shipping, $scope.billing.address, $scope.billing.cc, currentUser)
        .then(function() {
            $state.go('home');
        });
    };

});

app.controller('CartCtrl', function($scope, $state, cart, currentUser, ProductFactory, CartFactory) {
    $scope.cart = cart;
    $scope.cart = CartFactory.cart;
    console.log('in cart controller');
    console.log($scope.cart);

    $scope.updateQuantity = function(cartItem, $event) {
        
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            CartFactory.push(cartItem.productInfo._id, cartItem.quantity, currentUser)
                    .then(function(updatedCart){
                        $scope.cart = updatedCart;
                    });
        } else {
            CartFactory.remove(cartItem.productInfo._id, -cartItem.quantity, currentUser)
                .then(function(updatedCart){
                    console.log(updatedCart);
                });
        }
    };

});
