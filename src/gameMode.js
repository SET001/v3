"use strict";
V3.GameMode = class{
	constructor(){
		this.state = new V3.StateMachine();
		this.defaultPawn = V3.CubePawn;
		this.systems = [V3.RenderSystem, V3.InputSystem, V3.TickSystem];
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
			V3.ES.Manager.addSystem(system);
			if (system.name === 'Input'){
				system.controllerClass = self.playerController;
			};
		});
		if (this.defaultPawn){
			var pawn = new this.defaultPawn();
			pawn.components.push(V3.InputComponent, V3.CameraComponent);
			pawn.register();
		}
	}
	startPlay(){
		V3.ES.Manager.run();
	}
};
