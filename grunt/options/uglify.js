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
			}
		}
	};
};
