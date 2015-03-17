module.exports = {
    options: {
        livereload: true,
        spawn: false
    },
    lessCommon: {
        files: ['<%= config.lib %>/less/**/*.less'],
        tasks: ['less:common', 'notify:watch']
    },
};
