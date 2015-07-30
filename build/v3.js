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
V3.Actor = class{
	constructor(){
		this.canTick = false;
		this.components = [];
	}
	beginPlay(){

	}
	tick(deltaSeconds){
		if(deltaSeconds){}
	}
};

// Source: src/pawn.js
V3.Pawn = class extends V3.Actor{
};


// Source: src/gameMode.js
V3.GameMode = class{
	constructor(){
		this.state = new V3.StateMachine();
		this.pawn = new V3.Pawn();
		this.pawn.beginPlay();
		// only one controls class may be in use at any given time
		this.controls = new V3.Controls();
	}
	// game pausing
	// levels transitions
	// actors spawning
	//
};

// Source: src/stateMachine.js
{
	let _states = ["inProgress", "enteringMap", "leavingMap", "aborted", "paused"];
	let _state = "asd";
	V3.StateMachine = class{
		constructor(){}
		get state(){
			return _state;
		}
		set state(state){
			console.log("setter called", state);
			if ((state !== _state) && (_states.indexOf(state) != -1)){
				_state = state;
				// also should maybe trigger an event
				return true;
			}
			else return false;
		}
	};
}


// Source: src/view.js
V3.View = class{
	constructor(game){
		this.game = game;
		this.renderer = new THREE.WebGLRenderer({antialias: V3.config.renderer.antialias});
		this.renderer.autoClear = false;
		this.renderer.shadowMapEnabled = V3.config.renderer.shadowMapEnabled;
		this.renderer.shadowMapType = V3.config.renderer.shadowMapType;
		this.renderer.shadowMapHeight = V3.config.renderer.shadowMapHeight;
		this.renderer.shadowMapWidth = V3.config.renderer.shadowMapWidth;

		this.container = V3.config.container ? V3.config.container : document.body;

		this.scene = null;
		this.setSize();
		this.container.appendChild(this.renderer.domElement);
	}
	setSize(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		if (this.camera){
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
	}
	show(){
		if (!this.scene){
			this.scene = THREE.Scene();
		}
		this.animate();
	}
	render(){
		this.renderer.render(this.scene, this.camera);
		this.renderer.render(this.sceneHelpers, this.camera);
	}
	animate(){
		for (let actor in this.game.actors){
			if (actor.canTick){
				actor.tick();
			}
		}
		this.render();
		window.requestAnimationFrame(this.animate.bind, this);
	}
};

// Source: src/game.js
V3.Game = class{
	constructor(){
		this.gameMode = new V3.GameMode();
		this.view = new V3.View(this);
		this.actors = [];
	}
	addActor(actor){
		this.actors.push(actor);
	}
	run(){
		// if defined project url then load map
		this.view.show();
		// this.veiw.render
		// load application info
		// load default scene
		// run default scene
	}
	//	find where to place
	loadMap(){}
};
