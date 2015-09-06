V3.CollisionSystem = {
	name: 'Collision',
	components: [],
	componentTypes: [],
	init: function(){
		document.addEventListener("component_new", this.onNewComponent.bind(this));
	},
	onNewComponent: function(component){
		if (component.type in this.componentTypes){
			this.components.push(component);
		}
	},
	controller: function(){

	},
	requestTranslation: function(object, translation){
		var tryObject = object.clone();
		translation(tryObject);
		var startPoint = object.position.clone();
		var endPoint = tryObject.position.clone();
		var direction = endPoint.clone().sub(startPoint).normalize();
		var distance = startPoint.distanceTo(endPoint);
		var ray = new THREE.Raycaster(startPoint, direction, 0, distance+2);
		var collisions = ray.intersectObjects(V3.RenderSystem.scene.children, true);
		if (!collisions.length){
			translation(object);
		}
	}
}
