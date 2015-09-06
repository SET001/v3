// Karma configuration
// Generated on Tue Jul 28 2015 02:15:34 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/threejs/build/three.js',
        'bower_components/lodash/lodash.js',

        'src/v3.js',
        'src/es/systems/*.js',
        'src/es/components/*.js',
        'src/es/es.js',
        'src/es/gameObject.js',
        // 'src/actor.js',
        // 'src/pawn.js',
        // 'src/spawner.js',
        // 'src/cubePawn.js',
        // 'src/meshes/static/*.js',
        // 'src/gameMode.js',
        // 'src/stateMachine.js',
        // 'src/views/view.js',
        // 'src/views/defaultGameView.js',
        // 'src/game.js',
        'spec/es-spec.js'
        // 'spec/*-spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
