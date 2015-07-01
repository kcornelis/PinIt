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
    var PositionModel = (function () {
        function PositionModel(latitude, longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
        return PositionModel;
    })();
    var MarkerModel = (function () {
        function MarkerModel(id, position) {
            this.id = id;
            this.position = position;
        }
        return MarkerModel;
    })();
    var MapModel = (function () {
        function MapModel(center, zoom) {
            this.center = center;
            this.zoom = zoom;
        }
        return MapModel;
    })();
    var MapViewModel = (function () {
        function MapViewModel() {
            this.markers = [];
            this.map = new MapModel(new PositionModel(50.851041, 4.3560789), 8);
        }
        MapViewModel.prototype.changePlace = function (place) {
            var marker = new MarkerModel(place.id, new PositionModel(place.geometry.location.lat(), place.geometry.location.lng()));
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
        function SearchPlacesDirective(apiLoader) {
            var _this = this;
            this.restrict = 'A';
            this.scope = {
                placeChanged: '&'
            };
            this.link = function (scope, element) {
                _this._apiLoader.then(function () {
                    var searchBox = new google.maps.places.SearchBox(element[0]);
                    google.maps.event.addListener(searchBox, 'places_changed', function () {
                        var places = searchBox.getPlaces();
                        if (places && places.length > 0 && scope.placeChanged) {
                            scope.$apply(function () {
                                scope.placeChanged({ place: places[0] });
                            });
                        }
                    });
                });
            };
            this._apiLoader = apiLoader;
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