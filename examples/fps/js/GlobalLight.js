"use strict";
class GlobalLight extends V3.GameObject{
	constructor(){
		super([V3.RenderComponent]);
		this.intensity = 0x444444;
	}
	setUpRenderComponent(component){
		component.object = new THREE.AmbientLight(this.intensity);
	}
}
