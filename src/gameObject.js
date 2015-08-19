"use strict";
V3.GameObject = class{
	constructor(){
		this.components = [];
	}
	register(){
		var self = this;
		self.entity = new V3.ES.Entity();

		this.components.map(function(componentClass){
			var component = new componentClass();
			self.entity.addComponent(component);
			var systemName = component.system.charAt(0).toUpperCase() + component.system.slice(1);
			var setUpFunction = `setUp${systemName}Component`;
			if (self[setUpFunction]){
				var setup = self[setUpFunction](component);
				for (var attr in setup) {
					if (setup.hasOwnProperty(attr)) component[attr] = setup[attr];
				};
			}
		});
		V3.ES.Manager.addEntity(self.entity);
		return self.entity;
		// if (this.mesh){
		// 	object.components.renderable.mesh = this.mesh;
		// 	V3.RenderSystem.scene.add(this.mesh);
		// }
		// if (this.canTick && this.tick){
		// 	object.components.tickable = new V3.TickComponent();
		// 	object.components.tickable.callback = this.tick;
		// }
		// return object.components;
	}
};
