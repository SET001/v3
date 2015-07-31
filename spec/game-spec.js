"use strict";
class testPawn extends V3.Pawn{
	constructor(){
		super();
		var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
		var geometry = new THREE.BoxGeometry(2, 2, 2);
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.name = "testPawn";
	}
}
describe('Game', function(){
	describe('adding pawn', function(){
		var pawn, game = null;
		beforeEach(function(){
			game = new V3.Game();
			pawn = new testPawn();
			game.addPawn(pawn);
		});
		it('should add pawn', function(){
			expect(game.pawns.length).toBe(1);
		});
		it('should add pawn mesh to scene', function(){
			expect(pawn.mesh).toBeDefined();
			expect(pawn.mesh.uuid).toBeDefined();
			expect(_.find(game.view.scene.children, {uuid: pawn.mesh.uuid})).toBeDefined();
		});
	})
})
