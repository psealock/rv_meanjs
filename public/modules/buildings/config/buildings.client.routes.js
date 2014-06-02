'use strict';

//Setting up route
angular.module('buildings').config(['$stateProvider',
	function($stateProvider) {
		// Buildings state routing
		$stateProvider.
		state('building', {
			url: '/bldg',
			templateUrl: 'modules/buildings/views/building.client.view.html'
		});
	}
]);