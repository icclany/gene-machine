app.config(function ($stateProvider) {

    $stateProvider.state('membersOnly', {
        url: '/members-area',
        templateUrl: 'js/members-only/templates/userpage.html',
        controller: 'UserCtrl',
        params: {
            user: null
        },
        resolve: {
            // subjectUser: function($stateParams){
            //     return $stateParams.user;
            // },
            currentUser: function(AuthService, $stateParams) {
                return AuthService.getLoggedInUser()
                .then(function(result){
                    if ($stateParams.user){
                        result.subjectUser = $stateParams.user;
                    } else {
                        result.subjectUser = result;
                    }
                    return result;
                });
            }
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

app.factory('SecretStash', function ($http) {

    var getStash = function () {
        return $http.get('/api/members/secret-stash').then(function (response) {
            return response.data;
        });
    };

    return {
        getStash: getStash
    };

});
