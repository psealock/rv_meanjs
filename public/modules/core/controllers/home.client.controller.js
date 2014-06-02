'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Buildingservice',
	function($scope, Authentication , Buildingservice) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		var validateSearch = function (search) {
			search.street = search.street.replace(' ', '+');
			return search;
		};

		$scope.search = function () {
			var search = validateSearch($scope.search),
				params = {
					houseNumber: search.houseNumber,
					street: search.street,
					borough: search.borough
				};

			Buildingservice.getGeoClient(params).then(function (response) {
				console.log(response);
			});
		};
	}
]);