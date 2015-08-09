"use strict";
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
