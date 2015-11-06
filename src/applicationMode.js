"use strict";
V3.ApplicationMode = class{
	constructor(){
		this.state = new V3.StateMachine();
		this.systems = [];
		// this.mainPawn.beginPlay();	// this should be triggered somewhere else, not in constructor
		// only one controls class may be in use at any given time
		// this.controls = new V3.Controls();
	}
	// game pausing
	// levels transitions
	// actors spawning
	//

	init(){
		for (let i in this.systems){
			var systemClass = this.systems[i];
			var system = V3.ESManager.addSystem(systemClass);
			var systemName = system.name.charAt(0).toUpperCase() + system.name.slice(1) + 'System';

			var setUpFunction = `setUp${systemName}`;
			if (this[setUpFunction]){
				this[setUpFunction](system);
			}
		}

		setTimeout( () => {
			if (this.defaultPawn){
				var pawn = new this.defaultPawn();
			}
		}, 1000);
	}
	startPlay(){
		V3.ESManager.run();
	}
};
