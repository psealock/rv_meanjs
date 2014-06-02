'use strict';

angular.module('core').service('Buildingservice', ['$http',
	function($http) {

		var BS = this;

		this.building = {};

		this.getGeoClient = function(params) {
			return $http.get('/building', {
				params: params
			}).then(function (response) {
				return response;
			});
		}
	}
]);