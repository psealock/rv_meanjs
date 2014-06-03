'use strict';

angular.module('buildings').controller('BuildingController', ['$scope', '$state', 'Buildingservice',
	function($scope, $state, Buildingservice) {

		$scope.status = {};
		$scope.status.searching = Buildingservice.status.searching;

		$scope.$watch(function () {
	       return Buildingservice.building;
	    },                       
    	function(newVal) {
	        if(newVal) {
	        	$scope.building = newVal.data;
	        	$scope.status.searching = Buildingservice.status.searching;
	        	console.log($scope.building);
	        }
	    }, true);

		//if building does not exist and the app is not searching, go back to homepage
	    if(!Object.keys(Buildingservice.building).length && !$scope.status.searching) {
		    $state.go('home');
	    }

	}
]);