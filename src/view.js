"use strict";
V3.View = function(){
	this.scene = null;
	this.renderer = new THREE.WebGLRenderer({antialias: this.config.renderer.antialias});
	this.renderer.autoClear = false;
	this.renderer.shadowMapEnabled = this.config.renderer.shadowMapEnabled;
	this.renderer.shadowMapType = this.config.renderer.shadowMapType;
	this.renderer.shadowMapHeight = this.config.renderer.shadowMapHeight;
	this.renderer.shadowMapWidth = this.config.renderer.shadowMapWidth;
	this.setCamera();
	this.setSize();
	this.container.appendChild(this.renderer.domElement);
};
V3.View.prototype = {
	run: function(){

	},
	render: function(){
		this.renderer.render(this.scene, this.camera);
		this.renderer.render(this.sceneHelpers, this.camera);
	},
	animate: function(){

	}
};
