"use strict";
class GlobalLight extends V3.GameObject{
	constructor(){
		super();
		this.intensity = 0x555555;
		this.components.push(V3.RenderableComponent);
	}
	setUpRenderComponent(){
		return {mesh: new THREE.AmbientLight(this.intensity)};
	}
}
