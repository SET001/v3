"use strict";
V3.Game = function(){
	this.gameMode = new V3.GameMode();
	this.view = new V3.View();

};
V3.Game.prototype = {
	run: function(){
		this.view.run();
		// this.veiw.render
		// load application info
		// load default scene
		// run default scene
	},
	setGameMode: function(gameMode){
		// only one gameMode may be in use at any given time
		this.gameMode = gameMode;
	},
	//	find where to place
	loadMap: function(){}
};
