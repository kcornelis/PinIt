/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	class PositionModel {
		latitude: number;
		longitude: number;

		constructor(latitude: number, longitude: number) {
			this.latitude = latitude;
			this.longitude = longitude;
		}
	}

	class MarkerModel {
		id: string;
		position: PositionModel;

		constructor(id: string, position: PositionModel) {
			this.id = id;
			this.position = position;
		}
	}

	class MapModel {
		zoom: number;
		center: PositionModel;

		constructor(center: PositionModel, zoom: number) {
			this.center = center;
			this.zoom = zoom;
		}
	}

	class MapViewModel {
		map: MapModel;
		markers: MarkerModel[] = [];

		constructor() {
			this.map = new MapModel(new PositionModel(50.851041, 4.3560789 ), 8);
		}

		changePlace(place: google.maps.places.PlaceResult) {
			var marker = new MarkerModel(place.id,
				new PositionModel(place.geometry.location.lat(), place.geometry.location.lng()));

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
