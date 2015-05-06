module.exports = function(grunt) {
    grunt.registerTask('build', [
        'notify:build',
        'clean',
        'jshint',
        'jscs',
        'karma:build',
        'ngtemplates:dist',
        'concat:dist',
        'concat:dist-tmpl',
        'uglify:dist',
        'notify:buildComplete'
    ]);
};
