"use strict";
V3.Spawner = class{
	constructor(spawnClass, compSettings){
		this.spawnClass = spawnClass;
		this.objects = [];
		this.compSettings = compSettings;
	}
	randomInRange(max, min){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	spawn(count, startPoint, endPoint){
		var self = this;
		for (var i=0; i<count; i++){
			var object = new this.spawnClass();
			object.positionComponent.x = self.randomInRange(endPoint.x, startPoint.x);
			object.positionComponent.y = self.randomInRange(endPoint.y, startPoint.y);
			object.positionComponent.z = self.randomInRange(endPoint.z, startPoint.z);
			V3.ESManager.getSystem('render').update(object);
			this.objects.push(object);
		};
		return this.objects;
	}
};
