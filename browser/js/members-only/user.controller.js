app.controller('UserCtrl', function($scope, SecretStash, currentUser) {
    // SecretStash.getStash().then(function(stash) {
    //     $scope.stash = stash;
    // });

    $scope.user = currentUser;

    console.log("in user controller, user is ")
    console.log(currentUser)

})
