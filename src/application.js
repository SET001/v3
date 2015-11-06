"use strict";

V3.Application = class{

	constructor(settings){
		this.defaultMode = 'DefaultApplicationMode';
		this.defaultScene = 'scene1';
		this.scenes = {};
		this.scenes[this.defaultScene] = {};
		this.modes = []
		_.assign(this, settings);

		this.initialized = false;
	}

	init(){
		this.mode = new window[this.defaultMode]();
		// this.scene = this.scenes[this.defaultScene];

		V3.ESManager.init();
		this.mode.init();


		this.initialized = true;
		return this;
	}

	run(){
		if (!this.initialized) this.init();
		// if defined project url then load map
		this.mode.startPlay();
		// load default scene
		// run default scene
	}
	//	find where to place

	loadMap(){}
};
