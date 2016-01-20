angular.module('myApp', [])
	.directive('makeEditable', function(){
		return {
			restrict: 'A',
			transclude: true,
			scope: true,
			templateUrl: './make-editable.html'
		};
	});