/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	class MapViewModel {
		map: any;
		markers: any[] = [];

		constructor() {
			this.map = { center: { latitude: 50.851041, longitude: 4.3560789 }, zoom: 8 };
		}

		changePlace(place: any) {
			var marker: any = {
				id: place.id,
				latitude: place.geometry.location.lat(),
				longitude: place.geometry.location.lng()
			};

			this.markers.push(marker);
		}
	}

	class MapController {

		public static $inject = [
			'$scope'
		];

		constructor($scope) {
			$scope.viewModel = new MapViewModel();
		}
	}

	angular.module('pinIt').controller('MapController', MapController);
}
