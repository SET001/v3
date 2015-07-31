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

		// window.addEventListener("resize", function(){
			// @setSize.call @)
		// });
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
		this.mesh = null;
		this.canTick = false;
		this.components = [];
		this.inputComponent = null;
	}
	beginPlay(){

	}
	tick(deltaSeconds){
		if(deltaSeconds){}
	}
	init(){}

	// position - Vector3
	setPosition(position){
		if (this.mesh){
			this.mesh.setPosition(position);
		}
	}
};

// Source: src/pawn.js
V3.Pawn = class extends V3.Actor{
	constructor(){
		super();
	}
};


// Source: src/gameMode.js
V3.GameMode = class{
	constructor(){
		this.state = new V3.StateMachine();
		this.defaultPawn = null;
		// this.mainPawn.beginPlay();	// this should be triggered somewhere else, not in constructor
		// only one controls class may be in use at any given time
		// this.controls = new V3.Controls();
	}
	// game pausing
	// levels transitions
	// actors spawning
	//
	startPlay(){}
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


// Source: src/views/view.js
{
	let _camera = null;
	let _scene = null;
	V3.View = class{
		constructor(){
			var self = this;
			this.game = null;
			this.renderer = new THREE.WebGLRenderer({antialias: V3.config.renderer.antialias});
			this.renderer.autoClear = false;
			this.renderer.shadowMapEnabled = V3.config.renderer.shadowMapEnabled;
			this.renderer.shadowMapType = V3.config.renderer.shadowMapType;
			this.renderer.shadowMapHeight = V3.config.renderer.shadowMapHeight;
			this.renderer.shadowMapWidth = V3.config.renderer.shadowMapWidth;

			this.container = V3.config.container ? V3.config.container : document.body;
			this.setSize();
			this.container.appendChild(this.renderer.domElement);

			window.addEventListener("resize", function(){
				self.setSize();
			});
		}

		get camera(){
			if (!_camera){
				_camera = new THREE.PerspectiveCamera(45, this.renderer.domElement.width / this.renderer.domElement.height, 1, 20000);
				_camera.position.set(10, 10, 10);
				_camera.lookAt(this.scene.position);
				_camera.rotation.y = 45 * Math.PI / 180;
				this.scene.add(_camera);
			}
			return _camera;
		}

		set camera(camera){_camera = camera;}

		setSize(){
			this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
		show(){
			if (!this.scene){
				this.scene = THREE.Scene();
			}
			this.animate();
		}
		render(){
			this.renderer.render(this.scene, this.camera);
			// this.renderer.render(this.sceneHelpers, this.camera);
		}
		animate(){
			for (let pawn in this.game.pawns){
				if (pawn.canTick){
					pawn.tick();
				}
			}
			this.render();
			// window.requestAnimationFrame(this.animate.bind, this);
		}
		get scene(){
			if (!_scene){
				_scene = new THREE.Scene();
			}
			return _scene;
		}
		set scene(scene){
			_scene = scene;
		}
	};
}

// Source: src/views/defaultGameView.js
V3.defaultGameView  = class extends V3.View{
	constructor(){
		super();
		var floorSize = 50;
		var geometry = new THREE.PlaneBufferGeometry(floorSize, floorSize);
		var material = new THREE.MeshBasicMaterial( {color: 0xCCCCCC, side: THREE.DoubleSide} );
		var floor = new THREE.Mesh(geometry, material);
		floor.position.set(0, 0, 0);
		floor.rotation.x = THREE.Math.degToRad(90);
		floor.name = "Floor";
		this.scene.add(floor);
		this.scene.add(new THREE.AmbientLight(0x555555));
	}
	init(){

	}
};

// Source: src/game.js
{
	let _view=null;

	V3.Game = class{
		constructor(){
			this.mode = new V3.GameMode();
			this.pawns = [];
		}
		set view(view){
			_view = view;
			_view.game = this;
		}

		get view(){
			if(!_view){
				this.view = new V3.defaultGameView();
			}
			return _view;
		}
		addPawn(pawn){
			if (pawn.mesh){
				this.view.scene.add(pawn.mesh);
			}
			this.pawns.push(pawn);
		}
		run(){
			// if defined project url then load map
			this.view.show();
			// load default scene
			// run default scene
		}
		//	find where to place
		loadMap(){}
	};
}
