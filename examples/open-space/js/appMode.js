"use strict";
window.AppMode = class extends V3.ApplicationMode{
	constructor(){
		super();
		this.systems = [V3.RenderSystem, V3.InputSystem, V3.CollisionSystem];
		this.defaultPawn = Player;
  	this.playerController = V3.FPSPlayerController;

	}

 	setUpRenderSystem(system){
 		var initializer = new Promise((resolve, reject) => {
	    var loader = new THREE.ObjectLoader();
	    // var sceneData = JSON.parse(localStorage.getItem('V3.applications'))[1].scenes.scene1;
	    loader.load('scene.json', (scene) => {
		    system.addScene(scene);
		    system.setSize();
		    resolve();
	    });
 		});
    // var defaultCamera = _.find(scene.children, {uuid: 'BBED94A0-5600-459E-84D8-02461CEE21E7'});
    // console.log(defaultCamera);
    // system.camera = defaultCamera;
    return initializer;
 	}

	init(){
		super.init();
	}
}
