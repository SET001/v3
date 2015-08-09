"use strict";

{
	let _view=null;

	V3.Game = class{
		constructor(){
			this.mode = new V3.GameMode();
		}
		run(){
			// if defined project url then load map
			this.mode.init();
			this.mode.startPlay();
			// load default scene
			// run default scene
		}
		//	find where to place
		loadMap(){}
	};
}
