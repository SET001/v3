"use strict";
V3.InputSystem = {
	name: 'Input',
	components: [],
	controllers: [],
	actions: {},
	controller: function(){
		var self = this;
		this.controllers.map(function(controller){
			for(let action in self.actions){
				if (self.actions[action]){
					var foo = controller.entity.components.input.keyMappings[action];
					if (controller[foo]) controller[foo]();
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
	keyboardEvent: function(){

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
			self.actions[String.fromCharCode(e.which)] = true;
		}
		document.onkeyup = function(e){
			self.actions[String.fromCharCode(e.which)] = false;
		}
		return true;
	}
};
