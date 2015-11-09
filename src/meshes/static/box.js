"use strict";
V3.BoxMesh = class extends V3.GameObject{
  constructor(width, height, length){
    super();
    var geometry = new THREE.BoxGeometry( width, height, length );
    var material = new THREE.MeshLambertMaterial( {side: THREE.DoubleSide} );
    this.mesh = new THREE.Mesh( geometry, material );

    this.mesh.position.set(0, 0, 0);
    this.mesh.name = "BoxMesh";
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }
};
