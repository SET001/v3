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
					'src/actor.js'
					'src/pawn.js'
					'src/gameMode.js'
					'src/stateMachine.js'
					'src/views/view.js'
					'src/views/defaultGameView.js'
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
