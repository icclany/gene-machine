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

    $stateProvider.state('shippingBilling', {
      url: '/checkout/shippingBilling',
      templateUrl: 'js/cart/templates/shippingBilling.html',
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
});

app.controller('CheckoutCtrl', function($state, $scope, total, currentUser, CartFactory) {
    $scope.user = currentUser;
    $scope.cart = CartFactory.cart;
    $scope.total = CartFactory.getTotal();
    $scope.guest;
    $scope.brands = ['American Express', 'Visa', 'Mastercard'];

    $scope.finishCheckout = function() {
        var user = currentUser || {_id: null, email: $scope.guest.email};
        return CartFactory.finishOrder($scope.shipping, $scope.billing, user)
        .then(function() {
            $state.go('orderConfirmation');
        })
        .catch(function(error){
            console.error(error);
        });
    };


    const handler = StripeCheckout.configure({
      key: 'pk_test_IcTLSnuVPyJq7tdlRcU7gzBf',
      image: '/js/common/directives/logo/gmlogo.png',
      locale: 'auto',
      token: function(token){
        var user = currentUser || {_id: null, email: token.email};
        return CartFactory.finishOrder({
            name: token.card.name,
            street: token.card.address_line1,
            city: token.card.address_city,
            zipCode: token.card.address_zip
        }, {
            name: token.card.name,
            ccNum: "Paid with Stripe",
            brand: token.card.brand,
            ccExp: token.card.exp_month +"/"+ token.card.exp_year,
            billingAddress: {
                name: token.card.name,
                street: token.card.address_line1,
                city: token.card.address_city,
                zipCode: token.card.address_zip
            }
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
