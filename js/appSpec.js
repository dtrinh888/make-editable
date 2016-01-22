describe('makeEditable', function(){
	var $scope, scope, attribute, compiled, html;

	beforeEach(module('myApp'));

	//inject module created by ng-html2js
	beforeEach(module('./make-editable.html'));

	beforeEach(inject(function($rootScope, $compile){
		//create a new scope
		$scope = $rootScope.$new();
		
		//simulate the pre directive HTML, this is found in the index.html
		//and contains the element with the attribute that triggers the directive
		html = '<div make-editable>' +
	  				'<p>Content that will become editable when the directive rendered.</p>'+
				'</div>';
		//compile the html to the driective, pass in the new $scope				
		element = $compile(html)($scope);

		//kick off the digest loop
		$rootScope.$digest();
	}));
	
	it('should not be editable initally', function(){
		//we can look at the scope of a directive using the .scope() function.
		//not that this directive does not have an isolateScope, but if it did we could
		//look at that using the isolateScope() function.

		//we want to check that the directive is initialized with the scope.isContentEditable
		//being false
		expect(element.scope().isContentEditable).toBe(false);

		//element in this case is the outer div in the make-editable.html template,
		//the one with the ng-transclude. The inner div is the element that has
		//the attribute contenteditable on it, so we need to use the .find() function
		//to grab the inner element and check that the value is false. Not that 
		//false is in quotes, the value of the attribute is a string so if you try
		//to compare it to a boolean false the test will fail.
		expect(element.find('div').attr('contenteditable')).toBe('false');
	});

	it('should be editable if isContentEditable is true', function(){
		//here we want to set the scope.isContentEditable to true, as if someone
		//clicked the button
		element.scope().isContentEditable = true;

		//kick off the digest cycle (similar to using $scope.$digest(), both would
		//accomplish the same thing). This "rebuilds" your directive in a way,
		//basically it triggers and watchers, and you have watchers that check
		//the value of scope.isContentEditable and show/hide carious elements like
		//the buttons as well as add/remove the contenteditable attribute. So by
		//kicking off the watchers, they will see that scope.isContentEditable has
		//been updated and will update the vairous html elements that need to be updated
		$scope.$apply();

		//same things as the test above, just checking the opposite
		expect(element.scope().isContentEditable).toBe(true);
		expect(element.find('div').attr('contenteditable')).toBe('true');
	});

});