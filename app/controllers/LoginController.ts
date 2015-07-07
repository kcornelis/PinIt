/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	class LoginViewModel {

	}

	class LoginController {

		public static $inject = [
			'$scope', '$auth'
		];

		constructor($scope: any, $auth: any) {
			$scope.viewModel = new LoginViewModel();

			$scope.authenticate = function(provider) {
				$auth.authenticate(provider).then(function(res) {
					var token = res.data.token;
				}).catch(function(err) {
					console.log(err);
				});
			};
		}
	}

	angular.module('pinIt').controller('LoginController', LoginController);
}
