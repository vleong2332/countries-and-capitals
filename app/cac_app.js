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