"use strict";
V3.PlaneMesh = class extends V3.GameObject{
  constructor(width, length){
    super();
    var geometry = new THREE.PlaneGeometry( width, length, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    this.mesh = new THREE.Mesh( geometry, material );

    this.mesh.position.set(0, 0, 0);
    this.mesh.name = "PlaneMesh";
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }
};
