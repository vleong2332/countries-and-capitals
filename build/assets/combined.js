var cacLib = angular.module('cacLib', []);

cacLib.constant('CAC_API_PREFIX', 'http://api.geonames.org/');
cacLib.constant('COUNTRY_PATH', 'countryInfoJSON');
cacLib.constant('SEARCH_PATH', 'searchJSON');
cacLib.constant('NEIGHBORS_PATH', 'neighboursJSON');
cacLib.constant('GEONAME_PATH', 'getJSON');
cacLib.constant('CAC_API_USERNAME', 'vleong2332');

cacLib.factory('getCountry', ['$http', '$q', 'CAC_API_PREFIX', 'COUNTRY_PATH', 'CAC_API_USERNAME',
	function($http, $q, CAC_API_PREFIX, COUNTRY_PATH, CAC_API_USERNAME) {
		return function(countryCode) {
			var country = countryCode || null;
			var defer = $q.defer();
			$http({
				url: CAC_API_PREFIX + COUNTRY_PATH,
				method: 'GET',
				cache: true,
				params: {
					country: country,
					username: CAC_API_USERNAME
				}
			})
				.success(function(data) {
					defer.resolve(data);
				})
				.error(function(data) {
					console.log('getCountry went wrong');
				});
			return defer.promise;
		}
	}
]);

cacLib.factory('getGeoname', ["$http", "$q", "CAC_API_PREFIX", "GEONAME_PATH", "CAC_API_USERNAME", function($http, $q, CAC_API_PREFIX, GEONAME_PATH, CAC_API_USERNAME) {
	return function(geonameId) {
		var defer = $q.defer();
		$http({
			url: CAC_API_PREFIX + GEONAME_PATH,
			method: 'GET',
			cache: true,
			params: {
				geonameId: geonameId,
				username: CAC_API_USERNAME
			}
		})
			.success(function(data) {
				defer.resolve(data);
			})
			.error(function() {
				console.log('getGeoname went wrong');
			});
		return defer.promise;
	}
}]);

cacLib.factory('getNeighbors', ["$http", "$q", "CAC_API_PREFIX", "NEIGHBORS_PATH", "CAC_API_USERNAME", function($http, $q, CAC_API_PREFIX, NEIGHBORS_PATH, CAC_API_USERNAME) {
	return function(geonameId) {
		var defer = $q.defer();
		$http({
			url: CAC_API_PREFIX + NEIGHBORS_PATH,
			method: 'GET',
			cache: true,
			params: {
				geonameId: geonameId,
				username: CAC_API_USERNAME
			}
		})
			.success(function(data) {
				defer.resolve(data);
			})
			.error(function() {
				console.log('getNeighbors went wrong');
			});
		return defer.promise;
	}
}]);

cacLib.factory('getCapital', ["$http", "$q", "CAC_API_PREFIX", "SEARCH_PATH", "CAC_API_USERNAME", function($http, $q, CAC_API_PREFIX, SEARCH_PATH, CAC_API_USERNAME) {
	return function(capitalName, countryCode) {
		var defer = $q.defer();
		$http({
			url: CAC_API_PREFIX + SEARCH_PATH,
			method: 'GET',
			cache: true,
			params: {
				username: CAC_API_USERNAME,
				q: capitalName,
				name_equals: capitalName,
				country: countryCode,
				isNameRequired: true,
				featureCode: 'PPLC'
			}
		})
			.success(function(data) {
				defer.resolve(data);
			})
			.error(function() {
				console.log('getCapital went wrong');
			});
		return defer.promise;
	}
}]);
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
					return getGeoname($stateParams.country);
				}],
				country: ['getCountry', 'geoname', function(getCountry, geoname) {
					return getCountry(geoname.countryCode);
				}],
				capital: ['getCapital', 'country', function(getCapital, country) {
					return getCapital(country.geonames[0].capital, country.geonames[0].countryCode);
				}],
				neighbors: ['$stateParams', 'getNeighbors', function($stateParams, getNeighbors) {
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
var cacApp = angular.module('cacApp', ['cacRouteViewMod', 'ngAnimate', 'angular-velocity']);

cacApp.run(["$rootScope", "$location", "$timeout", function($rootScope, $location, $timeout) {
	$rootScope.$on('$stateChangeStart', function() {
		console.log('loading');
		$rootScope.isloading = true;
	});
	$rootScope.$on('$stateChangeSuccess', function() {
		console.log('success');
		$rootScope.isloading = false;
	});
}]);