'use strict';
// Source: src/v3.js
var V3 = {
	revision: 1,
	renderer: null,
	container: null,
	config: {
		path: "",
		renderer: {
			antialias: true,
			shadowMapEnabled: true,
			shadowMapType: THREE.PCFSoftShadowMap,
			shadowMapHeight: 2024,
			shadowMapWidth: 2024
		},
		showAxis: false,
		axisLength: 1000
	},
	init: function(configuration){
		if (configuration)
			this.configure(configuration);

		if (this.config.container)
			this.container = this.config.container;
		else this.container = document.body;
	},
	runProject: function(id){
		var project = new V3.Project();

		project.load(id, function(){
			project.loadDefaultScene(function(scene){
				V3.run(scene);
			});
		});
	},
	run: function(scene){
		this.scene = scene;
		this.sceneHelpers = new THREE.Scene();

		var geometry = new THREE.BoxGeometry(2, 2, 2);
		var texture = THREE.ImageUtils.loadTexture("assets/bricks.jpg");
		var material = new THREE.MeshLambertMaterial({map: texture});
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = 20;
		mesh.position.y = 10;
		mesh.position.z = 20;
		this.scene.add(mesh);

		this.renderer = new THREE.WebGLRenderer({antialias: this.config.renderer.antialias});
		this.renderer.autoClear = false;
		this.renderer.shadowMapEnabled = this.config.renderer.shadowMapEnabled;
		this.renderer.shadowMapType = this.config.renderer.shadowMapType;
		this.renderer.shadowMapHeight = this.config.renderer.shadowMapHeight;
		this.renderer.shadowMapWidth = this.config.renderer.shadowMapWidth;
		this.setCamera();
		this.setSize();
		this.container.appendChild(this.renderer.domElement);

		window.addEventListener("resize", function(){
			// @setSize.call @)
		});
		this.animate();
	},

	configure: function(configuration){
		_.assign(this.config, configuration);
	},

	setSize: function(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
		this.camera.updateProjectionMatrix();
	},

	render: function(){
		// this.sceneHelpers.updateMatrixWorld();
		// this.scene.updateMatrixWorld();
		this.renderer.render(this.scene, this.camera);
		this.renderer.render(this.sceneHelpers, this.camera);
	}
};
Object.defineProperty(V3, "revision", {value: 1});

V3.Project = function(){

};
V3.Scene = function(){

};
V3.View = function(){

};
V3.Controls = function(){

};

// Source: src/actor.js
V3.Actor = function(){
	this.canTick = true;
};
V3.Actor.prototype = {
	beginPlay: function(){

	},
	tick: function(deltaSeconds){
		if(deltaSeconds){}
	}
};

// Source: src/pawn.js
V3.Pawn = function(){
	V3.Actor.call(this);
};
V3.Pawn.prototype = Object.create(V3.Actor.prototype);

// Source: src/gameMode.js
V3.GameMode = function(){
	console.log("GameMode constructor");
	this.state = new V3.StateMachine();

	this.pawn = new V3.Pawn();
	this.pawn.beginPlay();
	// only one controls class may be in use at any given time
	this.controls = new V3.Controls();
	// game pausing
	// levels transitions
	// actors spawning
	//
};
V3.GameMode.prototype = {

};

// Source: src/stateMachine.js
V3.StateMachine = function(){
	var states = ["inProgress", "enteringMap", "leavingMap", "aborted", "paused"];

	var state = "asd";
	this.prototype = {
		get: function(){
			return state;
		},
		set: function(state){
			if (state in states){
				this.state = state;
				var event = new CustomEvent("gameStateChange", {state: state});
				document.dispatchEvent("gameStateChange", event);
				return true;
			}
			else return false;
		}
	};
};

// Source: src/view.js
V3.View = function(){
	this.scene = null;
	this.renderer = new THREE.WebGLRenderer({antialias: this.config.renderer.antialias});
	this.renderer.autoClear = false;
	this.renderer.shadowMapEnabled = this.config.renderer.shadowMapEnabled;
	this.renderer.shadowMapType = this.config.renderer.shadowMapType;
	this.renderer.shadowMapHeight = this.config.renderer.shadowMapHeight;
	this.renderer.shadowMapWidth = this.config.renderer.shadowMapWidth;
	this.setCamera();
	this.setSize();
	this.container.appendChild(this.renderer.domElement);
};
V3.View.prototype = {
	run: function(){

	},
	render: function(){
		this.renderer.render(this.scene, this.camera);
		this.renderer.render(this.sceneHelpers, this.camera);
	},
	animate: function(){

	}
};

// Source: src/game.js
V3.Game = function(){
	this.gameMode = new V3.GameMode();
	this.view = new V3.View();

};
V3.Game.prototype = {
	run: function(){
		this.view.run();
		// this.veiw.render
		// load application info
		// load default scene
		// run default scene
	},
	setGameMode: function(gameMode){
		// only one gameMode may be in use at any given time
		this.gameMode = gameMode;
	},
	//	find where to place
	loadMap: function(){}
};
