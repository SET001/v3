"use strict";
var V3 = {
	_componentIndex: 0,
	revision: 1,
	container: null,
	config: {
		path: "",
		renderer: {
			antialias: true,
			shadowMapEnabled: true,
			shadowMapType: THREE.PCFSoftShadowMap,
			shadowMapHeight: 2024,
			shadowMapWidth: 2024
		},
		showAxis: false,
		axisLength: 1000
	},
	init: function(){
		this.container = document.body;
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
