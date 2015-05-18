var cacLib = angular.module('cacLib', []);

cacLib.constant('CAC_API_PREFIX', 'http://api.geonames.org/countryInfo?username=vleong2332');

cacLib.factory('getCountries', function($http, $q, CAC_API_PREFIX) {
		return function() {
			var defer = $q.defer();
			$http.get(CAC_API_PREFIX)
				.success(function(data) {
					defer.resolve(data);
				})
				.error(function(data) {
					console.log('GetCountry went wrong');
				});
			return defer.promise;
		}
	}
);