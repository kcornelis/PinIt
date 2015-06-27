/// <reference path='../../typings/all.d.ts' />

module pinIt {
	'use strict';

	interface ISearchPlacesScope extends ng.IScope {
		placeChanged(params: {place: any});
	}

	class SearchPlacesDirective implements ng.IDirective  {
		private GoogleMapApi;

		restrict = 'A';
		scope = {
			placeChanged: '&'
		};

		constructor(GoogleMapApi: any) {
			this.GoogleMapApi = GoogleMapApi;
		}

		link = (scope: ISearchPlacesScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
			this.GoogleMapApi.then((map) => {
				var searchBox = new map.places.SearchBox(element[0]);
				map.event.addListener(searchBox, 'places_changed', () => {
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
