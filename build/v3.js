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
	init: function(){
		this.container = document.body;
	},
	runProject: function(id){
		var project = new V3.Project();

		project.load(id, function(){
			project.loadDefaultScene(function(scene){
				V3.run(scene);
			});
		});
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
	},
	TexturesManager: {
		textures: {},
		get: function(textureName){
			return this.textures[textureName];
		},
		load: function(textures){
			if (typeof textures === 'object'){
				for(var texture in textures){
					this.textures[texture] = THREE.ImageUtils.loadTexture(textures[texture]);
				}
			}
		}
	}
};
Object.defineProperty(V3, "revision", {value: 1});

V3.Project = function(){

};
V3.Scene = function(){

};

// Source: src/es/systems/collision.js
V3.CollisionSystem = {
	name: 'Collision'
}

// Source: src/es/systems/input.js
V3.InputSystem = {
	name: 'Input',
	components: [],
	actions: {
		forward: null,
		backward: null,
		left: null,
		right: null,
		jump: null,
		pitch: null,
		yaw: null
	},
	controller: function(entities){
		for (var entityId in entities){
			var entity = entities[entityId];
			if ('input' in entity.components){
				if (this.actions.left){
					entity.components.position.x -= entity.components.input.movingSpeed;
					V3.RenderSystem.update(entity);
				}
				if (this.actions.right){
					entity.components.position.x += entity.components.input.movingSpeed;
					V3.RenderSystem.update(entity);
				}
				if (this.actions.forward){
					entity.components.position.z -= entity.components.input.movingSpeed;
					V3.RenderSystem.update(entity);
				}
				if (this.actions.backward){
					entity.components.position.z += entity.components.input.movingSpeed;
					V3.RenderSystem.update(entity);
				}
			}
		}
	},
	init: function(){
		var self = this;
		var mouse = new THREE.Vector2();
		var pointerLockEnabled = false;

    var element = V3.container;

    var havePointerLock = 'pointerLockElement' in document;

    // mouse
    if (havePointerLock){
    	var pitchObject = new THREE.Object3D();
    	pitchObject.add(V3.RenderSystem.camera);

			var yawObject = new THREE.Object3D();
			yawObject.position.y = 10;
			yawObject.position.x = 0;
			yawObject.position.z = 0;
			yawObject.add( pitchObject );
			V3.RenderSystem.scene.add(yawObject);

			var PI_2 = Math.PI / 2;

    	var moveCallback = function(e){
    		console.log("e");
    		var movementX = event.movementX || 0;
				var movementY = event.movementY || 0;
				if (Math.abs(movementX)<100 && Math.abs(movementY) < 100){
					yawObject.rotation.y -= movementX * 0.003;
					pitchObject.rotation.x -= movementY * 0.003;

					pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
				};
    	};
    	document.onclick = function(){
    		if (!pointerLockEnabled){
					element.requestPointerLock();
    		}
    	};
			document.addEventListener('mousewheel', function(e){
    		if (pointerLockEnabled){
					V3.RenderSystem.camera.position.y -= e.wheelDelta/120*0.1;
    		}
    	});
    	document.addEventListener('pointerlockchange', function(){
				if(pointerLockEnabled = (document.pointerLockElement == element)){
					document.addEventListener("mousemove", moveCallback, false);
				}else{
					document.removeEventListener("mousemove", moveCallback, false);
				};
			}, false);
    }

    // keyboard
		document.onkeydown = function(e){
			// console.log(e.which);
			switch (e.which){
				case 83:
					self.actions.backward = true;
					break;
				case 87:
					self.actions.forward = true;
					break;
				case 65:
					self.actions.left = true;
					break;
				case 68:
					self.actions.right = true;
					break;
			}
		}
		document.onkeyup = function(e){
			switch (e.which){
				case 83:
					self.actions.backward = false;
					break;
				case 87:
					self.actions.forward = null;
					break;
				case 65:
					self.actions.left = null;
					break;
				case 68:
					self.actions.right = false;
					break;
			}
		}
		return true;
	}
};

