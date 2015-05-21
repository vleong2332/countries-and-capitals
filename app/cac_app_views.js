var DEBUG = true;

var cacRouteViewMod = angular.module('cacRouteViewMod', ['ui.router', 'cacLib']);

cacRouteViewMod.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	console.log('urlRouterProvider triggered');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'home/home.html',
			controller: 'homeCtrl'
		})

		.state('countries', {
			url: '/countries',
			templateUrl: 'countries/countries.html',
			controller: 'countriesCtrl',
			resolve : {
				countries: function(getCountries) {
					return getCountry();
				}
			}
		})

		.state('country', {
			url: '/countries/:country/capital',
			templateUrl: 'countries/country.html',
			controller: 'countryDetailCtrl',
			resolve: {
				geoname: ['$route', 'getGeoname', function($route, getGeoname) {
					console.log('resolving geoname');
					return getGeoname($route.current.params.country);
				}],
				country: ['getCountry', 'geoname', function(getCountry, geoname) {
					return getCountry(geoname.countryCode);
				}],
				neighbors: ['$route', 'getNeighbors', function($route, getNeighbors) {
					return getNeighbors($route.current.params.country);
				}]
			}
		});

	console.log('stateProvider is triggered');

}]);


cacRouteViewMod.controller('homeCtrl', function($scope) {
	$scope.message = "home controller";
})

cacRouteViewMod.controller('countriesCtrl', function($scope, $location, countries) {
	$scope.countries = countries.geonames;
	$scope.goToCountry = function(country) {
		var x = '/countries/' + country + '/capital';
		if(DEBUG) console.log('redirecting to', x);
		$location.path(x);
	};
});

cacRouteViewMod.controller('countryDetailCtrl', function($scope, geoname, country, neighbors) {
	console.log('countryDetailCtrl is triggered');
	$scope.geoname = geoname;
	$scope.neighbors = neighbors.geonames;
	$scope.country = country;
	console.log($scope.geoname, $scope.neighbors, $scope.country);
});


// ===================================================================================
//      CUSTOM DIRECTIVES
// ===================================================================================
cacRouteViewMod.directive('buttonDiv', function() {
	return  {
		restrict: "E",
		transclude: true,
		replace: true,
		template: "<div id=\"buttons\"><ng-transclude></ng-transclude></div>"
	}
});

cacRouteViewMod.directive('homeButton', function() {
	return  {
		restrict: "E",
		require: "^buttonDiv",
		replace: true,
		template: "<a href=\"#/\"><button name=\"home\">Home</button></a>"
	}
});

cacRouteViewMod.directive('browseButton', function() {
	return  {
		restrict: "E",
		require: "^buttonDiv",
		replace: true,
		template: "<a href=\"#/countries\"><button name=\"browse\">Browse Countries</button></a>"
	}
});