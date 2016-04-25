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
        return CartFactory.finishOrder($scope.shipping, $scope.billing.address, $scope.billing.cc, $scope.total,currentUser)
        .then(function() {
            $state.go('home');
        });
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
