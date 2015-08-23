"use strict";
V3.InputComponent = class{
	constructor(){
		this.entity = null;
		this.system = 'input';
		this.movingSpeed = 1;
		this.mouseSpeed = 0.003;
		this.wheelSpeed = 0.7;
		this.keyMappings = {
			W: 'moveForward',
			S: 'moveBackward',
			A: 'moveLeft',
			D: 'moveRight',
			Space: 'jump'
		}
	}
	register(){
		V3.InputSystem.components.push(this);
	}
};
