"use strict";
describe('Spawner', function(){
	var spawner = null;
	beforeEach(function(){
		spawner = new V3.Spawner(V3.StaticMesh, {
			render: function(){
				var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
				var geometry = new THREE.BoxGeometry(2, 2, 2);
				this.mesh = new THREE.Mesh(geometry, material);
				return {mesh: this.mesh};
			}
		});
		var startPoint = new THREE.Vector3(10, 10, 10);
		var endPoint = new THREE.Vector3(-10, -10, -10)
		spawner.spawn(1, startPoint, endPoint);
	});

	it('should spawn corrent objects number', function(){
		expect(spawner.objects.length).toBe(1);
	});

	it('should run components setups', function(){
		expect(spawner.objects[0].entity.components.render.mesh).toBeDefined();
	});

	// it('should register spawned objects', function(){
	// 	var cube = new V3.StaticMash();
	// 	var entity = cube.register();
	// });
});
