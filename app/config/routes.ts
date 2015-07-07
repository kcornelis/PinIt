/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	class Routes {

		public static $inject = [
			'$stateProvider',
			'$urlRouterProvider',
			'$authProvider'
		];

		constructor($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.route.IRouteProvider) {
			
			$urlRouterProvider.otherwise('/map/home');

			$stateProvider

				.state('map', {
					url: '/map',
					abstract: true,
					templateUrl: 'views/map.html',
					controller: 'MapController'
				})

				.state('map.home', {
					url: '/home',
					templateUrl: 'views/home.html',
					controller: 'HomeController'
				})

				.state('login', {
					url: '/login',
					templateUrl: 'views/login.html',
					controller: 'LoginController'
				});
		}
	}

	angular.module('pinIt').config(Routes);
}
