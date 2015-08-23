"use strict";
V3.InputSystem = {
	name: 'Input',
	components: [],
	controllers: [],
	actions: {
		forward: null,
		backward: null,
		left: null,
		right: null,
		jump: null,
		pitch: null,
		yaw: null
	},
	// controller: function(entities){
	// 	for (var entityId in entities){
	// 		var entity = entities[entityId];
	// 		if ('input' in entity.components){
	// 			if (this.actions.left){
	// 				entity.components.render.mesh.translateX(-0.5);
	// 			}
	// 			if (this.actions.right){
	// 				entity.components.render.mesh.translateX(+0.5);
	// 			}
	// 			if (this.actions.forward){
	// 				entity.components.render.mesh.translateZ(-0.5);
	// 			}
	// 			if (this.actions.backward){
	// 				entity.components.render.mesh.translateZ(+0.5);
	// 			}
	// 		}
	// 	}
	// },
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
	mouseClick: function(){

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
   //  	var m = V3.RenderSystem.camera;
   //  	var pitchObject = new THREE.Object3D();
   //  	pitchObject.add(V3.RenderSystem.camera);

   //  	var pitchObject = V3.RenderSystem.camera.parent;
   //  	pitchObject.add(V3.RenderSystem.camera);

			// var yawObject = new THREE.Object3D();
			// yawObject.position.y = 0;
			// yawObject.position.x = 0;
			// yawObject.position.z = 0;
			// yawObject.add( pitchObject );
			// m.add(yawObject);
			// V3.RenderSystem.scene.add(yawObject);

			var PI_2 = Math.PI / 2;

    	var moveCallback = function(e){
    // 		var movementX = event.movementX || 0;
				// var movementY = event.movementY || 0;
				// if (Math.abs(movementX)<100 && Math.abs(movementY) < 100){
				// 	yawObject.rotation.y -= movementX * 0.003;
				// 	pitchObject.rotation.x -= movementY * 0.003;

				// 	pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
				// };
    	};
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
