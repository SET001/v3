"use strict";
class Room extends V3.StaticMesh{
	setUpRenderComponent(){
		var texture = V3.TexturesManager.get("bricks");
		var material = new THREE.MeshLambertMaterial({
      map: texture,
      // collor: 0xcccccc,
      side: THREE.DoubleSide
    });
    var geometry = new THREE.BoxGeometry(200, 200, 200);
    geometry.center();
  	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -geometry.boundingBox.min.y, 0));
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = "Room";
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    return {mesh: this.mesh};
  }
}
