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
        data: {
            authenticate: true
        }
    })
    .state('editAccountInfo.address', {
        url: '/editAddress',
        templateUrl: 'js/members-only/templates/editAddress.html',
        data: {
            authenticate: true
        }
    })
    .state('editAccountInfo.settings', {
        url: '/editUserSettings',
        templateUrl: 'js/members-only/templates/editUserSettings.html',
        data: {
            authenticate: true
        }
    })
    .state('editAccountInfo.billing', {
        url: '/editBilling',
        templateUrl: 'js/members-only/templates/editBilling.html',
        data: {
            authenticate: true
        }
    })
    .state('editAccountInfo.editBilling', {
        url: '/billing',
        templateUrl: 'js/members-only/templates/editOnFileBilling.html',
        data: {
            authenticate: true
        }
    })
    .state('editAccountInfo.editAddress', {
        url: '/address',
        templateUrl: 'js/members-only/templates/editOnFileAddress.html',
        data: {
            authenticate: true
        }
    })
    .state('editAccountInfo.updatePassword', {
        url: '/updatePassword',
        templateUrl: 'js/members-only/templates/changePassword.html',
        data: {
            authenticate: true
        }
    })
    .state('previousPurchases', {
      url: '/previousPurchases',
      templateUrl: 'js/members-only/templates/previousPurchases.html',
      controller: 'UserCtrl',
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
    })
    .state('editAccountInfo', {
      url: '/editAccountInfo',
      templateUrl: 'js/members-only/templates/editMain.html',
      controller: 'UserCtrl',
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
    });
});
