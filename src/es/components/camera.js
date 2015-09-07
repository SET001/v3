"use strict";
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
