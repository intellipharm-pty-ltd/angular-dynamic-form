module.exports = {
    options: {
        stripBanners: true,
        sourceMap: false,
        banner: '/*!\n * <%= config.pkg.name %> v<%= config.pkg.version %>\n * http://intellipharm.com/\n *\n * Copyright 2015 Intellipharm\n *\n * <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n *\n */\n'
    },
    dist: {
        dest: '<%= config.dist %>/angular-dynamic-form.js',
        src: [
            '<%= config.src %>/scripts/dynamic-form.js',
            '<%= config.src %>/scripts/dynamic-form-settings.js',
            '<%= config.src %>/scripts/dynamic-form-controller.js',
            '<%= config.src %>/scripts/dynamic-form-directive.js',
            '<%= config.src %>/scripts/helpers/submit-service.js',
            '<%= config.src %>/scripts/helpers/external-call-service.js',
            '<%= config.src %>/scripts/validation/validation-service.js',
            '<%= config.src %>/scripts/transformers/config-transformer-service.js',
            '<%= config.src %>/scripts/transformers/field-transformer-service.js',
            '<%= config.src %>/scripts/fieldset/dynamic-form-fieldset-controller.js',
            '<%= config.src %>/scripts/fieldset/dynamic-form-fieldset-directive.js'
        ]
    },
    'dist-tmpl': {
        dest: '<%= config.dist %>/angular-dynamic-form.tmpl.js',
        src: [
            '<%= config.src %>/scripts/dynamic-form.js',
            '<%= config.src %>/scripts/dynamic-form-templates.js',
            '<%= config.src %>/scripts/dynamic-form-settings.js',
            '<%= config.src %>/scripts/dynamic-form-controller.js',
            '<%= config.src %>/scripts/dynamic-form-directive.js',
            '<%= config.src %>/scripts/helpers/submit-service.js',
            '<%= config.src %>/scripts/helpers/external-call-service.js',
            '<%= config.src %>/scripts/validation/validation-service.js',
            '<%= config.src %>/scripts/transformers/config-transformer-service.js',
            '<%= config.src %>/scripts/transformers/field-transformer-service.js',
            '<%= config.src %>/scripts/fieldset/dynamic-form-fieldset-controller.js',
            '<%= config.src %>/scripts/fieldset/dynamic-form-fieldset-directive.js'
        ]
    }
};
