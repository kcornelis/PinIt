/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	class Maps {

		public static $inject = [
			'uiGmapGoogleMapApiProvider'
		];

		constructor(uiGmapGoogleMapApiProvider: angular.google.maps.IApiProvider) {
			
			uiGmapGoogleMapApiProvider.configure({
				key: pinIt.config.google.apiKey,
				v: '3.17',
				libraries: 'geometry,visualization,places'
			});
		}
	}

	angular.module('pinIt').config(Maps);
}
