V3.RPGPlayerController = class extends V3.BasicPlayerController{

	constructor(entity){
		super(entity);
		this.pitchObject = new THREE.Object3D();
		this.pitchObject.add(this.camera);
		this.mesh.add(this.pitchObject);
	}

	mouseUp(movement){
		this.pitchObject.rotation.x -= movement*this.mouseSpeed;
	}
	mouseDown(movement){
		this.pitchObject.rotation.x -= movement*this.mouseSpeed;
	}
	mouseLeft(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}
	mouseRight(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}
	mouseWheel(movement){
		this.camera.translateZ(-movement/120*this.wheelSpeed);
	}
};
