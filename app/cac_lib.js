var DEBUG = true;

var cacLib = angular.module('cacLib', []);

cacLib.constant('CAC_API_PREFIX', 'http://api.geonames.org/');
cacLib.constant('COUNTRY_PATH', 'countryInfoJSON');
cacLib.constant('CAPITAL_PATH', '');
cacLib.constant('NEIGHBORS_PATH', 'neighboursJSON');
cacLib.constant('CAC_API_USERNAME', 'vleong2332');

cacLib.factory('getCountries', ['$http', '$q', 'CAC_API_PREFIX', 'COUNTRY_PATH', 'CAC_API_USERNAME',
	function($http, $q, CAC_API_PREFIX, COUNTRY_PATH, CAC_API_USERNAME) {
		return function() {
			var defer = $q.defer();
			$http({
				url: CAC_API_PREFIX + COUNTRY_PATH,
				method: 'GET',
				cache: true,
				params: {
					username: CAC_API_USERNAME
				}
			})
				.success(function(data) {
					defer.resolve(data);
					if(DEBUG) console.log(data);
				})
				.error(function(data) {
					console.log('getCountry went wrong');
				});
			return defer.promise;
		}
	}
]);

cacLib.factory('getNeighbors', function($http, $q, CAC_API_PREFIX, NEIGHBORS_PATH, CAC_API_USERNAME) {
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
				//console.log('getNeighbors went wrong');
			});
		return defer.promise;
	}
});

cacLib.factory('getCapital', function($http, $q, CAC_API_PREFIX, CAPITAL_PATH, CAC_API_USERNAME, country) {
	return function(country) {
		var defer = $q.defer();
		$http({
			url: CAC_API_PREFIX + CAPITAL_PATH,
			method: 'GET',
			cache: true,
			params: {
				username: CAC_API_USERNAME
			}
		})
			.success(function() {
				defer.resolve(data);
				console.log(data);
			})
			.error(function() {
				console.log('getCapital went wrong');
			});
		return defer.promise;
	}
});