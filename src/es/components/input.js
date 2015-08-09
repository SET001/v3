"use strict";
V3.InputComponent = class{
	constructor(actor){
		this.system = 'input';
		this.movingSpeed = 10;
	}
	register(){
		V3.InputSystem.components.push(this);
	}
};
