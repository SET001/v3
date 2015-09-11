'use strict';
// Source: src/v3.js
var V3 = {
	_componentIndex: 0,
	_systemIndex: 0,
	_entityIndex: 0,
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
	trigger: function(eventName, param){
		document.dispatchEvent(new CustomEvent(eventName, {detail: param}));
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

// Source: src/es/es.js
// The Entity System
V3.System = class{
	constructor(){
		this.id = V3._systemIndex++;
		this.components = [];
		this.componentTypes = [];
		var self = this;
		document.addEventListener("component_new", function(e){
			self.onComponentNew.call(self, e.detail);
		});
		document.addEventListener("component_remove", function(e){
			self.onComponentRemove.call(self, e.detail);
		});
		document.addEventListener("object_new", function(e){
			self.onObjectNew.call(self, e.detail);
		});
	}
	onObjectNew(){

	}
	onComponentNew(component){
		if (this.componentTypes.indexOf(component.type)>-1){
			this.components.push(component);
		}
	}
	onComponentRemove(component){
		this.components = this.components.filter(function(c){
			return c.id == component.id;
		});
	}
};

V3.ESManager = {
	systems: {},
	objects: {},
	getSystem: function(sytemName){
		return this.systems[sytemName];
	},
	addObject: function(object){
		this.objects.push(object);
		V3.trigger('component_new', component);
	},
	addSystem: function(systemClass, params){
		var system = new systemClass();
		if (params && typeof params === 'object'){
			for (let param in params){
				system[param] = params[param];
			}
		}

		if (!system.name)
			throw 'Can`t add system without name!';

		if (typeof this.systems[system.name] !== 'undefined')
			throw `System ${system.name} alriedy exist!`;

		this.systems[system.name] = system;
		return system;
	},
	removeSystem: function(){},
	run: function(delta){
		var self = this;
		for (let systemName in this.systems){
			var system = this.systems[systemName];
			if (system.controller)
				system.controller(delta);
		}
		window.requestAnimationFrame(this.run.bind(this));
	},
}


// Source: src/es/component.js
V3.Component = class{
	constructor(){
		this.id = V3._componentIndex++;
	}
}

// Source: src/es/gameObject.js
// Basic object for all things in game - entity in terms of CES

V3.GameObject = class{
	constructor(componentClasses){
		this.id = V3._entityIndex++;
		var self = this;
		if (this.init){
			this.init();
		}
		if (componentClasses && componentClasses.length){
			componentClasses.map(this.addComponent, this);
		}
		V3.trigger('object_new', this);
	}

	addComponent(componentClass){
		var component = new componentClass();
		if (typeof this[`${component.type}Component`] === 'undefined'){
			component.entity = this;
			var systemName = component.type.charAt(0).toUpperCase() + component.type.slice(1);
			var setUpFunction = `setUp${systemName}Component`;
			if (this[setUpFunction]){
				this[setUpFunction](component);
			}
			V3.trigger('component_new', component);
			this[`${component.type}Component`] = component;
		}else{
			throw `Entity alriedy have ${component.type} component!`;
		}
	}

	removeComponent(type){
		V3.trigger('component_remove', this[`${type}Component`]);
		delete this[`${type}Component`];
	}

	hasComponent(componentName){
		return !(typeof this[`${componentName}Component`] === 'undefined')
	}
};

// Source: src/es/systems/collision.js
V3.CollisionSystem = class extends V3.System{
	constructor(){
		super();
		this.name = 'collision';
		this.components = [];
		this.componentTypes = [];

	}

	init(){
		document.addEventListener("component_new", this.onNewComponent.bind(this));
	}

	onNewComponent(component){
		if (component.type in this.componentTypes){
			this.components.push(component);
		}
	}

	controller(){

	}

	requestTranslation(object, translation){
		var tryObject = object.clone();
		translation(tryObject);
		var startPoint = object.position.clone();
		var endPoint = tryObject.position.clone();
		var direction = endPoint.clone().sub(startPoint).normalize();
		var distance = startPoint.distanceTo(endPoint);
		var ray = new THREE.Raycaster(startPoint, direction, 0, distance+2);
		var collisions = ray.intersectObjects(V3.ESManager.getSystem('render').scene.children, true);
		if (!collisions.length){
			translation(object);
		}
	}
};

// Source: src/es/systems/input.js
V3.InputSystem = class extends V3.System{
	constructor(){
		super();
		this.name =  'input';
		this.components = [];
		this.controllers = [];
		this.componentTypes = ['input'];
		this.actions = {};
		this.keyMapping = {
			32: 'Space',
			16: 'Shift',
			17: 'Ctrl',
			18: 'Alt'
		};

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
    		}else{

    		}
    	};
    	document.onmousedown = function(){
    		self.actions.Click = true;
    	}
    	document.onmouseup = function(){
    		self.actions.Click = false;
    	}
			document.addEventListener('mousewheel', self.mouseWheel.bind(self));
    	document.addEventListener('pointerlockchange', function(){
    		self.pointerLockEnabled = (document.pointerLockElement == element);
				if(self.pointerLockEnabled){
					document.addEventListener("mousemove", mouseCallback, false);
				}else{
					document.removeEventListener("mousemove", mouseCallback, false);
				};
			}, false);
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
	}

	controller(){
		var self = this;
		this.controllers.map(function(controller){
			for(let action in self.actions){
				if (self.actions[action]){
					var foo = controller.entity.inputComponent.keyMappings[action];
					if (controller[foo]) controller[foo](self.actions);
				}
			}
		});
	}

	onComponentNew(component){
		if (this.componentTypes.indexOf(component.type)>-1){
			this.controllers.push(new component.controllerClass(component.entity));
		}
	}

	// onNewEntity(e){
	// 	if ('input' in e.detail.components){
	// 		this.controllers.push(new this.controllerClass(e.detail));
	// 	}
	// }

	mouseMove(e){
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
	}

	mouseWheel(e){
		this.controllers.map(function(controller){
			controller.mouseWheel(e.wheelDelta)
		});
	}
};

