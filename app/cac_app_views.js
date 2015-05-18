var cacRouteViewMod = angular.module('cacRouteViewMod', ['ngRoute', 'cacLib']);

cacRouteViewMod.config(['$routeProvider', 'cacLib', function($routeProvider, cacLib) {
	$routeProvider

		.when('/', {
			templateUrl: 'home/home.html',
			controller: 'homeCtrl'
		})

		.when('/countries', {
			templateUrl: 'countries/countries.html',
			controller: 'defCtrl',
			resolve : {
				countries: ['cacLib', function(cacLib) {
					return getCountries();
				}]
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


cacRouteViewMod.controller('defCtrl', function($scope) {
	$scope.message = "default controller";
});