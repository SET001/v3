module.exports = (grunt) ->
	grunt.initConfig
		watch:
			scripts:
				files: ['src/**/*.js']
				tasks: ['default']
				options: {}
		concat:
			options:
				banner: "'use strict';\n"
				process: (src, filepath) ->
					'// Source: ' + filepath + '\n' +
						src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
			dist:
				src: [
					'src/v3.js'
					'src/es/systems/*.js'
					'src/es/components/*.js'
					'src/es/es.js'
					'src/gameObject.js'
					'src/actor.js'
					'src/pawn.js'
					'src/spawner.js'
					'src/cubePawn.js'
					'src/meshes/static/*.js'
					'src/gameMode.js'
					'src/stateMachine.js'
					'src/playerControllers/*.js'
					'src/game.js'
				]
				dest: 'build/v3.js'
		uglify:
			targets:
				files:
					'build/v3.min.js': ['build/v3.js']
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-uglify'

	# grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('default', ['concat']);
