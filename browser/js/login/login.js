app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, $http, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.settings = function(){
        $http.get('/api/users')
        .then(function(allusers){
            $state.go('UserSettings', {user: allusers.data[0]});
        });
    };
    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;
                    // scope.settings to be moved or commented out.  only testign
        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});