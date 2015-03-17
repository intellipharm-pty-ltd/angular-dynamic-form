module.exports = function(grunt) {
    grunt.registerTask('serve', function (target) {

        grunt.task.run([
            'notify:serve',
            'watch'
        ]);
    });
};
