"use strict";
class GlobalLight extends V3.GameObject{
	constructor(){
		super();
		this.intensity = 0x444444;
		this.components.push(V3.RenderableComponent);
	}
	setUpRenderComponent(){
		return {mesh: new THREE.AmbientLight(this.intensity)};
	}
}
