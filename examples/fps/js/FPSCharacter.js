"use strict";
class FPSCharacter extends V3.PlayerCharacter{

  setUpRenderComponent(component){
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});

    var bodyG = new THREE.BoxGeometry(5, 20, 5);

    bodyG.center();
    bodyG.applyMatrix(new THREE.Matrix4().makeTranslation(0, -bodyG.boundingBox.min.y, 0));
    this.mesh = new THREE.Mesh(bodyG, material);
    this.mesh.name = "FPSCharacter";
    // this.mesh.castShadow = true;

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
    component.object = this.mesh;
  }

  setUpCameraComponent(component){
    this.mesh.add(component.object);
    component.object.position.set(0, 30, 0);
  }

  setUpInputComponent(component){
    component.movingSpeed = 3;
    component.controllerClass = V3.FPSPlayerController;
  }

  setUpPositionComponent(component){
    component.x = 0;
    component.y = 300;
    component.z = 0;
  };
}
