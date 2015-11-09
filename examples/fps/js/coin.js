"use strict";
class FPSCoin extends V3.GameObject{
	constructor(){
		super([V3.PositionComponent, V3.RenderComponent, V3.CollisionComponent]);
	}

	setUpRenderComponent(component){
		var coinTexture = V3.TexturesManager.get("floor");

		var material = new THREE.MeshLambertMaterial({color: 0xfff200, map: coinTexture});
		var geometry = new THREE.CylinderGeometry( 5, 5, 1, 32 );
		component.object = new THREE.Mesh(geometry, material);
		component.object.rotation.z = THREE.Math.degToRad(90);
		component.object.castShadow = true;
	  component.object.receiveShadow = true;
	}
}
