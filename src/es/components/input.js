"use strict";
V3.InputComponent = class extends V3.Component{
	constructor(){
		super();
		this.type = 'input';
		this.movingSpeed = 1;
		this.runingSpeed = 3;
		this.mouseSpeed = 0.003;
		this.wheelSpeed = 0.7;
		this.keyMappings = {
			W: 'moveForward',
			S: 'moveBackward',
			A: 'moveLeft',
			D: 'moveRight',
			Space: 'jump',
			Click: 'shoot',
		}
	}
};
