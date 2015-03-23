module.exports = {
    dist: {
        options: {
            module: 'AngularDynamicForm',
            url: function(url) {
                console.log(url);
                return 'angular-dynamic-form/' + url.replace('lib/', '');
            }
        },
        src: ['<%= config.lib %>/views/**/*.html'],
        dest: '<%= config.lib %>/scripts/dynamic-form-templates.js'
    }
};
