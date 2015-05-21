var DEBUG = true;

var cacRouteViewMod = angular.module('cacRouteViewMod', ['ngRoute', 'cacLib']);

cacRouteViewMod.config(['$routeProvider', function($routeProvider, $routeParams) {
	$routeProvider

		.when('/', {
			templateUrl: 'home/home.html',
			controller: 'homeCtrl'
		})

		.when('/countries', {
			templateUrl: 'countries/countries.html',
			controller: 'countriesCtrl',
			resolve : {
				countries: function(getCountries) {
					return getCountries();
				}
			}
		})

		.when('/countries/:country/capital', {
			templateUrl: 'countries/country.html',
			controller: 'countryDetailCtrl',
			resolve: {
				// capital: function(getCapital) {
				// 	return getCapital();
				// 	if(DEBUG) console.log('resolving capital');
				// },
				neighbors: function($route, getNeighbors) {
					return getNeighbors($route.current.params.country);
				}
			}
		})
		.otherwise('/');
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

cacRouteViewMod.controller('countryDetailCtrl', function($scope, neighbors) {
	$scope.neighbors = neighbors.geonames;
	if(DEBUG) console.log('controller is called');
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