angular.module 'V3.Project', []
.service 'Projects', ['$http', 'EditorSettings', 'Scene', '$q', ($http, EditorSettings, Scene, $q) ->
	class Project
		data: null
		constructor: (data) ->
			_.assign @, data
		addScene: (scene) ->
			scene.project = @
			scene.save().then =>
				unless @scenes.length or @defaultScene
					@defaultScene = scene.id
					@save()
				@scenes.push scene
				scene
			, (errors) ->	errors.data
		loadScene: (sceneId) ->
			defer = $q.defer()
			loader = new THREE.ObjectLoader()
			loader.load "editor_api/scenes/#{sceneId}", (three_scene)->
				three_scene.uid = sceneId
				scene = new Scene three_scene
				defer.resolve scene
			defer.promise
		loadDefaultScene: ->
			@loadScene @defaultScene
		save: ->
			$http.put("editor_api/projects/#{@id}", @).then (responce) =>
				console.log "Project.save", responce

	Projects =
		list: []
		ready: null
		fetch: ->
			@ready = $http.get('editor_api/projects').then (result) =>
				@list = result.data
		load: (projectId) ->
			$http.get("/editor_api/projects/#{projectId}").then (res) =>
				project = new Project res.data
				EditorSettings.set 'lastProjectId', project.id
				project
		create: (projectName) ->
			$http.post("/editor_api/projects/", name: projectName).then (res) =>
				new Project res.data
		remove: (project) ->
			$http.delete("/editor_api/projects/#{project.id}").then (res) =>
				index = _.findIndex @list, id: project.id
				console.log "removing project", project, @list
				@list.splice index, 1
	Projects
]
.controller 'NewProjectCtrl', ['$scope', 'Projects', ($scope, Projects) ->
	$scope.projectName = ''
	$scope.createProject = (projectName) ->
		Projects.create(projectName).then (project) ->
			console.log "project created"
			$scope.closeThisDialog project
		, (errors) ->
			$scope.errors = errors.data
]
.controller 'ProjectsManagerCtrl', ['$scope', 'Projects', ($scope, Projects) ->
	Projects.fetch().then (projectsList) ->
		$scope.projects = Projects.list

	$scope.remove = (project) ->
		Projects.remove project
	$scope.openProject = (project) ->
		$scope.closeThisDialog project
	$scope.newProject = ->
		$scope.closeThisDialog 1
]
