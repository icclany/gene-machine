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

    $stateProvider.state('orderConfirmation', {
      url: '/confirmation',
      templateUrl: 'js/cart/templates/confirm.html',
    });
});

app.controller('CheckoutCtrl', function($state, $scope, cart, currentUser, CartFactory) {
    $scope.user = currentUser;
    $scope.cart = cart;
    $scope.total = CartFactory.getTotal(cart);

    $scope.checkout = function() {
      console.log("in CheckoutCtrl, currentUser: ", currentUser);
        return CartFactory.finishOrder($scope.shipping, $scope.billing.address, $scope.billing.cc, $scope.total, currentUser)
        .then(function() {
            $state.go('orderConfirmation');
        });
    };

    const handler = StripeCheckout.configure({
      key: 'pk_test_IcTLSnuVPyJq7tdlRcU7gzBf',
      image: '/js/common/directives/logo/gmlogo.png',
      locale: 'auto',
      token: function(token){
// <<<<<<< HEAD
//         token.total = $scope.total;
//         token.items = $scope.cart; // need to find the items currently in the cart
//
//         if(currentUser){
//           console.log('theres a currentUser');
//           console.dir(currentUser);
//           token.user = currentUser;
//           token.items = currentUser.cart;
//           CartFactory.submitStripeOrder(token)
//           .then(function(){
//             $state.go('orderConfirmation');
//           });
//         } else {
//           console.log("currentUser doesnt exist");
//           CartFactory.submitStripeOrder(token)
//           .then(function(){
//             $state.go('orderConfirmation');
//           });
//         }
// =======
        return CartFactory.finishOrder({
            street: token.card.address_line1,
            city: token.card.address_city,
            zipCode: token.card.address_zip
        }, {
            street: token.card.address_line1,
            city: token.card.address_city,
            zipCode: token.card.address_zip
        }, {
            name: "Paid with Stripe",
            number: "Paid with Stripe",
            date: "Paid with Stripe"}, $scope.total, currentUser)
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

app.controller('CartCtrl', function($scope, $state, cart, currentUser, ProductFactory) {
    $scope.cart = cart;

    $scope.updateQuantity = function($event, cartItem) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            return ProductFactory.updateQuantity(currentUser, cartItem.productInfo, cartItem.quantity);
        }
    };

    $scope.removeFromCart = function(cartItem) {
        return ProductFactory.removeFromCart(currentUser, cartItem.productInfo).then(function() {
            $state.go($state.current, {}, { reload: true });
        });
    };
});
