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
			// object.setUpRenderComponent = function(){
			// 	this.mesh.scale.y = Math.ceil(Math.random()*10);
			// };
			for (var systemName in this.compSettings){
				var _sysName = systemName.charAt(0).toUpperCase() + systemName.slice(1);
				var setUpFunction = `setUp${_sysName}Component`;
				object[setUpFunction] = this.compSettings[systemName];
			};
			object.setUpPositionComponent = function(){
				var x = self.randomInRange(endPoint.x, startPoint.x);

				var y = self.randomInRange(endPoint.y, startPoint.y);
				var z = self.randomInRange(endPoint.z, startPoint.z);
				return new THREE.Vector3(x, y, z);
			}
			var entity = object.register();
			// console.log(object);
			// console.log(entity.components.render);
			this.objects.push(object);
		};
		return this.objects;
	}
};
