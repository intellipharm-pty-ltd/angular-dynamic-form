module.exports = {
    options: {
        stripBanners: true,
        sourceMap: false,
        banner: '/*!\n * <%= config.pkg.name %> v<%= config.pkg.version %>\n * http://intellipharm.com/\n *\n * Copyright 2015 Intellipharm\n *\n * <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n *\n */\n'
    },
    dist: {
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
    'dist-tmpl': {
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
    }
};
