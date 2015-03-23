module.exports = function(grunt) {
    grunt.registerTask('build', [
        'notify:build',
        'jshint:lib',
        'jshint:tests',
        'jshint:grunt',
        'jscs:lib',
        'jscs:tests',
        'jscs:grunt',
        'clean:dist',
        'ngtemplates:dist',
        'concat:dist',
        'concat:dist-tmpl',
        'uglify:dist',
        'notify:buildComplete'
    ]);
};
