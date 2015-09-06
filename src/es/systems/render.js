"use strict";
V3.RenderSystem = {

	componentTypes: ['render'],
	camera: null,
	renderer: null,
	scene: null,
	controller: function(entities){
		if (this.camera){
			this.renderer.render(this.scene, this.camera);
		}
	},
	init: function(){
		console.log("Initialising render system");
		var self = this;
		this.scene = new THREE.Scene();
		this.container = V3.config.container ? V3.config.container : document.body;

		this.renderer = new THREE.WebGLRenderer({antialias: V3.config.renderer.antialias});
		this.renderer.autoClear = false;
		this.renderer.shadowMapEnabled = V3.config.renderer.shadowMapEnabled;
		this.renderer.shadowMapType = V3.config.renderer.shadowMapType;
		this.renderer.shadowMapHeight = V3.config.renderer.shadowMapHeight;
		this.renderer.shadowMapWidth = V3.config.renderer.shadowMapWidth;
		this.container.appendChild(this.renderer.domElement);
		if (V3.config.showAxis){
			this.scene.add(new THREE.AxisHelper(V3.config.axisLength));
		}

		document.addEventListener("entity_new", this.onNewEntity.bind(this));
		window.addEventListener("resize", this.setSize.bind(this));
		return true;
	},
	onNewEntity: function(e){
		if ('camera' in e.detail.components){
			this.camera = e.detail.components.camera.object;
	    this.setSize();
		}
	},

	setSize: function(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		if (this.camera){
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
	},
	update: function(entity){
		var obj = null;
		for (var i in this.scene.children){
			if(this.scene.children[i].uid === entity.id){
				obj = this.scene.children[i];
				break;
			}
		}
		if (obj){
			obj.position.set(entity.components.position.x, entity.components.position.y, entity.components.position.z);
		}
	}
};
