"use strict";
describe('Pawn', function(){
	var game = null;

	beforeEach(function(){
		V3.RenderSystem.init();
	});

	it('should register in systems', function(){
		var cube = new V3.CubePawn();
		cube.register();
	});
});
