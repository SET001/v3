var stats = null;
function update () {
  stats.begin();
  stats.end();
  requestAnimationFrame( update );
};
function addStats(){
	stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild( stats.domElement );
	update();

}
window.onload = function() {
	addStats();
  V3.init();
  V3.TexturesManager.load({
    bricks: "../_images/bricks.jpg",
    floor: "../_images/floor.jpg",
  });
  // V3.config.showAxis = true;
  V3.config.renderer.shadowMapEnabled = true;
  // var stats = new Stats();
  var game = new V3.Game();
  game.mode = new FPSGameMode();
	game.run();
};
