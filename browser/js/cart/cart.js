'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/templates/cart.html',
        controller: 'CartCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser() || {};
            },
            cart: function(CartFactory, currentUser, ProductFactory) {

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
            cart: function(CartFactory, currentUser, ProductFactory) {
                return ProductFactory.fetchAll()
                    .then(function(allProducts){
                        return CartFactory.populate(allProducts);
                    });
            },
            total: function(CartFactory){
                return CartFactory.getTotal();
            }
        }
    });

    $stateProvider.state('orderConfirmation', {
      url: '/confirmation',
      templateUrl: 'js/cart/templates/confirm.html',
    });
});

app.controller('CheckoutCtrl', function($state, $scope, total, currentUser, CartFactory) {
    $scope.user = currentUser;
    $scope.cart = CartFactory.cart;
    $scope.total = CartFactory.getTotal();
    $scope.finishCheckout = function() {
        if (!currentUser) {
            currentUser = {};
            currentUser._id = null;
            currentUser.email = $scope.shipping.name;
        }
        CartFactory.finishOrder($scope.shipping, $scope.billing, currentUser)
        .then(function() {
            $state.go('orderConfirmation');
        });
    };


    const handler = StripeCheckout.configure({
      key: 'pk_test_IcTLSnuVPyJq7tdlRcU7gzBf',
      image: '/js/common/directives/logo/gmlogo.png',
      locale: 'auto',
      token: function(token){

        var address = {};
        var billing = {};
        var paymentInfo = {};
        var user = currentUser || {_id: null, email: token.email};

        return CartFactory.finishOrder({
            street: token.card.address_line1,
            city: token.card.address_city,
            zipCode: token.card.address_zip
        }, {
            street: token.card.address_line1,
            city: token.card.address_city,
            zipCode: token.card.address_zip,
            brand: token.card.brand,
            ccNum: "Paid with Stripe",
            ccExp: token.card.exp_month + token.card.exp_year
        }, user)
        .then(function() {
            $state.go('orderConfirmation');
        });
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

app.controller('CartCtrl', function($scope, $state, cart, currentUser, CartFactory) {
    $scope.cart = CartFactory.cart;

    $scope.updateQuantity = function(cartItem, $event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13 && $event.type === 'keypress') {
            CartFactory.push(cartItem._id, cartItem.quantity, currentUser, true);
        } else if ($event.type === 'click') {
            CartFactory.remove(cartItem._id, currentUser);
        }
    };

    $scope.checkOut = function(){
        $state.go('checkout', {cart: $scope.cart});
    };

});
