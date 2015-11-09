"use strict";
class Floor extends V3.StaticMesh{
	setUpRenderComponent(){
		var texture = V3.TexturesManager.get("floor");
		var material = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
	  var geometry = new THREE.PlaneGeometry(200, 200, 200);
	  this.mesh = new THREE.Mesh(geometry, material);
	  this.mesh.rotation.x = THREE.Math.degToRad(90);
	  this.mesh.position.y = 0.1;
	  this.mesh.name = "Floor";
	  this.mesh.castShadow = true;
	  this.mesh.receiveShadow = true;
	  return {mesh: this.mesh};
	}
}
