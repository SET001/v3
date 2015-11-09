"use strict";
V3.PositionComponent = class extends THREE.Vector3{
	constructor(){
		super();
		this.type = 'position';
		this.id = V3._componentIndex++;
	}
}
