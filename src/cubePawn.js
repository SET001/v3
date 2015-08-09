"use strict";
V3.CubePawn = class extends V3.Pawn{
	constructor(){
		super();
		this.canTick = true;
		this.movingSpeed = 0.2;

		var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
		var geometry = new THREE.BoxGeometry(2, 2, 2);
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.position.set(0, 1, 0);
		this.mesh.name = "cubePawn";
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
	}
	setUpTickComponent(){
		this.mesh.rotation.x += THREE.Math.degToRad(0.5);
		this.mesh.rotation.y += THREE.Math.degToRad(0.5);
		this.mesh.rotation.z += THREE.Math.degToRad(0.5);
	}
	setUpRenderComponent(){
		return {mesh: this.mesh};
	}
	setUpInputComponent(){
		// var inputComponent = new V3.InputComponent(this);
		// inputComponent.mapping = {
		// 	97: 'stepLeft',
		// 	100: 'stepRight',
		// 	119: 'moveForward',
		// 	115: 'moveBackward'
		// };
		// inputComponent.register();
		return {movingSpeed: this.movingSpeed};
	}

	stepLeft(){this.position.x -= this.movingSpeed;}
	stepRight(){this.position.x += this.movingSpeed;}
	moveForward(){this.position.z -= this.movingSpeed;}
	moveBackward(){this.position.z += this.movingSpeed;}
	yaw(a){
		this.mesh.rotation.x += THREE.Math.degToRad(0.5);
	}
	pitch(a){
		this.mesh.rotation.y += THREE.Math.degToRad(0.5);
	}
};
