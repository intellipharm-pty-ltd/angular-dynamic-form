"use strict";

(function() {

    var DynamicFormFieldsetService = function() {

		//------------------------------
		// formatDecimal
		//------------------------------

		this.formatDecimal = function(value, regex_remove) {
			if (!_.isUndefined(value)) {
				value = value.replace(regex_remove, '');
			}
			return parseFloat(value).toFixed(2);
		};
    };

    angular.module('AngularDynamicForm')
        .service('DynamicFormFieldsetService', DynamicFormFieldsetService);

})();