// Source: src/es/systems/render.js
V3.RenderSystem = {

	name: 'Render',
	camera: null,
	renderer: null,
	scene: null,
	controller: function(entities){
		this.renderer.render(this.scene, this.camera);
	},
	init: function(){
		var self = this;
		this.scene = new THREE.Scene();
		this.container = V3.config.container ? V3.config.container : document.body;

		this.renderer = new THREE.WebGLRenderer({antialias: V3.config.renderer.antialias});
		this.renderer.autoClear = false;
		this.renderer.shadowMapEnabled = V3.config.renderer.shadowMapEnabled;
		this.renderer.shadowMapType = V3.config.renderer.shadowMapType;
		this.renderer.shadowMapHeight = V3.config.renderer.shadowMapHeight;
		this.renderer.shadowMapWidth = V3.config.renderer.shadowMapWidth;
		this.setCamera();
		this.setSize();
		this.container.appendChild(this.renderer.domElement);
		if (V3.config.showAxis)
			this.scene.add(new THREE.AxisHelper(V3.config.axisLength));

		window.addEventListener("resize", function(){
			self.setSize();
		});
		return true;
	},

	setCamera: function(){
		this.camera = new THREE.PerspectiveCamera(50, this.renderer.domElement.width / this.renderer.domElement.height, 1, 20000);
		this.camera.position.set(0, 50, 10);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		// this.camera.rotation.y = 45 * Math.PI / 180;
		this.scene.add(this.camera);
	},

	setSize: function(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
		this.camera.updateProjectionMatrix();
	},
	update: function(entity){
		var obj = null;
		for (var i in this.scene.children){
			if(this.scene.children[i].uid === entity.id){
				obj = this.scene.children[i];
				break;
			}
		}
		if (obj){
			obj.position.set(entity.components.position.x, entity.components.position.y, entity.components.position.z);
		}
	}
};

// Source: src/es/systems/tick.js
V3.TickSystem = {
	name: 'Tick',
	controller(entities, delta){
		for (var entityId in entities){
			var entity = entities[entityId];
			if ('tick' in entity.components){
				entity.components.tick.callback(delta);
			}
		}
	}
}

// Source: src/es/components/camera.js
V3.CameraComponent = class{
	constructor(){
		// this.system = 'collision';
	}
}

// Source: src/es/components/collidable.js
V3.CollidableComponent = class{
	constructor(){
		this.system = 'collision';
	}
}

// Source: src/es/components/input.js
V3.InputComponent = class{
	constructor(actor){
		this.system = 'input';
		this.movingSpeed = 10;
	}
	register(){
		V3.InputSystem.components.push(this);
	}
};

// Source: src/es/components/possition.js
V3.PositionComponent = class extends THREE.Vector3{
	constructor(){
		super();
		this.system = 'position';
	}
}

// Source: src/es/components/renderable.js
V3.RenderableComponent = class{
	constructor(){
		this.system = 'render';
		this.mesh = null;	// THTEE.Mesh
	}
}

// Source: src/es/components/tick.js
V3.TickComponent = class{
	constructor(){
		this.system = 'tick';
		this.callback = null;
	}
}

