"use strict";
class RPGCharacter extends V3.Pawn{
  setUpRenderComponent(){
  	var material = new THREE.MeshLambertMaterial({color: 0x00ff00});

  	var bodyG = new THREE.BoxGeometry(1, 4, 1);
  	var headG = new THREE.BoxGeometry(2, 2, 2);

		// var geometry = new THREE.BoxGeometry(2, 2, 2);
		bodyG.center();
  	bodyG.applyMatrix(new THREE.Matrix4().makeTranslation(0, -bodyG.boundingBox.min.y, 0));
  	var head = new THREE.Mesh(headG, material);
  	head.name = "RPGCharacter.head";
  	head.position.set(0, 5, 0);
  	head.castShadow = true;
		head.receiveShadow = true;

		this.mesh = new THREE.Mesh(bodyG, material);
		// this.mesh.position.set(0, 0, 200);
		this.mesh.name = "RPGCharacter";
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		this.mesh.add(head);
    var light = new THREE.SpotLight(0xffffff, 1);
    // var light = new THREE.DirectionalLight(0xffffff, 1);
    light.shadowCameraVisible = true;
    light.shadowCameraNear = 1;
    light.shadowCameraFar = 100;
    // light.target.position.set(0, 6, -10);
    light.castShadow = true;
    var lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 20, -10);
    this.mesh.add(lightTarget);
    light.target = lightTarget;
    light.position.set(0, 20, 30);

    gui.add(light, 'intensity', 0.01, 5);
    gui.add(light, 'shadowBias', -100, 100);
    gui.add(light, 'shadowCameraNear', -100, 100);
    gui.add(light, 'shadowCameraFar', -100, 100);
    // gui.add(light, 'shadowCameraFov', -100, 100);
    // gui.add(light, 'distance', -100, 100);


    var guiLightSource = gui.addFolder('light source');
    guiLightSource.add(light.position, 'x', -100, 100);
    guiLightSource.add(light.position, 'y', -100, 100);
    guiLightSource.add(light.position, 'z', -100, 100);
    guiLightSource.open();

    var guiLightTarget = gui.addFolder('light target');
    guiLightTarget.add(light.target.position, 'x', -100, 100);
    guiLightTarget.add(light.target.position, 'y', -100, 100);
    guiLightTarget.add(light.target.position, 'z', -100, 100);
    guiLightTarget.open();

    this.mesh.add(light);
    // this.mesh.material.map = THREE.ImageUtils.loadTexture('images/bricks.jpg');
    return {mesh: this.mesh};
  }
  setUpCameraComponent(component){
		this.mesh.add(component.object)
		component.object.position.set(0, 10, 50);
	}
}
