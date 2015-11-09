"use strict";
V3.PlayerCharacter = class extends V3.GameObject{
	constructor(){
		super([



			V3.PositionComponent,
			V3.RenderComponent,
			V3.CollisionComponent,
			V3.InputComponent,
			V3.PhysicComponent,
			V3.CameraComponent]);
	}
};

