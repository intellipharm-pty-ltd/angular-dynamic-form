module.exports = {
    options: {
        sourceMap: true,
        preserveComments: 'some'
    },
    dist: {
        files: {
            '<%= config.dist %>/angular-dynamic-form.min.js': '<%= config.dist %>/angular-dynamic-form.js',
            '<%= config.dist %>/angular-dynamic-form.tmpl.min.js': '<%= config.dist %>/angular-dynamic-form.tmpl.js'
        }
    }
};
