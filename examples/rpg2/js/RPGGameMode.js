"use strict";
class RPGGameMode extends V3.GameMode{
	constructor(){
		super();
		this.defaultPawn = RPGCharacter;
  	this.playerController = V3.RPGPlayerController;
	}
	init(){
		super.init();
		(new GlobalLight()).register();
		(new Floor()).register();
		(new Room()).register();
	}
}
