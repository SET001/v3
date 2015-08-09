"use strict";
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
