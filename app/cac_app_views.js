var cacRouteViewMod = angular.module('cacRouteViewMod', ['ngRoute', 'cacLib']);

cacRouteViewMod.config(['$routeProvider', function($routeProvider) {
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
			templateUrl: 'countires/country.html',
			controller: 'defCtrl',
			resolve: {}
		})
		.otherwise('/');
}]);


cacRouteViewMod.controller('homeCtrl', function($scope) {
	$scope.message = "home controller";
})

cacRouteViewMod.controller('countriesCtrl', function($scope, countries) {
	$scope.countries = countries.geonames;
});

// cacRouteViewMod.controller('defCtrl', function($scope) {
// 	$scope.message = "default controller";
// });