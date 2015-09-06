"use strict";
V3.Pawn = class extends V3.GameObject{
	constructor(){
		super();
		var self = this;
		this.mesh = null;
		this.canTick = false;
		this.components = [V3.PositionComponent, V3.RenderableComponent, V3.CollidableComponent];
	}

	beginPlay(){

	}
	tick(deltaSeconds){
		if(deltaSeconds){}
	}
	init(){}

	onClick(){

	}
};

