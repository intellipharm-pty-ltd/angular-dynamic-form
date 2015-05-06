module.exports = {
    options: {
        config: '.jscsrc'
    },
    lib: {
        src: [
            '<%= config.src %>/scripts/**/*.js',
            '!<%= config.src %>/scripts/dynamic-form-templates.js'
        ]
    },
    tests: {
        src: [
            '<%= config.tests %>/**/*.js',
        ]
    },
    grunt: {
        src: [
            'Gruntfile.js',
            '<%= config.grunt %>/**/*.js'
        ]
    }
};
