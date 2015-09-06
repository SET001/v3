V3.FPSPlayerController = class extends V3.BasicPlayerController{

	constructor(entity){
		super(entity);
	}

	mouseUp(movement){
		if (THREE.Math.radToDeg(this.camera.rotation.x)<90)
			this.camera.rotation.x -= movement*this.mouseSpeed;
	}

	mouseDown(movement){
		if (THREE.Math.radToDeg(this.camera.rotation.x)>-90)
			this.camera.rotation.x -= movement*this.mouseSpeed;
	}

	mouseLeft(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}

	mouseRight(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}

	mouseWheel(movement){}

	moveForward(actions){
		var speed = actions.Shift ? this.runingSpeed : this.movingSpeed;
		V3.CollisionSystem.requestTranslation(this.mesh, function(object){
			object.translateZ(-speed);
		}.bind(this));
	}

	moveBackward(actions){
		var speed = actions.Shift ? this.runingSpeed : this.movingSpeed;
		V3.CollisionSystem.requestTranslation(this.mesh, function(object){
			object.translateZ(speed);
		}.bind(this));
	}

	moveLeft(actions){
		var speed = actions.Shift ? this.runingSpeed : this.movingSpeed;
		V3.CollisionSystem.requestTranslation(this.mesh, function(object){
			object.translateX(-speed);
		}.bind(this));
	}

	moveRight(actions){
		var speed = actions.Shift ? this.runingSpeed : this.movingSpeed;
		V3.CollisionSystem.requestTranslation(this.mesh, function(object){
			object.translateX(speed);
		}.bind(this));
	}

	jump(){
		console.log("jumping");
	}
	shoot(){
		var bullet = new Bullet(this.entity.components.camera.object.clone());
		bullet.register();
		// console.log(bullet.entity.components.position);
		// console.log(V3.RenderSystem.scene.children.length);
	}
};
