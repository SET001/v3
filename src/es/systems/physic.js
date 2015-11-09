"use strict";
V3.PhysicSystem = class extends V3.System{
	constructor(){
		super();
		this.name = 'physic';
		this.components = [];
		this.componentTypes = ['physic'];
		this.i = 0;
	}

	// onNewComponent(component){
	// 	if (component.type in this.componentTypes){
	// 		this.components.push(component);
	// 	}
	// }

	controller(){
		var self = this;
		this.components.map(function(component){
			var foo = component.entity.positionComponent.clone();
			component.entity.positionComponent.add(component.forces[0]);
			V3.ESManager.getSystem('render').update(component.entity);
		});
		// console.log(this.components.length);
	}
};
