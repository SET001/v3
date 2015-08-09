"use strict";
describe('Actor', function(){
	describe('register', function(){
		it('should extend components with set up functions', function(){
			V3.RenderSystem.init();
			var cube = new V3.CubePawn();
			var entity = cube.register();
			expect(entity.components.render).toBeDefined();
			expect(entity.components.render.mesh).not.toBe(null);
		});
	});
});
