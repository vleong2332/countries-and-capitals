var cacLib = angular.module('cacLib', []);

cacLib.constant('CAC_API_PREFIX', 'http://api.geonames.org/countryInfoJSON');
cacLib.constant('CAC_API_USERNAME', 'vleong2332');

cacLib.factory('getCountries', ['$http', '$q', 'CAC_API_PREFIX', 'CAC_API_USERNAME', function($http, $q, CAC_API_PREFIX, CAC_API_USERNAME) {
		return function() {
			var defer = $q.defer();
			$http({
				url: CAC_API_PREFIX,
				method: 'GET',
				cache: true,
				params: {
					username: CAC_API_USERNAME
				}
			})
				.success(function(data) {
					defer.resolve(data);
				})
				.error(function(data) {
					console.log('GetCountry went wrong');
				});
			return defer.promise;
		}
	}
]);