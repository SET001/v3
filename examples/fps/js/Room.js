"use strict";
class Room extends V3.StaticMesh{
  setUpRenderComponent(){
    var self = this;

    var floorTexture = V3.TexturesManager.get("floor");
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.x = 1;
    floorTexture.repeat.y = 1;

    var wallTexture = V3.TexturesManager.get("wall");
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.x = wallTexture.repeat.x = 1;

    var floorMaterial = new THREE.MeshLambertMaterial({map: floorTexture,side: THREE.DoubleSide});
    var wallMaterial = new THREE.MeshLambertMaterial({map: wallTexture,side: THREE.DoubleSide})
    var materials = [
      wallMaterial,
      wallMaterial,
      wallMaterial,
      floorMaterial,
      wallMaterial,
      wallMaterial
    ];
    var geometry = new THREE.BoxGeometry(2000, 400, 2000);
    geometry.center();
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -geometry.boundingBox.min.y, 0));

    function setUv( v, index, wr, hr ) {
      for (var i=index*2; i<(index+1)*2; i++) {
        for (var j=0; j<3; j++) {
          v[i][j].x = v[i][j].x * wr;
          v[i][j].y = v[i][j].y * hr;
        }
      }
    }
    var v = geometry.faceVertexUvs[0];
    var w = 5;
    var h = 2;
    setUv(v, 0, w, h);
    setUv(v, 1, w, h);
    setUv(v, 2, w, h);
    setUv(v, 3, 80, 80);
    setUv(v, 4, w, h);
    setUv(v, 5, w, h);

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    this.mesh.name = "Room";
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    return {mesh: this.mesh};
  }
}
