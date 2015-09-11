"use strict";
V3.RenderSystem = class extends V3.System{
	constructor(){
		super();
		this.componentTypes = ['render', 'camera'];
		this.objects = [];
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

	onObjectNew(object){
		if (object.hasComponent('render')){
			var mesh = object.renderComponent.object;
			if (object.hasComponent('position')){
				mesh.position.x = object.positionComponent.x;
				mesh.position.y = object.positionComponent.y;
				mesh.position.z = object.positionComponent.z;
			}
			// object.renderComponent.object.position.set(object.positionComponent);
			this.scene.add(mesh);
			this.objects.push(object);
		}
		if (object.hasComponent('camera')){
			this.camera = object.cameraComponent.object;
			this.setSize();
		};
	}
	onComponentNew(component){
		// if (this.componentTypes.indexOf(component.type)>-1){
		// if (component.type === 'camera'){
		// 	this.camera = component.object;
		// 	this.setSize();
		// }
		// 	}else{
		// 		this.scene.add(component.object);

		// 		var position = component.entity.positionComponent;
		// 		if (position){
		// 			component.object.position.x = position.x;
		// 			component.object.position.z = position.z;
		// 		}
		// 	}
		// }
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
			if(this.scene.children[i].id === entity.renderComponent.object.id){
				obj = this.scene.children[i];
				this.scene.children[i].position.set(entity.positionComponent.x, entity.positionComponent.y, entity.positionComponent.z);
				break;
			}
		}
	}
};
