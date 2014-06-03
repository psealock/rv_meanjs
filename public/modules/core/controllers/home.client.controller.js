'use strict';


angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication', 'Buildingservice',
	function($scope, $state, Authentication , Buildingservice) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		var validateSearch = function (search) {
			search.street = search.street.replace(' ', '+');
			return search;
		};

		$scope.search = function () {
			$state.go('building');
			Buildingservice.status.searching = true;
			var search = validateSearch($scope.search),
				params = {
					houseNumber: search.houseNumber,
					street: search.street,
					borough: search.borough
				};

			Buildingservice.getGeoClient(params).then(function (response) {
				Buildingservice.building = response;
				Buildingservice.status.searching = false;
			});
		};
	}
]);