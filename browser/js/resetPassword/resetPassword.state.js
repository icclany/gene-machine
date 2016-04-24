app.config(function($stateProvider){
	"use strict";
	$stateProvider.state('resetPassword', {
		url: '/reset/:token',
		templateUrl: '/js/members-only/templates/changePassword.html',
		controller: function($scope, $stateParams, $state, ResetPasswordFact){
			$scope.updatePassword = function (password) {
				if(password.passwordA !== password.passwordB){
					$scope.incongruentPasswords = true;
				} else {
					ResetPasswordFact.submitReset($stateParams.token, password.passwordA)
					.then(function(updatedUserPword){
						$state.go('login');
					});
				}
			};
		}
	});
});

