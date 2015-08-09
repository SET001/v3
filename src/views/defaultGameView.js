"use strict";
V3.defaultGameView  = class extends V3.View{
	constructor(){
		super();
		var floorSize = 50;
		var geometry = new THREE.PlaneBufferGeometry(floorSize, floorSize);
		var material = new THREE.MeshBasicMaterial( {color: 0xCCCCCC, side: THREE.DoubleSide} );
		var floor = new THREE.Mesh(geometry, material);
		floor.position.set(0, 0, 0);
		floor.rotation.x = THREE.Math.degToRad(90);
		floor.castShadow = true;
		floor.receiveShadow = true;
		floor.name = "Floor";
		this.scene.add(floor);
		this.scene.add(new THREE.AmbientLight(0x555555));
	}
	init(){

	}
};
