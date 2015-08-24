V3.BasicPlayerController = class{
	constructor(entity){
		this.entity = entity;
		this.mesh = this.entity.components.render.mesh;
		this.camera = this.entity.components.camera.object;
		this.mouseSpeed = this.entity.components.input.mouseSpeed;
		this.movingSpeed = this.entity.components.input.movingSpeed;
		this.wheelSpeed = this.entity.components.input.wheelSpeed;
		this.runingSpeed = this.entity.components.input.runingSpeed;
	}
};
