describe('cac_app_views', function() {

	beforeEach(function() {
		var $rootScope, $state, $injector;
	});

	describe('Routing to "home" stage', function() {
		var state = 'home';
		beforeEach(function() {
			module('cacRouteViewMod');
			inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
				$rootScope = _$rootScope_;
				$state     = _$state_;
				$injector  = _$injector_;
				$templateCache.put('home/home.html', '');
			})
		});

		it('should respond to URL', function() {
			expect($state.href(state)).toEqual('#/');
		});
	});
	
	describe('Routing to "countries" stage', function() {

		var state = 'countries',
				getCountryMock;

		beforeEach(function() {

			module('cacRouteViewMod', function($provide, $urlRouterProvider) {
				$urlRouterProvider.deferIntercept();
				$provide.value('getCountry', getCountryMock = function() {return 'nanana';});
			});

			inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
				$rootScope = _$rootScope_;
				$state     = _$state_;
				$injector  = _$injector_;
				$templateCache.put('countries/countries.html', '');
			})
		});

		it('should respond to URL', function() {
			expect($state.href(state)).toEqual('#/countries');
		});

		it('should resolve getCountry', function() {
			//getCountryMock = jasmine.createSpy('getCountry').and.returnValue('getCountry');

			$rootScope.$on('$stateChangeError', 
			function(event, toState, toParams, fromState, fromParams, error){
				console.log(error);
			});

			$state.go(state);
			$rootScope.$digest();
			expect($state.current.name).toBe('countries');

			expect($injector.invoke($state.current.resolve.countries)).toBe('nanana');
		});
	});

	describe('Routing to "country" stage', function() {

		var state = 'country',
				getGeonameMock,
				getCountryMock,
				getCapitalMock,
				getNeighborsMock;

		beforeEach(function() {

			module('cacRouteViewMod', function($provide, $urlRouterProvider) {
				$urlRouterProvider.deferIntercept();
				$provide.value('getGeoname', function() {return 'geoname';});
				$provide.value('getCountry', function() {return 'country';});
				$provide.value('getCapital', function() {return 'capital';});
				$provide.value('getNeighbors', function() {return 'neighbors';});
			});

			inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
				$rootScope = _$rootScope_;
				$state     = _$state_;
				$injector  = _$injector_;
				$templateCache.put('countries/country.html', '');
			})
		});

		it('should respond to URL', function() {
			expect($state.href(state, {country: '9999'})).toEqual('#/countries/9999/capital');
		});

		it('should resolve all requests', function() {
			//getCountryMock = jasmine.createSpy('getCountry').and.returnValue('getCountry');

			$rootScope.$on('$stateChangeError', 
			function(event, toState, toParams, fromState, fromParams, error){
				console.log(error);
			});

			$state.go(state);
			$rootScope.$digest();
			expect($state.current.name).toBe('country');

			expect($injector.invoke($state.current.resolve.geoname)).toBe('geoname');
			expect($injector.invoke($state.current.resolve.country)).toBe('country');
			expect($injector.invoke($state.current.resolve.capital)).toBe('capital');
			expect($injector.invoke($state.current.resolve.neighbors)).toBe('neighbors');
		});
	});

});