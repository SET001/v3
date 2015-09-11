"use strict";
V3.Pawn = class extends V3.GameObject{
	constructor(){
		super([V3.PositionComponent, V3.RenderComponent, V3.CollisionComponent]);
	}
};

