module.exports = {
    options: {
        curly: true, // don't allow non curly statements,
        eqeqeq: true,
        futurehostile: true,
        maxdepth: 3,
        notypeof: true,
        unused: true,
        globals: {
            // js globals
            angular: true,
            _: true,
            console: true,
            // grunt globals
            module: true,
            require: true,
            process: true
        }
    },
    lib: [
        '<%= config.src %>/scripts/**/*.js',
        '!<%= config.src %>/scripts/dynamic-form-templates.js'
    ],
    tests: [
        '<%= config.tests %>/**/*.js'
    ],
    grunt: [
        'Gruntfile.js',
        '<%= config.grunt %>/**/*.js'
    ]
};
