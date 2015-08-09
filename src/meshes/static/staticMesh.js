"use strict";
V3.StaticMesh = class extends V3.GameObject{
  constructor(){
    super();
    this.components = [V3.PositionComponent, V3.RenderableComponent];
    this.mesh = null;
  }
  setUpRenderComponent(){
    return {mesh: this.mesh};
  }
};
