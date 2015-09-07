"use strict";
V3.RenderSystem = class extends V3.System{
	constructor(){
		super();
		this.componentTypes = ['render', 'camera'];
		this.name = 'render';
		this.camera = null;
		this.renderer = null;
		this.scene = null;

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
		// should maybe add listener to container - not to whole window?
		window.addEventListener("resize", this.setSize.bind(this));
	}

	onComponentNew(component){
		if (this.componentTypes.indexOf(component.type)>-1){
			if (component.type === 'camera'){
				this.camera = component.object;
				this.setSize();
			}else{
				this.scene.add(component.object);
			}
		}
	}

	onComponentRemove(component){}

	controller(entities){
		if (this.camera){
			this.renderer.render(this.scene, this.camera);
		}
	}

	setSize(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		if (this.camera){
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
	}

	update(entity){
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
