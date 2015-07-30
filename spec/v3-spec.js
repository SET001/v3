// jshint ignore: start
console.log("jasmine version: ", jasmine.version);


describe('V3 common', function(){
	it('should have revision nubmer', function(){
		expect(V3.revision).toBeDefined();
	});
	it('should have right oop inheritance', function(){
		var a = new V3.Pawn();
	})
});
