"use strict";
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
