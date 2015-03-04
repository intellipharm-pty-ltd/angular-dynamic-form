module.exports = function(grunt) {
    grunt.registerTask('build', [
        'notify:build',
        'clean:dist',
        'ngtemplates:dist',
        'concat:dist-js',
        'concat:dist-js-tmpl',
        'concat:dist-css',
        'uglify:dist',
        'uglify:dist-tgit smpl',
        'cssmin:dist',
        'notify:buildComplete'
    ]);
}
