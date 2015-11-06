class Player extends V3.GameObject{
  constructor(){
    super([
      V3.PositionComponent,
      V3.RenderComponent,
      V3.CameraComponent,
      V3.InputComponent]);
  }

  setUpCameraComponent(component){
    var width = 10000;
    var height = 10000;
    this.mesh.add(component.object);
    component.object.position.set(10, 100, 10);
  }

  setUpRenderComponent(component){
    component.object = new THREE.Object3D();
    this.mesh = component.object;
  }

  setUpInputComponent(component){
    component.movingSpeed = 3;
    component.controllerClass = V3.FPSPlayerController;
  }
}

class Game extends V3.Application{
  init(){
    super.init();
  }
}

window.onload = function() {
  V3.init();
  // V3.config.showAxis = true;
  // var stats = new Stats();
  var game = new Game();
  game.defaultMode = 'AppMode';
	game.run();
};
