V3.FPSPlayerController = class extends V3.BasicPlayerController{

	constructor(entity){
		super(entity);
	}

	mouseUp(movement){
		this.camera.rotation.x -= movement*this.mouseSpeed;
	}
	mouseDown(movement){
		this.camera.rotation.x -= movement*this.mouseSpeed;
	}
	mouseLeft(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}
	mouseRight(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}
	mouseWheel(movement){}

	moveForward(){
		this.mesh.translateZ(-this.movingSpeed);
	}

	moveBackward(){
		this.mesh.translateZ(this.movingSpeed);
	}

	moveLeft(){
		this.mesh.translateX(-this.movingSpeed);
	}
	moveRight(){
		this.mesh.translateX(this.movingSpeed);
	}
};
