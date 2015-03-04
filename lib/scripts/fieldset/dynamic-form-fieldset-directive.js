"use strict";

(function() {

    var dynamicFormFieldset = function() {
        return {
            restrict: 'E',
            scope: {
                field: 						"=",
                model: 						"=",
                errors: 					"=",
                show_validation: 			"=showValidation",
                edit_state: 				"=editState",
                has_validation_feedback: 	"=hasValidationFeedback",
                has_required_indicator: 	"=hasRequiredIndicator",
                has_help_messages: 			"=hasHelpMessages",
				show_label: 				"=showLabel",
				horizontal: 				"="
            },
            controller: 'DynamicFormFieldsetCtrl as ctrl',
            replace: true,
			link: function(scope, element, attrs, ctrl) {

				element.addClass('dynamic-form-fieldset');
			},
            templateUrl: 'views/dynamic-form-fieldset.html?v='+Math.random()
        };
    };

	dynamicFormFieldset.$inject = [];

    angular.module('AngularDynamicForm')
        .directive('dynamicFormFieldset', dynamicFormFieldset);

})();
