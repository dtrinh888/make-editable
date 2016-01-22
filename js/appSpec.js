describe('makeEditable', function(){
	var scope, attribute, compiled, html;

	beforeEach(module('myApp'));
	beforeEach(module('make-editable.html'));
	beforeEach(inject(function($rootScope, $compile){
		/*scope = $rootScope.new();
		attribute = 'make-editable';
		*/
		html = '<div make-editable>' +
	  				'<p>Content that will become editable when the directive rendered.</p>'+
				'</div>';
		compiled = $compile(html);
		$rootScope.$digest();
	}));
	it('should not be editable initally', function(){
		expect(compiled.attr('contenteditable')).toBe(false);
	});
});