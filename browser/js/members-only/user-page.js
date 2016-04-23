app.config(function ($stateProvider) {

    $stateProvider.state('membersOnly', {
        url: '/members-area',
        templateUrl: 'js/members-only/templates/userpage.html',
        controller: 'UserCtrl',
        params: {
            user: null
        },
        resolve: {
            User: function(AuthService, $stateParams) {
                return AuthService.getLoggedInUser()
                .then(function(result){
                    if ($stateParams.user){
                        return {currentUser: result, subjectUser: $stateParams.user};
                    } else {
                        return {currentUser: result, subjectUser: result};
                    }
                });
            },
            PurchaseHistory: function(AuthService, User, UserSettingsFact){
                return UserSettingsFact.getOrders(User.currentUser)
                    .then(function(allOrders){
                        return allOrders;
                    });
            }
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    })
    .state('membersOnly.address', {
        url: '/editAddress',
        templateUrl: 'js/members-only/templates/editAddress.html'
    })
    .state('membersOnly.settings', {
        url: '/editUserSettings',
        templateUrl: 'js/members-only/templates/editUserSettings.html'
    })
    .state('membersOnly.billing', {
        url: '/editBilling',
        templateUrl: 'js/members-only/templates/editBilling.html'
    })
    .state('membersOnly.editBilling', {
        url: '/billing',
        templateUrl: 'js/members-only/templates/editOnFileBilling.html'
    })
    .state('membersOnly.editAddress', {
        url: '/address',
        templateUrl: 'js/members-only/templates/editOnFileAddress.html'
    })
    .state('membersOnly.updatePassword', {
        url: '/updatePassword',
        templateUrl: 'js/members-only/templates/changePassword.html'
    });

});
