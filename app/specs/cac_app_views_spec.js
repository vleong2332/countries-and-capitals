describe('cac_app_views (routing)', function() {
	//
	var $rootScope,
			$state,
			$injector,
			getCountryMock,
			state = 'countries';
	//
	beforeEach(function() {
		//
		module('cacRouteViewMod', function($provide, $urlRouterProvider) {
			$urlRouterProvider.deferIntercept();
			$provide.value('getCountry', getCountryMock = {});
		});
		//
		inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
			$rootScope = _$rootScope_;
			$state     = _$state_;
			$injector  = _$injector_;
			//
			$templateCache.put('countries/countries.html', '');
		})
	});


	it('should respond to URL', function() {
		expect($state.href(state)).toEqual('#/countries');
	});


	it('should resolve getCountry', function() {
		getCountryMock = jasmine.createSpy('getCountry').and.returnValue('nanana');

		$rootScope.$apply(function() {
			$state.go('countries');
		});
		$rootScope.$digest();
		expect($state.current.name).toBe('countries');

		expect($injector.invoke($state.current.resolve.countries)).toBe('nanana');
	});
});