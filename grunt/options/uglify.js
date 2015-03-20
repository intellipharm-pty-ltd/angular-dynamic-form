module.exports = function (grunt) {
	return {
		'dist'   : {
			options: {
				sourceMap: true,
				preserveComments: 'some'
			},
			files: {
				'<%= config.dist %>/angular-dynamic-form.min.js': [
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
			}
		},
		'dist-tmpl'   : {
			options: {
				sourceMap: true,
				preserveComments: 'some'
			},
			files: {
				'<%= config.dist %>/angular-dynamic-form.tmpl.min.js': [
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
		}
	};
};
