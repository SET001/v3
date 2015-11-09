"use strict";
class Bullet extends V3.Pawn{

	constructor(direction){
		super();
		this.direction = direction;
		this.components.push(V3.TickComponent);
	}

	setUpPositionComponent(component){
		// component.x = this.p.x;
		// component.y = 10;
		// component.z = this.p.z;
	}

	setUpRenderComponent(){
		var geo = new THREE.SphereGeometry(3, 3, 30);
		var mat = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		this.mesh = new THREE.Mesh(geo, mat);
		this.mesh.applyMatrix(this.direction.matrixWorld);
		// this.mesh.rotation.copy(this.r);
		return {mesh: this.mesh};
	}

	setUpTickComponent(component){
		return {callback: function(a){
			this.entity.components.render.mesh.translateZ(-10);
		}}
	};
}
