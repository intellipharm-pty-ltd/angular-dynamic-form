module.exports = {
    options: {
        stripBanners: true,
        sourceMap: false
    },
    'dist-js': {
    	dest: '<%= config.dist %>/angular-dynamic-form.js',
        src: [
            '<%= config.lib %>/scripts/dynamic-form.js',
            '<%= config.lib %>/scripts/state/dynamic-form-state-service.js',
            '<%= config.lib %>/scripts/util/dynamic-form-util-library.js',
            '<%= config.lib %>/scripts/dynamic-form-settings.js',
            '<%= config.lib %>/scripts/dynamic-form-service.js',
            '<%= config.lib %>/scripts/dynamic-form-controller.js',
            '<%= config.lib %>/scripts/dynamic-form-directive.js',
            '<%= config.lib %>/scripts/fieldset/dynamic-form-fieldset-service.js',
            '<%= config.lib %>/scripts/fieldset/dynamic-form-fieldset-controller.js',
            '<%= config.lib %>/scripts/fieldset/dynamic-form-fieldset-directive.js'
        ]
    },
    'dist-js-tmpl': {
    	dest: '<%= config.dist %>/angular-dynamic-form.tmpl.js',
        src: [
            '<%= config.lib %>/scripts/dynamic-form.js',
            '<%= config.lib %>/scripts/state/dynamic-form-state-service.js',
            '<%= config.lib %>/scripts/util/dynamic-form-util-library.js',
            '<%= config.lib %>/scripts/dynamic-form-templates.js',
            '<%= config.lib %>/scripts/dynamic-form-settings.js',
            '<%= config.lib %>/scripts/dynamic-form-service.js',
            '<%= config.lib %>/scripts/dynamic-form-controller.js',
            '<%= config.lib %>/scripts/dynamic-form-directive.js',
            '<%= config.lib %>/scripts/fieldset/dynamic-form-fieldset-service.js',
            '<%= config.lib %>/scripts/fieldset/dynamic-form-fieldset-controller.js',
            '<%= config.lib %>/scripts/fieldset/dynamic-form-fieldset-directive.js'
        ]
    },
    'dist-css': {
    	dest: '<%= config.dist %>/angular-dynamic-form.css',
        src: [
            '<%= config.lib %>/styles/dynamic-form.css'
        ]
    }
};
