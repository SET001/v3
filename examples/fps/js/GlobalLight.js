"use strict";
class GlobalLight extends V3.GameObject{
	constructor(){
		super([V3.RenderComponent]);
	}

	init(){
		this.intensity = 0x999999;
	}

	setUpRenderComponent(component){
		component.object = new THREE.AmbientLight(this.intensity);
	}
}
