"use strict";
V3.DefaultApplicationMode = class extends V3.ApplicationMode{
	constructor(){
		super();
		this.systems = [V3.RenderSystem];
	}
};
