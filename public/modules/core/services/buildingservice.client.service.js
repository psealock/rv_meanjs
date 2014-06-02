'use strict';

angular.module('core').factory('Buildingservice', ['$http',
	function($http) {

		var building = {};
		
		return {
			getGeoClient: function(params) {
				return $http.get('/building', {
					params: params
				}).then(function (response) {
					building = response;
					return response;
				});
			}
		};
	}
]);