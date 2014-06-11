'use strict';

/**
 * @ngdoc function
 * @name editDistanceProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the editDistanceProjectApp
 */
angular.module('editDistanceProjectApp')
  .controller('MainCtrl', function ($scope) {

	// Variables

	$scope.stringA = ""; // String array for record A
	$scope.stringB = ""; // String array for record B
	$scope.threshold = 7;
	$scope.idWeight = 1;
	$scope.sWeigth = 1;
	$scope.memo = null;
	$scope.aboveThreshold = false;

	// basically the only function that matters
    $scope.computeLevenshteinDistance = function(stringA, stringB, insertionDeletionWeight, substitutionWeight){

	// Set the default weights to 1
	if(angular.isUndefined(insertionDeletionWeight)) {insertionDeletionWeight = 1;}
	if(angular.isUndefined(substitutionWeight)) {substitutionWeight = 1;}

	$scope.memo = new Array(stringA.length+1); // The memoization matrix
	// Instantiate matrix
	for (var x = 0; x < stringA.length+1; x++){
		$scope.memo[x] = new Array(stringB.length+1);
	}
	// Initialize matrix
	for (var jMemo = 0; jMemo<stringA.length+1; jMemo++){
		$scope.memo[jMemo][0] = jMemo;
	}
	for (var iMemo = 0; iMemo<stringB.length+1; iMemo++){
		$scope.memo[0][iMemo] = iMemo;
	}

	// Base cases
	if(stringA === stringB){ // Strings are already equal
		return 0;
	}
	else if(stringA.length === 0){ // stringA is empty
		return stringB.length;
	}
	else if(stringB.length === 0){ // stringA is empty
		return stringA.length;
	}
	else{
		for(var i = 0; i < stringA.length; i++){
			for(var j = 0; j < stringB.length; j++){
				if(stringA.charAt(i)===stringB.charAt(j)){
					$scope.memo[i+1][j+1] = $scope.memo[i][j];
				}
				else{
					$scope.memo[i+1][j+1] = Math.min($scope.memo[i][j+1]+insertionDeletionWeight,$scope.memo[i+1][j]+insertionDeletionWeight,$scope.memo[i][j]+substitutionWeight);
				}
			}
		}
	}


	$scope.getLevenshtein = ($scope.memo !== null) ? ($scope.memo[$scope.stringA.length][$scope.stringB.length]) : false;
	$scope.aboveThreshold = $scope.getLevenshtein > $scope.threshold ? true : false;
	console.log("Levenshtein Distance Computed");

	for(var print = 0; print < $scope.stringB.length; print++){
		console.log($scope.memo[print]);
	}

    };
  });
