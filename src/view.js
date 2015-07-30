"use strict";
V3.View = class{
	constructor(game){
		this.game = game;
		this.renderer = new THREE.WebGLRenderer({antialias: V3.config.renderer.antialias});
		this.renderer.autoClear = false;
		this.renderer.shadowMapEnabled = V3.config.renderer.shadowMapEnabled;
		this.renderer.shadowMapType = V3.config.renderer.shadowMapType;
		this.renderer.shadowMapHeight = V3.config.renderer.shadowMapHeight;
		this.renderer.shadowMapWidth = V3.config.renderer.shadowMapWidth;

		this.container = V3.config.container ? V3.config.container : document.body;

		this.scene = null;
		this.setSize();
		this.container.appendChild(this.renderer.domElement);
	}
	setSize(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		if (this.camera){
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
	}
	show(){
		if (!this.scene){
			this.scene = THREE.Scene();
		}
		this.animate();
	}
	render(){
		this.renderer.render(this.scene, this.camera);
		this.renderer.render(this.sceneHelpers, this.camera);
	}
	animate(){
		for (let actor in this.game.actors){
			if (actor.canTick){
				actor.tick();
			}
		}
		this.render();
		window.requestAnimationFrame(this.animate.bind, this);
	}
};
