"use strict";
V3.TickSystem = class extends V3.System{
	constructor(){
		super();
		this.name = 'tick';
	}
	controller(entities, delta){
		for (var entityId in entities){
			var entity = entities[entityId];
			if ('tick' in entity.components){
				entity.components.tick.callback(delta);
			}
		}
	}
};
