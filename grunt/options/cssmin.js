module.exports = function (grunt) {
	return {
		'dist'   : {
			options: {
                keepSpecialComments: 0
			},
			files: {
				'<%= config.dist %>/angular-dynamic-form.min.js': [
                    '<%= config.lib %>/styles/dynamic-form.css'
				]
			}
		}
	};
};
