"use strict";
class Room extends V3.StaticMesh{
  setUpRenderComponent(){
    var texture = V3.TexturesManager.get("bricks");
    var material = new THREE.MeshLambertMaterial({
      // map: texture,
      collor: 0xcccccc,
      side: THREE.DoubleSide
    });
    var geometry = new THREE.BoxGeometry(2000, 100, 2000);
    geometry.center();
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -geometry.boundingBox.min.y, 0));
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = "Room";
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    for (var i=0; i<100; i++){
      var width = Math.random()*200+10;
      var length = Math.random()*200+10;
      var fooG = new THREE.BoxGeometry(width, 100, length);
      fooG.center();
      fooG.applyMatrix(new THREE.Matrix4().makeTranslation(0, -fooG.boundingBox.min.y, 0));
      var foo = new THREE.Mesh(fooG, material);
      foo.position.x = Math.random()*2000-1000;
      foo.position.z = Math.random()*2000-1000;
      this.mesh.add(foo);
    };
    return {mesh: this.mesh};
  }
}
