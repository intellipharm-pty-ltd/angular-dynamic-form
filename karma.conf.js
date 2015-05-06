// Karma configuration
// Generated on Tue Jan 27 2015 07:58:14 GMT+1000 (EST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/lodash/lodash.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-filter/dist/angular-filter.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/scripts/dynamic-form.js',
            'src/scripts/dynamic-form-settings.js',
            'src/scripts/helpers/submit-service.js',
            'src/scripts/helpers/external-call-service.js',
            'src/scripts/transformers/field-transformer-service.js',
            'src/scripts/transformers/config-transformer-service.js',
            'src/scripts/validation/validation-service.js',
            'tests/**/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'lcovonly', file: 'lcov.info', subdir: '.'},
                {type: 'html', subdir: '.'}
            ]
        },

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
        browsers: ['Firefox'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
