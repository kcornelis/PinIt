var pinIt;
(function (pinIt) {
    pinIt.config;
})(pinIt || (pinIt = {}));
/// <reference path="../typings/all.d.ts" />
var pinIt;
(function (pinIt) {
    'use strict';
    var app = angular.module('pinIt', ['ui.router', 'uiGmapgoogle-maps']);
})(pinIt || (pinIt = {}));
/// <reference path='../../typings/all.d.ts' />
var pinIt;
(function (pinIt) {
    'use strict';
    var Maps = (function () {
        function Maps(uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: pinIt.config.google.apiKey,
                v: '3.17',
                libraries: 'geometry,visualization,places'
            });
        }
        Maps.$inject = [
            'uiGmapGoogleMapApiProvider'
        ];
        return Maps;
    })();
    angular.module('pinIt').config(Maps);
})(pinIt || (pinIt = {}));
/// <reference path='../../typings/all.d.ts' />
var pinIt;
(function (pinIt) {
    'use strict';
    var Routes = (function () {
        function Routes($stateProvider, $urlRouterProvider) {
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
            });
        }
        Routes.$inject = [
            '$stateProvider',
            '$urlRouterProvider'
        ];
        return Routes;
    })();
    angular.module('pinIt').config(Routes);
})(pinIt || (pinIt = {}));
/// <reference path='../../typings/all.d.ts' />
var pinIt;
(function (pinIt) {
    'use strict';
    var HomeViewModel = (function () {
        function HomeViewModel() {
        }
        return HomeViewModel;
    })();
    var HomeController = (function () {
        function HomeController($scope) {
            $scope.viewModel = new HomeViewModel();
        }
        HomeController.$inject = [
            '$scope'
        ];
        return HomeController;
    })();
    angular.module('pinIt').controller('HomeController', HomeController);
})(pinIt || (pinIt = {}));
/// <reference path='../../typings/all.d.ts' />
var pinIt;
(function (pinIt) {
    'use strict';
    var MapViewModel = (function () {
        function MapViewModel() {
            this.markers = [];
            this.map = { center: { latitude: 50.851041, longitude: 4.3560789 }, zoom: 8 };
        }
        MapViewModel.prototype.changePlace = function (place) {
            var marker = {
                id: place.id,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            };
            this.markers.push(marker);
        };
        return MapViewModel;
    })();
    var MapController = (function () {
        function MapController($scope) {
            $scope.viewModel = new MapViewModel();
        }
        MapController.$inject = [
            '$scope'
        ];
        return MapController;
    })();
    angular.module('pinIt').controller('MapController', MapController);
})(pinIt || (pinIt = {}));
/// <reference path='../../typings/all.d.ts' />
var pinIt;
(function (pinIt) {
    'use strict';
    var SearchPlacesDirective = (function () {
        function SearchPlacesDirective(GoogleMapApi) {
            var _this = this;
            this.restrict = 'A';
            this.scope = {
                placeChanged: '&'
            };
            this.link = function (scope, element, attrs, ctrl) {
                _this.GoogleMapApi.then(function (map) {
                    var searchBox = new map.places.SearchBox(element[0]);
                    map.event.addListener(searchBox, 'places_changed', function () {
                        var places = searchBox.getPlaces();
                        if (places && places.length > 0 && scope.placeChanged) {
                            scope.$apply(function () {
                                scope.placeChanged({ place: places[0] });
                            });
                        }
                    });
                });
            };
            this.GoogleMapApi = GoogleMapApi;
        }
        return SearchPlacesDirective;
    })();
    function getDirectiveFactory() {
        var factory = function (uiGmapGoogleMapApi) { return new SearchPlacesDirective(uiGmapGoogleMapApi); };
        factory.$inject = ['uiGmapGoogleMapApi'];
        return factory;
    }
    angular.module('pinIt').directive('piSearchPlaces', getDirectiveFactory());
})(pinIt || (pinIt = {}));
//# sourceMappingURL=app.js.map