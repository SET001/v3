angular.module 'V3.Scene', []
.factory 'Scene', ['$http', ($http) ->
	class Scene extends THREE.Scene
		project: null
		constructor: (scene) ->
			super()
			@data = []
			_.assign @, scene
			# if scene? and scene.id then @uid = scene.id
		save: ->
			# console.log "===>", @project.id
			obj =
				name: @name
				data: @toJSON()
				# project_id: @project.id
				# data: JSON.stringify
				# 	asd: "asdasd"
				# 	dasd: 3213
			console.log "saving scene", obj
			if @uid
				$http.put "/editor_api/scenes/#{@uid}", obj
			else
				$http.post "/editor_api/scenes/", obj
		load: (sceneInfo) ->
			$http.get("/editor_api/scenes/#{@uid}").then (res) =>
				@data = res.data
		build: ->
			return @
			for item in @data
				[type, subtype] = item.objectType.split '.'
				# data = JSON.parse item.data
				# console.log data
				switch type
					when 'light'
						if subtype is 'ambient'
							light = new THREE.AmbientLight item.color
							@add light
							light.name = item.name
					when 'mesh'
						geometry = new THREE.Geometry()
						for vertex in item.vertices
							geometry.vertices.push new THREE.Vector3 vertex[0], vertex[1], vertex[2]
						for face in item.faces
							geometry.faces.push new THREE.Face3 face[0], face[1], face[2]
						mesh = new THREE.Mesh geometry, new THREE.MeshLambertMaterial color: 0x00ff00
						mesh.name = item.name
						@add mesh
			@

]
.controller 'NewSceneCtrl', ['$scope', 'Scene', ($scope, Scene) ->
	$scope.sceneName = ''
	$scope.create = (sceneName) ->
		scene = new V3.Scene()
		scene.name = sceneName
		$scope.ngDialogData.project.addScene(scene).then (scene) ->
			$scope.closeThisDialog scene
		, (errors) ->
			$scope.errors = errors.data
]
.controller 'ScenesManagerCtrl', ['$scope', 'Scene', ($scope, Scene) ->
		# $scope.errors = []
	# $scope.remove = (scene) ->
	# 	Scenes.remove scene
	# $scope.openScene = (project) ->
	# 	$scope.closeThisDialog project
	$scope.selectScene = (scene) ->
		$scope.closeThisDialog scene
]