// Source: src/es/es.js
// The Entity System
V3.ES ={
	Entity: class{
		constructor(){
			this.id = Math.ceil(Math.random()*999999);
			this.components = {};
		}
		addComponent(component){
			this.components[component.system] = component;
		}
		removeComponent(){}
	},
	Manager: {
		entities: {},
		systems: [],
		addEntity: function(entity){
			this.entities[entity.id] = entity;
			var mesh = entity.components.render.mesh;
			if ('render' in entity.components && mesh){

				mesh.uid = entity.id;
				if (entity.components.position) mesh.position.set(
					entity.components.position.x,
					entity.components.position.y,
					entity.components.position.z);
				V3.RenderSystem.scene.add(entity.components.render.mesh)
			}
		},
		addSystem: function(system){
			if (system.init && !system.init())
				throw `Unable to initialize ${system.name} system!`;
			this.systems.push(system);
		},
		removeEntity: function(){},
		removeSystem: function(){},
		run: function(delta){
			var self = this;
			this.systems.map(function(system){
				if (system.controller)
					system.controller(self.entities, delta);
			})
			// V3.RenderSystem.light.position.x = Math.sin(delta/800)*4;
			// V3.RenderSystem.light.position.z = Math.cos(delta/800)*4;
			// V3.RenderSystem.light.position.y += 0.1
			// V3.RenderSystem.light.position.z += 0.1
			window.requestAnimationFrame(this.run.bind(this));
		},
	}
};

// Source: src/gameObject.js
V3.GameObject = class{
	constructor(){
		this.components = [];
	}
	register(){
		var self = this;
		self.entity = new V3.ES.Entity();

		this.components.map(function(componentClass){
			var component = new componentClass();
			self.entity.addComponent(component);
			var systemName = component.system.charAt(0).toUpperCase() + component.system.slice(1);
			var setUpFunction = `setUp${systemName}Component`;
			if (self[setUpFunction]){
				var setup = self[setUpFunction]();
				for (var attr in setup) {
					if (setup.hasOwnProperty(attr)) component[attr] = setup[attr];
				};
			}
		});
		V3.ES.Manager.addEntity(self.entity);
		return self.entity;
		// if (this.mesh){
		// 	object.components.renderable.mesh = this.mesh;
		// 	V3.RenderSystem.scene.add(this.mesh);
		// }
		// if (this.canTick && this.tick){
		// 	object.components.tickable = new V3.TickComponent();
		// 	object.components.tickable.callback = this.tick;
		// }
		// return object.components;
	}
};

// Source: src/pawn.js
V3.Pawn = class extends V3.GameObject{
	constructor(){
		super();
		var self = this;
		this.mesh = null;
		this.canTick = false;
		this.components = [V3.PositionComponent, V3.RenderableComponent, V3.CollidableComponent];
	}

	beginPlay(){

	}
	tick(deltaSeconds){
		if(deltaSeconds){}
	}
	init(){}

	set position(vector3){
		this.mesh.position = vector3;
	}
	get position(){
		return this.mesh.position;
	}
	onClick(){

	}
};


