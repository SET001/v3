"use strict";
V3.InputComponent = class{
	constructor(){
		this.system = 'input';
		this.movingSpeed = 10;
		this.axisMappings = {
			mouseX:{},
			mouseY:{},
		}
		this.actionMappings = {
			wheelUp:{},
			wheelDown:{}
		}
	}
	register(){
		V3.InputSystem.components.push(this);
	}
};
