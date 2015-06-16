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

cacLib.factory('getGeoname', ["$http", "$q", "CAC_API_PREFIX", "GEONAME_PATH", "CAC_API_USERNAME",
function($http, $q, CAC_API_PREFIX, GEONAME_PATH, CAC_API_USERNAME) {
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
				console.log(data);
				defer.resolve(data);
			})
			.error(function() {
				console.log('getGeoname went wrong');
			});
		return defer.promise;
	}
}]);

cacLib.factory('getNeighbors', ["$http", "$q", "CAC_API_PREFIX", "NEIGHBORS_PATH", "CAC_API_USERNAME",
function($http, $q, CAC_API_PREFIX, NEIGHBORS_PATH, CAC_API_USERNAME) {
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

cacLib.factory('getCapital', ["$http", "$q", "CAC_API_PREFIX", "SEARCH_PATH", "CAC_API_USERNAME",
function($http, $q, CAC_API_PREFIX, SEARCH_PATH, CAC_API_USERNAME) {
	return function(capitalName, countryCode) {
		var defer = $q.defer();
		$http({
			url: CAC_API_PREFIX + SEARCH_PATH,
			method: 'GET',
			cache: true,
			params: {
				q: capitalName,
				name_equals: capitalName,
				country: countryCode,
				isNameRequired: true,
				featureCode: 'PPLC',
				username: CAC_API_USERNAME
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