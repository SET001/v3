"use strict";
class FPSBot extends V3.GameObject{
  constructor(){
    super([V3.PositionComponent, V3.RenderComponent, V3.CollisionComponent]);
  }

  init(){
    this.faceTexture = THREE.ImageUtils.loadTexture('../_images/bot2.png');
    this.bodyColor = 0xB4D333;
  }

  setUpRenderComponent(component){
    var material = new THREE.MeshLambertMaterial({color: this.bodyColor});

    var bodyG = new THREE.BoxGeometry(5, 30, 5);
    var headG = new THREE.BoxGeometry(10, 10, 10);


    var faceMaterial = new THREE.MeshLambertMaterial({map: this.faceTexture});
    var headMaterials = [
      material,
      material,
      material,
      material,
      material,
      faceMaterial,
    ];

    bodyG.center();
    bodyG.applyMatrix(new THREE.Matrix4().makeTranslation(0, -bodyG.boundingBox.min.y, 0));
    var head = new THREE.Mesh(headG, new THREE.MeshFaceMaterial(headMaterials));
    head.name = "FPSBot.head";
    head.position.set(0, 30, 0);

    this.mesh = new THREE.Mesh(bodyG, material);
    // this.mesh.position.set(0, 40, 0);
    this.mesh.name = "FPSBot";
    // this.mesh.castShadow = true;

    var handG = new THREE.BoxGeometry(5, 5, 5);
    var leftHand = new THREE.Mesh(handG, material);
    leftHand.position.set(-5, 20, 0);
    var rightHand = new THREE.Mesh(handG, material);
    rightHand.position.set(5, 20, 0);
    this.mesh.add(rightHand);
    this.mesh.add(leftHand);
    this.mesh.add(head);
    this.mesh.rotation.y = THREE.Math.degToRad(Math.ceil(Math.random()*180));
    component.object = this.mesh;
  }
}