// Source: src/es/systems/physic.js
V3.PhysicSystem = class extends V3.System{
	constructor(){
		super();
		this.name = 'physic';
		this.components = [];
		this.componentTypes = ['physic'];
		this.i = 0;
	}

	// onNewComponent(component){
	// 	if (component.type in this.componentTypes){
	// 		this.components.push(component);
	// 	}
	// }

	controller(){
		var self = this;
		this.components.map(function(component){
			var foo = component.entity.positionComponent.clone();
			component.entity.positionComponent.add(component.forces[0]);
			V3.ESManager.getSystem('render').update(component.entity);
		});
		// console.log(this.components.length);
	}
};

// Source: src/es/systems/render.js
V3.RenderSystem = class extends V3.System{
	constructor(){
		super();
		this.componentTypes = ['render', 'camera'];
		this.objects = [];
		this.name = 'render';
		this.camera = null;
		this.renderer = null;
		this.scene = null;

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
		// should maybe add listener to container - not to whole window?
		window.addEventListener("resize", this.setSize.bind(this));
	}

	onObjectNew(object){
		if (object.hasComponent('render')){
			var mesh = object.renderComponent.object;
			if (object.hasComponent('position')){
				mesh.position.x = object.positionComponent.x;
				mesh.position.y = object.positionComponent.y;
				mesh.position.z = object.positionComponent.z;
			}
			// object.renderComponent.object.position.set(object.positionComponent);
			this.scene.add(mesh);
			this.objects.push(object);
		}
		if (object.hasComponent('camera')){
			this.camera = object.cameraComponent.object;
			this.setSize();
		};
	}
	onComponentNew(component){
		// if (this.componentTypes.indexOf(component.type)>-1){
		// if (component.type === 'camera'){
		// 	this.camera = component.object;
		// 	this.setSize();
		// }
		// 	}else{
		// 		this.scene.add(component.object);

		// 		var position = component.entity.positionComponent;
		// 		if (position){
		// 			component.object.position.x = position.x;
		// 			component.object.position.z = position.z;
		// 		}
		// 	}
		// }
	}

	onComponentRemove(component){}

	controller(entities){
		if (this.camera){
			this.renderer.render(this.scene, this.camera);
		}
	}

	setSize(){
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
		if (this.camera){
			this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
			this.camera.updateProjectionMatrix();
		}
	}

	update(entity){
		var obj = null;
		for (var i in this.scene.children){
			if(this.scene.children[i].id === entity.renderComponent.object.id){
				obj = this.scene.children[i];
				this.scene.children[i].position.set(entity.positionComponent.x, entity.positionComponent.y, entity.positionComponent.z);
				break;
			}
		}
	}
};

// Source: src/es/systems/tick.js
V3.TickSystem = class extends V3.System{
	constructor(){
		super();
		this.name = 'tick';
	}
	controller(entities, delta){
		for (var entityId in entities){
			var entity = entities[entityId];
			if ('tick' in entity.components){
				entity.components.tick.callback(delta);
			}
		}
	}
};

