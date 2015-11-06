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
				V3.ESManager.initializers.push(this[setUpFunction](system));
			}
		}
		Promise.all(V3.ESManager.initializers).then( () => {
			console.log("all initializers ready");
			if (this.defaultPawn){
				var pawn = new this.defaultPawn();
			}
		});
	}
	startPlay(){
		V3.ESManager.run();
	}
};
