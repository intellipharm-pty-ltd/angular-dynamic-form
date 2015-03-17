module.exports = {
    dist: {
        options: {
            module: 'AngularDynamicForm',
            url: function(url) {
                return url.replace("lib/", "");
            }
            //
            /*htmlmin: {
                collapseBooleanAttributes:      true,
                collapseWhitespace:             true,
                removeAttributeQuotes:          false,
                removeComments:                 true,
                removeEmptyAttributes:          true,
                removeRedundantAttributes:      true,
                removeScriptTypeAttributes:     true,
                removeStyleLinkTypeAttributes:  true
            }*/
        },
        src: ['<%= config.lib %>/views/**/*.html'],
        dest: '<%= config.lib %>/scripts/dynamic-form-templates.js'
    }
};
