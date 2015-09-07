V3.FPSPlayerController = class extends V3.BasicPlayerController{

	constructor(entity){
		super(entity);
		this.mesh = this.entity.renderComponent.object;
	}

	mouseUp(movement){
		var camera = this.entity.cameraComponent.object;
		if (THREE.Math.radToDeg(camera.rotation.x)<90)
			camera.rotation.x -= movement*this.entity.inputComponent.mouseSpeed;
	}

	mouseDown(movement){
		var camera = this.entity.cameraComponent.object;
		if (THREE.Math.radToDeg(camera.rotation.x)>-90)
			camera.rotation.x -= movement*this.entity.inputComponent.mouseSpeed;
	}

	mouseLeft(movement){
		this.mesh.rotation.y -= movement*this.entity.inputComponent.mouseSpeed;
	}

	mouseRight(movement){
		this.mesh.rotation.y -= movement*this.entity.inputComponent.mouseSpeed;
	}

	mouseWheel(movement){}

	moveForward(actions){
		var speed = actions.Shift ? this.entity.inputComponent.runingSpeed : this.entity.inputComponent.movingSpeed;
		V3.ESManager.getSystem('collision').requestTranslation(this.mesh, function(object){
			object.translateZ(-speed);
		}.bind(this));
	}

	moveBackward(actions){
		var speed = actions.Shift ? this.entity.inputComponent.runingSpeed : this.entity.inputComponent.movingSpeed;
		V3.ESManager.getSystem('collision').requestTranslation(this.mesh, function(object){
			object.translateZ(speed);
		}.bind(this));
	}

	moveLeft(actions){
		var speed = actions.Shift ? this.entity.inputComponent.runingSpeed : this.entity.inputComponent.movingSpeed;
		V3.ESManager.getSystem('collision').requestTranslation(this.mesh, function(object){
			object.translateX(-speed);
		}.bind(this));
	}

	moveRight(actions){
		var speed = actions.Shift ? this.entity.inputComponent.runingSpeed : this.entity.inputComponent.movingSpeed;
		V3.ESManager.getSystem('collision').requestTranslation(this.mesh, function(object){
			object.translateX(speed);
		}.bind(this));
	}

	jump(){
		console.log("jumping");
	}
	shoot(){
		// var bullet = new Bullet(this.entity.components.camera.object.clone());
		// bullet.register();
		// console.log(bullet.entity.components.position);
		// console.log(V3.RenderSystem.scene.children.length);
	}
};
