describe('cacLib', function () {

	var originalTimeout;
	var apiUrl = "http://api.geonames.org/";
	var apiAuth = "username=vleong2332";

	beforeEach(function() {
		//
		module('cacLib');
		//
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 7000;
	});

	afterEach(function() {
		//
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	describe('getCountry', function() {
		it('should call the right API for getting a list of countries', function(done) {
			//
			inject(function($httpBackend, $rootScope, getCountry) {
				//
				var response = 'a list of countries';
				$httpBackend.expectGET(apiUrl + 'countryInfoJSON?' + apiAuth)
					.respond(response);
				//
				getCountry().then(function(data) {
					expect(data).toBe('a list of countries');
					done();
				});
				//
				$httpBackend.flush();
			});
		});

		it('should call the right API for getting detail on specific country', function(done) {
			//
			inject(function($httpBackend, $rootScope, getCountry) {
				//
				var response = 'details of a country';
				$httpBackend.expectGET(apiUrl + 'countryInfoJSON?country=1&' + apiAuth)
					.respond(response);
				//
				getCountry(1).then(function(data) {
					expect(data).toBe('details of a country');
					done();
				});
				//
				$httpBackend.flush();
			});
		});
	});

	describe('getGeoname', function() {
		it('should call the right API for getting geoname info about a country', function(done) {
			//
			inject(function($httpBackend, $rootScope, getGeoname) {
				//
				var response = 'name of a country';
				$httpBackend.expectGET(apiUrl + 'getJSON?geonameId=1&' + apiAuth)
					.respond(response);
				//
				getGeoname(1).then(function(data) {
					expect(data).toBe('name of a country');
					done();
				});
				//
				$httpBackend.flush();
			});
		});
	});

	describe('getNeighbors', function() {
		it('should call the right API for getting a list of neighboring countries', function(done) {
			//
			inject(function($httpBackend, $rootScope, getNeighbors) {
				//
				var response = 'neighboring countries';
				$httpBackend.expectGET(apiUrl + 'neighboursJSON?geonameId=1&' + apiAuth)
					.respond(response);
				//
				getNeighbors(1).then(function(data) {
					expect(data).toBe('neighboring countries');
					done();
				});
				//
				$httpBackend.flush();
			});
		});
	});

	describe('getCapital', function() {
		it('should call the right API for getting details about a place', function(done) {
			//
			inject(function($httpBackend, $rootScope, getCapital) {
				//
				var response = 'details about a place';
				$httpBackend.expectGET(apiUrl + 'searchJSON?country=AB&featureCode=PPLC&isNameRequired=true&name_equals=place&q=place&' + apiAuth)
					.respond(response);
				//
				getCapital('place', 'AB').then(function(data) {
					expect(data).toBe('details about a place');
					done();
				});
				//
				$httpBackend.flush();
			});
		});
	});

});