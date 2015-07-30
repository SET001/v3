"use strict";
V3.Game = class{
	constructor(){
		this.gameMode = new V3.GameMode();
		this.view = new V3.View(this);
		this.actors = [];
	}
	addActor(actor){
		this.actors.push(actor);
	}
	run(){
		// if defined project url then load map
		this.view.show();
		// this.veiw.render
		// load application info
		// load default scene
		// run default scene
	}
	//	find where to place
	loadMap(){}
};
