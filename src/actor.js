"use strict";
V3.Actor = class{
	constructor(){
		this.mesh = null;
		this.canTick = false;
		this.components = [];
		this.inputComponent = null;
	}
	beginPlay(){

	}
	tick(deltaSeconds){
		if(deltaSeconds){}
	}
	init(){}

	// position - Vector3
	setPosition(position){
		if (this.mesh){
			this.mesh.setPosition(position);
		}
	}
};
