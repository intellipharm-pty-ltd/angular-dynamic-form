"use strict";

(function() {

    var dynamicFormFieldset = function() {
        return {
            restrict: 'E',
            scope: {
                field: 				"=",
                model: 				"=",
                errors: 			"=",
                show_validation: 	"=showValidation",
                config: 	        "=",
                style_config: 	    "=styleConfig"
            },
            controller: 'DynamicFormFieldsetCtrl as ctrl',
            replace: true,
			link: function(scope, element, attrs, ctrl) {

                // add class
				element.addClass('dynamic-form-fieldset');

                // set input view template
                scope.input_view_template = "views/inputs/" + scope.field.type + ".html";
                //scope.input_view_template = "/angular-dynamic-form/lib/views/inputs/" + scope.field.type + ".html";
			},
            //templateUrl: '/angular-dynamic-form/lib/views/dynamic-form-fieldset.html'
            templateUrl: 'views/dynamic-form-fieldset.html'
        };
    };

	dynamicFormFieldset.$inject = [];

    angular.module('AngularDynamicForm')
        .directive('dynamicFormFieldset', dynamicFormFieldset);

})();
