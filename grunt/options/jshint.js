module.exports = {
    options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
    },
    lib: [
        '<%= config.src %>/scripts/**/*.js',
        '!<%= config.src %>/scripts/dynamic-form-templates.js'
    ],
    tests: [
        '<%= config.tests %>/**/*.js',
    ],
    grunt: [
        'Gruntfile.js',
        '<%= config.grunt %>/**/*.js'
    ]
};
