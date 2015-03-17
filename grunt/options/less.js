module.exports = function() {

    rename_comps = function(dest, src) {
        var newDest = src.split('/');
        newDest[newDest.length - 2] = 'styles';
        newDest[newDest.length - 1] = newDest[newDest.length - 1].replace('.less', '.css');
        var result = newDest.join('/');
        result = result.replace('styles/styles', 'styles');
        console.log(result);
        return result;
    };

    return {
        options: {
            ieCompat: false,
            strictMath: true
        },
        common: {/*
            files: [{
                expand: true,
                src: '<%= config.lib %>/less*//**//*<%= config.less %>*//*.less',
                rename: rename_comps
            }]*/
            files: []
        }
    };
};
