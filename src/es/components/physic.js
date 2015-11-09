"use strict";
V3.PhysicComponent = class extends V3.Component{
	constructor(){
		var g = 0.05;
		super();
		this.type = 'physic';
		this.forces = [
			new THREE.Vector3(0, -g, 0),
		];
	}
}
