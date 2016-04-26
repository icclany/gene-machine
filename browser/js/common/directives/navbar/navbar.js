app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'Products', state: 'allProducts' },
                { label: 'Members Only', state: 'membersOnly', auth: true },
                { label: 'Admin', state: 'adminHome', admin: true}
            ];

            scope.adminItems = [
                { label: 'AU', state: 'adminUsers', admin: true },
                { label: 'AP', state: 'adminProducts', admin: true }
            ];

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            // scope.cartSize = function() {
            //     return scope.user.cart.reduce(function(prev, current) {
            //         return ({quantity: prev.quantity + current.quantity});
            //     });
            // };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
