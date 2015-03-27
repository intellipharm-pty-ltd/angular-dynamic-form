module.exports = {
    dist: {
        options: {
            module: 'AngularDynamicForm',
            url: function(url) {
                console.log(url);
                return 'angular-dynamic-form/' + url.replace('src/', '');
            }
        },
        src: ['<%= config.src %>/views/**/*.html'],
        dest: '<%= config.src %>/scripts/dynamic-form-templates.js'
    }
};
