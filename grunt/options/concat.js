module.exports = {
    options: {
        stripBanners: true,
        sourceMap: false
    },
    'dist-js': {
    	dest: '<%= config.dist %>/angular-dynamic-form.js',
        src: [
            '<%= config.lib %>/scripts/dynamic-form.js',
            '<%= config.lib %>/scripts/dynamic-form-settings.js',
            '<%= config.lib %>/scripts/dynamic-form-controller.js',
            '<%= config.lib %>/scripts/dynamic-form-directive.js',
            '<%= config.lib %>/scripts/helpers/submit-service.js',
            '<%= config.lib %>/scripts/helpers/external-call-service.js',
            '<%= config.lib %>/scripts/validation/validation-service.js',
            '<%= config.lib %>/scripts/transformers/config-transformer-service.js',
            '<%= config.lib %>/scripts/transformers/field-transformer-service.js',
            '<%= config.lib %>/scripts/fieldset/dynamic-form-fieldset-controller.js',
            '<%= config.lib %>/scripts/fieldset/dynamic-form-fieldset-directive.js'
        ]
    },
    'dist-js-tmpl': {
    	dest: '<%= config.dist %>/angular-dynamic-form.tmpl.js',
        src: [
            '<%= config.lib %>/scripts/dynamic-form.js',
            '<%= config.lib %>/scripts/dynamic-form-templates.js',
            '<%= config.lib %>/scripts/dynamic-form-settings.js',
            '<%= config.lib %>/scripts/dynamic-form-controller.js',
            '<%= config.lib %>/scripts/dynamic-form-directive.js',
            '<%= config.lib %>/scripts/helpers/submit-service.js',
            '<%= config.lib %>/scripts/helpers/external-call-service.js',
            '<%= config.lib %>/scripts/validation/validation-service.js',
            '<%= config.lib %>/scripts/transformers/config-transformer-service.js',
            '<%= config.lib %>/scripts/transformers/field-transformer-service.js',
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
