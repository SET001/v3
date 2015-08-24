"use strict";
class FPSGameMode extends V3.GameMode{
	constructor(){
		super();
		this.defaultPawn = FPSCharacter;
		this.playerController = V3.FPSPlayerController;
	}
	init(){
		super.init();
		(new GlobalLight()).register();
		// (new Floor()).register();
		(new Room()).register();
	}
}
