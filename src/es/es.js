"use strict";

// The Entity System
V3.ES ={
	Entity: class{
		constructor(){
			this.id = Math.ceil(Math.random()*999999);
			this.components = {};
		}
		addComponent(component){
			this.components[component.system] = component;
		}
		removeComponent(){}
	},
	Manager: {
		entities: {},
		systems: [],
		addEntity: function(entity){
			this.entities[entity.id] = entity;
			var mesh = entity.components.render.mesh;
			if ('render' in entity.components && mesh){

				mesh.uid = entity.id;
				if (entity.components.position) mesh.position.set(
					entity.components.position.x,
					entity.components.position.y,
					entity.components.position.z);
				V3.RenderSystem.scene.add(entity.components.render.mesh)
			}
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
};
