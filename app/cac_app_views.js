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
			templateUrl: 'countries/country.html',
			controller: 'defCtrl',
			resolve: {
				try: function() {console.log('resolving');}
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
		var x = '#/countries/' + country + '/capital';
		console.log('redirecting to', x);
		$location.path(x);
	};
});

 cacRouteViewMod.controller('defCtrl', function($scope) {
 	$scope.message = "default controller";
 	console.log('controller is called');
 });