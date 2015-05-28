describe('cac_app_views (routing)', function() {

	var $rootScope,
			$state,
			$injector,
			getCountryMock,
			state = 'countries';

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

	// Test 1
	it('should respond to URL', function() {
		expect($state.href(state)).toEqual('#/countries');
	});

	// Test 2
	it('should resolve getCountry', function() {
		//getCountryMock = jasmine.createSpy('getCountry').and.returnValue('getCountry');

		$rootScope.$on('$stateChangeError', 
		function(event, toState, toParams, fromState, fromParams, error){
			console.log(error);
		});

		$state.go(state);
		$rootScope.$digest();
		expect($state.current.name).toBe('countries');

		console.log($state.current.resolve.countries);
		expect($injector.invoke($state.current.resolve.countries)).toBe('nanana');
	});
});