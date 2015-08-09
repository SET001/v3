"use strict";
describe('Game', function(){
	var game = null;

	beforeEach(function(){
		game = new V3.Game();
		spyOn(game.mode, 'startPlay').and.callThrough();
		game.run();
	});

	it('should run default game-mode', function(){
		// expect(game.mode.startPlay).toHaveBeenCalled();
	});

	describe('adding pawn', function(){
		// var pawn, game = null;
		// beforeEach(function(){
		// 	game = new V3.Game();
		// 	pawn = new testPawn();
		// 	game.addPawn(pawn);
		// });
		// it('should add pawn', function(){
		// 	expect(game.pawns.length).toBe(1);
		// });
		// it('should add pawn mesh to scene', function(){
		// 	expect(pawn.mesh).toBeDefined();
		// 	expect(pawn.mesh.uuid).toBeDefined();
		// 	expect(_.find(game.view.scene.children, {uuid: pawn.mesh.uuid})).toBeDefined();
		// });
	})
})
