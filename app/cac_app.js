var cacApp = angular.module('cacApp', ['cacRouteViewMod', 'ngRoute', 'ngAnimate', 'angular-velocity']);

cacApp.run(function($rootScope, $route, $location, $timeout) {
	$rootScope.$on('$stateChangeStart', function() {
		console.log('loading');
		$rootScope.isloading = true;
	});
	$rootScope.$on('$stateChangeSuccess', function() {
		console.log('success');
		$rootScope.isloading = false;
	});
});