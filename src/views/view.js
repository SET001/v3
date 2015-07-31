"use strict";
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
