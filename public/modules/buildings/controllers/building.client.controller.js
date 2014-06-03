'use strict';

angular.module('buildings').controller('BuildingController', ['$scope', 'Buildingservice',
	function($scope, Buildingservice) {

		$scope.$watch(function () {
	       return Buildingservice.building;
	    },                       
    	function(newVal) {
	        if(newVal) {
	        	$scope.building = newVal.data;
	        	console.log($scope.building);
	        }
	    }, true);

	}
]);