"use strict";
window.AppMode = class extends V3.ApplicationMode{
	constructor(){
		super();
		this.systems = [V3.RenderSystem, V3.InputSystem];
		this.defaultPawn = Player;
  	this.playerController = V3.FPSPlayerController;

	}

 	setUpRenderSystem(system){
    console.log("Asd", system);
    var loader = new THREE.ObjectLoader();
    var sceneData = JSON.parse(localStorage.getItem('V3.applications'))[1].scenes.scene1;
    var scene = loader.parse(sceneData);
    // var defaultCamera = _.find(scene.children, {uuid: 'BBED94A0-5600-459E-84D8-02461CEE21E7'});
    // console.log(defaultCamera);
    // system.camera = defaultCamera;
    system.addScene(scene);
    system.setSize();
 	}

	init(){
		super.init();
		// (new GlobalLight()).register();
		// (new Floor()).register();
		// (new Room()).register();
	}
}
