/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	class HomeViewModel {

	}

	class HomeController {

		public static $inject = [
			'$scope'
		];

		constructor($scope) {
			$scope.viewModel = new HomeViewModel();
		}
	}

	angular.module('pinIt').controller('HomeController', HomeController);
}
