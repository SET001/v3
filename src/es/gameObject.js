"use strict";

// Basic object for all things in game - entity in terms of CES

V3.GameObject = class{
	constructor(componentClasses){
		this.id = V3._entityIndex++;
		var self = this;
		if (componentClasses && componentClasses.length){
			componentClasses.map(this.addComponent, this);
		}
	}

	addComponent(componentClass){
		var component = new componentClass();
		if (typeof this[`${component.type}Component`] === 'undefined'){
			component.entity = this;
			var systemName = component.type.charAt(0).toUpperCase() + component.type.slice(1);
			var setUpFunction = `setUp${systemName}Component`;
			if (this[setUpFunction]){
				this[setUpFunction](component);
			}
			V3.trigger('component_new', component);
			this[`${component.type}Component`] = component;
		}else{
			throw `Entity alriedy have ${component.type} component!`;
		}
	}

	removeComponent(type){
		V3.trigger('component_remove', this[`${type}Component`]);
		delete this[`${type}Component`];
	}
};