// Source: src/es/components/camera.js
V3.CameraComponent = class extends V3.Component{
	constructor(cameraType){
		super();
		this.type = 'camera';
		if (!cameraType) cameraType = 'perspective';
		var fow = 50;
		var near = 1;
		var far = 20000;
		var renderSystem = V3.ESManager.getSystem('render');

		var aspect = renderSystem.renderer.domElement.width / renderSystem.renderer.domElement.height;
		var left = renderSystem.renderer.domElement.width / -2;
		var right = renderSystem.renderer.domElement.width / 2;
		var top = renderSystem.renderer.domElement.height / 2;
		var bottom = renderSystem.renderer.domElement.height / -2;
		var cubeResolution = 128;
		switch (cameraType.toLowerCase()){
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

// Source: src/es/components/collision.js
V3.CollisionComponent = class extends V3.Component{
	constructor(){
		super();
		this.type = 'collision';
	}
}

// Source: src/es/components/input.js
V3.InputComponent = class extends V3.Component{
	constructor(){
		super();
		this.type = 'input';
		this.movingSpeed = 1;
		this.runingSpeed = 3;
		this.mouseSpeed = 0.003;
		this.wheelSpeed = 0.7;
		this.keyMappings = {
			W: 'moveForward',
			S: 'moveBackward',
			A: 'moveLeft',
			D: 'moveRight',
			Space: 'jump',
			Click: 'shoot',
		}
	}
};

// Source: src/es/components/physic.js
V3.PhysicComponent = class extends V3.Component{
	constructor(){
		var g = 0.05;
		super();
		this.type = 'physic';
		this.forces = [
			new THREE.Vector3(0, -g, 0),
		];
	}
}

// Source: src/es/components/possition.js
V3.PositionComponent = class extends THREE.Vector3{
	constructor(){
		super();
		this.type = 'position';
		this.id = V3._componentIndex++;
	}
}

// Source: src/es/components/render.js
V3.RenderComponent = class extends V3.Component{
	constructor(){
		super();
		this.type = 'render';
		this.object = null;
	}
}

// Source: src/es/components/tick.js
V3.TickComponent = class{
	constructor(){
		this.system = 'tick';
		this.callback = null;
	}
}

// Source: src/actors/pawn.js
V3.Pawn = class extends V3.GameObject{
	constructor(){
		super([V3.PositionComponent, V3.RenderComponent, V3.CollisionComponent]);
	}
};


// Source: src/actors/playerCharacter.js
V3.PlayerCharacter = class extends V3.GameObject{
	constructor(){
		super([



			V3.PositionComponent,
			V3.RenderComponent,
			V3.CollisionComponent,
			V3.InputComponent,
			V3.PhysicComponent,
			V3.CameraComponent]);
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
			object.positionComponent.x = self.randomInRange(endPoint.x, startPoint.x);
			object.positionComponent.y = self.randomInRange(endPoint.y, startPoint.y);
			object.positionComponent.z = self.randomInRange(endPoint.z, startPoint.z);
			V3.ESManager.getSystem('render').update(object);
			this.objects.push(object);
		};
		return this.objects;
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
		this.systems = [V3.RenderSystem, V3.CollisionSystem, V3.InputSystem, V3.PhysicSystem];
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
			V3.ESManager.addSystem(system);
		});
		if (this.defaultPawn){
			var pawn = new this.defaultPawn();
		}
	}
	startPlay(){
		V3.ESManager.run();
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
		// this.mesh = this.entity.components.render.mesh;
		// this.camera = this.entity.components.camera.object;
		// this.mouseSpeed = this.entity.components.input.mouseSpeed;
		// this.movingSpeed = this.entity.components.input.movingSpeed;
		// this.wheelSpeed = this.entity.components.input.wheelSpeed;
		// this.runingSpeed = this.entity.components.input.runingSpeed;
	}
};

// Source: src/playerControllers/fps.js
V3.FPSPlayerController = class extends V3.BasicPlayerController{

	constructor(entity){
		super(entity);
		this.mesh = this.entity.renderComponent.object;
	}

	mouseUp(movement){
		var camera = this.entity.cameraComponent.object;
		if (THREE.Math.radToDeg(camera.rotation.x)<90)
			camera.rotation.x -= movement*this.entity.inputComponent.mouseSpeed;
	}

	mouseDown(movement){
		var camera = this.entity.cameraComponent.object;
		if (THREE.Math.radToDeg(camera.rotation.x)>-90)
			camera.rotation.x -= movement*this.entity.inputComponent.mouseSpeed;
	}

	mouseLeft(movement){
		this.mesh.rotation.y -= movement*this.entity.inputComponent.mouseSpeed;
	}

	mouseRight(movement){
		this.mesh.rotation.y -= movement*this.entity.inputComponent.mouseSpeed;
	}

	mouseWheel(movement){}

	moveForward(actions){
		var speed = actions.Shift ? this.entity.inputComponent.runingSpeed : this.entity.inputComponent.movingSpeed;
		V3.ESManager.getSystem('collision').requestTranslation(this.mesh, function(object){
			object.translateZ(-speed);
		}.bind(this));
	}

	moveBackward(actions){
		var speed = actions.Shift ? this.entity.inputComponent.runingSpeed : this.entity.inputComponent.movingSpeed;
		V3.ESManager.getSystem('collision').requestTranslation(this.mesh, function(object){
			object.translateZ(speed);
		}.bind(this));
	}

	moveLeft(actions){
		var speed = actions.Shift ? this.entity.inputComponent.runingSpeed : this.entity.inputComponent.movingSpeed;
		V3.ESManager.getSystem('collision').requestTranslation(this.mesh, function(object){
			object.translateX(-speed);
		}.bind(this));
	}

	moveRight(actions){
		var speed = actions.Shift ? this.entity.inputComponent.runingSpeed : this.entity.inputComponent.movingSpeed;
		V3.ESManager.getSystem('collision').requestTranslation(this.mesh, function(object){
			object.translateX(speed);
		}.bind(this));
	}

	jump(){
		console.log("jumping");
	}
	shoot(){
		// var bullet = new Bullet(this.entity.components.camera.object.clone());
		// bullet.register();
		// console.log(bullet.entity.components.position);
		// console.log(V3.RenderSystem.scene.children.length);
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
