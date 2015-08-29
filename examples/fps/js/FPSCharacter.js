"use strict";
class FPSCharacter extends V3.Pawn{
  setUpRenderComponent(){
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});

    var bodyG = new THREE.BoxGeometry(1, 4, 1);
    var headG = new THREE.BoxGeometry(2, 2, 2);

    bodyG.center();
    bodyG.applyMatrix(new THREE.Matrix4().makeTranslation(0, -bodyG.boundingBox.min.y, 0));
    var head = new THREE.Mesh(headG, material);
    head.name = "FPSCharacter.head";
    head.position.set(0, 5, 0);

    this.mesh = new THREE.Mesh(bodyG, material);
    // this.mesh.position.set(0, 40, 0);
    this.mesh.name = "FPSCharacter";
    // this.mesh.castShadow = true;
    this.mesh.add(head);

    var light = new THREE.DirectionalLight(0xffffff, 0.4);
    // light.shadowCameraVisible = true;
    light.shadowCameraNear = 1;
    light.shadowBias = -1;
    light.shadowCameraFar = 100;
    // light.target.position.set(0, 6, -10);
    light.castShadow = true;
    var lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 5, -10);
    this.mesh.add(lightTarget);
    light.target = lightTarget;
    light.position.set(0, 40, 30);
    this.mesh.add(light);
    return {mesh: this.mesh};
  }

  setUpCameraComponent(component){
    this.mesh.add(component.object);
    component.object.position.set(0, 30, 0);
  }

  setUpInputComponent(component){
    component.movingSpeed = 3;
  }
}
