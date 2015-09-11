"use strict";
V3.GameMode = class{
	constructor(){
		this.state = new V3.StateMachine();
		this.systems = [V3.RenderSystem, V3.CollisionSystem, V3.InputSystem, V3.PhysicSystem];
		// this.mainPawn.beginPlay();	// this should be triggered somewhere else, not in constructor
		// only one controls class may be in use at any given time
		// this.controls = new V3.Controls();
	}
	// game pausing
	// levels transitions
	// actors spawning
	//

	init(){
		var self = this;
		this.systems.map(function(system){
			V3.ESManager.addSystem(system);
		});
		if (this.defaultPawn){
			var pawn = new this.defaultPawn();
		}
	}
	startPlay(){
		V3.ESManager.run();
	}
};
