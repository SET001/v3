"use strict";

// The Entity System
V3.System = class{
	constructor(){
		this.id = V3._systemIndex++;
		this.components = [];
		this.componentTypes = [];
		var self = this;
		document.addEventListener("component_new", function(e){
			self.onComponentNew.call(self, e.detail);
		});
		document.addEventListener("component_remove", function(e){
			self.onComponentRemove.call(self, e.detail);
		});
	}
	onComponentNew(component){
		if (this.componentTypes.indexOf(component.type)>-1){
			this.components.push(component);
		}
	}
	onComponentRemove(component){
		this.components = this.components.filter(function(c){
			return c.id == component.id;
		});
	}
};

V3.ESManager = {
	systems: {},
	getSystem: function(sytemName){
		return this.systems[sytemName];
	},
	addSystem: function(systemClass, params){
		var system = new systemClass();
		if (params && typeof params === 'object'){
			for (let param in params){
				system[param] = params[param];
			}
		}

		if (!system.name)
			throw 'Can`t add system without name!';

		if (typeof this.systems[system.name] !== 'undefined')
			throw `System ${system.name} alriedy exist!`;

		this.systems[system.name] = system;
		return system;
	},
	removeSystem: function(){},
	run: function(delta){
		var self = this;
		for (let systemName in this.systems){
			var system = this.systems[systemName];
			if (system.controller)
				system.controller(delta);
		}
		window.requestAnimationFrame(this.run.bind(this));
	},
}