// Source: src/spawner.js
V3.Spawner = class{
	constructor(spawnClass, compSettings){
		this.spawnClass = spawnClass;
		this.objects = [];
		this.compSettings = compSettings;
	}
	randomInRange(max, min){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	spawn(count, startPoint, endPoint){
		var self = this;
		for (var i=0; i<count; i++){
			var object = new this.spawnClass();
			// object.setUpRenderComponent = function(){
			// 	this.mesh.scale.y = Math.ceil(Math.random()*10);
			// };
			for (var systemName in this.compSettings){
				var _sysName = systemName.charAt(0).toUpperCase() + systemName.slice(1);
				var setUpFunction = `setUp${_sysName}Component`;
				object[setUpFunction] = this.compSettings[systemName];
			};
			object.setUpPositionComponent = function(){
				var x = self.randomInRange(endPoint.x, startPoint.x);

				var y = self.randomInRange(endPoint.y, startPoint.y);
				var z = self.randomInRange(endPoint.z, startPoint.z);
				return new THREE.Vector3(x, y, z);
			}
			var entity = object.register();
			// console.log(object);
			// console.log(entity.components.render);
			this.objects.push(object);
		};
		return this.objects;
	}
};

// Source: src/cubePawn.js
V3.CubePawn = class extends V3.Pawn{
	constructor(){
		super();
		this.canTick = true;
		this.movingSpeed = 0.2;

		var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
		var geometry = new THREE.BoxGeometry(2, 2, 2);
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.position.set(0, 1, 0);
		this.mesh.name = "cubePawn";
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
	}
	setUpTickComponent(){
		this.mesh.rotation.x += THREE.Math.degToRad(0.5);
		this.mesh.rotation.y += THREE.Math.degToRad(0.5);
		this.mesh.rotation.z += THREE.Math.degToRad(0.5);
	}
	setUpRenderComponent(){
		return {mesh: this.mesh};
	}
	setUpInputComponent(){
		// var inputComponent = new V3.InputComponent(this);
		// inputComponent.mapping = {
		// 	97: 'stepLeft',
		// 	100: 'stepRight',
		// 	119: 'moveForward',
		// 	115: 'moveBackward'
		// };
		// inputComponent.register();
		return {movingSpeed: this.movingSpeed};
	}

	stepLeft(){this.position.x -= this.movingSpeed;}
	stepRight(){this.position.x += this.movingSpeed;}
	moveForward(){this.position.z -= this.movingSpeed;}
	moveBackward(){this.position.z += this.movingSpeed;}
	yaw(a){
		this.mesh.rotation.x += THREE.Math.degToRad(0.5);
	}
	pitch(a){
		this.mesh.rotation.y += THREE.Math.degToRad(0.5);
	}
};

// Source: src/meshes/static/box.js
V3.BoxMesh = class extends V3.GameObject{
  constructor(width, height, length){
    super();
    var geometry = new THREE.BoxGeometry( width, height, length );
    var material = new THREE.MeshLambertMaterial( {side: THREE.DoubleSide} );
    this.mesh = new THREE.Mesh( geometry, material );

    this.mesh.position.set(0, 0, 0);
    this.mesh.name = "BoxMesh";
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }
};

// Source: src/meshes/static/plane.js
V3.PlaneMesh = class extends V3.GameObject{
  constructor(width, length){
    super();
    var geometry = new THREE.PlaneGeometry( width, length, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    this.mesh = new THREE.Mesh( geometry, material );

    this.mesh.position.set(0, 0, 0);
    this.mesh.name = "PlaneMesh";
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }
};

// Source: src/meshes/static/staticMesh.js
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

// Source: src/gameMode.js
V3.GameMode = class{
	constructor(){
		this.state = new V3.StateMachine();
		this.defaultPawn = V3.CubePawn;
		this.systems = [V3.RenderSystem, V3.InputSystem, V3.TickSystem];
		// this.mainPawn.beginPlay();	// this should be triggered somewhere else, not in constructor
		// only one controls class may be in use at any given time
		// this.controls = new V3.Controls();
	}
	// game pausing
	// levels transitions
	// actors spawning
	//
	init(){
		this.systems.map(function(system){
			V3.ES.Manager.addSystem(system);
		});
		if (this.defaultPawn){
			var pawn = new this.defaultPawn();
			pawn.components.push(V3.InputComponent);
			pawn.register();
		}
	}
	startPlay(){
		V3.ES.Manager.run();
	}
};

// Source: src/stateMachine.js
{
	let _states = ["inProgress", "enteringMap", "leavingMap", "aborted", "paused"];
	let _state = "";
	V3.StateMachine = class{
		constructor(){}
		get state(){
			return _state;
		}
		set state(state){
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
			this.scene.updateMatrixWorld();
			this.renderer.render(this.scene, this.camera);
			// this.renderer.render(this.sceneHelpers, this.camera);
		}
		animate(time){
			for (let i in this.game.pawns){
				var pawn = this.game.pawns[i];
				if (pawn.canTick){
					pawn.tick(time);
				}
			}
			// for (i in this.game.systems){
			// 	this.game.systems[i].run();
			// }
			this.render();
			window.requestAnimationFrame(this.animate.bind(this));
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
		floor.castShadow = true;
		floor.receiveShadow = true;
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
		}
		run(){
			// if defined project url then load map
			this.mode.init();
			this.mode.startPlay();
			// load default scene
			// run default scene
		}
		//	find where to place
		loadMap(){}
	};
}
