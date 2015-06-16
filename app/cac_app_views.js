var cacRouteViewMod = angular.module('cacRouteViewMod', ['ui.router', 'cacLib']);

cacRouteViewMod.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

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
			 	countries: ["getCountry", function(getCountry) {
			 		return getCountry();
			 	}]
			}
		})

		.state('country', {
			url: '/countries/:country/capital',
			templateUrl: 'countries/country.html',
			controller: 'countryDetailCtrl',
			resolve: {
				geoname: ['$stateParams', 'getGeoname', function($stateParams, getGeoname) {
					console.log('real getGeoname is called');
					return getGeoname($stateParams.country);
				}],
				country: ['getCountry', 'geoname', function(getCountry, geoname) {
					console.log('real getCountry is called');
					return getCountry(geoname.countryCode);
				}],
				capital: ['getCapital', 'country', function(getCapital, country) {
					console.log('real getCapital is called');
					return getCapital(country.geonames[0].capital, country.geonames[0].countryCode);
				}],
				neighbors: ['$stateParams', 'getNeighbors', function($stateParams, getNeighbors) {
					console.log('real getNeighbors is called');
					return getNeighbors($stateParams.country);
				}]
			}
		});
}]);


cacRouteViewMod.controller('homeCtrl', ["$scope", function($scope) {
	
}])

cacRouteViewMod.controller('countriesCtrl', ["$scope", "$location", "countries", function($scope, $location, countries) {
	$scope.countries = countries.geonames;
	$scope.goToCountry = function(country) {
		var x = '/countries/' + country + '/capital';
		$location.path(x);
	};
}]);

cacRouteViewMod.controller('countryDetailCtrl', ["$scope", "geoname", "country", "capital", "neighbors", function($scope, geoname, country, capital, neighbors) {
	$scope.geoname = geoname;
	$scope.neighbors = neighbors.geonames;
	$scope.country = country.geonames[0];
	$scope.capital = capital.geonames[0];
}]);


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