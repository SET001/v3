"use strict";
var V3 = {
	_componentIndex: 0,
	_systemIndex: 0,
	_entityIndex: 0,
	config: {
		container: document.body,
		path: "",
		renderer: {
			antialias: true,
			shadowMapEnabled: true,
			shadowMapType: THREE.PCFSoftShadowMap,
			shadowMapHeight: 2024,
			shadowMapWidth: 2024
		},
		showAxis: true,
		axisLength: 1000
	},
	storage: null,
	init: function(config){
		_.assign(this.config, config);
	},
	runProject: function(id){
		var project = new V3.Project();

		project.load(id, function(){
			project.loadDefaultScene(function(scene){
				V3.run(scene);
			});
		});
	},
	trigger: function(eventName, param){
		document.dispatchEvent(new CustomEvent(eventName, {detail: param}));
	},
	TexturesManager: {
		textures: {},
		get: function(textureName){
			return this.textures[textureName];
		},
		load: function(textures){
			if (typeof textures === 'object'){
				for(var texture in textures){
					this.textures[texture] = THREE.ImageUtils.loadTexture(textures[texture]);
				}
			}
		}
	}
};
Object.defineProperty(V3, "revision", {value: 1});

V3.Project = function(){

};
V3.Scene = function(){

};
