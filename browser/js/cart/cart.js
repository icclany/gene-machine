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

app.config(function($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/cart/templates/checkout.html',
        controller: 'CheckoutCtrl',
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

app.controller('CheckoutCtrl', function($state, $scope, cart, currentUser, CartFactory) {
    $scope.user = currentUser;
    $scope.cart = cart;
    $scope.total = CartFactory.getTotal(cart);

    $scope.checkout = function() {
        return CartFactory.finishOrder($scope.shipping, $scope.billing.address, $scope.billing.cc, currentUser)
        .then(function() {
            $state.go('home');
        })
    };

    const handler = StripeCheckout.configure({
      key: 'pk_test_IcTLSnuVPyJq7tdlRcU7gzBf',
      image: '/js/common/directives/logo/gmlogo.png',
      locale: 'auto',
      token: function(token){
        CartFactory.submitStripeOrder(token);
      }
    });

    $scope.openStripe = function(){
      handler.open({
        name: "Gene Machine",
        image: '/js/common/directives/logo/gmlogo.png',
        billingAddress: true,
        zipCode: true,
        shippingAddress: true,
        amount: $scope.total * 100
      });
    };

    $scope.stripeCallback = function (code, result) {
      if (result.error) {
          window.alert('it failed! error: ' + result.error.message);
      } else {
          window.alert('success! token: ' + result.id);
      }
    };

});

app.controller('CartCtrl', function($scope, $state, cart, currentUser, ProductFactory) {
    $scope.cart = cart;

    $scope.updateQuantity = function($event, cartItem) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            return ProductFactory.updateQuantity(currentUser, cartItem.productInfo, cartItem.quantity);
        }
    };

    $scope.removeFromCart = function(cartItem) {
        return ProductFactory.removeFromCart(currentUser, cartItem.productInfo).then(function(res) {
            $state.go($state.current, {}, { reload: true });
        });
    };
});
