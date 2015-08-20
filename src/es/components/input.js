"use strict";
V3.InputComponent = class{
	constructor(){
		this.entity = null;
		this.system = 'input';
		this.movingSpeed = 10;
		this.mouseSpeed = 0.003;
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
