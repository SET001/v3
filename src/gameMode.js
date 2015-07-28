"use strict";
V3.GameMode = function(){
	console.log("GameMode constructor");
	this.state = new V3.StateMachine();

	this.pawn = new V3.Pawn();
	this.pawn.beginPlay();
	// only one controls class may be in use at any given time
	this.controls = new V3.Controls();
	// game pausing
	// levels transitions
	// actors spawning
	//
};
V3.GameMode.prototype = {

};
