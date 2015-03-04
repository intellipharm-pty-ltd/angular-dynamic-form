'use strict';

(function() {

	//----------------------------------
	// DynamicForm Settings
	//----------------------------------

	angular.module('AngularDynamicForm')
		.constant('DYNAMIC_FORM_EVENTS', {
			init:           "dynamic-form:init",
			valid:          "dynamic-form:valid",
			invalid:        "dynamic-form:invalid",
			processSuccess: "dynamic-form:process-success",
			processError:   "dynamic-form:process-error",
			submit:         "dynamic-form:submit",
            forceSubmit:    "dynamic-form:force-submit",
			validate:       "dynamic-form:validate"
		});
})();
