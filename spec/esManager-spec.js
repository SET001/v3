"use strict";
var testErrorSystem = {
	name: 'testError',
	init: function(){return false;}
}
describe('ES Manager', function(){
	var game = null;

	beforeEach(function(){

	});

	it('should init system when adding it', function(){
		spyOn(V3.RenderSystem, 'init').and.callThrough();
		V3.ES.Manager.addSystem(V3.RenderSystem);
		expect(V3.RenderSystem.init).toHaveBeenCalled();
	});
	it('should throw an error when unable to init system', function(){
		expect(function(){
			V3.ES.Manager.addSystem(testErrorSystem);
		}).toThrow();
	});
});
