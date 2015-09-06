"use strict";

// The Entity System
V3.ESSystem = class{
	constructor(){
		this.components = [];
		this.componentTypes = [];
		document.addEventListener("component_new", this.onComponentNew.bind(this));
		document.addEventListener("component_remove", this.onComponentRemove.bind(this));
	}
	onComponentNew(component){
		if (component.type in this.componentTypes){
			this.components.push(component);
		}
	}
	onComponentRemove(component){
		this.components = this.components.filter(function(component){
			c.id == component.id;
		});
	}
};
V3.ESManager = {
	entities: {},
	systems: [],
	addEntity: function(entity){
		this.entities[entity.id] = entity;
		var mesh = entity.components.render.mesh;			//	???
		if ('render' in entity.components && mesh){
			mesh.uid = entity.id;
			if (entity.components.position) mesh.position.set(
				entity.components.position.x,
				entity.components.position.y,
				entity.components.position.z);
			V3.RenderSystem.scene.add(mesh);
		}

		document.dispatchEvent(new CustomEvent("entity_new", {detail: entity}));
	},
	addSystem: function(system){
		if (system.init && !system.init())
			throw `Unable to initialize ${system.name} system!`;
		this.systems.push(system);
	},
	removeEntity: function(){},
	removeSystem: function(){},
	run: function(delta){
		var self = this;
		this.systems.map(function(system){
			if (system.controller)
				system.controller(self.entities, delta);
		})
		// V3.RenderSystem.light.position.x = Math.sin(delta/800)*4;
		// V3.RenderSystem.light.position.z = Math.cos(delta/800)*4;
		// V3.RenderSystem.light.position.y += 0.1
		// V3.RenderSystem.light.position.z += 0.1
		window.requestAnimationFrame(this.run.bind(this));
	},
}

