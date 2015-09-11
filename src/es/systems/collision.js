"use strict";
V3.CollisionSystem = class extends V3.System{
	constructor(){
		super();
		this.name = 'collision';
		this.components = [];
		this.componentTypes = [];

	}

	init(){
		document.addEventListener("component_new", this.onNewComponent.bind(this));
	}

	onNewComponent(component){
		if (component.type in this.componentTypes){
			this.components.push(component);
		}
	}

	controller(){

	}

	requestTranslation(object, translation){
		var tryObject = object.clone();
		translation(tryObject);
		var startPoint = object.position.clone();
		var endPoint = tryObject.position.clone();
		var direction = endPoint.clone().sub(startPoint).normalize();
		var distance = startPoint.distanceTo(endPoint);
		var ray = new THREE.Raycaster(startPoint, direction, 0, distance+2);
		var collisions = ray.intersectObjects(V3.ESManager.getSystem('render').scene.children, true);
		if (!collisions.length){
			translation(object);
		}
	}
};
