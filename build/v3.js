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
	name: 'Collision',
	requestTranslation: function(object, translation){
		var tryObject = object.clone();
		translation(tryObject);
		var startPoint = object.position.clone();
		var endPoint = tryObject.position.clone();
		var direction = endPoint.clone().sub(startPoint).normalize();
		var distance = startPoint.distanceTo(endPoint);
		var ray = new THREE.Raycaster(startPoint, direction, 0, distance+2);
		var collisions = ray.intersectObjects(V3.RenderSystem.scene.children, true);
		if (!collisions.length){
			translation(object);
		}
	}
}

// Source: src/es/systems/input.js
V3.InputSystem = {
	name: 'Input',
	components: [],
	controllers: [],
	actions: {},
	keyMapping: {
		32: 'Space',
		16: 'Shift',
		17: 'Ctrl',
		18: 'Alt'
	},
	controller: function(){
		var self = this;
		this.controllers.map(function(controller){
			for(let action in self.actions){
				if (self.actions[action]){
					var foo = controller.entity.components.input.keyMappings[action];
					if (controller[foo]) controller[foo](self.actions);
				}
			}
		});
	},
	onNewEntity: function(e){
		if ('input' in e.detail.components){
			this.controllers.push(new this.controllerClass(e.detail));
		}
	},
	mouseMove: function(e){
		this.controllers.map(function(controller){
			if (Math.abs(e.movementX)<100 && Math.abs(e.movementY) < 100){
				if (e.movementX>0)
			 		controller.mouseRight(e.movementX);
			 	if (e.movementX<0)
			 		controller.mouseLeft(e.movementX);
			 	if (e.movementY<0)
			 		controller.mouseUp(e.movementY);
			 	if (e.movementY>0)
			 		controller.mouseDown(e.movementY);
			}
		});
	},

	mouseWheel: function(e){
		this.controllers.map(function(controller){
			controller.mouseWheel(e.wheelDelta)
		});
	},

	init: function(){
		var self = this;
		var mouse = new THREE.Vector2();
		this.pointerLockEnabled = false;

    var element = V3.container;

    var havePointerLock = 'pointerLockElement' in document;
    var mouseCallback = self.mouseMove.bind(self);
    // mouse
    if (havePointerLock){
    	document.onclick = function(){
    		if (!this.pointerLockEnabled){
					element.requestPointerLock();
    		}
    	};
			document.addEventListener('mousewheel', self.mouseWheel.bind(self));
    	document.addEventListener('pointerlockchange', function(){
    		self.pointerLockEnabled = (document.pointerLockElement == element);
				if(self.pointerLockEnabled){
					document.addEventListener("mousemove", mouseCallback, false);
				}else{
					document.removeEventListener("mousemove", mouseCallback, false);
				};
			}, false);
			document.addEventListener("entity_new", self.onNewEntity.bind(self));
    }

    // keyboard
		document.onkeydown = function(e){
			var action = null;
			if (e.which in self.keyMapping)
				action = self.keyMapping[e.which]
			else
				action = String.fromCharCode(e.which);
			self.actions[action] = true;
		}
		document.onkeyup = function(e){
			var action = null;
			if (e.which in self.keyMapping)
				action = self.keyMapping[e.which]
			else
				action = String.fromCharCode(e.which);
			if (action)
				self.actions[action] = false;
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
		if (this.camera){
			this.renderer.render(this.scene, this.camera);
		}
	},
	init: function(){
		console.log("Initialising render system");
		var self = this;
		this.scene = new THREE.Scene();
		this.container = V3.config.container ? V3.config.container : document.body;

		this.renderer = new THREE.WebGLRenderer({antialias: V3.config.renderer.antialias});
		this.renderer.autoClear = false;
		this.renderer.shadowMapEnabled = V3.config.renderer.shadowMapEnabled;
		this.renderer.shadowMapType = V3.config.renderer.shadowMapType;
		this.renderer.shadowMapHeight = V3.config.renderer.shadowMapHeight;
		this.renderer.shadowMapWidth = V3.config.renderer.shadowMapWidth;
		this.container.appendChild(this.renderer.domElement);
		if (V3.config.showAxis){
			this.scene.add(new THREE.AxisHelper(V3.config.axisLength));
		}

		document.addEventListener("entity_new", this.onNewEntity.bind(this));
		window.addEventListener("resize", this.setSize.bind(this));
		return true;
	},
	onNewEntity: function(e){
		if ('camera' in e.detail.components){
			this.camera = e.detail.components.camera.object;
	    this.setSize();
		}
	},

	setSize: function(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		if (this.camera){
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
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
	constructor(type){
		this.system = 'camera';
		if (!type) type = 'perspective';
		var fow = 50;
		var near = 1;
		var far = 20000;
		var aspect = V3.RenderSystem.renderer.domElement.width / V3.RenderSystem.renderer.domElement.height;
		var left = V3.RenderSystem.renderer.domElement.width / -2;
		var right = V3.RenderSystem.renderer.domElement.width / 2;
		var top = V3.RenderSystem.renderer.domElement.height / 2;
		var bottom = V3.RenderSystem.renderer.domElement.height / -2;
		var cubeResolution = 128;
		switch (type.toLowerCase()){
			case 'perspective':
				this.object = new THREE.PerspectiveCamera(fow, aspect, near, far);
				break;
			case 'orthographic':
				this.object = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
				break;
			case 'cube':
				this.object = new THREE.CubeCamera(near, far, cubeResolution );
				break;
		}
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
	constructor(){
		this.entity = null;
		this.system = 'input';
		this.movingSpeed = 1;
		this.runingSpeed = 3;
		this.mouseSpeed = 0.003;
		this.wheelSpeed = 0.7;
		this.keyMappings = {
			W: 'moveForward',
			S: 'moveBackward',
			A: 'moveLeft',
			D: 'moveRight',
			Space: 'jump'
		}
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
			var mesh = entity.components.render.mesh;			//	???
			if ('render' in entity.components && mesh){
				mesh.uid = entity.id;
				// if (entity.components.position) mesh.position.set(
				// 	entity.components.position.x,
				// 	entity.components.position.y,
				// 	entity.components.position.z);
				V3.RenderSystem.scene.add(mesh);
			}

			document.dispatchEvent(new CustomEvent("entity_new", {detail: entity}));
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
			component.entity = self.entity;
			self.entity.addComponent(component);
			var systemName = component.system.charAt(0).toUpperCase() + component.system.slice(1);
			var setUpFunction = `setUp${systemName}Component`;
			if (self[setUpFunction]){
				var setup = self[setUpFunction](component);
				for (var attr in setup) {
					if (setup.hasOwnProperty(attr)) component[attr] = setup[attr];
				};
			}
		});
		V3.ES.Manager.addEntity(self.entity);
		return self.entity;
	}
};

// Source: src/actor.js
V3.Actor = class{
	constructor(){
		this.mesh = null;
		this.canTick = false;
		this.components = [V3.PositionComponent, V3.RenderableComponent];
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

	register(){
		var self = this;
		var entity = new V3.ES.Entity();

		this.components.map(function(componentClass){
			var component = new componentClass();
			entity.addComponent(component);
			var systemName = component.system.charAt(0).toUpperCase() + component.system.slice(1);
			var setUpFunction = `setUp${systemName}Component`;
			if (self[setUpFunction]){
				var setup = self[setUpFunction]();
				for (var attr in setup) {
					if (setup.hasOwnProperty(attr)) component[attr] = setup[attr];
				};
			}
		});
		V3.ES.Manager.addEntity(entity);
		return entity;
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
		var self = this;
		this.systems.map(function(system){
			V3.ES.Manager.addSystem(system);
			if (system.name === 'Input'){
				system.controllerClass = self.playerController;
			};
		});
		if (this.defaultPawn){
			var pawn = new this.defaultPawn();
			pawn.components.push(V3.InputComponent, V3.CameraComponent);
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


// Source: src/playerControllers/basic.js
V3.BasicPlayerController = class{
	constructor(entity){
		this.entity = entity;
		this.mesh = this.entity.components.render.mesh;
		this.camera = this.entity.components.camera.object;
		this.mouseSpeed = this.entity.components.input.mouseSpeed;
		this.movingSpeed = this.entity.components.input.movingSpeed;
		this.wheelSpeed = this.entity.components.input.wheelSpeed;
		this.runingSpeed = this.entity.components.input.runingSpeed;
	}
};

// Source: src/playerControllers/fps.js
V3.FPSPlayerController = class extends V3.BasicPlayerController{

	constructor(entity){
		super(entity);
	}

	mouseUp(movement){
		if (THREE.Math.radToDeg(this.camera.rotation.x)<90)
			this.camera.rotation.x -= movement*this.mouseSpeed;
	}

	mouseDown(movement){
		if (THREE.Math.radToDeg(this.camera.rotation.x)>-90)
			this.camera.rotation.x -= movement*this.mouseSpeed;
	}

	mouseLeft(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}

	mouseRight(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}

	mouseWheel(movement){}

	moveForward(actions){
		var speed = actions.Shift ? this.runingSpeed : this.movingSpeed;
		V3.CollisionSystem.requestTranslation(this.mesh, function(object){
			object.translateZ(-speed);
		}.bind(this));
	}

	moveBackward(actions){
		var speed = actions.Shift ? this.runingSpeed : this.movingSpeed;
		V3.CollisionSystem.requestTranslation(this.mesh, function(object){
			object.translateZ(speed);
		}.bind(this));
	}

	moveLeft(actions){
		var speed = actions.Shift ? this.runingSpeed : this.movingSpeed;
		V3.CollisionSystem.requestTranslation(this.mesh, function(object){
			object.translateX(-speed);
		}.bind(this));
	}

	moveRight(actions){
		var speed = actions.Shift ? this.runingSpeed : this.movingSpeed;
		V3.CollisionSystem.requestTranslation(this.mesh, function(object){
			object.translateX(speed);
		}.bind(this));
	}

	jump(){
		console.log("jumping");
	}
};

// Source: src/playerControllers/rpg.js
V3.RPGPlayerController = class extends V3.BasicPlayerController{

	constructor(entity){
		super(entity);
		this.pitchObject = new THREE.Object3D();
		this.pitchObject.add(this.camera);
		this.mesh.add(this.pitchObject);
	}

	mouseUp(movement){
		this.pitchObject.rotation.x -= movement*this.mouseSpeed;
	}
	mouseDown(movement){
		this.pitchObject.rotation.x -= movement*this.mouseSpeed;
	}
	mouseLeft(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}
	mouseRight(movement){
		this.mesh.rotation.y -= movement*this.mouseSpeed;
	}
	mouseWheel(movement){
		this.camera.translateZ(-movement/120*this.wheelSpeed);
	}

	moveForward(){
		this.mesh.translateZ(-this.movingSpeed);
	}

	moveBackward(){
		this.mesh.translateZ(this.movingSpeed);
	}

	moveLeft(){
		this.mesh.translateX(-this.movingSpeed);
	}
	moveRight(){
		this.mesh.translateX(this.movingSpeed);
	}
};

// Source: src/playerControllers/strategy.js
V3.StrategyPlayerController = class extends V3.BasicPlayerController{

};

// Source: src/game.js
{
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
