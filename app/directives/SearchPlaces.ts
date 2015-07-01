/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	interface ISearchPlacesScope extends ng.IScope {
		placeChanged(params: {place: any});
	}

	class SearchPlacesDirective implements ng.IDirective  {
		private _apiLoader: angular.google.maps.IApiLoader;

		restrict = 'A';
		scope = {
			placeChanged: '&'
		};

		constructor(apiLoader: angular.google.maps.IApiLoader) {
			this._apiLoader = apiLoader;
		}

		link = (scope: ISearchPlacesScope, element: HTMLInputElement[]) => {
			this._apiLoader.then(() => {

				var searchBox = new google.maps.places.SearchBox(element[0]);
				google.maps.event.addListener(searchBox, 'places_changed', () => {
					var places = searchBox.getPlaces();
					if (places && places.length > 0 && scope.placeChanged) {
						scope.$apply(() => { 
							scope.placeChanged({ place: places[0] });
						}); 
					}
				});
			});
		}
	}

	function getDirectiveFactory(): ng.IDirectiveFactory {
		const factory = (uiGmapGoogleMapApi: any) => new SearchPlacesDirective(uiGmapGoogleMapApi);
		factory.$inject = ['uiGmapGoogleMapApi'];
		return factory;
	}

	angular.module('pinIt').directive('piSearchPlaces', getDirectiveFactory());
}
